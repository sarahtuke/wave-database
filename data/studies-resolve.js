/* data/studies-resolve.js
 * Loaded straight after data/studies.js on every page that reads STUDIES (index.html,
 * spatial-strategy.html). Until the imported SLR records are reviewed, a record whose live
 * position / material / location is null falls back to its import_review.suggested draft,
 * so it still reaches every catalogue consumer: the Wave Matrix, the typology card, the
 * Spatial Builder library and the Process Stacking CPM pool.
 *
 * Live fields always win, and nothing is written back to studies.js. Records placed this way
 * carry _placement:'suggested' (+ _placementBasis) so the UI can mark them as unreviewed.
 * Remove this file once every record's live fields are filled in.
 */
(function(){
  if(typeof STUDIES==='undefined')return;
  STUDIES.forEach(function(s){
    var sg=s.import_review&&s.import_review.suggested;
    if(!sg)return;
    var used=false;
    if(s.material==null&&sg.material){s.material=sg.material;used=true;}
    if(s.position==null&&sg.position){s.position=sg.position;used=true;}
    // A suggested location only stands in for a missing position — once a position is set
    // (live or suggested), it decides the cell.
    if(s.position==null&&s.location==null&&sg.location){s.location=sg.location;used=true;}
    if(used){s._placement='suggested';s._placementBasis=sg.basis||null;}
  });
})();
