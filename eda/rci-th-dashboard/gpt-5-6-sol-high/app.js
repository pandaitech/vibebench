(() => {
  const D = window.RCI_DATA;
  const $ = (q, el=document) => el.querySelector(q);
  const $$ = (q, el=document) => [...el.querySelectorAll(q)];
  const fmt = n => new Intl.NumberFormat('ms-MY',{maximumFractionDigits:2}).format(n);
  const rm = (n, unit='juta') => `${n < 0 ? '−' : ''}RM${fmt(Math.abs(n))} ${unit}`;
  const tooltip = $('#tooltip');
  const tip = (e, html) => { if(innerWidth<641)return; tooltip.innerHTML=html; tooltip.style.display='block'; tooltip.style.left=Math.min(e.clientX+14,innerWidth-245)+'px'; tooltip.style.top=Math.min(e.clientY+14,innerHeight-90)+'px'; };
  const hideTip = () => tooltip.style.display='none';
  const bindTip = (el, html) => { el.addEventListener('pointermove',e=>tip(e,html)); el.addEventListener('pointerleave',hideTip); };

  function openSource(page){
    $('#sourceTitle').textContent=`Halaman PDF ${page}`;
    const matches=D.evidence.filter(x=>x.page===Number(page));
    $('#sourceCopy').textContent=matches.length?matches.map(x=>x.claim).join(' · '):'Buka halaman ini dalam transkripsi OCR laporan untuk menyemak konteks asal.';
    $('#sourceHref').href=`${D.sourceBase}#pdf-page-${page}`;
    $('#sourceDialog').showModal();
  }
  $$('[data-open-source]').forEach(b=>b.addEventListener('click',()=>openSource(b.dataset.openSource)));
  $$('dialog .close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
  $$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));
  $('#methodBtn').addEventListener('click',()=>$('#methodDialog').showModal());
  $$('[data-jump]').forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.jump).scrollIntoView()));

  let finMode='post', selectedYear=2017;
  function renderFinancial(){
    const el=$('#financialChart'), vals=D.financial.map(d=>d[finMode]);
    const max=Math.max(...vals.map(Math.abs),4500);
    el.innerHTML=D.financial.map(d=>{
      const val=d[finMode], h=Math.max(3,Math.abs(val)/max*47), neg=val<0;
      return `<div class="fin-col ${neg?'negative':'positive'} ${d.year===selectedYear?'active':''}" data-year="${d.year}"><button aria-label="Pilih ${d.year}: ${rm(val)}"></button><span class="value" style="${neg?`top:${50+h}%`:`bottom:${50+h}%`}">${val<0?'−':''}${fmt(Math.abs(val)/1000)}b</span><i class="bar" style="height:${h}%;${neg?'top:50%':'bottom:50%'}"></i><b class="year">${d.year}</b></div>`
    }).join('');
    $$('.fin-col',el).forEach(c=>{ c.addEventListener('click',()=>{selectedYear=+c.dataset.year;renderFinancial()}); bindTip(c,`${c.dataset.year}<br>${finMode==='pre'?'Sebelum':'Selepas'} hibah: <b>${rm(D.financial.find(d=>d.year==c.dataset.year)[finMode])}</b>`)});
    const d=D.financial.find(x=>x.year===selectedYear);
    $('#yearDetail').innerHTML=`<div><span class="year-big">TAHUN ${d.year}</span><h3>${d.post<0?'Kekurangan':'Lebihan'}<br>${rm(d.post)}</h3><div class="detail-rows"><div><span>Aset</span><b>${rm(d.assets)}</b></div><div><span>Liabiliti</span><b>${rm(d.liabilities)}</b></div><div><span>Sebelum hibah</span><b>${rm(d.pre)}</b></div><div><span>Hibah diagih</span><b>−${rm(d.distribution)}</b></div></div></div><div class="verdict">${d.pre>0&&d.post<0?'Tahun ini bermula dengan lebihan, tetapi menjadi kekurangan selepas agihan.':d.pre<0?'Liabiliti sudah melebihi aset sebelum agihan dibuat.':'Masih berbaki lebihan selepas agihan.'}</div>`;
  }
  $('#finMode').addEventListener('click',e=>{if(!e.target.dataset.mode)return;finMode=e.target.dataset.mode;$$('button',$('#finMode')).forEach(b=>b.classList.toggle('active',b===e.target));renderFinancial()});

  function renderImpairment(){
    const max=1313; $('#impairmentChart').innerHTML=D.impairmentPolicies.map(d=>`<div class="impair-col"><div class="tower"><i style="height:${Math.max(2,d.impact/max*100)}%"></i></div><b>RM${fmt(d.impact)}m</b><small>Rosot selepas jatuh &gt;${d.threshold}%<br>${d.months}</small></div>`).join('');
    $$('.impair-col').forEach((el,i)=>bindTip(el,`Ambang >${D.impairmentPolicies[i].threshold}%<br>Impak rosot nilai: <b>RM${fmt(D.impairmentPolicies[i].impact)} juta</b>`));
  }
  function renderBridge(){
    const max=4258; $('#profitBridge').innerHTML=D.profitBridge.map(d=>`<div class="bridge-step ${d.type}"><span class="amount">${d.value<0?'−':''}${fmt(Math.abs(d.value)/1000)}b</span><i class="bridge-bar" style="height:${Math.max(3,Math.abs(d.value)/max*145)}px"></i><small>${d.label}</small></div>`).join('');
  }
  function renderLine(){
    const el=$('#hibahChart'), w=100/7, y=v=>92-v/9.25*82;
    let html='<div class="line-path">';
    ['annual','hajj'].forEach(key=>{D.hibah.forEach((d,i)=>{if(i<D.hibah.length-1){const n=D.hibah[i+1],x1=i*w,x2=(i+1)*w,y1=y(d[key]),y2=y(n[key]),len=Math.hypot(x2-x1,y2-y1),angle=Math.atan2(y2-y1,x2-x1)*180/Math.PI;html+=`<i class="line-seg ${key==='hajj'?'hajj':''}" style="left:${x1}%;top:${y1}%;width:${len}%;transform:rotate(${angle}deg)"></i>`} html+=`<button class="point ${key==='hajj'?'hajj':''}" data-tip="${d.year} · ${key==='annual'?'Hibah tahunan':'Hibah haji'} ${d[key]}%" style="left:${i*w}%;top:${y(d[key])}%" aria-label="${d.year} ${d[key]} peratus"></button>`});});
    D.hibah.forEach((d,i)=>html+=`<span class="axis-label" style="left:${i*w}%">${String(d.year).slice(2)}</span>`);el.innerHTML=html+'</div>';$$('[data-tip]',el).forEach(p=>bindTip(p,p.dataset.tip));
    $('#depositSteps').innerHTML=D.deposits.map(d=>`<div class="deposit-step"><span>${d.label}</span><i style="transform:scaleX(${d.value/88})"></i><b>RM${d.value}b</b></div>`).join('');
  }

  let assetMetric='market';
  function renderAssetTransfer(){
    const max=Math.max(...D.transferAssets.map(d=>d.transfer));
    $('#assetTransferChart').innerHTML=D.transferAssets.map(d=>`<div class="asset-row"><span>${d.name}</span><div class="asset-track"><i class="asset-transfer" style="width:${d.transfer/max*100}%"></i><i class="asset-market" style="width:${d[assetMetric]/max*100}%"></i></div><b>+${fmt(d.transfer-d[assetMetric])}</b></div>`).join('');
    $$('.asset-row',$('#assetTransferChart')).forEach((el,i)=>bindTip(el,`${D.transferAssets[i].name}<br>Nilai pindahan: RM${fmt(D.transferAssets[i].transfer/1000)}b<br>${assetMetric==='market'?'Nilai pasaran':'Nilai buku'}: RM${fmt(D.transferAssets[i][assetMetric]/1000)}b`));
  }
  $('#assetMetric').addEventListener('click',e=>{if(!e.target.dataset.metric)return;assetMetric=e.target.dataset.metric;$$('button',$('#assetMetric')).forEach(b=>b.classList.toggle('active',b===e.target));renderAssetTransfer()});
  function renderProperties(){
    const max=Math.max(...D.properties.map(d=>d.transfer));
    $('#propertyChart').innerHTML=D.properties.map(d=>`<div class="property-row"><span>${d.name}</span><div class="property-track"><i style="width:${d.transfer/max*100}%"></i><em style="width:${d.market2021/max*100}%"></em></div><b>−${fmt(d.transfer-d.market2021)}</b></div>`).join('');
    $$('.property-row').forEach((el,i)=>bindTip(el,`${D.properties[i].name}<br>Pindahan: RM${fmt(D.properties[i].transfer)}m<br>Pasaran 2021: RM${fmt(D.properties[i].market2021)}m`));
  }
  function renderBluechips(){
    const max=Math.max(...D.bluechips.map(d=>d.transferUnit));
    $('#bluechipChart').innerHTML=D.bluechips.map(d=>`<div class="bluechip-col"><div class="bluechip-bars"><i style="height:${d.transferUnit/max*100}%"></i><i style="height:${d.market2018/max*100}%"></i><i style="height:${d.market2022/max*100}%"></i></div><b>${d.name}</b></div>`).join('');
    $$('.bluechip-col').forEach((el,i)=>{const d=D.bluechips[i];bindTip(el,`${d.name}<br>Pindahan RM${d.transferUnit}<br>Pasaran 2018 RM${d.market2018}<br>Pasaran Jun 2022 RM${d.market2022}`)});
  }

  const categories=['Semua',...new Set(D.investments.map(d=>d.category))];let category='Semua',investSort='impact',query='';
  $('#categoryFilters').innerHTML=categories.map(c=>`<button class="${c==='Semua'?'active':''}" data-category="${c}">${c}</button>`).join('');
  $('#categoryFilters').addEventListener('click',e=>{if(!e.target.dataset.category)return;category=e.target.dataset.category;$$('button',$('#categoryFilters')).forEach(b=>b.classList.toggle('active',b===e.target));renderInvestments()});
  $('#investmentSearch').addEventListener('input',e=>{query=e.target.value.toLowerCase();renderInvestments()});
  $('#sortInvest').addEventListener('click',()=>{investSort=investSort==='impact'?'name':'impact';$('#sortInvest').textContent=investSort==='impact'?'Susun: impak terbesar ↓':'Susun: nama A—Z';renderInvestments()});
  function filteredInvestments(){return D.investments.filter(d=>(category==='Semua'||d.category===category)&&(`${d.name} ${d.summary} ${d.action}`.toLowerCase().includes(query))).sort((a,b)=>investSort==='impact'?b.severity-a.severity||b.amount-a.amount:a.name.localeCompare(b.name))}
  function renderInvestments(){
    const data=filteredInvestments();$('#investCount').textContent=`${data.length} daripada 14 kes`;
    $('#investmentList').innerHTML=data.map((d,i)=>`<button class="invest-row" data-id="${d.id}"><span class="num">${String(i+1).padStart(2,'0')}</span><span><b>${d.name}</b><small>${d.category}</small></span><span class="status"><small>${d.status}</small></span><span class="amount">${fmt(d.amount)}<small>${d.currency}</small></span><span class="severity">${[1,2,3].map(x=>`<i class="${x<=d.severity?'on':''}"></i>`).join('')}</span></button>`).join('')||'<div class="empty-detail"><b>Tiada padanan</b><p>Cuba kata kunci atau kategori lain.</p></div>';
    $$('.invest-row').forEach(b=>b.addEventListener('click',()=>selectInvestment(b.dataset.id)));
  }
  function selectInvestment(id){
    const d=D.investments.find(x=>x.id===id);$$('.invest-row').forEach(b=>b.classList.toggle('active',b.dataset.id===id));
    $('#investmentDetail').innerHTML=`<div class="case-detail"><div class="detail-top"><span class="category">${d.category.toUpperCase()}</span><span class="tag ${d.derived?'derived':'report'}">${d.derived?'Kiraan terbitan':'Fakta laporan'}</span></div><h3>${d.name}</h3><div class="impact-number"><small>${d.impact}</small><strong>${fmt(d.amount)} <small>${d.currency}</small></strong></div><h4>Apa yang berlaku</h4><p>${d.summary}</p><h4>Tindakan ketika laporan</h4><p class="action">${d.action}</p><button class="source-link" id="caseSource">Semak laporan · hlm PDF ${d.page} ↗</button></div>`;
    $('#caseSource').addEventListener('click',()=>openSource(d.page)); if(innerWidth<961)$('#investmentDetail').scrollIntoView({block:'center'});
  }

  function renderHafis(){
    const data=[...D.hafisActual,{gap:true},...D.hafisProjection], max=37729;
    $('#hafisChart').innerHTML=data.map(d=>d.gap?'<div class="hafis-gap">2020–21</div>':`<div class="hafis-col ${d.kind==='unjuran'?'projected':''}"><span class="pct">${fmt(d.hafis/d.cost*100)}%</span><div class="hafis-stack" style="height:${d.cost/max*100}%"><i class="subsidy" style="height:${d.hafis/d.cost*100}%"></i><i class="paid" style="height:${d.payment/d.cost*100}%"></i></div><b>${String(d.year).slice(2)}</b></div>`).join('');
    $$('.hafis-col').forEach((el,i)=>{const d=[...D.hafisActual,...D.hafisProjection][i];bindTip(el,`${d.year} · ${d.kind}<br>Kos RM${fmt(d.cost)}<br>Jemaah RM${fmt(d.payment)}<br>HAFIS RM${fmt(d.hafis)} seorang`)});
  }
  function updateSim(){
    const payment=+$('#paymentSlider').value,pilgrims=+$('#pilgrimSlider').value,cost=37729,total=Math.max(0,cost-payment)*pilgrims/1e6,share=Math.max(0,cost-payment)/cost*100,diff=total-742.47;
    $('#paymentOut').textContent=`RM${fmt(payment)}`;$('#pilgrimOut').textContent=fmt(pilgrims);$('#simTotal').textContent=`RM${fmt(total)}m`;$('#simShare').textContent=`${fmt(share)}% kos ditanggung LTH`;$('#simDiff').textContent=`${diff>0?'+':diff<0?'−':''}RM${fmt(Math.abs(diff))}m`;
  }
  $('#paymentSlider').addEventListener('input',updateSim);$('#pilgrimSlider').addEventListener('input',updateSim);

  function renderEvidence(){
    const q=$('#evidenceSearch').value.toLowerCase();const data=D.evidence.filter(d=>`${d.page} ${d.topic} ${d.claim} ${d.type}`.toLowerCase().includes(q));
    $('#evidenceList').innerHTML=data.map(d=>`<a class="evidence-row" href="${D.sourceBase}#pdf-page-${d.page}" target="_blank" rel="noopener"><span class="page">PDF ${d.page}</span><span class="topic">${d.topic}</span><b>${d.claim}</b><span class="type">${d.type}</span><span>↗</span></a>`).join('')||'<div class="empty-detail"><b>Tiada bukti ditemui</b></div>';
  }
  $('#evidenceSearch').addEventListener('input',renderEvidence);

  const sections=$$('main>section[id]'),navs=$$('.nav a');
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)navs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-25% 0px -65%'});sections.forEach(s=>observer.observe(s));
  renderFinancial();renderImpairment();renderBridge();renderLine();renderAssetTransfer();renderProperties();renderBluechips();renderInvestments();renderHafis();renderEvidence();updateSim();
})();
