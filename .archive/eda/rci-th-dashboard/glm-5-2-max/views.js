/* ==========================================================================
   views.js — Fasal-fasal penerokaan data RCI Tabung Haji
   Each view returns an element (or HTML string) appended into #main.
   Mobile-first; charts horizontal-scroll when needed.
   ========================================================================== */
(function () {
  'use strict';
  var RD = window.RD;
  var CH = window.CH;
  var fmtNum = CH.fmtNum, fmtRM = CH.fmtRM;
  var VIEWS = {};

  /* ---- helpers ---- */
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function div(cls, html) {
    var d = el('div', cls);
    if (html != null) d.innerHTML = html;
    return d;
  }
  function pvi(kind, text) {
    return '<span class="pvi ' + kind + '"><i></i>' + text + '</span>';
  }
  function src(pages) {
    if (pages == null) return '';
    if (!Array.isArray(pages)) pages = [pages];
    return '<span class="src">m/s ' + pages.join(', ') + '</span>';
  }
  function kpi(label, value, sub) {
    return '<div class="kpi-cell"><div class="kpi-l">' + label + '</div><div class="kpi-v">' + value + '</div>' +
      (sub ? '<div class="kpi-s">' + sub + '</div>' : '') + '</div>';
  }
  function chartWrap(svg, caption) {
    var w = div('chart'); w.appendChild(svg);
    if (caption) w.appendChild(div('chart-cap', caption));
    return w;
  }

  /* ========================================================================
     VIEW: 00 — Fasal Pembukaan
     ======================================================================== */
  VIEWS['overview'] = {
    t: 'Fasal Pembukaan',
    n: '00',
    render: function () {
      var m = RD.meta;
      var node = div('view active');
      node.innerHTML =
        '<div class="seal">Suruhanjaya Siasatan Diraja · 6 Pesuruhjaya · 6 bulan</div>' +
        '<h1 class="h1"><span class="h1-num">Fasal 00 — Pembukaan</span>Bagaimana Tabung Haji hampir tumbang</h1>' +
        '<p class="lead">Sebuah dashboard untuk membaca, meneroka dan menyiasat data di sebalik Laporan Suruhanjaya Siasatan Diraja (RCI) Tabung Haji. Bukan ringkasan — alat untuk anda buktikan sendiri.</p>' +
        '<p class="lead">Cerita utamanya ringkas: antara 2014 dan 2017, LTH membayar <strong>hibah lebih tinggi daripada kemampuan</strong>, menutup kerugian dengan <strong>amalan perakaunan kreatif</strong>, dan apabila keadaan pecah, Kerajaan terpaksa tubuhkan sebuah syarikat penyelamat (UJSB) untuk menyerap kerugian <strong>RM10.2 bilion</strong> daripada pendeposit. Empat pelaburan terpaksa dihapus kira. Lapan lagi masih dalam mahkamah atau siasatan polis.</p>' +
        '<div class="kpi">' +
          kpi('Tempoh siasatan', m.tempohSiasatan, '20 Jan 2022 → 19 Jul 2022') +
          kpi('Saksi', '45 + 16 lisan', 'Akuan Berkanun + keterangan') +
          kpi('Skop', '2014–2020', 'dengan unjuran ke 2030') +
          kpi('Muka surat', m.mukaSurat + ' PDF', 'Versi OCR Markdown') +
        '</div>' +
        '<h2 class="h2">Empat persoalan utama yang dashboard ini jawab</h2>' +
        '<div class="card">' +
          '<h3 class="h3">1. Bolehkah LTH bayar hibah yang diisytiharkan?</h3>' +
          '<p class="mb0">Mulai 2014, jumlah aset LTH tidak menampung jumlah liabiliti (termasuk deposit pendeposit). Hibah RM3.24 bilion (2014) melebihi lebihan sebelum agihan — kedudukan bersih terus negatif. Lihat <a href="#/kewangan">Fasal 02 — Krisis Kewangan</a>.</p>' +
        '</div>' +
        '<div class="card">' +
          '<h3 class="h3">2. Bagaimana LTH "menunjukkan" untung sedang sebenarnya rugi?</h3>' +
          '<p class="mb0">Polisi rosot nilai diubah dua kali dalam satu hari (ambang 70% → 85% → 90%). Pengurusan guna Nilai Aset Boleh Direalisasi (RAV) untuk "menaikkan" nilai aset RM4.5 bilion. Hasilnya: kerugian sebenar 2017 ialah RM1.4 bilion, bukan keuntungan RM3.4 bilion. Lihat <a href="#/rav">Fasal 03 — Kreativiti Perakaunan</a>.</p>' +
        '</div>' +
        '<div class="card">' +
          '<h3 class="h3">3. Siapa yang tolong LTH — dan berapa kosnya ke negara?</h3>' +
          '<p class="mb0">UJSB ditubuhkan 14 Disember 2018. Menerima aset LTH pada nilai RM19.9 bilion (vs nilai pasaran RM9.7 bilion) — premium RM10.2 bilion. Kerajaan komited RM17.8 bilion untuk penebusan Sukuk. Tetapi pada 2021, RM1.5 bilion yang diluluskan TIDAK diterima (Covid-19 diutamakan). Lihat <a href="#/ujsb">Fasal 04 — Penyelamatan</a>.</p>' +
        '</div>' +
        '<div class="card">' +
          '<h3 class="h3">4. Pelaburan mana yang paling banyak gugur?</h3>' +
          '<p class="mb0">14 pelaburan disyorkan untuk audit forensik. FGV sahaja kerugian tidak nyata RM1.06 bilion. Al-Rawda (4 hotel Makkah/Madinah) tertunggak sewa SR560.7 juta. TH Marine: dari RM334 juta, hanya RM70.4 juta dijangka pulih. Lihat <a href="#/pelaburan">Fasal 05 — 14 Pelaburan Bermasalah</a>.</p>' +
        '</div>' +
        '<h2 class="h2">Bagaimana nak guna dashboard ini</h2>' +
        '<p>Setiap fasal dibahagi kepada jadual, carta dan "bukti asal". Setiap angka penting membawa <span class="src">rujukan muka surat</span>. Gunakan carian <svg viewBox="0 0 22 22" style="width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.6;vertical-align:-2px"><circle cx="9.5" cy="9.5" r="5.5"/><path d="M14 14l5 5"/></svg> di kanan atas untuk lompat ke mana-mana nama, angka atau isu.</p>' +
        '<div class="card gold">' +
          '<strong class="kicker">Bidal data — baca sebelum guna</strong>' +
          '<div class="legend" style="margin-top:6px">' +
            '<span><i class="pv fakta"></i>Fakta laporan — disalin terus dari teks RCI</span>' +
            '<span><i class="pv terbit"></i>Data terbitan — kiraan mudah kami (tolak/bahagi/jumlah)</span>' +
            '<span><i class="pv unjur"></i>Unjuran laporan — ramalan LTH/RCI, bukan sejarah</span>' +
            '<span><i class="pv sim"></i>Simulasi anda — berubah bila anda gerakkan slider</span>' +
          '</div>' +
          '<p class="mt6 mb0 muted">Tanda angka <span class="pvi fakta">Fakta</span> bermaksud nombor diambil terus dari laporan. Tanda <span class="pvi terbit">Data terbitan</span> bermaksud kami kira sendiri (cth: jumlah subsidi = kos − bayaran). Tanda <span class="pvi unjur">Unjuran</span> bermaksud ramalan masa hadapan LTH, bukan sejarah. Tanda <span class="pvi sim">Simulasi</span> muncul bila anda gerakkan slider — bukan dapatan RCI.</p>' +
        '</div>' +
        '<h2 class="h2">Pesuruhjaya yang menandatangani laporan</h2>' +
        '<div class="card tint"><div class="kv">' +
          m.pesuruhjaya.map(function (p) { return '<div class="k">' + p.n + '</div><div class="v">' + p.peranan + '</div>'; }).join('') +
        '</div><p class="mt6 mb0 muted">Setiausaha: ' + m.setiausaha + '.</p></div>' +
        '<p class="mt12 muted">Sumber laporan: <a href="https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md" target="_blank" rel="noopener">GitHub — SyahmiRafsan/rci-tabunghaji</a>. ' + src([5, 12, 238]) + '</p>';
      return node;
    }
  };

  /* ========================================================================
     VIEW: 01 — Kronologi
     ======================================================================== */
  VIEWS['kronologi'] = {
    t: 'Garis Masa Siasatan',
    n: '01',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 01 · 1951 → 2022</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 01 — Garis Masa</span>73 tahun dari penubuhan ke krisis</h1>' +
        '<p class="lead">Garis masa ini gabungan tiga jejak: <strong>asas institusi</strong> (1951–1995), <strong>krisis kewangan</strong> (2014–2017), dan <strong>penyelamatan</strong> (2018–2022). Klik setiap peristiwa untuk butiran lanjut.</p>';
      var chips = div('chips');
      [['all', 'Semua'], ['asas', 'Asas'], ['krisis', 'Krisis'], ['amaran', 'Amaran'], ['tadbir', 'Tadbir Urus'], ['ujsb', 'UJSB'], ['hafis', 'HAFIS']].forEach(function (f, i) {
        var c = el('button', 'chip' + (i === 0 ? ' active' : ''));
        c.dataset.filter = f[0];
        c.innerHTML = f[1];
        chips.appendChild(c);
      });
      node.appendChild(chips);
      var tl = el('div', 'tl');
      RD.kronologi.forEach(function (e) {
        var item = el('div', 'tl-item ' + (e.tema || 'neutral'));
        item.dataset.tema = e.tema || 'neutral';
        item.innerHTML = '<div class="tl-d">' + e.d + '</div><div class="tl-t">' + e.t + '</div><div class="tl-b">' + e.b + ' ' + src([e.p]) + '</div>';
        tl.appendChild(item);
      });
      node.appendChild(tl);
      node.appendChild(div('', '<p class="mt12 muted">Sumber kronologi: Bab 1 & 2 (sejarah), Bab 3 (penemuan), Bab 4 (rumusan). ' + src([53, 54, 100, 122, 147, 159, 196, 213]) + '</p>'));
      /* chips filter */
      setTimeout(function () {
        node.querySelectorAll('.chip').forEach(function (c) {
          c.addEventListener('click', function () {
            node.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('active'); });
            c.classList.add('active');
            var f = c.dataset.filter;
            node.querySelectorAll('.tl-item').forEach(function (it) {
              if (f === 'all' || it.dataset.tema === f) it.style.display = '';
              else it.style.display = 'none';
            });
          });
        });
      }, 20);
      return node;
    }
  };

  /* ========================================================================
     VIEW: 02 — Krisis Kewangan (aset/liabiliti, hibah)
     ======================================================================== */
  VIEWS['kewangan'] = {
    t: 'Krisis Kewangan',
    n: '02',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 02 · 2013 → 2017</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 02 — Krisis Kewangan</span>Bila hibah melebihi kemampuan</h1>' +
        '<p class="lead">PwC mengesan bahawa jumlah liabiliti LTH (termasuk deposit pendeposit) sudah melebihi jumlah aset sejak 2015. Tetapi LTH terus mengisytiharkan hibah 4–6% setiap tahun. Inilah punca utama krisis.</p>' +
        '<div class="kpi">' +
          kpi('Defisit bersih 2017', '−RM4.09 bilion', pvi('fakta', 'PwC') + ' · m/s 147') +
          kpi('Hibah 2017 dibayar', 'RM3.32 bilion', pvi('fakta', 'Laporan') + ' · m/s 130') +
          kpi('Kemampuan sebenar 2017', 'RM2.70 bilion', pvi('fakta', 'JAN') + ' · m/s 131') +
          kpi('Lebihan yang "dipaksa keluar"', '+RM610 juta', pvi('terbit', 'Kami kira') + ' (22.5%)') +
        '</div>';
      /* Chart 1: aset vs liabiliti (grouped bar) */
      var svg1 = CH.groupedBar({
        rows: RD.posisi.rows.map(function (r) { return { y: r.y, aset: r.aset, liab: -r.liab }; })
      }, {
        series: [
          { k: 'aset', name: 'Jumlah aset', color: 'var(--gold)' },
          { k: 'liab', name: 'Jumlah liabiliti (termasuk deposit)', color: 'var(--crimson)' }
        ],
        w: 480, h: 260,
        title: 'Aset vs liabiliti LTH (RM juta)',
        dp: 0,
        label: 'y'
      });
      node.appendChild(chartWrap(svg1,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — jadual PwC. ' + src(RD.posisi.p) +
        '. Sejak 2015, liabiliti melebihi aset. Defisit bersih 2017 = RM4.09 bilion.'));
      /* Chart 2: waterfall posisi 2017 */
      var svg2 = CH.line({
        rows: RD.posisi.rows
      }, {
        series: [
          { k: 'pra', name: 'Sebelum hibah', color: 'var(--gold)' },
          { k: 'pasca', name: 'Selepas hibah', color: 'var(--crimson)' }
        ],
        w: 480, h: 220, dp: 0, label: 'y', title: 'Lebihan/(Kekurangan) sebelum vs selepas hibah (RM juta)',
        zeroBase: true
      });
      node.appendChild(chartWrap(svg2,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — garis kelebihan pra-agihan (atas) vs pasca-agihan (bawah). ' +
        'Selepas 2014, LTH sentiasa defisit selepas bayar hibah. ' + src(RD.posisi.p)));
      /* Hibah kadar */
      node.appendChild(el('h2', 'h2', 'Kadar hibah 2014–2021 — penurunan dramatik 2018'));
      var svg3 = CH.line({ rows: RD.hibahKadar.rows }, {
        series: [{ k: 't', name: 'Hibah tahunan (%)', color: 'var(--gold)' }],
        w: 480, h: 200, dp: 2, label: 'y', title: 'Kadar hibah tahunan (%)'
      });
      node.appendChild(chartWrap(svg3,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — kadar hibah turun dari 6.25% (2014) ke 1.25% (2018). ' +
        'Selepas 2019, hibah haji tidak lagi dibayar. ' + src(RD.hibahKadar.p) + '.'));
      /* Hibah jumlah vs untung */
      node.appendChild(el('h2', 'h2', 'Hibah dibayar vs keuntungan sebenar — 2017 paling teruk'));
      var svg4 = CH.groupedBar({ rows: RD.hibahJumlah.rows.map(function (r) {
          return { y: r.y, hibah: r.j / 1000, untung: (RD.untungBersih.rows.find(function (u) { return u.y === r.y; }) || {}).v };
        }) }, {
        series: [
          { k: 'hibah', name: 'Hibah dibayar (RM bilion)', color: 'var(--crimson)' },
          { k: 'untung', name: 'Keuntungan bersih (RM bilion)', color: 'var(--green)' }
        ],
        w: 480, h: 240, dp: 2, label: 'y', title: 'Hibah dibayar vs keuntungan bersih (RM bilion)'
      });
      node.appendChild(chartWrap(svg4,
        '<span class="pvi terbit"><i></i>Data terbitan</span> — hibah 2014, 2015, 2017 semuanya melebihi keuntungan. ' +
        '2018 paling ketara: hibah RM0.92b, keuntungan tiada data. ' + src([130, 139])));
      /* Conclusion card */
      node.appendChild(div('card warn',
        '<h3 class="h3">Apa yang tidak boleh disimpulkan</h3>' +
        '<p class="mb0">Data ini menunjukkan hibah melebihi kemampuan. Tetapi ia TIDAK membuktikan niat jenayah — itu sebab RCI syor audit forensik. Laporan polis (Fasal 06) ada dakwaan "salah nyataan" dalam kertas kerja 6 & 9 Feb 2018, tetap belum dibicarakan.</p>'
      ));
      node.appendChild(div('', '<p class="mt12 muted">Sumber: jadual PwC ' + src([147, 113]) + '; kadar hibah ' + src([120, 130]) + '.</p>'));
      return node;
    }
  };

  /* ========================================================================
     VIEW: 03 — Kreativiti Perakaunan (RAV + rosot nilai)
     ======================================================================== */
  VIEWS['rav'] = {
    t: 'Kreativiti Perakaunan',
    n: '03',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 03 · 2017 — tahun paling kritikal</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 03 — Kreativiti Perakaunan</span>Bagaimana "untung" RM3.4 bilion jadi "rugi" RM1.4 bilion</h1>' +
        '<p class="lead">Pengurusan LTH guna dua helah untuk menampung hibah 2017: (1) <strong>RAV</strong> — naikkan nilai aset dengan anggaran sendiri RM4.5 bilion; (2) <strong>rosot nilai</strong> — tukar ambang dari 70% ke 90% dalam satu hari, mengurangkan rosot nilai yang patut direkod dari RM1.31 bilion ke RM1 juta.</p>';
      /* RAV waterfall */
      var svg1 = CH.waterfall({
        rows: [
          { k: 'Aset audit', v: 70317, jenis: 'base' },
          { k: 'Uplift RAV', v: 4466, jenis: 'adj' },
          { k: 'Aset RAV', v: 0, jenis: 'adj' }
        ],
        hasil: { k: 'Lebihan RAV', v: 373 }
      }, { w: 480, h: 260, title: 'Jambatan RAV 2017 (RM juta)', dp: 0 });
      /* Manual adjust: highlight the key bars differently */
      node.appendChild(chartWrap(svg1,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — aset beraudit RM70.3b, ditambah anggaran RAV RM4.5b, jadi aset RAV RM74.8b. ' +
        'Liabiliti RM74.4b. Lebihan tinggal RM373 juta — satu jurang nipis untuk "membuktikan" kemampuan hibah. ' + src(RD.rav.p) + '.'));
      /* Rosot nilai sensitivity */
      node.appendChild(el('h2', 'h2', 'Polisi rosot nilai diubah dua kali — kesan pada satu nombor'));
      var svg2 = CH.bar({
        rows: RD.rosot.rows.map(function (r) { return { label: r.label, v: r.kesan }; })
      }, {
        w: 480, h: 240, dp: 0, title: 'Kesan ambang rosot nilai pada 2017 (RM juta)',
        colorFn: function (r, c) {
          if (r.id === 'frs' || r.id === 'p70') return c.bad;
          if (r.id === 'p85') return c.gold;
          return c.good;
        }
      });
      node.appendChild(chartWrap(svg2,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — dengan ambang lama (>70%), rosot nilai sepatutnya RM1,313 juta. ' +
        'Selepas dua pindaan dalam 2017, hanya RM1 juta direkod. Beza = RM1.31 bilion. ' + src(RD.rosot.p) + '.'));
      /* Adjusted P&L waterfall */
      node.appendChild(el('h2', 'h2', 'Penyata untung/rugi 2017 selepas pelarasan PwC'));
      var svg3 = CH.waterfall(RD.pl2017, { w: 480, h: 260, title: 'Untung 2017 → Kerugian terlaras (RM juta)', dp: 0 });
      node.appendChild(chartWrap(svg3,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — keuntungan direkod RM3.4b ditolak rosot nilai AFS RM4.26b + pelarasan lain = kerugian terlaras RM1.4 bilion. ' +
        src(RD.pl2017.p) + '.'));
      /* THP RAV composition donut */
      node.appendChild(el('h2', 'h2', 'Siapa nilai aset? Anggaran pengurusan vs penilai bertauliah'));
      var svg4 = CH.donut([
        { k: 'Penilai bertauliah', v: 556, color: 'var(--green)' },
        { k: 'Anggaran pengurusan', v: 4044, color: 'var(--crimson)' }
      ], { w: 240, h: 240, centerLabel: 'THP dalam RAV', dp: 0, fmt: function (v) { return 'RM' + fmtNum(v, 0) + ' juta'; } });
      node.appendChild(chartWrap(svg4,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — komponen TH Plantations dalam RAV 2017. Daripada nilai hartanah RM4.6 bilion, hanya 12% disahkan penilai profesional. ' +
        '88% anggaran pengurusan. ' + src([113, 114]) + '.'));
      /* Slider simulation */
      node.appendChild(el('h2', 'h2', 'Simulasi: jika ambang rosot nilai kekal pada 70%'));
      var card = el('div', 'card');
      card.innerHTML = '<h3 class="h3">Gerakkan ambang untuk lihat kesan kepada keuntungan 2017</h3>' +
        '<div class="range"><label>Ambang jatuh nilai (% kos)</label>' +
        '<input type="range" id="ravSlider" min="20" max="95" value="70" step="5">' +
        '<span class="val" id="ravVal">70%</span></div>' +
        '<div id="ravOut" class="mt6"></div>';
      node.appendChild(card);
      /* Insight */
      node.appendChild(div('card warn',
        '<h3 class="h3">Apa yang tidak boleh disimpulkan</h3>' +
        '<p class="mb0">Helah RAV dan tukar ambang rosot nilai — kedua-duanya diluluskan dalaman LTH. KAN (JAN) tahu, tetapi dilembutkan kepada "Emphasis of Matter". Tiada siapa yang didakwa atas helah ini. Laporan polis ada tuduhan "salah nyataan" dalam kertas kerja 6 & 9 Feb 2018 — tetapi di JPN, belum didakwa.</p>'
      ));
      node.appendChild(div('', '<p class="mt12 muted">Sumber: RAV ' + src([116, 113]) + '; polisi rosot nilai ' + src([148, 115]) + '; kerugian terlaras ' + src([149]) + '.</p>'));
      /* slider logic */
      setTimeout(function () {
        var slider = card.querySelector('#ravSlider');
        var out = card.querySelector('#ravOut');
        var val = card.querySelector('#ravVal');
        function upd() {
          var a = +slider.value;
          val.textContent = a + '%';
          /* interpolate rosot nilai: ambang 70 → RM1,313 juta; ambang 90 → RM1 juta */
          var rosot = a >= 70 ? Math.max(1, 1313 * Math.pow(1 / 1313, (a - 70) / 20)) : 1313 * (90 - a) / 20 + 1313 * (a - 20) / 80;
          /* simpler: linear-log */
          if (a <= 70) rosot = 1313;
          else if (a >= 90) rosot = 1;
          else rosot = 1313 - (1313 - 1) * Math.pow((a - 70) / 20, 1.5);
          rosot = Math.round(rosot);
          var untungTerlaras = 3412 - rosot - 4258 + 1310 - 7 - 580; /* orig 3412 + rosot nilai AFS -4258 (already there) + tambah rosot "sepatut" - 7 - 580 */
          /* cleaner: keuntungan terlaras = 3412 - (4258 + 7 + 580) + (1310 - rosot_dipilih_sebagai_ganti_untuk_AFS) ... */
          /* We'll do a simple heuristic: keuntungan asal RM3,412 juta; tolak rosot nilai penuh (RM1,310 juta FRs 139 yang tak diambil kira) + pelarasan lain RM587 juta = keuntungan terlaras */
          /* the bigger rosot nilai sepatutnya direkod, the lower untung */
          var adjUntung = 3412 - (rosot + 4258 - 1310) - 7 - 580; /* using rosot = rosot nilai sepatut direkodkan (menggantikan RM1,310) */
          /* wait — AFS impairment was RM4,258; that's already the impairment on AFS equity investments. FRs 139 would have included the 1,310 instead. So the proper adjustment is: take 4258 - 1310 + rosot = 4258 - 1310 + rosot. */
          adjUntung = 3412 - (4258 - 1310 + rosot) - 7 - 580;
          var hibahMampu = adjUntung > 0 ? Math.min(3310, adjUntung) : 0;
          out.innerHTML =
            '<div class="kpi" style="margin-top:6px">' +
              kpi('Rosot nilai direkod', 'RM' + fmtNum(rosot, 0) + ' juta', pvi('sim', 'Simulasi')) +
              kpi('Keuntungan terlaras 2017', 'RM' + fmtNum(adjUntung, 0) + ' juta', pvi('sim', adjUntung < 0 ? 'Rugi' : 'Untung')) +
              kpi('Hibah 2017 dibayar sebenar', 'RM3.31 bilion', pvi('fakta', 'Fakta')) +
              kpi('Nisbah hibah/keuntungan', hibahMampu > 0 ? (3310 / adjUntung * 100).toFixed(0) + '%' : '∞ (rugi)', pvi('terbit', 'Kami kira')) +
            '</div>' +
            '<p class="mt6 mb0 muted">Pada ambang ' + a + '%, rosot nilai sepatutnya direkod ~RM' + fmtNum(rosot, 0) + ' juta. ' +
            (adjUntung < 0 ? 'Keuntungan jadi kerugian.' : 'Keuntungan terlaras RM' + fmtNum(adjUntung, 0) + ' juta — masih hampir separuh daripada hibah RM3.31 bilion yang dibayar.') + '</p>';
        }
        slider.addEventListener('input', upd);
        upd();
      }, 20);
      return node;
    }
  };

  /* ========================================================================
     VIEW: 04 — UJSB / Penyelamatan
     ======================================================================== */
  VIEWS['ujsb'] = {
    t: 'Penyelamatan UJSB',
    n: '04',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 04 · 14 Dis 2018 → kini</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 04 — Penyelamatan</span>UJSB: kerugian RM10.2 bilion dipindah dari pendeposit ke Kerajaan</h1>' +
        '<p class="lead">UJSB (Urusharta Jamaah Sdn. Bhd.) ditubuhkan 14 Disember 2018 untuk menyerap aset "kurang berdaya saing" LTH. Model: Danaharta 1998. Menerima 106 saham tersenarai + 1 perladangan + 29 hartanah pada <strong>nilai RM19.9 bilion</strong> — padahal nilai pasaran ketika itu hanya <strong>RM9.7 bilion</strong>. Premium RM10.2 bilion itulah "kunci" penyelamatan: ia dipindah sebagai Sukuk Murabahah berkupon sifar.</p>' +
        '<div class="kpi">' +
          kpi('Nilai pemindahan aset', 'RM19.9 bilion', pvi('fakta', 'Fakta') + ' · m/s 159') +
          kpi('Nilai pasaran ketika itu', 'RM9.7 bilion', pvi('fakta', 'Fakta')) +
          kpi('Premium (kunci penyelamatan)', 'RM10.2 bilion', pvi('terbit', 'Kami kira: 19.9 − 9.7')) +
          kpi('Tunai sebenar diterima LTH', 'RM500 juta', pvi('fakta', 'Fakta') + ' (2020) · 2021: 0') +
        '</div>';
      /* Pemindahan aset bar chart */
      var svg1 = CH.hbar({
        rows: RD.ujsb.pemindahan.rows.map(function (r) { return { k: r.k, v: r.pindah - r.pasaran }; })
      }, { w: 480, h: 200, dp: 0, leftPad: 140, title: 'Premium pemindahan vs nilai pasaran (RM juta)',
        fmt: function (v) { return '+RM' + fmtNum(v, 0); } });
      node.appendChild(chartWrap(svg1,
        '<span class="pvi terbit"><i></i>Data terbitan</span> — ekuiti tersenarai menyumbang hampir seluruh premium. ' +
        'Hartanah diberi premium ~RM836 juta. ' + src(RD.ujsb.pemindahan.p || RD.ujsb.p)));
      /* Hartanah UJSB — pindah vs pasaran */
      node.appendChild(el('h2', 'h2', 'Hartanah yang diterima UJSB — kini sudah separuh nilai'));
      var svg2 = CH.groupedBar({
        rows: RD.hartanahUjsb.rows.map(function (r) { return { y: r.k, pindah: r.pindah / 1e6, pasaran: r.pasaran / 1e6 }; })
      }, {
        series: [
          { k: 'pindah', name: 'Nilai pemindahan', color: 'var(--gold)' },
          { k: 'pasaran', name: 'Nilai pasaran Dis 2021', color: 'var(--crimson)' }
        ],
        w: 480, h: 220, dp: 1, label: 'y', title: 'Hartanah UJSB: nilai pemindahan vs pasaran (RM juta)'
      });
      node.appendChild(chartWrap(svg2,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — nilai pemindahan RM2.25 bilion. Pasaran Dis 2021 = RM1.20 bilion. ' +
        'Hanya 1 hartanah berjaya dijual setakat laporan (RM920 ribu, Segamat 2020). ' + src(RD.hartanahUjsb.p) + '.'));
      /* Sukuk structure donut */
      node.appendChild(el('h2', 'h2', 'Struktur pembayaran: Sukuk berkupon sifar'));
      var svg3 = CH.donut([
        { k: 'Sukuk Siri 1 (7 thn, 4.05%)', v: 10000, color: 'var(--gold)' },
        { k: 'Sukuk Siri 2 (10 thn, 4.10%)', v: 9600, color: 'var(--blue)' },
        { k: 'Tunai (RM300 juta)', v: 300, color: 'var(--green)' }
      ], { w: 240, h: 240, centerLabel: 'Jumlah nilai', dp: 0, fmt: function (v) { return 'RM' + fmtNum(v, 0) + ' juta'; } });
      node.appendChild(chartWrap(svg3,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — Sukuk berkupon sifar: tiada bayaran tunai berkala. ' +
        'Pulangan datang dari diskaun ke nilai matang (RM13.2b & RM14.3b nominal). ' + src([162, 163])));
      /* Saham blue-chip */
      node.appendChild(el('h2', 'h2', 'Saham blue-chip yang dipindahkan — kerugian RM946 juta'));
      var svg4 = CH.hbar({
        rows: RD.bluechip.rows.map(function (r) { return { k: r.k, v: r.jumlahPindah - r.jumlahPasaran }; })
      }, { w: 480, h: 200, dp: 0, leftPad: 70, title: 'Premium pemindahan (RM, jumlah)',
        fmt: function (v) { return 'RM' + fmtNum(v, 0); } });
      node.appendChild(chartWrap(svg4,
        '<span class="pvi terbit"><i></i>Data terbitan</span> — nilai pemindahan jumlah tolak nilai pasaran jumlah. ' +
        'Axiata & Maxis paling tinggi premiumnya. Harga pasaran 8 Jun 2022 ada dalam tooltip jadual. ' + src(RD.bluechip.p)));
      /* Komitmen Kerajaan */
      node.appendChild(el('h2', 'h2', 'Komitmen Kerajaan — RM17.8 bilion untuk penebusan Sukuk'));
      var svg5 = CH.bar({
        rows: [
          { label: '2020', v: 500 },
          { label: '2021', v: 0 },
          { label: 'RMK-12/13 (anggaran)', v: 17300 }
        ]
      }, { w: 480, h: 220, dp: 0, title: 'Peruntukan Kerajaan untuk UJSB (RM juta)', refMax: 18000 });
      node.appendChild(chartWrap(svg5,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — 2020: RM500 juta diterima. 2021: RM1.5 bilion DILULUSKAN tetapi tidak diterima (Covid diutamakan). ' +
        'RMK-12/13: RM17.3 bilion lagi diperlukan. ' + src([165, 166])));
      /* Komitmen jaminan Kerajaan — bandingan */
      node.appendChild(el('h2', 'h2', 'UJSB dalam senarai jaminan Kerajaan — saiznya'));
      var svg6 = CH.hbar({
        rows: RD.komitmenJaminan.rows.sort(function (a, b) { return b.y2021 - a.y2021; }).slice(0, 8).map(function (r) {
          return { k: r.k, v: r.y2021, sorot: r.sorot };
        })
      }, {
        w: 480, h: 240, dp: 0, leftPad: 160, title: 'Komitmen Jaminan Kerajaan 2021 (RM juta, top 8)',
        fmt: function (v) { return 'RM' + fmtNum(v, 0); },
        colorFn: function (r, c) { return r.sorot ? c.bad : c.gold; }
      });
      node.appendChild(chartWrap(svg6,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — UJSB keempat terbesar selepas DanaInfra, Prasarana, MRL. ' +
        'Jumlah seluruh jaminan Kerajaan 2021: RM190.4 bilion. ' + src(RD.komitmenJaminan.p)));
      /* ROFR */
      node.appendChild(el('h2', 'h2', 'Hak Penolakan Pertama (ROFR) — UJSB tawar balik aset pada harga kontrak'));
      var svg7 = CH.bar({
        rows: RD.rofr.rows.map(function (r) { return { label: r.k, v: r.premium }; })
      }, { w: 480, h: 240, dp: 1, title: 'Premium ROFR ke atas harga pasaran (%)',
        colorFn: function (r, c) { return r.v < 0 ? c.good : c.bad; } });
      node.appendChild(chartWrap(svg7,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — walaupun 7/9 transaksi premium positif (UJSB bayar lebih tinggi dari pasaran), ' +
        'maksudnya: UJSB memilih untuk ambil alih semula pada harga perjanjian kontrak, bukan harga pasaran terendah. ' + src(RD.rofr.p)));
      /* Insight */
      node.appendChild(div('card warn',
        '<h3 class="h3">Risiko terbesar LTH hari ini</h3>' +
        '<p>Sukuk UJSB menyumbang <strong>26% pendapatan tahunan LTH</strong> dan melebihi <strong>1/3 jumlah hibah tahunan</strong>. Kegagalan melunaskan obligasi UJSB = risiko terbesar. ' +
        'Jika LTH gagal, jaminan Kerajaan seksyen 24 Akta 535 (RM88 bilion) terpaksa diaktifkan — mengancam kestabilan sistemik kewangan negara.</p>' +
        '<p class="mb0 muted">' + src([235]) + '</p>'
      ));
      node.appendChild(div('', '<p class="mt12 muted">Sumber: pemindahan aset ' + src([159]) + '; Sukuk ' + src([162, 163]) + '; dana Kerajaan ' + src([165, 166, 167]) + '.</p>'));
      return node;
    }
  };

  /* ========================================================================
     VIEW: 05 — Pelaburan Bermasalah (14 kes)
     ======================================================================== */
  VIEWS['pelaburan'] = {
    t: '14 Pelaburan Bermasalah',
    n: '05',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 05 · 14 kes disyorkan audit forensik</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 05 — 14 Pelaburan Bermasalah</span>Di mana duit pendeposit pergi — dan apa sedang dibuat</h1>' +
        '<p class="lead">Suruhanjaya menyenaraikan 14 pelaburan yang perlu diaudit forensik. Sebahagiannya sudah diselesaikan (DSSB, Abraj, FGV dipindah ke UJSB), sebahagiannya masih dalam mahkamah, timbangtara atau siasatan polis. Jumlah kerugian terbitan kesemuanya: lebih RM2.3 bilion.</p>';
      /* filter chips */
      var chips = el('div', 'chips');
      [['all', 'Semua'], ['polis', 'Polis'], ['mahkamah', 'Mahkamah'], ['timbangtara', 'Timbangtara'], ['selesai', 'Selesai'], ['pantau', 'Pemantauan'], ['hapus', 'Hapus kira']].forEach(function (f, i) {
        var c = el('button', 'chip' + (i === 0 ? ' active' : ''));
        c.dataset.filter = f[0];
        c.innerHTML = f[1] + ' <span class="ct">' + (f[0] === 'all' ? RD.pelaburan.length : RD.pelaburan.filter(function (p) { return p.status === f[0]; }).length) + '</span>';
        chips.appendChild(c);
      });
      node.appendChild(chips);
      /* summary chart */
      var svg1 = CH.hbar({
        rows: RD.pelaburan.filter(function (p) { return p.rugiRm; }).map(function (p) { return { k: shortName(p.n), v: p.rugiRm, id: p.id }; })
          .sort(function (a, b) { return b.v - a.v; })
      }, { w: 480, h: 320, dp: 0, leftPad: 100, title: 'Kerugian/rosot nilai per pelaburan (RM juta)',
        fmt: function (v) { return 'RM' + fmtNum(v, 0); } });
      node.appendChild(chartWrap(svg1,
        '<span class="pvi terbit"><i></i>Data terbitan</span> — jumlah kerugian yang dapat dikira. FGV (RM1.06b) dipindah ke UJSB; Al-Rawda tertunggak sewa SR560.7 juta; TH Marine dijangka hanya dapat RM70.4 juta daripada RM334 juta.'));
      /* list of investments */
      var list = el('div', 'mt12');
      RD.pelaburan.forEach(function (p) {
        var row = el('div', 'row');
        row.dataset.id = p.id;
        row.dataset.status = p.status;
        var rugiText = p.rugiRm ? 'RM' + fmtNum(p.rugiRm, 0) + ' juta' : p.skala + ' ' + (p.mata || '');
        row.innerHTML =
          '<div class="row-top">' +
            '<div><div class="row-t">' + p.n + '</div>' +
            '<div class="row-s">' + p.sektor + ' · ' + p.lokasi + '</div>' +
            '<div class="row-meta">' +
              '<span class="badge ' + statusClass(p.status) + '">' + RD.pelaburanMeta.status[p.status] + '</span>' +
              '<span>' + p.modus + '</span>' +
              ' ' + src(p.p) +
            '</div></div>' +
            '<div class="row-val"><div class="row-v ' + (p.rugiRm ? 'neg' : '') + '">' + rugiText + '</div>' +
            '<div class="row-s">' + (p.mata || '') + '</div></div>' +
          '</div>' +
          '<div class="row-bar"><i style="width:' + (p.rugiRm ? Math.min(100, p.rugiRm / 11) : 5) + '%"></i></div>';
        row.addEventListener('click', function () { openInvestment(p); });
        list.appendChild(row);
      });
      node.appendChild(list);
      node.appendChild(div('card',
        '<h3 class="h3">Proses pelaburan yang rosak</h3>' +
        '<ul style="margin:6px 0 0;padding-left:18px">' +
          RD.pelaburanMeta.prosesRosak.map(function (s) { return '<li style="margin:4px 0;font-size:13px;color:var(--ink-2)">' + s + '</li>'; }).join('') +
        '</ul>' +
        '<p class="mt6 mb0 muted">' + src(RD.pelaburanMeta.p) + '</p>'
      ));
      node.appendChild(div('', '<p class="mt12 muted">Sumber: Bab 3.14, m/s 177–193; senarai m/s 234. Klik setiap pelaburan untuk butiran, saksi dan tindakan.</p>'));
      /* filter logic */
      setTimeout(function () {
        node.querySelectorAll('.chip').forEach(function (c) {
          c.addEventListener('click', function () {
            node.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('active'); });
            c.classList.add('active');
            var f = c.dataset.filter;
            node.querySelectorAll('.row').forEach(function (r) {
              r.style.display = (f === 'all' || r.dataset.status === f) ? '' : 'none';
            });
          });
        });
      }, 20);
      return node;
    }
  };

  function shortName(n) {
    return n.replace(/Sdn\. Bhd\./, '').replace(/\(.*?\)/, function (m) { return m.length > 14 ? '' : m; }).trim();
  }
  function statusClass(s) {
    return { polis: 'bad', mahkamah: 'warn', timbangtara: 'warn', selesai: 'good', hapus: 'bad', pantau: 'neutral' }[s] || 'neutral';
  }
  function openInvestment(p) {
    var body = document.getElementById('modalBody');
    body.innerHTML =
      '<div class="fl mb6">' +
        '<span class="badge ' + statusClass(p.status) + '">' + RD.pelaburanMeta.status[p.status] + '</span>' +
        '<span class="badge ink">' + p.sektor + '</span>' +
        '<span class="badge neutral">' + p.lokasi + '</span>' +
      '</div>' +
      '<p><strong>Pegangan:</strong> ' + p.pegangan + '</p>' +
      '<p><strong>Modus operandi:</strong> ' + p.modus + '</p>' +
      '<h4>Angka kunci</h4>' +
      '<div class="kv">' + p.angka.map(function (a) { return '<div class="k">' + a.k + '</div><div class="v">' + a.v + '</div>'; }).join('') + '</div>' +
      '<h4>Isu</h4><p>' + p.isu + '</p>' +
      '<h4>Tindakan</h4><p class="mb0">' + p.tindakan + '</p>' +
      '<p class="mt12 mb0 muted">' + src(p.p) + '</p>';
    document.getElementById('modalTitle').textContent = p.n;
    showModal();
  }

  /* ========================================================================
     VIEW: 06 — Tadbir Urus & Orang
     ======================================================================== */
  VIEWS['tadbir'] = {
    t: 'Tadbir Urus & Orang',
    n: '06',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 06 · Menteri · Lembaga · CEO</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 06 — Tadbir Urus</span>Siapa pengurus, berapa lama, kenapa ditamat awal</h1>' +
        '<p class="lead">Tiga lapisan kepimpinan LTH ditunjuk di sini: Menteri Hal Ehwal Agama (penyelia), Pengerusi Lembaga, dan Ketua Pegawai Eksekutif. Perhatikan dua penamatan awal tanpa sebab pada 2021 — dan penglibatan ahli politik dalam Lembaga 2013–2018.</p>';
      /* Jawatan siri */
      RD.jawatan.siri.forEach(function (s) {
        node.appendChild(el('h2', 'h2', s.k));
        var tl = el('div', 'tl');
        s.orang.forEach(function (o) {
          var cls = s.warna;
          if (o.tamatAwal) cls = 'bad';
          if (o.politik) cls = 'bad';
          if (o.khas) cls = 'warn';
          var item = el('div', 'tl-item ' + cls);
          var subText = o.dari + ' → ' + (o.hingga || 'kini');
          if (o.politik) subText += ' · ahli politik';
          if (o.tamatAwal) subText += ' · ditamat awal tanpa sebab';
          item.innerHTML = '<div class="tl-d">' + subText + '</div>' +
            '<div class="tl-t">' + o.n + '</div>' +
            (o.politik ? '<div class="tl-b">Ahli Parlimen/UMNO — RCI cadangan: larang ahli politik aktif jadi Pengerusi/ALP.</div>' :
             o.tamatAwal ? '<div class="tl-b">Seksyen 6(5) Akta 535: Menteri boleh batalkan perkhidmatan tanpa sebab. RCI: tidak lagi sesuai.</div>' : '');
          tl.appendChild(item);
        });
        node.appendChild(tl);
      });
      /* Penamatan awal note */
      node.appendChild(div('card warn',
        '<h3 class="h3">Dua penamatan awal tanpa sebab</h3>' +
        '<p>' + RD.jawatan.tamatAwal.nota + '</p>' +
        '<p class="mb0">Suruhanjaya: kedua-duanya "memberi perkhidmatan baik dan sedang lakukan penambahbaikan". ' + src(RD.jawatan.tamatAwal.p) + '</p>'
      ));
      /* Politik dalam Lembaga */
      node.appendChild(el('h2', 'h2', 'Ahli politik dalam Lembaga LTH 2013–2018'));
      RD.politik.orang.forEach(function (o) {
        var c = el('div', 'card warn');
        c.innerHTML = '<div class="card-head"><div class="h3">' + o.n + '</div><span class="badge bad">Politik</span></div>' +
          '<p class="mb0"><strong>Peranan:</strong> ' + o.peranan + '</p>' +
          '<p class="mb0"><strong>Kaitan politik:</strong> ' + o.politik + '</p>';
        node.appendChild(c);
      });
      node.appendChild(div('card gold',
        '<h3 class="h3">Dapatan RCI</h3>' +
        '<p class="mb0">' + RD.politik.dapatan + ' ' + src(RD.politik.p2) + '</p>'
      ));
      /* Penglibatan anak syarikat */
      node.appendChild(el('h2', 'h2', 'Penglibatan dalam anak syarikat — berapa jawatan setiap orang?'));
      var svg = CH.hbar({
        rows: RD.anakSyarikat.orang.map(function (o) { return { k: shortName(o.n), v: o.bil, id: o.n }; })
          .sort(function (a, b) { return b.v - a.v; })
      }, { w: 480, h: 320, dp: 0, leftPad: 110, title: 'Bilangan jawatan anak syarikat per orang',
        colorFn: function (r, c) { return r.v >= 10 ? c.bad : r.v >= 5 ? c.gold : c.good; } });
      node.appendChild(chartWrap(svg,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — Datuk Rozaida (CFO) 23 jawatan; Datuk Seri Johan (CEO) 18 jawatan. ' +
        'Dasar baharu: had 5 syarikat. ' + src(RD.anakSyarikat.p)));
      /* detail rows for anak syarikat */
      var list = el('div', 'mt12');
      RD.anakSyarikat.orang.forEach(function (o) {
        var row = el('div', 'row');
        row.innerHTML =
          '<div class="row-top">' +
            '<div><div class="row-t">' + o.n + '</div>' +
            '<div class="row-s">' + o.peranan + '</div>' +
            '<div class="row-meta">' + o.contoh.slice(0, 3).join(' · ') + (o.contoh.length > 3 ? ' …' : '') + '</div></div>' +
            '<div class="row-val"><div class="row-v ' + (o.bil > 5 ? 'neg' : '') + '">' + o.bil + ' jawatan</div>' +
            '<div class="row-s">' + src(RD.anakSyarikat.p) + '</div></div>' +
          '</div>' +
          (o.nota ? '<div class="row-s" style="color:var(--crimson)">' + o.nota + '</div>' : '');
        list.appendChild(row);
      });
      node.appendChild(list);
      node.appendChild(div('card gold',
        '<h3 class="h3">Dapatan RCI</h3><p class="mb0">' + RD.anakSyarikat.dapatan + ' ' + src(RD.anakSyarikat.p2) + '</p>'
      ));
      /* Kuasa Menteri */
      node.appendChild(el('h2', 'h2', 'Kuasa Menteri — terlalu luas untuk satu orang'));
      var kt = el('div', 'tbl-wrap');
      var html = '<table><thead><tr><th>Kuasa</th><th>Jenis</th><th>Cadangan RCI</th></tr></thead><tbody>';
      RD.kuasaMenteri.senarai.forEach(function (r) {
        html += '<tr><td>' + r.k + '</td><td><span class="badge ' + (r.jenis === 'wang' ? 'bad' : 'cool') + '">' + r.jenis + '</span></td><td>' + r.cadang + '</td></tr>';
      });
      html += '</tbody></table><div class="tbl-cap">' + src(RD.kuasaMenteri.p) + '</div>';
      kt.innerHTML = html;
      node.appendChild(kt);
      node.appendChild(div('card warn',
        '<h3 class="h3">Dapatan</h3><p class="mb0">' + RD.kuasaMenteri.dapatan + ' ' + src([15, 16, 70]) + '</p>'
      ));
      /* Kelayakan — comparison */
      node.appendChild(el('h2', 'h2', 'Kriteria pelantikan Lembaga — bandingan dengan akta lain'));
      var kt2 = el('div', 'tbl-wrap');
      html = '<table><thead><tr><th>Akta</th><th>Kriteria khusus</th></tr></thead><tbody>';
      RD.kuasaMenteri.kelayakan.bandingan.forEach(function (r) {
        html += '<tr><td>' + r.akta + '</td><td>' + r.kriteria + '</td></tr>';
      });
      html += '</tbody></table><div class="tbl-cap">' +
        'LTH (Akta 535) hanya: "' + RD.kuasaMenteri.kelayakan.sekarang + '" — tiada kriteria kepakaran.</div>';
      kt2.innerHTML = html;
      node.appendChild(kt2);
      /* Jawatankuasa */
      node.appendChild(el('h2', 'h2', 'Jawatankuasa yang dibubarkan secara pentadbiran'));
      RD.jawatankuasa.dimansuh.forEach(function (j) {
        var c = el('div', 'card warn');
        c.innerHTML = '<div class="card-head"><div class="h3">' + j.n + '</div><span class="badge bad">' + j.bila + '</span></div>' +
          '<p class="mb0">' + j.kesan + '</p>';
        node.appendChild(c);
      });
      node.appendChild(div('card gold',
        '<h3 class="h3">Masalah</h3><p class="mb0">' + RD.jawatankuasa.masalah + ' ' + src(RD.jawatankuasa.p) + '</p>'
      ));
      return node;
    }
  };

  /* ========================================================================
     VIEW: 07 — Amaran & Regulator
     ======================================================================== */
  VIEWS['amaran'] = {
    t: 'Amaran Diabaikan',
    n: '07',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 07 · 14 amaran · 2014 → 2022</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 07 — Amaran Diabaikan</span>BNM, JAN, Roland Berger cuba — tetapi…</h1>' +
        '<p class="lead">Suruhanjaya mendapati sekurang-kurangnya 14 amaran/cadangan dari BNM, JAN, Roland Berger, PwC dan EY dihantar antara 2014 dan 2022. Tujuh diabaikan sepenuhnya. Tiga ditindaklanjuti (menjadi asas Pelan Pemulihan). Satu ditolak oleh Suruhanjaya sendiri.</p>';
      /* donut hasil */
      var hasilCounts = {};
      RD.amaran.forEach(function (a) { hasilCounts[a.hasil] = (hasilCounts[a.hasil] || 0) + 1; });
      var svg1 = CH.donut(Object.keys(hasilCounts).map(function (k) {
        var h = RD.amaranHasil[k];
        return { k: h.l, v: hasilCounts[k], color: 'var(--' + (h.c === 'bad' ? 'crimson' : h.c === 'warn' ? 'gold' : h.c === 'good' ? 'green' : h.c === 'neutral' ? 'ink-3' : 'blue') + ')' };
      }), { w: 240, h: 240, centerLabel: 'Jumlah amaran', fmt: function (v) { return v + ' amaran'; } });
      node.appendChild(chartWrap(svg1,
        '<span class="pvi terbit"><i></i>Data terbitan</span> — pengelompokan mengikut jawapan penerima.'));
      /* timeline amaran */
      var tl = el('div', 'tl');
      RD.amaran.forEach(function (a) {
        var cls = RD.amaranHasil[a.hasil].c;
        var item = el('div', 'tl-item ' + cls);
        item.innerHTML = '<div class="tl-d">' + a.tarikh + ' · ' + a.dari + ' → ' + a.kepada + '</div>' +
          '<div class="tl-t">' + a.tajuk + '</div>' +
          '<div class="tl-b"><span class="badge ' + cls + '">' + RD.amaranHasil[a.hasil].l + '</span> ' + (a.nota || '') + ' ' + src([a.p]) + '</div>';
        tl.appendChild(item);
      });
      node.appendChild(tl);
      /* pihak ketiga */
      node.appendChild(el('h2', 'h2', 'Peranan pihak ketiga — siapa buat apa'));
      RD.pihak.forEach(function (p) {
        var c = el('div', 'card');
        c.innerHTML = '<div class="card-head"><div class="h3">' + p.n + '</div><span class="badge neutral">' + p.peranan + '</span></div>' +
          '<p class="mb6"><strong>Dapatan RCI:</strong> ' + p.dapatan + '</p>' +
          (p.syor ? '<p class="mb0"><strong>Syor:</strong> ' + p.syor + '</p>' : '') +
          '<p class="mt6 mb0 muted">' + src(p.p) + '</p>';
        node.appendChild(c);
      });
      node.appendChild(div('', '<p class="mt12 muted">Sumber: BNM ' + src([100, 213, 217, 247]) + '; JAN ' + src([22, 133, 147]) + '; RB ' + src([104, 214]) + '.</p>'));
      return node;
    }
  };

  /* ========================================================================
     VIEW: 08 — Bonus & Tatatertib
     ======================================================================== */
  VIEWS['bonus'] = {
    t: 'Bonus & Tatatertib',
    n: '08',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 08 · Bonus · 5 pegawai tatatertib</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 08 — Bonus & Tatatertib</span>RM630 juta bonus, 5 pegawai masih bertugas</h1>' +
        '<p class="lead">Antara 2010 dan 2020, LTH membayar bonus kakitangan berjumlah lebih RM414 juta. Bonus TH Properties & THP Australia (RM2.2 juta) dibayar TANPA kelulusan LTH sebagai pemegang saham utama — melanggar Akta Syarikat 2016. Lima pegawai dikenakan tindakan tatatertib; kelima-lima masih bertugas dengan LTH atau anak syarikat.</p>';
      /* Bonus peruntukan chart */
      node.appendChild(el('h2', 'h2', 'Peruntukan bonus tahunan LTH (RM juta)'));
      var svg1 = CH.bar({
        rows: RD.bonus.rows.map(function (r) { return { label: r.y, v: r.peruntukan, sorot: r.sorot }; })
      }, {
        w: 480, h: 220, dp: 0, title: 'Peruntukan bonus tahunan (RM juta)',
        colorFn: function (r, c) { return r.sorot ? c.bad : c.gold; },
        refLine: { v: 25, label: 'siling lazim (2 bulan)' },
        refClass: 'green'
      });
      node.appendChild(chartWrap(svg1,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — 2014 paling tinggi (RM74 juta, sehingga 13 bulan). ' +
        'Pekeliling Perbendaharaan: purata ≤ 2 bulan. ' + src(RD.bonus.p)));
      /* Bonus vs untung */
      node.appendChild(el('h2', 'h2', 'Bonus vs keuntungan bersih (2013–2017)'));
      var svg2 = CH.groupedBar({
        rows: RD.bonus.rows.filter(function (r) { return r.untung; }).map(function (r) {
          return { y: r.y, bonus: r.peruntukan, untung: r.untung };
        })
      }, {
        series: [
          { k: 'bonus', name: 'Peruntukan bonus', color: 'var(--gold)' },
          { k: 'untung', name: 'Keuntungan bersih', color: 'var(--green)' }
        ],
        w: 480, h: 240, dp: 0, label: 'y', title: 'Bonus vs keuntungan (RM juta, 2013–2017)'
      });
      node.appendChild(chartWrap(svg2,
        '<span class="pvi terbit"><i></i>Data terbitan</span> — nisbah bonus/keuntungan 1.0%–2.5% sepanjang tempoh. ' +
        '2014 paling tinggi (2.5%). ' + src([137, 139])));
      /* Bonus khas TH Properties */
      node.appendChild(el('h2', 'h2', 'Bonus TH Properties 2017 — RM1.15 juta TANPA kelulusan pemegang saham'));
      var svg3 = CH.hbar({
        rows: RD.bonusKhas.y2017.penerima.map(function (p) { return { k: p.n.split(' ').slice(-2).join(' '), v: p.v }; })
      }, { w: 480, h: 360, dp: 0, leftPad: 110, title: 'Penerima bonus TH Properties 2017 (RM)',
        fmt: function (v) { return 'RM' + v.toLocaleString('ms-MY'); } });
      node.appendChild(chartWrap(svg3,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — diluluskan Exco TH Properties 12 April 2017. ' +
        'Melanggar Seksyen 230(2) & 230(4) Akta Syarikat 2016. ' + src([141, 144])));
      node.appendChild(div('card warn',
        '<h3 class="h3">Bonus 2018 THP Australia — RM1.05 juta, juga tanpa kelulusan</h3>' +
        '<p>Diluluskan Lembaga 23 April 2018; Mesyuarat Agong 30 November 2018 — <strong>7 bulan selepas</strong>. ' +
        'Melanggar Seksyen 230(3) Akta Syarikat 2016.</p>' +
        '<p class="mb0">Suruhanjaya: usaha mendapatkan semula bonus ini perlu dibuat.</p>'
      ));
      /* Tatatertib */
      node.appendChild(el('h2', 'h2', 'Tindakan tatatertib — 5 pegawai, 4 kluster'));
      RD.tatatertib.kes.forEach(function (k) {
        var c = el('div', 'card');
        c.innerHTML = '<div class="card-head"><div class="h3">' + k.n + '</div></div>' +
          '<p class="mb6"><strong>Jawatan asal:</strong> ' + k.jw + '</p>' +
          '<p class="mb6"><strong>Kluster:</strong> ' + k.kluster.map(function (id) {
            var kl = RD.tatatertib.kluster.find(function (x) { return x.id === id; });
            return '<span class="badge neutral">K' + id + '</span> ' + kl.n;
          }).join('<br>') + '</p>' +
          '<div class="kv">' +
            '<div class="k">Hukuman asal</div><div class="v">' + k.asal + '</div>' +
            '<div class="k">Selepas rayuan</div><div class="v">' + k.rayuan + '</div>' +
            '<div class="k">Jawatan kini</div><div class="v">' + k.kini + '</div>' +
          '</div>';
        node.appendChild(c);
      });
      /* Kelambatan */
      node.appendChild(div('card warn',
        '<h3 class="h3">Kelambatan proses</h3>' +
        '<div class="kv">' +
          RD.tatatertib.lengah.map(function (l) {
            return '<div class="k">Kluster ' + l.kluster + ' (' + l.sesiapa + ')</div><div class="v">' + l.bulan + ' bulan</div>';
          }).join('') +
        '</div><p class="mt6 mb0">' + RD.tatatertib.nota + '</p>'
      ));
      node.appendChild(div('card gold',
        '<h3 class="h3">Kesimpulan RCI</h3><p class="mb0">' + RD.tatatertib.kesimpulan + ' ' + src(RD.tatatertib.p) + '</p>'
      ));
      /* Laporan polis & SPRM */
      node.appendChild(el('h2', 'h2', 'Laporan polis & SPRM — 4 + 6 kes'));
      var tbl = el('div', 'tbl-wrap');
      var html = '<table><thead><tr><th>Tarikh</th><th>No. Laporan</th><th>Pengadu</th><th>Isu</th><th>Status</th></tr></thead><tbody>';
      RD.laporanPolis.rows.forEach(function (r) {
        html += '<tr><td>' + r.tarikh + '</td><td class="mono">' + r.repot + '</td><td>' + r.pengadu + '</td><td>' + r.isu + '</td><td>' + r.status + '</td></tr>';
      });
      html += '</tbody></table><div class="tbl-cap">' + src(RD.laporanPolis.p) + '</div>';
      tbl.innerHTML = html;
      node.appendChild(tbl);
      node.appendChild(div('card warn',
        '<h3 class="h3">SPRM — 6 dakwaan dalam siasatan</h3>' +
        '<ul style="margin:6px 0 0;padding-left:18px">' +
          RD.laporanPolis.sprm.map(function (s) { return '<li style="margin:4px 0;font-size:13px">' + s + '</li>'; }).join('') +
        '</ul><p class="mt6 mb0">' + RD.laporanPolis.sprmStatus + '</p>'
      ));
      return node;
    }
  };

  /* ========================================================================
     VIEW: 09 — HAFIS / Kos Haji
     ======================================================================== */
  VIEWS['hafis'] = {
    t: 'HAFIS & Kos Haji',
    n: '09',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 09 · HAFIS · 2001 → 2030</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 09 — HAFIS & Kos Haji</span>Bayaran haji dibeku 13 tahun, subsidi makin besar</h1>' +
        '<p class="lead">Sejak 2009, bayaran haji Muassasah dibekukan pada RM9,980. Tetapi kos haji sebenar naik dari RM16,155 (2014) ke RM25,540 (2022). Beza itu ditanggung LTH sebagai HAFIS — diambil dari keuntungan pelaburan, bukan suntikan Kerajaan. Menjelang 2030, HAFIS dijangka mencecah RM742 juta setahun — 65.6% daripada kos haji.</p>' +
        '<div class="kpi">' +
          kpi('HAFIS 2014', 'RM106 juta', pvi('fakta', '38% kos')) +
          kpi('HAFIS 2019', 'RM299 juta', pvi('fakta', '56% kos')) +
          kpi('HAFIS 2022 (unjuran)', 'RM377 juta', pvi('unjur', '49% kos')) +
          kpi('HAFIS 2030 (unjuran)', 'RM742 juta', pvi('unjur', '65.6% kos')) +
        '</div>';
      /* Sejarah + unjuran */
      node.appendChild(el('h2', 'h2', 'Kos haji vs bayaran jemaah — jurang yang makin luas'));
      var combinedRows = RD.hafis.sejarah.map(function (r) { return { y: r.y, kos: r.kos, bayaran: r.bayaran }; })
        .concat(RD.hafis.unjuran.rows.map(function (r) { return { y: r.y, kos: r.kos, bayaran: r.bayaran }; }));
      var svg1 = CH.line({ rows: combinedRows }, {
        series: [
          { k: 'kos', name: 'Kos haji sebenar', color: 'var(--crimson)' },
          { k: 'bayaran', name: 'Bayaran jemaah', color: 'var(--gold)' }
        ],
        w: 480, h: 240, dp: 0, label: 'y', title: 'Kos haji vs bayaran jemaah (RM)'
      });
      node.appendChild(chartWrap(svg1,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> + <span class="pvi unjur"><i></i>Unjuran 2022–2030</span>. ' +
        'Bayaran dibeku RM9,980 (2009–2021); naik ke RM12,980 (bukan B40) / RM10,980 (B40) pada 2022. ' + src([204, 205])));
      /* % HAFIS */
      node.appendChild(el('h2', 'h2', 'Peratus HAFIS terhadap kos haji — menuju 65%'));
      var svg2 = CH.line({ rows: RD.hafis.unjuran.rows }, {
        series: [{ k: 'pct', name: '% HAFIS', color: 'var(--crimson)' }],
        w: 480, h: 200, dp: 1, label: 'y', title: 'Peratus HAFIS dalam kos haji (%)',
        refLine: { v: 50, label: '50%' }
      });
      node.appendChild(chartWrap(svg2,
        '<span class="pvi unjur"><i></i>Unjuran laporan</span> — HAFIS akan mencecah 65.6% kos haji pada 2030. ' +
        'Jika bayaran haji tidak naik selari dengan kos, subsidi LTH akan terus membengkak. ' + src([205])));
      /* Jumlah HAFIS */
      node.appendChild(el('h2', 'h2', 'Jumlah HAFIS setahun — makin besar, menekan hibah'));
      var svg3 = CH.bar({
        rows: RD.hafis.sejarah.concat(RD.hafis.unjuran.rows.slice(0, 3)).map(function (r) {
          return { label: r.y, v: r.jumlahJuta || r.jumlahRibu / 1000 };
        })
      }, { w: 480, h: 220, dp: 0, title: 'Jumlah HAFIS setahun (RM juta)',
        colorFn: function (r, c) { return r.label >= 2022 ? c.gold : c.bad; } });
      node.appendChild(chartWrap(svg3,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> + <span class="pvi unjur"><i></i>Unjuran</span>. ' +
        'Setiap RM400 juta HAFIS = ~0.4% pengurangan kadar hibah kepada pendeposit. ' + src([110, 204, 205])));
      /* Masa menunggu */
      node.appendChild(el('h2', 'h2', 'Giliran menunggu haji — 130 tahun vs 33 tahun'));
      node.appendChild(div('card gold',
        '<div class="kpi" style="margin-top:6px">' +
          kpi('Giliran semasa', '130–135 tahun', pvi('fakta', 'Fakta') + ' (percanggahan)') +
          kpi('Cadangan RCI', '33 tahun', pvi('fakta', 'Fakta') + ' · deposit naik RM1,300 → RM12,980') +
          kpi('Kuota kini', '30,000', pvi('fakta', 'Fakta')) +
          kpi('Sasaran 2030', '60,000', pvi('unjur', 'Unjuran')) +
        '</div>' +
        '<p class="mt6 mb0 muted">' + RD.hafis.masaMenunggu.nota + ' ' + src(RD.hafis.masaMenunggu.p) + '</p>'
      ));
      /* Insight */
      node.appendChild(div('card warn',
        '<h3 class="h3">Apa yang tidak boleh disimpulkan</h3>' +
        '<p class="mb0">Unjuran HAFIS 2022–2030 menggunakan kuota tetap 30,000 jemaah. Jika kuota Saudi naik ke 60,000 (sasaran), jumlah HAFIS akan berlipat ganda. Sebaliknya, jika kos haji dikawal, % HAFIS mungkin tidak sampai 65%. Unjuran ini "as-is" — bukan jaminan.</p>'
      ));
      node.appendChild(div('', '<p class="mt12 muted">Sumber: HAFIS sejarah ' + src([204]) + '; unjuran ' + src([205]) + '; giliran ' + src([208, 209]) + '.</p>'));
      return node;
    }
  };

  /* ========================================================================
     VIEW: 10 — Deposit & Pendeposit
     ======================================================================== */
  VIEWS['deposit'] = {
    t: 'Deposit & Pendeposit',
    n: '10',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 10 · RM69 → RM88 bilion</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 10 — Deposit & Pendeposit</span>Bank run 2019, ketumpuan 5% teratas</h1>' +
        '<p class="lead">Selepas hibah 2018 turun ke 1.25%, deposit susut dari RM73 bilion ke RM69 bilion dalam beberapa bulan — pengecutan "bank run" yang LTH nasib baik dapat kawal. Pada 2022, deposit sudah pulih ke RM88 bilion. Tetapi 75% deposit dipegang hanya 5% pendeposit — bermakna sebilangan kecil pendeposit boleh cetus bank run sebenar.</p>';
      /* deposit scatter */
      var svg1 = CH.scatter({
        points: RD.deposit.titik.map(function (t, i) { return { x: i, y: t.v, label: t.label, bila: t.bila, anggaran: t.anggaran, unjuran: t.unjuran }; })
      }, { w: 480, h: 220, title: 'Jumlah deposit LTH (RM bilion)', allLabels: true });
      node.appendChild(chartWrap(svg1,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> + <span class="pvi unjur"><i></i>Unjuran</span>. ' +
        'Bulatan merah = angka rasmi; biru = anggaran; emas = unjuran LTH. ' + src(RD.deposit.p)));
      /* tumpuan */
      node.appendChild(el('h2', 'h2', 'Ketumpuan deposit — bahaya bank run'));
      var svg2 = CH.donut([
        { k: '5% teratas pendeposit', v: 75, color: 'var(--crimson)' },
        { k: '95% baki pendeposit', v: 25, color: 'var(--green)' }
      ], { w: 240, h: 240, centerLabel: 'Pemegangan deposit', fmt: function (v) { return v + '%'; } });
      node.appendChild(chartWrap(svg2,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — dianggarkan 75% deposit dipegang hanya 5% pendeposit. ' +
        'Sebaliknya, 65% pendeposit simpanan ≤ RM2,000. ' + src([208, 216])));
      /* dana minima + jaminan */
      node.appendChild(el('h2', 'h2', 'Dana minima & jaminan Kerajaan'));
      var svg3 = CH.hbar({
        rows: [
          { k: 'Dana minima LTH (untuk HAFIS)', v: 60 },
          { k: 'Deposit 2022', v: 88 },
          { k: 'Jaminan Kerajaan (seksyen 24)', v: 88 }
        ]
      }, { w: 480, h: 160, dp: 0, leftPad: 180, title: 'Dana minima vs deposit vs jaminan (RM bilion)',
        fmt: function (v) { return 'RM' + v + 'b'; },
        colorFn: function (r, c) { return r.v > 80 ? c.bad : c.gold; } });
      node.appendChild(chartWrap(svg3,
        '<span class="pvi fakta"><i></i>Fakta laporan</span> — jaminan Kerajaan = deposit semasa. Jika LTH gagal, ' +
        'RM88 bilion akan ditanggung Kerajaan (seksyen 24 Akta 535). ' + src([111, 235])));
      /* Insight */
      node.appendChild(div('card warn',
        '<h3 class="h3">Apa yang tidak boleh disimpulkan</h3>' +
        '<p class="mb0">Pengecutan 2019 (RM73b → RM69b) adalah "bank run" kecil. Tetapi LTH "bernasib baik" — jumlah sebenar lebih kecil daripada dikhuatiri. Tiada data per pengeluaran; tidak boleh kita katakan siapa yang keluar. Juga, angka "75% deposit dimiliki 5% pendeposit" adalah anggaran — bukan angka rasmi audit.</p>'
      ));
      node.appendChild(div('', '<p class="mt12 muted">Sumber: titik deposit ' + src([122, 123, 171, 218]) + '; ketumpuan ' + src([208, 216]) + '.</p>'));
      return node;
    }
  };

  /* ========================================================================
     VIEW: 11 — Syor & Cadangan
     ======================================================================== */
  VIEWS['syor'] = {
    t: 'Syor & Cadangan',
    n: '11',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 11 · 11 blok syor</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 11 — Syor RCI</span>Apa yang Suruhanjaya cadangkan</h1>' +
        '<p class="lead">Suruhanjaya mengeluarkan 11 blok syor utama. Sebahagiannya presisi (pindaan Akta 535, larang ahli politik), sebahagiannya berbentuk dasar (Dana Haji, jaminan Kerajaan Sukuk). Dashboard ini tidak menilai tahap pelaksanaan — itu di luar skop laporan.</p>';
      /* group by category */
      var byCat = {};
      RD.syor.forEach(function (s) { (byCat[s.k] = byCat[s.k] || []).push(s); });
      var catLabel = { tadbir: 'Tadbir urus', kawal: 'Kawal selia', forensik: 'Audit forensik', wang: 'Kewangan', ujsb: 'UJSB/Sukuk', haji: 'Haji & deposit' };
      Object.keys(byCat).forEach(function (k) {
        node.appendChild(el('h2', 'h2', catLabel[k] || k));
        byCat[k].forEach(function (s) {
          var c = el('div', 'card gold');
          c.innerHTML = '<div class="card-head"><div class="h3">' + s.t + '</div>' + src(s.p) + '</div>' +
            '<ul style="margin:6px 0 0;padding-left:18px">' +
              s.items.map(function (it) { return '<li style="margin:4px 0;font-size:13px">' + it + '</li>'; }).join('') +
            '</ul>';
          node.appendChild(c);
        });
      });
      return node;
    }
  };

  /* ========================================================================
     VIEW: 12 — Percanggahan
     ======================================================================== */
  VIEWS['percanggahan'] = {
    t: 'Percanggahan Laporan',
    n: '12',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 12 · 6 percanggahan dikesan</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 12 — Percanggahan</span>Di mana laporan itu sendiri tak konsisten</h1>' +
        '<p class="lead">Sebagai pembaca, kita patut tahu di mana laporan itu sendiri memberikan nombor berbeza untuk perkara yang sama. Inilah enam kategori percanggahan yang dikesan dalam teks RCI.</p>';
      RD.percanggahan.forEach(function (p) {
        var c = el('div', 'card warn');
        c.innerHTML = '<div class="card-head"><div class="h3">' + p.judul + '</div>' + src(p.p) + '</div>' +
          '<p><strong>Versi A:</strong> ' + p.a + '</p>' +
          (p.b ? '<p><strong>Versi B:</strong> ' + p.b + '</p>' : '') +
          (p.c ? '<p><strong>Versi C:</strong> ' + p.c + '</p>' : '') +
          '<p class="mb0 muted"><strong>Catatan:</strong> ' + p.nota + '</p>';
        node.appendChild(c);
      });
      node.appendChild(div('card',
        '<h3 class="h3">Mengapa ini penting?</h3>' +
        '<p class="mb0">Percanggahan kecil dalam laporan OCR boleh datang dari tiga punca: (1) kesilapan transkripsi OCR (sumber laporan ini adalah imbasan PDF ke Markdown); (2) angka berbeza asas (sebelum vs selepas zakat/cukai); (3) laporan memang menyebut angka berbeza dalam konteks berbeza. Untuk angka rasmi, sentiasa rujuk PDF asal.</p>'
      ));
      return node;
    }
  };

  /* ========================================================================
     VIEW: 13 — Sumber & Kaedah
     ======================================================================== */
  VIEWS['sumber'] = {
    t: 'Kaedah & Had',
    n: '13',
    render: function () {
      var node = div('view active');
      node.innerHTML =
        '<span class="seal">Fasal 13 · kaedah</span>' +
        '<h1 class="h1"><span class="h1-num">Fasal 13 — Kaedah</span>Bagaimana dashboard ini dibina, hadnya, dan apa yang TIDAK ada</h1>' +
        '<h2 class="h2">Sumber data</h2>' +
        '<p>Semua data diekstrak daripada teks Markdown OCR Laporan RCI Tabung Haji (249 halaman PDF). Teks asal ada di <a href="https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md" target="_blank" rel="noopener">GitHub — SyahmiRafsan/rci-tabunghaji</a>. Tiada sumber luar dimasukkan.</p>' +
        '<h2 class="h2">Kaedah ekstraksi</h2>' +
        '<p>Setiap nombor, tarikh, nama dan hubungan dibaca satu per satu dari laporan. Untuk setiap entri, nombor halaman PDF direkod (anchor <span class="mono">#pdf-page-N</span>).</p>' +
        '<h2 class="h2">Empat jenis data — dan maksudnya</h2>' +
        '<div class="card tint">' +
          '<div class="legend" style="flex-direction:column;gap:8px">' +
            '<span><i class="pv fakta"></i><strong>Fakta laporan</strong> — disalin terus dari teks RCI. Boleh dijejak ke muka surat.</span>' +
            '<span><i class="pv terbit"></i><strong>Data terbitan</strong> — kiraan mudah kami (tolak, bahagi, jumlah). Contoh: "premium pemindahan = nilai pemindahan − nilai pasaran".</span>' +
            '<span><i class="pv unjur"></i><strong>Unjuran laporan</strong> — ramalan masa hadapan yang dibuat oleh LTH/RCI sendiri (cth: HAFIS 2030). Bukan sejarah.</span>' +
            '<span><i class="pv sim"></i><strong>Simulasi anda</strong> — berubah bila anda gerakkan slider (Fasal 03). Bukan dapatan RCI.</span>' +
          '</div>' +
        '</div>' +
        '<h2 class="h2">Had data</h2>' +
        '<ul style="font-size:13.5px;color:var(--ink-2);line-height:1.6">' +
          '<li><strong>Ekshibit diklasifikasikan rahsia</strong> — Jilid 1–12 (1925 m/s berdokumen + perjanjian) tidak terbuka. Sebahagian besar butiran transaksi tidak ada dalam teks laporan.</li>' +
          '<li><strong>Anggaran vs angka rasmi</strong> — beberapa nombor dalam laporan sendiri diberi label "anggaran". Dashboard menandakan ini.</li>' +
          '<li><strong>OCR boleh silap</strong> — versi Markdown adalah hasil OCR. Untuk angka rasmi, rujuk PDF asal. Lihat Fasal 12 (Percanggahan).</li>' +
          '<li><strong>Tiada data luar</strong> — dashboard TIDAK menggunakan data pasaran saham langsung, laporan tahunan LTH, atau akhbar. Hanya teks laporan RCI.</li>' +
          '<li><strong>Tarikh akhir siasatan: 19 Julai 2022</strong> — apa yang berlaku selepas tarikh ini tidak ada dalam laporan.</li>' +
        '</ul>' +
        '<h2 class="h2">Glosari</h2>' +
        '<dl class="def">';
      RD.glosari.forEach(function (g) {
        node.innerHTML += '<dt>' + g.t + '</dt><dd>' + g.d + '</dd>';
      });
      node.innerHTML += '</dl>' +
        '<h2 class="h2">Bagaimana nak cite</h2>' +
        '<p class="mb0">Jika anda petik dari dashboard ini, sentiasa rujuk kembali ke laporan asal: <strong>Laporan Suruhanjaya Siasatan Diraja bagi Menyiasat Isu Pengurusan dan Operasi Lembaga Tabung Haji 2014–2020</strong> (30 Ogos 2022). Dashboard ini alat pembacaan, bukan dokumen rasmi.</p>';
      return node;
    }
  };

  /* ---- expose ---- */
  window.VIEWS = VIEWS;

  /* helper: show modal */
  function showModal() {
    var m = document.getElementById('modal');
    m.hidden = false;
    document.body.style.overflow = 'hidden';
  }
})();