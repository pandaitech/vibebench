/* =====================================================================
   APP — shell, penghala (router), carian global.
   ===================================================================== */
(function () {
  "use strict";
  var D = window.RCI, L = window.L, V = window.V, el = L.el;

  var MODUL = [
    { id: "peta", label: "Peta isu", fn: V.peta },
    { id: "jurang", label: "Jurang aset", fn: V.jurang },
    { id: "hibah", label: "Hibah", fn: V.hibah },
    { id: "angka2017", label: "Angka 2017", fn: V.angka2017 },
    { id: "pelaburan", label: "Pelaburan bermasalah", fn: V.pelaburan },
    { id: "ujsb", label: "UJSB & Sukuk", fn: V.ujsb },
    { id: "haji", label: "Kos haji & subsidi", fn: V.haji },
    { id: "tadbir", label: "Tadbir urus", fn: V.tadbir },
    { id: "bonus", label: "Bonus", fn: V.bonus },
    { id: "akauntabiliti", label: "Akauntabiliti", fn: V.akauntabiliti },
    { id: "syor", label: "25 syor", fn: V.syor },
    { id: "sumber", label: "Sumber & kaedah", fn: V.sumber }
  ];

  /* ---------- Indeks carian ---------- */
  var INDEKS = [];
  function tambah(modul, tajuk, sub, kunci, aksi) {
    INDEKS.push({ modul: modul, tajuk: tajuk, sub: sub, aksi: aksi, teks: (tajuk + " " + (sub || "") + " " + (kunci || "")).toLowerCase() });
  }
  /* Serlahkan satu elemen selepas melompat kepadanya. */
  function serlah(id) {
    var n = document.getElementById(id);
    if (!n) return;
    n.scrollIntoView({ block: "center", behavior: "smooth" });
    n.style.transition = "background-color .3s";
    var asal = n.style.backgroundColor;
    n.style.backgroundColor = "var(--aksen-lembut)";
    setTimeout(function () { n.style.backgroundColor = asal; }, 1800);
  }

  MODUL.forEach(function (m) { tambah(m.id, m.label, "Modul analisis"); });
  D.pelaburan.forEach(function (p) {
    tambah("pelaburan", p.nama, p.sektor + " · " + p.lokasi, p.isu + " " + p.status + " " + (p.kategori || []).join(" "),
      function () { if (V._bukaPelaburan) V._bukaPelaburan(p); });
  });
  D.syor.forEach(function (s) {
    tambah("syor", s.no + " " + s.tajuk, s.kategori + " · " + s.kepada, s.teks, function () { serlah("syor-" + s.no); });
  });
  D.kronologi.forEach(function (k) { tambah("peta", k.tajuk, k.t + " · garis masa", k.teks); });
  D.jawatan.kumpulan.forEach(function (kk) {
    kk.orang.forEach(function (o) { tambah("tadbir", o.nama, kk.label + " (" + o.mula.slice(0, 4) + "–" + o.tamat.slice(0, 4) + ")", o.nota || ""); });
  });
  D.anggotaLembaga.orang.forEach(function (o) { tambah("tadbir", o.nama, "Anggota Lembaga (" + o.mula.slice(0, 4) + "–" + o.tamat.slice(0, 4) + ")", o.nota || ""); });
  D.jawatanAnakSyarikat.orang.forEach(function (o) { tambah("tadbir", o.nama, o.syarikat.length + " jawatan anak syarikat", o.peranan + " " + o.syarikat.join(" ")); });
  D.tatatertib.kes.forEach(function (k) { tambah("akauntabiliti", k.pegawai, "Tatatertib kluster " + k.kluster, k.keputusan + " " + k.rayuan + " " + k.kini); });
  D.laporanPolis.baris.forEach(function (b) { tambah("akauntabiliti", b.repot, b.tarikh + " · laporan polis", b.isu + " " + b.pengadu); });
  D.bonusTHProperties.forEach(function (t) {
    t.penerima.forEach(function (p) { tambah("bonus", p.nama, "Penerima bonus " + L.rm(p.jumlah), t.tajuk); });
  });
  D.bluechip.baris.forEach(function (b) { tambah("ujsb", b.kaunter, "Saham dipindah ke UJSB", "bluechip saham mewah"); });
  D.rofr.baris.forEach(function (b) { tambah("ujsb", b.syarikat, "Tawaran ROFR " + b.tarikh, "hak penolakan pertama"); });
  D.komitmenJaminan.baris.forEach(function (b) { tambah("ujsb", b.entiti, "Komitmen jaminan Kerajaan", "jaminan"); });
  D.amaran.baris.forEach(function (b) { tambah("tadbir", b.tajuk, b.tarikh + " · " + b.dari + " → " + b.kepada, b.tindakan); });
  Object.keys(D.glosari).forEach(function (k) { tambah("sumber", k, "Istilah", D.glosari[k]); });

  /* ---------- Shell ---------- */
  var kandungan = el("main", { id: "kandungan" });
  var tabs = el("nav", { class: "tabs" });
  var semasa = null;

  function pergi(id, noScroll) {
    if (!MODUL.some(function (m) { return m.id === id; })) id = MODUL[0].id;
    semasa = id;
    if (location.hash.slice(1) !== id) history.replaceState(null, "", "#" + id);
    Array.prototype.forEach.call(tabs.children, function (b) {
      b.classList.toggle("aktif", b.getAttribute("data-id") === id);
      if (b.getAttribute("data-id") === id && b.scrollIntoView) {
        b.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
      }
    });
    L.clear(kandungan);
    var m = MODUL.filter(function (x) { return x.id === id; })[0];
    kandungan.appendChild(m.fn());
    if (!noScroll) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }
  window.pergiModul = pergi;

  MODUL.forEach(function (m) {
    tabs.appendChild(el("button", { type: "button", "data-id": m.id, text: m.label, onclick: function () { pergi(m.id); } }));
  });

  /* ---------- Carian ---------- */
  var hasilBox = el("div", { class: "cari-hasil", style: "display:none" });
  var input = el("input", {
    type: "search", placeholder: "Cari nama, syarikat, syor…", "aria-label": "Cari dalam laporan",
    oninput: function (e) { cari(e.target.value); },
    onfocus: function (e) { if (e.target.value) cari(e.target.value); }
  });
  function cari(q) {
    q = (q || "").trim().toLowerCase();
    L.clear(hasilBox);
    if (q.length < 2) { hasilBox.style.display = "none"; return; }
    var hits = INDEKS.filter(function (it) { return it.teks.indexOf(q) >= 0; }).slice(0, 24);
    if (!hits.length) {
      hasilBox.appendChild(el("div", { class: "cari-kosong", text: "Tiada padanan untuk “" + q + "”." }));
    } else {
      hits.forEach(function (h) {
        hasilBox.appendChild(el("button", {
          class: "cari-item", type: "button",
          onclick: function () {
            hasilBox.style.display = "none"; input.value = "";
            pergi(h.modul);
            if (h.aksi) setTimeout(h.aksi, 60);
          }
        }, [
          el("div", { class: "cari-tajuk", text: h.tajuk }),
          el("div", { class: "cari-sub", text: h.sub + " → " + (MODUL.filter(function (m) { return m.id === h.modul; })[0] || {}).label })
        ]));
      });
    }
    hasilBox.style.display = "block";
  }
  document.addEventListener("click", function (e) {
    if (!hasilBox.contains(e.target) && e.target !== input) hasilBox.style.display = "none";
  });

  var topbar = el("header", { class: "topbar" }, [
    el("div", { class: "topbar-dalam" }, [
      el("div", { class: "tb-atas" }, [
        el("div", { class: "tb-logo", text: "TH" }),
        el("div", { class: "tb-teks" }, [
          el("div", { class: "tb-tajuk", text: "Laporan RCI Tabung Haji" }),
          el("div", { class: "tb-sub", text: "Siasatan pengurusan & operasi LTH 2014–2020 · laporan 19 Julai 2022" })
        ]),
        el("div", { class: "tb-cari" }, [input, hasilBox])
      ]),
      tabs
    ])
  ]);

  var kaki = el("footer", { class: "kaki" }, [
    el("p", { html: "Dashboard ini dibina sepenuhnya daripada <strong>Laporan Suruhanjaya Siasatan Diraja Tabung Haji</strong> (19 Julai 2022). Tiada data luar ditambah dan tiada angka dicipta. Teks sumber: <a href='" + D.REPO + "' target='_blank' rel='noopener'>github.com/SyahmiRafsan/rci-tabunghaji</a>." }),
    el("p", { html: "Setiap cip <span class='src' style='pointer-events:none'>m/s</span> membuka muka surat asal laporan supaya setiap dakwaan boleh disemak sendiri." }),
    el("div", { class: "legenda-kelas" }, Object.keys(L.KELAS).map(function (k) {
      return el("div", {}, [L.tag(k), el("span", { text: L.KELAS[k].d })]);
    })),
    el("p", { style: "margin-top:14px", html: "Ini bukan penerbitan rasmi Lembaga Tabung Haji, Kerajaan Malaysia atau Suruhanjaya Siasatan Diraja." })
  ]);

  document.body.appendChild(topbar);
  document.body.appendChild(kandungan);
  document.body.appendChild(kaki);

  window.addEventListener("hashchange", function () { pergi(location.hash.slice(1)); });
  pergi(location.hash.slice(1) || "peta", true);
})();
