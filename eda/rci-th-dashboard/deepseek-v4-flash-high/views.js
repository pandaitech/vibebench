/* RCI TH — 7 pandangan analisis */
(function () {
  "use strict";
  var R = window.RCI, L = window.RL;

  function section(no, title, sub) {
    var e = L.h("div", { cls: "sec-title" });
    e.appendChild(L.h("span", { cls: "st-no" }, no));
    var wrap = L.h("div");
    wrap.appendChild(L.h("h2", null, title));
    if (sub) wrap.appendChild(L.h("p", { cls: "st-sub" }, sub));
    e.appendChild(wrap);
    return e;
  }
  function lead(html) { return L.h("div", { cls: "lead" }, null).outerHTML ? (function () { var d = L.h("div", { cls: "lead" }); d.innerHTML = html; return d; })() : null; }
  function tl(items, cls) {
    var ul = L.h("ul", { cls: "tl" });
    items.forEach(function (it) {
      var li = L.h("li", { cls: it.c || "" });
      li.appendChild(L.h("span", { cls: "tl-t" }, it.t));
      li.appendChild(document.createTextNode(" " + it.e));
      ul.appendChild(li);
    });
    return ul;
  }
  function quote(text, src, p) {
    var q = L.h("blockquote", { cls: "quote" });
    q.appendChild(document.createTextNode("“" + text + "”"));
    var s = L.h("span", { cls: "q-src" });
    s.appendChild(document.createTextNode("— " + src + (p ? " (" : "") + (p ? L.srcLink(p) : "") + (p ? ")" : "")));
    s.innerHTML = "— " + src + (p ? " · " + L.srcLink(p) : "");
    q.appendChild(s);
    return q;
  }

  /* ============================================================
     PANDANGAN 1 — GAMBARAN
  ============================================================ */
  function viewGambaran() {
    var v = L.h("div");
    var hero = L.h("div", { cls: "hero" });
    hero.innerHTML =
      "<h1>Tabung Haji: kisah krisis, penyelamatan &amp; akauntabiliti</h1>" +
      "<p>Dashboard penerokaan ini menterjemah <b>Laporan Suruhanjaya Siasatan Diraja (RCI) Tabung Haji</b> — siasatan rasmi terhadap pengurusan LTH dari <b>2014 hingga 2020</b> — kepada data yang boleh anda teroka, banding dan uji sendiri.</p>" +
      '<div class="meta"><span>Laporan dibentang: 30 Ogos 2022</span><span>6 Pesuruhjaya</span><span>240 muka surat</span><span>16 saksi dipanggil</span><span>45 akuan berkanun</span></div>' +
      '<div class="hero-quote">"Pendapat Tanpa Teguran dengan \'Emphasis of Matter\' telah diberikan pada 16 Julai 2018" — surat Ketua Audit Negara kepada Perdana Menteri, 19 Dis 2018</div>';
    v.appendChild(hero);

    var kp = L.h("div", { cls: "kpis" });
    R.hero.forEach(function (x) {
      kp.appendChild(L.h("div", { cls: "kpi" }, L.h("div", { cls: "kpi-v" }, x.value), L.h("div", { cls: "kpi-l" }, x.label), L.h("div", { cls: "kpi-n" }, x.note + " · " + L.srcLink(x.p))));
    });
    v.appendChild(kp);

    v.appendChild(section("1", "Kisah dalam 5 babak", "Kronologi lengkap dalam bahagian Krisis Kewangan & Penyelamatan."));
    var babak = L.h("div", { cls: "babak" });
    R.babak.forEach(function (b) {
      var item = L.h("div", { cls: "babak-item" });
      item.appendChild(L.h("div", { cls: "babak-no " + b.warna }, "" + b.no));
      var body = L.h("div");
      body.appendChild(L.h("h3", null, b.judul));
      body.appendChild(L.h("p", null, b.ringkas));
      var ul = L.h("ul");
      b.peristiwa.forEach(function (pe) { ul.appendChild(L.h("li", null, pe)); });
      body.appendChild(ul);
      item.appendChild(body);
      babak.appendChild(item);
    });
    v.appendChild(babak);

    v.appendChild(section("2", "Tegangan utama laporan", "Satu carta meringkaskan keseluruhan krisis: apa yang dilaporkan vs apa yang sebenarnya."));
    var teaser = L.chartCard({
      q: "2017: LTH kata untung RM3.4 bilion — mengikut piawaian penuh ia rugi RM1.4 bilion",
      baca: "Bar hijau: keuntungan yang direkodkan LTH. Bar merah: kerugian yang sepatutnya direkod jika piawaian perakaunan MFRS dipatuhi sepenuhnya (kiraan PwC).",
      type: "fakta", p: 149,
      ins: {
        tunjuk: "Pada FY2017, LTH melaporkan keuntungan RM3.4 bilion. Analisa PwC mendapati selepas rosot nilai dan pelarasan lain, kedudukan sebenar ialah kerugian RM1.4 bilion.",
        penting: "Ini bermakna status kewangan LTH telah kritikal lebih awal daripada yang didedahkan — dan hibah tetap dibayar sepanjang tempoh itu.",
        rumusan: "Angka yang diumumkan kepada umum dan kepada pendeposit tidak mencerminkan kedudukan sebenar institusi pada 2017.",
        jaga: "RM3.4 bilion ialah angka dalam Laporan Kewangan 2017 LTH; RM1.4 bilion ialah anggaran PwC berdasarkan MFRS penuh — bukan angka rasmi LTH.",
        p: 149
      },
      chart: L.waterfall({
        data: [
          { label: "Untung dilaporkan", t: "start", v: 3412, vl: "RM3.41 bilion" },
          { label: "Rosot nilai saham", t: "down", v: -4258, vl: "−RM4.26 bilion" },
          { label: "Rosot hutang", t: "down", v: -7, vl: "−RM7 juta" },
          { label: "Pelarasan lain", t: "down", v: -580, vl: "−RM580 juta" },
          { label: "Kerugian MFRS", t: "total", v: -1433, vl: "RM1.43 bilion rugi" }
        ], h: 250
      })
    });
    v.appendChild(teaser);

    v.appendChild(section("3", "Soalan yang perlu diteroka", "Lima persoalan utama — pilih untuk meneroka."));
    var ql = L.h("div", { cls: "qlist" });
    R.soalan.forEach(function (q) {
      var a = L.h("a", { cls: "qitem", href: "#/" + q.tab });
      a.appendChild(L.h("span", { cls: "q-ic" }, "🔎"));
      var w = L.h("span");
      w.appendChild(L.h("b", null, q.t));
      w.appendChild(L.h("span", null, "Terokai dalam: " + q.j));
      a.appendChild(w);
      ql.appendChild(a);
    });
    v.appendChild(ql);

    v.appendChild(section("4", "Bagaimana dashboard ini dibuat", "Integriti data — supaya anda tahu apa yang boleh dan tidak boleh dipercayai."));
    var m = L.h("div", { cls: "card methodo" });
    m.innerHTML =
      "<b>Semua angka boleh dijejak ke sumber.</b> Setiap carta, jadual dan petikan disertakan butang <i>“Sumber: laporan, m.s. N”</i> yang membuka halaman asal laporan (OCR di GitHub).<br><br>" +
      "<b>Empat jenis data — dipaparkan sebagai lencana warna:</b> " +
      '<span class="badge b-fakta">FAKTA LAPORAN</span> angka terus dari laporan · ' +
      '<span class="badge b-terbitan">DATA TERBITAN</span> kiraan dashboard daripada angka laporan · ' +
      '<span class="badge b-unjuran">UNJURAN</span> anggaran masa depan dalam laporan · ' +
      '<span class="badge b-simulasi">SIMULASI</span> andaian untuk ujian.<br><br>' +
      "<b>Had sumber:</b> teks laporan ini ialah hasil OCR daripada PDF rasmi — ada risiko kecil salah baca huruf/angka. Angka penting telah disemak silang dengan jadual dalam laporan; jika anda dapati percanggahan, rujuk laporan asal melalui pautan sumber.<br><br>" +
      "<b>Tiada data dicipta.</b> Dashboard tidak menambah angka selain daripada laporan; sebarang kiraan tambahan ditanda sebagai DATA TERBITAN atau SIMULASI.";
    v.appendChild(m);
    return v;
  }

  /* ============================================================
     PANDANGAN 2 — KRISIS KEWANGAN
  ============================================================ */
  function viewKrisis() {
    var v = L.h("div");
    var l = L.h("div", { cls: "lead" });
    l.innerHTML = "<b>Persoalan panduan:</b> LTH membayar hibah yang tinggi kepada pendeposit sepanjang 2014–2017 — tetapi pada masa yang sama kedudukan kewangannya sudah negatif. Bagaimana ini boleh berlaku? Tiga alat digunakan: <b>hibah tinggi</b>, <b>perakaunan kreatif (RAV)</b> dan <b>audit yang tidak tegas</b>.";
    v.appendChild(l);

    v.appendChild(section("2.1", "Hibah tinggi — membayar melebihi kemampuan", ""));
    var c1 = L.chartCard({
      q: "Kadar hibah 2014–2021: berapa banyak yang LTH kongsi dengan pendeposit setiap tahun?",
      baca: "Biru = keuntungan tahunan (hibah). Emas = hibah haji. Kadar 2014–2017 jauh melebihi kadar selepas krisis (2018: 1.25%).",
      type: "fakta", p: 120,
      ins: {
        tunjuk: "Hibah tahunan 6.25% (2014) → 4.25% (2016) → 4.50% (2017), kemudian jatuh mendadak kepada 1.25% (2018) sebelum pulih perlahan kepada 3.05–3.10%.",
        penting: "Hibah 2014–2017 dibayar pada masa laporan PwC mendapati aset LTH sudah kurang daripada liabilitinya. RCI menyebut kadar ini 'melampaui kemampuan kewangan LTH' dan menyebabkan rizab menyusut.",
        rumusan: "Pengumuman 1.25% pada 2018 menyebabkan panik pendeposit — deposit mengecut RM73 bilion → RM69 bilion (akhir 2019). Kadar hibah ialah 'alat' yang paling sensitif dalam sistem LTH.",
        jaga: "Hibah bukan dividen bank dan bukan jaminan — ia bergantung kepada keuntungan pelaburan. Kadar tinggi dahulu tidak bermakna kadar tinggi selamanya.",
        p: [120, 122]
      },
      chart: L.groupBars({
        data: R.hibahRates.tahun.map(function (t, i) {
          return { label: String(t), a: R.hibahRates.tahunan[i], b: R.hibahRates.haji[i] };
        }),
        sa: "Hibah tahunan (%)", sb: "Hibah haji (%)",
        ca: "var(--pri)", cb: "var(--gold)", h: 235
      })
    });
    v.appendChild(c1);

    var c2 = L.chartCard({
      q: "Berapa banyak wang pendeposit dibayar sebagai hibah — dalam ringgit?",
      baca: "Bar penuh = jumlah hibah dibayar setahun (RM juta). Bahagian emas = hibah haji.",
      type: "fakta", p: 130,
      ins: {
        tunjuk: "Jumlah hibah 2014–2017 antara RM2.9–3.3 bilion setahun. 2017: RM3.32 bilion dibayar walaupun LTH tiada keuntungan bersih yang sebenar.",
        penting: "RCI: 'tanpa Sijil Audit Bersih, LTH tidak sepatutnya mengisytiharkan agihan keuntungan (hibah) tahunan pada kadar 4.50% dan hibah haji 1.75% yang menelan belanja sehingga RM2.75 bilion bagi tahun kewangan 2017.'",
        rumusan: "Pendeposit menikmati pulangan — tetapi kosnya ditanggung oleh rizab dan akhirnya oleh Kerajaan (melalui UJSB).",
        jaga: "Jumlah dalam juta bukan 'keuntungan' — ia wang keluar dari LTH kepada pendeposit.",
        p: [130, 22]
      },
      chart: L.stackBars({
        data: R.hibahBayar.tahun.map(function (t, i) {
          return { label: String(t), a: R.hibahBayar.tahunan[i], b: R.hibahBayar.haji[i], pct: L.rm(R.hibahBayar.tahunan[i] + R.hibahBayar.haji[i]) };
        }),
        sa: "Hibah tahunan", sb: "Hibah haji",
        ca: "var(--pri)", cb: "var(--gold)", h: 255
      })
    });
    v.appendChild(c2);

    v.appendChild(section("2.2", "Defisit tersembunyi — aset kurang daripada liabiliti", ""));
    var c3 = L.chartCard({
      q: "Aset vs liabiliti 2013–2017: bila LTH mula 'kurang harta daripada hutang'?",
      baca: "Hijau = jumlah aset. Merah = jumlah liabiliti (termasuk deposit pendeposit). Apabila garisan merah melebihi hijau, LTH secara teknikal tidak solven.",
      type: "fakta", p: 147,
      ins: {
        tunjuk: "Aset dan liabiliti menaik bersama sehingga 2014. Dari 2015, liabiliti (terutama deposit) melebihi aset — jurang semakin lebar: RM134 juta lebihan (2015) → defisit RM1.26 bilion (2016) → RM769 juta (2017).",
        penting: "Defisit ini wujud walaupun sebelum mengambil kira rosot nilai yang tidak direkod. Analisa PwC menyimpulkan hibah yang diagihkan sejak 2014 bercanggah dengan Seksyen 22 Akta 535.",
        rumusan: "Krisis bukan 'musibah' 2017 semata — ia keadaan yang berkembang sejak 2014.",
        jaga: "Angka ini ialah analisa PwC ke atas angka LTH, bukan penyata kewangan rasmi LTH yang diaudit JAN.",
        p: 147
      },
      chart: L.dualLine({
        s1: { name: "Aset", pts: R.pwca.tahun.map(function (t, i) { return { x: t, y: R.pwca.aset[i] }; }) },
        s2: { name: "Liabiliti + deposit", pts: R.pwca.tahun.map(function (t, i) { return { x: t, y: R.pwca.liabiliti[i] }; }) },
        xl: R.pwca.tahun.map(String), c1: "var(--pri)", c2: "var(--neg)", h: 250
      })
    });
    v.appendChild(c3);

    var c3b = L.chartCard({
      q: "Lebihan/(defisit) selepas agihan hibah — lihat kesan hibah kepada baki LTH",
      baca: "Nilai positif = LTH masih ada lebihan. Nilai negatif (merah) = LTH kekurangan — wang keluar lebih daripada yang ada.",
      type: "terbitan", p: 147,
      typeNote: "Dikira daripada jadual PwC: lebihan sebelum agihan − jumlah hibah.",
      ins: {
        tunjuk: "2013: lebihan RM2.45 bilion selepas hibah. 2014–2017: defisit — sehingga RM4.13 bilion (2016).",
        penting: "Ini gambaran paling ringkas kenapa krisis berlaku: hibah dibayar walaupun tiada lebihan.",
        rumusan: "Keupayaan sebenar LTH untuk membayar hibah (pre-distribution) pun sudah negatif sejak 2016.",
        jaga: "Kiraan ini menggunakan angka PwC; pengiraan LTH sendiri (guna RAV) menunjukkan hasil berbeza — lihat carta seterusnya.",
        p: 147
      },
      chart: L.bars({
        data: R.pwca.tahun.map(function (t, i) {
          return { label: String(t), v: R.pwca.selepas[i], vl: L.rm(R.pwca.selepas[i]) };
        }), h: 235
      })
    });
    v.appendChild(c3b);

    v.appendChild(section("2.3", "Perakaunan kreatif — 'RAV' menjadikan LTH kelihatan solven", ""));
    var c4 = L.chartCard({
      q: "Helah RAV: bagaimana menambah 'nilai' RM4.47 bilion mengubah defisit kepada lebihan",
      baca: "RAV (Realisable Asset Value) = nilai aset yang dianggarkan sendiri oleh pengurusan LTH — bukan nilai dalam penyata kewangan beraudit. Bar kiri: kedudukan tanpa RAV. Bar kanan: kedudukan dengan RAV.",
      type: "terbitan", p: 116,
      typeNote: "Angka dari jadual laporan (m.s. 116); perbandingan dikira oleh dashboard.",
      ins: {
        tunjuk: "Tanpa RAV: aset RM70.32 bilion vs liabiliti RM74.41 bilion → defisit RM4.09 bilion. Dengan tambahan RAV RM4.47 bilion → lebihan kecil RM373 juta — cukup untuk meluluskan hibah.",
        penting: "LTH menggunakan RAV untuk menentukan pematuhan Seksyen 22 Akta 535 (perlu aset ≥ liabiliti sebelum agih hibah). RCI: 'penggunaan RAV dalam pengiraan agihan keuntungan (hibah) telah menjadikan nilai aset lebih tinggi berbanding nilai yang dinyatakan dalam Laporan Penyata Kewangan Beraudit LTH.'",
        rumusan: "Dengan menukar 'pembaris' pengukuran, kesimpulan tentang kesihatan kewangan berubah sepenuhnya.",
        jaga: "RAV bukan konsep haram secara mutlak — tetapi penggunaannya untuk membayar hibah dikecam oleh RCI dan EY sendiri menyatakan laporan proformanya bukan untuk asas pembayaran hibah.",
        p: [116, 113, 20]
      },
      chart: L.hbars({
        data: [
          { label: "Tanpa RAV (penyata beraudit)", v: -4093, color: "var(--neg)", vl: "defisit RM4.09 bilion" },
          { label: "Dengan RAV (+RM4.47 bilion)", v: 373, color: "var(--pos)", vl: "lebihan RM373 juta" }
        ],
        legend: [{ t: "Defisit", c: "var(--neg)" }, { t: "Lebihan", c: "var(--pos)" }]
      })
    });
    v.appendChild(c4);

    var c5 = L.chartCard({
      q: "Bahan 'RAV' TH Plantations: RM4.04 bilion daripada RM4.6 bilion ialah anggaran pengurusan semata-mata",
      baca: "Bar menunjukkan asas nilai TH Plantations yang dicampur ke dalam RAV pada 2017. Hanya RM556 juta datang dari penilai profesional.",
      type: "fakta", p: 113,
      ins: {
        tunjuk: "LTH menambah RM2.29 bilion ke dalam RAV 2017 berasaskan penilaian hartanah TH Plantations RM4.6 bilion — tetapi 88% daripadanya (RM4.04 bilion) adalah anggaran pengurusan sendiri, bukan penilai bebas.",
        penting: "Ini menunjukkan betapa rapuhnya asas RAV: angka yang menentukan kelayakan hibah sebahagian besarnya 'buatan' pengurusan.",
        rumusan: "Semakin besar bahagian anggaran sendiri, semakin tidak boleh dipercayai angka RAV itu.",
        jaga: "RM4.04 bilion ialah anggaran pengurusan dalam konteks 2017 — bukan dakwaan penipuan oleh dashboard ini.",
        p: 113
      },
      chart: L.stackBars({
        data: [
          { label: "Penilaian THP", a: 556, b: 4044 }
        ],
        sa: "Dinilai penilai profesional (RM556 juta)", sb: "Anggaran pengurusan (RM4,044 juta)",
        ca: "var(--pos)", cb: "var(--warn)", h: 220
      })
    });
    v.appendChild(c5);

    v.appendChild(section("2.4", "Rosot nilai — berapa besar kerugian yang 'tidak dilihat'", ""));
    var c6 = L.chartCard({
      q: "Polisi rosot nilai 2017: ditukar dua kali dalam setahun — cuba sendiri kesannya",
      baca: "Rosot nilai = catatan rasmi bahawa aset (saham) telah jatuh nilai. LTH menukar polisinya daripada 70% kepada 85%, kemudian 90%. Slider di bawah menunjukkan berapa kerugian yang perlu dicatat jika polisi asal dikekalkan.",
      type: "fakta", p: 148,
      typeNote: "Angka dari jadual laporan (m.s. 148).",
      ins: {
        tunjuk: "Jika polisi >70% (jatuh >70% selama 2 tahun) dikekalkan: rosot nilai RM1.31 bilion. Polisi >85%: RM171 juta. Polisi >90%: hanya RM1 juta — itulah yang LTH rekodkan (RM1.0 juta).",
        penting: "Perbezaan RM1.31 bilion vs RM1 juta bukan kecil: ia menentukan sama ada LTH nampak untung atau rugi — dan sama ada hibah boleh dibayar.",
        rumusan: "Perubahan polisi ini adalah teras 'perakaunan kreatif' yang ditegur KAN (Emphasis of Matter, 16 Julai 2018).",
        jaga: "Jadual ini dari laporan PwC; polisi rosot nilai tidak salah dengan sendirinya — tetapi menukar polisi berturut-turut dalam setahun untuk mencapai angka tertentu adalah isu.",
        p: 148
      },
      chart: L.sliderImpairment({
        direkod: 1.0,
        steps: [
          { judul: "Polisi asal (>70%)", nilai: 1313, terang: "rosot nilai yang sepatutnya dicatat: RM1.31 bilion" },
          { judul: "Polisi kedua (>85%)", nilai: 171, terang: "rosot nilai turun kepada RM171 juta" },
          { judul: "Polisi akhir (>90%)", nilai: 1, terang: "rosot nilai hanya RM1 juta — hampir tiada langsung" }
        ]
      })
    });
    v.appendChild(c6);

    var c7 = L.chartCard({
      q: "Apa yang JAN (Jabatan Audit Negara) kata: RM1.54 bilion tidak diambil kira",
      baca: "Angka pegawai audit JAN: jika FRS 139 dipatuhi, RM1.31 bilion rosot nilai aset kewangan + RM227.81 juta rosot nilai anak syarikat/bersekutu tidak direkodkan.",
      type: "fakta", p: 134,
      ins: {
        tunjuk: "JAN (Mona binti Othman): 'Rosot nilai aset kewangan tidak direkodkan. Misalnya pada tahun 2017, rosot nilai sepatutnya (seperti mana FRS139) berjumlah RM1.310 bilion tidak direkodkan. LTH tidak merekodkan rosot nilai berjumlah RM227.81 juta terhadap pelaburan dalam syarikat subsidiari dan syarikat bersekutu pada tahun 2017.'",
        penting: "RM227.81 juta ini termasuk pelaburan TH Heavy Engineering Berhad sebanyak RM164.58 juta.",
        rumusan: "Walaupun jabatan audit sendiri mengakui angka ini, sijil audit tetap diberi — lihat bahagian seterusnya.",
        jaga: "Ini keterangan saksi dalam prosiding RCI, bukan penemuan audit bebas yang baharu.",
        p: 134
      },
      chart: L.hbars({
        data: [
          { label: "Rosot nilai aset kewangan (FRS 139)", v: 1310, color: "var(--neg)", vl: "RM1.31 bilion" },
          { label: "Rosot nilai subsidiari & bersekutu", v: 227.81, color: "var(--warn)", vl: "RM227.81 juta" },
          { label: "Jumlah tidak direkod", v: 1537.81, color: "var(--neg)", vl: "RM1.54 bilion" }
        ]
      })
    });
    v.appendChild(c7);

    v.appendChild(section("2.5", "Audit yang tidak tegas — 'Emphasis of Matter' menggantikan pendapat berteguran", ""));
    var c8 = L.chartCard({
      q: "Sijil audit LTH 2014–2017: bersih walaupun isu besar wujud",
      baca: "Sijil 'Bersih' bermaksud juruaudit mengesahkan penyata kewangan memberi gambaran benar. RCI mendapati 2014–2017 diberi sijil bersih, dan 2017 hanya disertai nota amaran (EoM) — sedangkan sepatutnya pendapat berteguran.",
      type: "fakta", p: 125,
      ins: {
        tunjuk: "KAN (Ketua Audit Negara) dalam surat 19 Dis 2018 kepada Perdana Menteri mengakui: Pendapat Berteguran dicadangkan untuk 2017, tetapi 'sekiranya Pendapat Berteguran diberikan, secara tidak langsung ia akan mempengaruhi ekspektasi dan persepsi negatif pihak berkepentingan, khususnya pendeposit' — maka Pendapat Tanpa Teguran + EoM diberikan.",
        penting: "RCI: 'Jelas bahawa JAN tidak tegas dalam pengauditan penyata kewangan LTH. Sepatutnya untuk tahun kewangan 2017, JAN tidak sepatutnya memberi Sijil Audit Bersih.'",
        rumusan: "Pertimbangan 'perasaan pendeposit' memasuki keputusan audit — yang sepatutnya berdasarkan angka semata.",
        jaga: "EoM ialah amaran berbeza daripada sijil gagal; tetapi RCI menegaskan ia sepatutnya dinaik taraf kepada pendapat berteguran.",
        p: [125, 133, 22]
      },
      chart: (function () {
        var rows = R.audit.tahun.map(function (t, i) {
          var k = R.audit.keputusan[i], c = "t-pos";
          if (t === 2017) c = "t-warn";
          return { t: String(t), e: k, c: c };
        });
        return tl(rows);
      })()
    });
    v.appendChild(c8);

    v.appendChild(quote(R.petikan[0].teks, R.petikan[0].sumber, R.petikan[0].p));

    v.appendChild(section("2.6", "Kronologi krisis", ""));
    v.appendChild(tl([
      { t: "2014–2016", e: "Hibah tinggi berterusan; BNM mula menulis surat amaran; EY siapkan laporan proforma (RAV)", c: "t-warn" },
      { t: "30 Jun 2016", e: "Laporan EY: metodologi RAV disyorkan — asas 'Laporan Proforma' LTH", c: "t-warn" },
      { t: "2017", e: "Polisi rosot nilai diubah 2 kali; hibah 4.50% + 1.75% dibayar (RM3.32 bilion)", c: "t-neg" },
      { t: "16 Jul 2018", e: "KAN keluarkan laporan audit 2017 dengan Emphasis of Matter", c: "t-neg" },
      { t: "23 Mei 2018", e: "EY keluarkan laporan semakan RAV (proforma) — LTH guna untuk sahkan kelayakan hibah", c: "t-warn" },
      { t: "19 Dis 2018", e: "Surat KAN kepada PM: mengakui pendapat berteguran tidak diberikan kerana bimbang reaksi pendeposit", c: "t-neg" },
      { t: "2019", e: "Hibah 1.25% → deposit mengecut RM73 bilion → RM69 bilion (akhir 2019)", c: "t-warn" },
      { t: "30 Ogos 2022", e: "Laporan RCI dibentangkan kepada Yang di-Pertuan Agong", c: "t-pos" }
    ]));
    return v;
  }

  /* ============================================================
     PANDANGAN 3 — PELABURAN BERMASALAH
  ============================================================ */
  function viewPelaburan() {
    var v = L.h("div");
    var l = L.h("div", { cls: "lead" });
    l.innerHTML = "<b>Persoalan panduan:</b> Laporan RCI menyenaraikan 14 pelaburan bermasalah yang disyorkan untuk audit forensik. Berapa banyak kerugian, apa yang berlaku, dan di mana ia sekarang? Ketik mana-mana bar untuk butiran penuh — setiap cerita boleh dijejak ke muka surat laporan.";
    v.appendChild(l);

    v.appendChild(quote(R.pelaburanTemuan.petikan, "Bab 3.14 — Pelaburan yang Bermasalah", R.pelaburanTemuan.p));
    v.appendChild(quote(R.pelaburanTemuan.petikan2, "Bab 3.14 — cara keputusan pelaburan diluluskan", R.pelaburanTemuan.p2));

    v.appendChild(section("3.1", "Peta kerugian 14 pelaburan bermasalah", "Nilai dalam RM (kerugian tidak nyata/dirosot/hapus kira). Klik bar untuk cerita penuh."));

    var statuses = {};
    R.pelaburan.forEach(function (x) { statuses[x.status] = true; });

    var pills = L.h("div", { cls: "pill-nav" });
    var list = L.h("div", { cls: "hbars" });
    var detailCue = L.h("div", { cls: "lead", html: "<b>Ketik mana-mana bar</b> untuk membaca cerita penuh pelaburan itu — kronologi, angka, dan status undang-undang terkini." });

    var sorted = R.pelaburan.slice().sort(function (a, b) { return b.kerugian - a.kerugian; });

    function render(filter) {
      list.innerHTML = "";
      var data = (filter && filter !== "Semua" ? sorted.filter(function (x) { return x.status === filter; }) : sorted)
        .map(function (x) {
          return { label: x.nama, v: x.kerugian, vl: x.jenis + (x.kerugian ? " · " + L.rm(x.kerugian) : ""), color: "var(--neg)" };
        });
      if (!data.length) { list.innerHTML = "<p style='font-size:13px;color:var(--ink3)'>Tiada pelaburan dalam kategori ini.</p>"; return; }
      var grid = L.hbars({ data: data, click: true });
      list.innerHTML = grid;
    }
    ["Semua"].concat(Object.keys(statuses)).forEach(function (s) {
      var b = L.h("button", { type: "button", cls: "pill" + (s === "Semua" ? " on" : "") }, s);
      b.addEventListener("click", function () {
        L.queryAll(pills, "button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        render(s);
      });
      pills.appendChild(b);
    });
    v.appendChild(pills);
    v.appendChild(list);
    v.appendChild(detailCue);
    render("Semua");

    L.bindDelegated(list, ".hbar", "click", function (row) {
      var label = row.querySelector(".hb-label").textContent;
      var inv = R.pelaburan.filter(function (x) { return x.nama === label; })[0];
      if (inv) openInv(inv);
    });

    function openInv(inv) {
      var box = L.h("div", { cls: "inv-detail" });
      box.appendChild(L.h("h4", { cls: "iv-name" }, inv.nama));
      box.appendChild(L.h("div", { cls: "iv-meta" }, inv.sektor + " · tahun pelaburan " + inv.tahun + " · " + inv.status));
      var grid = L.h("div", { cls: "inv-grid" });
      var items = [
        ["Pelaburan", inv.duit ? L.rm(inv.duit) : "—", ""],
        ["Kerugian / rosot", inv.kerugian ? L.rm(inv.kerugian) : "—", inv.jenis],
        ["Jenis kerugian", inv.jenis, ""],
        ["Status kini", inv.status, ""]
      ];
      items.forEach(function (it) {
        var d = L.h("div", { cls: "ig" + (it[1] && it[1].indexOf("RM") === 0 ? " ig-bad" : "") });
        d.appendChild(L.h("span", null, it[0]));
        d.appendChild(L.h("b", null, it[1]));
        if (it[2]) d.appendChild(L.h("div", { cls: "iv-meta" }, it[2]));
        grid.appendChild(d);
      });
      box.appendChild(grid);
      box.appendChild(L.h("p", null, inv.ringkas));
      if (inv.soalan) {
        var q = L.h("div", { cls: "iv-quote" }, "“" + inv.soalan + "”");
        box.appendChild(q);
      }
      if (inv.kronologi && inv.kronologi.length) {
        box.appendChild(L.h("b", null, "Kronologi"));
        box.appendChild(tl(inv.kronologi.map(function (k) { return { t: k.slice(0, k.indexOf(":") > 0 && k.indexOf(":") < 14 ? k.indexOf(":") + 1 : 0), e: k, c: "t-warn" }; })));
      }
      box.appendChild(L.h("div", { cls: "ins-src", html: L.srcLink(inv.p) }));
      L.modal(box);
    }

    v.appendChild(section("3.2", "Corak berulang — mengapa keputusan pelaburan begini boleh berlaku", ""));
    var m = L.h("div", { cls: "card" });
    m.innerHTML =
      "<b>1. Kelulusan 'dipersetujui seperti dicadangkan'.</b> Semua Menteri memberi keterangan bahawa mereka tiada input pihak ketiga sebelum meluluskan pelaburan — dokumen menunjukkan kelulusan automatik (m.s. 177).<br><br>" +
      "<b>2. Panel Pelaburan longgar.</b> Pengerusinya mengaku pendekatan 'longgar dan tidak menyeluruh' — panel terlalu bergantung kepada input pengurusan dan tidak menyemak cadangan (m.s. 176).<br><br>" +
      "<b>3. Kekurangan penyelarasan.</b> Tiada koordinasi antara Ketua Pegawai Pelaburan, Ketua Kewangan Korporat, Ketua Pegawai Hartanah dan Ketua Bahagian Perbendaharaan (m.s. 176).<br><br>" +
      "<b>4. Pelaburan strategik kebanyakannya rugi.</b> Kajian EY 2018 mendapati hampir semua anak syarikat strategik LTH mengalami kerugian — hanya Bank Islam Malaysia dan Syarikat Takaful Malaysia yang membayar dividen mampan (m.s. 221–225).<br><br>" +
      "<b>5. Beban kerja bertindih.</b> Anggota Lembaga memegang banyak jawatan dalam anak syarikat (Johan Abdullah 18 jawatan; Rozaida Omar 23 jawatan proksi) — kurang fokus kepada tugas hakiki dan berisiko konflik kepentingan (m.s. 86, 89).";
    v.appendChild(m);

    v.appendChild(section("3.3", "FGV — kes kajian kerugian terbesar", ""));
    var c9 = L.chartCard({
      q: "Perjalanan harga saham FGV: dari RM4.55 (IPO) ke RM0.69 — dan UJSB mengambil alih pada RM4.62",
      baca: "Garis menunjukkan harga saham FGV pada titik-titik yang dinyatakan laporan. LTH membeli, menjual sebahagian, membeli semula lebih banyak — dan harga terus jatuh.",
      type: "fakta", p: 192,
      ins: {
        tunjuk: "LTH melanggan IPO 273.6 juta unit @ RM4.55 (RM1.25 bilion), menjual 14.7 juta @ RM5.38, kemudian membeli semula 232 juta unit @ RM5.01. Harga jatuh ke RM0.885 — kerugian tidak nyata RM1.06 bilion. UJSB mengambil alih pegangan pada RM4.62 (RM1.31 bilion); harga pasaran Februari 2022: RM0.69.",
        penting: "RCI mempersoalkan: 'mengapa LTH terus memegang saham tersebut dan tidak menjualnya sehingga harganya telah turun dengan rendahnya. Ini menyebabkan LTH menanggung kerugian yang amat besar.'",
        rumusan: "Tanpa pengambilalihan UJSB, kerugian LTH dalam FGV dianggarkan ~RM1.1 bilion.",
        jaga: "RM4.62 ialah harga pengambilalihan UJSB (kos buku), bukan nilai pasaran — nilai sebenar bergantung kepada penebusan sukuk.",
        p: [192, 193]
      },
      chart: L.multiLine({
        xl: ["Jun 2012", "Jul 2012", "Okt 2012", "2015–18", "2018 (UJSB)", "Feb 2022"],
        h: 260,
        series: [
          { name: "FGV", c: "var(--neg)", pts: [
            { x: "Jun 2012", y: 4.55 }, { x: "Jul 2012", y: 5.38 }, { x: "Okt 2012", y: 5.01 },
            { x: "2015–18", y: 0.885 }, { x: "2018 (UJSB)", y: 4.62 }, { x: "Feb 2022", y: 0.69 }
          ] }
        ]
      })
    });
    v.appendChild(c9);

    var t = L.h("div", { cls: "card" });
    t.innerHTML = '<h3 style="font-family:var(--serif);margin:0 0 8px">Kronologi dagangan FGV oleh LTH</h3>';
    t.appendChild(tbl([
      ["Tarikh", "Tindakan", "Harga/unit", "Jumlah"],
      ["9 Mei 2012", "Kelulusan langganan IPO (sehingga 276 juta unit, 7.5%)", "RM4.65", "—"],
      ["26 Jun 2012", "Langganan 273,579,700 unit", "RM4.55", "RM1.25 bilion (kos penuh RM4.58/unit)"],
      ["28 Jun–19 Jul 2012", "Jualan 14,709,400 unit", "RM5.38", "Untung RM11.7 juta"],
      ["23 Jul–3 Okt 2012", "Beli semula 232,010,800 unit", "RM5.01", "+RM116.2 juta"],
      ["—", "Harga jatuh ke paras rendah", "RM0.885", "Kerugian tidak nyata RM1.06 bilion"],
      ["2018", "UJSB ambil alih 283,710,100 unit", "RM4.62", "RM1.31 bilion"],
      ["Feb 2022", "Harga pasaran", "RM0.69", "—"]
    ], true));
    t.appendChild(L.h("div", { cls: "ins-src", html: L.srcLink([192, 193]) }));
    v.appendChild(t);

    return v;
  }

  /* ============================================================
     PANDANGAN 4 — PENYELAMATAN UJSB
  ============================================================ */
  function viewUjsb() {
    var v = L.h("div");
    var l = L.h("div", { cls: "lead" });
    l.innerHTML = "<b>Persoalan panduan:</b> Pada Disember 2018, Kerajaan memindahkan aset 'kurang berdaya saing' LTH ke syarikat khas bernama Urusharta Jamaah (UJSB) dan memberi LTH sukuk RM27.5 bilion sebagai ganti. Adakah ini menyelamatkan LTH — dan pada kos siapa?";
    v.appendChild(l);

    v.appendChild(section("4.1", "Kronologi penubuhan UJSB", ""));
    v.appendChild(tl(R.ujsb.kronologi.map(function (k) { return { t: k.t, e: k.e, c: "t-warn" }; })));

    v.appendChild(section("4.2", "Perjanjian pemindahan: apa yang berpindah, dan pada nilai berapa", ""));
    var c10 = L.chartCard({
      q: "Aset bernilai pasaran RM9.7 bilion dipindahkan pada harga RM19.9 bilion — premium RM10.2 bilion",
      baca: "Bagi setiap kategori aset: bar gelap = nilai buku (audited), bar hijau = nilai pindahan, bar merah = nilai pasaran sebenar. Lihat betapa jauh nilai pindahan melebihi nilai pasaran.",
      type: "fakta", p: 159,
      ins: {
        tunjuk: "106 saham tersenarai (nilai pasaran RM7.6 bilion) dipindahkan pada RM16.85 bilion. Jumlah: nilai pasaran RM9.73 bilion, dipindahkan RM19.9 bilion — premium RM10.2 bilion.",
        penting: "Premium inilah yang 'menyelamatkan' LTH: ia mengisi defisit dan membolehkan hibah FY2018 dibayar (1.25%).",
        rumusan: "LTH menerima nilai buku + premium dalam bentuk sukuk — tetapi wang sebenar belum diterima; ia menjadi hutang Kerajaan melalui UJSB.",
        jaga: "Nilai pasaran ialah anggaran pada masa pemindahan (akhir 2018). Selepas pindahan, nilai aset ini terus jatuh — lihat carta berikut.",
        p: 159
      },
      chart: (function () {
        var box = L.h("div");
        box.innerHTML = L.flowUjsb({ baris: R.ujsb.aset.baris.map(function (b) {
          return { label: b.label, buku: b.buku, pindah: b.pindah, pasaran: b.pasaran };
        }), max: R.ujsb.aset.jumlah.pindah });
        return box;
      })()
    });
    v.appendChild(c10);

    var c11 = L.chartCard({
      q: "Struktur pembayaran: Sukuk Siri 1, Sukuk Siri 2 dan wang tunai RM300 juta",
      baca: "LTH melanggan RM27.5 bilion sukuk berkupon sifar (dibayar penuh pada matang) + RM300 juta tunai. Nilai nominal jauh lebih tinggi daripada jumlah diterbitkan — di sinilah premium RM10.2 bilion 'disimpan'.",
      type: "fakta", p: 162,
      ins: {
        tunjuk: "Siri 1: RM10 bilion diterbitkan, bernilai nominal RM13.2 bilion, matang 7 tahun (2026), pulangan 4.05%/tahun. Siri 2: RM9.6 bilion diterbitkan, nominal RM14.3 bilion, matang 10 tahun (2029), 4.10%/tahun.",
        penting: "Sukuk ini ialah aset terbesar LTH yang baharu — dan hasil pengakruannya menyumbang hampir 26% pendapatan tahunan LTH (m.s. 171).",
        rumusan: "Kesolvenan LTH kini bergantung kepada keupayaan Kerajaan (melalui UJSB) membayar sukuk ini pada 2026 dan 2029.",
        jaga: "Sukuk berkupon sifar bermakna tiada bayaran tahunan — keseluruhan wang perlu dibayar pada matang. RM7.65 bilion daripada RM27.5 bilion ialah akruan keuntungan yang tidak pernah diterima secara tunai (m.s. 159).",
        p: [162, 163, 171]
      },
      chart: L.groupBars({
        data: R.ujsb.sukuk.map(function (s) {
          return { label: s.siri + " · " + s.tempoh, a: s.terbit, b: s.nominal };
        }),
        sa: "Diterbitkan (RM bilion)", sb: "Nilai nominal (RM bilion)",
        ca: "var(--pri)", cb: "var(--gold)", h: 235
      })
    });
    v.appendChild(c11);

    var sukukCards = L.h("div", { cls: "kpis" });
    sukukCards.appendChild(L.h("div", { cls: "kpi" }, L.h("div", { cls: "kpi-v" }, "RM10.0B"), L.h("div", { cls: "kpi-l" }, "Sukuk Siri 1 diterbitkan"), L.h("div", { cls: "kpi-n" }, "Nominal RM13.2B · matang 2026 · 4.05%/thn")));
    sukukCards.appendChild(L.h("div", { cls: "kpi" }, L.h("div", { cls: "kpi-v" }, "RM9.6B"), L.h("div", { cls: "kpi-l" }, "Sukuk Siri 2 diterbitkan"), L.h("div", { cls: "kpi-n" }, "Nominal RM14.3B · matang 2029 · 4.10%/thn")));
    sukukCards.appendChild(L.h("div", { cls: "kpi" }, L.h("div", { cls: "kpi-v" }, "RM300J"), L.h("div", { cls: "kpi-l" }, "Wang tunai"), L.h("div", { cls: "kpi-n" }, "RM100J (2019) + RM200J (2020)")));
    sukukCards.appendChild(L.h("div", { cls: "kpi" }, L.h("div", { cls: "kpi-v" }, "2026/2029"), L.h("div", { cls: "kpi-l" }, "Matang sukuk"), L.h("div", { cls: "kpi-n" }, "Ujian besar untuk LTH & Kerajaan")));
    v.appendChild(sukukCards);

    v.appendChild(section("4.3", "Apa yang berlaku kepada aset selepas dipindahkan", ""));
    var c12 = L.chartCard({
      q: "29 hartanah: nilai pindahan RM2.25 bilion → nilai pasaran Dis 2021 RM1.2 bilion",
      baca: "Bagi setiap kategori hartanah: bar hijau = nilai pindahan, bar merah = nilai pasaran pada Dis 2021 (penilaian jurunilai bebas).",
      type: "fakta", p: 161,
      ins: {
        tunjuk: "Hotel (RM804 juta → RM424 juta), menara pejabat (RM737 juta → RM325 juta), tanah (RM627 juta → RM401 juta) — kesemuanya susut selepas pemindahan.",
        penting: "JAN menegur: nilai pindahan 29 hartanah ini melebihi penilaian JPPHM sebanyak RM543.65 juta, walaupun 11 daripada 29 dinilai di bawah paras JPPHM.",
        rumusan: "Premium RM10.2 bilion ialah 'kertas' — nilai aset sebenar yang menyokongnya telah jatuh, menambah risiko penebusan sukuk.",
        jaga: "Penilaian Dis 2021 ialah selepas pandemik Covid-19, yang menekan nilai hartanah secara umum.",
        p: [161, 160]
      },
      chart: L.groupBars({
        data: R.ujsb.hartanah.baris.map(function (b) {
          return { label: b.label, a: b.pindah / 1e6, b: b.pasaran / 1e6 };
        }),
        sa: "Nilai pindahan (RM juta)", sb: "Nilai pasaran Dis 2021 (RM juta)",
        ca: "var(--pri)", cb: "var(--neg)", h: 245
      })
    });
    v.appendChild(c12);

    var c13 = L.chartCard({
      q: "5 saham 'saham mewah' yang dipindahkan: berapa nilai mereka jatuh",
      baca: "Setiap garis menunjukkan perjalanan harga saham: harga pemindahan (kiri), harga 31 Dis 2018 (tengah), harga 8 Jun 2022 (kanan).",
      type: "fakta", p: 161,
      ins: {
        tunjuk: "Axiata jatuh 39.5%, TM 60.9%, Maxis 20.6%, Digi 17.3%, MISC 17.2% antara harga pemindahan dan 31 Dis 2018. Jumlah nilai jatuh RM946 juta. Harga 8 Jun 2022 masih di bawah harga pemindahan untuk semua kaunter.",
        penting: "Aset yang 'dipindahkan pada premium' sebenarnya jatuh nilai — premium itu bukan wang, tetapi janji.",
        rumusan: "Nilai pasaran portfolio yang dipindahkan jatuh lebih jauh selepas pemindahan — melemahkan asas nilai nominal sukuk.",
        jaga: "Harga saham naik turun; 8 Jun 2022 hanyalah satu tarikh. TM (5.20) pulih dari paras 2.33 tetapi masih di bawah 5.96.",
        p: 161
      },
      chart: L.multiLine({
        xl: ["Harga pemindahan", "31 Dis 2018", "8 Jun 2022"],
        h: 280,
        series: R.ujsb.bluechips.baris.map(function (b, i) {
          var colors = ["var(--neg)", "var(--info)", "var(--uni)", "var(--warn)", "var(--sim)"];
          return {
            name: b.nama, c: colors[i % colors.length],
            pts: [
              { x: "Pindah", y: b.hargaPindah }, { x: "Dis2018", y: b.hargaDis },
              { x: "Jun2022", y: [3.04, 3.52, 7.30, 3.27, 5.20][i] }
            ]
          };
        })
      })
    });
    v.appendChild(c13);

    v.appendChild(section("4.4", "Berapa banyak yang benar-benar diterima LTH", ""));
    var c14 = L.chartCard({
      q: "LTH terima RM500 juta tunai — daripada nilai pasaran aset RM9.73 bilion yang dipindahkan",
      baca: "Bar menunjukkan wang tunai sebenar yang diterima LTH setakat laporan (2022) berbanding nilai pemindahan dan nilai pasaran aset.",
      type: "fakta", p: 166,
      ins: {
        tunjuk: "Pembayaran tunai: RM100 juta (Dis 2019) + RM200 juta (Dis 2020) + RM200 juta penebusan awal (Nov 2020) = RM500 juta. Baki penuh akan diterima melalui sukuk pada 2026 dan 2029.",
        penting: "Sementara itu, Kerajaan meluluskan RM17.8 bilion peruntukan (RM500 juta RMK11 + RM17.3 bilion, purata RM1.73 bilion setahun, RMK12 & 13) untuk menampung kekurangan penebusan sukuk (m.s. 165).",
        rumusan: "Kos penyelamatan akhirnya ditanggung oleh kewangan awam — dan Jaminan Kerajaan kepada deposit pendeposit kini bernilai RM88 bilion (m.s. 32).",
        jaga: "Sukuk ialah obligasi sah Kerajaan; RM500 juta ialah tunai yang diterima setakat laporan — bukan jumlah keseluruhan yang akan diterima.",
        p: [166, 165, 32]
      },
      chart: L.bars({
        data: [
          { label: "Tunai diterima LTH", v: 500, color: "var(--pos)", vl: "RM500 juta" },
          { label: "Nilai pasaran aset", v: 9729, color: "var(--neg)", vl: "RM9.73 bilion" },
          { label: "Nilai pemindahan", v: 19900, color: "var(--gold)", vl: "RM19.9 bilion" }
        ], h: 235
      })
    });
    v.appendChild(c14);

    v.appendChild(section("4.5", "Kepergantungan baharu: LTH kini bergantung kepada UJSB", ""));
    var dep = L.h("div", { cls: "kpis" });
    R.ujsb.kepentingan.forEach(function (d) {
      dep.appendChild(L.h("div", { cls: "kpi" }, L.h("div", { cls: "kpi-v" }, d.nilai), L.h("div", { cls: "kpi-l" }, d.item), L.h("div", { cls: "kpi-n" }, L.srcLink(d.p))));
    });
    v.appendChild(dep);
    var c15 = L.chartCard({
      q: "Risiko terbesar LTH pada masa hadapan: 'Kegagalan UJSB boleh membawa ekosistem kewangan negara kepada krisis'",
      baca: "Kutipan langsung daripada laporan (m.s. 26).",
      type: "fakta", p: 26,
      ins: {
        tunjuk: "Hasil pengakruan Sukuk UJSB menyumbang hampir 26% daripada keseluruhan pendapatan tahunan LTH dan melebihi satu pertiga daripada jumlah agihan keuntungan tahunan kepada pendeposit.",
        penting: "Jika UJSB gagal membayar: LTH kehilangan sumber pendapatan utama, hibah terjejas, pendeposit mungkin menarik keluar — dan Kerajaan terpaksa mengaktifkan Jaminan RM88 bilion.",
        rumusan: "Struktur penyelamatan menyelesaikan krisis 2017 tetapi mewujudkan kebergantungan baharu yang besar kepada Kerajaan.",
        jaga: "Pengakruan ialah pendapatan 'atas kertas' — ia direkod dalam buku tetapi wang tunai belum masuk.",
        p: [171, 26]
      },
      chart: (function () {
        var box = L.h("div", { cls: "methodo" });
        box.innerHTML = "<b>Perjanjian ROFR — jaring keselamatan atau perangkap harga?</b><br>LTH diberi hak membeli semula aset jika UJSB mahu menjual — tetapi pada harga premium. Daripada 9 tawaran ROFR yang direkod, LTH perlu bayar lebih 2.4% hingga 40.6% daripada harga pasaran. Hanya satu hartanah terjual setakat laporan (tanah Segamat, RM920 ribu); 75 daripada 106 kaunter telah dilupuskan UJSB.";
        box.appendChild(L.h("div", { cls: "ins-src", html: L.srcLink([169, 167]) }));
        return box;
      })()
    });
    v.appendChild(c15);

    var c16 = L.chartCard({
      q: "Tawaran ROFR: harga yang LTH perlu bayar untuk membeli semula asetnya sendiri",
      baca: "Jadual tawaran hak penolakan pertama (ROFR) yang direkod laporan. 'Premium' = peratusan lebih tinggi daripada harga pasaran.",
      type: "fakta", p: 169,
      chart: tbl([
        ["Syarikat", "Tarikh", "Harga ROFR", "Pasaran", "Premium"],
        ["WZ Satu", "24 Mac 2020", "RM0.090", "RM0.064", "+40.6%"],
        ["Eastern & Oriental", "25 Mac 2020", "RM0.365", "RM0.335", "+9.0%"],
        ["WZ Satu", "31 Mac 2020", "RM0.085", "RM0.075", "+13.3%"],
        ["WCT Holdings", "2 Apr 2020", "RM0.400", "RM0.377", "+6.1%"],
        ["KSL Holdings", "6 Mei 2020", "RM0.610", "RM0.630", "−3.2%"],
        ["KSL Holdings", "21 Mei 2020", "RM0.580", "RM0.605", "−4.1%"],
        ["Hap Seng Plant.", "29 Mei 2020", "RM1.650", "RM1.570", "+5.1%"],
        ["FGV Holdings", "9 Dis 2020", "RM1.300", "RM1.270", "+2.4%"],
        ["Integrated Logistik", "14 Mac 2022", "RM0.380", "RM0.365", "+4.1%"]
      ], true)
    });
    v.appendChild(c16);

    v.appendChild(section("4.6", "Empat pilihan yang ditimbang — dan yang dipilih", ""));
    var opts = L.h("div", { cls: "card" });
    opts.innerHTML =
      "Jawatankuasa khas (Pejabat PM, BNM, MOF, pengurusan kanan LTH) menimbang 4 pilihan:<br><br>" +
      "<b>1. Geran langsung</b> >RM10 bilion (m.s. 152) — menutup defisit terus.<br>" +
      "<b>2. Aktifkan jaminan s.24 Akta 535</b> — jaminan Kerajaan kepada deposit pendeposit.<br>" +
      "<b>3. Aset tertangguh (deferred asset)</b> — tidak dibenarkan MFRS 9.<br>" +
      "<b>4. Pindah aset ke SPV (UJSB)</b> — model Danaharta Nasional 1998 — <b>dipilih</b> (m.s. 152–155).<br><br>" +
      "RCI menganggap pilihan ini sesuai pada masa itu, tetapi memberi amaran tentang kebergantungan baharu kepada Kerajaan (m.s. 26).";
    v.appendChild(opts);
    return v;
  }

  /* ============================================================
     PANDANGAN 5 — HAJI & PENDEPOSIT
  ============================================================ */
  function viewHaji() {
    var v = L.h("div");
    var l = L.h("div", { cls: "lead" });
    l.innerHTML = "<b>Persoalan panduan:</b> LTH mengenakan bayaran haji RM9,980 yang tidak berubah selama 13 tahun — sementara kos sebenar naik dari RM16,155 (2014) ke RM25,540 (2022). Perbezaannya ditanggung LTH melalui subsidi HAFIS yang diambil daripada keuntungan pelaburan. Berapa besar beban ini — dan bolehkah ia berterusan?";
    v.appendChild(l);

    v.appendChild(section("5.1", "Kos haji vs bayaran jemaah — siapa tanggung selebihnya", ""));
    var c17 = L.chartCard({
      q: "Setiap jemaah haji 2014–2019: bayaran RM9,980 — selebihnya subsidi LTH",
      baca: "Bar = kos sebenar setiap jemaah. Bahagian hijau = bayaran jemaah. Bahagian emas = subsidi HAFIS yang LTH tanggung. Peratusan di atas bar menunjukkan bahagian subsidi yang semakin membesar.",
      type: "fakta", p: 204,
      ins: {
        tunjuk: "Subsidi per jemaah: RM6,175 (2014, 38%) → RM12,920 (2019, 56%). Jumlah subsidi tahunan: RM106 juta → RM299 juta.",
        penting: "Subsidi ini diambil daripada keuntungan pelaburan — wang yang sepatutnya dikongsi dengan pendeposit sebagai hibah. RCI menganggarkan setiap RM400 juta subsidi ≈ 0.4% kadar hibah.",
        rumusan: "Setiap RM1 subsidi haji = RM1 kurang keuntungan untuk pendeposit. Subsidi silang ini adalah teras konflik LTH.",
        jaga: "Angka HAFIS 2017–2019 dalam jadual (RM298/RM314/RM299 juta) berbeza sedikit daripada RM300 juta dalam Ringkasan Eksekutif — dashboard menggunakan jadual terperinci (m.s. 204).",
        p: [204, 206]
      },
      chart: L.stackBars({
        data: R.hafis.sebenar.tahun.map(function (t, i) {
          var k = R.hafis.sebenar.kos[i], b = R.hafis.sebenar.bayaran[i];
          return { label: String(t), a: b, b: k - b, pct: Math.round((k - b) / k * 100) + "%" };
        }),
        sa: "Bayaran jemaah (RM)", sb: "Subsidi HAFIS (RM)",
        ca: "var(--pri)", cb: "var(--gold)", h: 260
      })
    });
    v.appendChild(c17);

    var c18 = L.chartCard({
      q: "Unjuran 2022–2030: subsidi boleh mencecah 66% daripada kos haji — RM742 juta setahun",
      baca: "Unjuran laporan jika bayaran jemaah dikekalkan pada RM12,980 (kadar bukan B40 2022). Bahagian emas = subsidi yang LTH perlu tanggung.",
      type: "unjuran", p: 205,
      typeNote: "Angka unjuran daripada laporan — bukan fakta yang berlaku.",
      ins: {
        tunjuk: "Subsidi per jemaah naik daripada 49.2% (2022) kepada 65.6% (2030). Jumlah tahunan: RM377 juta → RM742 juta.",
        penting: "Ini menjelaskan cadangan RCI: naikkan bayaran pendaftaran RM1,300 → RM12,980 dan hadkan subsidi kepada yang memerlukan sahaja.",
        rumusan: "Tanpa perubahan dasar, beban subsidi akan terus membesar dan menekan hibah pendeposit.",
        jaga: "Unjuran ini mengandaikan kos haji naik 3–5% setahun (m.s. 203) dan bayaran kekal RM12,980. Perubahan kuota, kadar tukaran dan dasar baharu akan mengubah angka ini.",
        p: 205
      },
      chart: L.stackBars({
        data: R.hafis.unjuran.tahun.map(function (t, i) {
          var k = R.hafis.unjuran.kos[i], b = R.hafis.unjuran.bayaran[i];
          return { label: String(t), a: b, b: k - b, pct: Math.round((k - b) / k * 100) + "%" };
        }),
        sa: "Bayaran jemaah (RM)", sb: "Subsidi HAFIS (RM)",
        ca: "var(--pri)", cb: "var(--warn)", h: 260
      })
    });
    v.appendChild(c18);

    var sim = L.chartCard({
      q: "Simulasi: ubah bayaran jemaah & bilangan jemaah — lihat kesan kepada subsidi",
      baca: "Andaian anda (SIMULASI) — bukan angka laporan. Kos haji 2022: RM25,540.",
      type: "simulasi", p: 205,
      typeNote: "Kos haji & kadar bayaran dari laporan; bilangan jemaah ialah andaian pengguna.",
      ins: {
        tunjuk: "Laporan unjur: dengan RM12,980 dan ~30,000 jemaah, subsidi ≈ RM377 juta setahun (2022).",
        penting: "Jika kuota naik ke 60,000 (m.s. 209) dan kos terus meningkat, beban subsidi berganda.",
        rumusan: "Simulasi ini menunjukkan mengapa cadangan mengehadkan subsidi kepada yang memerlukan adalah penting.",
        jaga: "Simulasi tidak mengambil kira pulangan pelaburan LTH yang juga meningkat dengan masa.",
        p: 209
      },
      chart: L.hafisSim()
    });
    v.appendChild(sim);

    v.appendChild(section("5.2", "Deposit & pendeposit — asas kuasa LTH", ""));
    var c19 = L.chartCard({
      q: "Perjalanan deposit: RM73B → RM69B (panik 2019) → RM76B → RM88B",
      baca: "Garis penuh = angka sebenar dari laporan. Garis putus-putus = unjuran laporan.",
      type: "fakta", p: 122,
      ins: {
        tunjuk: "Selepas pengumuman hibah 1.25% (untuk 2018), deposit mengecut kira-kira RM4 bilion — pendeposit besar menarik keluar wang (m.s. 122). Pulih kepada ~RM76 bilion akhir 2020, RM88 bilion pada 2022, dan diunjurkan RM100 bilion dalam dua tahun (m.s. 218).",
        penting: "RCI menyebut ini sebagai 'bank run' kecil — risiko sebenar jika hibah terlalu rendah atau keyakinan hilang.",
        rumusan: "Deposit ialah 'nyawa' LTH: ia perlu membayar hibah kompetitif untuk mengekalkan pendeposit, tetapi keuntungan tidak mencukupi.",
        jaga: "Angka 'RM73 bilion sebelum pengumuman' ialah anggaran laporan (kira-kira), bukan angka tepat.",
        p: [122, 218]
      },
      chart: (function () {
        var d = R.deposit.titik;
        var pts = d.map(function (p) { return { x: p.t, y: p.v }; });
        return L.multiLine({
          xl: d.map(function (p) { return p.t; }),
          h: 250,
          note: "Pandangan setakat 2022",
          series: [
            { name: "Deposit (RM bilion)", c: "var(--info)", pts: pts }
          ]
        });
      })()
    });
    v.appendChild(c19);

    var conc = L.h("div", { cls: "grid2" });
    var c20 = L.chartCard({
      q: "Tumpuan deposit: 5% pendeposit pegang 75% wang",
      baca: "Carta ini menggambarkan taburan: segmen kecil pendeposit menguasai kebanyakan deposit — asas kerapuhan LTH.",
      type: "fakta", p: 216,
      ins: {
        tunjuk: "'Dianggarkan 75% deposit di LTH dimiliki oleh hanya 5% daripada pendepositnya' (m.s. 216).",
        penting: "Jika pendeposit besar ini hilang keyakinan dan menarik keluar wang, LTH serta-merta berhadapan masalah kecairan — tekanan kepada kadar hibah.",
        rumusan: "Keputusan hibah bukan sekadar kewangan — ia keputusan 'keyakinan' pendeposit besar.",
        jaga: "Peratusan ini ialah anggaran laporan untuk konteks perbincangan model perniagaan — bukan statistik tepat saiz pendeposit.",
        p: 216
      },
      chart: L.donut({
        centerV: "75%", centerL: "deposit",
        data: [
          { label: "5% pendeposit terbesar", v: 75, c: "var(--neg)" },
          { label: "95% pendeposit lain", v: 25, c: "var(--surface3)" }
        ]
      })
    });
    var c21 = L.chartCard({
      q: "Sebaliknya: 65% pendeposit simpan RM2,000 atau kurang",
      baca: "Majoriti pendeposit ialah penabung kecil — mereka yang paling terdedah kepada perubahan hibah.",
      type: "fakta", p: 207,
      ins: {
        tunjuk: "Laporan: 65% pendeposit memegang RM2,000 atau kurang dalam akaun.",
        penting: "Pendeposit kecil ini tidak mungkin menarik keluar wang kerana nominal kecil — tetapi mereka yang paling bergantung kepada LTH untuk giliran haji.",
        rumusan: "Beban subsidi haji sebenarnya dipikul bersama oleh ramai pendeposit kecil — bukan hanya yang besar.",
        jaga: "Angka ini menerangkan bilangan pendeposit, bukan bahagian deposit yang mereka pegang.",
        p: 207
      },
      chart: L.donut({
        centerV: "65%", centerL: "pendeposit",
        data: [
          { label: "Pendeposit dengan ≤RM2,000", v: 65, c: "var(--warn)" },
          { label: "Pendeposit lain", v: 35, c: "var(--surface3)" }
        ]
      })
    });
    conc.appendChild(c20);
    conc.appendChild(c21);
    v.appendChild(conc);

    var c22 = L.chartCard({
      q: "Giliran haji: dari 130 tahun kepada 33 tahun — dengan deposit minimum RM12,980",
      baca: "Cadangan RCI: naikkan deposit pendaftaran RM1,300 → RM12,980. Ini menambah dana LTH dan memendekkan giliran.",
      type: "fakta", p: 236,
      ins: {
        tunjuk: "Laporan: 'Ini bukan sahaja akan menambah jumlah deposit LTH malah akan mengurangkan tempoh menunggu giliran haji daripada 130 tahun kepada 33 tahun.'",
        penting: "Tempoh menunggu yang panjang adalah isu utama bagi pendeposit kecil yang menabung untuk haji.",
        rumusan: "Perubahan satu nombor (deposit minimum) memberi kesan besar kepada kedua-dua aspek: dana LTH dan pengalaman pendeposit.",
        jaga: "Kiraan 33 tahun (EY, menggunakan RM9,980) adalah anggaran; dengan RM12,980 hasilnya mungkin berbeza.",
        p: [236, 208]
      },
      chart: L.hbars({
        data: [
          { label: "Tempoh menunggu sekarang", v: 130, color: "var(--neg)", vl: "130 tahun" },
          { label: "Tempoh dengan deposit baharu", v: 33, color: "var(--pos)", vl: "33 tahun" }
        ]
      })
    });
    v.appendChild(c22);

    v.appendChild(section("5.3", "Zakat — insentif menyimpan di LTH", ""));
    v.appendChild(tl(R.zakat.map(function (z) { return { t: z.t, e: z.e, c: "t-pos" }; })));
    var z = L.h("div", { cls: "card methodo" });
    z.innerHTML = "<b>Mengapa zakat penting?</b> LTH membayar zakat bagi pendeposit — sebab utama ramai orang Islam menyimpan di LTH. Namun penggantian akad (kontrak) daripada Mudarabah kepada Wadi'ah (2016) dan Wakalah (2019) mengubah asas kewajipan zakat, dan tiada dokumen menunjukkan pendeposit bersetuju keuntungan mereka digunakan untuk subsidi haji. RCI mencadangkan isu ini dirujuk kepada Jawatankuasa Muzakarah MKI (m.s. 234).";
    v.appendChild(z);
    return v;
  }

  /* ============================================================
     PANDANGAN 6 — TADBIR URUS
  ============================================================ */
  function viewTadbir() {
    var v = L.h("div");
    var l = L.h("div", { cls: "lead" });
    l.innerHTML = "<b>Persoalan panduan:</b> Akta Tabung Haji 1995 memberi kuasa sangat luas kepada Menteri Hal Ehwal Agama — termasuk melantik Pengerusi, CEO dan anggota Lembaga, serta meluluskan setiap pelaburan dan kadar hibah. RCI mendapati tiga orang Menteri yang menyelia LTH dalam tempoh siasatan hanya berkepakaran dalam hal ehwal agama, dan bergantung sepenuhnya kepada cadangan pengurusan LTH.";
    v.appendChild(l);

    v.appendChild(section("6.1", "Siapa pegang tampuk kuasa, bila", ""));
    var c23 = L.chartCard({
      q: "Tiga baris kepimpinan 2006–2022: Menteri, Pengerusi Lembaga, CEO",
      baca: "Bar = tempoh jawatan. Bar lutsinar = penamatan awal tanpa sebab. Setiap bar boleh diklik untuk butiran.",
      type: "fakta", p: [56, 59, 65],
      chart: L.gantt({
        from: 2006, to: 2022.6,
        rows: [
          { name: "Menteri Hal Ehwal Agama", bars: R.menteri.map(function (m) { return { mula: m.mula, tamat: m.tamat, nama: m.nama.split(" ")[0], catatan: m.catatan, color: "var(--gold)" }; }) },
          { name: "Pengerusi LTH", bars: R.pengerusi.map(function (m) { return { mula: m.mula, tamat: m.tamat, nama: m.nama.split(" ")[0], catatan: m.catatan, color: "var(--pri)" }; }) },
          { name: "CEO LTH", bars: R.ceo.map(function (m) { return { mula: m.mula, tamat: m.tamat, nama: m.nama.split(" ")[0], catatan: m.catatan, color: "var(--info)" }; }) }
        ]
      })
    });
    v.appendChild(c23);

    var c24 = L.chartCard({
      q: "Politik dalam Lembaga: 3 ahli politik aktif semasa krisis 2014–2018",
      baca: "RCI: penglibatan ahli politik menyebabkan keputusan LTH (hibah, bayaran haji, HAFIS) didorong unsur politik, dan kredibiliti LTH terjejas.",
      type: "fakta", p: 77,
      ins: {
        tunjuk: "Abdul Azeez (Pengerusi 2013–2018) ialah Ahli Parlimen Baling dan Ahli Majlis Tertinggi UMNO. Badruddin Amiruldin (Lembaga 2005–2018) ialah Pengerusi Tetap Perhimpunan Agung UMNO. Rosni Sohar (Lembaga 2014–2018) ialah ADUN dan Setiausaha Wanita UMNO.",
        penting: "RCI mencadangkan larangan ahli politik aktif daripada menjadi Pengerusi/anggota Lembaga dan anak syarikat dikanunkan dalam Akta 535.",
        rumusan: "Struktur pelantikan yang terbuka kepada politik aktif membenarkan pertembungan politik menjejaskan keputusan kewangan.",
        jaga: "RCI tidak menyatakan ketiga-tiga mereka melakukan salah laku dalam jawatan — isunya ialah konflik peranan dan persepsi.",
        p: 77
      },
      chart: L.hbars({
        data: R.politisi.map(function (p) {
          return { label: p.nama, v: 1, color: "var(--warn)", vl: p.jawatan };
        })
      })
    });
    v.appendChild(c24);

    v.appendChild(section("6.2", "Kuasa Menteri & penamatan tanpa sebab", ""));
    var c25 = L.chartCard({
      q: "11 kuasa Menteri di bawah Akta 535 — merangkumi hampir semua keputusan penting",
      baca: "Senarai kuasa Menteri Hal Ehwal Agama. Tiada keperluan kelulusan Menteri Kewangan untuk kebanyakan keputusan kewangan.",
      type: "fakta", p: [57, 58],
      chart: (function () {
        var ul = L.h("ul", { cls: "tl" });
        R.kuasaMenteri.forEach(function (k, i) {
          var li = L.h("li", { cls: "t-warn" });
          li.appendChild(L.h("span", { cls: "tl-t" }, (i + 1) + "."));
          li.appendChild(document.createTextNode(" " + k));
          ul.appendChild(li);
        });
        return ul;
      })()
    });
    v.appendChild(c25);

    var c26 = L.chartCard({
      q: "Dua penamatan tanpa sebab — CEO dan Pengerusi",
      baca: "Seksyen 6(5) Akta 535 membenarkan Menteri membatalkan pelantikan 'pada bila-bila masa' tanpa memberi sebab. Kuasa ini digunakan dua kali dalam tempoh siasatan.",
      type: "fakta", p: 82,
      chart: (function () {
        var box = L.h("div", { cls: "hbars" });
        box.innerHTML = R.penamatan.map(function (p) {
          return '<div class="hbar"><div class="hb-label">' + p.siapa + '</div><div class="hb-track"><div class="hb-fill" style="width:100%;background:var(--neg)"></div></div>' +
            '<div class="hb-val">' + p.tarikh + "</div><div class='hb-label' style='font-weight:400;font-size:12px;color:var(--ink3)'>" + p.nota + "</div></div>";
        }).join("");
        return box;
      })()
    });
    v.appendChild(c26);

    v.appendChild(section("6.3", "Beban kerja bertindih dalam anak syarikat", ""));
    var c27 = L.chartCard({
      q: "Jawatan dalam anak syarikat yang dipegang serentak — sehingga 23 jawatan",
      baca: "Semakin panjang bar, semakin banyak jawatan (Pengerusi/ALP) dalam anak syarikat yang dipegang oleh seorang anggota Lembaga/pengurusan.",
      type: "fakta", p: [86, 89],
      ins: {
        tunjuk: "Rozaida Omar (CFO) memegang 23 jawatan proksi; Johan Abdullah (CEO) 18 jawatan termasuk Pengerusi 3 syarikat; Ismee Ismail (CEO) memegang jawatan di THP, Trurich, BIMB, Bank Islam dan Takaful.",
        penting: "RCI: 'Penglibatan anggota Lembaga dan pengurusan tertinggi LTH dalam pengurusan anak-anak syarikat menyebabkan mereka kurang memberi fokus kepada tugas hakiki di LTH dan menimbulkan konflik kepentingan.'",
        rumusan: "Cadangan: hadkan penglibatan; dasar baharu LTH hadkan kepada 5 jawatan sahaja.",
        jaga: "Memegang beberapa jawatan tidak salah dengan sendirinya — isunya ialah ketiadaan had dan potensi konflik.",
        p: [86, 89, 17]
      },
      chart: L.hbars({
        data: R.direktorat.map(function (d) {
          return { label: d.nama, v: d.jumlah, color: "var(--warn)", vl: d.jumlah + " jawatan · " + d.nota };
        })
      })
    });
    v.appendChild(c27);

    v.appendChild(section("6.4", "Amaran awal yang diabaikan — BNM", ""));
    v.appendChild(tl(R.bnm.map(function (b) { return { t: b.t, e: b.e, c: "t-warn" }; })));
    var bnmNote = L.h("div", { cls: "card methodo" });
    bnmNote.innerHTML = "<b>Bukan pengawal selia, tetapi memberi amaran.</b> BNM bukan pengawal selia LTH pada masa itu — namun menulis surat teguran tentang kecairan dan rizab sejak 2014, dan mendedahkan 'kemampuan LTH membayar hibah yang tinggi' kepada Menteri pada Dis 2015. LTH baru diletakkan di bawah pengawasan BNM pada 1 Januari 2019 (m.s. 100, 212–213).";
    v.appendChild(bnmNote);

    v.appendChild(section("6.5", "Bonus — ganjaran yang tidak selaras dengan kemampuan", ""));
    var c28 = L.chartCard({
      q: "Peruntukan bonus kakitangan 2010–2020: RM74 juta pada 2014 — sehingga 13 bulan gaji",
      baca: "Bar = peruntukan bonus (RM juta). Tahun 2014–2017 ditanda emas: tempoh krisis yang tersembunyi.",
      type: "fakta", p: 137,
      ins: {
        tunjuk: "Bonus 2010–2017: 2 hingga 13 bulan gaji. 2014: 1–11 bulan + 2 bulan bonus khas (peruntukan RM74 juta). Selepas 2018: dikawal kepada 1 bulan (peruntukan RM10.8–14.1 juta).",
        penting: "Bonus tinggi dibayar pada masa nilai aset kurang daripada liabiliti (m.s. 139) — ia wajar 'dapat dibayar' kerana penilaian RAV menunjukkan keuntungan besar.",
        rumusan: "Selepas krisis dikesan, amalan bonus segera dikawal — menunjukkan keupayaan kawalan memang wujud.",
        jaga: "Peruntukan ialah wang disediakan, bukan jumlah diterima setiap pekerja — taburan sebenar ikut prestasi (KPI).",
        p: [137, 139]
      },
      chart: L.bars({
        data: R.bonusStaff.tahun.map(function (t, i) {
          return { label: String(t), v: R.bonusStaff.peruntukan[i], color: (t >= 2014 && t <= 2017 ? "var(--gold)" : "var(--pri)"), vl: t === 2014 ? "RM74 juta · 13 bulan" : undefined };
        }), h: 240
      })
    });
    v.appendChild(c28);

    var c29 = L.chartCard({
      q: "Bonus TH Properties 2017 & 2018: RM2.2 juta tanpa kelulusan pemegang saham",
      baca: "Dua senarai penerima bonus istimewa — dibayar walaupun tidak mendapat kelulusan LTH sebagai pemegang ekuiti utama.",
      type: "fakta", p: [142, 143],
      ins: {
        tunjuk: "2017: RM1,148,400 kepada 11 penerima (Pengerusi RM231,000). 2018: RM1,045,000 kepada 10 penerima. Kelulusan dibuat Exco TH Properties dan Lembaga THP Australia — bukan Lembaga atau pemegang saham.",
        penting: "Pandangan undang-undang Tetuan Tajuddin & Co: bonus 2017 melanggar s.230(2) & s.230(4), bonus 2018 melanggar s.230(3) Akta Syarikat 2016. Keputusan memulihkan bonus dibuat 12 Ogos 2020.",
        rumusan: "RCI mencadangkan usaha mendapatkan semula bonus yang diberi tanpa mematuhi peraturan.",
        jaga: "Keputusan memulihkan bonus wujud, tetapi laporan tidak mengesahkan sama ada wang sudah dikembalikan.",
        p: [143, 144, 190]
      },
      chart: (function () {
        var wrap = L.h("div");
        var tabs = [
          { judul: "Bonus 2017 — RM1,148,400", data: R.bonusTHP.thp2017 },
          { judul: "Bonus 2018 — RM1,045,000", data: R.bonusTHP.thp2018 }
        ];
        var pills = L.h("div", { cls: "pill-nav" });
        var tblBox = L.h("div");
        function renderTab(t) {
          tblBox.innerHTML = "";
          var rows = [["Penerima", "Jumlah"]];
          t.data.penerima.forEach(function (r) { rows.push([r[0], L.rm0(r[1])]); });
          rows.push(["Jumlah", L.rm0(t.data.jumlah)]);
          tblBox.appendChild(tbl(rows, true, 0));
          tblBox.appendChild(L.h("div", { cls: "ins-src", html: L.srcLink(t.data.p) }));
        }
        tabs.forEach(function (t, i) {
          var b = L.h("button", { type: "button", cls: "pill" + (i === 0 ? " on" : "") }, t.judul);
          b.addEventListener("click", function () {
            L.queryAll(pills, "button").forEach(function (x) { x.classList.remove("on"); });
            b.classList.add("on");
            renderTab(t);
          });
          pills.appendChild(b);
        });
        wrap.appendChild(pills);
        wrap.appendChild(tblBox);
        renderTab(tabs[0]);
        return wrap;
      })()
    });
    v.appendChild(c29);
    return v;
  }

  /* ============================================================
     PANDANGAN 7 — INTEGRITI & CADANGAN
  ============================================================ */
  function viewIntegriti() {
    var v = L.h("div");
    var l = L.h("div", { cls: "lead" });
    l.innerHTML = "<b>Persoalan panduan:</b> Selepas krisis dikesan (2018), LTH membuat laporan polis, rujukan SPRM dan tindakan tatatertib. Setakat laporan ditulis (2022), hampir semua siasatan masih berjalan. Apakah yang berlaku kepada setiap aduan — dan apa cadangan RCI untuk memastikan ia tidak berulang?";
    v.appendChild(l);

    v.appendChild(section("7.1", "Laporan polis", ""));
    var c30 = L.chartCard({
      q: "4 laporan polis yang dibuat LTH / bekas pegawai",
      baca: "Status setakat laporan ditulis (2022).",
      type: "fakta", p: 194,
      chart: tbl([
        ["Rujukan & tarikh", "Aduan", "Status"],
        ["Dang Wangi/31347/2018 · 30 Nov 2018", "Penggunaan dana Yayasan Tabung Haji melanggar M&A", "Selesai; dirujuk ke Jabatan Peguam Negara"],
        ["Dang Wangi/31331/2018 · 30 Nov 2018", "Penjualan THIP (95% ekuiti) kepada PT Borneo Pacific — salah nyata & penyembunyian", "Dalam siasatan PDRM (rentas sempadan)"],
        ["Dang Wangi/32724/2018 · 13 Dis 2018", "Manipulasi laporan kesesuaian tanah Trurich (40,880 ha, ~USD58 juta)", "Dalam siasatan; menunggu kebenaran Indonesia"],
        ["Dang Wangi/1484/2019 · 16 Jan 2019", "Pengisytiharan hibah FY2017 melanggar s.22 Akta 535; kertas mesyuarat mengelirukan", "Selesai; dirujuk ke Jabatan Peguam Negara"]
      ], true)
    });
    v.appendChild(c30);

    v.appendChild(section("7.2", "Rujukan kepada SPRM (Suruhanjaya Pencegahan Rasuah)", ""));
    var c31 = L.chartCard({
      q: "6 aduan kepada SPRM — kesemuanya masih dalam siasatan",
      baca: "Setakat laporan ditulis, semua aduan SPRM masih dalam siasatan.",
      type: "fakta", p: 201,
      chart: (function () {
        var ul = L.h("ul", { cls: "tl" });
        R.sprm.forEach(function (s, i) {
          var li = L.h("li", { cls: "t-warn" });
          li.appendChild(L.h("span", { cls: "tl-t" }, (i + 1) + ". "));
          li.appendChild(document.createTextNode(s.isi + " — " + s.status));
          ul.appendChild(li);
        });
        return ul;
      })()
    });
    v.appendChild(c31);

    v.appendChild(section("7.3", "Tindakan tatatertib — 5 pegawai, 4 kluster isu", ""));
    var c32 = L.chartCard({
      q: "Hasil tindakan tatatertib: buang kerja di peringkat pertama, tetapi diringankan pada rayuan",
      baca: "Empat kluster isu yang didakwa. Perhatian: keputusan awal (buang kerja) diubah kepada turun pangkat pada rayuan dalam 2 daripada 3 kes yang dibuang kerja.",
      type: "fakta", p: [198, 199],
      ins: {
        tunjuk: "Pegawai terlibat: CFO (Rozaida), COO (Adi Azuan), 2 PBS kanan (Rifina, Mohd Hisham), Penasihat Undang-Undang (Hazlina).",
        penting: "Kesemua 5 masih bekerja — dalam jawatan lain. RCI menegur kelambatan proses (sehingga 19 bulan) dan mencadangkan ia diperkemas.",
        rumusan: "Keputusan awal yang tegas diringankan pada rayuan — RCI tidak menilai merit, tetapi menegur proses.",
        jaga: "Dashboard ini hanya meringkaskan keputusan; butiran penuh pertuduhan dan bukti ada dalam laporan (m.s. 197–200).",
        p: [198, 199, 200]
      },
      chart: (function () {
        var box = L.h("div", { cls: "hbars" });
        box.innerHTML = R.disiplin.kluster.map(function (k, i) {
          return '<div class="hbar"><div class="hb-label">' + (i + 1) + ". " + k.tajuk + '</div><div class="hb-track"><div class="hb-fill" style="width:100%;background:var(--warn)"></div></div>' +
            '<div class="hb-label" style="font-weight:400;font-size:12.5px;color:var(--ink2)">' + k.butiran + "</div></div>";
        }).join("");
        return box;
      })()
    });
    v.appendChild(c32);

    v.appendChild(section("7.4", "Mahkamah & timbang tara", ""));
    var c33 = L.chartCard({
      q: "Pertikaian utama yang masih berjalan",
      baca: "Status setakat laporan (2022).",
      type: "fakta", p: 202,
      chart: tbl([
        ["Kes", "Isu", "Status"],
        ["THIP vs PT Borneo Pacific", "Penjualan ladang Indonesia", "Siasatan PDRM"],
        ["Al-Rawda (4 hotel)", "Tunggakan sewa SR560.7 juta", "Timbang tara; likuidasi aset"],
        ["Emrail", "Baki put RM18.3 juta", "Timbang tara AIAC (Apr 2022)"],
        ["Wellspring", "Perintah bayar RM20.8 juta", "Notis kebankrapan dibenarkan"]
      ], true)
    });
    v.appendChild(c33);

    v.appendChild(section("7.5", "25 cadangan RCI — penawar untuk masalah", ""));
    var c34 = L.h("div", { cls: "card" });
    c34.innerHTML = "<p style='margin:0 0 10px;font-size:13.5px;color:var(--ink2)'>Gunakan butang untuk menapis mengikut tema. Setiap cadangan boleh dijejak ke muka surat laporan.</p>";
    var pills = L.h("div", { cls: "pill-nav" });
    var recList = L.h("div", { cls: "hbars" });
    ["Semua"].concat(R.cadanganTema).forEach(function (tema) {
      var b = L.h("button", { type: "button", cls: "pill" + (tema === "Semua" ? " on" : "") }, tema);
      b.addEventListener("click", function () {
        L.queryAll(pills, "button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        renderRecs(tema);
      });
      pills.appendChild(b);
    });
    function renderRecs(tema) {
      recList.innerHTML = "";
      var data = R.cadangan.filter(function (r) { return tema === "Semua" || r.tema === tema; });
      data.forEach(function (r) {
        var item = L.h("div", { cls: "hbar" });
        item.appendChild(L.h("div", { cls: "hb-label" }, "C" + r.no + " · " + r.tema));
        item.appendChild(L.h("div", { cls: "hb-track" }, L.h("div", { cls: "hb-fill", style: "width:100%;background:var(--pri)" })));
        item.appendChild(L.h("div", { cls: "hb-val", html: L.srcLink(r.p) }));
        var desc = L.h("div", { cls: "hb-label", style: "font-weight:400;font-size:12.5px;color:var(--ink2)" }, r.ringkas);
        item.appendChild(desc);
        recList.appendChild(item);
      });
    }
    c34.appendChild(pills);
    c34.appendChild(recList);
    renderRecs("Semua");
    v.appendChild(c34);

    v.appendChild(section("7.6", "Penutup — kedudukan LTH hari ini", ""));
    var c35 = L.h("div", { cls: "card" });
    c35.innerHTML =
      "<p style='margin:0 0 8px'><b>Struktur LTH dikekalkan.</b> RCI memutuskan LTH tidak perlu dirombak — sebaliknya diperbaiki. Deposit kini RM88 bilion (8.6 juta pendeposit, m.s. 229), hibah telah kembali ke paras 3.10%, dan institusi dilihat kembali mendapat kepercayaan pendeposit.</p>" +
      "<p style='margin:0'><b>Risiko yang belum selesai:</b> kebergantungan kepada sukuk UJSB (26% pendapatan), beban HAFIS yang membesar (unjuran RM742 juta pada 2030), dan jaminan Kerajaan RM88 bilion yang menjadi 'tanda tanya' terakhir jika LTH gagal (m.s. 32, 235).</p>";
    v.appendChild(c35);

    v.appendChild(quote(R.petikan[3].teks, R.petikan[3].sumber, R.petikan[3].p));

    v.appendChild(section("7.7", "Jejak sumber & semakan", ""));
    var m = L.h("div", { cls: "card methodo" });
    m.innerHTML =
      "Dashboard ini dibina daripada satu sumber utama: <b>Laporan RCI Tabung Haji</b> (30 Ogos 2022).<br><br>" +
      "<b>Untuk pengesahan lanjut:</b> buka pautan <i>'Sumber: laporan, m.s. N'</i> pada setiap carta — ia membuka halaman asal dalam versi OCR laporan di GitHub.<br><br>" +
      "Angka yang disemak silang dengan jadual asal: kadar hibah (m.s. 120), jumlah hibah (m.s. 130), analisa aset/liabiliti PwC (m.s. 147), polisi rosot nilai (m.s. 148), bonus kakitangan (m.s. 137), pemindahan aset UJSB (m.s. 159), hartanah (m.s. 161), saham mewah (m.s. 161), HAFIS (m.s. 204–205).<br><br>" +
      "Sebarang percanggahan dengan teks asal hendaklah merujuk laporan — versi OCR mungkin mempunyai kesilapan huruf/angka yang kecil.";
    v.appendChild(m);
    return v;
  }

  /* ---------- jadual pembantu ---------- */
  function tbl(rows, mono, firstCol) {
    var t = L.h("div", { cls: "tbl-wrap" });
    var table = L.h("table", { cls: "tbl" });
    var thead = L.h("thead"), htr = L.h("tr");
    rows[0].forEach(function (c) { htr.appendChild(L.h("th", null, c)); });
    thead.appendChild(htr);
    table.appendChild(thead);
    var tbody = L.h("tbody");
    for (var i = 1; i < rows.length; i++) {
      var tr = L.h("tr");
      rows[i].forEach(function (c, ci) {
        var cls = "";
        if (mono && ci > (firstCol == null ? 0 : firstCol)) cls = "num";
        if (String(c).indexOf("+") === 0) cls = "good";
        if (String(c).indexOf("−") === 0 || String(c).indexOf("-") === 0) cls = "bad";
        if (String(c).indexOf("Dalam siasatan") >= 0 || String(c).indexOf("Selesai") >= 0) cls = "warn";
        var td = L.h("td", cls ? { cls: cls } : null);
        td.textContent = c;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    t.appendChild(table);
    return t;
  }

  window.RCIV = {
    gambaran: viewGambaran,
    krisis: viewKrisis,
    pelaburan: viewPelaburan,
    penyelamatan: viewUjsb,
    haji: viewHaji,
    tadbir: viewTadbir,
    integriti: viewIntegriti
  };
})();
