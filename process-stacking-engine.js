/* process-stacking-engine.js
 * The "formula" layer for Process Stacking — kept in its own file, separate from both
 * the page (index.html's gate) and the mock data (data/processStacking.js), because
 * this is the one seam meant to be replaced as the real categorization logic lands.
 * The map/ribbon/stack render functions only ever consume the array this file hands
 * back — they never need to change when what's behind that array does.
 *
 * Two sources feed that array:
 *   - deriveProcessStack(siteContext) — the mock fallback (geo-places PROCESS_STACK
 *     around the site centroid). Used when no EIA report has been uploaded.
 *   - extractProcessStackFromReport(base64Pdf, siteContext) — the real, primary source:
 *     sends an uploaded EIA report straight to Claude for extraction. Google Places
 *     (not yet wired up) is intended as a later top-up on whichever of these ran, not
 *     a replacement for either.
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
 *  else the same Rotterdam demo point used throughout this codebase (test-places.html). */
function siteCentroid(siteContext){
  if(siteContext&&siteContext.boundingBox){
    var bb=siteContext.boundingBox;
    return {lat:(bb.north+bb.south)/2, lng:(bb.east+bb.west)/2};
  }
  return {lat:51.9225,lng:4.4792};
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

// ── LIVE PLACES DEMO (temporary) ─────────────────────────────────────────────
// Flip to false to go back to the mock PROCESS_STACK everywhere. While true, the site
// box's preview and the Process Stacking takeover are fed by real Google Places
// results around the drawn site instead of the mock offsets. Not the final
// categorization formula — category comes from which type-group query found the place,
// tier from its real distance to the site centroid (same bands as data/processStacking.js).
var LIVE_PLACES_DEMO=true;
var PLACES_RADIUS_M=2000; // outer edge of tier 4 'The Metropole'
var PLACES_PER_CATEGORY=8; // ~24 total, same scale as the mock/EIA stacks the diagrams are sized for
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

/** One Nearby Search per category type-group (3 requests, PLACES_PER_CATEGORY each) via the
 *  Places API (New) REST endpoint — no Maps JS loader needed — mapped
 *  into the PROCESS_STACK shape. A group that errors is skipped rather than failing the
 *  whole lookup. Results are cached per site centroid so redrawing/reopening the same
 *  site doesn't re-bill. */
async function fetchPlacesStack(siteContext){
  var center=siteCentroid(siteContext);
  var cacheKey=center.lat.toFixed(4)+','+center.lng.toFixed(4);
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
        locationRestriction:{circle:{center:{latitude:center.lat,longitude:center.lng},radius:PLACES_RADIUS_M}}
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
        latlng:latlng
      });
    });
  });
  if(out.length)_placesCache[cacheKey]=out;
  return out;
}

/** What the page calls: live Places when the demo flag + key are set, otherwise (or on
 *  failure / zero results) the mock deriveProcessStack(). Resolves to {stack,source}. */
async function getProcessStack(siteContext){
  if(livePlacesEnabled()){
    try{
      var live=await fetchPlacesStack(siteContext);
      if(live.length)return{stack:live,source:'places'};
      console.warn('Places returned no results here — falling back to mock stack');
    }catch(e){
      console.error('Live Places lookup failed — falling back to mock stack:',e);
    }
  }
  return{stack:deriveProcessStack(siteContext),source:'mock'};
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
