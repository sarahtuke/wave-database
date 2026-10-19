/* process-stacking-engine.js
 * The "formula" layer for Process Stacking — kept in its own file, separate from both
 * the page (index.html's gate) and the mock data (data/processStacking.js), because
 * this is the one seam meant to be replaced as the real categorization logic lands.
 * The map/ribbon/stack render functions only ever consume the array this file hands
 * back — they never need to change when what's behind that array does.
 *
 * Sources that feed that array:
 *   - getProcessStack(siteContext) — what the page calls on opening a site: live Google
 *     Places around the site (LIVE_PLACES_DEMO) or, failing that, the mock
 *     deriveProcessStack(); plus, always, every OpenStreetMap coastal structure
 *     (breakwaters, groynes, seawalls…) inside the drawn boundary.
 *   - extractProcessStackFromReport(base64Pdf, siteContext) — sends an uploaded EIA
 *     report straight to Claude for extraction. Replaces the Places/mock set; the page
 *     keeps the OSM structures alongside it.
 *
 * A third function, inferTensions(stackData), is the Inference step of the four-step
 * method (Encoding -> Indexing -> Inference -> Prototyping): not relationship-drawing,
 * but identifying which specific parameters are in tension and why — what a hybrid CPM
 * in the Catalogue (Prototyping) would need to respond to.
 *
 * extractProcessStackFromReport() calls the Claude API directly from browser JS using
 * window.APP_CONFIG.CLAUDE_API_KEY — this is a deliberate, scoped exception to "don't
 * expose API keys with real cost risk client-side": acceptable only for an unpublicized
 * doctoral-prototype deployment with a dedicated key and a hard spend cap set in the
 * Anthropic Console, revoked before any wider release. Do not reuse this pattern for a
 * public deployment without adding a backend proxy first.
 */

var TIER_LABELS={1:'The Operative Field',2:'The Connecters',3:'Urban Infrastructure',4:'The Metropole'};
var CATEGORIES=['ecological','infrastructural','programmatic'];

/** Site centroid in lat/lng, derived from siteContext.boundingBox when present,
 *  else the default demo point: Singapore, East Coast Park. */
function siteCentroid(siteContext){
  if(siteContext&&siteContext.boundingBox){
    var bb=siteContext.boundingBox;
    return {lat:(bb.north+bb.south)/2, lng:(bb.east+bb.west)/2};
  }
  return {lat:1.3000,lng:103.9120};
}

/** Offsets a center point by dx/dy meters (small-area equirectangular approximation —
 *  sufficient at site scale, not meant for long distances). */
function offsetLatLng(center,dxM,dyM){
  var dLat=dyM/111320;
  var dLng=dxM/(111320*Math.cos(center.lat*Math.PI/180));
  return {lat:center.lat+dLat,lng:center.lng+dLng};
}

/** Mock fallback. Returns PROCESS_STACK with each entry's .latlng computed relative to
 *  the given siteContext. Used whenever no EIA report has been uploaded/extracted yet —
 *  see extractProcessStackFromReport() below for the real, primary source. */
function deriveProcessStack(siteContext){
  var center=siteCentroid(siteContext);
  return PROCESS_STACK.map(function(p){
    return Object.assign({},p,{latlng:offsetLatLng(center,p.offsetM.dx,p.offsetM.dy)});
  });
}

// ── Google Places (LIVE_PLACES_DEMO) ─────────────────────────────────────────
// Flip LIVE_PLACES_DEMO to false to go back to the mock PROCESS_STACK as the base set
// (OSM structures below are added either way). Not the final categorization formula —
// category comes from which type-group query found the place, tier from its real
// distance to the site centroid (same bands as data/processStacking.js).
var LIVE_PLACES_DEMO=true;
var PLACES_PER_CATEGORY=20; // Google's per-request max; results come back most-popular-first
var PLACES_MIN_RADIUS_M=2000; // outer edge of tier 4 'The Metropole'
var PLACES_MAX_RADIUS_M=50000; // Google's locationRestriction cap
var PLACES_TYPE_GROUPS={
  ecological:['park','national_park','hiking_area','campground','zoo','aquarium','dog_park'],
  infrastructural:['train_station','subway_station','light_rail_station','bus_station','transit_station','ferry_terminal','airport','parking','gas_station'],
  programmatic:['restaurant','cafe','supermarket','museum','tourist_attraction','school','university','shopping_mall','hotel','gym']
};
var _placesCache={};

function livePlacesEnabled(){
  return LIVE_PLACES_DEMO&&!!(window.APP_CONFIG&&window.APP_CONFIG.GOOGLE_PLACES_API_KEY);
}

function _distM(a,b){
  var R=6371000,toR=Math.PI/180;
  var dLat=(b.lat-a.lat)*toR,dLng=(b.lng-a.lng)*toR;
  var h=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(a.lat*toR)*Math.cos(b.lat*toR)*Math.sin(dLng/2)*Math.sin(dLng/2);
  return 2*R*Math.asin(Math.sqrt(h));
}
function tierFromDistance(m){return m<150?1:m<400?2:m<900?3:4;}

/** The site boundary as [{lat,lng},...] — the drawn (possibly rotated) corners when
 *  given, else the axis-aligned bounding box. */
function siteCorners(siteContext){
  if(siteContext&&siteContext.corners&&siteContext.corners.length>=3)return siteContext.corners;
  var bb=siteContext&&siteContext.boundingBox;
  if(!bb)return null;
  return[{lat:bb.south,lng:bb.west},{lat:bb.south,lng:bb.east},{lat:bb.north,lng:bb.east},{lat:bb.north,lng:bb.west}];
}
function _inPoly(lat,lng,poly){
  var inside=false;
  for(var i=0,j=poly.length-1;i<poly.length;j=i++){
    var a=poly[i],b=poly[j];
    if(((a.lat>lat)!==(b.lat>lat))&&(lng<(b.lng-a.lng)*(lat-a.lat)/(b.lat-a.lat)+a.lng))inside=!inside;
  }
  return inside;
}

/** Search radius that always covers the whole drawn boundary — so a site box drawn over
 *  all of East Coast Park still gets every corner inside the Places search circle. */
function placesRadius(siteContext,center){
  var corners=siteCorners(siteContext)||[];
  var far=corners.reduce(function(m,c){return Math.max(m,_distM(center,c));},0);
  return Math.min(PLACES_MAX_RADIUS_M,Math.max(PLACES_MIN_RADIUS_M,Math.ceil(far)));
}

/** One Nearby Search per category type-group (3 requests, PLACES_PER_CATEGORY each) via
 *  the Places API (New) REST endpoint — no Maps JS loader needed — mapped into the
 *  PROCESS_STACK shape. A group that errors is skipped rather than failing the whole
 *  lookup. Cached per centroid+radius so redrawing/reopening the same site doesn't re-bill. */
async function fetchPlacesStack(siteContext){
  var center=siteCentroid(siteContext);
  var radius=placesRadius(siteContext,center);
  var cacheKey=center.lat.toFixed(4)+','+center.lng.toFixed(4)+','+radius;
  if(_placesCache[cacheKey])return _placesCache[cacheKey];

  var key=window.APP_CONFIG.GOOGLE_PLACES_API_KEY;
  var seen={},out=[];
  var results=await Promise.all(CATEGORIES.map(function(cat){
    return fetch('https://places.googleapis.com/v1/places:searchNearby',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key':key,
        'X-Goog-FieldMask':'places.id,places.displayName,places.location,places.types,places.primaryTypeDisplayName,places.formattedAddress'
      },
      body:JSON.stringify({
        includedTypes:PLACES_TYPE_GROUPS[cat],
        maxResultCount:PLACES_PER_CATEGORY,
        rankPreference:'POPULARITY',
        locationRestriction:{circle:{center:{latitude:center.lat,longitude:center.lng},radius:radius}}
      })
    }).then(function(res){
      return res.json().then(function(d){
        if(!res.ok)throw new Error((d.error&&d.error.message)||('HTTP '+res.status));
        return{cat:cat,places:d.places||[]};
      });
    }).catch(function(e){console.warn('Places '+cat+' query failed:',e);return{cat:cat,places:[]};});
  }));
  results.forEach(function(r){
    r.places.forEach(function(pl){
      if(!pl.location||seen[pl.id])return;
      seen[pl.id]=true;
      var latlng={lat:pl.location.latitude,lng:pl.location.longitude};
      var dist=_distM(center,latlng);
      out.push({
        id:'gp-'+pl.id,
        label:(pl.displayName&&pl.displayName.text)||'Unnamed place',
        category:r.cat,
        tier:tierFromDistance(dist),
        phase:'Now',
        note:(pl.primaryTypeDisplayName?pl.primaryTypeDisplayName.text+' · ':'')+Math.round(dist)+' m from site'+(pl.formattedAddress?' — '+pl.formattedAddress:''),
        placesTypeStandIn:pl.types||[],
        latlng:latlng,
        source:'places'
      });
    });
  });
  if(out.length)_placesCache[cacheKey]=out;
  return out;
}

// ── OpenStreetMap coastal structures (always on — not demo-gated) ────────────
// Google Places is good at places and poor at structures; breakwaters, groynes and
// seawalls live in OSM instead. Queried via the public Overpass API (free, keyless,
// CORS-enabled — fits this static site) for EVERYTHING whose geometry touches the drawn
// boundary, no popularity cap. Structures are infrastructural parameters like any other
// (so they feed tensions and the diagrams) AND flagged isCpm, so they're guaranteed a
// row in the Identified CPMs registry — see mergeDetectedCpms() below.
// Both send CORS headers; the public servers 504 under load, hence the bundled
// data/osmSnapshot.js fallback (see fetchOsmFeatures).
var OVERPASS_ENDPOINTS=['https://overpass-api.de/api/interpreter','https://maps.mail.ru/osm/tools/overpass/api/interpreter'];
var OSM_TIMEOUT_MS=25000;
var OSM_TIMEOUT_WITH_SNAPSHOT_MS=8000; // don't stall the page when a bundled fallback exists
// First match wins. cpmId is a deterministic catalogue link for unambiguous types only;
// breakwaters have three plausible catalogue entries (re-002/re-003/re-021), so those
// are left to matchCatalogCpms()'s judgment call.
var OSM_FEATURE_TYPES=[
  {kind:'Breakwater',category:'infrastructural',isCpm:true,cpmId:null,test:function(t){return t.man_made==='breakwater';}},
  {kind:'Groyne',category:'infrastructural',isCpm:true,cpmId:'re-009',test:function(t){return t.man_made==='groyne';}},
  {kind:'Seawall',category:'infrastructural',isCpm:true,cpmId:'re-066',test:function(t){
    return /^(sea_?wall|flood_wall)$/.test(t.man_made||'')||/^(sea_?wall|flood_wall)$/.test(t.barrier||'')||(t.barrier==='wall'&&/^(sea_?wall|flood_wall)$/.test(t.wall||''));
  }},
  {kind:'Revetment',category:'infrastructural',isCpm:true,cpmId:'re-001',test:function(t){return t.man_made==='revetment';}},
  {kind:'Dyke',category:'infrastructural',isCpm:true,cpmId:null,test:function(t){return t.man_made==='dyke';}},
  {kind:'Pier',category:'infrastructural',isCpm:false,cpmId:null,test:function(t){return /^(pier|jetty)$/.test(t.man_made||'');}},
  {kind:'Water control',category:'infrastructural',isCpm:false,cpmId:null,test:function(t){return /^(dam|weir|lock_gate|sluice_gate)$/.test(t.waterway||'');}},
  {kind:'Mangrove',category:'ecological',isCpm:false,cpmId:null,test:function(t){return t.natural==='wetland'&&t.wetland==='mangrove';}},
  {kind:'Wetland',category:'ecological',isCpm:false,cpmId:null,test:function(t){return t.natural==='wetland';}},
  {kind:'Beach',category:'ecological',isCpm:false,cpmId:null,test:function(t){return t.natural==='beach';}},
  {kind:'Reef',category:'ecological',isCpm:false,cpmId:null,test:function(t){return t.natural==='reef';}}
];
var _osmCache={};

function overpassQuery(corners){
  var poly='poly:"'+corners.map(function(c){return c.lat.toFixed(6)+' '+c.lng.toFixed(6);}).join(' ')+'"';
  return '[out:json][timeout:25];('+
    'nwr["man_made"~"^(breakwater|groyne|seawall|sea_wall|flood_wall|revetment|dyke|pier|jetty)$"]('+poly+');'+
    'nwr["barrier"~"^(sea_wall|seawall|flood_wall)$"]('+poly+');'+
    'nwr["barrier"="wall"]["wall"~"^(sea_wall|seawall|flood_wall)$"]('+poly+');'+
    'nwr["waterway"~"^(dam|weir|lock_gate|sluice_gate)$"]('+poly+');'+
    'nwr["natural"~"^(beach|wetland|reef)$"]('+poly+');'+
    ');out geom;';
}

/** Races every endpoint at once; first good response wins, the rest are aborted. */
function _overpass(query,timeoutMs){
  var ctrls=OVERPASS_ENDPOINTS.map(function(){return new AbortController();});
  var timer=setTimeout(function(){ctrls.forEach(function(c){c.abort();});},timeoutMs);
  return Promise.any(OVERPASS_ENDPOINTS.map(function(url,i){
    return fetch(url,{method:'POST',body:'data='+encodeURIComponent(query),
      headers:{'Content-Type':'application/x-www-form-urlencoded'},signal:ctrls[i].signal})
      .then(function(res){
        if(!res.ok)throw new Error('Overpass HTTP '+res.status);
        return res.json();
      }).catch(function(e){console.warn('Overpass endpoint failed ('+url+'):',e);throw e;});
  })).then(function(json){
    ctrls.forEach(function(c){c.abort();});
    return json;
  },function(agg){throw(agg.errors&&agg.errors[0])||agg;}).finally(function(){clearTimeout(timer);});
}

/** Element geometry as an array of [lat,lng] paths (one per way / relation member). */
function _osmPaths(el){
  if(el.type==='node')return[[[el.lat,el.lon]]];
  if(el.type==='way')return el.geometry?[el.geometry.map(function(g){return[g.lat,g.lon];})]:[];
  return(el.members||[]).filter(function(m){return m.geometry;}).map(function(m){
    return m.geometry.map(function(g){return[g.lat,g.lon];});
  });
}

function _segmentsCross(p1,p2,q1,q2){
  function o(a,b,c){return(b.lng-a.lng)*(c.lat-a.lat)-(b.lat-a.lat)*(c.lng-a.lng);}
  return(o(p1,p2,q1)>0)!==(o(p1,p2,q2)>0)&&(o(q1,q2,p1)>0)!==(o(q1,q2,p2)>0);
}
/** Client-side stand-in for Overpass's poly filter, used on snapshot elements: a vertex
 *  inside the boundary, an edge crossing it, or (for areas like a beach) the boundary
 *  sitting wholly inside the element's ring. */
function _pathTouchesPoly(path,corners){
  var pts=path.map(function(p){return{lat:p[0],lng:p[1]};});
  if(pts.some(function(p){return _inPoly(p.lat,p.lng,corners);}))return true;
  for(var i=1;i<pts.length;i++)for(var j=0;j<corners.length;j++){
    if(_segmentsCross(pts[i-1],pts[i],corners[j],corners[(j+1)%corners.length]))return true;
  }
  return pts.length>3&&_inPoly(corners[0].lat,corners[0].lng,pts);
}
function _snapshotFor(corners){
  if(typeof OSM_SNAPSHOTS==='undefined')return null;
  return OSM_SNAPSHOTS.find(function(sn){
    var bb=sn.bbox;
    return corners.every(function(c){return c.lat>=bb.south&&c.lat<=bb.north&&c.lng>=bb.west&&c.lng<=bb.east;});
  })||null;
}

/** Every mapped coastal structure / coastal habitat touching the site boundary, in the
 *  PROCESS_STACK shape (+ source:'osm', isCpm, osmKind, cpmId, geometry). Live Overpass
 *  first; if every endpoint fails and the site is inside a bundled snapshot
 *  (data/osmSnapshot.js), that snapshot instead — noted on each entry. Throws only when
 *  neither is available, so the page can say the lookup failed rather than "0 found". */
function fetchOsmFeatures(siteContext){
  var corners=siteCorners(siteContext);
  if(!corners)return Promise.resolve([]);
  var query=overpassQuery(corners);
  // Cache the promise, not the result, so the debounced preview and the takeover
  // opening share one in-flight lookup instead of racing two. Failures are evicted.
  if(!_osmCache[query]){
    _osmCache[query]=_fetchOsmUncached(siteContext,corners,query);
    _osmCache[query].catch(function(){delete _osmCache[query];});
  }
  return _osmCache[query];
}
async function _fetchOsmUncached(siteContext,corners,query){
  var snap=_snapshotFor(corners);
  var elements,origin='OpenStreetMap';
  try{
    elements=(await _overpass(query,snap?OSM_TIMEOUT_WITH_SNAPSHOT_MS:OSM_TIMEOUT_MS)).elements||[];
  }catch(e){
    if(!snap)throw e;
    console.warn('Overpass unavailable — using bundled OSM snapshot "'+snap.name+'" ('+snap.fetched+')');
    elements=snap.elements.filter(function(el){
      return _osmPaths(el).some(function(path){return _pathTouchesPoly(path,corners);});
    });
    origin='OpenStreetMap snapshot '+snap.fetched;
  }
  return _osmElementsToStack(elements,siteContext,corners,origin);
}

/** latlng is the mean of the element's vertices that fall INSIDE the boundary, so a
 *  beach polygon spanning all of ECP is pinned where it meets this site, not at its own
 *  far centre. Unnamed features are numbered west→east per kind ("Breakwater (OSM 3)")
 *  so labels stay unique — tension and CPM matching both key on label — without
 *  colliding with official names Google may carry (e.g. ECP's "Breakwater 4"). */
function _osmElementsToStack(elements,siteContext,corners,origin){
  var center=siteCentroid(siteContext);
  var found=[];
  elements.forEach(function(el){
    var t=el.tags||{};
    var ft=OSM_FEATURE_TYPES.find(function(f){return f.test(t);});
    if(!ft)return;
    var paths=_osmPaths(el);
    var pts=[].concat.apply([],paths);
    if(!pts.length)return;
    var inside=pts.filter(function(p){return _inPoly(p[0],p[1],corners);});
    var use=inside.length?inside:pts;
    var latlng={
      lat:use.reduce(function(s,p){return s+p[0];},0)/use.length,
      lng:use.reduce(function(s,p){return s+p[1];},0)/use.length
    };
    found.push({el:el,tags:t,ft:ft,paths:paths,latlng:latlng});
  });
  found.sort(function(a,b){return a.latlng.lng-b.latlng.lng;});

  var counters={};
  return found.map(function(f){
    counters[f.ft.kind]=(counters[f.ft.kind]||0)+1;
    var dist=_distM(center,f.latlng);
    var material=f.tags.material?' ('+f.tags.material+')':'';
    return{
      id:'osm-'+f.el.type+'-'+f.el.id,
      label:f.tags.name||(f.ft.kind+' (OSM '+counters[f.ft.kind]+')'),
      category:f.ft.category,
      tier:tierFromDistance(dist),
      phase:'Now',
      note:f.ft.kind+material+' · '+origin+' · '+Math.round(dist)+' m from site centre',
      placesTypeStandIn:[],
      latlng:f.latlng,
      source:'osm',
      isCpm:f.ft.isCpm,
      osmKind:f.ft.kind,
      cpmId:f.ft.cpmId,
      geometry:f.paths
    };
  });
}

/** Labels must be unique across the merged stack (tension + CPM matching key on them). */
function _uniqueLabels(stack){
  var used={};
  stack.forEach(function(p){
    var base=p.label,n=1;
    while(used[p.label])p.label=base+' ('+(++n)+')';
    used[p.label]=true;
  });
  return stack;
}

/** What the page calls. Base set: live Places when the demo flag + key are set,
 *  otherwise (or on failure / zero results) the mock deriveProcessStack(). OSM
 *  structures inside the boundary are always appended on top. Fails soft per source.
 *  Resolves to {stack, source:'places'|'mock', osm:[...osm entries], osmError}. */
async function getProcessStack(siteContext){
  var osmPromise=fetchOsmFeatures(siteContext).then(function(o){return{list:o,err:null};})
    .catch(function(e){console.error('OSM structures lookup failed:',e);return{list:[],err:e};});
  var base=null,source='mock';
  if(livePlacesEnabled()){
    try{
      var live=await fetchPlacesStack(siteContext);
      if(live.length){base=live;source='places';}
      else console.warn('Places returned no results here — falling back to mock stack');
    }catch(e){
      console.error('Live Places lookup failed — falling back to mock stack:',e);
    }
  }
  if(!base)base=deriveProcessStack(siteContext);
  var osm=await osmPromise;
  // A Places POI named like a structure ("Breakwater 4") that sits on an OSM structure of
  // that kind is the same object twice — keep the OSM one, which carries the geometry.
  base=base.filter(function(p){
    if(p.source!=='places')return true;
    return!osm.list.some(function(o){
      return o.isCpm&&new RegExp(o.osmKind,'i').test(p.label)&&_distM(o.latlng,p.latlng)<150;
    });
  });
  var stack=_uniqueLabels(base.map(function(p){return Object.assign({},p);})
    .concat(osm.list.map(function(p){return Object.assign({},p);})));
  return{stack:stack,source:source,osm:stack.filter(function(p){return p.source==='osm';}),osmError:osm.err};
}

// ── EIA report extraction (primary source; Places API is the future top-up) ──
var CLAUDE_MODEL='claude-haiku-5-5'; // cheapest capable tier — fine for structured extraction
var CLAUDE_EXTRACTION_PROMPT=
`You are extracting environmental and infrastructural parameters from an Environmental Impact Assessment (EIA) report, for a coastal site-characterization tool studying flooding-related processes.

Read the attached report and identify 10-25 specific named features, activities, or infrastructure it mentions that are relevant to coastal/flooding processes (ecological features, built infrastructure, and human activities/programs).

For each one, assign:
- "label": a short specific name (not a generic category)
- "category": exactly one of "ecological", "infrastructural", "programmatic"
- "tier": an integer 1-4, where 1 = immediate site edge, 2 = connecting corridors/local infrastructure, 3 = city-scale infrastructure, 4 = metropolitan/regional scale
- "phase": one of "Now", "+10y", "+25y", "+50y" — use "Now" unless the report explicitly describes this as a future/planned phase
- "note": one plain-language sentence describing it, grounded in what the report actually says

Return ONLY a JSON array of objects with exactly these fields. No prose, no markdown code fences — just the raw JSON array.`;

/** Reads a File as base64 (no data: URI prefix), for the PDF document content block. */
function fileToBase64(file){
  return new Promise(function(resolve,reject){
    var reader=new FileReader();
    reader.onload=function(){resolve(reader.result.split(',')[1]);};
    reader.onerror=reject;
    reader.readAsDataURL(file);
  });
}

/** Shared call to the Messages API; returns the response's text block content, parsed
 *  as JSON (stray markdown fences stripped first, since models sometimes add them
 *  despite being told not to). Throws with a short, readable message on any failure. */
async function callClaudeForJson(content,maxTokens){
  var key=window.APP_CONFIG&&window.APP_CONFIG.CLAUDE_API_KEY;
  if(!key)throw new Error('Claude API key not set in config.js (CLAUDE_API_KEY)');
  var res=await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{
      'content-type':'application/json',
      'x-api-key':key,
      'anthropic-version':'2023-06-01',
      'anthropic-dangerous-direct-browser-access':'true'
    },
    body:JSON.stringify({model:CLAUDE_MODEL,max_tokens:maxTokens,messages:[{role:'user',content:content}]})
  });
  if(!res.ok){
    var errBody=await res.text();
    throw new Error('Claude API error '+res.status+': '+errBody.slice(0,200));
  }
  var data=await res.json();
  var textBlock=(data.content||[]).find(function(b){return b.type==='text';});
  if(!textBlock)throw new Error('No text in Claude response');
  var raw=textBlock.text.trim().replace(/^```(?:json)?/i,'').replace(/```$/,'').trim();
  try{return JSON.parse(raw);}catch(e){throw new Error('Could not parse JSON from Claude response');}
}

/** Sends an uploaded EIA report (PDF, base64) to Claude and returns a PROCESS_STACK-
 *  shaped array ({id,label,category,tier,phase,note,placesTypeStandIn,latlng}) — same
 *  shape deriveProcessStack() returns, so the page's render functions don't care which
 *  one produced it. No real per-feature coordinates exist in report text, so locations
 *  are synthetically scattered around the site centroid, same as the mock data. */
async function extractProcessStackFromReport(base64Pdf,siteContext){
  var parsed=await callClaudeForJson([
    {type:'document',source:{type:'base64',media_type:'application/pdf',data:base64Pdf}},
    {type:'text',text:CLAUDE_EXTRACTION_PROMPT}
  ],4096);
  if(!Array.isArray(parsed))throw new Error('Expected a JSON array from Claude');

  var center=siteCentroid(siteContext);
  return parsed.map(function(p,i){
    var ang=(i/parsed.length)*2*Math.PI, dist=80+Math.random()*900;
    var dx=Math.cos(ang)*dist, dy=Math.sin(ang)*dist;
    return{
      id:'eia-'+i,
      label:p.label||'Unnamed parameter',
      category:CATEGORIES.indexOf(p.category)!==-1?p.category:'programmatic',
      tier:[1,2,3,4].indexOf(p.tier)!==-1?p.tier:2,
      phase:['Now','+10y','+25y','+50y'].indexOf(p.phase)!==-1?p.phase:'Now',
      note:p.note||'',
      placesTypeStandIn:[],
      latlng:offsetLatLng(center,dx,dy)
    };
  });
}

// ── Inference: identifying tensions between encoded/indexed parameters ──────
// This is the step your methodology names explicitly — not relationship-drawing for
// its own sake, but surfacing the conflicts and implications a hybrid design response
// would need to resolve. Output feeds the "Indexing to Inference" ledger and the
// ribbon-crossing markers; Prototyping (the Catalogue) is what responds to it next.
function tensionPrompt(stackData){
  var slim=stackData.map(function(p){return{label:p.label,category:p.category,tier:p.tier,note:p.note};});
  return `You are analyzing a list of site parameters (ecological, infrastructural, and programmatic processes identified near a coastal site) to identify TENSIONS — conflicts, pressures, or unresolved relationships between specific pairs of them that a hybrid nature-based design response would need to resolve.

Parameters:
${JSON.stringify(slim)}

Identify 4-10 tensions. Each must name exactly two parameters from the list above (by their exact "label" text) that are in tension with each other, and explain why in one plain-language sentence grounded in what's actually there.

Return ONLY a JSON array of objects with fields: "a" (label of first parameter, exact match), "b" (label of second parameter, exact match), "description" (one sentence), "severity" (one of "low","medium","high"). No prose, no markdown fences — just the raw JSON array.`;
}

/** Returns [{aId,bId,aLabel,bLabel,description,severity}, ...]. Labels are matched
 *  back to stackData entries to recover their ids; any tension Claude names that
 *  doesn't match two real labels is dropped rather than guessed at. Fails soft (empty
 *  array) if no key is configured, since the ledger/ribbon can both render with none. */
async function inferTensions(stackData){
  if(!(window.APP_CONFIG&&window.APP_CONFIG.CLAUDE_API_KEY))return[];
  var byLabel={};
  stackData.forEach(function(p){byLabel[p.label]=p;});
  var parsed;
  try{
    parsed=await callClaudeForJson([{type:'text',text:tensionPrompt(stackData)}],2048);
  }catch(e){
    console.error('inferTensions failed:',e);
    return[];
  }
  if(!Array.isArray(parsed))return[];
  return parsed.map(function(t){
    var a=byLabel[t.a],b=byLabel[t.b];
    if(!a||!b)return null;
    return{
      aId:a.id,bId:b.id,aLabel:a.label,bLabel:b.label,
      description:t.description||'',
      severity:['low','medium','high'].indexOf(t.severity)!==-1?t.severity:'medium'
    };
  }).filter(Boolean);
}

// ── Existing-CPM registry — identifying what's already built on site ────────
// Two different problems, two different mechanisms:
//   - buildSearchableCpmPool(): a normal search index (name+tags), for the user's own
//     manual "add a CPM I know is here" search box — no LLM needed, has to feel instant.
//   - matchCatalogCpms(): encoded parameter labels are free-form prose ("Quay-wall
//     seawall segment") and won't substring-match catalogue names/tags ("Coastal
//     Revetment" / "rock armour"), so auto-detecting which already-encoded parameters
//     ARE recognizable CPMs needs the same kind of judgment call already used for
//     extraction and tension-inference, not a keyword heuristic.
//
// Deliberately does NOT compute or carry anchor scores — scores are an Inference-stage
// concern (see tensionPrompt above); this just identifies what's already there.

/** Minimal searchable CPM pool: STUDIES + STANDARD only (SPECULATIVE is intentionally
 *  excluded — browsable in the full catalogue, not yet placeable here, matching the
 *  same exclusion spatial-strategy.html's own buildCpmPool() already makes). */
function buildSearchableCpmPool(){
  var fromStudies=(typeof STUDIES!=='undefined'?STUDIES:[]).map(function(s){
    return{id:s.asa_code,name:s.title,material:s.material,kind:'study',tags:s.keywords||[]};
  });
  var fromStandard=(typeof STANDARD!=='undefined'?STANDARD:[]).map(function(o){
    return{id:o.id,name:o.name,material:o.material,kind:'standard',tags:o.tags||[]};
  });
  return fromStudies.concat(fromStandard);
}

function cpmMatchPrompt(stackData,cpmPool){
  var slimParams=stackData.map(function(p){return{label:p.label,category:p.category,note:p.note};});
  var slimPool=cpmPool.map(function(c){return{id:c.id,name:c.name,material:c.material,tags:c.tags};});
  return `You are reviewing a list of site parameters to identify which ones are recognizable coastal protection measures (CPMs) — built or vegetated interventions, not generic activities or raw landscape features.

Parameters:
${JSON.stringify(slimParams)}

Catalogue of known CPMs (id, name, material, tags):
${JSON.stringify(slimPool)}

For each parameter that IS plausibly a coastal protection measure, decide whether it matches one specific catalogue entry closely (by what it actually is, not just shared words). Omit parameters that aren't CPMs at all (e.g. a market, a residential block, a logistics yard) — don't force a match for those.

Return ONLY a JSON array of objects with fields: "paramLabel" (exact label from the parameter list), "matched" (true if a specific catalogue entry fits, false if it reads as a CPM but nothing in the catalogue matches), "cpmId" (the matched catalogue id, or null if matched is false). No prose, no markdown fences — just the raw JSON array.`;
}

/** Returns [{paramId,paramLabel,matched,cpmId,cpmName}, ...] — only for parameters
 *  Claude judged to be actual CPMs; everything else is simply absent from the result.
 *  Fails soft (empty array) on any error, same as inferTensions. */
async function matchCatalogCpms(stackData,cpmPool){
  if(!(window.APP_CONFIG&&window.APP_CONFIG.CLAUDE_API_KEY))return[];
  var byLabel={};
  stackData.forEach(function(p){byLabel[p.label]=p;});
  var byId={};
  cpmPool.forEach(function(c){byId[c.id]=c;});
  var parsed;
  try{
    parsed=await callClaudeForJson([{type:'text',text:cpmMatchPrompt(stackData,cpmPool)}],2048);
  }catch(e){
    console.error('matchCatalogCpms failed:',e);
    return[];
  }
  if(!Array.isArray(parsed))return[];
  return parsed.map(function(m){
    var param=byLabel[m.paramLabel];
    if(!param)return null;
    var cpm=m.cpmId?byId[m.cpmId]:null;
    return{
      paramId:param.id,paramLabel:param.label,
      matched:!!(m.matched&&cpm),
      cpmId:cpm?cpm.id:null,
      cpmName:cpm?cpm.name:null
    };
  }).filter(Boolean);
}

/** Folds OSM-detected structures (isCpm) into matchCatalogCpms()'s result so every one
 *  is listed even when Claude skips it or no key is set. An unambiguous OSM type's fixed
 *  cpmId wins over the model's pick; otherwise the model's match stands, else the
 *  structure is listed unmatched. Each row also gets latlng/source from its parameter
 *  so the registry can travel to the catalogue with real locations. */
function mergeDetectedCpms(stackData,matches,cpmPool){
  var byParam={},byId={},paramById={};
  matches.forEach(function(m){byParam[m.paramId]=m;});
  cpmPool.forEach(function(c){byId[c.id]=c;});
  stackData.forEach(function(p){paramById[p.id]=p;});
  stackData.forEach(function(p){
    if(!p.isCpm)return;
    var fixed=p.cpmId&&byId[p.cpmId];
    var m=byParam[p.id];
    if(fixed){
      var row={paramId:p.id,paramLabel:p.label,matched:true,cpmId:fixed.id,cpmName:fixed.name};
      if(m)Object.assign(m,row);else matches.push(row);
    }else if(!m){
      matches.push({paramId:p.id,paramLabel:p.label,matched:false,cpmId:null,cpmName:null});
    }
  });
  matches.forEach(function(m){
    var p=paramById[m.paramId];
    if(p){m.latlng=p.latlng;m.source=p.source||null;m.osmKind=p.osmKind||null;}
  });
  return matches;
}

// ── Five Anchors baseline — connecting Inference to the grading matrix ──────
// Ports from spatial-strategy.html (verified untouched: weightedGeoMean 394-404,
// WEIGHT_PROFILES/pickWeightProfile 341-355, computeScore 419-447, locationCoversPosition
// 315-326) rather than reinventing the scoring convention. ANC and POS are index.html's
// own globals (lines 838/896) — safe to reference here since this file's functions only
// ever run after the whole page has loaded, well after both are defined.

/** Weighted geometric mean across whichever anchors have data, weights renormalized to
 *  the available subset so a missing anchor doesn't collapse the composite to 0. */
function weightedGeoMean(scoreByAnchor,w){
  var avail=ANC.filter(function(a){return scoreByAnchor[a]!=null;});
  if(!avail.length)return null;
  var wSum=avail.reduce(function(s,a){return s+(w[a]||0);},0);
  var logSum=0;
  avail.forEach(function(a){
    var wa=wSum>0?(w[a]||0)/wSum:1/avail.length;
    logSum+=wa*Math.log(Math.max(scoreByAnchor[a],0.01));
  });
  return Math.exp(logSum);
}

// Hardcoded stub profiles keyed to site tags — same stub spatial-strategy.html already
// uses, not a real inference engine, just enough to make scoring visibly respond to
// what's actually at the site.
var WEIGHT_PROFILES={
  default:{structural:0.20,ecological:0.20,economic:0.20,social:0.20,authorship:0.20},
  'industrial-heavy':{structural:0.32,ecological:0.10,economic:0.30,social:0.18,authorship:0.10},
  'ecological-priority':{structural:0.12,ecological:0.34,economic:0.12,social:0.30,authorship:0.12}
};
function pickWeightProfile(ctx){
  if(!ctx||!ctx.tags)return{key:'default',weights:WEIGHT_PROFILES.default};
  var infra=(ctx.tags.infrastructural||[]).length;
  var eco=(ctx.tags.ecological||[]).length;
  var industrialFlag=(ctx.tags.infrastructural||[]).some(function(t){return['Desalination Plant','Pumping Station','Tidal Gates','Levee'].indexOf(t)!==-1;})
    ||(ctx.tags.programmatic||[]).some(function(t){return['Port','Industrial'].indexOf(t)!==-1;});
  if(industrialFlag&&infra>=eco)return{key:'industrial-heavy',weights:WEIGHT_PROFILES['industrial-heavy']};
  if(eco>0&&eco>=infra)return{key:'ecological-priority',weights:WEIGHT_PROFILES['ecological-priority']};
  return{key:'default',weights:WEIGHT_PROFILES.default};
}

function locationCoversPosition(location,position){
  if(!location)return false;
  if(location.type==='Point')return location.position===position;
  if(location.type==='Span'){
    var si=POS.indexOf(location.start),ei=POS.indexOf(location.end),pi=POS.indexOf(position);
    if(si===-1||ei===-1||pi===-1)return false;
    var lo=Math.min(si,ei),hi=Math.max(si,ei);
    return pi>=lo&&pi<=hi;
  }
  if(location.type==='Discrete-multi')return(location.positions||[]).indexOf(position)!==-1;
  return false;
}

/** Real per-anchor score for one catalogued CPM, looked up directly by kind+id rather
 *  than from a pre-built pool — faithful port of spatial-strategy.html's computeScore().
 *  n:0/null anchors mean "no supporting study data," surfaced honestly rather than
 *  treated as 0. */
function computeCpmAnchorScore(kind,cpmId,weights){
  if(kind==='study'){
    var s=STUDIES.find(function(s){return s.asa_code===cpmId;});
    if(!s)return{composite:null,anchors:{},n:0};
    var anchorsS={};
    ANC.forEach(function(a){var anc=s.anchors&&s.anchors[a];anchorsS[a]=(anc&&anc.score!=null)?anc.score:null;});
    return{composite:weightedGeoMean(anchorsS,weights),anchors:anchorsS,n:1};
  }
  var o=STANDARD.find(function(o){return o.id===cpmId;});
  if(!o)return{composite:null,anchors:{},n:0};
  var stds=STUDIES.filter(function(s){return s.material===o.material&&locationCoversPosition(o.location,s.position);});
  if(!stds.length)return{composite:null,anchors:{},n:0};
  var anchorsO={};
  ANC.forEach(function(a){
    var vals=stds.map(function(s){var anc=s.anchors&&s.anchors[a];return(anc&&anc.score!=null)?anc.score:null;}).filter(function(v){return v!==null;});
    anchorsO[a]=vals.length?vals.reduce(function(x,y){return x+y;},0)/vals.length:null;
  });
  return{composite:weightedGeoMean(anchorsO,weights),anchors:anchorsO,n:stds.length};
}

/** Live anchor coverage for whatever's currently staged in the catalogue (index.html's
 *  stagedItems — single objects or whole-cell groups, distinct from spatial-strategy.html's
 *  own `strategy` array), so the Site tab can preview impact before the user ever opens
 *  the Spatial Builder page. Plain arithmetic mean per anchor across every constituent
 *  CPM's real score — same convention as spatial-strategy.html's renderAncCoverage().
 *  Returns null (not an all-null object) when nothing's staged, so callers can fall back
 *  to showing the baseline untouched. */
function computeStagedCoverage(stagedItems,weights){
  var pairs=[];
  stagedItems.forEach(function(it){
    if(it.type==='object')pairs.push({kind:it.kind,id:it.id});
    else(it.objectIds||[]).forEach(function(id){pairs.push({kind:it.kind,id:id});});
  });
  if(!pairs.length)return null;
  var perAnchor={};
  ANC.forEach(function(a){perAnchor[a]=[];});
  pairs.forEach(function(p){
    var score=computeCpmAnchorScore(p.kind,p.id,weights);
    ANC.forEach(function(a){if(score.anchors[a]!=null)perAnchor[a].push(score.anchors[a]);});
  });
  var result={};
  ANC.forEach(function(a){
    var vals=perAnchor[a];
    result[a]=vals.length?vals.reduce(function(x,y){return x+y;},0)/vals.length:null;
  });
  return result;
}

function baselineAnchorPrompt(cpmSummaries,tensionSummaries){
  return `You are establishing a BASELINE score (0-10) for a coastal site across five anchors — structural, ecological, economic, social, authorship — representing how well the site currently functions BEFORE any new design intervention, based only on what already exists there.

Existing CPMs already identified on this site, with their real catalogued anchor scores where available (null means no supporting study data):
${JSON.stringify(cpmSummaries)}

Unresolved tensions at this site:
${JSON.stringify(tensionSummaries)}

For each anchor, weigh the real scores of existing CPMs that touch it, and discount for tensions that leave it unresolved or in conflict. If neither any existing CPM nor any tension speaks to an anchor at all, use a conservative middle value rather than an extreme — don't invent certainty that isn't there.

Return ONLY a JSON object with exactly these fields, each a number 0-10: {"structural":n,"ecological":n,"economic":n,"social":n,"authorship":n}. No prose, no markdown fences.`;
}

/** Returns {structural,ecological,economic,social,authorship} (0-10 each) or null on
 *  failure/no key — the Inference-stage baseline that spatial-strategy.html's live
 *  Anchor Coverage panel will eventually be compared against (not wired up yet). */
async function inferBaselineAnchors(onSiteCPMs,identifiedCpms,tensions,tagsLike){
  if(!(window.APP_CONFIG&&window.APP_CONFIG.CLAUDE_API_KEY))return null;
  var weights=pickWeightProfile({tags:tagsLike}).weights;

  var matchedById={};
  onSiteCPMs.forEach(function(c){if(c.matched&&c.id)matchedById[c.id]={kind:c.kind,name:c.name};});
  // identifiedCpms doesn't carry `kind` today (only cpmId/cpmName) — resolve it by
  // checking which pool the id actually belongs to, rather than assuming either one.
  identifiedCpms.forEach(function(m){
    if(m.matched&&m.cpmId)matchedById[m.cpmId]={
      kind:STANDARD.some(function(o){return o.id===m.cpmId;})?'standard':'study',
      name:m.cpmName
    };
  });

  var cpmSummaries=Object.keys(matchedById).map(function(id){
    var entry=matchedById[id];
    var score=computeCpmAnchorScore(entry.kind,id,weights);
    return{name:entry.name,anchors:score.anchors,supportingStudies:score.n};
  });
  var tensionSummaries=(tensions||[]).map(function(t){
    return{a:t.aLabel,b:t.bLabel,description:t.description,severity:t.severity};
  });

  var parsed;
  try{
    parsed=await callClaudeForJson([{type:'text',text:baselineAnchorPrompt(cpmSummaries,tensionSummaries)}],1024);
  }catch(e){
    console.error('inferBaselineAnchors failed:',e);
    return null;
  }
  if(!parsed||typeof parsed!=='object')return null;
  var result={};
  var ok=ANC.every(function(a){
    var v=parsed[a];
    if(typeof v!=='number'||isNaN(v))return false;
    result[a]=Math.max(0,Math.min(10,v));
    return true;
  });
  return ok?result:null;
}
