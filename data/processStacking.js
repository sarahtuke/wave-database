/* data/processStacking.js
 * Mock "Process Stacking" parameter set — a stand-in for what a live Google Places
 * query around a characterized site will eventually return, once the categorization
 * formula is finalized. See process-stacking-engine.js for where this gets consumed.
 *
 * Fields:
 *   id                  — unique string, 'ps-NN'
 *   label               — display name (plausible coastal-flooding-context activity/infrastructure)
 *   category            — 'ecological' | 'infrastructural' | 'programmatic'
 *   tier                — 1-4, mapping to:
 *                          1 = 'The Operative Field'   (immediate site edge,  ~0-150m)
 *                          2 = 'The Connecters'        (linking corridors,   ~150-400m)
 *                          3 = 'Urban Infrastructure'  (city systems,        ~400-900m)
 *                          4 = 'The Metropole'         (metropolitan scale,  ~900-2000m)
 *   offsetM             — {dx,dy} meters from the site centroid — relative, not absolute,
 *                          so this set re-scatters sensibly around whatever site was
 *                          characterized (mirrors how a real proximity search returns
 *                          points relative to a center, not fixed coordinates).
 *   phase               — one of PATHWAY_TIME_POINTS ['Now','+10y','+25y','+50y'],
 *                          reusing spatial-strategy.html's own time vocabulary so the
 *                          time-stack previews the same adaptive-pathways horizon.
 *   placesTypeStandIn   — array, stand-in for a future real Google Places `types[]`
 *                          value — not rendered anywhere yet, just a landing spot for
 *                          the pending categorization formula.
 *   note                — one-line description, shown in map popups and as the
 *                          relational diagram's rim-label tooltip.
 */
var PROCESS_STACK=[
  // ── Ecological ──────────────────────────────────────────────
  {id:'ps-01',label:'Tidal mudflat fringe',category:'ecological',tier:1,
    offsetM:{dx:-70,dy:55},phase:'Now',placesTypeStandIn:['natural_feature'],
    note:'Intertidal sediment edge, first contact zone for rising water.'},
  {id:'ps-02',label:'Reed-bed buffer strip',category:'ecological',tier:1,
    offsetM:{dx:95,dy:-35},phase:'Now',placesTypeStandIn:['park'],
    note:'Vegetated margin softening wave energy at the shoreline.'},
  {id:'ps-03',label:'Secondary polder drainage ditch',category:'ecological',tier:2,
    offsetM:{dx:-250,dy:180},phase:'Now',placesTypeStandIn:['natural_feature'],
    note:'Local gravity drainage feeding the wider polder network.'},
  {id:'ps-04',label:'Municipal wetland park',category:'ecological',tier:2,
    offsetM:{dx:300,dy:-210},phase:'+10y',placesTypeStandIn:['park'],
    note:'Designed retention landscape, doubles as public green space.'},
  {id:'ps-05',label:'Regional nature reserve edge',category:'ecological',tier:3,
    offsetM:{dx:-640,dy:360},phase:'+10y',placesTypeStandIn:['park'],
    note:'Protected habitat boundary bordering the urbanized edge.'},
  {id:'ps-06',label:'Delta estuary system',category:'ecological',tier:4,
    offsetM:{dx:980,dy:-760},phase:'+25y',placesTypeStandIn:['natural_feature'],
    note:'Metropolitan-scale hydrology governing long-term sediment flow.'},

  // ── Infrastructural ─────────────────────────────────────────
  {id:'ps-07',label:'Local stormwater pumping station',category:'infrastructural',tier:1,
    offsetM:{dx:55,dy:100},phase:'Now',placesTypeStandIn:['point_of_interest'],
    note:'First-line mechanical drainage for the immediate site edge.'},
  {id:'ps-08',label:'Quay-wall seawall segment',category:'infrastructural',tier:1,
    offsetM:{dx:-105,dy:-70},phase:'Now',placesTypeStandIn:['point_of_interest'],
    note:'Hard edge protection directly fronting the water.'},
  {id:'ps-09',label:'Neighborhood levee access road',category:'infrastructural',tier:2,
    offsetM:{dx:330,dy:140},phase:'Now',placesTypeStandIn:['route'],
    note:'Service corridor doubling as a secondary flood barrier crest.'},
  {id:'ps-10',label:'Secondary tidal gate',category:'infrastructural',tier:2,
    offsetM:{dx:-370,dy:-230},phase:'+10y',placesTypeStandIn:['point_of_interest'],
    note:'Operable barrier regulating flow into the inner waterway.'},
  {id:'ps-11',label:'Regional storm-surge barrier',category:'infrastructural',tier:3,
    offsetM:{dx:760,dy:-430},phase:'+25y',placesTypeStandIn:['point_of_interest'],
    note:'City-scale defense structure, closes under surge conditions.'},
  {id:'ps-12',label:'Metropolitan flood-control authority depot',category:'infrastructural',tier:4,
    offsetM:{dx:-1250,dy:950},phase:'+50y',placesTypeStandIn:['local_government_office'],
    note:'Coordinating body for region-wide flood response infrastructure.'},

  // ── Programmatic ────────────────────────────────────────────
  {id:'ps-13',label:"Fishmongers' quay market",category:'programmatic',tier:1,
    offsetM:{dx:80,dy:-90},phase:'Now',placesTypeStandIn:['market'],
    note:'Daily waterfront trade, directly exposed to tidal activity.'},
  {id:'ps-14',label:'Harbor-front residential block',category:'programmatic',tier:1,
    offsetM:{dx:-60,dy:115},phase:'Now',placesTypeStandIn:['premise'],
    note:'Housing stock sitting closest to the water’s edge.'},
  {id:'ps-15',label:"Dockworkers' union hall",category:'programmatic',tier:2,
    offsetM:{dx:220,dy:260},phase:'Now',placesTypeStandIn:['establishment'],
    note:'Community anchor tied to the working waterfront economy.'},
  {id:'ps-16',label:'Riverside promenade café strip',category:'programmatic',tier:2,
    offsetM:{dx:-310,dy:250},phase:'+10y',placesTypeStandIn:['restaurant'],
    note:'Recreational frontage, sensitive to both flooding and tourism demand.'},
  {id:'ps-17',label:'Container terminal logistics yard',category:'programmatic',tier:3,
    offsetM:{dx:680,dy:520},phase:'+10y',placesTypeStandIn:['storage'],
    note:'Freight throughput that depends on continuous quay access.'},
  {id:'ps-18',label:'Central business district',category:'programmatic',tier:4,
    offsetM:{dx:-1050,dy:-880},phase:'+50y',placesTypeStandIn:['premise'],
    note:'Metropolitan economic core, the end point of cascading flood risk.'}
];
