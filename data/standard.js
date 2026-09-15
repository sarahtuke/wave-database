/**
 * WAVE CATALOGUE — data/standard.js
 * Real-world CPM objects, re-grounded in the cross-shore location axis
 * and reviewed material/group classification.
 *
 * Location and material reclassification: Sarah Luposo Tuké-Shongwe, Sep 2026
 * (supersedes the original fn-code / group-only matrix from the Celine
 * compilation — see project journal for the reclassification workbook)
 *
 * Load order in index.html:
 *   <script src="data/standard.js"></script>
 *
 * Each object:
 *   id           — unique identifier, format re-NNN
 *   name         — CPM display name
 *   material     — group/material code: 'Grey' | 'Green' | 'Hybrid'
 *                  (Amphibious/D retired Sep 2026 — see re-063 note)
 *   location     — cross-shore position, one of three shapes:
 *                  Point:          { type: 'Point', position: <pos> }
 *                  Span:           { type: 'Span', start: <pos>, end: <pos> }
 *                  Discrete-multi: { type: 'Discrete-multi', positions: [<pos>, <pos>, ...] }
 *                  <pos> is one of 'Offshore' | 'Edge' | 'Shoreline' | 'Inland'
 *   newCode      — derived display code: material letter (A=Grey/B=Green/C=Hybrid)
 *                  + location letter(s) (O/E/S/I). Span codes are two letters
 *                  (start+end); Discrete-multi codes join positions with '+'.
 *   scale        — 'unit' | 'neighbourhood' | 'territorial'
 *   diagram      — SVG diagram key (see renderDiagram() in index)
 *   disturbance  — { primary, secondary } using pulse|sustained|press|ramp|null
 *   desc         — short display description (1–2 sentences)
 *   source       — attribution string. 'PENDING' markers indicate objects
 *                  awaiting a primary-source citation from the Regional CPM
 *                  Authorities Tracker (see project journal)
 *   tags         — array of additional searchable tags
 *   status       — 'sourced' | 'draft-unsourced' | 'draft-unsourced-full-placeholder'
 *                  internal QA flag, not for display
 *   reviewNotes  — reclassification/override notes, internal, not for display
 */

var STANDARD = [

  {
    id: 're-001',
    name: 'Coastal Revetment',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'neighbourhood',
    diagram: 'revetment',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Sloped or stepped hard structure of rock armour, concrete units, or gabions placed on a shoreline to dissipate wave energy and resist erosion.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['rock armour', 'hard engineering', 'wave attenuation', 'revetment'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-002',
    name: 'Offshore Parallel Breakwater (Emerged/Submerged)',
    material: 'Grey',
    location: { type: 'Point', position: 'Offshore' },
    newCode: 'AO',
    scale: 'neighbourhood',
    diagram: 'breakwater',
    disturbance: { primary: 'pulse', secondary: 'null' },
    desc: 'Structure placed parallel to the shoreline to reduce wave energy reaching the coast. Emerged or submerged; can induce tombolo formation over time.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['breakwater', 'offshore', 'wave energy', 'hard engineering'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-003',
    name: 'Nearshore Parallel Breakwater (Tombolo Formation)',
    material: 'Grey',
    location: { type: 'Span', start: 'Offshore', end: 'Edge' },
    newCode: 'AOE',
    scale: 'neighbourhood',
    diagram: 'tombolo',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Nearshore breakwater positioned to induce sediment accumulation and tombolo formation, creating a sheltered beach landform over time.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['tombolo', 'nearshore', 'sediment', 'breakwater'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-004',
    name: 'Storm Surge Barrier (Movable)',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'territorial',
    diagram: 'surge_barrier',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Large-scale movable barrier that closes during storm surge events to protect hinterland. Remains open under normal tidal conditions.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['surge barrier', 'movable', 'Thames Barrier', 'Maeslant', 'territorial scale'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-005',
    name: 'Offshore Closure Dam (Emerged, Impervious)',
    material: 'Grey',
    location: { type: 'Point', position: 'Offshore' },
    newCode: 'AO',
    scale: 'territorial',
    diagram: 'closure_dam',
    disturbance: { primary: 'ramp', secondary: 'pulse' },
    desc: 'Permanent emerged impervious dam closing off a bay or estuary from the sea. Provides absolute protection but eliminates tidal exchange.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['closure dam', 'permanent', 'hard engineering', 'territorial'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-006',
    name: 'Dyke Raising',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'territorial',
    diagram: 'dyke',
    disturbance: { primary: 'ramp', secondary: 'sustained' },
    desc: 'Raising the crest height of existing dykes to increase freeboard against rising sea levels and storm surges. Standard adaptive measure in low-lying deltas.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['dyke', 'embankment', 'Netherlands', 'adaptive raising', 'SLR'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-007',
    name: 'Wave Wall',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'neighbourhood',
    diagram: 'wave_wall',
    disturbance: { primary: 'pulse', secondary: 'null' },
    desc: 'Vertical or recurved concrete wall placed at the top of a beach or revetment to deflect wave overtopping. Compact and often retrofit-applied.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['wave wall', 'overtopping', 'recurved', 'concrete'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-008',
    name: 'Watertight Flood Dyke / Embankment',
    material: 'Grey',
    location: { type: 'Span', start: 'Edge', end: 'Shoreline' },
    newCode: 'AES',
    scale: 'territorial',
    diagram: 'dyke',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Impermeable earthen or concrete embankment forming a continuous flood defence line along a shoreline or riverbank.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['dyke', 'embankment', 'impermeable', 'flood defence'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-009',
    name: 'Perpendicular Groynes',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'neighbourhood',
    diagram: 'groynes',
    disturbance: { primary: 'pulse', secondary: 'ramp' },
    desc: 'Shore-perpendicular structures that interrupt longshore sediment transport to retain beach material. Typically timber, rock, or concrete.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['groynes', 'longshore drift', 'sediment', 'beach retention'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-010',
    name: 'Setback Flood Defence Wall or Embankment',
    material: 'Grey',
    location: { type: 'Point', position: 'Shoreline' },
    newCode: 'AS',
    scale: 'territorial',
    diagram: 'setback_wall',
    disturbance: { primary: 'sustained', secondary: 'ramp' },
    desc: 'Flood defence line set back from the active shoreline, allowing a buffer zone or foreshore to absorb initial wave energy before the wall.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['setback', 'flood wall', 'buffer zone', 'defence line'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-011',
    name: 'Permanent Standing Flood Walls',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'neighbourhood',
    diagram: 'flood_wall',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Fixed vertical walls of concrete or sheet piling providing permanent flood protection to urban waterfronts and coastal developments.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['flood wall', 'permanent', 'sheet piling', 'concrete'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-012',
    name: 'Mobile Flood Walls',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'neighbourhood',
    diagram: 'mobile_wall',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Demountable wall systems deployed ahead of flood events. Provides flexible protection where permanent walls are not feasible or desirable.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['mobile', 'deployable', 'temporary', 'demountable wall'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-013',
    name: 'Operable Flood Barrier',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'neighbourhood',
    diagram: 'operable_barrier',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Fixed barrier with operable gate sections allowing normal access or tidal flow while providing closure capacity during flood events.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['operable', 'gate', 'barrier', 'flood control'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-014',
    name: 'Deployable Flood Barrier',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'neighbourhood',
    diagram: 'mobile_wall',
    disturbance: { primary: 'pulse', secondary: 'null' },
    desc: 'Rapid-deployment barrier system stored off-site and assembled at flood entry points. Suitable for irregular or infrequent flood events.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['deployable', 'rapid response', 'temporary barrier'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-015',
    name: 'Self-raising Barrier',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'neighbourhood',
    diagram: 'operable_barrier',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Automated barrier that rises in response to rising water levels without manual intervention. Often used at access points and underpasses.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['automatic', 'self-raising', 'automated barrier', 'passive activation'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-016',
    name: 'Retrofit Flood Barrier',
    material: 'Grey',
    location: { type: 'Discrete-multi', positions: ['Edge', 'Inland'] },
    newCode: 'AE+I',
    scale: 'unit',
    diagram: 'flood_wall',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Property-level barrier applied to existing door and window openings to resist floodwater entry. Installed in advance of or during a flood event.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['retrofit', 'property-level', 'doorstep', 'unit scale'],
    status: 'sourced',
    reviewNotes: 'collapsed retrofit and temporary flood barriers. Allow them to be multi discrete'
  },

  {
    id: 're-018',
    name: 'Sluice Gates',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'neighbourhood',
    diagram: 'sluice',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Controlled openings in flood defences allowing managed water flow under normal conditions with closure capacity during flood events.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['sluice', 'tidal gate', 'controlled opening', 'water management'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-020',
    name: 'Coastal Nourishment',
    material: 'Green',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'BE',
    scale: 'territorial',
    diagram: 'nourishment',
    disturbance: { primary: 'pulse', secondary: 'ramp' },
    desc: 'Addition of sand or sediment to an eroding beach or dune system to restore natural wave attenuation capacity and ecological habitat.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['beach nourishment', 'sediment', 'sand', 'erosion management', 'NbS'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-021',
    name: 'Breakwater Reefs',
    material: 'Green',
    location: { type: 'Point', position: 'Offshore' },
    newCode: 'BO',
    scale: 'neighbourhood',
    diagram: 'reef',
    disturbance: { primary: 'pulse', secondary: 'press' },
    desc: 'Artificial reef structures designed to reduce wave energy while promoting marine biodiversity. Can be constructed from recycled or ecological modules.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['reef', 'artificial reef', 'biodiversity', 'wave attenuation', 'NbS'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-022',
    name: 'Vegetated Sand Dune',
    material: 'Green',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'BE',
    scale: 'neighbourhood',
    diagram: 'dune',
    disturbance: { primary: 'pulse', secondary: 'ramp' },
    desc: 'Naturally or artificially established sand dune system stabilised by coastal vegetation. Functions as a flexible energy-absorbing barrier.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['dune', 'sand', 'vegetation', 'coastal NbS', 'marram grass'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-023',
    name: 'Artificial Reef Unit',
    material: 'Green',
    location: { type: 'Point', position: 'Offshore' },
    newCode: 'BO',
    scale: 'neighbourhood',
    diagram: 'reef_unit',
    disturbance: { primary: 'pulse', secondary: 'press' },
    desc: 'Prefabricated modular reef unit placed on the seabed to attenuate waves and provide structured habitat for marine colonisation.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['modular reef', 'prefabricated', 'habitat', 'wave reduction'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-024',
    name: 'Eco Tiles',
    material: 'Green',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'BE',
    scale: 'unit',
    diagram: 'eco_tiles',
    disturbance: { primary: 'press', secondary: 'pulse' },
    desc: 'Textured or structured tiles applied to hard coastal surfaces to provide ecological habitat for intertidal organisms while maintaining flood protection function.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['eco tiles', 'ecological enhancement', 'intertidal', 'retrofit ecology'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-025',
    name: 'Artificial Reefs',
    material: 'Hybrid',
    location: { type: 'Point', position: 'Offshore' },
    newCode: 'CO',
    scale: 'neighbourhood',
    diagram: 'reef',
    disturbance: { primary: 'pulse', secondary: 'press' },
    desc: 'Submerged structures — including repurposed materials — placed offshore to modify wave energy and create marine habitat at neighbourhood scale.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['artificial reef', 'offshore', 'habitat', 'submerged structure'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-026',
    name: 'Flood Defence Landscape — Double Dike',
    material: 'Grey',
    location: { type: 'Span', start: 'Edge', end: 'Shoreline' },
    newCode: 'AES',
    scale: 'territorial',
    diagram: 'double_dike',
    disturbance: { primary: 'ramp', secondary: 'sustained' },
    desc: 'Two parallel dike structures with an inter-dike zone accommodating tidal inflow, reducing hydraulic load on the inner dike while creating ecological and productive landscape value.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['double dike', 'inter-dike', 'tidal', 'hybrid', 'Netherlands'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-027',
    name: 'Perched Beach',
    material: 'Hybrid',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'CE',
    scale: 'neighbourhood',
    diagram: 'perched_beach',
    disturbance: { primary: 'pulse', secondary: 'ramp' },
    desc: 'Artificially elevated beach created by placing sediment on a submerged sill or platform. Combines structural support with beach nourishment to maintain elevation.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['perched beach', 'nourishment', 'sill', 'hybrid beach'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-028',
    name: 'Offshore Barrier Island',
    material: 'Hybrid',
    location: { type: 'Point', position: 'Offshore' },
    newCode: 'CO',
    scale: 'territorial',
    diagram: 'barrier_island',
    disturbance: { primary: 'pulse', secondary: 'ramp' },
    desc: 'Natural or engineered island placed offshore to attenuate wave energy and provide ecological habitat. Acts as a living coastal buffer at territorial scale.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['barrier island', 'offshore', 'territorial', 'island ecology'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-029',
    name: 'Rich (Ecological) Hard Coastal Enhancement',
    material: 'Hybrid',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'CE',
    scale: 'neighbourhood',
    diagram: 'eco_revetment',
    disturbance: { primary: 'pulse', secondary: 'press' },
    desc: 'Enhancement of existing hard coastal structures with ecological features — pools, textures, biodiversity habitats — layered onto revetments, seawalls, and breakwaters.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['ecological enhancement', 'hard structures', 'biodiversity', 'hybrid'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-030',
    name: 'Land Reclamation',
    material: 'Grey',
    location: { type: 'Span', start: 'Offshore', end: 'Edge' },
    newCode: 'AOE',
    scale: 'territorial',
    diagram: 'reclamation',
    disturbance: { primary: 'ramp', secondary: 'press' },
    desc: 'Creation of new land areas by filling coastal waters or tidal flats. Raises ground elevation above flood risk levels and expands developable land.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['reclamation', 'infill', 'land creation', 'Singapore', 'territorial'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-031',
    name: 'Land Raising / Embankment',
    material: 'Grey',
    location: { type: 'Point', position: 'Shoreline' },
    newCode: 'AS',
    scale: 'territorial',
    diagram: 'land_raise',
    disturbance: { primary: 'ramp', secondary: 'press' },
    desc: 'Raising ground levels through earthworks to bring areas above projected flood levels. Applied at district to territorial scale.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['land raising', 'earthworks', 'ground level', 'SLR adaptation'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-032',
    name: 'Levees',
    material: 'Grey',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'ASI',
    scale: 'territorial',
    diagram: 'dyke',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Earthen embankments along riverbanks or shorelines designed to contain floodwater within defined channels and prevent inundation of adjacent land.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['levee', 'earthen embankment', 'flood containment', 'river', 'delta'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-033',
    name: 'Local Land Raising',
    material: 'Grey',
    location: { type: 'Span', start: 'Edge', end: 'Inland' },
    newCode: 'AEI',
    scale: 'neighbourhood',
    diagram: 'land_raise',
    disturbance: { primary: 'press', secondary: 'ramp' },
    desc: 'Localised raising of ground levels in specific neighbourhoods or plots to elevate buildings and infrastructure above projected flood levels.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['local land raising', 'neighbourhood', 'ground raising', 'flood risk'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-034',
    name: 'Building Platform / Floor Raising',
    material: 'Grey',
    location: { type: 'Point', position: 'Inland' },
    newCode: 'AI',
    scale: 'unit',
    diagram: 'elevated',
    disturbance: { primary: 'press', secondary: 'ramp' },
    desc: 'Raising finished floor levels or building platforms above design flood levels. Applied at building scale as part of new construction or retrofit.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['floor raising', 'platform', 'building scale', 'unit', 'retrofit'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-035',
    name: 'Bypass / Diversion Channel',
    material: 'Grey',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'ASI',
    scale: 'territorial',
    diagram: 'channel',
    disturbance: { primary: 'sustained', secondary: 'pulse' },
    desc: 'Engineered channel that diverts excess flood flows away from protected areas. Reduces peak water levels in vulnerable zones during high flow events.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['bypass channel', 'diversion', 'flood routing', 'engineered channel'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-036',
    name: 'Natural Tidal Vegetated Foreshore',
    material: 'Green',
    location: { type: 'Span', start: 'Edge', end: 'Shoreline' },
    newCode: 'BES',
    scale: 'neighbourhood',
    diagram: 'foreshore',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Naturally established saltmarsh or mangrove foreshore that attenuates wave energy and provides ecological habitat through natural succession processes.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['saltmarsh', 'mangrove', 'foreshore', 'NbS', 'succession', 'tidal'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-037',
    name: 'Constructed Foreshore — Tidal Park / Wetland',
    material: 'Hybrid',
    location: { type: 'Span', start: 'Edge', end: 'Shoreline' },
    newCode: 'CES',
    scale: 'neighbourhood',
    diagram: 'tidal_park',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Engineered intertidal landscape combining wave attenuation, ecological habitat, and public programming. Designed to function as both flood buffer and civic amenity.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['tidal park', 'wetland', 'constructed', 'civic', 'NbS', 'green infrastructure'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-038',
    name: 'Coastal Realignment',
    material: 'Green',
    location: { type: 'Span', start: 'Edge', end: 'Inland' },
    newCode: 'BEI',
    scale: 'territorial',
    diagram: 'realignment',
    disturbance: { primary: 'ramp', secondary: 'press' },
    desc: 'Deliberate breaching or removal of existing coastal defences to allow natural shoreline migration inland. Creates new intertidal habitat and reduces flood risk.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['managed realignment', 'retreat', 'shoreline migration', 'intertidal creation'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-039',
    name: 'Restoring Salinity Gradients / Tidal Dynamics',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'neighbourhood',
    diagram: 'tidal_restoration',
    disturbance: { primary: 'press', secondary: 'sustained' },
    desc: 'Restoration of tidal exchange and salinity gradients in impounded or degraded coastal wetlands to re-establish natural ecological and flood buffering function.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['tidal restoration', 'salinity', 'estuarine', 'ecological restoration'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-040',
    name: 'Restoration Measures for Seagrass',
    material: 'Green',
    location: { type: 'Point', position: 'Offshore' },
    newCode: 'BO',
    scale: 'neighbourhood',
    diagram: 'seagrass',
    disturbance: { primary: 'press', secondary: 'ramp' },
    desc: 'Active restoration of seagrass beds in nearshore coastal waters. Provides sediment stabilisation, wave attenuation, carbon sequestration, and marine habitat.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['seagrass', 'restoration', 'marine habitat', 'sediment stabilisation', 'blue carbon'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-041',
    name: 'Fresh Water Wetland',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'neighbourhood',
    diagram: 'wetland',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Freshwater wetland system providing flood storage, water quality treatment, and ecological habitat in coastal catchment areas.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['freshwater wetland', 'flood storage', 'water quality', 'habitat', 'catchment'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-042',
    name: 'Gravel Trench (French Drain)',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'unit',
    diagram: 'gravel_trench',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Subsurface infiltration trench filled with gravel or aggregate to intercept and disperse surface or subsurface water flows.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['french drain', 'gravel trench', 'infiltration', 'subsurface', 'SUDS'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-043',
    name: 'Water Absorbent Cell',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'unit',
    diagram: 'absorbent_cell',
    disturbance: { primary: 'sustained', secondary: 'null' },
    desc: 'Modular subsurface cell system for stormwater storage and infiltration. Installed beneath paved surfaces to provide distributed water attenuation.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['water cell', 'modular', 'subsurface storage', 'infiltration', 'SUDS'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-044',
    name: 'Percolation System (community-scale)',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'neighbourhood',
    diagram: 'percolation',
    disturbance: { primary: 'sustained', secondary: 'null' },
    desc: 'Community-scale system of subsurface infiltration infrastructure to disperse surface water and reduce coastal flood peaks.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['percolation', 'infiltration', 'community scale', 'stormwater', 'SUDS'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-045',
    name: 'Constructed Wetland',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'neighbourhood',
    diagram: 'wetland',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Engineered wetland system designed for water quality treatment, flood attenuation, and ecological habitat creation in coastal settings.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['constructed wetland', 'water quality', 'treatment', 'ecological design'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-046',
    name: 'ABC Waters Design Features',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'neighbourhood',
    diagram: 'abc_waters',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Singapore',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['ABC Waters', 'Singapore', 'drainage', 'landscape', 'PUB', 'blue-green infrastructure'],
    status: 'draft-unsourced-full-placeholder',
    reviewNotes: 'INCOMPLETE — desc field was truncated in the Sep 2026 reclassification pass (source text cut off after "Singapore"). Needs the original sentence restored before this can be marked sourced.'
  },

  {
    id: 're-047',
    name: 'Retention Pond',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'neighbourhood',
    diagram: 'retention_pond',
    disturbance: { primary: 'sustained', secondary: 'pulse' },
    desc: 'Permanent or seasonal water body designed to retain stormwater and attenuate flood peaks. Can double as ecological and amenity landscape.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['retention pond', 'stormwater', 'attenuation', 'permanent water body', 'SUDS'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-048',
    name: 'Bioswale',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'neighbourhood',
    diagram: 'bioswale',
    disturbance: { primary: 'sustained', secondary: 'null' },
    desc: 'Vegetated drainage channel designed to slow, filter, and infiltrate surface runoff. Reduces peak flows and improves water quality.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['bioswale', 'vegetated channel', 'runoff', 'filtration', 'SUDS', 'green infrastructure'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-049',
    name: 'Rain Garden',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'unit',
    diagram: 'rain_garden',
    disturbance: { primary: 'sustained', secondary: 'null' },
    desc: 'Shallow planted depression that collects and infiltrates stormwater from impervious surfaces. Provides localised attenuation and ecological value.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['rain garden', 'infiltration', 'planting', 'SUDS', 'unit scale'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-050',
    name: 'Percolation System',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'neighbourhood',
    diagram: 'percolation',
    disturbance: { primary: 'sustained', secondary: 'null' },
    desc: 'Network of subsurface infiltration structures to manage stormwater at neighbourhood scale and reduce coastal flood loading.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['percolation', 'subsurface', 'infiltration', 'neighbourhood', 'stormwater'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-051',
    name: 'Water Plaza',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'neighbourhood',
    diagram: 'water_plaza',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Multi-use public space designed to flood temporarily during rain events, functioning as both civic amenity and flood storage. Exemplified by Rotterdam',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['water plaza', 'Rotterdam', 'multi-use', 'civic flooding', 'Benthemplein', 'SUDS'],
    status: 'draft-unsourced-full-placeholder',
    reviewNotes: 'INCOMPLETE — desc field was truncated in the Sep 2026 reclassification pass (source text cut off after "Exemplified by Rotterdam", almost certainly meant to continue "...\'s Benthemplein"). Needs the original sentence restored before this can be marked sourced.'
  },

  {
    id: 're-052',
    name: 'Flood Defence Landscape — Coastal Realignment',
    material: 'Hybrid',
    location: { type: 'Span', start: 'Edge', end: 'Inland' },
    newCode: 'CEI',
    scale: 'territorial',
    diagram: 'hybrid_realignment',
    disturbance: { primary: 'ramp', secondary: 'sustained' },
    desc: 'Hybrid approach combining managed retreat of hard defences with active creation of intertidal habitat zones. Balances protection with ecological and landscape value.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['managed realignment', 'hybrid', 'retreat', 'intertidal landscape'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-053',
    name: 'Seabed Biodiversity (Landscaping Dredging)',
    material: 'Hybrid',
    location: { type: 'Point', position: 'Offshore' },
    newCode: 'CO',
    scale: 'neighbourhood',
    diagram: 'seabed',
    disturbance: { primary: 'press', secondary: 'ramp' },
    desc: 'Strategic dredging and reshaping of the seabed to create varied bathymetric conditions that promote biodiversity and modify wave propagation patterns.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['seabed', 'bathymetry', 'dredging', 'biodiversity', 'wave modification'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-054',
    name: 'Blue Green Roof (district-scale)',
    material: 'Hybrid',
    location: { type: 'Point', position: 'Inland' },
    newCode: 'CI',
    scale: 'neighbourhood',
    diagram: 'blue_green_roof',
    disturbance: { primary: 'sustained', secondary: 'ramp' },
    desc: 'District-scale integration of blue (water retention) and green (vegetated) roof systems across multiple buildings to attenuate stormwater and reduce urban flood peaks.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['blue roof', 'green roof', 'district', 'stormwater retention', 'urban flooding'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-055',
    name: 'Stormwater Detention Tank',
    material: 'Hybrid',
    location: { type: 'Point', position: 'Inland' },
    newCode: 'CI',
    scale: 'neighbourhood',
    diagram: 'detention_tank',
    disturbance: { primary: 'sustained', secondary: 'pulse' },
    desc: 'Subsurface or above-ground storage tank that temporarily holds stormwater during peak events, releasing it slowly to prevent downstream flooding.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['detention tank', 'storage', 'stormwater', 'peak attenuation', 'subsurface'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-056',
    name: 'Mangrove Reforestation / Afforestation',
    material: 'Green',
    location: { type: 'Span', start: 'Edge', end: 'Inland' },
    newCode: 'BEI',
    scale: 'neighbourhood',
    diagram: 'mangrove',
    disturbance: { primary: 'sustained', secondary: 'ramp' },
    desc: 'Active planting and restoration of mangrove ecosystems in intertidal areas. Provides wave attenuation, carbon sequestration, habitat, and livelihood support.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['mangrove', 'reforestation', 'NbS', 'blue carbon', 'tropical', 'livelihood'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-057',
    name: 'Tidal Pools',
    material: 'Green',
    location: { type: 'Span', start: 'Edge', end: 'Shoreline' },
    newCode: 'BES',
    scale: 'unit',
    diagram: 'tidal_pools',
    disturbance: { primary: 'pulse', secondary: 'press' },
    desc: 'Naturally occurring or engineered rock pools in the intertidal zone that support rich biodiversity and contribute to coastal ecological resilience.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['tidal pools', 'intertidal', 'ecology', 'biodiversity', 'rock pools'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-058',
    name: 'Artificial Oyster Reef (Oyster Shells in Cages)',
    material: 'Green',
    location: { type: 'Point', position: 'Offshore' },
    newCode: 'BO',
    scale: 'neighbourhood',
    diagram: 'oyster_reef',
    disturbance: { primary: 'pulse', secondary: 'press' },
    desc: 'Caged oyster shell structures placed in the nearshore zone to attenuate wave energy, filter water, and rebuild native oyster reef habitat.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['oyster reef', 'shellfish', 'water quality', 'habitat restoration', 'filtration'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-059',
    name: 'Floodable Park',
    material: 'Green',
    location: { type: 'Point', position: 'Shoreline' },
    newCode: 'BS',
    scale: 'neighbourhood',
    diagram: 'floodable_park',
    disturbance: { primary: 'sustained', secondary: 'pulse' },
    desc: 'Public park designed to accommodate temporary flooding as part of its normal function. Provides flood storage capacity while maintaining civic amenity between events.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['floodable park', 'multi-use', 'civic', 'flood storage', 'green space'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-060',
    name: 'Blue Green Roof (small-scale)',
    material: 'Green',
    location: { type: 'Point', position: 'Inland' },
    newCode: 'BI',
    scale: 'unit',
    diagram: 'blue_green_roof',
    disturbance: { primary: 'sustained', secondary: 'null' },
    desc: 'Building-scale integrated blue-green roof combining water retention capacity with planted vegetation layer. Attenuates roof runoff and provides urban greening.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['blue roof', 'green roof', 'building scale', 'unit', 'runoff', 'urban greening'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-061',
    name: 'Rain Garden (community LoTek)',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'neighbourhood',
    diagram: 'rain_garden',
    disturbance: { primary: 'sustained', secondary: 'null' },
    desc: 'Community-maintained planted depression collecting and infiltrating runoff from surrounding surfaces. Low-technology, high-ecological-value urban water management.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['rain garden', 'community', 'LoTek', 'infiltration', 'low-tech', 'civic planting'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-062',
    name: 'Dry Pond',
    material: 'Green',
    location: { type: 'Span', start: 'Shoreline', end: 'Inland' },
    newCode: 'BSI',
    scale: 'neighbourhood',
    diagram: 'dry_pond',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Normally dry depression designed to temporarily store floodwater during peak events. Doubles as open space, play area, or ecological habitat when dry.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['dry pond', 'detention', 'temporary storage', 'multi-use', 'green space'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-063',
    name: 'Floodable Park (amphibious variant)',
    material: 'Green',
    location: { type: 'Span', start: 'Offshore', end: 'Shoreline' },
    newCode: 'BOS',
    scale: 'neighbourhood',
    diagram: 'amphibious_park',
    disturbance: { primary: 'press', secondary: 'ramp' },
    desc: 'Amphibious civic landscape designed to rise or transition with floodwaters rather than resist them. Structural and landscape elements accommodate sustained or gradual inundation.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['amphibious', 'floodable', 'civic', 'adaptive landscape', 'press tolerance'],
    status: 'sourced',
    reviewNotes: null
  },

  {
    id: 're-064',
    name: 'Coastal Closure Dam',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'territorial',
    diagram: 'closure_dam',
    disturbance: { primary: 'ramp', secondary: 'pulse' },
    desc: 'Temporary closure dam constructed at the coastal edge to seal an inlet or breach during construction or emergency works, later removed once permanent defences are complete.',
    source: 'PENDING — see Regional CPM Authorities Tracker',
    tags: ['closure dam', 'edge', 'temporary', 'construction', 'hard engineering'],
    status: 'draft-unsourced',
    reviewNotes: 'New object added by Zyzaah, Sep 2026. Disturbance classification copied from re-005 as placeholder, needs independent review. Source pending authority-tracker follow-up.'
  },

  {
    id: 're-065',
    name: 'Caisson',
    material: 'Grey',
    location: { type: 'Point', position: 'Offshore' },
    newCode: 'AO',
    scale: 'territorial',
    diagram: 'closure_dam',
    disturbance: { primary: 'ramp', secondary: 'pulse' },
    desc: 'Permanent offshore caisson structure used as a fixed closure or foundation element, remaining in place indefinitely rather than being removed after construction.',
    source: 'PENDING — see Regional CPM Authorities Tracker',
    tags: ['caisson', 'offshore', 'permanent', 'hard engineering', 'territorial'],
    status: 'draft-unsourced',
    reviewNotes: 'New object added by Zyzaah, Sep 2026. Disturbance classification copied from re-005 as placeholder, needs independent review. Source pending authority-tracker follow-up.'
  },

  {
    id: 're-066',
    name: 'Seawall',
    material: 'Grey',
    location: { type: 'Point', position: 'Edge' },
    newCode: 'AE',
    scale: 'neighbourhood',
    diagram: 'seawall',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Vertical or steeply sloped hard structure built along the shoreline edge to prevent erosion and hold back wave and tidal action, distinct from a revetment in its typically vertical profile and from a wave wall in providing primary rather than supplementary defence.',
    source: 'PENDING — Claude-drafted placeholder, not yet sourced',
    tags: ['seawall', 'hard engineering', 'vertical', 'edge defence'],
    status: 'draft-unsourced-full-placeholder',
    reviewNotes: 'New object added by Zyzaah, Sep 2026. Description, tags, scale, and disturbance are Claude-drafted placeholders (no verbal or source input given beyond location) — needs full review before treating as sourced, same as the other 63 objects originally were.'
  },

];
