/* ===========================================================================
   Chart primitives — SVG tulen, tiada pustaka luar.
   Semua carta responsif: dilukis semula bila saiz tetingkap berubah.
   =========================================================================== */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var registry = [];
  var tipEl = null;

  function css(v) {
    return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || '#888';
  }

  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    if (attrs) for (var k in attrs) if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function txt(parent, x, y, s, attrs) {
    var t = el('text', Object.assign({ x: x, y: y }, attrs || {}), parent);
    t.textContent = s;
    return t;
  }

  // ------------------------------------------------------------- TOOLTIP
  function tip() {
    if (!tipEl) {
      tipEl = document.createElement('div');
      tipEl.className = 'tip';
      document.body.appendChild(tipEl);
    }
    return tipEl;
  }
  function showTip(ev, html) {
    var t = tip();
    t.innerHTML = html;
    t.classList.add('on');
    moveTip(ev);
  }
  function moveTip(ev) {
    var t = tip();
    var pt = ev.touches && ev.touches[0] ? ev.touches[0] : ev;
    var w = t.offsetWidth, h = t.offsetHeight;
    var x = pt.clientX + 14, y = pt.clientY - h - 12;
    if (x + w > window.innerWidth - 8) x = window.innerWidth - w - 8;
    if (x < 8) x = 8;
    if (y < 8) y = pt.clientY + 20;
    t.style.left = x + 'px';
    t.style.top = y + 'px';
  }
  function hideTip() { if (tipEl) tipEl.classList.remove('on'); }

  function bindTip(node, html) {
    node.addEventListener('mouseenter', function (e) { showTip(e, html); });
    node.addEventListener('mousemove', moveTip);
    node.addEventListener('mouseleave', hideTip);
    node.addEventListener('touchstart', function (e) { showTip(e, html); }, { passive: true });
    node.addEventListener('touchend', function () { setTimeout(hideTip, 1800); }, { passive: true });
  }
  document.addEventListener('scroll', hideTip, true);

  // ------------------------------------------------------------- HELPERS
  function fmt(n, d) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    d = d === undefined ? 0 : d;
    return Number(n).toLocaleString('ms-MY', { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function niceTicks(min, max, count) {
    if (min === max) { min -= 1; max += 1; }
    var span = max - min;
    var step = Math.pow(10, Math.floor(Math.log(span / count) / Math.LN10));
    var err = (span / count) / step;
    if (err >= 7.5) step *= 10; else if (err >= 3.5) step *= 5; else if (err >= 1.5) step *= 2;
    var lo = Math.floor(min / step) * step;
    var hi = Math.ceil(max / step) * step;
    var out = [];
    for (var v = lo; v <= hi + step * 0.5; v += step) out.push(Math.round(v / step) * step);
    return out;
  }

  function mount(container, minW, draw) {
    container.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.className = 'chart-scroll';
    container.appendChild(wrap);
    function run() {
      var avail = container.clientWidth || 320;
      var w = Math.max(avail, minW);
      wrap.innerHTML = '';
      var svg = el('svg', { class: 'ch', width: w, height: 10, viewBox: '0 0 ' + w + ' 10' }, wrap);
      var h = draw(svg, w);
      svg.setAttribute('height', h);
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    }
    run();
    // satu entri sahaja bagi setiap bekas — elak lukisan lama dilukis semula
    for (var i = registry.length - 1; i >= 0; i--) {
      if (registry[i].c === container) registry.splice(i, 1);
    }
    registry.push({ c: container, f: run });
    return run;
  }

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      registry.forEach(function (e) {
        if (!document.body.contains(e.c)) return;
        try { e.f(); } catch (err) {}
      });
    }, 160);
  });

  function resetRegistry() { registry.length = 0; }

  // ------------------------------------------------------- VERTICAL BARS
  /* opts: { cats:[], series:[{name,color,data:[],type:'bar'|'line'}],
             minW, height, stacked, fmtV, unit, valueLabels, tipRows } */
  function bars(container, o) {
    var minW = o.minW || Math.max(300, o.cats.length * (o.slot || 56));
    return mount(container, minW, function (svg, W) {
      var H = o.height || 260;
      var padL = o.padL || 44, padR = 12, padT = o.padT || 14, padB = o.padB || 34;
      var iw = W - padL - padR, ih = H - padT - padB;

      var barSeries = o.series.filter(function (s) { return s.type !== 'line'; });
      var lineSeries = o.series.filter(function (s) { return s.type === 'line'; });

      var vals = [];
      if (o.stacked) {
        o.cats.forEach(function (_, i) {
          var p = 0, n = 0;
          barSeries.forEach(function (s) { var v = s.data[i] || 0; if (v >= 0) p += v; else n += v; });
          vals.push(p, n);
        });
      } else {
        o.series.forEach(function (s) { s.data.forEach(function (v) { if (v !== null && v !== undefined) vals.push(v); }); });
      }
      vals.push(0);
      var ticks = niceTicks(Math.min.apply(null, vals), Math.max.apply(null, vals), o.ticks || 4);
      var lo = ticks[0], hi = ticks[ticks.length - 1];
      var y = function (v) { return padT + ih - (v - lo) / (hi - lo) * ih; };

      ticks.forEach(function (t) {
        el('line', { class: t === 0 ? 'zero-l' : 'grid-l', x1: padL, x2: W - padR, y1: y(t), y2: y(t) }, svg);
        txt(svg, padL - 7, y(t) + 3.5, o.fmtAxis ? o.fmtAxis(t) : fmt(t), { 'text-anchor': 'end' });
      });

      var step = iw / o.cats.length;
      var gw = Math.min(step * 0.72, 62);
      var bw = o.stacked ? gw : gw / Math.max(1, barSeries.length);

      o.cats.forEach(function (c, i) {
        var cx = padL + step * i + step / 2;
        txt(svg, cx, H - padB + 16, clip(c, step - 4), { 'text-anchor': 'middle', class: 'axl' });

        if (o.stacked) {
          var accP = 0, accN = 0;
          barSeries.forEach(function (s) {
            var v = s.data[i]; if (v === null || v === undefined) return;
            var base = v >= 0 ? accP : accN;
            var y0 = y(base), y1 = y(base + v);
            if (v >= 0) accP += v; else accN += v;
            var r = el('rect', {
              class: 'bar', x: cx - gw / 2, y: Math.min(y0, y1), width: gw,
              height: Math.max(1, Math.abs(y1 - y0)), fill: s.color, rx: 2
            }, svg);
            bindTip(r, tipHTML(o, c, i));
          });
        } else {
          barSeries.forEach(function (s, si) {
            var v = s.data[i]; if (v === null || v === undefined) return;
            var y0 = y(0), y1 = y(v);
            var x = cx - gw / 2 + si * bw;
            var r = el('rect', {
              class: 'bar', x: x + 1, y: Math.min(y0, y1), width: Math.max(2, bw - 2),
              height: Math.max(1, Math.abs(y1 - y0)),
              fill: s.colorFn ? s.colorFn(v, i) : s.color, rx: 2,
              'fill-opacity': s.opacityFn ? s.opacityFn(v, i) : null
            }, svg);
            bindTip(r, tipHTML(o, c, i));
            if (o.valueLabels && barSeries.length === 1) {
              txt(svg, x + bw / 2, (v >= 0 ? y1 - 5 : y1 + 12), o.fmtV ? o.fmtV(v) : fmt(v),
                { 'text-anchor': 'middle', class: 'val' });
            }
          });
        }
      });

      lineSeries.forEach(function (s) {
        var d = '', pts = [];
        s.data.forEach(function (v, i) {
          if (v === null || v === undefined) return;
          var cx = padL + step * i + step / 2, cy = y(v);
          d += (d ? ' L' : 'M') + cx + ' ' + cy;
          pts.push([cx, cy, i]);
        });
        el('path', { d: d, fill: 'none', stroke: s.color, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, svg);
        pts.forEach(function (p) {
          el('circle', { cx: p[0], cy: p[1], r: 3.6, fill: css('--bg-2'), stroke: s.color, 'stroke-width': 2.2 }, svg);
        });
      });

      // full-column hit areas for tooltips
      o.cats.forEach(function (c, i) {
        var h = el('rect', { class: 'hit', x: padL + step * i, y: padT, width: step, height: ih }, svg);
        bindTip(h, tipHTML(o, c, i));
      });

      return H;
    });
  }

  function tipHTML(o, cat, i) {
    var rows = o.series.map(function (s) {
      var v = s.data[i];
      if (v === null || v === undefined) return '';
      return '<div class="r"><span style="color:' + s.color + '">' + s.name + '</span><span>' +
        (o.fmtV ? o.fmtV(v) : fmt(v)) + '</span></div>';
    }).join('');
    var extra = o.tipExtra ? o.tipExtra(i) : '';
    return '<b>' + (o.tipTitle ? o.tipTitle(cat, i) : cat) + '</b>' + rows + extra;
  }

  // ----------------------------------------------------- HORIZONTAL BARS
  /* opts: { rows:[{label, value, color, note}], minW, fmtV, max } */
  function clip(s, maxPx, px) {
    var per = (px || 11) * 0.54;
    var maxCh = Math.max(4, Math.floor(maxPx / per));
    s = String(s);
    return s.length > maxCh ? s.slice(0, maxCh - 1) + '…' : s;
  }

  function hbars(container, o) {
    return mount(container, o.minW || 300, function (svg, W) {
      var rowH = o.rowH || 30, padT = 4, padB = 6;
      var labW = o.labW || Math.min(150, Math.max(90, W * 0.34));
      var valW = o.valW || 74;
      var iw = Math.max(40, W - labW - valW - 8);
      var H = padT + padB + o.rows.length * rowH;
      var vals = o.rows.map(function (r) { return r.value || 0; });
      var hasNeg = vals.some(function (v) { return v < 0; });
      var diverging = o.diverging || hasNeg;
      var max = o.max || Math.max.apply(null, vals.map(Math.abs));
      if (!max) max = 1;
      // skala simetri: −max .. +max, dengan ruang untuk label nilai di kedua-dua hujung
      var zeroX = labW + iw / 2;
      var half = Math.max(20, iw / 2 - (o.valW ? o.valW * 0.62 : 44));

      if (diverging) {
        el('line', { class: 'zero-l', x1: zeroX, x2: zeroX, y1: padT, y2: H - padB }, svg);
      }

      o.rows.forEach(function (r, i) {
        var cy = padT + i * rowH + rowH / 2;
        txt(svg, 0, cy + 4, clip(r.label, labW - 8), { class: 'axl' });
        var v = r.value || 0;
        var w, x0;
        if (diverging) {
          w = Math.max(2, Math.abs(v) / max * half);
          x0 = v >= 0 ? zeroX : zeroX - w;
        } else {
          w = Math.max(2, Math.abs(v) / max * iw);
          x0 = labW;
        }
        var rect = el('rect', {
          class: 'bar', x: x0, y: cy - 9, width: w, height: 18, rx: 3,
          fill: r.color || css('--c2'), 'fill-opacity': r.dim ? .38 : 1
        }, svg);
        var vt = o.fmtV ? o.fmtV(v) : fmt(v);
        bindTip(rect, '<b>' + r.label + '</b><div class="r"><span>' + (o.unit || 'Nilai') + '</span><span>' +
          vt + '</span></div>' + (r.note ? '<div style="margin-top:4px;opacity:.8">' + r.note + '</div>' : ''));
        if (diverging && v < 0) {
          txt(svg, x0 - 6, cy + 4, vt, { class: 'val', 'text-anchor': 'end' });
        } else {
          txt(svg, x0 + w + 6, cy + 4, vt, { class: 'val' });
        }
        if (r.tag) txt(svg, W - 2, cy + 4, r.tag, { class: 'val', 'text-anchor': 'end', fill: css('--ink-3') });
      });
      return H;
    });
  }

  // ---------------------------------------------------------- WATERFALL
  /* opts: { steps:[{label,value,type:'mula'|'ubah'|'akhir'}], fmtV } */
  function waterfall(container, o) {
    var minW = o.minW || Math.max(320, o.steps.length * 84);
    return mount(container, minW, function (svg, W) {
      var H = o.height || 280;
      var padL = 48, padR = 10, padT = 26, padB = 52;
      var iw = W - padL - padR, ih = H - padT - padB;

      var run = 0, calc = [];
      o.steps.forEach(function (s) {
        if (s.type === 'mula') { calc.push({ s: s, from: 0, to: s.value }); run = s.value; }
        else if (s.type === 'akhir') { calc.push({ s: s, from: 0, to: s.value }); }
        else { calc.push({ s: s, from: run, to: run + s.value }); run += s.value; }
      });
      var vals = [0];
      calc.forEach(function (c) { vals.push(c.from, c.to); });
      var ticks = niceTicks(Math.min.apply(null, vals), Math.max.apply(null, vals), 4);
      var lo = ticks[0], hi = ticks[ticks.length - 1];
      var y = function (v) { return padT + ih - (v - lo) / (hi - lo) * ih; };

      ticks.forEach(function (t) {
        el('line', { class: t === 0 ? 'zero-l' : 'grid-l', x1: padL, x2: W - padR, y1: y(t), y2: y(t) }, svg);
        txt(svg, padL - 7, y(t) + 3.5, o.fmtAxis ? o.fmtAxis(t) : fmt(t), { 'text-anchor': 'end' });
      });

      var step = iw / calc.length, bw = Math.min(step * 0.62, 56);
      calc.forEach(function (c, i) {
        var cx = padL + step * i + step / 2;
        var y0 = y(c.from), y1 = y(c.to);
        var isTotal = c.s.type === 'mula' || c.s.type === 'akhir';
        var color = isTotal ? (c.to >= 0 ? css('--c2') : css('--c1')) : (c.s.value >= 0 ? css('--c4') : css('--c1'));
        var r = el('rect', {
          class: 'bar', x: cx - bw / 2, y: Math.min(y0, y1), width: bw,
          height: Math.max(2, Math.abs(y1 - y0)), rx: 2, fill: color,
          'fill-opacity': isTotal ? 1 : .85
        }, svg);
        bindTip(r, '<b>' + c.s.label + '</b><div class="r"><span>' + (isTotal ? 'Nilai' : 'Perubahan') +
          '</span><span>' + (o.fmtV ? o.fmtV(isTotal ? c.to : c.s.value) : fmt(isTotal ? c.to : c.s.value)) + '</span></div>');
        if (i < calc.length - 1 && !isTotal) {
          el('line', { x1: cx + bw / 2, x2: cx + step - bw / 2, y1: y1, y2: y1, stroke: css('--line-2'), 'stroke-width': 1, 'stroke-dasharray': '3 3' }, svg);
        }
        var lv = isTotal ? c.to : c.s.value;
        txt(svg, cx, Math.min(y0, y1) - 6, (lv > 0 && !isTotal ? '+' : '') + (o.fmtV ? o.fmtV(lv) : fmt(lv)),
          { 'text-anchor': 'middle', class: 'val' });
        wrapText(svg, cx, H - padB + 15, c.s.label, step - 4, 3);
      });
      return H;
    });
  }

  function wrapText(svg, x, y, s, maxW, maxLines) {
    var words = String(s).split(' ');
    var lines = [], cur = '';
    var approx = 5.4; // px per char at 10.5px
    words.forEach(function (w) {
      var t = cur ? cur + ' ' + w : w;
      if (t.length * approx > maxW && cur) { lines.push(cur); cur = w; } else cur = t;
    });
    if (cur) lines.push(cur);
    if (lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] += '…'; }
    lines.forEach(function (l, i) {
      txt(svg, x, y + i * 11.5, l, { 'text-anchor': 'middle', class: 'axl' });
    });
  }

  // -------------------------------------------------------------- LINES
  /* opts: { x:[], series:[{name,color,data,dash}], fmtV, area } */
  function lines(container, o) {
    var minW = o.minW || Math.max(300, o.x.length * 42);
    return mount(container, minW, function (svg, W) {
      var H = o.height || 250;
      var padL = o.padL || 46, padR = 14, padT = 14, padB = 34;
      var iw = W - padL - padR, ih = H - padT - padB;
      var vals = [];
      o.series.forEach(function (s) { s.data.forEach(function (v) { if (v !== null && v !== undefined) vals.push(v); }); });
      if (o.zero) vals.push(0);
      var ticks = niceTicks(Math.min.apply(null, vals), Math.max.apply(null, vals), o.ticks || 4);
      var lo = ticks[0], hi = ticks[ticks.length - 1];
      var y = function (v) { return padT + ih - (v - lo) / (hi - lo) * ih; };
      var x = function (i) { return padL + (o.x.length === 1 ? iw / 2 : iw * i / (o.x.length - 1)); };

      ticks.forEach(function (t) {
        el('line', { class: t === 0 ? 'zero-l' : 'grid-l', x1: padL, x2: W - padR, y1: y(t), y2: y(t) }, svg);
        txt(svg, padL - 7, y(t) + 3.5, o.fmtAxis ? o.fmtAxis(t) : fmt(t), { 'text-anchor': 'end' });
      });
      o.x.forEach(function (c, i) {
        if (o.x.length > 12 && i % 2) return;
        txt(svg, x(i), H - padB + 16, c, { 'text-anchor': 'middle', class: 'axl' });
      });
      if (o.bands) o.bands.forEach(function (b) {
        el('rect', { x: x(b.from), y: padT, width: x(b.to) - x(b.from), height: ih, fill: b.color, 'fill-opacity': .12 }, svg);
        if (b.label) txt(svg, (x(b.from) + x(b.to)) / 2, padT + 12, b.label, { 'text-anchor': 'middle', fill: b.color, 'font-size': 10, 'font-weight': 700 });
      });

      o.series.forEach(function (s) {
        var d = '', da = '';
        s.data.forEach(function (v, i) {
          if (v === null || v === undefined) return;
          d += (d ? ' L' : 'M') + x(i) + ' ' + y(v);
        });
        if (o.area) {
          var first = s.data.findIndex(function (v) { return v !== null && v !== undefined; });
          var last = s.data.length - 1 - s.data.slice().reverse().findIndex(function (v) { return v !== null && v !== undefined; });
          da = d + ' L' + x(last) + ' ' + y(Math.max(lo, 0)) + ' L' + x(first) + ' ' + y(Math.max(lo, 0)) + ' Z';
          el('path', { d: da, fill: s.color, 'fill-opacity': .13 }, svg);
        }
        el('path', {
          d: d, fill: 'none', stroke: s.color, 'stroke-width': 2.6,
          'stroke-dasharray': s.dash || null, 'stroke-linejoin': 'round', 'stroke-linecap': 'round'
        }, svg);
        s.data.forEach(function (v, i) {
          if (v === null || v === undefined) return;
          el('circle', { cx: x(i), cy: y(v), r: 3.4, fill: css('--bg-2'), stroke: s.color, 'stroke-width': 2.2 }, svg);
        });
      });

      o.x.forEach(function (c, i) {
        var half = iw / Math.max(1, o.x.length - 1) / 2;
        var h = el('rect', { class: 'hit', x: x(i) - half, y: padT, width: half * 2, height: ih }, svg);
        bindTip(h, tipHTML({ series: o.series, fmtV: o.fmtV, tipTitle: o.tipTitle, tipExtra: o.tipExtra }, c, i));
      });
      return H;
    });
  }

  // ----------------------------------------------------------- DUMBBELL
  /* opts: { rows:[{label, points:[{v,color,name}]}], fmtV, minW } */
  function dumbbell(container, o) {
    return mount(container, o.minW || 320, function (svg, W) {
      var rowH = o.rowH || 36, padT = 8, padB = 24;
      var labW = o.labW || Math.min(140, Math.max(84, W * 0.3));
      var padR = 46;
      var iw = W - labW - padR;
      var H = padT + padB + o.rows.length * rowH;
      var all = [];
      o.rows.forEach(function (r) { r.points.forEach(function (p) { all.push(p.v); }); });
      if (o.zero) all.push(0);
      var lo = Math.min.apply(null, all), hi = Math.max.apply(null, all);
      var pad = (hi - lo) * 0.08 || 1;
      lo -= pad; hi += pad;
      if (o.zero) lo = Math.min(lo, 0);
      var x = function (v) { return labW + (v - lo) / (hi - lo) * iw; };

      o.rows.forEach(function (r, i) {
        var cy = padT + i * rowH + rowH / 2;
        el('line', { x1: labW, x2: labW + iw, y1: cy, y2: cy, stroke: css('--line'), 'stroke-width': 1 }, svg);
        txt(svg, 0, cy + 4, r.label, { class: 'axl' });
        var xs = r.points.map(function (p) { return x(p.v); });
        el('line', { x1: Math.min.apply(null, xs), x2: Math.max.apply(null, xs), y1: cy, y2: cy, stroke: css('--line-2'), 'stroke-width': 3, 'stroke-linecap': 'round' }, svg);
        r.points.forEach(function (p) {
          var c = el('circle', { cx: x(p.v), cy: cy, r: 6, fill: p.color, stroke: css('--bg-2'), 'stroke-width': 1.6 }, svg);
          bindTip(c, '<b>' + r.label + '</b><div class="r"><span>' + p.name + '</span><span>' + (o.fmtV ? o.fmtV(p.v) : fmt(p.v)) + '</span></div>' + (r.note ? '<div style="margin-top:4px;opacity:.85">' + r.note + '</div>' : ''));
        });
        if (r.right) txt(svg, W - 2, cy + 4, r.right, { 'text-anchor': 'end', class: 'val', fill: r.rightColor || css('--ink') });
      });
      var t = niceTicks(lo, hi, 4);
      t.forEach(function (v) {
        if (v < lo || v > hi) return;
        txt(svg, x(v), H - 6, o.fmtAxis ? o.fmtAxis(v) : fmt(v), { 'text-anchor': 'middle' });
      });
      return H;
    });
  }

  // -------------------------------------------------------------- GANTT
  /* opts: { rows:[{name, bars:[{from,to,label,color,flag}]}], from, to, ticks:[] } */
  function gantt(container, o) {
    return mount(container, o.minW || 560, function (svg, W) {
      var rowH = 30, padT = 22, padB = 6;
      var labW = o.labW || 116;
      var iw = W - labW - 10;
      var H = padT + padB + o.rows.length * rowH;
      var x = function (t) { return labW + (t - o.from) / (o.to - o.from) * iw; };

      (o.ticks || []).forEach(function (t) {
        el('line', { class: 'grid-l', x1: x(t), x2: x(t), y1: padT - 8, y2: H - padB }, svg);
        txt(svg, x(t), padT - 12, o.tickLabel ? o.tickLabel(t) : t, { 'text-anchor': 'middle' });
      });
      (o.marks || []).forEach(function (m) {
        el('line', { x1: x(m.t), x2: x(m.t), y1: padT - 8, y2: H - padB, stroke: m.color || css('--c1'), 'stroke-width': 1.6, 'stroke-dasharray': '4 3' }, svg);
      });

      o.rows.forEach(function (r, i) {
        var cy = padT + i * rowH + rowH / 2;
        txt(svg, 0, cy + 4, clip(r.name, labW - 8), { class: 'axl' });
        r.bars.forEach(function (b) {
          var x0 = x(Math.max(b.from, o.from)), x1 = x(Math.min(b.to, o.to));
          var rect = el('rect', {
            x: x0, y: cy - 9, width: Math.max(3, x1 - x0), height: 18, rx: 4,
            fill: b.color, 'fill-opacity': b.dim ? .45 : .92
          }, svg);
          bindTip(rect, '<b>' + b.label + '</b><div class="r"><span>' + r.name + '</span><span>' + b.range + '</span></div>' + (b.note ? '<div style="margin-top:4px;opacity:.85">' + b.note + '</div>' : ''));
          if (x1 - x0 > 54) {
            var t2 = txt(svg, x0 + 6, cy + 4, b.short || b.label, { fill: '#fff', 'font-size': 10.5, 'font-weight': 700 });
            t2.style.pointerEvents = 'none';
          }
          if (b.flag) {
            el('circle', { cx: x1, cy: cy - 9, r: 4, fill: css('--c1'), stroke: css('--bg-2'), 'stroke-width': 1.5 }, svg);
          }
        });
      });
      return H;
    });
  }

  window.Ch = {
    bars: bars, hbars: hbars, waterfall: waterfall, lines: lines,
    dumbbell: dumbbell, gantt: gantt, fmt: fmt, css: css,
    reset: resetRegistry, hideTip: hideTip
  };
})();
