/* ================== app.js — router, carian, glosari, tema ================== */
(function () {
  "use strict";
  var D = window.RCIDATA, L = window.LIB, V = window.VIEWS;

  var viewEl = document.getElementById("view");
  var railEl = document.getElementById("rail");
  var subEl = document.getElementById("tbSub");
  var curSort = "rosot", curDir = -1;
  var SRCLINK = "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md#pdf-page-";

  /* ================== navigasi (pills + hash router) ================== */
  var colors = ["#0d5c46","#b3382c","#c9a24b","#6a4a9a","#2b5d8a","#11938a","#b06a1b","#2b5d8a"];
  D.sections.forEach(function (s, i) {
    var b = document.createElement("button");
    b.className = "pill";
    b.dataset.goto = s.id;
    b.style.borderTop = "3px solid " + colors[i];
    b.appendChild(document.createTextNode(s.label));
    railEl.appendChild(b);
  });

  function route() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    var id = (V && V[h]) ? h : "gambaran";
    if (!V || !V[id]) id = "gambaran";
    viewEl.innerHTML = '<div class="section">' + V[id]() + "</div>";
    railEl.querySelectorAll(".pill").forEach(function (p) {
      p.classList.toggle("on", p.dataset.goto === id);
    });
    var sec = D.sections.filter(function (s) { return s.id === id; })[0];
    subEl.textContent = sec ? sec.label : "Gambaran";
    document.title = (sec ? sec.label + " — " : "") + "RCI Tabung Haji · Data Tersembunyi dalam Dua Buku";
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  function pergi(id) {
    if (V && V[id]) { location.hash = "#/" + id; }
  }

  window.addEventListener("hashchange", route);

  /* ================== toast ================== */
  var toastEl = document.getElementById("toast"), toastT = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  /* ================== modal kawalan ================== */
  function openModal(el) { el.hidden = false; }
  function closeModal(el) { el.hidden = true; }
  [["srcClose", "srcModal"], ["glossClose", "glossModal"], ["searchClose", "searchModal"]].forEach(function (p) {
    document.getElementById(p[0]).addEventListener("click", function () { closeModal(document.getElementById(p[1])); });
  });
  ["srcModal", "glossModal", "searchModal"].forEach(function (id) {
    document.getElementById(id).addEventListener("click", function (e) {
      if (e.target === this) closeModal(this);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { document.querySelectorAll(".modal.veil").forEach(function (m) { m.hidden = true; }); }
  });

  /* ================== sumber (delegated on sn[data-p]) ================== */
  document.addEventListener("click", function (e) {
    var sn = e.target.closest ? e.target.closest("sn[data-p]") : null;
    if (sn) openSource(parseInt(sn.getAttribute("data-p"), 10) || 0, sn.getAttribute("data-k") || "");
  });

  function openSource(page, key) {
    var title = page ? "Sumber — PDF ms. " + page : "Sumber";
    document.getElementById("srcTitle").textContent = title;
    var body = document.getElementById("srcBody");
    var facts = (D.facts || []).filter(function (f) { return f.p === page; });
    var html = "";
    if (page) {
      html += '<p style="font-size:13px;color:var(--muted);margin:0 0 8px">Semakan daripada teks laporan rasmi (OCR). Buka terus ke muka surat: '
        + '<a href="' + SRCLINK + page + '" target="_blank" rel="noopener">rci-tabung-haji.md#pdf-page-' + page + '</a></p>';
    }
    if (key) html += '<p class="ctx" style="font-size:12px;color:var(--muted)">Rujukan: <b>' + L.esc(key) + '</b></p>';
    if (facts.length) {
      html += facts.map(function (f) {
        return '<div class="srcRec"><div class="q">' + L.esc(f.s) + "</div><div class='ctx'>" + L.tag(f.t) + "<span>PDF ms. " + f.p + "</span></div></div>";
      }).join("");
    } else {
      html += '<p style="font-size:13.5px;color:var(--muted)">Fakta berkait halaman ini tidak disenaraikan dalam indeks ringkas kami. Rujuk terus fail laporan pada muka surat berkenaan.</p>';
    }
    body.innerHTML = html;
    openModal(document.getElementById("srcModal"));
  }

  /* ================== glosari (filter) ================== */
  var glossBody = document.getElementById("glossBody");
  function renderGloss(q) {
    q = (q || "").trim().toLowerCase();
    var items = (D.glossary || []).filter(function (g) {
      return !q || (g.t + " " + g.d).toLowerCase().indexOf(q) >= 0;
    });
    glossBody.innerHTML = items.map(function (g) {
      return '<button class="gli"><b>' + L.esc(g.t) + '</b><small>' + L.esc(g.d) + "</small></button>";
    }).join("") || '<p style="font-size:13px;color:var(--muted);padding:8px 4px">Tiada padanan.</p>';
  }
  document.getElementById("btnGloss").addEventListener("click", function () {
    renderGloss("");
    document.getElementById("glossFind").value = "";
    openModal(document.getElementById("glossModal"));
  });
  document.getElementById("glossFind").addEventListener("input", function (e) { renderGloss(e.target.value); });

  /* ================== carian global (indeks fakta + glosari) ================== */
  var INDEX = [];
  (D.facts || []).forEach(function (f) {
    INDEX.push({ t: f.s, d: "Fakta laporan · PDF ms. " + f.p, sec: f.p ? "pdf-" + f.p : "", p: f.p, k: "fakta", q: f.s });
  });
  (D.glossary || []).forEach(function (g) {
    INDEX.push({ t: g.t, d: g.d, sec: "glossary", p: null, k: "istilah", q: g.t + " " + g.d });
  });

  function hi(text, q) {
    var i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return L.esc(text);
    return L.esc(text.slice(0, i)) + '<span class="hi">' + L.esc(text.slice(i, i + q.length)) + "</span>" + L.esc(text.slice(i + q.length));
  }

  function renderSearch(q) {
    var res = document.getElementById("searchBody");
    q = (q || "").trim();
    if (!q) { res.innerHTML = '<p style="font-size:13px;color:var(--muted);padding:8px 4px">Taip untuk mencari angka, istilah atau fakta…</p>'; return; }
    var ql = q.toLowerCase();
    var hits = INDEX.filter(function (f) { return f.q.toLowerCase().indexOf(ql) >= 0; }).slice(0, 40);
    if (!hits.length) { res.innerHTML = '<p style="font-size:13px;color:var(--muted);padding:8px 4px">Tiada padanan. Cuba istilah lain — atau rujuk laporan asal.</p>'; return; }
    res.innerHTML = hits.map(function (f) {
      return '<button class="gli" data-sec="' + f.sec + '" data-p="' + (f.p || "") + '">'
        + (f.k === "istilah" ? '<b>📖 ' + hi(f.t, q) + '</b>' : '<b>' + hi(f.t, q) + '</b>')
        + '<small>' + hi(f.d, q) + "</small></button>";
    }).join("");
  }
  document.getElementById("btnSearch").addEventListener("click", function () {
    document.getElementById("searchFind").value = "";
    renderSearch("");
    openModal(document.getElementById("searchModal"));
  });
  document.getElementById("searchFind").addEventListener("input", function (e) { renderSearch(e.target.value); });
  document.getElementById("searchBody").addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".gli[data-p]") : null;
    if (!b) return;
    var p = b.getAttribute("data-p");
    if (p) {
      closeModal(document.getElementById("searchModal"));
      openSource(parseInt(p, 10) || 0, "");
    }
  });

  /* ================== tema ================== */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("rci-th-tema", t); } catch (e) {}
    var btn = document.getElementById("btnTheme");
    if (btn) btn.textContent = t === "dark" ? "☀️" : "🌙";
  }
  document.getElementById("btnTheme").addEventListener("click", function () {
    applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
  var saved = null;
  try { saved = localStorage.getItem("rci-th-tema"); } catch (e) {}
  if (!saved) saved = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  applyTheme(saved);

  /* ================== interaksi dalam view (delegated) ================== */
  document.addEventListener("click", function (e) {
    var t = e.target;
    var navcard = t.closest ? t.closest(".navcard[data-goto]") : null;
    if (navcard) { pergi(navcard.getAttribute("data-goto")); return; }
    var brand = t.closest ? t.closest("#brandBtn") : null;
    if (brand) { pergi("gambaran"); return; }

    var wrap = document.getElementById("invWrap");
    if (!wrap) return;

    var th = t.closest ? t.closest("#invTable th[data-k]") : null;
    if (th) {
      var k = th.getAttribute("data-k");
      var dir = (curSort === k) ? -curDir : 1;
      if (k !== "n") dir = (curSort === k) ? -curDir : -1;
      curSort = k; curDir = dir;
      wrap.innerHTML = V.invSet({ sort: k, dir: dir });
      return;
    }
    var cb = t.closest ? t.closest("[data-cat]") : null;
    if (cb) { wrap.innerHTML = V.invSet({ cat: cb.getAttribute("data-cat") }); return; }
    var sb = t.closest ? t.closest("[data-st]") : null;
    if (sb) { wrap.innerHTML = V.invSet({ st: sb.getAttribute("data-st") }); return; }
  });

  /* link dalam teks: #/krisis */
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#/"]') : null;
    if (a) { /* biarkan hashchange route */ return; }
  });

  /* ================== mula ================== */
  route();
})();
