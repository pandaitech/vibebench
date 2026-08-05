/* ================== views.js — 8 analytical views ================== */
window.VIEWS = (function(){
  var D = window.RCIDATA, L = window.LIB;
  var esc = L.esc, tag = L.tag, sn = L.sn, rm = L.rm, nfmt = L.nfmt, pct = L.pct;

  /* ---------- shared helpers ---------- */
  function hdr(no,title,lede){
    return '<div class="hd"><div class="eyebrow">Bahagian '+no+'</div><h1 class="page">'+esc(title)+'</h1>'+(lede?'<p class="lede">'+lede+'</p>':'')+'</div>';
  }
  function chartCard(o){
    return '<div class="card">'
      +(o.t?'<h4>'+o.t+'</h4>':'')
      +(o.sub?'<p class="sub">'+o.sub+'</p>':'')
      +(o.leg||'')
      +(o.svg?'<div class="chart">'+o.svg+'</div>':(o.body||''))
      +(o.foot?'<p class="for">'+o.foot+'</p>':'')
      +'</div>';
  }
  function legend(items){ return '<div class="legend">'+items.map(function(i){return '<span class="li"><span class="sw" style="background:'+(i.c||i)+'"></span>'+esc(i.n)+'</span>';}).join("")+'</div>'; }
  function ins(t,b){ return '<div class="ins"><b>'+esc(t)+'</b>'+(b||'')+'</div>'; }
  function caveat(t,b){ return '<div class="caveat"><span class="what">'+esc(t)+'</span> — '+b+'</div>'; }
  function risk(d){ return '<div class="risk">'+(d||'')+'</div>'; }
  function tl(items){ return '<div class="tline">'+items.map(function(t){ return '<div class="te '+(t.k||'')+'"><span class="d">'+esc(t.d)+'</span><span class="h">'+esc(t.h)+'</span>'+(t.t?'<div class="x">'+esc(t.t)+'</div>':'')+'</div>'; }).join("")+'</div>'; }
  function kpis(a){ return '<div class="kpis">'+a.map(function(k){return '<div class="kpi" style="border-top:3px solid '+(k.a||'#0d5c46')+'"><div class="t">'+esc(k.t)+'</div><div class="v">'+esc(k.v)+'</div><div class="s">'+esc(k.s)+'</div></div>';}).join("")+'</div>'; }

  var P = { // palette for categories
    hijau:"#0d5c46", merah:"#b3382c", emas:"#c9a24b", ungu:"#6a4a9a",
    biru:"#2b5d8a", teal:"#11938a", oren:"#b06a1b"
  };

  /* ============================================================
     1. GAMBARAN
     ============================================================ */
  function gambaran(){
    var cols=[P.hijau,P.merah,P.emas,P.ungu,P.biru,P.teal,P.oren,P.biru];
    var nav=D.sections.slice(1).map(function(s,i){
      return '<div class="navcard" data-goto="'+s.id+'" style="--b:'+cols[i]+'"><span class="n">'+esc(s.label)+'</span><span class="s2">'+esc(s.t)+'</span><span class="b2">Teroka &rarr;</span></div>';
    }).join("");

    return hdr('1','Cerita besar: hampir bankrap, diselamatkan, risiko tersembunyi',
      'Dashboard data ini meneroka Laporan Suruhanjaya Siasatan Diraja (RCI) Tabung Haji 2022 — 240 halaman tentang pengurusan & operasi LTH 2014–2020. Matlamat kami: anda boleh bergerak dari <b>gambaran besar</b> ke <b>bukti terperinci</b> tanpa tersesat. Setiap angka boleh ditekan untuk melihat <b>sumber halaman</b> laporan.')
      + kpis(D.kpi)
      + '<h2 class="blok"><span class="n">A</span>Kronologi penemuan (2014–2022)</h2>'
      + tl(D.krisisTimeline)
      + ins('Satu babak paling penting','Babak <b>2017</b> adalah teras krisis. Dua “buku” bertentangan: buku rasmi kata <b>untung RM3.4 bilion</b>, buku sebenar (jika piawaian MFRS dipatuhi) kata <b>rugi RM1.4 bilion</b>. Jurang ini bukan kebetulan — ia lahir daripada amalan perakaunan kreatif dan hibah yang melebihi kemampuan. Terokai dalam bahagian <a href="#/krisis">Krisis 2017</a>.')
      + caveat('Bagaimana membaca dashboard ini','Setiap angka mempunyai tanda jenis: <b>Fakta laporan</b> (ditulis dalam laporan), <b>Terbitan kami</b> (pengiraan daripada angka laporan), <b>Unjuran</b> (ramalan laporan), <b>Simulasi</b> (senario kami). Kami tidak mencipta data; jika kami mengira, kami beritahu.')
      + '<h2 class="blok"><span class="n">B</span>Pilih bahagian untuk diteroka</h2>'
      + '<div class="navrow">'+nav+'</div>';
  }

  /* ============================================================
     2. KRISIS (dua buku)
     ============================================================ */
  function krisis(){
    var p=D.pwc2017;
    var svcW=L.vbars({
      data:p.map(function(r){ return {label:r.label.slice(0,30), v:[r.val], sub:""}; }),
      series:[{name:'RM juta',c:P.biru}], u:'j', h:360
    });
    var svcDef=L.vbars({
      data:D.deficit.map(function(r){return {label:r.y, v:[r.pra, r.pasca]};}),
      series:[{name:'Sebelum agihan (kapasiti)',c:P.biru},{name:'Selepas agihan hibah',c:P.merah}],
      u:'j', h:340
    });
    var svcImp=L.vbars({
      data:D.impairPolicy.map(function(r){return {label:r.ambang, sub:r.nota.slice(0,20), v:[r.kesan]};}),
      series:[{name:'Rosot nilai (RM juta)',c:P.emas}], u:'j', h:320
    });
    var mv=D.rav2017;
    var imp=D.unrecordedImp;

    return hdr('2','“Dua buku”: yang dilaporkan berbanding yang sebenar',
      'Siasatan PwC mendedahkan dua set angka untuk 2017. Satu dalam Laporan Kewangan rasmi (diaudit JAN), satu lagi jika piawaian perakaunan MFRS dipatuhi sepenuhnya. Perbezaan di antara keduanya adalah cerita sebenar krisis.')
      + '<div class="duabuku">'
      + '<div class="book official"><div class="bh">Buku rasmi · Laporan Kewangan 2017</div><div class="vs">UNTUNG +RM3.4 bilion</div><div class="vl">Angka yang dipaparkan kepada pendeposit & awam. Penyata kewangan diaudit dan diberi Sijil Audit Bersih.</div></div>'
      + '<div class="book true"><div class="bh">Buku sebenar · jika MFRS dipatuhi</div><div class="vs">RUGI −RM1.4 bilion</div><div class="vl">Pengiraan PwC: selepas rosot nilai yang tidak diiktiraf, kedudukan LTH adalah negatif.</div></div>'
      + '</div>'
      + '<div class="row" style="margin:2px 0 14px;gap:8px">'+tag('terbitan')+sn(149,'PwC — Financial Review')+sn(19,'Ringkasan Eksekutif')+'</div>'

      + '<h2 class="blok"><span class="n">1</span>Dari untung RM3.4b kepada rugi RM1.4b</h2>'
      + chartCard({t:'Apa yang disembunyikan dalam Laporan Kewangan 2017 (RM juta)',
        sub:'Bar biru = nilai yang dikurangkan oleh PwC. Jumlah akhir = kerugian sebenar.',
        svg:svcW,
        foot:tag('terbitan')+' Analisis: untung dilapor 3,412 → tolak rosot ekuiti 4,258 → tolak rosot hutang 7 → tolak pelarasan lain 580 = kerugian terlaras 1,433. Sumber: PwC Financial Review '+sn(149,'PwC')})
      + ins('Apa yang boleh disimpulkan','Sebahagian besar perbezaan datang daripada <b>rosot nilai ekuiti RM4.26 bilion</b> yang tidak diiktiraf. Tanpa kerugian itu diiktiraf, keuntungan LTH tampak sihat dan hibah besar boleh diisytiharkan. Apabila ia diiktiraf, kedudukan LTH sebenarnya terbalik.')
      + caveat('Apa yang TIDAK boleh disimpulkan','Angka RM1.4 bilion adalah pengiraan PwC bagi senario “jika MFRS dipatuhi sepenuhnya”. Ia bukan angka yang pernah dicetak dalam mana-mana penyata rasmi LTH. Ia juga bukan bukti penipuan secara automatik — ia bukti bahawa penyata yang dilapor tidak menggambarkan kedudukan sebenar.')

      + '<h2 class="blok"><span class="n">2</span>Defisit sejak 2014: aset tidak cukup untuk liabiliti</h2>'
      + chartCard({t:'Lebihan / kekurangan aset berbanding liabiliti (RM juta)',
        sub:'Bar biru = kedudukan sebelum agihan hibah; bar merah = selepas hibah dibayar.',
        svg:svcDef,
        leg:legend([{n:'Sebelum agihan (kapasiti LTH)',c:P.biru},{n:'Selepas agihan hibah',c:P.merah}]),
        foot:tag('terbitan')+' PwC mengira jurang defisit mula wujud 2014. Pada 2016 dan 2017, LTH sudah defisit SEBELUM hibah diberi — bermakna hibah itu membayar wang pendeposit, bukan keuntungan sebenar. '+sn(147,'PwC — Jadual defisit')})

      + '<h2 class="blok"><span class="n">3</span>Rosot nilai: polisi diubah untuk mengekalkan keuntungan</h2>'
      + chartCard({t:'Kesan perubahan ambang rosot nilai 2017 (RM juta)',
        sub:'LTH menukar polisi rosot dua kali dalam tahun yang sama — daripada ambang >70% kepada >85% kemudian >90%.',
        svg:svcImp,
        foot:tag('terbitan')+' Tukar ambang kepada >90% membuat rosot tercatat turun daripada RM1,313 juta kepada hanya RM1 juta. '+sn(110,'3.13.9')})
      + '<div class="card"><h4>Rosot nilai yang tidak direkod (2017)</h4>'
        + '<p class="sub">KAN menegur: LTH tidak merekod <b>RM227.81 juta</b> rosot terhadap 3 subsidiari dan 3 bersekutu.</p>'
        + '<div class="k2" style="font-size:30px;font-weight:800;color:'+P.merah+'">'+rm(imp.jumlah,'j')+'</div>'
        + '<p class="for">'+sn(18,'KAN — Emphasis of Matter')+'</p></div>'
      + (function(){
        var tot = imp.thhe + imp.lain;
        return '<div class="grid g2">'
          + chartCard({t:'TH Heavy Engineering (sahaja)',sub:'Sebahagian besar rosot yang tidak direkod.',body:'<div class="k2" style="font-size:26px;font-weight:800;color:'+P.merah+'">'+rm(imp.thhe,'j')+'</div>',foot:sn(18,'Ringkasan Eksekutif')})
          + chartCard({t:'Lain-lain (3 subsidiari + 3 bersekutu)',sub:'Rosot tambahan di luar THHE.',body:'<div class="k2" style="font-size:26px;font-weight:800;color:'+P.merah+'">'+rm(imp.lain,'j')+'</div>',foot:sn(18,'KAN — Emphasis of Matter')})
          + '</div>';
      })()
      + '<h2 class="blok"><span class="n">4</span>RAV: nilai aset di“laras” untuk menghalalkan hibah</h2>'
      + chartCard({t:'Kiraan RAV 2017 (RM juta)',
        sub:'LTH guna Realisable Asset Value (nilai aset boleh direalisasi) sebagai ganti nilai dalam penyata beraudit.',
        body:'<div class="grid g2">'
          + '<div class="card tight"><div class="k1">Aset (penyata beraudit)</div><div class="k2">'+nfmt(mv.aset)+'</div></div>'
          + '<div class="card tight"><div class="k1">+ Top-up RAV</div><div class="k2">+'+nfmt(mv.topup)+'</div></div>'
          + '<div class="card tight"><div class="k1">Aset RAV</div><div class="k2">'+nfmt(mv.asetRAV)+'</div></div>'
          + '<div class="card tight"><div class="k1">Liabiliti</div><div class="k2">'+nfmt(mv.liab)+'</div></div>'
          + '<div class="card tight"><div class="k1" style="color:'+P.biru+'">Nilai bersih RAV</div><div class="k2" style="color:'+P.biru+'">'+nfmt(mv.bersih)+'</div></div>'
          + '<div class="card tight"><div class="k1" style="color:'+P.merah+'">Rosot tak direkod</div><div class="k2" style="color:'+P.merah+'">−'+nfmt(1537)+'</div></div>'
          + '</div>',
        foot:tag('terbitan')+' Nilai bersih RAV RM373 juta kelihatan positif dan “membenarkan” hibah. Tetapi rosot yang sepatutnya direkod RM1,537 juta jauh lebih besar — menjadikan kedudukan sebenar negatif. '+sn(116,'3.9.13')+sn(117,'3.9.13')})
      + ins('Kesimpulan babak','LTH bukan sahaja melaporkan untung palsu pada 2017 — ia <b>mengubah polisi perakaunan, memakai nilai RAV dan mengabaikan rosot nilai</b> supaya boleh terus mengisytiharkan hibah yang tinggi. JAN memberi Sijil Audit Bersih walaupun menegur (“Emphasis of Matter”). Jurang antara dua buku ini adalah punca segala-galanya.')

      + '<h2 class="blok"><span class="n">5</span>Garis masa audit & keterbukaan</h2>'
      + tl([
        {d:'2014–2017',h:'Sijil Audit Bersih diberi setiap tahun',t:'Walaupun defisit wujud dan hibah melebihi kemampuan.',k:'crisis'},
        {d:'23 Mei 2018',h:'EY terbit laporan Proforma (RAV)',t:'Proforma ini dijadikan asas hibah; penyata beraudit baharu siap 16 Julai 2018.'},
        {d:'16 Jul 2018',h:'KAN tegur — “Emphasis of Matter”',t:'Rosot RM227.81j tak direkod; polisi rosot diubah 2×. Namun sijil tetap “bersih”.'},
        {d:'Ogos 2018',h:'PwC dilantik buat Financial Review',t:'Menemui defisit sejak 2014 dan kerugian sebenar 2017.'},
        {d:'19 Dis 2018',h:'Surat KAN kepada PM',t:'KAN mengaku jika pendapat “berteguran” diberi, ia akan gugat keyakinan pendeposit.'}
      ])
      + caveat('Mengapa ini penting untuk awak','Sijil Audit Bersih memberi rasa selamat kepada pendeposit. Bila penemuan sebenar kemudian terdedah, keyakinan boleh runtuh — seperti yang berlaku apabila deposit mengecut pada 2019 (lihat bahagian Hibah).');
  }

  /* ============================================================
     3. HIBAH & DEPOSIT
     ============================================================ */
  function hibah(){
    var svcRate=L.vbars({
      data:D.hibahRates.map(function(r){return {label:r.y,v:[r.hb,r.hj]};}),
      series:[{name:'Hibah tahunan (%)',c:P.hijau},{name:'Hibah haji (%)',c:P.emas}],
      u:'pct', h:340
    });
    var svcTotal=L.vbars({
      data:D.hibahTotal.map(function(r){return {label:r.y,v:[r.agih,r.haji]};}),
      series:[{name:'Hibah tahunan (RM juta)',c:P.hijau},{name:'Hibah haji (RM juta)',c:P.emas}],
      u:'j', h:340
    });
    var svcCap=L.vbars({
      data:D.hibahCapacity.map(function(r){return {label:r.y,v:[r.kap,r.bayar]};}),
      series:[{name:'Kapasiti sebelum agihan',c:P.biru},{name:'Hibah dibayar',c:P.merah}],
      u:'j', h:340
    });
    var svcDep=L.vbars({
      data:D.deposit.map(function(r){return {label:r.d.split(" ")[0],sub:r.d.slice(8,30),v:[r.v]};}),
      series:[{name:'Deposit (RM bilion)',c:P.teal}], u:'b', h:300
    });

    return hdr('3','Hibah & deposit: menjanjikan pulangan tinggi menarik wang masuk',
      'Hibah adalah pulangan tahunan kepada pendeposit (macam dividen, tetapi tanpa bunga). Bahagian ini menunjukkan bagaimana kadar hibah yang terlalu tinggi melebihi kemampuan LTH, dan bagaimana ia mempengaruhi tingkah laku pendeposit.')
      + '<h2 class="blok"><span class="n">1</span>Kadar hibah 2014–2021</h2>'
      + chartCard({t:'Kadar hibah tahunan & hibah haji (%)',
        sub:'Perhatikan kejatuhan drastik pada 2018 selepas krisis terserlah.',
        svg:svcRate,
        leg:legend([{n:'Hibah tahunan',c:P.hijau},{n:'Hibah haji',c:P.emas}]),
        foot:tag('fakta')+' Kadar dari Jadual 3.9.22: 2014=6.25%, 2015=5.00%, 2016=4.25%, 2017=4.50%, 2018=1.25%, 2019=3.05%, 2020–21=3.10%. '+sn(120,'Jadual kadar')})
      + ins('Apa yang berlaku pada 2018–2019','Selepas krisis terdedah, LTH terpaksa turunkan hibah kepada 1.25% pada 2018 — jauh lebih rendah daripada kadar bank. Ramai pendeposit besar bertindak keluar, deposit mengecut dari kira-kira RM73 bilion kepada RM69 bilion (2019). LTH bernasib baik kerana kesannya lebih kecil daripada yang dikhuatiri.')
      + chartCard({t:'Jumlah hibah dibayar (RM juta)',
        sub:'Tahunan dan haji. 2018 runtuh apabila LTH tak mampu bayar tinggi.',
        svg:svcTotal,
        leg:legend([{n:'Hibah tahunan',c:P.hijau},{n:'Hibah haji',c:P.emas}]),
        foot:tag('fakta')+' Jumlah dibayar: 2014=RM3,237j, 2015=RM3,220j, 2016=RM2,871j, 2017=RM3,324j, 2018=RM923j, 2019=RM2,141j, 2020=RM2,242j. '+sn(130,'Jadual 3.11.7')})

      + '<h2 class="blok"><span class="n">2</span>Kapasiti vs pembayaran: hibah melebihi kemampuan</h2>'
      + chartCard({t:'Kapasiti LTH berbanding hibah yang dibayar (RM juta)',
        sub:'Bar biru = kedudukan kewangan sebelum agihan; bar merah = hibah sebenarnya dibayar.',
        svg:svcCap,
        leg:legend([{n:'Kapasiti (sebelum agihan)',c:P.biru},{n:'Hibah dibayar',c:P.merah}]),
        foot:tag('terbitan')+' Dari 2014, hibah melebihi kapasiti. Pada 2016 dan 2017, kapasiti negatif — LTH bayar hibah walaupun defisit. '+sn(112,'3.9.2 PwC')})

      + '<h2 class="blok"><span class="n">3</span>Pendeposit bertindak: bank run mini pada 2019</h2>'
      + chartCard({t:'Saiz deposit (RM bilion) — titik data laporan',
        sub:'Bukan siri berterusan; empat titik yang dinyatakan laporan.',
        svg:svcDep,
        foot:tag('fakta')+' Deposit menurun dari ~RM73b (sebelum hebahan hibah 1.25%) kepada RM69b (akhir 2019), pulih ke ~RM76b (akhir 2020), kemudian RM88b (2022). '+sn(122,'3.9.29')+sn(122,'3.9.30')})
      + caveat('Isyarat penting','Ini menunjukkan masalah <b>risiko pendeposit besar</b> (concentration risk): segelintir pendeposit besar memegang sebahagian besar wang. Jika mereka keluar serentak, LTH menghadapi “bank run”. Pada 2019 ia hampir berlaku — tetapi tidak sampai kritikal.')
      + risk('<b>Risiko:</b> LTH perlu simpan sekurang-kurangnya <b>RM60 bilion deposit</b> untuk menampung subsidi haji (HAFIS) pada paras semasa. Kebergantungan kepada pendeposit besar meningkat apabila kos subsidi meningkat. '+sn(168,'3.7.27'))

      + '<h2 class="blok"><span class="n">4</span>Bagaimana “buku” dipujuk agar nampak mampu</h2>'
      + chartCard({t:'RM600 juta tambahan daripada cara kira yang berbeza',
        sub:'Pada 2017, LTH tukar cara kira hibah daripada purata baki bulanan kepada purata tahunan.',
        body:'<div class="k2" style="font-size:30px;font-weight:800;color:'+P.merah+'">+RM600 juta</div><p style="color:var(--muted);font-size:13px">Lebihan hibah yang dibayar akibat perubahan kaedah kiraan. Ditarik balik selepas reaksi negatif pendeposit.</p>',
        foot:tag('fakta')+sn(115,'3.9.9')})
      + caveat('Bukan semua adalah tidak jujur','Hibah tinggi bukan salah satu pihak sahaja. Ia juga tekanan jangkaan: pendeposit membandingkan LTH dengan bank, dan LTH terperangkap dalam “keghairahan” membayar tinggi. Masalahnya, pembayaran itu tidak disokong oleh pendapatan sebenar.');
  }

  /* ============================================================
     4. PELABURAN BERMASALAH
     ============================================================ */
  var INV = {sort:"rosot", dir:-1, cat:"semua", st:"semua"};

  function invLossRow(){
    // ranked top losses (RM juta) — angka terbitan daripada laporan
    var raw=[
      {n:"FGV Holdings", v:1059},
      {n:"Trurich Resources", v:364.31},
      {n:"Deru Semangat (DSSB)", v:257},
      {n:"Al-Rawda (hotel Tanah Suci)", v:202.8},
      {n:"TH Marine (Alam Maritim)", v:198},
      {n:"TH Plantations", v:170},
      {n:"Putrajaya Perdana", v:145.3},
      {n:"Al-Fareeda (dana hartanah)", v:63},
      {n:"Abraj", v:40.25},
      {n:"Emrail", v:19.3},
      {n:"Wellspring Worldwide", v:19.03},
      {n:"TH Properties (bonus)", v:2.2}
    ];
    return raw.map(function(r){ return {label:r.n, v:r.v, c:P.merah}; });
  }

  function invTable(){
    var rows=D.investments.slice();
    if(INV.cat!=="semua") rows=rows.filter(function(r){ return r.cat===INV.cat; });
    if(INV.st!=="semua") rows=rows.filter(function(r){ return r.status.indexOf(INV.st)!==-1; });
    var key=INV.sort, dir=INV.dir;
    function num(r){
      if(key==="n") return r.n;
      if(key==="rosot"){ var m=parseFloat((r.rosot||"").replace(/[^0-9.]/g,"")); return m||0; }
      if(key==="tahun") return parseFloat(r.tahun)||0;
      return 0;
    }
    rows.sort(function(a,b){ var x=num(a),y=num(b); if(typeof x==="string"){return x.localeCompare(y)*dir;} return (x-y)*dir; });
    var catMap={};
    D.investments.forEach(function(r){ catMap[r.cat]=1; });
    var tr=rows.map(function(r){
      return '<tr>'
        +'<td class="nm">'+esc(r.n)+'</td>'
        +'<td>'+esc(r.cat)+'</td>'
        +'<td class="num">'+esc(r.amaun)+'</td>'
        +'<td class="num neg">'+esc(r.rosot)+'</td>'
        +'<td class="num">'+esc(r.tahun)+'</td>'
        +'<td>'+esc(r.status.slice(0,64))+'</td>'
        +'<td class="num">'+sn(r.p,'Pelaburan bermasalah')+'</td>'
        +'</tr>';
    }).join("");
    var ar=function(k){ return INV.sort===k?(INV.dir===1?'&#9650;':'&#9660;'):''; };
    var cats=["semua"].concat(Object.keys(catMap));
    var catBtns=cats.map(function(c){return '<button class="fbtn'+(INV.cat===c?' on':'')+'" data-cat="'+c+'">'+esc(c)+'</button>';}).join("");
    var stBtns=['<button class="fbtn'+(INV.st==="semua"?' on':'')+'" data-st="semua">Semua status</button>',
      '<button class="fbtn'+(INV.st==="Tindakan undang-undang"?' on':'')+'" data-st="Tindakan undang-undang">Mahkamah / polis</button>',
      '<button class="fbtn'+(INV.st==="Pelupusan"?' on':'')+'" data-st="Pelupusan">Dalam pelupusan</button>'].join("");
    return '<div class="toolbar"><span style="font-size:12.5px;color:var(--muted);font-weight:700">Jenis:</span>'+catBtns+'</div>'
      + '<div class="toolbar" style="margin-top:0"><span style="font-size:12.5px;color:var(--muted);font-weight:700">Status:</span>'+stBtns+'</div>'
      + '<div class="twrap"><table class="rc" id="invTable">'
      + '<thead><tr>'
      + '<th data-k="n">Nama '+ar("n")+'</th>'
      + '<th>Jenis</th>'
      + '<th class="num">Amaun terlibat</th>'
      + '<th class="num" data-k="rosot">Rosot / kerugian '+ar("rosot")+'</th>'
      + '<th class="num" data-k="tahun">Mula '+ar("tahun")+'</th>'
      + '<th>Status</th>'
      + '<th class="num">Sumber</th>'
      + '</tr></thead><tbody>'+tr+'</tbody></table></div>';
  }

  function pelaburan(){
    var svgLoss=L.hbar({data:invLossRow(), u:'j', h:560, padL:250});
    var patterns=D.investPatterns.map(function(p){return '<span class="chip pat">'+esc(p)+'</span>';}).join(" ");
    return hdr('4','Pelaburan bermasalah: 14 lubang wang dengan corak yang berulang',
      'Suruhanjaya menyenaraikan 14 pelaburan yang memerlukan audit forensik. Jumlah kerugian adalah besar, tetapi yang lebih membimbangkan ialah <b>corak berulang</b>: JV di luar negara tanpa kepakaran, put option yang tidak dihormati, dan IPO yang dibatalkan selepas LTH membeli.')
      + kpis([
        {t:'Pelaburan bermasalah',v:'14',s:'perlu audit forensik · PDF ms 193',a:P.merah},
        {t:'Kerugian terbesar',v:'RM1.06b',s:'FGV (belum realisasi) · PDF ms 192',a:P.merah},
        {t:'Hapus kira penuh',v:'RM364j',s:'Trurich · PDF ms 181',a:P.merah},
        {t:'Boleh pulih (anggaran)',v:'RM70.4j',s:'TH Marine · PDF ms 190',a:P.emas}
      ])
      + '<h2 class="blok"><span class="n">1</span>Peta kerugian (RM juta)</h2>'
      + chartCard({t:'12 kerugian/rosot terbesar yang dilaporkan',
        sub:'Angka per syarikat daripada laporan. Perhatian: ini “terbitan kami” kerana laporan tiada jadual gabungan.',
        svg:svgLoss,
        foot:tag('terbitan')+' Nilai tidak ketat satu sistem; sesetengah angka adalah kerugian belum realisasi (FGV), sebahagian rosot (impairment) yang direkod, sebahagian jumlah ditarik (DSSB). Rujuk tiap-tiap syarikat untuk butiran. '})
      + ins('Corak utama yang berulang','Jika dikumpulkan, kebanyakan kerugian berlaku kerana: <b>(1)</b> LTH melabur dalam perniagaan yang bukan kepakarannya (ladang, hotel, kapal, hartanah luar negara); <b>(2)</b> perjanjian “put option” gagal dihormati oleh pihak lawan; <b>(3)</b> IPO dibatalkan selepas LTH membeli; <b>(4)</b> pembeli/penerima tidak membayar. Berikut corak yang dikenal pasti laporan:')
      + '<div style="margin:10px 0">'+patterns+'</div>'

      + '<h2 class="blok"><span class="n">2</span>Jadual penuh 14 pelaburan</h2>'
      + '<div id="invWrap">'+invTable()+'</div>'
      + caveat('Baca jadual dengan teliti','“Amaun terlibat” bukan semestinya kerugian penuh — sesetengah masih dalam proses pulih/undang-undang. Klik lajur untuk menyusun. Klik ikon sumber untuk melihat butiran per syarikat dalam laporan.')

      + '<h2 class="blok"><span class="n">3</span>Contoh yang paling memberitahu</h2>'
      + tl([
        {d:'2012',h:'THIP — saham dipindah sebelum bayaran penuh',t:'LTH jual 95% ladang kelapa sawit Indonesia (USD910m). Harga dikurang USD100m; LTH pula terpaksa muka USD178.6m pendahuluan yang sepatutnya dibayar pembeli.',k:'crisis'},
        {d:'2009–2018',h:'Trurich — JV Kalimantan yang tidak menjadi',t:'LTH labur RM364.31j untuk ladang Indonesia. Tiada hasil, syarikat insolven; hutang Maybank USD179j. Semua dilupus.',k:'crisis'},
        {d:'2016',h:'Emrail — put option yang tak dihormati',t:'LTH beli 15.3% (RM20.17j). IPO dibatalkan, target untung tak tercapai. Pihak lawan kena beli balik RM20.3j tapi bayar RM2j sahaja.',k:'crisis'},
        {d:'2013–2018',h:'Al-Fareeda — pengurus dana hilang',t:'LTH langgan SR76j (RM63j) dana hartanah di Arab Saudi. Kontraktor bermasalah, harga bangunan naik, minyak jatuh; dana dibubarkan, pengurus tidak dapat dikesan.',k:'crisis'},
        {d:'2014',h:'Putrajaya Perdana — IPO & target gagal',t:'LTH beli 30% (RM193.5j). IPO dalam setahun gagal; target untung RM86j tak tercapai. Put option RM210.7j tak dihormati.',k:'crisis'}
      ])
      + ins('Apa yang Suruhanjaya katakan','“Setiap anggota Lembaga, pengarah anak syarikat, pengurusan dan kakitangan yang terlibat wajar dipertanggungjawabkan atas kerugian yang ditanggung LTH dan anak syarikatnya.” Proses membuat keputusan didapati tidak teratur; Panel Pelaburan terlalu bergantung kepada pengurusan kanan.')
      + risk('<b>Tindakan penguatkuasaan:</b> 4 laporan polis dibuat (2018–2019) — THIP, Yayasan TH, Trurich dan pengisytiharan hibah 2017. 6 aduan kepada SPRM. Kes mahkamah & timbang tara masih berjalan (THIP, Al-Rawda, Emrail, Wellspring, Putrajaya Perdana).');
  }

  /* ============================================================
     5. UJSB (Penyelamatan)
     ============================================================ */
  function ujsbFlow(){
    var tr=D.ujsbTransfer;
    // simple SVG flow: LTH → UJSB → Sukuk + Tunai → back
    var s='<svg viewBox="0 0 1000 300" style="width:100%;height:auto">';
    // LTH node
    s+='<rect x="30" y="70" width="220" height="90" rx="12" fill="'+P.hijau+'" opacity=".12" stroke="'+P.hijau+'" stroke-width="2"/>';
    s+='<text x="140" y="100" text-anchor="middle" font-size="20" font-weight="700" fill="currentColor">Tabung Haji (LTH)</text>';
    s+='<text x="140" y="128" text-anchor="middle" font-size="16" fill="currentColor" opacity=".85">Aset: RM19.9 bilion</text>';
    s+='<text x="140" y="148" text-anchor="middle" font-size="14" fill="currentColor" opacity=".6">(nilai pasaran RM9.7bn)</text>';
    // arrow
    s+='<line x1="250" y1="115" x2="390" y2="115" stroke="'+P.emas+'" stroke-width="3" marker-end="url(#ar)"/>';
    s+='<text x="320" y="100" text-anchor="middle" font-size="15" fill="'+P.emas+'" font-weight="700">pindah aset</text>';
    s+='<text x="320" y="118" text-anchor="middle" font-size="13" fill="currentColor" opacity=".6">premium +RM10.2bn</text>';
    // UJSB
    s+='<rect x="395" y="55" width="210" height="120" rx="12" fill="'+P.ungu+'" opacity=".12" stroke="'+P.ungu+'" stroke-width="2"/>';
    s+='<text x="500" y="85" text-anchor="middle" font-size="20" font-weight="700" fill="currentColor">UJSB</text>';
    s+='<text x="500" y="110" text-anchor="middle" font-size="14" fill="currentColor" opacity=".85">SPV milik Kerajaan</text>';
    s+='<text x="500" y="130" text-anchor="middle" font-size="13" fill="currentColor" opacity=".6">Urus & pulihkan aset</text>';
    s+='<text x="500" y="150" text-anchor="middle" font-size="13" fill="currentColor" opacity=".6">replikasi model Danaharta</text>';
    // arrows out
    s+='<line x1="605" y1="90" x2="720" y2="60" stroke="currentColor" stroke-width="2" opacity=".5" marker-end="url(#ar)"/>';
    s+='<line x1="605" y1="115" x2="720" y2="130" stroke="currentColor" stroke-width="2" opacity=".5" marker-end="url(#ar)"/>';
    s+='<line x1="605" y1="140" x2="720" y2="200" stroke="currentColor" stroke-width="2" opacity=".5" marker-end="url(#ar)"/>';
    // sukuk cards
    var su=D.ujsbSukuk;
    s+='<rect x="725" y="30" width="245" height="70" rx="10" fill="'+P.biru+'" opacity=".15" stroke="'+P.biru+'"/>';
    s+='<text x="847" y="52" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">Sukuk Siri 1</text>';
    s+='<text x="847" y="72" text-anchor="middle" font-size="14" fill="currentColor">RM10b → nominal RM13.2b</text>';
    s+='<text x="847" y="90" text-anchor="middle" font-size="12" fill="currentColor" opacity=".7">7 tahun · 4.05% YTM</text>';
    s+='<rect x="725" y="105" width="245" height="70" rx="10" fill="'+P.biru+'" opacity=".15" stroke="'+P.biru+'"/>';
    s+='<text x="847" y="127" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">Sukuk Siri 2</text>';
    s+='<text x="847" y="147" text-anchor="middle" font-size="14" fill="currentColor">RM9.6b → nominal RM14.3b</text>';
    s+='<text x="847" y="165" text-anchor="middle" font-size="12" fill="currentColor" opacity=".7">10 tahun · 4.10% YTM</text>';
    s+='<rect x="725" y="180" width="245" height="60" rx="10" fill="'+P.emas+'" opacity=".2" stroke="'+P.emas+'"/>';
    s+='<text x="847" y="205" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">Tunai RM300 juta</text>';
    s+='<text x="847" y="225" text-anchor="middle" font-size="12" fill="currentColor" opacity=".7">RM100j (2019) + RM200j (2020)</text>';
    s+='<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="'+P.emas+'"/></marker></defs>';
    s+='</svg>';
    return s;
  }

  function ujsb(){
    var tr=D.ujsbTransfer, su=D.ujsbSukuk, fg=D.ujsbFunding;
    var svgFlow=ujsbFlow();
    var svgBrk=L.stackedH({
      data:D.ujsbBreakdown.map(function(r){ return {label:r.aset, v:[r.buku, r.pindah-r.buku], c:[P.biru,P.emas], u:'j'}; }),
      h:180, padL:240
    });
    var svgProp=L.hbar({
      data:D.ujsbProperty.map(function(r){ return {label:r.jenis, v:Math.round((r.sebelum-r.kini)/1000000), c:P.merah}; }),
      u:'j', h:320, padL:180
    });
    var svgRo=L.vbars({
      data:D.rofr.map(function(r){ return {label:r.co, sub:r.d, v:[parseFloat(String(r.premium).replace(/[−-]/g,"-"))]}; }),
      series:[{name:'Premium vs pasaran (%)',c:P.biru}], u:'pct', h:320
    });

    return hdr('5','Penyelamatan UJSB: aset dipindah, hutang bertukar menjadi sukuk',
      'Untuk menutup jurang defisit, Kerajaan menubuhkan Urusharta Jamaah (UJSB) — syarikat khas yang mengambil alih aset bermasalah LTH. LTH menerima sukuk sebagai ganti. Ini menyelamatkan LTH, tetapi memindahkan risiko ke masa hadapan — ke atas Kerajaan dan akhirnya pendeposit.')
      + '<h2 class="blok"><span class="n">1</span>Bagaimana aliran wang berfungsi</h2>'
      + '<div class="chart">'+svgFlow+'</div>'
      + '<div class="row" style="margin:6px 0 12px;gap:8px">'+tag('fakta')+sn(121,'Nilai pemindahan')+sn(125,'Terma sukuk')+'</div>'
      + chartCard({t:'Pecahan nilai pemindahan (RM juta)',
        sub:'Buku = nilai catatan LTH; emas = premium di atas nilai buku; pasaran = nilai sebenar.',
        svg:svgBrk,
        leg:legend([{n:'Nilai buku',c:P.biru},{n:'Premium pindahan',c:P.emas}]),
        foot:tag('fakta')+' Ekuiti tersenarai bernilai pasaran RM7.6 bilion dipindah pada RM16.85 bilion — premium terbesar. Jumlah: buku RM18.98b → pindah RM19.9b → pasaran RM9.73b. '+sn(159,'3.13.29')})
      + ins('Soalan yang perlu ditanya','Mengapa aset bernilai pasaran RM9.7 bilion dipindah pada RM19.9 bilion? Jawapan laporan: untuk menutup defisit, LTH diberi sukuk pada nilai premium sebagai ganti. Ini membantu LTH kini — tetapi <b>siapa yang akhirnya membayar premium itu?</b> Sukuk perlu ditebus oleh Kerajaan. '+sn(121,'Premium'))

      + '<h2 class="blok"><span class="n">2</span>Terma-teerma sukuk (hutang Kerajaan)</h2>'
      + '<div class="grid g3">'
      + '<div class="card"><h4>Siri 1</h4><div class="k2" style="font-size:24px">RM10b</div><div class="sub">nominal RM13.2b · 7 tahun · YTM 4.05%</div>'+sn(125,'Sukuk')+'</div>'
      + '<div class="card"><h4>Siri 2</h4><div class="k2" style="font-size:24px">RM9.6b</div><div class="sub">nominal RM14.3b · 10 tahun · YTM 4.10%</div>'+sn(125,'Sukuk')+'</div>'
      + '<div class="card"><h4>Jumlah obligasi</h4><div class="k2" style="font-size:24px">RM27.5b</div><div class="sub">termasuk RM7.65b hasil tertangguh Kerajaan</div>'+sn(121,'Obligasi sukuk')+'</div>'
      + '</div>'
      + caveat('Jaminan?','Pada mulanya sukuk UJSB <b>TIDAK dijamin Kerajaan</b> — hanya ada Surat Sokongan Kewangan (27 Mei 2019). Namun ia disenaraikan dalam Komitmen Jaminan Kerajaan dan Kerajaan bersetuju membiayai penebusannya. Jika LTH gagal, jaminan s24 Akta 535 ke atas deposit RM88 bilion diaktifkan — risiko sistemik kepada kewangan negara. '+sn(126,'Komitmen Jaminan')+sn(32,'Jaminan')+sn(130,'RM88b') )

      + '<h2 class="blok"><span class="n">3</span>Beban kepada Kerajaan & risiko tersembunyi</h2>'
      + chartCard({t:'Peruntukan Kerajaan untuk penebusan sukuk',
        sub:'Jemaah Menteri 5 Apr 2019 meluluskan RM17.8 bilion: RM500 juta (2020) + RM17.3 bilion (≈RM1.73b/tahun) untuk RMK12 & RMK13.',
        body:'<div class="grid g3">'
          + '<div class="card"><div class="k1">Diluluskan jumlah</div><div class="k2">RM17.8b</div></div>'
          + '<div class="card"><div class="k1">Tahun 2020</div><div class="k2">RM500j</div></div>'
          + '<div class="card"><div class="k1">Setahun (purata)</div><div class="k2">RM1.73b</div></div>'
          + '</div>',
        foot:tag('fakta')+sn(127,'5 Apr 2019')})
      + risk('<b>Isyarat amaran:</b> setakat ini LTH menerima tunai hanya <b>RM500 juta</b> berbanding nilai aset RM9.73 bilion yang dipindah. Pada 2021, peruntukan RM1.5 bilion yang diluluskan <b>tidak diterima</b> (diberi keutamaan kepada pemulihan Covid-19). Pendapatan tertunda sukuk: RM840 juta/tahun, kumulatif lebih RM2.1 bilion (Dis 2021) — <b>tidak disokong tunai</b>. '+sn(128,'Tunai diterima')+sn(132,'Pendapatan tertunda')+sn(128,'RM1.5b') )
      + chartCard({t:'Pengakruan sukuk — sebahagian besar pendapatan LTH',
        sub:'LTH bergantung kepada “hasil” sukuk yang belum diterima secara tunai.',
        body:'<div class="grid g3">'
          + '<div class="card"><div class="k1">Sumbangan kepada pendapatan tahunan</div><div class="k2">≈26%</div></div>'
          + '<div class="card"><div class="k1">Bahagian daripada agihan hibah tahunan</div><div class="k2">&gt;1/3</div></div>'
          + '<div class="card"><div class="k1">Sukuk matang (tertinggal)</div><div class="k2">2026 · 2029</div></div>'
          + '</div>',
        foot:tag('fakta')+sn(133,'Pengakruan')})

      + '<h2 class="blok"><span class="n">4</span>Hak Penolakan Pertama (ROFR): jualan yang tidak menguntungkan</h2>'
      + chartCard({t:'Premium tawaran ROFR berbanding harga pasaran',
        sub:'UJSB tawarkan saham kepada LTH pada harga premium. Negatif = tawaran di bawah pasaran.',
        svg:svgRo,
        foot:tag('terbitan')+' 8 daripada 9 tawaran ROFR pada premium. Dalam kebanyakan kes LTH boleh beli lebih murah di pasaran terbuka. KSL Holdings ditawarkan di bawah pasaran (−3.2%, −4.1%). '+sn(131,'Jadual ROFR')})

      + '<h2 class="blok"><span class="n">5</span>Aset yang dipindah — adakah ia pulih?</h2>'
      + chartCard({t:'Kejatuhan nilai hartanah yang dipindah ke UJSB (RM juta)',
        sub:'UJSB kekal menanggung rosot nilai. Nilai turun daripada RM2,247j kepada RM1,203j (Dis 2021).',
        svg:svgProp,
        foot:tag('terbitan')+' Jumlah hartanah pindahan: RM2,247j → RM1,203j (selepas rosot). '+sn(122,'3.13.30')})
      + chartCard({t:'Pelupusan oleh UJSB',
        sub:'Setakat laporan: 75 daripada 106 kaunter saham dilupuskan; hanya 1 daripada 29 hartanah terjual.',
        body:'<div class="grid g3">'
          + '<div class="card"><div class="k1">Saham dilupus</div><div class="k2">75 / 106</div></div>'
          + '<div class="card"><div class="k1">Hartanah terjual</div><div class="k2">1 / 29</div></div>'
          + '<div class="card"><div class="k1">Kaunter reinvest</div><div class="k2">329</div></div>'
          + '</div>',
        foot:tag('fakta')+sn(129,'3.13.40')})

      + '<h2 class="blok"><span class="n">6</span>Garis masa penyelamatan</h2>'
      + tl(D.ujsbTimeline)
      + ins('Pandangan Suruhanjaya','Pelan UJSB adalah “solusi interim yang penting”, bukan penyelesaian jangka panjang. Kejayaan bergantung kepada kemampuan Kerajaan menebus sukuk. Cadangan: jadikan sukuk boleh diniagakan, tambah jaminan Kerajaan, tawarkan kepada institusi lain, dan buat penebusan awal daripada hasil pelupusan aset.');
  }

  /* ============================================================
     6. HAJI & HAFIS
     ============================================================ */
  function haji(){
    var svgCost=L.line({
      data:D.hajiCostPoints.map(function(r){ return {x:String(r.y), v:r.v}; }),
      series:[{k:'v', c:P.emas}], u:'t', h:320, area:false
    });
    var svgActual=L.stackedH({
      data:D.hafisActual.map(function(r){ return {label:r.y, v:[r.hafis, r.bayar], c:[P.emas,P.hijau], u:'t'}; }),
      h:300, padL:70
    });
    var svgProj=L.combo({
      data:D.hafisProj.map(function(r){ return {x:r.y, bar:r.jum/1000, pct:r.pct}; }),
      h:330
    });

    return hdr('6','Kos haji & HAFIS: subsidi yang menekan pendeposit',
      'Kos haji naik hampir setiap tahun, tetapi bayaran jemaah dibekukan 13 tahun. Perbezaan (HAFIS) ditanggung LTH daripada keuntungan pelaburan — bermakna <b>wang yang sepatutnya jadi hibah pendeposit dipakai untuk subsidi</b>.')
      + '<h2 class="blok"><span class="n">1</span>Kos sebenar haji seorang jemaah</h2>'
      + chartCard({t:'Kos haji Muassasah seorang jemaah (RM)',
        sub:'2003 → 2050 (unjuran laporan untuk 2030 & 2050).',
        svg:svgCost,
        foot:tag('fakta')+' 2013: RM15,553 · 2022: RM25,540 · unjuran 2030: RM35,000 · 2050: RM50,000. '+sn(203,'3.16.1')})
      + '<h2 class="blok"><span class="n">2</span>Bayaran beku, subsidi naik (2014–2019)</h2>'
      + chartCard({t:'Bahagian kos yang dibayar jemaah vs subsidi HAFIS (RM seorang)',
        sub:'Hijau = dibayar jemaah (RM9,980 beku); emas = ditanggung LTH (HAFIS).',
        svg:svgActual,
        leg:legend([{n:'HAFIS (subsidi LTH)',c:P.emas},{n:'Bayaran jemaah',c:P.hijau}]),
        foot:tag('fakta')+' 2014: HAFIS 38% → 2019: 56% daripada kos. Jumlah HAFIS: RM106j (2014) → RM299j (2019). '+sn(204,'3.16.3')})
      + ins('Kejutan','Kos haji melonjak kerana Kerajaan Arab Saudi menaikkan caj. Bayaran jemaah Malaysia tidak naik selama 13 tahun (2009–2021) — supaya nampak “murah” kepada pengundi, tetapi beban subsidi dibawa oleh pendeposit melalui hibah yang lebih rendah.')

      + '<h2 class="blok"><span class="n">3</span>Unjuran 2022–2030: subsidi mencekik</h2>'
      + chartCard({t:'HAFIS unjuran (RM juta, bar) & % kos (garis)',
        sub:'Walaupun bayaran naik ke RM12,980 pada 2022, subsidi tetap membesar.',
        svg:svgProj,
        leg:legend([{n:'HAFIS (RM juta)',c:'#c9a24b'},{n:'% daripada kos haji',c:'#b3382c'}]),
        foot:tag('unjuran')+' Dari 49.2% (2022) kepada 65.6% (2030). Nilai: RM376.8j → RM742.5j setahun. '+sn(205,'3.16.8')})
      + risk('<b>Kesan langsung kepada hibah:</b> Setiap RM400 juta subsidi ≈ 0.4–0.5% pengurangan kadar hibah. Untuk menampung HAFIS pada paras semasa, LTH perlukan sekurang-kurangnya <b>RM60 bilion deposit</b>. Jika subsidi naik, keperluan dana naik — dan kebergantungan kepada pendeposit besar bertambah. '+sn(168,'3.16.12')+sn(110,'3.7.24') )

      + '<h2 class="blok"><span class="n">4</span>Giliran haji: matematik 130 → 33 tahun</h2>'
      + chartCard({t:'Simulasi giliran haji jika deposit minima dinaikkan',
        sub:'Cadangan Suruhanjaya: deposit minima RM1,300 → RM12,980.',
        body:'<div class="grid g2">'
          + '<div class="card"><div class="k1">Kini (deposit RM1,300)</div><div class="k2" style="color:'+P.merah+'">~130 tahun</div><div class="sub">menunggu giliran</div></div>'
          + '<div class="card"><div class="k1">Cadangan (RM12,980)</div><div class="k2" style="color:'+P.hijau+'">~33 tahun</div><div class="sub">menunggu giliran</div></div>'
          + '</div>',
        foot:tag('simulasi')+' Pengiraan laporan: menaikkan minima mendaftar kepada RM12,980 bukan sahaja menambah deposit LTH, malah memendekkan giliran daripada ~130 tahun kepada ~33 tahun. '+sn(33,'Cadangan (v)')})
      + chartCard({t:'Siapa pendeposit LTH?',
        sub:'Tumpuan dana dalam segelintir besar.',
        body:'<div class="grid g2">'
          + '<div class="card"><div class="k1">Pendeposit simpan ≤ RM2,000</div><div class="k2">65%</div></div>'
          + '<div class="card"><div class="k1">Deposit dipegang oleh 5% pendeposit</div><div class="k2">75%</div></div>'
          + '</div>',
        foot:tag('fakta')+' Sebab itu 65% pendeposit (kebanyakan) tidak akan terjejas oleh perubahan; risiko sebenar datang dari 5% besar. '+sn(168,'3.16.14')+sn(210,'3.17.15')})
      + chartCard({t:'Kuota haji',
        sub:'Saudi Vision 2030 menaikkan kuota Malaysia.',
        body:'<div class="grid g2">'
          + '<div class="card"><div class="k1">Kini</div><div class="k2">30,000</div></div>'
          + '<div class="card"><div class="k1">Menjelang 2030</div><div class="k2">60,000</div></div>'
          + '</div>',
        foot:tag('fakta')+sn(208,'3.16.20')})
      + ins('Ringkasan babak','Subsidi haji adalah kewajipan moral dan politik, tetapi ia datang daripada poket pendeposit melalui hibah yang lebih rendah. Cadangan utama: subsidi hanya untuk yang memerlukan (isti’to’ah), naikkan deposit minima, dan biar lebih ramai jemaah menunaikan haji lebih cepat.');
  }

  /* ============================================================
     7. TADBIR URUS
     ============================================================ */
  function tadbir(){
    var svgBonus=L.vbars({
      data:D.bonusStaff.map(function(r){return {label:r.y,v:[r.j]};}),
      series:[{name:'Peruntukan bonus (RM juta)',c:P.ungu}], u:'j', h:300
    });
    var svgBProfit=L.hbar({
      data:D.bonusProfit.map(function(r){return {label:r.y,v:r.pct,c:P.ungu};}), u:'pct', h:260, padL:70
    });
    var rowsRoles=D.subsidiaryRoles.map(function(r){
      return '<tr><td class="nm">'+esc(r.p)+'</td><td>'+esc(r.s)+'</td><td class="num">'+r.n+'</td></tr>';
    }).join("");
    var rowsPol=D.boardPolitik.map(function(r){
      return '<tr><td class="nm">'+esc(r.n)+'</td><td>'+esc(r.peranan)+'</td><td>'+esc(r.tempoh)+'</td><td class="num">'+esc(r.jwtn)+'</td></tr>';
    }).join("");
    var rowsB17=D.bonusThp2017.map(function(r){return '<tr><td class="nm">'+esc(r.n)+'</td><td class="num">'+nfmt(r.v)+'</td></tr>';}).join("");
    var rowsB18=D.bonusThpa2018.map(function(r){return '<tr><td class="nm">'+esc(r.n)+'</td><td class="num">'+nfmt(r.v)+'</td></tr>';}).join("");
    var rowsAkad=D.akad.map(function(r){
      return '<div class="te"><span class="d">'+esc(r.d)+'</span><span class="h">'+esc(r.h)+'</span><div class="x">'+esc(r.t)+'</div></div>';
    }).join("");

    return hdr('7','Tadbir urus & orang: kuasa luas, kepakaran tipis, konflik banyak',
      'Laporan memaparkan bagaimana kuasa Menteri terlalu luas, kriteria pelantikan terlalu longgar, dan orang yang sama duduk di banyak anak syarikat serentak — sambil bonus dibayar tanpa peraturan dan zakat pendeposit dipersoalkan.')
      + '<h2 class="blok"><span class="n">1</span>Struktur kuasa yang dicadang diubah</h2>'
      + '<div class="duabuku">'
      + '<div class="book official"><div class="bh">Struktur sekarang (masalah)</div><div class="vl">Menteri Hal Ehwal Agama pegang kuasa luas — urusan haji, dana & pelaburan. Kepakaran menteri hanya bidang agama; tiada input kewangan tambahan. <br><br>Pengerusi & anggota Lembaga: kriteria hanya <b>“Muslim & warganegara”</b>.</div></div>'
      + '<div class="book true" style="background:linear-gradient(135deg,#e8f0ec,#e2efe9);border-color:#bcd6c9;color:#0a3b2c"><div class="bh" style="color:#0a3b2c">Cadangan Suruhanjaya</div><div class="vl">Menteri Hal Ehwal Agama: <b>urus haji</b> sahaja. <br>Menteri Kewangan: <b>dana & pelaburan</b>. <br><br>Pelantikan oleh Perdana Menteri atas syor badan penasihat bebas; larang ahli politik aktif; nyatakan bidang kepakaran.</div></div>'
      + '</div>'
      + '<div class="row" style="margin:8px 0;gap:8px">'+tag('fakta')+sn(15,'Akta 535 — kuasa Menteri')+sn(16,'Kriteria s6(2)')+sn(28,'Cadangan')+'</div>'

      + '<h2 class="blok"><span class="n">2</span>Ahli politik dalam Lembaga (2014–2018)</h2>'
      + '<div class="twrap"><table class="rc"><thead><tr><th>Nama</th><th>Peranan</th><th>Tempoh</th><th>Jawatan politik</th></tr></thead><tbody>'+rowsPol+'</tbody></table></div>'
      + '<p class="caption">Suruhanjaya: pelantikan ahli politik menimbulkan keresahan masyarakat & menjadikan keputusan LTH bahan kritikan politik. '+sn(16,'3.2.13')+'</p>'

      + '<h2 class="blok"><span class="n">3</span>Konflik kepentingan: ramai “topi” serentak</h2>'
      + '<div class="twrap"><table class="rc"><thead><tr><th>Pegawai / Lembaga</th><th>Jawatan dalam anak syarikat</th><th class="num">Bilangan</th></tr></thead><tbody>'+rowsRoles+'</tbody></table></div>'
      + caveat('Kenapa ini penting','Orang yang sama menasihati dan meluluskan pelaburan (di LTH) juga mengetuai syarikat yang menerima pelaburan itu. KPE Datuk Seri Johan memegang <b>18 jawatan serentak</b>; CFO Rozaida menjadi proksi di <b>23 anak syarikat</b>. Ini mengaburkan fokus dan menimbulkan konflik kepentingan.')
      + ins('Cadangan','Hadkan jawatan anak syarikat kepada <b>5 sahaja</b> bagi Pengerusi, anggota Lembaga & pengurusan tertinggi.')

      + '<h2 class="blok"><span class="n">4</span>Bonus kakitangan 2010–2020</h2>'
      + chartCard({t:'Peruntukan bonus kakitangan (RM juta)',
        sub:'2010–2017 bonus antara 2–13 bulan. 2014: bonus luar biasa sehingga 13 bulan.',
        svg:svgBonus,
        foot:tag('fakta')+' Puncak RM74j pada 2014 (bersamaan 1–11 bulan + 2 bulan khas). Selepas 2018, bonus dikawal kepada 1 bulan sahaja. '+sn(137,'3.12.7')})
      + chartCard({t:'Peruntukan bonus sebagai % keuntungan bersih',
        sub:'Bonus dijustifikasikan atas keuntungan 1.0–2.5% — walaupun keuntungan itu palsu (RAV).',
        svg:svgBProfit,
        foot:tag('terbitan')+' Kerana keuntungan besar (RAV), bonus besar “layak”. Apabila RAV dibuang, asas itu runtuh. '+sn(139,'3.12.10')+sn(140,'3.12.13')})

      + '<h2 class="blok"><span class="n">5</span>Bonus TH Properties & THP Australia — tanpa kelulusan sah</h2>'
      + '<div class="grid g2">'
      + '<div class="card"><h4>Bonus khas TH Properties 2017</h4><div class="k2" style="font-size:22px;color:'+P.merah+'">RM1,148,400</div><p class="sub">11 penerima. Diluluskan Exco tanpa mandat Lembaga (s230(2) Akta 777).</p><div class="twrap"><table class="rc" style="min-width:0"><thead><tr><th>Penerima</th><th class="num">RM</th></tr></thead><tbody>'+rowsB17+'</tbody></table></div></div>'
      + '<div class="card"><h4>Bonus khas THP Australia 2018</h4><div class="k2" style="font-size:22px;color:'+P.merah+'">RM1,045,000</div><p class="sub">10 penerima. Dimaklumkan kepada pemegang saham lewat 7 bulan — langgar s230(3).</p><div class="twrap"><table class="rc" style="min-width:0"><thead><tr><th>Penerima</th><th class="num">RM</th></tr></thead><tbody>'+rowsB18+'</tbody></table></div></div>'
      + '</div>'
      + '<p class="caption">Suruhanjaya mengesyorkan pulihkan bonus yang dibayar tanpa mematuhi peraturan. '+sn(142,'3.12.21')+sn(143,'3.12.26')+sn(145,'3.12.29')+'</p>'

      + '<h2 class="blok"><span class="n">6</span>Akad deposit: perubahan yang mempengaruhi zakat pendeposit</h2>'
      + '<div class="tline">'+rowsAkad+'</div>'
      + caveat('Isu zakat','Pada 2016 akad ditukar ke Wadi’ah (simpanan jadi hutang) tanpa kajian menyeluruh. Ini mendedahkan pendeposit kepada tanggungan zakat simpanan (2.5%) dan LTH tidak lagi mewakili zakat pendeposit. Dis 2019 akad Wakalah menyelesaikan isu — tetapi Suruhanjaya cadang ia dirujuk ke Muzakarah MKI. '+sn(108,'3.7.18')+sn(109,'3.7.20'))

      + '<h2 class="blok"><span class="n">7</span>Amaran BNM yang diabaikan</h2>'
      + tl(D.bnmWarnings.map(function(w){return {d:w.d,h:w.t,t:'Surat/temujanji BNM '+sn(w.p,'BNM')};}))
      + ins('Garis bawah tadbir urus','BNM memberi amaran bertahun-tahun tentang deposit, rizab & kecairan — tetapi kawal selia formal hanya bermula 1 Jan 2019 dan BNM sendiri mengaku tidak ada kepakaran untuk pelaburan & pengurusan haji. Suruhanjaya cadang hadkan BNM kepada rizab & kecairan sahaja.');
  }

  /* ============================================================
     8. CADANGAN & MASA DEPAN
     ============================================================ */
  function cadangan(){
    var cards=D.recGroups.map(function(g,i){
      var items=g.rec.map(function(r){return '<li>'+esc(r)+'</li>';}).join("");
      return '<div class="card" style="border-top:3px solid '+g.b+'"><h4 style="display:flex;align-items:center;gap:8px"><span style="width:22px;height:22px;border-radius:6px;background:'+g.b+';color:#fff;display:grid;place-items:center;font-size:12px">'+(i+1)+'</span>'+esc(g.tema)+'</h4><ul style="margin:8px 0 0;padding-left:18px;font-size:13.5px;color:var(--muted);line-height:1.6">'+items+'</ul></div>';
    }).join("");
    return hdr('8','Cadangan & masa depan: apa yang kena berubah',
      'Suruhanjaya memberi 25 cadangan. Struktur LTH dikekalkan (jadi bukan dibubarkan), tetapi tadbir urus, kawal selia dan perakaunan perlu diperbetulkan. Berikut ringkasan mengikut tema dan kesannya kepada anda.')
      + '<h2 class="blok"><span class="n">1</span>25 cadangan mengikut tema</h2>'
      + '<div class="grid g2">'+cards+'</div>'

      + '<h2 class="blok"><span class="n">2</span>Idea besar: Dana Haji</h2>'
      + ins('Cadangan utama','Wujudkan <b>Dana Haji</b> — jabatan dalam LTH (bukan syarikat berasingan) yang khas mengurus pelaburan, dikawal selia <b>Suruhanjaya Sekuriti Malaysia</b>. Lembaga LTH tidak boleh mengarahkan keputusan pelaburan Dana Haji. Fungsi dana dan fungsi haji kekal dalam satu entiti kerana ada subsidi silang (cross-subsidy).')
      + caveat('Kesan','Dana yang kini RM88 bilion (dijangka RM100 bilion dalam 2 tahun) perlu diurus secara profesional dan bebas politik — seperti KWSP. Pelabur asing / dana domestik dibandingkan dengan pengurus dana luar.')

      + '<h2 class="blok"><span class="n">3</span>Kesan kepada awak</h2>'
      + '<div class="grid g3">'
      + '<div class="card"><h4>Pendeposit</h4><p class="sub">Hibah lebih realistik; jaminan Kerajaan RM88b kekal. Deposit minima naik untuk pendaftar baru.</p></div>'
      + '<div class="card"><h4>Jemaah haji</h4><p class="sub">Bayaran naik (RM10,980 B40 / RM12,980 lain); subsidi hanya untuk yang perlu; giliran makin cepat.</p></div>'
      + '<div class="card"><h4>Pembayar cukai</h4><p class="sub">Risiko sistemik kepada kewangan negara jika LTH gagal — kerana Kerajaan menanggung RM17.8b + jaminan RM88b.</p></div>'
      + '</div>'

      + '<h2 class="blok"><span class="n">4</span>Risiko terbesar ke hadapan</h2>'
      + risk('<b>Jika LTH gagal:</b> jaminan Kerajaan s24 Akta 535 ke atas deposit <b>RM88 bilion</b> terpaksa diaktifkan. Ini bukan sahaja melibatkan LTH — ia menggugat kestabilan sistemik kewangan negara. Sebab itu kejayaan pelan UJSB dan penstrukturan sukuk adalah kritikal. '+sn(32,'RM88b'))
      + '<div class="row" style="margin-top:14px;gap:8px">'+tag('terbitan')+' Ringkasan berdasarkan BAB 3 & BAB 4 laporan. Untuk butiran penuh rujuk laporan asal. '+sn(28,'Ringkasan cadangan')+'</div>';
  }

  /* ============ exports ============ */
  return {
    gambaran:gambaran, krisis:krisis, hibah:hibah, pelaburan:pelaburan,
    ujsb:ujsb, haji:haji, tadbir:tadbir, cadangan:cadangan,
    invSet:function(opt){
      if(opt.sort) INV.sort=opt.sort;
      if(typeof opt.dir==="number") INV.dir=opt.dir;
      if(opt.cat) INV.cat=opt.cat;
      if(opt.st) INV.st=opt.st;
      return invTable();
    }
  };
})();