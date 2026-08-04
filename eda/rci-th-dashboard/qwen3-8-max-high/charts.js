/* =========================================================================
   CHARTS — primitif carta SVG ringan (tiada dependensi luar).
   Semua carta responsif: dilukis semula mengikut lebar bekas.
   ========================================================================= */
(function () {
  "use strict";

  var TIP = null;
  function tipEl() {
    if (!TIP) {
      TIP = document.createElement("div");
      TIP.className = "ctip";
      TIP.style.display = "none";
      document.body.appendChild(TIP);
    }
    return TIP;
  }
  function showTip(html, x, y) {
    var t = tipEl();
    t.innerHTML = html;
    t.style.display = "block";
    var r = t.getBoundingClientRect();
    var left = Math.min(Math.max(8, x - r.width / 2), window.innerWidth - r.width - 8);
    var top = y - r.height - 12;
    if (top < 8) top = y + 16;
    t.style.left = left + "px";
    t.style.top = top + "px";
  }
  function hideTip() { if (TIP) TIP.style.display = "none"; }
  document.addEventListener("scroll", hideTip, true);

  function svgEl(tag, attrs, parent) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  }
  function niceMax(v) {
    if (v <= 0) return 1;
    var p = Math.pow(10, Math.floor(Math.log10(v)));
    var n = v / p;
    var m = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
    return m * p;
  }
  function fmtRM(v, juta) {
    // v dalam RM juta bila juta=true
    var a = Math.abs(v);
    if (juta) {
      if (a >= 1000) return (v < 0 ? "−" : "") + "RM" + (a / 1000).toFixed(a % 1000 === 0 ? 0 : 2) + " bilion";
      return (v < 0 ? "−" : "") + "RM" + a.toLocaleString("en-MY", { maximumFractionDigits: 1 }) + " juta";
    }
    return "RM" + v.toLocaleString("en-MY");
  }
  function axisTicks(min, max, n) {
    var span = niceMax(max - min);
    var step = span / n;
    var out = [];
    for (var i = 0; i <= n; i++) out.push(min + step * i);
    return out;
  }

  /* ---------------- barChart ----------------
     opts: { labels, series:[{name,color,data,stack?}], yFmt, height, stacked,
             onSelect(i), tipFn(i,s), zeroLine, yMin, yMax, legend } */
  function barChart(el, opts) {
    el.innerHTML = "";
    var W = el.clientWidth || 320;
    var H = opts.height || 240;
    var padL = opts.padL || 46, padR = 10, padT = 12, padB = opts.padB || 34;
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, width: "100%", height: H, role: "img" }, el);
    if (opts.ariaLabel) svg.setAttribute("aria-label", opts.ariaLabel);

    var n = opts.labels.length;
    var allVals = [];
    if (opts.stacked) {
      for (var i = 0; i < n; i++) {
        var pos = 0, neg = 0;
        opts.series.forEach(function (s) { var v = s.data[i] || 0; if (v >= 0) pos += v; else neg += v; });
        allVals.push(pos, neg);
      }
    } else {
      opts.series.forEach(function (s) { s.data.forEach(function (v) { allVals.push(v); }); });
    }
    var maxV = opts.yMax != null ? opts.yMax : niceMax(Math.max.apply(null, allVals.concat([0])) * 1.08);
    var minV = opts.yMin != null ? opts.yMin : Math.min(0, Math.min.apply(null, allVals));
    if (minV < 0) minV = -niceMax(-minV * 1.05);
    var range = maxV - minV || 1;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    function y(v) { return padT + plotH - ((v - minV) / range) * plotH; }

    // paksi-y
    var ticks = axisTicks(minV, maxV, 4);
    ticks.forEach(function (tv) {
      svgEl("line", { x1: padL, x2: W - padR, y1: y(tv), y2: y(tv), stroke: tv === 0 ? "#9aa3a0" : "#e4e2d8", "stroke-width": tv === 0 ? 1.2 : 1 }, svg);
      var tx = svgEl("text", { x: padL - 6, y: y(tv) + 3.5, "text-anchor": "end", class: "ax" }, svg);
      tx.textContent = opts.yFmt ? opts.yFmt(tv) : tv.toLocaleString("en-MY");
    });

    var slot = plotW / n;
    var groupW = Math.min(slot * 0.72, opts.stacked ? 46 : 64);
    var ns = opts.series.length;

    opts.labels.forEach(function (lab, i) {
      var cx = padL + slot * i + slot / 2;
      if (opts.stacked) {
        var accP = 0, accN = 0;
        opts.series.forEach(function (s, si) {
          var v = s.data[i] || 0;
          if (v === 0) return;
          var base = v >= 0 ? accP : accN;
          var y1 = y(base + v), y2 = y(base);
          var r = svgEl("rect", {
            x: cx - groupW / 2, y: Math.min(y1, y2), width: groupW, height: Math.max(1, Math.abs(y2 - y1)),
            fill: s.color, rx: 2, class: "bar" + (opts.hl === i ? " hl" : "")
          }, svg);
          if (v >= 0) accP += v; else accN += v;
          bindBar(r, i, s, lab, v);
        });
      } else {
        var bw = groupW / ns;
        opts.series.forEach(function (s, si) {
          var v = s.data[i] || 0;
          var yv = y(Math.max(0, v)), yv2 = y(Math.min(0, v));
          var r = svgEl("rect", {
            x: cx - groupW / 2 + bw * si + 1, y: yv, width: Math.max(2, bw - 2), height: Math.max(1, yv2 - yv),
            fill: s.color, rx: 2, class: "bar" + (opts.hl === i ? " hl" : "")
          }, svg);
          bindBar(r, i, s, lab, v);
        });
      }
      var lx = svgEl("text", { x: cx, y: H - padB + 16, "text-anchor": "middle", class: "axl" }, svg);
      lx.textContent = lab;
    });

    function bindBar(r, i, s, lab, v) {
      r.addEventListener("click", function (ev) {
        var html = opts.tipFn ? opts.tipFn(i, s) : "<b>" + lab + "</b><br>" + s.name + ": " + (opts.yFmt ? opts.yFmt(v) : v);
        showTip(html, ev.clientX, ev.clientY);
        if (opts.onSelect) opts.onSelect(i, s);
        ev.stopPropagation();
      });
    }

    if (opts.legend !== false && opts.series.length > 1) legend(el, opts.series);
    return svg;
  }

  /* ---------------- lineChart ----------------
     opts: { labels, series:[{name,color,data,dash,area}], yFmt, height, vlines:[{i,label}],
             onSelect(i), tipFn(i) } */
  function lineChart(el, opts) {
    el.innerHTML = "";
    var W = el.clientWidth || 320;
    var H = opts.height || 230;
    var padL = opts.padL || 44, padR = 14, padT = 12, padB = opts.padB || 32;
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, width: "100%", height: H, role: "img" }, el);
    var n = opts.labels.length;
    var all = [];
    opts.series.forEach(function (s) { s.data.forEach(function (v) { if (v != null) all.push(v); }); });
    var maxV = opts.yMax != null ? opts.yMax : niceMax(Math.max.apply(null, all) * 1.1);
    var minV = opts.yMin != null ? opts.yMin : Math.min(0, Math.min.apply(null, all));
    if (minV < 0) minV = -niceMax(-minV * 1.05);
    var range = maxV - minV || 1;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    function y(v) { return padT + plotH - ((v - minV) / range) * plotH; }
    function x(i) { return padL + (n === 1 ? plotW / 2 : (plotW * i) / (n - 1)); }

    axisTicks(minV, maxV, 4).forEach(function (tv) {
      svgEl("line", { x1: padL, x2: W - padR, y1: y(tv), y2: y(tv), stroke: tv === 0 ? "#9aa3a0" : "#e4e2d8" }, svg);
      var t = svgEl("text", { x: padL - 6, y: y(tv) + 3.5, "text-anchor": "end", class: "ax" }, svg);
      t.textContent = opts.yFmt ? opts.yFmt(tv) : tv.toLocaleString("en-MY");
    });
    opts.labels.forEach(function (lab, i) {
      if (n > 8 && i % 2 === 1) return;
      var t = svgEl("text", { x: x(i), y: H - padB + 16, "text-anchor": "middle", class: "axl" }, svg);
      t.textContent = lab;
    });
    (opts.vlines || []).forEach(function (vl) {
      svgEl("line", { x1: x(vl.i), x2: x(vl.i), y1: padT, y2: H - padB, stroke: "#b98a2f", "stroke-dasharray": "3 3" }, svg);
      var t = svgEl("text", { x: x(vl.i) + 3, y: padT + 10, class: "axv" }, svg);
      t.textContent = vl.label;
    });

    opts.series.forEach(function (s) {
      var pts = [];
      s.data.forEach(function (v, i) { if (v != null) pts.push([x(i), y(v), i, v]); });
      if (s.area && pts.length) {
        var d = "M" + pts.map(function (p) { return p[0] + "," + p[1]; }).join("L");
        d += "L" + pts[pts.length - 1][0] + "," + y(Math.max(0, minV)) + "L" + pts[0][0] + "," + y(Math.max(0, minV)) + "Z";
        svgEl("path", { d: d, fill: s.color, opacity: 0.09 }, svg);
      }
      if (pts.length > 1) {
        var d2 = "M" + pts.map(function (p) { return p[0] + "," + p[1]; }).join("L");
        svgEl("path", { d: d2, fill: "none", stroke: s.color, "stroke-width": 2.4, "stroke-dasharray": s.dash ? "5 4" : "none" }, svg);
      }
      pts.forEach(function (p) {
        var c = svgEl("circle", { cx: p[0], cy: p[1], r: 4.4, fill: "#fff", stroke: s.color, "stroke-width": 2.2, class: "dot" }, svg);
        c.addEventListener("click", function (ev) {
          var html = opts.tipFn ? opts.tipFn(p[2], s) : "<b>" + opts.labels[p[2]] + "</b><br>" + s.name + ": " + (opts.yFmt ? opts.yFmt(p[3]) : p[3]);
          showTip(html, ev.clientX, ev.clientY);
          if (opts.onSelect) opts.onSelect(p[2], s);
          ev.stopPropagation();
        });
      });
    });
    if (opts.legend !== false && opts.series.length > 1) legend(el, opts.series);
    return svg;
  }

  /* ---------------- waterfall ----------------
     opts: { steps:[{label, value(+/-), total?}], yFmt, height } */
  function waterfall(el, opts) {
    el.innerHTML = "";
    var W = el.clientWidth || 320;
    var H = opts.height || 250;
    var padL = opts.padL || 46, padR = 8, padT = 10, padB = opts.padB || 46;
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, width: "100%", height: H }, el);
    var steps = opts.steps;
    var run = 0, maxV = 0, minV = 0;
    steps.forEach(function (s) {
      if (s.total != null) { run = s.total; }
      else { run += s.value; }
      maxV = Math.max(maxV, run); minV = Math.min(minV, run);
    });
    maxV = niceMax(maxV * 1.1); if (minV < 0) minV = -niceMax(-minV * 1.1);
    var range = maxV - minV || 1;
    var plotH = H - padT - padB, plotW = W - padL - padR;
    function y(v) { return padT + plotH - ((v - minV) / range) * plotH; }
    axisTicks(minV, maxV, 4).forEach(function (tv) {
      svgEl("line", { x1: padL, x2: W - padR, y1: y(tv), y2: y(tv), stroke: tv === 0 ? "#9aa3a0" : "#e4e2d8" }, svg);
      var t = svgEl("text", { x: padL - 6, y: y(tv) + 3.5, "text-anchor": "end", class: "ax" }, svg);
      t.textContent = opts.yFmt ? opts.yFmt(tv) : tv.toLocaleString("en-MY");
    });
    var slot = plotW / steps.length;
    var bw = Math.min(slot * 0.66, 54);
    run = 0;
    var prevEnd = null;
    steps.forEach(function (s, i) {
      var cx = padL + slot * i + slot / 2;
      var start, end;
      if (s.total != null) { start = 0; end = s.total; run = s.total; }
      else { start = run; end = run + s.value; run = end; }
      var color = s.total != null ? "#37474f" : (s.value >= 0 ? "#0b7a5e" : "#c0392b");
      var r = svgEl("rect", {
        x: cx - bw / 2, y: y(Math.max(start, end)), width: bw,
        height: Math.max(2, Math.abs(y(start) - y(end))), fill: color, rx: 2, class: "bar"
      }, svg);
      if (prevEnd != null && i > 0) {
        svgEl("line", { x1: cx - slot + bw / 2, x2: cx - bw / 2, y1: y(prevEnd), y2: y(prevEnd), stroke: "#9aa3a0", "stroke-dasharray": "2 3" }, svg);
      }
      prevEnd = end;
      r.addEventListener("click", function (ev) {
        var html = "<b>" + s.label + "</b><br>" + (s.total != null ? "Jumlah: " : (s.value >= 0 ? "+" : "−")) + (opts.yFmt ? opts.yFmt(Math.abs(s.total != null ? s.total : s.value)) : Math.abs(s.value));
        if (s.nota) html += "<br><span class='tipn'>" + s.nota + "</span>";
        showTip(html, ev.clientX, ev.clientY);
        ev.stopPropagation();
      });
      var lab = svgEl("text", { x: cx, y: H - padB + 14, "text-anchor": "middle", class: "axl" }, svg);
      lab.textContent = s.label;
      if (s.label.length > 10) { lab.setAttribute("class", "axl small"); }
      var vt = svgEl("text", { x: cx, y: y(Math.max(start, end)) - 5, "text-anchor": "middle", class: "bv" }, svg);
      vt.textContent = (s.total != null ? "" : (s.value >= 0 ? "+" : "−")) + (opts.vFmt ? opts.vFmt(Math.abs(s.total != null ? s.total : s.value)) : Math.abs(s.value).toLocaleString("en-MY"));
    });
    return svg;
  }

  /* ---------------- hbar (bar mengufuk) ----------------
     opts: { rows:[{label, value, color, sub}], height(rowH), vFmt, onRowClick(i) } */
  function hbar(el, opts) {
    el.innerHTML = "";
    var rows = opts.rows;
    var rowH = opts.rowH || 34;
    var W = el.clientWidth || 320;
    var labelW = opts.labelW || Math.min(132, W * 0.38);
    var H = rows.length * rowH + 8;
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, width: "100%", height: H }, el);
    var maxV = niceMax(Math.max.apply(null, rows.map(function (r) { return Math.abs(r.value); })) * 1.05);
    var plotW = W - labelW - 56;
    rows.forEach(function (r, i) {
      var yy = i * rowH + rowH / 2;
      var t = svgEl("text", { x: labelW - 8, y: yy + 4, "text-anchor": "end", class: "hbl" }, svg);
      t.textContent = r.label;
      var bw = (Math.abs(r.value) / maxV) * plotW;
      var rect = svgEl("rect", {
        x: labelW, y: yy - rowH * 0.31, width: Math.max(2, bw), height: rowH * 0.62,
        fill: r.color || "#0b7a5e", rx: 3, class: opts.onRowClick ? "bar link" : "bar"
      }, svg);
      var vt = svgEl("text", { x: labelW + bw + 6, y: yy + 4, class: "bv" }, svg);
      vt.textContent = opts.vFmt ? opts.vFmt(r.value) : r.value.toLocaleString("en-MY");
      if (r.sub) {
        var st = svgEl("text", { x: labelW - 8, y: yy + 15, "text-anchor": "end", class: "hbs" }, svg);
        st.textContent = r.sub;
      }
      if (opts.tipFn || opts.onRowClick) {
        rect.addEventListener("click", function (ev) {
          if (opts.tipFn) showTip(opts.tipFn(i, r), ev.clientX, ev.clientY);
          if (opts.onRowClick) opts.onRowClick(i, r);
          ev.stopPropagation();
        });
      }
    });
    return svg;
  }

  /* ---------------- donut ----------------
     opts: { parts:[{label,value,color}], size, center, tipFn } */
  function donut(el, opts) {
    el.innerHTML = "";
    var size = opts.size || 150;
    var W = el.clientWidth || 320;
    var cx = size / 2 + 6, cy = size / 2 + 6, R = size / 2, r2 = R * 0.62;
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + (size + 12), width: "100%", height: size + 12 }, el);
    var total = opts.parts.reduce(function (a, p) { return a + p.value; }, 0);
    var ang = -Math.PI / 2;
    opts.parts.forEach(function (p) {
      var frac = p.value / total;
      var a2 = ang + frac * Math.PI * 2;
      var large = frac > 0.5 ? 1 : 0;
      var x1 = cx + R * Math.cos(ang), y1 = cy + R * Math.sin(ang);
      var x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
      var x3 = cx + r2 * Math.cos(a2), y3 = cy + r2 * Math.sin(a2);
      var x4 = cx + r2 * Math.cos(ang), y4 = cy + r2 * Math.sin(ang);
      var d = "M" + x1 + "," + y1 + "A" + R + "," + R + " 0 " + large + " 1 " + x2 + "," + y2 +
              "L" + x3 + "," + y3 + "A" + r2 + "," + r2 + " 0 " + large + " 0 " + x4 + "," + y4 + "Z";
      var path = svgEl("path", { d: d, fill: p.color, class: "bar" }, svg);
      path.addEventListener("click", function (ev) {
        var html = opts.tipFn ? opts.tipFn(p) : "<b>" + p.label + "</b><br>" + p.value + " (" + Math.round(frac * 100) + "%)";
        showTip(html, ev.clientX, ev.clientY);
        ev.stopPropagation();
      });
      ang = a2;
    });
    if (opts.center) {
      var t1 = svgEl("text", { x: cx, y: cy - 2, "text-anchor": "middle", class: "dc1" }, svg);
      t1.textContent = opts.center[0];
      var t2 = svgEl("text", { x: cx, y: cy + 14, "text-anchor": "middle", class: "dc2" }, svg);
      t2.textContent = opts.center[1];
    }
    var ly = 14;
    var lg = svgEl("g", {}, svg);
    opts.parts.forEach(function (p) {
      var gx = size + 20;
      svgEl("rect", { x: gx, y: ly - 8, width: 10, height: 10, rx: 2, fill: p.color }, lg);
      var t = svgEl("text", { x: gx + 16, y: ly + 1, class: "axl" }, lg);
      t.textContent = p.label;
      ly += 18;
    });
    return svg;
  }

  /* ---------------- gantt ----------------
     opts: { rows:[{label, from:Date, to:Date|null, color, nota}], events:[{date,label}], from, to } */
  function gantt(el, opts) {
    el.innerHTML = "";
    var W = el.clientWidth || 320;
    var rowH = 34, headH = 22;
    var H = headH + opts.rows.length * rowH + 10;
    var labelW = opts.labelW || Math.min(150, W * 0.42);
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, width: "100%", height: H }, el);
    var t0 = opts.from.getTime(), t1 = opts.to.getTime();
    var plotW = W - labelW - 8;
    function x(d) { return labelW + ((d.getTime() - t0) / (t1 - t0)) * plotW; }
    // tahun
    var yr = new Date(opts.from); yr.setMonth(0, 1);
    while (yr.getTime() < t1) {
      if (yr.getTime() >= t0) {
        svgEl("line", { x1: x(yr), x2: x(yr), y1: headH - 4, y2: H - 6, stroke: "#e4e2d8" }, svg);
        var t = svgEl("text", { x: x(yr) + 3, y: 12, class: "axl" }, svg);
        t.textContent = yr.getFullYear();
      }
      yr = new Date(yr.getFullYear() + 1, 0, 1);
    }
    opts.rows.forEach(function (r, i) {
      var yy = headH + i * rowH + rowH / 2;
      var t = svgEl("text", { x: labelW - 8, y: yy + 4, "text-anchor": "end", class: "hbl" }, svg);
      t.textContent = r.label;
      var x1 = x(r.from), x2 = r.to ? x(r.to) : W - 8;
      var rect = svgEl("rect", { x: x1, y: yy - 7, width: Math.max(3, x2 - x1), height: 14, fill: r.color || "#0b7a5e", rx: 4, class: "bar" }, svg);
      rect.addEventListener("click", function (ev) {
        var df = r.from.toLocaleDateString("ms-MY", { day: "numeric", month: "short", year: "numeric" });
        var dt = r.to ? r.to.toLocaleDateString("ms-MY", { day: "numeric", month: "short", year: "numeric" }) : "kini";
        showTip("<b>" + r.label + "</b><br>" + df + " → " + dt + (r.nota ? "<br><span class='tipn'>" + r.nota + "</span>" : ""), ev.clientX, ev.clientY);
        ev.stopPropagation();
      });
    });
    (opts.events || []).forEach(function (ev2) {
      var xx = x(ev2.date);
      svgEl("line", { x1: xx, x2: xx, y1: headH - 2, y2: H - 6, stroke: "#b98a2f", "stroke-dasharray": "2 3" }, svg);
    });
    return svg;
  }

  function legend(el, series) {
    var d = document.createElement("div");
    d.className = "clegend";
    series.forEach(function (s) {
      var it = document.createElement("span");
      it.className = "cl-it";
      it.innerHTML = "<i style='background:" + s.color + "'></i>" + s.name;
      d.appendChild(it);
    });
    el.appendChild(d);
  }

  window.RCIC = window.RCIC || {};
  window.RCIC.charts = { bar: barChart, line: lineChart, waterfall: waterfall, hbar: hbar, donut: donut, gantt: gantt, fmtRM: fmtRM, hideTip: hideTip };
})();
