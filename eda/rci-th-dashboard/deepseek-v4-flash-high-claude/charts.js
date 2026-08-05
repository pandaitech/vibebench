/* ============================================================
   CHARTS — library carta SVG ringan (vanilla, tanpa deps)
   Prinsip (dataviz):
     - bar ≤24px tebal, 4px rounded data-end, segi empat di baseline
     - 2px surface gap antara mark bersebelahan
     - tooltip + legend + table view (nilai sentiasa boleh dicapai)
     - satu tooltip, semua siri
   ============================================================ */
window.VB = window.VB || {};

VB.ns = 'http://www.w3.org/2000/svg';
VB._charts = [];   /* registry untuk resize */

/* CSS var() tidak resolve dalam SVG presentation attribute — tukar kepada hex */
function cvar(name) {
  var p = name.replace('var(', '').replace(')', '').trim();
  var v = getComputedStyle(document.documentElement).getPropertyValue(p).trim();
  return v || '#000';
}
function resolvePaint(v) {
  if (typeof v === 'string' && v.indexOf('var(') === 0) return cvar(v);
  return v;
}

function svg(tag, attrs, parent) {
  var el = document.createElementNS(VB.ns, tag);
  for (var k in attrs) {
    if (k === 'text') el.textContent = attrs[k];
    else if ((k === 'fill' || k === 'stroke') && typeof attrs[k] === 'string') {
      el.setAttribute(k, resolvePaint(attrs[k]));
    } else el.setAttribute(k, attrs[k]);
  }
  if (parent) parent.appendChild(el);
  return el;
}
VB.svg = svg;

function el(tag, cls, html) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.textContent = html;
  return e;
}

/* ---------- Tooltip tunggal ---------- */
var tip = null;
function ensureTip() {
  if (!tip) {
    tip = el('div', 'vb-tip');
    tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);
  }
  return tip;
}
VB.tip = {
  show: function (ev, rows) {
    var t = ensureTip();
    t.innerHTML = '';
    var wrap = el('div', 'vb-tip-inner');
    rows.forEach(function (r) {
      var row = el('div', 'vb-tip-row');
      if (r.sw) { var sw = el('span', 'vb-tip-sw'); sw.style.background = r.sw; row.appendChild(sw); }
      var lab = el('span', 'vb-tip-lab'); lab.textContent = r.lab;
      var val = el('span', 'vb-tip-val'); val.textContent = r.val;
      row.appendChild(lab); row.appendChild(val);
      wrap.appendChild(row);
    });
    t.appendChild(wrap);
    var pad = 12;
    var x = ev.clientX + pad, y = ev.clientY + pad;
    var bw = window.innerWidth;
    var tw = t.offsetWidth || 160;
    if (x + tw > bw - 8) x = ev.clientX - tw - pad;
    t.style.left = x + 'px'; t.style.top = y + 'px';
    t.style.opacity = '1'; t.style.visibility = 'visible';
  },
  hide: function () {
    if (tip) { tip.style.opacity = '0'; tip.style.visibility = 'hidden'; }
  }
};

/* ---------- Hijau/merah diverging ---------- */
var DIV = { neg: 'var(--div-neg)', pos: 'var(--div-pos)', neu: 'var(--muted-ink)' };

/* ---------- Skala ---------- */
function niceTicks(min, max, n) {
  if (min === max) { max = min + 1; }
  var span = max - min;
  var step0 = span / n;
  var mag = Math.pow(10, Math.floor(Math.log10(step0)));
  var norm = step0 / mag;
  var step = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
  step *= mag;
  var lo = Math.floor(min / step) * step;
  var hi = Math.ceil(max / step) * step;
  var ticks = [];
  for (var v = lo; v <= hi + step * 1e-6; v += step) ticks.push(roundNice(v));
  return ticks;
}
function roundNice(v) {
  return Math.round(v * 1e6) / 1e6;
}

function fmtNum(v, dp) {
  if (v == null || isNaN(v)) return '—';
  if (Math.abs(v) >= 1e9) return (v / 1e9).toFixed(dp == null ? 2 : dp) + 'B';
  if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(dp == null ? 1 : dp) + 'J';
  if (Math.abs(v) >= 1e3) return (v / 1e3).toFixed(dp == null ? 1 : dp) + 'K';
  return String(Math.round(v * 10) / 10);
}
VB.fmt = fmtNum;

/* ---------- KAD CARTA ----------
   { title, sub, src, flag, head:[..], rows:[[..]], plot:fn(plotEl,size) }
   Mempunyai butang "Jadual" untuk paparan alternatif. */
VB.card = function (cfg) {
  var card = el('section', 'chart-card');
  var head = el('div', 'chart-head');
  var tWrap = el('div', 'chart-title-wrap');
  var h = el('h3', 'chart-title'); h.textContent = cfg.title;
  tWrap.appendChild(h);
  if (cfg.sub) { var s = el('p', 'chart-sub'); s.textContent = cfg.sub; tWrap.appendChild(s); }
  head.appendChild(tWrap);
  if (cfg.flag || cfg.src) {
    var meta = el('div', 'chart-meta');
    if (cfg.flag) { var f = el('span', 'flag flag-' + cfg.flag); f.textContent = cfg.flag; meta.appendChild(f); }
    if (cfg.src) { var ss = el('span', 'src'); ss.textContent = 'Sumber: ' + cfg.src; meta.appendChild(ss); }
    head.appendChild(meta);
  }
  var actions = el('div', 'chart-actions');
  if (cfg.head && cfg.rows) {
    var btn = el('button', 'table-toggle');
    btn.type = 'button';
    btn.textContent = 'Jadual';
    btn.setAttribute('aria-expanded', 'false');
    actions.appendChild(btn);
  }
  head.appendChild(actions);
  card.appendChild(head);

  var plot = el('div', 'chart-plot');
  card.appendChild(plot);

  if (cfg.head && cfg.rows) {
    var tableWrap = el('div', 'chart-table');
    tableWrap.style.display = 'none';
    var table = el('table');
    var thead = el('thead'); var tr = el('tr');
    cfg.head.forEach(function (h2) { var th = el('th'); th.textContent = h2; tr.appendChild(th); });
    thead.appendChild(tr); table.appendChild(thead);
    var tbody = el('tbody');
    cfg.rows.forEach(function (r) {
      var tr2 = el('tr');
      r.forEach(function (c, i) { var td = el('td'); td.textContent = c; if (i === 0) td.className = 'first'; tr2.appendChild(td); });
      tbody.appendChild(tr2);
    });
    table.appendChild(tbody); tableWrap.appendChild(table);
    card.appendChild(tableWrap);

    btn.addEventListener('click', function () {
      var open = tableWrap.style.display !== 'none';
      tableWrap.style.display = open ? 'none' : 'block';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      btn.textContent = open ? 'Jadual' : 'Tutup jadual';
      if (!open) VB.layoutPlots(card);
    });
  }

  if (cfg.plot) {
    var render = function () {
      plot.innerHTML = '';
      var w = plot.clientWidth || 320;
      var h = cfg.h || Math.min(340, Math.max(220, w * 0.6));
      cfg.plot(plot, { w: w, h: h });
    };
    var entry = { el: plot, fn: render };
    VB._charts.push(entry);
    entry.fn = render;
    render();
  }
  return card;
};

/* Susun semula plot dalam kad (selepas jadual dibuka/tutup) */
VB.layoutPlots = function (card) {
  var plot = card.querySelector('.chart-plot');
  if (!plot) return;
  var idx = VB._charts.findIndex(function (c) { return c.el === plot; });
  if (idx >= 0 && VB._charts[idx].fn) VB._charts[idx].fn();
};

/* ---------- Pembersihan pada resize ---------- */
(function () {
  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(function () {
      VB._charts.forEach(function (c) { if (c.fn) c.fn(); });
    }, 120);
  });
})();

/* ---------- Aksesori: legend ---------- */
VB.legend = function (items) {
  var lg = el('div', 'vb-legend');
  items.forEach(function (it) {
    var li = el('span', 'vb-legend-item');
    var sw = el('span', 'vb-swatch');
    sw.style.background = it.color;
    li.appendChild(sw);
    var t = el('span'); t.textContent = it.label;
    li.appendChild(t);
    lg.appendChild(li);
  });
  return lg;
};

/* ============================================================
   BAR HORIZONTAL — banding magnitud, label kiri panjang
   ============================================================ */
VB.barH = function (cfg) {
  /* cfg: { data:[{label, value, color, sub}], unit, negative, fmt } */
  var F = cfg.fmt || fmtNum;
  var plot = cfg.el, w = cfg.w, h = cfg.h;
  var pad = { l: 8, r: cfg.unit ? 78 : 64, t: 10, b: 8 };
  var rowH = Math.max(30, Math.min(46, (h - pad.t - pad.b) / cfg.data.length));
  var innerW = w - pad.l - pad.r;
  var maxAbs = 0;
  cfg.data.forEach(function (d) { maxAbs = Math.max(maxAbs, Math.abs(d.value)); });
  if (cfg.max) maxAbs = cfg.max;
  if (maxAbs === 0) maxAbs = 1;
  var zero = cfg.negative ? pad.l + innerW / 2 : pad.l;
  var scaleW = cfg.negative ? innerW / 2 : innerW;

  var sv = svg('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h, class: 'vb-svg', role: 'img' }, plot);
  svg('rect', { x: 0, y: 0, width: w, height: h, fill: 'var(--chart-surface)', rx: 10 }, sv);

  if (cfg.negative) {
    /* garis tengah */
    svg('line', { x1: zero, y1: 6, x2: zero, y2: h - 6, stroke: 'var(--baseline)', 'stroke-width': 1 }, sv);
  }
  /* gridlines menegak */
  var ticks = cfg.negative
    ? niceTicks(-maxAbs, maxAbs, 4)
    : niceTicks(0, maxAbs, 4);
  ticks.forEach(function (tk) {
    if (tk === 0 && !cfg.negative) return;
    var x = zero + (tk / maxAbs) * scaleW * (cfg.negative ? 1 : 1);
    if (cfg.negative) x = zero + (tk / maxAbs) * scaleW;
    svg('line', { x1: x, y1: 6, x2: x, y2: h - 6, stroke: 'var(--gridline)', 'stroke-width': 1 }, sv);
    var lab = svg('text', { x: x, y: h - 2, 'text-anchor': 'middle', class: 'vb-axis' }, sv);
    lab.textContent = F(tk);
  });
  if (!cfg.negative) {
    svg('line', { x1: zero, y1: 6, x2: zero, y2: h - 6, stroke: 'var(--baseline)', 'stroke-width': 1 }, sv);
  }

  cfg.data.forEach(function (d, i) {
    var y = pad.t + i * rowH + rowH * 0.12;
    var barHgt = Math.max(6, rowH * 0.55);
    var bw = Math.abs(d.value) / maxAbs * scaleW;
    var x = cfg.negative ? (d.value >= 0 ? zero : zero - bw) : zero;
    var color = d.color || 'var(--series-1)';
    var rr = Math.min(4, bw);
    var d2;
    if (d.value >= 0) d2 = 'M ' + x + ' ' + (y + barHgt) + ' v' + (-barHgt) + ' q0 ' + (-rr) + ' ' + rr + ' ' + (-rr) + ' h' + Math.max(0, bw - 2 * rr) + ' q' + rr + ' 0 ' + rr + ' ' + rr + ' v' + (barHgt - rr) + ' z';
    else d2 = 'M ' + x + ' ' + y + ' v' + barHgt + ' q0 ' + rr + ' ' + rr + ' ' + rr + ' h' + Math.max(0, bw - 2 * rr) + ' q' + rr + ' 0 ' + rr + ' ' + (-rr) + ' v' + (-barHgt) + ' z';
    var p = svg('path', { d: d2, fill: color, class: 'vb-mark' }, sv);

    var label = svg('text', { x: pad.l - 6, y: y + barHgt / 2 + 4, 'text-anchor': 'end', class: 'vb-label' }, sv);
    label.textContent = d.label.length > 26 ? d.label.slice(0, 25) + '…' : d.label;

    var val = svg('text', { x: x + bw + (d.value >= 0 ? 6 : -6), y: y + barHgt / 2 + 4, 'text-anchor': d.value >= 0 ? 'start' : 'end', class: 'vb-value' }, sv);
    val.textContent = (cfg.unit ? cfg.unit + ' ' : '') + F(d.value);

    p.addEventListener('pointermove', function (ev) {
      var rows = [{ lab: d.label, val: (cfg.unit ? cfg.unit + ' ' : '') + F(d.value), sw: color }];
      if (d.sub) rows.push({ lab: '', val: d.sub });
      VB.tip.show(ev, rows);
      p.style.opacity = '0.8';
    });
    p.addEventListener('pointerleave', function () { VB.tip.hide(); p.style.opacity = '1'; });
  });
};

/* ============================================================
   BAR VERTIKAL (kumpulan) — siri mengikut masa / kategori
   ============================================================ */
VB.barV = function (cfg) {
  /* cfg: { labels:[..], series:[{name,color,values:[..]}], unit, stacked, max, goal, fmt } */
  var F = cfg.fmt || fmtNum;
  var plot = cfg.el, w = cfg.w, h = cfg.h;
  var pad = { l: 8, r: 8, t: 20, b: 30 };
  var innerW = w - pad.l - pad.r;
  var innerH = h - pad.t - pad.b;

  /* skala: sokong nilai positif & negatif (garis sifar di tengah) */
  var minV = 0, maxV = 0;
  cfg.series.forEach(function (s) {
    s.values.forEach(function (v) {
      if (cfg.stacked) { /* dikira per kategori di bawah */ }
      else { if (v > maxV) maxV = v; if (v < minV) minV = v; }
    });
  });
  if (cfg.stacked) {
    for (var c = 0; c < cfg.labels.length; c++) {
      var sum = 0;
      cfg.series.forEach(function (s) { sum += Math.abs(s.values[c]) || 0; });
      if (sum > maxV) maxV = sum;
    }
    minV = 0;
  }
  if (cfg.max) { maxV = cfg.max; }
  if (minV >= 0) minV = 0;
  var span = (maxV - minV) || 1;
  maxV += span * 0.04; minV -= span * 0.04;
  span = maxV - minV;
  var ticks = niceTicks(minV, maxV, 4);

  var sv = svg('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h, class: 'vb-svg', role: 'img' }, plot);
  svg('rect', { x: 0, y: 0, width: w, height: h, fill: 'var(--chart-surface)', rx: 10 }, sv);
  var y0 = pad.t + innerH;
  var zeroY = y0 - ((0 - minV) / span) * innerH;
  ticks.forEach(function (tk) {
    var y = y0 - ((tk - minV) / span) * innerH;
    var isZero = Math.abs(tk) < 1e-6;
    svg('line', { x1: pad.l, y1: y, x2: w - pad.r, y2: y, stroke: isZero ? 'var(--baseline)' : 'var(--gridline)', 'stroke-width': 1 }, sv);
    var lab = svg('text', { x: pad.l + 4, y: y - 3, class: 'vb-axis' }, sv);
    lab.textContent = F(tk);
  });

  var n = cfg.labels.length;
  var gap = 2;
  var groupW = Math.min(innerW / n * 0.72, 64);
  var nSeries = cfg.series.length;
  var barW = cfg.stacked ? Math.max(6, groupW - 8) : Math.max(6, (groupW - (nSeries - 1) * gap) / nSeries);
  var startX = pad.l + (innerW - groupW * n) / 2 + groupW / 2;

  function Y(v) { return y0 - ((v - minV) / span) * innerH; }

  cfg.labels.forEach(function (lab, c) {
    if (cfg.stacked) {
      var posY = zeroY, negY = zeroY;
      cfg.series.forEach(function (s) {
        var v = s.values[c] || 0;
        if (v === 0) return;
        var bh = (Math.abs(v) / span) * innerH;
        var x = startX - groupW / 2 + c * groupW + 4;
        var top, hh;
        if (v > 0) { top = posY - bh; hh = bh; posY = top; }
        else { top = negY; hh = bh; negY = negY + bh; }
        var rect = svg('path', { d: roundedRect(x, top, barW, hh, 4), fill: s.color, class: 'vb-mark' }, sv);
        bind(rect, s.name, lab, v, s.color);
      });
    } else {
      cfg.series.forEach(function (s, si) {
        var v = s.values[c] || 0;
        var bh = (Math.abs(v) / span) * innerH;
        var x = startX - groupW / 2 + c * groupW + si * (barW + gap);
        var top = v >= 0 ? zeroY - bh : zeroY;
        var rect = svg('path', { d: roundedRect(x, top, barW, bh, 4), fill: s.color, class: 'vb-mark' }, sv);
        bind(rect, s.name, lab, v, s.color);
        if (cfg.goal && si === 0 && cfg.goal[c] != null) {
          var gy = Y(cfg.goal[c]);
          svg('line', { x1: x - 3, y1: gy, x2: x + barW + 3, y2: gy, stroke: 'var(--muted-ink)', 'stroke-width': 1.5 }, sv);
        }
      });
    }
    var xl = startX + c * groupW;
    var tl = svg('text', { x: xl, y: h - 8, 'text-anchor': 'middle', class: 'vb-axis' }, sv);
    tl.textContent = lab;
    if (cfg.labels2 && cfg.labels2[c]) {
      var tl2 = svg('text', { x: xl, y: h - 1, 'text-anchor': 'middle', class: 'vb-axis vb-axis2' }, sv);
      tl2.textContent = cfg.labels2[c];
    }
  });

  function bind(node, sname, clab, v, color) {
    node.addEventListener('pointermove', function (e) {
      VB.tip.show(e, [
        { lab: clab, val: '', sw: color },
        { lab: sname, val: (cfg.unit ? cfg.unit + ' ' : '') + F(v) }
      ]);
      node.style.opacity = '0.8';
    });
    node.addEventListener('pointerleave', function () { VB.tip.hide(); node.style.opacity = '1'; });
  }

  if (cfg.legend && cfg.series.length > 1) {
    plot.appendChild(VB.legend(cfg.series.map(function (s) { return { label: s.name, color: s.color }; })));
  }
};

/* ============================================================
   LINE — trend masa (dengan crosshair + tooltip)
   ============================================================ */
VB.line = function (cfg) {
  /* cfg: { labels, series:[{name,color,values}], unit, area, yFmt, fmt } */
  var F = cfg.yFmt || cfg.fmt || fmtNum;
  var plot = cfg.el, w = cfg.w, h = cfg.h;
  var pad = { l: 8, r: cfg.direct ? 92 : 12, t: 20, b: 30 };
  var innerW = w - pad.l - pad.r;
  var innerH = h - pad.t - pad.b;
  var all = [];
  cfg.series.forEach(function (s) { all = all.concat(s.values); });
  var maxV = Math.max.apply(null, all.concat([0])) * 1.15;
  var minV = Math.min.apply(null, all.concat([0]));
  if (minV >= 0) minV = 0; else minV *= 1.15;
  var ticks = niceTicks(minV, maxV, 4);
  var span = maxV - minV || 1;

  var sv = svg('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h, class: 'vb-svg', role: 'img' }, plot);
  svg('rect', { x: 0, y: 0, width: w, height: h, fill: 'var(--chart-surface)', rx: 10 }, sv);
  var y0 = pad.t + innerH;
  ticks.forEach(function (tk) {
    var y = y0 - ((tk - minV) / span) * innerH;
    svg('line', { x1: pad.l, y1: y, x2: w - pad.r, y2: y, stroke: 'var(--gridline)', 'stroke-width': 1 }, sv);
    var lab = svg('text', { x: pad.l + 4, y: y - 3, class: 'vb-axis' }, sv);
    lab.textContent = fmtNum(tk);
  });
  svg('line', { x1: pad.l, y1: y0, x2: w - pad.r, y2: y0, stroke: 'var(--baseline)', 'stroke-width': 1 }, sv);

  var n = cfg.labels.length;
  function X(i) {
    return n === 1 ? pad.l + innerW / 2 : pad.l + (i / (n - 1)) * innerW;
  }
  function Y(v) { return y0 - ((v - minV) / span) * innerH; }

  cfg.series.forEach(function (s) {
    var pts = s.values.map(function (v, i) { return [X(i), Y(v)]; });
    if (cfg.area) {
      var d = 'M ' + pts[0][0] + ' ' + y0;
      pts.forEach(function (p) { d += ' L ' + p[0] + ' ' + p[1]; });
      d += ' L ' + pts[n - 1][0] + ' ' + y0 + ' Z';
      svg('path', { d: d, fill: s.color, opacity: 0.1 }, sv);
    }
    var line = svg('path', { d: 'M ' + pts.map(function (p) { return p[0] + ' ' + p[1]; }).join(' L '), fill: 'none', stroke: s.color, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', class: 'vb-line' }, sv);
    pts.forEach(function (p, i) {
      var dot = svg('circle', { cx: p[0], cy: p[1], r: 4, fill: s.color, stroke: 'var(--chart-surface)', 'stroke-width': 2, class: 'vb-point' }, sv);
      dot.addEventListener('pointermove', function (e) {
        VB.tip.show(e, [
          { lab: cfg.labels[i], val: '', sw: s.color },
          { lab: s.name, val: (cfg.unit ? cfg.unit + ' ' : '') + F(s.values[i]) }
        ]);
      });
      dot.addEventListener('pointerleave', VB.tip.hide);
      if (cfg.direct && i === n - 1) {
        var tl = svg('text', { x: p[0] + 8, y: p[1] + 4, class: 'vb-label' }, sv);
        tl.textContent = s.name + ' ' + F(s.values[i]);
      }
    });
  });

  /* crosshair + tooltip seluruh x */
  var cross = svg('line', { y1: pad.t, y2: y0, stroke: 'var(--baseline)', 'stroke-width': 1, opacity: 0, 'pointer-events': 'none' }, sv);
  var band = svg('rect', { x: pad.l, y: pad.t, width: innerW, height: innerH, fill: 'transparent' }, sv);
  band.addEventListener('pointermove', function (e) {
    var bx = e.offsetX - sv.getBoundingClientRect().left;
    var i = Math.round((bx - pad.l) / innerW * (n - 1));
    i = Math.max(0, Math.min(n - 1, i));
    var x = X(i);
    cross.setAttribute('x1', x); cross.setAttribute('x2', x);
    cross.setAttribute('opacity', '1');
    var rows = [{ lab: cfg.labels[i], val: '' }];
    cfg.series.forEach(function (s) {
      rows.push({ lab: s.name, val: (cfg.unit ? cfg.unit + ' ' : '') + F(s.values[i]), sw: s.color });
    });
    VB.tip.show(e, rows);
  });
  band.addEventListener('pointerleave', function () { cross.setAttribute('opacity', '0'); VB.tip.hide(); });

  if (cfg.legend && cfg.series.length > 1) {
    plot.appendChild(VB.legend(cfg.series.map(function (s) { return { label: s.name, color: s.color }; })));
  }
};

/* ============================================================
   DUMBBELL — sebelum → selepas (nilai pemindahan vs pasaran)
   ============================================================ */
VB.dumbbell = function (cfg) {
  /* cfg: { rows:[{label, a, b}], aName, bName, aColor, bColor, unit, fmt } */
  var F = cfg.fmt || fmtNum;
  var plot = cfg.el, w = cfg.w, h = cfg.h;
  var pad = { l: 8, r: 12, t: 16, b: 8 };
  var labelW = 8;
  var innerW = w - pad.l - pad.r;
  var rowH = Math.max(34, Math.min(52, (h - pad.t - pad.b) / cfg.rows.length));
  var all = [];
  cfg.rows.forEach(function (r) { all.push(r.a, r.b); });
  var maxV = Math.max.apply(null, all) * 1.12;
  var ticks = niceTicks(0, maxV, 4);

  var sv = svg('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h, class: 'vb-svg', role: 'img' }, plot);
  svg('rect', { x: 0, y: 0, width: w, height: h, fill: 'var(--chart-surface)', rx: 10 }, sv);
  ticks.forEach(function (tk) {
    var x = pad.l + (tk / maxV) * innerW;
    svg('line', { x1: x, y1: 6, x2: x, y2: h - 6, stroke: 'var(--gridline)', 'stroke-width': 1 }, sv);
    var lab = svg('text', { x: x, y: h - 2, 'text-anchor': 'middle', class: 'vb-axis' }, sv);
    lab.textContent = fmtNum(tk);
  });

  cfg.rows.forEach(function (r, i) {
    var y = pad.t + i * rowH + rowH / 2;
    var xa = pad.l + (r.a / maxV) * innerW;
    var xb = pad.l + (r.b / maxV) * innerW;
    svg('line', { x1: xa, y1: y, x2: xb, y2: y, stroke: 'var(--muted-ink)', 'stroke-width': 2, opacity: 0.5 }, sv);
    var da = svg('circle', { cx: xa, cy: y, r: 6, fill: cfg.aColor, stroke: 'var(--chart-surface)', 'stroke-width': 2 }, sv);
    var db = svg('circle', { cx: xb, cy: y, r: 6, fill: cfg.bColor, stroke: 'var(--chart-surface)', 'stroke-width': 2 }, sv);
    var lab = svg('text', { x: pad.l - 6, y: y + 4, 'text-anchor': 'end', class: 'vb-label' }, sv);
    lab.textContent = r.label;
    var valA = svg('text', { x: xa, y: y - 10, 'text-anchor': 'middle', class: 'vb-value vb-value-sm' }, sv);
    valA.textContent = F(r.a);
    var valB = svg('text', { x: xb, y: y - 10, 'text-anchor': 'middle', class: 'vb-value vb-value-sm' }, sv);
    valB.textContent = F(r.b);
    [da, db].forEach(function (d, di) {
      d.addEventListener('pointermove', function (e) {
        VB.tip.show(e, [
          { lab: r.label, val: '' },
          { lab: di === 0 ? cfg.aName : cfg.bName, val: (cfg.unit ? cfg.unit + ' ' : '') + F(di === 0 ? r.a : r.b) }
        ]);
      });
      d.addEventListener('pointerleave', VB.tip.hide);
    });
  });
  plot.appendChild(VB.legend([
    { label: cfg.aName, color: cfg.aColor }, { label: cfg.bName, color: cfg.bColor }
  ]));
};

/* ============================================================
   WATERFALL — jambatan keuntungan / posisi
   ============================================================ */
VB.waterfall = function (cfg) {
  /* cfg: { items:[{label, value, type:'base'|'adj'|'total'}], unit, fmt } */
  var F = cfg.fmt || fmtNum;
  var plot = cfg.el, w = cfg.w, h = cfg.h;
  var pad = { l: 8, r: 8, t: 20, b: 34 };
  var innerW = w - pad.l - pad.r;
  var innerH = h - pad.t - pad.b;
  var total = 0;
  var items = cfg.items.map(function (it) {
    if (it.type === 'total') return { label: it.label, value: it.value, type: 'total', start: 0 };
    var start = total;
    total += it.value;
    return { label: it.label, value: it.value, type: it.type, start: start };
  });
  var allV = [0, total].concat(items.map(function (it) { return it.start + it.value; }));
  var maxV = Math.max.apply(null, allV) * 1.1;
  var minV = Math.min.apply(null, allV.concat([0])) * 1.15;
  var ticks = niceTicks(minV, maxV, 4);
  var span = maxV - minV || 1;
  var y0 = pad.t + innerH;

  var sv = svg('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h, class: 'vb-svg', role: 'img' }, plot);
  svg('rect', { x: 0, y: 0, width: w, height: h, fill: 'var(--chart-surface)', rx: 10 }, sv);
  ticks.forEach(function (tk) {
    var y = y0 - ((tk - minV) / span) * innerH;
    svg('line', { x1: pad.l, y1: y, x2: w - pad.r, y2: y, stroke: 'var(--gridline)', 'stroke-width': 1 }, sv);
    var lab = svg('text', { x: pad.l + 4, y: y - 3, class: 'vb-axis' }, sv);
    lab.textContent = fmtNum(tk);
  });

  var n = items.length;
  var barW = Math.min(innerW / n * 0.6, 60);
  items.forEach(function (it, i) {
    var x = pad.l + (i + 0.5) * (innerW / n) - barW / 2;
    var yTop = y0 - ((it.start + Math.max(0, it.value) - minV) / span) * innerH;
    var yBot = y0 - ((it.start + Math.min(0, it.value) - minV) / span) * innerH;
    var bh = Math.max(2, Math.abs(it.value) / span * innerH);
    var color = it.type === 'total' ? 'var(--series-4)' : (it.value >= 0 ? DIV.pos : DIV.neg);
    var rect = svg('path', { d: roundedRect(x, yTop, barW, bh, 4), fill: color, class: 'vb-mark' }, sv);
    rect.addEventListener('pointermove', function (e) {
      VB.tip.show(e, [{ lab: it.label, val: (cfg.unit ? cfg.unit + ' ' : '') + F(it.value) }]);
    });
    rect.addEventListener('pointerleave', VB.tip.hide);
    /* talian penghubung */
    if (i < n - 1 && it.type !== 'total') {
      var cx = x + barW, cy = y0 - ((it.start + it.value - minV) / span) * innerH;
      svg('line', { x1: cx, y1: cy, x2: x + barW + innerW / n - barW, y2: cy, stroke: 'var(--muted-ink)', 'stroke-width': 1, opacity: 0.6, 'stroke-dasharray': '3 3' }, sv);
    }
    var tl = svg('text', { x: x + barW / 2, y: h - 10, 'text-anchor': 'middle', class: 'vb-axis' }, sv);
    tl.textContent = it.label;
    var vl = svg('text', { x: x + barW / 2, y: it.value >= 0 ? yTop - 5 : yBot + 13, 'text-anchor': 'middle', class: 'vb-value vb-value-sm' }, sv);
    vl.textContent = F(it.value);
  });
};

/* ============================================================
   STAT TILE / METER
   ============================================================ */
VB.statTile = function (cfg) {
  var t = el('div', 'stat-tile');
  var lab = el('span', 'stat-label'); lab.textContent = cfg.label;
  var val = el('span', 'stat-value'); val.textContent = cfg.value;
  var sub = el('span', 'stat-sub'); sub.textContent = cfg.sub || '';
  t.appendChild(lab); t.appendChild(val); t.appendChild(sub);
  return t;
};

VB.meter = function (cfg) {
  var m = el('div', 'meter');
  var lab = el('span', 'meter-label'); lab.textContent = cfg.label;
  var row = el('div', 'meter-row');
  var track = el('div', 'meter-track');
  var fill = el('div', 'meter-fill');
  fill.style.width = Math.min(100, Math.max(2, cfg.pct)) + '%';
  fill.style.background = cfg.color || 'var(--series-1)';
  track.appendChild(fill);
  var val = el('span', 'meter-val'); val.textContent = cfg.value;
  row.appendChild(track); row.appendChild(val);
  m.appendChild(lab); m.appendChild(row);
  if (cfg.note) { var n = el('span', 'meter-note'); n.textContent = cfg.note; m.appendChild(n); }
  return m;
};

/* ============================================================
   HEATMAP / matriks kecil (pilihan)
   ============================================================ */
VB.cells = function (cfg) {
  /* cfg: { items:[{label, value, color}], max } */
  var g = el('div', 'vb-cells');
  var max = cfg.max || Math.max.apply(null, cfg.items.map(function (i) { return i.value; }));
  cfg.items.forEach(function (it) {
    var c = el('div', 'vb-cell');
    var pct = Math.round(it.value / max * 100);
    c.style.setProperty('--fill', String(pct) + '%');
    var lab = el('span', 'vb-cell-label'); lab.textContent = it.label;
    var val = el('span', 'vb-cell-value'); val.textContent = fmtNum(it.value);
    c.appendChild(lab); c.appendChild(val);
    g.appendChild(c);
  });
  return g;
};

/* ---------- helper: rounded rect path ---------- */
function roundedRect(x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  if (h < 0) { y = y + h; h = -h; r = Math.min(r, w / 2, h / 2); }
  if (r <= 0) return 'M ' + x + ' ' + y + ' h ' + w + ' v ' + h + ' h ' + -w + ' Z';
  return 'M ' + x + ' ' + (y + r) +
    ' Q ' + x + ' ' + y + ' ' + (x + r) + ' ' + y +
    ' H ' + (x + w - r) +
    ' Q ' + (x + w) + ' ' + y + ' ' + (x + w) + ' ' + (y + r) +
    ' V ' + (y + h - r) +
    ' Q ' + (x + w) + ' ' + (y + h) + ' ' + (x + w - r) + ' ' + (y + h) +
    ' H ' + (x + r) +
    ' Q ' + x + ' ' + (y + h) + ' ' + x + ' ' + (y + h - r) +
    ' Z';
}

/* Format jumlah RM besar untuk label */
VB.rm = function (v, dp) {
  if (v == null) return '—';
  var sign = v < 0 ? '−' : '';
  var a = Math.abs(v);
  if (a >= 1e9) return sign + 'RM' + (a / 1e9).toFixed(dp == null ? 2 : dp) + 'b';
  if (a >= 1e6) return sign + 'RM' + (a / 1e6).toFixed(dp == null ? 1 : dp) + 'j';
  if (a >= 1e3) return sign + 'RM' + (a / 1e3).toFixed(0) + 'k';
  return sign + 'RM' + a;
};
