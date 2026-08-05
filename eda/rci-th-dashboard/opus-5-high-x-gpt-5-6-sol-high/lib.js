/* =====================================================================
   LIB — pembantu format, DOM, dan enjin carta SVG.
   Ditulis sendiri (tiada pustaka luar) supaya setiap interaksi boleh
   disesuaikan dengan keperluan analisis, dan dashboard boleh dimuatkan
   tanpa sambungan ke mana-mana perkhidmatan luar.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- Format ---------- */
  const nf = (n, d) => {
    if (n === null || n === undefined || Number.isNaN(n)) return '—';
    return n.toLocaleString('ms-MY', { minimumFractionDigits: d ?? 0, maximumFractionDigits: d ?? 0 });
  };
  const fmt = {
    n: nf,
    /** RM juta -> teks mesra ("RM1.42 bilion" / "RM769 juta") */
    juta(v, d) {
      if (v === null || v === undefined) return '—';
      const s = v < 0 ? '−' : '';
      const a = Math.abs(v);
      if (a >= 1000) return `${s}RM${nf(a / 1000, d ?? 2)} bilion`;
      return `${s}RM${nf(a, d ?? 0)} juta`;
    },
    /** RM penuh -> teks mesra */
    rm(v, d) {
      if (v === null || v === undefined) return '—';
      const s = v < 0 ? '−' : '';
      const a = Math.abs(v);
      if (a >= 1e9) return `${s}RM${nf(a / 1e9, d ?? 2)} bilion`;
      if (a >= 1e6) return `${s}RM${nf(a / 1e6, d ?? 1)} juta`;
      return `${s}RM${nf(a, d ?? 0)}`;
    },
    rmTepat: (v) => (v === null || v === undefined ? '—' : `${v < 0 ? '−' : ''}RM${nf(Math.abs(v), 2)}`),
    pct: (v, d) => (v === null || v === undefined ? '—' : `${v > 0 ? '' : ''}${nf(v, d ?? 1)}%`),
    tarikh(iso) {
      if (!iso) return '—';
      if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
      const bulan = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
      const [y, m, d] = iso.split('-').map(Number);
      return `${d} ${bulan[m - 1]} ${y}`;
    },
  };

  /* ---------- DOM ---------- */
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) n.setAttribute(k, attrs[k]);
    }
    for (const c of kids.flat()) {
      if (c === null || c === undefined || c === false) continue;
      n.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
    }
    return n;
  }
  const NS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs, ...kids) {
    const n = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) {
      if (k === 'html') n.innerHTML = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) n.setAttribute(k, attrs[k]);
    }
    for (const c of kids.flat()) if (c) n.appendChild(c);
    return n;
  }

  /* ---------- Tooltip ---------- */
  const tip = el('div', { class: 'tip', role: 'status' });
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(tip));
  let tipOn = false;
  function showTip(evt, html) {
    tip.innerHTML = html; tip.classList.add('on'); tipOn = true; moveTip(evt);
  }
  function moveTip(evt) {
    if (!tipOn) return;
    const pad = 14, w = tip.offsetWidth, h = tip.offsetHeight;
    let x = evt.clientX + pad, y = evt.clientY + pad;
    if (x + w > window.innerWidth - 8) x = evt.clientX - w - pad;
    if (y + h > window.innerHeight - 8) y = evt.clientY - h - pad;
    tip.style.transform = `translate(${Math.max(4, x)}px,${Math.max(4, y)}px)`;
  }
  function hideTip() { tip.classList.remove('on'); tipOn = false; }
  document.addEventListener('scroll', hideTip, true);

  /* ---------- Skala ---------- */
  function linear(dom, rng) {
    const [d0, d1] = dom, [r0, r1] = rng;
    const k = d1 === d0 ? 0 : (r1 - r0) / (d1 - d0);
    const f = (v) => r0 + (v - d0) * k;
    f.invert = (p) => (k === 0 ? d0 : d0 + (p - r0) / k);
    f.domain = dom; f.range = rng;
    return f;
  }
  function band(items, rng, pad) {
    const [r0, r1] = rng; const p = pad ?? 0.2;
    const step = (r1 - r0) / Math.max(1, items.length);
    const bw = step * (1 - p);
    const f = (v) => r0 + items.indexOf(v) * step + (step - bw) / 2;
    f.bandwidth = bw; f.step = step;
    return f;
  }
  /** Tanda skala yang kemas (nice ticks) */
  function ticks(min, max, count) {
    if (min === max) { min -= 1; max += 1; }
    const span = max - min;
    const raw = span / (count || 5);
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm = raw / mag;
    const stepN = norm >= 7.5 ? 10 : norm >= 3.5 ? 5 : norm >= 1.5 ? 2 : 1;
    const step = stepN * mag;
    const out = [];
    for (let t = Math.ceil(min / step) * step; t <= max + 1e-9; t += step) out.push(Math.round(t / step) * step);
    return out;
  }
  /** Julat yang merangkumi sifar apabila data mempunyai nilai negatif */
  function extent(vals, { zero = true } = {}) {
    const v = vals.filter((x) => typeof x === 'number' && !Number.isNaN(x));
    let lo = Math.min(...v), hi = Math.max(...v);
    if (zero) { lo = Math.min(lo, 0); hi = Math.max(hi, 0); }
    if (lo === hi) { hi = lo + 1; }
    const padv = (hi - lo) * 0.08;
    return [lo === 0 ? 0 : lo - padv, hi === 0 ? 0 : hi + padv];
  }

  /* ---------- Rangka carta ---------- */
  /**
   * Mencipta SVG responsif. `draw(g, w, h, svg)` dipanggil semula setiap
   * kali saiz bekas berubah, jadi carta sentiasa muat pada skrin telefon.
   */
  function chart(host, opts, draw) {
    const o = Object.assign({ h: 320, m: { t: 16, r: 16, b: 40, l: 56 }, minW: 260 }, opts || {});
    host.classList.add('chart');
    let raf = null;
    function render() {
      const W = Math.max(o.minW, host.clientWidth || o.minW);
      const H = typeof o.h === 'function' ? o.h(W) : o.h;
      host.innerHTML = '';
      const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', height: H, role: 'img' });
      const g = s('g', { transform: `translate(${o.m.l},${o.m.t})` });
      svg.appendChild(g);
      host.appendChild(svg);
      draw(g, W - o.m.l - o.m.r, H - o.m.t - o.m.b, svg, W, H);
    }
    render();
    const ro = new ResizeObserver(() => { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(render); });
    ro.observe(host);
    return { render, destroy: () => ro.disconnect() };
  }

  /** Paksi-Y bernombor + garis panduan mendatar */
  function axisY(g, y, w, { label, fmt: f, count = 5 } = {}) {
    const ts = ticks(y.domain[0], y.domain[1], count);
    for (const t of ts) {
      const yy = y(t);
      g.appendChild(s('line', { x1: 0, x2: w, y1: yy, y2: yy, class: t === 0 ? 'grid grid-zero' : 'grid' }));
      g.appendChild(s('text', { x: -8, y: yy + 4, class: 'axis', 'text-anchor': 'end', text: f ? f(t) : nf(t) }));
    }
    if (label) g.appendChild(s('text', { x: 0, y: -6, class: 'axis-label', text: label }));
  }

  /** Paksi-X berkategori (auto putar label bila sempit) */
  function axisX(g, x, items, h, { every = 1, rotate = false, label: lf } = {}) {
    items.forEach((it, i) => {
      if (i % every !== 0) return;
      const cx = x(it) + x.bandwidth / 2;
      const txt = lf ? lf(it) : String(it);
      g.appendChild(s('text', {
        x: rotate ? 0 : cx, y: rotate ? 0 : h + 20, class: 'axis', 'text-anchor': rotate ? 'end' : 'middle',
        transform: rotate ? `translate(${cx},${h + 16}) rotate(-40)` : null, text: txt,
      }));
    });
  }

  /* ---------- Legend ---------- */
  function legend(keys) {
    return el('div', { class: 'legend' }, keys.map((k) =>
      el('span', { class: 'lg' }, el('i', { style: `background:${k.warna}` }), k.label)));
  }

  /* ---------- Muat turun CSV ---------- */
  function toCSV(rows) {
    return rows.map((r) => r.map((c) => {
      const v = c === null || c === undefined ? '' : String(c);
      return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
    }).join(',')).join('\n');
  }
  function muatTurun(nama, rows) {
    const blob = new Blob(['﻿' + toCSV(rows)], { type: 'text/csv;charset=utf-8' });
    const a = el('a', { href: URL.createObjectURL(blob), download: nama });
    document.body.appendChild(a); a.click(); a.remove();
  }

  window.L = { fmt, el, s, showTip, moveTip, hideTip, linear, band, ticks, extent, chart, axisX, axisY, legend, muatTurun, toCSV };
})();
