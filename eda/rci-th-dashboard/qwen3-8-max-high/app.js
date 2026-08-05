/* =========================================================================
   APP — Dashboard EDA Laporan RCI Tabung Haji
   7 pandangan + mod kisah + carian + sistem sumber.
   ========================================================================= */
(function () {
  "use strict";
  var D = window.RCI;
  var C = window.RCIC.charts;
  var state = { view: "kisah", kisah: 0, invFilter: "semua", invSort: "rugi", invOpen: null, syorTema: "Semua", tatKluster: 0 };

  /* ---------------- helpers ---------------- */
  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") el.className = attrs[k];
      else if (k === "html") el.innerHTML = attrs[k];
      else if (k.indexOf("on") === 0) el.addEventListener(k.slice(2), attrs[k]);
      else el.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) {
      if (c == null) return;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return el;
  }
  function fmtJuta(v) {
    var a = Math.abs(v);
    var s = v < 0 ? "−" : "";
    if (a >= 1000) return s + "RM" + trimZ((a / 1000).toFixed(2)) + "b";
    return s + "RM" + trimZ(a.toFixed(a < 10 ? 2 : a < 100 ? 1 : 0)) + "j";
  }
  function trimZ(x) { return x.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1"); }
  function fmtFull(v) { return "RM" + Math.round(v).toLocaleString("en-MY"); }

  function srcChips(srcs) {
    var wrap = h("span", { class: "srcs" });
    (srcs || []).forEach(function (id) {
      var s = D.SRC[id];
      var lab = s ? s.p : id;
      wrap.appendChild(h("button", { class: "src-chip", onclick: function () { openSrc(id); } }, ["📄 " + lab]));
    });
    return wrap;
  }
  function tChip(t) {
    if (!t) return null;
    var map = { F: ["F", "Fakta laporan"], T: ["T", "Data terbitan — dikira daripada angka laporan"], U: ["U", "Unjuran/anggaran dalam laporan"] };
    var m = map[t] || [t, ""];
    return h("span", { class: "tchip t-" + t, title: m[1] }, [m[0]]);
  }
  function termSpan(term, label) {
    return h("span", { class: "term", onclick: function (e) { openGlos(term, e); } }, [label || term]);
  }

  /* ---------------- modal ---------------- */
  var modalEl = null;
  function openModal(node) {
    closeModal();
    modalEl = h("div", { class: "modal-bg", onclick: function (e) { if (e.target === modalEl) closeModal(); } }, [
      h("div", { class: "modal" }, [
        h("button", { class: "modal-x", onclick: closeModal, "aria-label": "Tutup" }, ["✕"]),
        node
      ])
    ]);
    document.body.appendChild(modalEl);
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (modalEl) { modalEl.remove(); modalEl = null; document.body.style.overflow = ""; }
  }
  function openSrc(id) {
    var s = D.SRC[id];
    var box = h("div", { class: "srcbox" }, [
      h("div", { class: "srcbox-k" }, ["SUMBER"]),
      h("h3", {}, [s ? s.p : id]),
      s && s.pdf ? h("div", { class: "srcbox-meta" }, ["Muka surat PDF: " + s.pdf + " · Laporan RCI Tabung Haji"]) : null,
      s && s.q ? h("blockquote", {}, ["“" + s.q + "”"]) : h("p", { class: "muted" }, ["Petikan tidak disimpan untuk rujukan ini — lihat laporan penuh."]),
      h("p", { class: "srcbox-link" }, ["Teks penuh: ", h("a", { href: "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md", target: "_blank", rel: "noopener" }, ["rci-tabung-haji.md"])]),
      h("p", { class: "muted small" }, ["Nota: laporan ini dijana melalui OCR daripada PDF rasmi; ejaan mungkin berbeza sedikit daripada dokumen asal."])
    ]);
    openModal(box);
  }
  function openGlos(term, ev) {
    var def = D.GLOSARI[term];
    if (!def) return;
    openModal(h("div", { class: "srcbox" }, [
      h("div", { class: "srcbox-k" }, ["GLOSARI"]),
      h("h3", {}, [term]),
      h("p", {}, [def])
    ]));
    if (ev) ev.stopPropagation();
  }

  /* ---------------- header / nav ---------------- */
  var NAV = [
    { id: "kisah", label: "Kisah", icon: "M4 5h16v2H4zM4 11h16v2H4zM4 17h10v2H4z" },
    { id: "kewangan", label: "Kewangan", icon: "M4 19V9h3v10H4zm6 0V5h3v14h-3zm6 0v-7h3v7h-3z" },
    { id: "pelaburan", label: "Pelaburan", icon: "M3 17l5-5 4 4 7-8v4h2V5h-7v2h4l-6 7-4-4-6 6z" },
    { id: "ujsb", label: "UJSB", icon: "M12 3l9 6h-2v10h-5v-6h-4v6H5V9H3z" },
    { id: "haji", label: "Haji", icon: "M12 2l2.6 6.9L21 10l-5 4.4L17.5 21 12 17.3 6.5 21 8 14.4 3 10l6.4-1.1z" },
    { id: "tadbir", label: "Tadbir", icon: "M12 4a4 4 0 110 8 4 4 0 010-8zm-8 16c0-3.3 3.6-5 8-5s8 1.7 8 5v1H4z" },
    { id: "syor", label: "Syor", icon: "M9 3h6v2h3v16H6V5h3zm1 6l1.5 1.5L14 8l1.4 1.4L11.5 13.3 8.6 10.4z" }
  ];

  function render() {
    var root = document.getElementById("app");
    root.innerHTML = "";
    root.appendChild(header());
    var main = h("main", { class: "main", id: "main" });
    root.appendChild(main);
    root.appendChild(navbar());
    var fn = { kisah: vKisah, kewangan: vKewangan, pelaburan: vPelaburan, ujsb: vUJSB, haji: vHaji, tadbir: vTadbir, syor: vSyor }[state.view];
    fn(main);
    window.scrollTo(0, 0);
  }

  function header() {
    return h("header", { class: "hdr" }, [
      h("div", { class: "hdr-in" }, [
        h("div", { class: "hdr-t" }, [
          h("div", { class: "hdr-k" }, ["BILIK DATA · RCI TABUNG HAJI"]),
          h("div", { class: "hdr-s" }, ["Siasatan Diraja 2014–2020 · Laporan 30 Ogos 2022"])
        ]),
        h("div", { class: "hdr-btns" }, [
          h("button", { class: "icon-btn", onclick: openSearch, "aria-label": "Cari" }, [
            h("svg", { viewBox: "0 0 24 24", width: "19", height: "19" }, [h("path", { d: "M10 2a8 8 0 105.3 14l5.3 5.4 1.4-1.4-5.3-5.4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z", fill: "currentColor" })])
          ]),
          h("button", { class: "icon-btn", onclick: openAbout, "aria-label": "Tentang" }, [
            h("svg", { viewBox: "0 0 24 24", width: "19", height: "19" }, [h("path", { d: "M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2zm0-8h-2V7h2z", fill: "currentColor" })])
          ])
        ])
      ])
    ]);
  }

  function navbar() {
    var nav = h("nav", { class: "nav" });
    NAV.forEach(function (n) {
      nav.appendChild(h("button", {
        class: "nav-i" + (state.view === n.id ? " on" : ""),
        onclick: function () { go(n.id); }
      }, [
        h("svg", { viewBox: "0 0 24 24", width: "18", height: "18", "aria-hidden": "true" }, [h("path", { d: n.icon, fill: "currentColor" })]),
        h("span", {}, [n.label])
      ]));
    });
    return nav;
  }

  function go(view, anchor) {
    state.view = view;
    location.hash = "#/" + view;
    render();
    if (anchor) {
      setTimeout(function () {
        var el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  }

  function openAbout() {
    openModal(h("div", { class: "srcbox" }, [
      h("div", { class: "srcbox-k" }, ["TENTANG DASHBOARD"]),
      h("h3", {}, ["Bilik Data RCI Tabung Haji"]),
      h("p", {}, ["Dashboard ini ialah alat meneroka data (exploratory data analysis) berdasarkan Laporan Suruhanjaya Siasatan Diraja terhadap pengurusan dan operasi Lembaga Tabung Haji 2014–2020, dipersembahkan kepada KDYMM Yang di-Pertuan Agong pada 30 Ogos 2022."]),
      h("p", {}, ["Semua angka diambil terus daripada laporan. Setiap nombor ada butang sumber (📄) yang menunjukkan perenggan asal. Label kecil menandakan jenis data: ", tChip("F"), " fakta laporan · ", tChip("T"), " dikira semula daripada angka laporan · ", tChip("U"), " unjuran/anggaran laporan."]),
      h("p", {}, ["Dashboard ini tidak menambah data baharu dan tidak membuat kesimpulan undang-undang. Ia alat bantu faham — baca laporan penuh untuk konteks lengkap."]),
      h("p", { class: "srcbox-link" }, ["Sumber: ", h("a", { href: "https://github.com/SyahmiRafsan/rci-tabunghaji", target: "_blank", rel: "noopener" }, ["github.com/SyahmiRafsan/rci-tabunghaji"])]),
      h("h4", {}, ["Pesuruhjaya"]),
      h("ul", { class: "clean" }, D.META.pesuruhjaya.map(function (p) { return h("li", {}, [h("b", {}, [p.nama]), " — " + p.peran]); }))
    ]));
  }

  /* ---------------- search ---------------- */
  function buildIndex() {
    var idx = [];
    D.PELABURAN.forEach(function (p) {
      idx.push({ t: p.nama, d: p.isu, view: "pelaburan", anchor: "inv-" + p.id, tag: "Pelaburan" });
    });
    D.GARISMASA.forEach(function (g) {
      idx.push({ t: g.t + " — " + g.e, d: "", view: "kisah", tag: "Garis masa" });
    });
    D.SYOR.forEach(function (s) {
      idx.push({ t: "Syor " + s.id + ": " + s.teks, d: "Tema: " + s.tema, view: "syor", tag: "Syor" });
    });
    Object.keys(D.GLOSARI).forEach(function (k) {
      idx.push({ t: k, d: D.GLOSARI[k].slice(0, 90) + "…", view: null, tag: "Glosari", glos: k });
    });
    [
      ["Defisit aset-liabiliti 2013–2017 (PwC)", "kewangan", "k-defisit"],
      ["Kadar hibah 2014–2021", "kewangan", "k-hibah"],
      ["RAV vs penyata beraudit 2017", "kewangan", "k-rav"],
      ["Polisi rosot nilai 70%→85%→90%", "kewangan", "k-rav"],
      ["Deposit RM73b → RM69b → RM88b", "kewangan", "k-deposit"],
      ["Bonus kakitangan 2010–2020", "tadbir", "t-bonus"],
      ["Bonus istimewa TH Properties", "tadbir", "t-bonus"],
      ["Laporan polis (4)", "tadbir", "t-akauntabiliti"],
      ["Laporan SPRM (6)", "tadbir", "t-akauntabiliti"],
      ["Tindakan tatatertib (5 pegawai)", "tadbir", "t-akauntabiliti"],
      ["Pemindahan aset RM19.9 bilion", "ujsb", "u-pemindahan"],
      ["Sukuk RM27.5 bilion", "ujsb", "u-sukuk"],
      ["Saham bluechip dipindahkan", "ujsb", "u-blue"],
      ["Hartanah UJSB jatuh nilai", "ujsb", "u-hartanah"],
      ["Komitmen Jaminan Kerajaan", "ujsb", "u-jaminan"],
      ["Kos haji & HAFIS 2014–2019", "haji", "h-sejarah"],
      ["Unjuran HAFIS 2022–2030", "haji", "h-unjuran"],
      ["Tempoh menunggu haji 130 tahun", "haji", "h-fakta"]
    ].forEach(function (x) { idx.push({ t: x[0], d: "", view: x[1], anchor: x[2], tag: "Bahagian" }); });
    return idx;
  }
  var INDEX = null;
  function openSearch() {
    if (!INDEX) INDEX = buildIndex();
    var q = "";
    var listEl = h("div", { class: "s-list" });
    var input = h("input", { class: "s-input", type: "search", placeholder: "Cari: FGV, sukuk, hibah, bonus, Al-Rawda…", oninput: function (e) { q = e.target.value.toLowerCase(); draw(); } });
    function draw() {
      listEl.innerHTML = "";
      var hits = INDEX.filter(function (it) { return !q || (it.t + " " + it.d).toLowerCase().indexOf(q) !== -1; }).slice(0, 40);
      if (!hits.length) listEl.appendChild(h("p", { class: "muted pad" }, ["Tiada padanan."]));
      hits.forEach(function (it) {
        listEl.appendChild(h("button", {
          class: "s-item", onclick: function () {
            closeModal();
            if (it.glos) { openGlos(it.glos); return; }
            if (it.view) go(it.view, it.anchor);
          }
        }, [
          h("span", { class: "s-tag" }, [it.tag]),
          h("span", { class: "s-t" }, [it.t]),
          it.d ? h("span", { class: "s-d" }, [it.d]) : null
        ]));
      });
    }
    draw();
    openModal(h("div", { class: "searchbox" }, [h("div", { class: "srcbox-k" }, ["CARIAN"]), input, listEl]));
    setTimeout(function () { input.focus(); }, 80);
  }

  /* ---------------- common blocks ---------------- */
  function section(id, kicker, title, sub) {
    return h("section", { class: "sec", id: id }, [
      h("div", { class: "sec-h" }, [
        kicker ? h("div", { class: "kicker" }, [kicker]) : null,
        h("h2", {}, [title]),
        sub ? h("p", { class: "sec-sub" }, [sub]) : null
      ])
    ]);
  }
  function card(cls, children) { return h("div", { class: "card " + (cls || "") }, children); }
  function stat(label, value, sub, t) {
    return h("div", { class: "stat" }, [
      h("div", { class: "stat-v" }, [value, t ? tChip(t) : null]),
      h("div", { class: "stat-l" }, [label]),
      sub ? h("div", { class: "stat-s" }, [sub]) : null
    ]);
  }
  function insightBox(kind, title, text) {
    return h("div", { class: "insight " + kind }, [h("b", {}, [title]), h("p", {}, [text])]);
  }
  function chartBox(el, srcs, nota) {
    var box = h("div", { class: "chartbox" }, [el]);
    var foot = h("div", { class: "chart-foot" }, [
      nota ? h("span", { class: "chart-nota" }, [nota]) : null,
      srcChips(srcs)
    ]);
    box.appendChild(foot);
    return box;
  }

  /* ================================================================
     VIEW: KISAH
     ================================================================ */
  function vKisah(root) {
    var steps = D.KISAH;
    var i = Math.min(state.kisah, steps.length - 1);
    var st = steps[i];

    var wrap = h("div", { class: "kisah" });
    // progress
    var prog = h("div", { class: "k-prog" });
    steps.forEach(function (s, k) {
      prog.appendChild(h("button", {
        class: "k-dot" + (k === i ? " on" : k < i ? " done" : ""),
        title: s.tajuk,
        onclick: function () { state.kisah = k; render(); }
      }, [String(k + 1)]));
    });
    wrap.appendChild(prog);
    wrap.appendChild(h("div", { class: "k-count" }, ["Langkah " + (i + 1) + " / " + steps.length]));

    var body = h("div", { class: "k-body" });
    body.appendChild(h("div", { class: "kicker" }, ["MOD KISAH — " + (i + 1) + "/" + steps.length]));
    body.appendChild(h("h1", { class: "k-tajuk" }, [st.tajuk]));
    body.appendChild(h("p", { class: "k-ring" }, [st.ringkas]));

    var chartEl = h("div", { class: "k-chart", id: "kchart" });
    body.appendChild(chartEl);

    var poin = h("ul", { class: "k-poin" });
    st.poin.forEach(function (p) { poin.appendChild(h("li", {}, [p])); });
    body.appendChild(poin);

    body.appendChild(insightBox("awas", "Jangan salah faham", st.caveat));
    body.appendChild(h("div", { class: "k-foot" }, [
      srcChips(st.srcs),
      st.goto ? h("button", { class: "btn", onclick: function () { go(st.goto.view); } }, [st.goto.label + " →"]) : null
    ]));

    var navBtns = h("div", { class: "k-nav" }, [
      h("button", { class: "btn ghost" + (i === 0 ? " dis" : ""), onclick: function () { if (i > 0) { state.kisah = i - 1; render(); } } }, ["← Sebelum"]),
      i < steps.length - 1
        ? h("button", { class: "btn", onclick: function () { state.kisah = i + 1; render(); } }, ["Seterusnya →"])
        : h("button", { class: "btn", onclick: function () { go("kewangan"); } }, ["Mula meneroka sendiri →"])
    ]);
    body.appendChild(navBtns);
    wrap.appendChild(body);
    root.appendChild(wrap);

    renderKisahChart(st.id, chartEl);
  }

  function renderKisahChart(id, el) {
    var K = D.KEWANGAN, U = D.UJSB, HJ = D.HAJI;
    if (id === "asas") {
      var g = h("div", { class: "statgrid" });
      g.appendChild(stat("Deposit (Mei 2022)", "RM88 bilion", "Dijamin Kerajaan (Seksyen 24 Akta 535)", "F"));
      g.appendChild(stat("Pendeposit (Jul 2022)", "8.6 juta", "≈ suku penduduk Malaysia", "F"));
      g.appendChild(stat("Hibah diagih 1966–2021", "RM37.52 bilion", "Termasuk hibah haji", "F"));
      g.appendChild(stat("Jemaah diurus 1963–2021", "1.46 juta", "Subsidi HAFIS RM2.02 bilion sejak 2001", "F"));
      el.appendChild(g);
      el.appendChild(chartBox(h("div", { id: "k-asas-gm" }), ["4.2"], "Ringkasan angka utama daripada laporan"));
    } else if (id === "krisis") {
      var c1 = h("div");
      el.appendChild(chartBox(c1, K.defisit_src, "Aset vs liabiliti (RM juta) — kiraan PwC"));
      var c2 = h("div");
      el.appendChild(chartBox(c2, K.defisit_src, "Lebihan/(kekurangan) sebelum & selepas hibah (RM juta)"));
      setTimeout(function () {
        C.bar(c1, {
          labels: K.defisit_pwc.map(function (r) { return r.y; }),
          series: [
            { name: "Jumlah aset", color: "#0b7a5e", data: K.defisit_pwc.map(function (r) { return r.aset; }) },
            { name: "Jumlah liabiliti + deposit", color: "#c0392b", data: K.defisit_pwc.map(function (r) { return r.liabiliti; }) }
          ],
          yFmt: function (v) { return (v / 1000).toFixed(0) + "b"; }, height: 220,
          tipFn: function (i, s) { var r = K.defisit_pwc[i]; return "<b>" + r.y + "</b><br>Aset: RM" + r.aset.toLocaleString() + " juta<br>Liabiliti: RM" + r.liabiliti.toLocaleString() + " juta<br>" + (r.aset >= r.liabiliti ? "Aset > liabiliti" : "<b style='color:#c0392b'>Aset < liabiliti (defisit)</b>"); }
        });
        C.bar(c2, {
          labels: K.defisit_pwc.map(function (r) { return r.y; }),
          series: [
            { name: "Sebelum agihan", color: "#37474f", data: K.defisit_pwc.map(function (r) { return r.pre; }) },
            { name: "Selepas agihan", color: "#c0392b", data: K.defisit_pwc.map(function (r) { return r.post; }) }
          ],
          yFmt: function (v) { return (v / 1000).toFixed(1) + "b"; }, height: 220,
          tipFn: function (i, s) { var r = K.defisit_pwc[i]; return "<b>" + r.y + "</b><br>Sebelum hibah: " + fmtJuta(r.pre) + "<br>Hibah dibayar: " + fmtJuta(r.hibah) + "<br>Selepas hibah: <b>" + fmtJuta(r.post) + "</b>"; }
        });
      }, 30);
    } else if (id === "hibah") {
      var c1 = h("div");
      el.appendChild(chartBox(c1, K.hibah_kadar_src, "Kadar hibah tahunan + hibah haji (%)"));
      var c2 = h("div");
      el.appendChild(chartBox(c2, ["3.11.7"], "Jumlah hibah dibayar (RM juta)"));
      setTimeout(function () {
        C.bar(c1, {
          labels: K.hibah_kadar.map(function (r) { return r.y; }),
          stacked: true,
          series: [
            { name: "Hibah tahunan", color: "#0b7a5e", data: K.hibah_kadar.map(function (r) { return r.tahunan; }) },
            { name: "Hibah haji", color: "#b98a2f", data: K.hibah_kadar.map(function (r) { return r.haji; }) }
          ],
          yFmt: function (v) { return v + "%"; }, height: 210,
          tipFn: function (i) { var r = K.hibah_kadar[i]; return "<b>" + r.y + "</b><br>Hibah tahunan: " + r.tahunan + "%<br>Hibah haji: " + r.haji + "%<br>Jumlah: " + (r.tahunan + r.haji).toFixed(2) + "%"; }
        });
        C.bar(c2, {
          labels: K.hibah_bayar.map(function (r) { return r.y; }),
          stacked: true,
          series: [
            { name: "Hibah tahunan", color: "#0b7a5e", data: K.hibah_bayar.map(function (r) { return r.tahunan / 1000; }) },
            { name: "Hibah haji", color: "#b98a2f", data: K.hibah_bayar.map(function (r) { return r.haji / 1000; }) }
          ],
          yFmt: function (v) { return "RM" + trimZ(v.toFixed(1)) + "b"; }, height: 210,
          tipFn: function (i) { var r = K.hibah_bayar[i]; return "<b>" + r.y + "</b> (" + r.kadar + "%)<br>Jumlah: <b>RM" + (r.jumlah / 1000).toFixed(2) + " bilion</b>"; }
        });
      }, 30);
    } else if (id === "solek") {
      var w1 = h("div");
      el.appendChild(chartBox(w1, ["3.9.12", "3.9.13"], "Jambatan RAV 2017 (RM juta) vs rosot nilai tidak direkod"));
      var c2 = h("div");
      el.appendChild(chartBox(c2, K.polisi_rosotnilai_src, "Kesan ubah ambang rosot nilai 2017 (RM juta)"));
      setTimeout(function () {
        C.waterfall(w1, {
          steps: [
            { label: "Aset beraudit", total: 70317, nota: "Penyata kewangan diaudit JAN" },
            { label: "+ Pelarasan RAV", value: 4466, nota: "Anggaran pengurusan: anak syarikat, hartanah dll" },
            { label: "Aset RAV", total: 74783 },
            { label: "− Liabiliti", value: -74410 },
            { label: "Baki 'boleh agih'", total: 373, nota: "Hanya RM373 juta — sedangkan rosot nilai tidak direkod RM1,537 juta" }
          ],
          yFmt: function (v) { return (v / 1000).toFixed(0) + "b"; }, vFmt: function (v) { return fmtJuta(v); }, height: 250, padB: 56
        });
        C.bar(c2, {
          labels: [">70% (asal)", ">85%", ">90% (akhir)"],
          series: [{ name: "Rosot nilai perlu direkod", color: "#c0392b", data: K.polisi_rosotnilai.map(function (r) { return r.impak; }) }],
          yFmt: function (v) { return fmtJuta(v); }, height: 200, legend: false,
          tipFn: function (i) { var r = K.polisi_rosotnilai[i]; return "<b>Ambang " + r.ambang + "</b><br>Impak rosot nilai: <b>" + fmtJuta(r.impak) + "</b><br>Polisi diubah dua kali dalam tahun 2017."; }
        });
      }, 30);
    } else if (id === "pelaburan") {
      var c1 = h("div");
      el.appendChild(chartBox(c1, ["3.14"], "Kerugian/rosot nilai yang disebut laporan (RM juta) — tekan untuk butiran"));
      setTimeout(function () {
        var rows = D.PELABURAN.filter(function (p) { return p.rugi; }).sort(function (a, b) { return b.rugi - a.rugi; })
          .map(function (p) { return { label: p.nama.length > 20 ? p.nama.slice(0, 19) + "…" : p.nama, value: p.rugi, color: "#c0392b", id: p.id }; });
        C.hbar(c1, {
          rows: rows, rowH: 30, vFmt: fmtJuta,
          tipFn: function (i, r) { return "<b>" + r.label + "</b><br>" + fmtJuta(r.value); },
          onRowClick: function (i, r) { state.invOpen = r.id; go("pelaburan", "inv-" + r.id); }
        });
      }, 30);
      el.appendChild(insightBox("info", "Nota jumlah", D.PELABURAN_NOTA));
    } else if (id === "ujsb") {
      var c1 = h("div");
      el.appendChild(chartBox(c1, U.pemindahan_src, "Nilai buku vs pemindahan vs pasaran (RM juta)"));
      var g = h("div", { class: "statgrid" });
      g.appendChild(stat("Nilai pemindahan", "RM19.9b", "Nilai pasaran sebenar RM9.7b", "F"));
      g.appendChild(stat("Premium", "RM10.2b", "Melebihi nilai pasaran — menutup defisit", "F"));
      g.appendChild(stat("Sukuk diterima TH", "RM27.56b", "Matang 2026 & 2029; 31% daripada aset TH", "F"));
      g.appendChild(stat("Pendapatan tertunggak", ">RM2.1b", "RM840 juta/tahun, atas kertas sahaja (Dis 2021)", "F"));
      el.appendChild(g);
      setTimeout(function () {
        C.bar(c1, {
          labels: U.pemindahan.map(function (r) { return r.kelas.split(" ")[0]; }),
          series: [
            { name: "Nilai buku TH", color: "#9aa3a0", data: U.pemindahan.map(function (r) { return r.buku; }) },
            { name: "Nilai pemindahan", color: "#0b7a5e", data: U.pemindahan.map(function (r) { return r.pindah; }) },
            { name: "Nilai pasaran", color: "#c0392b", data: U.pemindahan.map(function (r) { return r.pasaran; }) }
          ],
          yFmt: function (v) { return (v / 1000).toFixed(0) + "b"; }, height: 230,
          tipFn: function (i) { var r = U.pemindahan[i]; return "<b>" + r.kelas + "</b><br>Buku: " + fmtJuta(r.buku) + "<br>Pemindahan: <b>" + fmtJuta(r.pindah) + "</b><br>Pasaran: " + fmtJuta(r.pasaran); }
        });
      }, 30);
    } else if (id === "haji") {
      var c1 = h("div");
      el.appendChild(chartBox(c1, ["3.16.3"], "Kos haji seorang jemaah: bayaran vs subsidi (RM)"));
      var c2 = h("div");
      el.appendChild(chartBox(c2, ["3.16.8"], "Unjuran jumlah HAFIS (RM juta/tahun) — label U: unjuran laporan"));
      setTimeout(function () {
        C.bar(c1, {
          labels: HJ.sejarah.map(function (r) { return r.y; }),
          stacked: true,
          series: [
            { name: "Dibayar jemaah", color: "#0b7a5e", data: HJ.sejarah.map(function (r) { return r.bayar; }) },
            { name: "Subsidi (HAFIS)", color: "#c0392b", data: HJ.sejarah.map(function (r) { return r.hafis; }) }
          ],
          yFmt: function (v) { return (v / 1000).toFixed(0) + "k"; }, height: 220,
          tipFn: function (i) { var r = HJ.sejarah[i]; return "<b>" + r.y + "</b><br>Kos sebenar: RM" + r.kos.toLocaleString() + "<br>Jemaah bayar: RM" + r.bayar.toLocaleString() + " (" + r.pct_bayar + "%)<br>TH tanggung: RM" + r.hafis.toLocaleString() + " (" + r.pct_subsidi + "%)"; }
        });
        C.line(c2, {
          labels: HJ.unjuran.map(function (r) { return r.y; }),
          series: [{ name: "Jumlah HAFIS", color: "#c0392b", data: HJ.unjuran.map(function (r) { return r.jumlah; }), area: true, dash: true }],
          yFmt: function (v) { return fmtJuta(v); }, height: 200, legend: false,
          tipFn: function (i) { var r = HJ.unjuran[i]; return "<b>" + r.y + "</b> (unjuran)<br>HAFIS: <b>" + fmtJuta(r.jumlah) + "</b>/tahun<br>Subsidi = " + r.pct_subsidi + "% daripada kos haji"; }
        });
      }, 30);
    } else if (id === "siapa") {
      var c1 = h("div");
      el.appendChild(chartBox(c1, ["3.3.2", "3.4.1"], "Jawatan anak syarikat dipegang serentak oleh seorang individu"));
      var c2 = h("div");
      el.appendChild(chartBox(c2, ["3.12.7"], "Peruntukan bonus kakitangan (RM juta)"));
      setTimeout(function () {
        C.hbar(c1, {
          rows: D.TADBIRURUS.anak_syarikat.map(function (a) { return { label: a.nama.replace(/^(Datuk|Tan Sri|Dato'|Encik)\s+(Seri\s+|Dato'\s+)?/i, "").slice(0, 20), value: a.bil, color: "#3d5a80", sub: a.peran }; }),
          rowH: 34, labelW: 128,
          tipFn: function (i) { var a = D.TADBIRURUS.anak_syarikat[i]; return "<b>" + a.nama + "</b><br>" + a.peran + "<br>" + a.bil + " jawatan anak syarikat" + (a.nota ? "<br><span class='tipn'>" + a.nota + "</span>" : ""); }
        });
        C.bar(c2, {
          labels: D.KEWANGAN.bonus_kakitangan.map(function (b) { return b.y; }),
          series: [{ name: "Peruntukan bonus", color: "#b98a2f", data: D.KEWANGAN.bonus_kakitangan.map(function (b) { return b.peruntukan; }) }],
          yFmt: function (v) { return "RM" + v + "j"; }, height: 200, legend: false,
          tipFn: function (i) { var b = D.KEWANGAN.bonus_kakitangan[i]; return "<b>" + b.y + "</b><br>Peruntukan: RM" + b.peruntukan + " juta<br>Kelulusan MOF: " + b.moft + " bulan<br>Taburan: " + b.taburan; }
        });
      }, 30);
    } else if (id === "hadapan") {
      var tema = {};
      D.SYOR.forEach(function (s) { tema[s.tema] = (tema[s.tema] || 0) + 1; });
      var g = h("div", { class: "statgrid" });
      Object.keys(tema).forEach(function (t) { g.appendChild(stat("Syor — " + t, String(tema[t]), null, "F")); });
      el.appendChild(g);
      el.appendChild(insightBox("info", "Tema paling besar", "Undang-undang & pindaan Akta 535 (" + tema["Undang-undang"] + " syor) — RCI melihat punca utama krisis terletak pada kerangka undang-undang dan tadbir urus, bukan sekadar salah laku individu."));
    }
  }

  /* ================================================================
     VIEW: KEWANGAN
     ================================================================ */
  function vKewangan(root) {
    var K = D.KEWANGAN;
    root.appendChild(h("div", { class: "view-h" }, [
      h("h1", {}, ["Kewangan & Hibah"]),
      h("p", { class: "view-sub" }, ["Nombor-nombor utama krisis: aset vs liabiliti, hibah melebihi kemampuan, dan bagaimana angka dipersembahkan."])
    ]));

    /* --- defisit --- */
    var s1 = section("k-defisit", "BAHAGIAN 1", "Aset vs liabiliti: defisit yang disembunyikan",
      "Kiraan PwC menunjukkan mulai 2015, liabiliti TH (termasuk deposit anda) melebihi asetnya — tetapi hibah tetap diagihkan setiap tahun.");
    var defToggle = h("div", { class: "seg" }, [
      h("button", { class: "seg-b on", "data-m": "al" }, ["Aset vs liabiliti"]),
      h("button", { class: "seg-b", "data-m": "prepost" }, ["Lebihan sebelum/selepas hibah"])
    ]);
    var defChart = h("div");
    s1.appendChild(card("", [defToggle, defChart,
      h("div", { class: "tbl-wrap" }, [tableDefisit()]),
      insightBox("utama", "Apa yang carta ini beritahu", "Pada 2013 TH ada lebihan RM5.08 bilion. Menjelang 2016, sebelum hibah pun sudah defisit RM1.26 bilion. Setiap tahun hibah RM2.9–3.3 bilion tetap dibayar, menjadikan defisit selepas agihan mencecah RM4.1 bilion pada 2016–2017."),
      insightBox("awas", "Apa yang tidak boleh disimpulkan", "Angka ini daripada financial review PwC (bukan audit semula). Defisit 'teknikal' ini tidak bermakna deposit hilang — Kerajaan menjamin deposit melalui Seksyen 24 Akta 535. Ia bermakna hibah yang dibayar bukan datang daripada keuntungan sebenar.")
    ]));
    root.appendChild(s1);
    function drawDef(mode) {
      defToggle.querySelectorAll(".seg-b").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-m") === mode); });
      if (mode === "al") {
        C.bar(defChart, {
          labels: K.defisit_pwc.map(function (r) { return r.y; }),
          series: [
            { name: "Jumlah aset", color: "#0b7a5e", data: K.defisit_pwc.map(function (r) { return r.aset; }) },
            { name: "Jumlah liabiliti + deposit", color: "#c0392b", data: K.defisit_pwc.map(function (r) { return r.liabiliti; }) }
          ],
          yFmt: function (v) { return (v / 1000).toFixed(0) + "b"; }, height: 250,
          tipFn: function (i) { var r = K.defisit_pwc[i]; return "<b>" + r.y + "</b><br>Aset: RM" + r.aset.toLocaleString() + " juta<br>Liabiliti: RM" + r.liabiliti.toLocaleString() + " juta<br>" + (r.pre >= 0 ? "Lebihan " + fmtJuta(r.pre) + " sebelum hibah" : "<b style='color:#c0392b'>Defisit " + fmtJuta(r.pre) + " sebelum hibah</b>"); }
        });
      } else {
        C.bar(defChart, {
          labels: K.defisit_pwc.map(function (r) { return r.y; }),
          series: [
            { name: "Sebelum agihan", color: "#37474f", data: K.defisit_pwc.map(function (r) { return r.pre; }) },
            { name: "Selepas agihan", color: "#c0392b", data: K.defisit_pwc.map(function (r) { return r.post; }) }
          ],
          yFmt: function (v) { return (v / 1000).toFixed(1) + "b"; }, height: 250,
          tipFn: function (i) { var r = K.defisit_pwc[i]; return "<b>" + r.y + "</b><br>Sebelum hibah: " + fmtJuta(r.pre) + "<br>Hibah dibayar: " + fmtJuta(r.hibah) + "<br>Selepas hibah: <b>" + fmtJuta(r.post) + "</b>"; }
        });
      }
    }
    defToggle.addEventListener("click", function (e) {
      var b = e.target.closest(".seg-b"); if (b) drawDef(b.getAttribute("data-m"));
    });
    setTimeout(function () { drawDef("al"); }, 20);

    function tableDefisit() {
      var t = h("table", { class: "tbl" }, [
        h("thead", {}, [h("tr", {}, ["RM juta", "2013", "2014", "2015", "2016", "2017"].map(function (x) { return h("th", {}, [x]); }))]),
        h("tbody", {}, [
          rowT("Jumlah aset", K.defisit_pwc.map(function (r) { return r.aset; })),
          rowT("Jumlah liabiliti", K.defisit_pwc.map(function (r) { return -r.liabiliti; })),
          rowT("Lebihan/(kurang) sebelum hibah", K.defisit_pwc.map(function (r) { return r.pre; }), true),
          rowT("Hibah dibayar", K.defisit_pwc.map(function (r) { return -r.hibah; })),
          rowT("Lebihan/(kurang) selepas hibah", K.defisit_pwc.map(function (r) { return r.post; }), true)
        ])
      ]);
      return t;
      function rowT(label, vals, bold) {
        return h("tr", { class: bold ? "bold" : "" }, [h("td", {}, [label])].concat(vals.map(function (v) {
          return h("td", { class: v < 0 ? "neg" : "" }, [(v < 0 ? "(" : "") + Math.abs(v).toLocaleString("en-MY") + (v < 0 ? ")" : "")]);
        })));
      }
    }

    /* --- hibah --- */
    var s2 = section("k-hibah", "BAHAGIAN 2", "Hibah: berapa, dan melebihi kemampuan berapa?",
      "Hibah ialah keuntungan yang diagih kepada pendeposit. Bandingkan kadar, jumlah dibayar, dan kemampuan sebenar TH pada 2017.");
    var hibChart1 = h("div"), hibChart2 = h("div");
    var kapBox = card("kap", [
      h("div", { class: "kap-t" }, ["KES 2017: DIBAYAR LEBIH DARIPADA MAMPU"]),
      h("div", { class: "kap-grid" }, [
        stat("Kemampuan sebenar (kiraan JAN)", "RM2.70b", "Kadar 4% atas baki minima tahunan", "F"),
        stat("Yang dibayar", "RM3.31b", "Kadar 6.25% atas baki minima bulanan", "F"),
        stat("Kelebihan bayaran", "RM610 juta", "22.5% melebihi kemampuan", "F")
      ]),
      h("p", { class: "muted small" }, ["Untuk membayar lebihan ini, kaedah pengiraan hibah ditukar pada 2017 (purata baki tahunan → bulanan), diumumkan 7 Feb 2018, kemudian ditarik balik selepas reaksi negatif pendeposit."]),
      srcChips(["3.11.10", "3.9.9"])
    ]);
    s2.appendChild(card("", [hibChart1, hibChart2, kapBox]));
    root.appendChild(s2);
    setTimeout(function () {
      C.bar(hibChart1, {
        labels: K.hibah_kadar.map(function (r) { return r.y; }),
        stacked: true,
        series: [
          { name: "Hibah tahunan (%)", color: "#0b7a5e", data: K.hibah_kadar.map(function (r) { return r.tahunan; }) },
          { name: "Hibah haji (%)", color: "#b98a2f", data: K.hibah_kadar.map(function (r) { return r.haji; }) }
        ],
        yFmt: function (v) { return v + "%"; }, height: 220,
        tipFn: function (i) { var r = K.hibah_kadar[i]; return "<b>" + r.y + "</b><br>Tahunan: " + r.tahunan + "% · Haji: " + r.haji + "%<br>Jumlah: <b>" + (r.tahunan + r.haji).toFixed(2) + "%</b>" + (r.y >= 2018 ? "<br><span class='tipn'>Selepas penstrukturan: kadar normal baharu</span>" : ""); }
      });
      C.bar(hibChart2, {
        labels: K.hibah_bayar.map(function (r) { return r.y; }),
        stacked: true,
        series: [
          { name: "Hibah tahunan", color: "#0b7a5e", data: K.hibah_bayar.map(function (r) { return r.tahunan / 1000; }) },
          { name: "Hibah haji", color: "#b98a2f", data: K.hibah_bayar.map(function (r) { return r.haji / 1000; }) }
        ],
        yFmt: function (v) { return "RM" + trimZ(v.toFixed(1)) + "b"; }, height: 220,
        tipFn: function (i) { var r = K.hibah_bayar[i]; return "<b>" + r.y + "</b> — kadar " + r.kadar + "%<br>Tahunan: RM" + r.tahunan.toLocaleString() + " ribu<br>Haji: RM" + r.haji.toLocaleString() + " ribu<br>Jumlah: <b>RM" + (r.jumlah / 1000).toFixed(2) + " bilion</b>"; }
      });
    }, 20);

    /* --- RAV / perakaunan kreatif --- */
    var s3 = section("k-rav", "BAHAGIAN 3", "Bagaimana angka 'dicantikkan'",
      "Tiga mekanisme: (1) kiraan RAV sendiri menggantikan penyata beraudit, (2) polisi rosot nilai diubah supaya kerugian tidak direkod, (3) audit bersih walaupun ada masalah material.");
    var ravW = h("div"), mfrsW = h("div"), polC = h("div");
    s3.appendChild(card("", [
      h("h3", { class: "card-t" }, ["3a. Jambatan RAV 2017 — aset dinaikkan RM4.47 bilion"]),
      chartBox(ravW, ["3.9.12"], "RM juta. 'Baki boleh agih' RM373 juta sahaja — jauh lebih kecil daripada rosot nilai tidak direkod RM1,537 juta."),
      h("div", { class: "statgrid" }, [
        stat("Pelarasan RAV TH Plantations", "RM2.294b", "Daripada penilaian RM4.6b", "F"),
        stat("…dinilai penilai profesional", "RM556 juta", "12% sahaja", "T"),
        stat("…anggaran pengurusan sahaja", "RM4.044b", "88% — tiada penilaian bebas", "T")
      ]),
      srcChips(["3.9.4"])
    ]));
    s3.appendChild(card("", [
      h("h3", { class: "card-t" }, ["3b. Polisi rosot nilai diubah dua kali dalam 2017"]),
      h("p", { class: "muted" }, ["Rosot nilai = ", termSpan("Rosot nilai (impairment)"), " — pengakuan bahawa pelaburan telah jatuh nilai. Piawaian (FRSIC 14): jatuh 20% atau lebih 12 bulan sudah cukup untuk rosot nilai. LTH guna ambang jauh lebih longgar:"],),
      chartBox(polC, K.polisi_rosotnilai_src, "Impak rosot nilai (RM juta) mengikut ambang — polisi ditukar 70% → 85% → 90% dalam tahun yang sama"),
      h("div", { class: "statgrid" }, [
        stat("Rosot nilai sepatutnya (FRS 139)", "RM1.310b", "Aset kewangan 2017", "F"),
        stat("…anak syarikat & bersekutu", "RM227.81 juta", "Termasuk TH Heavy Eng. RM164.58 juta", "F"),
        stat("Jumlah tidak direkod", "RM1.537b", "vs baki RAV RM373 juta", "F"),
        stat("Yang direkod sebenar", "RM1 juta", "Selepas ambang jadi 90%", "F")
      ]),
      srcChips(["3.9.13", "3.9.6"])
    ]));
    s3.appendChild(card("", [
      h("h3", { class: "card-t" }, ["3c. Jika piawaian MFRS dipatuhi: untung RM3.4b jadi rugi RM1.4b"]),
      chartBox(mfrsW, ["3.13.11"], "RM juta — daripada untung dilaporkan kepada kerugian sebenar (kiraan PwC)"),
      insightBox("utama", "Kenapa ini penting", "Penyata kewangan 2017 melaporkan untung RM3.41 bilion dan mendapat Sijil Audit Bersih. Dengan piawaian yang betul, TH sebenarnya rugi RM1.43 bilion, dan kerugian terkumpul RM4.68 bilion. Dalam tempoh yang sama hibah RM3.32 bilion diagihkan."),
      insightBox("awas", "Peranan auditor", "Ketua Audit Negara mengakui 'Pendapat Berteguran' telah dicadangkan, tetapi ditukar kepada pendapat bersih + Emphasis of Matter kerana bimbang persepsi pendeposit. RCI: JAN tidak tegas; sepatutnya tiada Sijil Audit Bersih untuk 2017. Tambahan pula, Kumpulan Wang Pendeposit dikelaskan sebagai ekuiti (seperti modal) sejak 2010 — sepatutnya liabiliti.")
    ]));
    root.appendChild(s3);
    setTimeout(function () {
      C.waterfall(ravW, {
        steps: [
          { label: "Aset beraudit", total: 70317, nota: "Penyata kewangan diaudit JAN" },
          { label: "+ Pelarasan RAV", value: 4466, nota: "Anak syarikat, bersekutu, JV, hartanah, HTM — sebahagian besar anggaran pengurusan" },
          { label: "Aset RAV", total: 74783 },
          { label: "− Liabiliti", value: -74410, nota: "Termasuk deposit pendeposit" },
          { label: "Baki boleh agih", total: 373, nota: "Asas yang digunakan untuk justifikasi hibah 2017" }
        ],
        yFmt: function (v) { return (v / 1000).toFixed(0) + "b"; }, vFmt: fmtJuta, height: 260, padB: 58
      });
      C.waterfall(mfrsW, {
        steps: [
          { label: "Untung dilaporkan", total: 3412, nota: "Penyata kewangan 2017" },
          { label: "Rosot nilai ekuiti AFS", value: -4258 },
          { label: "Rosot nilai hutang AFS", value: -7 },
          { label: "Pelarasan lain", value: -580 },
          { label: "Untung/(rugi) sebenar", total: -1433, nota: "Jika MFRS dipatuhi sepenuhnya" }
        ],
        yFmt: function (v) { return (v / 1000).toFixed(1) + "b"; }, vFmt: fmtJuta, height: 250, padB: 58
      });
      C.bar(polC, {
        labels: [">70% + 24 bulan (asal)", ">85% (ubah 1)", ">90% (ubah 2)"],
        series: [{ name: "Rosot nilai perlu direkod", color: "#c0392b", data: K.polisi_rosotnilai.map(function (r) { return r.impak; }) }],
        yFmt: function (v) { return fmtJuta(v); }, height: 210, legend: false,
        tipFn: function (i) { var r = K.polisi_rosotnilai[i]; return "<b>Ambang " + r.ambang + "</b><br>Impak: <b>" + fmtJuta(r.impak) + "</b>" + (i === 2 ? "<br><span class='tipn'>Dengan ambang ini, hanya RM1 juta direkod pada 2017</span>" : ""); }
      });
    }, 20);

    /* --- deposit --- */
    var s4 = section("k-deposit", "BAHAGIAN 4", "Deposit: RM73b → RM69b → RM88b",
      "Apabila hibah jatuh ke 1.25% (2018), pendeposit besar keluar. Apabila keyakinan pulih, deposit naik semula. Tetapi struktur deposit kekal tertumpu kepada segelintir pendeposit besar.");
    var depC = h("div"), depD = h("div");
    s4.appendChild(card("", [
      depC,
      h("div", { class: "split" }, [
        h("div", {}, [
          h("h4", {}, ["Penumpuan deposit"]),
          depD,
          h("p", { class: "muted small" }, ["75% deposit dimiliki hanya 5% pendeposit. Pada masa sama, 65% pendeposit menyimpan RM2,000 atau kurang."]),
          srcChips(["3.17.15b", "3.16.14"])
        ]),
        h("div", {}, [
          h("h4", {}, ["Fakta penting"]),
          h("div", { class: "statgrid sm" }, [
            stat("Dana minimum tampung subsidi", "RM60b", "Anggaran laporan untuk HAFIS tahap semasa", "F"),
            stat("Jaminan Kerajaan", "RM88b", "Seksyen 24 Akta 535 — ditanggung Kumpulan Wang Disatukan", "F"),
            stat("Sasaran RPK (rizab)", "5% aset bersih", "≈ RM3.5 bilion (polisi 2019)", "F")
          ]),
          insightBox("awas", "Risiko 'bank run'", "LTH tiada modal sendiri seperti bank — setiap kerugian ditanggung terus oleh nilai aset pendeposit. Jika pendeposit besar keluar beramai-ramai, TH terpaksa jual aset tergesa-gesa (fire-sale). RCI syor notis sebulan untuk pengeluaran besar."),
          srcChips(["3.16.12", "3.13.16", "3.7.9"])
        ])
      ]),
      h("h4", {}, ["Surat-surat amaran BNM (2014–2022)"]),
      h("p", { class: "muted small" }, ["Bank Negara bukan pengawal selia TH, tetapi memantau dan menegur berulang kali — bermula 2014, tiga tahun sebelum krisis meletus."]),
      h("div", { class: "tbl-wrap" }, [
        h("table", { class: "tbl" }, [
          h("thead", {}, [h("tr", {}, [h("th", {}, ["Tarikh"]), h("th", {}, ["Kepada"]), h("th", {}, ["Perkara"])])]),
          h("tbody", {}, D.KEWANGAN.surat_bnm.map(function (s) {
            return h("tr", {}, [h("td", { class: "nw" }, [s.tarikh]), h("td", {}, [s.kepada]), h("td", {}, [s.perkara])]);
          }))
        ])
      ]),
      srcChips(D.KEWANGAN.surat_bnm_src)
    ]));
    root.appendChild(s4);
    setTimeout(function () {
      C.line(depC, {
        labels: ["Sebelum hibah 2018", "Akhir 2019", "Akhir 2020", "Mei 2022"],
        series: [{ name: "Deposit (RM bilion)", color: "#0b7a5e", data: [73, 69, 76, 88], area: true }],
        yFmt: function (v) { return "RM" + v + "b"; }, yMin: 60, height: 220, legend: false,
        vlines: [{ i: 1, label: "hibah 1.25%" }],
        tipFn: function (i) { var r = K.deposit.trend[i]; return "<b>" + r.label + "</b><br>Deposit: <b>RM" + r.nilai + " bilion</b>" + (i === 1 ? "<br><span class='tipn'>Selepas pengumuman hibah 1.25% — pendeposit besar keluar</span>" : ""); }
      });
      C.donut(depD, {
        size: 140,
        parts: [
          { label: "5% pendeposit terbesar", value: 75, color: "#c0392b" },
          { label: "95% pendeposit lain", value: 25, color: "#9aa3a0" }
        ],
        center: ["75%", "deposit"],
        tipFn: function (p) { return "<b>" + p.label + "</b><br>" + p.value + "% daripada jumlah deposit"; }
      });
    }, 20);
  }

  /* ================================================================
     VIEW: PELABURAN
     ================================================================ */
  function vPelaburan(root) {
    root.appendChild(h("div", { class: "view-h" }, [
      h("h1", {}, ["14 Pelaburan Bermasalah"]),
      h("p", { class: "view-sub" }, ["RCI syor audit forensik ke atas 14 pelaburan ini. Tap setiap kad untuk kronologi, angka dan tindakan. " + D.PELABURAN_NOTA])
    ]));

    var top = section("inv-top", null, "Saiz kerugian mengikut pelaburan", null);
    var topC = h("div");
    top.appendChild(card("", [chartBox(topC, ["3.14"], "RM juta — hanya angka yang disebut eksplisit dalam laporan; tekan bar untuk buka kad")]));
    root.appendChild(top);

    var sec = section("inv-list", null, "Semua pelaburan", null);
    var chips = h("div", { class: "chips" });
    ["semua", "Perladangan", "Hartanah", "Marin", "Hartanah / Haji", "Lain-lain"].forEach(function (f) {
      chips.appendChild(h("button", {
        class: "chip" + (state.invFilter === f ? " on" : ""),
        onclick: function () { state.invFilter = f; render(); }
      }, [f === "semua" ? "Semua sektor" : f]));
    });
    var sortSel = h("select", { class: "sel", onchange: function (e) { state.invSort = e.target.value; render(); } }, [
      h("option", { value: "rugi", selected: state.invSort === "rugi" || null }, ["Isih: kerugian terbesar"]),
      h("option", { value: "nama", selected: state.invSort === "nama" || null }, ["Isih: nama A–Z"])
    ]);
    sec.appendChild(h("div", { class: "filterbar" }, [chips, sortSel]));
    var list = h("div", { class: "inv-list" });
    sec.appendChild(list);
    root.appendChild(sec);

    setTimeout(function () {
      var rows = D.PELABURAN.filter(function (p) { return p.rugi; }).sort(function (a, b) { return b.rugi - a.rugi; })
        .map(function (p) { return { label: short(p.nama), value: p.rugi, color: "#c0392b", id: p.id }; });
      C.hbar(topC, {
        rows: rows, rowH: 30, vFmt: fmtJuta,
        tipFn: function (i, r) { return "<b>" + r.label + "</b><br>" + fmtJuta(r.value); },
        onRowClick: function (i, r) { state.invOpen = r.id; render(); setTimeout(function () { var el = document.getElementById("inv-" + r.id); if (el) el.scrollIntoView({ block: "center" }); }, 40); }
      });
    }, 20);

    var items = D.PELABURAN.filter(function (p) { return state.invFilter === "semua" || p.sektor === state.invFilter; });
    if (state.invSort === "rugi") items = items.slice().sort(function (a, b) { return (b.rugi || 0) - (a.rugi || 0); });
    else items = items.slice().sort(function (a, b) { return a.nama.localeCompare(b.nama); });
    items.forEach(function (p) { list.appendChild(invCard(p)); });

    function short(n) { return n.length > 22 ? n.slice(0, 21) + "…" : n; }
    function invCard(p) {
      var open = state.invOpen === p.id;
      var c = card("inv" + (open ? " open" : ""), []);
      c.id = "inv-" + p.id;
      c.appendChild(h("button", { class: "inv-h", onclick: function () { state.invOpen = open ? null : p.id; render(); setTimeout(function () { var el = document.getElementById("inv-" + p.id); if (el && !open) el.scrollIntoView({ block: "center" }); }, 40); } }, [
        h("span", { class: "inv-nama" }, [p.nama]),
        h("span", { class: "inv-meta" }, [
          h("span", { class: "badge" }, [p.sektor]),
          h("span", { class: "badge alt" }, [p.status]),
          p.rugi ? h("span", { class: "inv-rugi" }, ["−" + fmtJuta(p.rugi)]) : null
        ]),
        h("span", { class: "inv-x" }, [open ? "▲" : "▼"])
      ]));
      if (open) {
        var b = h("div", { class: "inv-b" });
        b.appendChild(h("p", { class: "inv-isu" }, [p.isu]));
        if (p.angka && p.angka.length) {
          b.appendChild(h("table", { class: "tbl kv" }, [h("tbody", {}, p.angka.map(function (a) {
            return h("tr", {}, [h("td", {}, [a.l, " ", tChip(a.t)]), h("td", { class: "kv-v" }, [a.v])]);
          }))]));
        }
        b.appendChild(h("p", {}, [h("b", {}, ["Kesan: "]), p.kesan]));
        b.appendChild(h("p", {}, [h("b", {}, ["Tindakan: "]), p.tindakan]));
        b.appendChild(h("div", { class: "k-foot" }, [srcChips(["3.14.1"]), h("span", { class: "muted small" }, ["Rujukan laporan: perenggan 3.14, pelaburan (" + p.src.split("(")[1] || ""])]));
        c.appendChild(b);
      }
      return c;
    }
  }

  /* ================================================================
     VIEW: UJSB
     ================================================================ */
  function vUJSB(root) {
    var U = D.UJSB;
    root.appendChild(h("div", { class: "view-h" }, [
      h("h1", {}, ["Penyelamatan: UJSB & Sukuk RM27.5 Bilion"]),
      h("p", { class: "view-sub" }, ["Hujung 2018, Kerajaan memindahkan aset bermasalah TH ke syarikat khas (UJSB) pada nilai premium, dan menggantikannya dengan sukuk. Ini membedah siasat bagaimana ia berfungsi — dan risiko yang tinggal."])
    ]));

    /* pilihan */
    var s0 = section("u-pilihan", "BAHAGIAN 1", "4 pilihan di atas meja — kenapa UJSB dipilih", null);
    var acc = h("div", { class: "acc" });
    U.pilihan.forEach(function (p) {
      var chosen = p.id === 4;
      acc.appendChild(h("details", { class: "acc-i" + (chosen ? " chosen" : ""), open: chosen || null }, [
        h("summary", {}, [h("span", { class: "acc-n" }, [String(p.id)]), h("b", {}, [p.nama]), chosen ? h("span", { class: "badge ok" }, ["DIPILIH"]) : null]),
        h("p", {}, [p.huraian]),
        h("p", { class: "muted" }, [(chosen ? "Rasional dipilih: " : "Kenapa tidak: ") + p.kenapa_ditolak])
      ]));
    });
    s0.appendChild(card("", [acc, srcChips([U.pilihan_src])]));
    root.appendChild(s0);

    /* pemindahan */
    var s1 = section("u-pemindahan", "BAHAGIAN 2", "Aset dipindah pada nilai RM19.9b — pasaran RM9.7b",
      "Premium RM10.2 bilion inilah yang menutup defisit TH dan membolehkan hibah 2018 (1.25%) diisytiharkan secara sah.");
    var pC = h("div");
    s1.appendChild(card("", [
      chartBox(pC, U.pemindahan_src, "RM juta — nilai buku TH, nilai pemindahan ke UJSB, dan nilai pasaran sebenar"),
      h("div", { class: "tbl-wrap" }, [
        h("table", { class: "tbl" }, [
          h("thead", {}, [h("tr", {}, ["Kelas aset", "Nilai buku", "Pemindahan", "Pasaran"].map(function (x) { return h("th", {}, [x]); }))]),
          h("tbody", {}, U.pemindahan.map(function (r) {
            return h("tr", {}, [h("td", {}, [r.kelas]), h("td", {}, [fmtJuta(r.buku)]), h("td", { class: "bold" }, [fmtJuta(r.pindah)]), h("td", { class: "neg" }, [fmtJuta(r.pasaran)])]);
          }).concat([h("tr", { class: "bold tot" }, [h("td", {}, ["Jumlah"]), h("td", {}, [fmtJuta(U.pemindahan_jumlah.buku)]), h("td", {}, [fmtJuta(U.pemindahan_jumlah.pindah)]), h("td", { class: "neg" }, [fmtJuta(U.pemindahan_jumlah.pasaran)])])]))
        ])
      ]),
      insightBox("utama", "Apa maksud premium ini", "UJSB (milik Kerajaan) 'membayar' lebih RM10.2 bilion daripada nilai pasaran — bukan dengan tunai, tetapi dengan sukuk (janji hutang). Defisit TH tertutup atas kertas, tetapi beban sebenar berpindah kepada Kerajaan dan akhirnya kepada pembayar cukai."),
      srcChips([U.premium_src])
    ]));
    root.appendChild(s1);
    setTimeout(function () {
      C.bar(pC, {
        labels: ["Hartanah", "Perladangan", "Ekuiti Bursa", "JUMLAH"],
        series: [
          { name: "Nilai buku TH", color: "#9aa3a0", data: U.pemindahan.map(function (r) { return r.buku; }).concat([U.pemindahan_jumlah.buku]) },
          { name: "Nilai pemindahan", color: "#0b7a5e", data: U.pemindahan.map(function (r) { return r.pindah; }).concat([U.pemindahan_jumlah.pindah]) },
          { name: "Nilai pasaran", color: "#c0392b", data: U.pemindahan.map(function (r) { return r.pasaran; }).concat([U.pemindahan_jumlah.pasaran]) }
        ],
        yFmt: function (v) { return (v / 1000).toFixed(0) + "b"; }, height: 250,
        tipFn: function (i) {
          var r = i < 3 ? U.pemindahan[i] : { kelas: "Jumlah", buku: U.pemindahan_jumlah.buku, pindah: U.pemindahan_jumlah.pindah, pasaran: U.pemindahan_jumlah.pasaran };
          return "<b>" + r.kelas + "</b><br>Buku: " + fmtJuta(r.buku) + "<br>Pemindahan: <b>" + fmtJuta(r.pindah) + "</b><br>Pasaran: " + fmtJuta(r.pasaran) + "<br>Premium atas pasaran: <b>" + fmtJuta(r.pindah - r.pasaran) + "</b>";
        }
      });
    }, 20);

    /* sukuk */
    var s2 = section("u-sukuk", "BAHAGIAN 3", "Sukuk RM27.56 bilion: janji hutang yang hanya Kerajaan mampu bayar", null);
    var suk = U.sukuk;
    s2.appendChild(card("", [
      h("div", { class: "suk-grid" }, [
        card("suk", [
          h("div", { class: "suk-n" }, ["SIRI 1"]),
          h("div", { class: "suk-v" }, ["RM10 bilion"]),
          h("p", {}, ["Nilai nominal RM13.2b · tempoh 7 tahun · YTM 4.05%"]),
          h("p", { class: "badge warn" }, ["Matang 2026"])
        ]),
        card("suk", [
          h("div", { class: "suk-n" }, ["SIRI 2"]),
          h("div", { class: "suk-v" }, ["RM9.6 bilion"]),
          h("p", {}, ["Nilai nominal RM14.3b · tempoh 10 tahun · YTM 4.10%"]),
          h("p", { class: "badge warn" }, ["Matang 2029"])
        ]),
        card("suk", [
          h("div", { class: "suk-n" }, ["TUNAI"]),
          h("div", { class: "suk-v" }, ["RM300 juta"]),
          h("p", {}, ["Untuk 4 saham tidak patuh syariah (Bumi Armada, Integrated Logistics, Yi-Lai, YTL Power)"]),
          h("p", { class: "muted small" }, ["Dibayar 30 Dis 2019 (RM100j) & 30 Dis 2020 (RM200j)"])
        ])
      ]),
      h("p", { class: "muted" }, ["Ciri sukuk: ", suk.ciri, ". Tiada jaminan Kerajaan rasmi — hanya 'Letter of Comfort' Menteri Kewangan (27 Mei 2019). Tetapi UJSB disenaraikan sebagai Komitmen Jaminan Kerajaan."]),
      srcChips(["3.13.41", "3.13.44", "3.13.45"])
    ]));
    s2.appendChild(card("", [
      h("h3", { class: "card-t" }, ["Komitmen Kerajaan & apa yang sudah (dan belum) dibayar"]),
      h("div", { class: "statgrid" }, [
        stat("Jumlah diluluskan", "RM17.8b", "RMK-11 (RM500j, 2020) + RMK-12/13 (RM17.3b)", "F"),
        stat("Komitmen tahunan", "RM1.73b/tahun", "Diluluskan Jemaah Menteri 5 Apr 2019", "F"),
        stat("Diterima TH setakat laporan", "RM500 juta", "vs aset dipindah bernilai pasaran RM9.73b", "F"),
        stat("Tercicir 2021", "RM1.5 bilion", "Diluluskan Belanjawan 2021 tetapi tidak diterima — alasan: Covid-19", "F")
      ]),
      insightBox("awas", "Risiko utama hari ini", U.risiko.nota_aset + ". " + U.risiko.nota_pendapatan + ". " + U.risiko.deferred_nota + ". Jika Kerajaan gagal menepati komitmen, RCI amarkan risiko bank run kembali — dengan liabiliti pendeposit kini RM88 bilion."),
      srcChips(["3.13.46", "3.13.48", "3.13.49", "3.13.60", "3.13.62"])
    ]));
    root.appendChild(s2);

    /* bluechips */
    var s3 = section("u-blue", "BAHAGIAN 4", "Saham bluechip: dipindah pada harga tinggi, pasaran terus jatuh",
      "5 saham mewah dipindahkan pada harga jauh melebihi pasaran. Laporan mengira kejatuhan RM946 juta hanya untuk 5 kaunter ini.");
    var bC = h("div");
    s3.appendChild(card("", [
      chartBox(bC, U.bluechips_src, "Harga seunit (RM): nilai pemindahan vs pasaran 31 Dis 2018 vs 8 Jun 2022"),
      h("div", { class: "tbl-wrap" }, [
        h("table", { class: "tbl" }, [
          h("thead", {}, [h("tr", {}, ["Kaunter", "Pemindahan (RM)", "Pasaran 31/12/18", "Pasaran 8/6/22", "Jumlah pindah", "Kejatuhan"].map(function (x) { return h("th", {}, [x]); }))]),
          h("tbody", {}, U.bluechips.map(function (b) {
            return h("tr", {}, [
              h("td", { class: "bold" }, [b.nama]),
              h("td", {}, [b.transfer.toFixed(2)]),
              h("td", { class: "neg" }, [b.mkt_dis18.toFixed(2) + " (" + b.jatuh + "%)"]),
              h("td", {}, [b.mkt_jun22.toFixed(2)]),
              h("td", {}, [fmtJuta(b.jml_transfer)]),
              h("td", { class: "neg" }, [fmtJuta(b.jml_jatuh)])
            ]);
          }).concat([h("tr", { class: "bold tot" }, [h("td", {}, ["Jumlah"]), h("td", {}, []), h("td", {}, []), h("td", {}, []), h("td", {}, [fmtJuta(U.bluechips_jumlah.transfer)]), h("td", { class: "neg" }, [fmtJuta(U.bluechips_jumlah.jatuh)])])]))
        ])
      ]),
      h("p", { class: "muted small" }, [U.bluechips_nota]),
      insightBox("info", "Nota", "Saham ini antara 106 kaunter yang dipindahkan. 75 kaunter telah dilupuskan UJSB di pasaran terbuka; hasilnya dilabur semula dalam 329 kaunter baharu. UJSB rugi RM9.9 bilion (2019) akibat perbezaan nilai pemindahan dan pasaran.")
    ]));
    root.appendChild(s3);
    setTimeout(function () {
      C.bar(bC, {
        labels: U.bluechips.map(function (b) { return b.nama; }),
        series: [
          { name: "Pemindahan", color: "#37474f", data: U.bluechips.map(function (b) { return b.transfer; }) },
          { name: "Pasaran Dis 2018", color: "#c0392b", data: U.bluechips.map(function (b) { return b.mkt_dis18; }) },
          { name: "Pasaran Jun 2022", color: "#b98a2f", data: U.bluechips.map(function (b) { return b.mkt_jun22; }) }
        ],
        yFmt: function (v) { return "RM" + v.toFixed(1); }, height: 240,
        tipFn: function (i) { var b = U.bluechips[i]; return "<b>" + b.nama + "</b><br>Pemindahan: RM" + b.transfer.toFixed(2) + "<br>Dis 2018: RM" + b.mkt_dis18.toFixed(2) + " (" + b.jatuh + "%)<br>Jun 2022: RM" + b.mkt_jun22.toFixed(2); }
      });
    }, 20);

    /* hartanah */
    var s4 = section("u-hartanah", "BAHAGIAN 5", "Hartanah: RM2.25b dipindah, kini bernilai RM1.2b",
      "Nilai pasaran 29 hartanah UJSB jatuh 46% dalam 3 tahun. Jika TH masih memegangnya, TH yang perlu merekod kerugian ini.");
    var hC = h("div");
    s4.appendChild(card("", [
      chartBox(hC, ["3.13.34"], "RM juta — nilai pemindahan (Dis 2018) vs nilai pasaran (Dis 2021)"),
      h("p", { class: "muted" }, [U.hartanah_jpphm.nota]),
      srcChips([U.hartanah_jpphm.src])
    ]));
    root.appendChild(s4);
    setTimeout(function () {
      C.bar(hC, {
        labels: U.hartanah_ujsb.map(function (r) { return r.kelas; }),
        series: [
          { name: "Nilai pemindahan", color: "#0b7a5e", data: U.hartanah_ujsb.map(function (r) { return r.transfer; }) },
          { name: "Pasaran Dis 2021", color: "#c0392b", data: U.hartanah_ujsb.map(function (r) { return r.mkt_dis21; }) }
        ],
        yFmt: function (v) { return fmtJuta(v); }, height: 240,
        tipFn: function (i) { var r = U.hartanah_ujsb[i]; var d = r.mkt_dis21 - r.transfer; return "<b>" + r.kelas + "</b><br>Pemindahan: " + fmtJuta(r.transfer) + "<br>Dis 2021: " + fmtJuta(r.mkt_dis21) + "<br>Perubahan: <b style='color:#c0392b'>" + fmtJuta(d) + " (" + Math.round(d / r.transfer * 100) + "%)</b>"; }
      });
    }, 20);

    /* ROFR + jaminan */
    var s5 = section("u-jaminan", "BAHAGIAN 6", "Konteks: di mana UJSB dalam tanggungan Kerajaan",
      "UJSB ialah salah satu Komitmen Jaminan terbesar Kerajaan — RM20.7 bilion (2020), 11.1% daripada keseluruhan.");
    var jC = h("div");
    s5.appendChild(card("", [
      chartBox(jC, ["3.13.45"], "Komitmen Jaminan Kerajaan mengikut entiti, 2020 (RM juta) — Jadual 5.3 Tinjauan Fiskal"),
      h("h4", {}, ["Hak Penolakan Pertama (ROFR) — tawaran beli balik pada premium"]),
      h("p", { class: "muted small" }, ["TH ada hak membeli semula aset sebelum dijual kepada pihak lain. Kebanyakan tawaran datang pada harga premium berbanding pasaran — jadi membeli di pasaran terbuka lebih murah. TH telah melepaskan kebanyakan hak ini."]),
      h("div", { class: "tbl-wrap" }, [
        h("table", { class: "tbl" }, [
          h("thead", {}, [h("tr", {}, ["Syarikat", "Tarikh", "Harga ROFR (RM)", "Pasaran (RM)", "Premium"].map(function (x) { return h("th", {}, [x]); }))]),
          h("tbody", {}, U.rofr_tawaran.map(function (r) {
            return h("tr", {}, [
              h("td", {}, [r.syarikat]), h("td", { class: "nw" }, [r.tarikh]),
              h("td", {}, [r.rofr.toFixed(3)]), h("td", {}, [r.pasaran.toFixed(3)]),
              h("td", { class: r.premium < 0 ? "" : "neg" }, [(r.premium > 0 ? "+" : "") + r.premium + "%"])
            ]);
          }))
        ])
      ]),
      srcChips([U.rofr_src, "3.13.52"])
    ]));
    root.appendChild(s5);
    setTimeout(function () {
      C.hbar(jC, {
        rows: U.komitmen_jaminan_2020.map(function (r) { return { label: r.entiti, value: r.rm, color: r.fokus ? "#c0392b" : "#3d5a80" }; }),
        rowH: 30, labelW: 150, vFmt: fmtJuta,
        tipFn: function (i) { var r = U.komitmen_jaminan_2020[i]; return "<b>" + r.entiti + "</b><br>" + fmtJuta(r.rm) + " (" + r.pct + "% daripada jumlah Komitmen Jaminan)"; }
      });
    }, 20);
  }

  /* ================================================================
     VIEW: HAJI
     ================================================================ */
  function vHaji(root) {
    var HJ = D.HAJI;
    root.appendChild(h("div", { class: "view-h" }, [
      h("h1", {}, ["Haji & Subsidi (HAFIS)"]),
      h("p", { class: "view-sub" }, ["Kos haji naik setiap tahun, bayaran jemaah dibekukan 13 tahun, dan jurangnya ditanggung oleh keuntungan pelaburan semua pendeposit."])
    ]));

    var s1 = section("h-sejarah", "BAHAGIAN 1", "2014–2019: subsidi membesar setiap tahun", null);
    var c1 = h("div"), c2 = h("div");
    s1.appendChild(card("", [
      chartBox(c1, ["3.16.3"], "Kos haji seorang jemaah: dibayar jemaah vs ditanggung TH (RM). Tiada operasi haji 2020–2021 (pandemik)."),
      chartBox(c2, ["3.16.3"], "Jumlah HAFIS ditanggung TH setahun (RM juta)")
    ]));
    root.appendChild(s1);
    setTimeout(function () {
      C.bar(c1, {
        labels: HJ.sejarah.map(function (r) { return r.y; }),
        stacked: true,
        series: [
          { name: "Dibayar jemaah", color: "#0b7a5e", data: HJ.sejarah.map(function (r) { return r.bayar; }) },
          { name: "Subsidi TH (HAFIS)", color: "#c0392b", data: HJ.sejarah.map(function (r) { return r.hafis; }) }
        ],
        yFmt: function (v) { return (v / 1000).toFixed(0) + "k"; }, height: 240,
        tipFn: function (i) { var r = HJ.sejarah[i]; return "<b>" + r.y + "</b><br>Kos sebenar: RM" + r.kos.toLocaleString() + "<br>Jemaah bayar: RM" + r.bayar.toLocaleString() + " (" + r.pct_bayar + "%)<br>TH tanggung: <b>RM" + r.hafis.toLocaleString() + "</b> (" + r.pct_subsidi + "%)"; }
      });
      C.bar(c2, {
        labels: HJ.sejarah.map(function (r) { return r.y; }),
        series: [{ name: "Jumlah HAFIS", color: "#b98a2f", data: HJ.sejarah.map(function (r) { return r.jumlah; }) }],
        yFmt: function (v) { return "RM" + v + "j"; }, height: 200, legend: false,
        tipFn: function (i) { var r = HJ.sejarah[i]; return "<b>" + r.y + "</b><br>Jumlah HAFIS: <b>RM" + r.jumlah + " juta</b>"; }
      });
    }, 20);

    var s2 = section("h-unjuran", "BAHAGIAN 2", "Unjuran 2022–2030: subsidi jadi 2/3 daripada kos haji",
      "Dengan bayaran kekal RM12,980, unjuran laporan menunjukkan HAFIS mencecah RM742 juta setahun pada 2030.");
    var c3 = h("div"), c4 = h("div");
    s2.appendChild(card("", [
      h("p", {}, [h("span", { class: "badge warn" }, ["UNJURAN LAPORAN"]), h("span", { class: "muted small" }, [" Angka 2022–2030 ialah unjuran LTH yang disebut dalam laporan — bukan fakta sejarah."])]),
      chartBox(c3, ["3.16.8"], "Kos haji vs bayaran jemaah vs subsidi seorang (RM)"),
      chartBox(c4, ["3.16.8"], "Jumlah HAFIS setahun (RM juta)")
    ]));
    root.appendChild(s2);
    setTimeout(function () {
      C.line(c3, {
        labels: HJ.unjuran.map(function (r) { return r.y; }),
        series: [
          { name: "Kos haji", color: "#37474f", data: HJ.unjuran.map(function (r) { return r.kos; }) },
          { name: "Bayaran jemaah", color: "#0b7a5e", data: HJ.unjuran.map(function (r) { return r.bayar; }) },
          { name: "Subsidi (HAFIS)", color: "#c0392b", data: HJ.unjuran.map(function (r) { return r.hafis; }), dash: true }
        ],
        yFmt: function (v) { return (v / 1000).toFixed(0) + "k"; }, height: 240,
        tipFn: function (i) { var r = HJ.unjuran[i]; return "<b>" + r.y + "</b> (unjuran)<br>Kos: RM" + r.kos.toLocaleString() + "<br>Jemaah bayar: RM" + r.bayar.toLocaleString() + "<br>Subsidi: <b>RM" + r.hafis.toLocaleString() + " (" + r.pct_subsidi + "%)</b>"; }
      });
      C.line(c4, {
        labels: HJ.unjuran.map(function (r) { return r.y; }),
        series: [{ name: "Jumlah HAFIS", color: "#c0392b", data: HJ.unjuran.map(function (r) { return r.jumlah; }), area: true, dash: true }],
        yFmt: function (v) { return fmtJuta(v); }, height: 200, legend: false,
        tipFn: function (i) { var r = HJ.unjuran[i]; return "<b>" + r.y + "</b><br>HAFIS: <b>" + fmtJuta(r.jumlah) + "</b> setahun"; }
      });
    }, 20);

    var s3 = section("h-fakta", "BAHAGIAN 3", "Fakta & reformasi yang dicadangkan", null);
    s3.appendChild(card("", [
      h("div", { class: "statgrid" }, [
        stat("Subsidi HAFIS sejak 2001", "RM2.02 bilion", "Dibiayai daripada keuntungan pelaburan", "F"),
        stat("Bayaran haji dibekukan", "13 tahun", "RM9,980 (2009–2021)", "F"),
        stat("Deposit minimum daftar haji", "RM1,300", "Sejak skim giliran — RCI syor naik ke RM12,980", "F"),
        stat("Tempoh menunggu giliran", "≈130 tahun", "Jika reformasi: ≈33 tahun", "F"),
        stat("Kuota haji Malaysia", "30,000", "Visi Saudi 2030: 60,000", "F"),
        stat("Kos haji 2050 (anggaran)", "RM50,000", "Anggaran dalam laporan", "U")
      ]),
      insightBox("utama", "Kenapa subsidi ini isu besar", "HAFIS diambil daripada keuntungan pelaburan — wang yang sama untuk bayar hibah semua pendeposit. RM400 juta subsidi setahun ≈ tolakan 0.4% daripada kadar hibah. Subsidi juga antara sebab TH terpaksa mengambil risiko pelaburan lebih tinggi."),
      h("h4", {}, ["Reformasi dicadangkan RCI"]),
      h("ul", { class: "k-poin" }, HJ.reformasi.map(function (r) { return h("li", {}, [r]); })),
      srcChips(HJ.fakta.src.concat([HJ.reformasi_src]))
    ]));
    root.appendChild(s3);
  }

  /* ================================================================
     VIEW: TADBIR URUS
     ================================================================ */
  function vTadbir(root) {
    var T = D.TADBIRURUS, K = D.KEWANGAN;
    root.appendChild(h("div", { class: "view-h" }, [
      h("h1", {}, ["Tadbir Urus & Akauntabiliti"]),
      h("p", { class: "view-sub" }, ["Siapa memimpin TH semasa krisis, berapa banyak jawatan anak syarikat mereka pegang, bonus yang dibayar, dan tindakan yang telah (dan belum) diambil."])
    ]));

    /* kepimpinan */
    var s1 = section("t-kepimpinan", "BAHAGIAN 1", "Garis masa kepimpinan",
      "Menteri, Pengerusi dan CEO yang bertugas sepanjang tempoh siasatan. Garis putus-putus menandakan peristiwa utama.");
    var gM = h("div"), gP = h("div"), gC = h("div");
    s1.appendChild(card("", [
      h("h3", { class: "card-t" }, ["Menteri bertanggungjawab (Hal Ehwal Agama)"]),
      gM,
      insightBox("utama", "Dapatan RCI", T.menteri_nota),
      srcChips([T.menteri_src, "ringkasan"])
    ]));
    s1.appendChild(card("", [h("h3", { class: "card-t" }, ["Pengerusi Lembaga"]), gP, srcChips([T.pengerusi_src])]));
    s1.appendChild(card("", [h("h3", { class: "card-t" }, ["Ketua Pegawai Eksekutif"]), gC, srcChips([T.ceo_src])]));
    root.appendChild(s1);
    setTimeout(function () {
      var from = new Date(2009, 0, 1), to = new Date(2022, 7, 1);
      var ev = [{ date: new Date(2018, 6, 16) }, { date: new Date(2018, 11, 7) }, { date: new Date(2022, 0, 20) }];
      C.gantt(gM, {
        from: from, to: to, labelW: 130, events: ev,
        rows: T.menteri.map(function (m) { return { label: m.nama.split(" ").slice(-3).join(" "), from: new Date(m.dari), to: new Date(m.hingga), color: "#3d5a80", nota: m.nota }; })
      });
      C.gantt(gP, {
        from: from, to: to, labelW: 130, events: ev,
        rows: T.pengerusi.map(function (m) { return { label: m.nama.split(" ").slice(-3).join(" "), from: new Date(m.dari), to: new Date(m.hingga), color: "#0b7a5e", nota: m.nota }; })
      });
      C.gantt(gC, {
        from: from, to: to, labelW: 130, events: ev,
        rows: T.ceo.map(function (m) { return { label: m.nama.split(" ").slice(-3).join(" "), from: new Date(m.dari), to: new Date(m.hingga), color: "#b98a2f", nota: m.nota }; })
      });
    }, 20);

    /* ahli politik */
    var s2 = section("t-politik", "BAHAGIAN 2", "Ahli politik dalam Lembaga (2014–2018)", null);
    var pol = h("div", { class: "cards3" });
    T.ahli_politik.forEach(function (a) {
      pol.appendChild(card("pol", [
        h("b", {}, [a.nama]),
        h("p", { class: "muted small" }, [a.jawatan]),
        h("p", { class: "small" }, [a.politik])
      ]));
    });
    s2.appendChild(card("", [pol,
      insightBox("utama", "Kesan menurut RCI", "Penglibatan ahli politik menimbulkan keresahan masyarakat akibat pertembungan politik; keputusan TH (hibah, bayaran haji, HAFIS) didorong unsur politik. RCI syor ahli politik aktif dilarang daripada Lembaga dan anak syarikat."),
      srcChips([T.ahli_politik_src, "ringkasan"])
    ]));
    root.appendChild(s2);

    /* anak syarikat */
    var s3 = section("t-anak", "BAHAGIAN 3", "Bertindih jawatan: sehingga 23 anak syarikat seorang", null);
    var aC = h("div");
    s3.appendChild(card("", [
      chartBox(aC, T.anak_syarikat_src, "Bilangan jawatan anak syarikat dipegang serentak (tekan untuk butiran)"),
      h("p", { class: "muted" }, [T.anak_syarikat_dasar]),
      srcChips([T.anak_syarikat_dasar_src])
    ]));
    root.appendChild(s3);
    setTimeout(function () {
      C.hbar(aC, {
        rows: T.anak_syarikat.map(function (a) { return { label: a.nama.split(" ").slice(-2).join(" "), value: a.bil, color: "#3d5a80", sub: a.peran }; }),
        rowH: 34, labelW: 120,
        tipFn: function (i) { var a = T.anak_syarikat[i]; return "<b>" + a.nama + "</b><br>" + a.peran + "<br><b>" + a.bil + " jawatan</b> anak syarikat" + (a.nota ? "<br><span class='tipn'>" + a.nota + "</span>" : ""); }
      });
    }, 20);

    /* bonus */
    var s4 = section("t-bonus", "BAHAGIAN 4", "Bonus: sehingga 13 bulan ketika TH defisit", null);
    var bC = h("div"), bC2 = h("div");
    s4.appendChild(card("", [
      chartBox(bC, ["3.12.7"], "Peruntukan bonus kakitangan (RM juta) — kelulusan MOF"),
      chartBox(bC2, ["3.12.10"], "Bonus vs keuntungan bersih dilaporkan 2013–2017 (RM juta)"),
      h("div", { class: "tbl-wrap" }, [
        h("table", { class: "tbl" }, [
          h("thead", {}, [h("tr", {}, ["Tahun", "Untung bersih", "Bonus", "% untung", "Taburan"].map(function (x) { return h("th", {}, [x]); }))]),
          h("tbody", {}, K.bonus_vs_untung.map(function (b) {
            return h("tr", {}, [h("td", {}, [String(b.y)]), h("td", {}, [fmtJuta(b.untung)]), h("td", {}, [fmtJuta(b.bonus)]), h("td", {}, [b.pct + "%"]), h("td", {}, [b.bulan + " bulan"])]);
          }))
        ])
      ]),
      insightBox("awas", "Percanggahan dalam laporan", K.bonus_percanggahan),
      insightBox("utama", "Pandangan RCI", "Memandangkan 2014–2017 aset TH sebenarnya lebih rendah daripada liabiliti, pemberian bonus tinggi adalah tidak wajar. Bonus tinggi dibayar kerana penilaian RAV menunjukkan untung besar — untung yang kini didapati tidak sebenar."),
      srcChips(["3.12.12", "3.12.13"])
    ]));
    s4.appendChild(card("", [
      h("h3", { class: "card-t" }, ["Bonus istimewa TH Properties — RCI syor dapatkan semula"]),
      h("div", { class: "statgrid" }, [
        stat("Bonus 2017", "RM1,148,400", "11 penerima — diluluskan Mesyuarat Exco (tiada kuasa)", "F"),
        stat("Bonus 2018", "RM1,045,000", "10 penerima — notifikasi 7 bulan lewat", "F")
      ]),
      h("p", { class: "muted" }, ["Alasan: kejayaan projek The Bay Pavilion (pulangan AUD11.6 juta) dan untung sebelum cukai TH Properties RM34.84 juta (2017). Firma guaman mendapati kedua-dua pembayaran melanggar Akta Syarikat 2016."]),
      bonusTable(K.thp_bonus.t2017.penerima, "Penerima 2017"),
      bonusTable(K.thp_bonus.t2018.penerima, "Penerima 2018"),
      srcChips(["3.12.19", "3.12.28"])
    ]));
    root.appendChild(s4);
    function bonusTable(rows, label) {
      return h("details", { class: "acc-i" }, [
        h("summary", {}, [h("b", {}, [label + " (" + rows.length + " orang)"])]),
        h("div", { class: "tbl-wrap" }, [
          h("table", { class: "tbl" }, [
            h("thead", {}, [h("tr", {}, [h("th", {}, ["Nama"]), h("th", {}, ["Jumlah (RM)"])])]),
            h("tbody", {}, rows.map(function (r) { return h("tr", {}, [h("td", {}, [r.nama]), h("td", {}, [r.rm.toLocaleString("en-MY")])]); }))
          ])
        ])
      ]);
    }
    setTimeout(function () {
      C.bar(bC, {
        labels: K.bonus_kakitangan.map(function (b) { return b.y; }),
        series: [{ name: "Peruntukan bonus", color: "#b98a2f", data: K.bonus_kakitangan.map(function (b) { return b.peruntukan; }) }],
        yFmt: function (v) { return "RM" + v + "j"; }, height: 220, legend: false,
        tipFn: function (i) { var b = K.bonus_kakitangan[i]; return "<b>" + b.y + "</b><br>Peruntukan: <b>RM" + b.peruntukan + " juta</b><br>Kelulusan MOF: " + b.moft + " bulan<br>Taburan: " + b.taburan; }
      });
      C.bar(bC2, {
        labels: K.bonus_vs_untung.map(function (b) { return b.y; }),
        series: [
          { name: "Untung bersih (dilapor)", color: "#0b7a5e", data: K.bonus_vs_untung.map(function (b) { return b.untung; }) },
          { name: "Bonus (×10 untuk nampak)", color: "#b98a2f", data: K.bonus_vs_untung.map(function (b) { return b.bonus * 10; }) }
        ],
        yFmt: function (v) { return fmtJuta(v); }, height: 220,
        tipFn: function (i, s) { var b = K.bonus_vs_untung[i]; return "<b>" + b.y + "</b><br>Untung bersih: " + fmtJuta(b.untung) + "<br>Bonus: <b>" + fmtJuta(b.bonus) + "</b> (" + b.pct + "% daripada untung)"; }
      });
    }, 20);

    /* akauntabiliti */
    var s5 = section("t-akauntabiliti", "BAHAGIAN 5", "Laporan polis, SPRM & tatatertib", null);
    var polCards = h("div", { class: "cards2" });
    T.polis.forEach(function (p) {
      polCards.appendChild(card("rep", [
        h("div", { class: "rep-h" }, [h("b", {}, [p.tarikh]), h("span", { class: "badge" }, [p.repot])]),
        h("p", { class: "small" }, [p.perkara]),
        h("p", { class: "muted small" }, ["Pengadu: " + p.pengadu]),
        h("p", { class: "small rep-s" }, [h("b", {}, ["Status: "]), p.status])
      ]));
    });
    s5.appendChild(card("", [
      h("h3", { class: "card-t" }, ["4 laporan polis (Nov 2018 – Jan 2019)"]),
      polCards, srcChips(["3.15.1"])
    ]));
    s5.appendChild(card("", [
      h("h3", { class: "card-t" }, ["6 laporan kepada SPRM"]),
      h("ul", { class: "k-poin" }, T.sprm.map(function (x) { return h("li", {}, [x]); })),
      h("p", { class: "muted" }, [T.sprm_status]),
      srcChips([T.sprm_src])
    ]));
    var tatWrap = h("div");
    s5.appendChild(card("", [
      h("h3", { class: "card-t" }, ["Tindakan tatatertib — 5 pegawai"]),
      h("div", { class: "chips" }, [
        klusterChip(0, "Semua"), klusterChip(1, "K1: THIP"), klusterChip(2, "K2: Yayasan"), klusterChip(3, "K3: Hibah 2017"), klusterChip(4, "K4: Tuntutan palsu")
      ]),
      tatWrap,
      insightBox("awas", "RCI tentang proses ini", T.tatatertib_nota),
      srcChips([T.tatatertib_src])
    ]));
    root.appendChild(s5);
    drawTat();
    function klusterChip(k, label) {
      return h("button", { class: "chip" + (state.tatKluster === k ? " on" : ""), onclick: function () { state.tatKluster = k; drawTat(); refreshChips(); } }, [label]);
    }
    function refreshChips() {
      s5.querySelectorAll(".chip").forEach(function (c, idx) { c.classList.toggle("on", idx === state.tatKluster); });
    }
    function drawTat() {
      tatWrap.innerHTML = "";
      T.tatatertib.filter(function (p) { return state.tatKluster === 0 || p.kluster.indexOf(state.tatKluster) !== -1; }).forEach(function (p) {
        tatWrap.appendChild(card("tat", [
          h("div", { class: "rep-h" }, [h("b", {}, [p.nama]), h("span", { class: "muted small" }, [p.jawatan_asal])]),
          h("p", { class: "small" }, [p.ringkas]),
          h("p", { class: "small" }, [h("b", {}, ["Kini: "]), p.kini]),
          h("div", { class: "chips sm" }, p.kluster.map(function (k) { return h("span", { class: "badge alt", title: T.kluster_def[k] }, ["K" + k]); }))
        ]));
      });
      var def = h("div", { class: "muted small deflist" });
      Object.keys(T.kluster_def).forEach(function (k) {
        if (state.tatKluster === 0 || Number(k) === state.tatKluster) def.appendChild(h("p", {}, [h("b", {}, ["K" + k + ": "]), T.kluster_def[k]]));
      });
      tatWrap.appendChild(def);
    }

    /* saksi & panel */
    var s6 = section("t-saksi", "BAHAGIAN 6", "Panel Pelaburan & saksi prosiding", null);
    s6.appendChild(card("", [
      h("p", {}, [T.panel_pelaburan.dibubar + " " + T.panel_pelaburan.dihidup_semula]),
      h("p", { class: "muted" }, [T.panel_pelaburan.pengakuan]),
      h("h4", {}, ["16 saksi dipanggil (9 Mei – 27 Jun 2022)"]),
      h("div", { class: "chips sm" }, T.saksi.dipanggil.map(function (s) { return h("span", { class: "badge" }, [s.nama + " · " + s.tarikh]); })),
      srcChips([T.panel_pelaburan.src, T.saksi.src])
    ]));
    root.appendChild(s6);
  }

  /* ================================================================
     VIEW: SYOR
     ================================================================ */
  function vSyor(root) {
    root.appendChild(h("div", { class: "view-h" }, [
      h("h1", {}, ["Syor-syor RCI"]),
      h("p", { class: "view-sub" }, [D.SYOR.length + " syor dalam 7 tema. Tapis mengikut tema atau cari teks."])
    ]));
    var sec = section("syor-list", null, "", null);
    var chips = h("div", { class: "chips" });
    D.SYOR_TEMA.forEach(function (t) {
      chips.appendChild(h("button", { class: "chip" + (state.syorTema === t ? " on" : ""), onclick: function () { state.syorTema = t; render(); } }, [t]));
    });
    var qBox = h("input", { class: "sel wide", type: "search", placeholder: "Tapis syor…", oninput: function (e) { draw(e.target.value.toLowerCase()); } });
    sec.appendChild(h("div", { class: "filterbar" }, [chips, qBox]));
    var list = h("div", { class: "syor-list" });
    sec.appendChild(list);
    root.appendChild(sec);
    draw("");
    function draw(q) {
      list.innerHTML = "";
      D.SYOR.filter(function (s) {
        return (state.syorTema === "Semua" || s.tema === state.syorTema) && (!q || s.teks.toLowerCase().indexOf(q) !== -1);
      }).forEach(function (s) {
        list.appendChild(card("syor", [
          h("div", { class: "syor-h" }, [
            h("span", { class: "syor-n" }, [String(s.id)]),
            h("span", { class: "badge" }, [s.tema])
          ]),
          h("p", {}, [s.teks]),
          srcChips([s.src])
        ]));
      });
      if (!list.children.length) list.appendChild(h("p", { class: "muted pad" }, ["Tiada syor sepadan."]));
    }
  }

  /* ---------------- boot ---------------- */
  function boot() {
    var m = (location.hash || "").match(/^#\/(\w+)/);
    if (m && NAV.some(function (n) { return n.id === m[1]; })) state.view = m[1];
    render();
    var rt = null;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(render, 220);
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".bar") && !e.target.closest(".dot") && !e.target.closest("path")) C.hideTip();
    });
    window.addEventListener("hashchange", function () {
      var m2 = (location.hash || "").match(/^#\/(\w+)/);
      if (m2 && NAV.some(function (n) { return n.id === m2[1]; }) && m2[1] !== state.view) { state.view = m2[1]; render(); }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
