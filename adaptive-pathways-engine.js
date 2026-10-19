/* adaptive-pathways-engine.js
 * The scoring + time layer for Re-stacking — Technical Cloister (TC) Pcn and strategy EP,
 * evaluated at milestones. Kept in its own file, like process-stacking-engine.js, because
 * this is the seam that changes as the framework's open values get decided. The page
 * (spatial-strategy.html) only consumes what apEvaluateTC() / apEP() hand back.
 *
 * Formulas on record (Adaptation Strategy notes, Sep–Oct 2026):
 *   Pcn(t) = ∏ Âa,cn(t)^Wa          weighted geometric mean across the five anchors, within
 *                                   one TC — non-compensatory (anchors are non-substitutable)
 *   EP(T)  = Σ Wcn × Pcn(t)          weighted arithmetic sum across TCs at horizon T —
 *                                   compensation across TCs is intentional
 *   Âa,cn  threshold-normalised anchor score, 0–1, against a context-specific threshold
 *   Floor  a TC with any Âa,cn below the anchor floor is excluded from EP
 *
 * Ageing (Decision Log T-1, 18 Oct 2026) — not modelled continuously; three discrete parts:
 *   - time-profile class per CPM: ramp-up | plateau | decline | step-and-reset
 *   - milestone schedule m(t): the Âa,cn each TC is expected to reach at each milestone
 *   - state rule: saturated by design / still working by design / not reaching milestones,
 *     judged on the TC's Pcn — the whole TC's performance is the determinant, not any one
 *     anchor (user correction, 18 Oct 2026)
 * Saturation is an acceptable state. The TIPPING POINT is failure ("not reaching milestones")
 * and it is not read as an end: it is where process-restacking begins — a new TC takes over
 * from that year, so new processes of place emerge (the thesis's regenerative argument).
 * The parent TC stops contributing to EP from the restack year. Its CPMs only count in the
 * new TC if the user reconsiders them: "maintained" (maintenance resumes from that year) or
 * "rebuilt" (built again that year, ageing from zero).
 * and the three things behind "ageing" enter in different places:
 *   maturation + degradation → the TC's own Âa,cn (via its time profile)
 *   threshold drift (e.g. SLR raising SWL) → the threshold Âa,cn is normalised against
 * so each TC is evaluated three ways per milestone:
 *   expected        design profile, maintenance as designed, threshold fixed at t0  = m(t)
 *   observedNoDrift profile under the chosen maintenance scenario, threshold fixed
 *   observed        same, with the driver's threshold drift applied
 * expected − observedNoDrift is the TC's own shortfall (→ maintenance / replacement);
 * observedNoDrift − observed is driver drift (→ a new adaptive strategy). That split is the
 * restacking trigger's cause.
 *
 * How a tipping point shapes what comes next (19 Oct 2026) — release → reorganisation, as in
 * the adaptive cycle, rather than end-of-life → replacement:
 *   - RELEASE BRIEF  apReleaseBrief(): at the restack year, which anchors carried the TC's
 *                    shortfall (each anchor's share of ln(Pcn_exp / Pcn_obs)), which held, and
 *                    the cause. The page ranks successor CPMs against it (driving anchors
 *                    answered; driver drift → favour CPMs that grow, TC shortfall → renew the
 *                    same niche).
 *   - LEGACY         a parent CPM can be "transformed" into the new TC instead of maintained,
 *                    rebuilt or dropped: its state at release (K) is released into the child
 *                    as legacy that fades with time, and the child grows on it:
 *                      L_a(t) = 1 − ∏_m (1 − ρ_a,m · K_a,m · e^(−(t − t_r)/τ))
 *                      Â_child = own + L · (1 − own)
 *                    ρ by the parent CPM's material (AP_LEGACY_RHO), τ in AP_PARAMS.legacyTau.
 *
 * EVERY NUMBER IN AP_PARAMS / AP_PROFILE_DEFAULTS / AP_LEGACY_RHO IS A PLACEHOLDER. None are sourced; they
 * exist so the chart runs end to end. Open issues they stand in for are noted inline.
 */

var AP_ANCHORS=['structural','ecological','economic','social','authorship'];

// Milestones in years from now. Snapshot model — Pcn is only read at these points.
// One shared schedule for now; per-TC schedules are allowed by the notes but not yet set.
var AP_MILESTONES=[0,5,10,15,20,25,30,35,40,45,50];
function apMilestoneLabel(y){return y===0?'Now':'+'+y+'y';}

var AP_PARAMS={
  // Raw 0–10 score that counts as fully meeting the threshold (Âa,cn = 1). PLACEHOLDER —
  // the notes call for a context-specific threshold; nothing site-specific exists yet.
  threshold:{structural:8,ecological:8,economic:8,social:8,authorship:8},
  // Driver drift: threshold rise per year on the raw 0–10 scale. PLACEHOLDER single SLR
  // scenario — structural demand rises with SWL; ecological slightly (coastal squeeze).
  driftPerYear:{structural:0.03,ecological:0.01,economic:0,social:0,authorship:0},
  // Anchor floor on Âa,cn — any anchor below it drops the TC from EP. PLACEHOLDER (issue 1.7).
  anchorFloor:0.4,
  // Minimum Wa so an under-active site process never weights to irrelevance. PLACEHOLDER (issue 1.7).
  waFloor:0.10,
  // State rule: ε tolerance and k consecutive milestones. PLACEHOLDER — values undefined in the notes.
  epsilon:0.05,
  k:2,
  // Which anchors a time profile moves. PLACEHOLDER — maturation/degradation is read as a
  // change in physical capacity; economic/social/authorship are held at their corpus value.
  profileAnchors:['structural','ecological'],
  // Legacy half-life scale: years over which a transformed parent's released capital fades
  // (e^−1 after τ). PLACEHOLDER.
  legacyTau:15,
  // An anchor counts as "driving" the release if it carries at least this share of the
  // shortfall. PLACEHOLDER.
  drivingShare:0.2
};

// ρ_a — share of a transformed CPM's state at release that the new TC can grow on, by the
// parent CPM's material. PLACEHOLDER, read as: grey mass becomes substrate / armour for new
// habitat (structural, some ecological); green systems leave ecological memory (seed bank,
// sediment, root mat); every CPM leaves some know-how, governance and place identity.
var AP_LEGACY_RHO={
  Grey:  {structural:0.5,ecological:0.3,economic:0.2,social:0.2,authorship:0.2},
  Green: {structural:0.3,ecological:0.6,economic:0.2,social:0.25,authorship:0.25},
  Hybrid:{structural:0.4,ecological:0.45,economic:0.2,social:0.2,authorship:0.2}
};

// Time-profile parameters by material. PLACEHOLDER until the SAS template carries time to
// establishment / service interval / design life per CPM — when a study or standard object
// has a `time_profile` object, its fields override these (see apProfileFor).
//   tEst        years to establishment (ramp-up)
//   f0          capacity fraction at t=0 for a ramp-up (relative to the corpus score)
//   service     maintenance interval, years (step-and-reset)
//   decay       capacity lost per year between resets
//   designLife  years after which maintenance no longer resets capacity
//   fMin        capacity never falls below this
var AP_PROFILE_DEFAULTS={
  Green: {cls:'ramp-up',tEst:10,f0:0.5,designLife:Infinity,fMin:0.2},
  Grey:  {cls:'step-and-reset',service:7,decay:0.012,designLife:50,fMin:0.2},
  // Hybrid isn't one of the four classes — read as half ramp-up, half step-and-reset. PLACEHOLDER.
  Hybrid:{cls:'composite',tEst:8,f0:0.6,service:7,decay:0.012,designLife:50,fMin:0.2}
};
var AP_PROFILE_LABELS={'ramp-up':'ramp-up','plateau':'plateau','decline':'decline','step-and-reset':'step-and-reset','composite':'ramp-up + step-and-reset'};

function apProfileFor(cpm,existing){
  var base=AP_PROFILE_DEFAULTS[cpm.material]||{cls:'plateau',fMin:0.2};
  var override=(cpm._study&&cpm._study.time_profile)||cpm.time_profile||null;
  var p=Object.assign({},base,override||{});
  p.sourced=!!override;
  // Something already on site is past establishment — it starts on its plateau, not at f0.
  p.age0=existing&&p.tEst?p.tEst:0;
  p.installT=0; // year the CPM is built — set by the page for CPMs placed in a restack
  return p;
}

// Capacity multiplier f(t) ∈ [fMin,1] on the corpus score. maintain=false defers all resets.
function apCapacity(p,t,maintain){
  var age=t-(p.installT||0)+(p.age0||0);
  function ramp(){
    var f=p.f0+(1-p.f0)*Math.min(1,age/p.tEst);
    if(isFinite(p.designLife)&&age>p.designLife)f-=(p.decay||0.012)*(age-p.designLife);
    return f;
  }
  function step(){
    var lastReset=0;
    if(maintain){
      var lastByLife=Math.floor(p.designLife/p.service)*p.service;
      lastReset=Math.min(Math.floor(age/p.service)*p.service,lastByLife);
    }
    // Carried forward as "maintained" in a restack: maintenance resumes at that year (a reset
    // then, then every service interval) whatever the scenario — an explicit decision, so the
    // design-life cut-off doesn't apply.
    if(p.maintainFrom!=null){
      var mAge=p.maintainFrom-(p.installT||0)+(p.age0||0);
      if(age>=mAge)lastReset=Math.max(lastReset,mAge+Math.floor((age-mAge)/p.service)*p.service);
    }
    return 1-p.decay*(age-lastReset);
  }
  var f;
  if(p.cls==='ramp-up')f=ramp();
  else if(p.cls==='step-and-reset')f=step();
  else if(p.cls==='decline')f=1-(p.decay||0.012)*age;
  else if(p.cls==='composite')f=0.5*ramp()+0.5*step();
  else f=1;
  return Math.max(p.fMin==null?0:p.fMin,Math.min(1,f));
}

// drift → the threshold at year t; no drift → frozen at baseT (the year the TC was formed,
// which is what its design expectation is set against).
function apThreshold(a,t,drift,baseT){
  return AP_PARAMS.threshold[a]+AP_PARAMS.driftPerYear[a]*(drift?t:(baseT||0));
}

// Wa with the minimum-weight floor applied, renormalised to sum to 1.
function apNormaliseWeights(w){
  var out={},sum=0;
  AP_ANCHORS.forEach(function(a){out[a]=Math.max(w[a]||0,AP_PARAMS.waFloor);sum+=out[a];});
  AP_ANCHORS.forEach(function(a){out[a]/=sum;});
  return out;
}

// Pcn = ∏ Â^Wa over the anchors with data, Wa renormalised to that subset. Â=0 → Pcn=0.
function apPcn(ahat,wa){
  var avail=AP_ANCHORS.filter(function(a){return ahat[a]!=null;});
  if(!avail.length)return null;
  var wSum=avail.reduce(function(s,a){return s+wa[a];},0);
  var logSum=0;
  for(var i=0;i<avail.length;i++){
    var a=avail[i];
    if(ahat[a]<=0)return 0;
    logSum+=(wa[a]/wSum)*Math.log(ahat[a]);
  }
  return Math.exp(logSum);
}

// TC-level Âa,cn at year t. Member scores aggregate as an ARITHMETIC MEAN — the notes don't
// fix how members combine (user's least-certain point; trialled as-is, 18 Oct 2026).
function apTcAhat(members,t,opts){
  var out={};
  AP_ANCHORS.forEach(function(a){
    var vals=[];
    members.forEach(function(m){
      var raw=m.raw[a];
      if(raw==null||t<(m.profile.installT||0))return; // not built yet
      var f=AP_PARAMS.profileAnchors.indexOf(a)>-1?apCapacity(m.profile,t,opts.maintain):1;
      vals.push(raw*f);
    });
    var L=opts.legacy?opts.legacy(t)[a]:0;
    if(!vals.length){out[a]=L>0?L:null;return;}
    var mean=vals.reduce(function(x,y){return x+y;},0)/vals.length;
    var own=Math.max(0,Math.min(1,mean/apThreshold(a,t,opts.drift,opts.baseT)));
    out[a]=own+L*(1-own); // the young TC grows on the released capital; it matters less as own ↑
  });
  return out;
}

/**
 * Legacy of transformed parent CPMs, released at tr. legacy: [{raw, profile, material}].
 * K_a,m = the CPM's Â at release (observed scenario); returns t → {anchor: L_a(t)}.
 */
function apLegacyFn(legacy,tr,scenario){
  if(!legacy||!legacy.length)return null;
  var maintain=!scenario.deferMaintenance;
  var caps=legacy.map(function(m){
    var rho=AP_LEGACY_RHO[m.material]||AP_LEGACY_RHO.Hybrid,K={};
    AP_ANCHORS.forEach(function(a){
      var raw=m.raw[a];
      if(raw==null){K[a]=0;return;}
      var f=AP_PARAMS.profileAnchors.indexOf(a)>-1?apCapacity(m.profile,tr,maintain):1;
      K[a]=Math.max(0,Math.min(1,raw*f/apThreshold(a,tr,!!scenario.drift,tr)));
    });
    return{rho:rho,K:K};
  });
  return function(t){
    var out={};
    AP_ANCHORS.forEach(function(a){
      if(t<tr){out[a]=0;return;}
      var decay=Math.exp(-(t-tr)/AP_PARAMS.legacyTau),keep=1;
      caps.forEach(function(c){keep*=1-c.rho[a]*c.K[a]*decay;});
      out[a]=1-keep;
    });
    return out;
  };
}

/**
 * Evaluate one TC across the milestone schedule.
 * members:   [{raw:{anchor:0–10|null}, profile:apProfileFor(...)}]
 * weights:   Wa (raw site profile — floor + normalisation applied here)
 * scenario:  {drift:bool, deferMaintenance:bool}
 * win:       {startT, endT} — a restacked TC exists from startT; a parent stops contributing
 *            at endT (its child's restack year). Defaults: from Now, no end.
 * legacy:    parent CPMs transformed into this TC at startT — [{raw, profile, material}]
 * Returns {series:[per milestone], tipping:{idx,t,cause}|null, hasData}
 *   series[i].active — counts toward EP at that milestone
 *   tipping = first failure ('tc' TC shortfall | 'driver' driver drift) at or after startT
 */
function apEvaluateTC(members,weights,scenario,win,legacy){
  win=win||{};
  var startT=win.startT||0,endT=win.endT==null?null:win.endT;
  var wa=apNormaliseWeights(weights);
  var legacyAt=apLegacyFn(legacy,startT,scenario);
  var P=AP_PARAMS,eps=P.epsilon;
  var maintainObs=!scenario.deferMaintenance;
  var series=AP_MILESTONES.map(function(t){
    if(t<startT)return{t:t,exists:false,active:false,pcnExp:null,pcnObsNoDrift:null,pcnObs:null};
    var exp=apTcAhat(members,t,{maintain:true,drift:false,baseT:startT,legacy:legacyAt});
    var obsND=apTcAhat(members,t,{maintain:maintainObs,drift:false,baseT:startT,legacy:legacyAt});
    var obs=apTcAhat(members,t,{maintain:maintainObs,drift:!!scenario.drift,baseT:startT,legacy:legacyAt});
    var avail=AP_ANCHORS.filter(function(a){return obs[a]!=null;});
    var plateau=apTcAhat(members.map(function(m){return{raw:m.raw,profile:{cls:'plateau',installT:m.profile.installT}};}),t,{maintain:true,drift:false,baseT:startT,legacy:legacyAt});
    var pcnObs=apPcn(obs,wa),pcnExp=apPcn(exp,wa),pcnPlateau=apPcn(plateau,wa);
    return{
      t:t,exists:true,active:endT==null||t<endT,ahatExp:exp,ahatObsNoDrift:obsND,ahatObs:obs,
      legacy:legacyAt?legacyAt(t):null,
      pcnExp:pcnExp,pcnObsNoDrift:apPcn(obsND,wa),pcnObs:pcnObs,
      belowFloor:avail.some(function(a){return obs[a]<P.anchorFloor;}),
      // Judged on Pcn — the whole TC's performance — not per anchor.
      belowMilestone:pcnObs!=null&&pcnObs<pcnExp-eps,
      atPlateau:pcnObs!=null&&Math.abs(pcnObs-pcnPlateau)<=eps
    };
  });
  var tipping=null;
  series.forEach(function(s,i){
    if(!s.exists)return;
    var run=function(key){
      if(i<P.k-1)return false;
      for(var j=i-P.k+1;j<=i;j++)if(!series[j].exists||!series[j][key])return false;
      return true;
    };
    s.state=run('belowMilestone')?'failing':run('atPlateau')?'saturated':'working';
    if(s.pcnExp!=null){
      s.tcLoss=Math.max(0,s.pcnExp-s.pcnObsNoDrift);
      s.driverLoss=Math.max(0,s.pcnObsNoDrift-s.pcnObs);
    }
    if(!tipping&&s.state==='failing'){
      tipping={idx:i,t:s.t,cause:s.tcLoss>=s.driverLoss?'tc':'driver'};
    }
  });
  return{series:series,tipping:tipping,wa:wa,hasLegacy:!!legacyAt,hasData:series.some(function(s){return s.pcnObs!=null;})};
}

/**
 * Release brief — what a TC hands on at milestone idx (its restack year). Each anchor's share
 * of the shortfall is its term in ln(Pcn_exp / Pcn_obs) = Σ Wa·(ln Â_exp − ln Â_obs), split
 * into TC shortfall (exp → obsNoDrift) and driver drift (obsNoDrift → obs).
 * Returns {t, cause, pcnObs, pcnExp, driving:[{a,share,gap,tc,driver,level}], held:[…], all}
 * or null if the TC has no data there.
 */
function apReleaseBrief(result,idx){
  var s=result&&result.series[idx];
  if(!s||!s.exists||s.pcnExp==null||s.pcnObs==null)return null;
  var lg=function(v){return Math.log(Math.max(v,0.01));};
  var rows=AP_ANCHORS.filter(function(a){return s.ahatObs[a]!=null&&s.ahatExp[a]!=null;}).map(function(a){
    var w=result.wa[a],e=s.ahatExp[a],nd=s.ahatObsNoDrift[a],o=s.ahatObs[a];
    return{a:a,gap:Math.max(0,e-o),level:o,
      tc:Math.max(0,w*(lg(e)-lg(nd))),driver:Math.max(0,w*(lg(nd)-lg(o))),
      term:Math.max(0,w*(lg(e)-lg(o)))};
  });
  var total=rows.reduce(function(x,r){return x+r.term;},0);
  rows.forEach(function(r){r.share=total>0?r.term/total:0;});
  rows.sort(function(x,y){return y.share-x.share;});
  var driving=rows.filter(function(r){return r.share>=AP_PARAMS.drivingShare;});
  if(!driving.length&&rows.length&&rows[0].share>0)driving=[rows[0]];
  return{
    t:s.t,cause:(s.tcLoss||0)>=(s.driverLoss||0)?'tc':'driver',
    pcnObs:s.pcnObs,pcnExp:s.pcnExp,driving:driving,
    held:rows.filter(function(r){return driving.indexOf(r)<0;}),all:rows
  };
}

/**
 * EP at milestone index idx. Wcn = 1/n over TCs that have data — PLACEHOLDER (issue 1.5:
 * Wcn source open). Floor-excluded TCs stay in n and contribute 0, so dropping a failing TC
 * lowers EP rather than raising it (Wcn deliberately not renormalised).
 * key: 'pcnObs' (default) or 'pcnExp'.
 */
function apEP(tcResults,idx,key){
  key=key||'pcnObs';
  // n = TCs active at this milestone with data (a restacked parent drops out, its child joins).
  // A restacked TC with nothing counted yet (countEmpty) still takes its place in n at 0 —
  // otherwise restacking into an empty TC would lift EP by dropping the parent.
  var withData=tcResults.filter(function(r){var s=r&&r.series[idx];return s&&s.active&&(s.pcnObs!=null||r.countEmpty);});
  if(!withData.length)return null;
  var wcn=1/withData.length;
  return withData.reduce(function(sum,r){
    var s=r.series[idx];
    var excluded=key==='pcnObs'&&s.belowFloor;
    return sum+wcn*(excluded||s[key]==null?0:s[key]);
  },0);
}
