(function () {
  "use strict";
  var D = window.RCI_DATA;
  var fmt = new Intl.NumberFormat("ms-MY");
  function money(n, unit) {
    if (n === null || n === undefined) return "—";
    return "RM " + fmt.format(Math.round(n * 100) / 100) + (unit ? " " + unit : "");
  }
  function num(n) { return n === null || n === undefined ? "—" : fmt.format(n); }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function svg(tag, attrs) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }
  function tagBadge(kind) {
    var label = kind === "fakta" ? "fakta" : kind === "terbitan" ? "terbitan" : "anggaran";
    return '<span class="badge tag-' + kind + '">' + label + '</span>';
  }

  // =====================================================================
  // KPI STRIP
  // =====================================================================
  function renderKpis() {
    var wrap = document.getElementById("kpi-strip");
    var kpis = [
      { v: "RM88 bilion", l: "Liabiliti pendeposit LTH, disahkan 21 Mei 2022 — turut jumlah jaminan Kerajaan (s.24 Akta 535)", kind: "fakta" },
      { v: "RM10.2 bilion", l: "Premium nilai pindahan aset ke UJSB berbanding nilai pasaran sebenar", kind: "terbitan" },
      { v: "8.6 juta", l: "Jumlah pendeposit LTH setakat 22 Julai 2022", kind: "fakta" },
      { v: "RM37.52 bilion", l: "Jumlah hibah diagihkan sejak 1966 hingga 2021", kind: "fakta" },
    ];
    kpis.forEach(function (k) {
      wrap.appendChild(el("div", { class: "kpi" },
        '<div class="v">' + k.v + '</div><div class="l">' + k.l + '</div>' + tagBadge(k.kind)));
    });
  }

  // =====================================================================
  // GENERIC LINE CHART (multi-series)
  // =====================================================================
  function lineChart(containerId, opts) {
    // opts: {labels:[], series:[{name,color,values:[]}], height, yFormat, yMin}
    var w = 640, h = opts.height || 300, pad = { t: 18, r: 16, b: 30, l: 52 };
    var innerW = w - pad.l - pad.r, innerH = h - pad.t - pad.b;
    var allVals = opts.series.reduce(function (a, s) { return a.concat(s.values.filter(function(v){return v!==null && v!==undefined;})); }, []);
    var yMax = Math.max.apply(null, allVals.concat([0])) * 1.12;
    var yMin = opts.yMin !== undefined ? opts.yMin : Math.min.apply(null, allVals.concat([0]));
    if (yMin > 0) yMin = 0;
    yMin = yMin * 1.12;
    var n = opts.labels.length;
    var x = function (i) { return pad.l + (innerW * i) / Math.max(n - 1, 1); };
    var y = function (v) { return pad.t + innerH - ((v - yMin) / (yMax - yMin)) * innerH; };

    var root = svg("svg", { viewBox: "0 0 " + w + " " + h, width: "100%", height: h });
    // gridlines + y labels
    var gridN = 4;
    for (var g = 0; g <= gridN; g++) {
      var gv = yMin + ((yMax - yMin) * g) / gridN;
      var gy = y(gv);
      root.appendChild(svg("line", { x1: pad.l, x2: w - pad.r, y1: gy, y2: gy, class: "gridline" }));
      var t = svg("text", { x: pad.l - 8, y: gy + 4, "text-anchor": "end", class: "axis" });
      t.textContent = opts.yFormat ? opts.yFormat(gv) : Math.round(gv);
      root.appendChild(t);
    }
    // zero line emphasis
    if (yMin < 0 && yMax > 0) {
      root.appendChild(svg("line", { x1: pad.l, x2: w - pad.r, y1: y(0), y2: y(0), stroke: "var(--ink-soft)", "stroke-width": 1 }));
    }
    // x labels
    opts.labels.forEach(function (lab, i) {
      if (n > 9 && i % 2 === 1) return;
      var t = svg("text", { x: x(i), y: h - 8, "text-anchor": "middle", class: "axis" });
      t.textContent = lab;
      root.appendChild(t);
    });
    // series
    opts.series.forEach(function (s) {
      var pts = [];
      s.values.forEach(function (v, i) { if (v !== null && v !== undefined) pts.push([x(i), y(v)]); });
      if (opts.area) {
        var ap = pts.slice();
        var d = "M" + ap.map(function(p){return p.join(",");}).join(" L");
        d += " L" + ap[ap.length-1][0] + "," + y(yMin) + " L" + ap[0][0] + "," + y(yMin) + " Z";
        root.appendChild(svg("path", { d: d, fill: s.color, opacity: 0.12, stroke: "none" }));
      }
      var d2 = "M" + pts.map(function(p){return p.join(",");}).join(" L");
      root.appendChild(svg("path", { d: d2, fill: "none", stroke: s.color, "stroke-width": 2.4, "stroke-linejoin": "round", "stroke-linecap": "round" }));
      pts.forEach(function (p, i) {
        var c = svg("circle", { cx: p[0], cy: p[1], r: 3.6, fill: s.color, class: "datadot" });
        var title = svg("title", {});
        title.textContent = opts.labels[i] + " · " + s.name + ": " + (opts.yFormat ? opts.yFormat(s.values[i]) : s.values[i]);
        c.appendChild(title);
        root.appendChild(c);
      });
    });
    var box = document.getElementById(containerId);
    box.innerHTML = "";
    box.appendChild(root);
  }

  function legendFor(containerId, series) {
    var box = document.getElementById(containerId);
    if (!box) return;
    box.innerHTML = "";
    series.forEach(function (s) {
      box.appendChild(el("span", { class: "lg" }, '<span class="sw" style="background:' + s.color + '"></span>' + s.name));
    });
  }

  // =====================================================================
  // GENERIC GROUPED BAR CHART
  // =====================================================================
  function groupedBarChart(containerId, opts) {
    // opts: {labels:[], series:[{name,color,values:[]}], height, yFormat}
    var w = 640, h = opts.height || 300, pad = { t: 18, r: 16, b: 34, l: 56 };
    var innerW = w - pad.l - pad.r, innerH = h - pad.t - pad.b;
    var allVals = opts.series.reduce(function (a, s) { return a.concat(s.values); }, []);
    var yMax = Math.max.apply(null, allVals) * 1.15;
    var yMin = Math.min(0, Math.min.apply(null, allVals)) * 1.15;
    var n = opts.labels.length;
    var groupW = innerW / n;
    var barW = Math.min(26, (groupW * 0.62) / opts.series.length);
    var y = function (v) { return pad.t + innerH - ((v - yMin) / (yMax - yMin)) * innerH; };

    var root = svg("svg", { viewBox: "0 0 " + w + " " + h, width: "100%", height: h });
    var gridN = 4;
    for (var g = 0; g <= gridN; g++) {
      var gv = yMin + ((yMax - yMin) * g) / gridN;
      var gy = y(gv);
      root.appendChild(svg("line", { x1: pad.l, x2: w - pad.r, y1: gy, y2: gy, class: "gridline" }));
      var t = svg("text", { x: pad.l - 8, y: gy + 4, "text-anchor": "end", class: "axis" });
      t.textContent = opts.yFormat ? opts.yFormat(gv) : Math.round(gv);
      root.appendChild(t);
    }
    opts.labels.forEach(function (lab, i) {
      var cx = pad.l + groupW * i + groupW / 2;
      var t = svg("text", { x: cx, y: h - 10, "text-anchor": "middle", class: "axis" });
      t.textContent = lab;
      root.appendChild(t);
      opts.series.forEach(function (s, si) {
        var v = s.values[i];
        if (v === null || v === undefined) return;
        var bx = cx - (opts.series.length * barW) / 2 + si * barW;
        var by = y(Math.max(v, 0));
        var bh = Math.abs(y(v) - y(0));
        var rect = svg("rect", { x: bx, y: by, width: barW - 2, height: Math.max(bh,1), fill: s.color, rx: 2 });
        var title = svg("title", {});
        title.textContent = lab + " · " + s.name + ": " + (opts.yFormat ? opts.yFormat(v) : v);
        rect.appendChild(title);
        root.appendChild(rect);
      });
    });
    var box = document.getElementById(containerId);
    box.innerHTML = "";
    box.appendChild(root);
  }

  // =====================================================================
  // SECTION: balance sheet chart
  // =====================================================================
  function renderBalanceChart() {
    var rows = D.balanceSheet.rows;
    lineChart("chart-balance", {
      labels: rows.map(function (r) { return r.year; }),
      height: 300,
      area: false,
      yFormat: function (v) { return (v/1000).toFixed(0) + "b"; },
      series: [
        { name: "Jumlah aset", color: "#3E7A5A", values: rows.map(function (r) { return r.assets; }) },
        { name: "Jumlah liabiliti", color: "#B8433A", values: rows.map(function (r) { return r.liabilities; }) },
        { name: "Baki selepas agihan hibah", color: "#824182", values: rows.map(function (r) { return r.surplusPost; }) },
      ],
    });
    legendFor("legend-balance", [
      { name: "Jumlah aset (RM juta)", color: "#3E7A5A" },
      { name: "Jumlah liabiliti (RM juta)", color: "#B8433A" },
      { name: "Baki selepas hibah (RM juta)", color: "#824182" },
    ]);
  }

  // =====================================================================
  // SECTION: timeline
  // =====================================================================
  var CAT_LABELS = {
    akta: "Akta & struktur", kepimpinan: "Kepimpinan", kewangan: "Kewangan & audit",
    ujsb: "UJSB & penyelamatan", pelaburan: "Pelaburan", siasatan: "Siasatan",
  };
  var tlActiveCats = new Set(Object.keys(CAT_LABELS));

  function renderTimelineFilters() {
    var box = document.getElementById("tl-filters");
    var allPill = el("button", { class: "pill on", "data-cat": "__all__" }, "Semua");
    box.appendChild(allPill);
    Object.keys(CAT_LABELS).forEach(function (cat) {
      box.appendChild(el("button", { class: "pill on", "data-cat": cat }, CAT_LABELS[cat]));
    });
    box.addEventListener("click", function (e) {
      var btn = e.target.closest(".pill");
      if (!btn) return;
      var cat = btn.getAttribute("data-cat");
      if (cat === "__all__") {
        tlActiveCats = new Set(Object.keys(CAT_LABELS));
        box.querySelectorAll(".pill").forEach(function (p) { p.classList.add("on"); });
      } else {
        if (tlActiveCats.has(cat)) { tlActiveCats.delete(cat); btn.classList.remove("on"); }
        else { tlActiveCats.add(cat); btn.classList.add("on"); }
        box.querySelector('[data-cat="__all__"]').classList.toggle("on", tlActiveCats.size === Object.keys(CAT_LABELS).length);
      }
      renderTimelineList();
    });
  }

  function renderTimelineList() {
    var box = document.getElementById("tl-list");
    box.innerHTML = "";
    var items = D.timeline.filter(function (t) { return tlActiveCats.has(t.cat); });
    if (!items.length) {
      box.appendChild(el("div", { class: "tl-empty" }, "Tiada peristiwa untuk penapis ini."));
      return;
    }
    items.forEach(function (t) {
      var row = el("div", { class: "tl-item" });
      var dateLabel = t.date.length > 4 ? t.date : t.date;
      row.innerHTML =
        '<div class="tl-date">' + dateLabel + '</div>' +
        '<div class="tl-dot-col"><span class="tl-dot cat-' + t.cat + '"></span></div>' +
        '<div class="tl-body"><b>' + t.title + '</b><p>' + t.detail + ' <span class="tl-page">' + tagBadge(t.kind) + ' m/s ' + t.page + '</span></p></div>';
      box.appendChild(row);
    });
  }

  // =====================================================================
  // SECTION: hibah + deposit
  // =====================================================================
  function renderHibahCharts() {
    var rows = D.hibah.rows;
    groupedBarChart("chart-hibah", {
      labels: rows.map(function (r) { return r.year; }),
      height: 280,
      yFormat: function (v) { return v.toFixed(1) + "%"; },
      series: [
        { name: "Hibah tahunan %", color: "#824182", values: rows.map(function (r) { return r.annualRate; }) },
        { name: "Hibah haji %", color: "#B08420", values: rows.map(function (r) { return r.hajjRate; }) },
      ],
    });
    var ds = D.hibah.depositShock;
    var labels = ["2018 (sblm)", "2019 (slps)", "2020", "2022 (semasa)"];
    var vals = [ds.before.value, ds.after.value, ds.recovered2020.value, ds.current.value].map(function (v) { return v/1000; });
    groupedBarChart("chart-deposit", {
      labels: labels, height: 280,
      yFormat: function (v) { return "RM" + v.toFixed(0) + "b"; },
      series: [{ name: "Deposit (RM bilion)", color: "#2C6E8F", values: vals }],
    });
  }

  // =====================================================================
  // SECTION: threshold + RAV mini charts
  // =====================================================================
  function renderThresholdChart() {
    groupedBarChart("chart-threshold", {
      labels: ["Sebelum (piawaian)", "Perubahan 1", "Perubahan 2 (akhir)"],
      height: 210,
      yFormat: function (v) { return v + "%"; },
      series: [{ name: "Ambang penjejasan", color: "#B8433A", values: [70, 85, 90] }],
    });
  }
  function renderRavChart() {
    groupedBarChart("chart-rav", {
      labels: ["Dinilai profesional", "Anggaran pengurusan"],
      height: 210,
      yFormat: function (v) { return "RM" + v.toFixed(1) + "b"; },
      series: [{ name: "RM bilion drpd RM4.6b jumlah", color: "#824182", values: [0.556, 4.044] }],
    });
  }

  // =====================================================================
  // SECTION: UJSB transfer chart
  // =====================================================================
  function renderUjsbChart() {
    var cats = D.ujsbTransfer.categories;
    groupedBarChart("chart-ujsb", {
      labels: cats.map(function (c) { return c.name.length > 14 ? c.name.slice(0,13)+"…" : c.name; }),
      height: 300,
      yFormat: function (v) { return (v/1000).toFixed(0) + "b"; },
      series: [
        { name: "Nilai buku", color: "#6C7A89", values: cats.map(function (c) { return c.bookValue; }) },
        { name: "Nilai pindahan (dibayar)", color: "#824182", values: cats.map(function (c) { return c.transferValue; }) },
        { name: "Nilai pasaran sebenar", color: "#B8433A", values: cats.map(function (c) { return c.marketValue; }) },
      ],
    });
  }

  function renderSharesChart() {
    var rows = D.blueChipShares.rows;
    groupedBarChart("chart-shares", {
      labels: rows.map(function (r) { return r.ticker; }),
      height: 260,
      yFormat: function (v) { return "RM" + v.toFixed(1); },
      series: [
        { name: "Harga pindahan (RM/unit)", color: "#824182", values: rows.map(function (r) { return r.transferPrice; }) },
        { name: "Harga pasaran Dis 2018", color: "#B8433A", values: rows.map(function (r) { return r.priceDec2018; }) },
        { name: "Harga 2022", color: "#3E7A5A", values: rows.map(function (r) { return r.price2022; }) },
      ],
    });
    legendFor("legend-shares", [
      { name: "Harga pindahan", color: "#824182" },
      { name: "Harga pasaran Dis 2018", color: "#B8433A" },
      { name: "Harga 2022", color: "#3E7A5A" },
    ]);
  }

  // =====================================================================
  // SECTION: investments table / cards
  // =====================================================================
  var invSort = { key: "loss", dir: -1 };
  var invSearch = "";
  var invView = "table";

  function invFilteredRows() {
    var q = invSearch.trim().toLowerCase();
    var rows = D.investments.rows.filter(function (r) {
      return !q || r.name.toLowerCase().indexOf(q) > -1 || r.sector.toLowerCase().indexOf(q) > -1 || r.status.toLowerCase().indexOf(q) > -1;
    });
    rows = rows.slice().sort(function (a, b) {
      var av = invSort.key === "name" ? a.name : (a[invSort.key] === null ? -Infinity : a[invSort.key]);
      var bv = invSort.key === "name" ? b.name : (b[invSort.key] === null ? -Infinity : b[invSort.key]);
      if (av < bv) return -1 * invSort.dir;
      if (av > bv) return 1 * invSort.dir;
      return 0;
    });
    return rows;
  }

  function renderInvTable() {
    var rows = invFilteredRows();
    var wrap = document.getElementById("inv-table-wrap");
    var html = '<table class="dtable"><thead><tr>' +
      '<th data-key="name">Nama</th><th data-key="sector">Sektor</th><th data-key="status">Status</th>' +
      '<th data-key="loss" class="num-cell">Kerugian dianggar</th></tr></thead><tbody>';
    rows.forEach(function (r) {
      html += '<tr><td><b>' + r.name + '</b></td><td>' + r.sector + '</td><td>' + r.status + '</td>' +
        '<td class="num-cell">' + r.lossLabel + '</td></tr>' +
        '<tr><td colspan="4" style="font-size:12.5px;color:var(--ink-soft);border-top:none;padding-top:0">' + r.detail + ' <span class="tl-page">m/s ' + r.page + '</span></td></tr>';
    });
    html += "</tbody></table>";
    wrap.innerHTML = html;
    wrap.querySelectorAll("th[data-key]").forEach(function (th) {
      th.classList.toggle("sort-active", th.getAttribute("data-key") === invSort.key);
      th.addEventListener("click", function () {
        var key = th.getAttribute("data-key");
        if (invSort.key === key) invSort.dir *= -1; else { invSort.key = key; invSort.dir = key === "name" ? 1 : -1; }
        renderInvTable();
      });
    });
  }

  function renderInvCards() {
    var rows = invFilteredRows();
    var wrap = document.getElementById("inv-cards-wrap");
    wrap.innerHTML = "";
    rows.forEach(function (r) {
      var d = el("details", { class: "inv-card" });
      d.innerHTML = '<summary class="inv-top"><span><span class="nm">' + r.name + '</span><br><span class="sector">' + r.sector + ' · ' + r.status + '</span></span>' +
        '<span class="inv-loss">' + r.lossLabel.split(" ").slice(0,2).join(" ") + '</span></summary>' +
        '<div class="inv-detail">' + r.detail + ' <span class="tl-page">m/s ' + r.page + '</span></div>';
      wrap.appendChild(d);
    });
  }

  function renderInvestments() {
    renderInvTable();
    renderInvCards();
    document.getElementById("inv-search").addEventListener("input", function (e) {
      invSearch = e.target.value; renderInvTable(); renderInvCards();
    });
    document.getElementById("inv-toggle").addEventListener("click", function (e) {
      var btn = e.target.closest("button"); if (!btn) return;
      invView = btn.getAttribute("data-view");
      document.querySelectorAll("#inv-toggle button").forEach(function (b) { b.classList.toggle("on", b === btn); });
      document.getElementById("inv-table-wrap").style.display = invView === "table" ? "" : "none";
      document.getElementById("inv-cards-wrap").style.display = invView === "cards" ? "grid" : "none";
    });
  }

  // =====================================================================
  // SECTION: cross-directorships
  // =====================================================================
  function renderCrossDirectorships() {
    var box = document.getElementById("xd-list");
    var maxCount = Math.max.apply(null, D.crossDirectorships.rows.map(function (r) { return r.count; }));
    D.crossDirectorships.rows.forEach(function (r) {
      var pct = r.count === 0 ? 0 : Math.max((r.count / maxCount) * 100, 4);
      var row = el("div", { class: "xd-bar-row" });
      row.innerHTML = '<div class="xd-name">' + r.name + '<div style="font-weight:400;color:var(--muted);font-size:11px">' + r.role + '</div></div>' +
        '<div class="xd-track"><div class="xd-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="xd-count">' + r.count + '</div>';
      row.title = r.examples;
      box.appendChild(row);
    });
  }

  function renderLeadershipTracks() {
    var chair = document.getElementById("chairman-track");
    D.leadership.chairman.forEach(function (p) {
      var flagged = D.leadership.politicalAppointees.some(function (a) { return a.name.indexOf(p.name.split(" ").slice(-2).join(" ")) > -1 || p.name.indexOf(a.name) > -1; });
      chair.appendChild(el("div", { class: "role-row" },
        '<div class="rn">' + p.name + (p.end === null ? '<span class="flag" style="background:var(--green-bg);color:var(--green)">semasa</span>' : '') + '</div>' +
        '<div class="rd">' + p.start + ' → ' + (p.end || "sekarang") + '</div>' +
        '<div class="rnote">' + p.note + '</div>'));
    });
    var ceo = document.getElementById("ceo-track");
    D.leadership.ceo.forEach(function (p) {
      var flag = /dipecat/i.test(p.note) ? '<span class="flag">dipecat awal</span>' : "";
      ceo.appendChild(el("div", { class: "role-row" },
        '<div class="rn">' + p.name + flag + '</div>' +
        '<div class="rd">' + p.start + ' → ' + (p.end || "sekarang") + '</div>' +
        '<div class="rnote">' + p.note + '</div>'));
    });
  }

  function renderDisciplineTable() {
    var t = document.getElementById("discipline-table");
    var html = '<thead><tr><th>Nama</th><th>Jawatan ketika itu</th><th>Kluster</th><th>Keputusan awal</th><th>Keputusan akhir</th><th class="num-cell">Tempoh (bulan)</th></tr></thead><tbody>';
    D.discipline.officers.forEach(function (o) {
      html += '<tr><td><b>' + o.name + '</b><div style="font-size:11.5px;color:var(--muted)">Kini: ' + o.currentRole + '</div></td>' +
        '<td>' + o.roleAtTime + '</td><td>' + o.clusters + '</td>' +
        '<td>' + o.initialOutcome + '</td><td>' + o.finalOutcome + '</td>' +
        '<td class="num-cell">' + o.monthsToDecide + '</td></tr>';
    });
    html += "</tbody>";
    t.innerHTML = html;
  }

  // =====================================================================
  // SECTION: HAFIS charts
  // =====================================================================
  function renderHafisCharts() {
    var rows = D.hafis.history.rows;
    groupedBarChart("chart-hafis", {
      labels: rows.map(function (r) { return r.year; }),
      height: 280,
      yFormat: function (v) { return (v/1000).toFixed(0) + "k"; },
      series: [
        { name: "Kos sebenar seorang jemaah", color: "#B8433A", values: rows.map(function (r) { return r.actualCost; }) },
        { name: "Bayaran dikenakan", color: "#3E7A5A", values: rows.map(function (r) { return r.feeCharged; }) },
      ],
    });
    var proj = D.hafis.projection.rows;
    lineChart("chart-hafis-proj", {
      labels: proj.map(function (r) { return r.year; }),
      height: 280,
      yFormat: function (v) { return v.toFixed(0) + "%"; },
      series: [{ name: "% subsidi drpd kos sebenar", color: "#824182", values: proj.map(function (r) { return r.subsidyPct; }) }],
    });
  }

  // =====================================================================
  // SECTION: recommendations
  // =====================================================================
  function renderRecommendations() {
    var box = document.getElementById("rec-grid");
    D.recommendations.forEach(function (r) {
      var items = r.items.map(function (i) { return "<li>" + i + "</li>"; }).join("");
      box.appendChild(el("div", { class: "rec-card" }, "<h4>" + r.theme + "</h4><ul>" + items + "</ul>"));
    });
  }

  // =====================================================================
  // SECTION: glossary
  // =====================================================================
  function renderGlossary() {
    var box = document.getElementById("gloss-grid");
    D.glossary.forEach(function (g) {
      box.appendChild(el("div", { class: "gloss-item" }, "<dt>" + g.term + "</dt><dd>" + g.def + "</dd>"));
    });
  }

  // =====================================================================
  // Sub-nav active state on scroll
  // =====================================================================
  function initSubnavScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll("#subnav a"));
    var sections = links.map(function (l) { return document.querySelector(l.getAttribute("href")); }).filter(Boolean);
    function onScroll() {
      var y = window.scrollY + 90;
      var activeIdx = 0;
      sections.forEach(function (s, i) { if (s.offsetTop <= y) activeIdx = i; });
      links.forEach(function (l, i) { l.classList.toggle("active", i === activeIdx); });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function init() {
    renderKpis();
    renderBalanceChart();
    renderTimelineFilters();
    renderTimelineList();
    renderHibahCharts();
    renderThresholdChart();
    renderRavChart();
    renderUjsbChart();
    renderSharesChart();
    renderInvestments();
    renderCrossDirectorships();
    renderLeadershipTracks();
    renderDisciplineTable();
    renderHafisCharts();
    renderRecommendations();
    renderGlossary();
    initSubnavScrollSpy();
    window.addEventListener("resize", function () {
      renderBalanceChart(); renderHibahCharts(); renderThresholdChart(); renderRavChart();
      renderUjsbChart(); renderSharesChart(); renderHafisCharts();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
