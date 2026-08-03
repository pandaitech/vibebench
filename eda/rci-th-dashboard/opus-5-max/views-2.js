/* ==========================================================================
   views-2.js — Hibah & keyakinan pendeposit · Penyelamatan UJSB · Pelaburan bermasalah
   ========================================================================== */
var V = (window.V = window.V || {});
var S = (window.S = window.S || {});

/* ============ 4. HIBAH, DEPOSIT & KEYAKINAN PENDEPOSIT ================== */
V.deposit = {
  nav: 'Hibah & pendeposit', kicker: 'Insentif & tingkah laku',
  h1: 'Kadar tinggi menarik wang besar. Kadar rendah menghalaunya. LTH terperangkap di antara.',
  desc: 'Mengapa LTH tidak boleh sekadar "berhenti bayar hibah tinggi": kadar itulah yang menarik ' +
    'pendeposit besar, dan pendeposit besar itulah yang menampung subsidi haji.',
  init: function () { if (S.depMode == null) S.depMode = 'kadar'; },
  render: function () {
    var kadar = RD.hibahKadar.rows, jum = RD.hibahJumlah.rows;
    var kats = kadar.map(function (r) { return String(r.y); });
    var h = '';

    /* --- carta utama --- */
    h += '<div class="sec"><h2>Lapan tahun kadar hibah</h2>' +
      '<p class="lead">Kadar 6.25% pada 2014 jatuh ke 1.25% pada 2018 — satu penurunan yang menerangkan ' +
      'segala-galanya tentang keadaan kewangan sebenar LTH.</p>';
    h += '<div class="ctl">' + L.seg('depMode', [
      { v: 'kadar', l: 'Kadar (%)' }, { v: 'jumlah', l: 'Jumlah dibayar (RM)' }
    ], S.depMode) + '</div>';

    if (S.depMode === 'kadar') {
      h += L.card({
        t: 'Kadar hibah tahunan dan hibah haji, 2014–2021', badge: L.pv('fakta'),
        body: L.svgBars({
          w: 640, h: 250, cats: kats, labels: true, band: .68,
          yfmt: function (v) { return L.num(v, 0) + '%'; }, fmt: function (v) { return L.num(v, 2); },
          series: [
            { name: 'Hibah tahunan', data: kadar.map(function (r) { return r.tahunan; }), color: 'var(--accent)' },
            { name: 'Hibah haji (tambahan)', data: kadar.map(function (r) { return r.haji; }), color: 'var(--warn)' }
          ],
          tip: function (i, j) {
            var r = kadar[i];
            if (j === 1) return r.haji == null ? r.y + ' · Hibah haji: tiada dalam laporan'
              : r.y + ' · Hibah haji: ' + L.pct(r.haji, 2) + (r.haji === 0 ? ' (dihentikan sejak 2018)' : '');
            return r.y + ' · Hibah tahunan: ' + L.pct(r.tahunan, 2) +
              (r.y === 2018 ? ' — kadar terendah; menyebabkan deposit mengecut RM73b → RM69b' : '');
          },
          ann: [{ i: 4, t: '2018: 1.25%' }]
        }, 640) + L.legend([{ c: 'var(--accent)', l: 'Hibah tahunan' }, { c: 'var(--warn)', l: 'Hibah haji' }]),
        note: 'Hibah haji ialah bayaran tambahan kepada pendeposit yang <b>belum</b> menunaikan haji. ' +
          'Ia dihentikan sepenuhnya sejak 2018. Perhatikan 2015: hibah haji 3.00% adalah yang tertinggi, ' +
          'menjadikan jumlah agihan haji RM413 juta — hampir dua kali 2014.',
        p: [120, 130]
      });
    } else {
      h += L.card({
        t: 'Jumlah hibah yang dibayar, 2014–2020', badge: L.pv('fakta'),
        sub: 'Dalam RM juta. Angka 2021 tidak diberikan dalam laporan.',
        body: L.svgComboBarLine({
          w: 640, h: 265, cats: jum.map(function (r) { return String(r.y); }),
          yfmt: L.rmjShort, y2fmt: function (v) { return L.num(v, 0) + '%'; }, max2: 7,
          bars: [
            { name: 'Hibah tahunan', data: jum.map(function (r) { return r.tahunan / 1000; }), color: 'var(--accent)' },
            { name: 'Hibah haji', data: jum.map(function (r) { return r.haji / 1000; }), color: 'var(--warn)' }
          ],
          lines: [{ name: 'Kadar hibah tahunan (%)', data: jum.map(function (r) {
            var k = kadar.filter(function (x) { return x.y === r.y; })[0]; return k ? k.tahunan : null;
          }), color: 'var(--bad)' }],
          tip: function (i) {
            var r = jum[i], k = kadar.filter(function (x) { return x.y === r.y; })[0];
            return r.y + ' · Jumlah ' + L.rmj(r.jumlah / 1000) + ' (tahunan ' + L.rmj(r.tanunan || r.tahunan / 1000) +
              (r.haji ? ' + haji ' + L.rmj(r.haji / 1000) : '') + ') pada kadar ' + (k ? L.pct(k.tahunan, 2) : '—');
          }
        }, 640) + L.legend([{ c: 'var(--accent)', l: 'Hibah tahunan (RM)' },
          { c: 'var(--warn)', l: 'Hibah haji (RM)' }, { c: 'var(--bad)', l: 'Kadar % (paksi kanan)', line: true }]),
        note: '<b>Perhatikan 2018:</b> kadar jatuh dari 4.50% ke 1.25% dan jumlah bayaran jatuh dari ' +
          L.rmj(3323.741) + ' ke ' + L.rmj(922.959) + ' — pengurangan ' + L.pct((1 - 922.959 / 3323.741) * 100) +
          '. Itulah saiz "lubang" yang perlu ditutup UJSB.',
        p: [130, 120]
      });
    }
    h += '</div>';

    /* --- mengapa kadar tinggi tidak wajar --- */
    h += '<div class="sec"><h2>Mengapa Suruhanjaya kata kadar itu memang tidak wajar</h2>';
    h += L.card({
      t: 'Empat ciri deposit LTH yang tiada pada pelaburan lain', badge: L.pv('fakta'),
      body: '<div class="rb">' +
        '<div class="can"><strong>1. Pengeluaran dijamin Kerajaan</strong>Nilai setiap ringgit deposit kekal, ' +
        'walaupun nilai pelaburan LTH turun naik. Ini perlindungan yang tiada pada unit trust atau saham.</div>' +
        '<div class="can"><strong>2. Hanya aset patuh syariah</strong>Pendeposit dapat kepastian syariah tanpa ' +
        'perlu menyaring sendiri.</div>' +
        '<div class="can"><strong>3. Zakat dibayar LTH</strong>Pendeposit tidak perlu memikirkan zakat simpanan. ' +
        'Ini secara efektif menambah nilai pulangan.</div>' +
        '<div class="can"><strong>4. Sebahagian keuntungan sudah pergi ke subsidi haji</strong>Bermakna keuntungan ' +
        'yang tinggal untuk diagihkan sepatutnya lebih rendah, bukan lebih tinggi.</div></div>',
      note: 'Dengan empat ciri ini, kadar hibah LTH sepatutnya <b>lebih rendah</b> daripada pasaran, bukan lebih ' +
        'tinggi. Suruhanjaya: LTH "meletakkan dirinya dalam kelompok yang sama dengan Amanah Saham Bumiputera dan ' +
        'Kumpulan Wang Simpanan Pekerja... LTH tidak mempunyai sebab untuk menerima tekanan untuk bersaing dengan ' +
        'kelompok-kelompok yang dipilihnya sendiri."',
      limit: 'Laporan <b>tidak memberikan</b> kadar deposit bank Islam sebenar bagi tahun-tahun berkenaan. ' +
        'Jadi kami tidak boleh melukis jalur perbandingan. Kita hanya tahu daripada laporan bahawa kadar LTH ' +
        '"lebih tinggi", dan bahawa polisi baharu selepas 2018 menyasarkan 50–100 mata asas di atas purata bank Islam.',
      p: [120, 122]
    });
    h += '</div>';

    /* --- deposit & keyakinan --- */
    var dep = RD.deposit.titik;
    h += '<div class="sec"><h2>Apa berlaku bila kadar dipotong: ujian keyakinan 2019</h2>' +
      '<p class="lead">Ini satu-satunya eksperimen dunia nyata dalam laporan tentang bagaimana pendeposit ' +
      'bertindak balas kepada kadar rendah.</p>';
    h += L.card({
      t: 'Saiz deposit LTH pada titik-titik yang disebut laporan', badge: L.pvs('fakta', 'unjur'),
      sub: 'Laporan tidak memberi siri deposit tahunan yang lengkap — hanya titik-titik ini, dan sebahagiannya ' +
        'bersifat anggaran ("kira-kira", "lebih kurang").',
      body: L.svgHBars({
        w: 700, labelW: 168, rowH: 34, valW: 88, max: 100000,
        rows: dep.map(function (d) {
          return {
            k: d.label, v: d.nilai, lab: 'RM' + L.num(d.nilai / 1000, 0) + 'b',
            color: d.unjuran ? 'var(--warn)' : (d.nilai < 70000 ? 'var(--bad)' : 'var(--accent)'),
            op: d.anggaran ? .62 : 1,
            tip: d.label + ' (' + d.bila + '): RM' + L.num(d.nilai / 1000, 0) + ' bilion' +
              (d.anggaran ? ' — nilai anggaran dalam laporan' : ' — nilai yang dinyatakan') +
              (d.unjuran ? ' — INI UNJURAN LTH, bukan sejarah' : '')
          };
        }),
        axisLabel: 'Saiz deposit (RM bilion)'
      }),
      note: '<b>Cerita dalam empat langkah:</b> hibah 2018 diumumkan pada 1.25% → deposit mengecut ' +
        'RM73b → RM69b, terutamanya dalam kalangan pendeposit besar → LTH membuat penerangan media dan ' +
        'perjumpaan bersemuka → akhir 2020 deposit kembali ke ~RM76b, dan RM88b pada 2022. ' +
        'Suruhanjaya: <b>"LTH bernasib baik kerana jumlah pengeluaran dan kesannya adalah lebih kecil ' +
        'daripada apa yang dikhuatiri."</b>',
      limit: 'Kita tidak boleh menyimpulkan pemulihan deposit itu disebabkan komunikasi sahaja. Laporan ' +
        'menyebut pendeposit "diyakinkan bahawa Kerajaan sememangnya menjamin deposit mereka" selepas ' +
        'penstrukturan — jadi jaminan Kerajaan yang menjadi nyata mungkin sebab yang lebih besar. ' +
        'Bar berlorek lebih pudar ialah nilai anggaran, bukan angka tepat.',
      p: [122, 123, 171]
    });
    h += '</div>';

    /* --- risiko tertumpu --- */
    var t = RD.deposit.tumpuan;
    h += '<div class="sec"><h2>Perangkap: dua kumpulan pendeposit yang sangat berbeza</h2>';
    h += '<div class="grid g2">';
    h += L.card({
      t: '65% pendeposit ada RM2,000 atau kurang', badge: L.pv('fakta'),
      body: L.svgStack100({
        w: 340, h: 46, segs: [
          { k: 'Pendeposit dengan ≤ RM2,000', short: '65%', v: 65, color: 'var(--neutral)',
            tip: '65% pendeposit LTH mempunyai RM2,000 atau kurang dalam akaun mereka (ms 208).' },
          { k: 'Pendeposit lain', short: '35%', v: 35, color: 'var(--accent)', tip: 'Baki 35% pendeposit.' }
        ]
      }),
      note: 'Mereka inilah yang paling memerlukan LTH sebagai platform menabung untuk haji — tetapi deposit ' +
        'RM2,000 sangat jauh daripada kos haji RM25,540. Deposit minimum untuk mendaftar giliran haji ' +
        'hanya RM1,300.',
      p: [208]
    });
    h += L.card({
      t: 'Tetapi 75% wang dipegang oleh 5% pendeposit', badge: L.pv('fakta'),
      body: L.svgStack100({
        w: 340, h: 46, segs: [
          { k: '5% pendeposit memegang 75% deposit', short: '5% orang → 75% wang', v: 75, color: 'var(--bad)',
            tip: 'Dianggarkan 75% deposit LTH dipegang oleh hanya 5% pendepositnya (ms 216).' },
          { k: '95% pendeposit memegang 25% deposit', short: '95% → 25%', v: 25, color: 'var(--neutral)',
            tip: 'Baki 95% pendeposit memegang 25% daripada jumlah deposit.' }
        ]
      }),
      note: 'Inilah ' + L.g('risiko tertumpu') + '. Kalau segelintir pendeposit besar keluar serentak, ' +
        'LTH menghadapi masalah kecairan. Tetapi kumpulan inilah juga yang menampung beban subsidi haji ' +
        'untuk kumpulan pertama.',
      p: [110, 216]
    });
    h += '</div>';
    h += L.verdict('warn', 'Dua matlamat yang bertentangan',
      'Untuk menampung subsidi haji pada tahap sekarang, LTH memerlukan dana minima <b>RM60 bilion</b>. ' +
      'Untuk mengekalkan dana sebesar itu, LTH perlu memberi pulangan yang menarik kepada pendeposit besar. ' +
      'Tetapi memberi pulangan menarik memerlukan mengambil risiko pelaburan yang lebih tinggi — yang ' +
      'itulah punca krisis 2017. Suruhanjaya: "Apabila kos subsidi meningkat, jumlah dana yang lebih besar ' +
      'diperlukan dan kebergantungan kepada pendeposit besar akan bertambah."');
    h += L.src([111, 206], 'Sumber');
    h += '</div>';

    /* --- akad --- */
    h += '<div class="sec"><h2>Kontrak yang bertukar tiga kali</h2>' +
      '<p class="lead">Hubungan undang-undang antara LTH dan pendeposit — dan siapa yang berhak ke atas ' +
      'keuntungan pelaburan — berubah tiga kali tanpa penjelasan penuh.</p>';
    var akads = [
      { n: '1979–2016', a: L.g('Mudarabah'), d: 'Perkongsian untung: pendeposit beri modal, LTH usahakan. ' +
        'Suruhanjaya mendapati <b>tiada dokumen akad</b> antara LTH dan pendeposit, dan rukun penting ' +
        'Mudarabah — <b>kadar pembahagian keuntungan</b> — tidak ditemui dalam mana-mana dokumen. ' +
        'Di bawah akad ini, LTH tidak boleh bebas membelanjakan keuntungan untuk subsidi.', c: 'accent' },
      { n: '2016–Dis 2019', a: L.g('Wadi’ah Yad Dhamanah', 'Wadi’ah Yad Dhamanah'), d: 'Deposit dikira sebagai simpanan; ' +
        'LTH menjadi <b>peminjam</b>. Suruhanjaya: <b>tiada penjelasan mengapa</b> perubahan dibuat dan ' +
        '<b>tiada kajian menyeluruh</b> dilaksanakan. Kesannya serius: pendeposit sepatutnya terdedah kepada ' +
        'zakat simpanan 2.5%, bukan zakat perniagaan yang lebih rendah. Akta 535 pula tidak membenarkan LTH meminjam.', c: 'bad' },
      { n: 'Dis 2019–kini', a: L.g('Wakalah'), d: 'LTH menjadi <b>ejen</b> pendeposit. Dibuat selepas kajian ' +
        'menyeluruh. Ini menyelesaikan isu zakat dan mengesahkan bahawa subsidi haji ditanggung oleh pendeposit — ' +
        'kerana LTH boleh menolak zakat, kos pengurusan dan kos haji daripada keuntungan pelaburan.', c: 'good' }
    ];
    h += L.card({
      t: 'Tiga akad, tiga hubungan berbeza', badge: L.pv('fakta'),
      body: akads.map(function (a) {
        return '<div style="border-left:3px solid var(--' + a.c + ');padding:2px 0 2px 12px;margin:12px 0">' +
          '<div style="font-family:var(--mono);font-size:11px;color:var(--ink-3);font-weight:700">' + a.n + '</div>' +
          '<div style="font-size:14.5px;font-weight:750;margin:2px 0 4px">' + a.a + '</div>' +
          '<div style="font-size:13px;color:var(--ink-2);line-height:1.5">' + a.d + '</div></div>';
      }).join(''),
      note: 'Suruhanjaya menyimpulkan bahawa BNM yang membangkitkan isu ini dalam surat kepada Perdana Menteri ' +
        'bertarikh 26 Jun 2019 — dan LTH menukar akad kepada Wakalah pada Disember 2019. Suruhanjaya juga ' +
        'menyarankan LTH mengemukakan isu perubahan akad kepada Jawatankuasa Muzakarah MKI untuk pandangan hukum.',
      limit: 'Laporan tidak menyatakan sama ada zakat pendeposit bagi tempoh 2016–2019 (di bawah Wadi’ah) ' +
        'pernah diselesaikan, atau berapa jumlahnya. Ia hanya menyatakan risikonya.',
      p: [106, 107, 108, 109, 234]
    });
    h += '</div>';

    h += '<div class="sec">' + L.readBlocks(
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Kadar hibah tinggi 2014–2017 menarik pendeposit yang mencari pulangan tinggi, menyebabkan LTH ' +
      '"tergelincir daripada matlamat penubuhannya".</li>' +
      '<li>Untuk memberi pulangan tinggi, LTH mengambil risiko pelaburan lebih tinggi — pelaburan lebih ' +
      'cenderung kepada ekuiti domestik yang terdedah kepada turun naik pasaran.</li>' +
      '<li>Struktur pendeposit LTH sangat tidak seimbang, dan itu adalah risiko sistemik, bukan sekadar risiko LTH.</li></ul>',
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Kita <b>tidak boleh</b> mengira dengan tepat berapa banyak deposit dikeluarkan pada 2019 — laporan ' +
      'hanya memberi anggaran RM73b → RM69b.</li>' +
      '<li>Kita <b>tidak boleh</b> mengenal pasti siapa pendeposit besar itu. Laporan tidak menamakan sesiapa.</li>' +
      '<li>Kita <b>tidak boleh</b> membandingkan hibah LTH dengan kadar bank Islam sebenar — angka itu tiada dalam laporan.</li></ul>'
    ) + '</div>';
    return h;
  }
};

/* ==================== 5. PENYELAMATAN — UJSB ============================= */
V.ujsb = {
  nav: 'Penyelamatan UJSB', kicker: 'Anatomi bailout',
  h1: 'Bagaimana jurang RM10 bilion ditutup dalam dua minggu — dan ke mana ia berpindah',
  desc: 'Aset lemah LTH dijual kepada syarikat Kerajaan pada dua kali nilai pasaran. LTH terima Sukuk ' +
    'berkupon sifar. Masalah defisit selesai di buku LTH; ia kini menunggu di 2026 dan 2029.',
  init: function () { if (S.ujsbTab == null) S.ujsbTab = 'pindah'; },
  render: function () {
    var up = RD.ujsbPindah, prem = L.derive.ujsbPremium(), sk = RD.sukuk, dana = RD.ujsbDana;
    var h = '';

    /* --- angka teras --- */
    h += '<div class="sec">';
    h += L.tiles([
      { l: 'Nilai buku aset di LTH', v: L.rmj(up.jumlah.buku), tip: 'Nilai aset seperti dicatat dalam akaun LTH.' },
      { l: 'Nilai pemindahan kepada UJSB', v: L.rmj(up.jumlah.pindah), cls: 'pos',
        tip: 'Harga yang UJSB "bayar" — dalam bentuk Sukuk RM19.6 bilion + tunai RM300 juta.' },
      { l: 'Nilai pasaran sebenar ketika itu', v: L.rmj(up.jumlah.pasaran), cls: 'neg',
        tip: 'Nilai yang aset itu sebenarnya berharga di pasaran pada masa pemindahan.' },
      { l: 'Premium di atas nilai pasaran', v: L.rmj(prem.atasPasaran), cls: 'neg',
        d: 'Data terbitan: ' + L.num(prem.gandaan, 2) + ' kali nilai pasaran',
        tip: 'RM19,900j − RM9,729j = RM10,171j. Inilah "wang" yang menutup jurang defisit LTH — dan ia menjadi ' +
          'kerugian di buku UJSB (RM9.9 bilion pada 2019).' }
    ]);
    h += '</div>';

    /* --- tab --- */
    h += '<div class="sec"><div class="ctl">' + L.seg('ujsbTab', [
      { v: 'pindah', l: 'Pemindahan aset' },
      { v: 'sukuk', l: 'Struktur Sukuk' },
      { v: 'dana', l: 'Janji vs realiti' },
      { v: 'hartanah', l: 'Hartanah' },
      { v: 'saham', l: 'Saham mewah' },
      { v: 'rofr', l: 'Hak beli semula' }
    ], S.ujsbTab) + '</div>';

    if (S.ujsbTab === 'pindah') {
      h += L.card({
        t: 'Nilai buku, nilai pemindahan dan nilai pasaran', badge: L.pv('fakta'),
        sub: up.kandungan + ', ditandatangani 27 Disember 2018.',
        body: L.svgDumbbell({
          w: 700, labelW: 150, rowH: 44, la: 'Nilai pemindahan', lb: 'Nilai pasaran',
          xfmt: L.rmjShort, valW: 66,
          ca: 'var(--accent)', cb: 'var(--bad)', min: 0, max: 18000,
          rows: up.rows.map(function (r) {
            return { k: r.k, a: r.pindah, b: r.pasaran, note: L.signPct((r.pasaran / r.pindah - 1) * 100),
              tip: r.k + ' · nilai buku ' + L.rmj(r.buku) + ' → dipindah pada ' + L.rmj(r.pindah) +
                ' · nilai pasaran ' + L.rmj(r.pasaran) + ' · premium ' + L.rmj(r.pindah - r.pasaran) };
          })
        }),
        note: '<b>Perhatikan di mana premium itu berada:</b> hartanah dipindah pada ' + L.rmj(2247) +
          ' walaupun nilai pasarannya ' + L.rmj(1411) + '. Ekuiti tersenarai dipindah pada ' + L.rmj(16851) +
          ' walaupun nilai pasarannya hanya ' + L.rmj(7600) + ' — itu sahaja ' + L.rmj(16851 - 7600) +
          ' daripada premium ' + L.rmj(prem.atasPasaran) + ' (data terbitan: ' +
          L.pct((16851 - 7600) / prem.atasPasaran * 100) + ' daripada keseluruhan premium).',
        limit: 'Aset "nilai pasaran" bagi hartanah dan perladangan dalam jadual ini sama dengan nilai buku. ' +
          'Laporan tidak menjelaskan sama ada itu bermakna nilai buku hartanah memang sudah setara pasaran, ' +
          'atau tiada penilaian pasaran berasingan dibuat pada masa itu.',
        p: [159]
      });
      h += L.card({
        t: 'Empat pilihan yang dipertimbangkan — dan mengapa tiga ditolak', badge: L.pv('fakta'),
        sub: 'Jawatankuasa Khas (Pejabat PM, BNM, MOF, pengurusan kanan LTH) menilai empat cadangan.',
        body: [
          { n: '1', t: 'Suntikan dana / geran terus oleh Kerajaan', v: '> RM10 bilion tunai',
            r: 'Terlalu besar untuk satu masa. Akan menjejaskan peruntukan projek pembangunan lain dan mendedahkan ' +
              'Kerajaan kepada risiko penarafan kredit — siling hutang negara ketika itu 55% daripada KDNK.', ok: false },
          { n: '2', t: 'Aktifkan jaminan Kerajaan (seksyen 24 Akta 535)', v: 'Solusi jangka pendek',
            r: 'Tidak menutup jurang — malah <b>menambah</b> liabiliti LTH kerana ia menjadi hutang kepada Kerajaan. ' +
              'LTH tidak dapat memulihkan pelaburan kerana perlu melunaskan hutang dahulu.', ok: false },
          { n: '3', t: 'Wujudkan "aset tertunda" untuk agihkan kerugian ke masa hadapan', v: 'Tidak dibenarkan',
            r: 'Piawaian MFRS 9 tidak membenarkan entiti mengagihkan kerugian ke masa hadapan. Kerugian mesti ' +
              'direkod pada tahun semasa. LTH tetap tidak mampu bayar hibah 2018.', ok: false },
          { n: '4', t: 'Pindahkan aset lemah kepada SPV milik Kerajaan', v: 'DIPILIH',
            r: 'Solusi jangka panjang. Aset lemah diganti dengan instrumen yang menjana pendapatan lebih stabil ' +
              'pada nilai premium. Berdasarkan model Danaharta Nasional Berhad yang berjaya menangani krisis 1998.', ok: true }
        ].map(function (o) {
          return '<div style="border:1px solid var(--line);border-radius:9px;padding:11px 12px;margin:8px 0;' +
            'background:' + (o.ok ? 'var(--good-soft)' : 'var(--card-2)') + '">' +
            '<div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">' +
            '<b style="font-size:13.5px">' + o.n + '. ' + o.t + '</b>' +
            '<span class="etag ' + (o.ok ? 'st-selesai' : 'st-hapus') + '">' + o.v + '</span></div>' +
            '<p style="margin:6px 0 0;font-size:12.8px;color:var(--ink-2);line-height:1.5">' + o.r + '</p></div>';
        }).join(''),
        note: '<b>Kekangan masa:</b> Jemaah Menteri meluluskan pelan pada 7 Disember 2018 dan mengarahkannya ' +
          'dilaksanakan <b>sebelum berakhir tahun 2018</b>. Suruhanjaya: "LTH mempunyai kurang dari dua minggu ' +
          'untuk memuktamadkan pelan tersebut." UJSB ditubuhkan 14 Disember; perjanjian ditandatangani 27 Disember.',
        p: [153, 154, 155, 156]
      });
    }

    if (S.ujsbTab === 'sukuk') {
      h += L.card({
        t: 'Apa yang LTH terima sebagai bayaran', badge: L.pv('fakta'),
        body: L.table({
          cols: [{ l: 'Instrumen' }, { l: 'Prinsipal', n: 1 }, { l: 'Nilai nominal', n: 1 },
            { l: 'Tempoh', n: 1 }, { l: 'Pulangan', n: 1 }, { l: 'Matang', n: 1 }],
          rows: sk.siri.map(function (s) {
            return { c: [s.n, { v: L.rmj(s.prinsipal), n: 1 }, { v: L.rmj(s.nominal), n: 1 },
              { v: s.tempoh + ' tahun', n: 1 }, { v: L.pct(s.ytm, 2), n: 1 },
              { v: '<b>' + s.matang + '</b>', n: 1 }] };
          }).concat([
            { c: ['Pembayaran tunai', { v: L.rmj(sk.tunai), n: 1 }, { v: '—', n: 1 }, { v: 'segera', n: 1 },
              { v: '—', n: 1 }, { v: '2019 & 2020', n: 1 }] },
            { _cls: 'tot', c: ['Jumlah obligasi', { v: L.rmj(19600 + 300), n: 1 },
              { v: '<b>' + L.rmj(sk.nominalJumlah) + '</b>', n: 1 }, { v: '', n: 1 }, { v: '', n: 1 }, { v: '', n: 1 }] }
          ])
        }),
        note: '<b>Ciri Sukuk ini:</b> ' + sk.ciri.join(' · ') + '. ' +
          'Maksudnya: LTH memegang RM27.5 bilion instrumen yang <b>tidak boleh dijual, tidak boleh dipindah milik, ' +
          'dan tidak membayar apa-apa tunai sehingga 2026/2029</b>.',
        limit: 'Laporan menyebut keuntungan tertunggak RM7.65 bilion, tetapi kiraan langsung ' +
          '(RM27.5b nominal − RM19.6b prinsipal) memberi RM7.9 bilion. Perbezaannya bergantung pada asas yang ' +
          'digunakan. <a href="#/integriti">Lihat daftar percanggahan</a>.',
        p: [162, 163]
      });
      h += L.card({
        t: 'Mengapa Sukuk ini adalah risiko terbesar LTH', badge: L.pvs('fakta', 'terbit'),
        body: L.tiles([
          { l: 'Sukuk sebagai % daripada jumlah aset LTH', v: L.pct(sk.peratusAsetLth, 0), cls: 'neg',
            tip: 'RM27.5 bilion adalah hampir 31% daripada keseluruhan aset yang dipegang LTH (ms 171).' },
          { l: 'Hasil pengakruan Sukuk sebagai % pendapatan tahunan LTH', v: L.pct(sk.peratusPendapatanLth, 0), cls: 'neg',
            tip: 'Hampir 26% daripada keseluruhan pendapatan tahunan LTH — dan lebih satu pertiga daripada jumlah ' +
              'pengagihan keuntungan tahunan kepada pendeposit (ms 171).' },
          { l: 'Pendapatan tertunggak dicatat setiap tahun', v: L.rmj(sk.pendapatanTertunggakTahunan), cls: 'neg',
            d: 'Tanpa menerima tunai', tip: 'LTH mencatat RM840 juta pendapatan setahun daripada Sukuk yang ' +
              'tidak membayar tunai. Sebahagian keuntungan ini telah diagihkan kepada pendeposit (ms 170).' },
          { l: 'Pendapatan tertunggak terkumpul', v: '>' + L.rmj(sk.pendapatanTertunggakTerkumpul), cls: 'neg',
            d: 'Setakat ' + sk.pendapatanTertunggakSetakat,
            tip: 'Melebihi RM2.1 bilion pada 31 Disember 2021 — keuntungan yang dicatat tetapi wangnya belum ada.' }
        ], 't4'),
        note: '<b>Inilah masalah kitaran yang dibimbangkan Suruhanjaya:</b> LTH mencatat ' + L.g('pendapatan tertunggak') +
          ' daripada Sukuk → sebahagiannya diagihkan sebagai hibah → hibah itu menjadi deposit baharu → ' +
          'deposit baharu itu adalah liabiliti baharu, tetapi tiada tunai baharu masuk untuk dilaburkan. ' +
          'Suruhanjaya: "Pertumbuhan dana deposit yang tidak dibayar secara tunai, dan seterusnya tidak dapat ' +
          'dilaburkan bagi menjana pendapatan yang lebih mampan, akan meruncingkan kedudukan kewangan LTH ' +
          'pada masa hadapan."',
        p: [170, 171]
      });
      h += L.verdict('fail', 'Sukuk ini TIDAK dijamin Kerajaan',
        sk.jaminan + ' Ketua Audit Negara sendiri menulis dalam laporannya: <b>"Pihak Audit tidak dapat ' +
        'memastikan kebarangkalian Lembaga Tabung Haji untuk menerima bayaran penebusan sukuk pada akhir ' +
        'tempoh matang atau penebusan awal."</b> Walau bagaimanapun, Sukuk UJSB dimasukkan dalam senarai ' +
        L.g('Komitmen Jaminan') + ' Kerajaan sejak 2019.');
      var kj = RD.komitmenJaminan;
      h += L.card({
        t: 'UJSB dalam senarai Komitmen Jaminan Kerajaan', badge: L.pv('fakta'),
        sub: 'Jadual 5.3 dokumen "Tinjauan Fiskal & Anggaran Hasil Kerajaan Persekutuan". Nilai 2021, RM juta.',
        body: L.svgHBars({
          w: 700, labelW: 176, rowH: 24, valW: 84,
          rows: kj.rows.map(function (r) {
            return { k: r.k.replace(' Sdn. Bhd.', '').replace(' Berhad', ''), v: r.y2021,
              lab: L.rmjShort(r.y2021) + ' · ' + L.pct(r.y2021 / kj.jumlah.y2021 * 100),
              color: r.sorot ? 'var(--bad)' : 'var(--neutral)', op: r.sorot ? 1 : .5,
              tip: r.k + ': RM' + L.num(r.y2021) + ' juta pada 2021 (RM' + L.num(r.y2020) + ' juta pada 2020) — ' +
                L.pct(r.y2021 / kj.jumlah.y2021 * 100) + ' daripada jumlah komitmen jaminan Kerajaan' };
          }),
          axisLabel: 'RM juta (2021) — jumlah keseluruhan RM' + L.num(kj.jumlah.y2021) + ' juta'
        }),
        note: 'UJSB ialah komitmen jaminan <b>keempat terbesar</b> Kerajaan Persekutuan, pada ' +
          L.pct(kj.rows.filter(function (r) { return r.sorot; })[0].y2021 / kj.jumlah.y2021 * 100) +
          ' daripada jumlah RM190.4 bilion. Perhatikan angka UJSB dalam jadual ini (RM21,097 juta) ' +
          'lebih rendah daripada nilai nominal Sukuk RM27.5 bilion — kerana Sukuk berkupon sifar dinilai ' +
          'pada nilai kini, bukan nilai matang.',
        p: [165]
      });
    }

    if (S.ujsbTab === 'dana') {
      h += L.card({
        t: 'Apa yang dijanjikan Kerajaan vs apa yang benar-benar dihantar', badge: L.pvs('fakta', 'terbit'),
        sub: 'Jemaah Menteri pada 5 April 2019 meluluskan sekurang-kurangnya RM17.8 bilion untuk membiayai ' +
          'kekurangan penebusan Sukuk UJSB.',
        body: L.svgHBars({
          w: 700, labelW: 190, rowH: 34, valW: 96, max: 18000,
          rows: [
            { k: 'Dijanjikan Jemaah Menteri (2020–2035)', v: dana.komitmen, lab: L.rmj(dana.komitmen),
              color: 'var(--accent)', tip: 'RM500 juta (2020, RMK-11) + RM17.3 bilion (RMK-12 & RMK-13), ' +
                'anggaran purata RM1.73 bilion setahun.' },
            { k: 'Sepatutnya dihantar 2020 + 2021', v: 500 + 1500, lab: L.rmj(2000),
              color: 'var(--warn)', tip: 'RM500 juta (2020) + RM1.5 bilion yang diluluskan dalam Belanjawan 2021.' },
            { k: 'Benar-benar dihantar', v: 500, lab: L.rmj(500),
              color: 'var(--bad)', tip: 'Hanya geran RM500 juta pada 2020. UJSB TIDAK menerima RM1.5 bilion pada 2021.' },
            { k: 'Tunai yang benar-benar sampai ke LTH', v: 500, lab: L.rmj(500),
              color: 'var(--bad)', op: .7,
              tip: 'RM300 juta bayaran saham tukar taraf syariah + RM200 juta penebusan awal Sukuk (30 Nov 2020) — ' +
                'berbanding nilai pasaran aset yang dipindahkan RM9.73 bilion.' }
          ],
          axisLabel: 'RM juta'
        }),
        note: '<b>Data terbitan:</b> daripada RM2 bilion yang sepatutnya dihantar untuk 2020–2021, ' +
          L.pct(500 / 2000 * 100, 0) + ' dihantar. Baki RM1.5 bilion tidak diterima kerana "keutamaan peruntukan ' +
          'atau alokasi tunai diberikan kepada perbelanjaan pemulihan ekonomi negara ekoran kesan pandemik Covid-19".',
        limit: 'Laporan hanya meliputi sehingga pertengahan 2022. Kita <b>tidak tahu</b> sama ada peruntukan ' +
          'RM1.73 bilion setahun telah dihantar selepas itu. Dashboard ini tidak boleh menunjukkan status semasa.',
        p: [165, 166]
      });
      h += L.card({
        t: 'Bila Sukuk matang, dan apa risikonya kalau tidak dibayar', badge: L.pv('fakta'),
        body: '<div class="tlist">' + [
          { d: '2026', t: 'Sukuk Siri 1 matang', b: 'Nilai RM13.2 bilion perlu dibayar sepenuhnya kepada LTH.' },
          { d: '2029', t: 'Sukuk Siri 2 matang', b: 'Nilai RM14.3 bilion perlu dibayar sepenuhnya kepada LTH.' },
          { d: 'Jika gagal', t: 'Kesan berantai yang dibimbangkan Suruhanjaya',
            b: 'Tunggakan keuntungan yang diakru dan diagihkan tanpa bersandarkan tunai akan mencecah ' +
              'RM7.65 bilion. LTH kembali terdedah kepada risiko pengeluaran deposit tidak terkawal, dan ' +
              'terpaksa mengaktifkan jaminan Kerajaan seksyen 24 Akta 535 — kini bernilai <b>RM88 bilion</b>. ' +
              'Suruhanjaya: risiko kali ini "akan menjadi lebih signifikan dan rumit".' }
        ].map(function (e) {
          return '<div class="tev k-selamat"><div class="td">' + e.d + '</div><div class="tt">' + e.t +
            '</div><div class="tb">' + e.b + '</div></div>';
        }).join('') + '</div>',
        note: 'Suruhanjaya menyarankan Sukuk distrukturkan semula supaya: (a) mempunyai jaminan Kerajaan formal; ' +
          '(b) boleh diniagakan (tradeable); (c) diterbitkan dalam pelbagai siri supaya tarikh matang dipelbagaikan ' +
          'dan tidak menjadi "bayaran pukal" pada 2026 dan 2029; dan (d) ditawarkan juga kepada institusi kewangan lain.',
        p: [171, 172, 173]
      });
      h += L.card({
        t: 'Risiko kadar faedah pada Sukuk tetap 4.05% dan 4.10%', badge: L.pv('fakta'),
        body: '<p class="csub">Sukuk UJSB mempunyai pulangan <b>tetap</b>. Suruhanjaya menjelaskan risikonya: ' +
          'jika inflasi meningkat melebihi 4% dan kadar asas melonjak melebihi 4%, pulangan tetap 4.05%/4.10% ' +
          'akan menyebabkan LTH tidak berupaya mencapai kadar halangan yang ditetapkan, iaitu ' +
          '<b>75 mata asas di atas kadar pendapatan tetap institusi kewangan Islam</b>.</p>' +
          '<p class="csub">Ini bermakna: sebanyak 31% aset LTH terkunci pada pulangan tetap yang mungkin ' +
          'menjadi <em>lebih rendah</em> daripada kadar deposit pasaran — pada masa yang sama LTH perlu ' +
          'bersaing untuk mengekalkan pendeposit besarnya.</p>',
        p: [173, 174]
      });
    }

    if (S.ujsbTab === 'hartanah') {
      var hs = L.derive.hartanahSusut(), hj = RD.ujsbHartanah;
      h += L.card({
        t: 'Hartanah yang dipindah: nilai pemindahan vs nilai pasaran Disember 2021', badge: L.pv('fakta'),
        sub: 'Penilaian oleh jurunilai bebas bertauliah setakat 31 Disember 2021, tiga tahun selepas pemindahan.',
        body: L.svgDumbbell({
          w: 700, labelW: 118, rowH: 44, la: 'Nilai pemindahan 2018', lb: 'Nilai pasaran Dis 2021',
          xfmt: function (v) { return 'RM' + L.num(v / 1e6, 0) + 'j'; }, valW: 66,
          ca: 'var(--accent)', cb: 'var(--bad)', min: 0, max: 850000000,
          rows: hs.map(function (r) {
            return { k: r.k, a: r.pindah, b: r.pasaran, note: L.signPct(r.pct),
              tip: r.k + ' · dipindah pada RM' + L.num(r.pindah / 1e6, 1) + ' juta → nilai pasaran Dis 2021 RM' +
                L.num(r.pasaran / 1e6, 1) + ' juta · susut RM' + L.num(Math.abs(r.susut) / 1e6, 1) + ' juta (' +
                L.signPct(r.pct) + ')' };
          })
        }),
        note: 'Keseluruhan: hartanah dipindah pada <b>RM' + L.num(hj.jumlah.pindah / 1e9, 2) + ' bilion</b> kini ' +
          'bernilai <b>RM' + L.num(hj.jumlah.pasaran / 1e9, 2) + ' bilion</b> — susut ' +
          L.signPct((hj.jumlah.pasaran / hj.jumlah.pindah - 1) * 100) + ' (data terbitan). ' +
          'Menara pejabat paling teruk pada ' + L.signPct(hs[1].pct) + '.',
        limit: 'Penurunan ini <b>tidak semuanya</b> disebabkan penilaian pemindahan yang tinggi. Laporan ' +
          'menyebut kejatuhan nilai berikutan "keadaan pasaran hartanah domestik yang lemah disebabkan ' +
          'penularan Covid-19". Suruhanjaya juga menyatakan jika LTH masih memegang aset ini, LTH-lah yang ' +
          'perlu merekod rosot nilai tambahan itu.',
        p: [160, 161]
      });
      h += L.card({
        t: 'Cuba jual hartanah itu: satu daripada 29', badge: L.pvs('fakta', 'terbit'),
        body: L.tiles([
          { l: 'Hartanah dipindahkan ke UJSB', v: '29', tip: '29 aset hartanah dalam Perjanjian Pemindahan Aset 27 Dis 2018.' },
          { l: 'Berjaya dijual (tender terbuka 2020)', v: '1', cls: 'neg',
            d: 'Tanah di Segamat, Johor — RM920,000',
            tip: 'Hanya sebidang tanah di Mukim Sungai Segamat, Daerah Segamat, Johor berjaya dijual pada nilai RM920 ribu.' },
          { l: 'Tidak mendapat bidaan', v: String(hj.tiadaBidaan), cls: 'neg',
            tip: 'Baki 17 hartanah yang ditender tidak mendapat bidaan dan masih dipegang UJSB.' },
          { l: 'Nilai jualan sebagai % nilai pemindahan hartanah', v: L.pct(920000 / hj.jumlah.pindah * 100, 3), cls: 'neg',
            d: 'Data terbitan',
            tip: 'RM920,000 ÷ RM' + L.num(hj.jumlah.pindah) + ' = ' + L.pct(920000 / hj.jumlah.pindah * 100, 3) +
              '. Selepas dua tahun, hampir tiada hartanah dapat ditukar menjadi tunai.' }
        ], 't4'),
        note: 'Suruhanjaya juga mencatat pandangan JAN: <b>sebelas</b> daripada 29 hartanah dinilai oleh jurunilai ' +
          'bebas <b>di bawah</b> paras penilaian Jabatan Penilaian dan Perkhidmatan Harta Malaysia (JPPHM). ' +
          'Namun secara keseluruhan, nilai pemindahan 29 hartanah melebihi penilaian JPPHM sebanyak ' +
          '<b>RM' + hj.jppham.lebih + ' juta</b>. LTH menjelaskan ia tidak mempunyai akses kepada penilaian ' +
          'JPPHM pada masa pemindahan.',
        limit: 'Ketidakupayaan menjual pada 2020 berlaku dalam tempoh pandemik. Ini bukan bukti mutlak ' +
          'bahawa aset itu tidak bernilai — tetapi ia menunjukkan bahawa premium pemindahan tidak boleh ' +
          'ditukar menjadi tunai dalam masa terdekat.',
        p: [160, 167, 168]
      });
    }

    if (S.ujsbTab === 'saham') {
      var bc = L.derive.bluechipHarga(), bcr = RD.bluechip;
      h += L.card({
        t: 'Lima saham mewah: harga pemindahan vs harga pasaran', badge: L.pv('fakta'),
        sub: 'Kriteria pemindahan: ' + bcr.kriteria + ' Harga seunit dalam RM.',
        body: L.table({
          cols: [{ l: 'Kaunter' }, { l: 'Pindah', n: 1 }, { l: '31 Dis 18', n: 1 }, { l: 'vs pindah', n: 1 },
            { l: '8 Jun 22', n: 1 }, { l: 'vs pindah', n: 1 }, { l: 'vs Dis 18', n: 1 }],
          rows: bc.map(function (r) {
            return { c: ['<b>' + r.k + '</b>',
              { v: L.num(r.pindah, 2), n: 1 }, { v: L.num(r.d18, 2), n: 1 },
              { v: L.signPct(r.pctPindahD18), n: 1, cls: r.pctPindahD18 < 0 ? 'neg' : 'pos' },
              { v: L.num(r.j22, 2), n: 1 },
              { v: L.signPct(r.pctPindahJ22), n: 1, cls: r.pctPindahJ22 < 0 ? 'neg' : 'pos' },
              { v: L.signPct(r.pctD18J22), n: 1, cls: r.pctD18J22 < 0 ? 'neg' : 'pos' }] };
          })
        })+ '<p class="scrollx-hint">Leret ke kanan untuk lihat harga Jun 2022.</p>',
        note: '<b>Insight yang tidak jelas daripada laporan:</b> laporan menyimpulkan "harga pasaran semasa ' +
          'bagi saham-saham di atas masih di bawah harga pemindahan" — betul secara keseluruhan. Tetapi ' +
          'bandingkan lajur terakhir: <b>TM naik ' + L.signPct(bc[4].pctD18J22) + '</b> dan <b>MISC naik ' +
          L.signPct(bc[2].pctD18J22) + '</b> antara Disember 2018 dan Jun 2022. MISC hampir kembali ke harga ' +
          'pemindahan (' + L.signPct(bc[2].pctPindahJ22) + '). Ini bermakna sebahagian "kerugian" yang ' +
          'dikristalkan pada masa pemindahan adalah masalah <b>masa pasaran</b>, bukan kerugian kekal.',
        limit: '<b>Kami TIDAK boleh mengira nilai portfolio ini pada Jun 2022.</b> Dalam jadual asal laporan, ' +
          'bilangan unit yang dikira balik daripada harga seunit tidak berbaki antara lajur pemindahan dan ' +
          'lajur pasaran (beza 5–15% bagi kesemua lima kaunter). Jadi kami hanya membandingkan HARGA SEUNIT. ' +
          '<a href="#/integriti">Lihat butiran percanggahan ini</a>.',
        p: [162]
      });
      h += L.card({
        t: 'Jumlah kejatuhan nilai pada tarikh pemindahan', badge: L.pv('fakta'),
        body: L.tiles([
          { l: 'Jumlah nilai pemindahan lima kaunter', v: 'RM' + L.num(bcr.jumlah.pindah / 1e9, 2) + 'b',
            tip: 'RM' + L.num(bcr.jumlah.pindah) },
          { l: 'Jumlah nilai pasaran 31 Dis 2018', v: 'RM' + L.num(bcr.jumlah.pasaran / 1e9, 2) + 'b', cls: 'neg',
            tip: 'RM' + L.num(bcr.jumlah.pasaran) },
          { l: 'Jumlah kejatuhan nilai', v: 'RM' + L.num(Math.abs(bcr.jumlah.jatuh) / 1e6, 0) + 'j', cls: 'neg',
            d: 'Data laporan — berbaki tepat', tip: 'RM' + L.num(Math.abs(bcr.jumlah.jatuh)) +
              ' = RM' + L.num(bcr.jumlah.pasaran) + ' − RM' + L.num(bcr.jumlah.pindah) },
          { l: 'Kejatuhan sebagai % nilai pemindahan', v: L.pct(bcr.jumlah.jatuh / bcr.jumlah.pindah * 100),
            cls: 'neg', d: 'Data terbitan' }
        ], 't4'),
        note: 'Empat kaunter kehilangan status patuh syariah dan tidak boleh dibayar dengan Sukuk berteraskan ' +
          'syariah: <b>' + bcr.tidakPatuh.join(', ') + '</b>. Sebab itulah UJSB membayar tunai RM300 juta ' +
          'secara berasingan untuk saham-saham itu (RM100 juta pada 30 Dis 2019, RM200 juta pada 30 Dis 2020).',
        p: [162, 163]
      });
      var op = RD.ujsbOperasi;
      h += L.card({
        t: 'Apa UJSB buat dengan aset itu', badge: L.pvs('fakta', 'terbit'),
        body: L.tiles([
          { l: 'Kaunter ekuiti dipindahkan', v: String(op.kaunterDipindah), tip: '106 kaunter tersenarai di Bursa Malaysia.' },
          { l: 'Sudah dilupuskan', v: String(op.kaunterDilupus), d: L.pct(op.kaunterDilupus / op.kaunterDipindah * 100, 0) + ' daripada 106 (terbitan)',
            tip: '75 kaunter dijual pada harga pasaran semasa melalui klausa 3.1 Perjanjian Hak Penolakan Pertama.' },
          { l: 'Dilabur semula ke dalam', v: String(op.kaunterBaru), u: 'kaunter',
            d: 'Dalam dan luar negara', tip: 'UJSB melabur semula dalam 329 kaunter saham tersenarai yang ' +
              '"bermutu dan mampu menjana pendapatan yang mampan".' },
          { l: 'Pendapatan tahunan hasil penstrukturan', v: 'RM' + op.pendapatanBaruMin + '–' + op.pendapatanBaruMax + 'j',
            cls: 'pos', d: 'Cukup untuk operasi UJSB tanpa suntikan modal kerja',
            tip: 'Pendapatan RM200–300 juta setahun menampung operasi dan pengurusan UJSB.' }
        ], 't4'),
        note: '<b>Tetapi:</b> UJSB terpaksa menelan kerugian <b>' + L.rmj(op.kerugian2019) + '</b> bagi tahun ' +
          'berakhir 2019 kerana perbezaan nilai pemindahan dan nilai pasaran semasa aset. ' +
          'Bandingkan dengan premium pemindahan RM10.17 bilion — kerugian UJSB hampir sepadan dengan premium itu. ' +
          'Dalam erti kata lain: jurang defisit LTH <b>tidak hilang</b>; ia berpindah ke buku UJSB, ' +
          'dan seterusnya kepada Kerajaan.',
        p: [167, 168]
      });
    }

    if (S.ujsbTab === 'rofr') {
      var rf = RD.rofr;
      h += L.card({
        t: 'Hak Penolakan Pertama: LTH ditawar beli semula pada harga premium', badge: L.pvs('fakta', 'terbit'),
        sub: 'Setiap kali UJSB hendak melupuskan aset, LTH mendapat hak keutamaan. Jadual ini menunjukkan ' +
          'harga tawaran vs harga pasaran pada tarikh tawaran.',
        body: L.svgHBars({
          w: 700, labelW: 158, rowH: 26, valW: 108,
          rows: rf.rows.map(function (r) {
            return { k: r.k + ' (' + r.tarikh.replace(/ 20/, ' ') + ')', v: r.premium,
              lab: L.signPct(r.premium) + '  ·  ' + L.num(r.rofr, 3) + ' vs ' + L.num(r.pasaran, 3),
              color: r.premium > 0 ? 'var(--bad)' : 'var(--good)',
              tip: r.k + ' (' + r.tik + ') · ' + L.num(r.unit) + ' unit · harga tawaran ROFR RM' + L.num(r.rofr, 3) +
                ' vs harga pasaran RM' + L.num(r.pasaran, 3) + ' = premium ' + L.signPct(r.premium) +
                (r.premium > 0 ? ' — LTH boleh beli lebih murah di pasaran terbuka' : ' — tawaran ROFR lebih murah daripada pasaran') };
          }),
          axisLabel: 'Premium harga tawaran ROFR ke atas harga pasaran (%)'
        }),
        note: '<b>Suruhanjaya:</b> "saham-saham yang ditawarkan melalui Hak Penolakan Pertama adalah ditawarkan ' +
          'pada harga premium berbanding nilai semasa pasaran. Sekiranya LTH hendak membeli semula saham-saham ' +
          'ini, LTH boleh membeli saham tersebut daripada pasaran terbuka pada harga yang lebih rendah." ' +
          'Data terbitan: <b>7 daripada 9</b> tawaran adalah pada premium; yang tertinggi WZ Satu pada ' +
          L.signPct(40.6) + '.',
        limit: 'Kita tidak tahu sama ada LTH benar-benar membeli mana-mana daripada tawaran ini. Laporan hanya ' +
          'menunjukkan harga tawaran vs pasaran. Untuk hartanah, laporan menyatakan LTH melepaskan ROFR bagi ' +
          '18 daripada 19 hartanah pada 3 Disember 2019 dan kemudian melepaskan yang terakhir juga.',
        p: [169]
      });
      h += L.card({
        t: 'Syarikat perladangan Sri Aman: ROFR ditolak', badge: L.pv('fakta'),
        body: '<p class="csub">LTH menerima notis bertarikh <b>7 Januari 2020</b> menawarkan hak beli semula ' +
          'syarikat perladangan kelapa sawit di Sri Aman, Sarawak pada harga minima <b>' + L.rmj(rf.perladangan.minima) +
          '</b>. LTH menolak tawaran itu melalui surat bertarikh <b>24 Januari 2020</b>.</p>' +
          '<p class="csub">Bandingkan: syarikat perladangan ini dipindahkan ke UJSB pada nilai <b>' +
          L.rmj(802) + '</b> (nilai buku LTH ' + L.rmj(718) + '). Tawaran beli semula RM280 juta adalah ' +
          '<b>' + L.pct(280 / 802 * 100, 0) + '</b> daripada nilai pemindahan (data terbitan).</p>',
        note: 'Suruhanjaya akhirnya <b>menyarankan LTH melepaskan kesemua Hak Penolakan Pertama</b> sekiranya ' +
          'aset-aset itu tidak memberi pulangan kompetitif dan mengambil masa lama untuk menjana pendapatan — ' +
          'supaya UJSB boleh melupuskan aset di pasaran semasa tanpa dipertikaikan pemegang taruh, dan supaya ' +
          'ciri "Redemption in Kind" boleh dikeluarkan daripada terma Sukuk baharu.',
        limit: 'RM280 juta ialah harga <b>minima</b> tawaran, bukan penilaian. Ia tidak semestinya nilai ' +
          'pasaran syarikat itu pada masa itu.',
        p: [159, 169, 174]
      });
    }
    h += '</div>';

    h += '<div class="sec">' + L.readBlocks(
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Pelan pemulihan berjaya mencapai matlamat segeranya: LTH boleh mengagihkan hibah semula dan ' +
      'keyakinan pendeposit pulih. Suruhanjaya menyifatkannya sebagai "solusi interim yang penting".</li>' +
      '<li>Tetapi Suruhanjaya juga menyatakan dengan jelas ia <b>bukan solusi jangka panjang</b> — ' +
      '"terdapat pelbagai isu yang masih kritikal yang perlu diatasi".</li>' +
      '<li>Kebimbangan utama Suruhanjaya bukan tentang UJSB, tetapi tentang <b>keupayaan Kerajaan</b> ' +
      'menebus Sukuk dan memberi peruntukan tunai tahunan seperti dijanjikan.</li></ul>',
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Kita <b>tidak boleh</b> mengatakan Kerajaan "hilang" RM10.2 bilion. Premium itu belum dibayar tunai — ' +
      'ia obligasi masa hadapan yang matang 2026 dan 2029.</li>' +
      '<li>Kita <b>tidak boleh</b> mengetahui nilai semasa aset UJSB. Laporan hanya memberi penilaian hartanah ' +
      'setakat 31 Disember 2021 dan harga saham setakat 8 Jun 2022.</li>' +
      '<li>Kita <b>tidak boleh</b> mengetahui sama ada peruntukan RM1.73 bilion setahun telah dihantar selepas ' +
      'laporan ini bertarikh 19 Julai 2022.</li></ul>'
    ) + '</div>';
    return h;
  }
};

/* ================= 6. PELABURAN BERMASALAH (14 KES) ====================== */
V.pelaburan = {
  nav: '14 pelaburan bermasalah', kicker: 'Penerokaan kes',
  h1: 'Empat belas pelaburan yang Suruhanjaya mahu diaudit forensik',
  desc: 'Dari ladang di Kalimantan ke hotel di Makkah. Susun, tapis dan bandingkan setiap kes — ' +
    'dan perhatikan corak yang berulang.',
  init: function () {
    if (S.plbSort == null) S.plbSort = 'rugi';
    if (S.plbStatus == null) S.plbStatus = [];
    if (S.plbOpen == null) S.plbOpen = null;
  },
  render: function () {
    var all = RD.pelaburan, meta = RD.pelaburanMeta;
    var statuses = Object.keys(meta.status);
    var sel = S.plbStatus;
    var rows = all.filter(function (p) { return !sel.length || sel.indexOf(p.status) >= 0; });
    if (S.plbSort === 'rugi') rows = rows.slice().sort(function (a, b) { return (b.rugiRm || -1) - (a.rugiRm || -1); });
    else if (S.plbSort === 'nama') rows = rows.slice().sort(function (a, b) { return a.n.localeCompare(b.n); });
    else if (S.plbSort === 'sektor') rows = rows.slice().sort(function (a, b) { return a.sektor.localeCompare(b.sektor); });
    var rugi = L.derive.rugiPelaburan(), po = L.derive.putOption();
    var maxRugi = Math.max.apply(null, all.map(function (p) { return p.rugiRm || 0; }));
    var h = '';

    /* --- proses yang rosak --- */
    h += '<div class="sec">';
    h += L.verdict('fail', 'Dapatan pembuka Suruhanjaya', '"' + meta.dapatanUtama + '"');
    h += L.card({
      t: 'Mengapa begitu banyak pelaburan bermasalah? Lima kegagalan proses', badge: L.pv('fakta'),
      body: '<ol style="margin:2px 0 0;padding-left:20px;font-size:13.2px;line-height:1.6;color:var(--ink-2)">' +
        meta.prosesRosak.map(function (x) { return '<li style="margin-bottom:7px">' + x + '</li>'; }).join('') + '</ol>',
      note: 'Perhatikan corak: setiap lapisan kawalan yang sepatutnya menyemak — Panel Pelaburan, Lembaga, ' +
        'Menteri — akhirnya bergantung kepada nasihat lapisan sebelumnya. Suruhanjaya: "Semua dokumen ' +
        'menunjukkan kenyataan <b>dipersetujui seperti dicadangkan</b>."',
      p: [176, 177]
    });
    h += '</div>';

    /* --- corak: put option --- */
    h += '<div class="sec"><h2>Corak yang berulang tiga kali: janji IPO + put option</h2>' +
      '<p class="lead">Tiga daripada 14 kes mengikut resipi yang sama. Ini bukan nasib malang tiga kali; ' +
      'ia corak keputusan.</p>';
    h += L.card({
      t: 'Emrail, Wellspring dan Putrajaya Perdana', badge: L.pvs('fakta', 'terbit'),
      body: '<p class="csub">Resipinya: LTH beli pegangan minoriti dalam syarikat tidak tersenarai → ' +
        'penjual berjanji syarikat akan disenaraikan di Bursa Malaysia dan mencapai sasaran keuntungan tertentu → ' +
        'LTH dilindungi oleh ' + L.g('put option') + ' yang membolehkannya memaksa penjual beli balik saham → ' +
        'IPO tidak berlaku, sasaran keuntungan tidak dicapai → LTH melaksanakan put option → ' +
        '<b>penjual tidak mampu atau tidak mahu bayar</b>.</p>' +
        L.svgHBars({
          w: 700, labelW: 148, rowH: 32, valW: 118,
          rows: [
            { k: 'Putrajaya Perdana', v: 210.7, lab: 'Tuntut RM210.7j · Terima RM0', color: 'var(--bad)',
              tip: 'Beli 30% pada RM193.50 juta (Dis 2014). Put option RM210.7 juta dilaksanakan 7 Mac 2018. ' +
                'CDSB gagal bayar. Rosot nilai RM145.3 juta; nilai buku bersih tinggal RM48.2 juta.' },
            { k: 'Emrail', v: 20.3, lab: 'Tuntut RM20.3j · Terima RM2j', color: 'var(--bad)',
              tip: 'Beli 15.3% pada RM20.17 juta (7 Jun 2016). Put option RM20.3 juta. LHSB hanya bayar RM2 juta. ' +
                'Rosot nilai RM19.3 juta. Kini di timbang tara AIAC.' },
            { k: 'Wellspring Worldwide', v: 19.03, lab: 'Tuntut RM19.03j · Terima RM0', color: 'var(--bad)',
              tip: 'Beli 10% pada RM18.4 juta (21 Sep 2014). Put option RM19.03 juta. Mahkamah perintah bayar ' +
                'RM20.8 juta (5 Okt 2018) — Promoters tetap tidak bayar. Notis kebankrapan dibenarkan 25 Jan 2022.' }
          ],
          axisLabel: 'Nilai put option yang dituntut (RM juta)'
        }),
      note: '<b>Data terbitan:</b> jumlah yang dituntut melalui put option ' + L.rmj(po.terdedah) +
        '. Jumlah yang benar-benar diterima: <b>' + L.rmj(po.dibayar) + '</b> — iaitu ' +
        L.pct(po.dibayar / po.terdedah * 100, 1) + '. ' +
        'Pelajaran: put option hanya berharga sebanyak kemampuan bayar pihak yang memberikannya. ' +
        'LTH tidak menilai kemampuan itu.',
      limit: 'Kes-kes ini masih berjalan di mahkamah atau timbang tara. Jumlah pemulihan akhir belum diketahui. ' +
        'Kebankrapan Promoters Wellspring dibenarkan pada Januari 2022 — tetapi itu tidak bermakna wang akan diterima.',
      p: [178, 179, 180, 183, 184]
    });
    h += '</div>';

    /* --- agregat --- */
    h += '<div class="sec"><h2>Skala keseluruhan</h2>';
    h += L.tiles([
      { l: 'Kes yang disyorkan untuk audit forensik', v: '14', tip: 'Senarai penuh dalam syor 4.4.10 laporan.' },
      { l: 'Kes yang ada angka kerugian RM dalam laporan', v: String(rugi.bil), d: 'daripada 14',
        tip: 'Dua kes (THIP, THHR) tidak mempunyai angka kerugian RM yang jelas dalam laporan.' },
      { l: 'Jumlah rosot nilai / kerugian yang disebut', v: L.rmj(rugi.jumlah), cls: 'neg',
        d: 'Data terbitan — BUKAN satu ukuran seragam',
        tip: 'Jumlah ini mencampur jenis angka berbeza: rosot nilai, hapus kira, kerugian tidak nyata, ' +
          'dan jangkaan kerugian kredit. Ia juga TIDAK termasuk jumlah dalam USD (THIP USD910j, Trurich USD179j) ' +
          'atau SR (Al-Rawda SR1,426j) kerana laporan tidak memberi kadar tukaran.' },
      { l: 'Kes yang melibatkan pihak berkuasa (polis/SPRM/SC)', v: '3', cls: 'neg',
        d: 'THIP, Trurich, TH Plantations',
        tip: 'Tiga kes mempunyai laporan polis atau siasatan penguatkuasaan yang masih berjalan.' }
    ]);
    h += L.card({
      t: 'Kerugian yang disebut dalam laporan, mengikut kes', badge: L.pvs('fakta', 'terbit'),
      sub: 'Hanya kes yang mempunyai angka RM dalam laporan. Perhatikan: angka ini bukan jenis yang sama — ' +
        'lihat nota di bawah.',
      body: L.svgHBars({
        w: 700, labelW: 156, rowH: 27, valW: 96,
        rows: all.filter(function (p) { return p.rugiRm != null; })
          .sort(function (a, b) { return b.rugiRm - a.rugiRm; })
          .map(function (p) {
            return { k: p.n.replace(/ \(.*$/, '').replace(/ Sdn\. Bhd\..*$/, '').replace(' Berhad', ''),
              v: p.rugiRm, lab: L.rmj(p.rugiRm),
              color: p.rugiRm > 300 ? 'var(--bad)' : p.rugiRm > 100 ? 'var(--warn)' : 'var(--neutral)',
              tip: p.n + ' · ' + p.skala.label + ': ' + L.num(p.skala.v, 2) + ' ' + p.skala.mata +
                (p.rugiRmNota ? ' · ' + p.rugiRmNota : '') };
          }),
        axisLabel: 'RM juta'
      }),
      note: '<b>Baca dengan hati-hati.</b> Angka-angka ini bukan jenis yang sama: FGV ialah <em>kerugian tidak ' +
        'nyata</em> yang akhirnya diambil alih UJSB pada harga kos; Trurich ialah <em>rosot nilai penuh</em>; ' +
        'Al-Rawda ialah <em>jangkaan kerugian kredit</em> yang masih dituntut di mahkamah Arab Saudi; ' +
        'Al-Fareeda ialah <em>hapus kira</em> penuh. Menjumlahkannya memberi rasa skala, bukan angka rasmi.',
      limit: 'Jumlah ini <b>tidak termasuk</b> THIP (nilai transaksi USD910 juta dianggarkan) dan THHR, kerana ' +
        'laporan tidak memberi angka kerugian RM untuk kes-kes itu. Ia juga tidak termasuk pinjaman ' +
        'Trurich kepada Maybank USD179 juta yang masih tertunggak.',
      p: [177, 193]
    });
    h += '</div>';

    /* --- penjelajah --- */
    h += '<div class="sec"><h2>Terokai setiap kes</h2>';
    h += '<div class="ctl">' +
      '<label class="fld">Susun ikut' + L.seg('plbSort', [
        { v: 'rugi', l: 'Kerugian' }, { v: 'nama', l: 'Nama' }, { v: 'sektor', l: 'Sektor' }
      ], S.plbSort) + '</label></div>';
    h += '<div class="ctl">' + L.chips('plbStatus', statuses.map(function (k) {
      return { v: k, l: meta.status[k] + ' (' + all.filter(function (p) { return p.status === k; }).length + ')' };
    }), sel) + '</div>';
    h += '<p class="scrollx-hint">Menunjukkan <b>' + rows.length + '</b> daripada 14 kes. Tekan mana-mana kad untuk butiran penuh.</p>';
    h += '<div class="ecards">';
    rows.forEach(function (p) {
      var open = S.plbOpen === p.id;
      h += '<article class="ec" data-open="' + p.id + '" style="cursor:pointer">' +
        '<div class="eh"><b>' + L.esc(p.n) + '</b>' +
        '<span class="etag st-' + (p.status === 'timbangtara' ? 'mahkamah' : p.status) + '">' +
        L.esc(RD.pelaburanMeta.status[p.status]) + '</span></div>' +
        '<div class="meta"><span>' + L.esc(p.sektor) + '</span><span>' + L.esc(p.lokasi) + '</span>' +
        '<span>' + L.esc(p.modus) + '</span></div>' +
        (p.rugiRm != null ? '<div class="lossbar" title="' + L.esc(p.skala.label) + '"><i style="width:' +
          (p.rugiRm / maxRugi * 100).toFixed(1) + '%"></i></div>' +
          '<div style="font-size:11.5px;color:var(--ink-3);margin-top:5px">' + L.esc(p.skala.label) + ': <b style="color:var(--bad)">' +
          L.num(p.skala.v, 2) + ' ' + p.skala.mata + '</b></div>' : '') +
        '<p class="desc">' + L.esc(p.isu.slice(0, open ? 4000 : 190) + (!open && p.isu.length > 190 ? '…' : '')) + '</p>';
      if (open) {
        h += '<dl>' + p.angka.map(function (a) {
          return '<dt>' + L.esc(a.k) + '</dt><dd>' + L.esc(a.v) + '</dd>';
        }).join('') + '</dl>';
        h += '<div class="cnote" style="margin-top:11px"><b>Tindakan yang diambil:</b> ' + L.esc(p.tindakan) + '</div>';
        if (p.pegangan) h += '<div style="font-size:12px;color:var(--ink-3);margin-top:8px"><b>Pegangan:</b> ' + L.esc(p.pegangan) + '</div>';
        if (p.rugiRmNota) h += '<div style="font-size:12px;color:var(--ink-3);margin-top:5px">' + L.esc(p.rugiRmNota) + '</div>';
        h += L.src(p.p);
      } else {
        h += '<div style="font-size:11.5px;color:var(--accent-ink);font-weight:700;margin-top:9px">Tekan untuk butiran penuh, angka dan tindakan →</div>';
      }
      h += '</article>';
    });
    h += '</div></div>';

    h += '<div class="sec">' + L.readBlocks(
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Corak berulang jelas: pelaburan dalam bidang yang LTH tiada kepakaran (perladangan Indonesia, ' +
      'kapal marin, hartanah Arab Saudi), sering melalui usaha sama atau put option, dengan pemantauan lemah.</li>' +
      '<li>Suruhanjaya berpandangan setiap anggota Lembaga, Lembaga Pengarah anak syarikat, pengurusan dan ' +
      'kakitangan yang terlibat <b>patut dipertanggungjawabkan</b> atas kerugian yang dialami.</li>' +
      '<li>Punca struktur yang dikenal pasti: visi "tonggak ekonomi ummah" mendorong LTH ke dalam pelaburan ' +
      'hartanah dan perladangan besar-besaran tanpa kepakaran.</li></ul>',
      '<ul style="margin:0;padding-left:18px">' +
      '<li>Kita <b>tidak boleh</b> menjumlahkan semua kerugian menjadi satu angka rasmi — jenis angkanya berbeza ' +
      'dan tiga mata wang digunakan tanpa kadar tukaran.</li>' +
      '<li>Kita <b>tidak boleh</b> menganggap semua kes ini melibatkan salah laku. Laporan menyebut ' +
      '"transaksi yang mencurigakan" secara umum dan mengesyorkan audit forensik — iaitu ' +
      '<b>penyiasatan belum dibuat</b>, bukan kesimpulan.</li>' +
      '<li>Kita <b>tidak boleh</b> mengetahui hasil akhir kes mahkamah dan timbang tara. Semuanya masih berjalan ' +
      'semasa laporan disiapkan.</li></ul>'
    ) + '</div>';
    return h;
  }
};
