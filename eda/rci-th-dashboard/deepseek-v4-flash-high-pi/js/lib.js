/* =========================================================================
   LIB — utiliti & enjin carta SVG (tanpa kebergantungan luar)
   ========================================================================= */
window.L = (function () {

  const NS = 'http://www.w3.org/2000/svg';
  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* ---------- format nombor & wang ---------- */
  function ribu(n) { return Math.round(n).toLocaleString('ms-MY'); }
  /* juta(n): n DIANGGAP dalam unit juta (cth. 54751 = RM54,751 juta) */
  function juta(n) {
    n = Number(n);
    const abs = Math.abs(n);
    if (abs >= 1e3) return (n / 1e3).toFixed(2).replace(/\.?0+$/, '') + ' bilion';
    return ribu(n) + ' juta';
  }
  function wang(n, unit) {
    // unit: 'j' = RM juta, 'k' = RM'000, 'b' = RM bilion, 'raw'
    const neg = n < 0 ? '−' : '';
    const a = Math.abs(n);
    if (unit === 'b') return neg + 'RM' + juta(a * 1e3);
    if (unit === 'j') return neg + 'RM' + juta(a);
    if (unit === 'k') return neg + 'RM' + juta(a / 1e3);
    return neg + 'RM' + ribu(a);
  }
  function peratus(n, d) { return (Number(n)).toFixed(d == null ? 1 : d) + '%'; }
  function tanda(n) { return n > 0 ? '+' + ribu(n) : ribu(n); }

  /* ---------- DOM ---------- */
  function el(tag, attrs, kids) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'html') n.innerHTML = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else if (k === 'cls') n.className = attrs[k];
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    }
    if (kids != null) {
      (Array.isArray(kids) ? kids : [kids]).forEach(k => {
        if (k == null || k === false) return;
        n.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
      });
    }
    return n;
  }

  /* ---------- tooltip ---------- */
  let tipEl = null;
  function tip() {
    if (!tipEl) {
      tipEl = el('div', { cls: 'tip' });
      document.body.appendChild(tipEl);
    }
    return tipEl;
  }
  function showTip(html, x, y) {
    const t = tip();
    t.innerHTML = html;
    t.classList.add('on');
    const r = t.getBoundingClientRect();
    let tx = x - r.width / 2;
    let ty = y - r.height - 12;
    if (tx < 8) tx = 8;
    if (tx + r.width > innerWidth - 8) tx = innerWidth - r.width - 8;
    if (ty < 8) ty = y + 18;
    t.style.left = tx + 'px';
    t.style.top = ty + 'px';
  }
  function hideTip() { if (tipEl) tipEl.classList.remove('on'); }
  document.addEventListener('scroll', hideTip, { passive: true });

  /* ---------- enjin carta: koordinat ---------- */
  function scale(dom, rng) {
    const [d0, d1] = dom, [r0, r1] = rng;
    return v => r0 + (v - d0) / (d1 - d0) * (r1 - r0);
  }

  /* ---------- warna ---------- */
  const W = {
    hijau: '#0e7a4d', hijauMuda: '#2ba471', hijauPudar: '#9fd6b8',
    merah: '#c93a3a', merahMuda: '#e58b8b',
    ambar: '#d99a2b', biru: '#2f6fbf', ungu: '#7b5dbd', teal: '#1b8f97',
    kelabu: '#9aa3ad', kelabuMuda: '#c9cfd6', garisan: '#dde2e8',
    fakta: '#0e7a4d', terbit: '#b7791f', unjur: '#7b5dbd'
  };

  /* =========================================================================
     CARTA 1 — Bar bergugus / bertindan (vertical)
     cfg: { data:[{label, v1..vN}], keys:[{k, nama, warna}], unit, tinggi, mode:'grouped'|'stacked', pct?:bool }
  ========================================================================= */
  function barChart(cfg) {
    const data = cfg.data;
    const keys = cfg.keys;
    const Wpx = 640, Hpx = cfg.tinggi || 300;
    const padL = 58, padR = 12, padT = 16, padB = 34;
    const iw = Wpx - padL - padR, ih = Hpx - padT - padB;
    const mode = cfg.mode || 'grouped';
    const unit = cfg.unit || 'j'; // 'j' | 'k' | 'b' | 'raw'
    const fmt = cfg.fmt || (v => wang(v, unit));

    // nilai maks
    let mx = 0;
    data.forEach(d => {
      if (mode === 'stacked') {
        let s = 0; keys.forEach(k => s += Math.max(0, d[k.k] || 0));
        mx = Math.max(mx, s);
      } else {
        keys.forEach(k => mx = Math.max(mx, Math.abs(d[k.k] || 0)));
      }
    });
    if (cfg.maks) mx = cfg.maks;
    const nice = niceMax(mx);
    const Y = scale([0, nice], [ih, 0]);
    const bw = iw / data.length;
    const gw = mode === 'grouped' ? bw * 0.62 : bw * 0.56;

    let s = `<svg viewBox="0 0 ${Wpx} ${Hpx}" class="chart" role="img">`;
    // grid
    for (let i = 0; i <= 4; i++) {
      const v = nice * i / 4;
      const y = Y(v);
      s += `<line x1="${padL}" y1="${y}" x2="${Wpx - padR}" y2="${y}" class="grid"/>`;
      s += `<text x="${padL - 8}" y="${y + 4}" class="ax">${short(v, unit)}</text>`;
    }
    // bars
    data.forEach((d, i) => {
      const cx = padL + bw * i + bw / 2;
      if (mode === 'stacked') {
        let acc = 0;
        keys.forEach((k, j) => {
          const v = Math.max(0, d[k.k] || 0);
          if (!v) return;
          const y0 = Y(acc), y1 = Y(acc + v);
          s += `<rect x="${cx - gw / 2}" y="${y1}" width="${gw}" height="${y0 - y1}" rx="2" fill="${k.warna}" data-tip="${esc(tipHtml([d.label, k.nama + ': ' + fmt(v)]))}"/>`;
          acc += v;
        });
      } else {
        const n = keys.length, g = gw / n;
        keys.forEach((k, j) => {
          const v = d[k.k] || 0;
          const h = Math.abs(Y(v) - Y(0));
          const y = v >= 0 ? Y(v) : Y(0);
          s += `<rect x="${cx - gw / 2 + g * j + 1}" y="${y}" width="${Math.max(2, g - 2)}" height="${h}" rx="2" fill="${k.warna}" opacity="${v < 0 ? 0.85 : 1}" data-tip="${esc(tipHtml([d.label, k.nama + ': ' + fmt(v)]))}"/>`;
        });
      }
      s += `<text x="${cx}" y="${Hpx - 10}" class="ax xl">${d.label}</text>`;
    });
    // zero line
    if (mode !== 'stacked') {
      s += `<line x1="${padL}" y1="${Y(0)}" x2="${Wpx - padR}" y2="${Y(0)}" class="zero"/>`;
    }
    s += `</svg>`;

    const box = el('div', { cls: 'chartwrap' + (cfg.cx ? ' ' + cfg.cx : '') });
    box.innerHTML = s;
    bindTips(box);
    if (cfg.legend) box.insertBefore(legend(keys.map(k => ({ nama: k.nama, warna: k.warna }))), box.firstChild);
    return box;
  }

  /* =========================================================================
     CARTA 2 — Bar mendatar (comparison / ranking)
     cfg: { data:[{label, v, v2?, warna?, warna2?}], unit, sort?:bool, suffix? }
  ========================================================================= */
  function hBarChart(cfg) {
    const data = cfg.data.slice();
    if (cfg.sort !== false) data.sort((a, b) => (b.v - a.v));
    const Wpx = 640;
    const rowH = 34, padT = 10, padB = 6, padL = 10, padR = 120;
    const Hpx = Math.max(140, padT + padB + data.length * rowH);
    const iw = Wpx - padL - padR;
    const unit = cfg.unit || 'j';
    const fmt = cfg.fmt || (v => wang(v, unit));
    let mx = 0;
    data.forEach(d => mx = Math.max(mx, Math.abs(d.v), Math.abs(d.v2 || 0)));
    const nice = niceMax(mx);
    const X = scale([0, nice], [0, iw]);

    let s = `<svg viewBox="0 0 ${Wpx} ${Hpx}" class="chart">`;
    for (let i = 0; i <= 4; i++) {
      const v = nice * i / 4, x = X(v);
      s += `<line x1="${padL + x}" y1="${padT}" x2="${padL + x}" y2="${Hpx - padB}" class="grid v"/>`;
      s += `<text x="${padL + x}" y="${padT - 4}" class="ax">${short(v, unit)}</text>`;
    }
    data.forEach((d, i) => {
      const y = padT + i * rowH;
      const w = X(Math.abs(d.v));
      const fill = d.warna || W.hijau;
      s += `<rect x="${padL}" y="${y + 6}" width="${w}" height="16" rx="3" fill="${fill}" data-tip="${esc(tipHtml([d.label, cfg.tipLabel || 'Nilai' + ': ' + fmt(d.v)]))}"/>`;
      if (d.v2 != null) {
        const w2 = X(Math.abs(d.v2));
        s += `<rect x="${padL}" y="${y + 24}" width="${w2}" height="5" rx="2" fill="${d.warna2 || W.kelabu}" opacity=".7" data-tip="${esc(tipHtml([d.label, (cfg.tipLabel2 || 'Bandingan') + ': ' + fmt(d.v2)]))}"/>`;
      }
      s += `<text x="${padL + 6}" y="${y + 18}" class="hb">${esc(d.label)}</text>`;
      s += `<text x="${Wpx - padR + 6}" y="${y + 18}" class="hb hv">${fmt(d.v)}</text>`;
    });
    s += `</svg>`;
    const box = el('div', { cls: 'chartwrap' });
    box.innerHTML = s;
    bindTips(box);
    if (cfg.nota) box.appendChild(el('div', { cls: 'chart-nota', text: cfg.nota }));
    return box;
  }

  /* =========================================================================
     CARTA 3 — Garisan / kawasan (time series)
     cfg: { data:[{label, v}], unit, tinggi, fill?:bool, titik?:bool, warna?, target?:[{label, v, dash}], yFmt? }
  ========================================================================= */
  function lineChart(cfg) {
    const data = cfg.data;
    const Wpx = 640, Hpx = cfg.tinggi || 280;
    const padL = 46, padR = 14, padT = 18, padB = 32;
    const iw = Wpx - padL - padR, ih = Hpx - padT - padB;
    const unit = cfg.unit || 'j';
    const fmt = cfg.fmt || (v => wang(v, unit));
    const color = cfg.warna || W.hijau;

    let mn = Infinity, mx = -Infinity;
    data.forEach(d => { mn = Math.min(mn, d.v); mx = Math.max(mx, d.v); });
    (cfg.target || []).forEach(d => { mx = Math.max(mx, d.v); mn = Math.min(mn, d.v); });
    if (cfg.min0) mn = Math.min(0, mn);
    if (cfg.maks) mx = cfg.maks;
    const span = mx - mn || 1;
    mx += span * 0.12; mn -= span * 0.12;
    const X = scale([0, data.length - 1], [0, iw]);
    const Y = scale([mn, mx], [ih, 0]);

    let s = `<svg viewBox="0 0 ${Wpx} ${Hpx}" class="chart">`;
    for (let i = 0; i <= 4; i++) {
      const v = mn + (mx - mn) * i / 4, y = Y(v);
      s += `<line x1="${padL}" y1="${y}" x2="${Wpx - padR}" y2="${y}" class="grid"/>`;
      s += `<text x="${padL - 8}" y="${y + 4}" class="ax">${fmt(v)}</text>`;
    }
    const pts = data.map((d, i) => [X(i), Y(d.v)]);
    if (cfg.fill) {
      s += `<path d="M${pts[0][0]},${Y(0)} L${pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L')} L${pts[pts.length - 1][0]},${Y(0)} Z" fill="${color}" opacity=".14"/>`;
    }
    s += `<path d="M${pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L')}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    // target lines
    (cfg.target || []).forEach(t => {
      const y = Y(t.v);
      s += `<line x1="${padL}" y1="${y}" x2="${Wpx - padR}" y2="${y}" stroke="${t.warna || W.merah}" stroke-width="1.5" stroke-dasharray="6 4"/>`;
      s += `<text x="${padL + 4}" y="${y - 5}" class="tg">${esc(t.label)}</text>`;
    });
    // dots
    if (cfg.titik !== false) {
      pts.forEach((p, i) => {
        s += `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${color}" stroke="#fff" stroke-width="1.5" data-tip="${esc(tipHtml([data[i].label, fmt(data[i].v)]))}"/>`;
      });
    }
    data.forEach((d, i) => {
      s += `<text x="${X(i)}" y="${Hpx - 8}" class="ax xl">${d.label}</text>`;
    });
    s += `</svg>`;
    const box = el('div', { cls: 'chartwrap' });
    box.innerHTML = s;
    bindTips(box);
    return box;
  }

  /* =========================================================================
     CARTA 4 — Donut (bahagian kepada keseluruhan)
  ========================================================================= */
  function donut(cfg) {
    const data = cfg.data; // [{label, v, warna}]
    const total = data.reduce((a, d) => a + d.v, 0);
    const cx = 110, cy = 110, r = 88, ir = 58;
    let ang = -Math.PI / 2;
    let s = `<svg viewBox="0 0 220 220" class="chart donut">`;
    data.forEach(d => {
      const frac = d.v / total;
      const a2 = ang + frac * Math.PI * 2;
      const large = frac > 0.5 ? 1 : 0;
      const x1 = cx + r * Math.cos(ang), y1 = cy + r * Math.sin(ang);
      const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      const x3 = cx + ir * Math.cos(a2), y3 = cy + ir * Math.sin(a2);
      const x4 = cx + ir * Math.cos(ang), y4 = cy + ir * Math.sin(ang);
      s += `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)} L${x3.toFixed(1)},${y3.toFixed(1)} A${ir},${ir} 0 ${large} 0 ${x4.toFixed(1)},${y4.toFixed(1)} Z" fill="${d.warna}" data-tip="${esc(tipHtml([d.label, peratus(d.v / total * 100) + ' (' + (cfg.fmt || juta)(d.v) + ')']))}"/>`;
      ang = a2;
    });
    s += `<text x="${cx}" y="${cy - 2}" class="donut-big" text-anchor="middle">${cfg.tengah || ''}</text>`;
    s += `<text x="${cx}" y="${cy + 16}" class="donut-sub" text-anchor="middle">${cfg.tengahSub || ''}</text>`;
    s += `</svg>`;
    const box = el('div', { cls: 'chartwrap donutwrap' });
    box.innerHTML = s;
    bindTips(box);
    const lg = el('div', { cls: 'legend donut-legend' });
    data.forEach(d => lg.appendChild(el('div', { cls: 'lg-item', html: `<i style="background:${d.warna}"></i>${esc(d.label)}<b>${peratus(d.v / total * 100, 0)}</b>` })));
    box.appendChild(lg);
    return box;
  }

  /* =========================================================================
     CARTA 5 — "Waterfall" ringkas untuk lebihan/kurangan
  ========================================================================= */
  function waterfall(cfg) {
    // data: [{label, v, warna?}]
    const data = cfg.data;
    const Wpx = 640, Hpx = cfg.tinggi || 300;
    const padL = 58, padR = 12, padT = 16, padB = 34;
    const iw = Wpx - padL - padR, ih = Hpx - padT - padB;
    let mx = 0;
    data.forEach(d => mx = Math.max(mx, Math.abs(d.v)));
    const nice = niceMax(mx);
    const Y = scale([-nice, nice], [ih, 0]);
    const bw = iw / data.length, gw = bw * 0.5;
    let s = `<svg viewBox="0 0 ${Wpx} ${Hpx}" class="chart">`;
    for (let i = 0; i <= 4; i++) {
      const v = -nice + 2 * nice * i / 4, y = Y(v);
      s += `<line x1="${padL}" y1="${y}" x2="${Wpx - padR}" y2="${y}" class="grid"/>`;
      s += `<text x="${padL - 8}" y="${y + 4}" class="ax">${short(v, cfg.unit || 'j')}</text>`;
    }
    s += `<line x1="${padL}" y1="${Y(0)}" x2="${Wpx - padR}" y2="${Y(0)}" class="zero"/>`;
    data.forEach((d, i) => {
      const cx = padL + bw * i + bw / 2;
      const y = d.v >= 0 ? Y(d.v) : Y(0);
      const h = Math.max(2, Math.abs(Y(d.v) - Y(0)));
      s += `<rect x="${cx - gw / 2}" y="${y}" width="${gw}" height="${h}" rx="2" fill="${d.warna || (d.v >= 0 ? W.hijau : W.merah)}" data-tip="${esc(tipHtml([d.label, cfg.fmt ? cfg.fmt(d.v) : short(d.v, cfg.unit || 'j')]))}"/>`;
      s += `<text x="${cx}" y="${Hpx - 10}" class="ax xl">${d.label}</text>`;
    });
    s += `</svg>`;
    const box = el('div', { cls: 'chartwrap' });
    box.innerHTML = s;
    bindTips(box);
    return box;
  }

  /* =========================================================================
     pembantu
  ========================================================================= */
  function tipHtml(lines) {
    return '<div class="tip-in">' + lines.map(l => `<div>${l}</div>`).join('') + '</div>';
  }
  function niceMax(v) {
    if (v <= 0) return 1;
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    const d = v / p;
    const n = d <= 1 ? 1 : d <= 2 ? 2 : d <= 2.5 ? 2.5 : d <= 5 ? 5 : 10;
    return n * p;
  }
  function short(v, unit) {
    const abs = Math.abs(v);
    if (unit === 'k') {
      // nilai dalam RM'000
      if (abs >= 1e6) return (v / 1e6).toFixed(1) + 'b';
      if (abs >= 1e3) return (v / 1e3).toFixed(0) + 'j';
      return ribu(v);
    }
    if (unit === 'j') {
      // nilai dalam RM juta
      if (abs >= 1e3) return (v / 1e3).toFixed(1) + 'b';
      return ribu(v);
    }
    if (abs >= 1e9) return (v / 1e9).toFixed(1) + 'b';
    if (abs >= 1e6) return (v / 1e6).toFixed(1) + 'j';
    if (abs >= 1e3) return (v / 1e3).toFixed(1) + 'k';
    return String(Math.round(v));
  }
  function legend(items) {
    const lg = el('div', { cls: 'legend' });
    items.forEach(it => lg.appendChild(el('div', { cls: 'lg-item', html: `<i style="background:${it.warna}"></i>${esc(it.nama)}` })));
    return lg;
  }
  function bindTips(root) {
    root.querySelectorAll('[data-tip]').forEach(n => {
      const html = n.getAttribute('data-tip');
      n.addEventListener('pointerenter', e => showTip(html, e.clientX, e.clientY));
      n.addEventListener('pointermove', e => showTip(html, e.clientX, e.clientY));
      n.addEventListener('pointerleave', hideTip);
      n.addEventListener('pointerdown', e => { e.stopPropagation(); showTip(html, e.clientX, e.clientY); });
    });
  }
  /* tutup tooltip apabila sentuh/klik di tempat lain (mobile) */
  document.addEventListener('pointerdown', e => {
    if (!e.target.closest || !e.target.closest('[data-tip]')) hideTip();
  }, { passive: true });

  /* ---------- komponen UI ---------- */
  function card(tajuk, sub, body, opt) {
    opt = opt || {};
    const c = el('section', { cls: 'card' + (opt.cls ? ' ' + opt.cls : '') });
    if (opt.id) c.id = opt.id;
    if (tajuk || opt.badge) {
      const h = el('header', { cls: 'card-h' });
      if (opt.badge) h.appendChild(el('span', { cls: 'badge ' + opt.badge, text: opt.badgeText || '' }));
      if (tajuk) h.appendChild(el('h3', { text: tajuk }));
      if (sub) h.appendChild(el('p', { cls: 'card-sub', text: sub }));
      c.appendChild(h);
    }
    if (opt.toolbar) c.appendChild(opt.toolbar);
    if (body != null) c.appendChild(typeof body === 'string' ? el('div', { html: body }) : body);
    if (opt.src) c.appendChild(srcLine(opt.src));
    return c;
  }

  function srcLine(src) {
    const line = el('div', { cls: 'src' });
    const a = el('a', { href: src.url, target: '_blank', rel: 'noopener', cls: 'src-link' });
    a.appendChild(el('span', { cls: 'src-dot' }));
    a.appendChild(document.createTextNode('Sumber: ' + src.s + ' · m/s PDF ' + src.p));
    line.appendChild(a);
    return line;
  }

  function badgeJenis(jenis) {
    const map = {
      F: ['fakta', 'Fakta laporan'],
      T: ['terbit', 'Terbitan data laporan'],
      U: ['unjur', 'Unjuran dalam laporan'],
      S: ['simul', 'Simulasi/ilustrasi']
    };
    const m = map[jenis] || map.F;
    return el('span', { cls: 'jbadge ' + m[0], title: m[1], text: m[1] });
  }

  /* "Cara baca" — bantuan memahami carta */
  function bantuan(items) {
    const box = el('details', { cls: 'bantuan' });
    box.appendChild(el('summary', { html: '<span>📖 Cara baca & tafsiran</span>' }));
    const body = el('div', { cls: 'bantuan-body' });
    items.forEach(it => {
      body.appendChild(el('div', { cls: 'b-read' + (it.t ? ' ' + it.t : '') }));
      body.lastChild.appendChild(el('b', { text: it.j }));
      body.lastChild.appendChild(el('p', { text: it.i }));
    });
    box.appendChild(body);
    return box;
  }

  /* callout insight */
  function insight(jenis, html) {
    const cls = jenis === 'ya' ? 'ins-ya' : jenis === 'tidak' ? 'ins-tidak' : 'ins-info';
    return el('div', { cls: 'insight ' + cls, html });
  }

  function kpi(label, nilai, sub, warna) {
    const k = el('div', { cls: 'kpi' });
    if (warna) k.style.setProperty('--kpi', warna);
    k.appendChild(el('span', { cls: 'kpi-l', text: label }));
    k.appendChild(el('b', { cls: 'kpi-v', text: nilai }));
    if (sub) k.appendChild(el('span', { cls: 'kpi-s', text: sub }));
    return k;
  }

  return {
    el, esc, ribu, juta, wang, peratus, tanda, scale, W, barChart, hBarChart, lineChart, donut, waterfall,
    card, srcLine, badgeJenis, bantuan, insight, kpi, legend, showTip, hideTip, niceMax, short
  };
})();
