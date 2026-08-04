/* RCI TH — app: router, carian global, glosari, tema */
(function () {
  "use strict";
  var R = window.RCI, L = window.RL;

  var TABS = [
    { id: "gambaran", no: "1", label: "Gambaran" },
    { id: "krisis", no: "2", label: "Krisis Kewangan" },
    { id: "pelaburan", no: "3", label: "Pelaburan" },
    { id: "penyelamatan", no: "4", label: "Penyelamatan UJSB" },
    { id: "haji", no: "5", label: "Haji & Pendeposit" },
    { id: "tadbir", no: "6", label: "Tadbir Urus" },
    { id: "integriti", no: "7", label: "Integriti & Cadangan" }
  ];
  var colors = ["var(--pri)", "var(--gold)", "var(--neg)", "var(--info)", "var(--sim)", "var(--uni)", "var(--warn)"];

  /* ---------- indeks carian ---------- */
  var FACTS = [
    { t: "Hibah 2014 6.25%", d: "Kadar keuntungan tahunan tertinggi dalam tempoh siasatan — 6.25% + 2.00% hibah haji.", s: "Krisis Kewangan", p: 120 },
    { t: "Hibah 2017 4.50% + 1.75%", d: "Hibah dibayar walaupun LTH tiada keuntungan sebenar — kos sehingga RM2.75 bilion.", s: "Krisis Kewangan", p: 22 },
    { t: "Hibah 2018 1.25%", d: "Penurunan mendadak selepas penstrukturan — mencetuskan panik pendeposit.", s: "Krisis Kewangan", p: 120 },
    { t: "Deposit RM73 → RM69 bilion", d: "Pengecutan deposit selepas pengumuman hibah 1.25% (2019) — risiko bank run.", s: "Haji & Pendeposit", p: 122 },
    { t: "Deposit RM88 bilion", d: "Deposit semasa siasatan; jaminan Kerajaan s.24 Akta 535 bernilai RM88 bilion.", s: "Haji & Pendeposit", p: 218 },
    { t: "Untung RM3.4 bilion vs rugi RM1.4 bilion", d: "FY2017: keuntungan dilaporkan vs kerugian MFRS penuh (analisa PwC).", s: "Krisis Kewangan", p: 149 },
    { t: "RM227.81 juta rosot nilai tidak direkod", d: "Subsidiari & bersekutu FY2017 — termasuk TH Heavy Engineering RM164.58 juta.", s: "Krisis Kewangan", p: 18 },
    { t: "Polisi rosot nilai 70%→85%→90%", d: "Ditukar dua kali dalam 2017; rosot nilai yang direkod hanya RM1.0 juta.", s: "Krisis Kewangan", p: 148 },
    { t: "RAV +RM4.47 bilion", d: "Nilai tambahan yang menjadikan LTH 'solven' — aset 70,317 + RAV = 74,783 vs liabiliti 74,410.", s: "Krisis Kewangan", p: 116 },
    { t: "Sijil Audit Bersih 2014–2017", d: "JAN memberi sijil bersih walaupun isu besar wujud; 2017 disertai Emphasis of Matter.", s: "Krisis Kewangan", p: 125 },
    { t: "KAN surat 19 Dis 2018", d: "Ketua Audit Negara mengakui pendapat berteguran tidak diberi kerana bimbang reaksi pendeposit.", s: "Krisis Kewangan", p: 133 },
    { t: "FGV kerugian RM1.06 bilion", d: "Kerugian tidak nyata pegangan FGV — harga jatuh ke RM0.885 dari kos RM4.58/unit.", s: "Pelaburan", p: 193 },
    { t: "FGV UJSB ambil alih RM4.62", d: "UJSB mengambil alih 283.7 juta unit pada kos — LTH elak kerugian ~RM1.1 bilion.", s: "Pelaburan", p: 193 },
    { t: "THIP USD100 juta", d: "Pengurangan harga jualan 95% ekuiti ladang Riau — dan pendahuluan USD178.6 juta.", s: "Pelaburan", p: 178 },
    { t: "Trurich RM364.31 juta rosot penuh", d: "Pelaburan JV sawit Kalimantan dirosot nilai sepenuhnya; pinjaman Maybank USD179 juta.", s: "Pelaburan", p: 182 },
    { t: "DSSB RM526 juta", d: "Pelaburan sawit Pahang; RM257 juta dirosot kepada RM32 juta; rungkaian selesai.", s: "Pelaburan", p: 180 },
    { t: "Al-Rawda SR1,426 juta", d: "Pajakan 4 hotel Mekah/Madinah; tunggakan SR560.7 juta; timbang tara berjalan.", s: "Pelaburan", p: 185 },
    { t: "UJSB premium RM10.2 bilion", d: "Aset RM9.7 bilion dipindah pada RM19.9 bilion — premium kepada nilai pasaran.", s: "Penyelamatan UJSB", p: 159 },
    { t: "Sukuk Siri 1 RM10B / nominal RM13.2B", d: "7 tahun, 4.05% setahun — LTH melanggan penuh.", s: "Penyelamatan UJSB", p: 162 },
    { t: "Sukuk Siri 2 RM9.6B / nominal RM14.3B", d: "10 tahun, 4.10% setahun — LTH melanggan penuh.", s: "Penyelamatan UJSB", p: 162 },
    { t: "RM17.8 bilion peruntukan Kerajaan", d: "RM500 juta (2020) + RM17.3 bilion (purata RM1.73 bilion setahun, RMK12 & 13).", s: "Penyelamatan UJSB", p: 165 },
    { t: "26% pendapatan dari UJSB", d: "Pengakruan Sukuk UJSB ≈ 26% pendapatan tahunan LTH; >1/3 agihan hibah; ≈31% aset.", s: "Penyelamatan UJSB", p: 171 },
    { t: "29 hartanah RM2.25B → RM1.2B", d: "Nilai pindahan vs nilai pasaran Dis 2021 — susut selepas pemindahan.", s: "Penyelamatan UJSB", p: 161 },
    { t: "5 saham mewah −RM946 juta", d: "Axiata, Maxis, MISC, Digi, TM jatuh antara harga pindah dan 31 Dis 2018.", s: "Penyelamatan UJSB", p: 161 },
    { t: "LTH terima RM500 juta tunai", d: "Berbanding nilai pasaran aset RM9.73 bilion yang dipindahkan.", s: "Penyelamatan UJSB", p: 166 },
    { t: "HAFIS RM106 → RM299 juta", d: "Subsidi haji 2014–2019; peratusan kos naik 38% → 56%.", s: "Haji & Pendeposit", p: 204 },
    { t: "HAFIS RM742 juta 2030", d: "Unjuran subsidi jika bayaran dikekalkan RM12,980 — 65.6% kos haji.", s: "Haji & Pendeposit", p: 205 },
    { t: "Kos haji RM15,553 → RM25,540", d: "2013 → 2022; bayaran RM9,980 kekal 13 tahun.", s: "Haji & Pendeposit", p: 23 },
    { t: "75% deposit oleh 5% pendeposit", d: "Tumpuan deposit — asas kerapuhan dan tekanan hibah.", s: "Haji & Pendeposit", p: 216 },
    { t: "65% pendeposit ≤RM2,000", d: "Majoriti penabung kecil — yang paling bergantung kepada LTH.", s: "Haji & Pendeposit", p: 207 },
    { t: "Giliran haji 130 → 33 tahun", d: "Dengan deposit pendaftaran RM1,300 → RM12,980.", s: "Haji & Pendeposit", p: 236 },
    { t: "Bonus RM74 juta 2014", d: "Sehingga 13 bulan gaji (1–11 + 2 khas) — peruntukan terbesar.", s: "Tadbir Urus", p: 137 },
    { t: "Bonus THP RM1,148,400", d: "2017 — diluluskan Exco tanpa kelulusan pemegang saham (langgar s.230 Akta 777).", s: "Tadbir Urus", p: 142 },
    { t: "Bonus THP Australia RM1,045,000", d: "2018 — langgar s.230(3) Akta Syarikat 2016.", s: "Tadbir Urus", p: 143 },
    { t: "Johan Abdullah 18 jawatan", d: "CEO LTH 2016–2018 memegang 18 jawatan anak syarikat.", s: "Tadbir Urus", p: 86 },
    { t: "Rozaida 23 jawatan proksi", d: "CFO memegang 23 jawatan proksi mewakili LTH.", s: "Tadbir Urus", p: 89 },
    { t: "Penamatan tanpa sebab x2", d: "CEO Nik Hasyudeen (5 Mei 2021) dan Pengerusi Md Nor (15 Okt 2021).", s: "Tadbir Urus", p: 82 },
    { t: "BNM amaran 2014–2017", d: "Surat teguran tentang kecairan, rizab dan hibah tinggi — sebelum krisis.", s: "Tadbir Urus", p: 212 },
    { t: "Laporan polis 4", d: "THIP, Trurich, Yayasan TH, hibah 2017 — 2 dirujuk ke Jabatan Peguam Negara.", s: "Integriti", p: 194 },
    { t: "SPRM 6 aduan", d: "Rasuah & penyelewengan — semua masih dalam siasatan.", s: "Integriti", p: 201 },
    { t: "Tatatertib 5 pegawai", d: "Buang kerja diringankan kepada turun pangkat pada rayuan; semua masih bekerja.", s: "Integriti", p: 198 },
    { t: "25 cadangan RCI", d: "Termasuk pinda Akta 535, Dana Haji, audit swasta, hadkan subsidi, larang ahli politik aktif.", s: "Integriti", p: 230 },
    { t: "Jaminan Kerajaan RM88 bilion", d: "Jika LTH gagal, jaminan s.24 Akta 535 kepada pendeposit diaktifkan — ancaman sistemik.", s: "Integriti", p: 32 },
    { t: "8.6 juta pendeposit", d: "Setakat 22 Julai 2022 — setiap seorang terdedah kepada keputusan LTH.", s: "Gambaran", p: 229 },
    { t: "Hibah 1966–2021 RM37.52 bilion", d: "Jumlah agihan keuntungan sepanjang sejarah LTH.", s: "Gambaran", p: 229 },
    { t: "HAFIS sejak 2001 RM2.02 bilion", d: "Jumlah subsidi haji sepanjang sejarah.", s: "Gambaran", p: 229 },
    { t: "1.46 juta jemaah 1963–2021", d: "Bilangan orang Islam Malaysia yang menunaikan haji melalui sistem ini.", s: "Gambaran", p: 229 }
  ];
  R.glosari.forEach(function (g) {
    FACTS.push({ t: g.istilah, d: g.makna, s: "Glosari", p: null });
  });
  R.cadangan.forEach(function (c) {
    FACTS.push({ t: "Cadangan C" + c.no + " — " + c.tema, d: c.ringkas, s: "Cadangan", p: c.p });
  });

  /* ---------- pembina UI ---------- */
  var viewEl = document.getElementById("view");
  var railEl = document.getElementById("rail");

  function buildTabs() {
    TABS.forEach(function (t, i) {
      var a = document.createElement("a");
      a.href = "#/" + t.id;
      a.className = "tab";
      a.dataset.tab = t.id;
      a.innerHTML = '<i style="background:' + colors[i] + '"></i><span class="tnum">' + t.no + ".</span> " + t.label;
      railEl.appendChild(a);
    });
  }

  function route() {
    var h = (location.hash || "#/gambaran").replace(/^#\/?/, "");
    var tab = TABS.filter(function (t) { return t.id === h; })[0];
    if (!tab) tab = TABS[0];
    var builder = window.RCIV[tab.id];
    viewEl.innerHTML = "";
    var node = builder();
    viewEl.appendChild(node);
    L.queryAll(railEl, ".tab").forEach(function (a) {
      a.classList.toggle("on", a.dataset.tab === tab.id);
    });
    document.getElementById("tbView").textContent = "Laporan RCI Tabung Haji";
    document.getElementById("tbSub").textContent = tab.label;
    document.title = tab.label + " — RCI Tabung Haji · Dashboard Data";
    if (window.scrollY > 0) window.scrollTo(0, 0);
  }

  /* ---------- carian global ---------- */
  var searchModal = null;
  function openSearch() {
    var box = L.h("div");
    var inp = L.h("input", { type: "search", placeholder: "Cari angka, istilah, nama atau isu… (cth: hibah, FGV, RM88, RAV)", autofocus: true, "aria-label": "Cari dalam laporan" });
    var res = L.h("div", { cls: "search-res" });
    var hint = L.h("p", { style: "font-size:12px;color:var(--ink3);margin:8px 0 0" }, FACTS.length + " fakta & istilah berindeks — setiap hasil boleh dibuka ke halaman sumber laporan.");
    box.appendChild(inp);
    box.appendChild(res);
    box.appendChild(hint);
    function run() {
      var q = inp.value.trim().toLowerCase();
      res.innerHTML = "";
      if (!q) { res.innerHTML = '<p style="font-size:13px;color:var(--ink3)">Taip untuk mencari…</p>'; return; }
      var hits = FACTS.filter(function (f) {
        return (f.t + " " + f.d).toLowerCase().indexOf(q) >= 0;
      }).slice(0, 24);
      if (!hits.length) { res.innerHTML = '<p style="font-size:13px;color:var(--ink3)">Tiada padanan. Cuba istilah lain — atau layari laporan asal.</p>'; return; }
      hits.forEach(function (f) {
        var d = L.h("div", { cls: "sres" });
        d.appendChild(L.h("span", { cls: "sres-s" }, f.s));
        d.appendChild(L.h("div", null, L.h("b", null, f.t), " — ", f.d));
        if (f.p) d.appendChild(L.h("span", { cls: "sres-p", html: L.srcLink(f.p) }));
        d.addEventListener("click", function () {
          if (f.p) window.open("https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md#pdf-page-" + f.p, "_blank");
        });
        res.appendChild(d);
      });
    }
    inp.addEventListener("input", run);
    run();
    var m = L.modal(box);
    setTimeout(function () { inp.focus(); }, 60);
  }

  /* ---------- glosari ---------- */
  function openGlossary() {
    var box = L.h("div");
    box.appendChild(L.h("h3", null, "Kamus istilah mudah"));
    box.appendChild(L.h("p", { style: "font-size:13px;color:var(--ink2);margin:0 0 10px" }, "Istilah teknikal dalam laporan — diterangkan dengan bahasa seharian."));
    var g = L.h("div", { cls: "gloss" });
    R.glosari.forEach(function (x) {
      var det = L.h("details");
      det.appendChild(L.h("summary", null, L.h("span", { cls: "g-ic" }, "📖"), x.istilah));
      det.appendChild(L.h("div", { cls: "g-body" }, x.makna));
      g.appendChild(det);
    });
    box.appendChild(g);
    L.modal(box);
  }

  /* ---------- tema ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-tema", t);
    try { localStorage.setItem("rci-tema", t); } catch (e) {}
    var b = document.getElementById("btnTheme");
    if (b) b.textContent = t === "gelap" ? "☀️" : "🌙";
  }

  /* ---------- butang ---------- */
  function wire() {
    document.getElementById("btnSearch").addEventListener("click", openSearch);
    document.getElementById("btnGloss").addEventListener("click", openGlossary);
    var themeBtn = document.getElementById("btnTheme");
    themeBtn.addEventListener("click", function () {
      applyTheme(document.documentElement.getAttribute("data-tema") === "gelap" ? "cerah" : "gelap");
    });
    var saved = null;
    try { saved = localStorage.getItem("rci-tema"); } catch (e) {}
    if (!saved) saved = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "gelap" : "cerah";
    applyTheme(saved);
    window.addEventListener("hashchange", route);
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildTabs();
    wire();
    route();
  });
})();
