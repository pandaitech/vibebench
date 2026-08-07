/* =====================================================================
   VIEWS — setiap modul ialah satu ruang analisis, bukan sekadar carta.
   ===================================================================== */
(function () {
  "use strict";
  var D = window.RCI, L = window.L, el = L.el;
  var V = {};

  /* ================= util tempatan ================= */
  function juta(v, dp) { return L.rmJuta(v, dp); }
  function modal(tajuk, isi) {
    var latar = el("div", { class: "modal-latar", onclick: function (e) { if (e.target === latar) latar.remove(); } });
    var box = el("div", { class: "modal" }, [
      el("div", { class: "modal-head" }, [
        el("h3", { text: tajuk }),
        el("button", { class: "modal-tutup", type: "button", text: "✕", onclick: function () { latar.remove(); } })
      ]),
      el("div", { class: "modal-body" }, isi)
    ]);
    latar.appendChild(box);
    document.body.appendChild(latar);
    document.addEventListener("keydown", function esc(e) { if (e.key === "Escape") { latar.remove(); document.removeEventListener("keydown", esc); } });
  }
  V.modal = modal;

  function head(tajuk, teks) {
    return el("div", { class: "modul-head" }, [el("h2", { text: tajuk }), el("p", { html: teks })]);
  }

  /* =====================================================================
     MODUL 1 — PETA ISU
     ===================================================================== */
  V.peta = function () {
    var w = el("div");
    w.appendChild(head("Peta isu: kenapa Tabung Haji hampir karam?",
      "Mula di sini. Laporan RCI ialah 240 muka surat; halaman ini memampatkannya kepada satu rantaian sebab-akibat. Ketik mana-mana kotak untuk baca butiran, dan rantaian yang berkaitan akan diserlahkan."));

    /* Angka besar */
    var kad0 = L.kad({
      tajuk: "Lima nombor yang menerangkan keseluruhan cerita",
      sub: "Semua angka ini datang terus daripada laporan. Ketik cip <em>m/s</em> untuk buka muka surat asalnya.",
      kelas: "F"
    });
    kad0.body.appendChild(el("div", { class: "stats" }, [
      L.stat("RM3.4b → −RM1.4b", "Untung 2017 yang dilapor, lawan kerugian sebenar", "Kalau piawaian perakaunan MFRS dipatuhi sepenuhnya. " + L.sumber(111).outerHTML, "var(--merah)"),
      L.stat("RM10.2b", "Premium bayaran atas nilai pasaran", "Aset bernilai pasaran RM9.7 bilion dipindah ke UJSB pada RM19.9 bilion. " + L.sumber(122).outerHTML, "var(--oren)"),
      L.stat("RM27.5b", "Obligasi Sukuk yang perlu ditebus", "Matang 2026 (RM13.2b) dan 2029 (RM14.3b). " + L.sumber(125).outerHTML, "var(--merah)"),
      L.stat("RM88b", "Nilai jaminan Kerajaan hari ini", "Liabiliti pendeposit setakat 21 Mei 2022. " + L.sumber(134).outerHTML),
      L.stat("14", "Pelaburan disyorkan audit forensik", "Daripada FGV hingga hotel di Makkah. " + L.sumber(195).outerHTML, "var(--ungu)")
    ]));
    kad0.body.appendChild(L.amaranTafsir(
      "Angka <strong>−RM1.4 bilion</strong> bukan bermakna TH kehilangan RM1.4 bilion tunai pada 2017. Ia bermakna: <em>jika</em> semua rosot nilai yang sepatutnya diakui telah diakui, akaun 2017 akan menunjukkan kerugian dan bukan keuntungan. Wang deposit pendeposit tidak hilang — ia dijamin Kerajaan di bawah seksyen 24."
    ));
    w.appendChild(kad0);

    /* Rantaian punca */
    var pilih = null;
    var kad1 = L.kad({
      tajuk: "Rantaian sebab → akibat",
      sub: "Kiri ialah punca asal. Tengah ialah apa yang berlaku akibatnya. Kanan ialah kesan akhir yang kita tanggung hari ini.",
      kelas: "F", ms: 17,
      soalan: "Apa punca sebenar krisis — nasib malang pasaran, atau keputusan yang boleh dielak?"
    });
    var rantaiBekas = el("div");
    kad1.body.appendChild(rantaiBekas);

    function berkaitan(id) {
      var set = {}; set[id] = 1;
      D.rantaiPunca.hubungan.forEach(function (h) {
        if (h[0] === id) set[h[1]] = 1;
        if (h[1] === id) set[h[0]] = 1;
      });
      return set;
    }
    function lukisRantai() {
      L.clear(rantaiBekas);
      var kump = { punca: [], kesan: [], akibat: [] };
      D.rantaiPunca.nod.forEach(function (n) { kump[n.jenis].push(n); });
      var tajuk = { punca: "1 · Punca asal", kesan: "2 · Apa yang berlaku", akibat: "3 · Kesan hari ini" };
      var kait = pilih ? berkaitan(pilih) : null;
      var grid = el("div", { class: "rantai" });
      ["punca", "kesan", "akibat"].forEach(function (j) {
        var lajur = el("div", {}, [el("div", { class: "rantai-lajur-tajuk", text: tajuk[j] })]);
        kump[j].forEach(function (n) {
          var kelas = "nod nod-" + j + (pilih === n.id ? " pilih" : "") + (kait && !kait[n.id] ? " pudar" : "");
          lajur.appendChild(el("button", {
            class: kelas, type: "button",
            onclick: function () { pilih = (pilih === n.id ? null : n.id); lukisRantai(); }
          }, [
            el("div", { class: "nod-label", text: n.label }),
            el("div", { class: "nod-teks" }, [
              el("span", { text: n.teks }), el("br"), L.sumber(n.ms)
            ])
          ]));
        });
        grid.appendChild(lajur);
      });
      rantaiBekas.appendChild(grid);
      rantaiBekas.appendChild(el("p", { class: "nota-kecil", text: pilih ? "Kotak yang pudar tiada hubungan langsung dengan pilihan anda. Ketik semula untuk reset." : "Ketik satu kotak untuk lihat butiran dan hubungannya." }));
    }
    lukisRantai();
    w.appendChild(kad1);

    /* Kronologi */
    var kadK = L.kad({
      tajuk: "Garis masa penuh",
      sub: "Tapis mengikut jenis peristiwa. Perhatikan berapa kali amaran diberi sebelum krisis meletus.",
      kelas: "F"
    });
    var tapisAktif = {};
    Object.keys(D.kronoKategori).forEach(function (k) { tapisAktif[k] = true; });
    var kBaris = el("div", { class: "krono" });
    var kTapis = el("div", { class: "kawalan-baris" });
    Object.keys(D.kronoKategori).forEach(function (k) {
      var m = D.kronoKategori[k];
      var b = el("button", {
        class: "btn btn-kecil", type: "button", "data-k": k,
        style: "border-color:" + m.warna + ";color:" + m.warna,
        onclick: function () {
          tapisAktif[k] = !tapisAktif[k];
          b.style.opacity = tapisAktif[k] ? "1" : "0.35";
          lukisKrono();
        }
      }, m.label);
      kTapis.appendChild(b);
    });
    function lukisKrono() {
      L.clear(kBaris);
      var n = 0;
      D.kronologi.forEach(function (it) {
        if (!tapisAktif[it.g]) return;
        n++;
        var m = D.kronoKategori[it.g];
        kBaris.appendChild(el("div", { class: "krono-item" }, [
          el("span", { class: "krono-dot", style: "background:" + m.warna }),
          el("div", { class: "krono-t", text: it.t + " · " + m.label }),
          el("div", { class: "krono-tajuk", text: it.tajuk }),
          el("div", { class: "krono-teks", text: it.teks }),
          el("div", { class: "krono-kaki" }, [L.sumber(it.ms)])
        ]));
      });
      if (!n) kBaris.appendChild(el("p", { class: "nota-kecil", text: "Tiada peristiwa dipaparkan — pilih sekurang-kurangnya satu kategori." }));
    }
    lukisKrono();
    kadK.body.appendChild(kTapis);
    kadK.body.appendChild(el("div", { style: "height:12px" }));
    kadK.body.appendChild(kBaris);
    w.appendChild(kadK);

    return w;
  };

  /* =====================================================================
     MODUL 2 — JURANG ASET vs LIABILITI
     ===================================================================== */
  V.jurang = function () {
    var w = el("div");
    w.appendChild(head("Duit masuk lawan duit keluar (2013–2017)",
      "Undang-undang cuma benarkan Tabung Haji bayar " + L.istilah("hibah").outerHTML + " apabila asetnya <em>tidak kurang</em> daripada liabilitinya. Modul ini menunjukkan bila syarat itu mula gagal dipenuhi — dan berapa banyak hibah tetap dibayar selepas itu."));

    var K = D.kewangan;
    var tahun = K.baris.map(function (b) { return String(b.tahun); });

    /* --- Carta utama, boleh tukar perspektif --- */
    var mod = "jurang";
    var kad = L.kad({
      tajuk: "Kedudukan kewangan sebenar mengikut laporan PwC",
      sub: "Angka dalam RM juta. Tukar perspektif untuk melihat data yang sama daripada sudut berbeza.",
      kelas: "F", ms: K.ms,
      soalan: "Bilakah aset Tabung Haji mula tidak cukup untuk menampung liabilitinya?"
    });
    var kawalan = L.segmen([
      { id: "jurang", label: "Jurang sebelum & selepas hibah", tip: "Lebihan/kekurangan aset" },
      { id: "neraca", label: "Aset lawan liabiliti", tip: "Saiz mutlak" },
      { id: "agih", label: "Hibah dibayar", tip: "Berapa banyak keluar setiap tahun" }
    ], mod, function (id) { mod = id; lukis(); }, { kelas: "segmen-penuh" });
    var bekas = el("div");
    kad.body.appendChild(kawalan);
    kad.body.appendChild(el("div", { style: "height:12px" }));
    kad.body.appendChild(bekas);

    function lukis() {
      L.clear(bekas);
      kawalan.querySelectorAll(".segmen-btn").forEach(function (b) {
        b.classList.toggle("aktif", b.getAttribute("data-id") === mod);
      });
      var carta, baca;
      if (mod === "jurang") {
        carta = L.cartaKombo({
          labels: tahun,
          siri: [
            { nama: "Lebihan/(kekurangan) SEBELUM hibah", warna: "#4f8ef7", data: K.baris.map(function (b) { return b.praAgih; }) },
            { nama: "Lebihan/(kekurangan) SELEPAS hibah", warna: "#d9534f", data: K.baris.map(function (b) { return b.pascaAgih; }) }
          ],
          fmtKiri: function (v) { return L.num(v / 1000, 1) + "b"; },
          fmtTip: function (v) { return juta(v); },
          tinggi: 330
        });
        baca = "Bar <strong>biru</strong> ialah kedudukan sebelum hibah dibayar; <strong>merah</strong> selepas dibayar. Apa-apa bar di bawah garisan sifar bermakna aset TH lebih kecil daripada liabilitinya — iaitu syarat " + L.istilah("seksyen 22(3)(a)", "seksyen 22(3)(a)").outerHTML + " tidak dipenuhi. Bar merah berada di bawah sifar setiap tahun dari 2014.";
      } else if (mod === "neraca") {
        carta = L.cartaKombo({
          labels: tahun,
          siri: [
            { nama: "Jumlah aset", warna: "#2f9e8f", data: K.baris.map(function (b) { return b.aset; }) },
            { nama: "Jumlah liabiliti (termasuk deposit)", warna: "#8593a8", data: K.baris.map(function (b) { return -b.liabiliti; }) }
          ],
          fmtKiri: function (v) { return L.num(v / 1000, 0) + "b"; },
          fmtTip: function (v) { return juta(v); },
          tinggi: 330
        });
        baca = "Kedua-dua bar naik setiap tahun kerana deposit terus masuk. Yang penting bukan saiznya, tetapi <strong>bar mana yang lebih tinggi</strong>. Mulai 2016 bar kelabu (liabiliti) melepasi bar hijau (aset).";
      } else {
        carta = L.cartaKombo({
          labels: tahun,
          siri: [
            { nama: "Hibah dibayar (RM juta)", warna: "#e8912d", data: K.baris.map(function (b) { return -b.agih; }) },
            { nama: "Lebihan sebenar sebelum hibah (RM juta)", warna: "#4f8ef7", jenis: "garis", data: K.baris.map(function (b) { return b.praAgih; }) }
          ],
          fmtKiri: function (v) { return L.num(v / 1000, 1) + "b"; },
          fmtTip: function (v) { return juta(v); },
          tinggi: 330
        });
        baca = "Bar oren ialah hibah yang benar-benar dibayar. Garisan biru ialah lebihan yang sebenarnya ada untuk diagihkan. Mulai 2015 garisan biru jatuh jauh di bawah bar oren — bermakna sebahagian hibah datang bukan daripada keuntungan, tetapi daripada <strong>deposit pendeposit sendiri</strong>.";
      }
      bekas.appendChild(carta);
      bekas.appendChild(L.bacaan(baca));
    }
    lukis();

    /* jadual penuh */
    var brs = K.baris.map(function (b) {
      return {
        sel: [
          { t: String(b.tahun) },
          { t: L.num(b.aset), kanan: true },
          { t: L.num(b.liabiliti), kanan: true },
          { t: L.num(b.praAgih), kanan: true, kelas: b.praAgih < 0 ? "neg" : "pos" },
          { t: L.num(b.agih), kanan: true },
          { t: L.num(b.pascaAgih), kanan: true, kelas: b.pascaAgih < 0 ? "neg" : "pos" }
        ]
      };
    });
    kad.body.appendChild(el("div", { style: "height:14px" }));
    kad.body.appendChild(L.jadual(
      ["Tahun", { t: "Aset", kanan: 1 }, { t: "Liabiliti", kanan: 1 }, { t: "Lebihan sebelum hibah", kanan: 1 }, { t: "Hibah dibayar", kanan: 1 }, { t: "Lebihan selepas hibah", kanan: 1 }],
      brs
    ));
    kad.body.appendChild(el("p", { class: "nota-kecil", html: "Semua angka RM juta. Tanda kurungan/negatif bermakna kekurangan. Sumber: jadual PwC dalam laporan, " + L.sumber(109).outerHTML + " dan " + L.sumber(74).outerHTML + "." }));
    w.appendChild(kad);

    /* --- Simulasi --- */
    var simKadar = 100; // peratus daripada hibah sebenar
    var kadSim = L.kad({
      tajuk: "Uji andaian anda: bagaimana kalau hibah dibayar lebih rendah?",
      sub: "Tarik gelangsar untuk kurangkan jumlah hibah yang dibayar 2014–2017, dan lihat kesannya kepada kedudukan aset.",
      kelas: "S",
      soalan: "Sebanyak mana hibah perlu dikurangkan supaya TH tidak jatuh ke dalam defisit?"
    });
    var simBekas = el("div");
    kadSim.body.appendChild(L.slider({
      label: "Hibah dibayar, sebagai peratus daripada jumlah sebenar", min: 0, max: 120, step: 5, nilai: 100,
      fmt: function (v) { return v + "%"; },
      onubah: function (v) { simKadar = v; lukisSim(); },
      nota: "100% = jumlah yang benar-benar dibayar. Gelangsar ini <strong>tidak</strong> mengubah pendapatan atau nilai aset — ia hanya menukar berapa banyak diagihkan keluar."
    }));
    kadSim.body.appendChild(simBekas);
    function lukisSim() {
      L.clear(simBekas);
      var f = simKadar / 100;
      var data = K.baris.map(function (b) { return b.praAgih + b.agih * f; });
      var asal = K.baris.map(function (b) { return b.pascaAgih; });
      simBekas.appendChild(L.cartaKombo({
        labels: tahun,
        siri: [
          { nama: "Kedudukan sebenar (100%)", warna: "#94a3b8", data: asal, lut: 0.55 },
          { nama: "Kedudukan simulasi (" + simKadar + "%)", warna: "#2f9e8f", data: data }
        ],
        fmtKiri: function (v) { return L.num(v / 1000, 1) + "b"; },
        fmtTip: function (v) { return juta(v); },
        tinggi: 300
      }));
      var negatif = data.filter(function (v) { return v < 0; }).length;
      var jimat = K.baris.reduce(function (a, b) { return a + (-b.agih) * (1 - f); }, 0);
      simBekas.appendChild(el("div", { class: "stats", style: "margin-top:12px" }, [
        L.stat(negatif + " daripada 5", "Tahun yang masih defisit", "Pada tetapan semasa gelangsar.", negatif > 0 ? "var(--merah)" : "var(--aksen)"),
        L.stat(juta(jimat), "Jumlah tidak diagihkan", "Berbanding hibah sebenar 2013–2017."),
        L.stat(L.num(data[4] / 1000, 2) + "b", "Kedudukan akhir 2017", "RM bilion.", data[4] < 0 ? "var(--merah)" : "var(--aksen)")
      ]));
      simBekas.appendChild(L.amaranTafsir(
        "Ini <strong>bukan</strong> angka laporan. Simulasi ini mengandaikan pendapatan, nilai aset dan tingkah laku pendeposit kekal sama walaupun hibah dikurangkan — andaian yang tidak realistik. Laporan sendiri menunjukkan sebaliknya: apabila hibah dipotong ke 1.25% pada 2018, deposit mengecut daripada ~RM73 bilion ke RM69 bilion (" + L.sumber(84).outerHTML + "). Gunakan simulasi ini untuk memahami <em>saiz</em> jurang, bukan untuk meramal apa yang akan berlaku."
      ));
    }
    lukisSim();
    w.appendChild(kadSim);

    /* Kenyataan penting */
    var kadN = L.kad({ tajuk: "Apa yang Suruhanjaya simpulkan", kelas: "F", ms: 80 });
    kadN.body.appendChild(el("ul", { class: "senarai" }, [
      el("li", { html: "<strong>Pendekatan LTH 2014–2017 tidak mematuhi kawalan statutori</strong> di bawah Akta 535 yang bertujuan memastikan pendeposit dibayar hibah daripada keuntungan sebenar, bukan daripada deposit mereka sendiri. " + L.sumber(80).outerHTML }),
      el("li", { html: "Bagi 2016 dan 2017, <strong>aset kurang daripada liabiliti</strong> sebelum hibah pun diagihkan. Bagi 2014 dan 2015, agihan sebenar <strong>melebihi keuntungan sebenar</strong>. " + L.sumber(87).outerHTML }),
      el("li", { html: "Kumpulan Wang Pendeposit telah <strong>disalah kelaskan sebagai ekuiti</strong> (bukan liabiliti) dalam penyata kewangan sejak 2010 — satu representasi salah yang membolehkan aset kelihatan melebihi liabiliti. " + L.sumber(94).outerHTML }),
      el("li", { html: "Perbendaharaan <strong>tidak pernah</strong> meluluskan sebarang baki minima Kumpulan Wang Rizab, walaupun wakilnya duduk dalam Lembaga. " + L.sumber(66).outerHTML })
    ]));
    w.appendChild(kadN);

    return w;
  };

  /* =====================================================================
     MODUL 3 — HIBAH
     ===================================================================== */
  V.hibah = function () {
    var w = el("div");
    w.appendChild(head("Hibah: janji tinggi yang tidak mampu ditanggung",
      "Kadar hibah ialah keputusan yang paling dilihat orang ramai — dan paling banyak tekanan politik. Modul ini membandingkan apa yang dijanjikan dengan apa yang mampu dibayar."));

    var H = D.hibah.baris;
    var tahun = H.map(function (b) { return String(b.tahun); });

    var kad1 = L.kad({
      tajuk: "Kadar hibah 2014–2021",
      sub: "Hibah tahunan (semua pendeposit) dan hibah haji (untuk bakal jemaah). Perhatikan jatuhan mendadak pada 2018.",
      kelas: "F", ms: 82,
      soalan: "Berapa besar jurang antara kadar zaman sebelum krisis dan kadar selepas pemulihan?"
    });
    kad1.body.appendChild(L.cartaKombo({
      labels: tahun,
      siri: [
        { nama: "Hibah tahunan (%)", warna: "#2f9e8f", data: H.map(function (b) { return b.kadar; }) },
        { nama: "Hibah haji (%)", warna: "#8b5cf6", data: H.map(function (b) { return b.kadarHaji; }) }
      ],
      fmtKiri: function (v) { return L.num(v, 1) + "%"; },
      fmtTip: function (v) { return L.num(v, 2) + "%"; },
      tinggi: 300
    }));
    kad1.body.appendChild(L.bacaan(
      "Sebelum 2018, pendeposit menerima <strong>dua</strong> bayaran: hibah tahunan dan hibah haji. Jumlahnya mencecah 8.25% pada 2014. Selepas penstrukturan, hibah haji dihentikan terus dan hibah tahunan diturunkan. Dasar baharu selepas 2018 ialah membayar <strong>50 hingga 100 mata asas</strong> (0.5%–1.0%) di atas purata deposit bank Islam — dasar yang laporan kira lebih munasabah bagi ciri deposit TH. " + L.sumber(84).outerHTML
    ));
    kad1.body.appendChild(L.amaranTafsir(
      "Kadar hibah <strong>tidak boleh</strong> dibandingkan terus dengan kadar deposit bank biasa. Deposit TH mempunyai empat ciri berbeza: pengeluaran dijamin Kerajaan, pelaburan patuh syariah sahaja, zakat sudah dibayar oleh TH, dan sebahagian keuntungan digunakan untuk subsidi kos haji. " + L.sumber(82).outerHTML
    ));
    w.appendChild(kad1);

    /* Jumlah agihan */
    var kad2 = L.kad({
      tajuk: "Berapa banyak wang sebenarnya keluar",
      sub: "Kadar peratus mudah dilupa; jumlah ringgit lebih jujur.",
      kelas: "F", ms: 92
    });
    var adaJum = H.filter(function (b) { return b.jumlah !== null; });
    kad2.body.appendChild(L.cartaKombo({
      labels: adaJum.map(function (b) { return String(b.tahun); }),
      siri: [
        { nama: "Hibah tahunan (RM juta)", warna: "#2f9e8f", data: adaJum.map(function (b) { return b.jumTahunan / 1000; }) },
        { nama: "Hibah haji (RM juta)", warna: "#8b5cf6", data: adaJum.map(function (b) { return b.jumHaji / 1000; }) }
      ],
      fmtKiri: function (v) { return L.num(v / 1000, 1) + "b"; },
      fmtTip: function (v) { return juta(v); },
      tinggi: 290
    }));
    var jum4 = adaJum.slice(0, 4).reduce(function (a, b) { return a + b.jumlah; }, 0) / 1000;
    kad2.body.appendChild(el("div", { class: "stats", style: "margin-top:12px" }, [
      L.stat(juta(jum4), "Jumlah hibah 2014–2017", "Empat tahun ketika aset sudah tidak menampung liabiliti."),
      L.stat(juta(adaJum[4].jumlah / 1000), "Hibah 2018", "Selepas polisi dipinda — jatuh 72% berbanding 2017.", "var(--biru)"),
      L.stat("RM37.52 bilion", "Jumlah hibah 1966–2021", "Termasuk hibah haji. " + L.sumber(191).outerHTML)
    ]));
    w.appendChild(kad2);

    /* Kemampuan 2017 */
    var M = D.hibah2017Kemampuan;
    var kad3 = L.kad({
      tajuk: "Kes 2017: yang mampu lawan yang dibayar",
      sub: "Kenyataan Timbalan Pengarah Audit Kewangan JAN dalam Akuan Berkanun Saksi.",
      kelas: "F", ms: M.ms,
      soalan: "Berapa banyak hibah 2017 yang melebihi keupayaan kewangan TH?"
    });
    kad3.body.appendChild(L.barMendatar({
      baris: [
        { label: "Kemampuan sebenar TH (kaedah baki minima tahunan, kadar 4%)", nilai: M.mampuRM, warna: "#2f9e8f" },
        { label: "Yang benar-benar dibayar (kaedah baki minima bulanan)", nilai: M.dibayarRM, warna: "#d9534f", nota: "Lebihan RM0.61 bilion — 22.5% lebih daripada kemampuan." }
      ],
      fmt: function (v) { return "RM" + L.num(v, 2) + " bilion"; }
    }));
    kad3.body.appendChild(el("div", { class: "bacaan", style: "margin-top:12px" }, [
      el("div", { class: "bacaan-tajuk", text: "Bagaimana lebihan itu 'diwujudkan'" }),
      el("div", { class: "bacaan-isi", html: "Untuk membayar jumlah yang lebih tinggi, LTH <strong>menukar polisi rosot nilai kewangan sebanyak dua kali dalam tahun kewangan 2017</strong> — mengurangkan jumlah perbelanjaan supaya keuntungan nampak lebih besar. " + L.sumber(93).outerHTML })
    ]));
    kad3.body.appendChild(el("p", { class: "nota-kecil", text: M.nota }));
    w.appendChild(kad3);

    /* Reaksi pendeposit */
    var kadD = L.kad({
      tajuk: "Apa yang berlaku apabila hibah dipotong",
      sub: "Reaksi sebenar pendeposit — ujian keras terhadap ketakutan 'bank run'.",
      kelas: "F", ms: 84
    });
    kadD.body.appendChild(L.cartaKombo({
      labels: D.deposit.siri.map(function (x) { return x.label; }),
      siri: [{ nama: "Saiz deposit (RM bilion)", warna: "#4f8ef7", jenis: "garis", data: D.deposit.siri.map(function (x) { return x.nilai; }) }],
      fmtKiri: function (v) { return L.num(v, 0) + "b"; },
      fmtTip: function (v) { return "RM" + v + " bilion"; },
      tinggi: 270, legenPaksa: true
    }));
    kadD.body.appendChild(L.bacaan(
      "Selepas hibah 1.25% diumumkan, deposit mengecut daripada ~RM73 bilion kepada RM69 bilion — kebanyakannya daripada pendeposit besar. Laporan menyebut <em>\"LTH bernasib baik kerana jumlah pengeluaran dan kesannya adalah lebih kecil daripada apa yang dikhuatiri\"</em>. Menjelang akhir 2020 deposit pulih ke ~RM76 bilion, dan RM88 bilion pada Mei 2022."
    ));
    kadD.body.appendChild(L.amaranTafsir(
      "Titik terakhir (RM100 bilion) ialah <strong>anggaran laporan</strong>, bukan angka sebenar. Paksi mendatar juga <strong>bukan skala masa yang sekata</strong> — jarak antara titik tidak sama panjang tempohnya."
    ));
    w.appendChild(kadD);

    /* Tumpuan deposit */
    var T = D.deposit.tumpuan;
    var kadT = L.kad({
      tajuk: "Siapa sebenarnya pendeposit Tabung Haji?",
      sub: "Dua angka yang mengubah cara kita fikir tentang siapa yang menanggung dan siapa yang menerima.",
      kelas: "F"
    });
    kadT.body.appendChild(el("div", { class: "stats" }, [
      L.stat("65%", "pendeposit ada RM2,000 atau kurang", "Majoriti besar pendeposit ialah penyimpan kecil. " + L.sumber(T.p65.ms).outerHTML),
      L.stat("75% / 5%", "deposit dimiliki hanya 5% pendeposit", "Tumpuan yang tinggi — inilah " + L.istilah("concentration risk").outerHTML + ". " + L.sumber(T.p75.ms).outerHTML, "var(--oren)"),
      L.stat("8.6 juta", "jumlah pendeposit (22 Julai 2022)", "Turun daripada 9.3 juta pada 2018. " + L.sumber(191).outerHTML)
    ]));
    kadT.body.appendChild(L.bacaan(
      "Kedua-dua angka ini menarik ke arah bertentangan. Pendeposit besar <strong>membahayakan</strong> TH (risiko pengeluaran serentak) tetapi juga <strong>membiayai</strong> subsidi haji untuk pendeposit kecil. Laporan mengakui ini secara terus: <em>\"perlu diakui bahawa kumpulan pendeposit ini membantu untuk menanggung beban subsidi\"</em>. " + L.sumber(72).outerHTML
    ));
    w.appendChild(kadT);

    return w;
  };

  /* =====================================================================
     MODUL 4 — ANGKA 2017
     ===================================================================== */
  V.angka2017 = function () {
    var w = el("div");
    w.appendChild(head("Angka 2017: tiga cara melihat tahun yang sama",
      "Tahun kewangan 2017 boleh dibaca sebagai untung RM3.4 bilion, sebagai lebihan nipis RM373 juta, atau sebagai kerugian RM1.4 bilion — bergantung pada peraturan mana yang digunakan. Ini bukan perbezaan pendapat kecil; ia menentukan sama ada hibah sah dibayar atau tidak."));

    /* Lensa */
    var aktif = "rav";
    var kad1 = L.kad({
      tajuk: "Tukar lensa perakaunan",
      sub: "Data asas sama. Yang berubah hanyalah peraturan penilaian yang digunakan.",
      kelas: "F", ms: 78,
      soalan: "Adakah TH benar-benar layak mengisytiharkan hibah bagi tahun 2017?"
    });
    var seg = L.segmen(D.lensa2017.lensa.map(function (x) { return { id: x.id, label: x.nama, tip: x.ringkas }; }), aktif,
      function (id) { aktif = id; lukisLensa(); }, { kelas: "segmen-penuh" });
    var lb = el("div");
    kad1.body.appendChild(seg);
    kad1.body.appendChild(el("div", { style: "height:12px" }));
    kad1.body.appendChild(lb);

    function lukisLensa() {
      L.clear(lb);
      seg.querySelectorAll(".segmen-btn").forEach(function (b) { b.classList.toggle("aktif", b.getAttribute("data-id") === aktif); });
      var Ln = D.lensa2017.lensa.filter(function (x) { return x.id === aktif; })[0];
      lb.appendChild(el("p", { class: "nota-kecil", style: "margin-top:0", html: "<strong>" + Ln.ringkas + "</strong> · " + L.sumber(Ln.ms).outerHTML }));
      var wf = Ln.baris.filter(function (b) { return !b.alt; }).map(function (b, i) {
        return {
          label: b.label, pendek: b.label.length > 44 ? b.label.slice(0, 42) + "…" : b.label,
          nilai: b.nilai, jenis: (b.subtotal || b.hasil || i === 0) ? "jumlah" : "delta"
        };
      });
      lb.appendChild(L.cartaAirTerjun({
        baris: wf, tinggi: 340,
        fmt: function (v) { return L.num(v / 1000, 1) + "b"; },
        fmtNilai: function (v) { return L.num(v); },
        warnaJumlah: Ln.warna
      }));
      var lst = el("div", {}, Ln.baris.map(function (b) {
        return el("div", { class: "kv" }, [
          el("span", { text: b.label + (b.alt ? " (anggaran alternatif)" : "") }),
          el("span", { class: b.nilai < 0 ? "neg" : "", text: L.num(b.nilai) })
        ]);
      }));
      lb.appendChild(lst);
      lb.appendChild(el("div", { class: "bacaan", style: "margin-top:12px" }, [
        el("div", { class: "bacaan-tajuk", text: "Kesimpulan lensa ini" }),
        el("div", { class: "bacaan-isi", text: Ln.kesimpulan })
      ]));
    }
    lukisLensa();
    kad1.body.appendChild(L.amaranTafsir(
      "Ketiga-tiga lensa menggunakan angka aset asas yang <strong>sama</strong> (RM70,317 juta). Yang berbeza ialah (a) sama ada anggaran pengurusan boleh ditambah, dan (b) sama ada rosot nilai perlu diakui. " + L.istilah("RAV").outerHTML + " bukan piawaian perakaunan — laporan menyatakan <em>\"dalam pasaran, tidak ada piawaian yang khusus bagi mengira RAV\"</em>. " + L.sumber(75).outerHTML
    ));
    w.appendChild(kad1);

    /* Ambang rosot nilai — interaktif */
    var R = D.rosotNilai;
    var pilihAmbang = 90;
    var kad2 = L.kad({
      tajuk: "Suis yang mengubah keuntungan: ambang rosot nilai",
      sub: "Ketik ambang untuk lihat berapa banyak kerugian yang perlu diakui pada tahun 2017.",
      kelas: "F", ms: R.ms,
      soalan: "Berapa besar kesan menukar satu nombor polisi dalaman?"
    });
    var segA = L.segmen(R.ambang.map(function (a) {
      return { id: String(a.peratus), label: "Jatuh >" + a.peratus + "%", tip: a.label };
    }), String(pilihAmbang), function (id) { pilihAmbang = parseInt(id, 10); lukisAmbang(); }, { kelas: "segmen-penuh" });
    var ab = el("div");
    kad2.body.appendChild(segA);
    kad2.body.appendChild(el("div", { style: "height:12px" }));
    kad2.body.appendChild(ab);
    function lukisAmbang() {
      L.clear(ab);
      segA.querySelectorAll(".segmen-btn").forEach(function (b) { b.classList.toggle("aktif", b.getAttribute("data-id") === String(pilihAmbang)); });
      var A = R.ambang.filter(function (x) { return x.peratus === pilihAmbang; })[0];
      ab.appendChild(el("div", { class: "stats" }, [
        L.stat(A.label, "Status polisi", "Syarat tempoh: " + A.tempoh),
        L.stat(juta(A.kesan), "Kerugian rosot nilai yang perlu diakui", "Kesan kepada penyata kewangan 2017.", A.kesan > 100 ? "var(--merah)" : "var(--aksen)"),
        L.stat(A.peratus === 90 ? "Inilah yang dipilih" : "Tidak dipilih", "Keputusan sebenar LTH", A.peratus === 90 ? "Hanya RM1.0 juta rosot nilai direkod." : "—", A.peratus === 90 ? "var(--merah)" : "var(--teks-samar)")
      ]));
      ab.appendChild(L.barMendatar({
        baris: R.ambang.map(function (x) {
          return { label: "Ambang >" + x.peratus + "% — " + x.label, nilai: x.kesan, warna: x.peratus === pilihAmbang ? "#d9534f" : "#94a3b8", sorot: x.peratus === pilihAmbang };
        }),
        fmt: function (v) { return juta(v); }
      }));
      ab.appendChild(L.bacaan(
        "<strong>" + R.contoh + "</strong> " + L.sumber(R.msContoh).outerHTML + "<br><br>Sebagai perbandingan, garis panduan MIA (FRSIC 14) menganggap kerugian <em>signifikan</em> apabila nilai turun <strong>20% atau lebih</strong>. Polisi TH menetapkan ambang 70%, kemudian 85%, kemudian 90% — jauh melangkaui amalan pasaran. " + L.sumber(R.msFrsic).outerHTML
      ));
    }
    lukisAmbang();
    w.appendChild(kad2);

    /* PwC pelarasan */
    var P = D.pwcPelarasan;
    var kad3 = L.kad({
      tajuk: "Kesan penuh: daripada untung RM3.4 bilion kepada rugi RM1.4 bilion",
      sub: "Pelarasan PwC ke atas keuntungan 2017 yang dilaporkan.",
      kelas: "F", ms: P.ms
    });
    kad3.body.appendChild(L.cartaAirTerjun({
      baris: P.untungRugi.map(function (b, i) {
        return { label: b.label, pendek: b.label.replace("Tolak: ", ""), nilai: b.nilai, jenis: (i === 0 || b.hasil) ? "jumlah" : "delta" };
      }),
      tinggi: 330,
      fmt: function (v) { return L.num(v / 1000, 1) + "b"; },
      fmtNilai: function (v) { return L.num(v); },
      warnaJumlah: "#4f8ef7"
    }));
    kad3.body.appendChild(el("div", { class: "grid2", style: "margin-top:12px" }, [
      el("div", {}, [
        el("div", { class: "kawalan-label", text: "Kerugian terkumpul pada 31.12.2017" }),
        el("div", { style: "height:6px" }),
        el("div", {}, P.terkumpul.map(function (b) {
          return el("div", { class: "kv" }, [el("span", { text: b.label }), el("span", { class: b.nilai < 0 ? "neg" : "", text: L.num(b.nilai) })]);
        }))
      ]),
      el("div", { class: "stats" }, [
        L.stat(juta(P.kerugianMeningkat.nilai * 1000), "Kerugian keseluruhan", P.kerugianMeningkat.nota + " " + L.sumber(P.kerugianMeningkat.ms).outerHTML, "var(--merah)")
      ])
    ]));
    kad3.body.appendChild(el("p", { class: "nota-kecil", html: P.ringkas + " " + L.sumber(P.msRingkas).outerHTML }));
    w.appendChild(kad3);

    /* Kegagalan audit */
    var kad4 = L.kad({
      tajuk: "Kenapa auditor tidak menghalangnya",
      sub: "Urutan tarikh yang menerangkan kegagalan kawalan.",
      kelas: "F", ms: 95
    });
    kad4.body.appendChild(el("div", { class: "krono" }, [
      el("div", { class: "krono-item" }, [
        el("span", { class: "krono-dot", style: "background:#c084fc" }),
        el("div", { class: "krono-t", text: "23 Mei 2018" }),
        el("div", { class: "krono-tajuk", text: "EY keluarkan Laporan Semakan RAV" }),
        el("div", { class: "krono-teks", html: "EY menyemak Proforma Penyata Kewangan berdasarkan kriteria yang <strong>ditetapkan oleh LTH sendiri</strong> — bukan penyata kewangan beraudit." }),
        el("div", { class: "krono-kaki" }, [L.sumber(80)])
      ]),
      el("div", { class: "krono-item" }, [
        el("span", { class: "krono-dot", style: "background:#d9534f" }),
        el("div", { class: "krono-t", text: "16 Julai 2018 — 54 hari kemudian" }),
        el("div", { class: "krono-tajuk", text: "Penyata Kewangan Beraudit baru dimuktamadkan" }),
        el("div", { class: "krono-teks", html: "Suruhanjaya mendapati kenyataan rakan kongsi EY bahawa Proforma berasaskan penyata beraudit KAN adalah <strong>tidak benar</strong> — kerana penyata itu belum wujud pada 23 Mei." }),
        el("div", { class: "krono-kaki" }, [L.sumber(81)])
      ]),
      el("div", { class: "krono-item" }, [
        el("span", { class: "krono-dot", style: "background:#e8912d" }),
        el("div", { class: "krono-t", text: "16 Julai 2018" }),
        el("div", { class: "krono-tajuk", text: "Sijil Audit Bersih + 'Emphasis of Matter'" }),
        el("div", { class: "krono-teks", html: "Dua penemuan material dibangkitkan, tetapi pendapat tanpa teguran tetap diberikan — membolehkan hibah 4.50% + 1.75% (RM2.75 bilion) diisytiharkan." }),
        el("div", { class: "krono-kaki" }, [L.sumber(87)])
      ]),
      el("div", { class: "krono-item" }, [
        el("span", { class: "krono-dot", style: "background:#8b5cf6" }),
        el("div", { class: "krono-t", text: "19 Disember 2018" }),
        el("div", { class: "krono-tajuk", text: "KAN jelaskan sebab kepada Perdana Menteri" }),
        el("div", { class: "krono-teks", html: "<em>\"…sekiranya Pendapat Berteguran diberikan, secara tidak langsung ianya akan mempengaruhi espektasi dan persepsi negatif pihak berkepentingan, khususnya pendeposit untuk terus menyimpan di TH.\"</em>" }),
        el("div", { class: "krono-kaki" }, [L.sumber(95)])
      ])
    ]));
    kad4.body.appendChild(L.bacaan(
      "Suruhanjaya menyimpulkan KAN <strong>mempertimbangkan perkara di luar skop audit</strong>. Perkara yang dinyatakan sebagai 'Emphasis of Matter' sepatutnya dinyatakan sebagai <strong>ketidakpatuhan yang serius</strong>. Tanpa Sijil Audit Bersih, TH tidak sepatutnya mengisytiharkan hibah 2017. " + L.sumber(96).outerHTML
    ));
    kad4.body.appendChild(L.amaranTafsir(
      "Laporan tidak mendapati wujudnya arahan supaya sijil bersih diberikan. Yang dicatatkan ialah <strong>KAN sendiri menjelaskan pertimbangannya</strong> dalam surat kepada Perdana Menteri. Suruhanjaya menilai pertimbangan itu tidak sesuai — bukan menuduh pemalsuan."
    ));
    w.appendChild(kad4);

    return w;
  };

  /* =====================================================================
     MODUL 5 — PELABURAN BERMASALAH
     ===================================================================== */
  V.pelaburan = function () {
    var w = el("div");
    w.appendChild(head("14 pelaburan bermasalah",
      "Suruhanjaya menyenaraikan 14 pelaburan yang memerlukan <strong>audit forensik</strong>. Ini bukan senarai semua pelaburan rugi — ini senarai yang cukup meragukan sehingga proses membuat keputusannya perlu disiasat semula."));

    var susun = "kerugian", tapisKat = "semua";
    var semuaKat = {};
    D.pelaburan.forEach(function (p) { (p.kategori || []).forEach(function (k) { semuaKat[k] = 1; }); });

    var kad0 = L.kad({
      tajuk: "Gambaran keseluruhan",
      sub: "Angka yang boleh diukur sahaja. Beberapa kes (THIP, Al-Rawda, Al-Fareeda) melibatkan mata wang asing.",
      kelas: "F", ms: 138
    });
    var berkuantiti = D.pelaburan.filter(function (p) { return p.kerugianJuta; });
    var jumRugi = berkuantiti.reduce(function (a, p) { return a + p.kerugianJuta; }, 0);
    kad0.body.appendChild(el("div", { class: "stats" }, [
      L.stat("14", "pelaburan disenaraikan", "Untuk audit forensik. " + L.sumber(195).outerHTML),
      L.stat(juta(jumRugi), "Kerugian/rosot nilai yang boleh dijumlahkan", "Daripada 12 kes yang menyatakan angka ringgit.", "var(--merah)"),
      L.stat("3", "kes ada laporan polis atau SPRM", "PT TH Indo Plantations, Trurich, dan TH Plantations.", "var(--oren)"),
      L.stat("3", "kes 'Put Option' gagal dibayar", "Emrail, Wellspring, Putrajaya Perdana.", "var(--ungu)")
    ]));
    kad0.body.appendChild(L.amaranTafsir(
      "Jumlah <strong>" + juta(jumRugi) + "</strong> ialah " + L.tag("T").outerHTML + " — ia dijumlahkan oleh dashboard ini daripada angka individu dalam laporan. Laporan <strong>tidak</strong> menyatakan satu jumlah keseluruhan. Angka ini juga <strong>tidak setara</strong>: sebahagiannya rosot nilai berbuku, sebahagian kerugian tidak nyata, sebahagian dihapus kira. Ia juga tidak termasuk kes bermata wang USD/SR yang tidak dinyatakan dalam ringgit."
    ));
    w.appendChild(kad0);

    /* Serak */
    var kadS = L.kad({
      tajuk: "Berapa banyak dilaburkan lawan berapa banyak hilang",
      sub: "Setiap bulatan ialah satu pelaburan. Ketik untuk butiran penuh.",
      kelas: "F",
      soalan: "Pelaburan mana yang hampir hilang sepenuhnya, dan mana yang masih ada nilai?"
    });
    var adaDua = D.pelaburan.filter(function (p) { return p.pelaburanJuta && p.kerugianJuta; });
    kadS.body.appendChild(L.cartaSerak({
      titik: adaDua.map(function (p) {
        var nis = p.kerugianJuta / p.pelaburanJuta;
        return {
          x: p.pelaburanJuta, y: p.kerugianJuta, label: p.nama,
          r: 6 + p.berat * 1.6,
          warna: nis > 0.9 ? "#d9534f" : nis > 0.5 ? "#e8912d" : "#4f8ef7",
          teks: p.nama.split(" ")[0].replace(/[(),]/g, ""),
          onclick: function () { buka(p); }
        };
      }),
      garisPandu: true,
      tajukX: "Jumlah dilaburkan (RM juta)",
      tajukY: "Kerugian / rosot nilai (RM juta)",
      fmtX: function (v) { return L.num(v); }, fmtY: function (v) { return L.num(v); },
      fmtTip: function (t) { return "Dilabur RM" + L.num(t.x) + " juta, rugi RM" + L.num(t.y) + " juta"; },
      tinggi: 380
    }));
    kadS.body.appendChild(L.bacaan(
      "Garisan putus-putus ialah <strong>kerugian 100%</strong>. Bulatan yang duduk atas garisan itu bermakna hampir semua wang hilang — Trurich (RM364 juta), Al-Fareeda (RM63 juta), Wellspring. Bulatan jauh di bawah garisan masih menyimpan nilai. Saiz bulatan mencerminkan keseriusan kes (termasuk sama ada ada laporan polis)."
    ));
    w.appendChild(kadS);

    /* Senarai kes */
    var kadL = L.kad({ tajuk: "Semua 14 kes", sub: "Susun dan tapis mengikut apa yang anda mahu siasat.", kelas: "F" });
    var kawal = el("div", { class: "kawalan" }, [
      el("div", { class: "kawalan-baris" }, [
        el("span", { class: "kawalan-label", text: "Susun" }),
        L.segmen([
          { id: "kerugian", label: "Kerugian terbesar" },
          { id: "pelaburan", label: "Pelaburan terbesar" },
          { id: "berat", label: "Paling serius" },
          { id: "nama", label: "A–Z" }
        ], susun, function (id) { susun = id; lukisSenarai(); })
      ]),
      el("div", { class: "kawalan-baris" }, [
        el("span", { class: "kawalan-label", text: "Tapis" }),
        L.segmen([{ id: "semua", label: "Semua" }].concat(Object.keys(semuaKat).map(function (k) { return { id: k, label: k }; })),
          tapisKat, function (id) { tapisKat = id; lukisSenarai(); })
      ])
    ]);
    var senarai = el("div", { class: "kes-grid" });
    kadL.body.appendChild(kawal);
    kadL.body.appendChild(senarai);

    function lukisSenarai() {
      kawal.querySelectorAll(".segmen").forEach(function (sg, i) {
        var cur = i === 0 ? susun : tapisKat;
        sg.querySelectorAll(".segmen-btn").forEach(function (b) { b.classList.toggle("aktif", b.getAttribute("data-id") === cur); });
      });
      L.clear(senarai);
      var list = D.pelaburan.filter(function (p) { return tapisKat === "semua" || (p.kategori || []).indexOf(tapisKat) >= 0; });
      list.sort(function (a, b) {
        if (susun === "nama") return a.nama.localeCompare(b.nama);
        if (susun === "berat") return b.berat - a.berat;
        if (susun === "pelaburan") return (b.pelaburanJuta || 0) - (a.pelaburanJuta || 0);
        return (b.kerugianJuta || 0) - (a.kerugianJuta || 0);
      });
      list.forEach(function (p) {
        var nis = (p.pelaburanJuta && p.kerugianJuta) ? Math.min(1, p.kerugianJuta / p.pelaburanJuta) : null;
        senarai.appendChild(el("div", {
          class: "kes", tabindex: "0", role: "button",
          onclick: function () { buka(p); },
          onkeydown: function (e) { if (e.key === "Enter") buka(p); }
        }, [
          el("div", { class: "kes-nama", text: p.nama }),
          el("div", { class: "kes-meta", text: p.sektor + " · " + p.lokasi }),
          el("div", { class: "kes-angka" }, [
            el("div", {}, [el("b", { text: p.pelaburanJuta ? juta(p.pelaburanJuta) : "—" }), "Dilaburkan"]),
            el("div", {}, [el("b", { class: "neg", text: p.kerugianJuta ? juta(p.kerugianJuta) : "—" }), "Rugi/rosot nilai"]),
            nis !== null ? el("div", {}, [el("b", { text: L.pct(nis * 100, 0) }), "Nisbah hilang"]) : null
          ]),
          nis !== null ? el("div", { class: "kes-bar" }, [el("i", { style: "width:" + (nis * 100) + "%" })]) : null,
          el("div", { class: "kes-meta", style: "margin-top:7px", text: p.status })
        ]));
      });
      if (!list.length) senarai.appendChild(el("p", { class: "nota-kecil", text: "Tiada kes dalam tapisan ini." }));
    }
    lukisSenarai();
    w.appendChild(kadL);

    V._bukaPelaburan = buka;
    function buka(p) {
      modal(p.nama, [
        el("div", { class: "modal-seksyen" }, [
          el("h4", { text: "Ringkasan" }),
          el("p", { text: p.sektor + " · " + p.lokasi }),
          L.sumber(p.ms)
        ]),
        el("div", { class: "modal-seksyen" }, [
          el("h4", { text: "Angka penting" }),
          el("div", {}, p.angka.map(function (a) {
            return el("div", { class: "kv" }, [el("span", { text: a.label }), el("span", { text: a.nilai })]);
          }))
        ]),
        el("div", { class: "modal-seksyen" }, [
          el("h4", { text: "Apa yang berlaku" }),
          el("p", { text: p.isu })
        ]),
        el("div", { class: "modal-seksyen" }, [
          el("h4", { text: "Tindakan yang diambil" }),
          el("ul", {}, p.tindakan.map(function (t) { return el("li", { text: t }); }))
        ]),
        el("div", { class: "modal-seksyen" }, [
          el("h4", { text: "Status semasa laporan disediakan" }),
          el("p", { text: p.status })
        ])
      ]);
    }

    /* Punca sistemik */
    var kadP = L.kad({ tajuk: "Kenapa begitu banyak yang gagal", sub: "Punca sistemik yang Suruhanjaya kenal pasti.", kelas: "F", ms: D.pelaburanNota.ms });
    kadP.body.appendChild(el("ul", { class: "senarai" }, D.pelaburanNota.punca.map(function (t) { return el("li", { text: t }); })));
    kadP.body.appendChild(L.bacaan("<strong>Pandangan Suruhanjaya:</strong> " + D.pelaburanNota.pandangan + " " + L.sumber(D.pelaburanNota.msPandangan).outerHTML));
    w.appendChild(kadP);

    return w;
  };

  /* =====================================================================
     MODUL 6 — UJSB & SUKUK
     ===================================================================== */
  V.ujsb = function () {
    var w = el("div");
    w.appendChild(head("Pemulihan 2018: bagaimana masalah dipindahkan",
      "Kerajaan tidak memberi TH wang tunai. Sebaliknya, aset bermasalah TH dibeli oleh syarikat kerajaan (" + L.istilah("UJSB").outerHTML + ") pada harga jauh di atas nilai pasaran, dibayar dengan " + L.istilah("Sukuk").outerHTML + " yang hanya matang pada 2026 dan 2029."));

    var U = D.ujsb;

    /* Premium */
    var kad1 = L.kad({
      tajuk: "Harga pemindahan lawan nilai pasaran sebenar",
      sub: "Perbezaan inilah yang menutup jurang defisit TH — dan menjadi kerugian UJSB.",
      kelas: "F", ms: U.pemindahan.ms,
      soalan: "Berapa banyak nilai yang 'dicipta' oleh transaksi pemindahan ini?"
    });
    U.pemindahan.baris.concat([{ aset: "JUMLAH KESELURUHAN", buku: U.pemindahan.jumlah.buku, pindah: U.pemindahan.jumlah.pindah, pasaran: U.pemindahan.jumlah.pasaran }])
      .forEach(function (b) {
        var lebih = (b.pindah / b.pasaran - 1) * 100;
        kad1.body.appendChild(el("div", { class: "kawalan-label", style: "margin-top:14px", text: b.aset }));
        kad1.body.appendChild(L.barMendatar({
          maks: Math.max(b.buku, b.pindah, b.pasaran),
          baris: [
            { label: "Nilai buku dalam akaun TH", nilai: b.buku, warna: "#94a3b8" },
            { label: "Nilai pemindahan — apa yang UJSB bayar", nilai: b.pindah, warna: "#e8912d" },
            { label: "Nilai pasaran sebenar ketika itu", nilai: b.pasaran, warna: "#d9534f", nota: "Harga pemindahan <strong>" + L.num(lebih, 0) + "% lebih tinggi</strong> daripada nilai pasaran." }
          ],
          fmt: function (v) { return juta(v); }
        }));
      });
    kad1.body.appendChild(el("p", { class: "nota-kecil", text: "Setiap kumpulan menggunakan skalanya sendiri supaya nisbah dalam kumpulan itu boleh dibaca. Jangan bandingkan panjang bar antara kumpulan berbeza — gunakan nombornya." }));
    kad1.body.appendChild(el("div", { class: "stats", style: "margin-top:12px" }, [
      L.stat(juta(U.pemindahan.jumlah.pindah), "Dibayar oleh UJSB", U.pemindahan.kandungan),
      L.stat(juta(U.pemindahan.jumlah.pasaran), "Nilai pasaran ketika itu", "Kurang separuh daripada harga pemindahan.", "var(--merah)"),
      L.stat(juta(U.pemindahan.premium), "Premium", "Inilah jurang yang ditanggung Kerajaan.", "var(--oren)"),
      L.stat("RM9.9 bilion", "Kerugian UJSB tahun 2019", "Akibat perbezaan nilai pemindahan dan nilai pasaran. " + L.sumber(U.kerugianUJSB.ms).outerHTML, "var(--merah)")
    ]));
    kad1.body.appendChild(L.bacaan(
      "Perhatikan lajur <strong>Ekuiti</strong>: nilai buku RM16,852 juta, dipindah pada RM16,851 juta — hampir sama. Tetapi nilai pasaran sebenar hanya RM7,600 juta. Ini bermakna nilai buku saham dalam akaun TH sudah <strong>lebih dua kali ganda</strong> nilai sebenarnya sebelum pemindahan. Premium tidak dicipta pada hari pemindahan; ia sudah wujud dalam penyata kewangan."
    ));
    w.appendChild(kad1);

    /* Hartanah decay */
    var HT = D.hartanahUJSB;
    var kad2 = L.kad({
      tajuk: "Apa jadi kepada hartanah selepas dipindahkan",
      sub: "Nilai pemindahan (Dis 2018) berbanding penilaian jurunilai bebas pada 31 Disember 2021.",
      kelas: "F", ms: HT.ms
    });
    kad2.body.appendChild(L.barMendatar({
      baris: HT.baris.map(function (b) {
        var susut = (1 - b.pasaran2021 / b.pindah) * 100;
        return {
          label: b.jenis, nilai: b.pindah / 1e6, nilai2: b.pasaran2021 / 1e6,
          nota: "Nilai pasaran Dis 2021: RM" + L.num(b.pasaran2021 / 1e6, 0) + " juta — susut " + L.num(susut, 0) + "%",
          warna: susut > 50 ? "#d9534f" : "#e8912d"
        };
      }),
      warna2: "#64748b",
      fmt: function (v) { return "RM" + L.num(v, 0) + " juta"; }
    }));
    kad2.body.appendChild(el("div", { class: "stats", style: "margin-top:12px" }, [
      L.stat("RM2.25 bilion", "Nilai pemindahan 29 hartanah"),
      L.stat("RM1.20 bilion", "Nilai pasaran Disember 2021", "Susut 46% dalam tiga tahun.", "var(--merah)"),
      L.stat("1 daripada 29", "Hartanah berjaya dijual", "Tanah di Segamat, Johor — RM920 ribu. Baki 17 yang ditender tidak mendapat bidaan. " + L.sumber(131).outerHTML, "var(--oren)")
    ]));
    kad2.body.appendChild(L.amaranTafsir(
      "Susutan ini <strong>bukan semata-mata bukti harga pemindahan yang terlalu tinggi</strong>. Laporan menyebut kejatuhan nilai berikutan pasaran hartanah domestik yang lemah akibat Covid-19. Laporan juga mencatat bahawa jika TH masih memegang hartanah ini, TH-lah yang terpaksa merekod rosot nilai tambahan. " + L.sumber(123).outerHTML + "<br><br>Bar penuh = nilai pemindahan; bar gelap bertindih = nilai pasaran 2021."
    ));
    kad2.body.appendChild(el("p", { class: "nota-kecil", html: HT.jppmh.nota + " " + L.sumber(HT.jppmh.ms).outerHTML }));
    w.appendChild(kad2);

    /* Bluechip */
    var B = D.bluechip;
    var kad3 = L.kad({
      tajuk: "Saham mewah: harga pemindahan lawan pasaran",
      sub: "Lima kaunter blue-chip yang dipindahkan sebelum 31 Disember 2018.",
      kelas: "F", ms: B.ms
    });
    kad3.body.appendChild(L.cartaKombo({
      labels: B.baris.map(function (b) { return b.kaunter; }),
      siri: [
        { nama: "Harga pemindahan (RM/unit)", warna: "#e8912d", data: B.baris.map(function (b) { return b.pindahUnit; }) },
        { nama: "Harga pasaran 31 Dis 2018", warna: "#64748b", data: B.baris.map(function (b) { return b.pasaran2018; }) },
        { nama: "Harga pasaran " + B.tarikhHarga2022, warna: "#d9534f", data: B.baris.map(function (b) { return b.harga2022; }) }
      ],
      fmtKiri: function (v) { return "RM" + L.num(v, 2); },
      fmtTip: function (v) { return "RM" + L.num(v, 2); },
      tinggi: 300
    }));
    kad3.body.appendChild(L.jadual(
      ["Kaunter", { t: "Pindah RM/unit", kanan: 1 }, { t: "Pasaran 31-12-18", kanan: 1 }, { t: "Jatuh", kanan: 1 }, { t: "Nilai jatuh (RM)", kanan: 1 }],
      B.baris.map(function (b) {
        var jatuh = (b.pasaran2018 / b.pindahUnit - 1) * 100;
        return {
          sel: [
            { t: b.kaunter },
            { t: L.num(b.pindahUnit, 2), kanan: true },
            { t: L.num(b.pasaran2018, 2), kanan: true },
            { t: L.num(jatuh, 1) + "%", kanan: true, kelas: "neg" },
            { t: L.num(b.jumPasaran2018 - b.jumPindah), kanan: true, kelas: "neg" }
          ]
        };
      }).concat([{
        __kelas: "jumlah",
        sel: [{ t: "Jumlah" }, { t: "" }, { t: "" }, { t: "" }, { t: L.num(B.jumlah.jatuh), kanan: true, kelas: "neg" }]
      }])
    ));
    kad3.body.appendChild(L.bacaan(
      "Suruhanjaya mendapati harga pasaran semasa (" + B.tarikhHarga2022 + ") bagi kesemua kaunter ini <strong>masih di bawah harga pemindahan</strong>. Empat kaunter lain hilang status patuh syariah: " + B.tidakPatuhSyariah.join(", ") + " — sebab itulah bayaran RM300 juta dibuat secara tunai dan bukan melalui Sukuk (Sukuk patuh syariah tidak boleh membiayai saham tidak patuh syariah). " + L.sumber(125).outerHTML
    ));
    w.appendChild(kad3);

    /* Sukuk & penebusan */
    var suntikan = 1.73;
    var kad4 = L.kad({
      tajuk: "Bom masa: bolehkah Sukuk RM27.5 bilion ditebus?",
      sub: "Jemaah Menteri bersetuju menyuntik RM1.73 bilion setahun. Uji apa jadi kalau suntikan berbeza.",
      kelas: "S",
      soalan: "Adakah komitmen tahunan Kerajaan mencukupi untuk menampung dua bayaran pukal pada 2026 dan 2029?"
    });
    var sb = el("div");
    kad4.body.appendChild(el("div", { class: "stats" }, [
      L.stat("RM13.2 bilion", "Sukuk Siri 1 matang 2026", "Pokok RM10.0 bilion, pulangan matang 4.05% setahun, tempoh 7 tahun."),
      L.stat("RM14.3 bilion", "Sukuk Siri 2 matang 2029", "Pokok RM9.6 bilion, pulangan matang 4.10% setahun, tempoh 10 tahun."),
      L.stat("RM0.5 bilion", "Jumlah diterima setakat ini", "Daripada RM17.8 bilion yang diluluskan. Suntikan RM1.5 bilion 2021 tidak disalurkan.", "var(--merah)")
    ]));
    kad4.body.appendChild(el("div", { style: "height:12px" }));
    kad4.body.appendChild(L.slider({
      label: "Suntikan tunai Kerajaan setahun (RM bilion)", min: 0, max: 4, step: 0.1, nilai: 1.73,
      fmt: function (v) { return "RM" + L.num(v, 2) + "b"; },
      onubah: function (v) { suntikan = v; lukisSukuk(); },
      nota: "RM1.73 bilion ialah kadar yang dipersetujui Jemaah Menteri pada 2018. " + L.sumber(128).outerHTML
    }));
    kad4.body.appendChild(sb);
    function lukisSukuk() {
      L.clear(sb);
      var tahun = [], terkumpul = [], keperluan = [], kum = 0.5; // RM0.5b sudah diterima
      for (var y = 2022; y <= 2029; y++) {
        kum += suntikan;
        tahun.push(String(y));
        terkumpul.push(kum);
        keperluan.push(y < 2026 ? 0 : (y < 2029 ? 13.2 : 27.5));
      }
      sb.appendChild(L.cartaKombo({
        labels: tahun,
        siri: [
          { nama: "Dana terkumpul daripada suntikan (SIMULASI)", warna: "#2f9e8f", data: terkumpul },
          { nama: "Obligasi Sukuk yang perlu ditebus", warna: "#d9534f", jenis: "garis", data: keperluan }
        ],
        fmtKiri: function (v) { return L.num(v, 0) + "b"; },
        fmtTip: function (v) { return "RM" + L.num(v, 2) + " bilion"; },
        tinggi: 300
      }));
      var pada2026 = 0.5 + suntikan * 5, pada2029 = 0.5 + suntikan * 8;
      sb.appendChild(el("div", { class: "stats", style: "margin-top:12px" }, [
        L.stat("RM" + L.num(pada2026, 1) + "b", "Terkumpul menjelang 2026", "Diperlukan: RM13.2 bilion.", pada2026 >= 13.2 ? "var(--aksen)" : "var(--merah)"),
        L.stat("RM" + L.num(pada2029, 1) + "b", "Terkumpul menjelang 2029", "Diperlukan: RM27.5 bilion terkumpul.", pada2029 >= 27.5 ? "var(--aksen)" : "var(--merah)"),
        L.stat("RM" + L.num(Math.max(0, 27.5 - pada2029), 1) + "b", "Jurang pada 2029", "Kalau tiada pelupusan aset atau penstrukturan semula.", "var(--merah)")
      ]));
      sb.appendChild(L.amaranTafsir(
        "Ini <strong>simulasi mudah</strong>, bukan unjuran laporan. Ia mengandaikan suntikan bermula 2022, tiada faedah atas dana terkumpul, dan tiada hasil pelupusan aset UJSB. Realitinya UJSB juga menebus melalui hasil jualan aset dan boleh menggunakan '<em>redemption in kind</em>'. Laporan sendiri mencadangkan Sukuk distruktur semula dengan jaminan Kerajaan dan diterbitkan dalam pelbagai siri untuk mengelak bayaran pukal. " + L.sumber(135).outerHTML
      ));
    }
    lukisSukuk();
    w.appendChild(kad4);

    /* Kenapa risikonya besar */
    var kad5 = L.kad({ tajuk: "Kenapa Sukuk ini risiko terbesar TH", kelas: "F", ms: U.risiko.ms });
    kad5.body.appendChild(el("div", { class: "stats" }, [
      L.stat("31%", "daripada keseluruhan aset TH", "RM27.5 bilion Sukuk berbanding jumlah aset TH.", "var(--oren)"),
      L.stat("26%", "daripada pendapatan tahunan TH", "Hasil pengakruan Sukuk — tetapi bukan tunai.", "var(--oren)"),
      L.stat("RM840 juta", "pendapatan tertunggak setiap tahun", "Terkumpul melebihi RM2.1 bilion setakat 31 Dis 2021. " + L.sumber(132).outerHTML, "var(--merah)")
    ]));
    kad5.body.appendChild(L.bacaan(
      "Ini masalah paling halus dalam keseluruhan laporan. TH <strong>merekod</strong> pendapatan daripada Sukuk setiap tahun, dan sebahagiannya diagihkan kepada pendeposit sebagai hibah. Tetapi wang itu <strong>tidak pernah masuk sebagai tunai</strong> — ia hanya nombor dalam akaun sehingga 2026/2029. Hibah yang dibayar daripada pendapatan bukan tunai ini bertukar menjadi deposit baharu, iaitu <strong>liabiliti baharu</strong> kepada TH, dan tidak boleh dilaburkan untuk jana pendapatan sebenar."
    ));
    kad5.body.appendChild(el("p", { class: "nota-kecil", html: "Sukuk UJSB <strong>tidak dijamin</strong> Kerajaan — hanya ada Surat Sokongan Kewangan MOF yang Suruhanjaya nilai sebagai 'Letter of Comfort'. Namun UJSB disenaraikan dalam Komitmen Jaminan Kerajaan di bawah Akta 61. " + L.sumber(126).outerHTML }));
    w.appendChild(kad5);

    /* Komitmen jaminan */
    var KJ = D.komitmenJaminan;
    var kad6 = L.kad({
      tajuk: "UJSB dalam konteks: komitmen jaminan Kerajaan Persekutuan",
      sub: "Kedudukan UJSB berbanding entiti lain yang dijamin Kerajaan (RM juta).",
      kelas: "F", ms: KJ.ms
    });
    kad6.body.appendChild(L.barMendatar({
      baris: KJ.baris.map(function (b) {
        return { label: b.entiti, nilai: b.y2021, warna: b.sorot ? "#d9534f" : "#94a3b8", sorot: b.sorot, nota: b.sorot ? "11.1% daripada keseluruhan komitmen jaminan Kerajaan" : null };
      }),
      fmt: function (v) { return "RM" + L.num(v / 1000, 1) + "b"; }
    }));
    kad6.body.appendChild(el("p", { class: "nota-kecil", html: "Jumlah komitmen jaminan Kerajaan 2021: <strong>RM" + L.num(KJ.jumlah.y2021 / 1000, 1) + " bilion</strong>. UJSB ialah entiti keempat terbesar. Nota: angka jaminan UJSB (RM21.1 bilion) berbeza daripada nilai nominal Sukuk (RM27.5 bilion) kerana ia dinyatakan pada asas berbeza dalam dokumen fiskal Kerajaan." }));
    w.appendChild(kad6);

    /* ROFR */
    var kad7 = L.kad({
      tajuk: "Hak beli semula (ROFR): tawaran pada harga premium",
      sub: "Aset ditawar semula kepada TH sebelum dijual di pasaran terbuka.",
      kelas: "F", ms: D.rofr.ms
    });
    kad7.body.appendChild(L.jadual(
      ["Syarikat", "Tarikh", { t: "Unit", kanan: 1 }, { t: "Harga ROFR", kanan: 1 }, { t: "Harga pasaran", kanan: 1 }, { t: "Premium", kanan: 1 }],
      D.rofr.baris.map(function (b) {
        return {
          sel: [
            { t: b.syarikat }, { t: b.tarikh },
            { t: L.num(b.unit), kanan: true },
            { t: L.num(b.hargaRofr, 3), kanan: true },
            { t: L.num(b.hargaPasaran, 3), kanan: true },
            { t: L.num(b.premium, 1) + "%", kanan: true, kelas: b.premium > 0 ? "neg" : "pos" }
          ]
        };
      })
    ));
    kad7.body.appendChild(L.bacaan(
      "Tujuh daripada sembilan tawaran adalah pada harga <strong>lebih tinggi</strong> daripada harga pasaran terbuka. Suruhanjaya menyimpulkan: jika TH mahu membeli semula saham ini, ia boleh dapat lebih murah di pasaran terbuka. Sebab itulah Suruhanjaya menyarankan TH melepaskan kesemua Hak Penolakan Pertama bagi aset yang tidak memberi pulangan kompetitif. " + L.sumber(136).outerHTML
    ));
    w.appendChild(kad7);

    /* Empat cadangan */
    var kad8 = L.kad({ tajuk: "Empat pilihan yang dipertimbangkan pada 2018", sub: "Dan sebab tiga daripadanya ditolak.", kelas: "F", ms: U.empatCadangan.ms });
    kad8.body.appendChild(el("div", {}, U.empatCadangan.senarai.map(function (c) {
      return el("div", { class: "syor-item", style: c.diterima ? "border-color:var(--aksen);background:var(--aksen-lembut)" : "" }, [
        el("div", { class: "syor-atas" }, [
          el("span", { class: "syor-no", text: "Cadangan " + c.no }),
          el("span", { class: "syor-tajuk", text: c.tajuk }),
          el("span", { class: "syor-kat", text: c.diterima ? "DIPILIH" : "ditolak" })
        ]),
        el("div", { class: "syor-teks", text: c.jumlah }),
        el("div", { class: "syor-teks", text: c.tolak })
      ]);
    })));
    kad8.body.appendChild(el("p", { class: "nota-kecil", html: "Empat teras penilaian: " + U.empatTeras.senarai.join("; ") + ". " + L.sumber(U.empatTeras.ms).outerHTML }));
    w.appendChild(kad8);

    return w;
  };

  /* =====================================================================
     MODUL 7 — HAJI, KOS & HAFIS
     ===================================================================== */
  V.haji = function () {
    var w = el("div");
    w.appendChild(head("Kos haji dan subsidi: masalah yang belum selesai",
      "Bayaran haji dibekukan pada RM9,980 selama 13 tahun sementara kos sebenar terus naik. Jurangnya ditanggung TH melalui " + L.istilah("HAFIS").outerHTML + " — yang diambil daripada keuntungan pelaburan, iaitu daripada wang pendeposit."));

    var A = D.hafisSebenar;
    var kad1 = L.kad({
      tajuk: "Kos sebenar lawan apa yang jemaah bayar (2014–2019)",
      sub: "Setiap ringgit jurang ditanggung TH.",
      kelas: "F", ms: A.ms,
      soalan: "Berapa besar bahagian kos haji yang sebenarnya disubsidi?"
    });
    kad1.body.appendChild(L.cartaKombo({
      labels: A.baris.map(function (b) { return String(b.tahun); }),
      siri: [
        { nama: "Bayaran jemaah (RM)", warna: "#2f9e8f", data: A.baris.map(function (b) { return b.bayaran; }) },
        { nama: "Subsidi HAFIS (RM)", warna: "#e8912d", data: A.baris.map(function (b) { return b.hafis; }) },
        { nama: "Bahagian disubsidi (%)", warna: "#d9534f", jenis: "garis", paksi: "kanan", data: A.baris.map(function (b) { return b.hafis / b.kos * 100; }) }
      ],
      paksiKanan: true,
      fmtKiri: function (v) { return L.num(v / 1000, 0) + "k"; },
      fmtKanan: function (v) { return L.num(v, 0) + "%"; },
      fmtTip: function (v) { return L.num(v, 0); },
      tinggi: 320
    }));
    kad1.body.appendChild(L.bacaan(
      "Bar hijau kekal <strong>rata sepenuhnya</strong> pada RM9,980 selama enam tahun — itulah kesan pembekuan 2009. Bar oren membesar setiap tahun. Garisan merah menunjukkan bahagian kos yang disubsidi naik daripada 38% (2014) kepada 56% (2019). Jumlah beban tahunan naik daripada RM106 juta kepada hampir RM300 juta."
    ));
    kad1.body.appendChild(el("p", { class: "nota-kecil", text: A.nota }));
    w.appendChild(kad1);

    /* Simulator bayaran haji */
    var bayar = 12980;
    var kad2 = L.kad({
      tajuk: "Simulator dasar: berapa patut jemaah bayar?",
      sub: "Tarik gelangsar untuk tetapkan bayaran haji, dan lihat kesannya kepada beban TH sehingga 2030.",
      kelas: "S",
      soalan: "Pada tahap bayaran mana subsidi menjadi mampan?"
    });
    var sim = el("div");
    kad2.body.appendChild(L.slider({
      label: "Bayaran haji seorang jemaah (RM)", min: 9980, max: 40000, step: 500, nilai: 12980,
      fmt: function (v) { return "RM" + L.num(v); },
      onubah: function (v) { bayar = v; lukisSim(); },
      nota: "Kadar sebenar: RM9,980 (2009–2021), RM10,980 (B40, 2022), <strong>RM12,980</strong> (bukan B40, 2022). Kos haji ikut unjuran laporan; kuota diandaikan 30,000 jemaah setahun. " + L.sumber(167).outerHTML
    }));
    kad2.body.appendChild(sim);
    function lukisSim() {
      L.clear(sim);
      var U = D.hafisUnjuran;
      var jemaah = U.bilanganJemaah;
      var hafisSim = U.baris.map(function (b) { return Math.max(0, b.kos - bayar); });
      var jumSim = hafisSim.map(function (h) { return h * jemaah / 1e6; }); // RM juta
      var jumAsal = U.baris.map(function (b) { return b.jumlahRibu / 1000; }); // RM juta
      sim.appendChild(L.cartaKombo({
        labels: U.baris.map(function (b) { return String(b.tahun); }),
        siri: [
          { nama: "Beban HAFIS ikut unjuran laporan (RM12,980)", warna: "#94a3b8", data: jumAsal, lut: 0.6 },
          { nama: "Beban HAFIS simulasi (RM" + L.num(bayar) + ")", warna: "#e8912d", data: jumSim },
          { nama: "Bahagian kos disubsidi (%)", warna: "#d9534f", jenis: "garis", paksi: "kanan", data: U.baris.map(function (b, i) { return hafisSim[i] / b.kos * 100; }) }
        ],
        paksiKanan: true,
        fmtKiri: function (v) { return L.num(v, 0); },
        fmtKanan: function (v) { return L.num(v, 0) + "%"; },
        fmtTip: function (v) { return L.num(v, 0); },
        tinggi: 320
      }));
      var h2030 = jumSim[jumSim.length - 1];
      var kesanHibah = h2030 / 88000 * 100; // RM juta atas RM88 bilion deposit
      sim.appendChild(el("div", { class: "stats", style: "margin-top:12px" }, [
        L.stat("RM" + L.num(h2030, 0) + " juta", "Beban HAFIS pada 2030", "Berbanding RM742 juta dalam unjuran laporan.", h2030 > 500 ? "var(--merah)" : "var(--aksen)"),
        L.stat(L.pct(hafisSim[8] / D.hafisUnjuran.baris[8].kos * 100, 0), "Bahagian kos disubsidi 2030", "Laporan: 65.6% jika bayaran kekal RM12,980."),
        L.stat("−" + L.num(kesanHibah, 2) + "%", "Anggaran kesan kepada kadar hibah", "Terbitan: beban HAFIS 2030 dibahagi deposit RM88 bilion.", "var(--biru)")
      ]));
      sim.appendChild(L.amaranTafsir(
        "Beberapa perkara yang simulasi ini <strong>tidak</strong> ambil kira: kuota jemaah dijangka naik ke 60,000 menjelang 2030 (" + L.sumber(172).outerHTML + "), yang akan <em>menggandakan</em> beban; dasar dua lapisan B40/bukan-B40 diabaikan; dan menaikkan bayaran mungkin menyebabkan sebahagian jemaah tidak mampu pergi. Angka 'kesan kepada kadar hibah' ialah " + L.tag("T").outerHTML + " menggunakan asas deposit tetap RM88 bilion — laporan sendiri menyatakan subsidi ~RM400 juta setahun bersamaan pengurangan <strong>0.4%</strong> kadar hibah (" + L.sumber(72).outerHTML + "), nisbah yang hampir sama."
      ));
    }
    lukisSim();
    w.appendChild(kad2);

    /* Masa menunggu */
    var kad3 = L.kad({
      tajuk: "Deposit minimum dan tempoh menunggu haji",
      sub: "Cadangan Suruhanjaya yang paling menyentuh pendeposit biasa.",
      kelas: "F", ms: 198
    });
    kad3.body.appendChild(el("div", { class: "stats" }, [
      L.stat("RM1,300", "Deposit minimum sekarang", "Untuk layak didaftar dalam giliran haji."),
      L.stat("130 tahun", "Tempoh menunggu sekarang", "Melebihi jangka hayat kebanyakan rakyat Malaysia.", "var(--merah)"),
      L.stat("RM12,980", "Deposit minimum dicadangkan", "Sama dengan bayaran haji Muassasah semasa."),
      L.stat("33 tahun", "Tempoh menunggu selepas perubahan", "Tempoh yang laporan kira lebih munasabah.", "var(--aksen)")
    ]));
    kad3.body.appendChild(L.bacaan(
      "Logiknya: jika ambang pendaftaran dinaikkan, hanya mereka yang benar-benar bersedia akan mendaftar. Barisan menjadi lebih pendek dan deposit TH bertambah. Laporan juga mengaitkan ini dengan prinsip <em>istito'ah</em> — haji hanya difardukan kepada yang mampu."
    ));
    kad3.body.appendChild(L.amaranTafsir(
      "Perubahan ini juga bermakna <strong>65% pendeposit sedia ada</strong> (yang mempunyai RM2,000 atau kurang) tidak akan layak mendaftar sehingga mereka menabung 6 kali ganda lebih banyak. Laporan menyifatkannya sebagai pendorong menabung, tetapi <strong>tidak mengemukakan analisis</strong> tentang berapa ramai yang tersingkir. Angka tempoh menunggu juga tidak konsisten dalam laporan: 130 tahun (Bab Empat) dan 135 tahun (perenggan 3.16.17), dan pengiraan EY asalnya menggunakan RM9,980. " + L.sumber(170).outerHTML
    ));
    w.appendChild(kad3);

    /* Konteks jangka panjang */
    var kad4 = L.kad({ tajuk: "Konteks jangka panjang", kelas: "F" });
    kad4.body.appendChild(el("div", { class: "stats" }, [
      L.stat("1.46 juta", "rakyat Malaysia diuruskan hajinya", "Sejak 1963 hingga 2021. " + L.sumber(191).outerHTML),
      L.stat("RM2.02 bilion", "jumlah HAFIS diberi sejak 2001", "Kepada jemaah haji Muassasah. " + L.sumber(191).outerHTML),
      L.stat("RM60 bilion", "dana minima diperlukan", "Untuk menampung subsidi haji pada tahap sekarang. " + L.sumber(73).outerHTML, "var(--oren)"),
      L.stat("30,000 → 60,000", "kuota haji Malaysia", "Kerajaan Arab Saudi merancang menggandakan menjelang 2030. " + L.sumber(172).outerHTML)
    ]));
    kad4.body.appendChild(L.bacaan(
      "Dua trend berlanggar. Kos haji per jemaah naik (RM25,540 pada 2022 → dianggarkan RM37,729 pada 2030), <strong>dan pada masa yang sama</strong> bilangan jemaah dijangka berganda. Jika kedua-duanya berlaku dengan bayaran kekal, beban subsidi tidak hanya naik — ia melonjak."
    ));
    w.appendChild(kad4);

    return w;
  };

  /* =====================================================================
     MODUL 8 — TADBIR URUS
     ===================================================================== */
  V.tadbir = function () {
    var w = el("div");
    w.appendChild(head("Siapa yang membuat keputusan",
      "Sepanjang tempoh siasatan, TH melalui 4 Menteri, 3 Pengerusi dan 5 Ketua Pegawai Eksekutif. Modul ini memetakan siapa memegang jawatan bila — dan berapa banyak jawatan lain yang mereka pegang serentak."));

    /* Gantt */
    var kump = "pengerusi";
    var kad1 = L.kad({
      tajuk: "Tempoh memegang jawatan",
      sub: "Garisan merah nipis menandakan peristiwa penting: hibah 2017 diisytiharkan, dan pelan pemulihan diluluskan.",
      kelas: "F", ms: D.jawatan.ms,
      soalan: "Adakah wujud kestabilan kepimpinan ketika keputusan paling kritikal dibuat?"
    });
    var segG = L.segmen(D.jawatan.kumpulan.map(function (k) { return { id: k.id, label: k.label }; }).concat([{ id: "lembaga", label: "Anggota Lembaga" }]),
      kump, function (id) { kump = id; lukisG(); }, { kelas: "" });
    var gb = el("div");
    kad1.body.appendChild(segG);
    kad1.body.appendChild(el("div", { style: "height:12px" }));
    kad1.body.appendChild(gb);
    function lukisG() {
      L.clear(gb);
      segG.querySelectorAll(".segmen-btn").forEach(function (b) { b.classList.toggle("aktif", b.getAttribute("data-id") === kump); });
      var rows, warna, ms;
      if (kump === "lembaga") {
        rows = D.anggotaLembaga.orang; warna = "#0ea5a4"; ms = D.anggotaLembaga.ms;
      } else {
        var K = D.jawatan.kumpulan.filter(function (k) { return k.id === kump; })[0];
        rows = K.orang; warna = K.warna; ms = K.ms;
      }
      gb.appendChild(L.gantt({
        dari: "2011-01-01", hingga: "2022-08-01",
        baris: rows.map(function (o) {
          return { nama: o.nama, mula: o.mula, tamat: o.tamat, warna: o.politik ? "#c0392b" : warna, politik: o.politik, tamatAwal: o.tamatAwal, nota: o.nota };
        }),
        penanda: [
          { t: "2018-02-09", label: "Mesyuarat khas hibah 2017" },
          { t: "2018-12-07", label: "Pelan Pemulihan diluluskan" }
        ]
      }));
      gb.appendChild(el("p", { class: "nota-kecil", html: "Sumber: " + L.sumber(ms).outerHTML + ". Tempoh dipotong pada 2011–2022 untuk kejelasan; beberapa pelantikan bermula lebih awal." }));
    }
    lukisG();
    kad1.body.appendChild(L.bacaan(
      "Tiga daripada anggota Lembaga dalam tempoh ini ialah <strong>ahli politik aktif</strong> (ditanda merah): Datuk Seri Abdul Azeez (Pengerusi 2013–2018), Tan Sri Badruddin, dan Datuk Rosni Sohar. Suruhanjaya mendapati keputusan seperti hibah, bayaran haji dan HAFIS <em>\"didorong oleh unsur-unsur politik\"</em>. " + L.sumber(14).outerHTML
    ));
    kad1.body.appendChild(L.amaranTafsir(
      "Laporan <strong>tidak</strong> mendakwa mana-mana individu bertindak untuk kepentingan peribadi. Yang dinyatakan ialah kelemahan struktur: Akta 535 hanya mensyaratkan anggota Lembaga seorang Muslim dan warganegara Malaysia — tiada kriteria kepakaran langsung. " + L.sumber(33).outerHTML
    ));
    w.appendChild(kad1);

    /* Konflik kepentingan */
    var kad2 = L.kad({
      tajuk: "Berapa banyak topi dipakai serentak",
      sub: "Bilangan jawatan pengarah di anak syarikat TH yang dipegang oleh pegawai/anggota Lembaga.",
      kelas: "F", ms: D.jawatanAnakSyarikat.ms,
      soalan: "Bolehkah seorang memberi tumpuan kepada tugas hakiki sambil duduk dalam 23 lembaga pengarah?"
    });
    var org = D.jawatanAnakSyarikat.orang.slice().sort(function (a, b) { return b.syarikat.length - a.syarikat.length; });
    kad2.body.appendChild(L.barMendatar({
      baris: org.map(function (o) {
        return {
          label: o.nama, nilai: o.syarikat.length,
          warna: o.syarikat.length > 5 ? "#d9534f" : "#2f9e8f",
          nota: o.peranan,
          onclick: function () {
            modal(o.nama, [
              el("div", { class: "modal-seksyen" }, [el("h4", { text: "Peranan di LTH" }), el("p", { text: o.peranan }), L.sumber(o.ms)]),
              el("div", { class: "modal-seksyen" }, [
                el("h4", { text: o.syarikat.length + " jawatan di anak syarikat" }),
                el("ul", {}, o.syarikat.map(function (sy) { return el("li", { text: sy }); }))
              ]),
              o.nota ? el("div", { class: "modal-seksyen" }, [el("h4", { text: "Nota" }), el("p", { text: o.nota })]) : null
            ]);
          }
        };
      }),
      fmt: function (v) { return v + " jawatan"; }
    }));
    kad2.body.appendChild(L.bacaan(
      "Garisan merah bermula pada 6 jawatan — kerana TH kini menghadkan kepada <strong>lima</strong> anak syarikat sahaja. " + L.sumber(D.jawatanAnakSyarikat.dasarBaharu.ms).outerHTML + " Ketik mana-mana nama untuk senarai penuh. Perhatikan Datuk Rozaida binti Omar: 23 jawatan sebagai proksi mewakili LTH, sambil menjadi Ketua Pegawai Kewangan Kumpulan."
    ));
    w.appendChild(kad2);

    /* Jawatankuasa */
    var kad3 = L.kad({
      tajuk: "Jawatankuasa yang dibubarkan pada saat kritikal",
      sub: "Kedua-duanya dibubarkan pada 2018 — tahun krisis.",
      kelas: "F", ms: D.jawatankuasa.ms
    });
    kad3.body.appendChild(el("ul", { class: "senarai" }, D.jawatankuasa.dimansuh.map(function (j) {
      return el("li", { html: "<strong>" + j.nama + "</strong> (dibubarkan " + j.tahun + ") — " + j.kesan + " " + L.sumber(j.ms).outerHTML });
    })));
    kad3.body.appendChild(L.bacaan(
      "Punca strukturnya: jawatankuasa penting ini ditubuhkan hanya <strong>secara pentadbiran</strong> di bawah seksyen 11 Akta 535, bukan dikanunkan secara khusus. Sebab itu ia boleh dibubarkan dengan satu keputusan pentadbiran. Suruhanjaya mencadangkan Panel Pelaburan, Jawatankuasa Penasihat Syariah dan Jawatankuasa Urusan Haji <strong>dikanunkan</strong> dalam Akta 535."
    ));
    kad3.body.appendChild(el("p", { class: "nota-kecil", html: "Cadangan komposisi Panel Pelaburan yang dikanunkan: " + D.jawatankuasa.panelCadangan.komposisi.join("; ") + ". " + L.sumber(D.jawatankuasa.panelCadangan.ms).outerHTML }));
    w.appendChild(kad3);

    /* Amaran diabaikan */
    var kad4 = L.kad({
      tajuk: "Dua belas amaran sebelum krisis meletus",
      sub: "Surat dan laporan yang dihantar — dan apa yang berlaku selepasnya.",
      kelas: "F", ms: D.amaran.ms,
      soalan: "Adakah krisis ini tidak dijangka, atau diabaikan?"
    });
    kad4.body.appendChild(L.jadual(
      ["Tarikh", "Daripada", "Kepada", "Perkara", "Apa berlaku"],
      D.amaran.baris.map(function (b) {
        return { sel: [{ t: b.tarikh }, { t: b.dari }, { t: b.kepada }, { t: b.tajuk }, { t: b.tindakan }] };
      })
    ));
    kad4.body.appendChild(L.bacaan(
      "Enam surat BNM dihantar antara 2014 dan 2017 — sebelum krisis 2017. Laporan menyatakan surat-surat ini <em>\"tidak mendapat perhatian yang sewajarnya\"</em>. Laporan Roland Berger disiapkan <strong>sebelum</strong> hibah 2017 diisytiharkan dan tiada rekod ia pernah dibentangkan kepada Lembaga. " + L.sumber(176).outerHTML
    ));
    w.appendChild(kad4);

    /* Model perniagaan */
    var kad5 = L.kad({
      tajuk: "Enam model masa depan yang dipertimbangkan",
      sub: "Lima ditolak. Satu diterima.",
      kelas: "F", ms: D.modelDicadang.ms
    });
    kad5.body.appendChild(el("div", {}, D.modelDicadang.cadangan.map(function (c) {
      return el("div", { class: "syor-item", style: c.diterima ? "border-color:var(--aksen);background:var(--aksen-lembut)" : "" }, [
        el("div", { class: "syor-atas" }, [
          el("span", { class: "syor-no", text: c.sumber }),
          el("span", { class: "syor-tajuk", text: c.tajuk }),
          el("span", { class: "syor-kat", text: c.diterima ? "DITERIMA" : "ditolak" })
        ]),
        el("div", { class: "syor-teks", text: c.pandangan }),
        el("div", { class: "syor-kaki" }, [L.sumber(c.ms)])
      ]);
    })));
    w.appendChild(kad5);

    /* Akad */
    var kad6 = L.kad({
      tajuk: "Akad simpanan bertukar tiga kali — dan kesannya kepada zakat anda",
      sub: "Isu syariah yang paling langsung menyentuh pendeposit.",
      kelas: "F", ms: D.akad.ms
    });
    kad6.body.appendChild(el("div", { class: "krono" }, D.akad.fasa.map(function (f, i) {
      return el("div", { class: "krono-item" }, [
        el("span", { class: "krono-dot", style: "background:" + ["#0ea5a4", "#e8912d", "#2f9e8f"][i] }),
        el("div", { class: "krono-t", text: f.tempoh }),
        el("div", { class: "krono-tajuk", text: f.akad }),
        el("div", { class: "krono-teks", text: f.teks }),
        el("div", { class: "krono-teks", style: "margin-top:5px", html: "<strong>Isu:</strong> " + f.isu }),
        el("div", { class: "krono-kaki" }, [L.sumber(f.ms)])
      ]);
    })));
    kad6.body.appendChild(L.bacaan(
      "Kenapa ini penting kepada pendeposit biasa: di bawah <strong>Mudarabah</strong>, TH membayar zakat bagi pihak anda. Di bawah <strong>Wadi'ah Yad Dhamanah</strong> (2016–2019), TH sebenarnya menjadi peminjam — jadi zakat yang TH bayar ialah zakat perniagaan TH, bukan zakat simpanan anda (2.5%). Pendeposit mungkin menyangka zakat mereka sudah selesai sedangkan secara teknikal ia belum. Perubahan ke <strong>Wakalah</strong> pada Disember 2019 membetulkan keadaan ini."
    ));
    kad6.body.appendChild(L.amaranTafsir(
      "Laporan <strong>tidak</strong> memutuskan sama ada pendeposit berhutang zakat bagi tahun 2016–2019. Suruhanjaya mengesyorkan perkara ini dirujuk kepada Jawatankuasa Muzakarah MKI untuk pandangan hukum. " + L.sumber(196).outerHTML
    ));
    w.appendChild(kad6);

    return w;
  };

  /* =====================================================================
     MODUL 9 — BONUS
     ===================================================================== */
  V.bonus = function () {
    var w = el("div");
    w.appendChild(head("Bonus: ganjaran ketika institusi merugi",
      "Antara 2010 dan 2017, kakitangan TH menerima bonus antara dua hingga tiga belas bulan gaji. Pekeliling Perbendaharaan menetapkan siling panduan <strong>dua bulan</strong>."));

    var B = D.bonusKakitangan;
    var kad1 = L.kad({
      tajuk: "Peruntukan bonus tahunan dan bulan gaji maksimum",
      sub: "Bar = peruntukan RM juta (paksi kiri). Garisan = bulan gaji maksimum (paksi kanan).",
      kelas: "F", ms: B.ms,
      soalan: "Bilakah amalan bonus mula selari semula dengan kemampuan kewangan?"
    });
    kad1.body.appendChild(L.cartaKombo({
      labels: B.baris.map(function (b) { return String(b.tahun); }),
      siri: [
        { nama: "Peruntukan bonus (RM juta)", warna: "#dfa000", data: B.baris.map(function (b) { return b.peruntukan; }) },
        { nama: "Bulan gaji maksimum", warna: "#d9534f", jenis: "garis", paksi: "kanan", data: B.baris.map(function (b) { return b.maxBulan; }) }
      ],
      paksiKanan: true,
      fmtKiri: function (v) { return L.num(v, 0); },
      fmtKanan: function (v) { return L.num(v, 0) + " bln"; },
      fmtTip: function (v) { return L.num(v, 1); },
      tinggi: 310
    }));
    kad1.body.appendChild(L.bacaan(
      "Puncaknya 2014: <strong>RM74 juta</strong> dan sehingga <strong>13 bulan gaji</strong> (11 bulan tahunan + 2 bulan khas). Tahun yang sama, jurang aset–liabiliti TH bertukar negatif buat kali pertama (−RM352 juta). Mulai 2018 bonus dikawal kepada satu bulan sahaja."
    ));
    kad1.body.appendChild(el("p", { class: "nota-kecil", html: "<strong>Siling rasmi:</strong> " + B.siling + " " + L.sumber(B.msSiling).outerHTML }));
    w.appendChild(kad1);

    /* Bonus vs untung vs realiti */
    var BV = D.bonusVsUntung;
    var kad2 = L.kad({
      tajuk: "Bonus dibenarkan atas 'keuntungan' — tetapi keuntungan yang mana?",
      sub: "Justifikasi bonus ialah peratusan keuntungan (1.7%–2.5%). Bandingkan dengan kedudukan aset sebenar.",
      kelas: "F", ms: BV.ms
    });
    var thn = BV.baris.map(function (b) { return String(b.tahun); });
    var pasca = thn.map(function (t) {
      var r = D.kewangan.baris.filter(function (k) { return String(k.tahun) === t; })[0];
      return r ? r.pascaAgih : null;
    });
    kad2.body.appendChild(L.cartaKombo({
      labels: thn,
      siri: [
        { nama: "Keuntungan bersih dilapor (RM juta)", warna: "#2f9e8f", data: BV.baris.map(function (b) { return b.untungBersih; }) },
        { nama: "Kedudukan aset selepas hibah (RM juta)", warna: "#d9534f", data: pasca },
        { nama: "Peruntukan bonus (RM juta)", warna: "#dfa000", jenis: "garis", data: BV.baris.map(function (b) { return b.bonus; }) }
      ],
      fmtKiri: function (v) { return L.num(v / 1000, 1) + "b"; },
      fmtTip: function (v) { return juta(v); },
      tinggi: 320
    }));
    kad2.body.appendChild(L.jadual(
      ["Tahun", { t: "Untung bersih dilapor", kanan: 1 }, { t: "Bonus", kanan: 1 }, { t: "Bonus/untung", kanan: 1 }, "Taburan"],
      BV.baris.map(function (b) {
        return {
          sel: [
            { t: String(b.tahun) },
            { t: L.num(b.untungBersih), kanan: true },
            { t: L.num(b.bonus), kanan: true },
            { t: L.num(b.nisbah, 1) + "%", kanan: true },
            { t: b.taburan }
          ]
        };
      })
    ));
    kad2.body.appendChild(L.bacaan(
      "Bar hijau (keuntungan dilapor) sentiasa positif dan besar. Bar merah (kedudukan aset selepas hibah) sentiasa negatif dari 2014. Kedua-duanya menerangkan tahun yang sama. Suruhanjaya menyimpulkan: <em>\"pemberian bonus dengan jumlah yang tinggi oleh LTH adalah tidak wajar\"</em> — dan puncanya ialah TH menilai asetnya berdasarkan " + L.istilah("RAV").outerHTML + " yang menunjukkan keuntungan besar sepanjang tahun. " + L.sumber(102).outerHTML
    ));
    kad2.body.appendChild(L.amaranTafsir(
      "Angka 'keuntungan bersih dilapor' di jadual ini <strong>berbeza</strong> daripada angka keuntungan RM3,412 juta yang PwC laraskan bagi 2017. Ini kerana kedua-duanya diambil daripada jadual berlainan dalam laporan dengan takrifan berbeza (keuntungan bersih lawan keuntungan tahun). Jangan campurkan kedua-duanya."
    ));
    w.appendChild(kad2);

    /* TH Properties */
    D.bonusTHProperties.forEach(function (T) {
      var kad = L.kad({
        tajuk: T.tajuk,
        sub: "Diluluskan " + T.tarikhLulus + " oleh " + T.badanLulus + ".",
        kelas: "F", ms: T.ms
      });
      kad.body.appendChild(el("div", { class: "stats" }, [
        L.stat(L.rm(T.jumlah), "Jumlah bonus istimewa", T.penerima.length + " penerima.", "var(--merah)"),
        L.stat(L.rm(T.penerima[0].jumlah), "Bonus terbesar", T.penerima[0].nama),
        L.stat("Melanggar undang-undang", "Pandangan guaman", T.pelanggaran, "var(--merah)")
      ]));
      kad.body.appendChild(el("div", { style: "height:12px" }));
      kad.body.appendChild(L.barMendatar({
        baris: T.penerima.map(function (p) {
          return { label: p.nama, nilai: p.jumlah, warna: T.hadir.some(function (h) { return h.indexOf(p.nama.replace(/^(Datuk|Dato'|Haji|Encik|Puan)\s+/, "")) >= 0; }) ? "#d9534f" : "#94a3b8" };
        }),
        fmt: function (v) { return L.rm(v); }
      }));
      kad.body.appendChild(L.bacaan(
        "<strong>Bar merah</strong> menandakan penerima yang juga <strong>hadir dalam mesyuarat yang meluluskan bonus itu</strong>: " + T.hadir.join("; ") + ".<br><br><strong>Alasan yang diberi:</strong> " + T.alasan
      ));
      w.appendChild(kad);
    });

    var kadN = L.kad({ tajuk: "Apa yang Suruhanjaya syorkan", kelas: "F", ms: 107 });
    kadN.body.appendChild(el("ul", { class: "senarai" }, [
      el("li", { html: "<strong>Hentikan</strong> amalan pemberian bonus yang terlalu tinggi kepada kakitangan. " + L.sumber(195).outerHTML }),
      el("li", { html: "<strong>Dapatkan semula</strong> bonus yang telah diberi kepada ahli Lembaga dan Pengurusan TH Properties, memandangkan ia diberikan tanpa mematuhi peraturan. " + L.sumber(107).outerHTML }),
      el("li", { html: "Lembaga Pengarah TH Properties sendiri telah memutuskan pada <strong>12 Ogos 2020</strong> untuk mendapatkan kembali bonus 2017–2018. " + L.sumber(152).outerHTML })
    ]));
    w.appendChild(kadN);

    return w;
  };

  /* =====================================================================
     MODUL 10 — AKAUNTABILITI
     ===================================================================== */
  V.akauntabiliti = function () {
    var w = el("div");
    w.appendChild(head("Akauntabiliti: siapa yang menanggung akibat?",
      "Empat laporan polis, enam aduan SPRM, lima pegawai dikenakan tindakan tatatertib. Modul ini menjejak setiap satu sehingga status terakhir yang dicatat dalam laporan."));

    /* Polis */
    var kad1 = L.kad({ tajuk: "Empat laporan polis", kelas: "F", ms: D.laporanPolis.ms });
    kad1.body.appendChild(el("div", {}, D.laporanPolis.baris.map(function (b) {
      return el("div", { class: "syor-item" }, [
        el("div", { class: "syor-atas" }, [
          el("span", { class: "syor-no", text: b.tarikh }),
          el("span", { class: "syor-tajuk", text: b.repot }),
          el("span", { class: "syor-kat", text: b.pengadu.split("(")[0].trim() })
        ]),
        el("div", { class: "syor-teks", text: b.isu }),
        el("div", { class: "syor-kaki" }, [el("strong", { text: "Status: " }), el("span", { text: b.status })])
      ]);
    })));
    kad1.body.appendChild(L.bacaan(
      "Dua daripada empat laporan sudah dirujuk kepada Jabatan Peguam Negara untuk arahan Pendakwa Raya. Dua lagi tersekat kerana siasatan <strong>rentas sempadan</strong> — PDRM perlu kebenaran pihak berkuasa Indonesia sebelum boleh merekod kenyataan saksi di sana."
    ));
    kad1.body.appendChild(L.amaranTafsir(
      "Laporan polis ialah <strong>aduan</strong>, bukan pertuduhan atau sabitan. Setakat laporan RCI ini ditulis (Julai 2022), <strong>tiada</strong> pendakwaan dicatatkan bagi mana-mana daripada empat laporan ini."
    ));
    w.appendChild(kad1);

    /* Tatatertib */
    var T = D.tatatertib;
    var kad2 = L.kad({
      tajuk: "Tindakan tatatertib: keputusan, rayuan, dan ke mana mereka pergi",
      sub: "Lima pegawai pengurusan, empat kluster isu.",
      kelas: "F", ms: T.ms,
      soalan: "Apa hasil akhir tindakan tatatertib terhadap pegawai yang terlibat?"
    });
    kad2.body.appendChild(el("div", { class: "kawalan-label", text: "Empat kluster isu" }));
    kad2.body.appendChild(el("ul", { class: "senarai" }, T.kluster.map(function (k) {
      return el("li", { html: "<strong>Kluster " + k.id + ":</strong> " + k.tajuk });
    })));
    kad2.body.appendChild(el("div", { style: "height:12px" }));
    kad2.body.appendChild(L.jadual(
      ["Pegawai", { t: "Kluster", kanan: 1 }, "Keputusan Jawatankuasa Tatatertib", "Selepas rayuan"],
      T.kes.map(function (k) {
        return {
          sel: [
            { t: k.pegawai }, { t: String(k.kluster), kanan: true },
            { t: k.keputusan }, { t: k.rayuan }
          ]
        };
      })
    ));
    kad2.body.appendChild(el("div", { style: "height:14px" }));
    kad2.body.appendChild(el("div", { class: "kawalan-label", text: "Ke mana mereka sekarang" }));
    var unik = {};
    T.kes.forEach(function (k) { if (k.kini !== "—") unik[k.pegawai] = k; });
    kad2.body.appendChild(el("ul", { class: "senarai" }, Object.keys(unik).map(function (n) {
      return el("li", { html: "<strong>" + n + "</strong> — dahulu " + unik[n].jawatanAsal + ". Kini: " + unik[n].kini });
    })));
    kad2.body.appendChild(L.bacaan(
      "Corak yang jelas: <strong>setiap</strong> hukuman buang kerja dikurangkan kepada turun pangkat selepas rayuan. Semua lima pegawai <strong>masih bertugas</strong> dengan LTH atau anak syarikatnya. Empat daripada lima berpindah ke anak syarikat (TH Plantations, TH Properties, TH Hotel & Residence)."
    ));
    var lambat = T.kes.filter(function (k) { return k.lambatBulan; });
    kad2.body.appendChild(L.barMendatar({
      baris: lambat.map(function (k) {
        return { label: "Kluster " + k.kluster + " — " + k.pegawai.split(" ").slice(0, 3).join(" "), nilai: k.lambatBulan, warna: "#e8912d", nota: "bulan antara surat representasi dan mesyuarat Jawatankuasa Tatatertib" };
      }),
      fmt: function (v) { return v + " bulan"; }
    }));
    kad2.body.appendChild(el("p", { class: "nota-kecil", html: T.pemerhatian + " " + L.sumber(T.msPemerhatian).outerHTML }));
    w.appendChild(kad2);

    /* SPRM */
    var kad3 = L.kad({ tajuk: "Enam aduan kepada SPRM", kelas: "F", ms: D.laporanSPRM.ms });
    kad3.body.appendChild(el("ul", { class: "senarai" }, D.laporanSPRM.baris.map(function (b) { return el("li", { text: b }); })));
    kad3.body.appendChild(el("p", { class: "nota-kecil", text: D.laporanSPRM.status }));
    kad3.body.appendChild(L.amaranTafsir("Semua item di atas ialah <strong>dakwaan</strong> yang dilaporkan kepada SPRM. Laporan RCI tidak membuat sebarang penemuan bersalah terhadap mana-mana individu berhubung dakwaan ini."));
    w.appendChild(kad3);

    /* Mahkamah */
    var kad4 = L.kad({ tajuk: "Kes mahkamah dan timbang tara yang masih berjalan", kelas: "F", ms: 164 });
    kad4.body.appendChild(el("ul", { class: "senarai" }, [
      el("li", { html: "<strong>PT TH Indo Plantations</strong> — isu berbangkit daripada penjualan pegangan ekuiti kepada PT Borneo Pacific." }),
      el("li", { html: "<strong>Al-Rawda</strong> — timbang tara berhubung empat hotel di Makkah dan Madinah; Al-Rawda mendakwa perjanjian bertentangan syariah, dinafikan keras oleh LTH." }),
      el("li", { html: "<strong>Emrail / Lingkaran Hartaniaga</strong> — didaftarkan di Asian International Arbitration Centre pada 22 April 2022. " + L.sumber(141).outerHTML }),
      el("li", { html: "<strong>Wellspring Worldwide</strong> — notis kebankrapan terhadap Promoters dibenarkan Mahkamah pada 25 Januari 2022. " + L.sumber(142).outerHTML })
    ]));
    w.appendChild(kad4);

    /* Saksi */
    var kad5 = L.kad({ tajuk: "Bagaimana Suruhanjaya mengumpul bukti", kelas: "F", ms: 9 });
    kad5.body.appendChild(el("div", { class: "stats" }, [
      L.stat("45", "saksi beri Akuan Berkanun", "Di bawah Akta Akuan Berkanun 1960."),
      L.stat("16", "saksi dipanggil beri keterangan", "Prosiding tertutup di Kompleks Islam Putrajaya."),
      L.stat("8", "agensi beri taklimat", "Termasuk BNM, JAN, MOF, PwC, EY, Roland Berger, UJSB."),
      L.stat("6 bulan", "tempoh siasatan", "20 Januari – 19 Julai 2022.")
    ]));
    kad5.body.appendChild(el("p", { class: "nota-kecil", html: "Semua ekshibit <strong>diklasifikasikan RAHSIA</strong> dan tidak diterbitkan bersama laporan. Yang tersedia untuk umum hanyalah naratif laporan — itulah satu-satunya sumber dashboard ini." }));
    w.appendChild(kad5);

    return w;
  };

  /* =====================================================================
     MODUL 11 — SYOR
     ===================================================================== */
  V.syor = function () {
    var w = el("div");
    w.appendChild(head("25 syor Suruhanjaya",
      "Ini bahagian laporan yang paling boleh diambil tindakan. Tapis mengikut kategori atau mengikut <em>siapa</em> yang perlu bertindak."));

    var tapisK = "semua", tapisS = "semua";
    var kats = {}, kepadas = {};
    D.syor.forEach(function (s) { kats[s.kategori] = 1; (s.kepada.split("/")).forEach(function (x) { kepadas[x.trim()] = 1; }); });

    var kad = L.kad({
      tajuk: "Senarai penuh syor (4.4.1 – 4.4.25)",
      sub: "Setiap syor berpaut kembali kepada muka surat asalnya dalam laporan.",
      kelas: "F", ms: 192
    });
    var kawal = el("div", { class: "kawalan" }, [
      el("div", { class: "kawalan-baris" }, [
        el("span", { class: "kawalan-label", text: "Kategori" }),
        L.segmen([{ id: "semua", label: "Semua" }].concat(Object.keys(kats).map(function (k) { return { id: k, label: k }; })), tapisK, function (id) { tapisK = id; lukis(); })
      ]),
      el("div", { class: "kawalan-baris" }, [
        el("span", { class: "kawalan-label", text: "Siapa perlu bertindak" }),
        L.segmen([{ id: "semua", label: "Semua" }].concat(Object.keys(kepadas).map(function (k) { return { id: k, label: k }; })), tapisS, function (id) { tapisS = id; lukis(); })
      ])
    ]);
    var senarai = el("div");
    var kiraan = el("p", { class: "nota-kecil" });
    kad.body.appendChild(kawal);
    kad.body.appendChild(kiraan);
    kad.body.appendChild(senarai);

    function lukis() {
      kawal.querySelectorAll(".segmen").forEach(function (sg, i) {
        var cur = i === 0 ? tapisK : tapisS;
        sg.querySelectorAll(".segmen-btn").forEach(function (b) { b.classList.toggle("aktif", b.getAttribute("data-id") === cur); });
      });
      L.clear(senarai);
      var list = D.syor.filter(function (s) {
        return (tapisK === "semua" || s.kategori === tapisK) && (tapisS === "semua" || s.kepada.indexOf(tapisS) >= 0);
      });
      kiraan.textContent = "Memaparkan " + list.length + " daripada " + D.syor.length + " syor.";
      list.forEach(function (s) {
        senarai.appendChild(el("div", { class: "syor-item", id: "syor-" + s.no }, [
          el("div", { class: "syor-atas" }, [
            el("span", { class: "syor-no", text: s.no }),
            el("span", { class: "syor-tajuk", text: s.tajuk }),
            el("span", { class: "syor-kat", text: s.kategori })
          ]),
          el("div", { class: "syor-teks", text: s.teks }),
          el("div", { class: "syor-kaki" }, [
            el("span", { text: "Perlu tindakan: " + s.kepada }),
            el("span", { text: "· Keutamaan " + "●".repeat(s.berat) }),
            L.sumber(s.ms)
          ])
        ]));
      });
    }
    lukis();
    w.appendChild(kad);

    /* Taburan */
    var kad2 = L.kad({ tajuk: "Ke mana beban tindakan jatuh", sub: "Bilangan syor mengikut penerima.", kelas: "T" });
    var kira = {};
    D.syor.forEach(function (s) { s.kepada.split("/").forEach(function (x) { x = x.trim(); kira[x] = (kira[x] || 0) + 1; }); });
    kad2.body.appendChild(L.barMendatar({
      baris: Object.keys(kira).sort(function (a, b) { return kira[b] - kira[a]; }).map(function (k) {
        return { label: k, nilai: kira[k], warna: "#2f9e8f" };
      }),
      fmt: function (v) { return v + " syor"; }
    }));
    kad2.body.appendChild(L.bacaan(
      "Beban paling berat jatuh kepada <strong>LTH sendiri</strong> dan <strong>Kerajaan</strong>. Banyak syor memerlukan <strong>pindaan Akta 535</strong> — bermakna ia tidak boleh dilaksanakan tanpa melalui Parlimen. Kategori pengiraan: satu syor dikira sekali bagi setiap penerima yang disebut, jadi jumlahnya melebihi 25."
    ));
    kad2.body.appendChild(L.amaranTafsir(
      "Dashboard ini <strong>tidak</strong> menjejak sama ada mana-mana syor telah dilaksanakan. Laporan RCI bertarikh 19 Julai 2022 dan tidak mengandungi maklumat pelaksanaan selepas tarikh itu. Untuk status semasa, rujuk pengumuman rasmi Kerajaan dan LTH."
    ));
    w.appendChild(kad2);

    return w;
  };

  /* =====================================================================
     MODUL 12 — SUMBER & KAEDAH
     ===================================================================== */
  V.sumber = function () {
    var w = el("div");
    w.appendChild(head("Sumber, kaedah dan batasan",
      "Dashboard yang baik mesti boleh diperiksa. Halaman ini menerangkan dari mana setiap nombor datang, apa yang dikira sendiri, dan apa yang tidak boleh dipercayai bulat-bulat."));

    var kad1 = L.kad({ tajuk: "Satu sumber sahaja", kelas: "F" });
    kad1.body.appendChild(el("p", { html: "Semua data dalam dashboard ini diekstrak daripada satu dokumen: <strong>Laporan Suruhanjaya Siasatan Diraja bagi Menyiasat Isu Pengurusan dan Operasi Lembaga Tabung Haji dari Tahun 2014 hingga 2020</strong>, bertarikh 19 Julai 2022, 240 muka surat." }));
    kad1.body.appendChild(el("p", { html: "Teks penuh (hasil OCR): <a href='" + D.REPO + "' target='_blank' rel='noopener'>github.com/SyahmiRafsan/rci-tabunghaji</a>" }));
    kad1.body.appendChild(el("p", { html: "<strong>Tiada data luar digunakan.</strong> Tiada harga pasaran semasa, tiada statistik ekonomi, tiada laporan tahunan LTH. Jika sesuatu nombor tiada dalam laporan, ia tiada dalam dashboard ini." }));
    kad1.body.appendChild(el("div", { class: "kawalan-label", style: "margin-top:14px", text: "Setiap cip m/s membuka muka surat asal" }));
    kad1.body.appendChild(el("p", { class: "nota-kecil", html: "Contoh: " + L.sumber(109).outerHTML + " membuka muka surat bercetak 109 (PDF 147) dalam teks laporan. Nombor muka surat bercetak digunakan kerana itulah yang tercetak dalam laporan; anchor PDF dikira sebagai ms + 38." }));
    w.appendChild(kad1);

    var kad2 = L.kad({ tajuk: "Empat kelas maklumat", sub: "Setiap kad dalam dashboard ini dilabel dengan salah satu daripadanya.", kelas: "F" });
    Object.keys(L.KELAS).forEach(function (k) {
      var m = L.KELAS[k];
      kad2.body.appendChild(el("div", { class: "kv" }, [
        el("span", {}, [L.tag(k)]),
        el("span", { style: "font-weight:400;text-align:left;flex:1;margin-left:12px", text: m.d })
      ]));
    });
    kad2.body.appendChild(L.bacaan(
      "Aturan yang dipegang: <strong>tiada nombor dicipta</strong>. Apabila dashboard mengira sesuatu (contohnya jumlah kerugian 14 pelaburan, atau peratus susutan hartanah), ia dilabel " + L.tag("T").outerHTML + " dan formulanya dinyatakan. Apabila anda menggerakkan gelangsar, hasilnya dilabel " + L.tag("S").outerHTML + " dan tidak pernah dicampur dengan angka laporan."
    ));
    w.appendChild(kad2);

    var kad3 = L.kad({ tajuk: "Batasan yang anda perlu tahu", kelas: "F" });
    kad3.body.appendChild(el("ul", { class: "senarai" }, [
      el("li", { html: "<strong>Ekshibit dirahsiakan.</strong> Semua 12 jilid ekshibit — termasuk laporan penuh PwC, Roland Berger, EY dan penyata kewangan beraudit — diklasifikasikan RAHSIA dan tidak diterbitkan. Kita hanya melihat apa yang Suruhanjaya pilih untuk petik." }),
      el("li", { html: "<strong>Sumber ialah OCR.</strong> Teks laporan dijana melalui pengecaman aksara automatik. Beberapa nombor dan nama mungkin mengandungi ralat OCR yang halus (contohnya '1.259.' untuk '1.25%'). Nombor yang kelihatan pelik telah disemak silang dengan penyebutan lain dalam laporan bila boleh." }),
      el("li", { html: "<strong>Terdapat ketidakkonsistenan dalam laporan itu sendiri.</strong> Contoh: tempoh menunggu haji disebut 130 tahun (m/s 198) dan 135 tahun (m/s 170); kos haji 2013 disebut RM15,553 (m/s 21) sedangkan kos 2003 disebut RM15,555 (m/s 165). Dashboard ini memaparkan kedua-duanya dan tidak memilih satu." }),
      el("li", { html: "<strong>Angka tidak selalunya setara.</strong> 'Kerugian' dalam senarai 14 pelaburan bercampur antara rosot nilai berbuku, kerugian tidak nyata, dan jumlah dihapus kira. Ia tidak sepatutnya dijumlahkan tanpa amaran — sebab itulah amaran diberikan setiap kali." }),
      el("li", { html: "<strong>Laporan berhenti pada Julai 2022.</strong> Apa-apa perkembangan selepas itu — pindaan Akta 535, penebusan Sukuk, pendakwaan — tiada dalam sumber ini." }),
      el("li", { html: "<strong>Nombor pihak ketiga tidak boleh disahkan.</strong> Angka PwC, EY dan Roland Berger dipetik oleh Suruhanjaya daripada laporan yang tidak diterbitkan. Kita mempercayai petikan Suruhanjaya, bukan memeriksa kerja perunding." })
    ]));
    w.appendChild(kad3);

    var kad4 = L.kad({ tajuk: "Ekshibit laporan (semuanya dirahsiakan)", kelas: "F", ms: 201 });
    kad4.body.appendChild(el("ul", { class: "senarai" }, D.ekshibit.map(function (e) {
      return el("li", { html: "<strong>" + e.jilid + "</strong> — " + e.isi });
    })));
    w.appendChild(kad4);

    var kad5 = L.kad({ tajuk: "Glosari penuh", sub: "Semua istilah teknikal yang digunakan, diterangkan dalam bahasa biasa.", kelas: "F" });
    var keys = Object.keys(D.glosari).sort();
    kad5.body.appendChild(el("div", {}, keys.map(function (k) {
      return el("div", { class: "kv", style: "flex-direction:column;align-items:flex-start;gap:2px" }, [
        el("span", { style: "font-weight:660;color:var(--aksen)", text: k }),
        el("span", { style: "font-weight:400;text-align:left", text: D.glosari[k] })
      ]);
    })));
    w.appendChild(kad5);

    var kad6 = L.kad({ tajuk: "Suruhanjaya", kelas: "F", ms: 5 });
    kad6.body.appendChild(el("ul", { class: "senarai" }, D.meta.pesuruhjaya.map(function (p) {
      return el("li", { html: "<strong>" + p.nama + "</strong> — " + p.jawatan });
    }).concat([el("li", { html: "<strong>Setiausaha:</strong> " + D.meta.setiausaha })])));
    kad6.body.appendChild(el("p", { class: "nota-kecil", html: "Tempoh kuat kuasa: " + D.meta.tempoh + ". Laporan ditandatangani " + D.meta.tarikhLapor + " dan dipersembahkan kepada KDYMM Yang di-Pertuan Agong pada " + D.meta.tarikhPersembah + "." }));
    w.appendChild(kad6);

    return w;
  };

  window.V = V;
})();
