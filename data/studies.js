/**
 * Location model note (Sep 2026): the existing `position`/`material` fields
 * on each record are a single cross-shore point, already used by index.html's
 * studiesForCell() to place studies on Screen One's Position × Material matrix.
 * `location` (added below) extends this to the same three-shape model used in
 * data/standard.js — Point / Span / Discrete-multi — for cases whose real
 * footprint isn't a single point. `position`/`material` are left untouched
 * for backward compatibility with the existing matrix-cell lookup; index.html
 * does not yet consume `location` for studies (only for Standard Objects via
 * standardObjectsForCell()) — wiring that up is a follow-on, not done here.
 *
 * `location_status`: 'confirmed' | 'low-confidence' — whether the shape/extent
 * was determined with reasonable confidence from the study's own typological/
 * operational description and site data, or is a provisional draft pending
 * Sarah's review (see `location_reviewNotes`). Do not treat 'low-confidence'
 * records as settled — override in that field once reviewed.
 *
 * SLR corpus import (Oct 2026): nine records added from the combined template
 * corpus (B-19-ACCH, B-16-SWGC, C-24-GED, B-97-LTHC, B-15-HGNS, C-21-GCA,
 * A-18-DPWF, B-20-CHA, A-24-AMPH). Their text fields are transcribed from the
 * corpus. The interpretive fields the corpus does not contain are left null
 * rather than guessed, and listed in `import_review.unverified`:
 *   position, material, location, provenance, land_use_relationality,
 *   structural_mode, strategic_intent, scale, and every anchor `score`.
 * Consequences in the UI: these records do not appear on Screen One's matrix
 * (no position/material), show "no data" for provenance/relationality, and
 * fall back to evidence presence (quant/qual) instead of scores. `locations`
 * coordinates are approximate geocodes of named places, not study geometry.
 *
 * `import_review`: { source, unverified, suggested, flags }
 *   suggested — a draft position/material (or location) with its basis in the
 *               record. NOT applied; copy it into the live fields once reviewed.
 *   flags     — inconsistencies found in the corpus record during transfer.
 * The fifth anchor is Authorship (settled terminology). Corpus records written
 * before that change use the older label; their text is stored under `authorship`. Anchor `has` follows the corpus ✓/✗ marks unless the record's own
 * evidence contradicts them (noted in flags).
 *
 * Template-format SLR finds without a full SAS record are held separately in
 * STUDIES_SCREENING at the end of this file.
 */
var STUDIES_IMPORT_SOURCE='SLR corpus — _Combined_Template_Records_2408.pdf (imported 2026-10-18)';
var STUDIES_IMPORT_UNVERIFIED=['position','material','location','provenance','land_use_relationality','structural_mode','strategic_intent','scale','anchors.*.score'];
var STUDIES=[
{
  asa_code:'A-19-BSDH',title:'Buried Seawall–Dune Hybrid System',
  group_type:'Hybrid',function_type:'Edge Defense',group_code:'C',func_code:'1',
  subtype:'1C · Hybrid Edge Defense',citation:'Almarshed et al. (2019)',
  position:'Edge',material:'Hybrid',
  location:{type:'Point',position:'Edge'},
  location_status:'confirmed',
  location_reviewNotes:'Buried seawall/dike core sits beneath the dune crest at the beach edge across all five cited sites (Katwijk, Noordwijk, Dam Neck, Maui, Bay Head) — typological_logic describes a single-zone dune-over-structure system, not a cross-shore span. High confidence.',
  provenance:4,land_use_relationality:4,
  structural_mode:'fixed',strategic_intent:'protect',
  scale:'territorial',
  governance:'Public/municipal coastal engineering management — centrally planned, professionally maintained, and funded through government coastal-defence programmes (exogenous technical authority).',
  full_citation:'Almarshed, B.; Figlus, J.; Miller, J.K.; & Verhagen, H.J. (2019). Innovative Coastal Risk Reduction through Hybrid Design: Combining Sand Cover and Structural Defenses. Journal of Coastal Research, 00(0), 1–33. DOI: 10.2112/JCOASTRES-D-18-00078.1',
  region:'Netherlands & USA',doc_type:'Peer-reviewed Journal Article',
  keywords:['hybrid coastal defense','buried seawall','dike-in-dune','sand cover','Engineering with Nature','wave overtopping','dune erosion','morphodynamics'],
  locations:[
    {lat:52.2048,lng:4.3960,label:'Katwijk, Netherlands'},
    {lat:52.2392,lng:4.4378,label:'Noordwijk, Netherlands'},
    {lat:36.8340,lng:-76.0143,label:'Dam Neck, Virginia, USA'},
    {lat:20.7984,lng:-156.3319,label:'Maui, Hawaii, USA'},
    {lat:40.0751,lng:-74.0446,label:'Bay Head, New Jersey, USA'}
  ],
  typological_logic:'A hard structural core (seawall, rubble-mound dike, or levee) embedded beneath or within an engineered sand cover, creating a dual-layer defense. The sand absorbs and dissipates wave energy; the hard core resists residual impact, preventing catastrophic failure.',
  operational_logic:'Two-tier adaptive defense: (1) sand layer as erodible buffer absorbing wave energy; (2) hard core as stable barrier preventing total failure once sand is eroded. Performance depends on maintaining sufficient sand volume and periodic nourishment.',
  societal_logic:'Multifunctional protection integrating infrastructure with recreation, maintaining public access and aesthetics, reducing economic loss through dual protection layers.',
  experiential_logic:'Visually reads as a natural dune while concealing the engineered core; wave energy felt as muted rather than crashing; landscape continuity promotes coexistence between human and coastal processes.',
  anchors:{
    structural:{score:9,quant:'Hs reduced by up to 40% in surf zone; erosion reduced ≈5 m vs unprotected coast (Bay Head).',qual:'Visual invisibility of structural core enhances perception of safety; public infrastructure seamlessly integrated behind dunes.',has:true},
    ecological:{score:7,quant:'Vegetated dune surfaces (≥60% cover) stabilize sand; sediment volume maintained >80% V₀ → system stability.',qual:'Naturalized dune morphology supports nesting fauna and ecological continuity.',has:true},
    economic:{score:6,quant:'Hard-core volume reduction reduces construction cost ~20–30% vs conventional seawall.',qual:'Co-use of land (e.g., parking beneath dune) demonstrates cost-efficient multifunctionality.',has:true},
    social:{score:5,quant:'Dual protection reduces flood-risk exposure for urban and military infrastructure.',qual:'Maintains recreational beach access; visually compatible with tourism and public use.',has:true},
    authorship:{score:8,quant:'Crest elevation and dune form emulate natural beach profiles; run-up energy reduced.',qual:'Landscape continuity—soft, vegetated foredune—creates "naturalized protection" character.',has:true}
  },
  key_metrics:['Hs (m)','Ru₂% (m)','q (m³/s/m)','Rc (m)','ΔV (m³/m)','V/V₀','ξ (Iribarren)','Kr'],
  key_equations:['q = a·exp[−b·(Rc/Tm√(gHs))]','ΔV ∝ Hs²/Rc','E_eff = E₀(1−Kr)(1−ΔV/V₀)'],
  temporalities:[
    {scale:'Event (Days)',process:'Storm-induced erosion and run-up response',model:'XBeach + CSHORE; flume tests',finding:'Wave height ↓40%, erosion reduced 5 m vs unprotected. Performance depends on sand cover thickness and crest height.'},
    {scale:'Annual (1 Yr)',process:'Model validation against field measurements',model:'SWAN / XBeach with buoy data',finding:'Mean Hs ≈1.4 m; overtopping rates within EurOtop limits.'},
    {scale:'Multi-Year (3–4 Yrs)',process:'Morphodynamic adjustment; periodic re-nourishment',model:'Long-term profile monitoring',finding:'Without re-nourishment every 3–4 years, sand volume declines >20%, exposing core.'},
    {scale:'Multi-Decadal (~40 Yrs)',process:'Progressive coastal retreat; maintenance cycles',model:'Long-term field record',finding:'Buried hard cores structurally intact >40 years; shoreline retreat without catastrophic failure.'},
    {scale:'Long-Term (10–50 Yrs)',process:'Adaptive design under sea-level rise',model:'Scenario analysis',finding:'ΔSLR >0.5 m without crest adaptation → run-up exceeds design limit.'}
  ],
  ifthen:[
    {scale:'Event',rule:'IF Ru₂% > Rc → sand erodes → hard core partially exposed but remains stable.'},
    {scale:'Annual',rule:'IF mean Hs ≈1–2 m and crest geometry maintained → q ≤10⁻³ m³/s/m → within design tolerance.'},
    {scale:'Multi-Year',rule:'IF sand volume V ↓ >20% and no re-nourishment → Kr ↑ and toe scour initiates → local failure risk ↑.'},
    {scale:'Multi-Decadal',rule:'IF periodic re-nourishment maintained → hybrid structure remains stable; ELSE shoreline retreat and visual degradation.'},
    {scale:'Long-Term',rule:'IF ΔSLR >0.5 m without crest adaptation → run-up exceeds design limit → modular raising or buffers required.'}
  ],
  sensory:[
    {sense:'Sight',obs:'Continuous vegetated dune ridge, visually indistinguishable from natural landform. During storms, waves flatten and fade into the sand slope.'},
    {sense:'Sound',obs:'Muted wash of waves absorbed by sand. In storms, deep subdued roar replaces the metallic echo of seawalls.'},
    {sense:'Touch',obs:'Coarse and cool surface; damp sand gives underfoot, hinting at hidden infrastructure below.'},
    {sense:'Smell',obs:'Clean, saline scent. After storms, traces of vegetation and exposed soil introduce an earthy tang.'},
    {sense:'Movement',obs:'Free movement along crest and gentle slopes. Storm events alter movement temporarily as the form subtly reshapes.'}
  ],
  sensory_statement:'The hybrid dune–seawall is experienced as quietly infrastructural — it feels natural yet carries an invisible density beneath the sand. What the eye reads as landscape, the body perceives as assurance.',
  cases:['Katwijk (Netherlands) — dike-in-dune with parking garage','Noordwijk (Netherlands) — wide dune over buried dike','Dam Neck, Virginia (USA) — dune over buried seawall','Maui, Hawaii (USA) — sand-covered rubble mound','Bay Head, New Jersey (USA) — relic seawall buried by dune'],
  note:'Conceptually proven CPM, but no concrete design evaluation. Designers must integrate with caution.',
  import_review:{
    source:'Existing record — checked against the SLR corpus (2026-10-18); content unchanged',unverified:[],suggested:null,
    flags:[
      'Annual temporality (SWAN/XBeach with buoy + SIMAR-44 data, 2010; mean Hs ≈1.4 m) matches A-18-DPWF (Xagó, Spain) verbatim. SIMAR-44 is a Spanish hindcast dataset, which does not fit a Netherlands/USA review. Likely carried over from the Abanades record — check against Almarshed et al. before relying on it.',
      'full_citation volume/issue “00(0), 1–33” is the in-press placeholder; update to the published citation.'
    ]
  }
},
{
  asa_code:'B-18-SF',title:'Community-Based Silvofishery System',
  group_type:'LoTek',function_type:'Productive Landscapes',group_code:'E',func_code:'3',
  subtype:'3E · LoTek Productive Landscapes',citation:'Basyuni et al. (2018)',
  position:'Shoreline',material:'Green',
  location:{type:'Span',start:'Shoreline',end:'Inland'},
  location_status:'low-confidence',
  location_reviewNotes:'DRAFT — study describes embanked mangrove-aquaculture ponds behind the immediate coast (three North Sumatra villages, lat/lng given only at village resolution, not pond-plan geometry), which typologically suggests a Shoreline→Inland span rather than the single Shoreline point currently on `position`. No site plan/transect in the extracted record confirms the seaward or landward extent — needs Sarah\'s review against the source paper (Basyuni et al. 2018) before treating as settled. Grey draft cell — amber override pending.',
  provenance:1,land_use_relationality:5,
  structural_mode:'fixed',strategic_intent:'accommodate',
  strategic_intent_note:'Tentative — inferred from productive/ecological framing rather than an explicitly stated policy intent in the source study.',
  scale:'neighbourhood',
  governance:'Farmer-group governance (13–25 members per village); horizontal, community-based decision-making with collective maintenance labour and intergenerational knowledge transfer.',
  full_citation:'Basyuni, M., Yani, P., & Hartini, K.S. (2018). Evaluation of mangrove management through community-based silvofishery in North Sumatra, Indonesia. IOP Conference Series: Earth and Environmental Science, 122(1), 012109. https://doi.org/10.1088/1755-1315/122/1/012109',
  region:'North Sumatra, Indonesia',doc_type:'Peer-reviewed Journal Article (Conference Proceedings)',
  keywords:['silvofishery','mangrove rehabilitation','community-based aquaculture','productive landscapes','low-tech coastal adaptation','ecological livelihoods','decentralized sustainability'],
  locations:[
    {lat:3.6847,lng:98.6547,label:'Paluh Manan, Hamparan Perak, North Sumatra'},
    {lat:3.6750,lng:98.6400,label:'Paluh Kurau, Hamparan Perak, North Sumatra'},
    {lat:3.6900,lng:98.6680,label:'Lama Village, Hamparan Perak, North Sumatra'}
  ],
  typological_logic:'Integrated mangrove–aquaculture system: mangroves planted along and within ponds to stabilize embankments, purify water, and supply nutrients to aquatic species. Each village demonstrates a unique balance between ecological density and productive yield.',
  operational_logic:'Mangrove reforestation → sediment retention + nutrient enrichment → improved pond water quality → stable aquaculture yields → household income → reinvestment in mangrove maintenance → reinforcing ecological–economic loop.',
  societal_logic:'Farmer groups (13–25 members) coordinate maintenance using shared local knowledge. Governance is horizontal and community-based. Collective labor and intergenerational knowledge sustain system resilience.',
  experiential_logic:'To inhabit the silvofishery is to occupy a moving threshold: not land, not sea, but an alternating rhythm of labor and rest. Each tide brings change. The landscape teaches endurance through repetition.',
  anchors:{
    structural:{score:6,quant:'Pond–mangrove ratios of 75–90% mangrove; root systems stabilize soil and pond embankments.',qual:'Mangrove roots visibly prevent embankment collapse; living structure replaces engineered infrastructure.',has:true},
    ecological:{score:9,quant:'Mangrove density 1,000–2,500 trees/ha across 4 Rhizophora and Avicennia species.',qual:'Increased plankton, nutrient cycling, reduced toxins. Mosaic of green corridors and reflective ponds.',has:true},
    economic:{score:8,quant:'Monthly income USD 23.8–45.8/ha. Operational cost USD 186.5–233.2 / 6-month cycle.',qual:'Diversified livelihood from fish, shrimp, and crab. Small-scale profitability without large capital inputs.',has:true},
    social:{score:8,quant:'Community farmer groups of 13–25 members; collective labor and shared decision-making.',qual:'Collective maintenance reinforces social cohesion; intergenerational knowledge transfer sustains system resilience.',has:true},
    authorship:{score:7,quant:'75–90% of land area is mangrove canopy; reflective ponds interspersed throughout.',qual:'Perceived as "mangrove-friendly aquaculture." Mosaic of green corridors and reflective ponds conveys ecological beauty.',has:true}
  },
  key_metrics:['ρₘ — Mangrove Density (trees/ha)','Rₚₘ — Pond:Mangrove Ratio (%)','Yₐq — Aquaculture Yield (kg/6mo)','Cₒₚ — Operational Cost (USD/6mo)','Vₚᵣₒd — Production Value (USD/6mo)'],
  key_equations:['P01: ↑ρₘ → ↑Soil stability','P02: ↑ρₘ → ↑Yₐq (via nutrient input)','P03: Rₚₘ ≥75% → balanced yield + cost','P04: A.marina presence → coastal erosion ↓'],
  temporalities:[
    {scale:'Event (Days)',process:'Tidal flushing and daily pond management',model:'Manual water gate operation',finding:'Daily balance between inflow/outflow maintains pond health.'},
    {scale:'Annual (1 Yr)',process:'Aquaculture production and replanting cycle',model:'Community yield logs',finding:'Six-month cycles form one productive year.'},
    {scale:'Multi-Year (3–5 Yrs)',process:'Mangrove maturity and yield stabilization',model:'Cumulative field observation',finding:'After 3–5 years, mangrove maturity improves nutrient cycling.'},
    {scale:'Multi-Decadal (~20 Yrs)',process:'Transition from intensive to balanced silvofishery',model:'Historical observation; oral history',finding:'Shift from high-input to mixed systems restores ecological resilience.'},
    {scale:'Long-Term (30–50 Yrs)',process:'Community–ecosystem co-evolution',model:'Qualitative projection',finding:'Continued stewardship expected to regenerate coastal ecosystem. (Inference only.)'}
  ],
  ifthen:[
    {scale:'Event',rule:'IF tidal flow regulated daily AND mangrove roots intact → water salinity and pond structure remain stable.'},
    {scale:'Annual',rule:'IF replanting occurs after each harvest cycle → ρₘ maintained → aquaculture yield Yₐq sustained.'},
    {scale:'Multi-Year',rule:'IF mangroves mature over several cycles → nutrient cycling ↑ → cost-to-yield ratio improves.'},
    {scale:'Multi-Decadal',rule:'IF silvofishery continues replacing intensive ponds → long-term ecological restoration occurs.'},
    {scale:'Long-Term',rule:'IF community stewardship persists → ecological regeneration and economic resilience co-evolve as one adaptive system.'}
  ],
  sensory:[
    {sense:'Sight',obs:'Dense green mangrove corridors enclosing calm ponds; shifting reflections as tides move through gates.'},
    {sense:'Sound',obs:'Soft rush of tidal inflow; rhythmic gate creaks; mingled calls of birds and human conversation.'},
    {sense:'Touch',obs:'Damp, clay-rich soil underfoot; rough texture of Rhizophora roots; cool, brackish water during manual flushing.'},
    {sense:'Smell',obs:'Earthy salt and decaying leaves mingling with mild brine and freshwater algae.'},
    {sense:'Movement',obs:'Slow, deliberate walking along narrow bunds; daily motion of opening gates, throwing feed, collecting nets.'}
  ],
  sensory_statement:'To be within the silvofishery is to inhabit a moving threshold: not land, not sea, but an alternating rhythm of labor and rest. Each tide brings change — the water recedes, revealing roots; it returns, carrying life.',
  cases:['Paluh Manan (75:25 ratio) — Tilapia + Shrimp, USD 36.2/ha/mo','Paluh Kurau (84:16 ratio) — Crab, USD 23.8/ha/mo, A.marina wave buffer','Lama Village (90:10 ratio) — Tilapia + Shrimp + Crab, USD 45.8/ha/mo'],
  note:null
}
,
{
  asa_code:'A-18-DPWF',title:'Dual-Purpose Wave Farm',
  group_type:'Hybrid',function_type:'Shoreline Inundation',group_code:'C',func_code:'2',
  subtype:'2C · Hybrid Shoreline Inundation',citation:'Abanades et al. (2018)',
  position:null,material:null,
  location:null,location_status:null,location_reviewNotes:null,
  provenance:null,land_use_relationality:null,
  structural_mode:null,strategic_intent:null,
  scale:null,
  governance:'EU-funded research (Marie Curie WAVEIMPACT fellowship) linked to public energy and coastal agencies (FAEN, Asturian Energy Foundation); no community participation reported.',
  full_citation:'Abanades, J., Flor-Blanco, G., Flor, G., & Iglesias, G. (2018). Dual wave farms for energy production and coastal protection. Ocean and Coastal Management, 160, 18–29. https://doi.org/10.1016/j.ocecoaman.2018.03.038',
  region:'Asturias, Northern Spain',doc_type:'Peer-reviewed Journal Article',
  keywords:['wave energy','wave energy converters','coastal management','coastal erosion','beach morphology','sediment transport'],
  locations:[
    {lat:43.603,lng:-5.922,label:'Xagó Beach–Dune System, Asturias (approx.)'}
  ],
  typological_logic:'Floating Wave Energy Converters (WECs) arranged offshore reduce incident wave energy while producing renewable power, mitigating dune erosion.',
  operational_logic:'Offshore WEC array attenuates wave energy → significant wave height reduced up to 50% → dune erosion reduced 2–2.5 m → erosion zone displaced 10–25 m seaward.',
  societal_logic:'Proposed as a low-impact alternative to conventional coastal structures; dual-purpose deployment (energy + protection) improves the economic case for renewable energy.',
  experiential_logic:'Retains the natural visual and morphological continuity of the coastline, in contrast to the intrusive presence of seawalls or revetments.',
  anchors:{
    structural:{score:null,quant:'Reduction in significant wave height (RSH) up to 50%; dune scarp erosion displaced 10–25 m seaward.',qual:'Mitigated dune retreat; protection of nearshore built assets.',has:true},
    ecological:{score:null,quant:'Reduced seabed disturbance and sediment transport; lower morphodynamic variability.',qual:'Lower erosion preserves beach–dune ecology.',has:true},
    economic:{score:null,quant:'Dual energy–protection function improves viability; avoids seawall maintenance costs (not quantified).',qual:'Low visual impact increases acceptability and tourism potential.',has:true},
    social:{score:null,quant:'Limited community integration; possible surf-tourism trade-offs.',qual:'Local surf culture possibly affected by calmer waves (evidence drawn from outside the study).',has:false},
    authorship:{score:null,quant:'Floating infrastructure offshore; less intrusive than coastal walls.',qual:'Natural coastal viewscape maintained from shore.',has:true}
  },
  key_metrics:['Hs (m)','Tm (s)','Tp (s)','ζ — bed level (m)','FEA — eroded beach-face area (m²)','NER (%)','θ — wave direction (°)','TR — tidal range (m)','D₅₀ (mm)'],
  key_equations:['RSH = (Hs_b − Hs_f) / Hs_b','BLI = ζ_f − ζ_b','FEA = ∫(ζ₀ − ζ) dx','NER = 1 − FEA_f / FEA_b','Ct = Hs_f / Hs_b'],
  temporalities:[
    {scale:'Event (Days)',process:'Storm-induced erosion and morphodynamic response',model:'Coupled SWAN + XBeach (7–16 Nov 2010)',finding:'Hs ↓ up to 50%; dune erosion ↓ 2–2.5 m; erosion zone displaced 10–25 m seaward.'},
    {scale:'Annual (1 Yr)',process:'Hydrodynamic climate validation and energy calibration',model:'SWAN validated with buoy + SIMAR-44 data (2010)',finding:'Mean Hs 1.4 m, Tm 6 s; validation R² = 0.89–0.92, RMSE = 0.33–0.45 m.'},
    {scale:'Multi-Year (3–4 Yrs)',process:'Cumulative geomorphic response and shoreline adjustment',model:'Field observation of dune toe retreat (2011–2014)',finding:'Dune toe recession of 11.5 m; repeated storm clusters produce measurable cumulative change.'},
    {scale:'Multi-Decadal (~40 Yrs)',process:'Historical beach evolution and sedimentary regime',model:'Comparative geomorphic mapping (1970–2011)',finding:'Shoreline shifts from progradation to recession set the baseline rhythm any intervention must align with.'},
    {scale:'Long-Term (10–50 Yrs)',process:'Adaptability under sea-level rise',model:'Conceptual extrapolation (no empirical model)',finding:'Floating WECs assumed to maintain protection and energy yield as sea level rises.'}
  ],
  ifthen:[
    {scale:'Event',rule:'IF storm occurs AND WEC array active → Hs ↓ up to 50% AND dune erosion ↓ 2–2.5 m.'},
    {scale:'Annual',rule:'IF annual validation complete AND R² ≥ 0.9 → wave-climate model reliable for predicting energy and erosion.'},
    {scale:'Multi-Year',rule:'IF storm clusters recur annually → cumulative dune retreat measurable AND intervention effectiveness assessable.'},
    {scale:'Multi-Decadal',rule:'IF shoreline trend shifts from progradation to recession → design must align with sediment transport cycles.'},
    {scale:'Long-Term',rule:'IF sea level rises AND WECs are floating → protection function sustained without structural elevation upgrade.'}
  ],
  sensory:[
    {sense:'Sight',obs:'Offshore devices barely visible beyond the surf line; the horizon remains largely uninterrupted.'},
    {sense:'Sound',obs:'Low hum of waves interacting with WECs merges with natural surf — an extended cadence rather than a mechanical rhythm.'},
    {sense:'Touch',obs:'Finer sand texture retained on the fore-dune due to reduced scarping; surface smoother and less compacted after storms.'},
    {sense:'Smell',obs:'Saline and dune-grass scent persists; no industrial odour.'},
    {sense:'Movement',obs:'During storms the body senses milder backwash and gentler undertow behind the farm.'}
  ],
  sensory_statement:'Being on Xagó Beach after a storm, one perceives a coast that breathes slower. The air carries the same salt, yet the roar softens; waves roll in with measured rhythm. The body registers equilibrium — neither the violence of erosion nor the stillness of defence walls, but a poised, resonant calm.',
  cases:['Xagó Beach, Asturias — ~2 km beach–dune system; storm hindcast of 7–16 Nov 2010 with a modelled WaveCat WEC array'],
  note:'Performance comes from numerical modelling (SWAN + XBeach) of a WEC array. Experiential and multi-year narratives in the record are projected, not observed.',
  import_review:{
    source:STUDIES_IMPORT_SOURCE,unverified:STUDIES_IMPORT_UNVERIFIED,
    suggested:{position:'Offshore',material:'Hybrid',basis:'Record: WECs “arranged offshore”; stated group type Hybrid.'},
    flags:[
      'Social and authorship evidence cites sources outside the study (Mondo.surf; Bimep; Aguçadoura wave farm).',
      'Annual row (SWAN + buoy + SIMAR-44, 2010; mean Hs 1.4 m) also appears verbatim in A-19-BSDH, where it does not fit — see that record.'
    ]
  }
},
{
  asa_code:'A-24-AMPH',title:'Amphibious Housing',
  group_type:'Amphibious',function_type:'Civic Living',group_code:'D',func_code:'4',
  subtype:'4D · Amphibious Civic Living',citation:'Ahmad & Shuvra (2024)',
  position:'Edge',material:'Grey',
  location:null,location_status:null,location_reviewNotes:null,
  provenance:null,land_use_relationality:null,
  structural_mode:null,strategic_intent:null,
  scale:null,
  governance:'Community collectives oversee foundation inspection and share construction equipment; craft knowledge combines with academic research. National frameworks still prioritise embankments.',
  full_citation:'Ahmad, M., & Shuvra, C.A.M.S. (2024). Amphibious Housing: An Amphibious Architectural Approach That Dwells on the Problem of Rising Sea Levels for a Resilient Future for Coastal Settlement. International Conference on Advances in Civil Engineering (ICACE 2024). DOI: 10.2139/ssrn.5062558',
  region:'Southern Bangladesh delta & Thailand',doc_type:'Conference Paper (ICACE 2024 Proceedings)',
  keywords:['amphibious settlements','sea level rise','amphibious architecture','vulnerable communities','modular design','deltaic Bangladesh'],
  locations:[
    {lat:22.701,lng:90.353,label:'Barisal division (Monpura to Barguna), Bangladesh (approx.)'},
    {lat:22.570,lng:89.517,label:'Khulna — Dacope, Koyra to Harinagar, Bangladesh (approx.)'},
    {lat:14.020,lng:101.230,label:'Ban Sang, Prachin Buri, Thailand (approx., district-level)'}
  ],
  typological_logic:'Dwellings rise and fall with floodwaters rather than resist them. Vernacular materials (bamboo, timber, barrels, corrugated tin) are combined with engineered sub-frames and vertical guidance posts for adaptive buoyancy, affordability and local material circularity.',
  operational_logic:'Rising water displaces buoyancy blocks → superstructure lifts along guidance posts → lateral drift restricted by steel rails → as water recedes the structure settles back onto its brick plinth. The cycle limits flood damage without mechanical control.',
  societal_logic:'Enables in-situ resilience: households stay in place during floods, reducing forced migration. Local labour and self-repair sustain the system, but the upkeep burden falls unevenly on poorer households.',
  experiential_logic:'The dwelling moves with the hydrological pulse; residents alternate between grounded stability and gentle flotation.',
  anchors:{
    structural:{score:null,quant:'Buoyant foundation supports a 100 m² unit up to 3 m rise; guidance posts limit lateral deflection to ≤5% of building height.',qual:'Safe re-settlement after floods; cyclic motion without damage.',has:true},
    ecological:{score:null,quant:'Modular layout minimises land disturbance and reduces erosion and waterlogging effects (not measured).',qual:'Coexistence with natural hydrology instead of resisting it.',has:true},
    economic:{score:null,quant:'Modular prefabrication and local material sourcing reduce construction and maintenance costs (not quantified).',qual:'Affordability and replicability for low-income delta communities.',has:true},
    social:{score:null,quant:'Enables in-situ habitation in flood-prone areas.',qual:'Social continuity and community identity amid environmental change.',has:true},
    authorship:{score:null,quant:null,qual:'Not quantified. Expressed through vernacular form, bamboo weaving and local proportions.',has:false}
  },
  key_metrics:['FER — flood elevation range (m a.m.s.l.)','BC — buoyancy capacity','VGS — vertical guidance stability (Δx / H)','MDI — material durability (service yrs)','SS — settlement stability'],
  key_equations:['BC = ρ·Vd − W','Δx ≤ 0.05H','MDI = f(Mt, E, Tw)','SS = σ′v / σcr'],
  temporalities:[
    {scale:'Event (Days)',process:'Buoyant response during a 1–3 day monsoon flood',model:'Field observation of flood height (1.0–1.5 m a.m.s.l.)',finding:'Foundation activates above ~1.0 m water depth; full flotation at ≈1.5 m.'},
    {scale:'Annual (1 Yr)',process:'Seasonal flooding and maintenance inspection',model:'Cyclic record of material durability',finding:'Annual repair sustains materials; service cycle ≈5–7 years.'},
    {scale:'Multi-Year (3–4 Yrs)',process:'Cumulative settlement and soil readjustment under cyclic inundation',model:'Qualitative observation of re-grounding',finding:'Repeated flotation–grounding assumed to improve plinth compaction and stability.'},
    {scale:'Multi-Decadal (~40 Yrs)',process:'Settlement morphology change across the floodplain',model:'Comparative review of Thailand and Bangladesh prototypes',finding:'Modular replication projected to form flood-adaptive neighbourhoods.'},
    {scale:'Long-Term (10–50 Yrs)',process:'Amphibious habitation under climate change',model:'Extrapolation from projected SLR of 1.5–1.8 m by 2100',finding:'Typology projected to remain viable under >1 m sea-level rise.'}
  ],
  ifthen:[
    {scale:'Event',rule:'IF flood elevation > 1.0 m → buoyant lift activates → dwelling floats.'},
    {scale:'Annual',rule:'IF material degradation detected → repair cycle initiated → MDI reset.'},
    {scale:'Multi-Year',rule:'IF repeated inundation occurs → soil compaction ↑ AND re-grounding stability ↑.'},
    {scale:'Multi-Decadal',rule:'IF community replication ↑ → amphibious clusters form → settlement morphology transforms.'},
    {scale:'Long-Term',rule:'IF sea-level rise > 1 m → amphibious typology persists → societal continuity maintained.'}
  ],
  sensory:[
    {sense:'Sight',obs:'Rising and falling water transforms the home’s horizon; bamboo posts, tin roofs and reflective floodwater create shifting light.'},
    {sense:'Sound',obs:'Creaking timber joints, water lapping against barrels, distant monsoon rain.'},
    {sense:'Touch',obs:'Floors subtly yield and settle underfoot as the foundation responds to water pressure; humid, cool air from surrounding water.'},
    {sense:'Smell',obs:'Alternating wet earth and bamboo fibre; after floods, evaporating silt.'},
    {sense:'Movement',obs:'The house sways gently with flood currents — perceptible but not disruptive.'}
  ],
  sensory_statement:'The amphibious dwelling is not static architecture but a breathing interface between body and water. Occupants experience stability through movement — an equilibrium achieved by yielding. Flooding becomes an inhabitable event rather than a crisis.',
  cases:['LIFT House — Khulna (Dacope, Koyra to Harinagar), Bangladesh','Amphibious House Prototype — Ban Sang, Prachin Buri, Thailand','Barisal (Monpura to Barguna) — southern deltaic Bangladesh'],
  note:'Qualitative comparison of two prototypes benchmarked against Dutch criteria. No numerical simulation or field performance testing is reported.',
  import_review:{
    source:STUDIES_IMPORT_SOURCE,unverified:STUDIES_IMPORT_UNVERIFIED,
    suggested:{position:null,material:null,basis:'Amphibious group type does not determine material; floodplain settlement position not stated in the record.'},
    flags:[
      'Record uses two codes: A-24-AMPH (header) and A-24-AMH (function/metric tables). Imported as A-24-AMPH.',
      'The paper uses no numerical simulation, yet the record carries engineering functions (Δx ≤ 0.05H, MDI, SS = σ′v/σcr). Check whether these come from the paper or were added during extraction.',
      'Ecological evidence cites a second paper (Saengpanya & Kintarak 2019), not the study itself.',
      'Citation has placeholder volume/pages; short reference read “Ahmad et al.” but the paper has two authors.',
      'Thailand context field is blank (“...”). Related screening note: Ameh (2019).'
    ]
  }
},
{
  asa_code:'B-15-HGNS',title:'Hybrid Groyne–Nourishment System',
  group_type:'Grey',function_type:'Shoreline Inundation',group_code:'A',func_code:'2',
  subtype:'2A · Grey Shoreline Inundation',citation:'Bolle et al. (2015)',
  position:null,material:null,
  location:null,location_status:null,location_reviewNotes:null,
  provenance:null,land_use_relationality:null,
  structural_mode:null,strategic_intent:null,
  scale:null,
  governance:'State-led (Ghana Ministry of Water Resources, Works and Housing) with European engineering expertise (IMDC, Belgium); continuous morphological monitoring feeds adaptive redesign between construction phases.',
  full_citation:'Bolle, A., das Neves, L., & Rooseleer, J. (2015). Coastal protection for Ada, Ghana: a case study. Proceedings of the Institution of Civil Engineers – Maritime Engineering, 168(MA3), 125–133. https://doi.org/10.1680/jmaen.15.00013',
  region:'Ada Foah, Volta Delta, Ghana',doc_type:'Peer-reviewed Journal Article',
  keywords:['coastal protection','erosion control','groynes','beach nourishment','morphodynamics','monitoring','high-energy coasts'],
  locations:[
    {lat:5.783,lng:0.633,label:'Ada Foah, Volta Delta, Ghana (approx.)'}
  ],
  typological_logic:'Coastal retreat countered by combined soft (sand nourishment, dune heightening) and hard (rubble-mound groynes) measures. The dual system dissipates wave energy, traps sediment and stabilises the beach profile.',
  operational_logic:'Wave energy dissipation → sediment trapping between groynes → shoreline stabilisation → dune reinforcement (+6 m LAT) → reduced flooding; morphology moves toward dynamic equilibrium over 3–5 years. Monitoring–model calibration loops reset groyne lengths and spacing during phased construction.',
  societal_logic:'Protects local infrastructure, fisheries and tourism potential; construction, dredging and monitoring create a maintenance economy. Expertise is transferred from IMDC (Belgium) under a state programme, which raises questions of local autonomy and sediment-sourcing dependency.',
  experiential_logic:'Swell breaks on a widened, nourished beach between rhythmic stone groynes; the sea’s force is felt as redistributed rather than resisted.',
  anchors:{
    structural:{score:null,quant:'Groynes ≈180 m long; armour W50 2,000–4,000 kg stable at Hmax 3 m, Tp 16 s; dune crest +6 m LAT (1V:6H); 5×10⁶ m³ nourishment.',qual:'Engineered groynes and nourished dunes maintain coastal integrity.',has:true},
    ecological:{score:null,quant:null,qual:'Sand-cell morphodynamics restore sediment balance, reducing estuarine siltation and preserving littoral habitats.',has:true},
    economic:{score:null,quant:null,qual:'Protects fisheries, tourism infrastructure and property; periodic renourishment sustains a maintenance economy.',has:true},
    social:{score:null,quant:null,qual:'Reduced flood risk; beaches regain social and ceremonial use for communities displaced by erosion.',has:true},
    authorship:{score:null,quant:null,qual:'Not assessed in study (✗). Record reads rhythmic groyne spacing as visual order.',has:false}
  },
  key_metrics:['Hs (m)','Tp (s)','Tidal range (m)','Uls — longshore current (m/s)','Qls — sediment transport (m³/yr)','Vn — nourishment volume (m³)','Zdune — dune crest (m LAT)','Lg — groyne length (m)','W50 — armour stone (kg)'],
  key_equations:['P01: ↑Hs → ↑run-up → ↑overwash','P02: ↑groyne length → ↑sand trapping → ↓Qls','P03: ↑dune height → ↓overtopping','P04: grain-size compatibility → ↑profile stability','P05: ↑monitoring frequency → ↑calibration accuracy'],
  temporalities:[
    {scale:'Event (Days)',process:'Storm erosion, overwash and short-term dune response',model:'XBeach (1DH) simulations',finding:'Hmax 3 m, Tp 16 s: dunes at +6 m LAT withstand multi-day storms without breaching.'},
    {scale:'Annual (1 Yr)',process:'Post-construction monitoring of morphological evolution',model:'UAV surveys + jet-ski bathymetry (120 profiles)',finding:'Nourished beaches maintain elevation against baseline.'},
    {scale:'Multi-Year (3–4 Yrs)',process:'Phased construction with adaptive redesign',model:'Delft3D, SWAN, physical modelling',finding:'7 then 15 groynes built sequentially; spacing, crest heights and slopes adjusted in real time.'},
    {scale:'Multi-Decadal (~40 Yrs)',process:'Shoreline stabilisation and sediment-budget equilibrium',model:'Litpack long-term morphodynamic model',finding:'Equilibrium achievable under continued monitoring (Qls 0.4–0.8×10⁶ m³/yr).'},
    {scale:'Long-Term (10–50 Yrs)',process:'Maintenance and renourishment cycles',model:'Predictive modelling + aerial trend data',finding:'Renourishment interval ~15–20 years; sustainability depends on sediment supply.'}
  ],
  ifthen:[
    {scale:null,rule:'IF storms exceed Hmax 3 m → minor erosion occurs but the system recovers within 1 year.'},
    {scale:null,rule:'IF renourishment occurs every 15–20 years → coastline stability persists.'},
    {scale:null,rule:'IF groynes are adaptively spaced during phased construction → sediment budget remains balanced.'}
  ],
  sensory:[
    {sense:'Sight',obs:'Rows of angular groynes extend into the Atlantic; nourished dunes form a wide golden belt against the dark sea.'},
    {sense:'Sound',obs:'Deep resonance of swell on rock, then a slower hiss as water retreats through coarse sand.'},
    {sense:'Touch',obs:'Coarse, compacted new sand underfoot; rough granite warm in the sun.'},
    {sense:'Smell',obs:'Brine, wet stone and diesel traces from dredging vessels.'},
    {sense:'Movement',obs:'Walking the groyne heads: stable footing against the pull of tide and spray.'}
  ],
  sensory_statement:'Standing atop the low-crested groyne, the visitor feels the sea’s power redistributed rather than resisted. Each swell breaks, gathers and glides away, its energy translated into shifting sand instead of loss.',
  cases:['Ada Foah — Phase 1 (7 groynes) and Phase 2 (15 groynes) with 5×10⁶ m³ nourishment'],
  note:'Performance evidence is morphological (profiles, surveys, models). Ecological, economic and social anchors are asserted in the record but not measured.',
  import_review:{
    source:STUDIES_IMPORT_SOURCE,unverified:STUDIES_IMPORT_UNVERIFIED,
    suggested:{position:'Shoreline',material:'Grey',basis:'Groyne field and nourishment on the beach profile; stated group type Grey (2A).'},
    flags:[
      'Group conflict: metadata says Grey (2A_GREY), but the ASA acronym and title say Hybrid (“a grey hybrid solution”). Imported as Grey; decide which governs.',
      'Ecological, economic and social anchors are ticked ✓ with no quantitative evidence in the record.'
    ]
  }
},
{
  asa_code:'B-16-SWGC',title:'Seawall — Grande Comore',
  group_type:'Grey',function_type:'Edge Defense',group_code:'A',func_code:'1',
  subtype:'1A · Grey Edge Defense',citation:'Betzold & Mohamed (2016)',
  position:null,material:null,
  location:null,location_status:null,location_reviewNotes:null,
  provenance:null,land_use_relationality:null,
  structural_mode:null,strategic_intent:null,
  scale:null,
  governance:'Custom- and visibility-driven: local leaders request seawalls, donors fund them, government oversight is minimal, and technical knowledge circulates poorly.',
  full_citation:'Betzold, C., & Mohamed, J.I. (2016). Seawalls as a response to coastal erosion and flooding: A case study from Grande Comore, Comoros (West Indian Ocean). Regional Environmental Change, 16(1–11). DOI: 10.1007/s10113-016-1044-X',
  region:'Grande Comore, Comoros (West Indian Ocean)',doc_type:'Peer-reviewed Journal Article',
  keywords:['seawalls','coastal erosion','flooding','sand mining','local adaptation','SIDS','climate change'],
  locations:[
    {lat:-11.700,lng:43.256,label:'Grande Comore — study villages M’Bachilé, Iconi, Ivoini, Ndroudé (approx., island-level)'}
  ],
  typological_logic:'Vertical concrete or rock seawalls (“digues”) built at the high-water mark as the primary defence against erosion and flooding, often rebuilt by communities with marine-sand mortar.',
  operational_logic:'Sand mining (↓ beach buffer) → erosion ↑ → community builds seawall → temporary protection → wave scour at base → collapse → reconstruction with the same design → progressive shoreline loss.',
  societal_logic:'Sand mining is the second-largest income source after fishing, and the same beach sand becomes seawall mortar: coastal defence converts ecological capital into construction capital. Cement and height signal modernity and status; failure is read as weak craftsmanship, and donor cycles sustain the rebuild habit.',
  experiential_logic:'The coast feels disciplined: waves arrive as impact rather than conversation. Villagers walk the wall as a promenade and watch the sea from a distance rather than working at the waterline.',
  anchors:{
    structural:{score:null,quant:'No seawall height data; repeated storm collapse observed in the field; weak mortar from marine sand.',qual:'Concrete wall as principal defence — a physical expression of an adaptation reflex.',has:true},
    ecological:{score:null,quant:'Sand extraction rates not measured; erosion linked to sand mining through stakeholder observation.',qual:'Natural sediment processes severed — a fixed engineered edge replaces shoreline exchange.',has:true},
    economic:{score:null,quant:'Sand mining is the second-largest income source after fishing.',qual:'Livelihoods tied to sand extraction and donor-funded construction.',has:true},
    social:{score:null,quant:'Perceived increase in flood frequency since the 2012 storms (interviews).',qual:'Collective identity built around protection and repair; “cement means safety”.',has:true},
    authorship:{score:null,quant:null,qual:'Not assessed in study. Record reads smooth cement and height as modern order and visual containment of the sea.',has:false}
  },
  key_metrics:['hw — seawall height (m), not quantified','Seawall material composition','Sand extraction rate (m³/day), no data','ΔSL — sea-level rise (cm): +13–56 by 2090','f_flood — flood frequency (events/yr), qualitative'],
  key_equations:['P01: wave impact → seawall stability (no quantitative relation given)','P02: ↑sand extraction → ↑erosion → ↑flood risk','P03: failure → rebuild → failure (reconstruction cycle)'],
  temporalities:[
    {scale:'Event (Days)',process:'Storm events collapse poorly built seawalls',model:'No model; empirical observation',finding:'Under-designed walls fail in the short term; they offer temporary relief but amplify local erosion.'},
    {scale:'Annual (1 Yr)',process:'Community reconstruction and repair cycle',model:'Field survey + interviews',finding:'Maintenance cost and labour burden rise as collapse repeats.'},
    {scale:'Multi-Year (3–4 Yrs)',process:'Shoreline retreat and behavioural normalisation',model:'No quantitative model',finding:'Habitual rebuilding produces a perception of inevitable erosion; no technical learning.'},
    {scale:'Multi-Decadal (~40 Yrs)',process:'Seawalls adopted as the cultural default',model:'Qualitative trend (inferred)',finding:'A “seawall mindset” solidifies across generations (SIDS legacy pattern).'},
    {scale:'Long-Term (50+ Yrs)',process:'Projected sea-level rise of 13–56 cm',model:'Derived from McSweeney et al. (2008) dataset',finding:'Existing walls will fail more often and require redesign or retreat.'}
  ],
  ifthen:[
    {scale:'Event',rule:'IF storm surges breach the wall → emergency repairs with locally sourced sand and stone.'},
    {scale:'Annual',rule:'IF donor funds arrive → reinforce or rebuild seawalls; IF funds absent → maintenance delayed and risk exposure ↑.'},
    {scale:'Multi-Year',rule:'IF repeated collapses occur → seawalls perceived as indispensable while alternatives fade from memory.'},
    {scale:'Multi-Decadal',rule:'IF generations inherit the wall as default → adaptation culture becomes structural dependency.'},
    {scale:'Long-Term',rule:'IF sea level rises 13–56 cm → reliance on seawalls amplifies physical vulnerability and separation from the coast.'}
  ],
  sensory:[
    {sense:'Sight',obs:'A continuous grey wall along the village sea edge; cracked seams and new cement patches over old; waves rebound sharply.'},
    {sense:'Sound',obs:'Hollow resonance of surf on stone; muffled voices behind concrete; occasional crash when sections give way.'},
    {sense:'Touch',obs:'Rough, salt-etched cement — warm by day, cool by night.'},
    {sense:'Smell',obs:'Brine and wet mortar; tide trapped behind a built barrier.'},
    {sense:'Movement',obs:'Villagers walk atop the wall like a promenade; the body no longer wades or works at the waterline.'}
  ],
  sensory_statement:'The coast feels disciplined. Waves no longer arrive as conversation but as impact. The wall separates motion from meaning, translating uncertainty into the comfort of geometry. People watch the sea rather than meet it.',
  cases:['M’Bachilé','Iconi','Ivoini','Ndroudé'],
  note:'The study is critical of seawalls: it documents a “seawall reflex” under weak governance, not seawall performance. No hydraulic or structural measurements.',
  import_review:{
    source:STUDIES_IMPORT_SOURCE,unverified:STUDIES_IMPORT_UNVERIFIED,
    suggested:{position:'Edge',material:'Grey',basis:'Record: seawalls “at high-water mark”; stated group type Grey.'},
    flags:[
      'Citation volume/pages read “16(1–11)”, which looks like a placeholder — verify against the DOI.',
      'Record has no anchor evidence matrix; anchor text is drawn from the Societal Anchors table and metrics.',
      'Temporal schema and narrative exist in two versions (“embracing the seawall” vs “seawall as concern in a SIDS”); neither is carried into the JS beyond the sensory notes.'
    ]
  }
},
{
  asa_code:'B-19-ACCH',title:'Accommodating Coastal Change — Household & Community Practices',
  group_type:'Hybrid',function_type:'Civic Living',group_code:'C',func_code:'4',
  subtype:'4C · Hybrid Civic Living',citation:'Bott & Braun (2019)',
  position:'Inland',material:'Grey',
  location:{type:'Span',start:'Shoreline',end:'Inland'},location_status:'confirmed',location_reviewNotes:null,
  provenance:null,land_use_relationality:null,
  structural_mode:null,strategic_intent:null,
  scale:null,
  governance:'Civic self-organisation through RT/RW neighbourhood units and PKK women’s associations; gotong-royong collective labour enforced by social sanctions; limited municipal support and weak bridging ties to government.',
  full_citation:'Bott, L.-M., & Braun, B. (2019). How do households respond to coastal hazards? A framework for accommodating strategies using the example of Semarang Bay, Indonesia. International Journal of Disaster Risk Reduction, 37, 101177. https://doi.org/10.1016/j.ijdrr.2019.101177',
  region:'Semarang Bay, Central Java, Indonesia',doc_type:'Peer-reviewed Journal Article',
  keywords:['accommodation','adaptation','bottom-up response','social capital','coastal hazards','land subsidence','gotong-royong','Semarang Bay'],
  locations:[
    {lat:-6.950,lng:110.430,label:'Semarang Bay, Central Java (approx.)'}
  ],
  typological_logic:'Accommodation as a middle tier between coping and long-term adaptation: habitual adjustment to tidal flooding and subsidence through small household works (tiling, raised thresholds, periodic house elevation) and collective maintenance, embedded in local governance (RT/RW, PKK, gotong-royong).',
  operational_logic:'Subsidence + tidal flooding → repeated minor inundations → household micro-adjustments (thresholds, floor raising, storage, mobility) → synchronised through communal structures (money pooling, gotong-royong drain cleaning) → habitual accommodation → a stable but vulnerable equilibrium that absorbs, but does not eliminate, risk.',
  societal_logic:'High bonding social capital (98% trust neighbours; 86% join gotong-royong; ~90% attend RT meetings) sustains mutual aid and informal micro-insurance. Weak bridging and linking ties limit access to knowledge, funding and planned long-term adaptation.',
  experiential_logic:'Floods and subsidence are described as a “law of nature” and daily activity, not disaster. Children walk barefoot to school through floodwater, goods are raised, and life continues — hazard normalised as habitus.',
  anchors:{
    structural:{score:null,quant:'31% ceramic tiling; 16% raised thresholds; 5% drainage channels; 17% elevate houses every 5–10 years.',qual:'Adaptations viewed as “normal”; elevation treated as cyclical maintenance.',has:true},
    ecological:{score:null,quant:'13% of households replant mangroves; collective drain and waste clearing via gotong-royong.',qual:'Keeping drains free of waste framed as shared responsibility.',has:true},
    economic:{score:null,quant:'Informal loans and money pooling; ≥11 million IDR savings needed for house elevation; 39% cite cost as a barrier to retreat.',qual:'Collective money pooling functions as micro-insurance.',has:true},
    social:{score:null,quant:'98% high trust in neighbours; 95% expect help during floods; 86% gotong-royong participation; ~90% RT meeting attendance.',qual:'Adaptation normalised through community solidarity.',has:true},
    authorship:{score:null,quant:null,qual:'Not measured in study. Record infers a social authorship of cleanliness and respect tied to collective upkeep.',has:false}
  },
  key_metrics:['Land subsidence rate (cm/yr)','Tidal flood depth (cm)','Flood frequency (events/yr)','Household trust (%)','Gotong-royong participation (%)','SLR awareness (%)','House elevation savings (IDR)'],
  key_equations:['P01: ↑subsidence → ↓interval between elevation cycles','P02: ↑trust → ↑participation → ↑collective maintenance','P03: ↓income → ↑exposure → ↑dependence on collective action','P04: ↑knowledge → ↑bridging ties → possible shift to planned adaptation'],
  temporalities:[
    {scale:'Event (Days)',process:'Short flood response (tidal/rain)',model:'Field survey / FGD',finding:'Residents stay in place; floods treated as normal; cleaning follows immediately.'},
    {scale:'Annual (1 Yr)',process:'Seasonal monsoon floods',model:'Community observation',finding:'Collective cleaning and maintenance repeated every rainy season.'},
    {scale:'Multi-Year (3–4 Yrs)',process:'House repair and minor elevation cycles',model:'Derived metric',finding:'Elevation timed to household savings accumulation.'},
    {scale:'Multi-Decadal (~40 Yrs)',process:'Cumulative land subsidence',model:'Geophysical observation',finding:'Relative sea-level rise alters long-term habitability; no migration.'},
    {scale:'Long-Term (10–50 Yrs)',process:'Socio-ecological habituation',model:'Qualitative interpretation',finding:'Normalised hazard sustains place attachment but limits foresight.'}
  ],
  ifthen:[
    {scale:'Event',rule:'IF flood occurs → residents clean and resume normal life.'},
    {scale:'Annual',rule:'IF monsoon season begins → communal gotong-royong cleans drains.'},
    {scale:'Multi-Year',rule:'IF savings threshold reached → house elevated.'},
    {scale:'Multi-Decadal',rule:'IF subsidence continues unmitigated → community vulnerability ↑.'},
    {scale:'Long-Term',rule:'IF social cohesion persists → community remains in place despite intensifying hazard.'}
  ],
  sensory:[],
  sensory_statement:null,
  cases:['Semarang Bay, northern Java — low-lying urban and rural settlements under tidal flooding (40–60 cm) and subsidence (6–7 cm/yr avg, up to 19 cm/yr)'],
  note:'Household survey study: no engineered measure is evaluated. Adaptation is measured through household behaviour and social capital.',
  import_review:{
    source:STUDIES_IMPORT_SOURCE,unverified:STUDIES_IMPORT_UNVERIFIED,
    suggested:{position:null,material:'Hybrid',basis:'Stated group type Hybrid; settlement position not stated in the record.'},
    flags:[
      'Record carries two codes: B-19-HCL (header) and B-19-ACCH (metadata table and all metric IDs). Imported as B-19-ACCH.',
      'No sensory notes table in the record (Experiential Logic is an aspects table instead), so sensory is empty.',
      'Relative SLR is given as ≈10 cm/yr alongside a 6–7 cm/yr average subsidence rate; the gap is unexplained.'
    ]
  }
}
,
{
  asa_code:'B-20-CHA',title:'Civil Hybrid Adaptation — Garden–Forest–Reef System',
  group_type:'Hybrid',function_type:'Civic Living',group_code:'C',func_code:'4',
  subtype:'4C · Hybrid Civic Living',citation:'Buckwell et al. (2020)',
  position:'Shoreline',material:'Green',
  location:null,location_status:null,location_reviewNotes:null,
  provenance:null,land_use_relationality:null,
  structural_mode:null,strategic_intent:null,
  scale:null,
  governance:'Polycentric: a regional EbA programme (SPREP/PEBACC) translated into kastom governance — chiefs, community rangers, extension officers and community radio; customary forest and reef closures formalised as by-laws.',
  full_citation:'Buckwell, A., Ware, D., Fleming, C., Smart, J. C. R., Mackey, B., Nalau, J., & Dan, A. (2020). Social benefit–cost analysis of ecosystem-based climate change adaptations: A community-level case study in Tanna Island, Vanuatu. Climate and Development, 12(6), 495–510. https://doi.org/10.1080/17565529.2019.1642179',
  region:'Tanna Island, Vanuatu',doc_type:'Peer-reviewed Journal Article',
  keywords:['ecosystem-based adaptation','social benefit–cost analysis','community conservation areas','kastom governance','subsistence agriculture','reef stewardship','SIDS'],
  locations:[
    {lat:-19.520,lng:169.330,label:'Tanna Island, Vanuatu (approx., island-level)'}
  ],
  typological_logic:'A regionally designed EbA programme (SPREP/PEBACC) is adapted locally through existing civil practices. Institutional design, funding and SBCA analysis combine with subsistence farming, kastom governance and reef stewardship into a multi-scalar adaptive system.',
  operational_logic:'SPREP funding → EbA interventions (demonstration gardens, forest and marine CCAs, nurseries, poultry) → integration with livelihood practice → ecosystem restoration and productivity gains → returns valued by SBCA over 25 years (gardens BCR 93; CCA BCR ≈1.0).',
  societal_logic:'Uptake runs through social diffusion and customary governance (kastom). The externally initiated programme is regionally informed and socially embedded, reinforcing local practice and building shared adaptive capacity.',
  experiential_logic:'Adaptation is experienced as everyday productivity and ecological care — tended gardens, reforested slopes and healthier reefs — performed collectively through routine labour and ritual.',
  anchors:{
    structural:{score:null,quant:null,qual:'Distributed micro-infrastructure (gardens, poultry pens, nurseries, ranger posts), not quantified; adaptation visible as landscape habitus.',has:true},
    ecological:{score:null,quant:'10 ha forest + 2 ha reef conserved per year for 5 years; improved soil fertility.',qual:'Kastom stewardship reinforced; local ecologies restored through ritual and care.',has:true},
    economic:{score:null,quant:'Demonstration gardens NPV USD 182.6M, BCR 93 @10%; CCA NPV USD 3,275, BCR 1.01.',qual:'Local productivity translated into formal economic language, giving livelihoods policy legitimacy.',has:true},
    social:{score:null,quant:'98% of households engaged in food production; adoption of improved practices 16–32% with radio and extension support.',qual:'Stronger cohesion and inter-household learning; revival of participatory governance.',has:true},
    authorship:{score:null,quant:null,qual:'Productive mosaic of gardens, forests and reefs read as everyday landscape beauty and a sign of balance.',has:true}
  },
  key_metrics:['NPV (USD)','BCR','Forest area conserved (ha)','Reef area protected (ha)','Household adoption rate (%)'],
  key_equations:['BCR = PV_benefits / PV_costs','NPV = Σ (B_t − C_t) / (1 + r)^t (25 yrs, r = 10%; sensitivity 3–15%)','ES_value = Σ A_i × V_i','Adoption p → 2p over 25 yrs (logistic)'],
  temporalities:[
    {scale:'Event (Days)',process:'Rainfall, cyclone or tidal events affecting gardens and soil',model:'Field observation',finding:'Local knowledge enables rapid replanting and soil stabilisation; labour reallocation prevents long-term yield loss.'},
    {scale:'Annual (1 Yr)',process:'Harvest, replanting and ranger monitoring cycle',model:'SBCA annualised benefit–cost',finding:'Benefits compound as households replicate improved techniques.'},
    {scale:'Multi-Year (3–4 Yrs)',process:'Programme implementation and early diffusion',model:'SBCA cumulative projection; household surveys',finding:'Visible soil and erosion improvements; early adopters shift community norms.'},
    {scale:'Multi-Decadal (~40 Yrs)',process:'Forest and reef regeneration under community protection',model:'Scenario modelling; ES valuation extrapolation',finding:'Ecosystem services accumulate non-linearly; food production stabilises and hazard vulnerability falls.'},
    {scale:'Long-Term (10–50 Yrs)',process:'Integration of adaptation into kastom governance',model:'Long-term SBCA sensitivity (3–15%); participatory foresight',finding:'Adaptation becomes self-reinforcing through cultural normalisation.'}
  ],
  ifthen:[
    {scale:'Event',rule:'IF heavy rainfall AND soil cover maintained → erosion minimal AND crops recover rapidly.'},
    {scale:'Annual',rule:'IF adoption rate ↑ each year → annual benefits compound and diffusion accelerates.'},
    {scale:'Multi-Year',rule:'IF early adopters sustain improved yields → community-wide practice shift and ecosystem regeneration.'},
    {scale:'Multi-Decadal',rule:'IF forest and reef protection persist → ES value ↑ AND hazard vulnerability ↓.'},
    {scale:'Long-Term',rule:'IF adaptation is integrated into kastom institutions → system self-perpetuates as cultural resilience.'}
  ],
  sensory:[
    {sense:'Sight',obs:'Dark composted beds, banana shade and contour swales; thickening forest edges; reef flats brighter with fish at high tide.'},
    {sense:'Sound',obs:'Morning radio advisories; hand tools on soil; chickens; distant surf softened by reef.'},
    {sense:'Touch',obs:'Cool, friable soil; woven shade screens; rough bark of protected trees; wet sand at the reef edge.'},
    {sense:'Smell',obs:'Compost, leaf mulch, woodsmoke, brackish lagoon air.'},
    {sense:'Movement',obs:'Slow circuits between house, garden, grove and shore; communal work rhythms; quickened pace during storm preparation.'}
  ],
  sensory_statement:'Being here feels like moving inside a living workshop: soil that yields underfoot, forest edges that breathe cooler air, and a reef whose quieter surf is an audible measure of care.',
  cases:['Tanna Island — demonstration gardens and agricultural extension','Forest Community Conservation Areas (CCA)','Marine CCAs with community rangers','Community radio and extension diffusion network'],
  note:'Coastal-protection performance is not measured: reef wave-buffering is assumed from conservation area, with no wave, bathymetry or shoreline data. Evidence is economic (SBCA).',
  import_review:{
    source:STUDIES_IMPORT_SOURCE,unverified:STUDIES_IMPORT_UNVERIFIED,
    suggested:{location:{type:'Span',start:'Inland',end:'Offshore'},material:'Hybrid',basis:'Gardens and forests inland, reefs offshore; stated group type Hybrid, although the measures themselves are predominantly ecological.'},
    flags:[
      'Gardens NPV of USD 182.6M is implausibly large for a community-level project — verify currency (USD vs VUV) and aggregation in the source.',
      'All five anchors ticked ✓, but structural and authorship evidence is descriptive only.'
    ]
  }
},
{
  asa_code:'B-97-LTHC',title:'Low-Tech Hazard Coping — Reclaimed Delta Island',
  group_type:'LoTek',function_type:'Shoreline Inundation',group_code:'E',func_code:'2',
  subtype:'2E · LoTek Shoreline Inundation',citation:'Bandyopadhyay (1997)',
  position:'Shoreline',material:'Hybrid',
  location:null,location_status:null,location_reviewNotes:null,
  provenance:null,land_use_relationality:null,
  structural_mode:null,strategic_intent:null,
  scale:null,
  governance:'Fragmented: seven agencies (incl. Irrigation & Waterways Dept., Sundarban Development Board, panchayats) with overlapping mandates and no unified plan; 9 panchayats oversee 43 mouzas; villagers mobilise annually for repairs.',
  full_citation:'Bandyopadhyay, S. (1997). Natural Environmental Hazards and Their Management: A Case Study of Sagar Island, India. Singapore Journal of Tropical Geography, 18(1), 20–45.',
  region:'Sagar Island, West Bengal, India',doc_type:'Peer-reviewed Journal Article (diagnostic descriptive study)',
  keywords:['reclaimed delta','cyclone hazard','embankment erosion','mangrove loss','low-tech hazard coping','governance fragmentation','labour-intensive repair'],
  locations:[
    {lat:21.650,lng:88.080,label:'Sagar Island, South 24 Parganas, West Bengal (approx.)'}
  ],
  typological_logic:'A coping society under environmental stress: survival through cyclical manual maintenance rather than engineering control — earthen embankments repatched with intertidal clay, bamboo palisades, selective brick paving, historic earthen storm refuges, Casuarina farm forests and mangrove replanting. The logic is repetition and labour, not technological progression.',
  operational_logic:'Monsoon erosion → annual breach (≈1 per 10 km of embankment) → reactive patching with clay and bamboo → short-term security → renewed failure. Clay mined from intertidal flats for repair deepens nearshore erosion, so each repair feeds the next failure.',
  societal_logic:'Fragmented governance (seven agencies) prevents unified planning. Villagers mobilise every pre-monsoon for repairs; livelihoods are organised around risk tolerance rather than avoidance.',
  experiential_logic:'The island is in continuous re-making: mud, bamboo, wind and water define daily life. Adaptation is embodied in labour and ritualised seasonal effort rather than designed infrastructure.',
  anchors:{
    structural:{score:null,quant:'71.5 km embankments (80% earthen, 2.4 m high, 1:2 slope); ≈1 breach per 10 km per year (1990–95).',qual:'Cyclical erosion and repair; embankments symbolise tenuous safety.',has:true},
    ecological:{score:null,quant:'Mangrove replanting on 611 ha with 25–30% success; island area −25% (≈285 → 213 km², 1851–1992).',qual:'Vegetation as living buffer; Casuarina belts and native colonisers stabilise dunes.',has:true},
    economic:{score:null,quant:'Construction cost ₹252/m earthen vs ₹2,200/m brick-lined.',qual:'Affordability limits structural quality; maintenance relies on labour rather than capital.',has:true},
    social:{score:null,quant:'149,222 inhabitants (1991); 698 persons/km²; 4% annual growth.',qual:'Collective labour mobilised seasonally; embankment repair as social ritual.',has:true},
    authorship:{score:null,quant:null,qual:'Visual contrast of brick sections, bamboo walls and mudflats (Plates 2–5); a landscape of impermanence and flux.',has:true}
  },
  key_metrics:['hₑ — embankment height (m)','Bf — breach frequency (breaches/km/yr)','ΔA — coastal area loss (km²)','Ms — mangrove regeneration success (%)','Vw — wind velocity (km/h)','Cd — Casuarina dune stabilisation (qualitative)','ρp — population density (persons/km²)'],
  key_equations:['F01: erosion ↑ = f(deforestation ↑, embankment confinement ↑, sediment input ↓)','F02: flood frequency ↑ = f(embankment height ↓, surge ↑, spring-tide coincidence ↑)','F03: embankment failure ↑ = f(wave energy ↑, maintenance ↓, population pressure ↑)','F04: mangrove survival ↓ = f(anthropogenic pressure ↑, wave exposure ↑)','F05: sand encroachment ↓ = f(Casuarina ↑, dune colonisers ↑)'],
  temporalities:[
    {scale:'Event (Days)',process:'Cyclone, storm surge and embankment breach',model:'Qualitative field survey / historical records',finding:'Immediate flooding; bamboo, sandbags and storm mounds used for refuge.'},
    {scale:'Annual (1 Yr)',process:'Monsoon erosion and repair cycle',model:'Qualitative field survey / historical records',finding:'Predictable damage–repair rhythm (≈1 breach per 10 km per year); reactive adaptation.'},
    {scale:'Multi-Year (3–4 Yrs)',process:'Mangrove and dune stabilisation efforts',model:'Qualitative field survey / historical records',finding:'25–30% mangrove survival; anthropogenic pressure persists.'},
    {scale:'Multi-Decadal (~40 Yrs)',process:'Coastal retrogradation',model:'Historical map comparison (1851–1992)',finding:'≈25% land loss; settlement persists despite degradation.'},
    {scale:'Long-Term (10–50 Yrs)',process:'Governance and population trends',model:'Qualitative field survey / historical records',finding:'4% annual population growth makes the island unsustainable without coordinated intervention.'}
  ],
  ifthen:[
    {scale:null,rule:'IF cyclone coincides with spring tide → large-scale inundation → migration or loss.'},
    {scale:null,rule:'IF embankment repaired annually → short-term defence BUT long-term weakening through repeated soil extraction.'},
    {scale:null,rule:'IF mangrove buffer expanded → erosion moderates BUT cannot halt coastline retreat.'},
    {scale:null,rule:'IF dune migration allowed naturally → acts as buffer BUT human stabilisation disrupts the feedback.'},
    {scale:null,rule:'IF governance remains multi-agency and uncoordinated → all protective schemes degrade.'}
  ],
  sensory:[
    {sense:'Sight',obs:'Long, low earthen walls patched in fresh grey clay; bamboo lattices darkening with water; brick-faced segments; Casuarina lines behind pale dunes.'},
    {sense:'Sound',obs:'Monsoon wind across palisades; wave slap at dyke toes; hollow thud of bamboo driving; calls coordinating repair crews.'},
    {sense:'Touch',obs:'Heavy, slick clay on hands and feet; salt-roughened skin; splintering bamboo; loose dune sand underfoot.'},
    {sense:'Smell',obs:'Brackish tide and wet mud; faint Casuarina resin; sourness where saline water sits in fields.'},
    {sense:'Movement',obs:'Trudging along crest paths; bucket chains passing clay; quick evacuation to raised ground when water tops the wall.'}
  ],
  sensory_statement:'Life here is measured by the texture of mud and the angle of wind. Preparedness looks like lines of stakes and handprints in clay; safety feels temporary, renewed by work, undone by water.',
  cases:['Kachuberiya mouza — brick-paved embankment reaches','Dhablat mouza — Casuarina farm forests behind dunes','13 earthen/brick storm refuges (19th-c. typology; mostly dilapidated)','Jibantala–Kamalpur resettlement (100 families on 30 ha of tidal flat)'],
  note:'Historical diagnostic (1997) of a coping system under distress, not a designed measure. No model-based evaluation; performance judged by visible erosion and maintenance frequency.',
  import_review:{
    source:STUDIES_IMPORT_SOURCE,unverified:STUDIES_IMPORT_UNVERIFIED,
    suggested:{position:null,material:null,basis:'Multi-zone system (embankment edge, mangrove shoreline, inland refuges) with LoTek group type; needs a Span or Discrete-multi decision.'},
    flags:[
      'Economic anchor is marked ✖ in the record header, but the anchor matrix gives construction costs; imported as has:true.',
      'Record includes a 1–5 spider-chart scoring on 10 non-anchor attributes (labour, durability, governance…). Not carried into JS; a candidate input if anchor scoring is pursued.',
      'Island area appears as both 213 and 214 km² (1992).'
    ]
  }
},
{
  asa_code:'C-21-GCA',title:'Grey Civic Adaptation — Institutionalised Reactive Hard Measures',
  group_type:'Grey',function_type:'Civic Living',group_code:'A',func_code:'4',
  subtype:'4A · Grey Civic Living',citation:'Cao et al. (2021)',
  position:'Inland',material:'Grey',
  location:{type:'Span',start:'Shoreline',end:'Inland'},location_status:'confirmed',location_reviewNotes:null,
  provenance:null,land_use_relationality:null,
  structural_mode:null,strategic_intent:null,
  scale:null,
  governance:'Decoupled: city government (Steering Center for Urban Flood Control) raises roads and installs pumps top-down, while households self-fund 96% of private adaptations; information flows one way through public notices.',
  full_citation:'Cao, A., Esteban, M., Onuki, M., Nguyen, K., Nguyen, D. T., & Le, V. T. (2021). Decoupled formal and informal flooding adaptation and conflicts in coastal cities: A case study of Ho Chi Minh City. Ocean and Coastal Management, 209, 105654. https://doi.org/10.1016/j.ocecoaman.2021.105654',
  region:'Ho Chi Minh City, Vietnam',doc_type:'Peer-reviewed Journal Article',
  keywords:['coastal flooding','urban adaptation','reactive measures','land subsidence','social conflict','grey infrastructure','formal–informal adaptation','Vietnam'],
  locations:[
    {lat:10.776,lng:106.701,label:'Ho Chi Minh City (approx., city-level)'}
  ],
  typological_logic:'Reactive grey engineering (a logic of hardening): government raises roads and installs pumps and drainage; households individually elevate floors and use barriers. Decoupling between the two produces social and spatial conflict.',
  operational_logic:'Floods → government raises roads (+1.3 to +1.7 m) and installs pumps → house floors left below street level (“cave houses”) → residents retrofit floors, barriers and pumps → hydrological mismatch persists → distrust reinforces a reactive loop.',
  societal_logic:'Decoupled governance and unequal household capacity produce fragmented urban form and distrust. Resilience is reactive rather than anticipatory.',
  experiential_logic:'Daily life oscillates between temporary relief and recurring nuisance — pump noise, stagnant-water odour, low ceilings after floor raising. Flooding is felt as chronic maintenance fatigue.',
  anchors:{
    structural:{score:null,quant:'Roads raised +1.3 m (Kinh Duong Vuong St.), pavements +1.7 m; pump stations in District 4; 47% of households adapted physically.',qual:'“Cave houses” below street level; residents modify stairs and thresholds to cope.',has:true},
    ecological:{score:null,quant:'No eco-engineering elements recorded.',qual:'No green buffers or drainage channels visible in field photos.',has:false},
    economic:{score:null,quant:'96% of adaptations self-funded; 61% hired labour, 39% DIY.',qual:'Financial burden and inequity between owners and renters.',has:true},
    social:{score:null,quant:'48% trust government solutions, 35% neutral; 40% unaware of SLR.',qual:'Conflict with the city over road-raising height; loss of communication.',has:true},
    authorship:{score:null,quant:'Street elevations uneven by > 1 m; buildings reconstructed piecemeal.',qual:'Visual disorder — a “disorganised architectural landscape”.',has:true}
  },
  key_metrics:['h_f — flood depth (m)','t_f — flood duration (h)','Δh — road elevation change (m)','h_r — floor raising height (m)','Aₐ — self-funded adaptation (%)','T_g — public trust (Likert 1–5)','A_w — SLR awareness (0/1)'],
  key_equations:['S = h_f × t_f (flood severity)','Δh = h_road − h_floor (elevation mismatch)','C_e = Δh − h_r (elevation conflict)','logit(p) = β₀ + β₁A_w + β₂Govmea + β₃Age + β₄Gender','Aₐ = (HH_self / HH_total) × 100'],
  temporalities:[
    {scale:'Event (Days)',process:'Heavy rain + high tide cause street inundation',model:'Field observation + resident surveys',finding:'Flood depth 0.1–0.5 m, receding in < 3 h; temporary barriers and pumps deployed.'},
    {scale:'Annual (1 Yr)',process:'Road raising followed by household retrofits',model:'Engineering reports + photo comparison',finding:'Δh > h_r produces the “cave-house” effect and local conflict.'},
    {scale:'Multi-Year (3–4 Yrs)',process:'Institutional hesitation; fluctuating trust',model:'Logistic regression + follow-up interviews',finding:'Awareness ↑ → trust ↑ (β = +2.3 to +7.1); poor communication → trust ↓.'},
    {scale:'Multi-Decadal (~40 Yrs)',process:'Subsidence and infrastructure layering raise relative SLR',model:'Satellite data (Vachaud et al. 2019) + literature',finding:'Hard raising without soft integration worsens subsidence (8–70 mm/yr) and inequity.'},
    {scale:'Long-Term (10–50 Yrs)',process:'Shift to proactive coordination (scenario)',model:'Hypothetical timeline from authors’ recommendations',finding:'Early coordination reduces conflict and raises institutional trust.'}
  ],
  ifthen:[
    {scale:'Event',rule:'IF rainfall + high tide coincide → flood depth ↑ AND residents deploy pumps and barriers.'},
    {scale:'Annual',rule:'IF roads are raised without household coordination → Δh > h_r → “cave house” formation AND conflict ↑.'},
    {scale:'Multi-Year',rule:'IF communication remains poor → public trust ↓ AND institutional projects stall.'},
    {scale:'Multi-Decadal',rule:'IF subsidence continues AND only grey hardening is applied → relative SLR ↑ AND flood frequency ↑.'},
    {scale:'Long-Term',rule:'IF stakeholder coordination + soft measures precede construction → conflict ↓ AND resilience ↑.'}
  ],
  sensory:[
    {sense:'Sight',obs:'Alternating bands of asphalt and submerged pavement; tilted thresholds, stacked sandbags, glinting pumps.'},
    {sense:'Sound',obs:'Continuous hum of motors, tyres through water, echoing voices in narrow “cave” streets.'},
    {sense:'Touch',obs:'Damp concrete walls, slippery tiles, humid air from evaporating floodwater.'},
    {sense:'Smell',obs:'Stagnant drainage, fuel exhaust and wet earth, stronger at tide peaks.'},
    {sense:'Movement',obs:'Stepping between puddles, lifting goods above the waterline, bending under low ceilings after floor raising.'}
  ],
  sensory_statement:'To stand on a newly raised road in District 8 is to look down into living rooms sunken a metre below one’s feet. Movement feels compressed — residents stoop through lowered doors, vehicles mount small ramps.',
  cases:['Kinh Duong Vuong Street — road raised +1.3 m; “cave house” conflict','Surveyed areas: Thao Dien, Calmette Bridge, Tan Thuan, Pham The Hien, Nguyen Huu Canh'],
  note:'Function, metric and parameter tables are partly reconstructed by the reviewer (record: “Rest of A1 is projected”), not reported in this form by the authors.',
  import_review:{
    source:STUDIES_IMPORT_SOURCE,unverified:STUDIES_IMPORT_UNVERIFIED,
    suggested:{position:'Inland',material:'Grey',basis:'Urban road raising, pumps and household floor elevation; stated group type Grey.'},
    flags:[
      'Excluded parameter P04 (A_aut = Aₐ / (1 + e^−Tg)), which the record labels “illustrative”.',
      'Record grades anchors qualitatively (Structural High, Ecological Low, Economic Moderate, Social Strong, Authorship Weak) — a possible basis for scores, not carried into JS.',
      'Check whether the trust β values (+2.3 to +7.1) are coefficients or odds ratios.'
    ]
  }
},
{
  asa_code:'C-24-GED',title:'Grey Edge Defence — Tidal-Blocking Seawall',
  group_type:'Grey',function_type:'Edge Defense',group_code:'A',func_code:'1',
  subtype:'1A · Grey Edge Defense',citation:'Chen et al. (2024)',
  position:null,material:null,
  location:null,location_status:null,location_reviewNotes:null,
  provenance:null,land_use_relationality:null,
  structural_mode:null,strategic_intent:null,
  scale:null,
  governance:'National and provincial coastal protection bureaus; top-down engineering paradigm prioritising land protection and reclamation, sited within a marine ecological reserve.',
  full_citation:'Chen, C., Liu, Y., Dokohely, M. E., Liu, J., & Hu, B. (2024). Assessing the ecological response of plant and soil to the seawalls in the Laizhou Bay coastal wetland, China. Marine Environmental Research, 201, 106678. https://doi.org/10.1016/j.marenvres.2024.106678',
  region:'Laizhou Bay, Shandong, China',doc_type:'Peer-reviewed Journal Article (empirical field study)',
  keywords:['coastal wetlands','seawalls','soil salinity','C:N:P stoichiometry','plant succession','habitat fragmentation','tidal connectivity'],
  locations:[
    {lat:37.080,lng:119.450,label:'Changyi National Marine Ecological Special Reserve, Laizhou Bay (approx.)'}
  ],
  typological_logic:'The seawall is a fixed barrier separating the intertidal zone (outside) from the inland plain (inside), eliminating tidal connectivity. Two divergent ecological states result: saline, inundated, low-diversity salt marsh outside; drier, nutrient-accumulating, terrestrialising habitat inside — hydrological segregation rather than integrated protection.',
  operational_logic:'Seawall construction → tidal blockage → hydrological disconnection → lower salinity and moisture, nutrient accumulation inside → shift from halophytic annuals to terrestrial perennials → decline in wetland functionality and resilience.',
  societal_logic:'Built for coastal protection and agricultural security, but its long-term effect reduces ecological exchange and sediment dynamics; it shows the limits of purely defensive grey strategies and the case for hybrid edges that restore partial tidal exchange.',
  experiential_logic:'A visible sensory division: outside bright, saline and rhythmically inundated; inside muted and still, with dry soils and denser terrestrial growth. The dynamic edge becomes a static line.',
  anchors:{
    structural:{score:null,quant:'Seawall ≈5 km × 7.6 km; tidal inflow fully blocked after 2010; pH and salinity divergence across the wall (p < 0.001).',qual:'Hard linear edge creates visual and spatial separation of tidal and terrestrial environments.',has:true},
    ecological:{score:null,quant:'Soil salinity ≈6 inside vs ≈17–18 outside (units given as both % and ppt); 13 species inside vs 5 outside; soil C, N, P higher inside (p < 0.01).',qual:'Loss of salt-marsh halophytes; terrestrial shrubs (Tamarix chinensis) emerge — apparent richness masks functional simplification.',has:true},
    economic:{score:null,quant:'No cost–benefit quantified.',qual:'Implicit protection of reclaimed land from flooding and alkalinisation.',has:false},
    social:{score:null,quant:'No survey data.',qual:'Implied reliance on engineered control over coexistence.',has:false},
    authorship:{score:null,quant:null,qual:'Not discussed in study. Record notes the visual monotony of a hard boundary replacing a transitional ecotone.',has:false}
  },
  key_metrics:['S — soil salinity (ppt)','pH','Soil C, N, P (% mass)','Plant C:N:P ratios','Species richness (count)','θ — soil moisture (%)'],
  key_equations:['P01: ΔN, ΔP ∝ −ΔS (GLM; salinity explains 92.4% of soil variation)','P02: Annual ↔ C:N; Perennial ↔ C:P','P03: S ↑ → species richness ↓','P04: moisture ↓ → pH ↑'],
  temporalities:[
    {scale:'Event (Days)',process:'Tidal inundation stops at barrier closure',model:'Field sampling + pH/salinity measurement',finding:'Sharp moisture and salinity contrast forms immediately.'},
    {scale:'Annual (1 Yr)',process:'Seasonal dominance shifts among annual halophytes outside',model:'GLM and species frequency data',finding:'Suaeda salsa cycles with wet and dry seasons; inner zone unchanged.'},
    {scale:'Multi-Year (3–4 Yrs)',process:'Perennial succession inside the wall after 2010',model:'Remote sensing + field surveys (2010–2022)',finding:'Soil P and organic matter accumulation drive perennial expansion.'},
    {scale:'Multi-Decadal (~40 Yrs)',process:'Nutrient build-up and loss of tidal wetland function',model:'Historical imagery (1985–2022)',finding:'Terrestrialisation and biodiversity decline expected.'},
    {scale:'Long-Term (10–50 Yrs)',process:'Tidal reconnection needed to restore function',model:'Conceptual SEM projection',finding:'System remains impaired until tidal exchange is reintroduced.'}
  ],
  ifthen:[
    {scale:'Event',rule:'IF tide blocked → soil moisture drops immediately.'},
    {scale:'Annual',rule:'IF salinity peaks in the dry season → annual halophytes dominate the outer zone.'},
    {scale:'Multi-Year',rule:'IF soil P ↑ inside → perennial shrubs expand.'},
    {scale:'Multi-Decadal',rule:'IF tidal flow remains cut → carbon stock ↑ but biodiversity ↓.'},
    {scale:'Long-Term',rule:'IF connectivity restored → mixed vegetation and nutrient balance return.'}
  ],
  sensory:[
    {sense:'Sight',obs:'A stark concrete horizon dividing glinting salt-encrusted flats outside from dull green Tamarix and reed thickets inside.'},
    {sense:'Sound',obs:'Outside, a faint rhythm of waves; inside, the rustle of dry shrubs. The absence of tidal lapping is palpable.'},
    {sense:'Touch',obs:'Coarse salt crystals beyond the wall; compacted dry soil within; cool wind outside, stagnant warmth inside.'},
    {sense:'Smell',obs:'Sharp brine on the seaward side; earthy and vegetal within.'},
    {sense:'Movement',obs:'Air and water movement stop abruptly at the concrete boundary; no tide advancing or retreating.'}
  ],
  sensory_statement:'Standing before the seawall, one feels the truncation of motion. The coast no longer breathes — its tides muted, its soils drying. What once was a shifting ecology now reads as two static landscapes: a wall between vitality and security.',
  cases:['Changyi National Marine Ecological Special Reserve — 54 quadrats sampled inside vs outside a seawall built c. 2010'],
  note:'Field ecology study of seawall side-effects, not of protective performance. Construction date (~2010) is inferred in the record, not stated by the authors.',
  import_review:{
    source:STUDIES_IMPORT_SOURCE,unverified:STUDIES_IMPORT_UNVERIFIED,
    suggested:{position:'Edge',material:'Grey',basis:'Fixed barrier between intertidal zone and inland plain; stated group type Grey.'},
    flags:[
      'Value conflict: “17–18%” is given as outside soil salinity (anchor matrix) and as outside soil moisture (methods table); salinity units switch between % and ppt. Check against the paper.',
      'Section 7 (Notes for Consolidation) is truncated mid-sentence (“Demonstrates how”).',
      'Cross-references B-18-MGFB (Boateng 2018, Mangrove Forest Belt), which is in neither the corpus nor the JS.'
    ]
  }
}

];

/**
 * STUDIES_SCREENING — SLR finds held in the corpus in the shorter template format
 * (Field/Details + anchor ✅/⚠/❌ evidence + operationalised ground conditions), without
 * an ASA code, temporalities, societal/experiential logics or sensory notes. They are
 * NOT read by index.html or spatial-strategy.html; they sit here so the SLR corpus and
 * the catalogue stay in one place. Promote an entry to STUDIES once it has a full SAS
 * record.
 *
 * anchors: 'yes' (✅) | 'partial' (⚠) | 'no' (❌), as marked in the corpus record.
 * group_hint: the corpus's own group/subtype label where one is given; otherwise null.
 */
var STUDIES_SCREENING_GAP=['asa_code','temporalities','ifthen','societal_logic','experiential_logic','sensory','classification fields'];
var STUDIES_SCREENING=[
{
  citation:'Zahra (2018)',
  full_citation:'Zahra, K.A. (2018). Assessment of implementation stages of submerged breakwater on the bay and shoreline at Al-Ahlam Sea Resort, Northwest Coast, Egypt. Ocean and Coastal Management, 165, 15–32. https://doi.org/10.1016/j.ocecoaman.2018.08.009',
  typology:'Submerged breakwater with accompanying lagoon and groins',
  region:'Al-Ahlam Sea Resort, Northwest Coast, Egypt',
  group_hint:'1A · Grey Edge Defence',
  typological_logic:'Shore-parallel rubble-mound breakwater for wave dissipation and sediment retention.',
  methods:'MIKE 21 (Litline, Litprof), hydrographic surveys, sediment sampling, Google Earth shoreline change analysis.',
  anchors:{structural:'yes',ecological:'yes',economic:'yes',social:'partial',authorship:'partial'},
  key_finding:'Construction stalled at ~60%; uncoordinated groins and lagoon trapped sediment and caused ~45,000 m³ of beach loss on the eastern beach and ~$2M in losses.',
  status:'template record',missing:STUDIES_SCREENING_GAP,notes:null
},
{
  citation:'Jo et al. (2025)',
  full_citation:'Jo, J., Kim, S., Kim, J., & Mori, N. (2025). Coastal and pluvial compound flooding of surge, wave, tide, rainfall-runoff, sewer flow, and seawall failure at coastal urban areas. Journal of Hydrology, 661, 133698. https://doi.org/10.1016/j.jhydrol.2025.133698',
  typology:'Vertical concrete seawall — compound flood resistance (surge, overtopping, rainfall-runoff, sewer reverse flow)',
  region:'Kansai International Airport, Osaka Bay, Japan',
  group_hint:null,
  typological_logic:'Seawall as primary perimeter defence, vulnerable to threshold exceedance; compound-flood model includes a structural failure module.',
  methods:'Coupled SuWAT model; Typhoon Jebi (2018) hindcast validated against wind, pressure, waves, tide and 14 flood-depth points; collapse-threshold sensitivity tests.',
  anchors:{structural:'yes',ecological:'partial',economic:'yes',social:'partial',authorship:'no'},
  key_finding:'Overtopping supplied 90.8% of flood volume, seawall collapse 7.46%, sewer reverse flow 1.7%; collapse modelled at q ≥ 0.02 m³/s/m (MLIT paved-crest criterion).',
  status:'template record',missing:STUDIES_SCREENING_GAP,
  notes:'Record includes a cross-standard allowable-overtopping table (MLIT, EurOtop, USACE) — useful for Standard Objects threshold work.'
},
{
  citation:'Ng et al. (2014)',
  full_citation:'Ng, K., Walker, P., & Pintado, J. (2014). Maintaining a way of life for São Miguel Island (the Azores archipelago, Portugal): An assessment of coastal processes and protection. Ocean & Coastal Management, 93, 134–146. https://doi.org/10.1016/j.ocecoaman.2014.03.009',
  typology:'Hard engineering (seawalls, breakwaters, rock armour) with Multifunctional Artificial Reefs (MFARs) explored',
  region:'São Miguel Island, Azores, Portugal',
  group_hint:null,
  typological_logic:'Coastal protection to preserve socio-economic activity, heritage and hazard resilience; hybrid MFARs considered for ecological and recreational benefit.',
  methods:'Tide gauge analysis, wind/wave modelling, GIS population-exposure analysis, review of three coastal towns, review of global MFAR projects.',
  anchors:{structural:'yes',ecological:'partial',economic:'yes',social:'yes',authorship:'partial'},
  key_finding:'On a small island with limited retreat options, hard defences sustained livelihoods and heritage; MFARs proposed but untested locally and without cost–benefit analysis.',
  status:'template record',missing:STUDIES_SCREENING_GAP,notes:null
},
{
  citation:'Corbella & Stretch (2012)',
  full_citation:'Corbella, S., & Stretch, D. D. (2012). Geotextile sand filled containers as coastal defence: South African experience. Geotextiles and Geomembranes, 35, 120–130. https://doi.org/10.1016/j.geotexmem.2012.09.004',
  typology:'Geotextile sand-filled containers (GSC) as seawalls and groynes',
  region:'KwaZulu-Natal, South Africa (Durban, Umhlanga, Umdloti, Vetch’s Beach)',
  group_hint:null,
  typological_logic:'Pseudo-soft defence combining erosion resistance with removability, aimed at political, social and environmental acceptability.',
  methods:'Post-storm damage surveys, geotextile material testing (tensile, seam, UV, abrasion), Coulomb slope-stability calculation, field observation.',
  anchors:{structural:'yes',ecological:'partial',economic:'partial',social:'partial',authorship:'partial'},
  key_finding:'Main failure mechanism is sand migration within under-filled bags; 45° slopes more stable than 30°; >20,000 units installed after the March 2007 storm (Hs 8.5 m).',
  status:'template record',missing:STUDIES_SCREENING_GAP,notes:null
},
{
  citation:'Mi et al. (2022)',
  full_citation:'Mi, J., Zhang, M., Zhu, Z., Vuik, V., Wen, J., Gao, H., & Bouma, T. J. (2022). Morphological wave attenuation of the nature-based flood defense: A case study from Chongming Dongtan Shoal, China. Science of the Total Environment, 831, 154813. https://doi.org/10.1016/j.scitotenv.2022.154813',
  typology:'Nature-based flood defence — saltmarsh morphology as primary wave attenuator',
  region:'Chongming Dongtan Shoal, Yangtze Estuary, China',
  group_hint:null,
  typological_logic:'An elevated, wide intertidal platform induces depth-limited wave breaking and bottom friction, compensating for vegetation fragility in storms.',
  methods:'UAV photogrammetry and DEMs, bathymetric surveys, TELEMAC-2D + TOMAWAC simulations, NPV/BCR analysis.',
  anchors:{structural:'yes',ecological:'yes',economic:'yes',social:'partial',authorship:'partial'},
  key_finding:'Morphology provided 65–78% of storm wave attenuation (vegetation 22–35%); mudflat surfaces recover within one week to two months after storms.',
  status:'template record',missing:STUDIES_SCREENING_GAP,notes:null
},
{
  citation:'Sawyer et al. (2020)',
  full_citation:'Sawyer, A.C., Toft, J.D., & Cordell, J.R. (2020). Seawall as salmon habitat: Eco-engineering improves the distribution and foraging of juvenile Pacific salmon. Ecological Engineering, 151, 105856. https://doi.org/10.1016/j.ecoleng.2020.105856',
  typology:'Eco-engineering retrofit of an urban seawall (light-penetrating surfaces, intertidal benches, textured panels)',
  region:'Elliott Bay, Seattle, Washington, USA',
  group_hint:null,
  typological_logic:'Retrofit of a vertical seawall to reduce pier shade and increase habitat complexity for migrating juvenile salmon.',
  methods:'Snorkel surveys (density, distribution, feeding), before/after PAR light measurement, linear models and chi-square tests.',
  anchors:{structural:'yes',ecological:'yes',economic:'partial',social:'yes',authorship:'partial'},
  key_finding:'Under-pier juvenile salmon feeding rose from 0% to 27% after light-penetrating surfaces were installed; nearshore between-pier light fell ~50%.',
  status:'template record',missing:STUDIES_SCREENING_GAP,notes:null
},
{
  citation:'Chinampa compilation (Flores et al. 2018; Robles et al. 2019; Merlín-Uribe et al. 2013; Crossley 1999, 2004; others)',
  full_citation:null,
  typology:'Raised-field agroforestry with canal-based wetland agriculture',
  region:'Xochimilco, Mexico City, Mexico',
  group_hint:null,
  typological_logic:'Artificial islands in shallow lakes framed with willow stakes and reed fences, filled with mud and organics to form sponge soils, stabilised by trees and integrated with canals for hydrology, biodiversity and transport.',
  methods:'Multi-source synthesis: soil and microbial studies, sub-irrigation research, water-quality citizen science, food-network and tourism studies, documentary transcript.',
  anchors:{structural:'yes',ecological:'yes',economic:'yes',social:'yes',authorship:'yes'},
  key_finding:'Beds 50–70 cm above canal water and ≤12 m wide sustain capillary sub-irrigation (fringe 30–45 cm, up to 75 cm) and up to 7 harvests/yr; area fell from >100,000 ha to ~2,200 ha.',
  status:'compilation',missing:['single primary source'].concat(STUDIES_SCREENING_GAP),
  notes:'Built from 13 sources, including a documentary transcript (Millison 2023). A full record needs one primary study, or an explicit decision to allow compiled records.'
},
{
  citation:'Smith et al. (2017)',
  full_citation:'Smith, C.S., Gittman, R.K., Neylan, I.P., Scyphers, S.B., Morton, J.P., Fodrie, F.J., Grabowski, J.H., & Peterson, C.H. (2017). Hurricane damage along natural and hardened estuarine shorelines: Using homeowner experiences to promote nature-based coastal protection. Marine Policy, 81, 350–358. https://doi.org/10.1016/j.marpol.2017.04.013',
  typology:'Comparison: bulkheads, riprap revetments, living shorelines (sills with plantings), natural shorelines',
  region:'North Carolina estuarine shorelines, USA',
  group_hint:'Comparative shoreline protection assessment',
  typological_logic:'Tests whether hardened shorelines outperform natural and nature-based alternatives in storm damage, cost and durability.',
  methods:'689-property owner survey, hurricane damage field surveys (Irene 2011, Arthur 2014, 2016 follow-up), CHAID, ANOVA, GIS fetch measurement.',
  anchors:{structural:'yes',ecological:'yes',economic:'yes',social:'yes',authorship:'partial'},
  key_finding:'All major hurricane failures were bulkheads; bulkheads cost ~2× natural shorelines to repair after hurricanes and ~4× to maintain; neighbouring bulkheads prompt further hardening.',
  status:'template record',missing:STUDIES_SCREENING_GAP,
  notes:'Covers four shoreline types, so it may split into several records. One threshold in the record is a placeholder (“Average fetch > X m”).'
},
{
  citation:'Le Xuan et al. (2022)',
  full_citation:'Le Xuan, T., Tran Ba, H., Vo Quoc, T., Wright, D.P., Tanim, A.H., & Tran Anh, D. (2022). Evaluation of coastal protection strategies and proposing multiple lines of defense under climate change in the Mekong Delta for sustainable shoreline protection. Ocean & Coastal Management, 228, 106301. https://doi.org/10.1016/j.ocecoaman.2022.106301',
  typology:'Pile-rock breakwaters (concrete pile rows filled with granite, beam-framed)',
  region:'Mekong Delta (Ca Mau, Bac Lieu, Soc Trang), Vietnam',
  group_hint:null,
  typological_logic:'Offshore porous breakwater that dissipates wave energy while letting sediment through for accretion.',
  methods:'Lab and field measurements; 8–10 years of site monitoring (2013–2021).',
  anchors:{structural:'yes',ecological:'yes',economic:'partial',social:'partial',authorship:'partial'},
  key_finding:'Dissipates 50–80% of wave energy and enables hinterland accretion and mangrove regrowth, but >50% wave reflection causes toe erosion (−0.4 m/yr at Ganh Hao).',
  status:'template record',missing:STUDIES_SCREENING_GAP,notes:null
},
{
  citation:'Schmid (2011)',
  full_citation:'Schmid, S. (2011). Catching Rainfall in Marina Bay: Water Necessity, Policy, and Innovation in Singapore. IGEL Research Brief, University of Pennsylvania.',
  typology:'Multipurpose barrage–reservoir system (Marina Barrage)',
  region:'Marina Bay, Singapore',
  group_hint:null,
  typological_logic:'Barrage blocks seawater intrusion and captures river and rainfall runoff as a freshwater reservoir — flood control, water supply and recreation combined.',
  methods:'Water-quality monitoring, catchment modelling, PUB system indicators, flood-control system tests (as reported in the brief).',
  anchors:{structural:'yes',ecological:'partial',economic:'yes',social:'yes',authorship:'yes'},
  key_finding:'Supplies ~10% of national water demand from a 10,000 ha catchment; only ~25 of 139 fish species predicted to persist once the basin turns freshwater.',
  status:'template record',missing:STUDIES_SCREENING_GAP,
  notes:'Grey-literature research brief, not peer-reviewed. A primary PUB or engineering source would strengthen a full record.'
},
{
  citation:'Etemadi et al. (2011)',
  full_citation:'Etemadi, A., Emami, Y., AsefAfshar, O., & Emdadi, A. (2011). Electricity Generation by the Tidal Barrages. Energy Procedia, 12, 928–935. https://doi.org/10.1016/j.egypro.2011.10.122',
  typology:'Tidal barrage (single- and double-basin)',
  region:'Global review (France, Canada, Russia, China)',
  group_hint:null,
  typological_logic:'A barrage across an estuary traps tidal flow; the hydrostatic head drives turbines (ebb, flood or two-way generation); a double basin adds storage to match demand.',
  methods:'Case reviews, turbine design classification, feasibility studies, plant output data.',
  anchors:{structural:'yes',ecological:'partial',economic:'yes',social:'partial',authorship:'no'},
  key_finding:'Viability requires tidal range > 5 m; La Rance (240 MW, operating since 1967) uses two-way generation with pumped storage.',
  status:'template record',missing:STUDIES_SCREENING_GAP,
  notes:'Energy-generation review with no coastal-protection performance data. Check fit with the catalogue’s scope before promoting.'
},
{
  citation:'Rtimi et al. (2022)',
  full_citation:'Rtimi, R., Sottolichio, A., & Tassi, P. (2022). The Rance tidal power station: Toward a better understanding of sediment dynamics in response to power generation. Renewable Energy, 201, 323–343. https://doi.org/10.1016/j.renene.2022.10.061',
  typology:'Tidal power station (barrage type)',
  region:'Rance Estuary, Brittany, France',
  group_hint:null,
  typological_logic:'Harnesses tidal range through ebb and two-way generation; the barrage modifies tidal prism, currents and sediment fluxes.',
  methods:'Turbidity probes (SSC), ALTUS acoustic bed-level probes, sediment sampling, TELEMAC-3D calibrated with ADCP.',
  anchors:{structural:'yes',ecological:'yes',economic:'yes',social:'partial',authorship:'partial'},
  key_finding:'The power station roughly doubles sedimentation relative to natural forcing and drives net upstream sediment flux; navigation depends on dredging and hydraulic flushing.',
  status:'template record',missing:STUDIES_SCREENING_GAP,notes:null
},
{
  citation:'Ameh (2019)',
  full_citation:null,
  typology:'Biomimetic study of amphibious architecture — precedent catalogue',
  region:'Global (UK, Thailand, Bangladesh, Netherlands, USA)',
  group_hint:'4D (filed under Amphibious in the corpus)',
  typological_logic:'Catalogues amphibious and floating building precedents and seven biomimetic analogues for buoyancy, stability and durability.',
  methods:'Literature-based typological review; no site measurement, modelling or performance evaluation.',
  anchors:{structural:'no',ecological:'no',economic:'no',social:'no',authorship:'no'},
  key_finding:'Function–form analogues (e.g. kelp pneumatocysts for buoyant foundations; mangrove stilt roots for anchoring) remain conceptual; nothing is translated or tested.',
  status:'reference note',missing:['full citation'],
  notes:'The corpus says this should inform concept derivation, not stand as a record. Linked to A-24-AMPH (shared precedents: Ban Sang, LIFT House).'
}
];
