/* =====================================================================
   APP — teras: navigasi, komponen kongsi, pengiraan terbitan.
   Modul paparan didaftarkan oleh fail views-*.js melalui window.V.
   ===================================================================== */
(function () {
  'use strict';
  const { fmt, el, s } = L;
  const D = window.RCI, X = window.RCI_DETAIL;

  /* ---------- Pengiraan terbitan (dikira, bukan disalin) ----------
     Semua nilai di bawah DIKIRA oleh dashboard daripada angka laporan.
     Ia dilabel "terbitan" di mana-mana ia dipaparkan.
  ------------------------------------------------------------------ */
  const T = {};

  /* Anggaran asas deposit = jumlah hibah tahunan ÷ kadar hibah tahunan */
  T.asasDeposit = D.bayaranHibah.map((b) => {
    const k = D.kadarHibah.find((x) => x.tahun === b.tahun);
    const h = D.kadarHibah.find((x) => x.tahun === b.tahun && x.haji > 0);
    return {
      tahun: b.tahun,
      asasRM: k && k.tahunan ? (b.tahunan / 1000) / (k.tahunan / 100) : null, // RM juta
      asasHajiRM: h && b.haji ? (b.haji / 1000) / (h.haji / 100) : null,
      kadar: k ? k.tahunan : null,
    };
  });

  /* Nisbah bayaran: agihan ÷ keuntungan bersih tahun sama */
  T.nisbahBayar = D.untungBersih.map((u) => {
    const n = D.neraca.find((x) => x.tahun === u.tahun);
    return { tahun: u.tahun, untung: u.untung, agihan: n ? n.agihan : null,
      nisbah: n && u.untung ? (n.agihan / u.untung) * 100 : null };
  });

  /* Defisit terkumpul selepas agihan */
  T.defisitKumulatif = (() => {
    let k = 0;
    return D.neraca.map((n) => { k += Math.min(0, n.lebihanPasca); return { tahun: n.tahun, kumulatif: k, tahunan: n.lebihanPasca }; });
  })();

  /* Hartanah UJSB: harga seunit kaki persegi */
  T.hartanahKps = D.hartanahUJSB.map((h) => ({
    ...h,
    kpsPindahan: h.pindahan / h.kps,
    kpsPasaran: h.pasaran / h.kps,
    jatuhPct: ((h.pasaran - h.pindahan) / h.pindahan) * 100,
    jatuhRM: h.pasaran - h.pindahan,
  }));

  /* Saham mewah: unit tersirat + nilai pada 8 Jun 2022 */
  T.bluechip = D.bluechip.map((b) => {
    const unit = b.jumlahPindahan / b.hargaPindahan;
    return { ...b, unit,
      jumlahJun22: unit * b.hargaJun22,
      jatuhJun22RM: unit * b.hargaJun22 - b.jumlahPindahan,
      jatuhJun22Pct: ((b.hargaJun22 - b.hargaPindahan) / b.hargaPindahan) * 100 };
  });
  T.bluechipJun22 = T.bluechip.reduce((a, b) => a + b.jumlahJun22, 0);

  /* ROFR: kos lebihan jika LTH membeli pada harga tawaran berbanding pasaran */
  T.rofr = D.rofr.map((r) => ({ ...r,
    nilaiROFR: r.unit * r.hargaROFR,
    nilaiPasaran: r.unit * r.hargaPasaran,
    lebihan: r.unit * (r.hargaROFR - r.hargaPasaran) }));
  T.rofrLebihan = T.rofr.reduce((a, r) => a + r.lebihan, 0);
  T.rofrNilai = T.rofr.reduce((a, r) => a + r.nilaiROFR, 0);

  /* Bonus bernama: cantuman dua skim mengikut orang */
  T.bonusOrang = (() => {
    const m = new Map();
    const add = (arr, medan) => arr.forEach((r) => {
      const k = D.kunciNama[r.nama] || r.nama;
      if (!m.has(k)) m.set(k, { kunci: k, nama: r.nama, y2017: 0, y2018: 0 });
      const o = m.get(k); o[medan] = r.rm;
      if (medan === 'y2017') o.nama = r.nama;
    });
    add(D.bonusTHProperties2017, 'y2017');
    add(D.bonusTHPAustralia2018, 'y2018');
    return [...m.values()].map((o) => ({ ...o, jumlah: o.y2017 + o.y2018, skim: (o.y2017 ? 1 : 0) + (o.y2018 ? 1 : 0) }))
      .sort((a, b) => b.jumlah - a.jumlah);
  })();

  /* HAFIS: bilangan jemaah tersirat = jumlah subsidi ÷ subsidi seorang */
  T.hafisJemaah = [
    ...D.hafisSebenar.map((h) => ({ tahun: h.tahun, jenis: 'sebenar', kos: h.kos, bayaran: h.bayaran,
      hafis: h.hafis, jumlahJuta: h.jumlahJuta, jemaah: (h.jumlahJuta * 1e6) / h.hafis })),
    ...D.hafisUnjuran.map((h) => ({ tahun: h.tahun, jenis: 'unjuran', kos: h.kos, bayaran: h.bayaran,
      hafis: h.hafis, jumlahJuta: h.jumlahRibu / 1000, jemaah: (h.jumlahRibu * 1000) / h.hafis })),
  ];

  /* Pelaburan bermasalah: jumlah kerugian dalam Ringgit sahaja */
  T.rugiRM = X.pelaburanBermasalah.filter((p) => p.rugiRM !== null);
  T.rugiJumlah = T.rugiRM.reduce((a, p) => a + p.rugiRM, 0);
  T.tanpaRM = X.pelaburanBermasalah.filter((p) => p.rugiRM === null);

  /* Pengelasan punca kegagalan — pengelasan oleh dashboard, bukan laporan */
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

  window.T = T;

  /* ---------- Komponen kongsi ---------- */
  const C = {};

  /** Label asal-usul data */
  C.pv = (jenis) => {
    const map = { f: ['pv-f', 'Fakta laporan'], t: ['pv-t', 'Data terbitan'], u: ['pv-u', 'Unjuran laporan'], s: ['pv-s', 'Simulasi anda'] };
    const [c, t] = map[jenis];
    const titles = {
      f: 'Angka ini disalin terus daripada laporan.',
      t: 'Angka ini dikira oleh dashboard daripada angka laporan. Formulanya ditunjukkan.',
      u: 'Angka ini ialah unjuran masa depan yang dibuat dalam laporan itu sendiri, bukan data sebenar.',
      s: 'Angka ini datang daripada tetapan yang anda pilih. Ia bukan kandungan laporan.',
    };
    return el('span', { class: `pv ${c}`, title: titles[jenis] }, t);
  };

  /** Pautan ke muka surat laporan asal */
  C.src = (ms, teks) => el('a', { class: 'src', href: D.src + ms, target: '_blank', rel: 'noopener',
    title: 'Buka laporan asal pada muka surat ini' }, teks || `Laporan ms ${ms}`);

  C.srcbar = (...kids) => el('div', { class: 'srcbar' }, kids.flat().filter(Boolean));

  /** Kotak "cara baca carta ini" */
  C.baca = ({ tunjuk, penting, simpul, jangan }) => el('div', { class: 'baca' },
    tunjuk && el('div', { class: 'row' }, el('b', null, 'Apa ditunjuk'), el('span', { html: tunjuk })),
    penting && el('div', { class: 'row' }, el('b', null, 'Kenapa penting'), el('span', { html: penting })),
    simpul && el('div', { class: 'row' }, el('b', null, 'Boleh simpul'), el('span', { html: simpul })),
    jangan && el('div', { class: 'row no' }, el('b', null, 'Jangan simpul'), el('span', { html: jangan })));

  /** Kad standard */
  C.card = (tajuk, sub, ...kids) => el('div', { class: 'card' },
    tajuk && el('h3', null, tajuk), sub && el('p', { class: 'sub', html: sub }), kids.flat().filter(Boolean));

  /** Butang segmen */
  C.seg = (pilihan, aktif, onPilih) => {
    const w = el('div', { class: 'seg' });
    pilihan.forEach((p) => {
      const b = el('button', { class: p.id === aktif ? 'on' : '', title: p.nota || null,
        onclick: () => onPilih(p.id) }, p.label);
      w.appendChild(b);
    });
    return w;
  };

  /** Jadual boleh susun */
  C.tbl = (kolum, baris, opsi = {}) => {
    const st = { key: opsi.susun || null, arah: opsi.arah || -1 };
    const wrap = el('div', { class: 'tblwrap' });
    function lukis() {
      let data = baris.slice();
      if (st.key) {
        const k = kolum.find((c) => c.key === st.key);
        data.sort((a, b) => {
          const va = k.raw ? k.raw(a) : a[st.key], vb = k.raw ? k.raw(b) : b[st.key];
          if (va === null || va === undefined) return 1;
          if (vb === null || vb === undefined) return -1;
          return (typeof va === 'number' ? va - vb : String(va).localeCompare(String(vb))) * st.arah;
        });
      }
      const thead = el('thead', null, el('tr', null, kolum.map((c) =>
        el('th', { class: c.num ? 'num' : '', title: c.nota || 'Klik untuk susun',
          onclick: () => { st.arah = st.key === c.key ? -st.arah : -1; st.key = c.key; lukis(); } },
          c.label + (st.key === c.key ? (st.arah === 1 ? ' ↑' : ' ↓') : '')))));
      const tbody = el('tbody', null, data.map((r) => {
        const tr = el('tr', null, kolum.map((c) => {
          const v = c.sel ? c.sel(r) : r[c.key];
          const cls = [c.num ? 'num' : '', c.warna ? c.warna(r) : ''].filter(Boolean).join(' ');
          return el('td', { class: cls || null }, typeof v === 'object' && v !== null ? v : String(v ?? '—'));
        }));
        if (opsi.klik) { tr.style.cursor = 'pointer'; tr.addEventListener('click', () => opsi.klik(r)); }
        return tr;
      }));
      const tfoot = opsi.jumlah ? el('tfoot', null, el('tr', { class: 'tot' }, kolum.map((c) => {
        const v = opsi.jumlah[c.key];
        return el('td', { class: c.num ? 'num' : '' }, v === undefined ? '' : (typeof v === 'object' ? v : String(v)));
      }))) : null;
      wrap.innerHTML = '';
      wrap.appendChild(el('table', null, thead, tbody, tfoot));
    }
    lukis();
    return wrap;
  };

  /** Butang muat turun CSV */
  C.csv = (nama, kolum, baris) => el('button', { class: 'chip',
    onclick: () => L.muatTurun(nama, [kolum, ...baris]) }, '⭳ Muat turun CSV');

  /** Nota */
  C.note = (jenis, html) => el('div', { class: 'note ' + (jenis || ''), html });

  window.C = C;

  /* ---------- Kamus istilah (tooltip pada perkataan) ---------- */
  const kamus = new Map(D.glosari.map((g) => [g.istilah.toLowerCase(), g]));
  C.ist = (istilah, papar) => {
    const g = kamus.get(istilah.toLowerCase());
    if (!g) return document.createTextNode(papar || istilah);
    const n = el('span', { class: 'ist', tabindex: '0' }, papar || istilah);
    const show = (e) => L.showTip(e.touches ? e.touches[0] : e,
      `<b>${g.istilah}</b>${g.penuh ? `<div class="kv"><span>${g.penuh}</span></div>` : ''}<div style="margin-top:5px">${g.mudah}</div><div class="note">Laporan ms ${g.ms}</div>`);
    n.addEventListener('mouseenter', show);
    n.addEventListener('focus', (e) => { const r = n.getBoundingClientRect(); show({ clientX: r.left, clientY: r.bottom }); });
    n.addEventListener('mousemove', L.moveTip);
    n.addEventListener('mouseleave', L.hideTip);
    n.addEventListener('blur', L.hideTip);
    return n;
  };

  /* ---------- Navigasi ---------- */
  const MODUL = [
    { grup: 'Mula di sini' },
    { id: 'ringkasan', label: 'Ringkasan siasatan', kicker: 'Gambaran besar' },
    { id: 'masa', label: 'Garis masa penuh', kicker: 'Kronologi' },
    { grup: 'Krisis kewangan' },
    { id: 'neraca', label: 'Ujian aset lawan liabiliti', kicker: 'Seksyen 22' },
    { id: 'hibah', label: 'Agihan keuntungan (hibah)', kicker: 'Bayaran kepada pendeposit' },
    { id: 'perakaunan', label: 'Cara akaun dibentuk', kicker: 'RAV & rosot nilai' },
    { grup: 'Pemulihan' },
    { id: 'ujsb', label: 'Urusharta Jamaah (UJSB)', kicker: 'Pemindahan aset' },
    { grup: 'Wang & orang' },
    { id: 'bonus', label: 'Bonus dan ganjaran', kicker: 'Siapa dapat berapa' },
    { id: 'pelaburan', label: '14 pelaburan bermasalah', kicker: 'Apa yang rugi' },
    { id: 'tindakan', label: 'Tindakan undang-undang', kicker: 'Polis, SPRM, mahkamah' },
    { grup: 'Haji' },
    { id: 'hafis', label: 'Subsidi haji (HAFIS)', kicker: 'Kos lawan bayaran' },
    { grup: 'Rujukan' },
    { id: 'penemuan', label: 'Penemuan & cadangan', kicker: '36 penemuan, 25 cadangan' },
    { id: 'data', label: 'Data mentah & integriti', kicker: 'Semak sendiri' },
  ];

  const nav = document.getElementById('nav');
  const view = document.getElementById('view');
  const rail = document.getElementById('rail');
  const scrim = document.getElementById('scrim');
  let aktif = null;

  MODUL.forEach((m) => {
    if (m.grup) { nav.appendChild(el('div', { class: 'sep' }, m.grup)); return; }
    const b = el('button', { 'data-id': m.id, onclick: () => pergi(m.id) },
      el('span', { class: 'num' }, ''), el('span', null, m.label));
    nav.appendChild(b);
  });
  [...nav.querySelectorAll('button')].forEach((b, i) => { b.querySelector('.num').textContent = String(i + 1).padStart(2, '0'); });

  function pergi(id, ke) {
    if (!window.V || !window.V[id]) return;
    aktif = id;
    [...nav.querySelectorAll('button')].forEach((b) => b.classList.toggle('on', b.dataset.id === id));
    view.innerHTML = '';
    view.appendChild(window.V[id]());
    rail.classList.remove('open'); scrim.classList.remove('on');
    if (ke) { const t = document.getElementById(ke); if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; } }
    window.scrollTo({ top: 0 });
    history.replaceState(null, '', '#' + id);
  }
  window.pergi = pergi;

  document.getElementById('burger').onclick = () => { rail.classList.add('open'); scrim.classList.add('on'); };
  scrim.onclick = () => { rail.classList.remove('open'); scrim.classList.remove('on'); };
  document.getElementById('btnTema').onclick = () => {
    const cerah = document.documentElement.getAttribute('data-tema') === 'cerah';
    document.documentElement.setAttribute('data-tema', cerah ? '' : 'cerah');
    try { localStorage.setItem('rci-tema', cerah ? '' : 'cerah'); } catch (e) {}
    if (aktif) pergi(aktif);
  };
  try { const t = localStorage.getItem('rci-tema'); if (t) document.documentElement.setAttribute('data-tema', t); } catch (e) {}

  document.getElementById('btnIstilah').onclick = () => pergi('data', 'kamus');

  window.addEventListener('DOMContentLoaded', () => {
    const h = location.hash.slice(1);
    pergi(window.V && window.V[h] ? h : 'ringkasan');
  });
  if (document.readyState !== 'loading') {
    const h = location.hash.slice(1);
    setTimeout(() => pergi(window.V && window.V[h] ? h : 'ringkasan'), 0);
  }
})();
