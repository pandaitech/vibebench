/* RCI TH — LIB: helpers + enjin carta SVG (tanpa kebergantungan luar) */
(function () {
  "use strict";
  var REPORT = "https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md";

  /* ---------- Format angka (bahasa awam) ---------- */
  function rm(v) {
    var a = Math.abs(v), s = v < 0 ? "-" : "";
    if (a >= 1e9) return s + "RM" + trim2(a / 1e9) + " bilion";
    if (a >= 1e6) return s + "RM" + trim2(a / 1e6) + " juta";
    if (a >= 1e3) return s + "RM" + trim2(a / 1e3) + " ribu";
    return s + "RM" + Math.round(a).toLocaleString("ms-MY");
  }
  function rm0(v) { return (v < 0 ? "-" : "") + "RM" + Math.round(Math.abs(v)).toLocaleString("ms-MY"); }
  function trim2(x) { return (Math.round(x * 100) / 100).toLocaleString("ms-MY", { maximumFractionDigits: 2 }); }
  function pct(v, d) { return (Math.round(v * Math.pow(10, d || 1)) / Math.pow(10, d || 1)) + "%"; }
  function rmAxis(v) {
    var a = Math.abs(v), s = v < 0 ? "-" : "";
    if (a >= 1e9) return s + "RM" + trim2(a / 1e9) + "B";
    if (a >= 1e6) return s + "RM" + trim2(a / 1e6) + "J";
    if (a >= 1e3) return s + "RM" + trim2(a / 1e3) + "K";
    return s + "RM" + Math.round(a);
  }
  function niceMax(v) {
    var p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p;
    var step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
    return step * p;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  /* ---------- DOM ---------- */
  function h(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "html") e.innerHTML = attrs[k];
      else if (k === "text") e.textContent = attrs[k];
      else if (k === "cls") e.className = attrs[k];
      else if (k === "on") for (var ev in attrs[k]) e.addEventListener(ev, attrs[k][ev]);
      else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), attrs[k]);
      else if (k in e) e[k] = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null) continue;
      if (typeof c !== "string" && typeof c !== "object") throw new Error("h(): child bukan Node/string → " + typeof c + " :: " + c + " (tag=" + tag + ")");
      e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return e;
  }
  function svgEl(tag, attrs, kids) {
    var ns = "http://www.w3.org/2000/svg", e = document.createElementNS(ns, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    (kids || []).forEach(function (c) { if (c != null) e.appendChild(c); });
    return e;
  }
  function svgWrap(w, height, inner) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 " + w + " " + height);
    s.setAttribute("preserveAspectRatio", "xMidYMid meet");
    s.classList.add("svg-chart");
    s.innerHTML = inner;
    return s;
  }

  /* ---------- Sumber & jenis data ---------- */
  function srcLink(p) {
    var pages = Array.isArray(p) ? p : [p];
    var txt = "Sumber: laporan, m.s. " + pages.map(function (x) { return x + ""; }).join(" & ");
    return '<a class="src" target="_blank" rel="noopener" href="' + REPORT + "#pdf-page-" + pages[0] + '">' +
      txt + ' <svg viewBox="0 0 12 12" width="9" height="9" aria-hidden="true"><path d="M3 9L9 3M5 3h4v4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></a>';
  }
  function badge(type) {
    var m = { fakta: ["FAKTA LAPORAN", "b-fakta", "Angka terus dari laporan RCI."],
      terbitan: ["DATA TERBITAN", "b-terbitan", "Dikira oleh dashboard ini daripada angka laporan."],
      unjuran: ["UNJURAN", "b-unjuran", "Anggaran masa depan yang disebut dalam laporan — bukan fakta."],
      simulasi: ["SIMULASI", "b-simulasi", "Andaian yang boleh diubah untuk menguji keadaan."] };
    var x = m[type] || m.fakta;
    return '<span class="badge ' + x[1] + '" title="' + x[2] + '">' + x[0] + "</span>";
  }
  function badgeNote(type, note) {
    return '<span class="badgenote">' + badge(type) + " " + esc(note) + "</span>";
  }

  /* ---------- Kad analisis (insight) ---------- */
  function insightCard(o) {
    var rows = "";
    function row(icon, label, text, cls) {
      if (!text) return "";
      return '<div class="ins-row' + (cls ? " " + cls : "") + '"><span class="ins-ic" aria-hidden="true">' + icon + "</span>" +
        "<div><b>" + label + "</b><span>" + text + "</span></div></div>";
    }
    rows += row("❔", "Apa yang ditunjukkan", o.tunjuk);
    rows += row("❗", "Kenapa ia penting", o.penting);
    rows += row("✅", "Apa yang boleh disimpulkan", o.rumusan, "ok");
    rows += row("⚠️", "Jangan salah faham", o.jaga, "warn");
    var src = o.p ? '<div class="ins-src">' + srcLink(o.p) + "</div>" : "";
    return '<details class="insight"><summary><span class="ins-sum-ic" aria-hidden="true">🔍</span>' +
      (o.sum || "Baca analisis — apa maksud ini?") + "</summary><div class='ins-body'>" + rows + src + "</div></details>";
  }

  /* ---------- Pembina kad carta ---------- */
  function chartCard(cfg) {
    var c = document.createElement("section");
    c.className = "card chart-card";
    var head = '<h3 class="cc-q">' + cfg.q + "</h3>";
    var sub = cfg.baca ? '<p class="cc-sub">' + cfg.baca + "</p>" : "";
    var chart = '<div class="cc-chart"></div>';
    var foot = '<div class="cc-foot">' + (cfg.type ? badgeNote(cfg.type, cfg.typeNote || "") : "") + srcLink(cfg.p) + "</div>";
    c.innerHTML = head + sub + chart + foot + (cfg.ins ? insightCard(cfg.ins) : "");
    var box = c.querySelector(".cc-chart");
    if (cfg.chart && cfg.chart.nodeType === 1) box.appendChild(cfg.chart);
    else box.innerHTML = cfg.chart || cfg.html || "";
    if (cfg.after) box.innerHTML = cfg.after();
    return c;
  }

  /* ---------- Carta: bar menegak ---------- */
  function bars(o) {
    var W = o.w || 560, T = o.t || 16, B = o.b || 34, L = o.l || 6, R = o.r || 6;
    var d = o.data, hasNeg = d.some(function (x) { return x.v < 0; });
    var max = niceMax(Math.max.apply(null, d.map(function (x) { return Math.abs(x.v); })) || 1);
    var H = (o.h || 230) + T + B, plotH = H - T - B;
    var bw = (W - L - R) / d.length, barW = Math.min(44, bw * 0.52);
    var zeroY = hasNeg ? T + plotH * (max / (2 * max)) : T + plotH;
    var parts = "";
    for (var g = 0; g <= 4; g++) {
      var gy = T + plotH * g / 4;
      parts += '<line x1="' + L + '" y1="' + gy + '" x2="' + (W - R) + '" y2="' + gy + '" class="grid"/>';
      parts += '<text x="' + (L - 4) + '" y="' + (gy + 3) + '" class="axis">' + (hasNeg ? rmAxis(max - 2 * max * g / 4) : rmAxis(max * (1 - g / 4))) + "</text>";
    }
    if (hasNeg) parts += '<line x1="' + L + '" y1="' + zeroY + '" x2="' + (W - R) + '" y2="' + zeroY + '" class="zeroline"/>';
    d.forEach(function (x, i) {
      var hh = Math.max(0, Math.abs(x.v) / max * plotH * 0.5);
      var x0 = L + i * bw + (bw - barW) / 2, y0 = x.v >= 0 ? zeroY - hh : zeroY;
      var col = x.color || (x.v < 0 ? "var(--neg)" : "var(--pri)");
      var tip = x.tip || (x.label + ": " + rm(x.v));
      var rx = Math.min(4, barW / 4);
      parts += '<rect class="bar' + (o.click ? " clickable" : "") + '" x="' + x0 + '" y="' + y0 + '" width="' + barW + '" height="' + Math.max(1, hh) + '" rx="' + rx + '" fill="' + col + '" data-i="' + i + '"><title>' + esc(tip) + "</title></rect>";
      if (x.v === 0) {
        parts += '<rect x="' + x0 + '" y="' + (T + plotH - 2) + '" width="' + barW + '" height="2" fill="var(--ink3)"/>';
      }
      var lab = o.labels !== false && x.label;
      if (lab) {
        parts += '<text x="' + (x0 + barW / 2) + '" y="' + (H - 12) + '" class="xl">' + esc(String(lab)) + "</text>";
      }
      if (o.val !== false && hh > 26) {
        parts += '<text x="' + (x0 + barW / 2) + '" y="' + (y0 - 6) + '" class="vl">' + esc(x.vl != null ? x.vl : rm(x.v)) + "</text>";
      } else if (o.val !== false && x.vl) {
        parts += '<text x="' + (x0 + barW / 2) + '" y="' + (y0 + 14) + '" class="vl small" fill="var(--surface)">' + esc(x.vl) + "</text>";
      }
    });
    if (o.hl) {
      var hl = o.hl;
      var hly = T + plotH - (hl.v / max * plotH);
      parts += '<line x1="' + L + '" y1="' + hly + '" x2="' + (W - R) + '" y2="' + hly + '" class="hlline"/>';
      parts += '<text x="' + (W - R) + '" y="' + (hly - 5) + '" class="hl">' + esc(hl.label || rm(hl.v)) + "</text>";
    }
    return svgWrap(W, H, parts);
  }

  /* ---------- Carta: bar dua siri (berkumpulan) ---------- */
  function groupBars(o) {
    var W = o.w || 560, T = 16, B = 34, L = 6, R = 6, H = (o.h || 240) + T + B, plotH = H - T - B;
    var max = niceMax(Math.max.apply(null, o.data.map(function (x) { return Math.max(Math.abs(x.a || 0), Math.abs(x.b || 0)); })) || 1);
    var bw = (W - L - R) / o.data.length, barW = Math.min(22, bw * 0.3);
    var parts = "";
    for (var g = 0; g <= 4; g++) {
      var gy = T + plotH * g / 4;
      parts += '<line x1="' + L + '" y1="' + gy + '" x2="' + (W - R) + '" y2="' + gy + '" class="grid"/>';
      parts += '<text x="' + (L - 4) + '" y="' + (gy + 3) + '" class="axis">' + rmAxis(max * (1 - g / 4)) + "</text>";
    }
    o.data.forEach(function (x, i) {
      var cx = L + i * bw + bw / 2;
      [["a", o.ca], ["b", o.cb]].forEach(function (s) {
        var v = x[s[0]] || 0, hh = Math.max(0, v / max * plotH), y0 = T + plotH - hh;
        var bx = cx - barW - 2 + (s[0] === "a" ? 0 : barW + 4);
        if (v === 0) return;
        parts += '<rect x="' + bx + '" y="' + y0 + '" width="' + barW + '" height="' + Math.max(1, hh) + '" rx="3" fill="' + (s[1] || "var(--pri)") + '"><title>' + esc(x.label + " " + o.sa + ": " + rm(v)) + "</title></rect>";
      });
      parts += '<text x="' + cx + '" y="' + (H - 12) + '" class="xl">' + esc(x.label) + "</text>";
    });
    var legend = '<div class="legend">' +
      '<span><i style="background:' + (o.ca || "var(--pri)") + '"></i>' + o.sa + "</span>" +
      '<span><i style="background:' + (o.cb || "var(--gold)") + '"></i>' + o.sb + "</span></div>";
    return '<div class="chart-leg">' + legend + svgWrap(W, H, parts).outerHTML + "</div>";
  }

  /* ---------- Carta: bar berlapis (stacked) ---------- */
  function stackBars(o) {
    var W = o.w || 560, T = 16, B = 36, L = 6, R = 6, H = (o.h || 260) + T + B, plotH = H - T - B;
    var max = niceMax(Math.max.apply(null, o.data.map(function (x) { return (x.a || 0) + (x.b || 0); })) || 1);
    var bw = (W - L - R) / o.data.length, barW = Math.min(46, bw * 0.55);
    var parts = "";
    for (var g = 0; g <= 4; g++) {
      var gy = T + plotH * g / 4;
      parts += '<line x1="' + L + '" y1="' + gy + '" x2="' + (W - R) + '" y2="' + gy + '" class="grid"/>';
      parts += '<text x="' + (L - 4) + '" y="' + (gy + 3) + '" class="axis">' + rmAxis(max * (1 - g / 4)) + "</text>";
    }
    o.data.forEach(function (x, i) {
      var x0 = L + i * bw + (bw - barW) / 2;
      var ha = x.a / max * plotH, hb = x.b / max * plotH;
      var yb = T + plotH - hb;
      parts += '<rect x="' + x0 + '" y="' + yb + '" width="' + barW + '" height="' + Math.max(1, hb) + '" rx="3" fill="' + (o.cb || "var(--gold)") + '"><title>' + esc(o.sb + ": " + rm(x.b)) + "</title></rect>";
      var ya = yb - ha;
      parts += '<rect x="' + x0 + '" y="' + ya + '" width="' + barW + '" height="' + Math.max(1, ha) + '" rx="3" fill="' + (o.ca || "var(--pri)") + '"><title>' + esc(o.sa + ": " + rm(x.a)) + "</title></rect>";
      if (x.pct != null) parts += '<text x="' + (x0 + barW / 2) + '" y="' + (ya - 6) + '" class="vl">' + x.pct + "</text>";
      parts += '<text x="' + (x0 + barW / 2) + '" y="' + (H - 12) + '" class="xl">' + esc(x.label) + "</text>";
    });
    var legend = '<div class="legend">' +
      '<span><i style="background:' + (o.ca || "var(--pri)") + '"></i>' + o.sa + "</span>" +
      '<span><i style="background:' + (o.cb || "var(--gold)") + '"></i>' + o.sb + "</span></div>";
    return '<div class="chart-leg">' + legend + svgWrap(W, H, parts).outerHTML + "</div>";
  }

  /* ---------- Carta: garis dua siri + kawasan ---------- */
  function dualLine(o) {
    var W = o.w || 560, T = 18, B = 36, L = 48, R = 8, H = (o.h || 250) + T + B, plotH = H - T - B;
    var all = o.s1.pts.concat(o.s2.pts);
    var lo = Math.min.apply(null, all.map(function (p) { return p.y; })) || 0;
    var hi = Math.max.apply(null, all.map(function (p) { return p.y; })) || 1;
    var pad = (hi - lo) * 0.12; lo -= pad; hi += pad;
    function X(i, n) { return L + (W - L - R) * (n ? i / (n - 1) : i); }
    function Y(v) { return T + plotH - (v - lo) / (hi - lo) * plotH; }
    function path(pts) {
      var d = pts.map(function (p, i) { return (i ? "L" : "M") + X(i, pts.length).toFixed(1) + " " + Y(p.y).toFixed(1); }).join(" ");
      return d;
    }
    function area(pts, anchor) {
      return path(pts) + " L" + X(pts.length - 1, pts.length) + " " + (T + plotH) + " L" + X(0, pts.length) + " " + (T + plotH) + " Z";
    }
    var parts = "";
    for (var g = 0; g <= 4; g++) {
      var gy = T + plotH * g / 4;
      parts += '<line x1="' + L + '" y1="' + gy + '" x2="' + (W - R) + '" y2="' + gy + '" class="grid"/>';
      parts += '<text x="' + (L - 5) + '" y="' + (gy + 3) + '" class="axis">' + rmAxis(hi - (hi - lo) * g / 4) + "</text>";
    }
    parts += '<path d="' + area(o.s1.pts) + '" fill="' + (o.c1 || "var(--pri)") + '" opacity="0.09"/>';
    parts += '<path d="' + area(o.s2.pts) + '" fill="' + (o.c2 || "var(--neg)") + '" opacity="0.08"/>';
    [o.s1, o.s2].forEach(function (s, si) {
      var col = (si ? o.c2 : o.c1) || (si ? "var(--neg)" : "var(--pri)");
      parts += '<path d="' + path(s.pts) + '" fill="none" stroke="' + col + '" stroke-width="2.5" class="line"/>';
      s.pts.forEach(function (p, i) {
        parts += '<circle cx="' + X(i, s.pts.length) + '" cy="' + Y(p.y) + '" r="3.6" fill="' + col + '"><title>' + esc(s.name + " " + p.x + ": " + rm(p.y)) + "</title></circle>";
      });
    });
    o.xl.forEach(function (lab, i) {
      parts += '<text x="' + X(i, o.xl.length) + '" y="' + (H - 12) + '" class="xl">' + esc(lab) + "</text>";
    });
    if (o.marker) {
      var m = o.marker;
      parts += '<circle cx="' + X(m.i, o.xl.length) + '" cy="' + Y(m.y) + '" r="6" fill="none" stroke="var(--neg)" stroke-width="2"/>';
      parts += '<text x="' + (X(m.i, o.xl.length) + 8) + '" y="' + (Y(m.y) + 4) + '" class="hl" fill="var(--neg)">' + esc(m.label) + "</text>";
    }
    var legend = '<div class="legend">' +
      '<span><i style="background:' + (o.c1 || "var(--pri)") + '"></i>' + o.s1.name + "</span>" +
      '<span><i style="background:' + (o.c2 || "var(--neg)") + '"></i>' + o.s2.name + "</span></div>";
    return '<div class="chart-leg">' + legend + svgWrap(W, H, parts).outerHTML + "</div>";
  }

  /* ---------- Carta: garis berbilang siri (titik terhad) ---------- */
  function multiLine(o) {
    var W = o.w || 560, T = 20, B = 40, L = 10, R = 10, H = (o.h || 280) + T + B, plotH = H - T - B;
    var lo = 0, hi = 1;
    o.series.forEach(function (s) {
      s.pts.forEach(function (p) { hi = Math.max(hi, p.y); lo = Math.min(lo, p.y); });
    });
    var pad = (hi - lo) * 0.15; hi += pad; if (lo >= 0) lo = 0;
    function X(i) { return L + (W - L - R) * i / (o.xl.length - 1); }
    function Y(v) { return T + plotH - (v - lo) / (hi - lo) * plotH; }
    var parts = "";
    for (var g = 0; g <= 4; g++) {
      var gy = T + plotH * g / 4;
      parts += '<line x1="' + L + '" y1="' + gy + '" x2="' + (W - R) + '" y2="' + gy + '" class="grid"/>';
      parts += '<text x="' + (L - 4) + '" y="' + (gy + 3) + '" class="axis">' + rmAxis(hi - (hi - lo) * g / 4) + "</text>";
    }
    o.xl.forEach(function (lab, i) {
      parts += '<text x="' + X(i) + '" y="' + (H - 12) + '" class="xl">' + esc(lab) + "</text>";
    });
    o.series.forEach(function (s) {
      var d = s.pts.map(function (p, i) { return (i ? "L" : "M") + X(i) + " " + Y(p.y); }).join(" ");
      parts += '<path d="' + d + '" fill="none" stroke="' + s.c + '" stroke-width="2.5" class="line"/>';
      s.pts.forEach(function (p, i) {
        parts += '<circle cx="' + X(i) + '" cy="' + Y(p.y) + '" r="3.6" fill="' + s.c + '"><title>' + esc(s.name + " — " + p.x + ": RM" + p.y) + "</title></circle>";
      });
      var last = s.pts[s.pts.length - 1];
      parts += '<text x="' + (X(s.pts.length - 1) + 5) + '" y="' + (Y(last.y) + 3) + '" class="ml-name" fill="' + s.c + '">' + esc(s.name) + "</text>";
    });
    if (o.note) parts += '<text x="' + L + '" y="' + (T - 8) + '" class="axis">' + esc(o.note) + "</text>";
    return svgWrap(W, H, parts);
  }

  /* ---------- Carta: air terjun (waterfall) ---------- */
  function waterfall(o) {
    var W = o.w || 560, T = 16, B = 42, L = 8, R = 8, H = (o.h || 250) + T + B, plotH = H - T - B;
    var max = niceMax(Math.max.apply(null, o.data.map(function (x) { return Math.abs(x.v); })) || 1);
    var bw = (W - L - R) / o.data.length, barW = Math.min(52, bw * 0.55);
    var parts = "", cum = 0;
    for (var g = 0; g <= 4; g++) {
      var gy = T + plotH * g / 4;
      parts += '<line x1="' + L + '" y1="' + gy + '" x2="' + (W - R) + '" y2="' + gy + '" class="grid"/>';
      parts += '<text x="' + (L - 4) + '" y="' + (gy + 3) + '" class="axis">' + rmAxis(max * (1 - g / 4)) + "</text>";
    }
    o.data.forEach(function (x, i) {
      var x0 = L + i * bw + (bw - barW) / 2;
      var y0 = T + plotH - cum / max * plotH;
      if (x.t === "start" || x.t === "total") {
        var hh = Math.abs(x.v) / max * plotH;
        var yy = x.v >= 0 ? y0 - hh : y0;
        parts += '<rect x="' + x0 + '" y="' + yy + '" width="' + barW + '" height="' + Math.max(2, hh) + '" rx="4" fill="' + (x.v >= 0 ? "var(--pri)" : "var(--neg)") + '"><title>' + esc(x.label + ": " + rm(x.v)) + "</title></rect>";
        parts += '<text x="' + (x0 + barW / 2) + '" y="' + (yy - 6) + '" class="vl">' + (x.vl || rm(x.v)) + "</text>";
        cum = x.v;
      } else {
        var y0b = T + plotH - cum / max * plotH;
        var hh2 = Math.abs(x.v) / max * plotH;
        var yy2 = x.v > 0 ? y0b - hh2 : y0b;
        parts += '<line x1="' + (x0 - 6) + '" y1="' + y0b + '" x2="' + (x0 + barW / 2) + '" y2="' + y0b + '" class="conn"/>';
        parts += '<rect x="' + x0 + '" y="' + yy2 + '" width="' + barW + '" height="' + Math.max(2, hh2) + '" rx="3" fill="' + (x.v > 0 ? "var(--pos)" : "var(--neg)") + '" opacity="0.85"><title>' + esc(x.label + ": " + rm(x.v)) + "</title></rect>";
        parts += '<text x="' + (x0 + barW / 2) + '" y="' + (yy2 + (x.v > 0 ? -6 : 14)) + '" class="vl small">' + (x.vl || rm(Math.abs(x.v))) + "</text>";
        cum += x.v;
        parts += '<line x1="' + (x0 + barW / 2) + '" y1="' + (T + plotH - cum / max * plotH) + '" x2="' + (x0 + bw - 6) + '" y2="' + (T + plotH - cum / max * plotH) + '" class="conn"/>';
      }
      parts += '<text x="' + (x0 + barW / 2) + '" y="' + (H - 12) + '" class="xl">' + esc(x.label) + "</text>";
    });
    return svgWrap(W, H, parts);
  }

  /* ---------- Carta: bar mendatar (HTML) dengan baris boleh klik ---------- */
  function hbars(o) {
    var max = niceMax(Math.max.apply(null, o.data.map(function (x) { return Math.abs(x.v); })) || 1);
    var rows = '<div class="hbars">';
    o.data.forEach(function (x, i) {
      var w = Math.max(1.5, Math.abs(x.v) / max * 100);
      var col = x.color || (x.v < 0 ? "var(--neg)" : "var(--pri)");
      var sign = x.v < 0 ? "–" : "";
      rows += '<div class="hbar" ' + (o.click ? 'data-click="' + (o.clickIdx === undefined ? i : o.clickIdx[i]) + '"' : "") + ">" +
        '<div class="hb-label">' + esc(x.label) + "</div>" +
        '<div class="hb-track"><div class="hb-fill" style="width:' + w + '%;background:' + col + (x.sub ? ";background-image:linear-gradient(90deg," + col + " 0%,transparent 400%)" : "") + '"></div></div>' +
        '<div class="hb-val">' + (x.vl || sign + rm(x.v)) + "</div></div>";
    });
    rows += "</div>";
    if (o.legend) rows = '<div class="legend">' + o.legend.map(function (lg) {
      return '<span><i style="background:' + lg.c + '"></i>' + lg.t + "</span>";
    }).join("") + "</div>" + rows;
    return rows;
  }

  /* ---------- Carta: donut (HTML, conic-gradient) ---------- */
  function donut(o) {
    var total = o.data.reduce(function (a, b) { return a + b.v; }, 0);
    var acc = 0, stops = [], i;
    for (i = 0; i < o.data.length; i++) {
      var p = o.data[i].v / total * 360;
      stops.push(o.data[i].c + " " + acc + "deg " + (acc + p) + "deg");
      acc += p;
    }
    var grad = stops.join(",");
    var legend = '<div class="donut-legend">' + o.data.map(function (d) {
      return '<span><i style="background:' + d.c + '"></i><b>' + d.label + "</b> " + pct(d.v / total * 100, 0) + "</span>";
    }).join("") + "</div>";
    return '<div class="donut-wrap"><div class="donut" style="background:conic-gradient(' + grad + ')">' +
      '<div class="donut-hole"><b>' + o.centerV + "</b><span>" + o.centerL + "</span></div></div>" + legend + "</div>";
  }

  /* ---------- Carta: garis masa kepimpinan (gantt) ---------- */
  function gantt(o) {
    var from = o.from, to = o.to, W = o.w || 560, T = 26, B = 8, H = T + o.rows.length * 30 + B;
    var L = o.l || 150, R = 10;
    function X(y) { return L + (W - L - R) * (y - from) / (to - from); }
    var parts = "";
    for (var y = Math.ceil(from); y <= Math.floor(to); y += 2) {
      var x = X(y);
      parts += '<line x1="' + x + '" y1="' + T + '" x2="' + x + '" y2="' + (H - B) + '" class="grid"/>';
      parts += '<text x="' + x + '" y="' + (T - 6) + '" class="axis">' + y + "</text>";
    }
    o.rows.forEach(function (row, r) {
      var y0 = T + r * 30;
      parts += '<text x="' + (L - 6) + '" y="' + (y0 + 14) + '" class="gt-name" text-anchor="end">' + esc(row.name) + "</text>";
      row.bars.forEach(function (b) {
        var x1 = X(b.mula), x2 = X(b.tamat), col = b.color || "var(--pri)";
        var w = Math.max(3, x2 - x1 - 2);
        parts += '<rect x="' + (x1 + 1) + '" y="' + (y0 + 2) + '" width="' + w + '" height="16" rx="7" fill="' + col + '" opacity="' + (b.dim ? 0.35 : 0.92) + '"><title>' + esc(b.catatan || row.name) + "</title></rect>";
        if (!b.dim && w > 60) parts += '<text x="' + (x1 + w / 2) + '" y="' + (y0 + 14) + '" class="gt-in" text-anchor="middle">' + esc(b.nama || "") + "</text>";
      });
    });
    return svgWrap(W, H, parts);
  }

  /* ---------- Interaksi: slider polisi rosot nilai ---------- */
  function sliderImpairment(o) {
    var wrap = document.createElement("div");
    wrap.className = "slider-card";
    var note = document.createElement("div");
    note.className = "slider-note";
    var chartBox = document.createElement("div");
    chartBox.className = "slider-chart";
    var range = document.createElement("input");
    range.type = "range";
    range.min = 0; range.max = o.steps.length - 1; range.step = 1; range.value = 2;
    range.setAttribute("aria-label", "Pilih polisi rosot nilai");
    var track = document.createElement("div");
    track.className = "slider-track";
    o.steps.forEach(function (s, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "slider-step" + (i === range.value ? " on" : "");
      b.textContent = s.judul;
      b.addEventListener("click", function () { range.value = i; draw(); });
      track.appendChild(b);
    });
    function render(idx) {
      var s = o.steps[idx];
      chartBox.innerHTML = "";
      var g = bars({
        data: [{ label: "Rosot nilai", v: s.nilai, color: "var(--neg)", vl: rm(s.nilai) }, { label: "Yang direkod LTH", v: o.direkod, color: "var(--ink3)", vl: rm(o.direkod) }],
        h: 200, val: true
      });
      chartBox.appendChild(g);
      var kuat = "Direkod: <b>" + rm(o.direkod) + "</b> &mdash; <b>" + Math.round(o.direkod / s.nilai * 1000) / 10 + "%</b> daripada yang sepatutnya.";
      note.innerHTML = "<b>" + esc(s.judul) + ":</b> " + esc(s.terang) + "<br>" + kuat;
      track.querySelectorAll(".slider-step").forEach(function (b, i) {
        b.classList.toggle("on", i === idx);
      });
    }
    range.addEventListener("input", function () { render(+range.value); });
    wrap.appendChild(track);
    wrap.appendChild(range);
    wrap.appendChild(chartBox);
    wrap.appendChild(note);
    render(o.steps.length - 1);
    return wrap;
  }

  /* ---------- Interaksi: kalkulator subsidi haji (simulasi) ---------- */
  function hafisSim(o) {
    var wrap = document.createElement("div");
    wrap.className = "slider-card sim";
    var kos = 25540, jemaah = 30000;
    var el = {
      bayaran: null, out: null
    };
    var p = document.createElement("p");
    p.className = "sim-intro";
    p.innerHTML = "Kos haji 2022: <b>RM25,540</b> setiap jemaah. LTH hanya mengenakan bayaran — selebihnya ditanggung sebagai subsidi (HAFIS) dan diambil daripada keuntungan pelaburan. Ubah dua butang ini untuk lihat kesannya.";
    var lab1 = document.createElement("label");
    lab1.innerHTML = "<span>Bayaran jemaah (RM) — laporan gunakan RM12,980</span>";
    var inp1 = document.createElement("input");
    inp1.type = "range"; inp1.min = 5000; inp1.max = 25540; inp1.step = 100; inp1.value = 12980;
    lab1.appendChild(inp1);
    var lab2 = document.createElement("label");
    lab2.innerHTML = "<span>Bilangan jemaah (ribu) — kuota kini ~30,000, unjuran 60,000 pada 2030</span>";
    var inp2 = document.createElement("input");
    inp2.type = "range"; inp2.min = 10; inp2.max = 60; inp2.step = 1; inp2.value = 30;
    lab2.appendChild(inp2);
    var out = document.createElement("div");
    out.className = "sim-out";
    function draw() {
      var bay = +inp1.value, n = +inp2.value * 1000;
      var subsidi = kos - bay;
      var jumlah = subsidi * n;
      out.innerHTML =
        '<div class="sim-row"><span>Subsidi setiap jemaah</span><b>' + rm0(subsidi) + " (" + pct(subsidi / kos * 100, 0) + " daripada kos)</b></div>" +
        '<div class="sim-row"><span>Jumlah subsidi setahun (simulasi)</span><b>' + rm(jumlah) + "</b></div>" +
        '<div class="sim-row"><span>Bandingan: laporan unjur RM742 juta pada 2030</span><b>' + (jumlah > 742470000 ? "melebihi unjuran" : "di bawah unjuran") + "</b></div>" +
        '<div class="sim-note">Nilai kos haji RM25,540 dan kadar bayaran RM12,980/B40 RM10,980 adalah dari laporan (m.s. 205). Bilangan jemaah ialah andaian untuk simulasi — bukan angka laporan.</div>';
    }
    inp1.addEventListener("input", draw);
    inp2.addEventListener("input", draw);
    wrap.appendChild(p);
    wrap.appendChild(lab1); wrap.appendChild(inp1);
    wrap.appendChild(lab2); wrap.appendChild(inp2);
    wrap.appendChild(out);
    draw();
    return wrap;
  }

  /* ---------- Interaksi: pemindahan UJSB (banding nilai) ---------- */
  function flowUjsb(o) {
    var max = 19900;
    var rows = '<div class="flow">';
    o.baris.forEach(function (b) {
      rows += '<div class="flow-row">' +
        '<div class="flow-name">' + esc(b.label) + "</div>" +
        '<div class="flow-bands">' +
        '<div class="flow-band" style="width:' + (b.buku / max * 100) + '%" title="Nilai buku: ' + rm(b.buku) + '"><span>' + rm(b.buku) + "</span></div>" +
        '<div class="flow-band hl" style="width:' + (b.pindah / max * 100) + '%" title="Nilai pindahan: ' + rm(b.pindah) + '"><span>' + rm(b.pindah) + "</span></div>" +
        '<div class="flow-band mark" style="width:' + (b.pasaran / max * 100) + '%" title="Nilai pasaran: ' + rm(b.pasaran) + '"><span>' + rm(b.pasaran) + "</span></div>" +
        "</div></div>";
    });
    rows += "</div>";
    var legend = '<div class="legend">' +
      '<span><i style="background:var(--ink3)"></i>Nilai buku (audited)</span>' +
      '<span><i style="background:var(--pri)"></i>Nilai pindah ke UJSB</span>' +
      '<span><i style="background:var(--neg)"></i>Nilai pasaran sebenar</span></div>';
    return legend + rows;
  }

  /* ---------- Papan skor / stat ---------- */
  function kpi(label, value, note, color) {
    return '<div class="kpi"><div class="kpi-v" style="' + (color ? "color:" + color : "") + '">' + value +
      "</div><div class='kpi-l'>" + label + "</div>" + (note ? "<div class='kpi-n'>" + note + "</div>" : "") + "</div>";
  }

  /* ---------- Modal ---------- */
  function modal(inner, opts) {
    var old = document.querySelector(".modal-bg");
    if (old) old.remove();
    var bg = h("div", { cls: "modal-bg", on: { click: function (e) { if (e.target === bg) close(); } } });
    var box = h("div", { cls: "modal", role: "dialog", "aria-modal": "true" });
    var closeBtn = h("button", { cls: "m-x", type: "button", "aria-label": "Tutup", on: { click: close } }, "✕");
    box.appendChild(closeBtn);
    box.appendChild(inner);
    bg.appendChild(box);
    document.body.appendChild(bg);
    document.body.classList.add("noscroll");
    function close() { bg.remove(); document.body.classList.remove("noscroll"); }
    var esc2 = function (e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc2); } };
    document.addEventListener("keydown", esc2);
    return { box: box, close: close };
  }
  function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

  /* ---------- Utiliti umum ---------- */
  function queryAll(root, sel) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function bindDelegated(root, sel, ev, fn) {
    root.addEventListener(ev, function (e) {
      var t = e.target.closest ? e.target.closest(sel) : null;
      if (t && root.contains(t)) fn(t, e);
    });
  }

  window.RL = {
    rm: rm, rm0: rm0, pct: pct, rmAxis: rmAxis, niceMax: niceMax, esc: esc,
    h: h, svgEl: svgEl, svgWrap: svgWrap,
    srcLink: srcLink, badge: badge,
    insightCard: insightCard, chartCard: chartCard,
    bars: bars, groupBars: groupBars, stackBars: stackBars,
    dualLine: dualLine, multiLine: multiLine, waterfall: waterfall,
    hbars: hbars, donut: donut, gantt: gantt,
    sliderImpairment: sliderImpairment, hafisSim: hafisSim, flowUjsb: flowUjsb,
    kpi: kpi, modal: modal, scrollToTop: scrollToTop,
    queryAll: queryAll, bindDelegated: bindDelegated
  };
})();
