/* ==========================================================================
   views-4.js — Amaran & akauntabiliti · Kronologi · Syor · Percanggahan · Sumber
   ========================================================================== */
var V = (window.V = window.V || {});
var S = (window.S = window.S || {});

/* ============ 10. SIAPA TAHU, BILA — MATRIKS AKAUNTABILITI =============== */
V.amaran = {
  nav: 'Amaran diabaikan', kicker: 'Akauntabiliti',
  h1: 'Semua orang tahu. Tiada siapa berhenti.',
  desc: 'Krisis 2017 bukan kejutan. Antara 2014 dan 2018, sekurang-kurangnya lima institusi memberi amaran ' +
    'bertulis. Paparan ini menyusun setiap amaran, kepada siapa, dan apa yang berlaku selepas itu.',
  init: function () { if (S.amaranFilter == null) S.amaranFilter = []; },
  render: function () {
    var am = RD.amaran, rows = am.rows.slice().sort(function (a, b) { return a.tarikh < b.tarikh ? -1 : 1; });
    var hasil = am.hasilLabel;
    var sel = S.amaranFilter;
    var view = sel.length ? rows.filter(function (r) { return sel.indexOf(r.hasil) >= 0; }) : rows;
    var kira = {};
    rows.forEach(function (r) { kira[r.hasil] = (kira[r.hasil] || 0) + 1; });
    var h = '';

    /* --- skor --- */
    h += '<div class="sec">';
    h += L.tiles([
      { l: 'Amaran bertulis dikenal pasti dalam laporan', v: String(rows.length),
        tip: 'Surat rasmi, laporan konsultan dan laporan audit yang disebut dalam laporan RCI, 2014–2022.' },
      { l: 'Tidak diberi perhatian sewajarnya', v: String(kira.diabai || 0), cls: 'neg',
        tip: 'Suruhanjaya: "' + am.ringkasan + '"' },
      { l: 'Teguran audit dilembutkan', v: String(kira.lembut || 0), cls: 'neg',
        tip: 'Pendapat Berteguran dicadangkan tetapi tidak diberi; "Emphasis of Matter" diberi sebaliknya.' },
      { l: 'Baru ditindaklanjuti selepas krisis meletus', v: String(kira.bertindak || 0), cls: 'pos',
        tip: 'Semua tindakan berkesan berlaku selepas November 2018 — selepas laporan PwC dan teguran KAN.' }
    ]);
    h += '</div>';

    /* --- garis masa amaran --- */
    h += '<div class="sec"><h2>Garis masa amaran</h2>' +
      '<p class="lead">Tapis mengikut apa yang berlaku selepas amaran itu diterima.</p>';
    h += '<div class="ctl">' + L.chips('amaranFilter', Object.keys(hasil).map(function (k) {
      return { v: k, l: hasil[k].l + ' (' + (kira[k] || 0) + ')' };
    }), sel) + '</div>';
    h += '<div class="card"><div class="tlist">';
    view.forEach(function (r) {
      var hl = hasil[r.hasil];
      h += '<div class="tev k-amaran" style="--x:1">' +
        '<div class="td">' + L.tarikh(r.tarikh) + ' · <b style="color:var(--ink-2)">' + L.esc(r.dari) + '</b> → ' + L.esc(r.kepada) + '</div>' +
        '<div class="tt">' + L.esc(r.tajuk) + '</div>' +
        '<div class="tb">' + L.esc(r.isu) + '</div>' +
        '<div style="margin-top:7px;display:flex;flex-wrap:wrap;gap:6px;align-items:center">' +
        '<span class="etag st-' + (r.hasil === 'diabai' ? 'mahkamah' : r.hasil === 'bertindak' ? 'selesai' :
          r.hasil === 'ditolak' ? 'hapus' : 'polis') + '">' + L.esc(hl.l) + '</span>' +
        L.src([r.p]).replace('<div class="srcs">', '<span class="srcs" style="margin:0">').replace('</div>', '</span>') +
        '</div>' +
        (r.hasilNota ? '<div class="cnote" style="margin-top:8px;font-size:12.3px">' + L.esc(r.hasilNota) + '</div>' : '') +
        '</div>';
    });
    h += '</div>';
    h += '<div class="cnote"><b>Pola masa yang penting:</b> daripada ' + rows.length + ' amaran, ' +
      'tiada satu pun yang membawa tindakan berkesan sebelum <b>November 2018</b>. Tindakan hanya berlaku ' +
      'selepas dua perkara berlaku serentak: teguran "Emphasis of Matter" Ketua Audit Negara (Julai 2018) ' +
      'dan laporan akhir PwC (November 2018) — iaitu selepas pertukaran pengurusan LTH pada Julai 2018.</div>';
    h += '</div></div>';

    /* --- matriks pihak --- */
    h += '<div class="sec"><h2>Tujuh institusi: apa peranan mereka, dan apa Suruhanjaya kata</h2>' +
      '<p class="lead">Setiap institusi ini mempunyai peluang untuk menghentikan masalah ini. ' +
      'Suruhanjaya menilai setiap satu.</p>';
    RD.pihak.forEach(function (p) {
      h += L.card({
        t: L.esc(p.n),
        sub: '<b>Peranan:</b> ' + L.esc(p.peranan),
        body: '<div class="rb two">' +
          '<div class="cannot"><strong>Dapatan Suruhanjaya</strong>' + p.dapatan + '</div>' +
          '<div class="can"><strong>Syor</strong>' + p.syor + '</div></div>',
        p: p.p
      });
    });
    h += '</div>';

    /* --- kes KAN --- */
    h += '<div class="sec"><h2>Kes yang paling serius: mengapa Sijil Audit Bersih diberikan</h2>';
    h += L.card({
      t: 'Dalam kata-kata Ketua Audit Negara sendiri', badge: L.pv('fakta'),
      sub: 'Surat KAN kepada Perdana Menteri bertarikh 19 Disember 2018, dipetik dalam Akuan Berkanun Saksi ' +
        'Tan Sri Madinah binti Mohamad.',
      body: '<blockquote style="margin:6px 0;padding:14px;background:var(--bad-soft);border-left:3px solid var(--bad);' +
        'border-radius:0 9px 9px 0;font-size:13.5px;line-height:1.6;font-style:italic">' +
        '"Pendapat Berteguran telah dicadangkan terhadap Penyata Kewangan TH bagi tahun berakhir 31 Disember 2017 ' +
        'sekiranya tiada pelarasan dibuat untuk dua penemuan material yang dibangkitkan… ' +
        '<b>Bagaimanapun, hasil perbincangan tersebut, sekiranya Pendapat Berteguran diberikan, secara tidak ' +
        'langsung ianya akan mempengaruhi espektasi dan persepsi negatif pihak berkepentingan (stakeholder), ' +
        'khususnya pendeposit untuk terus menyimpan di TH.</b> Dengan mengambil kira perkara tersebut, ' +
        'Pendapat Tanpa Teguran dengan ‘Emphasis of Matter’ telah diberikan pada 16 Julai 2018."' +
        '</blockquote>' +
        '<p class="csub"><b>Perbincangan yang dimaksudkan</b> berlaku pada 4 Julai 2018 — dengan Perdana Menteri. ' +
        'Sijil Audit Bersih dikeluarkan 12 hari kemudian.</p>',
      note: '<b>Penilaian Suruhanjaya:</b> "Penjelasan di atas menunjukkan bahawa KAN telah mempertimbangkan ' +
        'perkara-perkara <b>di luar skop audit</b> dalam penemuannya… Jelas bahawa JAN tidak tegas dalam ' +
        'pengauditan penyata kewangan LTH. Sepatutnya untuk tahun kewangan 2017, JAN tidak sepatutnya memberi ' +
        'Sijil Audit Bersih. Perkara-perkara yang dinyatakan sebagai ‘Emphasis of Matter’ sepatutnya ' +
        'dinyatakan sebagai <b>ketidakpatuhan</b>."',
      limit: 'Suruhanjaya juga menyatakan sebab yang mungkin bersifat struktur: "Sebagai agensi Kerajaan, ' +
        'JAN mungkin tertekan untuk mengisytiharkan dapatan sedemikian." Ini penjelasan, bukan pembenaran — ' +
        'dan itulah asas syor supaya LTH diaudit oleh firma akauntan swasta.',
      p: [21, 22, 133, 134, 135]
    });
    h += L.card({
      t: 'Kesan langsung Sijil Audit Bersih itu', badge: L.pvs('fakta', 'terbit'),
      body: L.svgWaterfall({
        w: 700, h: 250, fmt: L.rmjShort, yfmt: L.rmjShort,
        rows: [
          { k: 'Hibah tahunan 4.50%', v: 3042.184, total: true, color: 'var(--neutral)',
            tip: 'Hibah tahunan 2017 pada kadar 4.50%: RM3,042 juta' },
          { k: 'Hibah haji 1.75%', v: 281.557, color: 'var(--warn)',
            tip: 'Hibah haji 2017 pada kadar 1.75%: RM282 juta' },
          { k: 'Jumlah dibayar 2017', v: 3323.741, total: true, color: 'var(--bad)',
            tip: 'Jumlah hibah 2017: RM3,324 juta — dibayar berdasarkan penyata kewangan yang mendapat Sijil Audit Bersih' }
        ]
      }),
      note: 'Suruhanjaya menyatakan hubungan sebab-akibat ini secara terus: <b>"Tanpa Sijil Audit Bersih, LTH ' +
        'tidak sepatutnya mengisytiharkan agihan keuntungan (hibah) tahunan pada kadar 4.50% dan agihan ' +
        'keuntungan (hibah) haji 1.75% yang telah menelan belanja sehingga RM2.75 bilion bagi tahun kewangan 2017."</b> ' +
        '(Nota: laporan menyebut RM2.75 bilion di ms 22 tetapi jadual di ms 130 menunjukkan jumlah agihan 2017 ' +
        'RM3.32 bilion — lihat <a href="#/integriti">daftar percanggahan</a>.)',
      p: [22, 130]
    });
    h += '</div>';

    /* --- kegagalan lain --- */
    h += '<div class="sec"><h2>Dua kegagalan senyap yang jarang disebut</h2>';
    h += '<div class="grid g2">';
    h += L.card({
      t: 'Kumpulan Wang Pendeposit dikelaskan sebagai EKUITI sejak 2010', badge: L.pv('fakta'),
      body: '<p class="csub">Wang pendeposit ialah <b>hutang</b> LTH kepada pendeposit — ia liabiliti. ' +
        'Tetapi dalam penyata kewangan LTH, ia dikelaskan sebagai <b>dana (ekuiti)</b> sejak 2010, dan JAN ' +
        'menerimanya.</p>' +
        '<p class="csub">Kesan matematiknya besar: kalau liabiliti terbesar anda dikira sebagai modal, ' +
        'penyata kewangan akan menunjukkan aset melebihi liabiliti — dan ujian seksyen 22(3)(a) "lulus" secara ' +
        'automatik.</p>',
      note: 'Suruhanjaya: pengelasan itu "adalah satu <b>representasi salah</b> dan tidak selari dengan piawaian ' +
        'perakaunan tentang kedudukan sebenar aset dan liabiliti LTH. Sepatutnya, Kumpulan Wang Pendeposit ' +
        'dikelaskan sebagai liabiliti." Dan: "akibat Kumpulan Wang Pendeposit dikelaskan sebagai ekuiti dan ' +
        'rosot nilai yang tidak mencukupi, maka penyata kewangan tahunan LTH telah menunjukkan aset melebihi ' +
        'liabiliti dan dengan itu membolehkan keuntungan (hibah) diisytiharkan."',
      p: [132]
    });
    h += L.card({
      t: 'Perbendaharaan tidak pernah menetapkan baki rizab minima', badge: L.pv('fakta'),
      body: '<p class="csub">Seksyen 22(3)(b) Akta 535 mengatakan hibah tidak boleh diisytiharkan melainkan ' +
        'aset Kumpulan Wang Rizab tidak kurang daripada peratusan yang <b>diluluskan Perbendaharaan</b>.</p>' +
        '<p class="csub">Ini sepatutnya menjadi brek automatik. Kalau Perbendaharaan menetapkan, katakan, ' +
        'rizab minima 5% daripada deposit, LTH tidak boleh mengagihkan hibah yang menyusutkan rizab di bawah paras itu.</p>',
      note: '<b>' + RD.rizab.perbendaharaan + '</b> Roland Berger pula mendapati LTH menggunakan rizabnya untuk ' +
        'membayar hibah pada 2012, 2014 dan 2016, dan arah aliran rizab menurun selepas 2016. LTH baru ' +
        'menetapkan polisi rizab yang spesifik pada 2019 (Rizab Penyamaan Keuntungan disasarkan pada 5% ' +
        'nilai aset bersih atau RM3.5 bilion) — tetapi Suruhanjaya mendapati LTH tetap menggunakan rizab untuk ' +
        'menampung hibah pada 2020 dan 2021.',
      p: [104, 105, 106]
    });
    h += '</div></div>';

    h += '<div class="sec">' + L.readBlocks(
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Krisis 2017 mempunyai jejak amaran bertulis yang panjang dan boleh dijejaki, bermula 2014.</li>' +
      '<li>Kegagalan bukan kegagalan mengesan masalah — ia kegagalan <b>bertindak</b> apabila masalah dikesan. ' +
      'BNM tiada kuasa penguatkuasaan; JAN mempunyai kuasa tetapi melembutkan teguran; Perbendaharaan mempunyai ' +
      'kuasa berkanun tetapi tidak pernah menggunakannya.</li>' +
      '<li>Suruhanjaya mengesyorkan pengauditan LTH dipindahkan daripada JAN kepada firma akauntan swasta — ' +
      'satu syor yang luar biasa untuk badan berkanun.</li></ul>',
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Kita <b>tidak boleh</b> mengetahui kandungan penuh surat-surat BNM atau laporan Roland Berger — ' +
      'semuanya ekshibit rahsia. Kita hanya tahu tajuk dan ringkasan yang dipetik Suruhanjaya.</li>' +
      '<li>Kita <b>tidak boleh</b> menyimpulkan bahawa Perdana Menteri mengarahkan KAN mengubah pendapat audit. ' +
      'Laporan hanya menyatakan "hasil perbincangan tersebut" pada 4 Julai 2018.</li>' +
      '<li>Kita <b>tidak boleh</b> menyimpulkan LTH tidak menerima surat-surat itu. Laporan mengatakan surat ' +
      'dihantar tetapi "tidak mendapat perhatian yang sewajarnya".</li></ul>'
    ) + '</div>';
    return h;
  }
};

/* ========================== 11. KRONOLOGI ================================ */
V.kronologi = {
  nav: 'Kronologi', kicker: 'Garis masa',
  h1: 'Tujuh puluh tahun, lima puluh peristiwa',
  desc: 'Dari Ordinan Haji 1951 hingga laporan ditandatangani pada 19 Julai 2022. Tapis mengikut tema ' +
    'untuk mengikuti satu benang cerita sahaja.',
  init: function () {
    if (S.kronTema == null) S.kronTema = [];
    if (S.kronDari == null) S.kronDari = '1951';
  },
  render: function () {
    var kt = RD.kronologiTema, all = RD.kronologi.slice().sort(function (a, b) { return a.d < b.d ? -1 : 1; });
    var sel = S.kronTema, dari = S.kronDari;
    var view = all.filter(function (e) {
      return (!sel.length || sel.indexOf(e.tema) >= 0) && String(e.d).slice(0, 4) >= dari;
    });
    var kira = {};
    all.forEach(function (e) { kira[e.tema] = (kira[e.tema] || 0) + 1; });
    var h = '';

    h += '<div class="sec">';
    h += '<div class="ctl">' + L.chips('kronTema', Object.keys(kt).map(function (k) {
      return { v: k, l: kt[k].l + ' (' + kira[k] + ')' };
    }), sel) + '</div>';
    h += '<div class="ctl">' + L.seg('kronDari', [
      { v: '1951', l: 'Semua' }, { v: '2014', l: 'Dari 2014' }, { v: '2018', l: 'Dari 2018' }, { v: '2020', l: 'Dari 2020' }
    ], dari) + '</div>';
    h += '<p class="scrollx-hint">Menunjukkan <b>' + view.length + '</b> daripada ' + all.length + ' peristiwa.</p>';

    /* --- densiti peristiwa --- */
    var byYear = {};
    all.forEach(function (e) { var y = String(e.d).slice(0, 4); byYear[y] = (byYear[y] || 0) + 1; });
    var years = [];
    for (var y = 2014; y <= 2022; y++) years.push(String(y));
    h += L.card({
      t: 'Di mana peristiwa berkumpul', badge: L.pv('terbit'),
      sub: 'Bilangan peristiwa yang kami kenal pasti dalam laporan, mengikut tahun (2014–2022).',
      body: L.svgBars({
        w: 700, h: 160, cats: years, labels: true, band: .6,
        yfmt: function (v) { return L.num(v, 0); }, fmt: function (v) { return L.num(v, 0); },
        series: [{ name: 'Peristiwa', data: years.map(function (yy) { return byYear[yy] || 0; }), color: 'var(--accent)' }],
        tip: function (i) { return years[i] + ': ' + (byYear[years[i]] || 0) + ' peristiwa dikenal pasti'; }
      }),
      note: '<b>2018 dan 2019 ialah tahun paling padat</b> — semua keputusan penyelamatan, penubuhan UJSB, ' +
        'laporan polis, teguran audit dan pertukaran pengurusan berlaku dalam tempoh 18 bulan.',
      limit: 'Densiti ini mencerminkan apa yang laporan pilih untuk catat, bukan semua yang berlaku. ' +
        'Tahun-tahun awal (2014–2016) mungkin mempunyai lebih banyak peristiwa yang tidak dicatat kerana ' +
        'fokus laporan pada titik keputusan.'
    });
    h += '</div>';

    h += '<div class="sec"><div class="card"><div class="tlist">';
    var lastYear = null;
    view.forEach(function (e) {
      var yy = String(e.d).slice(0, 4);
      if (yy !== lastYear) {
        h += '<div style="margin:' + (lastYear ? '14px' : '0') + ' 0 8px;font-family:var(--mono);font-size:15px;' +
          'font-weight:800;color:var(--ink);letter-spacing:-.02em">' + yy + '</div>';
        lastYear = yy;
      }
      h += '<div class="tev k-' + e.tema + '">' +
        '<div class="td">' + L.tarikh(e.d) + ' · ' + L.esc(kt[e.tema].l) + '</div>' +
        '<div class="tt">' + L.esc(e.t) + '</div>' +
        '<div class="tb">' + e.b + '</div>' +
        L.src([e.p]) + '</div>';
    });
    h += '</div></div></div>';
    return h;
  }
};

/* ============================ 12. SYOR =================================== */
V.syor = {
  nav: '33 syor', kicker: 'Apa yang disyorkan',
  h1: 'Tiga puluh tiga syor — dan siapa yang perlu melaksanakannya',
  desc: 'Bab Empat laporan. Tapis mengikut tema atau pihak yang bertanggungjawab. ' +
    'PENTING: laporan ini bertarikh 19 Julai 2022 dan hanya mengandungi syor — bukan status pelaksanaan.',
  init: function () {
    if (S.syorTema == null) S.syorTema = [];
    if (S.syorSiapa == null) S.syorSiapa = [];
    if (S.syorKunci == null) S.syorKunci = false;
  },
  render: function () {
    var sy = RD.syor;
    var temas = [], siapas = [];
    sy.forEach(function (s) {
      if (temas.indexOf(s.tema) < 0) temas.push(s.tema);
      s.siapa.forEach(function (w) { if (siapas.indexOf(w) < 0) siapas.push(w); });
    });
    var view = sy.filter(function (s) {
      return (!S.syorTema.length || S.syorTema.indexOf(s.tema) >= 0) &&
        (!S.syorSiapa.length || s.siapa.some(function (w) { return S.syorSiapa.indexOf(w) >= 0; })) &&
        (!S.syorKunci || s.kunci);
    });
    var kiraTema = {}, kiraSiapa = {};
    sy.forEach(function (s) {
      kiraTema[s.tema] = (kiraTema[s.tema] || 0) + 1;
      s.siapa.forEach(function (w) { kiraSiapa[w] = (kiraSiapa[w] || 0) + 1; });
    });
    var h = '';

    h += '<div class="sec">';
    h += L.verdict('warn', 'Nota penting sebelum anda membaca',
      'Dashboard ini <b>tidak</b> menunjukkan status pelaksanaan mana-mana syor — kerana laporan RCI tidak ' +
      'mengandungi maklumat itu dan tidak boleh mengandunginya. Laporan bertarikh 19 Julai 2022. ' +
      'Sebarang dashboard yang menunjukkan "sudah dilaksanakan" atau "belum dilaksanakan" untuk syor-syor ini ' +
      'sedang mencipta data.');
    h += L.tiles([
      { l: 'Jumlah syor', v: String(sy.length), tip: 'Perenggan 4.4.1 hingga 4.4.25, termasuk sub-perenggan 4.4.1(a)–(i).' },
      { l: 'Memerlukan pindaan Akta 535', v: String(kiraTema['Akta 535'] || 0), cls: 'neg',
        tip: 'Sembilan syor memerlukan Parlimen meminda Akta Tabung Haji 1995.' },
      { l: 'Tanggungjawab Kerajaan', v: String(kiraSiapa['Kerajaan'] || 0),
        tip: 'Syor yang memerlukan tindakan Kerajaan / Parlimen.' },
      { l: 'Tanggungjawab LTH sendiri', v: String(kiraSiapa['LTH'] || 0),
        tip: 'Syor yang boleh dilaksanakan LTH tanpa perlu pindaan undang-undang.' }
    ]);
    h += '</div>';

    /* --- taburan --- */
    h += '<div class="sec"><h2>Ke mana syor-syor ini menghala</h2>';
    h += '<div class="grid g2">';
    h += L.card({
      t: 'Mengikut tema', badge: L.pv('terbit'),
      body: L.svgHBars({
        w: 340, labelW: 130, rowH: 26, valW: 34,
        rows: temas.map(function (t) {
          return { k: t, v: kiraTema[t], lab: String(kiraTema[t]),
            color: S.syorTema.indexOf(t) >= 0 ? 'var(--sim)' : 'var(--accent)',
            tip: t + ': ' + kiraTema[t] + ' syor' };
        }).sort(function (a, b) { return b.v - a.v; })
      })
    });
    h += L.card({
      t: 'Mengikut pihak bertanggungjawab', badge: L.pv('terbit'),
      body: L.svgHBars({
        w: 340, labelW: 118, rowH: 26, valW: 34,
        rows: siapas.map(function (w) {
          return { k: w, v: kiraSiapa[w], lab: String(kiraSiapa[w]),
            color: S.syorSiapa.indexOf(w) >= 0 ? 'var(--sim)' : 'var(--neutral)',
            tip: w + ': ' + kiraSiapa[w] + ' syor' };
        }).sort(function (a, b) { return b.v - a.v; })
      }),
      note: 'Jumlah melebihi 33 kerana beberapa syor melibatkan lebih daripada satu pihak.'
    });
    h += '</div></div>';

    /* --- senarai --- */
    h += '<div class="sec"><h2>Semua syor</h2>';
    h += '<div class="ctl">' + L.chips('syorTema', temas.map(function (t) {
      return { v: t, l: t + ' (' + kiraTema[t] + ')' };
    }), S.syorTema) + '</div>';
    h += '<div class="ctl">' + L.chips('syorSiapa', siapas.map(function (w) {
      return { v: w, l: w + ' (' + kiraSiapa[w] + ')' };
    }), S.syorSiapa) + '</div>';
    h += '<div class="ctl"><label class="switch"><input type="checkbox" data-toggle="syorKunci"' +
      (S.syorKunci ? ' checked' : '') + '> Tunjuk hanya syor teras (' +
      sy.filter(function (s) { return s.kunci; }).length + ')</label></div>';
    h += '<p class="scrollx-hint">Menunjukkan <b>' + view.length + '</b> daripada ' + sy.length + ' syor.</p>';
    h += '<div class="recs">';
    view.forEach(function (s) {
      h += '<div class="rec"' + (s.kunci ? ' style="border-left:3px solid var(--accent)"' : '') + '>' +
        '<span class="rid">' + L.esc(s.id) + '</span>' +
        (s.kunci ? ' <span class="etag st-selesai" style="font-size:9px">Syor teras</span>' : '') +
        '<p>' + L.esc(s.t) + '</p>' +
        '<div class="rmeta">' + s.siapa.map(function (w) {
          return '<span class="who">' + L.esc(w) + '</span>';
        }).join('') + '<span>' + L.esc(s.tema) + '</span>' +
        '<a class="src" href="https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md#pdf-page-' +
        s.p + '" target="_blank" rel="noopener">ms ' + s.p + ' ↗</a></div></div>';
    });
    h += '</div></div>';

    /* --- Dana Haji --- */
    var dh = RD.danaHaji;
    h += '<div class="sec"><h2>Syor struktur terbesar: jabatan "Dana Haji"</h2>' +
      '<p class="lead">Bukan memecahkan LTH kepada beberapa syarikat, tetapi mengasingkan fungsi pelaburan ' +
      'sebagai jabatan di dalam LTH dengan lembaga sendiri dan kawal selia Suruhanjaya Sekuriti Malaysia.</p>';
    h += L.card({
      t: 'Struktur yang dicadangkan', badge: L.pv('fakta'),
      body: '<div class="rb two">' +
        '<div style="background:var(--accent-soft)"><strong style="color:var(--accent-ink)">Lembaga Tabung Haji</strong>' +
        '<ul style="margin:4px 0 0;padding-left:18px">' + dh.struktur.lth.map(function (x) {
          return '<li>' + L.esc(x) + '</li>';
        }).join('') + '</ul></div>' +
        '<div style="background:var(--sim-soft)"><strong style="color:var(--sim)">Jabatan Dana Haji</strong>' +
        '<ul style="margin:4px 0 0;padding-left:18px">' + dh.struktur.dana.map(function (x) {
          return '<li>' + L.esc(x) + '</li>';
        }).join('') + '</ul></div></div>' +
        '<div class="cnote" style="margin-top:12px"><b>Panel Pelaburan Dana Haji bertanggungjawab ke atas:</b> ' +
        dh.panelTugas.join(' · ') + '. Pengerusi dan ahli dilantik oleh <b>Menteri Kewangan</b>, bukan Menteri ' +
        'Hal Ehwal Agama.</div>',
      note: '<b>Mengapa dalam entiti yang sama?</b> Suruhanjaya menjelaskan: kerana terdapat unsur ' +
        '<b>subsidi silang</b> — keuntungan pelaburan digunakan untuk menampung kos haji. "Selagi subsidi ' +
        'menjadi amalan, pengasingan antara pembiaya dan pengurus haji akan menimbulkan masalah dalam operasi haji."',
      p: [222, 223, 236]
    });
    h += L.card({
      t: 'Empat cadangan struktur lain yang DITOLAK Suruhanjaya', badge: L.pv('fakta'),
      sub: 'Tiga daripada BNM, satu daripada EY. Sebabnya menerangkan banyak tentang bagaimana Suruhanjaya ' +
        'berfikir tentang LTH.',
      body: dh.ditolak.map(function (d) {
        return '<div style="border:1px solid var(--line);border-left:3px solid var(--bad);border-radius:0 9px 9px 0;' +
          'padding:11px 13px;margin:9px 0;background:var(--card-2)">' +
          '<b style="font-size:13.2px">' + L.esc(d.cad) + '</b>' +
          '<p style="margin:6px 0 0;font-size:12.8px;color:var(--ink-2);line-height:1.5"><b>Ditolak kerana:</b> ' + d.tolak + '</p>' +
          L.src([d.p]) + '</div>';
      }).join(''),
      note: 'Frasa yang paling banyak diulang Suruhanjaya dalam menolak cadangan BNM: memecahkan fungsi ' +
        'pelaburan akan menjadikan LTH sebuah <b>"glorified travel agent"</b> — agen pelancongan yang tersohor — ' +
        'kerana LTH akan hilang kemampuan mengkoordinasi penggunaan keuntungan pelaburan untuk membiayai ' +
        'operasi hajinya.',
      limit: 'Suruhanjaya menolak cadangan-cadangan ini berdasarkan penilaiannya sendiri, bukan berdasarkan ' +
        'kajian kuantitatif yang dibentangkan dalam laporan. Kekuatan hujah "glorified travel agent" ' +
        'adalah pertimbangan dasar, bukan dapatan data.',
      p: [215, 216, 217, 218, 219, 220, 221]
    });
    h += '</div>';
    return h;
  }
};

/* ==================== 13. PERCANGGAHAN & HAD DATA ======================== */
V.integriti = {
  nav: 'Percanggahan data', kicker: 'Integriti data',
  h1: 'Empat belas percanggahan dalam laporan — dan lapan perkara yang laporan tidak boleh beritahu',
  desc: 'Paparan ini menyenaraikan setiap tempat di mana angka dalam laporan tidak berbaki, tidak konsisten, ' +
    'atau kelihatan seperti ralat OCR. Kami memaparkannya kerana analisis yang baik bermula dengan ' +
    'mengetahui had datanya.',
  init: function () { if (S.intJenis == null) S.intJenis = []; },
  render: function () {
    var it = RD.integriti, had = RD.had;
    var jenises = [];
    it.forEach(function (x) { if (jenises.indexOf(x.jenis) < 0) jenises.push(x.jenis); });
    var kira = {};
    it.forEach(function (x) { kira[x.jenis] = (kira[x.jenis] || 0) + 1; });
    var view = S.intJenis.length ? it.filter(function (x) { return S.intJenis.indexOf(x.jenis) >= 0; }) : it;
    var berat = { tinggi: 0, sedang: 0, rendah: 0 };
    it.forEach(function (x) { berat[x.berat]++; });
    var h = '';

    h += '<div class="sec">';
    h += L.verdict('info', 'Mengapa paparan ini ada',
      'Laporan RCI ialah dokumen 249 halaman yang diproses melalui OCR daripada PDF. Ia mengandungi jadual ' +
      'daripada empat firma berbeza (PwC, EY, Roland Berger, JAN) yang menggunakan definisi dan tarikh ' +
      'berbeza. Kami memaparkan setiap percanggahan yang kami temui supaya anda boleh menilai sendiri ' +
      'sejauh mana yakin dengan setiap angka — dan supaya anda tahu bila kami memilih <b>tidak</b> membuat ' +
      'sesuatu carta kerana datanya tidak boleh dipercayai.');
    h += L.tiles([
      { l: 'Percanggahan dikenal pasti', v: String(it.length), tip: 'Termasuk percanggahan angka, jadual yang tidak berbaki, dan ralat OCR.' },
      { l: 'Berat tinggi — menghalang analisis', v: String(berat.tinggi), cls: 'neg',
        tip: 'Percanggahan yang menyebabkan kami TIDAK boleh membuat analisis tertentu.' },
      { l: 'Berat sedang — perlu berhati-hati', v: String(berat.sedang), cls: 'neg',
        tip: 'Percanggahan yang tidak menghalang analisis tetapi perlu dinyatakan.' },
      { l: 'Had data (bukan percanggahan)', v: String(had.length),
        tip: 'Perkara yang laporan sengaja atau tidak sengaja tidak sertakan.' }
    ]);
    h += '</div>';

    h += '<div class="sec"><h2>Daftar percanggahan</h2>';
    h += '<div class="ctl">' + L.chips('intJenis', jenises.map(function (j) {
      return { v: j, l: j + ' (' + kira[j] + ')' };
    }), S.intJenis) + '</div>';
    view.forEach(function (x) {
      h += L.card({
        t: L.esc(x.tajuk),
        badge: '<span class="etag ' + (x.berat === 'tinggi' ? 'st-mahkamah' : x.berat === 'sedang' ? 'st-polis' : 'st-hapus') +
          '">' + (x.berat === 'tinggi' ? 'Berat tinggi' : x.berat === 'sedang' ? 'Berat sedang' : 'Berat rendah') + '</span>',
        sub: '<span class="etag st-hapus" style="font-size:9.5px">' + L.esc(x.jenis) + '</span>',
        body: '<p class="csub" style="margin-top:10px">' + L.esc(x.detail) + '</p>' +
          '<div class="cnote" style="margin-top:10px"><b>Bagaimana kami mengendalikannya:</b> ' + x.kesan + '</div>',
        p: x.p
      });
    });
    h += '</div>';

    h += '<div class="sec"><h2>Apa yang laporan tidak boleh beritahu kita</h2>' +
      '<p class="lead">Ini bukan kesilapan laporan. Ia had semula jadi sebuah laporan siasatan yang ' +
      'ekshibitnya diklasifikasikan rahsia dan yang bertarikh Julai 2022.</p>';
    h += '<div class="grid g2">';
    had.forEach(function (x) {
      h += '<div class="card"><div class="chead"><h3>' + L.esc(x.t) + '</h3></div>' +
        '<p class="csub">' + L.esc(x.d) + '</p></div>';
    });
    h += '</div></div>';

    h += '<div class="sec"><h2>Bagaimana kami membina dashboard ini</h2>';
    h += L.card({
      t: 'Kaedah ekstraksi dan pengesahan',
      body: '<ol style="margin:2px 0 0;padding-left:20px;font-size:13.2px;line-height:1.65;color:var(--ink-2)">' +
        '<li>Teks laporan (249 halaman PDF, versi Markdown OCR) dibaca sepenuhnya, halaman demi halaman.</li>' +
        '<li>Setiap jadual, angka dan nama diekstrak secara manual ke dalam struktur data, dengan nombor ' +
        'halaman PDF disimpan bersama setiap item.</li>' +
        '<li><b>Setiap jumlah dalam jadual disemak semula secara aritmetik.</b> Contohnya: penerima bonus ' +
        'TH Properties 2017 berjumlah tepat RM1,148,400; jadual Komitmen Jaminan 2020 dan 2021 berjumlah tepat ' +
        'RM185,727j dan RM190,437j; hartanah UJSB berjumlah tepat RM2,246,680,947. Setiap kali jumlah tidak ' +
        'berbaki, ia dicatat dalam daftar percanggahan di atas.</li>' +
        '<li>Data terbitan dikira di dalam pelayar anda daripada fakta laporan, dan formulanya sentiasa ' +
        'ditunjukkan dalam nota kad berkenaan.</li>' +
        '<li>Tiada data luar dimasukkan. Tiada nilai dianggar atau diinterpolasi. Apabila laporan tidak ' +
        'memberi sesuatu angka, kami menyatakannya sebagai had — bukan menciptanya.</li></ol>',
      note: 'Semua kiraan dilakukan dalam JavaScript di pelayar. Tiada pelayan, tiada pangkalan data, ' +
        'tiada penjejakan pengguna.'
    });
    h += '</div>';
    return h;
  }
};

/* =========================== 14. SUMBER ================================== */
V.sumber = {
  nav: 'Sumber & kaedah', kicker: 'Rujukan',
  h1: 'Sumber, metodologi RCI, dan glosari penuh',
  desc: 'Segala-galanya dalam dashboard ini berasal daripada satu dokumen. Di sini kami tunjukkan ' +
    'apa dokumen itu, bagaimana ia dihasilkan, dan apa maksud setiap istilah teknikal yang digunakan.',
  init: function () { if (S.sumTab == null) S.sumTab = 'rci'; },
  render: function () {
    var r = RD.rci;
    var h = '';

    h += '<div class="sec">';
    h += L.card({
      t: 'Dokumen sumber', badge: L.pv('fakta'),
      body: '<p class="csub"><b>Laporan Suruhanjaya Siasatan Diraja bagi Menyiasat Isu Pengurusan dan Operasi ' +
        'Lembaga Tabung Haji dari Tahun 2014 hingga 2020.</b></p>' +
        '<p class="csub">Dipersembahkan kepada Kebawah Duli Yang Maha Mulia Seri Paduka Baginda Yang di-Pertuan ' +
        'Agong pada <b>30 Ogos 2022</b>. Ditandatangani oleh Pesuruhjaya-Pesuruhjaya pada <b>19 Julai 2022</b>. ' +
        '249 halaman PDF.</p>' +
        '<p class="csub">Dashboard ini menggunakan versi Markdown yang dihasilkan melalui OCR daripada PDF asal, ' +
        'diterbitkan di repositori awam <code>SyahmiRafsan/rci-tabunghaji</code>.</p>' +
        '<div style="margin-top:12px"><a class="go" href="https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md" ' +
        'target="_blank" rel="noopener">Buka laporan penuh di GitHub ↗</a></div>'
    });
    h += '</div>';

    h += '<div class="sec"><div class="ctl">' + L.seg('sumTab', [
      { v: 'rci', l: 'Metodologi RCI' },
      { v: 'ekshibit', l: 'Ekshibit (rahsia)' },
      { v: 'glosari', l: 'Glosari' }
    ], S.sumTab) + '</div>';

    if (S.sumTab === 'rci') {
      h += L.card({
        t: 'Objektif dan skop siasatan', badge: L.pv('fakta'),
        sub: r.objektif,
        body: '<ol style="margin:6px 0 0;padding-left:20px;font-size:13.2px;line-height:1.6;color:var(--ink-2)">' +
          r.skop.map(function (x) { return '<li style="margin-bottom:6px">' + L.esc(x) + '</li>'; }).join('') + '</ol>',
        note: '<b>Perhatikan pengecualian penting dalam skop:</b> siasatan <b>tidak termasuk</b> pelan ' +
          'penstrukturan dan pemulihan yang sedang dijalankan. Namun Suruhanjaya tetap membincangkan UJSB ' +
          'secara terperinci — kerana ia tidak dapat dielakkan dalam memahami krisis 2017.',
        p: [42]
      });
      h += L.card({
        t: 'Enam Pesuruhjaya', badge: L.pv('fakta'),
        body: '<div class="ecards">' + r.pesuruhjaya.map(function (p) {
          return '<div style="border:1px solid var(--line);border-radius:9px;padding:11px 12px;background:var(--card-2)">' +
            '<b style="font-size:13.5px">' + L.esc(p.n) + '</b>' +
            '<div style="font-size:12px;color:var(--ink-3);margin-top:3px">' + L.esc(p.j) + '</div></div>';
        }).join('') + '</div>',
        note: '<b>Setiausaha:</b> ' + L.esc(r.setiausaha) + '. <b>Tempoh:</b> ' + r.tempoh + '. ' +
          '<b>Kuorum:</b> ' + r.kuorum + ' Pesuruhjaya.',
        p: [42, 43]
      });
      h += L.card({
        t: 'Empat pendekatan siasatan', badge: L.pv('fakta'),
        body: L.tiles([
          { l: 'Saksi yang membuat Akuan Berkanun Saksi', v: String(r.saksiAbs),
            tip: '45 orang saksi dikenal pasti dan memberi keterangan bertulis di bawah Akta Akuan Berkanun 1960.' },
          { l: 'Saksi dipanggil memberi keterangan lisan', v: String(r.saksiProsiding),
            d: L.pct(r.saksiProsiding / r.saksiAbs * 100, 0) + ' daripada 45 (terbitan)',
            tip: '16 saksi dipanggil memberi keterangan dalam prosiding tertutup, 9 Mei – 27 Jun 2022.' },
          { l: 'Agensi diberi taklimat', v: String(r.agensi),
            tip: r.agensiSenarai.map(function (a) { return a.n; }).join(', ') },
          { l: 'Prosiding', v: 'Tertutup', cls: 'neg',
            d: 'Rahsia di bawah Akta 119 dan Akta Rahsia Rasmi 1972',
            tip: 'Semua peringkat prosiding adalah rahsia. Tiada transkrip awam. Prosiding dijalankan di ' +
              'Bilik Mesyuarat Kompleks Islam Putrajaya.' }
        ]),
        note: '<b>Empat metodologi:</b> ' + r.metodologi.join(' · ') + '.',
        p: [44, 46, 47, 48]
      });
      h += L.card({
        t: 'Lapan agensi dan tarikh mereka dipanggil', badge: L.pv('fakta'),
        body: L.table({
          cols: [{ l: 'Agensi' }, { l: 'Tarikh taklimat' }],
          rows: r.agensiSenarai.map(function (a) { return { c: ['<b>' + L.esc(a.n) + '</b>', L.esc(a.t)] }; })
        }),
        p: [46]
      });
    }

    if (S.sumTab === 'ekshibit') {
      h += L.verdict('fail', 'Semua ekshibit diklasifikasikan RAHSIA',
        'Dua belas jilid ekshibit — termasuk semua Akuan Berkanun Saksi, Nota Keterangan Saksi, laporan penuh ' +
        'PwC, EY, Roland Berger dan Jabatan Audit Negara, surat-surat BNM dan MOF, serta kesemua perjanjian UJSB — ' +
        'diklasifikasikan rahsia dan tidak tersedia kepada umum. Apa yang kita boleh baca hanyalah petikan ' +
        'yang Suruhanjaya pilih untuk masukkan dalam laporan utama.');
      h += L.card({
        t: 'Dua belas jilid ekshibit', badge: L.pv('fakta'),
        body: r.ekshibit.map(function (e) {
          return '<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--line-2)">' +
            '<b style="font-family:var(--mono);font-size:12px;color:var(--accent-ink);min-width:74px">' + L.esc(e.j) + '</b>' +
            '<span style="font-size:13px;color:var(--ink-2);line-height:1.5">' + L.esc(e.d) + '</span></div>';
        }).join(''),
        note: '<b>Apa maksudnya untuk analisis:</b> kita tidak boleh menyemak silang dapatan Suruhanjaya ' +
          'dengan data asal. Kalau Suruhanjaya memetik satu angka daripada laporan PwC, kita tidak boleh ' +
          'melihat konteks penuh angka itu. Ini had asas yang tidak dapat diatasi oleh mana-mana dashboard.',
        p: [239, 243, 244, 245, 246, 247, 248, 249]
      });
      h += L.card({
        t: 'Dokumen kunci yang disebut tetapi tidak boleh dibaca', badge: L.pv('fakta'),
        body: L.table({
          cols: [{ l: 'Dokumen' }, { l: 'Mengapa ia penting' }],
          rows: [
            { c: ['<b>PwC — Financial Position Review of LTH (31 Dis 2017 & 30 Jun 2018)</b>',
              'Sumber semua jadual aset vs liabiliti 2013–2017 dan kiraan kerugian terlaras RM1.4 bilion.'] },
            { c: ['<b>Roland Berger — Strategic Plan Review (2017 & 2018)</b>',
              'Mengesan model perniagaan berisiko dan menganggarkan kerugian RM2.6 bilion — sebelum krisis meletus.'] },
            { c: ['<b>EY — Reserving Options and RAV Reporting Framework (30 Jun 2016)</b>',
              'Dokumen asal yang memperkenalkan rangka kerja RAV yang menjadi asas bayaran hibah 2015–2017.'] },
            { c: ['<b>EY — Factual Assessment on The Disposal of PT TH Indo Plantations (18 Sep 2019)</b>',
              'Lapan jilid mengenai penjualan THIP — kes yang mempunyai laporan polis dan tuntutan mahkamah.'] },
            { c: ['<b>JAN — Pemerhatian Audit Penyata Kewangan LTH 2017</b>',
              'Dokumen audit asal yang mengandungi penemuan material yang kemudiannya dilembutkan.'] },
            { c: ['<b>Enam surat BNM (2014–2022)</b>',
              'Kandungan penuh amaran BNM kepada LTH, Menteri, dan Perdana Menteri.'] },
            { c: ['<b>Perjanjian Sukuk RM27.56 bilion dan Perjanjian Hak Penolakan Pertama</b>',
              'Terma penuh instrumen yang kini mewakili 31% aset LTH.'] }
          ]
        }),
        p: [243, 244, 245, 246, 247, 248, 249]
      });
    }

    if (S.sumTab === 'glosari') {
      var keys = Object.keys(RD.glosari).sort(function (a, b) { return a.localeCompare(b, 'ms'); });
      h += L.card({
        t: 'Glosari: ' + keys.length + ' istilah dalam bahasa mudah',
        sub: 'Setiap istilah teknikal dalam laporan yang kami gunakan, diterangkan tanpa mengubah maksud sebenarnya.',
        body: '<div style="margin-top:6px">' + keys.map(function (k) {
          return '<div style="padding:11px 0;border-bottom:1px solid var(--line-2)">' +
            '<b style="font-size:14px">' + L.esc(k) + '</b>' +
            '<p style="margin:4px 0 0;font-size:13px;color:var(--ink-2);line-height:1.55">' + L.esc(RD.glosari[k]) + '</p></div>';
        }).join('') + '</div>'
      });
    }
    h += '</div>';

    h += '<div class="sec"><h2>Nota tentang bahasa</h2>';
    h += L.card({
      t: 'Mengapa kami menulis begini',
      body: '<p class="csub">Laporan asal ditulis dalam gaya laporan kerajaan: ayat panjang, istilah kewangan ' +
        'teknikal, dan struktur perundangan. Dashboard ini cuba mengekalkan <b>ketepatan penuh</b> sambil ' +
        'menukar cara penyampaian.</p>' +
        '<p class="csub"><b>Yang kami tukar:</b> ayat panjang jadi ayat pendek; istilah teknikal diterangkan ' +
        'bila pertama kali digunakan; nilai kewangan ditulis "RM4.09 bilion" bukan "(4,093)"; kesimpulan ' +
        'dinyatakan terus.</p>' +
        '<p class="csub"><b>Yang kami TIDAK tukar:</b> mana-mana angka; mana-mana dapatan Suruhanjaya; ' +
        'mana-mana petikan (semua petikan dalam tanda petikan adalah kata-kata asal laporan); dan syarat-syarat ' +
        'serta had setiap dapatan.</p>' +
        '<p class="csub"><b>Yang kami tambah:</b> kiraan terbitan (sentiasa dilabel), nota "apa yang tidak boleh ' +
        'disimpulkan" pada setiap analisis, dan daftar percanggahan dalam laporan.</p>',
      note: 'Kalau anda mendapati mana-mana tempat di mana kami memudahkan bahasa sehingga mengubah maksud, ' +
        'rujuk pautan <span class="src">ms 000 ↗</span> pada kad berkenaan dan bandingkan dengan teks asal. ' +
        'Setiap kad mempunyai pautan itu.'
    });
    h += '</div>';
    return h;
  }
};
