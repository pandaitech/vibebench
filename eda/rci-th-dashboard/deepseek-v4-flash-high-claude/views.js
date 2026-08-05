/* ============================================================
   VIEWS — bahagian-bahagian dashboard RCI Tabung Haji
   Bahasa Melayu mudah. Insight = penyiasatan, bukan hiasan.
   ============================================================ */
window.RTH = window.RTH || {};
RTH.views = [];

/* ---------- helper DOM ---------- */
function h(tag, cls, html) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.textContent = html;
  return e;
}

function section(id, title, intro) {
  var sec = h('section', 'vb-section');
  sec.id = id;
  if (title) {
    var head = h('div', 'section-head');
    var t = h('h2', 'section-title'); t.textContent = title;
    head.appendChild(t);
    if (intro) { var p = h('p', 'section-intro'); p.textContent = intro; head.appendChild(p); }
    sec.appendChild(head);
  }
  return sec;
}

function grid(n) { return h('div', 'vb-grid vb-grid-' + n); }

/* Callout insight — jenis: 'temuan' (dapatan) | 'persoalan' | 'peringatan' | 'kaedah' */
function insight(type, title, body) {
  var box = h('div', 'insight insight-' + type);
  var tag = h('span', 'insight-tag');
  var tags = {
    temuan: 'Dapatan utama', persoalan: 'Persoalan untuk diteroka', peringatan: 'Peringatan data',
    kaedah: 'Cara baca', kontra: 'Percanggahan dalam laporan'
  };
  tag.textContent = tags[type] || type;
  var t = h('strong', 'insight-title'); t.textContent = title;
  var b = h('p', 'insight-body'); b.textContent = body;
  box.appendChild(tag); box.appendChild(t); box.appendChild(b);
  return box;
}

function srcTag(p) {
  if (p == null) return '';
  var arr = Array.isArray(p) ? p : [p];
  return 'Sumber: m/s ' + arr.join(', ');
}

function fmtB(v) {
  if (v == null) return '—';
  var a = Math.abs(v);
  var s = a >= 1e9 ? (a / 1e9).toFixed(1) + ' bilion' : (a / 1e6).toFixed(0) + ' juta';
  return (v < 0 ? '−' : '') + 'RM' + s;
}
function pct(v, dp) { return (v * 100).toFixed(dp || 0) + '%'; }

/* format nilai yang diwakili dalam RM juta */
function rmj(v) {
  if (v == null) return '—';
  var s = v < 0 ? '−' : '';
  var n = (Math.round(Math.abs(v) * 10) / 10).toLocaleString('ms-MY');
  return s + 'RM' + n + ' juta';
}
function rmk(v) { return v == null ? '—' : 'RM' + Math.round(v).toLocaleString('ms-MY') + ' ribu'; }
function rmb(v) { return v == null ? '—' : 'RM' + (v / 1000).toFixed(1) + ' bilion'; }

/* ---------- PALET ---------- */
var C = { s1: 'var(--series-1)', s2: 'var(--series-2)', s3: 'var(--series-3)', s4: 'var(--series-4)', s5: 'var(--series-5)', s6: 'var(--series-6)', s7: 'var(--series-7)', s8: 'var(--series-8)' };

/* status warna token (bukan kategorikal) */
var ST = {
  good: 'var(--st-good)', warn: 'var(--st-warn)', serious: 'var(--st-serious)', critical: 'var(--st-critical)'
};

/* ============================================================
   SEKSYEN 1 — GAMBARAN BESAR
   ============================================================ */
RTH.views.push({
  id: 'ringkasan', nav: 'Gambaran Besar', render: function () {
    var s = section('ringkasan', 'Gambaran Besar',
      'Apa cerita laporan ini? Dalam tiga minit. Laporan RCI menyiasat pengurusan Tabung Haji 2014–2020 — dan menemui krisis kewangan yang telah lama disembunyikan.');
    var wrap = h('div', 'wrap');

    /* HERO */
    var hero = h('div', 'hero');
    var heroK = h('div', 'hero-kicker'); heroK.textContent = 'Satu nombor yang menceritakan segalanya';
    var heroV = h('div', 'hero-value'); heroV.textContent = 'RM1.4 bilion';
    var heroL = h('div', 'hero-label');
    heroL.textContent = 'Kerugian terlaras LTH bagi tahun 2017 — sedangkan LTH melaporkan KEUNTUNGAN RM3.4 bilion. Selisih hampir RM4.8 bilion datang daripada pelaburan yang tidak dirosotkan dan amalan perakaunan.';
    hero.appendChild(heroK); hero.appendChild(heroV); hero.appendChild(heroL);
    wrap.appendChild(hero);

    /* BARIS STAT TILE */
    var tiles = h('div', 'stat-grid');
    var tData = [
      { label: 'Kerugian terlaras 2017', value: 'RM1.4b', sub: 'vs keuntungan dilapor RM3.4b (PwC)' },
      { label: 'Hibah 2017 dibayar', value: 'RM3.32b', sub: 'kadar 4.50% + 1.75% haji' },
      { label: 'Amaran BNM diabaikan', value: '6 surat', sub: '2014–2017, tanpa kesan' },
      { label: 'Pelaburan bermasalah', value: '14 entiti', sub: 'saranan audit forensik' },
      { label: 'Premium UJSB', value: 'RM10.2b', sub: 'aset RM19.9b dibeli nilai pasaran RM9.7b' },
      { label: 'Deposit hilang 2019', value: 'RM4b', sub: 'RM73b → RM69b selepas hibah 1.25%' }
    ];
    tData.forEach(function (t) {
      tiles.appendChild(VB.statTile(t));
    });
    wrap.appendChild(tiles);

    /* ALIRAN CERITA — 4 kotak naratif */
    var flow = h('div', 'flow');
    var flows = [
      { n: '1', t: 'Tadbir urus lemah', b: 'Kuasa Menteri terlalu luas, ahli politik memegang jawatan Lembaga, dan panel semakan seperti Panel Pelaburan tidak dikanunkan — boleh dibubarkan sesuka hati. Kepakaran Menteri Hal Ehwal Agama hanya bidang agama, bukan kewangan.', k: 'tadbir' },
      { n: '2', t: 'Hibah tinggi menutup krisis', b: 'Untuk mengekalkan bayaran hibah tinggi, LTH mengubah polisi rosot nilai dua kali dalam sehari (70%→85%→90%) supaya aset susut tidak direkodkan. RM1.31 bilion rosot nilai "hilang" menjadi RM1 juta. JAN (juruaudit kerajaan) memberikan sijil audit bersih.', k: 'krisis' },
      { n: '3', t: 'Kerajaan menanggung beban', b: 'UJSB ditubuhkan Dis 2018 untuk ambil alih aset LTH pada premium RM10.2 bilion. Kerajaan komited RM17.8 bilion. Sukuk UJSB kini menyumbang 26% pendapatan LTH.', k: 'pemulihan' },
      { n: '4', t: 'Pembayar kos: pendeposit', b: 'Subsidi haji (HAFIS) naik dari RM106 juta (2014) ke unjuran RM742 juta (2030) — diambil dari keuntungan pelaburan, sekali gus menekan kadar hibah kepada pendeposit.', k: 'haji' }
    ];
    flows.forEach(function (f) {
      var box = h('div', 'flow-box');
      var n = h('span', 'flow-n'); n.textContent = f.n;
      var t = h('h3', 'flow-t'); t.textContent = f.t;
      var b = h('p', 'flow-b'); b.textContent = f.b;
      box.appendChild(n); box.appendChild(t); box.appendChild(b);
      flow.appendChild(box);
    });
    wrap.appendChild(flow);

    wrap.appendChild(insight('kaedah', 'Bagaimana gunakan dashboard ini',
      'Setiap seksyen menjawab satu persoalan utama. Mulakan dari "Gambaran Besar", kemudian gali "Krisis", "Hibah", "Pelaburan" dan seterusnya. Setiap carta ada butang "Jadual" untuk melihat nombor penuh, dan setiap angka diberi sumber halaman laporan. Ikut tab di bawah untuk bergerak.'));

    var meta = h('div', 'meta-box');
    var mT = h('h3', 'meta-t'); mT.textContent = 'Tentang siasatan ini';
    meta.appendChild(mT);
    var mGrid = grid(2);
    var metaRows = [
      ['Tempoh siasatan', '2014–2020 (laporan 2022)'],
      ['Saksi', RTH.meta.saksiAbs + ' Akuan Berkanun; ' + RTH.meta.saksiProsiding + ' memberi keterangan'],
      ['Tempoh kuat kuasa', '6 bulan (20 Jan – 19 Jul 2022)'],
      ['Metodologi', RTH.meta.metodologi.join(' · ')],
      ['Pesuruhjaya', RTH.meta.pesuruhjaya.map(function (p) { return p.n; }).join('; ')],
      ['Dibentangkan', '30 Ogos 2022 kepada Yang di-Pertuan Agong']
    ];
    metaRows.forEach(function (r) {
      var row = h('div', 'meta-row');
      var k = h('span', 'meta-k'); k.textContent = r[0];
      var v = h('span', 'meta-v'); v.textContent = r[1];
      row.appendChild(k); row.appendChild(v); mGrid.appendChild(row);
    });
    meta.appendChild(mGrid);
    wrap.appendChild(meta);

    s.appendChild(wrap);
    return s;
  }
});

/* ============================================================
   SEKSYEN 2 — KRISIS KEWANGAN 2017
   ============================================================ */
RTH.views.push({
  id: 'krisis', nav: 'Krisis Kewangan', render: function () {
    var s = section('krisis', 'Krisis Kewangan 2017',
      'Bila sebenarnya LTH muflis? Suruhanjaya mendapati jurang antara aset dan liabiliti (defisit) wujud sejak 2014 — bukan 2017. Ia disembunyikan melalui amalan perakaunan.');
    var wrap = h('div', 'wrap');

    /* WATERFALL P/L 2017 */
    wrap.appendChild(h('h3', 'subhead', 'Keuntungan yang menjadi kerugian (2017)'));
    var wf = VB.card({
      title: 'Jambatan keuntungan 2017 (PwC)',
      sub: 'LTH melapor untung RM3.4b, tetapi selepas pelarasan rosot nilai dan lain-lain, ia sebenarnya rugi RM1.4b.',
      src: srcTag(149), flag: 'fakta',
      head: ['Perkara', 'RM juta'],
      rows: [
        ['Keuntungan dilapor 2017', '3,412'], ['Tolak rosot nilai ekuiti', '−4,258'],
        ['Tolak rosot hutang', '−7'], ['Tolak pelarasan lain', '−580'],
        ['Kerugian terlaras', '−1,433']
      ],
      plot: function (el, sz) {
        VB.waterfall({
          el: el, w: sz.w, h: sz.h, unit: '', fmt: rmj,
          items: [
            { label: 'Untung dilapor', value: 3412, type: 'base' },
            { label: 'Rosot ekuiti', value: -4258, type: 'adj' },
            { label: 'Rosot hutang', value: -7, type: 'adj' },
            { label: 'Lain-lain', value: -580, type: 'adj' },
            { label: 'Kerugian sebenar', value: -1433, type: 'total' }
          ]
        });
      }
    });
    wrap.appendChild(wf);
    wrap.appendChild(insight('temuan', 'Selisih RM4.8 bilion adalah jurang antara cerita dan realiti',
      'Keuntungan dilapor RM3.412 bilion; kerugian sebenar RM1.433 bilion. Perbezaan datang terutamanya daripada RM4.258 bilion rosot nilai ekuiti yang tidak direkodkan mengikut piawaian MFRS. RM4.7 bilion lagi kerugian terkumpul telah dibawa ke hadapan.'));

    /* POSISI ASET vs LIABILITI */
    wrap.appendChild(h('h3', 'subhead', 'Defisit bermula sejak 2014'));
    var pos = VB.card({
      title: 'Aset vs Liabiliti LTH, 2013–2017',
      sub: 'Bar merah (negatif) = baki selepas bayar hibah. Sejak 2014, LTH belanja lebih daripada pendapatan.',
      src: srcTag(147), flag: 'fakta',
      head: ['Tahun', 'Aset (RMj)', 'Liabiliti (RMj)', 'Lebihan sebelum hibah', 'Baki selepas hibah'],
      rows: RTH.posisi.rows.map(function (r) {
        return [r.y, r.aset.toLocaleString('ms-MY'), r.liab.toLocaleString('ms-MY'), r.pra.toLocaleString('ms-MY'), r.pasca.toLocaleString('ms-MY')];
      }),
      plot: function (el, sz) {
        VB.barV({
          el: el, w: sz.w, h: sz.h, unit: '', fmt: rmj, stacked: false, max: 6000, legend: true,
          labels: RTH.posisi.rows.map(function (r) { return String(r.y); }),
          series: [
            { name: 'Lebihan sebelum hibah', color: C.s1, values: RTH.posisi.rows.map(function (r) { return r.pra; }) },
            { name: 'Baki selepas hibah', color: C.s8, values: RTH.posisi.rows.map(function (r) { return r.pasca; }) }
          ]
        });
      }
    });
    wrap.appendChild(pos);
    wrap.appendChild(insight('temuan', '2014 sudah "overdraw"',
      'Pada 2014, lebihan sebelum hibah hanya RM2.885 bilion tetapi hibah RM3.237 bilion dibayar — baki negatif RM352 juta. Defisit semakin dalam setiap tahun hingga 2017 (baki −RM4.093 bilion). Hibah tinggi bukan fenomena 2017; ia punca krisis sejak awal.'));

    /* ROSOT NILAI */
    wrap.appendChild(h('h3', 'subhead', 'Polisi rosot nilai diubah dua kali dalam sehari'));
    var rosot = VB.card({
      title: 'Rosot nilai 2017 mengikut ambang polisi',
      sub: 'LTH mengubah ambang rosot nilai daripada 70% → 85% → 90%. Kesannya: rosot nilai akhir cuma RM1 juta berbanding RM1.31 bilion yang patut direkod.',
      src: srcTag([148, 116]), flag: 'fakta',
      head: ['Polisi', 'Sumber', 'Rosot nilai (RM juta)'],
      rows: [
        ['Ikut FRS 139 (patut)', 'JAN', '1,310'], ['Ambang lama >70%', 'PwC', '1,313'],
        ['Diubah → >85%', 'PwC', '171'], ['Diubah lagi → >90%', 'PwC', '1']
      ],
      plot: function (el, sz) {
        VB.barH({
          el: el, w: sz.w, h: sz.h, unit: '', fmt: rmj,
          data: [
            { label: 'Ikut FRS 139', value: 1310, color: C.s1 },
            { label: 'Ambang >70%', value: 1313, color: C.s1 },
            { label: 'Ambang >85%', value: 171, color: C.s4 },
            { label: 'Ambang >90%', value: 1, color: ST.critical }
          ]
        });
      }
    });
    wrap.appendChild(rosot);
    wrap.appendChild(insight('peringatan', 'Ambang dinaikkan bukan untuk ketepatan, tetapi untuk hasil',
      'Kedua-dua perubahan polisi berlaku dalam tempoh sehari tahun kewangan 2017. RM1,310 juta rosot nilai aset kewangan "hilang" menjadi RM1 juta. Ini juga membabitkan RM227.81 juta pelaburan subsidiari yang tidak dirosotkan — termasuk TH Heavy Engineering RM164.58 juta. Garis panduan FRSIC kata: kerugian "signifikan" bila nilai jatuh 20%, "berlanjutan" bila lebih 12 bulan.'));

    /* JAMBATAN RAV */
    wrap.appendChild(h('h3', 'subhead', 'Asas hibah: nilai khayalan atau nilai sebenar?'));
    var rav = VB.card({
      title: 'Uplift RAV 2017: RM4.466 bilion nilai tambah "anggaran"',
      sub: 'Untuk kelihatan mematuhi seksyen 22, LTH guna RAV (nilai boleh direalisasi) bukan nilai audit. Dari nilai hartanah RM4.6b, hanya RM556 juta disahkan penilai profesional — selebihnya RM4.044 bilion anggaran pengurusan.',
      src: srcTag([116, 113]), flag: 'fakta',
      head: ['Komponen', 'RM juta'],
      rows: [
        ['Aset ikut audit', '70,317'], ['Uplift RAV', '+4,466'],
        ['Aset RAV', '74,783'], ['Liabiliti', '−74,410'],
        ['Baki bersih (RAV)', '373'], ['Baki bersih ikut audit (rujukan PwC)', '−4,093']
      ],
      plot: function (el, sz) {
        VB.barH({
          el: el, w: sz.w, h: sz.h, unit: '', fmt: rmj, negative: true,
          data: [
            { label: 'Baki ikut audit', value: -4093, color: ST.critical, sub: 'PwC: liabiliti bersih sebenar 2017' },
            { label: 'Baki ikut RAV', value: 373, color: C.s3, sub: 'Yang digunakan untuk sahkan hibah' }
          ]
        });
      }
    });
    wrap.appendChild(rav);
    wrap.appendChild(insight('temuan', 'RAV menjadikan yang muflis kelihatan bertahan',
      'Menggunakan RAV, baki bersih LTH 2017 = RM373 juta positif. Menggunakan nilai audit sebenar, LTH rugi RM4.093 bilion. RAV dibina atas RM4.044 bilion "anggaran pengurusan" hartanah yang tidak disahkan penilai.'));

    s.appendChild(wrap);
    return s;
  }
});

/* ============================================================
   SEKSYEN 3 — HIBAH & DEPOSIT
   ============================================================ */
RTH.views.push({
  id: 'hibah', nav: 'Hibah & Deposit', render: function () {
    var s = section('hibah', 'Hibah & Deposit',
      'Hibah ialah agihan keuntungan kepada pendeposit. Kadarnya dinaikkan untuk menarik pendeposit — sehingga menjadi beban yang memakan rizab dan mencetuskan "bank run" kecil pada 2019.');
    var wrap = h('div', 'wrap');

    /* KADAR HIBAH */
    var kadar = VB.card({
      title: 'Kadar hibah tahunan & hibah haji, 2014–2021',
      sub: 'Jatuh mendadak pada 2018 (1.25%) selepas LTH diletakkan di bawah BNM. Sebelum itu LTH membayar sehingga 6.25% walaupun tidak mampu.',
      src: srcTag([120, 130]), flag: 'fakta',
      head: ['Tahun', 'Hibah tahunan (%)', 'Hibah haji (%)'],
      rows: RTH.hibah.kadar.rows.map(function (r) {
        return [r.y, r.t + '%', r.h == null ? '—' : r.h + '%'];
      }),
      plot: function (el, sz) {
        VB.barV({
          el: el, w: sz.w, h: sz.h, unit: '', fmt: function (v) { return v + '%'; }, stacked: true, max: 9, legend: true,
          labels: RTH.hibah.kadar.rows.map(function (r) { return String(r.y); }),
          series: [
            { name: 'Hibah tahunan', color: C.s1, values: RTH.hibah.kadar.rows.map(function (r) { return r.t; }) },
            { name: 'Hibah haji', color: C.s4, values: RTH.hibah.kadar.rows.map(function (r) { return r.h || 0; }) }
          ]
        });
      }
    });
    wrap.appendChild(kadar);
    wrap.appendChild(insight('temuan', 'Pembayaran hibah didorong politik, bukan kemampuan',
      'Suruhanjaya mendapati keputusan hibah, bayaran haji dan HAFIS "didorong oleh unsur-unsur politik". Untuk memenuhi jangkaan pendeposit yang mencari pulangan tinggi, LTH melabur lebih berisiko dan mengabaikan asas.'));

    /* JUMLAH HIBAH + POSISI */
    var jum = VB.card({
      title: 'Jumlah hibah dibayar vs lebihan pendapatan',
      sub: 'Bilakah LTH mula membelanjakan lebih daripada pendapatannya? Jawapan: 2014. Bar merah (baki negatif) = bahagian yang dicatat dari rizab/defisit.',
      src: srcTag([147, 130]), flag: 'fakta',
      head: ['Tahun', 'Lebihan sebelum hibah (RMj)', 'Hibah dibayar (RMj)', 'Baki'],
      rows: RTH.posisi.rows.map(function (r) {
        return [r.y, r.pra.toLocaleString('ms-MY'), r.agihan.toLocaleString('ms-MY'), r.pasca.toLocaleString('ms-MY')];
      }),
      plot: function (el, sz) {
        VB.line({
          el: el, w: sz.w, h: sz.h, unit: '', fmt: rmj, legend: true, direct: false,
          labels: RTH.posisi.rows.map(function (r) { return String(r.y); }),
          series: [
            { name: 'Lebihan sebelum hibah', color: C.s3, values: RTH.posisi.rows.map(function (r) { return r.pra; }) },
            { name: 'Hibah dibayar', color: C.s2, values: RTH.posisi.rows.map(function (r) { return r.agihan; }) },
            { name: 'Baki selepas hibah', color: ST.critical, values: RTH.posisi.rows.map(function (r) { return r.pasca; }) }
          ]
        });
      }
    });
    wrap.appendChild(jum);
    wrap.appendChild(insight('temuan', 'Garis hijau (pendapatan) di bawah garis oren (hibah) sejak 2015',
      'Selepas 2015, hibah dibayar melebihi pendapatan setiap tahun. Baki selepas hibah (merah) terus mencelup negatif. Inilah punca rizab LTH menyusut dan akhirnya krisis 2017.'));

    /* DEPOSIT */
    var dep = VB.card({
      title: 'Saiz deposit LTH dan "bank run" 2019',
      sub: 'Apabila hibah 2018 diumumkan pada kadar rendah 1.25%, pendeposit beramai-ramai menarik wang: deposit jatuh dari RM73 bilion ke RM69 bilion. LTH bernasib baik kerana kesannya lebih kecil daripada dikhuatiri.',
      src: srcTag([122, 123, 171]), flag: 'fakta',
      head: ['Titik', 'Bila', 'Deposit (RM bilion)'],
      rows: [
        ['Sebelum hibah 1.25%', 'Awal 2019', '73'], ['Akhir 2019', 'Dis 2019', '69'],
        ['Akhir 2020', 'Dis 2020', '76'], ['Semasa laporan', 'Mei 2022', '88'],
        ['Unjuran LTH', '~2024', '100']
      ],
      plot: function (el, sz) {
        VB.line({
          el: el, w: sz.w, h: sz.h, unit: '', fmt: function (v) { return 'RM' + v + ' bilion'; }, area: true, direct: true,
          labels: RTH.deposit.titik.map(function (t) { return t.label; }),
          series: [{ name: 'Deposit', color: C.s1, values: RTH.deposit.titik.map(function (t) { return t.v; }) }]
        });
      }
    });
    wrap.appendChild(dep);

    /* TUMPUAN DEPOSIT */
    var fokus = grid(2);
    var t1 = VB.card({
      title: '65% pendeposit simpan ≤ RM2,000',
      sub: 'Kebanyakan pendeposit LTH ialah rakyat biasa dengan simpanan kecil.',
      src: srcTag([208, 216]), flag: 'fakta'
    });
    t1.appendChild(VB.meter({ label: 'Pendeposit simpanan ≤ RM2,000', value: '65%', pct: 65, color: C.s1 }));
    fokus.appendChild(t1);
    var t2 = VB.card({
      title: '75% deposit dipegang 5% pendeposit',
      sub: 'Ini bermakna LTH bergantung kepada segelintir pendeposit besar yang boleh menarik keluar wang bila-bila masa.',
      src: srcTag([208, 216]), flag: 'fakta'
    });
    t2.appendChild(VB.meter({ label: 'Deposit dipegang 5% pendeposit teratas', value: '75%', pct: 75, color: C.s2 }));
    fokus.appendChild(t2);
    wrap.appendChild(fokus);
    wrap.appendChild(insight('peringatan', 'Risiko "bank run" adalah isu struktur',
      'Apabila 75% deposit dipegang 5% pendeposit, keputusan hibah rendah boleh mencetuskan penarikan besar-besaran. LTH memerlukan minimum RM60 bilion deposit untuk menampung HAFIS pada tahap semasa — dan kebergantungan kepada pendeposit besar makin bertambah.'));

    s.appendChild(wrap);
    return s;
  }
});

/* ============================================================
   SEKSYEN 4 — KOS HAJI & HAFIS
   ============================================================ */
RTH.views.push({
  id: 'hafis', nav: 'Kos Haji & HAFIS', render: function () {
    var s = section('hafis', 'Kos Haji & Bantuan Kewangan Haji (HAFIS)',
      'Jemaah haji membayar RM9,980 sejak 2009 — dibekukan 13 tahun — manakala kos sebenar naik setiap tahun. Jurang ini ditanggung LTH melalui HAFIS, diambil dari keuntungan pelaburan.');
    var wrap = h('div', 'wrap');

    var tiles = h('div', 'stat-grid');
    var tData = [
      { label: 'Bayaran jemaah (beku 13 tahun)', value: 'RM9,980', sub: '2009–2021' },
      { label: 'Kos haji 2022', value: 'RM25,540', sub: 'per jemaah Muassasah' },
      { label: 'Subsidi 2022', value: 'RM12,560', sub: '49% kos ditanggung LTH' },
      { label: 'Unjuran subsidi 2030', value: 'RM742 juta', sub: 'setahun, jika bayaran dikekalkan' }
    ];
    tData.forEach(function (t) { tiles.appendChild(VB.statTile(t)); });
    wrap.appendChild(tiles);

    /* KOS vs BAYARAN */
    var kos = VB.card({
      title: 'Kos haji sebenar vs bayaran jemaah',
      sub: 'Kos naik, bayaran beku. 2020–2021 tiada haji (pandemik). Bahagian 2022–2030 adalah unjuran LTH.',
      src: srcTag([204, 205]), flag: 'fakta + unjuran',
      head: ['Tahun', 'Kos (RM)', 'Bayaran (RM)', 'Subsidi (RM)'],
      rows: RTH.hafis.sejarah.map(function (r) {
        return [r.y, r.kos.toLocaleString('ms-MY'), r.bayaran.toLocaleString('ms-MY'), (r.kos - r.bayaran).toLocaleString('ms-MY')];
      }).concat(RTH.hafis.unjuran.map(function (r) {
        return [r.y + ' (unj)', r.kos.toLocaleString('ms-MY'), r.bayaran.toLocaleString('ms-MY'), (r.kos - r.bayaran).toLocaleString('ms-MY')];
      })),
      plot: function (el, sz) {
        var labels = RTH.hafis.sejarah.map(function (r) { return String(r.y); })
          .concat(RTH.hafis.unjuran.map(function (r) { return String(r.y); }));
        var kosV = RTH.hafis.sejarah.map(function (r) { return r.kos; })
          .concat(RTH.hafis.unjuran.map(function (r) { return r.kos; }));
        var bayarV = RTH.hafis.sejarah.map(function (r) { return r.bayaran; })
          .concat(RTH.hafis.unjuran.map(function (r) { return r.bayaran; }));
        VB.line({
          el: el, w: sz.w, h: sz.h, unit: '', legend: true, direct: true, yFmt: function (v) { return 'RM' + (v / 1000).toFixed(1) + 'k'; },
          labels: labels,
          series: [
            { name: 'Kos sebenar', color: C.s2, values: kosV },
            { name: 'Bayaran jemaah', color: C.s3, values: bayarV }
          ]
        });
      }
    });
    wrap.appendChild(kos);
    wrap.appendChild(insight('temuan', 'Jurang subsidi makin menganga — dan ia dibayar oleh pendeposit',
      'Jurang antara kos dan bayaran membesar dari RM6,175 (2014) ke RM12,560 (2022) dan unjuran RM24,749 (2030) per jemaah. HAFIS diambil dari keuntungan pelaburan LTH — setiap ringgit subsidi adalah ringgit yang tidak dapat diagihkan sebagai hibah kepada pendeposit.'));

    /* JUMLAH HAFIS */
    var jum = VB.card({
      title: 'Jumlah HAFIS ditanggung LTH',
      sub: 'Naik hampir 3 kali ganda dari 2014 ke 2019, dan diunjurkan mencecah RM742 juta setahun pada 2030.',
      src: srcTag([204, 205]), flag: 'fakta + unjuran',
      head: ['Tahun', 'HAFIS (RM juta)'],
      rows: RTH.hafis.sejarah.map(function (r) { return [r.y, r.jumlahJuta.toLocaleString('ms-MY')]; })
        .concat(RTH.hafis.unjuran.map(function (r) { return [r.y + ' (unj)', Math.round(r.jumlahRibu / 1000).toLocaleString('ms-MY')]; })),
      plot: function (el, sz) {
        var labels = RTH.hafis.sejarah.map(function (r) { return String(r.y); })
          .concat(RTH.hafis.unjuran.map(function (r) { return String(r.y); }));
        var vals = RTH.hafis.sejarah.map(function (r) { return r.jumlahJuta; })
          .concat(RTH.hafis.unjuran.map(function (r) { return Math.round(r.jumlahRibu / 1000); }));
        VB.barV({
          el: el, w: sz.w, h: sz.h, unit: '', fmt: rmj, max: 800,
          labels: labels,
          series: [{ name: 'HAFIS', color: C.s2, values: vals }]
        });
      }
    });
    wrap.appendChild(jum);

    /* GILIRAN & CADANGAN */
    var gilir = grid(2);
    var g1 = VB.card({
      title: 'Giliran menunggu haji',
      sub: 'Beku bayaran + deposit minima rendah = ramai beratur, giliran makin panjang.',
      src: srcTag([208, 209]), flag: 'fakta'
    });
    g1.appendChild(VB.meter({ label: 'Giliran semasa', value: '135 tahun', pct: 100, color: ST.critical }));
    g1.appendChild(VB.meter({ label: 'Cadangan selepas pembaharuan', value: '33 tahun', pct: 24, color: C.s3 }));
    gilir.appendChild(g1);
    var g2 = VB.card({
      title: 'Deposit minima & kuota',
      sub: 'Cadangan RCI: naikkan deposit minima dari RM1,300 ke RM12,980 untuk memendekkan giliran.',
      src: srcTag([207, 236, 210]), flag: 'fakta'
    });
    g2.appendChild(VB.meter({ label: 'Deposit minima sekarang', value: 'RM1,300', pct: 10, color: ST.warn }));
    g2.appendChild(VB.meter({ label: 'Cadangan', value: 'RM12,980', pct: 100, color: C.s1 }));
    g2.appendChild(VB.meter({ label: 'Kuota jemaah sekarang', value: '30,000', pct: 50, color: C.s4 }));
    g2.appendChild(VB.meter({ label: 'Sasaran 2030', value: '60,000', pct: 100, color: C.s3 }));
    gilir.appendChild(g2);
    wrap.appendChild(gilir);

    wrap.appendChild(insight('persoalan', 'Apakah yang berlaku jika HAFIS tidak dikawal?',
      'Kos haji naik ~5% setahun, bayaran jemaah beku. Pada 2030, HAFIS boleh mencecah 65% daripada kos haji. LTH perlu cari lebih banyak pendapatan — atau kurangkan hibah — yang bermakna pendeposit biasa menanggung subsidi secara tidak langsung.'));

    s.appendChild(wrap);
    return s;
  }
});

/* ============================================================
   SEKSYEN 5 — PELABURAN BERMASALAH
   ============================================================ */
RTH.views.push({
  id: 'pelaburan', nav: 'Pelaburan Bermasalah', render: function () {
    var s = section('pelaburan', '14 Pelaburan Bermasalah',
      'Suruhanjaya mengesyorkan audit forensik ke atas 14 entiti. Ada yang dihapus kira penuh, ada yang melibatkan laporan polis dan prosiding mahkamah. Rugi beratus hingga berbillion ringgit.');
    var wrap = h('div', 'wrap');

    wrap.appendChild(insight('peringatan', 'Jangan keliru antara angka',
      'Angka "rugi" di bawah ialah rosot nilai/kerugian yang direkod atau dianggarkan — bukan semestinya wang tunai yang hilang. Sesetengah entiti belum selesai prosiding undang-undang. Lihat kolum "Status" untuk kedudukan sebenar.'));

    /* FILTER STATUS */
    var filterRow = h('div', 'filter-row');
    var fLab = h('span', 'filter-label'); fLab.textContent = 'Tapis status:';
    filterRow.appendChild(fLab);
    var chips = h('div', 'chips');
    var statusOrder = ['semua', 'polis', 'mahkamah', 'timbangtara', 'selesai', 'hapus', 'pantau'];
    var statLabels = { semua: 'Semua', polis: 'Laporan polis', mahkamah: 'Mahkamah', timbangtara: 'Timbangtara', selesai: 'Selesai', hapus: 'Hapus kira', pantau: 'Pemantauan' };
    var state = { filter: 'semua' };
    statusOrder.forEach(function (st) {
      var c = h('button', 'chip' + (st === 'semua' ? ' chip-active' : ''));
      c.type = 'button'; c.textContent = statLabels[st];
      c.addEventListener('click', function () {
        state.filter = st;
        chips.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('chip-active'); });
        c.classList.add('chip-active');
        renderTable();
      });
      chips.appendChild(c);
    });
    filterRow.appendChild(chips);
    wrap.appendChild(filterRow);

    /* KAD PELABURAN */
    var list = h('div', 'invest-list');
    function renderTable() {
      list.innerHTML = '';
      var data = RTH.pelaburan.filter(function (p) {
        return state.filter === 'semua' || p.status === state.filter;
      });
      data.forEach(function (p) {
        var card = h('article', 'invest-card');
        var top = h('div', 'invest-top');
        var name = h('h4', 'invest-name'); name.textContent = p.n;
        var st = h('span', 'st st-' + p.status); st.textContent = RTH.pelaburanStatus[p.status];
        top.appendChild(name); top.appendChild(st);
        card.appendChild(top);

        var meta2 = h('div', 'invest-meta');
        [['Sektor', p.sektor], ['Lokasi', p.lokasi], ['Cara', p.modus], ['Pegangan', p.pegangan]].forEach(function (m) {
          var row = h('div', 'invest-meta-row');
          var k = h('span', 'k'); k.textContent = m[0];
          var v = h('span', 'v'); v.textContent = m[1];
          row.appendChild(k); row.appendChild(v);
          meta2.appendChild(row);
        });
        card.appendChild(meta2);

        var body = h('div', 'invest-body');
        var isu = h('p', 'invest-isu'); isu.textContent = 'Masalah: ' + p.isu;
        body.appendChild(isu);
        var angka = h('ul', 'invest-angka');
        p.angka.forEach(function (a) { var li = h('li'); li.textContent = a; angka.appendChild(li); });
        body.appendChild(angka);
        var tind = h('p', 'invest-tindakan'); tind.textContent = 'Tindakan: ' + p.tindakan;
        body.appendChild(tind);
        card.appendChild(body);

        var foot = h('div', 'invest-foot');
        if (p.rugiRm != null) {
          var r = h('span', 'invest-rugi');
          r.textContent = 'Rugi/rosot nilai: ' + fmtB(p.rugiRm * 1e6);
          foot.appendChild(r);
        }
        var src = h('span', 'invest-src'); src.textContent = srcTag(p.src);
        foot.appendChild(src);
        card.appendChild(foot);
        list.appendChild(card);
      });
      if (!data.length) {
        var none = h('p', 'invest-none'); none.textContent = 'Tiada entiti untuk status ini.';
        list.appendChild(none);
      }
    }
    renderTable();
    wrap.appendChild(list);

    /* BARH RUGI */
    var rugi = VB.card({
      title: 'Rosot nilai / kerugian direkod (entiti dengan angka)',
      sub: 'Tinggi ke rendah. FGV dipegang sehingga harga jatuh, kemudian dipindah ke UJSB pada harga kos — kerugian ditanggung kerajaan.',
      src: srcTag([177, 193]), flag: 'fakta',
      head: ['Entiti', 'Rugi (RM juta)'],
      rows: RTH.pelaburan.filter(function (p) { return p.rugiRm != null; })
        .sort(function (a, b) { return b.rugiRm - a.rugiRm; })
        .map(function (p) { return [p.n, p.rugiRm.toLocaleString('ms-MY')]; }),
      plot: function (el, sz) {
        var data = RTH.pelaburan.filter(function (p) { return p.rugiRm != null; })
          .sort(function (a, b) { return b.rugiRm - a.rugiRm; });
        var colors = {
          fgv: C.s8, trurich: ST.critical, thmarine: ST.critical, alrawda: ST.serious,
          ppb: ST.serious, dssb: ST.serious, thp: ST.serious, abraj: C.s4,
          wellspring: C.s4, emrail: C.s4, alfareeda: C.s4, thprop: C.s4, thip: C.s4, thhr: C.s4
        };
        VB.barH({
          el: el, w: sz.w, h: sz.h, unit: '', fmt: rmj,
          data: data.map(function (p) {
            return { label: p.n, value: p.rugiRm, color: colors[p.id] || C.s1, sub: p.sektor };
          })
        });
      }
    });
    wrap.appendChild(rugi);
    wrap.appendChild(insight('temuan', 'FGV: RM1.06 bilion kerugian yang dipindah kepada kerajaan',
      'LTH melanggan IPO FGV pada RM4.58/unit (2012) dan terus memegang sehingga harga jatuh ke RM0.885. "Bertasib baik" kerana UJSB mengambil alih pada harga kos — kerugian RM1.1 bilion dibawa ke UJSB (ditanggung kerajaan), bukan direkod oleh LTH.'));

    s.appendChild(wrap);
    return s;
  }
});

/* ============================================================
   SEKSYEN 6 — UJSB & PEMULIHAN
   ============================================================ */
RTH.views.push({
  id: 'ujsb', nav: 'UJSB & Pemulihan', render: function () {
    var s = section('ujsb', 'UJSB & Pelan Pemulihan',
      'Urusharta Jamaah (UJSB) ditubuhkan Dis 2018 untuk "selamatkan" LTH: aset bermasalah dipindah keluar, diganti dengan sukuk kerajaan. Persoalannya: adakah ia menangani punca atau hanya memindahkan beban kepada kerajaan?');
    var wrap = h('div', 'wrap');

    var tiles = h('div', 'stat-grid');
    var tData = [
      { label: 'Aset dipindah ke UJSB', value: 'RM19.9b', sub: 'nilai pasaran sebenar RM9.7b' },
      { label: 'Premium dibayar kerajaan', value: 'RM10.2b', sub: 'di atas nilai pasaran' },
      { label: 'Komitmen kerajaan', value: 'RM17.8b', sub: 'RM500j + RM17.3b (RMK-12/13)' },
      { label: 'Sumbangan sukuk kepada pendapatan LTH', value: '26%', sub: 'hasil pengakruan sukuk UJSB' }
    ];
    tData.forEach(function (t) { tiles.appendChild(VB.statTile(t)); });
    wrap.appendChild(tiles);

    wrap.appendChild(insight('temuan', 'Sukuk UJSB = risiko terbesar LTH',
      'Hasil pengakruan sukuk UJSB menyumbang 26% pendapatan tahunan LTH, melebihi satu pertiga jumlah agihan hibah. "Kegagalan atau kekangan dalam melunaskan obligasi UJSB merupakan risiko terbesar LTH" — boleh meruncingkan kedudukan kewangan LTH dan sistemik kepada negara.'));

    /* PEMINDAHAN ASET DUMBBELL */
    var dum = VB.card({
      title: 'Nilai dipindah vs nilai pasaran (Dis 2018)',
      sub: 'LTH memindah aset pada nilai RM19.9b tetapi nilai pasaran ketika itu cuma RM9.7b. Beza RM10.2b ialah premium yang akhirnya ditanggung kerajaan.',
      src: srcTag([159, 162, 163]), flag: 'fakta',
      head: ['Komponen', 'Nilai pindah (RMj)', 'Nilai pasaran (RMj)'],
      rows: RTH.ujsb.pemindahan.rows.map(function (r) {
        return [r.k, r.pindah.toLocaleString('ms-MY'), r.pasaran.toLocaleString('ms-MY')];
      }).concat([['Jumlah', '19,900', '9,729']]),
      plot: function (el, sz) {
        VB.dumbbell({
          el: el, w: sz.w, h: sz.h, unit: 'RM',
          aName: 'Nilai pindah', bName: 'Nilai pasaran',
          aColor: C.s2, bColor: C.s8,
          rows: RTH.ujsb.pemindahan.rows.map(function (r) {
            return { label: r.k, a: r.pindah / 1000, b: r.pasaran / 1000 };
          })
        });
      }
    });
    wrap.appendChild(dum);

    /* SUKUK */
    var suk = VB.card({
      title: 'Sukuk UJSB — prinsipal vs nilai nominal',
      sub: 'UJSB menerbitkan sukuk berkupon sifar yang dilanggan penuh oleh LTH. Nilai nominal lebih tinggi daripada prinsipal — perbezaan itulah pulangan LTH bila matang.',
      src: srcTag([159, 162, 163]), flag: 'fakta',
      head: ['Siri', 'Prinsipal (RM bilion)', 'Nilai nominal (RM bilion)', 'Tempoh', 'Pulangan matang'],
      rows: RTH.ujsb.sukuk.siri.map(function (r) {
        return [r.n, r.prinsipal, r.nominal, r.tempoh + ' tahun', r.ytm + '%'];
      }),
      plot: function (el, sz) {
        VB.barV({
          el: el, w: sz.w, h: sz.h, unit: 'RM', max: 15,
          labels: RTH.ujsb.sukuk.siri.map(function (r) { return r.n; }),
          labels2: RTH.ujsb.sukuk.siri.map(function (r) { return r.tempoh + ' thn, ' + r.ytm + '%'; }),
          series: [
            { name: 'Prinsipal', color: C.s1, values: RTH.ujsb.sukuk.siri.map(function (r) { return r.prinsipal / 1000; }) },
            { name: 'Nilai nominal', color: C.s4, values: RTH.ujsb.sukuk.siri.map(function (r) { return r.nominal / 1000; }) }
          ]
        });
      }
    });
    wrap.appendChild(suk);
    wrap.appendChild(insight('peringatan', 'Sukuk tanpa jaminan kerajaan',
      'Sukuk UJSB TIDAK dijamin kerajaan — hanya "Surat Sokongan Kewangan" (letter of comfort) Menteri Kewangan. Ciri: berkupon sifar, tiada penarafan, tidak boleh diniagakan, unsecured. RM300 juta tunai dibayar kepada LTH: RM100j (Dis 2019) + RM200j (Dis 2020).'));

    /* BLUE-CHIP */
    var blue = VB.card({
      title: 'Saham blue-chip dipindah: nilai pindah vs pasaran',
      sub: 'Harga semasa (Jun 2022) menunjukkan betapa jauh nilai saham jatuh. TM jatuh 60.9%, Axiata 39.5% daripada harga pindah.',
      src: srcTag([162, 163]), flag: 'fakta',
      head: ['Saham', 'Harga pindah (RM)', 'Harga pasaran Dis 18 (RM)', 'Jun 22 (RM)', 'Jatuh (%)'],
      rows: RTH.bluechip.rows.map(function (r) {
        return [r.k, r.pindah, r.pasaran, r.jun22, '-' + r.jatuhPct + '%'];
      }),
      plot: function (el, sz) {
        VB.barV({
          el: el, w: sz.w, h: sz.h, unit: 'RM', max: 8,
          labels: RTH.bluechip.rows.map(function (r) { return r.k; }),
          series: [
            { name: 'Harga pindah', color: C.s1, values: RTH.bluechip.rows.map(function (r) { return r.pindah; }) },
            { name: 'Pasaran Dis 2018', color: C.s4, values: RTH.bluechip.rows.map(function (r) { return r.pasaran; }) },
            { name: 'Jun 2022', color: ST.critical, values: RTH.bluechip.rows.map(function (r) { return r.jun22; }) }
          ]
        });
      }
    });
    wrap.appendChild(blue);

    /* HARTA & ROFR */
    var hart = VB.card({
      title: 'Hartanah UJSB — nilai pindah vs pasaran Dis 2021',
      sub: 'Semua kategori hartanah jatuh nilai berbanding nilai pindah.',
      src: srcTag([161]), flag: 'fakta',
      head: ['Jenis', 'Nilai pindah (RMj)', 'Pasaran Dis 21 (RMj)'],
      rows: RTH.hartanahUjsb.rows.map(function (r) {
        return [r.k, Math.round(r.pindah / 1e6).toLocaleString('ms-MY'), Math.round(r.pasaran / 1e6).toLocaleString('ms-MY')];
      }),
      plot: function (el, sz) {
        VB.dumbbell({
          el: el, w: sz.w, h: sz.h, unit: 'RM',
          aName: 'Nilai pindah', bName: 'Pasaran Dis 2021',
          aColor: C.s1, bColor: C.s8,
          rows: RTH.hartanahUjsb.rows.map(function (r) {
            return { label: r.k, a: r.pindah / 1e6, b: r.pasaran / 1e6 };
          })
        });
      }
    });
    wrap.appendChild(hart);

    /* KOMITMEN KERAJAAN — jadual bar (hanya UJSB diserlah) */
    var komRows = [
      ['DanaInfra Nasional', 72320, 76020], ['Prasarana Malaysia', 38914, 38914],
      ['Malaysia Rail Link', 21530, 23177], ['Urusharta Jamaah', 20683, 21097],
      ['Suria Strategic Energy', 6951, 7276], ['GovCo Holdings', 7200, 5700],
      ['Jambatan Kedua', 5528, 5514], ['Turus Pesawat', 5310, 5310],
      ['MKD Kencana', 3500, 4500], ['SRC Kencana', 2485, 1785],
      ['Sentuhan Budiman', 800, 750], ['TRX City', 253, 192],
      ['Assets Global Network', 253, 202]
    ];
    var kom = VB.card({
      title: 'Komitmen Jaminan Kerajaan kepada UJSB',
      sub: 'UJSB antara penerima jaminan kerajaan terbesar (RM juta). Garis penuh = bar UJSB; garis putus = DanaInfra, untuk perbandingan skala.',
      src: srcTag([165]), flag: 'fakta',
      head: ['Entiti', '2020 (RM juta)', '2021 (RM juta)'],
      rows: komRows.map(function (r) { return [r[0], r[1].toLocaleString('ms-MY'), r[2].toLocaleString('ms-MY')]; }),
      plot: function (el, sz) {
        var data = komRows.map(function (r) {
          return { label: r[0], value: r[2], color: r[0] === 'Urusharta Jamaah' ? C.s2 : 'var(--muted-ink)', sub: '2021' };
        });
        VB.barH({ el: el, w: sz.w, h: sz.h, unit: '', fmt: rmb, max: 80000, data: data });
      }
    });
    wrap.appendChild(kom);

    wrap.appendChild(insight('temuan', 'Kerajaan komited RM17.8 bilion untuk selamatkan LTH',
      'Jemaah Menteri (5 Apr 2019) meluluskan RM17.8 bilion: RM500 juta (2020, RMK-11) dan RM17.3 bilion (~RM1.73b/tahun) di bawah RMK-12 & RMK-13. Namun 2021, RM1.5 bilion yang diluluskan Belanjawan tidak diterima UJSB — keutamaan Covid-19.'));

    s.appendChild(wrap);
    return s;
  }
});

/* ============================================================
   SEKSYEN 7 — BONUS & SARAAN
   ============================================================ */
RTH.views.push({
  id: 'bonus', nav: 'Bonus & Saraan', render: function () {
    var s = section('bonus', 'Bonus & Saraan',
      'Ketika krisis semakin dalam, bonus eksekutif LTH kekal tinggi. Ada bonus dibayar tanpa kelulusan — dan Suruhanjaya mengesyorkan ia dipulangkan.');
    var wrap = h('div', 'wrap');

    /* BONUS TREND */
    var bon = VB.card({
      title: 'Peruntukan bonus kakitangan LTH, 2010–2020',
      sub: 'Puncak pada 2014 (RM74 juta) dan 2015 (RM65 juta) — ketika defisit sudah bermula. Jatuh mendadak 2018 selepas krisis terdedah.',
      src: srcTag([137, 139]), flag: 'fakta',
      head: ['Tahun', 'Peruntukan (RMj)', 'Kadar'],
      rows: RTH.bonus.rows.map(function (r) {
        return [r.y, r.peruntukan.toLocaleString('ms-MY'), r.kadar];
      }),
      plot: function (el, sz) {
        VB.barV({
          el: el, w: sz.w, h: sz.h, unit: '', fmt: rmj, max: 80,
          labels: RTH.bonus.rows.map(function (r) { return String(r.y); }),
          series: [{ name: 'Peruntukan bonus', color: C.s1, values: RTH.bonus.rows.map(function (r) { return r.peruntukan; }) }]
        });
      }
    });
    wrap.appendChild(bon);
    wrap.appendChild(insight('temuan', 'Bonus tinggi dibayar walaupun krisis bermula',
      'Panduan (Pekeliling WP 7.2) kata bonus tidak melebihi 2 bulan gaji. Pada 2014, ada penerima sehingga 13 bulan gaji (1–11 + 2 bulan khas). Nilai bonus 2014 (RM74j) ialah 2.5% daripada untung 2014 (RM2,979j) — lebih tinggi daripada panduan. Percanggahan: jadual sebut RM61j vs RM65j untuk 2015.'));

    /* BONUS KHAS TH PROPERTIES */
    var b2017 = VB.card({
      title: 'Bonus khas TH Properties 2017 — RM1.15 juta',
      sub: 'Dibayar tanpa kelulusan LTH (pemegang ekuiti). Melanggar Seksyen 230(2) & 230(4) Akta Syarikat 2016. Suruhanjaya: dapatkan semula bonus ini.',
      src: srcTag([141, 142, 143, 144]), flag: 'fakta',
      head: ['Penerima', 'Jawatan', 'RM'],
      rows: RTH.bonusKhas.y2017.penerima.map(function (r) {
        return [r.n, r.jw, r.v.toLocaleString('ms-MY')];
      }),
      plot: function (el, sz) {
        VB.barH({
          el: el, w: sz.w, h: sz.h, unit: '', fmt: rmk,
          data: RTH.bonusKhas.y2017.penerima.slice(0, 8).map(function (r) {
            return { label: r.n, value: r.v / 1000, color: C.s2, sub: r.jw };
          })
        });
      }
    });
    wrap.appendChild(b2017);

    var b2018 = VB.card({
      title: 'Bonus khas THP Australia 2018 — RM1.05 juta',
      sub: 'Diluluskan Lembaga 23 Apr 2018, tetapi Mesyuarat Agong cuma 30 Nov 2018 (7 bulan selepas). Melanggar Seksyen 230(3) Akta Syarikat 2016.',
      src: srcTag([141, 142, 143, 144]), flag: 'fakta',
      head: ['Penerima', 'Jawatan', 'RM'],
      rows: RTH.bonusKhas.y2018.penerima.map(function (r) {
        return [r.n, r.jw, r.v.toLocaleString('ms-MY')];
      }),
      plot: function (el, sz) {
        VB.barH({
          el: el, w: sz.w, h: sz.h, unit: '', fmt: rmk,
          data: RTH.bonusKhas.y2018.penerima.slice(0, 8).map(function (r) {
            return { label: r.n, value: r.v / 1000, color: C.s4, sub: r.jw };
          })
        });
      }
    });
    wrap.appendChild(b2018);
    wrap.appendChild(insight('temuan', 'Jumlah gabungan bonus tanpa kelulusan: RM2.19 juta',
      'RM1,148,400 (TH Properties 2017) + RM1,045,000 (THP Australia 2018) = RM2,193,400. Penerima termasuk Pengerusi dan Pengarah yang hadir mesyuarat meluluskan bonus untuk diri sendiri. TH Properties juga dalam senarai 14 entiti audit forensik (bonus tanpa kelulusan).'));

    s.appendChild(wrap);
    return s;
  }
});

/* ============================================================
   SEKSYEN 8 — TADBIR URUS
   ============================================================ */
RTH.views.push({
  id: 'tadbir', nav: 'Tadbir Urus', render: function () {
    var s = section('tadbir', 'Tadbir Urus',
      'Kuasa tertumpu pada seorang Menteri, ahli politik memegang jawatan utama, dan pengurusan berlapis dalam puluhan anak syarikat. Amaran demi amaran diabaikan.');
    var wrap = h('div', 'wrap');

    /* TIMELINE JAWATAN */
    wrap.appendChild(h('h3', 'subhead', 'Siapa memegang jawatan bila'));
    var tl = h('div', 'role-timeline');
    RTH.jawatan.siri.forEach(function (siri) {
      var row = h('div', 'role-row');
      var lab = h('span', 'role-label'); lab.textContent = siri.k;
      row.appendChild(lab);
      var track = h('div', 'role-track');
      var start = 2006, end = 2023;
      var span = end - start;
      siri.orang.forEach(function (o) {
        var oStart = new Date(o.dari).getFullYear() + (new Date(o.dari).getMonth()) / 12;
        var oEnd = o.hingga ? new Date(o.hingga).getFullYear() + (new Date(o.hingga).getMonth()) / 12 : end;
        var left = (oStart - start) / span * 100;
        var width = Math.max(2, (oEnd - oStart) / span * 100);
        var bar = h('span', 'role-bar');
        bar.style.left = left + '%'; bar.style.width = width + '%';
        if (o.politik) bar.classList.add('role-politik');
        if (o.khas) bar.classList.add('role-khas');
        if (o.tamatAwal) bar.classList.add('role-tamat');
        bar.title = o.n + ' (' + o.dari.slice(0, 7) + ' → ' + (o.hingga ? o.hingga.slice(0, 7) : 'kini') + ')';
        bar.addEventListener('click', function () {
          VB.tip.show({ clientX: 20, clientY: 60 }, [
            { lab: o.n, val: o.dari.slice(0, 7) + ' → ' + (o.hingga ? o.hingga.slice(0, 7) : 'kini') },
            { lab: '', val: o.politik ? 'Ahli politik' : (o.tamatAwal ? 'Ditamatkan awal tanpa sebab' : (o.khas ? 'Memegang kuasa sementara' : '')) }
          ]);
        });
        track.appendChild(bar);
      });
      row.appendChild(track);
      tl.appendChild(row);
    });
    wrap.appendChild(tl);
    wrap.appendChild(insight('temuan', 'Dua penamatan awal tanpa sebab',
      'KPE Nik Hasyudeen ditamatkan 5 Mei 2021 (sepatutnya 31 Ogos 2021) dan Pengerusi Md Nor ditamatkan 15 Okt 2021 — kedua-duanya melalui kuasa seksyen 6(5) Akta 535 yang membenarkan Menteri membatalkan pelantikan tanpa sebab. Suruhanjaya: peruntukan ini tidak lagi sesuai.'));

    /* POLITIK */
    wrap.appendChild(h('h3', 'subhead', 'Ahli politik dalam Lembaga'));
    var pol = grid(3);
    RTH.politik.orang.forEach(function (p) {
      var c = h('div', 'pol-card');
      var n = h('h4'); n.textContent = p.n;
      var r = h('p', 'pol-role'); r.textContent = p.peranan;
      var p2 = h('p', 'pol-politik'); p2.textContent = 'Latar politik: ' + p.politik;
      c.appendChild(n); c.appendChild(r); c.appendChild(p2);
      pol.appendChild(c);
    });
    wrap.appendChild(pol);
    wrap.appendChild(insight('temuan', 'Penglibatan politik menjejaskan kredibiliti LTH',
      'Suruhanjaya: pertembungan politik menyebabkan keputusan LTH dijadikan bahan kritikan dan menjejaskan kredibiliti. Seksyen 6(2) hanya memerlukan calon itu Muslim dan warganegara Malaysia — tanpa kriteria kepakaran.'));

    /* ANAK SYARIKAT */
    var anak = VB.card({
      title: 'Pegangan jawatan anak syarikat (bilangan)',
      sub: 'CFO Kumpulan memegang 23 jawatan pengarah anak syarikat serentak. Ismee Ismail terus memegang 3 jawatan hampir 2 tahun selepas tamat perkhidmatan.',
      src: srcTag([84, 90]), flag: 'fakta',
      head: ['Nama', 'Peranan', 'Bil. jawatan anak syarikat'],
      rows: RTH.anakSyarikat.orang.map(function (o) {
        return [o.n, o.peranan, o.bil];
      }),
      plot: function (el, sz) {
        VB.barH({
          el: el, w: sz.w, h: sz.h, unit: '', max: 25,
          data: RTH.anakSyarikat.orang.map(function (o) {
            return { label: o.n, value: o.bil, color: C.s1, sub: o.peranan };
          })
        });
      }
    });
    wrap.appendChild(anak);
    wrap.appendChild(insight('peringatan', 'Konflik kepentingan berlapis',
      'Penglibatan berlebihan menyebabkan kurang fokus kepada tugas hakiki dan menimbulkan konflik kepentingan. Suruhanjaya mencadangkan hadkan pegangan kepada maksimum 5 anak syarikat. Kes Rozaida (23 jawatan) termasuk Syarikat Takaful, BIMB Holdings, TH Heavy Engineering.'));

    /* KUASA MENTERI */
    var kuasa = VB.card({
      title: 'Kuasa Menteri Hal Ehwal Agama — kini vs cadangan',
      sub: 'Kuasa terlalu luas merangkumi pelaburan, dana dan haji. Suruhanjaya: Menteri Kewangan patut kawal kewangan, dana dan pelaburan.',
      src: srcTag([78, 81]), flag: 'fakta',
      head: ['Perkara', 'Kini', 'Cadangan'],
      rows: RTH.kuasaMenteri.senarai.map(function (r) {
        return [r.k, r.kini, r.cadang];
      })
    });
    wrap.appendChild(kuasa);

    /* AMARAN */
    wrap.appendChild(h('h3', 'subhead', 'Amaran yang diberi — dan yang diabaikan'));
    var am = VB.card({
      title: 'Kronologi amaran agensi & tindakan',
      sub: 'BNM menghantar 6 surat 2014–2017, Roland Berger meramal kerugian RM2.6b, KAN mencadang Pendapat Berteguran — semua sebelum krisis 2017. PwC (2018) akhirnya menjadi asas pemulihan.',
      src: srcTag([100, 213, 214, 147]), flag: 'fakta',
      head: ['Tarikh', 'Dari', 'Amaran', 'Hasil'],
      rows: RTH.amaran.map(function (a) {
        return [a.tarikh.slice(0, 10), a.dari, a.tajuk, RTH.amaranHasil[a.hasil].l];
      }),
      plot: function (el, sz) { }
    });
    /* amaran sebagai senarai kromologi */
    var amList = h('div', 'amaran-list');
    RTH.amaran.slice().sort(function (a, b) { return a.tarikh < b.tarikh ? -1 : 1; }).forEach(function (a) {
      var row = h('div', 'amaran-row amaran-' + RTH.amaranHasil[a.hasil].c);
      var d = h('span', 'amaran-date'); d.textContent = a.tarikh.slice(0, 7);
      var b = h('span', 'amaran-body');
      b.textContent = a.dari + ' — ' + a.tajuk;
      var r = h('span', 'amaran-hasil'); r.textContent = RTH.amaranHasil[a.hasil].l;
      row.appendChild(d); row.appendChild(b); row.appendChild(r);
      amList.appendChild(row);
    });
    am.querySelector('.chart-plot').appendChild(amList);
    wrap.appendChild(am);
    wrap.appendChild(insight('peringatan', 'KAN "ambil kira persepsi pendeposit" di luar skop audit',
      'KAN mengaku dalam surat 19 Dis 2018: Pendapat Berteguran dicadangkan tetapi ditukar kepada Pendapat Tanpa Teguran dengan "Emphasis of Matter" kerana bimbang kesannya pada persepsi pendeposit. Ini di luar skop audit. Suruhanjaya: JAN sepatutnya tidak memberi Sijil Audit Bersih untuk 2017.'));

    s.appendChild(wrap);
    return s;
  }
});

/* ============================================================
   SEKSYEN 9 — KRONOLOGI
   ============================================================ */
RTH.views.push({
  id: 'kronologi', nav: 'Kronologi', render: function () {
    var s = section('kronologi', 'Kronologi',
      'Garis masa peristiwa — dari penubuhan LTH (1951) hingga laporan RCI dibentangkan (2022). Tapis mengikut tema untuk fokus pada satu aliran cerita.');
    var wrap = h('div', 'wrap');

    var themes = RTH.kronologiTema;
    var filterRow = h('div', 'filter-row');
    var fLab = h('span', 'filter-label'); fLab.textContent = 'Tapis tema:';
    filterRow.appendChild(fLab);
    var chips = h('div', 'chips');
    var state = { theme: 'semua' };
    var allThemes = { semua: 'Semua' };
    for (var k in themes) allThemes[k] = themes[k];
    var keyList = Object.keys(allThemes);
    keyList.forEach(function (tk) {
      var c = h('button', 'chip' + (tk === 'semua' ? ' chip-active' : ''));
      c.type = 'button'; c.textContent = allThemes[tk];
      c.addEventListener('click', function () {
        state.theme = tk;
        chips.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('chip-active'); });
        c.classList.add('chip-active');
        renderTL();
      });
      chips.appendChild(c);
    });
    filterRow.appendChild(chips);
    wrap.appendChild(filterRow);

    var tlBox = h('div', 'chrono');
    function renderTL() {
      tlBox.innerHTML = '';
      var data = RTH.kronologi.filter(function (e) {
        return state.theme === 'semua' || e.tema === state.theme;
      });
      data.forEach(function (e) {
        var item = h('div', 'chrono-item chrono-' + e.tema);
        var d = h('span', 'chrono-date'); d.textContent = e.d;
        var dot = h('span', 'chrono-dot');
        var body = h('div', 'chrono-body');
        var t = h('h4', 'chrono-t'); t.textContent = e.t;
        var b = h('p', 'chrono-b'); b.textContent = e.b;
        var src = h('span', 'chrono-src'); src.textContent = srcTag(e.src);
        body.appendChild(t); body.appendChild(b); body.appendChild(src);
        item.appendChild(d); item.appendChild(dot); item.appendChild(body);
        tlBox.appendChild(item);
      });
      if (!data.length) {
        var none = h('p', 'chrono-none'); none.textContent = 'Tiada peristiwa untuk tema ini.';
        tlBox.appendChild(none);
      }
    }
    renderTL();
    wrap.appendChild(tlBox);
    wrap.appendChild(insight('kaedah', 'Baca kronologi sebagai satu cerita',
      'Perhatikan urutan: amaran (2014–2017) → krisis terdedah (2017–2018) → pemulihan UJSB (2018–2020) → penamatan jawatan (2021) → laporan (2022). Amaran demi amaran diabaikan sepanjang tempoh yang sama hibah tinggi dibayar.'));

    s.appendChild(wrap);
    return s;
  }
});

/* ============================================================
   SEKSYEN 10 — SYOR & KETELUSAN
   ============================================================ */
RTH.views.push({
  id: 'syor', nav: 'Syor & Sumber', render: function () {
    var s = section('syor', 'Syor & Sumber',
      'Cadangan Suruhanjaya untuk membaiki LTH, percanggahan dalam laporan yang perlu anda tahu, dan glosari istilah.');
    var wrap = h('div', 'wrap');

    wrap.appendChild(h('h3', 'subhead', 'Cadangan utama Suruhanjaya'));
    var katCol = { tadbir: ['Pindaan Akta 535', 'Pembahagian kuasa Menteri', 'Hadkan penglibatan anak syarikat', 'Dana Haji'], kawal: ['BNM tidak kawal selia sepenuhnya', 'Audit swasta'], forensik: ['Audit forensik 14 pelaburan'], wang: ['Hentikan bonus terlalu tinggi'], ujsb: ['Pelan Pemulihan & Sukuk', 'Dana Haji'], haji: ['Deposit & bayaran haji', 'Kuota haji & giliran'] };
    var syorGrid = h('div', 'syor-grid');
    RTH.syor.forEach(function (sy) {
      var c = h('div', 'syor-card');
      var top = h('div', 'syor-top');
      var t = h('h4', 'syor-t'); t.textContent = sy.t;
      var tag = h('span', 'syor-kat'); tag.textContent = RTH.syorKategori[sy.k];
      top.appendChild(t); top.appendChild(tag);
      c.appendChild(top);
      var ul = h('ul', 'syor-items');
      sy.items.forEach(function (it) { var li = h('li'); li.textContent = it; ul.appendChild(li); });
      c.appendChild(ul);
      var src = h('span', 'syor-src'); src.textContent = srcTag(sy.src);
      c.appendChild(src);
      syorGrid.appendChild(c);
    });
    wrap.appendChild(syorGrid);

    /* PERCANGGAHAN */
    wrap.appendChild(h('h3', 'subhead', 'Percanggahan angka dalam laporan'));
    wrap.appendChild(insight('kaedah', 'Data tidak sempurna — dan itu penting untuk diketahui',
      'Laporan sendiri mengandungi percanggahan angka. Suruhanjaya menyedari ini. Kami paparkan supaya anda tidak menganggap setiap nombor sebagai pasti. Ini bukan kegagalan dashboard; ini ketelusan.'));

    var perc = h('div', 'perc-list');
    RTH.percanggahan.forEach(function (p) {
      var card = h('div', 'perc-card');
      var t = h('h4', 'perc-t'); t.textContent = p.judul;
      var a = h('p', 'perc-a'); a.textContent = 'A: ' + p.a;
      var b = h('p', 'perc-b'); b.textContent = 'B: ' + p.b;
      var src = h('span', 'perc-src'); src.textContent = srcTag(p.src);
      card.appendChild(t); card.appendChild(a); card.appendChild(b); card.appendChild(src);
      perc.appendChild(card);
    });
    wrap.appendChild(perc);

    /* GLOSARI */
    wrap.appendChild(h('h3', 'subhead', 'Glosari — istilah diterangkan ringkas'));
    var glo = h('div', 'glo');
    RTH.glosari.forEach(function (g) {
      var det = h('details', 'glo-item');
      var sum = h('summary'); sum.textContent = g.t;
      var p = h('p'); p.textContent = g.d;
      det.appendChild(sum); det.appendChild(p);
      glo.appendChild(det);
    });
    wrap.appendChild(glo);

    /* SUMBER */
    wrap.appendChild(h('h3', 'subhead', 'Sumber & had dashboard'));
    var srcBox = h('div', 'src-box');
    var p1 = h('p');
    p1.textContent = 'Sumber utama: Laporan Suruhanjaya Siasatan Diraja bagi Menyiasat Isu Pengurusan dan Operasi Lembaga Tabung Haji 2014–2020, dibentangkan 30 Ogos 2022. Teks penuh OCR: github.com/SyahmiRafsan/rci-tabunghaji.';
    srcBox.appendChild(p1);
    var p2 = h('p');
    p2.textContent = 'Setiap angka dalam dashboard ini diberi rujukan halaman laporan. Tanda "terbitan" bermakna nilai dikira daripada data laporan (cth: rugi = kos − bayaran). Tanda "unjuran" bermakna unjuran LTH/Suruhanjaya, bukan fakta. Kami tidak mencipta data; hanya memaparkan dan menyusun.';
    srcBox.appendChild(p2);
    var p3 = h('p');
    p3.textContent = 'Had: laporan asal ialah hasil OCR, jadi sesetengah angka mungkin salah transkripsi. Laporan juga mengandungi percanggahan dalaman (lihat bahagian percanggahan). Prosiding siasatan dijalankan secara tertutup; sesetengah ekshibit diklasifikasikan rahsia.';
    srcBox.appendChild(p3);
    wrap.appendChild(srcBox);

    s.appendChild(wrap);
    return s;
  }
});
