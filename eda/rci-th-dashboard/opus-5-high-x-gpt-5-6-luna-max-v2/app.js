/*
 * Opus 5 High × GPT-5-6 Luna Max v2
 *
 * The data files stay deliberately separate from this interface layer. This
 * file changes the reading order, visual hierarchy, and interaction model;
 * it does not create new report facts.
 */
(function () {
  'use strict';

  const D = window.RCI;
  const X = window.RCI_DETAIL;
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const story = $('#story');
  const chapterNav = $('#chapterNav');
  const tip = $('#tip');
  const state = { tema: '', section: 'ringkasan' };

  const esc = (value) => String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  const fmt = {
    n(value, digits) {
      if (value === null || value === undefined || Number.isNaN(value)) return '—';
      return Number(value).toLocaleString('ms-MY', { minimumFractionDigits: digits ?? 0, maximumFractionDigits: digits ?? 0 });
    },
    juta(value, digits) {
      if (value === null || value === undefined) return '—';
      const sign = value < 0 ? '−' : '';
      const absolute = Math.abs(value);
      if (absolute >= 1000) return `${sign}RM${fmt.n(absolute / 1000, digits ?? 2)} bilion`;
      return `${sign}RM${fmt.n(absolute, digits ?? 0)} juta`;
    },
    rm(value, digits) {
      if (value === null || value === undefined) return '—';
      const sign = value < 0 ? '−' : '';
      const absolute = Math.abs(value);
      if (absolute >= 1e9) return `${sign}RM${fmt.n(absolute / 1e9, digits ?? 2)} bilion`;
      if (absolute >= 1e6) return `${sign}RM${fmt.n(absolute / 1e6, digits ?? 1)} juta`;
      return `${sign}RM${fmt.n(absolute, digits ?? 0)}`;
    },
    rmTepat(value) { return value === null || value === undefined ? '—' : `${value < 0 ? '−' : ''}RM${fmt.n(Math.abs(value), 2)}`; },
    tarikh(iso) {
      if (!iso) return '—';
      if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
      const bulan = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
      const [year, month, day] = iso.split('-').map(Number);
      return `${day} ${bulan[month - 1]} ${year}`;
    },
  };

  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([key, value]) => {
      if (value === null || value === undefined || value === false) return;
      if (key === 'class') node.className = value;
      else if (key === 'html') node.innerHTML = value;
      else if (key === 'style' && typeof value === 'object') Object.assign(node.style, value);
      else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
      else if (key === 'checked') node.checked = value === true || value === 'checked';
      else node.setAttribute(key, value);
    });
    children.flat().forEach((child) => {
      if (child === null || child === undefined || child === false) return;
      node.appendChild(child instanceof Node ? child : document.createTextNode(String(child)));
    });
    return node;
  }

  function html(tag, className, markup) { return el(tag, { class: className, html: markup }); }

  function button(label, onClick, className = 'control-button', extra = {}) {
    return el('button', { class: className, type: 'button', onclick: onClick, ...extra }, label);
  }

  function fmtValue(value, kind = 'text') {
    if (typeof value !== 'number') return value ?? '—';
    if (kind === 'rm') return fmt.rm(value);
    if (kind === 'juta') return fmt.juta(value);
    if (kind === 'pct') return `${fmt.n(value, 1)}%`;
    return fmt.n(value, value % 1 ? 2 : 0);
  }

  function source(ms, label) {
    return el('a', { class: 'source-link', href: `${D.src}${ms}`, target: '_blank', rel: 'noopener', title: 'Buka laporan asal pada muka surat ini' }, label || `Laporan ms ${ms}`);
  }

  function sourceRow(...links) {
    return el('div', { class: 'source-row' }, el('span', { class: 'reference-label' }, 'Rujukan'), links.flat().filter(Boolean));
  }

  function badge(type) {
    const map = {
      f: ['fact', 'Fakta laporan'],
      t: ['derived', 'Data terbitan'],
      u: ['forecast', 'Unjuran laporan'],
      s: ['sim', 'Simulasi anda'],
    };
    const [className, label] = map[type] || map.f;
    return el('span', { class: `badge ${className}`, title: type === 'f' ? 'Angka ini disalin terus daripada laporan.' : type === 't' ? 'Angka ini dikira oleh dashboard daripada angka laporan.' : type === 'u' ? 'Angka ini ialah unjuran masa depan yang dibuat dalam laporan itu sendiri.' : 'Angka ini datang daripada tetapan yang anda pilih. Ia bukan kandungan laporan.' }, label);
  }

  function reportNote(markup, kind = '') { return html('div', `report-note ${kind}`, markup); }

  function readBox({ tunjuk, penting, simpul, jangan }) {
    const rows = [
      ['Apa ditunjuk', tunjuk, ''],
      ['Kenapa penting', penting, ''],
      ['Boleh simpul', simpul, ''],
      ['Jangan simpul', jangan, 'warn'],
    ].filter((row) => row[1]);
    return el('div', { class: 'read-box' }, rows.map(([label, copy, kind]) => html('div', `read-row ${kind}`, `<b>${esc(label)}</b><span>${copy}</span>`)));
  }

  function metric(value, label, target, type = 'f', tone = '') {
    const attrs = { class: `evidence-card ${tone}` };
    if (target) {
      attrs.type = 'button';
      attrs.onclick = () => go(target);
      attrs['aria-label'] = `${label}. Teroka.`;
    }
    const node = el(target ? 'button' : 'div', attrs,
      badge(type),
      el('span', { class: 'metric-value' }, value),
      html('span', 'metric-label', label),
      target ? el('span', { class: 'metric-link' }, 'Teroka →') : null);
    return node;
  }

  function miniStat(value, label, type = 'f', tone = '') {
    return el('div', { class: `mini-stat ${tone}` }, badge(type), el('span', { class: 'metric-value' }, value), html('span', 'metric-label', label));
  }

  function panel(title, deck, ...children) {
    const node = el('article', { class: 'story-panel' });
    if (title || deck) node.appendChild(el('div', { class: 'panel-header' }, el('div', null,
      title ? el('h3', { class: 'panel-title' }, title) : null,
      deck ? html('p', 'panel-deck', deck) : null)));
    children.flat().filter(Boolean).forEach((child) => node.appendChild(child));
    return node;
  }

  function section(id, number, kicker, title, deck) {
    const node = el('section', { id, class: 'story-section' });
    node.appendChild(el('div', { class: 'section-header' },
      el('div', { class: 'section-header-row' },
        el('span', { class: 'section-index' }, number),
        el('div', null,
          el('div', { class: 'eyebrow' }, kicker),
          el('h2', { class: 'section-title' }, title),
          html('p', 'section-deck', deck))),
      el('span', { class: 'section-marker' }, 'Setiap angka boleh dijejak')));
    return node;
  }

  function controlGroup(options, active, onPick) {
    return el('div', { class: 'segmented' }, options.map((option) => button(option.label, () => onPick(option.id), `control-button${option.id === active ? ' active' : ''}`, { 'aria-pressed': option.id === active })));
  }

  function controlRow(...children) { return el('div', { class: 'control-row' }, children.flat().filter(Boolean)); }

  function barChart(rows, options = {}) {
    const values = rows.map((row) => Math.abs(Number(row.value) || 0));
    const max = options.max ?? Math.max(1, ...values);
    const node = el('div', { class: 'bar-chart', role: 'list' });
    rows.forEach((row) => {
      const fill = el('span', { class: `bar-fill ${row.color || ''}`, style: { width: `${Math.max(0, Math.min(100, Math.abs(Number(row.value) || 0) / max * 100))}%` } });
      const track = el('span', { class: 'bar-track' }, fill);
      const item = el(row.onClick ? 'button' : 'div', { class: `bar-row${row.onClick ? ' clickable' : ''}`, role: 'listitem', type: row.onClick ? 'button' : null, onclick: row.onClick || null, title: row.title || row.display || row.label },
        el('span', { class: 'bar-label' }, row.label), track, el('span', { class: `bar-value ${row.value < 0 ? 'negative' : ''}` }, row.display ?? fmtValue(row.value, row.kind)));
      node.appendChild(item);
    });
    if (options.caption) node.appendChild(el('div', { class: 'bar-caption' }, options.caption));
    return node;
  }

  function dualChart(rows, options = {}) {
    const max = options.max ?? Math.max(1, ...rows.flatMap((row) => row.values.map((v) => Math.abs(Number(v) || 0))));
    const node = el('div', { class: 'dual-bars' });
    rows.forEach((row) => {
      const track = el('div', { class: 'dual-track' });
      row.values.forEach((value, index) => track.appendChild(el('span', { class: index ? 'second' : 'first', style: { width: `${Math.max(0, Math.min(100, Math.abs(value) / max * 100))}%`, background: row.colors?.[index] || null } })));
      node.appendChild(el('div', { class: 'dual-line' }, el('span', { class: 'bar-label' }, row.label), track, el('span', { class: 'dual-value' }, row.display || row.values.map((v) => fmtValue(v, options.kind)).join(' / '))));
    });
    return node;
  }

  function svgLineChart(labels, series, options = {}) {
    const width = 820;
    const height = options.height || 275;
    const margin = { top: 25, right: 24, bottom: 40, left: 46 };
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;
    const all = series.flatMap((s) => s.values).filter((v) => typeof v === 'number');
    const min = options.min ?? Math.min(0, ...all);
    const max = options.max ?? Math.max(1, ...all) * 1.08;
    const x = (index) => margin.left + (labels.length <= 1 ? plotW / 2 : index / (labels.length - 1) * plotW);
    const y = (value) => margin.top + plotH - ((value - min) / (max - min || 1)) * plotH;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', options.label || 'Carta data');
    const line = (tag, attrs) => { const n = document.createElementNS('http://www.w3.org/2000/svg', tag); Object.entries(attrs).forEach(([key, value]) => n.setAttribute(key, value)); return n; };
    const nice = [0, .25, .5, .75, 1];
    nice.forEach((ratio) => {
      const value = min + (max - min) * ratio;
      const yy = y(value);
      svg.appendChild(line('line', { x1: margin.left, x2: width - margin.right, y1: yy, y2: yy, class: 'chart-grid' }));
      const tick = line('text', { x: margin.left - 8, y: yy + 4, 'text-anchor': 'end', class: 'chart-axis' });
      tick.textContent = options.formatY ? options.formatY(value) : fmt.n(value);
      svg.appendChild(tick);
    });
    labels.forEach((label, index) => {
      const tick = line('text', { x: x(index), y: height - 13, 'text-anchor': index === 0 ? 'start' : index === labels.length - 1 ? 'end' : 'middle', class: 'chart-axis' });
      tick.textContent = label;
      svg.appendChild(tick);
    });
    series.forEach((item, seriesIndex) => {
      const points = item.values.map((value, index) => `${x(index)},${y(value)}`).join(' ');
      const path = line('polyline', { points, class: 'chart-path', stroke: item.color || null });
      if (item.color) path.style.stroke = item.color;
      svg.appendChild(path);
      item.values.forEach((value, index) => {
        const dot = line('circle', { cx: x(index), cy: y(value), r: 4.5, class: 'chart-dot', fill: item.color || 'var(--red)' });
        dot.addEventListener('mouseenter', (event) => showTip(event, `<strong>${esc(item.name)}</strong><div class="tip-line"><span>${esc(labels[index])}</span><b>${esc(options.formatValue ? options.formatValue(value) : fmt.n(value))}</b></div>`));
        dot.addEventListener('mousemove', moveTip);
        dot.addEventListener('mouseleave', hideTip);
        svg.appendChild(dot);
      });
      if (options.showValues) {
        const last = item.values.length - 1;
        const label = line('text', { x: x(last) + 7, y: y(item.values[last]) + 4, class: 'chart-value', fill: item.color || 'var(--ink)' });
        label.textContent = item.name;
        svg.appendChild(label);
      }
      if (seriesIndex === 0 && options.area) {
        const area = line('polygon', { points: `${x(0)},${y(min)} ${points} ${x(labels.length - 1)},${y(min)}`, class: 'chart-area' });
        svg.insertBefore(area, svg.querySelector('.chart-path'));
      }
    });
    return el('div', { class: 'line-chart' }, svg);
  }

  function table(headers, rows, options = {}) {
    const thead = el('thead', null, el('tr', null, headers.map((header) => el('th', { class: header.num ? 'num' : '' }, header.label || header))));
    const tbody = el('tbody', null, rows.map((row) => el('tr', { class: row.className || '' }, row.cells.map((cell, index) => {
      const value = typeof cell === 'object' && cell !== null && cell.nodeType ? cell : String(cell ?? '—');
      return el('td', { class: headers[index]?.num || typeof cell === 'number' ? 'num' : '' }, value);
    }))));
    const node = el('div', { class: 'table-scroll' }, el('table', null, thead, tbody));
    if (options.csv) node.appendChild(el('div', { class: 'source-row' }, csvButton(options.csv.name, options.csv.headers, options.csv.rows), options.source ? source(options.source) : null));
    return node;
  }

  function csvButton(name, headers, rows) {
    return button('↓ Muat turun CSV', () => {
      const csv = [headers, ...rows].map((row) => row.map((value) => {
        const text = value === null || value === undefined ? '' : String(value);
        return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
      }).join(',')).join('\n');
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
      link.download = name;
      document.body.appendChild(link); link.click(); link.remove();
    }, 'toggle-button');
  }

  function fold(title, meta, body, status = '') {
    const summary = el('summary', null,
      meta?.number ? el('span', { class: 'fold-number' }, meta.number) : null,
      el('span', { class: 'fold-title' }, el('b', null, title), meta?.sub ? el('span', { class: 'fold-meta' }, meta.sub) : null),
      meta?.status ? el('span', { class: `fold-status ${status}` }, meta.status) : null);
    return el('details', { class: 'fold' }, summary, el('div', { class: 'fold-body' }, body));
  }

  function detail(label, value) { return el('div', { class: 'detail-block' }, el('div', { class: 'detail-label' }, label), typeof value === 'string' ? html('p', null, value) : value); }

  function footer() { return el('div', { class: 'footer-mark' }, el('span', null, 'Meneroka Laporan RCI Tabung Haji'), el('a', { class: 'back-top', href: '#top' }, 'Kembali ke atas ↑')); }

  function go(id) {
    const target = document.getElementById(id);
    if (!target) return;
    state.section = id;
    history.replaceState(null, '', `#${id}`);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMenu();
  }

  function showTip(event, markup) {
    tip.innerHTML = markup;
    tip.classList.add('on');
    moveTip(event);
  }
  function moveTip(event) {
    const pad = 14;
    const rect = tip.getBoundingClientRect();
    let left = event.clientX + pad;
    let top = event.clientY + pad;
    if (left + rect.width > window.innerWidth - 8) left = event.clientX - rect.width - pad;
    if (top + rect.height > window.innerHeight - 8) top = event.clientY - rect.height - pad;
    tip.style.transform = `translate(${Math.max(5, left)}px,${Math.max(5, top)}px)`;
  }
  function hideTip() { tip.classList.remove('on'); }

  const T = {};
  T.asasDeposit = D.bayaranHibah.map((b) => {
    const rate = D.kadarHibah.find((row) => row.tahun === b.tahun);
    return { tahun: b.tahun, asasRM: rate?.tahunan ? (b.tahunan / 1000) / (rate.tahunan / 100) : null, kadar: rate?.tahunan || null };
  });
  T.nisbahBayar = D.untungBersih.map((u) => {
    const balance = D.neraca.find((row) => row.tahun === u.tahun);
    return { tahun: u.tahun, untung: u.untung, agihan: balance?.agihan || null, nisbah: balance && u.untung ? balance.agihan / u.untung * 100 : null };
  });
  T.defisitKumulatif = (() => { let total = 0; return D.neraca.map((row) => { total += Math.min(0, row.lebihanPasca); return { tahun: row.tahun, kumulatif: total }; }); })();
  T.hartanahKps = D.hartanahUJSB.map((row) => ({ ...row, kpsPindahan: row.pindahan / row.kps, kpsPasaran: row.pasaran / row.kps, jatuhPct: (row.pasaran - row.pindahan) / row.pindahan * 100 }));
  T.bluechip = D.bluechip.map((row) => { const unit = row.jumlahPindahan / row.hargaPindahan; return { ...row, unit, jumlahJun22: unit * row.hargaJun22, jatuhJun22Pct: (row.hargaJun22 - row.hargaPindahan) / row.hargaPindahan * 100 }; });
  T.bluechipJun22 = T.bluechip.reduce((sum, row) => sum + row.jumlahJun22, 0);
  T.rofr = D.rofr.map((row) => ({ ...row, nilaiROFR: row.unit * row.hargaROFR, nilaiPasaran: row.unit * row.hargaPasaran, lebihan: row.unit * (row.hargaROFR - row.hargaPasaran) }));
  T.rofrLebihan = T.rofr.reduce((sum, row) => sum + row.lebihan, 0);
  T.rofrNilai = T.rofr.reduce((sum, row) => sum + row.nilaiROFR, 0);
  T.bonusOrang = (() => {
    const map = new Map();
    const add = (rows, key) => rows.forEach((row) => { const id = D.kunciNama[row.nama] || row.nama; if (!map.has(id)) map.set(id, { kunci: id, nama: row.nama, y2017: 0, y2018: 0 }); map.get(id)[key] = row.rm; });
    add(D.bonusTHProperties2017, 'y2017'); add(D.bonusTHPAustralia2018, 'y2018');
    return [...map.values()].map((row) => ({ ...row, jumlah: row.y2017 + row.y2018, skim: (row.y2017 ? 1 : 0) + (row.y2018 ? 1 : 0) })).sort((a, b) => b.jumlah - a.jumlah);
  })();
  T.hafisJemaah = [
    ...D.hafisSebenar.map((row) => ({ ...row, jenis: 'sebenar', jumlahJuta: row.jumlahJuta, jemaah: row.jumlahJuta * 1e6 / row.hafis })),
    ...D.hafisUnjuran.map((row) => ({ ...row, jenis: 'unjuran', jumlahJuta: row.jumlahRibu / 1000, jemaah: row.jumlahRibu * 1000 / row.hafis })),
  ];
  T.rugiRM = X.pelaburanBermasalah.filter((row) => row.rugiRM !== null);
  T.rugiJumlah = T.rugiRM.reduce((sum, row) => sum + row.rugiRM, 0);
  T.tanpaRM = X.pelaburanBermasalah.filter((row) => row.rugiRM === null);
  T.puncaPeta = [
    { tag: 'Janji beli balik (Put Option) tidak dapat dikuatkuasakan', no: [2, 3, 7] },
    { tag: 'Penilaian atau semakan bebas tidak dibuat', no: [1, 4, 5, 10] },
    { tag: 'Bergantung kepada satu rakan niaga atau penyewa', no: [6, 8] },
    { tag: 'Melabur di luar bidang kepakaran LTH', no: [4, 5, 12, 14] },
    { tag: 'Pemantauan lemah sehingga hilang jejak', no: [5, 9] },
    { tag: 'Konflik kepentingan atau mandat dilanggar', no: [11] },
    { tag: 'Saiz pelaburan terlalu tertumpu', no: [10, 14] },
    { tag: 'Penguatkuasaan rentas sempadan yang sukar', no: [1, 5, 8, 9] },
    { tag: 'Nilai pemindahan melebihi nilai pasaran', no: [13] },
  ];

  function renderSummary() {
    const node = section('ringkasan', '01', 'Gambaran besar', 'Ringkasan siasatan', 'Lapan angka yang menerangkan keseluruhan krisis. Klik mana-mana untuk terus ke analisis penuh di sebaliknya.');
    node.appendChild(reportNote('<b>Sebelum meneruskan.</b> Laporan ini menyiasat pengurusan dan operasi Lembaga Tabung Haji dari 2014 hingga 2020. Ia mengandungi penemuan, pandangan dan cadangan Suruhanjaya. Terdapat siasatan polis, SPRM dan kes mahkamah yang masih berjalan ketika laporan disiapkan — dashboard ini memaparkan status seperti dinyatakan dalam laporan pada Julai 2022, bukan status semasa. Penyebutan nama seseorang dalam laporan tidak bermakna orang itu bersalah.', 'warn'));
    node.appendChild(el('div', { class: 'evidence-grid' },
      metric('RM4.09b', 'Kekurangan aset berbanding liabiliti pada 2017, selepas agihan keuntungan dibuat', 'neraca', 'f', 'red'),
      metric('4 tahun', 'Berturut-turut agihan keuntungan dibayar walaupun neraca sudah defisit (2014–2017)', 'neraca', 'f'),
      metric('RM3.4b → −RM1.4b', 'Keuntungan 2017 yang dilaporkan, berbanding kerugian sebenar jika piawaian perakaunan dipatuhi', 'perakaunan', 'f', 'gold'),
      metric('RM10.2b', 'Premium melebihi nilai pasaran ketika aset dipindahkan kepada UJSB', 'ujsb', 't', 'red'),
      metric('RM1,313j → RM1j', 'Rosot nilai yang perlu diiktiraf 2017, sebelum dan selepas polisi diubah dua kali', 'perakaunan', 'f', 'gold'),
      metric(fmt.juta(T.rugiJumlah), `Jumlah kerugian yang dinyatakan dalam Ringgit merentas ${T.rugiRM.length} pelaburan bermasalah`, 'pelaburan', 't', 'red'),
      metric('56%', 'Bahagian kos haji yang ditanggung LTH menjelang 2019, naik daripada 38% pada 2014', 'hafis', 'f'),
      metric('RM88b', 'Jaminan Kerajaan kepada pendeposit yang perlu diaktifkan jika LTH gagal', 'ujsb', 'u', 'gold')));

    const storyPanel = panel('Apa sebenarnya berlaku — dalam lima ayat', null);
    const beats = [
      'Tabung Haji membayar agihan keuntungan yang tinggi kepada pendeposit dari 2014 hingga 2017. Masalahnya, wang untuk membayarnya tidak cukup — nilai aset sudah kurang daripada nilai liabiliti.',
      'Undang-undang (seksyen 22 Akta Tabung Haji 1995) hanya membenarkan agihan dibuat apabila aset melebihi liabiliti. Untuk menunjukkan aset mencukupi, pengurusan menggunakan kaedah penilaian aset yang berbeza daripada penyata kewangan beraudit, dan melonggarkan polisi mengiktiraf kejatuhan nilai pelaburan.',
      'Menjelang 2018, jurang itu sudah terlalu besar untuk ditutup. Kerajaan menubuhkan sebuah syarikat khas, Urusharta Jamaah, yang mengambil alih aset bermasalah pada harga jauh melebihi nilai pasarannya, dibayar dengan Sukuk yang perlu dilunaskan bertahun-tahun kemudian.',
      'Krisis Tabung Haji tidak hilang — ia bertukar bentuk menjadi obligasi yang kini tersenarai antara lima komitmen jaminan terbesar Kerajaan Persekutuan.',
      '<b>Suruhanjaya tidak mencadangkan Tabung Haji dipecahkan.</b> Ia berpendapat institusi itu perlu dikekalkan, tetapi cara ia ditadbir, diaudit dan melabur perlu diubah — dan mengemukakan 25 cadangan.',
    ];
    storyPanel.appendChild(el('div', { class: 'story-beats' }, beats.map((copy, index) => html('div', 'story-beat', `<span class="story-beat-number">0${index + 1}</span><p>${copy}</p>`))));
    storyPanel.appendChild(sourceRow(source(19, 'Ringkasan Eksekutif'), source(146, 'Analisa neraca'), source(229, 'Rumusan')));
    node.appendChild(storyPanel);

    const legendPanel = panel('Cara menggunakan dashboard ini', null);
    legendPanel.appendChild(el('div', { class: 'split-grid' },
      html('div', 'story-text', `<p><b>Setiap angka membawa labelnya sendiri.</b> Sebelum mempercayai mana-mana nombor, lihat labelnya:</p><div class="bar-legend" style="display:grid;gap:9px;justify-items:start"><span>${badge('f').outerHTML} disalin terus daripada laporan</span><span>${badge('t').outerHTML} dikira oleh dashboard, formula ditunjukkan</span><span>${badge('u').outerHTML} unjuran masa depan oleh laporan itu sendiri</span><span>${badge('s').outerHTML} hasil tetapan yang anda pilih — bukan kandungan laporan</span></div>`),
      html('div', 'story-text', '<p><b>Setiap carta boleh dijejak.</b></p><ul><li>Butang bertanda “Laporan ms ___” membuka laporan asal pada muka surat berkenaan.</li><li>Kotak “Apa ditunjuk / Jangan simpul” di bawah setiap carta menerangkan had tafsiran.</li><li>Perkataan bergaris putus-putus boleh dihurungkan tetikus untuk penjelasan bahasa mudah.</li><li>Jadual boleh dimuat turun sebagai CSV.</li></ul>')));
    node.appendChild(legendPanel);

    const reference = panel('Angka rujukan besar yang disebut laporan', 'Konteks skala institusi — berguna untuk menilai saiz setiap masalah di modul lain.');
    reference.appendChild(el('div', { class: 'evidence-grid' }, X.angkaBesar.map((row, index) => {
      const digits = row.nilai % 1 ? 2 : 0;
      const value = row.unit === 'RM bilion'
        ? `RM${fmt.n(row.nilai, digits)} bilion`
        : row.unit === 'juta orang'
          ? `${fmt.n(row.nilai, digits)} juta orang`
          : `${fmt.n(row.nilai, digits)}${row.unit}`;
      return metric(value, row.label, null, 'f', index % 3 === 0 ? 'gold' : '');
    })));
    node.appendChild(reference);
    return node;
  }

  function renderTimeline() {
    const node = section('masa', '02', 'Kronologi', 'Garis masa penuh', 'Susunan peristiwa dari penubuhan Tabung Haji hingga laporan Suruhanjaya diserahkan. Tapis mengikut tema untuk mengikuti satu jalan cerita sahaja — contohnya pilih “Perakaunan” dan “Audit” sahaja untuk melihat bagaimana isu akaun berkembang.');
    const topics = [...new Set(D.kronologi.map((row) => row.tema))];
    const active = new Set(topics);
    const list = el('div');
    const render = () => {
      list.innerHTML = '';
      const rows = D.kronologi.filter((row) => active.has(row.tema));
      if (!rows.length) { list.appendChild(el('div', { class: 'empty' }, 'Tiada peristiwa untuk tapisan ini.')); return; }
      const timeline = el('div', { class: 'timeline' });
      rows.forEach((row) => {
        const major = ['2014', '2016', '2017', '2018-12-07', '2018-12-27', '2022-07-19'].includes(row.tarikh);
        timeline.appendChild(el('div', { class: `timeline-entry${major ? ' major' : ''}` }, html('div', 'timeline-date', `${esc(fmt.tarikh(row.tarikh))}<span class="timeline-tag">${esc(row.tema)}</span>`), el('div', { class: 'timeline-copy' }, row.label), el('div', { class: 'source-row' }, source(row.ms))));
      });
      list.appendChild(timeline);
    };
    const filters = el('div', { class: 'control-row' }, topics.map((topic) => {
      const filter = button(topic, () => { active.has(topic) ? active.delete(topic) : active.add(topic); filter.classList.toggle('active'); render(); }, 'control-button active');
      return filter;
    }));
    render();
    node.appendChild(panel('Satu jalan cerita', 'Nyahpilih tema untuk mengasingkan satu jenis keputusan.', filters, list, readBox({
      tunjuk: 'Setiap peristiwa penting yang bertarikh dalam laporan, disusun mengikut masa.',
      penting: 'Urutan masa mendedahkan perkara yang tidak kelihatan dalam angka: keputusan Jemaah Menteri meluluskan pelan pemulihan dibuat pada <b>7 Disember 2018</b>, syarikat UJSB ditubuhkan <b>tujuh hari kemudian</b>, dan perjanjian pemindahan aset ditandatangani <b>13 hari selepas itu</b> — kesemuanya sebelum tahun 2018 berakhir.',
      simpul: 'Pelan pemulihan dilaksanakan dalam tempoh yang sangat singkat pada penghujung tahun 2018.',
      jangan: 'Garis masa ini tidak lengkap — ia hanya memuatkan peristiwa yang bertarikh dalam bahagian laporan yang tersedia untuk umum. Ekshibit laporan diklasifikasikan sebagai rahsia.',
    })));
    return node;
  }

  function renderNeraca() {
    const node = section('neraca', '03', 'Seksyen 22', 'Ujian aset lawan liabiliti', 'Wang tidak cukup. Carta ini memulakan cerita dengan soalan paling asas: adakah aset LTH melebihi wang yang perlu dipulangkan kepada pendeposit?');
    node.appendChild(el('div', { class: 'triple-grid' }, miniStat('−RM4.09b', 'Kedudukan 2017 selepas agihan', 'f', 'red'), miniStat('2014 → 2017', 'Empat tahun berturut-turut neraca berakhir defisit', 'f'), miniStat('RM70.3b', 'Jumlah aset 2017 sebelum RAV', 'f', 'gold')));
    let mode = 'neraca';
    let simulation = false;
    let method = 'undang';
    let factor = 100;
    let compounded = true;
    const chartHost = el('div');
    const simHost = el('div');
    const tableHost = el('div');
    function simRows() {
      let saved = 0;
      return D.neraca.map((row) => {
        const aset = compounded ? row.aset + saved : row.aset;
        const before = aset - row.liabiliti;
        const paid = method === 'undang' ? Math.max(0, Math.min(row.agihan, before)) : row.agihan * factor / 100;
        const after = before - paid;
        const savedNow = row.agihan - paid;
        saved += savedNow;
        return { ...row, asetSim: aset, praSim: before, agihSim: paid, pascaSim: after, jimat: savedNow };
      });
    }
    function drawChart() {
      chartHost.innerHTML = '';
      const data = simulation ? simRows() : D.neraca.map((row) => ({ ...row, praSim: row.lebihanPra, pascaSim: row.lebihanPasca }));
      if (mode === 'neraca') {
        chartHost.appendChild(dualChart(data.map((row) => ({ label: row.tahun, values: [row.aset, row.liabiliti], display: `${fmt.juta(row.aset)} / ${fmt.juta(row.liabiliti)}`, colors: ['var(--teal)', 'var(--gold)'] })), { max: Math.max(...D.neraca.flatMap((row) => [row.aset, row.liabiliti])) }));
      } else if (mode === 'jurang') {
        chartHost.appendChild(barChart(data.flatMap((row) => [
          { label: `${row.tahun} · sebelum agihan`, value: row.praSim, display: fmt.juta(row.praSim), color: row.praSim < 0 ? 'red' : '' },
          { label: `${row.tahun} · selepas agihan`, value: row.pascaSim, display: fmt.juta(row.pascaSim), color: row.pascaSim < 0 ? 'red' : 'gold' },
        ]), { max: 5000, caption: simulation ? 'Simulasi anda sedang digunakan pada carta ini.' : 'Nilai negatif menunjukkan kekurangan.' }));
      } else {
        chartHost.appendChild(svgLineChart(data.map((row) => String(row.tahun)), [{ name: 'Defisit terkumpul selepas agihan', values: (() => { let total = 0; return data.map((row) => { total += Math.min(0, row.pascaSim); return total; }); })(), color: 'var(--red)' }], { formatY: (value) => fmt.juta(value, 1), area: true, label: 'Defisit terkumpul selepas agihan' }));
      }
      chartHost.appendChild(el('div', { class: 'bar-legend' }, el('span', null, el('i', null), 'Jumlah aset'), el('span', null, el('i', { class: 'gold' }, null), 'Jumlah liabiliti'), el('span', null, el('i', { class: 'red' }, null), 'Nilai negatif = kekurangan')));
      if (simulation) {
        const rows = simRows();
        const last = rows[rows.length - 1];
        const saved = rows.reduce((sum, row) => sum + row.jimat, 0);
        simHost.innerHTML = '';
        simHost.appendChild(el('div', { class: 'triple-grid' }, miniStat(fmt.juta(last.pascaSim), 'Kedudukan 2017 selepas agihan, di bawah peraturan yang anda pilih', 's', last.pascaSim < 0 ? 'red' : ''), miniStat(fmt.juta(saved), 'Jumlah agihan yang tidak dibayar berbanding apa yang sebenarnya berlaku', 's'), miniStat(fmt.juta(D.neraca[D.neraca.length - 1].lebihanPasca), 'Kedudukan 2017 yang sebenarnya berlaku, mengikut laporan', 'f', 'red')));
      } else simHost.innerHTML = '';
    }
    const tableRows = () => table([
      { label: 'Tahun' }, { label: 'Jumlah aset', num: true }, { label: 'Jumlah liabiliti', num: true }, { label: 'Lebihan sebelum agihan', num: true }, { label: 'Agihan dibayar', num: true }, { label: 'Lebihan selepas agihan', num: true }, { label: 'Ujian seksyen 22' },
    ], D.neraca.map((row) => ({ cells: [row.tahun, fmt.n(row.aset), fmt.n(row.liabiliti), html('span', row.lebihanPra < 0 ? 'negative' : 'positive', fmt.n(row.lebihanPra)), `(${fmt.n(row.agihan)})`, html('span', row.lebihanPasca < 0 ? 'negative' : 'positive', fmt.n(row.lebihanPasca)), html('span', row.lebihanPra > 0 ? 'positive' : 'negative', row.lebihanPra > 0 ? 'Aset melebihi liabiliti' : 'Aset TIDAK melebihi liabiliti')] })), { csv: { name: 'rci-th-neraca.csv', headers: ['Tahun', 'Aset RM juta', 'Liabiliti RM juta', 'Lebihan sebelum agihan', 'Agihan', 'Lebihan selepas agihan'], rows: D.neraca.map((row) => [row.tahun, row.aset, row.liabiliti, row.lebihanPra, row.agihan, row.lebihanPasca]) }, source: 146 });
    function renderControls() {
      controls.innerHTML = '';
      controls.appendChild(controlGroup([{ id: 'neraca', label: 'Aset lawan liabiliti' }, { id: 'jurang', label: 'Jurang sebelum & selepas agihan' }, { id: 'kumulatif', label: 'Defisit terkumpul' }], mode, (value) => { mode = value; renderControls(); drawChart(); }));
      const simButton = button(simulation ? '● Simulasi hidup' : '○ Hidupkan simulasi', () => { simulation = !simulation; renderControls(); drawChart(); }, `toggle-button${simulation ? ' active' : ''}`);
      controls.appendChild(simButton);
      if (simulation) {
        controls.appendChild(controlGroup([{ id: 'undang', label: 'Ikut had undang-undang' }, { id: 'peratus', label: 'Kurangkan agihan secara berkadar' }], method, (value) => { method = value; renderControls(); drawChart(); }));
        if (method === 'peratus') controls.appendChild(el('div', { style: { flex: '1 1 220px' } }, el('label', { class: 'range-label' }, 'Bayar hanya ', el('b', null, `${factor}% daripada agihan`)), el('input', { type: 'range', min: 0, max: 100, step: 5, value: factor, oninput: (event) => { factor = +event.target.value; renderControls(); drawChart(); } })));
      }
    }
    const controls = el('div', { class: 'control-row' });
    renderControls();
    drawChart();
    node.appendChild(panel('Apa yang tinggal selepas agihan', 'Jumlah aset, jumlah liabiliti, dan jurang yang wujud sebelum dan selepas agihan keuntungan.', controls, chartHost, simHost, readBox({
      tunjuk: 'Aset dan liabiliti 2013–2017, kemudian kesan agihan keuntungan terhadap lebihan atau kekurangan.',
      penting: 'Pada 2016, buat pertama kali liabiliti melebihi aset sebelum sebarang agihan dibuat. Selepas agihan, defisit terkumpul bertambah setiap tahun sehingga RM4.09 bilion pada 2017.',
      simpul: 'Angka neraca menunjukkan mengapa seksyen 22 Akta 535 menjadi pusat siasatan.',
      jangan: 'Simulasi hanya memberi jawapan perakaunan. Ia tidak mengira semula pulangan pelaburan, kesan ke atas keyakinan pendeposit, atau kemungkinan pengeluaran deposit sekiranya agihan dikurangkan secara mendadak.',
    }), tableRows(), sourceRow(source(146, 'Sumber: analisa PwC, laporan ms 146'))));
    node.appendChild(panel('Semak peraturan dengan simulasi', 'Model ini membolehkan anda menguji apa yang berlaku jika agihan hanya dibuat setakat lebihan yang ada, atau dikurangkan secara berkadar.', reportNote('<b>Had simulasi ini.</b> Model ini hanya melaraskan nilai aset dengan jumlah yang tidak diagihkan. Ia <b>tidak</b> mengira semula pulangan pelaburan, kesan ke atas keyakinan pendeposit, atau kemungkinan pengeluaran deposit sekiranya agihan dikurangkan secara mendadak. Laporan sendiri menunjukkan bahawa apabila kadar diturunkan kepada 1.25% pada 2019, deposit menyusut daripada RM73 bilion kepada RM69 bilion.', 'warn')));
    return node;
  }

  function renderHibah() {
    const node = section('hibah', '04', 'Bayaran kepada pendeposit', 'Agihan keuntungan (hibah)', 'Berapa banyak dibayar kepada pendeposit setiap tahun, dan adakah ia berpadanan dengan keuntungan sebenar. Orang ramai sering menyebutnya “dividen Tabung Haji”; laporan menggunakan istilah agihan keuntungan.');
    let mode = 'kadar';
    const chartHost = el('div');
    const controls = el('div', { class: 'control-row' });
    function draw() {
      chartHost.innerHTML = '';
      if (mode === 'kadar') {
        const max = 9;
        chartHost.appendChild(dualChart(D.kadarHibah.map((row) => ({ label: row.tahun, values: [row.tahunan, row.haji], display: `${fmt.n(row.tahunan + row.haji, 2)}%`, colors: ['var(--teal)', 'var(--violet)'] })), { max }));
      } else if (mode === 'jumlah') {
        chartHost.appendChild(dualChart(D.bayaranHibah.map((row) => ({ label: row.tahun, values: [row.tahunan / 1000, row.haji ? row.haji / 1000 : 0], display: fmt.juta(row.jumlah / 1000), colors: ['var(--teal)', 'var(--violet)'] })), { max: 3600, kind: 'juta' }));
      } else {
        chartHost.appendChild(barChart(T.asasDeposit.filter((row) => row.asasRM).map((row) => ({ label: row.tahun, value: row.asasRM, display: fmt.juta(row.asasRM), color: 'gold' })), { max: 92000, caption: 'Anggaran asas deposit = agihan tahunan ÷ kadar tahunan. Titik biru dalam laporan disebut pada empat masa yang berbeza.' }));
        chartHost.appendChild(el('div', { class: 'bar-legend' }, el('span', null, el('i', { class: 'gold' }), 'Anggaran asas deposit (dikira)'), el('span', null, el('i', null), 'Angka deposit yang disebut dalam teks laporan')));
      }
    }
    function renderControls() { controls.innerHTML = ''; controls.appendChild(controlGroup([{ id: 'kadar', label: 'Kadar peratus' }, { id: 'jumlah', label: 'Jumlah Ringgit dibayar' }, { id: 'asas', label: 'Anggaran saiz deposit' }], mode, (value) => { mode = value; renderControls(); draw(); })); }
    renderControls(); draw();
    const ratios = T.nisbahBayar.filter((row) => row.nisbah);
    const ratioTable = table([{ label: 'Tahun' }, { label: 'Keuntungan bersih (RM juta)', num: true }, { label: 'Agihan dibayar (RM juta)', num: true }, { label: 'Bayaran sebagai % keuntungan', num: true }, { label: 'Maksud' }], ratios.map((row) => ({ cells: [row.tahun, fmt.n(row.untung), fmt.n(row.agihan), html('span', row.nisbah > 100 ? 'negative' : '', `${fmt.n(row.nisbah, 0)}%`), html('span', row.nisbah > 100 ? 'negative' : 'muted', row.nisbah > 100 ? 'Bayar lebih daripada untung tahun itu' : 'Bayar dalam lingkungan untung')] })));
    node.appendChild(panel('Berapa yang dibayar setiap tahun', 'Tiga cara melihat perkara yang sama — kadar peratus, jumlah Ringgit sebenar, dan saiz simpanan yang menerimanya.', controls, chartHost, el('div', { class: 'bar-legend' }, el('span', null, el('i', null), 'Agihan keuntungan tahunan'), el('span', null, el('i', { class: 'violet' }), 'Hibah haji (dihentikan selepas 2017)')), readBox({
      tunjuk: 'Kadar dan jumlah agihan keuntungan 2014–2021, berbanding keuntungan bersih tahun berkenaan.',
      penting: 'Kadar jatuh mendadak daripada 6.25% (2014) kepada 1.25% (2018) — penurunan lebih 80%. Ini bukan kejatuhan beransur-ansur, tetapi pemberhentian mengejut apabila kaedah perakaunan yang menyokong kadar tinggi tidak lagi boleh diteruskan.',
      simpul: 'Pada 2014, 2016 dan 2017, jumlah yang dibayar melebihi keuntungan bersih tahun berkenaan. Hibah haji tambahan dihentikan sepenuhnya selepas 2017 dan tidak pernah dikembalikan sehingga 2021.',
      jangan: 'Kadar peratus <b>tidak</b> boleh dibandingkan terus dengan kadar simpanan bank kerana asas pengiraan berbeza — laporan menyebut LTH menggunakan baki minima bulanan, bukan tahunan (ms 131). Anggaran saiz deposit pula ialah pengiraan dashboard yang mengandaikan kadar dikenakan sama rata ke atas keseluruhan simpanan.',
    }), sourceRow(source(120, 'Kadar: ms 120'), source(131, 'Jumlah: ms 131'), source(139, 'Keuntungan: ms 139'))));
    node.appendChild(panel('Adakah bayaran melebihi keuntungan?', null, ratioTable, reportNote('<b>Amaran padanan data.</b> Laporan memberi dua angka keuntungan 2017 yang berbeza: RM2,798 juta dalam jadual bonus (ms 139) dan RM3,412 juta dalam analisa PwC (ms 154). Jadual di atas menggunakan angka ms 139 kerana ia satu-satunya siri lengkap 2013–2017. Jika angka PwC digunakan, nisbah 2017 menjadi 97% dan bukan 119%. Laporan tidak menjelaskan perbezaan ini.', 'warn')));
    const deposits = panel('Apa berlaku apabila kadar diturunkan', null, el('div', { class: 'evidence-grid' }, X.depositDisebut.map((row) => metric(`RM${row.rm}b`, row.titik, null, 'f', row.rm === 69 ? 'red' : ''))), readBox({
      tunjuk: 'Jumlah deposit pada empat titik masa yang disebut dalam teks laporan.',
      penting: 'Selepas kadar 1.25% diumumkan, deposit menyusut RM4 bilion — terutamanya dalam kalangan pendeposit besar. Laporan menyatakan 75% daripada deposit dimiliki oleh hanya 5% pendeposit, jadi keputusan sekumpulan kecil orang boleh menggegarkan keseluruhan institusi.',
      simpul: 'Keyakinan pendeposit sensitif kepada kadar agihan, dan ia pulih semula selepas penstrukturan kewangan dijelaskan kepada umum — deposit meningkat kepada RM88 bilion menjelang 2022.',
      jangan: 'Ini bukan siri tahunan yang lengkap. Ia hanya empat titik yang kebetulan disebut dalam teks, jadi ia tidak boleh digunakan untuk mengira kadar pertumbuhan deposit.',
    }));
    node.appendChild(deposits);
    return node;
  }

  function waterfall(rows) { return el('div', { class: 'waterfall-list' }, rows.map((row, index) => el('div', { class: `waterfall-row ${row.nilai < 0 ? 'negative' : row.jenis === 'akhir' && row.nilai < 0 ? 'negative' : row.jenis === 'akhir' ? 'final' : row.nilai > 0 ? 'positive' : ''}` }, el('span', { class: 'waterfall-step' }, String(index + 1).padStart(2, '0')), html('div', 'waterfall-name', `<b>${esc(row.label)}</b><span class="small">Laporan ms ${row.ms}</span>`), el('span', { class: 'waterfall-value' }, fmt.juta(row.nilai))))); }

  function renderAccounting() {
    const node = section('perakaunan', '05', 'RAV, rosot nilai dan penyata semula', 'Cara akaun dibentuk', 'Modul sebelum ini menunjukkan wang tidak cukup. Modul ini menunjukkan <i>bagaimana</i> akaun tetap kelihatan cukup. Tiga keputusan perakaunan — cara aset dinilai, cara kejatuhan nilai diiktiraf, dan cara wang pendeposit dikelaskan — mengubah gambaran sepenuhnya.');
    const rav = panel('Keputusan 1: menggunakan nilai aset yang berbeza (RAV)', 'Penyata kewangan beraudit menunjukkan aset RM70,317 juta. Pengurusan menambah anggaran “nilai jika dijual” sebanyak RM4,466 juta. Hasilnya, kedudukan kekurangan bertukar menjadi baki positif RM373 juta.', waterfall(D.jambatanRAV), readBox({ tunjuk: 'Bagaimana nilai aset 2017 dinaikkan langkah demi langkah sehingga menjadi baki positif untuk diagihkan.', penting: 'Beza antara “lulus” dan “gagal” ujian undang-undang bagi tahun 2017 ialah satu keputusan penilaian bernilai RM4,466 juta yang tidak wujud dalam penyata kewangan beraudit.', simpul: 'Baki RM373 juta yang “membenarkan” agihan sepenuhnya bergantung kepada tambahan RAV. Tanpanya, angka itu ialah kekurangan RM769 juta. Suruhanjaya menyimpulkan RAV tidak boleh dijadikan asas pembayaran agihan.', jangan: 'Ini <b>tidak</b> bermakna aset itu tiada nilai. RAV ialah anggaran nilai jika aset dijual — ia mungkin munasabah sebagai maklumat pengurusan. Isunya ialah menggunakannya sebagai asas ujian undang-undang, bukan kewujudan nilai itu sendiri.' }), reportNote('<b>Perhatikan angka liabiliti.</b> Jadual RAV (ms 119) menyatakan liabiliti RM74,410 juta, sedangkan analisa neraca PwC (ms 146) menyatakan RM71,086 juta bagi tahun yang sama. Bezanya RM3,324 juta — tepat sama dengan jumlah agihan keuntungan 2017. <b>Tafsiran ini adalah oleh dashboard;</b> laporan sendiri tidak menjelaskannya.', 'warn'), sourceRow(source(119, 'Jadual RAV: ms 119'), source(146, 'Neraca PwC: ms 146'), source(20, 'Pandangan Suruhanjaya: ms 20')));
    const policyHost = el('div');
    let selectedPolicy = 3;
    const renderPolicy = () => {
      policyHost.innerHTML = '';
      policyHost.appendChild(controlRow(controlGroup(D.polisiRosotNilai.map((row, index) => ({ id: String(index + 1), label: `Polisi ${index + 1}: ${row.ketara}` })), String(selectedPolicy), (value) => { selectedPolicy = +value; renderPolicy(); })));
      const rows = D.polisiRosotNilai.map((row, index) => ({ label: `Polisi ${index + 1} · ${row.tempoh}`, value: row.kesan, display: fmt.juta(row.kesan), color: index + 1 === selectedPolicy ? 'red' : 'gold', title: `${row.ketara}; ${row.tempoh}` }));
      policyHost.appendChild(barChart(rows, { max: 1450 }));
      const selected = D.polisiRosotNilai[selectedPolicy - 1];
      const original = D.polisiRosotNilai[0].kesan;
      policyHost.appendChild(el('div', { class: 'triple-grid' }, miniStat(fmt.juta(selected.kesan), `Rosot nilai yang perlu diiktiraf di bawah polisi ${selectedPolicy}`, 'f', 'red'), miniStat(fmt.juta(original - selected.kesan), 'Kerugian yang “hilang” daripada akaun berbanding polisi asal', 't'), miniStat(`${fmt.n((1 - selected.kesan / original) * 100, 1)}%`, 'Pengurangan rosot nilai berbanding polisi asal', 't')));
    };
    renderPolicy();
    const policy = panel('Keputusan 2: melonggarkan takrif “kejatuhan nilai yang ketara”', 'Pelaburan yang jatuh nilai perlu diiktiraf sebagai kerugian. Polisi ini diubah dua kali dalam tahun 2017 yang sama. Pilih setiap polisi untuk melihat kesannya.', policyHost, readBox({ tunjuk: 'Jumlah kerugian yang perlu diiktiraf di bawah tiga takrif berbeza yang digunakan dalam tahun 2017.', penting: 'Polisi pertama memerlukan pelaburan jatuh lebih 70% dan kekal begitu lebih 24 bulan. Polisi terakhir hanya mengambil kira kejatuhan melebihi 90%, tanpa ujian tempoh langsung. Kesannya: rosot nilai jatuh daripada RM1,313 juta kepada RM1 juta — pengurangan 99.9%.', simpul: 'Perubahan takrif — bukan perubahan nilai pelaburan sebenar — menghapuskan hampir RM1.3 bilion kerugian daripada akaun 2017.', jangan: 'Jadual ini <b>tidak</b> menunjukkan bahawa pelaburan itu benar-benar rugi RM1,313 juta secara muktamad. Ia menunjukkan berapa banyak kerugian perlu dicatat dalam akaun tahun itu di bawah setiap takrif.' }), sourceRow(source(148, 'Jadual polisi: ms 148'), source(18, 'Teguran Ketua Audit Negara: ms 18')));
    const combined = panel('Kesan gabungan: keuntungan RM3.4 bilion menjadi kerugian RM1.4 bilion', 'Analisa PwC melaraskan keuntungan 2017 yang dilaporkan dengan rosot nilai dan pelarasan nilai saksama yang sepatutnya diambil kira di bawah piawaian perakaunan.', waterfall(D.jambatanUntung2017), html('h4', null, 'Kesan ke atas perolehan terkumpul'), html('p', 'panel-deck', 'Bukan sahaja tahun 2017 bertukar rugi — keseluruhan simpanan keuntungan terkumpul turut terhakis.'), waterfall(D.perolehanTertahan2017), readBox({ tunjuk: 'Keuntungan 2017 seperti direkod, ditolak setiap pelarasan yang dikenal pasti PwC, sehingga menjadi kerugian.', penting: 'Beza antara angka yang dilaporkan dan angka terlaras ialah RM4,845 juta. Ini bukan perbezaan pendapat kecil — ia perbezaan antara institusi yang untung dan institusi yang rugi.', simpul: 'Jika piawaian MFRS dipatuhi sepenuhnya, LTH sepatutnya merekod kerugian bersih RM1,433 juta bagi 2017 dan kerugian terkumpul RM4,683 juta, bukan perolehan tertahan positif RM162 juta.', jangan: 'Angka ini ialah <b>anggaran semakan</b> oleh PwC, bukan penyata kewangan yang telah diaudit semula dan diluluskan.' }), sourceRow(source(154, 'Analisa PwC: ms 154'), source(19, 'Ringkasan: ms 19'), source(149, 'Kesimpulan: ms 149')));
    const classification = panel('Keputusan 3: wang pendeposit dikelaskan sebagai ekuiti, bukan hutang', null, html('p', 'story-text', 'Suruhanjaya mendapati Kumpulan Wang Pendeposit dikelaskan sebagai <b>ekuiti</b> dalam penyata kewangan sejak 2010, sedangkan wang pendeposit ialah <b>liabiliti</b> — ia wang orang lain yang perlu dipulangkan.'), el('div', { class: 'split-grid' }, miniStat('Jika dikira sebagai ekuiti', 'Wang pendeposit menjadi sebahagian “milik” institusi. Nilai aset bersih kelihatan jauh lebih besar, dan ujian seksyen 22 lebih mudah dilepasi.', 't', 'red'), miniStat('Jika dikira sebagai liabiliti', 'Wang pendeposit ialah hutang yang perlu dibayar balik. Ini gambaran sebenar — dan ia yang menghasilkan jurang defisit.', 'f', 'gold')), reportNote('Suruhanjaya menyimpulkan pengelasan silap ini membolehkan agihan keuntungan diisytiharkan seolah-olah ia sah. Bersama RAV dan perubahan polisi rosot nilai, ketiga-tiga keputusan ini bekerja ke arah hasil yang sama: menjadikan neraca kelihatan cukup kuat untuk membenarkan bayaran.'), sourceRow(source(132, 'Laporan ms 132')));
    node.append(rav, policy, combined, classification);
    return node;
  }

  function renderUJSB() {
    const node = section('ujsb', '06', 'Pemindahan aset', 'Urusharta Jamaah (UJSB)', 'Pada penghujung 2018, aset bermasalah Tabung Haji dipindahkan kepada sebuah syarikat khas milik Kerajaan. Ini menutup jurang defisit dalam akaun LTH — tetapi memindahkan masalah itu, bukan menghapuskannya.');
    const transferRows = [];
    const shortClass = { 'Hartanah dan tanah': 'Hartanah & tanah', 'Syarikat perladangan': 'Perladangan', 'Ekuiti (tersenarai di Bursa Malaysia)': 'Ekuiti tersenarai' };
    D.pindahanAset.forEach((row) => {
      transferRows.push({ label: `${shortClass[row.kelas]} · Nilai buku`, value: row.nilaiBuku, display: fmt.juta(row.nilaiBuku), color: 'muted' });
      transferRows.push({ label: `${shortClass[row.kelas]} · Nilai pemindahan`, value: row.nilaiPindahan, display: fmt.juta(row.nilaiPindahan), color: 'gold' });
      transferRows.push({ label: `${shortClass[row.kelas]} · Nilai pasaran`, value: row.nilaiPasaran, display: fmt.juta(row.nilaiPasaran), color: '' });
    });
    const assetPanel = panel('Berapa aset itu benar-benar bernilai', 'Aset dipindahkan pada RM19.9 bilion. Nilai pasarannya ketika itu RM9.7 bilion. Perbezaan RM10.2 bilion inilah yang menutup jurang defisit LTH.', barChart(transferRows, { max: 18500 }), el('div', { class: 'bar-legend' }, el('span', null, el('i', { class: 'muted' }, null), 'Nilai buku LTH'), el('span', null, el('i', { class: 'gold' }, null), 'Nilai pemindahan'), el('span', null, el('i', null), 'Nilai pasaran ketika itu')), el('div', { class: 'triple-grid' }, miniStat(fmt.juta(D.pindahanJumlah.nilaiPindahan), 'Nilai pemindahan', 'f'), miniStat(fmt.juta(D.pindahanJumlah.nilaiPasaran), 'Nilai pasaran ketika itu', 'f'), miniStat(fmt.juta(D.pindahanJumlah.nilaiPindahan - D.pindahanJumlah.nilaiPasaran), 'Premium melebihi nilai pasaran', 't', 'red')), readBox({ tunjuk: 'Tiga penilaian berbeza bagi aset yang sama, mengikut kelas aset.', penting: 'Perhatikan hartanah dan tanah: nilai pemindahan RM2,247 juta melebihi kedua-dua nilai buku dan nilai pasaran yang sama-sama RM1,411 juta — premium 59%. Ekuiti pula dipindahkan hampir pada nilai buku (RM16,851 juta) sedangkan nilai pasarannya hanya RM7,600 juta.', simpul: 'Premium RM10.2 bilion bukan tersebar sama rata. Ia datang terutamanya daripada ekuiti tersenarai, iaitu aset yang harga pasarannya paling mudah disemak.', jangan: 'Premium ini bukan bermakna wang RM10.2 bilion hilang serta-merta. Ia bermakna UJSB perlu memulihkan nilai itu, atau Kerajaan perlu menanggung bezanya. Kesudahan sebenar bergantung kepada harga jualan aset pada masa hadapan.' }), sourceRow(source(159, 'Jadual kelas aset: ms 159'), source(25, 'Ringkasan Eksekutif: ms 25')));
    node.appendChild(assetPanel);

    const propertyRows = T.hartanahKps.map((row) => ({ label: row.jenis, values: [row.kpsPindahan, row.kpsPasaran], display: `RM${fmt.n(row.kpsPindahan)} / RM${fmt.n(row.kpsPasaran)} kps`, colors: ['var(--gold)', 'var(--teal)'] }));
    const propertySource = sourceRow(source(161, 'Laporan ms 161'), csvButton('rci-th-hartanah-ujsb.csv', ['Jenis', 'Keluasan kps', 'Nilai pemindahan RM', 'Nilai pasaran Dis 2021 RM', 'RM/kps pemindahan', 'RM/kps pasaran', 'Kejatuhan %'], T.hartanahKps.map((row) => [row.jenis, row.kps, row.pindahan, row.pasaran, row.kpsPindahan.toFixed(2), row.kpsPasaran.toFixed(2), row.jatuhPct.toFixed(1)])));
    node.appendChild(panel('Portfolio hartanah: harga seunit kaki persegi', 'Membahagikan nilai dengan keluasan mendedahkan berapa yang dibayar bagi setiap kaki persegi — cara paling telus untuk membandingkan hartanah yang berbeza saiz.', dualChart(propertyRows, { max: Math.max(...T.hartanahKps.map((row) => row.kpsPindahan)) }), el('div', { class: 'bar-legend' }, el('span', null, el('i', { class: 'gold' }, null), 'Harga pemindahan seunit kps'), el('span', null, el('i', null), 'Harga pasaran Dis 2021 seunit kps')), reportNote('Harga seunit kaki persegi <b>dikira oleh dashboard</b>, bukan diterbitkan dalam laporan. Ia juga tidak mengambil kira lokasi, umur bangunan atau kadar sewa — jadi ia berguna untuk perbandingan kasar, bukan penilaian hartanah.'), readBox({ tunjuk: 'Harga seunit kaki persegi pada nilai pemindahan berbanding nilai pasaran Disember 2021. Panjang garis merah menunjukkan saiz jurang.', penting: 'Hotel dan menara pejabat dipindahkan pada lebih RM2,000 sekaki persegi, dua kali ganda harga pasaran tiga tahun kemudian. Keseluruhan portfolio jatuh 46% — daripada RM2.25 bilion kepada RM1.20 bilion.', simpul: 'Setiap jenis hartanah tanpa kecuali bernilai kurang pada 2021 berbanding nilai pemindahannya.', jangan: 'Harga seunit kaki persegi berguna untuk perbandingan kasar, bukan penilaian hartanah.' }), propertySource));

    let stockMode = 'harga';
    const stockHost = el('div');
    const renderStocks = () => {
      stockHost.innerHTML = '';
      const labels = ['27 Dis 2018', '31 Dis 2018', '8 Jun 2022'];
      const series = T.bluechip.map((row, index) => ({ name: row.kaunter, color: ['#2b8c83', '#c84e39', '#bd842c', '#7662a7', '#b44972'][index], values: stockMode === 'harga' ? [row.hargaPindahan, row.hargaDis18, row.hargaJun22] : [row.jumlahPindahan / 1e6, row.jumlahDis18 / 1e6, row.jumlahJun22 / 1e6] }));
      stockHost.appendChild(controlRow(controlGroup([{ id: 'harga', label: 'Harga seunit (RM)' }, { id: 'nilai', label: 'Nilai portfolio (RM juta)' }], stockMode, (value) => { stockMode = value; renderStocks(); })));
      stockHost.appendChild(svgLineChart(labels, series, { formatY: (value) => stockMode === 'harga' ? `RM${fmt.n(value, 2)}` : fmt.n(value), formatValue: (value) => stockMode === 'harga' ? `RM${fmt.n(value, 2)}` : fmt.juta(value), showValues: true, label: 'Lima saham mewah pada tiga tarikh' }));
      stockHost.appendChild(el('div', { class: 'bar-caption' }, stockMode === 'nilai' ? 'Nilai pada 8 Jun 2022 dikira oleh dashboard: unit tersirat × harga hari itu. Unit tersirat = nilai pemindahan ÷ harga pemindahan.' : 'Harga pemindahan dan harga pasaran seperti dicetak dalam laporan.'));
    };
    renderStocks();
    node.appendChild(panel('Lima saham mewah: tiga tarikh, satu arah', 'Antara aset yang dipindahkan ialah lima saham mewah. Laporan memberi harganya pada tiga tarikh berbeza, membolehkan kita mengikuti perjalanan setiap kaunter.', stockHost, el('div', { class: 'triple-grid' }, miniStat(fmt.rm(D.bluechipJumlah.jumlahPindahan), 'Nilai pemindahan, 27 Disember 2018', 'f'), miniStat(fmt.rm(D.bluechipJumlah.jatuhRM), 'Kejatuhan nilai menjelang 31 Disember 2018 — dalam masa beberapa hari', 'f', 'red'), miniStat(fmt.rm(T.bluechipJun22 - D.bluechipJumlah.jumlahPindahan), 'Kejatuhan menjelang 8 Jun 2022, jika unit yang sama masih dipegang', 't', 'red')), readBox({ tunjuk: 'Harga setiap saham pada tarikh pemindahan, empat hari kemudian, dan tiga setengah tahun kemudian.', penting: 'Perjanjian pemindahan ditandatangani 27 Disember 2018. Menjelang 31 Disember 2018 — empat hari kemudian — nilai lima saham ini sudah jatuh RM946 juta.', simpul: 'Empat daripada lima kaunter masih jauh di bawah harga pemindahan pada Jun 2022.', jangan: 'Ini <b>bukan</b> ukuran prestasi pelaburan. Ia tidak mengambil kira dividen yang diterima, dan angka nilai portfolio Jun 2022 mengandaikan unit tidak berubah — andaian dashboard, bukan fakta laporan.' }), sourceRow(source(162, 'Laporan ms 162'))));

    const sukukRows = [
      ...D.sukuk.map((row) => ({ cells: [row.siri, fmt.juta(row.prinsipal), fmt.juta(row.nominal), `${row.tempohTahun} tahun`, `${fmt.n(row.ytm, 2)}% setahun`] })),
      { cells: ['Bayaran tunai', fmt.juta(300), '—', 'RM100 juta pada 30 Dis 2019, RM200 juta pada 30 Dis 2020', '—'] },
      { className: 'total', cells: ['Jumlah', fmt.juta(19900), fmt.juta(27500), '', ''] },
    ];
    let allocation = 1.73;
    const sukukSim = el('div');
    const drawSukukSim = () => {
      const nominal = D.sukuk.reduce((sum, row) => sum + row.nominal, 0) / 1000;
      const years = Math.ceil(nominal / allocation);
      sukukSim.innerHTML = '';
      sukukSim.appendChild(el('div', { class: 'range-label' }, 'Peruntukan Kerajaan setahun:', el('b', null, `RM${fmt.n(allocation, 2)} bilion`)));
      sukukSim.appendChild(el('input', { type: 'range', min: .5, max: 5, step: .05, value: allocation, oninput: (event) => { allocation = +event.target.value; drawSukukSim(); } }));
      sukukSim.appendChild(el('div', { class: 'triple-grid' }, miniStat(`RM${fmt.n(nominal, 1)}b`, 'Jumlah nilai nominal Sukuk yang perlu dilunaskan', 'f'), miniStat(`${years} tahun`, 'Tempoh diperlukan pada kadar peruntukan yang anda pilih', 's', years > 10 ? 'red' : ''), miniStat('7 & 10 tahun', 'Tempoh matang sebenar Sukuk Siri 1 dan Siri 2', 'f')));
      sukukSim.appendChild(reportNote(`Pada kadar RM${fmt.n(allocation, 2)} bilion setahun, peruntukan Kerajaan mengambil masa <b>${years} tahun</b> untuk menyamai nilai nominal Sukuk. Sukuk Siri 1 matang selepas 7 tahun dan Siri 2 selepas 10 tahun. ${years > 10 ? 'Ini bermakna peruntukan pada kadar ini <b>tidak mencukupi</b> untuk menepati tarikh matang.' : 'Pada kadar ini peruntukan mencukupi dalam tempoh matang.'}`, years > 10 ? 'warn' : ''));
    };
    drawSukukSim();
    node.appendChild(panel('Bayaran untuk aset itu: Sukuk berkupon sifar', 'LTH tidak menerima tunai. Ia menerima Sukuk — janji bertulis untuk dibayar bertahun-tahun kemudian — dan hanya RM300 juta tunai. Sukuk ini <b>berkupon sifar</b>: tiada bayaran tahunan langsung sehingga tarikh matang.', table([{ label: 'Instrumen' }, { label: 'Nilai langganan', num: true }, { label: 'Nilai nominal (dibayar ketika matang)', num: true }, { label: 'Tempoh' }, { label: 'Pulangan ketika matang' }], sukukRows), reportNote('<b>Semakan silang yang menenangkan.</b> Jumlah balasan (RM10 bilion + RM9.6 bilion + RM300 juta) menyamai tepat nilai pemindahan aset RM19.9 bilion. Dua angka daripada bahagian laporan yang berbeza padan sempurna.'), html('h4', null, 'Simulasi: berapa lama untuk melunaskannya?'), html('p', 'panel-deck', 'Jemaah Menteri bersetuju memperuntukkan kira-kira RM1.73 bilion setahun. Laraskan slider untuk menguji kadar lain.'), sukukSim, readBox({ tunjuk: 'Struktur pembayaran yang diterima LTH sebagai ganti asetnya, dan berapa lama peruntukan Kerajaan mengambil masa untuk melunaskannya.', penting: 'Kerana Sukuk berkupon sifar, hasil yang direkod LTH setiap tahun ialah pengakruan — nilai yang bertambah di atas kertas, bukan wang masuk.', simpul: 'Sebahagian besar “pendapatan” LTH selepas 2019 bergantung kepada janji bayaran masa depan daripada sebuah syarikat Kerajaan.', jangan: 'Simulasi ini hanya membahagikan nilai nominal dengan peruntukan tahunan. Ia tidak mengambil kira hasil pelupusan aset UJSB, penebusan awal, atau penstrukturan semula Sukuk.' }), sourceRow(source(25, 'Struktur Sukuk: ms 25'), source(26, 'Peruntukan Kerajaan: ms 26'))));

    const guarantees = D.jaminanKerajaan.slice().sort((a, b) => b.y2021 - a.y2021);
    node.appendChild(panel('Di manakah UJSB berdiri dalam risiko fiskal negara', 'Sukuk UJSB disenaraikan dalam Komitmen Jaminan Kerajaan Persekutuan — senarai hutang yang perlu ditanggung Kerajaan sekiranya entiti berkenaan gagal membayar.', barChart(guarantees.map((row) => ({ label: row.entiti, value: row.y2021, display: `${fmt.n(row.y2021)} · ${fmt.n(row.pct2021, 1)}%`, color: row.sorot ? 'red' : '' })), { max: 80000 }), readBox({ tunjuk: 'Semua entiti dalam senarai Komitmen Jaminan Kerajaan Persekutuan bagi 2021, disusun mengikut saiz. UJSB ditandakan merah.', penting: 'UJSB ialah komitmen jaminan keempat terbesar Kerajaan pada RM21.1 bilion, iaitu 11.1% daripada keseluruhan RM190.4 bilion — setara dengan projek infrastruktur besar negara.', simpul: 'Masalah kewangan Tabung Haji kini merupakan sebahagian daripada risiko fiskal negara, bukan lagi masalah sebuah badan berkanun sahaja.', jangan: 'Berada dalam senarai jaminan <b>tidak</b> bermakna Kerajaan sudah membelanjakan wang itu. Ia bermakna Kerajaan bertanggungjawab jika UJSB gagal membayar.' }), sourceRow(source(168, 'Jadual 5.3, laporan ms 168'))));

    const rofrTable = table([{ label: 'Syarikat' }, { label: 'Tarikh' }, { label: 'Unit saham', num: true }, { label: 'Harga tawaran', num: true }, { label: 'Harga pasaran', num: true }, { label: 'Premium', num: true }, { label: 'Kos lebihan jika dibeli', num: true }], T.rofr.map((row) => ({ cells: [row.syarikat, fmt.tarikh(row.tarikh), fmt.n(row.unit), fmt.n(row.hargaROFR, 3), fmt.n(row.hargaPasaran, 3), html('span', row.premium > 0 ? 'negative' : 'positive', `${fmt.n(row.premium, 1)}%`), html('span', row.lebihan > 0 ? 'negative' : 'positive', fmt.rm(row.lebihan))] })));
    const rofrSource = sourceRow(source(176, 'Laporan ms 176'), csvButton('rci-th-rofr.csv', ['Syarikat', 'Tarikh', 'Unit', 'Harga ROFR', 'Harga pasaran', 'Premium %', 'Kos lebihan RM'], T.rofr.map((row) => [row.syarikat, row.tarikh, row.unit, row.hargaROFR, row.hargaPasaran, row.premium, row.lebihan.toFixed(0)])));
    node.appendChild(panel('Hak Penolakan Pertama: tawaran membeli semula pada harga premium', 'Perjanjian ROFR memberi LTH hak keutamaan membeli semula aset sebelum UJSB menjualnya kepada pihak lain. Laporan mendapati tawaran ini dibuat pada harga lebih tinggi daripada harga pasaran terbuka.', rofrTable, el('div', { class: 'triple-grid' }, miniStat('9', 'Tawaran ROFR direkodkan dalam laporan', 'f'), miniStat(fmt.rm(T.rofrNilai), 'Jumlah nilai jika semua tawaran diterima', 't'), miniStat(fmt.rm(T.rofrLebihan), 'Kos lebihan berbanding membeli terus di pasaran terbuka', 't', 'red')), readBox({ tunjuk: 'Setiap tawaran ROFR yang direkodkan, harga tawaran berbanding harga pasaran pada hari yang sama, dan kos lebihannya.', penting: 'Tujuh daripada sembilan tawaran berharga lebih tinggi daripada pasaran. WZ Satu ditawarkan pada premium 40.6%.', simpul: 'Hak yang sepatutnya melindungi kepentingan LTH sebenarnya kurang berguna, kerana saham yang sama boleh dibeli lebih murah di pasaran terbuka.', jangan: 'Kos lebihan RM15 juta ialah <b>pengiraan dashboard</b> yang mengandaikan LTH menerima kesemua sembilan tawaran. Laporan tidak menyatakan berapa banyak tawaran yang benar-benar diterima.' }), rofrSource));
    return node;
  }

  function renderBonus() {
    const node = section('bonus', '07', 'Siapa dapat berapa', 'Bonus dan ganjaran', 'Bonus dibayar kepada kakitangan setiap tahun. Persoalan yang Suruhanjaya kemukakan bukan sama ada bonus patut dibayar, tetapi sama ada ia berpadanan dengan kedudukan kewangan sebenar institusi pada masa itu.');
    const trend = D.bonusKakitangan.map((row) => { const balance = D.neraca.find((item) => item.tahun === row.tahun); return { label: row.tahun, value: row.rm, display: `${fmt.juta(row.rm)} · ${row.maks} bulan`, color: balance && balance.lebihanPasca < 0 ? 'red' : '' }; });
    node.appendChild(panel('Bonus kakitangan berbanding kedudukan neraca', 'Batang merah menandakan tahun yang berakhir dengan aset kurang daripada liabiliti selepas agihan keuntungan dibuat.', barChart(trend, { max: 82 }), el('div', { class: 'bar-legend' }, el('span', null, el('i', { class: 'red' }, null), 'Bonus pada tahun neraca defisit'), el('span', null, el('i', null), 'Bonus pada tahun lain (atau tanpa data neraca)'), el('span', null, el('i', { class: 'gold' }, null), 'Jumlah bulan gaji maksimum')), readBox({ tunjuk: 'Peruntukan bonus kakitangan 2010–2020, dan bilangan bulan gaji tertinggi yang dibayar.', penting: 'Bonus memuncak pada RM74 juta dan sehingga 13 bulan gaji pada 2014 — tahun yang sama neraca mula berakhir defisit sebanyak RM352 juta. Selepas krisis didedahkan, bonus jatuh kepada satu bulan sahaja dari 2018 hingga 2020.', simpul: 'Bonus tertinggi dibayar dalam tempoh yang sama apabila kedudukan kewangan sebenar paling lemah.', jangan: 'Ini <b>tidak</b> bermakna kakitangan bersalah. Bonus diluluskan mengikut prosedur yang melibatkan Kementerian Kewangan. Isunya ialah asas keuntungan yang digunakan untuk mewajarkannya.' }), sourceRow(source(137, 'Jadual bonus: ms 137'), source(140, 'Kaitan dengan RAV: ms 140'))));
    const maxBonus = Math.max(...T.bonusOrang.map((row) => row.jumlah));
    const named = el('div', { class: 'bar-chart' });
    T.bonusOrang.forEach((row) => {
      const track = el('div', { class: 'dual-track' }, el('span', { class: 'first', style: { width: `${row.y2017 / maxBonus * 100}%`, background: 'var(--gold)' } }), el('span', { class: 'second', style: { width: `${row.y2018 / maxBonus * 100}%`, background: 'var(--violet)' } }));
      named.appendChild(el('div', { class: 'dual-line' }, el('span', { class: 'bar-label' }, row.nama.replace(/^(Datuk|Dato’|Dato'|Haji|Tan Sri)\s+/g, '')), track, el('span', { class: `dual-value ${row.skim === 2 ? 'negative' : ''}` }, fmt.rmTepat(row.jumlah))));
    });
    const both = T.bonusOrang.filter((row) => row.skim === 2).length;
    node.appendChild(panel('Bonus istimewa: menggabungkan dua senarai nama', 'Laporan mengandungi dua jadual berasingan — bonus TH Properties bagi 2017 dan bonus THP Australia Capital bagi 2018. Menggabungkan kedua-duanya mengikut nama mendedahkan sesuatu yang tidak kelihatan dalam mana-mana jadual secara berasingan.', named, el('div', { class: 'bar-legend' }, el('span', null, el('i', { class: 'gold' }, null), 'Bonus TH Properties 2017'), el('span', null, el('i', { class: 'violet' }, null), 'Bonus THP Australia Capital 2018')), el('div', { class: 'triple-grid' }, miniStat(String(both), 'Individu yang menerima bonus daripada kedua-dua skim', 't'), miniStat(fmt.rmTepat(T.bonusOrang.reduce((sum, row) => sum + row.jumlah, 0)), 'Jumlah kedua-dua skim yang digabungkan', 't'), miniStat(fmt.rmTepat(T.bonusOrang[0].jumlah), 'Jumlah tertinggi diterima oleh seorang individu', 't')), readBox({ tunjuk: 'Setiap individu yang dinamakan dalam kedua-dua jadual bonus istimewa, dengan jumlah gabungan.', penting: `Sepuluh daripada ${T.bonusOrang.length} individu muncul dalam kedua-dua senarai. Corak ini hanya kelihatan apabila dua jadual daripada muka surat berbeza digabungkan.`, simpul: 'Bonus istimewa ini bukan kejadian terpencil. Suruhanjaya mendapati kelulusan dibuat oleh badan yang tidak mempunyai mandat dan mengesyorkan bonus itu dituntut semula.', jangan: 'Senarai ini <b>tidak</b> menunjukkan sesiapa telah disabitkan kesalahan. Padanan nama merentas dua jadual dibuat oleh dashboard kerana gelaran yang digunakan sedikit berbeza antara kedua-duanya.' }), reportNote('<b>Nota bacaan data.</b> Lajur “Bil.” dalam jadual asal TH Properties (ms 142) melompat daripada 4 kepada 8. Namun 11 baris yang tersenarai berjumlah tepat RM1,148,400 seperti dicetak dalam laporan — jadi tiada penerima yang hilang; lompatan itu hanyalah masalah pembacaan teks daripada PDF.'), sourceRow(source(142, 'TH Properties 2017: ms 142'), source(143, 'THP Australia 2018: ms 143'), source(144, 'Pandangan Suruhanjaya: ms 144'), csvButton('rci-th-bonus-nama.csv', ['Nama', 'TH Properties 2017 RM', 'THP Australia 2018 RM', 'Jumlah RM'], T.bonusOrang.map((row) => [row.nama, row.y2017, row.y2018, row.jumlah])))));
    node.appendChild(panel('Bagaimana bonus diagihkan mengikut prestasi', 'Jadual laporan bagi 2014 dan 2015 menunjukkan hubungan antara gred prestasi dan bilangan bulan gaji.', table([{ label: 'Gred prestasi' }, { label: '% kakitangan', num: true }, { label: 'Bulan gaji 2014' }, { label: 'Bulan gaji 2015' }], D.gredPrestasi.map((row) => ({ cells: [row.gred, `${row.peratusKakitangan}%`, row.y2014, row.y2015] }))), reportNote('Kakitangan gred terendah pun menerima sekurang-kurangnya satu bulan bonus, manakala gred tertinggi menerima sehingga 11 bulan pada 2014. Enam puluh peratus kakitangan berada dalam gred C.'), sourceRow(source(138, 'Laporan ms 138'))));
    return node;
  }

  function renderInvestments() {
    const node = section('pelaburan', '08', 'Apa yang rugi', '14 pelaburan bermasalah', 'Suruhanjaya menyenaraikan 14 pelaburan yang disyorkan menjalani audit forensik — pemeriksaan mendalam terhadap bagaimana keputusan pelaburan itu dibuat. Modul ini menyusun setiap satunya, saiz kerugiannya, dan corak yang berulang.');
    const lossRows = T.rugiRM.slice().sort((a, b) => b.rugiRM - a.rugiRM).map((row) => ({ label: row.ringkas, value: row.rugiRM, display: fmt.juta(row.rugiRM), color: row.rugiRM > 500 ? 'red' : 'gold', onClick: () => { const target = document.getElementById(`investment-${row.no}`); if (target) { target.open = true; target.scrollIntoView({ behavior: 'smooth', block: 'center' }); } } }));
    node.appendChild(panel('Saiz kerugian yang dinyatakan dalam Ringgit', 'Klik mana-mana batang untuk terus ke butiran penuh pelaburan berkenaan.', barChart(lossRows, { max: Math.max(...T.rugiRM.map((row) => row.rugiRM)) }), el('div', { class: 'triple-grid' }, miniStat(fmt.juta(T.rugiJumlah), `Jumlah kerugian merentas ${T.rugiRM.length} pelaburan yang mempunyai angka Ringgit`, 't', 'red'), miniStat(fmt.juta(X.pelaburanBermasalah.find((row) => row.no === 14).rugiRM), `Kerugian tunggal terbesar: FGV — ${fmt.n(X.pelaburanBermasalah.find((row) => row.no === 14).rugiRM / T.rugiJumlah * 100, 0)}% daripada keseluruhan`, 'f', 'red'), miniStat(String(T.tanpaRM.length), 'Pelaburan tanpa angka kerugian dalam Ringgit — jumlah sebenar lebih tinggi', 'f', 'gold')), readBox({ tunjuk: 'Kerugian atau rosot nilai bagi setiap pelaburan yang laporannya memberikan angka dalam Ringgit.', penting: 'Kerugian tidak tersebar sama rata. FGV seorang diri menyumbang lebih separuh daripada jumlah keseluruhan.', simpul: 'Satu keputusan pelaburan tunggal yang besar memberi kesan lebih besar daripada gabungan sepuluh keputusan yang lebih kecil.', jangan: `Jumlah RM${fmt.n(T.rugiJumlah)} juta <b>bukan</b> jumlah kerugian keseluruhan Tabung Haji. Ia hanya merangkumi ${T.rugiRM.length} daripada 14 pelaburan ini. THIP dinyatakan dalam Dolar Amerika dan Al-Rawda dalam Riyal Saudi; laporan tidak memberi kadar tukaran.` })));

    const patternRows = T.puncaPeta.slice().sort((a, b) => b.no.length - a.no.length).map((row) => ({ label: row.tag, value: row.no.length, display: `${row.no.length} pelaburan`, color: 'gold', title: row.no.map((number) => X.pelaburanBermasalah.find((item) => item.no === number)?.ringkas).join(', ') }));
    node.appendChild(panel('Corak yang berulang: punca kegagalan merentas 14 pelaburan', 'Setiap pelaburan gagal atas sebabnya sendiri — tetapi sebab-sebab itu berulang. Carta ini mengira berapa banyak pelaburan berkongsi setiap kelemahan proses.', barChart(patternRows, { max: 5 }), readBox({ tunjuk: 'Bilangan pelaburan yang berkongsi setiap jenis kelemahan proses.', penting: 'Empat pelaburan gagal kerana penilaian bebas tidak dibuat, dan empat lagi kerana LTH melabur di luar bidang kepakarannya. Tiga pelaburan — Emrail, Wellspring dan Putrajaya Perdana — gagal dengan corak yang hampir sama: pulangan dijanjikan melalui penyenaraian atau janji beli balik yang akhirnya tidak dapat dikuatkuasakan.', simpul: 'Kelemahan yang sama berulang dalam pelaburan berbeza sepanjang bertahun-tahun, yang menunjukkan masalah pada proses membuat keputusan, bukan pada nasib.', jangan: '<b>Pengelasan ini dibuat oleh dashboard</b>, bukan oleh laporan. Laporan menerangkan setiap kes secara berasingan tanpa mengumpulkannya kepada kategori — semak butiran setiap kes di bawah untuk menilai sendiri.' }), sourceRow(source(176, 'Proses membuat keputusan: ms 176'))));

    let category = 'semua';
    let query = '';
    const filterHost = el('div');
    const listHost = el('div');
    const categories = ['semua', ...new Set(X.pelaburanBermasalah.map((row) => row.kategori))];
    const renderList = () => {
      listHost.innerHTML = '';
      const needle = query.trim().toLowerCase();
      const rows = X.pelaburanBermasalah.filter((row) => (category === 'semua' || row.kategori === category) && (!needle || `${row.nama} ${row.apaJadi} ${row.punca} ${row.lokasi} ${row.tindakan || ''}`.toLowerCase().includes(needle)));
      if (!rows.length) { listHost.appendChild(el('div', { class: 'empty' }, 'Tiada pelaburan sepadan dengan tapisan ini.')); return; }
      rows.forEach((row) => {
        const details = [detail('Apa yang berlaku', row.apaJadi), detail('Punca yang dikenal pasti', row.punca), detail('Kelemahan proses', el('div', { class: 'tag-list' }, row.kelemahan.map((tag) => el('span', { class: 'tag' }, tag))))];
        if (row.tindakan) details.push(detail('Tindakan diambil', row.tindakan));
        if (row.rugiNota || row.pelaburanNota) details.push(reportNote(`<b>Nota angka.</b> ${esc(row.rugiNota || '')} ${esc(row.pelaburanNota || '')}`, 'warn'));
        details.push(sourceRow(source(row.ms), badge('f')));
        listHost.appendChild(fold(row.nama, { number: String(row.no).padStart(2, '0'), sub: `${row.kategori} · ${row.lokasi}${row.tahun ? ` · bermula ${row.tahun}` : ''}`, status: row.rugiRM !== null ? fmt.juta(row.rugiRM) : (row.mataWangLain || 'tiada angka RM') }, details, row.rugiRM !== null ? 'red' : ''));
      });
    };
    const renderFilters = () => {
      filterHost.innerHTML = '';
      const input = el('input', { class: 'filter-input', type: 'search', placeholder: 'Cari nama, negara atau punca…', value: query, oninput: (event) => { query = event.target.value; renderList(); } });
      filterHost.appendChild(controlRow(input, ...categories.map((item) => button(item === 'semua' ? 'Semua kategori' : item, () => { category = item; renderFilters(); renderList(); }, `control-button${item === category ? ' active' : ''}`))));
    };
    renderFilters(); renderList();
    node.appendChild(panel('Butiran setiap pelaburan', 'Cari atau tapis, kemudian buka mana-mana untuk membaca kisah penuh berserta rujukan muka surat.', filterHost, listHost));
    return node;
  }

  function renderActions() {
    const node = section('tindakan', '09', 'Polis, SPRM, mahkamah', 'Tindakan undang-undang', 'Laporan merekodkan tindakan yang telah diambil terhadap perkara-perkara yang dibangkitkan. Status di bawah ialah status <b>pada Julai 2022</b> ketika laporan disiapkan, bukan status semasa.');
    node.appendChild(reportNote('<b>Baca dengan berhati-hati.</b> Laporan polis atau aduan bermakna sesuatu perkara <i>dilaporkan</i> untuk disiasat. Ia tidak bermakna sesiapa telah didakwa atau disabitkan kesalahan. Beberapa perkara masih dalam siasatan ketika laporan disiapkan. Suruhanjaya sendiri mencadangkan supaya pihak berkuasa mengambil tindakan tegas dan segera ke atas setiap laporan.', 'warn'));
    const types = [...new Set(X.tindakan.map((row) => row.jenis))];
    const count = (type) => type === 'semua' ? X.tindakan.length : X.tindakan.filter((row) => row.jenis === type).length;
    node.appendChild(el('div', { class: 'evidence-grid' }, types.map((type, index) => metric(String(count(type)), type, null, 'f', index % 2 ? 'red' : 'gold'))));
    let selected = 'semua';
    const host = el('div');
    const render = () => {
      host.innerHTML = '';
      const rows = X.tindakan.filter((row) => selected === 'semua' || row.jenis === selected).slice().sort((a, b) => (b.tarikh || '').localeCompare(a.tarikh || ''));
      host.appendChild(table([{ label: 'Jenis' }, { label: 'Perkara' }, { label: 'Tarikh' }, { label: 'Status ketika laporan disiapkan' }, { label: 'Sumber' }], rows.map((row) => ({ cells: [el('span', { class: 'tag' }, row.jenis), row.perkara, row.tarikh ? fmt.tarikh(row.tarikh) : 'tidak dinyatakan', row.status, source(row.ms)] }))));
    };
    const filters = el('div', { class: 'control-row' }, button(`Semua (${count('semua')})`, () => { selected = 'semua'; renderFilters(); render(); }, 'control-button active'));
    function renderFilters() { filters.innerHTML = ''; ['semua', ...types].forEach((type) => filters.appendChild(button(`${type === 'semua' ? 'Semua' : type} (${count(type)})`, () => { selected = type; renderFilters(); render(); }, `control-button${selected === type ? ' active' : ''}`))); }
    renderFilters(); render();
    node.appendChild(panel('Semua tindakan yang direkodkan', 'Tapis mengikut jenis di bawah.', filters, host, readBox({ tunjuk: 'Setiap laporan polis, tindakan tatatertib, laporan SPRM, kes mahkamah dan timbang tara yang disebut dalam laporan.', penting: 'Perhatikan corak keputusan tatatertib: dalam tiga daripada empat kluster, hukuman asal buang kerja atau turun pangkat dikurangkan selepas rayuan. Suruhanjaya mengesyorkan proses tatatertib diperkemas supaya dilihat berkesan, cekap, adil dan telus.', simpul: 'Kebanyakan siasatan masih berjalan ketika laporan disiapkan pada Julai 2022. Dua kes berkaitan Indonesia tergendala kerana memerlukan kebenaran pihak berkuasa negara berkenaan.', jangan: 'Jadual ini <b>tidak</b> menunjukkan keputusan akhir mana-mana kes. Ia juga tidak lengkap — ekshibit laporan yang mengandungi butiran penuh diklasifikasikan sebagai rahsia.' })));
    return node;
  }

  function renderHafis() {
    const node = section('hafis', '10', 'Kos lawan bayaran', 'Subsidi haji (HAFIS)', 'Setiap jemaah haji membayar kurang daripada kos sebenar. Bezanya ditanggung Tabung Haji melalui skim HAFIS, yang diambil daripada keuntungan pelaburan — wang yang sama yang sepatutnya diagihkan kepada pendeposit.');
    let mode = 'seorang';
    const chartHost = el('div');
    const controls = el('div', { class: 'control-row' });
    const all = T.hafisJemaah;
    function draw() {
      chartHost.innerHTML = '';
      if (mode === 'seorang') {
        chartHost.appendChild(dualChart(all.map((row) => ({ label: `${row.tahun}${row.jenis === 'unjuran' ? ' · unjuran' : ''}`, values: [row.bayaran, row.hafis], display: `RM${fmt.n(row.bayaran)} / RM${fmt.n(row.hafis)}`, colors: ['var(--teal)', 'var(--red)'] })), { max: 40000 }));
      } else if (mode === 'bahagian') {
        chartHost.appendChild(dualChart(all.map((row) => ({ label: `${row.tahun}${row.jenis === 'unjuran' ? ' · unjuran' : ''}`, values: [100 - row.hafis / row.kos * 100, row.hafis / row.kos * 100], display: `${fmt.n(row.hafis / row.kos * 100, 1)}% ditanggung LTH`, colors: ['var(--teal)', 'var(--red)'] })), { max: 100 }));
      } else {
        chartHost.appendChild(barChart(all.map((row) => ({ label: `${row.tahun}${row.jenis === 'unjuran' ? ' · unjuran' : ''}`, value: row.jumlahJuta, display: fmt.juta(row.jumlahJuta), color: row.jenis === 'unjuran' ? 'violet' : 'red' })), { max: Math.max(...all.map((row) => row.jumlahJuta)) }));
      }
    }
    function renderControls() { controls.innerHTML = ''; controls.appendChild(controlGroup([{ id: 'seorang', label: 'Kos seorang jemaah' }, { id: 'bahagian', label: 'Siapa tanggung berapa (%)' }, { id: 'jumlah', label: 'Jumlah setahun' }], mode, (value) => { mode = value; renderControls(); draw(); })); }
    renderControls(); draw();
    const jemaahTable = table([{ label: 'Tahun' }, { label: 'Jenis' }, { label: 'Kos haji (RM)', num: true }, { label: 'Bayaran jemaah (RM)', num: true }, { label: 'Subsidi seorang (RM)', num: true }, { label: 'Jumlah setahun (RM juta)', num: true }, { label: 'Jemaah tersirat', num: true }], all.map((row) => ({ cells: [row.tahun, el('span', { class: 'tag' }, row.jenis === 'unjuran' ? 'Unjuran laporan' : 'Data sebenar'), fmt.n(row.kos), fmt.n(row.bayaran), fmt.n(row.hafis), fmt.n(row.jumlahJuta, 1), fmt.n(row.jemaah)] })));
    const unjured = all.filter((row) => row.jenis === 'unjuran').map((row) => Math.round(row.jemaah));
    const actual = all.filter((row) => row.jenis === 'sebenar').map((row) => Math.round(row.jemaah));
    node.appendChild(panel('Jurang antara kos sebenar dan bayaran jemaah', 'Tiga cara melihat jurang yang sama. Bar lebih pudar selepas 2022 ialah unjuran laporan, bukan data sebenar.', controls, chartHost, el('div', { class: 'bar-legend' }, el('span', null, el('i', null), 'Dibayar jemaah'), el('span', null, el('i', { class: 'red' }, null), 'Ditanggung LTH (HAFIS)'), el('span', null, el('i', { class: 'violet' }, null), 'Unjuran laporan')), readBox({ tunjuk: 'Kos haji sebenar seorang jemaah, berapa yang dibayar jemaah, dan berapa yang ditanggung Tabung Haji, dari 2014 hingga unjuran 2030.', penting: 'Bayaran jemaah dibekukan pada RM9,980 selama enam tahun (2014–2019) sedangkan kos naik daripada RM16,155 kepada RM22,900. Bahagian yang ditanggung LTH melonjak daripada 38% kepada 56%.', simpul: 'Subsidi bertambah kerana bayaran tidak dinaikkan sementara kos terus naik. Mengikut unjuran, bahagian LTH naik semula melepasi 65% menjelang 2030 jika bayaran kekal.', jangan: 'Angka selepas 2022 ialah <b>unjuran laporan</b>, bukan data sebenar. Unjuran ini mengandaikan kos meningkat pada kadar tertentu dan bayaran kekal RM12,980.' }), sourceRow(source(199, 'Data sebenar: ms 199'), source(200, 'Unjuran: ms 200'), source(23, 'Latar belakang: ms 23'))));
    node.appendChild(panel('Membongkar andaian di sebalik unjuran laporan', 'Laporan memberi subsidi seorang jemaah dan jumlah setahun, tetapi tidak menyatakan berapa ramai jemaah diandaikan. Membahagikan satu dengan yang lain mendedahkannya.', reportNote(`<b>Penemuan.</b> Membahagikan jumlah subsidi tahunan dengan subsidi seorang jemaah memberi <b>tepat ${fmt.n(unjured[0])} jemaah</b> bagi <b>setiap</b> tahun dari 2022 hingga 2030 — tanpa sebarang perubahan. Ini bermakna unjuran laporan ialah model kenaikan harga semata-mata: ia mengandaikan bilangan jemaah kekal malar sepanjang sembilan tahun. Angka sebenar 2014–2019 pula berubah-ubah antara kira-kira ${fmt.n(Math.min(...actual))} dan ${fmt.n(Math.max(...actual))} jemaah.`), jemaahTable, readBox({ tunjuk: 'Setiap tahun dengan bilangan jemaah yang tersirat daripada angka laporan sendiri.', penting: 'Bilangan jemaah tersirat melonjak daripada kira-kira 18,000 (2016) kepada 31,000 (2017) — kenaikan 73% dalam setahun. Laporan tidak menjelaskan lonjakan ini.', simpul: 'Unjuran 2022–2030 ialah model harga, bukan model permintaan. Ia berguna untuk menunjukkan kesan kenaikan kos, tetapi tidak mengambil kira perubahan kuota haji atau bilangan jemaah.', jangan: 'Bilangan jemaah ini <b>dikira oleh dashboard</b>, bukan diterbitkan dalam laporan. Ia mengandaikan setiap jemaah menerima subsidi penuh yang sama.' })));

    let simBayar = 12980;
    let simJemaah = 30000;
    const simHost = el('div');
    const renderSimulation = () => {
      simHost.innerHTML = '';
      const controls = el('div', { class: 'split-grid' },
        el('label', null, el('span', { class: 'range-label' }, 'Bayaran setiap jemaah:', el('b', null, `RM${fmt.n(simBayar)}`)), el('input', { type: 'range', min: 9980, max: 30000, step: 500, value: simBayar, oninput: (event) => { simBayar = +event.target.value; renderSimulation(); } })),
        el('label', null, el('span', { class: 'range-label' }, 'Bilangan jemaah setahun:', el('b', null, fmt.n(simJemaah))), el('input', { type: 'range', min: 10000, max: 60000, step: 1000, value: simJemaah, oninput: (event) => { simJemaah = +event.target.value; renderSimulation(); } })));
      simHost.appendChild(controls);
      const simRows = D.hafisUnjuran.map((row) => { const subsidy = Math.max(0, row.kos - simBayar); return { ...row, subsidi: subsidy, jumlah: subsidy * simJemaah / 1e6, pct: subsidy / row.kos * 100 }; });
      const original = D.hafisUnjuran.map((row) => row.jumlahRibu / 1000);
      const simChart = barChart(simRows.map((row) => ({ label: String(row.tahun), value: row.jumlah, display: fmt.juta(row.jumlah), color: 'pink' })), { max: Math.max(...simRows.map((row) => row.jumlah), ...original), caption: 'Simulasi anda' });
      const reportChart = barChart(original.map((value, index) => ({ label: String(D.hafisUnjuran[index].tahun), value, display: fmt.juta(value), color: 'violet' })), { max: Math.max(...simRows.map((row) => row.jumlah), ...original), caption: 'Unjuran laporan' });
      simHost.appendChild(el('div', { class: 'split-grid' }, simChart, reportChart));
      const last = simRows[simRows.length - 1];
      simHost.appendChild(el('div', { class: 'triple-grid' }, miniStat(fmt.juta(original[original.length - 1]), 'Beban subsidi 2030 mengikut unjuran laporan', 'u'), miniStat(fmt.juta(last.jumlah), 'Beban subsidi 2030 mengikut tetapan anda', 's', 'red'), miniStat(`${fmt.n(last.pct, 1)}%`, 'Bahagian kos haji yang ditanggung LTH pada 2030', 's', last.pct > 50 ? 'red' : '')));
    };
    renderSimulation();
    node.appendChild(panel('Simulasi: apa jadi jika bayaran atau bilangan jemaah berubah?', 'Gunakan slider untuk menguji dasar berbeza terhadap unjuran kos haji laporan. Kos haji setiap tahun kekal mengikut unjuran laporan; hanya bayaran dan bilangan jemaah yang anda ubah.', simHost, reportNote('<b>Had simulasi.</b> Model ini hanya mendarab subsidi seorang dengan bilangan jemaah. Ia tidak mengambil kira kesan kenaikan bayaran terhadap bilangan orang yang mampu menunaikan haji, cadangan Suruhanjaya supaya bantuan hanya diberi kepada yang memerlukan, atau kadar bayaran dua lapisan B40 dan bukan B40 yang diperkenalkan pada 2022.', 'warn'), sourceRow(source(200, 'Asas unjuran: ms 200'), source(24, 'Anggaran RM742 juta menjelang 2030: ms 24'))));
    node.appendChild(panel('Kaitan dengan pendeposit', null, html('p', 'story-text', 'Laporan menyatakan Tabung Haji memerlukan dana <b>sekurang-kurangnya RM60 bilion</b> untuk menampung HAFIS pada tahap semasa. Apabila kos subsidi meningkat, dana yang lebih besar diperlukan — dan kebergantungan kepada pendeposit besar bertambah. Inilah gelung yang mengaitkan modul ini dengan modul agihan keuntungan: setiap Ringgit subsidi haji ialah satu Ringgit yang tidak diagihkan kepada pendeposit.'), el('div', { class: 'triple-grid' }, metric('RM60b', 'Dana minimum diperlukan untuk menampung HAFIS', 'hibah', 'f'), metric('RM2.02b', 'Jumlah subsidi HAFIS sejak 2001', null, 'f'), metric('130 → 33', 'Tahun menunggu giliran haji jika deposit pendaftaran dinaikkan kepada RM12,980', 'penemuan', 'f', 'gold')), sourceRow(source(24, 'Laporan ms 24'), source(236, 'Cadangan: ms 236'))));
    return node;
  }

  function renderFindings() {
    const node = section('penemuan', '11', 'Rujukan lengkap', 'Penemuan, cadangan dan rumusan', 'Semua penemuan utama Suruhanjaya, 25 cadangannya, penambahbaikan yang telah dilaksanakan Tabung Haji, dan rumusan akhir Bab Empat. Setiap satu membawa rujukan muka surat.');
    const themeCounts = [...new Set(X.penemuan.map((row) => row.tema))].map((tema) => ({ tema, count: X.penemuan.filter((row) => row.tema === tema).length })).sort((a, b) => b.count - a.count);
    const maxCount = Math.max(...themeCounts.map((row) => row.count));
    node.appendChild(panel('Di mana masalahnya tertumpu', 'Bilangan penemuan mengikut tema. Pilih tema untuk menapis senarai di bawah.', el('div', { class: 'theme-list' }, themeCounts.map((row) => el('button', { class: 'theme-row', type: 'button', onclick: () => { selectedTheme = row.tema; activeType = 'penemuan'; renderControls(); renderList(); document.getElementById('finding-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }, el('span', { class: 'theme-label' }, row.tema), el('span', { class: 'theme-track' }, el('span', { class: 'theme-fill', style: { width: `${row.count / maxCount * 100}%` } }), el('span', { class: 'theme-count' }, row.count))))), readBox({ tunjuk: 'Taburan penemuan Suruhanjaya mengikut bidang.', penting: 'Tadbir urus dan perakaunan menyumbang bahagian terbesar. Ini menyokong kesimpulan Suruhanjaya bahawa masalah utama bukan pada satu keputusan pelaburan yang buruk, tetapi pada sistem yang membenarkan keputusan itu dibuat dan direkodkan.', simpul: 'Suruhanjaya tidak mencadangkan Tabung Haji dipecahkan — ia mencadangkan cara ia ditadbir, diaudit dan melabur diubah.', jangan: 'Bilangan penemuan bukan ukuran keseriusan. Pengelasan tema juga dibuat oleh dashboard.' })));

    let activeType = 'penemuan';
    let selectedTheme = 'semua';
    let query = '';
    const controls = el('div');
    const list = el('div', { id: 'finding-list' });
    const typeOptions = [
      { id: 'penemuan', label: `Penemuan (${X.penemuan.length})` },
      { id: 'cadangan', label: `Cadangan (${X.cadangan.length})` },
      { id: 'baik', label: `Penambahbaikan (${X.penambahbaikan.length})` },
      { id: 'rumusan', label: `Rumusan (${X.rumusan.length})` },
    ];
    function renderControls() {
      controls.innerHTML = '';
      controls.appendChild(controlRow(controlGroup(typeOptions, activeType, (value) => { activeType = value; selectedTheme = 'semua'; renderControls(); renderList(); }), el('input', { class: 'filter-input', type: 'search', placeholder: 'Cari…', value: query, oninput: (event) => { query = event.target.value; renderList(); } })));
      if (activeType === 'penemuan' || activeType === 'cadangan') {
        const themes = ['semua', ...new Set((activeType === 'penemuan' ? X.penemuan : X.cadangan).map((row) => row.tema))];
        controls.appendChild(controlRow(themes.map((tema) => button(tema === 'semua' ? 'Semua tema' : tema, () => { selectedTheme = tema; renderControls(); renderList(); }, `control-button${selectedTheme === tema ? ' active' : ''}`))));
      }
    }
    function renderList() {
      list.innerHTML = '';
      const needle = query.trim().toLowerCase();
      if (activeType === 'penemuan') {
        const rows = X.penemuan.filter((row) => (selectedTheme === 'semua' || row.tema === selectedTheme) && (!needle || `${row.tajuk} ${row.isu} ${row.kesan}`.toLowerCase().includes(needle)));
        if (!rows.length) list.appendChild(el('div', { class: 'empty' }, 'Tiada penemuan sepadan.'));
        rows.forEach((row) => list.appendChild(fold(row.tajuk, { sub: row.tema, status: `P${row.id.replace('P', '')}` }, [detail('Apa yang ditemui', row.isu), detail('Kenapa ia penting', row.kesan), sourceRow(source(row.ms), badge('f'))], '')));
      } else if (activeType === 'cadangan') {
        const rows = X.cadangan.filter((row) => (selectedTheme === 'semua' || row.tema === selectedTheme) && (!needle || row.teks.toLowerCase().includes(needle)));
        if (!rows.length) list.appendChild(el('div', { class: 'empty' }, 'Tiada cadangan sepadan.'));
        rows.forEach((row) => list.appendChild(fold(`(${row.kod}) ${row.tema}`, { sub: 'Cadangan Suruhanjaya', status: `ms ${row.ms}` }, [html('p', 'story-text', row.teks), sourceRow(source(row.ms))], 'gold')));
      } else if (activeType === 'baik') {
        X.penambahbaikan.slice().sort((a, b) => a.tahun - b.tahun).forEach((row) => list.appendChild(fold(row.tajuk, { sub: `${row.tahun} · ${row.bidang}`, status: `ms ${row.ms}` }, [html('p', 'story-text', row.teks), sourceRow(source(row.ms))], 'teal')));
      } else {
        X.rumusan.forEach((row) => list.appendChild(fold(`Rumusan ${row.no}`, { status: `ms ${row.ms}` }, [html('p', 'story-text', row.teks), sourceRow(source(row.ms))])));
      }
    }
    renderControls(); renderList();
    node.appendChild(panel('Buka laporan mengikut jejaknya', 'Empat lapisan rujukan dengan carian dan tapisan tema.', controls, list));
    return node;
  }

  function rawTableDefinition() {
    return [
      { nama: 'Neraca dan ujian seksyen 22 (2013–2017)', ms: 146, headers: ['Tahun', 'Aset RM juta', 'Liabiliti RM juta', 'Lebihan sebelum agihan', 'Agihan', 'Lebihan selepas agihan'], rows: D.neraca.map((row) => [row.tahun, row.aset, row.liabiliti, row.lebihanPra, row.agihan, row.lebihanPasca]) },
      { nama: 'Kadar agihan keuntungan (2014–2021)', ms: 120, headers: ['Tahun', 'Kadar tahunan %', 'Hibah haji %'], rows: D.kadarHibah.map((row) => [row.tahun, row.tahunan, row.haji]) },
      { nama: 'Jumlah agihan dibayar (2014–2020)', ms: 131, headers: ['Tahun', "Tahunan RM'000", "Hibah haji RM'000", "Jumlah RM'000"], rows: D.bayaranHibah.map((row) => [row.tahun, row.tahunan, row.haji, row.jumlah]) },
      { nama: 'Keuntungan bersih dan bonus anggota (2013–2017)', ms: 139, headers: ['Tahun', 'Keuntungan bersih RM juta', 'Bonus RM juta', 'Bonus/untung %', 'Bulan'], rows: D.untungBersih.map((row) => [row.tahun, row.untung, row.bonus, row.nisbah, row.bulan]) },
      { nama: 'Bonus kakitangan (2010–2020)', ms: 137, headers: ['Tahun', 'Peruntukan RM juta', 'Kadar diluluskan MOF', 'Taburan bulan'], rows: D.bonusKakitangan.map((row) => [row.tahun, row.rm, row.lulusMOF, row.taburan]) },
      { nama: 'Bonus TH Properties 2017', ms: 142, headers: ['Bil', 'Nama', 'Jumlah RM'], rows: D.bonusTHProperties2017.map((row) => [row.bil, row.nama, row.rm]) },
      { nama: 'Bonus THP Australia Capital 2018', ms: 143, headers: ['Bil', 'Nama', 'Jumlah RM'], rows: D.bonusTHPAustralia2018.map((row) => [row.bil, row.nama, row.rm]) },
      { nama: 'Jambatan RAV 2017', ms: 119, headers: ['Perkara', 'RM juta'], rows: D.jambatanRAV.map((row) => [row.label, row.nilai]) },
      { nama: 'Kesan rosot nilai ke atas keuntungan 2017', ms: 154, headers: ['Perkara', 'RM juta'], rows: D.jambatanUntung2017.map((row) => [row.label, row.nilai]) },
      { nama: 'Polisi rosot nilai 2017', ms: 148, headers: ['Takrif ketara', 'Ujian tempoh', 'Kesan RM juta'], rows: D.polisiRosotNilai.map((row) => [row.ketara, row.tempoh, row.kesan]) },
      { nama: 'Pemindahan aset kepada UJSB mengikut kelas', ms: 159, headers: ['Kelas aset', 'Nilai buku RM juta', 'Nilai pemindahan RM juta', 'Nilai pasaran RM juta'], rows: D.pindahanAset.map((row) => [row.kelas, row.nilaiBuku, row.nilaiPindahan, row.nilaiPasaran]) },
      { nama: 'Portfolio hartanah UJSB', ms: 161, headers: ['Jenis', 'Keluasan kps', 'Nilai pemindahan RM', 'Nilai pasaran Dis 2021 RM'], rows: D.hartanahUJSB.map((row) => [row.jenis, row.kps, row.pindahan, row.pasaran]) },
      { nama: 'Lima saham mewah dipindahkan', ms: 162, headers: ['Kaunter', 'Harga pemindahan RM', 'Harga 31 Dis 2018 RM', 'Kejatuhan %', 'Jumlah pemindahan RM', 'Jumlah 31 Dis 2018 RM', 'Harga 8 Jun 2022 RM'], rows: D.bluechip.map((row) => [row.kaunter, row.hargaPindahan, row.hargaDis18, row.jatuhPct, row.jumlahPindahan, row.jumlahDis18, row.hargaJun22]) },
      { nama: 'Komitmen Jaminan Kerajaan Persekutuan', ms: 168, headers: ['Entiti', '2020 RM juta', '2021 RM juta', '2020 %', '2021 %'], rows: D.jaminanKerajaan.map((row) => [row.entiti, row.y2020, row.y2021, row.pct2020, row.pct2021]) },
      { nama: 'Tawaran Hak Penolakan Pertama (ROFR)', ms: 176, headers: ['Ticker', 'Syarikat', 'Tarikh', 'Unit', 'Harga ROFR', 'Harga pasaran', 'Premium %'], rows: D.rofr.map((row) => [row.ticker, row.syarikat, row.tarikh, row.unit, row.hargaROFR, row.hargaPasaran, row.premium]) },
      { nama: 'HAFIS sebenar (2014–2019)', ms: 199, headers: ['Tahun', 'Kos haji RM', 'Bayaran RM', 'HAFIS RM', 'Jumlah RM juta'], rows: D.hafisSebenar.map((row) => [row.tahun, row.kos, row.bayaran, row.hafis, row.jumlahJuta]) },
      { nama: 'HAFIS unjuran (2022–2030)', ms: 200, headers: ['Tahun', 'Kos haji RM', 'Bayaran RM', 'HAFIS RM', "Jumlah RM'000"], rows: D.hafisUnjuran.map((row) => [row.tahun, row.kos, row.bayaran, row.hafis, row.jumlahRibu]) },
    ];
  }

  function renderData() {
    const node = section('data', '12', 'Semak sendiri', 'Data mentah dan nota integriti', 'Setiap jadual daripada laporan, boleh dimuat turun sebagai CSV. Bahagian nota integriti mendedahkan percanggahan dan masalah unit yang ditemui semasa menyusun data ini — perkara yang perlu anda tahu sebelum mempercayai mana-mana angka.');
    node.appendChild(panel('Nota integriti data', 'Dibaca dahulu sebelum menggunakan mana-mana angka dalam analisis anda sendiri.', el('div', { class: 'integrity-list' }, X.notaIntegriti.map((row) => el('article', { class: `integrity-item ${row.tahap}` }, el('strong', null, row.tahap === 'sah' ? '✓ Disahsilang' : row.tahap === 'amaran' ? '⚠ Perlu berhati-hati' : 'ℹ Maklumat', ' · ', row.tajuk), el('p', null, row.teks))))));
    const rawHost = el('div', { class: 'raw-list' });
    rawTableDefinition().forEach((item) => rawHost.appendChild(fold(item.nama, { status: `ms ${item.ms}` }, [table(item.headers.map((label, index) => ({ label, num: index > 0 })), item.rows.map((row) => ({ cells: row.map((value) => typeof value === 'number' ? fmt.n(value, value % 1 ? 2 : 0) : String(value ?? '—')) })), { csv: { name: `rci-th-${item.ms}.csv`, headers: item.headers, rows: item.rows }, source: item.ms }), sourceRow(badge('f'))])));
    node.appendChild(panel('Semua jadual laporan', `${rawTableDefinition().length} jadual, disalin sepenuhnya daripada laporan tanpa sebarang perubahan.`, rawHost));
    const glossaryHost = el('div', { id: 'glossary', class: 'glossary-grid' }, D.glosari.map((row) => el('article', { class: 'glossary-item' }, el('div', { class: 'glossary-term' }, row.istilah), row.penuh ? el('div', { class: 'glossary-full' }, row.penuh) : null, el('div', { class: 'glossary-copy' }, row.mudah), sourceRow(source(row.ms)))));
    node.appendChild(panel('Kamus istilah', 'Setiap istilah teknikal dalam dashboard ini, diterangkan dalam bahasa harian.', glossaryHost));
    const people = [...D.pesuruhjaya.map((row) => ({ nama: row.nama, peranan: row.peranan, ms: row.ms })), ...D.saksiABS.map((row) => ({ nama: row.nama, peranan: `Akuan Berkanun Saksi, Jilid ${row.jilid}`, ms: row.ms }))];
    node.appendChild(panel('Nama yang disebut', 'Pesuruhjaya, pegawai Suruhanjaya, dan saksi yang mengemukakan Akuan Berkanun.', el('div', { class: 'person-list' }, people.map((row) => el('div', { class: 'person' }, el('strong', null, row.nama), el('span', null, `${row.peranan} · ms ${row.ms}`)))), reportNote('Penyebutan nama seseorang dalam laporan ini <b>tidak</b> bermakna orang itu didapati bersalah atas apa-apa kesalahan. Saksi memberi keterangan; sebahagian nama muncul kerana jawatan yang dipegang.', 'warn')));
    node.appendChild(panel('Tentang dashboard ini', null, html('div', 'story-text', ` <p>Semua data berasal daripada satu sumber sahaja: teks penuh <b>Laporan Suruhanjaya Siasatan Diraja Tabung Haji</b> yang diterbitkan secara terbuka di <a href="https://github.com/SyahmiRafsan/rci-tabunghaji" target="_blank" rel="noopener">github.com/SyahmiRafsan/rci-tabunghaji</a>. Laporan asal ditandatangani pada 19 Julai 2022 dan dipersembahkan kepada Yang di-Pertuan Agong pada 30 Ogos 2022.</p><p>Tiada angka direka. Angka yang tidak wujud dalam laporan tetapi dikira daripada angka laporan dilabel <b>Data terbitan</b> dengan formulanya ditunjukkan. Angka yang datang daripada tetapan pengguna dilabel <b>Simulasi anda</b>. Unjuran masa depan yang dibuat oleh laporan sendiri dilabel <b>Unjuran laporan</b>.</p><p>Dashboard ini bukan terbitan rasmi Lembaga Tabung Haji, Suruhanjaya Siasatan Diraja, atau mana-mana agensi Kerajaan. Ia alat pembacaan data yang bertujuan menjadikan laporan awam ini lebih mudah difahami dan disemak oleh orang ramai.</p>`)));
    node.appendChild(footer());
    return node;
  }

  const chapters = [
    { id: 'ringkasan', label: 'Ringkasan siasatan', kicker: 'Gambaran besar' },
    { id: 'masa', label: 'Garis masa penuh', kicker: 'Kronologi' },
    { id: 'neraca', label: 'Ujian aset lawan liabiliti', kicker: 'Seksyen 22' },
    { id: 'hibah', label: 'Agihan keuntungan (hibah)', kicker: 'Bayaran kepada pendeposit' },
    { id: 'perakaunan', label: 'Cara akaun dibentuk', kicker: 'RAV & rosot nilai' },
    { id: 'ujsb', label: 'Urusharta Jamaah (UJSB)', kicker: 'Pemindahan aset' },
    { id: 'bonus', label: 'Bonus dan ganjaran', kicker: 'Siapa dapat berapa' },
    { id: 'pelaburan', label: '14 pelaburan bermasalah', kicker: 'Apa yang rugi' },
    { id: 'tindakan', label: 'Tindakan undang-undang', kicker: 'Polis, SPRM, mahkamah' },
    { id: 'hafis', label: 'Subsidi haji (HAFIS)', kicker: 'Kos lawan bayaran' },
    { id: 'penemuan', label: 'Penemuan & cadangan', kicker: '36 penemuan, 25 cadangan' },
    { id: 'data', label: 'Data mentah & integriti', kicker: 'Semak sendiri' },
  ];

  function renderCover() {
    return el('section', { class: 'chapter-cover' },
      el('div', null,
        el('div', { class: 'cover-kicker' }, 'Suruhanjaya Siasatan Diraja'),
        html('h1', 'cover-title', 'Meneroka laporan <em>RCI</em><br>Tabung Haji'),
        html('p', 'cover-deck', 'Suruhanjaya Siasatan Diraja bagi menyiasat pengurusan dan operasi Lembaga Tabung Haji, 2014–2020. Laporan bertarikh 19 Julai 2022.'),
        el('div', { class: 'cover-rule' }, 'Baca mengikut garis cerita')),
      el('div', { class: 'cover-stamp' },
        el('div', { class: 'stamp-line' }, el('span', null, 'Fokus'), el('strong', null, 'Pengurusan dan operasi LTH')),
        el('div', { class: 'stamp-line' }, el('span', null, 'Tempoh'), el('strong', null, '2014–2020')),
        el('div', { class: 'stamp-line' }, el('span', null, 'Laporan'), el('strong', null, '19 Julai 2022')),
        el('div', { class: 'stamp-line' }, el('span', null, 'Jejak'), el('strong', null, 'Setiap angka membawa rujukan muka surat'))));
  }

  function buildChapterNav() {
    chapterNav.innerHTML = '';
    chapters.forEach((chapter, index) => {
      chapterNav.appendChild(el('button', { class: 'chapter-link', type: 'button', 'data-id': chapter.id, onclick: () => go(chapter.id), title: chapter.kicker }, el('span', { class: 'chapter-num' }, String(index + 1).padStart(2, '0')), el('span', null, chapter.label)));
    });
  }

  function buildStory() {
    story.innerHTML = '';
    story.appendChild(renderCover());
    [renderSummary, renderTimeline, renderNeraca, renderHibah, renderAccounting, renderUJSB, renderBonus, renderInvestments, renderActions, renderHafis, renderFindings, renderData].forEach((render) => story.appendChild(render()));
  }

  function setActive(id) {
    state.section = id;
    $$('.chapter-link').forEach((link) => link.classList.toggle('active', link.dataset.id === id));
  }

  function initObserver() {
    const sections = chapters.map((chapter) => document.getElementById(chapter.id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-18% 0px -66% 0px', threshold: [0, .12, .35] });
    sections.forEach((sectionNode) => observer.observe(sectionNode));
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      $('#progressFill').style.width = `${max > 0 ? window.scrollY / max * 100 : 0}%`;
    }, { passive: true });
  }

  function closeMenu() {
    $('#chapterSpine').classList.remove('open');
    $('#scrim').hidden = true;
  }

  function openMenu() {
    $('#chapterSpine').classList.add('open');
    $('#scrim').hidden = false;
  }

  function initTheme() {
    try { state.tema = localStorage.getItem('rci-tema-v2') || ''; } catch (error) { state.tema = ''; }
    document.documentElement.setAttribute('data-tema', state.tema);
    $('#btnTheme').addEventListener('click', () => {
      state.tema = state.tema === 'gelap' ? '' : 'gelap';
      document.documentElement.setAttribute('data-tema', state.tema);
      try { localStorage.setItem('rci-tema-v2', state.tema); } catch (error) { /* local preference only */ }
    });
  }

  function init() {
    buildChapterNav();
    buildStory();
    initTheme();
    $('#btnChapters').addEventListener('click', openMenu);
    $('#scrim').addEventListener('click', closeMenu);
    $('#btnGlossary').addEventListener('click', () => go('data'));
    initObserver();
    const hash = location.hash.slice(1);
    if (chapters.some((chapter) => chapter.id === hash)) setTimeout(() => go(hash), 0);
    else setActive('ringkasan');
    window.addEventListener('hashchange', () => { const id = location.hash.slice(1); if (chapters.some((chapter) => chapter.id === id)) go(id); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
