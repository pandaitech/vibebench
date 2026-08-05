/* =====================================================================
   APP — Peta penerokaan data Laporan RCI Tabung Haji
   Semua carta adalah SVG tulen, responsif, interaktif.
   ===================================================================== */
(function () {
  "use strict";

  var D = window.RCI;

  /* ---------- Utiliti ---------- */
  function el(tag, attrs, kids) {
    if (attrs === undefined && kids === undefined) return document.createElement(tag);
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
    }
    if (kids) {
      var arr = Array.isArray(kids) ? kids : [kids];
      arr.forEach(function (c) {
        if (c === null || c === undefined || c === false) return;
        n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
    }
    return n;
  }
  function sel(s, c) { return c ? c.querySelector(s) : document.querySelector(s); }
  function selAll(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* Format nombor mesra orang awam */
  function num(v, dp) {
    if (v === null || v === undefined || isNaN(v)) return "—";
    dp = dp === undefined ? 0 : dp;
    var neg = v < 0, a = Math.abs(v).toFixed(dp);
    var p = a.split(".");
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return (neg ? "−" : "") + p.join(".");
  }
  function rm(v, unit) {
    if (v === null || v === undefined) return "—";
    if (unit === "bilion") {
      var abs = Math.abs(v);
      if (abs >= 1) return (v < 0 ? "−" : "") + "RM " + num(abs, 2) + " bilion";
      return (v < 0 ? "−" : "") + "RM " + num(abs * 1000, 0) + " juta";
    }
    return (v < 0 ? "−RM " : "RM ") + num(Math.abs(v), 0);
  }
  function pct(v, dp) { return num(v, dp === undefined ? 1 : dp) + "%"; }
  function sumber(ms) {
    if (ms === null || ms === undefined) return null;
    return el("a", {
      class: "src", href: D.SRC(ms), target: "_blank", rel: "noopener",
      title: "Buka muka surat " + ms + " dalam laporan asal"
    }, "m/s " + ms);
  }
  function kelas(k) {
    var m = { F: "Fakta laporan", T: "Data terbitan", A: "Anggaran", S: "Simulasi" }[k];
    if (!m) return null;
    return el("span", { class: "ktag k-" + k, text: m });
  }

  /* ===================================================================
     MODUL 1 — MULA: Hero, KPI, mukadimah
     =================================================================== */
  function modulMula() {
    var root = el("section", { class: "modul modul-mula" });

    /* Hero */
    root.appendChild(el("div", { class: "hero" }, [
      el("div", { class: "hero-kiri" }, [
        el("div", { class: "kicker" }, "Eksplorasi data · Laporan RCI · 19 Julai 2022"),
        el("h1", { html: "Dari 3.4 bilion untung<br>ke 1.4 bilion <em>rugi</em>." }),
        el("p", { class: "intro", html: "Dashboard ini membedah Laporan Suruhanjaya Siasatan Diraja Tabung Haji (2014–2020). Anda boleh klik mana-mana angka untuk lihat sumber, tukar paparan, dan ikut jejak dari gambaran besar ke bukti terperinci. Setiap carta membawa label <b>F</b> (fakta), <b>T</b> (terbitan), <b>A</b> (anggaran) atau <b>S</b> (simulasi)." })
      ]),
      el("div", { class: "hero-kanan" }, [
        el("div", { class: "kad-pertanyaan" }, [
          el("div", { class: "kad-cap" }, "SOALAN UTAMA"),
          el("h2", { text: "Adakah LTH benar-benar untung pada 2017?" }),
          el("p", { html: "Laporan rasmi kata <b>RM 3.4 bilion untung</b>. Analisis PwC yang dipetik RCI tunjukkan angka itu sepatutnya <b>RM 1.4 bilion rugi</b> — perbezaan hampir <b>RM 4.8 bilion</b>." }),
          el("button", { class: "btn-link", onclick: function () { pindah("akaun"); } }, "Lihat perbandingan penuh →")
        ])
      ])
    ]));

    /* KPI ringkas */
    var kpi = el("div", { class: "kpi-grid" });
    [
      { nilai: "RM 88 bilion", label: "Deposit pendeposit", nota: "Jaminan Kerajaan · 21 Mei 2022", ms: 165, kelas: "F" },
      { nilai: "−RM 4.09 bilion", label: "Jurang selepas hibah 2017", nota: "Kiraan PwC yang dipetik RCI", ms: 112, kelas: "F", merah: true },
      { nilai: "RM 742.5 juta", label: "Unjuran HAFIS 2030", nota: "Sekiranya dasar tidak berubah", ms: 96, kelas: "A" },
      { nilai: "RM 27.5 bilion", label: "Sukuk UJSB matang", nota: "Siri 1 (2026) + Siri 2 (2029)", ms: 159, kelas: "F" }
    ].forEach(function (k) {
      kpi.appendChild(el("div", { class: "kpi" + (k.merah ? " kpi-merah" : "") }, [
        el("div", { class: "kpi-baris-atas" }, [
          kelas(k.kelas),
          sumber(k.ms)
        ]),
        el("div", { class: "kpi-nilai", text: k.nilai }),
        el("div", { class: "kpi-label", text: k.label }),
        el("div", { class: "kpi-nota", text: k.nota })
      ]));
    });
    root.appendChild(kpi);

    /* 4 soalan panduan */
    root.appendChild(el("div", { class: "panduan-grid" }, [
      el("h2", { class: "seksyen-tajuk" }, "Empat soalan utama yang boleh anda jawab di sini")
    ]));
    var soalan = el("div", { class: "kad-soalan" });
    [
      { no: "01", tajuk: "Bagaimana LTH boleh catat untung tetapi sebenarnya rugi?", teks: "Banding dua akaun 2017 — yang dilaporkan vs pelarasan PwC.", modul: "akaun" },
      { no: "02", tajuk: "Siapa yang menanggung subsidi jemaah?", teks: "Hibah pendeposit vs subsidi HAFIS — siapa rebut apa dari keuntungan LTH.", modul: "hafis" },
      { no: "03", tajuk: "Apa sebenarnya UJSB?", teks: "Aset RM19.9 bilion dipindah, tapi nilai pasarannya hanya RM9.7 bilion.", modul: "pemulihan" },
      { no: "04", tajuk: "14 pelaburan mana yang gagal?", teks: "Setiap satu ada masalah berbeza — lihat butiran, kerugian, dan status.", modul: "pelaburan" }
    ].forEach(function (s) {
      soalan.appendChild(el("button", { class: "kad-soal", type: "button", onclick: function () { pindah(s.modul); } }, [
        el("span", { class: "kad-soal-no", text: s.no }),
        el("h3", { text: s.tajuk }),
        el("p", { text: s.teks }),
        el("span", { class: "kad-soal-link" }, "Terokai →")
      ]));
    });
    root.appendChild(soalan);

    /* Bingkai keseluruhan */
    root.appendChild(el("div", { class: "bingkai-bacaan" }, [
      el("div", { class: "bb-tajuk" }, "Cara membaca dashboard"),
      el("div", { class: "bb-isi" }, [
        el("p", { html: "<b>Fakta (F)</b> — angka atau kenyataan yang tersurat dalam laporan RCI. <b>Terbitan (T)</b> — kiraan semula (jumlah, beza, peratus). <b>Anggaran (A)</b> — unjuran masa depan yang disebut laporan. <b>Simulasi (S)</b> — dijana oleh anda sendiri di skrin." }),
        el("p", { html: "Tiap-tiap angka penting ada butang <span class='src'>m/s</span> yang membuka muka surat PDF asal. Jangan percaya dashboard — semak sumbernya." }),
        el("p", { html: "<b>Had tafsiran:</b> Dashboard ini meringkaskan hujah RCI, bukan menggantikan pembacaan laporan penuh 240 muka surat. Angka yang dibandingkan kadangkala menggunakan unit berbeza (RM, USD, Riyal Saudi)." })
      ])
    ]));

    return root;
  }

  /* ===================================================================
     MODUL 2 — PETA RANTAI: Bagaimana krisis berlaku
     =================================================================== */
  function modulPeta() {
    var root = el("section", { class: "modul" });
    root.appendChild(tajukModul("Punca → Kesan", "Rantaian krisis", "Bagaimana setiap keputusan dan keadaan saling mengikat sehingga membentuk krisis 2017. Klik nod untuk lihat butiran, atau klik anak panah untuk lompat ke modul berkaitan."));
    root.appendChild(penerangKelas());

    var peta = el("div", { class: "rantai-peta" });
    var i, n = D.rantai.length;
    for (i = 0; i < n; i++) {
      var r = D.rantai[i];
      peta.appendChild(el("button", { class: "rantai-nod", type: "button", onclick: function (idx) { return function () { bukakRantai(idx); }; }(i) }, [
        el("span", { class: "rantai-no", text: String(i + 1).padStart(2, "0") }),
        kelas(r.kelas),
        el("strong", { text: r.tajuk }),
        el("small", { text: r.label + " · " + r.tahun })
      ]));
      if (i < n - 1) peta.appendChild(el("span", { class: "rantai-anak" }, "→"));
    }
    root.appendChild(peta);

    /* Panel butiran */
    var panel = el("div", { class: "rantai-panel" });
    panel.appendChild(el("div", { class: "rp-no" }, "01"));
    panel.appendChild(el("div", { class: "rp-kelas" }, kelas(D.rantai[0].kelas)));
    panel.appendChild(el("h3", { text: D.rantai[0].tajuk }));
    panel.appendChild(el("p", { text: D.rantai[0].butiran }));
    panel.appendChild(el("div", { class: "rp-meta" }, [
      el("span", { text: D.rantai[0].label + " · " + D.rantai[0].tahun }),
      sumber(D.rantai[0].ms)
    ]));
    panel.id = "rantai-panel";
    root.appendChild(panel);

    root.appendChild(notisBingkai("Rantaian ini meringkaskan penemuan Suruhanjaya. Ia tidak membuktikan bahawa satu faktor tunggal menyebabkan semua masalah — ia menunjukkan bagaimana beberapa kelemahan bergabung."));

    return root;
  }
  function bukakRantai(idx) {
    var r = D.rantai[idx];
    var p = document.getElementById("rantai-panel");
    p.innerHTML = "";
    p.appendChild(el("div", { class: "rp-no" }, String(idx + 1).padStart(2, "0")));
    p.appendChild(el("div", { class: "rp-kelas" }, kelas(r.kelas)));
    p.appendChild(el("h3", { text: r.tajuk }));
    p.appendChild(el("p", { text: r.butiran }));
    p.appendChild(el("div", { class: "rp-meta" }, [
      el("span", { text: r.label + " · " + r.tahun }),
      sumber(r.ms)
    ]));
  }

  /* ===================================================================
     MODUL 3 — JURANG ASET: Kewangan 2013-2017
     =================================================================== */
  function modulJurang() {
    var root = el("section", { class: "modul" });
    root.appendChild(tajukModul("Aset vs Liabiliti", "Jurang yang melebar", "Lima tahun (2013-2017) menunjukkan jurang berubah dari lebihan RM2.45 bilion kepada defisit RM4.09 bilion. Tukar paparan untuk lihat sebelum atau selepas agihan hibah."));
    root.appendChild(penerangKelas());

    /* Pemilih */
    var pilih = el("div", { class: "pilihan-tab" });
    [
      { id: "post", label: "Selepas hibah", aktif: true },
      { id: "pre", label: "Sebelum hibah" }
    ].forEach(function (p) {
      pilih.appendChild(el("button", { class: "tab-btn" + (p.aktif ? " aktif" : ""), "data-paparan": p.id, type: "button", text: p.label }));
    });
    root.appendChild(pilih);

    /* Carta utama */
    var carta = el("div", { id: "carta-jurang", class: "carta-bekas carta-tinggi" });
    root.appendChild(carta);

    /* Kad ringkasan di bawah */
    var ringkasan = el("div", { class: "kad-triple" });
    [
      { label: "Jurang 2013 (selepas hibah)", nilai: "+RM 2,450 juta", nota: "Tahun terakhir lebihan.", kelas: "hijau" },
      { label: "Jurang 2017 (selepas hibah)", nilai: "−RM 4,093 juta", nota: "Defisit terbesar dalam tempoh kajian.", kelas: "merah" },
      { label: "Hibah diagih 2014-2017", nilai: "RM 12,652 juta", nota: "4 tahun, RM3.16 bilion purata setahun.", kelas: "oren" }
    ].forEach(function (k) {
      ringkasan.appendChild(el("div", { class: "kad-mini " + k.kelas }, [
        el("div", { class: "km-label", text: k.label }),
        el("div", { class: "km-nilai", text: k.nilai }),
        el("div", { class: "km-nota", text: k.nota })
      ]));
    });
    root.appendChild(ringkasan);

    /* Perbandingan dua tahun */
    root.appendChild(el("h3", { class: "subtajuk" }, "Perubahan tahunan"));
    var tbl = el("div", { class: "jadual-bekas" });
    var tb = el("table", { class: "jadual" }, [
      el("thead", {}, [el("tr", {}, [
        el("th", { text: "Tahun" }),
        el("th", { class: "kanan", text: "Aset" }),
        el("th", { class: "kanan", text: "Liabiliti" }),
        el("th", { class: "kanan", text: "Lebih/(Kurang) sebelum hibah" }),
        el("th", { class: "kanan", text: "Hibah diagih" }),
        el("th", { class: "kanan", text: "Lebih/(Kurang) selepas hibah" })
      ])]),
      el("tbody", {}, D.kewangan.ringkasan_pwc.map(function (r) {
        function cls(v) { return v < 0 ? "kanan merah" : "kanan hijau"; }
        return el("tr", {}, [
          el("td", { class: "tahun", text: r.tahun }),
          el("td", { class: "kanan", text: rm(r.aset, "juta") }),
          el("td", { class: "kanan", text: rm(r.liabiliti, "juta") }),
          el("td", { class: cls(r.surplus_pre), text: rm(r.surplus_pre, "juta") }),
          el("td", { class: "kanan", text: rm(r.hibah, "juta") }),
          el("td", { class: cls(r.surplus_post), text: rm(r.surplus_post, "juta") })
        ]);
      }))
    ]);
    tbl.appendChild(tb);
    root.appendChild(tbl);

    /* Had tafsiran */
    root.appendChild(notisHad("Data ini daripada financial review PwC yang dipetik RCI, bukan Penyata Kewangan rasmi LTH. RCI hanya menyenaraikan analisis PwC sebagai salah satu input; jawatan rasmi LTH ialah jurang itu 'tidak wujud' kerana definisi aset yang berbeza."));

    /* Logik carta */
    setTimeout(function () {
      function luk(paparan) {
        var data = D.kewangan.ringkasan_pwc;
        var key = paparan === "pre" ? "surplus_pre" : "surplus_post";
        var vals = data.map(function (r) { return r[key]; });
        var mx = Math.max.apply(null, vals.map(Math.abs));
        mx = Math.ceil(mx / 1000) * 1000;
        var labelPaparan = paparan === "pre" ? "sebelum hibah" : "selepas hibah";
        var W = 720, H = 320, M = { t: 24, r: 16, b: 38, l: 60 };
        var iw = W - M.l - M.r, ih = H - M.t - M.b;
        var zero = M.t + ih / 2;
        var bw = iw / data.length * 0.6;
        var parts = [];
        /* grid */
        for (var g = -2; g <= 2; g++) {
          var y = M.t + ih / 2 - (g / 2) * ih;
          parts.push("<line x1='" + M.l + "' x2='" + (M.l + iw) + "' y1='" + y + "' y2='" + y + "' class='grid" + (g === 0 ? " grid-0" : "") + "'/>");
          parts.push("<text x='" + (M.l - 8) + "' y='" + (y + 4) + "' class='ax' text-anchor='end'>" + num(g * mx / 2) + "</text>");
        }
        data.forEach(function (r, idx) {
          var cx = M.l + iw * (idx + 0.5) / data.length;
          var v = r[key];
          var ratio = v / mx;
          var h = Math.abs(ratio) * ih / 2;
          var y0 = v >= 0 ? zero - h : zero;
          var warna = v >= 0 ? "var(--hijau)" : "var(--merah)";
          parts.push("<rect x='" + (cx - bw / 2) + "' y='" + y0 + "' width='" + bw + "' height='" + h + "' fill='" + warna + "' rx='3' class='batang'><title>" + r.tahun + ": " + rm(v, "juta") + "</title></rect>");
          parts.push("<text x='" + cx + "' y='" + (v >= 0 ? y0 - 6 : y0 + h + 14) + "' class='nilai-batang' text-anchor='middle'>" + num(v) + "</text>");
          parts.push("<text x='" + cx + "' y='" + (M.t + ih + 22) + "' class='ax' text-anchor='middle'>" + r.tahun + "</text>");
        });
        parts.push("<line x1='" + M.l + "' x2='" + (M.l + iw) + "' y1='" + zero + "' y2='" + zero + "' class='paksi'/>");
        carta.innerHTML = "<div class='carta-judul'>Jurang " + labelPaparan + " (RM juta) <span class='sumber-tag'>" + kelas("F") + " " + sumber(112).outerHTML + "</span></div>";
        carta.appendChild(el("div", { class: "carta-svg", html: "<svg viewBox='0 0 " + W + " " + H + "' preserveAspectRatio='xMidYMid meet' role='img'>" + parts.join("") + "</svg>" }));
        /* Legend */
        carta.appendChild(el("div", { class: "carta-legen" }, [
          el("span", {}, [el("i", { class: "swatch hijau" }), "Lebih"]),
          el("span", {}, [el("i", { class: "swatch merah" }), "Kurang"]),
          el("span", { class: "carta-legen-cat" }, "Pilih butang di atas untuk tukar paparan.")
        ]));
      }
      selAll(".tab-btn", pilih).forEach(function (b) {
        b.addEventListener("click", function () {
          selAll(".tab-btn", pilih).forEach(function (x) { x.classList.remove("aktif"); });
          b.classList.add("aktif");
          luk(b.dataset.paparan);
        });
      });
      luk("post");
    }, 50);

    return root;
  }

  /* ===================================================================
     MODUL 4 — ANGKA 2017: Pertarungan Akaun
     =================================================================== */
  function modulAkaun() {
    var root = el("section", { class: "modul" });
    root.appendChild(tajukModul("Dilaporkan vs Terlaras", "Dua angka, dua cerita", "Pada 2017, LTH catat untung RM3.4 bilion. Analisis PwC yang dipetik RCI menukar angka itu kepada rugi RM1.4 bilion. Mengapa boleh jadi begitu?"));
    root.appendChild(penerangKelas());

    /* Hero perbandingan */
    var hero = el("div", { class: "banding-besar" });
    hero.appendChild(el("div", { class: "banding-kiri" }, [
      el("div", { class: "banding-cap" }, "Laporan rasmi 2017"),
      el("div", { class: "banding-nilai hijau", text: "+ RM 3,412 juta" }),
      el("div", { class: "banding-label" }, "Keuntungan bersih yang dilaporkan"),
      el("div", { class: "banding-nota" }, "Telah diaudit dan ditandatangani oleh KAN pada 16 Julai 2018 dengan 'Emphasis of Matter'.")
    ]));
    hero.appendChild(el("div", { class: "banding-tengah" }, [
      el("div", { class: "banding-panah" }, "→"),
      el("div", { class: "banding-bezza" }, [
        el("span", { text: "BEZA" }),
        el("strong", { text: "RM 4,845 juta" })
      ])
    ]));
    hero.appendChild(el("div", { class: "banding-kanan" }, [
      el("div", { class: "banding-cap" }, "Analisis PwC (dipetik RCI)"),
      el("div", { class: "banding-nilai merah", text: "− RM 1,433 juta" }),
      el("div", { class: "banding-label" }, "Kerugian bersih terlaras"),
      el("div", { class: "banding-nota" }, "Sekiranya MFRS diguna pakai sepenuhnya pada 2017.")
    ]));
    root.appendChild(hero);

    /* Air Terjun */
    root.appendChild(el("h3", { class: "subtajuk" }, "Komponen pelarasan — apa yang berubah?"));
    var cartaAir = el("div", { class: "carta-bekas" });
    root.appendChild(cartaAir);

    setTimeout(function () {
      var data = D.kewangan.akaun_2017.komponen_pelarasan;
      var run = 0, segs = [];
      data.forEach(function (b) {
        if (b.jenis === "t") { segs.push({ b: b, dari: 0, ke: b.nilai, jumlah: true }); run = b.nilai; }
        else { segs.push({ b: b, dari: run, ke: run + b.nilai }); run += b.nilai; }
      });
      var mx = -1e9, mn = 1e9;
      segs.forEach(function (s) { mx = Math.max(mx, s.dari, s.ke); mn = Math.min(mn, s.dari, s.ke); });
      var sp = (mx - mn) || 1; mx += sp * 0.1; mn -= sp * 0.1;
      var W = 720, H = 340, M = { t: 26, r: 16, b: 76, l: 60 };
      var iw = W - M.l - M.r, ih = H - M.t - M.b;
      function y(v) { return M.t + ih - (v - mn) / (mx - mn) * ih; }
      var parts = [];
      for (var g = 0; g <= 4; g++) {
        var v = mn + (mx - mn) * g / 4, yy = y(v);
        parts.push("<line x1='" + M.l + "' x2='" + (M.l + iw) + "' y1='" + yy + "' y2='" + yy + "' class='grid" + (Math.abs(v) < 1 ? " grid-0" : "") + "'/>");
        parts.push("<text x='" + (M.l - 8) + "' y='" + (yy + 4) + "' class='ax' text-anchor='end'>" + num(v) + "</text>");
      }
      var bw = Math.min(58, iw / segs.length * 0.6);
      segs.forEach(function (sg, idx) {
        var cx = M.l + iw * (idx + 0.5) / segs.length;
        var y0 = y(sg.dari), y1 = y(sg.ke);
        var naik = sg.ke >= sg.dari;
        var warna = sg.jumlah ? "var(--biru)" : (naik ? "var(--hijau)" : "var(--merah)");
        var h = Math.abs(y1 - y0);
        parts.push("<rect x='" + (cx - bw / 2) + "' y='" + Math.min(y0, y1) + "' width='" + bw + "' height='" + Math.max(2, h) + "' fill='" + warna + "' rx='2'><title>" + sg.b.item + ": " + num(sg.b.nilai) + "</title></rect>");
        parts.push("<text x='" + cx + "' y='" + (Math.min(y0, y1) - 6) + "' class='nilai-atas' text-anchor='middle'>" + num(sg.b.nilai) + "</text>");
        var label2 = sg.b.item.length > 14 ? sg.b.item.split(" ").reduce(function (acc, w) {
          var last = acc[acc.length - 1] || "";
          if ((last + " " + w).length > 14) acc.push(w);
          else acc[acc.length - 1] = (last + " " + w).trim();
          return acc;
        }, []) : [sg.b.item];
        label2.slice(0, 3).forEach(function (ln, li) {
          parts.push("<text x='" + cx + "' y='" + (M.t + ih + 20 + li * 13) + "' class='ax ax-kecil' text-anchor='middle'>" + ln + "</text>");
        });
        if (idx < segs.length - 1 && !segs[idx + 1].jumlah) {
          parts.push("<line x1='" + (cx + bw / 2) + "' x2='" + (M.l + iw * (idx + 1.5) / segs.length - bw / 2) + "' y1='" + y1 + "' y2='" + y1 + "' class='penghubung'/>");
        }
      });
      parts.push("<line x1='" + M.l + "' x2='" + (M.l + iw) + "' y1='" + y(0) + "' y2='" + y(0) + "' class='paksi'/>");
      cartaAir.innerHTML = "<div class='carta-judul'>Pelarasan 2017 (RM juta) <span class='sumber-tag'>" + sumber(149).outerHTML + "</span></div><div class='carta-svg'><svg viewBox='0 0 " + W + " " + H + "' preserveAspectRatio='xMidYMid meet'>" + parts.join("") + "</svg></div>";
    }, 50);

    /* Polisi rosot nilai */
    root.appendChild(el("h3", { class: "subtajuk" }, "Polisi rosot nilai yang bertukar-tukar"));
    root.appendChild(el("p", { class: "petunjuk" }, "FRSIC 14 menetapkan 20% penurunan atau 12 bulan berturut-turut sebagai ambang. LTH ubah polisi dua kali pada 2017 sahaja."));
    var poli = el("div", { class: "polisi-senarai" });
    D.kewangan.perubahan_polisi.forEach(function (p, i) {
      poli.appendChild(el("div", { class: "polisi-bar" }, [
        el("span", { class: "polisi-tahun", text: p.fasa }),
        el("span", { class: "polisi-ambang", text: p.label })
      ]));
    });
    root.appendChild(poli);

    /* Kesimpulan dengan had tafsiran */
    root.appendChild(notisHad([
      "Pelarasan ini analisis PwC yang dipetik RCI, bukan Penyata Kewangan rasmi LTH. RCI tidak menyuruh kita menolak angka yang dilaporkan — tetapi menunjukkan bahawa dengan piawaian penuh, ceritanya berbeza.",
      "Perubahan polisi rosot nilai pada 2017 tidak semestinya salah dari segi teknikal, tetapi kombinasi dengan RAV (nilai boleh direalisasikan) membuat angka untung lebih tinggi daripada yang sepatutnya.",
      "Hibah 4.50% + 1.75% pada 2017 menelan belanja RM2.75 bilion — diagih selepas Sijil Audit Bersih diterbitkan, walaupun teguran material wujud."
    ]));

    return root;
  }

  /* ===================================================================
     MODUL 5 — HIBAH vs HAFIS: Pertarungan subsidi
     =================================================================== */
  function modulHafis() {
    var root = el("section", { class: "modul" });
    root.appendChild(tajukModul("Hibah vs HAFIS", "Dua tuntutan, satu sumber", "Pendeposit mahu hibah yang tinggi. Jemaah mahu kos haji yang rendah. Kedua-duanya datang dari keuntungan pelaburan LTH. Setiap tahun, LTH perlu memilih siapa yang lebih banyak dapat."));
    root.appendChild(penerangKelas());

    /* Hero */
    root.appendChild(el("div", { class: "banding-besar banding-tigakol" }, [
      el("div", { class: "banding-kiri" }, [
        el("div", { class: "banding-cap" }, "HIBAH · 2014-2017"),
        el("div", { class: "banding-nilai oren", text: "RM 12,652 j" }),
        el("div", { class: "banding-label" }, "Jumlah diagihkan kepada pendeposit"),
        el("div", { class: "banding-nota" }, "Kadar 6.25% turun ke 4.50% (tahunan) dan 2% turun ke 1.75% (haji).")
      ]),
      el("div", { class: "banding-kanan" }, [
        el("div", { class: "banding-cap" }, "HAFIS · 2014-2019"),
        el("div", { class: "banding-nilai merah", text: "RM 1,313 j" }),
        el("div", { class: "banding-label" }, "Subsidi jemaah ditanggung LTH"),
        el("div", { class: "banding-nota" }, "Kos haji sebenar meningkat; bayaran jemaah dikekalkan RM9,980 selama 13 tahun.")
      ])
    ]));

    /* Tab Sejarah / Unjuran */
    var pilih = el("div", { class: "pilihan-tab" });
    [
      { id: "sejarah", label: "Data sebenar 2014-2019", aktif: true },
      { id: "unjuran", label: "Unjuran 2022-2030" },
      { id: "dua", label: "Bandingkan" }
    ].forEach(function (p) {
      pilih.appendChild(el("button", { class: "tab-btn" + (p.aktif ? " aktif" : ""), "data-mod": p.id, type: "button", text: p.label }));
    });
    root.appendChild(pilih);

    /* Carta */
    var carta = el("div", { class: "carta-bekas carta-tinggi" });
    root.appendChild(carta);

    /* Simulator HAFIS */
    root.appendChild(el("h3", { class: "subtajuk" }, "Cuba sendiri: bagaimana HAFIS berubah?"));
    root.appendChild(el("p", { class: "petunjuk" }, "Gera slaid ini untuk lihat apa yang berlaku kalau dasar berubah. Ini adalah simulasi, bukan ramalan."));
    var sim = el("div", { class: "simulator" });
    var simKos = el("input", { type: "range", id: "sim-kos", min: 25000, max: 40000, step: 100, value: 25540 });
    var simBay = el("input", { type: "range", id: "sim-bay", min: 5000, max: 25960, step: 100, value: 12980 });
    var simJml = el("input", { type: "range", id: "sim-jml", min: 10000, max: 60000, step: 1000, value: 30000 });
    var simKosOut = el("output", { id: "sim-kos-out", text: "RM 25,540" });
    var simBayOut = el("output", { id: "sim-bay-out", text: "RM 12,980" });
    var simJmlOut = el("output", { id: "sim-jml-out", text: "30,000" });
    var simPer = el("strong", { id: "sim-per", text: "RM 12,560" });
    var simTot = el("strong", { id: "sim-tot", text: "RM 376.8 juta" });
    var simPct = el("strong", { id: "sim-pct", text: "49.2%" });
    sim.appendChild(el("div", { class: "sim-baris" }, [
      el("label", { text: "Kos haji (RM/orang)" }),
      simKos,
      simKosOut
    ]));
    sim.appendChild(el("div", { class: "sim-baris" }, [
      el("label", { text: "Bayaran jemaah (RM/orang)" }),
      simBay,
      simBayOut
    ]));
    sim.appendChild(el("div", { class: "sim-baris" }, [
      el("label", { text: "Bilangan jemaah" }),
      simJml,
      simJmlOut
    ]));
    sim.appendChild(el("div", { class: "sim-keputusan" }, [
      el("div", { class: "sim-k-col" }, [
        el("span", { class: "sim-k-label", text: "Subsidi per jemaah" }),
        simPer
      ]),
      el("div", { class: "sim-k-col" }, [
        el("span", { class: "sim-k-label", text: "Jumlah HAFIS setahun" }),
        simTot
      ]),
      el("div", { class: "sim-k-col" }, [
        el("span", { class: "sim-k-label", text: "Bahagian kos ditanggung LTH" }),
        simPct
      ])
    ]));
    sim.appendChild(el("div", { class: "sim-peringatan" }, [
      el("strong", { text: "Bandingkan:" }),
      el("p", { html: "Pada 2014, HAFIS cuma <b>RM 106j</b> (38% kos). Pada 2019, dah jadi <b>RM 299j</b> (56%). RCI unjur <b>RM 742j</b> pada 2030 jika dasar tidak berubah." })
    ]));
    root.appendChild(sim);

    /* Jadual kepekatan deposit */
    root.appendChild(el("h3", { class: "subtajuk" }, "Kepekatan deposit — siapa yang paling terkesan?"));
    var kep = el("div", { class: "konsentrasi" });
    var data = [
      { label: "5% pendeposit teratas", nilai: 75, label2: "pegang 75% daripada deposit", warna: "var(--merah)" },
      { label: "20% pendeposit", nilai: 25, label2: "pegang 95% daripada deposit", warna: "var(--oren)" },
      { label: "65% pendeposit", nilai: 0.2, label2: "pegang ≤RM2,000 setiap satu", warna: "var(--hijau)" }
    ];
    var mxN = 75;
    data.forEach(function (d) {
      kep.appendChild(el("div", { class: "hbar" }, [
        el("div", { class: "hbar-atas" }, [
          el("span", { class: "hbar-label", text: d.label }),
          el("span", { class: "hbar-nilai", text: d.label2 })
        ]),
        el("div", { class: "hbar-trek" }, [
          el("div", { class: "hbar-isi", style: "width:" + (d.nilai / mxN * 100) + "%; background:" + d.warna })
        ])
      ]));
    });
    root.appendChild(kep);

    /* Notis */
    root.appendChild(notisHad([
      "Pendeposit besar (5%) yang memiliki 75% deposit akan keluar dulu jika hibah rendah — dan memang berlaku pada 2019 (deflasi RM4 bilion).",
      "Subsidi HAFIS diambil daripada keuntungan LTH. Jika kos haji naik tanpa kenaikan bayaran, HAFIS makan keuntungan yang sepatutnya diagihkan sebagai hibah.",
      "Kadar RM9,980 dikekalkan selama 13 tahun (2009-2021) atas dasar politik, walaupun kos sebenar meningkat setiap tahun. RCI mengesyorkan supaya subsidi hanya untuk yang memerlukan."
    ]));

    /* Logik carta & simulator */
    setTimeout(function () {
      function luk(mod) {
        var sejarah = D.hafis.sejarah.map(function (r) { return { y: r.tahun, c: r.kos, p: r.bayaran, h: r.hafis_per, t: r.total }; });
        var unjuran = D.hafis.unjuran.map(function (r) { return { y: r.tahun, c: r.kos, p: r.bayaran, h: r.hafis_per, t: r.total }; });
        var all = mod === "sejarah" ? sejarah : (mod === "unjuran" ? unjuran : sejarah.concat([{ y: 2020 }, { y: 2021 }]).concat(unjuran));
        var mx = 40000;
        var W = 720, H = 360, M = { t: 30, r: 16, b: 40, l: 60 };
        var iw = W - M.l - M.r, ih = H - M.t - M.b;
        var parts = [];
        for (var g = 0; g <= 4; g++) {
          var yv = mx * g / 4, yy = M.t + ih - yv / mx * ih;
          parts.push("<line x1='" + M.l + "' x2='" + (M.l + iw) + "' y1='" + yy + "' y2='" + yy + "' class='grid'/>");
          parts.push("<text x='" + (M.l - 8) + "' y='" + (yy + 4) + "' class='ax' text-anchor='end'>" + num(yv) + "</text>");
        }
        all.forEach(function (r, i) {
          if (r.c === undefined) return;
          var cx = M.l + iw * (i + 0.5) / all.length;
          var y0 = M.t + ih;
          var yc = M.t + ih - r.c / mx * ih;
          var yp = M.t + ih - (r.p || 12980) / mx * ih;
          /* shaded area = HAFIS */
          parts.push("<rect x='" + (cx - iw / all.length / 2) + "' y='" + yc + "' width='" + (iw / all.length) + "' height='" + (yp - yc) + "' fill='var(--kuning-lembut)' opacity='0.8'><title>Tahun " + r.y + ": HAFIS = " + num(r.h) + " / jemaah</title></rect>");
          parts.push("<circle cx='" + cx + "' cy='" + yc + "' r='4' fill='var(--teal)'><title>Kos " + num(r.c) + "</title></circle>");
          if (r.p !== undefined) {
            parts.push("<line x1='" + cx + "' x2='" + cx + "' y1='" + yp + "' y2='" + yc + "' stroke='var(--oren)' stroke-width='2' stroke-dasharray='3 3'/>");
            parts.push("<circle cx='" + cx + "' cy='" + yp + "' r='4' fill='var(--oren)'><title>Bayaran jemaah " + num(r.p) + "</title></circle>");
          }
          if (i % 1 === 0) parts.push("<text x='" + cx + "' y='" + (M.t + ih + 22) + "' class='ax' text-anchor='middle'>" + r.y + "</text>");
        });
        parts.push("<line x1='" + M.l + "' x2='" + (M.l + iw) + "' y1='" + (M.t + ih) + "' y2='" + (M.t + ih) + "' class='paksi'/>");
        var labelMode = mod === "sejarah" ? "Data sebenar 2014-2019" : (mod === "unjuran" ? "Unjuran RCI 2022-2030" : "Perbandingan 2014-2030");
        carta.innerHTML = "<div class='carta-judul'>Kos haji, bayaran jemaah & subsidi HAFIS (RM/orang) <span class='sumber-tag'>" + kelas("F") + " " + sumber(96).outerHTML + "</span></div>";
        carta.appendChild(el("div", { class: "carta-svg", html: "<svg viewBox='0 0 " + W + " " + H + "' preserveAspectRatio='xMidYMid meet'>" + parts.join("") + "</svg>" }));
        carta.appendChild(el("div", { class: "carta-legen" }, [
          el("span", {}, [el("i", { class: "swatch teal" }), "Kos haji"]),
          el("span", {}, [el("i", { class: "swatch oren" }), "Bayaran jemaah"]),
          el("span", {}, [el("i", { class: "swatch kuning" }), "HAFIS (subsidi)"])
        ]));
        if (mod === "dua") {
          var div = el("div", { class: "zon-pemisah" });
          div.appendChild(el("p", { html: "<b>2020-2021:</b> Tiada haji akibat COVID-19." }));
          carta.appendChild(div);
        }
      }
      selAll(".tab-btn", pilih).forEach(function (b) {
        b.addEventListener("click", function () {
          selAll(".tab-btn", pilih).forEach(function (x) { x.classList.remove("aktif"); });
          b.classList.add("aktif");
          luk(b.dataset.mod);
        });
      });
      luk("sejarah");

      function kemas() {
        var k = +simKos.value, b = +simBay.value, j = +simJml.value;
        var gap = Math.max(0, k - b);
        var pctv = k > 0 ? gap / k * 100 : 0;
        var tot = gap * j / 1e6;
        simKosOut.textContent = "RM " + num(k);
        simBayOut.textContent = "RM " + num(b);
        simJmlOut.textContent = num(j);
        simPer.textContent = "RM " + num(gap);
        simTot.textContent = "RM " + num(tot, 1) + " juta";
        simPct.textContent = pct(pctv, 1);
      }
      simKos.addEventListener("input", kemas);
      simBay.addEventListener("input", kemas);
      simJml.addEventListener("input", kemas);
    }, 50);

    return root;
  }

  /* ===================================================================
     MODUL 6 — PEMULIHAN: UJSB & Sukuk
     =================================================================== */
  function modulPemulihan() {
    var root = el("section", { class: "modul" });
    root.appendChild(tajukModul("Pemulihan 2018-2030", "Aset dipindah, hutang dikutip", "Pada 27 Disember 2018, LTH pindahkan RM19.9 bilion aset ke UJSB — syarikat baharu milik penuh Kerajaan. Nilai pasarannya cuma RM9.7 bilion. Beza RM10.2 bilion itu jadi tanggungan Sukuk yang perlu dibayar balik."));
    root.appendChild(penerangKelas());

    /* Hero visual */
    var hero = el("div", { class: "pemindahan-hero" });
    [
      { label: "Nilai pasaran pada 2018", nilai: "RM 9.7 bilion", nota: "Jika dijual hari itu", warna: "var(--oren)" },
      { label: "Premium untuk LTH", nilai: "+ RM 10.2 bilion", nota: "Penutup jurang defisit", warna: "var(--teal)" },
      { label: "Nilai pindahan ke UJSB", nilai: "RM 19.9 bilion", nota: "Buku, bukan pasaran", warna: "var(--merah)" }
    ].forEach(function (k) {
      hero.appendChild(el("div", { class: "pem-kotak" }, [
        el("div", { class: "pem-label", text: k.label }),
        el("div", { class: "pem-nilai", style: "color:" + k.warna, text: k.nilai }),
        el("div", { class: "pem-nota", text: k.nota })
      ]));
      if (k.label === "Nilai pasaran pada 2018") hero.appendChild(el("div", { class: "pem-panah" }, "→"));
      if (k.label === "Premium untuk LTH") hero.appendChild(el("div", { class: "pem-panah" }, "→"));
    });
    root.appendChild(hero);

    /* Pecahan aset */
    root.appendChild(el("h3", { class: "subtajuk" }, "Apa yang dipindahkan?"));
    var pecah = el("div", { class: "pecahan-grid" });
    D.ujsb.pemindahan.forEach(function (p) {
      if (p.jumlah) return;
      var prem = p.nilai_pindahan - p.nilai_pasaran;
      var pctPrem = (prem / p.nilai_pindahan * 100).toFixed(0);
      pecah.appendChild(el("div", { class: "pecah-kad" }, [
        el("div", { class: "pecah-cap", text: p.kategori }),
        el("div", { class: "pecah-angka" }, [
          el("div", {}, [el("span", { class: "pecah-l", text: "Unit" }), el("strong", { text: p.unit })]),
          el("div", {}, [el("span", { class: "pecah-l", text: "Pasaran" }), el("strong", { text: rm(p.nilai_pasaran, "juta") })]),
          el("div", {}, [el("span", { class: "pecah-l", text: "Pindahan" }), el("strong", { text: rm(p.nilai_pindahan, "juta") })]),
          el("div", {}, [el("span", { class: "pecah-l", text: "Premium" }), el("strong", { style: "color:" + (prem > 0 ? "var(--merah)" : "var(--hijau)"), text: "+" + pct(pctPrem, 0) })])
        ])
      ]));
    });
    root.appendChild(pecah);

    /* Sukuk */
    root.appendChild(el("h3", { class: "subtajuk" }, "Sukuk UJSB — bom jangka panjang"));
    var sukukGrid = el("div", { class: "sukuk-grid" });
    [
      { siri: "Siri 1", nominal: "RM 10 bilion", matang: "RM 13.2 bilion", tahun: 2026, tempoh: 7, yield: 4.05, warna: "var(--teal)" },
      { siri: "Siri 2", nominal: "RM 9.6 bilion", matang: "RM 14.3 bilion", tahun: 2029, tempoh: 10, yield: 4.10, warna: "var(--oren)" }
    ].forEach(function (s) {
      sukukGrid.appendChild(el("div", { class: "sukuk-kad" }, [
        el("div", { class: "sukuk-siri", style: "background:" + s.warna, text: s.siri }),
        el("div", { class: "sukuk-badan" }, [
          el("div", {}, [el("span", { text: "Dilanggan" }), el("strong", { text: s.nominal })]),
          el("div", {}, [el("span", { text: "Nilai matang" }), el("strong", { text: s.matang })]),
          el("div", {}, [el("span", { text: "Yield" }), el("strong", { text: s.yield + "%" })]),
          el("div", {}, [el("span", { text: "Tempoh" }), el("strong", { text: s.tempoh + " tahun" })]),
          el("div", {}, [el("span", { text: "Matang" }), el("strong", { text: s.tahun })])
        ])
      ]));
    });
    root.appendChild(sukukGrid);
    root.appendChild(el("div", { class: "sukuk-jumlah" }, [
      el("span", { text: "Jumlah nilai matang: " }),
      el("strong", { text: "RM 27.5 bilion" }),
      el("span", { text: " · LTH dijangka terima RM 840j setahun deferred income." })
    ]));

    /* Komitmen Jaminan */
    root.appendChild(el("h3", { class: "subtajuk" }, "Komitmen Jaminan Kerajaan — UJSB vs badan lain"));
    var kom = el("div", { class: "komitmen-bekas" });
    var mxKom = 0; D.ujsb.komitmen_jaminan.forEach(function (k) { mxKom = Math.max(mxKom, k.rm_2020, k.rm_2021); });
    D.ujsb.komitmen_jaminan.forEach(function (k) {
      var w2020 = k.rm_2020 / mxKom * 100;
      var w2021 = k.rm_2021 / mxKom * 100;
      kom.appendChild(el("div", { class: "kbar" + (k.sorot ? " kbar-sorot" : "") }, [
        el("div", { class: "kbar-atas" }, [
          el("span", { class: "kbar-label", text: k.entiti + (k.sorot ? " ← UJSB" : "") }),
          el("span", { class: "kbar-nilai" }, [el("b", { text: num(k.rm_2021) }), el("small", { text: " RM j" })])
        ]),
        el("div", { class: "kbar-trek" }, [
          el("div", { class: "kbar-isi 2020", style: "width:" + w2020 + "%" }),
          el("div", { class: "kbar-isi 2021", style: "width:" + w2021 + "%; margin-top:2px" })
        ])
      ]));
    });
    kom.appendChild(el("div", { class: "kbar-legen" }, [
      el("span", {}, [el("i", { style: "background:#3fb8a5" }), "2020"]),
      el("span", {}, [el("i", { style: "background:#1d5f9e" }), "2021"])
    ]));
    root.appendChild(kom);

    /* Bluechip saham mewah */
    root.appendChild(el("h3", { class: "subtajuk" }, "Saham mewah yang dipindah — nilai susut sehingga 60%"));
    var bc = el("div", { class: "carta-bekas" });
    root.appendChild(bc);
    setTimeout(function () {
      var data = D.ujsb.bluechip;
      var mx = 0; data.forEach(function (d) { mx = Math.max(mx, d.pindah_total); });
      var W = 720, H = 280, M = { t: 30, r: 16, b: 50, l: 130 };
      var iw = W - M.l - M.r, ih = H - M.t - M.b;
      var parts = [];
      data.forEach(function (d, i) {
        var y = M.t + i * ih / data.length + 4;
        var h = ih / data.length - 8;
        var wP = d.pindah_total / mx * iw;
        var wM = d.pasaran_total / mx * iw;
        parts.push("<text x='" + (M.l - 8) + "' y='" + (y + h / 2 + 4) + "' class='ax' text-anchor='end'>" + d.ticker + "</text>");
        parts.push("<rect x='" + M.l + "' y='" + y + "' width='" + wP + "' height='" + h + "' fill='var(--oren)' opacity='0.3'/>");
        parts.push("<rect x='" + M.l + "' y='" + y + "' width='" + wM + "' height='" + h + "' fill='var(--merah)'/>");
        parts.push("<text x='" + (M.l + wP + 4) + "' y='" + (y + h / 2 + 4) + "' class='ax ax-kecil' text-anchor='start' fill='var(--merah)'>−" + d.drop + "%</text>");
        parts.push("<title>" + d.ticker + ": pindah " + num(d.pindah_total) + " / pasaran " + num(d.pasaran_total) + " (" + d.drop + "% susut)</title>");
      });
      bc.innerHTML = "<div class='carta-judul'>Saham bluechip pada harga pindahan vs 31 Dis 2018 (RM juta) <span class='sumber-tag'>" + sumber(159).outerHTML + "</span></div><div class='carta-svg'><svg viewBox='0 0 " + W + " " + H + "' preserveAspectRatio='xMidYMid meet'>" + parts.join("") + "</svg></div><div class='carta-legen'><span><i class='swatch oren'></i>Nilai pindahan</span><span><i class='swatch merah'></i>Nilai pasaran 31/12/2018</span></div>";
    }, 50);

    /* Notis */
    root.appendChild(notisHad([
      "Sukuk UJSB berkupon sifar — tiada bayaran faedah tahunan. LTH 'diakru' RM840j setahun yang baru boleh direalisasikan bila aset UJSB dilupuskan atau Sukuk ditebus.",
      "Tanggungan Sukuk menyumbang hampir 26% pendapatan tahunan LTH dan 31% daripada aset dipegang. Jika Sukuk tidak ditebus, Kerajaan perlu menanggung di bawah Seksyen 24 Akta 535.",
      "Nilai pindahan (buku) bukan nilai tunai. Sekiranya UJSB perlu menjual aset sekarang, ia mungkin dapat kurang daripada RM9.7 bilion (nilai pasaran pada 2018 sudah susut)."
    ]));

    return root;
  }

  /* ===================================================================
     MODUL 7 — PELABURAN: 14 kes untuk audit forensik
     =================================================================== */
  function modulPelaburan() {
    var root = el("section", { class: "modul" });
    root.appendChild(tajukModul("14 pelaburan", "Kes yang memerlukan audit forensik", "RCI syor audit forensik untuk 14 pelaburan ini. Setiap satu ada masalah berbeza — saiz, mata wang, jenis risiko. Klik mana-mana untuk lihat butiran."));
    root.appendChild(penerangKelas());

    /* Penapis */
    var filter = el("div", { class: "penapis" });
    [
      { id: "all", label: "Semua 14" },
      { id: "Malaysia", label: "Malaysia" },
      { id: "Luar negara", label: "Luar negara" },
      { id: "besar", label: "Kerugian >RM100j" }
    ].forEach(function (f) {
      filter.appendChild(el("button", { class: "penapis-btn" + (f.id === "all" ? " aktif" : ""), "data-f": f.id, type: "button", text: f.label }));
    });
    var inpCari = el("input", { type: "search", id: "cari-pelaburan", placeholder: "Cari nama atau isu…", class: "penapis-cari" });
    filter.appendChild(inpCari);
    root.appendChild(filter);

    /* Senarai */
    var senarai = el("div", { class: "pel-senarai" });
    var butir = el("aside", { class: "pel-butir" });
    root.appendChild(el("div", { class: "pel-bekas" }, [senarai, butir]));
    var currentFilter = "all", currentQuery = "";

    function renderSenarai() {
      senarai.innerHTML = "";
      D.pelaburan_bermasalah.forEach(function (p) {
        if (currentFilter === "Malaysia" && p.lokasi !== "Malaysia") return;
        if (currentFilter === "Luar negara" && p.lokasi !== "Luar negara") return;
        if (currentFilter === "besar" && (!p.nilai || p.nilai.nilai < 100)) return;
        var hay = (p.nama + " " + p.butiran + " " + p.sektor + " " + p.ringkasan_kerugian).toLowerCase();
        if (currentQuery && hay.indexOf(currentQuery) < 0) return;
        senarai.appendChild(el("button", { class: "pel-bar", type: "button", onclick: function () { renderButir(p); } }, [
          el("div", { class: "pel-bar-loc", text: p.lokasi }),
          el("div", { class: "pel-bar-nama", text: p.nama }),
          el("div", { class: "pel-bar-sektor", text: p.sektor }),
          el("div", { class: "pel-bar-rugi", text: p.ringkasan_kerugian })
        ]));
      });
      if (!senarai.children.length) senarai.appendChild(el("p", { class: "kosong", text: "Tiada padanan." }));
      if (!butir.children.length) renderButir(D.pelaburan_bermasalah[0]);
    }
    function renderButir(p) {
      butir.innerHTML = "";
      butir.appendChild(el("div", { class: "pel-loc", text: p.lokasi + " · " + p.sektor }));
      butir.appendChild(el("h3", { text: p.nama }));
      butir.appendChild(el("div", { class: "pel-rugi", text: p.ringkasan_kerugian }));
      butir.appendChild(el("p", { text: p.butiran }));
      if (p.nilai) {
        butir.appendChild(el("div", { class: "pel-angka" }, [
          el("div", {}, [el("span", { text: p.nilai.label }), el("strong", { text: p.nilai.nilai + " " + p.nilai.mata })])
        ]));
      }
      butir.appendChild(el("div", { class: "pel-status" }, [
        el("span", { class: "pel-status-label", text: "Status semasa:" }),
        el("p", { text: p.status })
      ]));
      butir.appendChild(el("div", { class: "pel-meta" }, [
        sumber(p.ms)
      ]));
    }
    selAll(".penapis-btn", filter).forEach(function (b) {
      b.addEventListener("click", function () {
        selAll(".penapis-btn", filter).forEach(function (x) { x.classList.remove("aktif"); });
        b.classList.add("aktif");
        currentFilter = b.dataset.f;
        renderSenarai();
      });
    });
    var inp = inpCari;
    if (inp) inp.addEventListener("input", function (e) {
      currentQuery = e.target.value.toLowerCase();
      renderSenarai();
    });
    renderSenarai();

    return root;
  }

  /* ===================================================================
     MODUL 8 — TADBIR URUS: Menteri, Lembaga, CEO
     =================================================================== */
  function modulTadbir() {
    var root = el("section", { class: "modul" });
    root.appendChild(tajukModul("Siapa yang membuat keputusan", "Tadbir urus 2014-2022", "Lapan Menteri, tiga Pengerusi, lima CEO, dan berpuluh anggota Lembaga sepanjang tempoh siasatan. RCI memberi perhatian khusus kepada campur tangan politik dan pelantikan ahli politik aktif."));
    root.appendChild(penerangKelas());

    /* Gantt */
    root.appendChild(el("h3", { class: "subtajuk" }, "Garis masa jawatan utama"));
    var gantt = el("div", { class: "gantt" });
    root.appendChild(gantt);
    setTimeout(function () { lukGantt(gantt); }, 50);

    /* Lembaga — penapis politik */
    root.appendChild(el("h3", { class: "subtajuk" }, "Ahli Lembaga 2014-2022"));
    root.appendChild(el("p", { class: "petunjuk" }, "Penanda merah menandakan ahli politik aktif. Klik baris untuk lihat nota."));
    var lem = el("div", { class: "lembaga-senarai" });
    D.tadbir.lembaga.forEach(function (o) {
      var baris = el("div", { class: "lem-baris" + (o.politik ? " lem-politik" : "") }, [
        el("div", { class: "lem-nama" }, [
          el("strong", { text: o.nama }),
          o.politik ? el("span", { class: "pil pil-pol", text: "ahli politik" }) : null
        ]),
        el("div", { class: "lem-peranan", text: o.peranan }),
        el("div", { class: "lem-tempoh", text: o.mula.slice(0, 7) + " → " + o.tamat.slice(0, 7) })
      ]);
      if (o.nota_politik) {
        baris.appendChild(el("div", { class: "lem-nota", text: "🛈 " + o.nota_politik }));
      }
      lem.appendChild(baris);
    });
    root.appendChild(lem);

    /* Penglibatan anak syarikat */
    root.appendChild(el("h3", { class: "subtajuk" }, "Penglibatan berlebihan dalam anak syarikat"));
    var sub = el("div", { class: "kad-triple" });
    D.tadbir.penglibatan_subsidiari.forEach(function (p) {
      sub.appendChild(el("div", { class: "kad-mini merah" }, [
        el("div", { class: "km-label", text: p.nama }),
        el("div", { class: "km-nilai", text: p.syarikat + " anak syarikat" }),
        el("div", { class: "km-nota", text: p.nota })
      ]));
    });
    root.appendChild(sub);

    /* Notis */
    root.appendChild(notisHad([
      "RCI mencadangkan supaya ahli politik aktif dilarang dilantik sebagai Pengerusi/anggota Lembaga dan anak syarikat. Ini akan dimasukkan dalam pindaan Akta 535.",
      "Dua penamatan awal yang dicatatkan (Pengerusi Md Nor & CEO Nik Hasyudeen) berlaku selepas RCI ditubuhkan. Kuasa Menteri untuk menamatkan tanpa sebab wajar dihadkan."
    ]));

    return root;
  }

  function lukGantt(container) {
    var all = [];
    D.tadbir.menteri.forEach(function (m) { all.push({ jenis: "Menteri", nama: m.nama, mula: m.mula, tamat: m.tamat === "kini" ? "2022-12-31" : m.tamat, warna: "#8b5cf6", politik: !!m.politik }); });
    D.tadbir.pengerusi.forEach(function (m) { all.push({ jenis: "Pengerusi", nama: m.nama, mula: m.mula, tamat: m.tamat === "kini" ? "2022-12-31" : m.tamat, warna: "#0f7a6c", tamatAwal: m.tamat_awal, politik: !!m.politik }); });
    D.tadbir.ceo.forEach(function (m) { all.push({ jenis: "CEO", nama: m.nama, mula: m.mula, tamat: m.tamat === "kini" ? "2022-12-31" : m.tamat, warna: "#c97a12", tamatAwal: m.tamat_awal }); });

    var minD = "2013-01-01", maxD = "2023-01-01";
    var t0 = new Date(minD).getTime(), t1 = new Date(maxD).getTime();
    var years = [];
    for (var y = 2013; y <= 2022; y++) years.push(y);

    var sk = el("div", { class: "gantt-skala" });
    years.forEach(function (yy) {
      var p = (new Date(yy + "-01-01").getTime() - t0) / (t1 - t0) * 100;
      sk.appendChild(el("span", { class: "gantt-tahun", style: "left:" + p + "%", text: String(yy).slice(2) }));
    });
    container.appendChild(sk);

    var body = el("div", { class: "gantt-body" });
    all.forEach(function (r) {
      var a = Math.max(t0, new Date(r.mula).getTime());
      var b = Math.min(t1, new Date(r.tamat).getTime());
      var left = (a - t0) / (t1 - t0) * 100;
      var w = (b - a) / (t1 - t0) * 100;
      var lama = ((b - a) / (365.25 * 864e5)).toFixed(1);
      body.appendChild(el("div", { class: "g-baris" }, [
        el("div", { class: "g-nama" }, [
          el("span", { class: "g-jenis", text: r.jenis }),
          el("strong", { text: r.nama }),
          r.tamatAwal ? el("span", { class: "pil pil-awal", text: "ditamatkan awal" }) : null,
          r.politik ? el("span", { class: "pil pil-pol", text: "ahli politik" }) : null
        ]),
        el("div", { class: "g-trek" }, [
          el("div", { class: "g-bar", style: "left:" + left + "%;width:" + w + "%;background:" + r.warna, title: lama + " tahun" })
        ])
      ]));
    });
    container.appendChild(body);
  }

  /* ===================================================================
     MODUL 9 — BONUS: Skandal bonus
     =================================================================== */
  function modulBonus() {
    var root = el("section", { class: "modul" });
    root.appendChild(tajukModul("Bonus 2010-2020", "Ganjaran yang tinggi", "Peruntukan bonus kakitangan LTH melonjak pada 2014 (RM74j) — tahun yang sama hibah tinggi diagih. Selepas 2017, bonus kembali normal. TH Properties membayar bonus tanpa mengikut peraturan pada 2017-2018."));
    root.appendChild(penerangKelas());

    /* Carta bar bonus */
    var carta = el("div", { class: "carta-bekas carta-tinggi" });
    root.appendChild(carta);
    setTimeout(function () {
      var data = D.bonus.staf;
      var mx = 0; data.forEach(function (d) { mx = Math.max(mx, d.peruntukan); });
      var W = 720, H = 280, M = { t: 24, r: 16, b: 40, l: 60 };
      var iw = W - M.l - M.r, ih = H - M.t - M.b;
      var parts = [];
      data.forEach(function (d, i) {
        var cx = M.l + iw * (i + 0.5) / data.length;
        var h = d.peruntukan / mx * ih;
        var y0 = M.t + ih - h;
        var warna = d.sorot ? "var(--merah)" : "var(--teal)";
        parts.push("<rect x='" + (cx - iw / data.length * 0.35) + "' y='" + y0 + "' width='" + (iw / data.length * 0.7) + "' height='" + h + "' fill='" + warna + "' rx='2'><title>" + d.tahun + ": RM " + d.peruntukan + "j (" + d.taburan + ")</title></rect>");
        parts.push("<text x='" + cx + "' y='" + (y0 - 6) + "' class='nilai-atas' text-anchor='middle'>" + d.peruntukan + "</text>");
        parts.push("<text x='" + cx + "' y='" + (M.t + ih + 22) + "' class='ax' text-anchor='middle'>" + d.tahun + "</text>");
      });
      parts.push("<line x1='" + M.l + "' x2='" + (M.l + iw) + "' y1='" + (M.t + ih) + "' y2='" + (M.t + ih) + "' class='paksi'/>");
      carta.innerHTML = "<div class='carta-judul'>Peruntukan bonus kakitangan LTH (RM juta) <span class='sumber-tag'>" + sumber(97).outerHTML + "</span></div><div class='carta-svg'><svg viewBox='0 0 " + W + " " + H + "' preserveAspectRatio='xMidYMid meet'>" + parts.join("") + "</svg></div>";
    }, 50);

    /* TH Properties */
    root.appendChild(el("h3", { class: "subtajuk" }, "TH Properties — bonus tidak ikut规程"));
    root.appendChild(el("p", { class: "petunjuk" }, "Diluluskan oleh Exco yang tiada kuasa — melanggar Akta Syarikat 2016 (Akta 777). RCI cadangkan pulih."));
    var thp = el("div", { class: "kad-banding" });
    [
      { tahun: 2017, kelulusan: "12 April 2017 (Exco)", total: 1148.4, data: D.bonus.th_properties.penerima },
      { tahun: 2018, kelulusan: "23 April 2018 (AGM lewat 7 bulan)", total: 1045, data: D.bonus.thp_australia.penerima }
    ].forEach(function (g) {
      thp.appendChild(el("div", { class: "kad-bonus" }, [
        el("div", { class: "kb-cap" }, [
          el("span", { class: "kb-tahun", text: g.tahun }),
          el("span", { class: "kb-total", text: "RM " + num(g.total) + " · " + g.data.length + " penerima" })
        ]),
        el("div", { class: "kb-kelulusan", text: g.kelulusan }),
        el("table", { class: "kb-meja" }, [
          el("thead", {}, [el("tr", {}, [el("th", { text: "Penerima" }), el("th", { class: "kanan", text: "RM" })])]),
          el("tbody", {}, g.data.map(function (p) {
            return el("tr", {}, [el("td", { text: p.nama }), el("td", { class: "kanan", text: num(p.jumlah) })]);
          }))
        ])
      ]));
    });
    root.appendChild(thp);

    root.appendChild(notisHad("Bonus 2014-2017 dibayar ketika LTH menghadapi defisit. RCI mengesyorkan amalan pemberian bonus terlalu tinggi dihentikan dan bonus TH Properties yang tidak mengikut规程 dipulihkan."));

    return root;
  }

  /* ===================================================================
     MODUL 10 — AKAUNTABILITI: Tatatertib & laporan polis
     =================================================================== */
  function modulAkauntabiliti() {
    var root = el("section", { class: "modul" });
    root.appendChild(tajukModul("Salah laku & tindakan", "Akauntabiliti", "RCI mencatatkan beberapa siri laporan polis, pertuduhan SPRM, dan tindakan tatatertib dalaman. Setiap kluster mewakili satu siasatan berasingan."));
    root.appendChild(penerangKelas());

    /* Kluster */
    var kluster = [
      { no: 1, nama: "PT THIP", tarikh: "2020-05-29", isi: "Penjualan PT TH Indo Plantations", pihak: "SPRM" },
      { no: 2, nama: "Yayasan TH", tarikh: "2019-03-15", isi: "Sumbangan RM 22.12j kepada badan bukan layak", pihak: "SPRM" },
      { no: 3, nama: "Hibah 2017", tarikh: "2020-01-03", isi: "Pengisytiharan agihan keuntungan 2017", pihak: "SPRM" },
      { no: 4, nama: "Tuntutan palsu", tarikh: "2019-01-11", isi: "Tuntutan perbelanjaan tidak wajar", pihak: "SPRM" }
    ];
    var klu = el("div", { class: "kluster-grid" });
    kluster.forEach(function (k) {
      klu.appendChild(el("div", { class: "klu" }, [
        el("div", { class: "klu-no", text: "Kluster " + k.no }),
        el("h4", { text: k.nama }),
        el("div", { class: "klu-tarikh", text: k.tarikh }),
        el("p", { text: k.isi }),
        el("div", { class: "klu-meta" }, [el("span", { text: "Disiasat: " + k.pihak })])
      ]));
    });
    root.appendChild(klu);

    /* Tatatertib */
    root.appendChild(el("h3", { class: "subtajuk" }, "5 pegawai — tindakan tatatertib"));
    var tat = el("table", { class: "jadual" }, [
      el("thead", {}, [el("tr", {}, [
        el("th", { text: "Pegawai" }),
        el("th", { text: "Jawatan" }),
        el("th", { text: "Kluster" }),
        el("th", { text: "Keputusan JT" }),
        el("th", { text: "Keputusan Rayuan" })
      ])]),
      el("tbody", {}, D.tatatertib.pegawai.map(function (p) {
        return el("tr", {}, [
          el("td", { text: p.nama }),
          el("td", { text: p.jawatan }),
          el("td", { text: p.kluster }),
          el("td", { text: p.keputusan }),
          el("td", { text: p.rayuan })
        ]);
      }))
    ]);
    root.appendChild(tat);

    /* Laporan polis */
    root.appendChild(el("h3", { class: "subtajuk" }, "Laporan polis"));
    var lp = el("table", { class: "jadual" }, [
      el("thead", {}, [el("tr", {}, [
        el("th", { text: "Tarikh" }),
        el("th", { text: "Pengadu" }),
        el("th", { text: "Isu" })
      ])]),
      el("tbody", {}, D.tatatertib.laporan_polis.map(function (l) {
        return el("tr", {}, [el("td", { text: l.tarikh }), el("td", { text: l.pengadu }), el("td", { text: l.isu })]);
      }))
    ]);
    root.appendChild(lp);

    root.appendChild(notisHad("RCI mengesyorkan tindakan tegas & segera ke atas setiap laporan polis. Proses tatatertib (19 bulan untuk Kluster 2) dianggap terlalu panjang."));

    return root;
  }

  /* ===================================================================
     MODUL 11 — KRONOLOGI
     =================================================================== */
  function modulKronologi() {
    var root = el("section", { class: "modul" });
    root.appendChild(tajukModul("8 tahun dalam garis masa", "Kronologi 2014-2022", "Setiap peristiwa penting yang membentuk krisis LTH. Penapis mengikut kategori — amaran, keputusan, tindakan, dan latar belakang."));
    root.appendChild(penerangKelas());

    var kategori = ["Semua", "Latar", "Amaran", "Kewangan", "Tadbir", "Subsidi", "Keputusan", "Penubuhan", "Pemulihan", "Penguatkuasaan", "Tatatertib", "Laporan", "Operasi", "Siasatan"];
    var kat = el("div", { class: "kategori-tapis" });
    kategori.forEach(function (k, i) {
      kat.appendChild(el("button", { class: "k-btn" + (i === 0 ? " aktif" : ""), "data-k": k, type: "button", text: k }));
    });
    root.appendChild(kat);

    var tl = el("div", { class: "kronologi" });
    root.appendChild(tl);

    function luk(katAktif) {
      tl.innerHTML = "";
      var filt = katAktif === "Semua" ? D.kronologi : D.kronologi.filter(function (k) { return k.kategori === katAktif; });
      filt.forEach(function (e) {
        tl.appendChild(el("div", { class: "kr-item" }, [
          el("time", { class: "kr-tarikh", text: e.t }),
          el("div", { class: "kr-kat", text: e.kategori }),
          el("h4", { text: e.tajuk }),
          el("p", { text: e.perincian }),
          e.ms ? sumber(e.ms) : null
        ]));
      });
      if (!filt.length) tl.appendChild(el("p", { class: "kosong", text: "Tiada peristiwa untuk kategori ini." }));
    }
    selAll(".k-btn", kat).forEach(function (b) {
      b.addEventListener("click", function () {
        selAll(".k-btn", kat).forEach(function (x) { x.classList.remove("aktif"); });
        b.classList.add("aktif");
        luk(b.dataset.k);
      });
    });
    setTimeout(function () { luk("Semua"); }, 30);

    return root;
  }

  /* ===================================================================
     MODUL 12 — 25 SYOR
     =================================================================== */
  function modulSyor() {
    var root = el("section", { class: "modul" });
    root.appendChild(tajukModul("25 cadangan", "Apa yang RCI syorkan", "Kesemua 25 syor utama yang dimuatkan dalam laporan. Klik kategori untuk tapis."));
    root.appendChild(penerangKelas());

    var katSet = []; D.syor.forEach(function (s) { if (katSet.indexOf(s.kategori) < 0) katSet.push(s.kategori); });
    var kat = el("div", { class: "kategori-tapis" });
    kat.appendChild(el("button", { class: "k-btn aktif", "data-k": "Semua", type: "button", text: "Semua (25)" }));
    katSet.forEach(function (k) {
      kat.appendChild(el("button", { class: "k-btn", "data-k": k, type: "button", text: k + " (" + D.syor.filter(function (s) { return s.kategori === k; }).length + ")" }));
    });
    root.appendChild(kat);

    var grid = el("div", { class: "syor-grid" });
    root.appendChild(grid);

    function luk(katAktif) {
      grid.innerHTML = "";
      var filt = katAktif === "Semua" ? D.syor : D.syor.filter(function (s) { return s.kategori === katAktif; });
      filt.forEach(function (s) {
        var kad = el("div", { class: "syor-kad", id: "syor-" + s.no }, [
          el("div", { class: "syor-atas" }, [
            el("span", { class: "syor-no", text: "#" + s.no }),
            el("span", { class: "syor-kat", text: s.kategori }),
            el("span", { class: "syor-kepada", text: "kepada: " + s.kepada })
          ]),
          el("h4", { text: s.tajuk }),
          el("p", { text: s.teks })
        ]);
        grid.appendChild(kad);
      });
    }
    selAll(".k-btn", kat).forEach(function (b) {
      b.addEventListener("click", function () {
        selAll(".k-btn", kat).forEach(function (x) { x.classList.remove("aktif"); });
        b.classList.add("aktif");
        luk(b.dataset.k);
      });
    });
    setTimeout(function () { luk("Semua"); }, 30);

    return root;
  }

  /* ===================================================================
     MODUL 13 — SUMBER
     =================================================================== */
  function modulSumber() {
    var root = el("section", { class: "modul" });
    root.appendChild(tajukModul("Sumber & kaedah", "Bagaimana dashboard ini dibina", "Setiap angka datang dari Laporan Suruhanjaya Siasatan Diraja. Tiada data ditambah, ditafsir, atau dicipta di luar laporan."));

    root.appendChild(el("div", { class: "kad-penuh" }, [
      el("h3", {}, "Tentang laporan"),
      el("p", { html: "<b>Laporan Suruhanjaya Siasatan Diraja bagi Menyiasat Isu Pengurusan dan Operasi Lembaga Tabung Haji dari Tahun 2014 hingga 2020.</b> Disempurnakan 19 Julai 2022; dibentangkan kepada Yang di-Pertuan Agong pada 30 Ogos 2022. Enam Pesuruhjaya, 45 saksi Akuan Berkanun, 16 saksi lisan, 9 hari prosiding." }),
      el("p", {}, "Teks penuh boleh dibaca di repo asal yang digunakan untuk membina dataset ini: github.com/SyahmiRafsan/rci-tabunghaji."),
      el("h3", {}, "Konvensyen kelas data"),
      el("div", { class: "kelas-grid" }, [
        el("div", {}, [kelas("F"), el("p", { text: "Fakta laporan — angka atau kenyataan tersurat dalam Laporan RCI." })]),
        el("div", {}, [kelas("T"), el("p", { text: "Data terbitan — kiraan semula dashboard (jumlah, beza, peratus) daripada fakta." })]),
        el("div", {}, [kelas("A"), el("p", { text: "Anggaran — unjuran masa depan yang disebut oleh laporan sendiri." })]),
        el("div", {}, [kelas("S"), el("p", { text: "Simulasi — dijana oleh anda sendiri melalui kawalan di skrin. Bukan angka laporan." })])
      ]),
      el("h3", {}, "Had tafsiran"),
      el("p", { html: "Dashboard ini cuba meringkaskan hujah RCI tanpa mengubah maksud. Walau bagaimanapun: <ul><li>Sesetengah angka laporan menggunakan unit berbeza (RM, USD, Riyal Saudi).<br>Ia ditanda dengan jelas di setiap kes.</li><li>Pelarasan 2017 (RM 3.4b untung vs RM 1.4b rugi) adalah analisis PwC yang dipetik RCI — bukan Penyata Kewangan rasmi LTH.</li><li>Unjuran 2022-2030 adalah angka yang RCI sendiri gunakan, bukan ramalan bebas.</li><li>Dashboard tidak menggantikan bacaan 240 muka surat laporan penuh.</li></ul>" }),
      el("h3", {}, "Tentang VibeBench"),
      el("p", { html: "Sebahagian daripada VibeBench — eksperimen membandingkan model AI dalam membina dashboard analitik. Laman ini adalah karya terbahagi untuk model MiniMax-M3." })
    ]));

    return root;
  }

  /* ===================================================================
     SHELL & ROUTER
     =================================================================== */
  function tajukModul(kicker, h2, p) {
    return el("div", { class: "modul-tajuk" }, [
      el("span", { class: "kicker", text: kicker }),
      el("h2", { text: h2 }),
      el("p", { text: p })
    ]);
  }
  function penerangKelas() {
    return el("div", { class: "kelas-penerang" }, [
      el("span", {}, [kelas("F"), " Fakta"]),
      el("span", {}, [kelas("T"), " Terbitan"]),
      el("span", {}, [kelas("A"), " Anggaran"]),
      el("span", {}, [kelas("S"), " Simulasi"])
    ]);
  }
  function notisBingkai(teks) {
    return el("div", { class: "notis-bingkai" }, [
      el("strong", { text: "Bingkai pembacaan" }),
      el("span", { text: teks })
    ]);
  }
  function notisHad(items) {
    if (typeof items === "string") items = [items];
    return el("div", { class: "notis-had" }, [
      el("div", { class: "nh-tajuk" }, "Had tafsiran — apa yang TIDAK boleh disimpulkan"),
      el("ul", {}, items.map(function (t) { return el("li", { text: t }); }))
    ]);
  }

  var MODUL = [
    { id: "mula", label: "Mula", fn: modulMula },
    { id: "peta", label: "Rantai krisis", fn: modulPeta },
    { id: "jurang", label: "Jurang aset", fn: modulJurang },
    { id: "akaun", label: "Akaun 2017", fn: modulAkaun },
    { id: "hafis", label: "Hibah & HAFIS", fn: modulHafis },
    { id: "pemulihan", label: "UJSB & Sukuk", fn: modulPemulihan },
    { id: "pelaburan", label: "14 pelaburan", fn: modulPelaburan },
    { id: "tadbir", label: "Tadbir urus", fn: modulTadbir },
    { id: "bonus", label: "Bonus", fn: modulBonus },
    { id: "akauntabiliti", label: "Akauntabiliti", fn: modulAkauntabiliti },
    { id: "kronologi", label: "Kronologi", fn: modulKronologi },
    { id: "syor", label: "25 syor", fn: modulSyor },
    { id: "sumber", label: "Sumber", fn: modulSumber }
  ];

  var kandungan = el("main", { id: "kandungan" });
  var nav, semasa = null;

  function pindah(id, noScroll) {
    var m = MODUL.filter(function (x) { return x.id === id; })[0];
    if (!m) m = MODUL[0];
    semasa = m.id;
    if (location.hash.slice(1) !== m.id) history.replaceState(null, "", "#" + m.id);
    selAll(".nav-btn", nav).forEach(function (b) {
      var aktif = b.dataset.id === m.id;
      b.classList.toggle("aktif", aktif);
      if (aktif && b.scrollIntoView) b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    });
    kandungan.innerHTML = "";
    kandungan.appendChild(m.fn());
    if (!noScroll) window.scrollTo({ top: 0 });
  }
  window.pindahModul = pindah;

  nav = el("nav", { class: "nav" });
  MODUL.forEach(function (m) {
    nav.appendChild(el("button", { class: "nav-btn", "data-id": m.id, type: "button", onclick: function () { pindah(m.id); } }, m.label));
  });

  var topbar = el("header", { class: "topbar" }, [
    el("div", { class: "topbar-dalam" }, [
      el("a", { class: "tb-logo", href: "#mula" }, [
        el("div", { class: "tb-logo-kotak", text: "TH" }),
        el("div", { class: "tb-logo-teks" }, [
          el("div", { class: "tb-tajuk", text: "RCI Tabung Haji" }),
          el("div", { class: "tb-sub", text: "Penerokaan data 2014-2020" })
        ])
      ]),
      el("button", { class: "tb-menu", "aria-label": "Buka menu", type: "button", onclick: function () { nav.classList.toggle("buka"); } }, "☰")
    ]),
    nav
  ]);

  var kaki = el("footer", { class: "kaki" }, [
    el("p", { html: "Dashboard ini dibina dari <b>Laporan RCI Tabung Haji</b> (19 Julai 2022). Sumber: <a href='" + D.REPO + "' target='_blank' rel='noopener'>github.com/SyahmiRafsan/rci-tabunghaji</a>. Tiada data ditambah di luar laporan." }),
    el("p", { html: "Karya analitik untuk VibeBench. Bukan penerbitan rasmi LTH, Kerajaan Malaysia, atau Suruhanjaya Siasatan Diraja." })
  ]);

  document.body.appendChild(topbar);
  document.body.appendChild(kandungan);
  document.body.appendChild(kaki);

  window.addEventListener("hashchange", function () { pindah(location.hash.slice(1) || "mula", true); });
  pindah(location.hash.slice(1) || "mula", true);

})();
