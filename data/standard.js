/**
 * WAVE CATALOGUE — data/standard.js
 * Real-world CPM objects from Adaptation Measures Catalogue (Celine)
 * Matrix assignments: Sarah Luposo Tuké-Shongwe (final call, June 2026)
 *
 * Load order in index.html:
 *   <script src="data/realistic.js"></script>
 *
 * Each object:
 *   id          — unique identifier, format re-NNN
 *   name        — CPM display name
 *   typology_id — matrix cell code (function + group, e.g. "1A")
 *   group       — group type code: A B C D E
 *   fn          — function code: 1 2 3 4
 *   scale       — 'unit' | 'neighbourhood' | 'territorial'
 *   diagram     — SVG diagram key (see renderDiagram() in index)
 *   disturbance — { primary, secondary } using pulse|sustained|press|ramp|null
 *   desc        — short display description (1–2 sentences)
 *   source      — attribution string
 *   tags        — array of additional searchable tags
 */

var REALISTIC = [

  // ── 1A · Grey · Edge Defense ────────────────────────────────────────

  {
    id: 're-001',
    name: 'Coastal Revetment',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'neighbourhood',
    diagram: 'revetment',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Sloped or stepped hard structure of rock armour, concrete units, or gabions placed on a shoreline to dissipate wave energy and resist erosion.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['rock armour', 'hard engineering', 'wave attenuation', 'revetment']
  },

  {
    id: 're-002',
    name: 'Offshore Parallel Breakwater (Emerged/Submerged)',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'neighbourhood',
    diagram: 'breakwater',
    disturbance: { primary: 'pulse', secondary: null },
    desc: 'Structure placed parallel to the shoreline to reduce wave energy reaching the coast. Emerged or submerged; can induce tombolo formation over time.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['breakwater', 'offshore', 'wave energy', 'hard engineering']
  },

  {
    id: 're-003',
    name: 'Nearshore Parallel Breakwater (Tombolo Formation)',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'neighbourhood',
    diagram: 'tombolo',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Nearshore breakwater positioned to induce sediment accumulation and tombolo formation, creating a sheltered beach landform over time.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['tombolo', 'nearshore', 'sediment', 'breakwater']
  },

  {
    id: 're-004',
    name: 'Storm Surge Barrier (Movable)',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'territorial',
    diagram: 'surge_barrier',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Large-scale movable barrier that closes during storm surge events to protect hinterland. Remains open under normal tidal conditions.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['surge barrier', 'movable', 'Thames Barrier', 'Maeslant', 'territorial scale']
  },

  {
    id: 're-005',
    name: 'Offshore Closure Dam (Emerged, Impervious)',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'territorial',
    diagram: 'closure_dam',
    disturbance: { primary: 'ramp', secondary: 'pulse' },
    desc: 'Permanent emerged impervious dam closing off a bay or estuary from the sea. Provides absolute protection but eliminates tidal exchange.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['closure dam', 'permanent', 'hard engineering', 'territorial']
  },

  {
    id: 're-006',
    name: 'Dyke Raising',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'territorial',
    diagram: 'dyke',
    disturbance: { primary: 'ramp', secondary: 'sustained' },
    desc: 'Raising the crest height of existing dykes to increase freeboard against rising sea levels and storm surges. Standard adaptive measure in low-lying deltas.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['dyke', 'embankment', 'Netherlands', 'adaptive raising', 'SLR']
  },

  {
    id: 're-007',
    name: 'Wave Wall',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'neighbourhood',
    diagram: 'wave_wall',
    disturbance: { primary: 'pulse', secondary: null },
    desc: 'Vertical or recurved concrete wall placed at the top of a beach or revetment to deflect wave overtopping. Compact and often retrofit-applied.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['wave wall', 'overtopping', 'recurved', 'concrete']
  },

  {
    id: 're-008',
    name: 'Watertight Flood Dyke / Embankment',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'territorial',
    diagram: 'dyke',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Impermeable earthen or concrete embankment forming a continuous flood defence line along a shoreline or riverbank.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['dyke', 'embankment', 'impermeable', 'flood defence']
  },

  {
    id: 're-009',
    name: 'Perpendicular Groynes',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'neighbourhood',
    diagram: 'groynes',
    disturbance: { primary: 'pulse', secondary: 'ramp' },
    desc: 'Shore-perpendicular structures that interrupt longshore sediment transport to retain beach material. Typically timber, rock, or concrete.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['groynes', 'longshore drift', 'sediment', 'beach retention']
  },

  {
    id: 're-010',
    name: 'Setback Flood Defence Wall or Embankment',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'territorial',
    diagram: 'setback_wall',
    disturbance: { primary: 'sustained', secondary: 'ramp' },
    desc: 'Flood defence line set back from the active shoreline, allowing a buffer zone or foreshore to absorb initial wave energy before the wall.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['setback', 'flood wall', 'buffer zone', 'defence line']
  },

  {
    id: 're-011',
    name: 'Permanent Standing Flood Walls',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'neighbourhood',
    diagram: 'flood_wall',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Fixed vertical walls of concrete or sheet piling providing permanent flood protection to urban waterfronts and coastal developments.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['flood wall', 'permanent', 'sheet piling', 'concrete']
  },

  {
    id: 're-012',
    name: 'Mobile Flood Walls',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'neighbourhood',
    diagram: 'mobile_wall',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Demountable wall systems deployed ahead of flood events. Provides flexible protection where permanent walls are not feasible or desirable.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['mobile', 'deployable', 'temporary', 'demountable wall']
  },

  {
    id: 're-013',
    name: 'Operable Flood Barrier',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'neighbourhood',
    diagram: 'operable_barrier',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Fixed barrier with operable gate sections allowing normal access or tidal flow while providing closure capacity during flood events.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['operable', 'gate', 'barrier', 'flood control']
  },

  {
    id: 're-014',
    name: 'Deployable Flood Barrier',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'neighbourhood',
    diagram: 'mobile_wall',
    disturbance: { primary: 'pulse', secondary: null },
    desc: 'Rapid-deployment barrier system stored off-site and assembled at flood entry points. Suitable for irregular or infrequent flood events.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['deployable', 'rapid response', 'temporary barrier']
  },

  {
    id: 're-015',
    name: 'Self-raising Barrier',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'neighbourhood',
    diagram: 'operable_barrier',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Automated barrier that rises in response to rising water levels without manual intervention. Often used at access points and underpasses.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['automatic', 'self-raising', 'automated barrier', 'passive activation']
  },

  {
    id: 're-016',
    name: 'Retrofit Flood Barrier',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'unit',
    diagram: 'flood_wall',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Property-level barrier applied to existing door and window openings to resist floodwater entry. Installed in advance of or during a flood event.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['retrofit', 'property-level', 'doorstep', 'unit scale']
  },

  {
    id: 're-017',
    name: 'Temporary Flood Barrier',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'neighbourhood',
    diagram: 'mobile_wall',
    disturbance: { primary: 'pulse', secondary: null },
    desc: 'Rapidly deployable temporary barriers — sandbags, water-filled tubes, or modular panels — for emergency flood response at neighbourhood scale.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['temporary', 'sandbags', 'emergency', 'modular panels']
  },

  {
    id: 're-018',
    name: 'Sluice Gates',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'neighbourhood',
    diagram: 'sluice',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Controlled openings in flood defences allowing managed water flow under normal conditions with closure capacity during flood events.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['sluice', 'tidal gate', 'controlled opening', 'water management']
  },

  {
    id: 're-019',
    name: 'Saddle Dam',
    typology_id: '1A', group: 'A', fn: '1',
    scale: 'territorial',
    diagram: 'dyke',
    disturbance: { primary: 'sustained', secondary: 'pulse' },
    desc: 'Subsidiary dam structure closing a topographic low point adjacent to a main water body to prevent flanking during flood events.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['saddle dam', 'subsidiary', 'flanking protection', 'dam']
  },

  // ── 1B · Green · Edge Defense ────────────────────────────────────────

  {
    id: 're-020',
    name: 'Coastal Nourishment',
    typology_id: '1B', group: 'B', fn: '1',
    scale: 'territorial',
    diagram: 'nourishment',
    disturbance: { primary: 'pulse', secondary: 'ramp' },
    desc: 'Addition of sand or sediment to an eroding beach or dune system to restore natural wave attenuation capacity and ecological habitat.',
    source: 'Adaptation Measures Catalogue (Celine)',
    workshop: true,
    tags: ['beach nourishment', 'sediment', 'sand', 'erosion management', 'NbS']
  },

  {
    id: 're-021',
    name: 'Breakwater Reefs',
    typology_id: '1B', group: 'B', fn: '1',
    scale: 'neighbourhood',
    diagram: 'reef',
    disturbance: { primary: 'pulse', secondary: 'press' },
    desc: 'Artificial reef structures designed to reduce wave energy while promoting marine biodiversity. Can be constructed from recycled or ecological modules.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['reef', 'artificial reef', 'biodiversity', 'wave attenuation', 'NbS']
  },

  {
    id: 're-022',
    name: 'Vegetated Sand Dune',
    typology_id: '1B', group: 'B', fn: '1',
    scale: 'neighbourhood',
    diagram: 'dune',
    disturbance: { primary: 'pulse', secondary: 'ramp' },
    desc: 'Naturally or artificially established sand dune system stabilised by coastal vegetation. Functions as a flexible energy-absorbing barrier.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['dune', 'sand', 'vegetation', 'coastal NbS', 'marram grass']
  },

  {
    id: 're-023',
    name: 'Artificial Reef Unit',
    typology_id: '1B', group: 'B', fn: '1',
    scale: 'neighbourhood',
    diagram: 'reef_unit',
    disturbance: { primary: 'pulse', secondary: 'press' },
    desc: 'Prefabricated modular reef unit placed on the seabed to attenuate waves and provide structured habitat for marine colonisation.',
    source: 'Adaptation Measures Catalogue (Celine)',
    workshop: true,
    tags: ['modular reef', 'prefabricated', 'habitat', 'wave reduction']
  },

  {
    id: 're-024',
    name: 'Eco Tiles',
    typology_id: '1B', group: 'B', fn: '1',
    scale: 'unit',
    diagram: 'eco_tiles',
    disturbance: { primary: 'press', secondary: 'pulse' },
    desc: 'Textured or structured tiles applied to hard coastal surfaces to provide ecological habitat for intertidal organisms while maintaining flood protection function.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['eco tiles', 'ecological enhancement', 'intertidal', 'retrofit ecology']
  },

  {
    id: 're-025',
    name: 'Artificial Reefs',
    typology_id: '1B', group: 'B', fn: '1',
    scale: 'neighbourhood',
    diagram: 'reef',
    disturbance: { primary: 'pulse', secondary: 'press' },
    desc: 'Submerged structures — including repurposed materials — placed offshore to modify wave energy and create marine habitat at neighbourhood scale.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['artificial reef', 'offshore', 'habitat', 'submerged structure']
  },

  // ── 1C · Hybrid · Edge Defense ───────────────────────────────────────

  {
    id: 're-026',
    name: 'Flood Defence Landscape – Double Dike',
    typology_id: '1C', group: 'C', fn: '1',
    scale: 'territorial',
    diagram: 'double_dike',
    disturbance: { primary: 'ramp', secondary: 'sustained' },
    desc: 'Two parallel dike structures with an inter-dike zone accommodating tidal inflow, reducing hydraulic load on the inner dike while creating ecological and productive landscape value.',
    source: 'Adaptation Measures Catalogue (Celine)',
    workshop: true,
    tags: ['double dike', 'inter-dike', 'tidal', 'hybrid', 'Netherlands']
  },

  {
    id: 're-027',
    name: 'Perched Beach',
    typology_id: '1C', group: 'C', fn: '1',
    scale: 'neighbourhood',
    diagram: 'perched_beach',
    disturbance: { primary: 'pulse', secondary: 'ramp' },
    desc: 'Artificially elevated beach created by placing sediment on a submerged sill or platform. Combines structural support with beach nourishment to maintain elevation.',
    source: 'Adaptation Measures Catalogue (Celine)',
    workshop: true,
    tags: ['perched beach', 'nourishment', 'sill', 'hybrid beach']
  },

  {
    id: 're-028',
    name: 'Offshore Barrier Island',
    typology_id: '1C', group: 'C', fn: '1',
    scale: 'territorial',
    diagram: 'barrier_island',
    disturbance: { primary: 'pulse', secondary: 'ramp' },
    desc: 'Natural or engineered island placed offshore to attenuate wave energy and provide ecological habitat. Acts as a living coastal buffer at territorial scale.',
    source: 'Adaptation Measures Catalogue (Celine)',
    workshop: true,
    tags: ['barrier island', 'offshore', 'territorial', 'island ecology']
  },

  {
    id: 're-029',
    name: 'Rich (Ecological) Hard Coastal Enhancement',
    typology_id: '1C', group: 'C', fn: '1',
    scale: 'neighbourhood',
    diagram: 'eco_revetment',
    disturbance: { primary: 'pulse', secondary: 'press' },
    desc: 'Enhancement of existing hard coastal structures with ecological features — pools, textures, biodiversity habitats — layered onto revetments, seawalls, and breakwaters.',
    source: 'Adaptation Measures Catalogue (Celine)',
    workshop: true,
    tags: ['ecological enhancement', 'hard structures', 'biodiversity', 'hybrid']
  },

  // ── 2A · Grey · Shoreline Inundation ─────────────────────────────────

  {
    id: 're-030',
    name: 'Land Reclamation',
    typology_id: '2A', group: 'A', fn: '2',
    scale: 'territorial',
    diagram: 'reclamation',
    disturbance: { primary: 'ramp', secondary: 'press' },
    desc: 'Creation of new land areas by filling coastal waters or tidal flats. Raises ground elevation above flood risk levels and expands developable land.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['reclamation', 'infill', 'land creation', 'Singapore', 'territorial']
  },

  {
    id: 're-031',
    name: 'Land Raising / Embankment',
    typology_id: '2A', group: 'A', fn: '2',
    scale: 'territorial',
    diagram: 'land_raise',
    disturbance: { primary: 'ramp', secondary: 'press' },
    desc: 'Raising ground levels through earthworks to bring areas above projected flood levels. Applied at district to territorial scale.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['land raising', 'earthworks', 'ground level', 'SLR adaptation']
  },

  {
    id: 're-032',
    name: 'Levees',
    typology_id: '2A', group: 'A', fn: '2',
    scale: 'territorial',
    diagram: 'dyke',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Earthen embankments along riverbanks or shorelines designed to contain floodwater within defined channels and prevent inundation of adjacent land.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['levee', 'earthen embankment', 'flood containment', 'river', 'delta']
  },

  {
    id: 're-033',
    name: 'Local Land Raising',
    typology_id: '2A', group: 'A', fn: '2',
    scale: 'neighbourhood',
    diagram: 'land_raise',
    disturbance: { primary: 'press', secondary: 'ramp' },
    desc: 'Localised raising of ground levels in specific neighbourhoods or plots to elevate buildings and infrastructure above projected flood levels.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['local land raising', 'neighbourhood', 'ground raising', 'flood risk']
  },

  {
    id: 're-034',
    name: 'Building Platform / Floor Raising',
    typology_id: '2A', group: 'A', fn: '2',
    scale: 'unit',
    diagram: 'elevated',
    disturbance: { primary: 'press', secondary: 'ramp' },
    desc: 'Raising finished floor levels or building platforms above design flood levels. Applied at building scale as part of new construction or retrofit.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['floor raising', 'platform', 'building scale', 'unit', 'retrofit']
  },

  {
    id: 're-035',
    name: 'Bypass / Diversion Channel',
    typology_id: '2A', group: 'A', fn: '2',
    scale: 'territorial',
    diagram: 'channel',
    disturbance: { primary: 'sustained', secondary: 'pulse' },
    desc: 'Engineered channel that diverts excess flood flows away from protected areas. Reduces peak water levels in vulnerable zones during high flow events.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['bypass channel', 'diversion', 'flood routing', 'engineered channel']
  },

  // ── 2B · Green · Shoreline Inundation ────────────────────────────────

  {
    id: 're-036',
    name: 'Natural Tidal Vegetated Foreshore',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'neighbourhood',
    diagram: 'foreshore',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Naturally established saltmarsh or mangrove foreshore that attenuates wave energy and provides ecological habitat through natural succession processes.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['saltmarsh', 'mangrove', 'foreshore', 'NbS', 'succession', 'tidal']
  },

  {
    id: 're-037',
    name: 'Constructed Foreshore – Tidal Park / Wetland',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'neighbourhood',
    diagram: 'tidal_park',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Engineered intertidal landscape combining wave attenuation, ecological habitat, and public programming. Designed to function as both flood buffer and civic amenity.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['tidal park', 'wetland', 'constructed', 'civic', 'NbS', 'green infrastructure']
  },

  {
    id: 're-038',
    name: 'Coastal Realignment',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'territorial',
    diagram: 'realignment',
    disturbance: { primary: 'ramp', secondary: 'press' },
    desc: 'Deliberate breaching or removal of existing coastal defences to allow natural shoreline migration inland. Creates new intertidal habitat and reduces flood risk.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['managed realignment', 'retreat', 'shoreline migration', 'intertidal creation']
  },

  {
    id: 're-039',
    name: 'Restoring Salinity Gradients / Tidal Dynamics',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'neighbourhood',
    diagram: 'tidal_restoration',
    disturbance: { primary: 'press', secondary: 'sustained' },
    desc: 'Restoration of tidal exchange and salinity gradients in impounded or degraded coastal wetlands to re-establish natural ecological and flood buffering function.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['tidal restoration', 'salinity', 'estuarine', 'ecological restoration']
  },

  {
    id: 're-040',
    name: 'Restoration Measures for Seagrass',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'neighbourhood',
    diagram: 'seagrass',
    disturbance: { primary: 'press', secondary: 'ramp' },
    desc: 'Active restoration of seagrass beds in nearshore coastal waters. Provides sediment stabilisation, wave attenuation, carbon sequestration, and marine habitat.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['seagrass', 'restoration', 'marine habitat', 'sediment stabilisation', 'blue carbon']
  },

  {
    id: 're-041',
    name: 'Fresh Water Wetland',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'neighbourhood',
    diagram: 'wetland',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Freshwater wetland system providing flood storage, water quality treatment, and ecological habitat in coastal catchment areas.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['freshwater wetland', 'flood storage', 'water quality', 'habitat', 'catchment']
  },

  {
    id: 're-042',
    name: 'Gravel Trench (French Drain)',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'unit',
    diagram: 'gravel_trench',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Subsurface infiltration trench filled with gravel or aggregate to intercept and disperse surface or subsurface water flows.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['french drain', 'gravel trench', 'infiltration', 'subsurface', 'SUDS']
  },

  {
    id: 're-043',
    name: 'Water Absorbent Cell',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'unit',
    diagram: 'absorbent_cell',
    disturbance: { primary: 'sustained', secondary: null },
    desc: 'Modular subsurface cell system for stormwater storage and infiltration. Installed beneath paved surfaces to provide distributed water attenuation.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['water cell', 'modular', 'subsurface storage', 'infiltration', 'SUDS']
  },

  {
    id: 're-044',
    name: 'Percolation System (community-scale)',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'neighbourhood',
    diagram: 'percolation',
    disturbance: { primary: 'sustained', secondary: null },
    desc: 'Community-scale system of subsurface infiltration infrastructure to disperse surface water and reduce coastal flood peaks.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['percolation', 'infiltration', 'community scale', 'stormwater', 'SUDS']
  },

  {
    id: 're-045',
    name: 'Constructed Wetland',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'neighbourhood',
    diagram: 'wetland',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Engineered wetland system designed for water quality treatment, flood attenuation, and ecological habitat creation in coastal settings.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['constructed wetland', 'water quality', 'treatment', 'ecological design']
  },

  {
    id: 're-046',
    name: 'ABC Waters Design Features',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'neighbourhood',
    diagram: 'abc_waters',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Singapore\'s Active, Beautiful, Clean Waters design approach integrating drainage channels into landscape features. Combines flood management with civic amenity.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['ABC Waters', 'Singapore', 'drainage', 'landscape', 'PUB', 'blue-green infrastructure']
  },

  {
    id: 're-047',
    name: 'Retention Pond',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'neighbourhood',
    diagram: 'retention_pond',
    disturbance: { primary: 'sustained', secondary: 'pulse' },
    desc: 'Permanent or seasonal water body designed to retain stormwater and attenuate flood peaks. Can double as ecological and amenity landscape.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['retention pond', 'stormwater', 'attenuation', 'permanent water body', 'SUDS']
  },

  {
    id: 're-048',
    name: 'Bioswale',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'neighbourhood',
    diagram: 'bioswale',
    disturbance: { primary: 'sustained', secondary: null },
    desc: 'Vegetated drainage channel designed to slow, filter, and infiltrate surface runoff. Reduces peak flows and improves water quality.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['bioswale', 'vegetated channel', 'runoff', 'filtration', 'SUDS', 'green infrastructure']
  },

  {
    id: 're-049',
    name: 'Rain Garden',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'unit',
    diagram: 'rain_garden',
    disturbance: { primary: 'sustained', secondary: null },
    desc: 'Shallow planted depression that collects and infiltrates stormwater from impervious surfaces. Provides localised attenuation and ecological value.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['rain garden', 'infiltration', 'planting', 'SUDS', 'unit scale']
  },

  {
    id: 're-050',
    name: 'Percolation System',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'neighbourhood',
    diagram: 'percolation',
    disturbance: { primary: 'sustained', secondary: null },
    desc: 'Network of subsurface infiltration structures to manage stormwater at neighbourhood scale and reduce coastal flood loading.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['percolation', 'subsurface', 'infiltration', 'neighbourhood', 'stormwater']
  },

  {
    id: 're-051',
    name: 'Water Plaza',
    typology_id: '2B', group: 'B', fn: '2',
    scale: 'neighbourhood',
    diagram: 'water_plaza',
    disturbance: { primary: 'sustained', secondary: 'press' },
    desc: 'Multi-use public space designed to flood temporarily during rain events, functioning as both civic amenity and flood storage. Exemplified by Rotterdam\'s Benthemplein.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['water plaza', 'Rotterdam', 'multi-use', 'civic flooding', 'Benthemplein', 'SUDS']
  },

  // ── 2C · Hybrid · Shoreline Inundation ───────────────────────────────

  {
    id: 're-052',
    name: 'Flood Defence Landscape – Coastal Realignment',
    typology_id: '2C', group: 'C', fn: '2',
    scale: 'territorial',
    diagram: 'hybrid_realignment',
    disturbance: { primary: 'ramp', secondary: 'sustained' },
    desc: 'Hybrid approach combining managed retreat of hard defences with active creation of intertidal habitat zones. Balances protection with ecological and landscape value.',
    source: 'Adaptation Measures Catalogue (Celine)',
    workshop: true,
    tags: ['managed realignment', 'hybrid', 'retreat', 'intertidal landscape']
  },

  {
    id: 're-053',
    name: 'Seabed Biodiversity (Landscaping Dredging)',
    typology_id: '2C', group: 'C', fn: '2',
    scale: 'neighbourhood',
    diagram: 'seabed',
    disturbance: { primary: 'press', secondary: 'ramp' },
    desc: 'Strategic dredging and reshaping of the seabed to create varied bathymetric conditions that promote biodiversity and modify wave propagation patterns.',
    source: 'Adaptation Measures Catalogue (Celine)',
    workshop: true,
    tags: ['seabed', 'bathymetry', 'dredging', 'biodiversity', 'wave modification']
  },

  {
    id: 're-054',
    name: 'Blue Green Roof (district-scale)',
    typology_id: '2C', group: 'C', fn: '2',
    scale: 'neighbourhood',
    diagram: 'blue_green_roof',
    disturbance: { primary: 'sustained', secondary: 'ramp' },
    desc: 'District-scale integration of blue (water retention) and green (vegetated) roof systems across multiple buildings to attenuate stormwater and reduce urban flood peaks.',
    source: 'Adaptation Measures Catalogue (Celine)',
    workshop: true,
    tags: ['blue roof', 'green roof', 'district', 'stormwater retention', 'urban flooding']
  },

  {
    id: 're-055',
    name: 'Stormwater Detention Tank',
    typology_id: '2C', group: 'C', fn: '2',
    scale: 'neighbourhood',
    diagram: 'detention_tank',
    disturbance: { primary: 'sustained', secondary: 'pulse' },
    desc: 'Subsurface or above-ground storage tank that temporarily holds stormwater during peak events, releasing it slowly to prevent downstream flooding.',
    source: 'Adaptation Measures Catalogue (Celine)',
    workshop: true,
    tags: ['detention tank', 'storage', 'stormwater', 'peak attenuation', 'subsurface']
  },

  // ── 3B · Green · Productive Landscapes ───────────────────────────────

  {
    id: 're-056',
    name: 'Mangrove Reforestation / Afforestation',
    typology_id: '3B', group: 'B', fn: '3',
    scale: 'neighbourhood',
    diagram: 'mangrove',
    disturbance: { primary: 'sustained', secondary: 'ramp' },
    desc: 'Active planting and restoration of mangrove ecosystems in intertidal areas. Provides wave attenuation, carbon sequestration, habitat, and livelihood support.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['mangrove', 'reforestation', 'NbS', 'blue carbon', 'tropical', 'livelihood']
  },

  {
    id: 're-057',
    name: 'Tidal Pools',
    typology_id: '3B', group: 'B', fn: '3',
    scale: 'unit',
    diagram: 'tidal_pools',
    disturbance: { primary: 'pulse', secondary: 'press' },
    desc: 'Naturally occurring or engineered rock pools in the intertidal zone that support rich biodiversity and contribute to coastal ecological resilience.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['tidal pools', 'intertidal', 'ecology', 'biodiversity', 'rock pools']
  },

  {
    id: 're-058',
    name: 'Artificial Oyster Reef (Oyster Shells in Cages)',
    typology_id: '3B', group: 'B', fn: '3',
    scale: 'neighbourhood',
    diagram: 'oyster_reef',
    disturbance: { primary: 'pulse', secondary: 'press' },
    desc: 'Caged oyster shell structures placed in the nearshore zone to attenuate wave energy, filter water, and rebuild native oyster reef habitat.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['oyster reef', 'shellfish', 'water quality', 'habitat restoration', 'filtration']
  },

  // ── 4B · Green · Civic Living ─────────────────────────────────────────

  {
    id: 're-059',
    name: 'Floodable Park',
    typology_id: '4B', group: 'B', fn: '4',
    scale: 'neighbourhood',
    diagram: 'floodable_park',
    disturbance: { primary: 'sustained', secondary: 'pulse' },
    desc: 'Public park designed to accommodate temporary flooding as part of its normal function. Provides flood storage capacity while maintaining civic amenity between events.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['floodable park', 'multi-use', 'civic', 'flood storage', 'green space']
  },

  {
    id: 're-060',
    name: 'Blue Green Roof (small-scale)',
    typology_id: '4B', group: 'B', fn: '4',
    scale: 'unit',
    diagram: 'blue_green_roof',
    disturbance: { primary: 'sustained', secondary: null },
    desc: 'Building-scale integrated blue-green roof combining water retention capacity with planted vegetation layer. Attenuates roof runoff and provides urban greening.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['blue roof', 'green roof', 'building scale', 'unit', 'runoff', 'urban greening']
  },

  {
    id: 're-061',
    name: 'Rain Garden (community LoTek)',
    typology_id: '4B', group: 'B', fn: '4',
    scale: 'neighbourhood',
    diagram: 'rain_garden',
    disturbance: { primary: 'sustained', secondary: null },
    desc: 'Community-maintained planted depression collecting and infiltrating runoff from surrounding surfaces. Low-technology, high-ecological-value urban water management.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['rain garden', 'community', 'LoTek', 'infiltration', 'low-tech', 'civic planting']
  },

  {
    id: 're-062',
    name: 'Dry Pond',
    typology_id: '4B', group: 'B', fn: '4',
    scale: 'neighbourhood',
    diagram: 'dry_pond',
    disturbance: { primary: 'pulse', secondary: 'sustained' },
    desc: 'Normally dry depression designed to temporarily store floodwater during peak events. Doubles as open space, play area, or ecological habitat when dry.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['dry pond', 'detention', 'temporary storage', 'multi-use', 'green space']
  },

  // ── 4D · Amphibious · Civic Living ────────────────────────────────────

  {
    id: 're-063',
    name: 'Floodable Park (amphibious variant)',
    typology_id: '4D', group: 'D', fn: '4',
    scale: 'neighbourhood',
    diagram: 'amphibious_park',
    disturbance: { primary: 'press', secondary: 'ramp' },
    desc: 'Amphibious civic landscape designed to rise or transition with floodwaters rather than resist them. Structural and landscape elements accommodate sustained or gradual inundation.',
    source: 'Adaptation Measures Catalogue (Celine)',
    tags: ['amphibious', 'floodable', 'civic', 'adaptive landscape', 'press tolerance']
  }

];
