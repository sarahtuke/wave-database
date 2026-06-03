var STUDIES=[
{
  asa_code:'A-19-BSDH',title:'Buried Seawall–Dune Hybrid System',
  group_type:'Hybrid',function_type:'Edge Defense',group_code:'C',func_code:'1',
  subtype:'1C · Hybrid Edge Defense',citation:'Almarshed et al. (2019)',
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
  note:'Conceptually proven CPM, but no concrete design evaluation. Designers must integrate with caution.'
},
{
  asa_code:'B-18-SF',title:'Community-Based Silvofishery System',
  group_type:'LoTek',function_type:'Productive Landscapes',group_code:'E',func_code:'3',
  subtype:'3E · LoTek Productive Landscapes',citation:'Basyuni et al. (2018)',
  full_citation:'Basyuni, M., Yani, P., & Hartini, K.S. (2018). Evaluation of mangrove management through community-based silvofishery in North Sumatra, Indonesia. IOP Conference Series: Earth and Environmental Science, 122(1), 012109.',
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
];
