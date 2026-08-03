/* ==========================================================================
   lib.js — Pembantu format, komponen UI dan enjin carta SVG.
   Tiada pustaka luar. Semua carta SVG tulisan tangan, mobile-first.
   ========================================================================== */
var L = (window.L = {});

/* ------------------------------- format ---------------------------------- */
var NBSP = ' ';
L.esc = function (s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
};
L.num = function (v, d) {
  if (v == null || isNaN(v)) return '—';
  d = d == null ? 0 : d;
  var s = Math.abs(v).toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (v < 0 ? '−' : '') + s;
};
/* RM juta -> teks ringkas mesra orang awam */
L.rmj = function (v, d) {
  if (v == null || isNaN(v)) return '—';
  var a = Math.abs(v), sg = v < 0 ? '−' : '';
  if (a === 0) return 'RM0';
  if (a >= 1000) return sg + 'RM' + L.num(a / 1000, d == null ? (a / 1000 >= 100 ? 1 : 2) : d) + ' bilion';
  return sg + 'RM' + L.num(a, d == null ? (a < 10 ? 2 : 0) : d) + ' juta';
};
L.rmjShort = function (v, d) {
  if (v == null || isNaN(v)) return '—';
  var a = Math.abs(v), sg = v < 0 ? '−' : '';
  if (a >= 1000) return sg + L.num(a / 1000, d == null ? 1 : d) + 'b';
  return sg + L.num(a, 0) + 'j';
};
L.rm = function (v, d) { return (v < 0 ? '−' : '') + 'RM' + L.num(Math.abs(v), d == null ? 0 : d); };
L.pct = function (v, d) { return v == null || isNaN(v) ? '—' : L.num(v, d == null ? 1 : d) + '%'; };
L.signPct = function (v, d) {
  if (v == null || isNaN(v)) return '—';
  return (v > 0 ? '+' : v < 0 ? '−' : '') + L.num(Math.abs(v), d == null ? 1 : d) + '%';
};
var BULAN = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis'];
L.tarikh = function (d) {
  if (!d) return '';
  var p = String(d).split('-');
  if (p.length === 1) return p[0];
  if (p.length === 2) return BULAN[+p[1] - 1] + ' ' + p[0];
  return (+p[2]) + ' ' + BULAN[+p[1] - 1] + ' ' + p[0];
};
L.tahunDari = function (d) { return d ? String(d).slice(0, 4) : ''; };

/* ------------------------------ provenance ------------------------------- */
var GH = 'https://github.com/SyahmiRafsan/rci-tabunghaji/blob/main/rci-tabung-haji.md#pdf-page-';
L.src = function (pages, label) {
  var arr = [].concat(pages || []).filter(function (x) { return x != null; });
  if (!arr.length) return '';
  var seen = {}, out = [];
  arr.forEach(function (p) { if (!seen[p]) { seen[p] = 1; out.push(p); } });
  return '<div class="srcs"><span class="sl">' + L.esc(label || 'Sumber') + '</span>' +
    out.map(function (p) {
      return '<a class="src" href="' + GH + p + '" target="_blank" rel="noopener" ' +
        'title="Buka halaman ' + p + ' laporan asal">ms ' + p + ' ↗</a>';
    }).join('') + '</div>';
};
L.pv = function (kind) {
  var m = {
    fakta: ['pv-fakta', 'Fakta laporan'],
    terbit: ['pv-terbit', 'Data terbitan'],
    unjur: ['pv-unjur', 'Unjuran laporan'],
    sim: ['pv-sim', 'Simulasi anda']
  }[kind];
  if (!m) return '';
  return '<span class="pv ' + m[0] + '">' + m[1] + '</span>';
};
L.pvs = function () {
  return [].slice.call(arguments).map(L.pv).join(' ');
};

/* ------------------------------- glosari --------------------------------- */
L.g = function (istilah, teks) {
  var key = (istilah || '').toLowerCase();
  var def = window.RD.glosari[istilah] || window.RD.glosari[key];
  if (!def) {
    var found = Object.keys(window.RD.glosari).filter(function (k) { return k.toLowerCase() === key; })[0];
    if (found) def = window.RD.glosari[found];
  }
  if (!def) return L.esc(teks || istilah);
  return '<span class="term" data-tip="' + L.esc(def) + '" data-tipk="' + L.esc(istilah) + '" tabindex="0" role="button">' +
    L.esc(teks || istilah) + '</span>';
};

/* -------------------------------- UI bits -------------------------------- */
L.card = function (o) {
  var h = '<section class="card' + (o.flush ? ' flush' : '') + '"' + (o.id ? ' id="' + o.id + '"' : '') + '>';
  if (o.t || o.badge) {
    h += '<div class="chead"><h3>' + (o.t || '') + '</h3>' + (o.badge || '') + '</div>';
  }
  if (o.sub) h += '<p class="csub">' + o.sub + '</p>';
  h += o.body || '';
  if (o.note) h += '<div class="cnote">' + o.note + '</div>';
  if (o.limit) h += '<div class="cnote limit"><b>Apa yang tidak boleh disimpulkan:</b> ' + o.limit + '</div>';
  if (o.p) h += L.src(o.p, o.pLabel);
  return h + '</section>';
};
L.tile = function (o) {
  return '<div class="tile' + (o.cls ? ' ' + o.cls : '') + '"' +
    (o.tip ? ' data-tip="' + L.esc(o.tip) + '" data-tipk="' + L.esc(o.l) + '" tabindex="0"' : '') + '>' +
    '<span class="tl">' + o.l + '</span>' +
    '<div class="tv">' + o.v + (o.u ? '<span class="tu">' + o.u + '</span>' : '') + '</div>' +
    (o.d ? '<div class="td">' + o.d + '</div>' : '') + '</div>';
};
L.tiles = function (arr, cls) {
  return '<div class="tiles' + (cls ? ' ' + cls : '') + '">' + arr.map(L.tile).join('') + '</div>';
};
L.verdict = function (kind, title, body) {
  return '<div class="verdict ' + kind + '"><span class="vt">' + L.esc(title) + '</span><p>' + body + '</p></div>';
};
L.readBlocks = function (can, cannot) {
  return '<div class="rb two"><div class="can"><strong>Apa yang boleh disimpulkan</strong>' + can + '</div>' +
    '<div class="cannot"><strong>Apa yang TIDAK boleh disimpulkan</strong>' + cannot + '</div></div>';
};
L.seg = function (name, opts, active) {
  return '<div class="seg" role="group" data-seg="' + name + '">' + opts.map(function (o) {
    var v = o.v == null ? o : o.v, lab = o.l == null ? o : o.l;
    return '<button type="button" data-v="' + L.esc(v) + '" aria-pressed="' + (String(v) === String(active)) + '">' +
      L.esc(lab) + '</button>';
  }).join('') + '</div>';
};
L.chips = function (name, opts, activeSet) {
  return '<div class="chips" data-chips="' + name + '">' + opts.map(function (o) {
    var v = o.v == null ? o : o.v, lab = o.l == null ? o : o.l;
    return '<button type="button" class="chip" data-v="' + L.esc(v) + '" aria-pressed="' +
      (activeSet.indexOf(String(v)) >= 0) + '">' + L.esc(lab) + '</button>';
  }).join('') + '</div>';
};
L.range = function (o) {
  return '<div class="rangewrap"><div class="rl"><span>' + o.l + '</span><b id="' + o.id + 'Val">' + o.valText + '</b></div>' +
    '<input type="range" id="' + o.id + '" min="' + o.min + '" max="' + o.max + '" step="' + (o.step || 1) +
    '" value="' + o.value + '" aria-label="' + L.esc(o.l) + '"></div>';
};
L.table = function (o) {
  var h = '<table class="' + (o.cls || 'zebra') + '"><thead><tr>' +
    o.cols.map(function (c) {
      return '<th' + (c.n ? ' class="n"' : '') + (c.k ? ' data-k="' + c.k + '"' : '') + '>' + c.l +
        (c.k ? ' <span class="ar">▾</span>' : '') + '</th>';
    }).join('') + '</tr></thead><tbody>' +
    o.rows.map(function (r) {
      return '<tr' + (r._cls ? ' class="' + r._cls + '"' : '') + '>' + r.c.map(function (cell) {
        if (cell && typeof cell === 'object') {
          return '<td class="' + (cell.n ? 'n ' : '') + (cell.cls || '') + '">' + cell.v + '</td>';
        }
        return '<td>' + cell + '</td>';
      }).join('') + '</tr>';
    }).join('') + '</tbody></table>';
  return L.wrap(h);
};

/* ============================ ENJIN CARTA SVG ============================= */
var CV = { accent: 'var(--accent)', bad: 'var(--bad)', good: 'var(--good)', warn: 'var(--warn)',
  sim: 'var(--sim)', neutral: 'var(--neutral)', ink: 'var(--ink-2)', ink3: 'var(--ink-3)',
  line: 'var(--line)', card: 'var(--card)' };
L.CV = CV;

function niceTicks(min, max, n) {
  n = n || 5;
  if (min === max) { max = min + 1; }
  var span = max - min, step = Math.pow(10, Math.floor(Math.log(span / n) / Math.LN10));
  var err = (span / n) / step;
  if (err >= 7.5) step *= 10; else if (err >= 3.5) step *= 5; else if (err >= 1.5) step *= 2;
  var lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step, out = [];
  for (var v = lo; v <= hi + step * 0.5; v += step) out.push(Math.abs(v) < step * 1e-9 ? 0 : v);
  return out;
}
function tipAttr(txt, key) {
  return ' class="hit" data-tip="' + L.esc(txt) + '"' + (key ? ' data-tipk="' + L.esc(key) + '"' : '') + ' tabindex="0"';
}
L.tipAttr = tipAttr;

/* Bungkus SVG dalam pengeleret mendatar. SVG dirender pada saiz logikalnya
   (teks kekal saiz asal); jika lebih lebar daripada bekas, pengguna leret. */
L.wrap = function (svg) { return '<div class="scrollx">' + svg + '</div>'; };
function svgOpen(W, H, alt) {
  return '<svg class="chart" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H +
    '" role="img" aria-label="' + L.esc(alt || '') + '">';
}

/* ---- carta bar menegak (kumpulan, boleh negatif) ---- */
L.svgBars = function (o) {
  var W = o.w || 700, H = o.h || 260, pad = o.pad || { t: 16, r: 10, b: 34, l: 46 };
  var cats = o.cats, series = o.series, fmt = o.fmt || function (v) { return L.num(v, 0); };
  var vals = [];
  series.forEach(function (s) { s.data.forEach(function (v) { if (v != null) vals.push(v); }); });
  var mn = Math.min(0, Math.min.apply(null, vals)), mx = Math.max(0, Math.max.apply(null, vals));
  if (o.min != null) mn = o.min; if (o.max != null) mx = o.max;
  var ticks = niceTicks(mn, mx, o.ticks || 4);
  mn = ticks[0]; mx = ticks[ticks.length - 1];
  var iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  var y = function (v) { return pad.t + ih - (v - mn) / (mx - mn) * ih; };
  var bw = iw / cats.length, inner = bw * (o.band == null ? 0.66 : o.band), sw = inner / series.length;
  var s = svgOpen(W, H, o.alt);
  s += '<g class="ax">';
  ticks.forEach(function (t) {
    s += '<line class="' + (t === 0 ? 'zero' : 'gl') + '" x1="' + pad.l + '" y1="' + y(t).toFixed(1) +
      '" x2="' + (W - pad.r) + '" y2="' + y(t).toFixed(1) + '"/>';
    s += '<text x="' + (pad.l - 6) + '" y="' + (y(t) + 3.5).toFixed(1) + '" text-anchor="end">' +
      L.esc(o.yfmt ? o.yfmt(t) : L.num(t, 0)) + '</text>';
  });
  s += '</g>';
  cats.forEach(function (c, i) {
    var cx = pad.l + i * bw + (bw - inner) / 2;
    series.forEach(function (sr, j) {
      var v = sr.data[i]; if (v == null) return;
      var y0 = y(0), y1 = y(v), top = Math.min(y0, y1), hh = Math.max(1.5, Math.abs(y1 - y0));
      var x = cx + j * sw;
      s += '<rect x="' + x.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + Math.max(1, sw - 1.5).toFixed(1) +
        '" height="' + hh.toFixed(1) + '" rx="2" style="fill:' + (sr.color || CV.accent) + (sr.op ? ';opacity:' + sr.op : '') + '"/>';
      s += '<rect x="' + x.toFixed(1) + '" y="' + pad.t + '" width="' + Math.max(1, sw - 1.5).toFixed(1) +
        '" height="' + ih + '"' + tipAttr((o.tip ? o.tip(i, j) : c + ' · ' + sr.name + ': ' + fmt(v)), c) + '/>';
      if (o.labels) {
        s += '<text class="vlab" x="' + (x + sw / 2).toFixed(1) + '" y="' + (v >= 0 ? top - 4 : top + hh + 10).toFixed(1) +
          '" text-anchor="middle">' + L.esc(fmt(v)) + '</text>';
      }
    });
    s += '<text class="clab" x="' + (pad.l + i * bw + bw / 2).toFixed(1) + '" y="' + (H - pad.b + 15) +
      '" text-anchor="middle">' + L.esc(c) + '</text>';
  });
  if (o.ann) o.ann.forEach(function (a) {
    var x = pad.l + a.i * bw + bw / 2;
    s += '<line class="annline" x1="' + x.toFixed(1) + '" y1="' + pad.t + '" x2="' + x.toFixed(1) + '" y2="' + (pad.t + ih) + '"/>';
    s += '<text class="ann" x="' + (x + 4).toFixed(1) + '" y="' + (pad.t + 10) + '">' + L.esc(a.t) + '</text>';
  });
  return L.wrap(s + '</svg>');
};

/* ---- carta bar melintang (label kategori di kiri) ---- */
L.svgHBars = function (o) {
  var rows = o.rows, lw = o.labelW || 118, rowH = o.rowH || 26, pad = { t: 6, r: o.valW == null ? 58 : o.valW, b: 22 };
  var W = o.w || 700, H = pad.t + rows.length * rowH + pad.b;
  var vals = rows.map(function (r) { return r.v; });
  var mx = o.max != null ? o.max : Math.max.apply(null, vals.map(Math.abs));
  var mn = Math.min(0, Math.min.apply(null, vals));
  var iw = W - lw - pad.r;
  var zero = mn < 0 ? lw + iw * (Math.abs(mn) / (mx - mn)) : lw;
  var scale = mn < 0 ? iw / (mx - mn) : iw / (mx || 1);
  var s = svgOpen(W, H, o.alt);
  if (mn < 0) s += '<line class="zero" x1="' + zero.toFixed(1) + '" y1="' + pad.t + '" x2="' + zero.toFixed(1) +
    '" y2="' + (pad.t + rows.length * rowH) + '" style="stroke:var(--ink-3)"/>';
  rows.forEach(function (r, i) {
    var cy = pad.t + i * rowH, h = Math.min(16, rowH - 9);
    var w = Math.abs(r.v) * scale, x = r.v < 0 ? zero - w : zero;
    s += '<rect x="' + x.toFixed(1) + '" y="' + (cy + (rowH - h) / 2).toFixed(1) + '" width="' + Math.max(1.5, w).toFixed(1) +
      '" height="' + h + '" rx="2.5" style="fill:' + (r.color || CV.accent) + (r.op ? ';opacity:' + r.op : '') + '"/>';
    s += '<text x="' + (lw - 7) + '" y="' + (cy + rowH / 2 + 3.5).toFixed(1) + '" text-anchor="end" style="fill:var(--ink-2);font-weight:600">' +
      L.esc(r.k.length > (o.trunc || 22) ? r.k.slice(0, (o.trunc || 22) - 1) + '…' : r.k) + '</text>';
    s += '<text class="vlab" x="' + ((r.v < 0 ? x - 5 : x + w + 5)).toFixed(1) + '" y="' + (cy + rowH / 2 + 3.5).toFixed(1) +
      '" text-anchor="' + (r.v < 0 ? 'end' : 'start') + '">' + L.esc(r.lab != null ? r.lab : L.num(r.v, 0)) + '</text>';
    s += '<rect x="0" y="' + cy + '" width="' + W + '" height="' + rowH + '"' +
      tipAttr(r.tip || (r.k + ': ' + (r.lab != null ? r.lab : L.num(r.v, 0))), r.k) + '/>';
  });
  if (o.axisLabel) s += '<text x="' + lw + '" y="' + (H - 6) + '" style="fill:var(--ink-3)">' + L.esc(o.axisLabel) + '</text>';
  return L.wrap(s + '</svg>');
};

/* ---- bar + garisan (dua paksi) ---- */
L.svgComboBarLine = function (o) {
  var W = o.w || 700, H = o.h || 280, pad = o.pad || { t: 18, r: 44, b: 36, l: 46 };
  var cats = o.cats;
  var bars = o.bars || [], lines = o.lines || [];
  var bv = []; bars.forEach(function (s) { s.data.forEach(function (v) { if (v != null) bv.push(v); }); });
  var lv = []; lines.forEach(function (s) { s.data.forEach(function (v) { if (v != null) lv.push(v); }); });
  var t1 = niceTicks(Math.min(0, Math.min.apply(null, bv)), Math.max.apply(null, bv), o.ticks || 4);
  var t2 = niceTicks(0, o.max2 != null ? o.max2 : Math.max.apply(null, lv), o.ticks2 || 4);
  var a1 = t1[0], b1 = t1[t1.length - 1], a2 = t2[0], b2 = t2[t2.length - 1];
  var iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  var y1 = function (v) { return pad.t + ih - (v - a1) / (b1 - a1) * ih; };
  var y2 = function (v) { return pad.t + ih - (v - a2) / (b2 - a2) * ih; };
  var bw = iw / cats.length;
  var s = svgOpen(W, H, o.alt);
  s += '<g class="ax">';
  t1.forEach(function (t) {
    s += '<line class="' + (t === 0 ? 'zero' : 'gl') + '" x1="' + pad.l + '" y1="' + y1(t).toFixed(1) + '" x2="' + (W - pad.r) + '" y2="' + y1(t).toFixed(1) + '"/>';
    s += '<text x="' + (pad.l - 6) + '" y="' + (y1(t) + 3.5).toFixed(1) + '" text-anchor="end">' + L.esc(o.yfmt ? o.yfmt(t) : L.num(t, 0)) + '</text>';
  });
  t2.forEach(function (t) {
    s += '<text x="' + (W - pad.r + 6) + '" y="' + (y2(t) + 3.5).toFixed(1) + '" text-anchor="start" style="fill:' +
      (lines[0] && lines[0].color || CV.bad) + '">' + L.esc(o.y2fmt ? o.y2fmt(t) : L.num(t, 0)) + '</text>';
  });
  s += '</g>';
  var nb = bars.length, inner = bw * 0.64, sw = inner / Math.max(1, nb);
  cats.forEach(function (c, i) {
    var cx = pad.l + i * bw + (bw - inner) / 2;
    bars.forEach(function (sr, j) {
      var v = sr.data[i]; if (v == null) return;
      var p0 = y1(0), p1 = y1(v), top = Math.min(p0, p1), hh = Math.max(1.5, Math.abs(p1 - p0));
      s += '<rect x="' + (cx + j * sw).toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + Math.max(1, sw - 2).toFixed(1) +
        '" height="' + hh.toFixed(1) + '" rx="2" style="fill:' + (sr.color || CV.accent) + (sr.op ? ';opacity:' + sr.op : '') + '"/>';
    });
    s += '<text class="clab" x="' + (pad.l + i * bw + bw / 2).toFixed(1) + '" y="' + (H - pad.b + 15) + '" text-anchor="middle">' + L.esc(c) + '</text>';
  });
  lines.forEach(function (ln) {
    var pts = [];
    ln.data.forEach(function (v, i) { if (v != null) pts.push([pad.l + i * bw + bw / 2, y2(v)]); });
    if (pts.length > 1) {
      s += '<polyline fill="none" style="stroke:' + (ln.color || CV.bad) + ';stroke-width:2.4;stroke-linejoin:round;stroke-linecap:round' +
        (ln.dash ? ';stroke-dasharray:5 4' : '') + '" points="' +
        pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '"/>';
    }
    pts.forEach(function (p) {
      s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.4" style="fill:var(--card);stroke:' +
        (ln.color || CV.bad) + ';stroke-width:2"/>';
    });
  });
  cats.forEach(function (c, i) {
    s += '<rect x="' + (pad.l + i * bw).toFixed(1) + '" y="' + pad.t + '" width="' + bw.toFixed(1) + '" height="' + ih + '"' +
      tipAttr(o.tip ? o.tip(i) : c, c) + '/>';
  });
  if (o.ann) o.ann.forEach(function (a) {
    var x = pad.l + a.i * bw + bw / 2;
    s += '<line class="annline" x1="' + x.toFixed(1) + '" y1="' + pad.t + '" x2="' + x.toFixed(1) + '" y2="' + (pad.t + ih) + '"/>';
    s += '<text class="ann" x="' + (x + (a.right ? -4 : 4)).toFixed(1) + '" y="' + (pad.t + (a.dy || 10)) + '" text-anchor="' +
      (a.right ? 'end' : 'start') + '">' + L.esc(a.t) + '</text>';
  });
  return L.wrap(s + '</svg>');
};

/* ---- waterfall / jambatan ---- */
L.svgWaterfall = function (o) {
  var rows = o.rows, W = o.w || 700, H = o.h || 290, pad = { t: 22, r: 8, b: 52, l: 52 };
  var run = 0, calc = [];
  rows.forEach(function (r) {
    if (r.total) { calc.push({ r: r, from: 0, to: r.v }); run = r.v; }
    else { calc.push({ r: r, from: run, to: run + r.v }); run += r.v; }
  });
  var all = [0];
  calc.forEach(function (c) { all.push(c.from, c.to); });
  var ticks = niceTicks(Math.min.apply(null, all), Math.max.apply(null, all), 4);
  var mn = ticks[0], mx = ticks[ticks.length - 1];
  var iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  var y = function (v) { return pad.t + ih - (v - mn) / (mx - mn) * ih; };
  var bw = iw / rows.length, inner = bw * 0.6;
  var s = svgOpen(W, H, o.alt);
  s += '<g class="ax">';
  ticks.forEach(function (t) {
    s += '<line class="' + (t === 0 ? 'zero' : 'gl') + '" x1="' + pad.l + '" y1="' + y(t).toFixed(1) + '" x2="' + (W - pad.r) + '" y2="' + y(t).toFixed(1) + '"/>';
    s += '<text x="' + (pad.l - 6) + '" y="' + (y(t) + 3.5).toFixed(1) + '" text-anchor="end">' + L.esc(o.yfmt ? o.yfmt(t) : L.num(t, 0)) + '</text>';
  });
  s += '</g>';
  calc.forEach(function (c, i) {
    var x = pad.l + i * bw + (bw - inner) / 2;
    var top = Math.min(y(c.from), y(c.to)), hh = Math.max(2, Math.abs(y(c.to) - y(c.from)));
    var col = c.r.color || (c.r.total ? CV.neutral : (c.r.v >= 0 ? CV.good : CV.bad));
    s += '<rect x="' + x.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + inner.toFixed(1) + '" height="' + hh.toFixed(1) +
      '" rx="2.5" style="fill:' + col + (c.r.op ? ';opacity:' + c.r.op : '') + '"/>';
    if (i < calc.length - 1 && !calc[i + 1].r.total) {
      s += '<line x1="' + (x + inner).toFixed(1) + '" y1="' + y(c.to).toFixed(1) + '" x2="' + (pad.l + (i + 1) * bw + (bw - inner) / 2).toFixed(1) +
        '" y2="' + y(c.to).toFixed(1) + '" style="stroke:var(--ink-3);stroke-width:1;stroke-dasharray:2 2"/>';
    }
    s += '<text class="vlab" x="' + (x + inner / 2).toFixed(1) + '" y="' + (c.r.v >= 0 || c.r.total ? top - 5 : top + hh + 11).toFixed(1) +
      '" text-anchor="middle" style="font-weight:700">' + L.esc(o.fmt ? o.fmt(c.r.total ? c.r.v : c.r.v) : L.num(c.r.v, 0)) + '</text>';
    var words = String(c.r.k).split(' '), lines = [], cur = '';
    words.forEach(function (w) {
      if ((cur + ' ' + w).trim().length > 13) { if (cur) lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
    });
    if (cur) lines.push(cur);
    lines.slice(0, 3).forEach(function (ln, k) {
      s += '<text class="clab" x="' + (x + inner / 2).toFixed(1) + '" y="' + (H - pad.b + 14 + k * 11) + '" text-anchor="middle" style="font-size:9.5px">' + L.esc(ln) + '</text>';
    });
    s += '<rect x="' + (pad.l + i * bw).toFixed(1) + '" y="' + pad.t + '" width="' + bw.toFixed(1) + '" height="' + ih + '"' +
      tipAttr(c.r.tip || (c.r.k + ': ' + (o.fmt ? o.fmt(c.r.v) : L.num(c.r.v, 0))), c.r.k) + '/>';
  });
  return L.wrap(s + '</svg>');
};

/* ---- dumbbell (dua nilai per kategori) ---- */
L.svgDumbbell = function (o) {
  var rows = o.rows, lw = o.labelW || 116, rowH = o.rowH || 30, W = o.w || 700;
  var valW = o.valW == null ? 62 : o.valW;
  var pad = { t: 26, r: 10, b: 22 };
  var H = pad.t + rows.length * rowH + pad.b;
  var vs = [];
  rows.forEach(function (r) { vs.push(r.a, r.b); });
  var mn = o.min != null ? o.min : Math.min(0, Math.min.apply(null, vs));
  var mx = o.max != null ? o.max : Math.max.apply(null, vs);
  var iw = W - lw - pad.r - valW;
  var x = function (v) { return lw + (v - mn) / (mx - mn) * iw; };
  var s = svgOpen(W, H, o.alt);
  /* paksi nilai di bawah */
  var tks = niceTicks(mn, mx, 4).filter(function (t) { return t >= mn && t <= mx; });
  tks.forEach(function (t) {
    s += '<line class="gl" x1="' + x(t).toFixed(1) + '" y1="' + (pad.t - 4) + '" x2="' + x(t).toFixed(1) +
      '" y2="' + (pad.t + rows.length * rowH) + '"/>';
    s += '<text x="' + x(t).toFixed(1) + '" y="' + (H - 7) + '" text-anchor="middle" style="font-size:9.5px">' +
      L.esc(o.xfmt ? o.xfmt(t) : L.num(t, 0)) + '</text>';
  });
  s += '<circle cx="' + (lw + 4) + '" cy="9" r="4" style="fill:' + (o.ca || CV.neutral) + '"/>';
  s += '<text x="' + (lw + 12) + '" y="12" style="fill:var(--ink-2);font-weight:700;font-size:10px">' + L.esc(o.la || 'A') + '</text>';
  s += '<circle cx="' + (lw + 128) + '" cy="9" r="4" style="fill:' + (o.cb || CV.bad) + '"/>';
  s += '<text x="' + (lw + 136) + '" y="12" style="fill:var(--ink-2);font-weight:700;font-size:10px">' + L.esc(o.lb || 'B') + '</text>';
  rows.forEach(function (r, i) {
    var cy = pad.t + i * rowH + rowH / 2;
    s += '<line x1="' + x(r.a).toFixed(1) + '" y1="' + cy.toFixed(1) + '" x2="' + x(r.b).toFixed(1) + '" y2="' + cy.toFixed(1) +
      '" style="stroke:var(--line);stroke-width:3.5;stroke-linecap:round"/>';
    s += '<circle cx="' + x(r.a).toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="5" style="fill:' + (o.ca || CV.neutral) + '"/>';
    s += '<circle cx="' + x(r.b).toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="5" style="fill:' + (o.cb || CV.bad) + '"/>';
    s += '<text x="' + (lw - 7) + '" y="' + (cy + 3.5).toFixed(1) + '" text-anchor="end" style="fill:var(--ink-2);font-weight:600">' +
      L.esc(r.k.length > 20 ? r.k.slice(0, 19) + '…' : r.k) + '</text>';
    if (r.note) s += '<text class="vlab" x="' + (W - pad.r) + '" y="' + (cy + 3.5).toFixed(1) + '" text-anchor="end">' + L.esc(r.note) + '</text>';
    s += '<rect x="0" y="' + (pad.t + i * rowH) + '" width="' + W + '" height="' + rowH + '"' + tipAttr(r.tip || r.k, r.k) + '/>';
  });
  return L.wrap(s + '</svg>');
};

/* ---- 100% stacked bar mendatar tunggal ---- */
L.svgStack100 = function (o) {
  var segs = o.segs, W = o.w || 700, H = o.h || 46;
  var tot = segs.reduce(function (a, x) { return a + x.v; }, 0) || 1;
  var s = svgOpen(W, H, o.alt);
  var x = 0;
  segs.forEach(function (g) {
    var w = g.v / tot * W;
    s += '<rect x="' + x.toFixed(1) + '" y="6" width="' + Math.max(0.6, w - 1).toFixed(1) + '" height="' + (H - 24) +
      '" rx="2" style="fill:' + (g.color || CV.accent) + '"' + tipAttr(g.tip || (g.k + ': ' + L.pct(g.v / tot * 100)), g.k) + '/>';
    if (w > 44) s += '<text x="' + (x + w / 2).toFixed(1) + '" y="' + (H - 4) + '" text-anchor="middle" style="fill:var(--ink-3);font-size:9.5px">' +
      L.esc(g.short || g.k) + '</text>';
    x += w;
  });
  return L.wrap(s + '</svg>');
};

/* ---- garis masa (jujukan jawatan) ---- */
L.svgGantt = function (o) {
  var siri = o.siri, lw = o.labelW || 0, rowH = 22, gap = 12, W = o.w || 760;
  var t0 = new Date(o.from).getTime(), t1 = new Date(o.to).getTime();
  var H = 26;
  siri.forEach(function (g) { H += 18 + g.orang.length * rowH + gap; });
  var iw = W - lw - 8;
  var x = function (d) { return lw + (Math.max(t0, Math.min(t1, new Date(d).getTime())) - t0) / (t1 - t0) * iw; };
  var s = svgOpen(W, H, o.alt);
  var yr0 = new Date(o.from).getFullYear(), yr1 = new Date(o.to).getFullYear();
  for (var yy = yr0; yy <= yr1; yy++) {
    var px = x(yy + '-01-01');
    s += '<line class="gl" x1="' + px.toFixed(1) + '" y1="16" x2="' + px.toFixed(1) + '" y2="' + (H - 4) + '"/>';
    if (yy % 2 === yr0 % 2) s += '<text x="' + px.toFixed(1) + '" y="11" text-anchor="middle" style="font-size:9.5px">' + yy + '</text>';
  }
  var yc = 26;
  siri.forEach(function (g) {
    s += '<text x="' + lw + '" y="' + (yc + 8) + '" style="fill:var(--ink-2);font-weight:750;font-size:10.5px">' + L.esc(g.k) + '</text>';
    yc += 18;
    g.orang.forEach(function (p) {
      var xa = x(p.dari), xb = x(p.hingga || o.to);
      var col = p.kosong ? CV.line : p.khas ? CV.warn : 'var(--' + g.warna + ')';
      s += '<rect x="' + xa.toFixed(1) + '" y="' + (yc + 4) + '" width="' + Math.max(2.5, xb - xa).toFixed(1) + '" height="' + (rowH - 9) +
        '" rx="3" style="fill:' + col + (p.kosong ? ';opacity:.5' : '') + '"/>';
      if (p.tamatAwal) s += '<path d="M' + (xb - 1).toFixed(1) + ' ' + (yc + 2) + ' l6 -6 M' + (xb - 1).toFixed(1) + ' ' + (yc + 2) +
        ' l-1 -7" style="stroke:var(--bad);stroke-width:2;fill:none"/>';
      var nm = p.n.replace(/\s*\(.*$/, '');
      s += '<text x="' + (xa + 4).toFixed(1) + '" y="' + (yc + rowH - 8) + '" style="fill:var(--card);font-size:9px;font-weight:700">' +
        L.esc(nm.length > 30 ? nm.slice(0, 29) + '…' : nm) + '</text>';
      s += '<rect x="' + xa.toFixed(1) + '" y="' + yc + '" width="' + Math.max(4, xb - xa).toFixed(1) + '" height="' + rowH + '"' +
        tipAttr(p.n + ' · ' + L.tarikh(p.dari) + ' → ' + (p.hingga ? L.tarikh(p.hingga) : 'kini') +
          (p.tamatAwal ? ' · DITAMATKAN AWAL tanpa sebab' : '') + (p.politik ? ' · ahli politik aktif' : ''), g.k) + '/>';
      yc += rowH;
    });
    yc += gap;
  });
  return L.wrap(s + '</svg>');
};

/* ---- carta area untuk unjuran ---- */
L.svgArea = function (o) {
  var W = o.w || 700, H = o.h || 250, pad = o.pad || { t: 18, r: 12, b: 34, l: 48 };
  var cats = o.cats, series = o.series;
  var vals = [];
  series.forEach(function (s) { s.data.forEach(function (v) { if (v != null) vals.push(v); }); });
  var ticks = niceTicks(0, Math.max.apply(null, vals), o.ticks || 4);
  var mn = ticks[0], mx = ticks[ticks.length - 1];
  var iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  var xs = function (i) { return pad.l + (cats.length === 1 ? iw / 2 : i / (cats.length - 1) * iw); };
  var y = function (v) { return pad.t + ih - (v - mn) / (mx - mn) * ih; };
  var s = svgOpen(W, H, o.alt);
  s += '<g class="ax">';
  ticks.forEach(function (t) {
    s += '<line class="gl" x1="' + pad.l + '" y1="' + y(t).toFixed(1) + '" x2="' + (W - pad.r) + '" y2="' + y(t).toFixed(1) + '"/>';
    s += '<text x="' + (pad.l - 6) + '" y="' + (y(t) + 3.5).toFixed(1) + '" text-anchor="end">' + L.esc(o.yfmt ? o.yfmt(t) : L.num(t, 0)) + '</text>';
  });
  s += '</g>';
  if (o.splitAt != null) {
    var sx = xs(o.splitAt);
    s += '<line class="annline" x1="' + sx.toFixed(1) + '" y1="' + pad.t + '" x2="' + sx.toFixed(1) + '" y2="' + (pad.t + ih) + '"/>';
    if (o.splitLabel) s += '<text class="ann" x="' + (sx + 4).toFixed(1) + '" y="' + (pad.t + 10) + '">' + L.esc(o.splitLabel) + '</text>';
  }
  series.forEach(function (sr) {
    var pts = sr.data.map(function (v, i) { return v == null ? null : [xs(i), y(v)]; }).filter(Boolean);
    if (sr.fill) {
      s += '<path d="M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' L') +
        ' L' + pts[pts.length - 1][0].toFixed(1) + ' ' + y(mn).toFixed(1) + ' L' + pts[0][0].toFixed(1) + ' ' + y(mn).toFixed(1) +
        ' Z" style="fill:' + sr.color + ';opacity:' + (sr.op || .16) + '"/>';
    }
    s += '<polyline fill="none" style="stroke:' + sr.color + ';stroke-width:2.4;stroke-linejoin:round' + (sr.dash ? ';stroke-dasharray:5 4' : '') +
      '" points="' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '"/>';
    pts.forEach(function (p) { s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3" style="fill:var(--card);stroke:' + sr.color + ';stroke-width:2"/>'; });
  });
  cats.forEach(function (c, i) {
    if (o.everyOther && i % 2 && cats.length > 8) { } else {
      s += '<text class="clab" x="' + xs(i).toFixed(1) + '" y="' + (H - pad.b + 15) + '" text-anchor="middle">' + L.esc(c) + '</text>';
    }
    var half = iw / Math.max(1, cats.length - 1) / 2;
    s += '<rect x="' + (xs(i) - half).toFixed(1) + '" y="' + pad.t + '" width="' + (half * 2).toFixed(1) + '" height="' + ih + '"' +
      tipAttr(o.tip ? o.tip(i) : c, c) + '/>';
  });
  return L.wrap(s + '</svg>');
};

L.legend = function (items) {
  return '<div class="legend">' + items.map(function (i) {
    return '<span><i class="' + (i.line ? 'ln' : '') + '" style="background:' + i.c + (i.op ? ';opacity:' + i.op : '') + '"></i>' + L.esc(i.l) + '</span>';
  }).join('') + '</div>';
};

/* ------------------------ pengiraan terbitan ----------------------------- */
L.derive = {
  /* Berapa hibah yang sepatutnya mampu dibayar, dan berapa lebihannya */
  mampuHibah: function () {
    return window.RD.posisi.rows.map(function (r) {
      var mampu = Math.max(0, r.pra), bayar = -r.agihan;
      return { y: r.y, mampu: mampu, bayar: bayar, lebih: bayar - mampu, pra: r.pra, pasca: r.pasca };
    });
  },
  jumlahLebih: function (from, to) {
    return L.derive.mampuHibah().filter(function (r) {
      return r.y >= (from || 2014) && r.y <= (to || 2017);
    }).reduce(function (a, r) { return a + r.lebih; }, 0);
  },
  ujsbPremium: function () {
    var j = window.RD.ujsbPindah.jumlah;
    return { atasPasaran: j.pindah - j.pasaran, atasBuku: j.pindah - j.buku, gandaan: j.pindah / j.pasaran };
  },
  hartanahSusut: function () {
    return window.RD.ujsbHartanah.rows.map(function (r) {
      return { k: r.k, pindah: r.pindah, pasaran: r.pasaran, susut: r.pasaran - r.pindah, pct: (r.pasaran / r.pindah - 1) * 100 };
    });
  },
  bluechipHarga: function () {
    return window.RD.bluechip.rows.map(function (r) {
      return {
        k: r.k, pindah: r.pindahUnit, d18: r.pasaranUnit, j22: r.jun22,
        pctPindahD18: (r.pasaranUnit / r.pindahUnit - 1) * 100,
        pctPindahJ22: (r.jun22 / r.pindahUnit - 1) * 100,
        pctD18J22: (r.jun22 / r.pasaranUnit - 1) * 100
      };
    });
  },
  putOption: function () {
    return { terdedah: 20.3 + 19.03 + 210.7, dibayar: 2, kes: 3 };
  },
  rugiPelaburan: function () {
    var rows = window.RD.pelaburan.filter(function (p) { return p.rugiRm != null; });
    return { jumlah: rows.reduce(function (a, p) { return a + p.rugiRm; }, 0), bil: rows.length };
  },
  hafisCagr: function () {
    var h = window.RD.hafis.sejarah;
    var a = h[0], b = h[h.length - 1], n = b.y - a.y;
    return { kos: (Math.pow(b.kos / a.kos, 1 / n) - 1) * 100, hafis: (Math.pow(b.hafis / a.hafis, 1 / n) - 1) * 100, n: n };
  },
  /* Simulasi HAFIS: jika bayaran haji = X, apa jadi kepada beban LTH? */
  simHafis: function (bayaran, jemaah) {
    jemaah = jemaah || 30000;
    return window.RD.hafis.unjuran.rows.map(function (r) {
      var hafis = Math.max(0, r.kos - bayaran);
      return { y: r.y, kos: r.kos, bayaran: bayaran, hafis: hafis, pct: hafis / r.kos * 100, jumlahRibu: hafis * jemaah / 1000 };
    });
  }
};

/* ------------------------------- salin CSV ------------------------------- */
L.copyBtn = function (id, label) {
  return '<button class="copybtn" data-copy="' + id + '">' + (label || 'Salin data') + '</button>';
};
L.csvStore = {};
L.regCsv = function (id, header, rows) {
  L.csvStore[id] = [header].concat(rows).map(function (r) {
    return r.map(function (c) {
      var s = String(c == null ? '' : c);
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }).join(',');
  }).join('\n');
  return id;
};
