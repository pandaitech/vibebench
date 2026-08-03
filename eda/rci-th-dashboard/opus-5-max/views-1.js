/* ==========================================================================
   views-1.js — Ringkasan · Ujian Kemampuan Hibah · Simulator Rosot Nilai
   ========================================================================== */
var V = (window.V = window.V || {});
var S = (window.S = window.S || {});

/* ========================== 1. RINGKASAN ================================= */
V.ringkasan = {
  nav: 'Ringkasan', kicker: 'Mula di sini',
  h1: 'Bagaimana tabung haji 8.6 juta orang jatuh ke dalam defisit — dan siapa yang tahu',
  desc: 'Peta jalan keseluruhan laporan RCI: lima peringkat cerita, angka teras, dan pintu masuk ke setiap analisis.',
  render: function () {
    var pos = RD.posisi.rows, r17 = pos[pos.length - 1];
    var lebih = L.derive.jumlahLebih(2014, 2017);
    var prem = L.derive.ujsbPremium();
    var h = '';

    /* ---- pembuka: tiga nombor ---- */
    h += '<div class="sec">';
    h += L.tiles([
      { l: 'Kedudukan LTH akhir 2017 selepas bayar hibah', v: L.rmj(r17.pasca), cls: 'neg',
        d: 'Aset kurang daripada liabiliti — bermakna kalau semua pendeposit minta duit serentak, aset tidak cukup.',
        tip: 'Analisis PwC: aset RM70,317 juta − liabiliti termasuk simpanan pendeposit RM71,086 juta = −RM769 juta sebelum hibah; selepas hibah RM3,324 juta menjadi −RM4,093 juta.' },
      { l: 'Hibah dibayar melebihi kemampuan, 2014–2017', v: L.rmj(lebih), cls: 'neg',
        d: 'Data terbitan: jumlah hibah yang dibayar tolak lebihan yang benar-benar ada setiap tahun.',
        tip: 'Kiraan kami: bagi setiap tahun, hibah dibayar − max(0, lebihan sebelum agihan). 2014: 352 · 2015: 3,086 · 2016: 2,871 · 2017: 3,324 (RM juta).' },
      { l: 'Premium yang Kerajaan bayar untuk menutup jurang', v: L.rmj(prem.atasPasaran), cls: 'neg',
        d: 'Aset dipindah ke UJSB pada RM19.9 bilion walaupun nilai pasarannya RM9.7 bilion.',
        tip: 'RM19,900 juta nilai pemindahan − RM9,729 juta nilai pasaran = RM10,171 juta premium, iaitu 2.05 kali nilai pasaran.' },
      { l: 'Jaminan Kerajaan ke atas deposit hari ini', v: 'RM88', u: 'bilion',
        d: 'Seksyen 24 Akta 535. Jika LTH gagal, jumlah ini menjadi tanggungan Kerajaan.',
        tip: 'Liabiliti pendeposit melebihi RM88 bilion setakat 21 Mei 2022 (ms 171, 235).' }
    ]);
    h += L.src([147, 159, 171], 'Sumber angka di atas');
    h += '</div>';

    /* ---- carta pembuka ---- */
    var cats = pos.map(function (r) { return String(r.y); });
    h += '<div class="sec"><h2>Satu carta, keseluruhan masalah</h2>' +
      '<p class="lead">Bar hijau/merah = berapa lebihan (atau kekurangan) yang LTH ada SEBELUM bayar hibah. ' +
      'Bar kelabu = berapa hibah yang LTH benar-benar bayar. Bila bar kelabu lebih tinggi daripada bar hijau, ' +
      'wang itu datang daripada tempat lain.</p>';
    h += L.card({
      t: 'Lebihan sebelum agihan vs hibah yang dibayar', badge: L.pv('fakta'),
      sub: 'Semua nilai dalam RM juta. Sumber: analisis PricewaterhouseCoopers yang dipetik Suruhanjaya.',
      body: L.svgBars({
        w: 620, h: 250, cats: cats, labels: true, band: .7,
        yfmt: function (v) { return L.rmjShort(v); },
        fmt: function (v) { return L.rmjShort(v); },
        series: [
          { name: 'Lebihan sebelum agihan hibah', data: pos.map(function (r) { return r.pra; }),
            color: 'var(--good)' },
          { name: 'Hibah yang dibayar', data: pos.map(function (r) { return -r.agihan; }), color: 'var(--neutral)', op: .85 }
        ],
        tip: function (i, j) {
          var r = pos[i];
          return j === 0
            ? r.y + ' · Lebihan sebelum agihan: ' + L.rmj(r.pra) + (r.pra < 0 ? ' (sudah defisit sebelum bayar apa-apa)' : '')
            : r.y + ' · Hibah dibayar: ' + L.rmj(-r.agihan) + ' → kedudukan akhir ' + L.rmj(r.pasca);
        },
        ann: [{ i: 2, t: '2015: lebihan tinggal RM134j' }]
      }, 620) +
        L.legend([{ c: 'var(--good)', l: 'Lebihan / kekurangan sebelum agihan' },
          { c: 'var(--neutral)', l: 'Hibah yang dibayar', op: .85 }]),
      note: '<b>Baca begini:</b> pada 2014 LTH ada lebihan RM2,885 juta tetapi membayar RM3,237 juta. ' +
        'Pada 2016 dan 2017 LTH <b>sudah</b> dalam kekurangan sebelum bayar apa-apa — tetapi masih membayar ' +
        'RM2,871 juta dan RM3,324 juta.',
      limit: 'Carta ini tidak memberitahu ke mana wang hibah itu pergi selain kepada pendeposit, dan tidak ' +
        'menunjukkan baki rizab setiap tahun (laporan tidak memberi angka itu).',
      p: [112, 147]
    });
    h += '</div>';

    /* ---- lima peringkat cerita ---- */
    var acts = [
      { n: 'PERINGKAT 1', cls: '', t: 'Tekanan: janji pulangan tinggi yang tidak boleh ditahan',
        b: 'Antara 2014 dan 2017 LTH membayar hibah 4.25%–6.25% setahun, lebih tinggi daripada bank Islam — ' +
          'walaupun deposit LTH dijamin Kerajaan, hanya dilabur dalam aset patuh syariah, zakatnya dibayar LTH, ' +
          'dan sebahagian keuntungannya sudah digunakan untuk subsidi haji. Suruhanjaya: LTH meletakkan diri ' +
          'dalam kelompok sama dengan ASB dan KWSP, "tidak mempunyai sebab untuk menerima tekanan untuk bersaing ' +
          'dengan kelompok-kelompok yang dipilihnya sendiri".',
        go: '#/deposit', goT: 'Lihat kadar hibah, deposit dan tindak balas pendeposit' },
      { n: 'PERINGKAT 2', cls: 'a2', t: 'Angka diubah supaya pembayaran itu kelihatan sah',
        b: 'Dua perkara berlaku. Pertama, LTH tidak menggunakan nilai aset dalam penyata kewangan yang diaudit; ' +
          'ia menggunakan anggaran pengurusan sendiri yang dipanggil RAV — menambah RM4,466 juta dan menukar ' +
          'defisit RM4,093 juta menjadi lebihan RM373 juta. Kedua, ambang rosot nilai dinaikkan dari 70% ke 85% ' +
          'lalu ke 90% dalam tempoh satu hari, mengecilkan rosot nilai yang perlu direkod dari RM1,313 juta ' +
          'kepada RM1 juta.',
        go: '#/rosot', goT: 'Cuba sendiri: gerakkan ambang rosot nilai' },
      { n: 'PERINGKAT 3', cls: 'a3', t: 'Amaran ada — enam surat BNM dan dua laporan Roland Berger',
        b: 'BNM menulis kepada LTH dan Menteri sekurang-kurangnya enam kali antara 2014 dan 2017. Roland Berger ' +
          'menyiapkan kajian yang menunjukkan model perniagaan berisiko dan menganggarkan kerugian RM2.6 bilion — ' +
          'sebelum hibah 2017 diisytiharkan. Suruhanjaya: surat-surat BNM "tidak mendapat perhatian yang sewajarnya", ' +
          'dan tiada rekod laporan Roland Berger pernah dibentangkan kepada Lembaga.',
        go: '#/amaran', goT: 'Siapa memberi amaran, bila, dan apa jadi selepas itu' },
      { n: 'PERINGKAT 4', cls: 'a4', t: 'Kerajaan menyelamat — dan memindahkan masalah ke masa hadapan',
        b: 'Pada Disember 2018, dalam masa kurang dua minggu, aset lemah LTH dipindahkan ke sebuah syarikat ' +
          'Kerajaan (UJSB) pada RM19.9 bilion — RM10.2 bilion di atas nilai pasaran. LTH menerima Sukuk berkupon ' +
          'sifar bernilai RM27.5 bilion, matang 2026 dan 2029. Setakat laporan ini, LTH hanya menerima tunai ' +
          'RM500 juta, dan Kerajaan menghantar RM500 juta daripada RM17.8 bilion yang dijanjikan.',
        go: '#/ujsb', goT: 'Bedah struktur penyelamatan dan risikonya' },
      { n: 'PERINGKAT 5', cls: 'a5', t: 'Masalah asas belum selesai: kos haji terus naik',
        b: 'Bayaran haji dibekukan pada RM9,980 selama 13 tahun sementara kos haji naik dari RM16,155 (2014) ke ' +
          'RM25,540 (2022). Beza itu ditanggung LTH daripada keuntungan pelaburan — bukan wang Kerajaan. ' +
          'Unjuran LTH sendiri: subsidi mencecah 65.6% daripada kos haji pada 2030, iaitu RM742 juta setahun.',
        go: '#/hafis', goT: 'Uji sendiri: berapa bayaran haji perlu naik' }
    ];
    h += '<div class="sec"><h2>Cerita dalam lima peringkat</h2>' +
      '<p class="lead">Setiap peringkat membawa anda ke paparan yang mengandungi buktinya.</p>';
    acts.forEach(function (a) {
      h += '<div class="act ' + a.cls + '"><span class="an">' + a.n + '</span><h3>' + a.t + '</h3>' +
        '<p>' + a.b + '</p><a class="go" href="' + a.go + '">' + a.goT + ' →</a></div>';
    });
    h += '</div>';

    /* ---- angka teras ---- */
    h += '<div class="sec"><h2>Angka teras dalam laporan</h2>' +
      '<p class="lead">Semua daripada laporan RCI. Tekan mana-mana kotak untuk penjelasan penuh.</p>';
    h += L.tiles([
      { l: 'Pendeposit LTH (22 Julai 2022)', v: '8.6', u: 'juta', d: 'Turun daripada ~9.3 juta pada 2018.',
        tip: 'Laporan menyebut "lebih 9.2 juta" (ms 150) dan "hampir 9.3 juta" (ms 152) untuk 2018, dan 8.6 juta pada 22 Julai 2022 (ms 229).' },
      { l: 'Jemaah haji dibawa 1963–2021', v: '1.46', u: 'juta', d: 'Sejak PWSBH hingga LTH.',
        tip: 'ms 229. LTH mengenakan bayaran haji rendah dan menampung kos sebenar melalui subsidi.' },
      { l: 'Jumlah hibah diagih 1966–2021', v: 'RM37.5', u: 'bilion', d: 'Termasuk hibah haji.',
        tip: 'RM37.52 bilion (ms 229).' },
      { l: 'Jumlah subsidi haji (HAFIS) sejak 2001', v: 'RM2.02', u: 'bilion', d: 'Diambil daripada keuntungan pelaburan.',
        tip: 'ms 229. HAFIS bukan suntikan Kerajaan — ia datang daripada keuntungan yang sepatutnya boleh diagihkan kepada pendeposit.' },
      { l: 'Pelaburan bermasalah perlu audit forensik', v: '14', u: 'kes', d: 'Disenaraikan khusus dalam syor Suruhanjaya.',
        tip: 'ms 233–234. Dari perladangan Indonesia ke hotel di Makkah.' },
      { l: 'Laporan polis dibuat LTH', v: '4', d: '2 pada 30 Nov 2018, 1 pada 13 Dis 2018, 1 pada 16 Jan 2019.',
        tip: 'Dua daripadanya sudah dirujuk kepada Jabatan Peguam Negara.' },
      { l: 'Pegawai pengurusan dikenakan tindakan tatatertib', v: '5', d: 'Semua masih bertugas dengan LTH atau anak syarikatnya.',
        tip: 'Hukuman buang kerja dikurangkan kepada turun pangkat atau amaran pada peringkat rayuan (ms 198–200).' },
      { l: 'Syor Suruhanjaya', v: '33', d: 'Status pelaksanaan TIDAK diketahui daripada laporan ini.',
        tip: 'Bab Empat, perenggan 4.4.1 hingga 4.4.25 (beberapa mempunyai sub-perenggan).' }
    ]);
    h += '</div>';

    /* ---- cara guna ---- */
    h += '<div class="sec"><h2>Cara membaca dashboard ini</h2>';
    h += L.card({
      t: 'Empat jenis nombor — sentiasa dilabel', badge: '',
      body: '<div class="rb">' +
        '<div style="background:var(--accent-soft)"><strong style="color:var(--accent-ink)">Fakta laporan</strong>' +
        'Angka disalin terus daripada jadual atau ayat laporan RCI. Tiada perubahan.</div>' +
        '<div style="background:var(--neutral-soft)"><strong style="color:var(--neutral)">Data terbitan</strong>' +
        'Kiraan mudah yang <em>kami</em> buat daripada fakta laporan (tolak, bahagi, jumlah, peratus). ' +
        'Formulanya sentiasa ditunjukkan.</div>' +
        '<div style="background:var(--warn-soft)"><strong style="color:var(--warn)">Unjuran laporan</strong>' +
        'Ramalan masa hadapan yang dibuat oleh LTH atau Suruhanjaya sendiri. Bukan sejarah — dan bukan ramalan kami.</div>' +
        '<div style="background:var(--sim-soft)"><strong style="color:var(--sim)">Simulasi anda</strong>' +
        'Berubah bila anda gerakkan slider atau tekan pilihan. Ini <em>bukan</em> dapatan RCI — ia alat untuk ' +
        'menguji andaian anda sendiri.</div></div>',
      note: 'Setiap kad membawa pautan <span class="src">ms 000 ↗</span> ke muka surat laporan asal. ' +
        'Perkataan bergaris putus-putus seperti ' + L.g('hibah') + ' boleh ditekan untuk penjelasan ringkas.'
    });
    h += L.card({
      t: 'Apa yang laporan ini TIDAK boleh beritahu kita',
      body: '<div class="rb">' + RD.had.slice(0, 4).map(function (x) {
        return '<div class="cannot"><strong>' + L.esc(x.t) + '</strong>' + L.esc(x.d) + '</div>';
      }).join('') + '</div>',
      note: '<a href="#/integriti">Lihat senarai penuh had data dan 14 percanggahan dalaman yang kami temui dalam laporan →</a>'
    });
    h += '</div>';
    return h;
  }
};

/* =================== 2. UJIAN KEMAMPUAN HIBAH ============================ */
V.hibah = {
  nav: 'Ujian hibah', kicker: 'Analisis teras',
  h1: 'Bolehkah LTH membayar hibah itu? Ujian undang-undang, tahun demi tahun',
  desc: 'Seksyen 22 Akta 535 hanya benarkan hibah dibayar jika aset tidak kurang daripada liabiliti. ' +
    'Paparan ini menjalankan ujian itu untuk setiap tahun — dan menunjukkan bagaimana ujian itu "lulus" ' +
    'apabila nilai aset diganti dengan anggaran pengurusan.',
  init: function () { if (S.hibahTahun == null) S.hibahTahun = '2017'; if (S.hibahAsas == null) S.hibahAsas = 'audit'; },
  render: function () {
    var pos = RD.posisi.rows, yr = +S.hibahTahun, r17 = pos[pos.length - 1];
    var r = pos.filter(function (x) { return x.y === yr; })[0] || r17;
    var mampu = L.derive.mampuHibah();
    var m = mampu.filter(function (x) { return x.y === yr; })[0];
    var lulus = r.pra >= 0 && r.pasca >= 0;
    var h = '';

    /* --- penerangan undang-undang --- */
    h += '<div class="sec">';
    h += L.card({
      t: 'Peraturannya sangat sederhana', badge: L.pv('fakta'),
      body: '<p class="csub"><b>' + L.g('seksyen 22', 'Seksyen 22(3)(a) Akta Tabung Haji 1995') + '</b> ' +
        'mengatakan: hibah tidak boleh diisytiharkan melainkan pada akhir tahun itu, <b>aset Kumpulan Wang ' +
        'tidak kurang daripada jumlah liabiliti</b> — dengan wang pendeposit dikira <em>seolah-olah</em> ' +
        'kena dibayar dengan serta-merta.</p>' +
        '<p class="csub">Sebabnya logik: LTH tiada modal sendiri seperti bank. Setiap ringgit yang dipegang, ' +
        'dilabur atau dibelanjakan mempengaruhi nilai aset yang menyandarkan nilai deposit. ' +
        'Kalau LTH rugi dan aset lebih rendah daripada liabiliti, apa yang dibayar kepada pendeposit ' +
        '<b>sebenarnya wang pendeposit sendiri</b> — bukan keuntungan.</p>' +
        '<p class="csub">Ada juga <b>seksyen 22(3)(b)</b>: aset Kumpulan Wang Rizab tidak boleh kurang ' +
        'daripada peratusan yang diluluskan Perbendaharaan. Suruhanjaya mendapati <b>Perbendaharaan tidak ' +
        'pernah meluluskan apa-apa baki minima</b>, walaupun wakil Perbendaharaan ada dalam Lembaga. ' +
        'Jadi separuh daripada ujian ini tidak pernah boleh dijalankan.',
      p: [103, 104, 126]
    });
    h += '</div>';

    /* --- ujian per tahun --- */
    h += '<div class="sec"><h2>Jalankan ujian: pilih tahun</h2>' +
      '<p class="lead">Angka daripada analisis PwC ke atas kedudukan kewangan LTH 2013–2017.</p>';
    h += '<div class="ctl">' + L.seg('hibahTahun', pos.map(function (x) { return { v: x.y, l: x.y }; }), S.hibahTahun) + '</div>';
    h += L.tiles([
      { l: 'Jumlah aset', v: L.rmj(r.aset), tip: 'Nilai aset seperti dilaporkan dalam penyata kewangan tahun ' + r.y + '.' },
      { l: 'Jumlah liabiliti (termasuk simpanan pendeposit)', v: L.rmj(-r.liabiliti),
        tip: 'Wang pendeposit dikira sebagai liabiliti — ia hutang LTH kepada pendeposit.' },
      { l: 'Ujian seksyen 22(3)(a): aset − liabiliti', v: L.rmj(r.pra), cls: r.pra >= 0 ? 'pos' : 'neg',
        tip: 'Kalau angka ini negatif, hibah sepatutnya tidak boleh diisytiharkan sama sekali.' },
      { l: 'Hibah yang dibayar', v: L.rmj(-r.agihan), cls: 'neg',
        tip: 'Termasuk hibah tahunan dan hibah haji.' }
    ]);
    h += '<div style="height:8px"></div>';
    h += L.tiles([
      { l: 'Kedudukan akhir tahun selepas bayar hibah', v: L.rmj(r.pasca), cls: r.pasca >= 0 ? 'pos' : 'neg',
        tip: 'Lebihan/kekurangan aset berbanding liabiliti selepas hibah diagihkan.' },
      { l: 'Hibah yang LTH sebenarnya mampu bayar', v: L.rmj(m.mampu), cls: 'pos',
        d: 'Data terbitan: max(0, lebihan sebelum agihan)',
        tip: 'Kalau lebihan sebelum agihan negatif, kemampuan sebenar ialah sifar — kerana aset sudah kurang daripada liabiliti.' },
      { l: 'Lebihan bayaran', v: L.rmj(m.lebih), cls: m.lebih > 0 ? 'neg' : 'pos',
        d: 'Data terbitan: hibah dibayar − kemampuan',
        tip: 'Bagi ' + r.y + ': ' + L.rmj(m.bayar) + ' dibayar − ' + L.rmj(m.mampu) + ' mampu = ' + L.rmj(m.lebih) + '.' },
      { l: 'Kadar hibah diisytiharkan', v: (function () {
        var k = RD.hibahKadar.rows.filter(function (x) { return x.y === r.y; })[0];
        return k ? L.pct(k.tahunan, 2) : '—';
      })(), d: (function () {
        var k = RD.hibahKadar.rows.filter(function (x) { return x.y === r.y; })[0];
        return k && k.haji ? '+ ' + L.pct(k.haji, 2) + ' hibah haji' : (r.y === 2013 ? 'tiada dalam laporan' : '');
      })(), tip: 'Kadar hibah tahunan diisytiharkan bagi tahun ' + r.y + '.' }
    ], 't4');
    h += lulus
      ? L.verdict('pass', 'Ujian ' + r.y + ': LULUS', 'Aset melebihi liabiliti sebelum <b>dan</b> selepas hibah. ' +
        'Ini keadaan yang sepatutnya berlaku setiap tahun.')
      : L.verdict('fail', 'Ujian ' + r.y + ': GAGAL',
        r.pra < 0
          ? 'Aset <b>sudah</b> kurang daripada liabiliti sebelum apa-apa hibah dibayar (' + L.rmj(r.pra) + '). ' +
            'Di bawah seksyen 22(3)(a), hibah sepatutnya tidak boleh diisytiharkan sama sekali. LTH tetap membayar ' +
            L.rmj(-r.agihan) + '.'
          : 'Aset melebihi liabiliti sebanyak ' + L.rmj(r.pra) + ' sahaja, tetapi hibah yang dibayar ' +
            L.rmj(-r.agihan) + ' — iaitu ' + L.num(m.bayar / Math.max(1, m.mampu), 1) + ' kali lebih besar. ' +
            'Kedudukan akhir tahun menjadi ' + L.rmj(r.pasca) + '.');
    h += L.src([112, 147, 120], 'Sumber ujian ini');
    h += '</div>';

    /* --- carta mampu vs bayar --- */
    var cats = pos.map(function (x) { return String(x.y); });
    h += '<div class="sec"><h2>Lima tahun, satu pandangan</h2>';
    h += L.card({
      t: 'Kemampuan sebenar vs hibah yang dibayar', badge: L.pvs('fakta', 'terbit'),
      sub: 'Bar hijau ialah data terbitan: max(0, lebihan sebelum agihan). Bar kelabu ialah fakta laporan.',
      body: L.svgBars({
        w: 620, h: 250, cats: cats, labels: true, band: .68,
        yfmt: L.rmjShort, fmt: L.rmjShort,
        series: [
          { name: 'Mampu bayar (terbitan)', data: mampu.map(function (x) { return x.mampu; }), color: 'var(--good)' },
          { name: 'Benar-benar dibayar', data: mampu.map(function (x) { return x.bayar; }), color: 'var(--neutral)', op: .85 },
          { name: 'Lebihan bayaran (terbitan)', data: mampu.map(function (x) { return Math.max(0, x.lebih); }), color: 'var(--bad)' }
        ],
        tip: function (i, j) {
          var x = mampu[i];
          return [x.y + ' · Mampu: ' + L.rmj(x.mampu), x.y + ' · Dibayar: ' + L.rmj(x.bayar),
            x.y + ' · Lebihan: ' + L.rmj(Math.max(0, x.lebih))][j];
        }
      }, 620) +
        L.legend([{ c: 'var(--good)', l: 'Mampu bayar' }, { c: 'var(--neutral)', l: 'Dibayar', op: .85 },
          { c: 'var(--bad)', l: 'Lebihan bayaran' }]),
      note: '<b>Jumlah lebihan bayaran 2014–2017 = ' + L.rmj(L.derive.jumlahLebih()) + '</b> (data terbitan). ' +
        'Bandingkan dengan dua angka laporan sendiri: Suruhanjaya menyebut "kerugian yang dialami LTH ' +
        'meningkat kepada RM10 bilion", dan premium yang digunakan untuk menutup jurang ialah RM10.2 bilion. ' +
        'Tiga jalan berbeza tiba di sekitar angka yang sama.',
      limit: 'Jumlah RM9.63 bilion ini <b>bukan</b> angka daripada laporan. Ia kiraan kami dan ia menganggap ' +
        'kemampuan tahunan = lebihan sebelum agihan, tanpa mengambil kira rizab yang mungkin boleh digunakan ' +
        'secara sah. Laporan tidak memberi baki rizab tahunan, jadi kami tidak boleh mengujinya.',
      p: [147, 149]
    });
    h += '</div>';

    /* --- jambatan RAV --- */
    var rav = RD.rav2017;
    h += '<div class="sec"><h2>Bagaimana defisit RM4.09 bilion jadi lebihan RM373 juta</h2>' +
      '<p class="lead">Ini bahagian paling penting dalam keseluruhan cerita. Untuk tahun 2017, LTH ' +
      'tidak menggunakan nilai aset dalam penyata kewangan yang diaudit. Ia menggunakan anggarannya sendiri, ' +
      'dipanggil ' + L.g('RAV') + '.</p>';
    h += '<div class="ctl">' + L.seg('hibahAsas', [
      { v: 'audit', l: 'Ikut penyata kewangan diaudit' },
      { v: 'rav', l: 'Ikut RAV pengurusan' }
    ], S.hibahAsas) + '</div>';
    if (S.hibahAsas === 'rav') {
      h += L.card({
        t: 'Kiraan LTH untuk 2017 menggunakan RAV', badge: L.pv('fakta'),
        sub: 'Jadual seperti dalam laporan PwC yang dipetik Suruhanjaya (ms 116).',
        body: L.svgWaterfall({
          w: 600, h: 280, fmt: L.rmjShort, yfmt: L.rmjShort,
          rows: [
            { k: 'Jumlah aset', v: rav.aset, total: true, color: 'var(--neutral)',
              tip: 'Aset seperti dalam penyata kewangan: ' + L.rmj(rav.aset) },
            { k: 'Tambah anggaran RAV', v: rav.uplift, color: 'var(--warn)',
              tip: 'Nilai tambahan yang dianggarkan pengurusan: ' + L.rmj(rav.uplift) + '. ' + rav.upliftNota },
            { k: 'Tolak liabiliti', v: -rav.liabiliti, color: 'var(--bad)',
              tip: 'Termasuk deposit pendeposit dan hibah yang hendak diagihkan: ' + L.rmj(rav.liabiliti) },
            { k: 'Nilai bersih untuk diagih', v: rav.bersih, total: true, color: 'var(--good)',
              tip: 'Keputusan: lebihan ' + L.rmj(rav.bersih) + ' → ujian seksyen 22 "lulus"' }
          ]
        }, 600),
        note: '<b>Semak sendiri:</b> RM70,317j + RM4,466j = RM74,783j. Tolak liabiliti RM74,410j = <b>+RM373 juta</b>. ' +
          'Perhatikan juga: liabiliti di sini (RM74,410j) ialah liabiliti dalam penyata kewangan (RM71,086j) ' +
          '<b>campur</b> hibah RM3,324j yang hendak diagihkan. Kedua-dua angka itu berbaki tepat.',
        limit: 'Angka RM4,466 juta bukan penilaian bebas. PwC mendapati kiraan RAV ialah <b>anggaran pengurusan LTH</b>, ' +
          'bukan harga pasaran untuk saham tersenarai dan bukan penilaian profesional bebas untuk hartanah.',
        p: [116, 113]
      });
      var thp = rav.thp;
      h += L.card({
        t: 'Sebanyak mana RAV itu benar-benar dinilai penilai bertauliah?', badge: L.pvs('fakta', 'terbit'),
        sub: 'Contoh yang diberi PwC: komponen TH Plantations dalam RAV 2017 berjumlah ' + L.rmj(thp.jumlahDalamRav) +
          ', berdasarkan penilaian hartanah ' + L.rmj(thp.asasPenilaian) + '.',
        body: L.svgStack100({
          w: 700, h: 50, segs: [
            { k: 'Penilaian penilai profesional bertauliah', short: 'Penilai bertauliah ' + L.rmj(thp.olehPenilaiBertauliah),
              v: thp.olehPenilaiBertauliah, color: 'var(--good)',
              tip: L.rmj(thp.olehPenilaiBertauliah) + ' — ' + L.pct(thp.olehPenilaiBertauliah / thp.asasPenilaian * 100) + ' daripada asas penilaian' },
            { k: 'Anggaran pengurusan semata-mata', short: 'Anggaran pengurusan ' + L.rmj(thp.olehAnggaranPengurusan),
              v: thp.olehAnggaranPengurusan, color: 'var(--bad)',
              tip: L.rmj(thp.olehAnggaranPengurusan) + ' — ' + L.pct(thp.olehAnggaranPengurusan / thp.asasPenilaian * 100) + ' daripada asas penilaian' }
          ]
        }),
        note: 'Data terbitan: <b>' + L.pct(thp.olehAnggaranPengurusan / thp.asasPenilaian * 100) + '</b> daripada asas ' +
          'penilaian ini hanyalah anggaran pengurusan. Suruhanjaya juga bertanya soalan yang tidak pernah dijawab: ' +
          'bagaimana EY boleh mengaudit penilaian yang tidak berasaskan nilai yang ditentukan penilai profesional?',
        p: [113, 114]
      });
    } else {
      h += L.card({
        t: 'Kiraan yang sama untuk 2017, guna penyata kewangan diaudit', badge: L.pv('fakta'),
        body: L.svgWaterfall({
          w: 600, h: 280, fmt: L.rmjShort, yfmt: L.rmjShort,
          rows: [
            { k: 'Jumlah aset', v: r17.aset, total: true, color: 'var(--neutral)', tip: 'Aset diaudit: ' + L.rmj(r17.aset) },
            { k: 'Tiada anggaran RAV', v: 0, color: 'var(--line)', tip: 'Tiada nilai tambahan ditambah.' },
            { k: 'Tolak liabiliti', v: r17.liabiliti, color: 'var(--bad)', tip: 'Liabiliti termasuk simpanan pendeposit: ' + L.rmj(-r17.liabiliti) },
            { k: 'Kekurangan sebelum hibah', v: r17.pra, total: true, color: 'var(--bad)', tip: 'Kekurangan: ' + L.rmj(r17.pra) },
            { k: 'Tolak hibah dibayar', v: r17.agihan, color: 'var(--bad)', tip: 'Hibah 2017: ' + L.rmj(-r17.agihan) },
            { k: 'Kedudukan akhir 2017', v: r17.pasca, total: true, color: 'var(--bad)', tip: 'Kekurangan akhir tahun: ' + L.rmj(r17.pasca) }
          ]
        }, 600),
        note: '<b>Perbezaan keputusan:</b> guna penyata kewangan diaudit → kekurangan ' + L.rmj(r17.pasca) + ', ' +
          'ujian seksyen 22 GAGAL. Guna RAV → lebihan ' + L.rmj(rav.bersih) + ', ujian "LULUS". ' +
          'Satu perbezaan RM' + L.num(rav.bersih - r17.pasca, 0) + ' juta datang daripada satu keputusan penilaian.',
        p: [147, 116]
      });
      h += L.verdict('info', 'Tekan "Ikut RAV pengurusan" di atas',
        'untuk melihat jambatan yang menukar kekurangan ini menjadi lebihan — dan berapa banyak daripadanya ' +
        'benar-benar dinilai penilai bertauliah.');
    }
    h += '</div>';

    /* --- kaedah kiraan --- */
    var kh = RD.kaedahHibah2017;
    h += '<div class="sec"><h2>Satu lagi tukar suai: kaedah kiraan baki deposit</h2>';
    h += L.card({
      t: '2017: baki minima tahunan vs baki minima bulanan', badge: L.pv('fakta'),
      sub: 'Sebelum hibah dikira, LTH perlu pilih baki deposit mana hendak digunakan. Pilihan itu mengubah ' +
        'jumlah bayaran dengan ketara.',
      body: L.svgDumbbell({
        w: 700, labelW: 130, rowH: 44, la: 'Baki minima TAHUNAN', lb: 'Baki minima BULANAN',
        xfmt: L.rmjShort, valW: 74,
        ca: 'var(--good)', cb: 'var(--bad)', min: 0, max: 3600,
        rows: [
          { k: 'Jumlah hibah', a: kh.mampuBakiTahunan.jumlah, b: kh.dibayarBakiBulanan.jumlah,
            note: '+' + L.rmj(kh.tambahanDana),
            tip: 'JAN: kemampuan LTH hanya RM2.70 bilion pada kadar 4% (baki minima tahunan). ' +
              'Lembaga memilih baki minima bulanan pada 6.25% → RM3.31 bilion. ' +
              'Pertambahan dana RM0.61 bilion, iaitu 22.5%.' }
        ]
      }),
      note: 'Kadar 4% → 6.25% dan kaedah tahunan → bulanan menambah <b>' + L.rmj(kh.tambahanDana) +
        '</b> (' + L.pct(kh.tambahanPeratus) + ') kepada bayaran hibah 2017. ' +
        'Pada 7 Februari 2018 LTH mengumumkan pertukaran ke kaedah baki tahunan — tetapi menariknya balik ' +
        'selepas reaksi negatif pendeposit, dan kembali kepada kaedah bulanan. ' +
        'Ini menyebabkan lebihan wang ' + L.rmj(kh.lebihanKeluar) + ' dikeluarkan untuk hibah 2017.',
      limit: 'Kedua-dua kaedah ini adalah kaedah pengiraan yang sah dalam industri. Isunya bukan kaedah itu ' +
        'sendiri, tetapi bahawa kaedah dipilih SELEPAS mengetahui jumlah yang hendak dibayar — dan ' +
        'bahawa asas asetnya tidak mencukupi untuk kedua-dua kaedah.',
      p: [115, 131]
    });
    h += '</div>';

    h += '<div class="sec">' + L.readBlocks(
      '<ul style="margin:0;padding-left:18px"><li>Bagi 2016 dan 2017, aset LTH kurang daripada liabiliti ' +
      '<b>sebelum</b> sebarang hibah dibayar — ini fakta yang diakui JAN sendiri.</li>' +
      '<li>Hibah 2014–2017 dibayar berdasarkan RAV, bukan penyata kewangan diaudit. RCI menyimpulkan ini ' +
      '"tidak selaras dengan kehendak seksyen 22 Akta 535".</li>' +
      '<li>Suruhanjaya menyimpulkan bahawa apa yang dibayar kepada pendeposit dalam keadaan itu ' +
      '"sebenarnya adalah penggunaan wang pendeposit dan bukannya pengagihan keuntungan".</li></ul>',
      '<ul style="margin:0;padding-left:18px"><li>Kita <b>tidak boleh</b> menyimpulkan setiap pendeposit ' +
      'kehilangan wang. Deposit tetap dijamin Kerajaan dan nilai setiap ringgit deposit kekal.</li>' +
      '<li>Kita <b>tidak boleh</b> mengira lebihan bayaran dengan tepat mengambil kira rizab, kerana ' +
      'laporan tidak memberi baki rizab tahunan.</li>' +
      '<li>Kita <b>tidak boleh</b> mengatakan RAV itu sendiri haram — isunya ia digunakan sebagai asas ' +
      'bayaran hibah, sedangkan EY sendiri menyatakan laporan Proforma bukan untuk tujuan itu.</li></ul>'
    ) + '</div>';
    return h;
  }
};

/* ================= 3. SIMULATOR POLISI ROSOT NILAI ======================= */
V.rosot = {
  nav: 'Simulator rosot nilai', kicker: 'Uji sendiri',
  h1: 'Satu nombor dalam polisi. RM1.3 bilion beza.',
  desc: 'Pada 2017, LTH mengubah ambang "bilakah pelaburan dianggap sudah rugi" dua kali — dalam tempoh ' +
    'satu hari. Gerakkan pilihan di bawah untuk melihat apa yang berlaku kepada akaun setiap kali.',
  init: function () { if (S.rosotState == null) S.rosotState = 'p70'; if (S.rosotSubs == null) S.rosotSubs = true; },
  render: function () {
    var st = RD.rosotStates, cur = st.rows.filter(function (x) { return x.id === S.rosotState; })[0] || st.rows[1];
    var subs = S.rosotSubs;
    var base = RD.rav2017.bersih;                     // +373 (asas RAV, seperti dikira LTH)
    var extra = subs ? RD.tidakDiambilKira.subsidiariBersekutu : 0;
    var posisi = base - cur.kesan - extra;             // data terbitan
    var h = '';

    /* --- penerangan --- */
    h += '<div class="sec">';
    h += L.card({
      t: 'Apa itu rosot nilai, dalam bahasa harian?', badge: L.pv('fakta'),
      body: '<p class="csub">Anda beli saham RM1,000. Harganya sekarang RM100 dan tidak nampak akan pulih. ' +
        '<b>' + L.g('rosot nilai', 'Rosot nilai') + '</b> ialah mengaku dalam akaun bahawa RM900 itu sudah hilang, ' +
        'supaya akaun menunjukkan nilai sebenar.</p>' +
        '<p class="csub">Persoalannya: <b>bila</b> anda perlu mengaku? Di situlah "ambang" masuk. ' +
        'Garis panduan ' + L.g('FRSIC 14') + ' Institut Akauntan Malaysia: kerugian dianggap ' +
        '<b>signifikan</b> bila nilai turun <b>' + st.frsic.turun + '% atau lebih</b>, dan <b>berlanjutan</b> ' +
        'bila melebihi <b>' + st.frsic.bulan + ' bulan</b>.</p>' +
        '<p class="csub">LTH menggunakan ambang <b>70%</b>, kemudian <b>85%</b>, kemudian <b>90%</b>. ' +
        'Pada ambang 90%, seperti contoh dalam laporan sendiri: pelaburan asal RM1,000 hanya dirosotnilai ' +
        'apabila harganya jatuh ke <b>RM100</b>. Pada hakikatnya, kalau dijual pada masa itu LTH hanya dapat ' +
        'RM100 — bukan RM1,000 seperti dinyatakan dalam penyata kewangan.</p>',
      p: [114, 115]
    });
    h += '</div>';

    /* --- simulator --- */
    h += '<div class="sec"><h2>Pilih polisi. Lihat akaun berubah.</h2>' +
      '<p class="lead">Empat pilihan di bawah ialah empat keadaan yang benar-benar didokumenkan dalam laporan. ' +
      'Kami tidak mencipta apa-apa nilai di antaranya.</p>';
    h += '<div class="stepbtns" data-chips="rosotStateRadio">' + st.rows.map(function (x) {
      return '<button type="button" data-v="' + x.id + '" aria-pressed="' + (x.id === S.rosotState) + '">' +
        L.esc(x.label) + '</button>';
    }).join('') + '</div>';
    h += '<label class="switch" style="margin-top:10px"><input type="checkbox" data-toggle="rosotSubs"' +
      (subs ? ' checked' : '') + '> Termasuk rosot nilai subsidiari &amp; syarikat bersekutu (RM227.81 juta)</label>';

    h += L.tiles([
      { l: 'Rosot nilai yang perlu direkod', v: L.rmj(cur.kesan), cls: 'neg',
        d: 'Sumber: ' + L.esc(cur.sumber), tip: cur.desc },
      { l: 'Rosot nilai subsidiari &amp; bersekutu', v: subs ? L.rmj(extra) : 'diabaikan', cls: subs ? 'neg' : '',
        d: subs ? 'Termasuk TH Heavy Engineering RM164.58 juta' : 'Tekan kotak di atas untuk masukkan',
        tip: RD.tidakDiambilKira.nota },
      { l: 'Kedudukan bersih 2017 selepas pelarasan', v: L.rmj(posisi), cls: posisi >= 0 ? 'pos' : 'neg',
        d: 'Data terbitan: RM373j (asas RAV LTH) − rosot nilai di atas',
        tip: 'RM' + L.num(base) + 'j − RM' + L.num(cur.kesan) + 'j' + (subs ? ' − RM' + L.num(extra, 2) + 'j' : '') +
          ' = RM' + L.num(posisi, 2) + 'j' },
      { l: 'Ujian seksyen 22(3)(a)', v: posisi >= 0 ? 'LULUS' : 'GAGAL', cls: posisi >= 0 ? 'pos' : 'neg',
        d: posisi >= 0 ? 'Hibah boleh diisytiharkan' : 'Hibah sepatutnya TIDAK boleh diisytiharkan',
        tip: 'Seksyen 22(3)(a): hibah hanya boleh diisytiharkan jika aset tidak kurang daripada liabiliti.' }
    ], 't4');

    if (S.rosotState === 'p90' && !subs) {
      h += L.verdict('warn', 'Inilah keadaan yang benar-benar digunakan pada 2017',
        'Ambang 90% menjadikan rosot nilai yang direkod <b>RM1 juta sahaja</b>. Kedudukan bersih kekal positif ' +
        '(' + L.rmj(posisi) + '), ujian seksyen 22 "lulus", dan hibah ' + L.rmj(3324) + ' diisytiharkan. ' +
        'Tekan kotak "Termasuk rosot nilai subsidiari" di atas untuk lihat apa yang berlaku bila ' +
        'RM227.81 juta yang ditegur Ketua Audit Negara turut dimasukkan.');
    } else if (S.rosotState === 'frs' && subs) {
      h += L.verdict('fail', 'Angka ini sepadan dengan kiraan Suruhanjaya sendiri',
        'Kedudukan terbitan kami: <b>' + L.rmj(posisi) + '</b>. Laporan RCI (ms 117) menyebut liabiliti bersih LTH ' +
        '<b>RM1.164 bilion</b>. Kiraan kami memberi ' + L.rmj(posisi) + ' — sepadan. ' +
        'PwC pula menganggarkan liabiliti bersih yang lebih besar, <b>' + L.rmj(RD.tidakDiambilKira.liabilitiBersihPwc) +
        '</b>, kerana PwC menggunakan penyata kewangan diaudit tanpa uplift RAV.');
    } else if (posisi < 0) {
      h += L.verdict('fail', 'Ujian gagal pada polisi ini',
        'Dengan polisi ini, kedudukan bersih menjadi <b>' + L.rmj(posisi) + '</b> — negatif. ' +
        'Di bawah seksyen 22(3)(a), hibah sepatutnya tidak boleh diisytiharkan sama sekali.');
    } else {
      h += L.verdict('pass', 'Ujian lulus pada polisi ini',
        'Kedudukan bersih ' + L.rmj(posisi) + '. Perhatikan betapa dekatnya angka ini dengan sifar — ' +
        'seluruh kelulusan hibah RM3.32 bilion bergantung pada margin yang sangat tipis.');
    }
    h += L.src([148, 116, 117], 'Sumber setiap nombor');
    h += '</div>';

    /* --- carta empat keadaan --- */
    h += '<div class="sec"><h2>Empat polisi, empat jumlah rosot nilai</h2>';
    h += L.card({
      t: 'Kesan setiap polisi terhadap rosot nilai 2017', badge: L.pv('fakta'),
      sub: 'Perhatikan dua sumber bebas (JAN dan PwC) tiba pada angka yang hampir serupa untuk polisi asal: ' +
        'RM1,310 juta dan RM1,313 juta.',
      body: L.svgHBars({
        w: 700, labelW: 176, rowH: 34, valW: 100,
        rows: st.rows.map(function (x) {
          return {
            k: x.label.replace('Ambang ', '').replace('Ikut FRS 139 sepenuhnya', 'Ikut FRS 139 penuh'),
            v: x.kesan, lab: L.rmj(x.kesan),
            color: x.id === S.rosotState ? 'var(--sim)' : (x.kesan > 1000 ? 'var(--bad)' : 'var(--warn)'),
            tip: x.label + ' → ' + L.rmj(x.kesan) + ' rosot nilai. Sumber: ' + x.sumber + '. ' + x.desc
          };
        }),
        axisLabel: 'Rosot nilai yang perlu direkod (RM juta)'
      }),
      note: '<b>Kesan menaikkan ambang dari 70% ke 90%:</b> rosot nilai yang direkod jatuh daripada ' +
        L.rmj(1313) + ' kepada ' + L.rmj(1) + ' — pengurangan ' + L.pct((1 - 1 / 1313) * 100) + '. ' +
        'Keuntungan yang dilaporkan naik dengan jumlah yang sama, dan itu membolehkan hibah diisytiharkan.',
      limit: 'Carta ini menunjukkan kesan pada satu tahun (2017) sahaja. Laporan tidak memberi jumlah ' +
        'rosot nilai yang tidak direkod bagi 2014, 2015 dan 2016 secara berasingan.',
      p: [148]
    });
    h += '</div>';

    /* --- untung rugi 2017 --- */
    var pl = RD.pl2017;
    h += '<div class="sec"><h2>Kalau piawaian dipatuhi sepenuhnya: untung RM3.4 bilion jadi rugi RM1.4 bilion</h2>';
    h += L.card({
      t: 'Keuntungan 2017 selepas semua pelarasan PwC', badge: L.pv('fakta'),
      body: L.svgWaterfall({
        w: 620, h: 290, fmt: L.rmjShort, yfmt: L.rmjShort,
        rows: pl.rows.map(function (r, i) {
          return { k: r.k.replace('Tolak: ', ''), v: r.v, total: i === 0,
            color: i === 0 ? 'var(--neutral)' : 'var(--bad)',
            tip: r.k + ': ' + L.rmj(r.v) };
        }).concat([{ k: 'Kerugian terlaras', v: pl.hasil.v, total: true, color: 'var(--bad)',
          tip: 'Kerugian terlaras 2017: ' + L.rmj(pl.hasil.v) }])
      }, 620),
      note: '<b>Semak sendiri:</b> 3,412 − 4,258 − 7 − 580 = <b>−1,433</b> (RM juta). ' +
        'Kerugian terkumpul terlaras pada 31 Disember 2017: simpanan terkumpul RM' + pl.terkumpul.simpananTerkumpul +
        'j tolak pelarasan RM' + L.num(-pl.terkumpul.pelarasan) + 'j = <b>kerugian terkumpul ' +
        L.rmj(Math.abs(pl.terkumpul.kerugianTerkumpul)) + '</b>.',
      limit: 'Angka RM3,412 juta ini berbeza daripada RM2,798 juta dalam jadual bonus laporan (ms 139). ' +
        'Laporan tidak menjelaskan sebabnya. <a href="#/integriti">Lihat daftar percanggahan</a>.',
      p: [149]
    });
    h += '</div>';

    /* --- kesan MFRS 9 --- */
    h += '<div class="sec"><h2>Mengapa helah ini tidak boleh diulang</h2>';
    h += L.card({
      t: 'FRS 139 diganti dengan MFRS 9 pada 2018', badge: L.pv('fakta'),
      body: '<p class="csub">Di bawah ' + L.g('FRS 139') + ', rosot nilai bergantung kepada pertimbangan ' +
        'bila kerugian dianggap "signifikan atau berlanjutan" — dan di situlah ruang untuk menetapkan ambang sendiri.</p>' +
        '<p class="csub">Di bawah ' + L.g('MFRS 9') + ' (berkuat kuasa 2018), aset dinilai <b>berdasarkan harga ' +
        'pasaran</b> dan dilaporkan pada nilai itu. Tiada lagi ambang untuk dipilih. Inilah sebabnya panduan ' +
        'FRSIC 14 ditarik balik — isu yang ditanganinya tidak lagi berkenaan.</p>' +
        '<p class="csub">Roland Berger sudah memberi amaran bahawa LTH akan menghadapi masalah apabila MFRS 9 ' +
        'berkuat kuasa, dan menganggarkan kerugian <b>RM2.6 bilion</b> akan menjadi ancaman kepada pendapatan ' +
        'masa hadapan LTH. Ini salah satu sebab pelan penyelamatan perlu disiapkan <b>sebelum</b> akhir 2018.</p>',
      p: [117, 118]
    });
    h += '</div>';

    h += '<div class="sec">' + L.readBlocks(
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Perubahan polisi rosot nilai 2017 mempunyai kesan matematik langsung: RM1,313 juta → RM1 juta.</li>' +
      '<li>Menurut Akuan Berkanun Saksi Ketua Pegawai Kewangan pada masa itu, pertukaran polisi dibuat ' +
      '<b>untuk membolehkan LTH mengagihkan keuntungan selaras dengan jangkaan pendeposit</b> — bukan untuk ' +
      'memastikan penilaian aset menggambarkan nilai wajar.</li>' +
      '<li>Ketua Audit Negara berpandangan polisi agresif itu "tidak salah" kerana mendapat kelulusan Menteri. ' +
      'Suruhanjaya menilai pandangan itu <b>tidak tepat</b>.</li></ul>',
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Kita <b>tidak boleh</b> menganggap nilai antara ambang 70% dan 90% — laporan hanya memberi tiga titik. ' +
      'Slider di dashboard ini adalah pilihan diskret, bukan lengkung.</li>' +
      '<li>Kita <b>tidak boleh</b> mengatakan LTH kehilangan RM1.3 bilion tunai pada 2017. Rosot nilai ialah ' +
      'pengakuan perakaunan tentang kerugian yang <b>sudah</b> berlaku pada nilai pelaburan, bukan aliran keluar tunai baru.</li>' +
      '<li>Kita <b>tidak boleh</b> mengira kesan penuh bagi 2014–2016 kerana laporan tidak memberi angka rosot ' +
      'nilai tidak direkod bagi tahun-tahun itu.</li></ul>'
    ) + '</div>';
    return h;
  }
};
