/* ==========================================================================
   views-3.js — Kos haji & subsidi (HAFIS) · Tadbir urus & orang · Bonus
   ========================================================================== */
var V = (window.V = window.V || {});
var S = (window.S = window.S || {});

/* ================== 7. KOS HAJI & SUBSIDI (HAFIS) ======================== */
V.hafis = {
  nav: 'Kos haji & subsidi', kicker: 'Masalah struktur',
  h1: 'Bayaran haji dibeku 13 tahun. Kosnya tidak.',
  desc: 'Masalah paling asas dalam laporan ini tiada kaitan dengan perakaunan kreatif. Ia matematik mudah: ' +
    'kos haji naik setiap tahun, bayaran jemaah tidak naik, dan bezanya ditanggung daripada keuntungan pelaburan pendeposit.',
  init: function () {
    if (S.hafisBayar == null) S.hafisBayar = 12980;
    if (S.hafisView == null) S.hafisView = 'sejarah';
  },
  live: {
    hafisBayar: function (val) {
      var sim = L.derive.simHafis(+val), r30 = sim[sim.length - 1], r22 = sim[0];
      var base = RD.hafis.unjuran.rows;
      var el = function (id) { return document.getElementById(id); };
      if (el('hafisBayarVal')) el('hafisBayarVal').textContent = 'RM' + L.num(+val);
      if (el('simHafis22')) el('simHafis22').innerHTML = L.rm(r22.hafis);
      if (el('simPct22')) el('simPct22').innerHTML = L.pct(r22.pct);
      if (el('simHafis30')) el('simHafis30').innerHTML = L.rm(r30.hafis);
      if (el('simPct30')) el('simPct30').innerHTML = L.pct(r30.pct);
      if (el('simJum30')) el('simJum30').innerHTML = 'RM' + L.num(r30.jumlahRibu / 1000, 0) + 'j';
      if (el('simJimat')) {
        var jimat = (base[base.length - 1].jumlahRibu - r30.jumlahRibu) / 1000;
        el('simJimat').innerHTML = Math.abs(jimat) < 0.5
          ? 'sama dengan unjuran laporan'
          : (jimat > 0 ? '−' : '+') + 'RM' + L.num(Math.abs(jimat), 0) + 'j';
        el('simJimat').style.color = jimat > 0 ? 'var(--good)' : jimat < 0 ? 'var(--bad)' : 'var(--ink-3)';
      }
      if (el('simChart')) {
        el('simChart').innerHTML = V.hafis.simChart(+val);
      }
    }
  },
  simChart: function (bayar) {
    var sim = L.derive.simHafis(bayar), base = RD.hafis.unjuran.rows;
    return L.svgComboBarLine({
      w: 640, h: 250, cats: sim.map(function (r) { return String(r.y); }),
      yfmt: function (v) { return 'RM' + L.num(v / 1000, 0) + 'k'; },
      y2fmt: function (v) { return L.num(v, 0) + '%'; }, max2: 80,
      bars: [
        { name: 'Bayaran jemaah', data: sim.map(function (r) { return r.bayaran; }), color: 'var(--accent)' },
        { name: 'Subsidi LTH (HAFIS)', data: sim.map(function (r) { return r.hafis; }), color: 'var(--sim)' }
      ],
      lines: [
        { name: 'Subsidi sebagai % kos haji', data: sim.map(function (r) { return r.pct; }), color: 'var(--bad)' },
        { name: 'Unjuran laporan (bayaran RM12,980)', data: base.map(function (r) { return r.pct; }),
          color: 'var(--warn)', dash: true }
      ],
      tip: function (i) {
        var r = sim[i], b = base[i];
        return r.y + ' · Kos haji ' + L.rm(r.kos) + ' · bayaran ' + L.rm(r.bayaran) +
          ' · subsidi ' + L.rm(r.hafis) + ' (' + L.pct(r.pct) + ') · jumlah beban LTH ~RM' +
          L.num(r.jumlahRibu / 1000, 0) + ' juta [unjuran laporan: ' + L.pct(b.pct) + ']';
      }
    }, 640);
  },
  render: function () {
    var hf = RD.hafis, sej = hf.sejarah, unj = hf.unjuran.rows;
    var cagr = L.derive.hafisCagr();
    var h = '';

    /* --- angka pembuka --- */
    h += '<div class="sec">';
    h += L.tiles([
      { l: 'Bayaran haji dibekukan pada', v: 'RM9,980', d: hf.bekuBayaran.tahun + ' tahun (2009–2021)', cls: 'neg',
        tip: 'Kerajaan membekukan kenaikan bayaran haji Muassasah pada 2009. Suruhanjaya: keputusan ini ' +
          '"memberikan had yang tidak munasabah".' },
      { l: 'Kos haji sebenar 2014', v: 'RM16,155', tip: 'Kos haji bagi setiap jemaah pada 2014.' },
      { l: 'Kos haji sebenar 2022', v: 'RM25,540', cls: 'neg',
        d: 'Naik ' + L.pct((25540 / 16155 - 1) * 100, 0) + ' dalam 8 tahun (terbitan)',
        tip: 'Kos haji 2022 seperti dalam jadual unjuran laporan.' },
      { l: 'Kadar kenaikan kos haji setahun 2014–2019', v: L.pct(cagr.kos), cls: 'neg', d: 'Data terbitan (CAGR)',
        tip: 'Kadar pertumbuhan tahunan kompaun: (RM22,900 ÷ RM16,155)^(1/5) − 1 = ' + L.pct(cagr.kos) +
          ' setahun. Kadar kenaikan subsidi lebih pantas: ' + L.pct(cagr.hafis) + ' setahun.' }
    ]);
    h += L.src([204, 205, 211], 'Sumber');
    h += '</div>';

    /* --- sejarah --- */
    h += '<div class="sec"><h2>Enam tahun sejarah: garis merah bergerak ke atas</h2>' +
      '<p class="lead">Bar biru = apa yang jemaah bayar. Bar ungu = apa yang LTH tampung. ' +
      'Garis merah = berapa peratus kos haji yang datang daripada keuntungan pelaburan pendeposit.</p>';
    h += L.card({
      t: 'Kos haji, bayaran jemaah dan subsidi HAFIS, 2014–2019', badge: L.pv('fakta'),
      sub: 'Nilai seorang jemaah. Tiada penghantaran jemaah haji pada 2020 dan 2021 kerana pandemik Covid-19.',
      body: L.svgComboBarLine({
        w: 620, h: 260, cats: sej.map(function (r) { return String(r.y); }),
        yfmt: function (v) { return 'RM' + L.num(v / 1000, 0) + 'k'; },
        y2fmt: function (v) { return L.num(v, 0) + '%'; }, max2: 60,
        bars: [
          { name: 'Bayaran jemaah', data: sej.map(function (r) { return r.bayaran; }), color: 'var(--accent)' },
          { name: 'Subsidi LTH (HAFIS)', data: sej.map(function (r) { return r.hafis; }), color: 'var(--sim)' }
        ],
        lines: [{ name: 'Subsidi sebagai % kos haji', data: sej.map(function (r) { return r.hafis / r.kos * 100; }),
          color: 'var(--bad)' }],
        tip: function (i) {
          var r = sej[i];
          return r.y + ' · Kos haji ' + L.rm(r.kos) + ' seorang · bayaran jemaah ' + L.rm(r.bayaran) +
            ' · subsidi ' + L.rm(r.hafis) + ' (' + L.pct(r.hafis / r.kos * 100) +
            ') · jumlah beban LTH ' + L.rmj(r.jumlahJuta);
        },
        ann: [{ i: 4, t: 'Subsidi lepasi 50%', right: false }]
      }, 620) + L.legend([
        { c: 'var(--accent)', l: 'Bayaran jemaah (RM9,980 sepanjang tempoh)' },
        { c: 'var(--sim)', l: 'Subsidi LTH seorang' },
        { c: 'var(--bad)', l: 'Subsidi sebagai % kos haji', line: true }
      ]),
      note: '<b>Titik peralihan 2018:</b> untuk kali pertama, LTH menampung <b>lebih separuh</b> kos haji ' +
        '(56%). Jumlah beban tahunan naik dari ' + L.rmj(106) + ' (2014) ke ' + L.rmj(314) + ' (2018) — ' +
        'hampir tiga kali dalam empat tahun.',
      limit: 'Jumlah beban tahunan (RM106j–RM314j) <b>tidak berbaki</b> dengan (subsidi seorang × bilangan jemaah) ' +
        'kerana laporan tidak memberi bilangan jemaah setiap tahun. Contohnya 2017: RM298 juta ÷ RM9,570 = ' +
        '31,140 jemaah, tetapi 2016: RM160 juta ÷ RM8,910 = 17,957 jemaah. Kami tidak boleh menerbitkan ' +
        'bilangan jemaah dengan yakin.',
      p: [204]
    });
    h += '</div>';

    /* --- simulator --- */
    h += '<div class="sec"><h2>Simulator: berapa bayaran haji perlu jadi?</h2>' +
      '<p class="lead">Gerakkan slider. Kos haji dalam simulasi ini ialah <b>unjuran LTH sendiri</b> untuk ' +
      '2022–2030 (bukan kami cipta). Yang berubah hanyalah bayaran jemaah — dan kami mengira semula bezanya.</p>';
    var sim0 = L.derive.simHafis(+S.hafisBayar), r22 = sim0[0], r30 = sim0[sim0.length - 1];
    var jimat0 = (unj[unj.length - 1].jumlahRibu - r30.jumlahRibu) / 1000;
    var jimatTxt = Math.abs(jimat0) < 0.5 ? 'sama dengan unjuran laporan'
      : (jimat0 > 0 ? '−' : '+') + 'RM' + L.num(Math.abs(jimat0), 0) + 'j';
    h += '<div class="card">' +
      L.range({ id: 'hafisBayar', l: 'Bayaran haji seorang jemaah', min: 9980, max: 37729, step: 500,
        value: S.hafisBayar, valText: 'RM' + L.num(+S.hafisBayar) }) +
      '<div class="stepbtns" data-chips="hafisPreset" style="margin-top:4px">' +
      [{ v: 9980, l: 'RM9,980 — kadar beku 2009–2021' },
        { v: 10980, l: 'RM10,980 — kadar B40 2022' },
        { v: 12980, l: 'RM12,980 — kadar bukan B40 2022' },
        { v: 25540, l: 'RM25,540 — kos penuh 2022' }].map(function (o) {
        return '<button type="button" data-v="' + o.v + '" aria-pressed="' + (String(o.v) === String(S.hafisBayar)) + '">' +
          L.esc(o.l) + '</button>';
      }).join('') + '</div>' +
      '<div class="tiles t3" style="margin-top:12px">' +
      L.tile({ l: 'Subsidi seorang, 2022', v: '<span id="simHafis22">' + L.rm(r22.hafis) + '</span>', cls: 'sim',
        d: 'iaitu <span id="simPct22">' + L.pct(r22.pct) + '</span> daripada kos haji' }) +
      L.tile({ l: 'Subsidi seorang, 2030', v: '<span id="simHafis30">' + L.rm(r30.hafis) + '</span>', cls: 'sim',
        d: 'iaitu <span id="simPct30">' + L.pct(r30.pct) + '</span> daripada kos haji' }) +
      L.tile({ l: 'Beban LTH 2030 (andaian 30,000 jemaah)', v: '<span id="simJum30">RM' + L.num(r30.jumlahRibu / 1000, 0) + 'j</span>',
        cls: 'sim', d: 'Beza dari unjuran laporan: <b id="simJimat" style="color:' +
          (jimat0 > 0 ? 'var(--good)' : jimat0 < 0 ? 'var(--bad)' : 'var(--ink-3)') + '">' + jimatTxt + '</b>' }) +
      '</div>' +
      '<div class="cnote" style="margin-top:12px"><b>Cara simulasi ini dikira:</b> subsidi seorang = kos haji ' +
      'unjuran laporan − bayaran yang anda pilih. Jumlah beban = subsidi seorang × 30,000 jemaah. ' +
      'Angka 30,000 bukan kami pilih sendiri: ia tersirat dalam jadual unjuran laporan (RM742,470 ribu ÷ ' +
      'RM24,749 = tepat 30,000), dan sepadan dengan kuota haji Malaysia sebelum pandemik.</div>' +
      '<div class="cnote limit"><b>Apa yang tidak boleh disimpulkan:</b> simulasi ini menganggap kos haji ' +
      'kekal seperti unjuran laporan walaupun bayaran berubah, dan menganggap kuota tetap 30,000. ' +
      'Dalam realiti, kenaikan bayaran boleh mengurangkan bilangan pendaftar, dan Kerajaan Arab Saudi ' +
      'merancang menaikkan kuota Malaysia ke 60,000 menjelang 2030 — yang akan <b>menggandakan</b> beban. ' +
      'Ini <b>bukan</b> unjuran RCI.</div>' +
      L.src([203, 205, 210], 'Sumber kos haji dan kuota') +
      '</div>';
    h += L.card({
      t: 'Unjuran subsidi 2022–2030 pada bayaran yang anda pilih', badge: L.pvs('unjur', 'sim'),
      sub: 'Garis merah = simulasi anda. Garis kuning putus-putus = unjuran asal laporan pada bayaran RM12,980.',
      body: '<div id="simChart">' + V.hafis.simChart(+S.hafisBayar) + '</div>' +
        L.legend([{ c: 'var(--accent)', l: 'Bayaran jemaah' }, { c: 'var(--sim)', l: 'Subsidi LTH' },
          { c: 'var(--bad)', l: 'Simulasi anda: subsidi % kos', line: true },
          { c: 'var(--warn)', l: 'Unjuran laporan (RM12,980)', line: true }]),
      note: '<b>Kesimpulan matematik yang tidak dapat dielak:</b> selagi bayaran haji ditetapkan pada satu ' +
        'nilai tetap sementara kos haji naik ~7% setahun, peratusan subsidi <b>mesti</b> naik setiap tahun. ' +
        'Untuk menstabilkan peratusan subsidi, bayaran haji perlu naik pada kadar yang sama dengan kos haji.',
      p: [205]
    });
    h += '</div>';

    /* --- unjuran laporan --- */
    h += '<div class="sec"><h2>Unjuran laporan sendiri: subsidi mencecah 65.6% pada 2030</h2>';
    h += L.card({
      t: 'Kos haji, bayaran dan HAFIS, 2022–2030', badge: L.pv('unjur'),
      sub: 'Ini unjuran yang dikemukakan LTH dan dipetik Suruhanjaya. Ia menganggap bayaran haji ' +
        'kekal pada RM12,980 sepanjang tempoh.',
      body: L.table({
        cols: [{ l: 'Tahun' }, { l: 'Kos haji', n: 1 }, { l: 'Bayaran', n: 1 }, { l: 'HAFIS', n: 1 },
          { l: '% kos', n: 1 }, { l: 'Beban LTH', n: 1 }],
        rows: unj.map(function (r) {
          return { c: ['<b>' + r.y + '</b>', { v: L.rm(r.kos), n: 1 }, { v: L.rm(r.bayaran), n: 1 },
            { v: L.rm(r.hafis), n: 1, cls: 'neg' },
            { v: '<span class="bic"><i style="width:' + (r.pct / 70 * 100).toFixed(0) + '%;background:var(--bad)"></i>' +
              '<span>' + L.pct(r.pct) + '</span></span>', n: 1 },
            { v: 'RM' + L.num(r.jumlahRibu / 1000, 1) + 'j', n: 1, cls: 'neg' }] };
        })
      }),
      note: '<b>Perhatikan:</b> beban tahunan naik daripada ' + L.rmj(376.8) + ' (2022) ke ' + L.rmj(742.47) +
        ' (2030) — hampir <b>dua kali</b>. Suruhanjaya menyatakan HAFIS RM400 juta setahun bersamaan dengan ' +
        '<b>pengurangan 0.4%</b> daripada kadar hibah yang dibayar kepada pendeposit. Pada RM742 juta, ' +
        'kesannya lebih daripada 0.7 mata peratus.',
      limit: 'Unjuran ini menganggap kuota tetap 30,000 jemaah setahun. Laporan sendiri menyatakan Kerajaan ' +
        'Arab Saudi merancang menaikkan kuota Malaysia kepada <b>60,000 menjelang 2030</b>. Jika itu berlaku ' +
        'dan bayaran kekal, beban 2030 boleh menjadi dua kali angka dalam jadual ini. Laporan tidak membuat ' +
        'unjuran untuk senario itu.',
      p: [205, 210]
    });
    h += '</div>';

    /* --- masa menunggu --- */
    h += '<div class="sec"><h2>Kesan sebenar deposit minimum RM1,300</h2>';
    h += '<div class="grid g2">';
    h += L.card({
      t: 'Tempoh menunggu giliran haji', badge: L.pvs('fakta', 'terbit'),
      body: L.svgHBars({
        w: 340, labelW: 132, rowH: 42, valW: 66, max: 140,
        rows: [
          { k: 'Sekarang (deposit min RM1,300)', v: hf.masaMenunggu.sekarang, lab: hf.masaMenunggu.sekarang + ' tahun',
            color: 'var(--bad)', tip: 'Perenggan 3.16.17 menyebut 135 tahun. Ringkasan Eksekutif menyebut 130 tahun. ' +
              'Suruhanjaya: tempoh ini "di luar jangka hayat kehidupan rakyat Malaysia".' },
          { k: 'Jika min RM12,980', v: hf.masaMenunggu.cadangan, lab: hf.masaMenunggu.cadangan + ' tahun',
            color: 'var(--good)', tip: 'Cadangan Suruhanjaya: naikkan deposit minimum untuk pendaftaran giliran haji ' +
              'daripada RM1,300 kepada bayaran haji semasa RM12,980.' }
        ],
        axisLabel: 'Tahun menunggu'
      }),
      note: 'Kenapa? Deposit minimum RM1,300 membolehkan hampir sesiapa mendaftar giliran, ' +
        'menjadikan barisan sangat panjang. Menaikkan minimum kepada bayaran haji sebenar akan ' +
        '(a) menambah deposit LTH, dan (b) memendekkan barisan kepada mereka yang benar-benar bersedia.',
      limit: 'Laporan memberi dua angka berbeza untuk tempoh menunggu semasa: 135 tahun (perenggan 3.16.17) ' +
        'dan 130 tahun (Ringkasan Eksekutif dan perenggan 4.4.22). Angka 33 tahun konsisten.',
      p: [208, 209, 236]
    });
    h += L.card({
      t: 'Matematik pendaftaran haji hari ini', badge: L.pv('fakta'),
      body: '<div class="tlist">' + [
        { d: 'Langkah 1', t: 'Simpan RM1,300', b: 'Ini sahaja cukup untuk mendaftar giliran haji secara automatik.' },
        { d: 'Langkah 2', t: 'Jika terpilih, tambah RM11,680', b: 'Untuk mencukupkan bayaran haji RM12,980.' },
        { d: 'Langkah 3', t: 'Dapat pakej bernilai ~RM25,000', b: 'Anggaran kos sebenar yang ditanggung LTH. ' +
          'Bermakna jemaah menerima <b>RM12,020</b> lebih daripada apa yang dibayarnya.' }
      ].map(function (e) {
        return '<div class="tev k-hafis"><div class="td">' + e.d + '</div><div class="tt">' + e.t +
          '</div><div class="tb">' + e.b + '</div></div>';
      }).join('') + '</div>',
      note: 'Suruhanjaya: "Dalam tempoh yang singkat sahaja, sebenarnya pendeposit hanya menyumbang jumlah ' +
        'kecil subsidi tetapi mendapat pulangan yang besar." Sebab itu syor 4.4.20(c) mengatakan bantuan haji ' +
        'hanya diberi kepada jemaah yang <b>memerlukan</b> — selaras dengan prinsip ' + L.g('istito’ah') + '.',
      p: [208, 236]
    });
    h += '</div></div>';

    /* --- konteks --- */
    h += '<div class="sec"><h2>Konteks penting: siapa sebenarnya yang membayar subsidi?</h2>';
    h += L.verdict('info', 'Bukan Kerajaan. Pendeposit.',
      'HAFIS diambil daripada <b>keuntungan pelaburan LTH</b> — iaitu keuntungan yang sepatutnya boleh ' +
      'diagihkan kepada 8.6 juta pendeposit sebagai hibah. Suruhanjaya menyatakan ini dengan jelas: subsidi ' +
      '"diambil daripada keuntungan yang boleh diagihkan kepada pendeposit, bukannya suntikan dana daripada ' +
      'Kerajaan". Jadi setiap ringgit subsidi haji adalah ringgit yang tidak sampai kepada pendeposit lain.');
    h += L.tiles([
      { l: 'Jumlah HAFIS sejak 2001', v: 'RM' + hf.totalSejak2001.nilai / 1000 + '', u: 'bilion',
        tip: 'RM2.02 bilion subsidi diberi kepada jemaah Muassasah sejak 2001 (ms 229).' },
      { l: 'Dana minima diperlukan untuk menampung subsidi', v: 'RM60', u: 'bilion',
        tip: 'LTH memerlukan dana minima RM60 bilion untuk menampung subsidi haji pada tahap sekarang (ms 111).' },
      { l: 'Kesan subsidi RM400 juta kepada kadar hibah', v: '−0.4', u: 'mata %', cls: 'neg',
        tip: 'Subsidi RM400 juta setahun bersamaan pengurangan 0.4% daripada kadar hibah kepada pendeposit (ms 110, 206).' },
      { l: 'Kuota haji Malaysia', v: '30,000 → 60,000', d: 'Perancangan Arab Saudi menjelang 2030',
        tip: 'Kuota semasa (sebelum pandemik) sekitar 30,000 jemaah; dirancang naik ke 60,000 menjelang 2030 (ms 210).' }
    ]);
    h += L.src([110, 111, 206, 210, 229, 207], 'Sumber');
    h += '</div>';

    h += '<div class="sec">' + L.readBlocks(
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Peningkatan HAFIS adalah matematik, bukan salah laku. Ia akibat langsung keputusan dasar 2009 ' +
      'membekukan bayaran haji sementara kos naik.</li>' +
      '<li>Suruhanjaya menyifatkan keputusan beku itu sebagai memberi "had yang tidak munasabah" dan ' +
      'menyebabkan LTH terpaksa mengambil risiko pelaburan lebih tinggi untuk menjana pulangan tinggi.</li>' +
      '<li>Kenaikan bayaran 2022 kepada dua lapisan (RM10,980 B40 / RM12,980 bukan B40) adalah langkah yang ' +
      'Suruhanjaya nilai sebagai <b>wajar</b> — tetapi masih tidak mencukupi.</li></ul>',
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Kita <b>tidak boleh</b> mengira bilangan jemaah setiap tahun daripada data laporan — jumlah beban ' +
      'tidak berbaki dengan subsidi seorang.</li>' +
      '<li>Kita <b>tidak boleh</b> menganggap unjuran kos haji 2022–2030 akan berlaku. Ia unjuran LTH pada 2022, ' +
      'sebelum inflasi global dan perubahan dasar Arab Saudi yang berlaku selepas itu.</li>' +
      '<li>Simulasi di atas <b>bukan</b> ramalan RCI. Ia alat untuk memahami hubungan matematik, bukan nubuatan.</li></ul>'
    ) + '</div>';
    return h;
  }
};

/* =================== 8. TADBIR URUS & ORANG ============================== */
V.tadbir = {
  nav: 'Tadbir urus', kicker: 'Struktur & orang',
  h1: 'Satu Menteri, kuasa mutlak, dan tiada kriteria kelayakan',
  desc: 'Sebelum 1995, undang-undang mewajibkan LTH mengambil kira nasihat Panel Pelaburan. Akta 535 ' +
    'menghapuskan kewajipan itu — dan memberi Menteri kuasa ke atas segala-galanya dari haji hingga pelaburan.',
  init: function () { if (S.tadbirTab == null) S.tadbirTab = 'orang'; },
  render: function () {
    var h = '';
    var jw = RD.jawatan, km = RD.kuasaMenteri, as = RD.anakSyarikat;

    /* --- masalah asas --- */
    h += '<div class="sec">';
    h += L.card({
      t: 'Satu-satunya kriteria untuk menjadi anggota Lembaga Tabung Haji', badge: L.pv('fakta'),
      body: '<blockquote style="margin:6px 0;padding:12px 14px;background:var(--card-2);border-left:3px solid var(--bad);' +
        'border-radius:0 9px 9px 0;font-size:14.5px;line-height:1.5;font-style:italic">' +
        '"Tiada seorang pun boleh dilantik menjadi anggota Lembaga melainkan jika dia seorang Muslim dan ' +
        'warganegara Malaysia."<br><span style="font-style:normal;font-size:12px;color:var(--ink-3);font-weight:700">' +
        '— Seksyen 6(2), Akta Tabung Haji 1995</span></blockquote>' +
        '<p class="csub">Itu sahaja. Tiada keperluan pengalaman kewangan, perakaunan, perniagaan atau syariah — ' +
        'untuk mentadbir dana yang kini bernilai RM88 bilion. Suruhanjaya: kriteria ini "terlalu umum dan tidak memadai".</p>',
      note: 'Suruhanjaya menyenaraikan <b>tujuh akta Malaysia lain</b> yang mempunyai kriteria khusus, ' +
        'sebagai panduan untuk pindaan Akta 535.',
      p: [71, 76]
    });
    h += L.card({
      t: 'Bandingkan dengan tujuh akta badan berkanun lain', badge: L.pv('fakta'),
      body: L.table({
        cols: [{ l: 'Akta' }, { l: 'Kriteria kelayakan yang disyaratkan' }],
        rows: [{ _cls: '', c: ['<b>Akta Tabung Haji 1995 (Akta 535)</b>',
          '<span style="color:var(--bad);font-weight:700">Muslim dan warganegara Malaysia — tiada lain</span>'] }]
          .concat(km.kelayakan.bandingan.map(function (b) {
            return { c: [L.esc(b.akta), L.esc(b.kriteria)] };
          }))
      }),
      note: 'Syor Suruhanjaya: anggota Lembaga hendaklah terdiri daripada mereka yang mempunyai kepakaran dalam ' +
        '<b>' + km.kelayakan.cadangan.join(', ') + '</b> — dinyatakan secara khusus dalam Akta 535.',
      p: [71, 72, 73, 74, 75, 76, 77]
    });
    h += '</div>';

    /* --- tab --- */
    h += '<div class="sec"><div class="ctl">' + L.seg('tadbirTab', [
      { v: 'orang', l: 'Kitaran jawatan' },
      { v: 'politik', l: 'Ahli politik' },
      { v: 'kuasa', l: 'Kuasa Menteri' },
      { v: 'anak', l: 'Jawatan anak syarikat' },
      { v: 'jk', l: 'Jawatankuasa' },
      { v: 'disiplin', l: 'Tindakan tatatertib' }
    ], S.tadbirTab) + '</div>';

    if (S.tadbirTab === 'orang') {
      h += L.card({
        t: 'Siapa memegang jawatan, bila — 2009 hingga 2022', badge: L.pv('fakta'),
        sub: 'Setiap bar ialah satu tempoh perkhidmatan. Tanda merah = penamatan awal tanpa sebab di bawah ' +
          'seksyen 6(5) Akta 535. Bar kuning = tempoh Perdana Menteri memegang kuasa Menteri.',
        body: L.svgGantt({ w: 800, siri: jw.siri, from: '2009-01-01', to: '2022-12-31',
          alt: 'Garis masa jawatan utama LTH 2009-2022' }) +
          '<p class="scrollx-hint">Leret ke kanan. Tekan mana-mana bar untuk tarikh penuh.</p>',
        note: '<b>Kitaran yang sangat pantas antara 2018 dan 2022:</b> empat Menteri, tiga Pengerusi, ' +
          'empat Ketua Pegawai Eksekutif, lima wakil Jabatan Perdana Menteri (dan satu kekosongan yang belum ' +
          'diisi semasa laporan). Bandingkan dengan tempoh sebelum 2018: satu Menteri selama sembilan tahun, ' +
          'satu KPE selama sepuluh tahun.',
        limit: 'Kitaran pantas selepas 2018 berlaku dalam tempoh ketidakstabilan politik nasional. Ia tidak ' +
          'semestinya kegagalan tadbir urus LTH sendiri — tetapi Suruhanjaya menyatakan penamatan mengejut ' +
          'dua penyandang "telah memberi kesan kepada proses penambahbaikan yang sedang dilaksanakan".',
        p: [56, 59, 60, 61, 62, 63, 64, 65]
      });
      h += L.verdict('fail', 'Dua penamatan awal tanpa sebab', jw.tamatAwalNota);
      h += L.card({
        t: 'Syor Suruhanjaya untuk membaiki proses pelantikan', badge: L.pv('fakta'),
        body: '<p class="csub">Suruhanjaya mencadangkan model yang sudah ada dalam sistem Malaysia: ' +
          '<b>Suruhanjaya Pelantikan Kehakiman (JAC)</b>, ditubuhkan 2009 melalui Akta 695 tanpa perlu ' +
          'meminda Perlembagaan.</p>' +
          '<div class="rb two"><div class="cannot"><strong>Sekarang</strong>' +
          'Menteri Hal Ehwal Agama melantik dan membatalkan pelantikan Pengerusi, anggota Lembaga dan KPE — ' +
          'dan boleh membatalkan pada bila-bila masa <b>tanpa memberi apa-apa sebab</b>.</div>' +
          '<div class="can"><strong>Dicadangkan</strong>' +
          'Perdana Menteri melantik, atas syor <b>jawatankuasa atau badan penasihat bebas</b> yang melakukan ' +
          'proses pemilihan. Sebarang pembatalan perlu dirujuk kepada badan itu dahulu, dan sebab yang ' +
          'munasabah perlu diberi.</div></div>',
        p: [81, 82, 83, 231]
      });
    }

    if (S.tadbirTab === 'politik') {
      h += L.card({
        t: 'Tiga anggota Lembaga yang merupakan ahli politik aktif', badge: L.pv('fakta'),
        body: RD.politik.orang.map(function (o) {
          return '<div class="ec" style="box-shadow:none;margin:9px 0"><div class="eh"><b>' + L.esc(o.n) + '</b>' +
            '<span class="etag st-polis">Ahli politik</span></div>' +
            '<div style="font-size:12.5px;color:var(--ink-2);margin-top:7px"><b>Di LTH:</b> ' + L.esc(o.peranan) + '</div>' +
            '<div style="font-size:12.5px;color:var(--ink-2);margin-top:3px"><b>Dalam politik:</b> ' + L.esc(o.politik) + '</div></div>';
        }).join(''),
        note: RD.politik.dapatan,
        limit: 'Laporan <b>tidak</b> mendakwa mana-mana individu ini melakukan salah laku kerana kedudukan ' +
          'politik mereka. Dapatannya bersifat struktur: kehadiran ahli politik aktif menimbulkan persepsi dan ' +
          'membuka ruang untuk keputusan didorong pertimbangan politik.',
        p: [77, 78]
      });
      h += L.card({
        t: 'Keputusan mana yang Suruhanjaya kata didorong unsur politik?', badge: L.pv('fakta'),
        body: '<div class="rb">' +
          '<div class="cannot"><strong>Bayaran agihan keuntungan (hibah)</strong>' +
          'Tekanan politik mahukan kadar hibah dikekalkan pada tahap tinggi seperti tahun-tahun sebelumnya. ' +
          'Suruhanjaya: "tekanan politik dalam menghadapi pilihan raya juga telah mendorong kepada keputusan ' +
          'yang menjadi punca utama krisis kewangan LTH."</div>' +
          '<div class="cannot"><strong>Penentuan bayaran haji</strong>' +
          'Bayaran dibekukan pada RM9,980 dari 2009 hingga 2021 — 13 tahun tanpa kenaikan walaupun kos naik setiap tahun.</div>' +
          '<div class="cannot"><strong>Bantuan Kewangan Haji (HAFIS)</strong>' +
          'Subsidi meningkat daripada RM106 juta (2014) kepada hampir RM300 juta (2019) tanpa penilaian kelayakan penerima.</div></div>',
        note: 'Syor 4.4.1(c): peruntukan khusus yang <b>melarang ahli politik yang aktif</b> daripada dilantik ' +
          'dan memegang jawatan sebagai Pengerusi atau anggota Lembaga LTH <b>dan anak-anak syarikatnya</b> ' +
          'hendaklah dikanunkan dalam Akta 535. Syor 4.4.25 pula menyeru pengurusan profesional ' +
          '"tanpa campur tangan politik".',
        p: [16, 78, 214, 230, 237]
      });
    }

    if (S.tadbirTab === 'kuasa') {
      var t = km.senarai, byJenis = { wang: 0, tadbir: 0 };
      t.forEach(function (x) { byJenis[x.jenis]++; });
      h += L.card({
        t: 'Dua belas kuasa Menteri — dan cadangan pembahagiannya', badge: L.pv('fakta'),
        sub: 'Kuasa Menteri Hal Ehwal Agama di bawah Akta 535 merangkumi bukan sahaja hal haji, tetapi ' +
          'seluruh pengurusan dana dan pelaburan.',
        body: L.table({
          cols: [{ l: 'Kuasa' }, { l: 'Jenis' }, { l: 'Dicadangkan dipegang oleh' }],
          rows: t.map(function (x) {
            return { c: [L.esc(x.k),
              '<span class="etag ' + (x.jenis === 'wang' ? 'st-mahkamah' : 'st-hapus') + '">' +
                (x.jenis === 'wang' ? 'Kewangan' : 'Tadbir') + '</span>',
              '<b style="color:' + (x.cadang.indexOf('Kewangan') >= 0 ? 'var(--bad)' :
                x.cadang.indexOf('PM') >= 0 ? 'var(--sim)' : 'var(--accent-ink)') + '">' + L.esc(x.cadang) + '</b>'] };
          })
        }),
        note: '<b>Data terbitan:</b> ' + byJenis.wang + ' daripada 12 kuasa (' +
          L.pct(byJenis.wang / 12 * 100, 0) + ') adalah kuasa kewangan tulen — termasuk meluluskan ' +
          '<b>SETIAP</b> aktiviti pelaburan LTH dalam dan luar negara, dan meluluskan pengisytiharan hibah. ' +
          'Semua ini dipegang oleh Menteri yang kepakarannya dalam hal ehwal agama.',
        p: [78, 79, 231]
      });
      h += L.verdict('fail', 'Dapatan Suruhanjaya mengenai kualiti keputusan', km.dapatan +
        ' Semua Menteri yang memberi keterangan mengakui mereka <b>tidak mempunyai input pihak ketiga</b> ' +
        'untuk menasihati mereka mengenai cadangan yang dikemukakan Lembaga.');
      h += L.card({
        t: 'Peruntukan Akta 535 yang sudah melibatkan Menteri Kewangan', badge: L.pv('fakta'),
        sub: 'Suruhanjaya menunjukkan bahawa Akta 535 sendiri sudah mengiktiraf peranan Kementerian Kewangan — ' +
          'jadi pembahagian kuasa bukan idea baharu.',
        body: '<ul style="margin:4px 0 0;padding-left:20px;font-size:13px;line-height:1.6;color:var(--ink-2)">' +
          '<li><b>Seksyen 17:</b> tiada jaminan atau surat tanggung rugi boleh dikeluarkan tanpa kebenaran bertulis Menteri Kewangan.</li>' +
          '<li><b>Seksyen 18:</b> LTH hanya boleh meminjam dengan kelulusan Menteri <b>dan</b> Menteri Kewangan.</li>' +
          '<li><b>Seksyen 22(3)(b):</b> baki minima Kumpulan Wang Rizab perlu diluluskan <b>Perbendaharaan</b>.</li>' +
          '<li><b>Seksyen 24:</b> jika LTH tidak mampu bayar pengeluaran pendeposit, ia dibayar daripada ' +
          'Kumpulan Wang Disatukan Kerajaan.</li></ul>',
        note: '<b>Ironinya:</b> seksyen 22(3)(b) sudah memberi Perbendaharaan kuasa menetapkan baki rizab minima — ' +
          'satu kawalan yang boleh menghalang seluruh krisis ini. Suruhanjaya mendapati Perbendaharaan ' +
          '<b>tidak pernah menggunakannya</b>, dan tiada mekanisme diwujudkan untuk menilai polisi rizab LTH.',
        p: [79, 80, 104]
      });
    }

    if (S.tadbirTab === 'anak') {
      h += L.card({
        t: 'Berapa banyak jawatan anak syarikat dipegang serentak?', badge: L.pv('fakta'),
        sub: 'Bilangan jawatan Pengerusi atau Ahli Lembaga Pengarah dalam anak syarikat LTH yang dipegang ' +
          'dalam tempoh perkhidmatan masing-masing.',
        body: L.svgHBars({
          w: 700, labelW: 178, rowH: 27, valW: 74,
          rows: as.orang.map(function (o) {
            return { k: o.n.replace(/^(Datuk Seri Panglima |Datuk Sri |Datuk |Dato' Sri |Dato' |Tan Sri Dato' Paduka Haji |Tan Sri |Encik |Puan )/, ''),
              v: o.bil, lab: o.bil + ' jawatan',
              color: o.bil >= 15 ? 'var(--bad)' : o.bil >= 7 ? 'var(--warn)' : 'var(--neutral)',
              tip: o.n + ' — ' + o.peranan + ' · ' + o.bil + ' jawatan: ' + o.syarikat.slice(0, 6).join(', ') +
                (o.syarikat.length > 6 ? ' dan ' + (o.syarikat.length - 6) + ' lagi' : '') +
                (o.nota ? ' · ' + o.nota : '') };
          }),
          axisLabel: 'Bilangan jawatan dalam anak syarikat LTH'
        }),
        note: '<b>Dasar baharu LTH:</b> hadkan jawatan anak syarikat kepada <b>' + as.had.baru + ' sahaja</b>. ' +
          'Bandingkan dengan rekod: Ketua Pegawai Kewangan Kumpulan pernah memegang <b>23</b> jawatan serentak, ' +
          'dan seorang KPE memegang <b>18</b>. Suruhanjaya: "' + as.dapatan + '"',
        limit: 'Senarai ini adalah "antaranya" — laporan menyatakan ia mengenal pasti <b>beberapa</b> orang ' +
          'anggota Lembaga yang terlibat, bukan senarai lengkap semua penyandang. Jumlah sebenar mungkin lebih tinggi.',
        p: [84, 85, 86, 87, 88, 89, 90]
      });
      h += L.card({
        t: 'Kes yang paling menonjol: jawatan dikekalkan selepas tamat perkhidmatan', badge: L.pv('fakta'),
        body: '<p class="csub"><b>Tan Sri Ismee bin Ismail</b> tamat perkhidmatan sebagai Ketua Pegawai Eksekutif ' +
          'LTH pada <b>30 Jun 2016</b>. Suruhanjaya mendapati beliau <b>terus memegang jawatan</b> dalam tiga anak ' +
          'syarikat LTH sehingga <b>Mei 2018</b> — hampir dua tahun selepas itu:</p>' +
          '<ul style="margin:6px 0 0;padding-left:20px;font-size:13px;color:var(--ink-2);line-height:1.6">' +
          '<li>TH Plantations Berhad</li><li>Trurich Resources Sdn. Bhd.</li><li>TH Travel &amp; Services Sdn. Bhd.</li></ul>' +
          '<p class="csub" style="margin-top:10px">Dua daripada tiga syarikat itu — <b>Trurich</b> dan ' +
          '<b>TH Plantations</b> — kemudiannya muncul dalam senarai 14 pelaburan bermasalah yang memerlukan ' +
          'audit forensik. Trurich dirosotnilai sepenuhnya (RM364.31 juta) dan mempunyai laporan polis; ' +
          'TH Plantations mempunyai laporan forensik PwC dan laporan kepada PDRM, SPRM serta Suruhanjaya Sekuriti.</p>',
        note: 'Sebaliknya, Dato’ Sri Zukri bin Samat (KPE 2018–2019) memaklumkan Suruhanjaya bahawa beliau ' +
          '<b>melepaskan</b> jawatan-jawatan anak syarikatnya untuk mengelakkan konflik kepentingan semasa ' +
          'mengetuai pengurusan LTH.',
        limit: 'Laporan <b>tidak</b> mengaitkan pemegangan jawatan ini secara langsung dengan masalah di ' +
          'Trurich atau TH Plantations. Hubungan yang kami tunjukkan di sini adalah pemerhatian kami tentang ' +
          'pertindihan senarai, bukan dapatan Suruhanjaya.',
        p: [86, 182, 189]
      });
    }

    if (S.tadbirTab === 'jk') {
      var j = RD.jawatankuasa;
      h += L.card({
        t: 'Jawatankuasa yang boleh dibubarkan dengan satu keputusan pentadbiran', badge: L.pv('fakta'),
        sub: 'Semua jawatankuasa LTH ditubuhkan di bawah seksyen 11 Akta 535 — yang bermakna tiada satu pun ' +
          'dikanunkan secara khusus, dan semuanya boleh dibubarkan secara pentadbiran.',
        body: '<div class="rb two">' +
          '<div class="cannot"><strong>Dibubarkan pada 2018</strong>' +
          j.dimansuh.map(function (d) {
            return '<div style="margin-bottom:9px"><b>' + L.esc(d.n) + '</b> <span class="mut">(' + d.bila + ')</span><br>' +
              '<span style="font-size:12px">' + d.kesan + '</span></div>';
          }).join('') + '</div>' +
          '<div class="can"><strong>Dicadangkan dikanunkan dalam Akta 535</strong>' +
          '<ul style="margin:0;padding-left:18px">' + j.dikanunkan.map(function (x) { return '<li>' + L.esc(x) + '</li>'; }).join('') +
          '</ul><p style="margin:8px 0 0;font-size:12px">Berserta peruntukan lazim: kuorum, perjalanan mesyuarat, ' +
          'undi pemutus Pengerusi, kekosongan jawatan, hilang kelayakan dan penzahiran kepentingan.</p></div></div>',
        note: '<b>Kesan pembubaran Panel Pelaburan:</b> ia diganti dengan Exco Perniagaan yang dipengerusikan ' +
          'Menteri Hal Ehwal Ekonomi, dengan keputusan dirujuk kepada Exco Induk yang dipengerusikan Perdana Menteri. ' +
          'Saksi-saksi mengakui <b>Exco Perniagaan tidak pernah berfungsi</b>. Panel Pelaburan hanya diwujudkan ' +
          'semula selepas usaha dua KPE berikutnya.',
        p: [92, 93, 97, 98]
      });
      h += L.card({
        t: 'Perlindungan undang-undang yang HILANG apabila Akta 535 diperkenalkan', badge: L.pv('fakta'),
        body: '<div class="tlist">' + [
          { d: '1962', t: 'Akta PWSBH, seksyen 8', b: 'PWSBH <b>perlu mengambil kira</b> sebarang laporan atau ' +
            'cadangan yang diberikan kepada mereka oleh <b>Panel Pelaburan</b>.' },
          { d: '1969', t: 'Akta LUTH (Akta 8), seksyen 23(2)', b: 'LUTH <b>perlu mengambil kira</b> sebarang laporan ' +
            'atau cadangan yang diberikan oleh <b>Majlis Penasihat Kewangan</b>.' },
          { d: '1995', t: 'Akta 535 — perlindungan itu dimansuhkan', b: 'Panel Pelaburan dan Majlis Penasihat ' +
            'Kewangan <b>dimansuhkan</b> dalam Akta 535. Seksyen 20 hanya menetapkan kuasa pelaburan dijalankan ' +
            'dengan keizinan Menteri — tanpa kewajipan mengambil kira nasihat pakar.' }
        ].map(function (e) {
          return '<div class="tev k-tadbir"><div class="td">' + e.d + '</div><div class="tt">' + e.t +
            '</div><div class="tb">' + e.b + '</div></div>';
        }).join('') + '</div>',
        note: '<b>Ini penemuan struktur yang penting:</b> undang-undang 1962 dan 1969 <em>lebih ketat</em> ' +
          'daripada undang-undang 1995. Suruhanjaya: "Apa yang ketara ialah Panel Pelaburan atau pun Majlis ' +
          'Penasihat Kewangan telah dimansuhkan dalam Akta 535." Perlindungan yang hilang itulah yang ' +
          'kini disyorkan dikembalikan.',
        p: [111, 112]
      });
    }

    if (S.tadbirTab === 'disiplin') {
      var tt = RD.tatatertib;
      h += L.card({
        t: 'Empat kluster isu, lima pegawai, dan apa jadi kepada mereka', badge: L.pv('fakta'),
        body: '<div class="rb">' + tt.kluster.map(function (k) {
          return '<div style="background:var(--card-2)"><strong>Kluster ' + k.id + '</strong>' + L.esc(k.n) + '</div>';
        }).join('') + '</div>',
        p: [197, 198]
      });
      h += L.card({
        t: 'Hukuman asal vs hukuman selepas rayuan', badge: L.pv('fakta'),
        body: L.table({
          cols: [{ l: 'Pegawai' }, { l: 'Kluster', n: 1 }, { l: 'Hukuman asal' }, { l: 'Selepas rayuan' }, { l: 'Jawatan kini' }],
          rows: tt.kes.map(function (k) {
            return { c: ['<b>' + L.esc(k.n) + '</b><span class="mini">' + L.esc(k.jw) + '</span>',
              { v: k.kluster.join(', '), n: 1 },
              '<span style="color:var(--bad);font-weight:650">' + L.esc(k.hukumanAsal) + '</span>',
              '<span style="color:var(--warn);font-weight:650">' + L.esc(k.hukumanRayuan) + '</span>',
              L.esc(k.kini)] };
          })
        })+ '<p class="scrollx-hint">Leret ke kanan untuk lihat jawatan semasa setiap pegawai.</p>',
        note: '<b>' + tt.kesimpulan + '</b>',
        limit: 'Laporan tidak menyatakan sama ada hukuman yang dikurangkan itu wajar atau tidak berdasarkan ' +
          'merit kes. Dapatan Suruhanjaya adalah mengenai <b>kelajuan proses</b>, bukan keadilan keputusan.',
        p: [198, 199, 200]
      });
      h += L.card({
        t: 'Berapa lama proses tatatertib mengambil masa', badge: L.pv('fakta'),
        sub: tt.lengahNota,
        body: L.svgHBars({
          w: 700, labelW: 168, rowH: 34, valW: 76, max: 24,
          rows: tt.lengah.map(function (x) {
            return { k: 'Kluster ' + x.kluster + ' — ' + x.sesiapa.split(' ').slice(0, 3).join(' '),
              v: x.bulan, lab: x.bulan + ' bulan', color: x.bulan > 15 ? 'var(--bad)' : 'var(--warn)',
              tip: 'Kluster ' + x.kluster + ' (' + x.sesiapa + '): ' + x.bulan + ' bulan dari tarikh surat ' +
                'representasi sehingga Jawatankuasa Tatatertib bersidang.' };
          }),
          axisLabel: 'Bulan'
        }),
        note: 'Suruhanjaya: proses tatatertib di LTH "mengambil masa yang terlalu lama" dan perlu diperkemas ' +
          'serta disegerakan "agar proses ini dilihat dan diyakini sebagai suatu proses yang berkesan, cekap, ' +
          'adil dan telus".',
        p: [200, 201]
      });
      h += L.card({
        t: 'Laporan polis dan aduan SPRM', badge: L.pv('fakta'),
        body: RD.laporanPolis.rows.map(function (r) {
          return '<div class="ec" style="box-shadow:none;margin:9px 0">' +
            '<div class="eh"><b>' + L.esc(r.repot) + '</b><span class="etag st-polis">' + L.esc(r.tarikh) + '</span></div>' +
            '<div style="font-size:12px;color:var(--ink-3);margin-top:5px">Pengadu: ' + L.esc(r.pengadu) + '</div>' +
            '<p class="desc">' + L.esc(r.isu) + '</p>' +
            '<div class="cnote" style="margin-top:9px;font-size:12px"><b>Status:</b> ' + L.esc(r.status) + '</div></div>';
        }).join(''),
        note: '<b>Enam aduan berasingan dibuat kepada SPRM:</b><ul style="margin:6px 0 0;padding-left:20px;font-size:12.5px;line-height:1.55">' +
          RD.laporanPolis.sprm.rows.map(function (x) { return '<li>' + L.esc(x) + '</li>'; }).join('') +
          '</ul><p style="margin:8px 0 0;font-size:12.5px">' + RD.laporanPolis.sprm.status + '</p>',
        limit: 'Laporan polis dan aduan SPRM adalah <b>dakwaan</b>, bukan pembuktian. Semua kes masih dalam ' +
          'siasatan atau dalam pertimbangan Pendakwa Raya semasa laporan disiapkan pada Julai 2022.',
        p: [193, 194, 195, 196, 201, 202]
      });
    }
    h += '</div>';

    h += '<div class="sec">' + L.readBlocks(
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Akta 535 memberi Menteri Hal Ehwal Agama kuasa mutlak ke atas perkara kewangan yang jauh di luar ' +
      'bidang kepakarannya, dan tiada kriteria kelayakan untuk anggota Lembaga.</li>' +
      '<li>Perlindungan undang-undang yang ada pada 1962 dan 1969 — kewajipan mengambil kira nasihat Panel ' +
      'Pelaburan — dihapuskan pada 1995.</li>' +
      '<li>Setiap lapisan kawalan bergantung kepada lapisan sebelumnya, menghasilkan keputusan ' +
      '"dipersetujui seperti dicadangkan" tanpa semakan bebas.</li></ul>',
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Kita <b>tidak boleh</b> menyimpulkan bahawa ahli politik dalam Lembaga secara langsung menyebabkan ' +
      'kerugian tertentu. Dapatan laporan bersifat struktur dan persepsi.</li>' +
      '<li>Kita <b>tidak boleh</b> mengetahui senarai lengkap jawatan anak syarikat — laporan hanya memberi ' +
      '"antaranya".</li>' +
      '<li>Kita <b>tidak boleh</b> menilai sama ada hukuman tatatertib yang dikurangkan itu adil, kerana ' +
      'butiran kes dan representasi pegawai adalah ekshibit rahsia.</li></ul>'
    ) + '</div>';
    return h;
  }
};

/* ============================ 9. BONUS =================================== */
V.bonus = {
  nav: 'Bonus', kicker: 'Ganjaran vs prestasi',
  h1: 'Bonus 13 bulan gaji pada tahun aset kurang daripada liabiliti',
  desc: 'Siling panduan Pekeliling Perbendaharaan ialah dua bulan gaji. Pada 2014, kakitangan LTH ' +
    'menerima sehingga 13 bulan — pada tahun yang sama LTH membayar hibah melebihi kemampuannya.',
  render: function () {
    var b = RD.bonus, bk = RD.bonusKhas;
    var cats = b.rows.map(function (r) { return String(r.y); });
    var mampu = L.derive.mampuHibah();
    var h = '';

    h += '<div class="sec">';
    h += L.tiles([
      { l: 'Peruntukan bonus tertinggi (2014)', v: L.rmj(74), cls: 'neg', d: 'Sehingga 13 bulan gaji',
        tip: '1–11 bulan bonus tahunan + 2 bulan bonus khas. Jumlah peruntukan RM74 juta.' },
      { l: 'Siling panduan Pekeliling WP 7.2', v: '2', u: 'bulan',
        d: 'Boleh dilebihi jika ramai berprestasi cemerlang',
        tip: 'Perenggan 3.1.6 WP 7.2: jumlah siling purata pembayaran bonus sebagai panduan tidak lebih dua bulan gaji. ' +
          'Perenggan 3.1.8 membenarkan lebih dua bulan jika ramai pegawai menunjukkan prestasi cemerlang.' },
      { l: 'Peruntukan bonus 2018–2020', v: '1', u: 'bulan', cls: 'pos',
        d: 'Selepas krisis: RM10.8j–RM14.1j setahun',
        tip: 'Bermula tahun kewangan 2018, pemberian bonus dikawal mengikut kemampuan kewangan LTH.' },
      { l: 'Bonus istimewa TH Properties tanpa kelulusan', v: L.rm(bk.jumlahGabungan), cls: 'neg',
        d: '2017 + 2018, melanggar Akta Syarikat 2016',
        tip: 'RM1,148,400 (2017) + RM1,045,000 (2018) = RM2,193,400. Laporan menyebut "RM2.2 juta".' }
    ]);
    h += '</div>';

    /* --- siri masa --- */
    h += '<div class="sec"><h2>Sebelas tahun peruntukan bonus</h2>' +
      '<p class="lead">Bar = peruntukan bonus (RM juta). Garis merah = keuntungan bersih yang dilaporkan ' +
      '(RM juta, paksi kanan). Perhatikan 2014: bonus tertinggi berlaku pada tahun keuntungan naik sedikit — ' +
      'tetapi juga tahun jurang defisit LTH bermula.</p>';
    h += L.card({
      t: 'Peruntukan bonus kakitangan LTH, 2010–2020', badge: L.pv('fakta'),
      body: (L.svgComboBarLine({
        w: 660, h: 265, cats: cats,
        yfmt: function (v) { return 'RM' + L.num(v, 0) + 'j'; },
        y2fmt: function (v) { return L.num(v / 1000, 1) + 'b'; }, max2: 4000,
        bars: [{ name: 'Peruntukan bonus', data: b.rows.map(function (r) { return r.peruntukan; }),
          color: 'var(--warn)' }],
        lines: [{ name: 'Keuntungan bersih dilaporkan', data: b.rows.map(function (r) { return r.untung; }),
          color: 'var(--bad)' }],
        tip: function (i) {
          var r = b.rows[i];
          var mm = mampu.filter(function (x) { return x.y === r.y; })[0];
          return r.y + ' · Peruntukan bonus ' + L.rmj(r.peruntukan) + ' · kadar ' + r.kadar +
            (r.untung ? ' · keuntungan bersih dilaporkan ' + L.rmj(r.untung) + ' (' + L.pct(r.peratus) + ' daripada keuntungan)' : '') +
            (mm ? ' · pada tahun ini hibah dibayar melebihi kemampuan sebanyak ' + L.rmj(Math.max(0, mm.lebih)) : '');
        },
        ann: [{ i: 4, t: '2014: sehingga 13 bulan' }, { i: 8, t: '2018: 1 bulan', right: true, dy: 24 }]
      })) + L.legend([{ c: 'var(--warn)', l: 'Peruntukan bonus (RM juta)' },
        { c: 'var(--bad)', l: 'Keuntungan bersih dilaporkan (paksi kanan)', line: true }]),
      note: '<b>Corak yang jelas:</b> peruntukan bonus memuncak 2013–2015 (RM49j–RM74j) dan jatuh mendadak ' +
        'kepada RM10.8j pada 2018 — pengurangan ' + L.pct((1 - 10.8 / 74) * 100, 0) + ' daripada puncak. ' +
        'Suruhanjaya: bermula tahun kewangan 2018, "pemberian bonus kepada kakitangan telah dikawal mengikut ' +
        'kemampuan kewangan LTH".',
      limit: 'Keuntungan bersih yang ditunjukkan garis merah adalah keuntungan <b>seperti dilaporkan</b> — ' +
        'iaitu keuntungan yang dikira dengan polisi rosot nilai LTH sendiri dan asas RAV. ' +
        'Kalau piawaian dipatuhi sepenuhnya, 2017 sepatutnya <b>kerugian</b> RM1.4 bilion, bukan keuntungan. ' +
        '<a href="#/rosot">Lihat kiraan itu</a>.',
      p: [137, 139]
    });
    h += '</div>';

    /* --- percanggahan bonus vs kedudukan --- */
    h += '<div class="sec"><h2>Bonus dibayar pada tahun aset kurang daripada liabiliti</h2>';
    h += L.card({
      t: 'Susun sebelah-sebelah: bonus vs kedudukan kewangan sebenar', badge: L.pvs('fakta', 'terbit'),
      body: L.table({
        cols: [{ l: 'Tahun' }, { l: 'Peruntukan bonus', n: 1 }, { l: 'Bonus (bulan gaji)' },
          { l: 'Keuntungan dilaporkan', n: 1 }, { l: 'Kedudukan aset − liabiliti', n: 1 }, { l: 'Ujian s.22' }],
        rows: b.rows.filter(function (r) { return r.y >= 2013 && r.y <= 2017; }).map(function (r) {
          var p = RD.posisi.rows.filter(function (x) { return x.y === r.y; })[0];
          return { c: ['<b>' + r.y + '</b>', { v: L.rmj(r.peruntukan), n: 1 }, r.taburan,
            { v: L.rmj(r.untung), n: 1 },
            { v: L.rmj(p.pasca), n: 1, cls: p.pasca < 0 ? 'neg' : 'pos' },
            p.pra >= 0 && p.pasca >= 0
              ? '<span class="etag st-selesai">Lulus</span>'
              : '<span class="etag st-mahkamah">Gagal</span>'] };
        })
      }),
      note: 'Suruhanjaya menyatakannya secara terus: "mengambil kira isu kewangan yang dihadapi oleh LTH ' +
        'bermula pada tahun 2014 hingga 2017 di mana nilai aset adalah lebih rendah daripada liabiliti seperti ' +
        'yang dilaporkan dalam penyata kewangan tahunan dan diakui oleh JAN, ini membuktikan bahawa pemberian ' +
        'bonus dengan jumlah yang tinggi oleh LTH adalah <b>tidak wajar</b>."',
      limit: 'Bonus dibayar berdasarkan keuntungan <b>yang dilaporkan pada masa itu</b>, yang kelihatan besar. ' +
        'Suruhanjaya menjelaskan puncanya: "Pemberian bonus yang tinggi berlaku disebabkan LTH membuat penilaian ' +
        'aset-asetnya berdasarkan RAV yang menunjukkan LTH membuat keuntungan yang besar sepanjang tahun." ' +
        'Jadi ini kesan, bukan sebab berasingan.',
      p: [139, 140, 147]
    });
    h += '</div>';

    /* --- taburan KPI --- */
    var tk = b.taburanKpi;
    h += '<div class="sec"><h2>Bagaimana bonus itu dibahagikan</h2>';
    h += L.card({
      t: 'Taburan bonus mengikut kumpulan prestasi, 2014 dan 2015', badge: L.pv('fakta'),
      sub: 'Lima kumpulan prestasi dengan peratusan kakitangan tetap dalam setiap kumpulan.',
      body: L.svgStack100({
        w: 700, h: 52, segs: tk.rows.map(function (r, i) {
          return { k: 'Kumpulan ' + r.g, short: r.g + ' · ' + r.pctKakitangan + '%', v: r.pctKakitangan,
            color: ['var(--good)', 'var(--accent)', 'var(--neutral)', 'var(--warn)', 'var(--bad)'][i],
            tip: 'Kumpulan ' + r.g + ': ' + r.pctKakitangan + '% kakitangan · bonus 2014: ' + r.y2014 +
              ' bulan · bonus 2015: ' + r.y2015 + ' bulan' };
        })
      }) + '<div style="height:10px"></div>' + L.table({
        cols: [{ l: 'Kumpulan prestasi' }, { l: '% kakitangan', n: 1 }, { l: 'Bonus 2014 (bulan)', n: 1 },
          { l: 'Bonus 2015 (bulan)', n: 1 }],
        rows: tk.rows.map(function (r) {
          return { c: ['<b>Kumpulan ' + r.g + '</b>', { v: r.pctKakitangan + '%', n: 1 },
            { v: r.y2014, n: 1 }, { v: r.y2015, n: 1 }] };
        })
      }),
      note: 'Perhatikan: bahkan kumpulan prestasi <b>terendah</b> (E, 5% kakitangan) menerima 1 bulan bonus. ' +
        'Kumpulan majoriti (C, 60% kakitangan) menerima 5–6 bulan pada 2014 — sudah melebihi siling panduan ' +
        'dua bulan. Kumpulan A (5% kakitangan) menerima sehingga 11 bulan.',
      p: [138]
    });
    h += L.card({
      t: 'Tiga peringkat kelulusan yang tidak menghalang apa-apa', badge: L.pv('fakta'),
      body: '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0 10px">' +
        b.kelulusan.map(function (k, i) {
          return (i ? '<span style="color:var(--ink-3)">→</span>' : '') +
            '<span style="background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:7px 11px;' +
            'font-size:12.5px;font-weight:700">' + L.esc(k) + '</span>';
        }).join('') + '</div>' +
        '<p class="csub">' + b.kelulusanNota + '</p>' +
        '<p class="csub">MOF menjelaskan bahawa kelulusan bonus melebihi dua bulan adalah "tertakluk kepada ' +
        'pertimbangan dan budi bicara Menteri Kewangan", mengambil kira prestasi kewangan LTH, prestasi pelaburan, ' +
        'produktiviti anggota dan perakuan Lembaga serta Menteri Hal Ehwal Agama.</p>',
      note: '<b>Masalahnya:</b> ketiga-tiga peringkat kelulusan bergantung kepada angka keuntungan yang ' +
        'dihasilkan LTH sendiri berdasarkan RAV. Tiada satu pun peringkat yang menyemak sama ada asas ' +
        'keuntungan itu sah.',
      p: [136, 137, 138, 139]
    });
    h += '</div>';

    /* --- bonus istimewa --- */
    h += '<div class="sec"><h2>Bonus istimewa TH Properties: RM2.2 juta yang perlu dikembalikan</h2>' +
      '<p class="lead">Ini kes berasingan daripada bonus kakitangan. Ia melibatkan pembayaran kepada ' +
      'Ahli Lembaga Pengarah dan pegawai terpilih, diluluskan oleh badan yang tidak mempunyai kuasa untuk ' +
      'meluluskannya.</p>';
    [bk.y2017, bk.y2018].forEach(function (yr, idx) {
      var namaTahun = idx === 0 ? '2017' : '2018';
      h += L.card({
        t: 'Bonus istimewa ' + namaTahun + ' — ' + yr.entiti, badge: L.pv('fakta'),
        sub: '<b>Kelulusan:</b> ' + L.esc(yr.kelulusan) + '<br><b>Alasan diberi:</b> ' + L.esc(yr.alasan),
        body: L.svgHBars({
          w: 700, labelW: 200, rowH: 25, valW: 92,
          rows: yr.penerima.map(function (p) {
            return { k: p.n.replace(/^(Datuk |Dato' |Haji |Encik |Puan )/, ''), v: p.v, lab: L.rm(p.v),
              color: p.jw.indexOf('Pengarah') >= 0 ? 'var(--bad)' : 'var(--neutral)',
              tip: p.n + ' — ' + p.jw + ': ' + L.rm(p.v) };
          }),
          axisLabel: 'RM · Jumlah ' + L.rm(yr.jumlah) + ' kepada ' + yr.penerima.length + ' penerima'
        }) + L.legend([{ c: 'var(--bad)', l: 'Ahli Lembaga Pengarah' }, { c: 'var(--neutral)', l: 'Pegawai' }]),
        note: '<b>Pelanggaran undang-undang:</b> ' + L.esc(yr.pelanggaran) + '. ' +
          (idx === 0
            ? 'Kelulusan dibuat oleh Mesyuarat Exco, yang <b>tidak mempunyai kuasa</b> membuat keputusan mengenai ' +
              'transaksi yang memerlukan kelulusan pemegang saham — melanggar resolusi Lembaga Pengarah ' +
              'TH Properties bertarikh 19 Ogos 2015. Perhatikan: tiga daripada empat orang yang menghadiri ' +
              'mesyuarat kelulusan itu adalah <b>penerima bonus</b>.'
            : 'Notifikasi kepada pemegang saham berasaskan resolusi Mesyuarat Agong yang dikemukakan ' +
              '<b>tujuh bulan selepas</b> resolusi Lembaga. Sembilan daripada 10 penerima 2018 juga menerima ' +
              'bonus 2017.'),
        p: idx === 0 ? [141, 142, 144] : [142, 143, 144]
      });
    });
    h += L.verdict('fail', 'Syor 4.4.9',
      '"Usaha perlu dibuat bagi mendapatkan semula bonus yang telah diberi kepada ahli Lembaga dan Pengurusan ' +
      'TH Properties, memandangkan bonus berkenaan diberikan tanpa mematuhi peraturan yang ditetapkan." ' +
      'Lembaga Pengarah TH Properties sendiri sudah memutuskan pada <b>12 Ogos 2020</b> untuk mendapatkan ' +
      'kembali bonus 2017–2018. Laporan tidak menyatakan sama ada wang itu telah dikembalikan.');
    h += '</div>';

    h += '<div class="sec">' + L.readBlocks(
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Peruntukan bonus 2010–2017 jauh melebihi siling panduan Pekeliling Perbendaharaan, dan Suruhanjaya ' +
      'menyimpulkan ia <b>tidak wajar</b> mengambil kira kedudukan kewangan sebenar LTH.</li>' +
      '<li>Bonus TH Properties 2017 dan 2018 melanggar seksyen 230 Akta Syarikat 2016 — ini bukan pendapat, ' +
      'ia pandangan undang-undang firma guaman yang dilantik dan diterima Suruhanjaya.</li>' +
      '<li>Kawalan bonus selepas 2018 (1 bulan sahaja) menunjukkan sistem itu memang boleh dikawal apabila ' +
      'kemampuan kewangan sebenar diambil kira.</li></ul>',
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Kita <b>tidak boleh</b> mengatakan kakitangan LTH tidak berhak menerima apa-apa bonus. Isunya ialah ' +
      'saiznya dan asas keuntungan yang digunakan untuk menjustifikasikannya.</li>' +
      '<li>Kita <b>tidak boleh</b> mengetahui jumlah bonus yang diterima setiap individu dalam kalangan ' +
      'kakitangan — hanya peruntukan keseluruhan dan julat bulan gaji.</li>' +
      '<li>Kita <b>tidak boleh</b> mengetahui sama ada bonus TH Properties RM2.2 juta telah dikembalikan. ' +
      'Laporan hanya menyatakan keputusan untuk mendapatkannya semula.</li></ul>'
    ) + '</div>';
    return h;
  }
};
