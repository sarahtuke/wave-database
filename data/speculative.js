/**
 * WAVE CATALOGUE — data/speculative.js
 * Speculative/design-imaginary CPM objects, classified on the same
 * cross-shore Position (x-axis) x Material (y-axis) matrix as
 * data/standard.js and data/studies.js.
 *
 * position — one of 'Offshore' | 'Edge' | 'Shoreline' | 'Inland'
 * material — one of 'Grey' | 'Hybrid' | 'Green'
 * The matrix cell id (e.g. 'EDG-HYB') is derived at runtime via
 * cellId(position, material) in index.html — not stored here, so it
 * never drifts out of sync with the position/material fields.
 *
 * Reclassified Sep 2026 (Sarah Luposo Tuké-Shongwe) from the original
 * ad-hoc typology_id codes ('1C', '3E', ...), which predated the
 * Position x Material matrix and grouped objects too coarsely (all of
 * obj-001..003 shared '1C' despite occupying different cross-shore
 * positions). See project journal for the reclassification notes below.
 */

var SPECULATIVE=[
  {
    id:'obj-001',position:'Offshore',material:'Hybrid',
    name:'Interlocking Reef Module',author:'Lee Wei Xian',year:2024,
    description:'Hexagonal interlocking unit speculated to attenuate wave energy through submerged stacked deployment. Geometry inspired by natural reef formations along Northeast Atlantic coastlines. Designed for modular scalability.',
    coastal_context:'Moderate-to-high wave energy, sandy seabed, 1–6 m water depth',
    scale:'1–10 m · unit',footprint:{rows:3,cols:4},
    location:{lat:52.155,lng:4.220,label:'South Holland Coast, Netherlands (intended)'},src:null
  },
  {
    id:'obj-002',position:'Edge',material:'Hybrid',
    name:'Porous Berm Wedge',author:'Amara Diallo',year:2024,
    description:'Modular porous concrete wedge unit for berm construction along engineered shorelines. Irregular void structure promotes hydrodynamic energy dissipation and ecological colonization.',
    coastal_context:'High wave energy shorelines, urban coastal edges, 0–3 m depth',
    scale:'1–5 m · unit',footprint:{rows:2,cols:3},
    location:{lat:51.477,lng:1.000,label:'Thames Estuary, UK (intended)'},src:null
  },
  {
    id:'obj-003',position:'Shoreline',material:'Green',
    name:'Sacrificial Dune Armature',author:'Priya Nair',year:2023,
    description:'Lightweight geotextile-wrapped armature to scaffold engineered dune formation in sediment-scarce contexts. Designed to erode predictably while retaining core structural geometry.',
    coastal_context:'Sediment-scarce urbanized coasts, low-gradient foreshore, storm surge exposure',
    scale:'10–50 m · module',footprint:{rows:4,cols:7},
    location:{lat:39.918,lng:-74.006,label:'Mid-Atlantic Coast, USA (intended)'},src:null
  },
  {
    id:'obj-004',position:'Shoreline',material:'Green',
    name:'Mangrove Propagule Housing',author:'Rafael Santos',year:2024,
    description:'Low-tech bamboo and coir mesh structure to protect and guide mangrove propagules during the critical establishment phase. Biodegradable over a 3–5 year cycle, leaving only the established root network.',
    coastal_context:'Tropical intertidal zones, sheltered bays, estuarine margins, 0–1 m tidal range',
    scale:'0.5–2 m · unit',footprint:{rows:1,cols:2},
    location:{lat:1.352,lng:103.820,label:'Singapore Coast (intended)'},src:null
  },
  {
    id:'obj-005',position:'Edge',material:'Hybrid',
    name:'Tidal Gate Aquaculture Unit',author:'Nurul Ain binti Razak',year:2023,
    description:'Modular brackish water gate unit for integration into community silvofishery embankments. Allows tidal exchange regulation without mechanical components. Designed for local fabrication.',
    coastal_context:'Tropical mangrove-adjacent ponds, estuarine tidal range 1–3 m, community-managed systems',
    scale:'2–8 m · gate',footprint:{rows:2,cols:5},
    location:{lat:3.141,lng:101.687,label:'Strait of Malacca, Malaysia (intended)'},src:null
  }
];
