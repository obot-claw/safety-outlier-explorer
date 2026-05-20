d3.csv('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv').then(data => {
  const measure = 'Aminotransferase, alanine';
  const rows = data.filter(d => d.TEST === measure && d.USUBJID && d.VISITN && d.STRESN && ['01-001','01-002','01-003','01-004','01-005'].includes(d.USUBJID));
  const visits = [...new Set(rows.map(d => +d.VISITN))].sort((a,b)=>a-b);
  const ids = [...new Set(rows.map(d => d.USUBJID))];
  new Chart(document.getElementById('chart'), { type: 'line', data: { labels: visits, datasets: ids.map((id,i)=>({ label:id, data:visits.map(v=>{const r=rows.find(d=>d.USUBJID===id && +d.VISITN===v); return r ? +r.STRESN : null}), borderColor:['#2563eb','#dc2626','#16a34a','#f59e0b','#7c3aed'][i], spanGaps:true })) }, options: { responsive:true, plugins:{title:{display:true,text:`${measure} participant traces`}}, scales:{x:{title:{display:true,text:'Visit'}},y:{title:{display:true,text:'Result'}}} } });
});
