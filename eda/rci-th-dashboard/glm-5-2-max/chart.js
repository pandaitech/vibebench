/* ==========================================================================
   chart.js — SVG chart primitives (no library, hand-drawn)
   Charts: bar, grouped bar, line, waterfall, timeline, donut, scatter
   All functions accept (data, options) and return an SVG element.
   Responsive via viewBox; horizontal scroll on very narrow screens.
   ========================================================================== */
(function () {
  'use strict';
  var svgNS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, parent) {
    var e = document.createElementNS(svgNS, tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') e.setAttribute('class', attrs[k]);
      else if (k === 'text') e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (parent) parent.appendChild(e);
    return e;
  }
  function append(parent, tag, attrs) { return el(tag, attrs, parent); }

  /* ---- helpers ---- */
  function pick(opt, key, dflt) { return opt && opt[key] != null ? opt[key] : dflt; }
  function fmtNum(v, dp) {
    if (v == null || isNaN(v)) return '—';
    if (Math.abs(v) >= 1e9) return (v / 1e9).toFixed(dp ?? 2) + 'b';
    if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(dp ?? 1) + 'j';
    if (Math.abs(v) >= 1e3 && Number.isInteger(v)) return (v / 1e3) + 'k';
    return Number(v).toLocaleString('ms-MY', { maximumFractionDigits: dp || 0 });
  }
  function fmtRM(v, dp) { return 'RM' + fmtNum(v, dp); }

  var palette = {
    gold: '#c69a3f', gold2: '#e0b65a',
    bad: '#d46060', good: '#7ea687', cool: '#88a8c4',
    ink: '#665e4d', rule: '#c4b79a'
  };
  function themeColors() {
    var cs = getComputedStyle(document.documentElement);
    return {
      gold: cs.getPropertyValue('--gold').trim() || palette.gold,
      bad: cs.getPropertyValue('--crimson').trim() || palette.bad,
      good: cs.getPropertyValue('--green').trim() || palette.good,
      cool: cs.getPropertyValue('--blue').trim() || palette.cool,
      ink: cs.getPropertyValue('--ink-2').trim() || palette.ink,
      rule: cs.getPropertyValue('--rule-2').trim() || palette.rule
    };
  }

  /* base chart frame */
  function frame(w, h, opt) {
    opt = opt || {};
    var m = opt.margin || { top: 20, right: 14, bottom: 28, left: 50 };
    var svg = el('svg', { class: 'fig', viewBox: '0 0 ' + w + ' ' + h, preserveAspectRatio: 'xMidYMid meet' });
    if (opt.title) el('text', { x: 4, y: 14, class: 'chart-title', text: opt.title }, svg);
    var plot = { w: w - m.left - m.right, h: h - m.top - m.bottom, x: m.left, y: m.top };
    return { svg: svg, plot: plot, m: m };
  }

  function xScale(domain, plot) {
    var lo = domain[0], hi = domain[1];
    return function (v) { return plot.x + ((v - lo) / (hi - lo)) * plot.w; };
  }
  function yScale(domain, plot) {
    var lo = domain[0], hi = domain[1];
    return function (v) { return plot.y + plot.h - ((v - lo) / (hi - lo)) * plot.h; };
  }

  /* ============ BAR CHART (vertical) ============ */
  function barChart(data, opt) {
    opt = opt || {};
    var w = opt.w || 360, h = opt.h || 220;
    var fr = frame(w, h, opt);
    var cols = themeColors();
    var rows = data.rows;
    var max = Math.max.apply(null, rows.map(function (r) { return Math.max(opt.neg ? Math.abs(r[opt.v || 'v']) : r[opt.v || 'v'], 0); }));
    var min = opt.neg ? -Math.max.apply(null, rows.map(function (r) { return Math.abs(r[opt.v || 'v']); })) : 0;
    if (opt.refMax) max = Math.max(max, opt.refMax);
    var pad = (max - min) * 0.08;
    max += pad;
    var bw = fr.plot.w / rows.length;
    var bwInner = bw * 0.6;
    var xs = function (i) { return fr.plot.x + i * bw + (bw - bwInner) / 2; };
    var ys = yScale([min, max], fr.plot);
    el('line', { x1: fr.plot.x, y1: ys(0), x2: fr.plot.x + fr.plot.w, y2: ys(0), class: 'ref-line', 'stroke-dasharray': '0', stroke: cols.rule, 'stroke-width': 1 }, fr.svg);
    /* y axis ticks */
    var ticks = niceTicks(min, max, 4);
    ticks.forEach(function (t) {
      var y = ys(t);
      el('line', { x1: fr.plot.x, y1: y, x2: fr.plot.x + fr.plot.w, y2: y, stroke: cols.rule, 'stroke-width': 0.5, 'stroke-dasharray': '2 3' }, fr.svg);
      el('text', { x: fr.plot.x - 6, y: y + 3, 'text-anchor': 'end', 'font-size': 10, fill: 'var(--ink-4)', text: fmtNum(t, opt.dp || 0) }, fr.svg);
    });
    rows.forEach(function (r, i) {
      var v = r[opt.v || 'v'];
      var x = xs(i);
      var y = ys(Math.max(v, 0));
      var barH = fr.plot.h * Math.abs(v - 0) / (max - min);
      var color = opt.colorFn ? opt.colorFn(r, cols) : cols.gold;
      var g = el('g', { class: 'hover-target' }, fr.svg);
      el('rect', { class: 'bar', x: x, y: y, width: bwInner, height: barH, fill: color, rx: 1.5 }, g);
      el('title', { text: (r[opt.label || 'label'] || r.y || '') + ': ' + (opt.fmt ? opt.fmt(v) : fmtNum(v, opt.dp || 0)) }, g);
      if (opt.barLabel !== false) {
        el('text', { x: x + bwInner / 2, y: y - 4, 'text-anchor': 'middle', 'font-size': 9.5, fill: 'var(--ink-2)', text: opt.fmt ? opt.fmt(v) : fmtNum(v, opt.dp || 0) }, fr.svg);
      }
      var lbl = r[opt.label || 'label'] || (r.y != null ? r.y : '');
      el('text', { x: x + bwInner / 2, y: fr.plot.y + fr.plot.h + 14, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--ink-3)', text: lbl }, fr.svg);
    });
    if (opt.refLine) {
      var y = ys(opt.refLine);
      el('line', { x1: fr.plot.x, y1: y, x2: fr.plot.x + fr.plot.w, y2: y, class: 'ref-line' + (opt.refClass ? ' ' + opt.refClass : '') }, fr.svg);
      if (opt.refLabel) el('text', { x: fr.plot.x + fr.plot.w, y: y - 4, 'text-anchor': 'end', class: 'ref-label' + (opt.refClass ? ' ' + opt.refClass : ''), text: opt.refLabel }, fr.svg);
    }
    return fr.svg;
  }

  /* ============ GROUPED BAR (e.g. hibah tahunan vs haji) ============ */
  function groupedBar(data, opt) {
    opt = opt || {};
    var w = opt.w || 400, h = opt.h || 240;
    var fr = frame(w, h, opt);
    var cols = themeColors();
    var series = opt.series;
    var rows = data.rows;
    var max = 0;
    series.forEach(function (s) { rows.forEach(function (r) { if (r[s.k] > max) max = r[s.k]; }); });
    max *= 1.1;
    var bw = fr.plot.w / rows.length;
    var iW = bw * 0.7 / series.length;
    var ys = yScale([0, max], fr.plot);
    /* y grid */
    niceTicks(0, max, 4).forEach(function (t) {
      var y = ys(t);
      el('line', { x1: fr.plot.x, y1: y, x2: fr.plot.x + fr.plot.w, y2: y, stroke: cols.rule, 'stroke-width': 0.5, 'stroke-dasharray': '2 3' }, fr.svg);
      el('text', { x: fr.plot.x - 6, y: y + 3, 'text-anchor': 'end', 'font-size': 10, fill: 'var(--ink-4)', text: fmtNum(t, opt.dp || 0) }, fr.svg);
    });
    rows.forEach(function (r, i) {
      var x0 = fr.plot.x + i * bw + (bw * 0.15);
      series.forEach(function (s, si) {
        var v = r[s.k];
        if (v == null) return;
        var y = ys(v);
        var fill = s.color || (si === 0 ? cols.gold : si === 1 ? cols.cool : cols.good);
        var g = el('g', { class: 'hover-target' }, fr.svg);
        el('rect', { class: 'bar', x: x0 + si * iW, y: y, width: iW * 0.9, height: fr.plot.y + fr.plot.h - y, fill: fill, rx: 1 }, g);
        el('title', { text: r[opt.label || 'y'] + ' ' + s.name + ': ' + (s.fmt ? s.fmt(v) : fmtNum(v, opt.dp || 0)) }, g);
      });
      el('text', { x: fr.plot.x + i * bw + bw / 2, y: fr.plot.y + fr.plot.h + 14, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--ink-3)', text: r[opt.label || 'y'] }, fr.svg);
    });
    return fr.svg;
  }

  /* ============ LINE / AREA CHART ============ */
  function lineChart(data, opt) {
    opt = opt || {};
    var w = opt.w || 400, h = opt.h || 220;
    var fr = frame(w, h, opt);
    var cols = themeColors();
    var series = opt.series;
    var rows = data.rows;
    var max = -Infinity, min = Infinity;
    series.forEach(function (s) { rows.forEach(function (r) { if (r[s.k] == null) return; if (r[s.k] > max) max = r[s.k]; if (r[s.k] < min) min = r[s.k]; }); });
    if (opt.zeroBase) { min = Math.min(0, min); max = Math.max(0, max); }
    var pad = (max - min) * 0.1;
    max += pad; min -= pad;
    var xs = xScale([0, rows.length - 1], fr.plot);
    var ys = yScale([min, max], fr.plot);
    niceTicks(min, max, 4).forEach(function (t) {
      var y = ys(t);
      el('line', { x1: fr.plot.x, y1: y, x2: fr.plot.x + fr.plot.w, y2: y, stroke: cols.rule, 'stroke-width': 0.5, 'stroke-dasharray': '2 3' }, fr.svg);
      el('text', { x: fr.plot.x - 6, y: y + 3, 'text-anchor': 'end', 'font-size': 10, fill: 'var(--ink-4)', text: fmtNum(t, opt.dp || 0) }, fr.svg);
    });
    series.forEach(function (s) {
      var path = '';
      rows.forEach(function (r, i) {
        if (r[s.k] == null) return;
        var x = xs(i), y = ys(r[s.k]);
        path += (i === 0 ? 'M' : 'L') + x + ',' + y + ' ';
      });
      var color = s.color || (s.k === 't' ? cols.gold : s.k === 'h' ? cols.cool : cols.good);
      el('path', { d: path, fill: 'none', stroke: color, 'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, fr.svg);
      rows.forEach(function (r, i) {
        if (r[s.k] == null) return;
        var x = xs(i), y = ys(r[s.k]);
        var g = el('g', { class: 'hover-target' }, fr.svg);
        el('circle', { cx: x, cy: y, r: 3, fill: 'var(--bg-card)', stroke: color, 'stroke-width': 1.5 }, g);
        el('title', { text: r[opt.label || 'y'] + ' ' + s.name + ': ' + (s.fmt ? s.fmt(r[s.k]) : fmtNum(r[s.k], opt.dp || 0)) }, g);
      });
    });
    rows.forEach(function (r, i) {
      var x = xs(i);
      el('text', { x: x, y: fr.plot.y + fr.plot.h + 14, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--ink-3)', text: r[opt.label || 'y'] }, fr.svg);
    });
    if (opt.refLine) {
      var y = ys(opt.refLine.v);
      el('line', { x1: fr.plot.x, y1: y, x2: fr.plot.x + fr.plot.w, y2: y, class: 'ref-line' }, fr.svg);
      el('text', { x: fr.plot.x + fr.plot.w - 2, y: y - 4, 'text-anchor': 'end', class: 'ref-label', text: opt.refLine.label }, fr.svg);
    }
    return fr.svg;
  }

  /* ============ WATERFALL (untung → rugi pelarasan) ============ */
  function waterfall(data, opt) {
    opt = opt || {};
    var w = opt.w || 360, h = opt.h || 240;
    var fr = frame(w, h, opt);
    var cols = themeColors();
    var rows = data.rows;
    var total = 0;
    var cum = [0];
    rows.forEach(function (r, i) {
      var v = r.v;
      if (r.jenis === 'base') { cum[i] = 0; total = v; cum[i + 1] = total; }
      else { total += v; cum[i + 1] = total; }
    });
    var max = Math.max.apply(null, cum.concat([0]));
    var min = Math.min.apply(null, cum.concat([0]));
    if (data.hasil) { max = Math.max(max, data.hasil.v); min = Math.min(min, data.hasil.v); }
    var pad = (max - min) * 0.12;
    max += pad; min -= pad;
    var bw = fr.plot.w / (rows.length + 1);
    var bwInner = bw * 0.55;
    var ys = yScale([min, max], fr.plot);
    niceTicks(min, max, 4).forEach(function (t) {
      var y = ys(t);
      el('line', { x1: fr.plot.x, y1: y, x2: fr.plot.x + fr.plot.w, y2: y, stroke: cols.rule, 'stroke-width': 0.5, 'stroke-dasharray': '2 3' }, fr.svg);
      el('text', { x: fr.plot.x - 6, y: y + 3, 'text-anchor': 'end', 'font-size': 10, fill: 'var(--ink-4)', text: fmtNum(t, 0) }, fr.svg);
    });
    el('line', { x1: fr.plot.x, y1: ys(0), x2: fr.plot.x + fr.plot.w, y2: ys(0), stroke: cols.rule, 'stroke-width': 1 }, fr.svg);
    rows.forEach(function (r, i) {
      var x = fr.plot.x + i * bw + (bw - bwInner) / 2;
      var v = r.v;
      var start, end, color;
      if (r.jenis === 'base') { start = 0; end = v; color = cols.gold; }
      else if (v < 0) { start = cum[i] + v; end = cum[i]; color = cols.bad; }
      else { start = cum[i]; end = cum[i] + v; color = cols.good; }
      var yTop = ys(end), yBot = ys(start);
      var g = el('g', { class: 'hover-target' }, fr.svg);
      el('rect', { class: 'bar', x: x, y: yTop, width: bwInner, height: yBot - yTop, fill: color, rx: 1.5 }, g);
      el('title', { text: r.k + ': ' + fmtNum(v, 0) }, g);
      el('text', { x: x + bwInner / 2, y: yTop - 4, 'text-anchor': 'middle', 'font-size': 9.5, fill: 'var(--ink-2)', text: fmtNum(v, 0) }, fr.svg);
      /* connector line */
      if (i < rows.length - 1) {
        var nextX = fr.plot.x + (i + 1) * bw + (bw - bwInner) / 2;
        el('line', { x1: x + bwInner, y1: ys(end), x2: nextX, y2: ys(end), stroke: cols.rule, 'stroke-width': 1, 'stroke-dasharray': '2 2' }, fr.svg);
      }
      el('text', { x: x + bwInner / 2, y: fr.plot.y + fr.plot.h + 14, 'text-anchor': 'middle', 'font-size': 9.5, fill: 'var(--ink-3)', text: shortLabel(r.k, 18) }, fr.svg);
    });
    /* hasil bar */
    if (data.hasil) {
      var i = rows.length;
      var x = fr.plot.x + i * bw + (bw - bwInner) / 2;
      var yTop = ys(data.hasil.v), yBot = ys(0);
      var g = el('g', { class: 'hover-target' }, fr.svg);
      el('rect', { class: 'bar', x: x, y: Math.min(yTop, yBot), width: bwInner, height: Math.abs(yBot - yTop), fill: data.hasil.v < 0 ? cols.bad : cols.good, rx: 1.5 }, g);
      el('title', { text: data.hasil.k + ': ' + fmtNum(data.hasil.v, 0) }, g);
      el('text', { x: x + bwInner / 2, y: Math.min(yTop, yBot) - 4, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--ink)', 'font-weight': 'bold', text: fmtNum(data.hasil.v, 0) }, fr.svg);
      el('text', { x: x + bwInner / 2, y: fr.plot.y + fr.plot.h + 14, 'text-anchor': 'middle', 'font-size': 9.5, fill: 'var(--ink-3)', text: shortLabel(data.hasil.k, 18) }, fr.svg);
    }
    return fr.svg;
  }

  /* ============ DONUT (composition) ============ */
  function donut(data, opt) {
    opt = opt || {};
    var w = opt.w || 240, h = opt.h || 240;
    var cs = themeColors();
    var svg = el('svg', { class: 'fig', viewBox: '0 0 ' + w + ' ' + h, preserveAspectRatio: 'xMidYMid meet' });
    var cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 8, ri = r * 0.62;
    var total = data.reduce(function (s, d) { return s + d.v; }, 0);
    var a = -Math.PI / 2;
    var cols = [cs.gold, cs.bad, cs.good, cs.cool, cs.ink, cs.rule];
    data.forEach(function (d, i) {
      var frac = d.v / total;
      var a2 = a + frac * Math.PI * 2;
      var large = (a2 - a) > Math.PI ? 1 : 0;
      var x1 = cx + r * Math.cos(a), y1 = cy + r * Math.sin(a);
      var x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      var xi2 = cx + ri * Math.cos(a2), yi2 = cy + ri * Math.sin(a2);
      var xi1 = cx + ri * Math.cos(a), yi1 = cy + ri * Math.sin(a);
      var path = 'M' + x1 + ',' + y1 + ' A' + r + ',' + r + ' 0 ' + large + ' 1 ' + x2 + ',' + y2 + ' L' + xi2 + ',' + yi2 + ' A' + ri + ',' + ri + ' 0 ' + large + ' 0 ' + xi1 + ',' + yi1 + ' Z';
      var color = d.color || cols[i % cols.length];
      var g = el('g', { class: 'hover-target' }, svg);
      el('path', { d: path, fill: color, 'stroke': 'var(--bg-card)', 'stroke-width': 1 }, g);
      el('title', { text: d.k + ': ' + (opt.fmt ? opt.fmt(d.v) : fmtNum(d.v, opt.dp || 0)) + ' (' + (frac * 100).toFixed(1) + '%)' }, g);
      a = a2;
    });
    /* center label */
    el('text', { x: cx, y: cy - 2, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--ink-4)', text: opt.centerLabel || 'Jumlah' }, svg);
    el('text', { x: cx, y: cy + 14, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 'bold', fill: 'var(--ink)', text: opt.fmt ? opt.fmt(total) : fmtNum(total, opt.dp || 0) }, svg);
    return svg;
  }

  /* ============ HORIZONTAL BAR (ranking) ============ */
  function hbar(data, opt) {
    opt = opt || {};
    var w = opt.w || 360, h = opt.h || Math.max(180, data.rows.length * 28 + 30);
    var svg = el('svg', { class: 'fig', viewBox: '0 0 ' + w + ' ' + h, preserveAspectRatio: 'xMidYMid meet' });
    var cs = themeColors();
    var rows = data.rows;
    var max = Math.max.apply(null, rows.map(function (r) { return Math.abs(r[opt.v || 'v']); }));
    var leftPad = opt.leftPad || 110, rightPad = 50, top = 8, bottom = 10;
    var pw = w - leftPad - rightPad;
    var rh = (h - top - bottom) / rows.length;
    niceTicks(0, max, 3).forEach(function (t, i) {
      var x = leftPad + (t / max) * pw;
      el('line', { x1: x, y1: top, x2: x, y2: h - bottom, stroke: cs.rule, 'stroke-width': 0.5, 'stroke-dasharray': '2 3' }, svg);
      el('text', { x: x, y: h - 2, 'text-anchor': 'middle', 'font-size': 9, fill: 'var(--ink-4)', text: opt.fmtAxis ? opt.fmtAxis(t) : fmtNum(t, opt.dp || 0) }, svg);
    });
    rows.forEach(function (r, i) {
      var y = top + i * rh + (rh - rh * 0.6) / 2;
      var bh = rh * 0.6;
      var v = r[opt.v || 'v'];
      var bw = (Math.abs(v) / max) * pw;
      var color = opt.colorFn ? opt.colorFn(r, cs) : cs.bad;
      el('text', { x: leftPad - 6, y: y + bh / 2 + 3, 'text-anchor': 'end', 'font-size': 10, fill: 'var(--ink-2)', text: shortLabel(r[opt.label || 'k'], 16) }, svg);
      var g = el('g', { class: 'hover-target' }, svg);
      el('rect', { class: 'bar', x: leftPad, y: y, width: bw, height: bh, fill: color, rx: 1.5 }, g);
      el('title', { text: r[opt.label || 'k'] + ': ' + (opt.fmt ? opt.fmt(v) : fmtNum(v, opt.dp || 0)) }, g);
      el('text', { x: leftPad + bw + 4, y: y + bh / 2 + 3, 'font-size': 9.5, fill: 'var(--ink-2)', text: opt.fmt ? opt.fmt(v) : fmtNum(v, opt.dp || 0) }, svg);
    });
    return svg;
  }

  /* ============ SCATTER (deposit vs time) ============ */
  function scatter(data, opt) {
    opt = opt || {};
    var w = opt.w || 360, h = opt.h || 200;
    var fr = frame(w, h, opt);
    var cs = themeColors();
    var points = data.points;
    var xMax = Math.max.apply(null, points.map(function (p) { return p.x; }));
    var xMin = Math.min.apply(null, points.map(function (p) { return p.x; }));
    var yMax = Math.max.apply(null, points.map(function (p) { return p.y; })) * 1.1;
    var yMin = 0;
    var xs = xScale([xMin - 0.5, xMax + 0.5], fr.plot);
    var ys = yScale([yMin, yMax], fr.plot);
    niceTicks(yMin, yMax, 4).forEach(function (t) {
      var y = ys(t);
      el('line', { x1: fr.plot.x, y1: y, x2: fr.plot.x + fr.plot.w, y2: y, stroke: cs.rule, 'stroke-width': 0.5, 'stroke-dasharray': '2 3' }, fr.svg);
      el('text', { x: fr.plot.x - 6, y: y + 3, 'text-anchor': 'end', 'font-size': 10, fill: 'var(--ink-4)', text: fmtNum(t, 0) }, fr.svg);
    });
    el('line', { x1: fr.plot.x, y1: ys(0), x2: fr.plot.x + fr.plot.w, y2: ys(0), stroke: cs.rule, 'stroke-width': 1 }, fr.svg);
    /* connect points */
    var sorted = points.slice().sort(function (a, b) { return a.x - b.x; });
    var path = sorted.map(function (p, i) { return (i === 0 ? 'M' : 'L') + xs(p.x) + ',' + ys(p.y); }).join(' ');
    el('path', { d: path, fill: 'none', stroke: cs.gold, 'stroke-width': 1.5, 'stroke-dasharray': '4 3' }, fr.svg);
    sorted.forEach(function (p) {
      var x = xs(p.x), y = ys(p.y);
      var g = el('g', { class: 'hover-target' }, fr.svg);
      var color = p.anggaran ? cs.cool : p.unjuran ? cs.gold : cs.bad;
      el('circle', { cx: x, cy: y, r: 5, fill: color, stroke: 'var(--bg-card)', 'stroke-width': 1.5 }, g);
      el('title', { text: p.label + ' (' + p.bila + '): RM' + p.y + ' bilion' }, g);
    });
    sorted.forEach(function (p, i) {
      var x = xs(p.x), y = ys(p.y);
      if (opt.sparseLabels && i % 2 === 1 && !opt.allLabels) return;
      el('text', { x: x, y: fr.plot.y + fr.plot.h + 14, 'text-anchor': 'middle', 'font-size': 9.5, fill: 'var(--ink-3)', text: p.bila }, fr.svg);
    });
    return fr.svg;
  }

  /* ============ UTILITIES ============ */
  function niceTicks(min, max, n) {
    n = n || 4;
    var range = max - min;
    if (range === 0) return [min];
    var step = Math.pow(10, Math.floor(Math.log10(range / n)));
    var err = (n * step) / range;
    if (err <= 0.15) step *= 10;
    else if (err <= 0.35) step *= 5;
    else if (err <= 0.75) step *= 2;
    var ticks = [];
    var start = Math.ceil(min / step) * step;
    for (var v = start; v <= max + step * 0.001; v += step) ticks.push(Math.round(v * 1e6) / 1e6);
    return ticks;
  }
  function shortLabel(s, n) {
    s = String(s);
    if (s.length <= n) return s;
    return s.slice(0, n - 1) + '…';
  }

  /* expose */
  window.CH = {
    bar: barChart,
    groupedBar: groupedBar,
    line: lineChart,
    waterfall: waterfall,
    donut: donut,
    hbar: hbar,
    scatter: scatter,
    fmtNum: fmtNum,
    fmtRM: fmtRM,
    legend: function (items) {
      var div = document.createElement('div');
      div.className = 'lg';
      items.forEach(function (it) {
        var s = document.createElement('span');
        var i = document.createElement('i');
        i.className = it.line ? 'line' : '';
        if (it.cls) i.className += ' ' + it.cls;
        if (it.color) i.style.background = it.color;
        s.appendChild(i);
        s.appendChild(document.createTextNode(it.t));
        div.appendChild(s);
      });
      return div;
    }
  };
})();