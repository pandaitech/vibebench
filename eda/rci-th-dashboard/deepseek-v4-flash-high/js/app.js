/* =========================================================================
   APP — router & kawalan utama
   ========================================================================= */
(function () {
  const D = window.D, V = window.V;

  const NAV = [
    { id: 'ringkasan', n: '01', nama: 'Ringkasan', sub: 'Cerita & peta analisis', ikon: '◆' },
    { id: 'krisis', n: '02', nama: 'Krisis Kewangan', sub: 'Aset, liabiliti & perakaunan', ikon: '◐' },
    { id: 'ujsb', n: '03', nama: 'UJSB & Bailout', sub: 'Struktur penyelamatan', ikon: '◈' },
    { id: 'pelaburan', n: '04', nama: 'Pelaburan', sub: '14 pelaburan bermasalah', ikon: '◉' },
    { id: 'haji', n: '05', nama: 'Kos Haji & HAFIS', sub: 'Subsidi & unjuran', ikon: '☪' },
    { id: 'bonus', n: '06', nama: 'Bonus', sub: 'Bonus kakitangan & THP', ikon: '◍' },
    { id: 'tadbir', n: '07', nama: 'Tadbir Urus', sub: 'Kepimpinan & konflik', ikon: '⬡' },
    { id: 'siasatan', n: '08', nama: 'Siasatan', sub: 'Polis, SPRM, mahkamah', ikon: '⚖' },
    { id: 'sumber', n: '09', nama: 'Sumber & Glosari', sub: 'Rujukan & istilah', ikon: '☰' }
  ];

  const TABS = ['ringkasan', 'krisis', 'ujsb', 'pelaburan'];
  let aktif = 'ringkasan';

  const rail = document.getElementById('rail');
  const scrim = document.getElementById('scrim');
  const main = document.getElementById('main');
  const tabbar = document.getElementById('tabbar');

  /* ---- bina navigasi ---- */
  function binaNav() {
    rail.innerHTML = '';
    const brand = L.el('div', { cls: 'brand' }, [
      L.el('div', { cls: 'brand-logo', html: '🕋' }),
      L.el('div', {}, [
        L.el('b', { text: 'RCI Tabung Haji' }),
        L.el('small', { text: 'Dashboard penerokaan data · 2014–2020' })
      ])
    ]);
    rail.appendChild(brand);

    const nav = L.el('div', { cls: 'nav' });
    NAV.forEach(v => {
      const b = L.el('button', { 'data-id': v.id }, [
        L.el('span', { cls: 'num', text: v.n }),
        L.el('span', { cls: 'nav-txt' }, [
          L.el('b', { text: v.nama }),
          L.el('small', { text: v.sub })
        ])
      ]);
      b.onclick = () => pergi(v.id);
      nav.appendChild(b);
    });
    rail.appendChild(nav);

    const foot = L.el('div', { cls: 'rail-foot' }, [
      L.el('button', { cls: 'btn ghost sm', text: '🌓 Tukar tema', onclick: tukarTema }),
      L.el('p', { cls: 'rail-note', text: 'Setiap angka boleh dijejak ke laporan asal (butang sumber pada setiap carta).' })
    ]);
    rail.appendChild(foot);

    /* tab bawah (mobile) */
    tabbar.innerHTML = '';
    TABS.forEach(id => {
      const v = NAV.find(x => x.id === id);
      const b = L.el('button', { 'data-id': id }, [
        L.el('span', { cls: 'tab-ikon', text: v.ikon }),
        L.el('span', { cls: 'tab-txt', text: v.nama.split(' ')[0] })
      ]);
      b.onclick = () => pergi(id);
      tabbar.appendChild(b);
    });
    const lagi = L.el('button', { 'data-id': 'lagi' }, [
      L.el('span', { cls: 'tab-ikon', text: '☰' }),
      L.el('span', { cls: 'tab-txt', text: 'Lagi' })
    ]);
    lagi.onclick = () => { rail.classList.add('open'); scrim.classList.add('on'); };
    tabbar.appendChild(lagi);
  }

  /* ---- render view ---- */
  function pergi(id, anc) {
    if (!V[id]) id = 'ringkasan';
    aktif = id;
    main.innerHTML = '';
    const frag = V[id]();
    main.appendChild(frag);

    /* tajuk topbar (mobile) */
    const v = NAV.find(x => x.id === id);
    if (v) {
      document.getElementById('tb-tajuk').textContent = v.nama;
      document.getElementById('tb-sub').textContent = v.sub;
    }

    /* sorot nav */
    rail.querySelectorAll('button[data-id]').forEach(b => b.classList.toggle('on', b.dataset.id === id));
    tabbar.querySelectorAll('button[data-id]').forEach(b => b.classList.toggle('on', b.dataset.id === id));

    rail.classList.remove('open');
    scrim.classList.remove('on');
    if (anc) {
      setTimeout(() => {
        const t = document.getElementById(anc);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 30);
      history.replaceState(null, '', '#' + id + '/' + anc);
    } else {
      history.replaceState(null, '', '#' + id);
      window.scrollTo({ top: 0 });
    }
  }
  window.pergi = pergi;

  /* ---- tema ---- */
  function tukarTema() {
    const cerah = document.documentElement.getAttribute('data-tema') === 'cerah';
    document.documentElement.setAttribute('data-tema', cerah ? '' : 'cerah');
    try { localStorage.setItem('rci-th-tema', cerah ? '' : 'cerah'); } catch (e) {}
  }

  /* ---- init ---- */
  document.getElementById('burger').onclick = () => { rail.classList.add('open'); scrim.classList.add('on'); };
  document.getElementById('btnTema').onclick = tukarTema;
  scrim.onclick = () => { rail.classList.remove('open'); scrim.classList.remove('on'); };
  try {
    const t = localStorage.getItem('rci-th-tema');
    if (t) document.documentElement.setAttribute('data-tema', t);
  } catch (e) {}

  binaNav();

  function start() {
    const h = location.hash.slice(1);
    const [id, anc] = h.split('/');
    pergi(V[id] ? id : 'ringkasan', anc);
  }
  if (document.readyState !== 'loading') start();
  else window.addEventListener('DOMContentLoaded', start);
})();
