/* ===========================================================================
   Pembantu UI — pembina komponen ringkas
   =========================================================================== */
(function () {
  'use strict';
  var R = window.RCI;

  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function n(v, d) {
    if (v === null || v === undefined || v === '' || isNaN(v)) return '—';
    // U.n kadangkala dihantar sebagai formatter jadual: (nilai, barisObjek).
    // Terima hanya nombor sebagai bilangan tempat perpuluhan.
    d = (typeof d === 'number' && isFinite(d)) ? Math.max(0, Math.min(20, Math.round(d))) : 0;
    return Number(v).toLocaleString('ms-MY', { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  // RM juta -> teks ringkas
  function rmJuta(v, d) {
    if (v === null || v === undefined || isNaN(v)) return '—';
    var num = (typeof d === 'number' && isFinite(d));
    var a = Math.abs(v);
    if (a >= 1000) return (v < 0 ? '−' : '') + 'RM' + n(a / 1000, num ? d : 2) + 'b';
    return (v < 0 ? '−' : '') + 'RM' + n(a, num ? d : 0) + 'j';
  }
  function rm(v, d) {
    if (v === null || v === undefined || isNaN(v)) return '—';
    return (v < 0 ? '−' : '') + 'RM' + n(Math.abs(v), d);
  }
  function pct(v, d) {
    if (v === null || v === undefined || isNaN(v)) return '—';
    return n(v, (typeof d === 'number' && isFinite(d)) ? d : 1) + '%';
  }

  function src(s, label) {
    if (!s) return '';
    var u = R.srcUrl(s.pdf);
    return '<a class="src" href="' + u + '" target="_blank" rel="noopener">' +
      esc(label || ('ms ' + s.ms)) + '</a>';
  }
  function srcs(list) {
    return (list || []).map(function (s) { return src(s); }).join(' · ');
  }

  function note(kind, title, body) {
    return '<div class="note ' + kind + '"><b>' + esc(title) + '</b>' + body + '</div>';
  }

  /* Blok penerangan standard untuk setiap carta:
     apa / kenapa / boleh disimpul / tidak boleh disimpul */
  function reading(o) {
    var h = '<div class="notes">';
    if (o.apa) h += note('baca', 'Apa carta ini tunjuk', o.apa);
    if (o.kenapa) h += note('penting', 'Kenapa ia penting', o.kenapa);
    if (o.simpul) h += note('simpul', 'Apa boleh disimpulkan', o.simpul);
    if (o.hati) h += note('hati', 'Apa TIDAK boleh disimpulkan', o.hati);
    h += '</div>';
    return h;
  }

  function card(title, subtitle, body, srcRef) {
    return '<div class="card">' +
      (title ? '<h3>' + esc(title) + '</h3>' : '') +
      (subtitle ? '<div class="sub">' + subtitle + (srcRef ? ' · ' + src(srcRef) : '') + '</div>'
        : (srcRef ? '<div class="sub">' + src(srcRef) + '</div>' : '')) +
      body + '</div>';
  }

  function legend(items) {
    return '<div class="legend">' + items.map(function (i) {
      return '<span><i style="background:' + i.color + '"></i>' + esc(i.name) + '</span>';
    }).join('') + '</div>';
  }

  function table(cols, rows, opts) {
    opts = opts || {};
    var h = '<div class="tbl-wrap"><table class="t' + (opts.sortable ? ' sortable' : '') + '"' +
      (opts.id ? ' id="' + opts.id + '"' : '') + '><thead><tr>';
    cols.forEach(function (c) {
      h += '<th class="' + (c.n ? 'n' : '') + '"' + (opts.sortable && c.k ? ' data-k="' + c.k + '"' : '') + '>' +
        esc(c.h) + (opts.sortable && c.k ? ' <span class="ar">↕</span>' : '') + '</th>';
    });
    h += '</tr></thead><tbody>';
    rows.forEach(function (r) {
      h += '<tr class="' + (r._cls || '') + '">';
      cols.forEach(function (c) {
        var v = r[c.k];
        h += '<td class="' + (c.n ? 'n ' : '') + (r['_c_' + c.k] || '') + '">' +
          (c.fmt ? c.fmt(v, r) : esc(v === null || v === undefined ? '—' : v)) + '</td>';
      });
      h += '</tr>';
    });
    h += '</tbody></table></div>';
    return h;
  }

  function chartBox(id, opts) {
    return '<div class="chart-wrap"><div id="' + id + '"></div></div>' +
      (opts && opts.legend ? legend(opts.legend) : '');
  }

  function readout(items) {
    return '<div class="readout">' + items.map(function (i) {
      return '<div class="r"><div class="k">' + esc(i.k) + '</div>' +
        '<div class="v ' + (i.cls || '') + '">' + i.v + '</div>' +
        (i.d ? '<div class="d">' + i.d + '</div>' : '') + '</div>';
    }).join('') + '</div>';
  }

  function seg(name, options, active) {
    return '<div class="seg" data-seg="' + name + '">' + options.map(function (o) {
      return '<button type="button" data-v="' + esc(o.v) + '" aria-pressed="' + (o.v === active) + '">' + esc(o.l) + '</button>';
    }).join('') + '</div>';
  }

  function slider(id, o) {
    return '<div class="slider"><div class="lab"><span>' + esc(o.label) + '</span>' +
      '<span id="' + id + '-out">' + o.display(o.value) + '</span></div>' +
      '<input type="range" id="' + id + '" min="' + o.min + '" max="' + o.max + '" step="' + (o.step || 1) + '" value="' + o.value + '"></div>';
  }

  function switchBox(id, title, sub, on) {
    return '<label class="switch" data-on="' + !!on + '" for="' + id + '">' +
      '<input type="checkbox" id="' + id + '"' + (on ? ' checked' : '') + '>' +
      '<span class="tx"><b>' + esc(title) + '</b><em>' + sub + '</em></span></label>';
  }

  function bindSeg(root, name, cb) {
    var s = root.querySelector('[data-seg="' + name + '"]');
    if (!s) return;
    s.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      s.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      cb(b.dataset.v);
    });
  }

  function makeSortable(tableEl, rows, render) {
    var state = { k: null, dir: -1 };
    tableEl.querySelectorAll('th[data-k]').forEach(function (th) {
      th.addEventListener('click', function () {
        var k = th.dataset.k;
        if (state.k === k) state.dir = -state.dir; else { state.k = k; state.dir = -1; }
        var sorted = rows.slice().sort(function (a, b) {
          var x = a['_s_' + k] !== undefined ? a['_s_' + k] : a[k];
          var y = b['_s_' + k] !== undefined ? b['_s_' + k] : b[k];
          if (x === null || x === undefined) return 1;
          if (y === null || y === undefined) return -1;
          if (typeof x === 'number' && typeof y === 'number') return (x - y) * state.dir;
          return String(x).localeCompare(String(y)) * state.dir;
        });
        render(sorted, state);
      });
    });
  }

  window.UI = {
    esc: esc, n: n, rm: rm, rmJuta: rmJuta, pct: pct, src: src, srcs: srcs,
    note: note, reading: reading, card: card, legend: legend, table: table,
    chartBox: chartBox, readout: readout, seg: seg, slider: slider,
    switchBox: switchBox, bindSeg: bindSeg, makeSortable: makeSortable
  };
})();
