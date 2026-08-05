/* ==========================================================================
   app.js — Router, navigation, search, theme, modal, tooltip
   ========================================================================== */
(function () {
  'use strict';

  var VIEWS = window.VIEWS;
  var main = document.getElementById('main');
  var topView = document.getElementById('topView');
  var navList = document.getElementById('navList');
  var navSheet = document.getElementById('navSheet');
  var searchSheet = document.getElementById('searchSheet');
  var searchInput = document.getElementById('searchInput');
  var searchRes = document.getElementById('searchRes');
  var modal = document.getElementById('modal');
  var tip = document.getElementById('tip');

  /* ---- build nav list ---- */
  function buildNav() {
    navList.innerHTML = '';
    Object.keys(VIEWS).forEach(function (key) {
      var v = VIEWS[key];
      var a = document.createElement('a');
      a.className = 'nav-item';
      a.href = '#/' + key;
      a.dataset.view = key;
      a.innerHTML = '<span class="ni-num">Fasal ' + v.n + '</span><span class="ni-t">' + v.t + '</span>';
      navList.appendChild(a);
    });
  }

  /* ---- router ---- */
  function route() {
    var hash = location.hash.replace(/^#\//, '') || 'overview';
    if (!VIEWS[hash]) hash = 'overview';
    /* clear */
    main.innerHTML = '';
    var v = VIEWS[hash];
    var node = v.render();
    node.classList.add('active');
    main.appendChild(node);
    /* update title */
    topView.textContent = v.t;
    /* update nav active */
    document.querySelectorAll('.nav-item').forEach(function (a) {
      a.classList.toggle('active', a.dataset.view === hash);
    });
    /* scroll to top */
    window.scrollTo({ top: 0, behavior: 'instant' in document.body.style ? 'instant' : 'auto' });
    /* hide nav sheet on mobile */
    closeSheet(navSheet);
  }

  /* ---- sheets (drawer/modal) ---- */
  function openSheet(sheet) { sheet.hidden = false; document.body.style.overflow = 'hidden'; }
  function closeSheet(sheet) { if (sheet) sheet.hidden = true; document.body.style.overflow = ''; }
  function toggleSheet(sheet) { if (sheet.hidden) openSheet(sheet); else closeSheet(sheet); }

  /* ---- modal close ---- */
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeSheet(navSheet);
      closeSheet(searchSheet);
      closeSheet(modal);
    }
  });

  /* ---- close buttons ---- */
  document.querySelectorAll('[data-close]').forEach(function (b) {
    b.addEventListener('click', function () {
      closeSheet(navSheet);
      closeSheet(searchSheet);
      closeSheet(modal);
    });
  });

  /* ---- nav button ---- */
  document.getElementById('navBtn').addEventListener('click', function () {
    this.setAttribute('aria-expanded', navSheet.hidden ? 'true' : 'false');
    toggleSheet(navSheet);
  });
  document.getElementById('searchBtn').addEventListener('click', function () {
    toggleSheet(searchSheet);
    if (!searchSheet.hidden) setTimeout(function () { searchInput.focus(); }, 50);
  });

  /* ---- theme ---- */
  var themeBtn = document.getElementById('themeBtn');
  var prefKey = 'rci-th-theme';
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(prefKey, t); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem(prefKey); } catch (e) {}
  if (saved) applyTheme(saved);
  else document.documentElement.setAttribute('data-theme', 'auto');
  themeBtn.addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme') || 'auto';
    var next = cur === 'light' ? 'dark' : cur === 'dark' ? 'auto' : 'light';
    applyTheme(next);
    showTip('Tema: ' + (next === 'auto' ? 'ikut sistem' : next));
  });

  /* ---- tooltip ---- */
  var tipTimer;
  function showTip(msg) {
    clearTimeout(tipTimer);
    tip.textContent = msg;
    tip.classList.add('show');
    tipTimer = setTimeout(function () { tip.classList.remove('show'); }, 1800);
  }

  /* ---- search index ---- */
  var searchIndex = [];
  function buildSearchIndex() {
    /* index all view titles + sections */
    Object.keys(VIEWS).forEach(function (key) {
      var v = VIEWS[key];
      searchIndex.push({ t: v.t, s: 'Fasal ' + v.n + ' — tajuk', view: key });
    });
    /* investments */
    window.RD.pelaburan.forEach(function (p) {
      searchIndex.push({ t: p.n, s: 'Pelaburan · ' + p.sektor + ' · ' + p.lokasi + ' · m/s ' + p.p.join(','), view: 'pelaburan', id: p.id });
    });
    /* people */
    window.RD.jawatan.siri.forEach(function (s) {
      s.orang.forEach(function (o) {
        searchIndex.push({ t: o.n, s: s.k + ' · ' + (o.dari || '') + ' → ' + (o.hingga || 'kini'), view: 'tadbir' });
      });
    });
    window.RD.politik.orang.forEach(function (o) {
      searchIndex.push({ t: o.n, s: 'Politik dalam Lembaga · ' + o.politik, view: 'tadbir' });
    });
    /* key figures */
    var figs = [
      { t: 'RM227.81 juta', s: 'Rosot nilai tak diambil kira (TH Heavy Engineering RM164.58j)', view: 'rav' },
      { t: 'RM1.4 bilion', s: 'Kerugian terlaras 2017 (PwC)', view: 'rav' },
      { t: 'RM10.2 bilion', s: 'Premium pemindahan aset UJSB', view: 'ujsb' },
      { t: 'RM17.8 bilion', s: 'Komitmen Kerajaan untuk penebusan Sukuk', view: 'ujsb' },
      { t: 'RM88 bilion', s: 'Jaminan Kerajaan seksyen 24 Akta 535', view: 'deposit' },
      { t: '130 tahun', s: 'Giliran menunggu haji semasa', view: 'hafis' },
      { t: '33 tahun', s: 'Giliran menunggu cadangan RCI', view: 'hafis' },
      { t: 'Sukuk UJSB', s: 'Siri 1 RM10b 7-thn; Siri 2 RM9.6b 10-thn', view: 'ujsb' },
      { t: 'HAFIS', s: 'Bantuan Kewangan Haji — subsidi LTH', view: 'hafis' },
      { t: 'RAV', s: 'Realisable Asset Value — jambatan perakaunan', view: 'rav' },
      { t: 'Akta 535', s: 'Akta Tabung Haji 1995 — undang-undang utama', view: 'tadbir' },
      { t: 'PwC', s: 'PricewaterhouseCoopers — financial review 2014–2017', view: 'amaran' },
      { t: 'Roland Berger', s: 'Kajian strategik 2017 — diabaikan', view: 'amaran' },
      { t: 'Al-Rawda', s: '4 hotel Makkah/Madinah · tertunggak SR560.7j', view: 'pelaburan', id: 'alrawda' },
      { t: 'FGV', s: 'Kerugian tidak nyata RM1.06 bilion', view: 'pelaburan', id: 'fgv' },
      { t: 'THIP', s: 'PT TH Indo Plantations · USD910 juta', view: 'pelaburan', id: 'thip' },
      { t: 'Trurich', s: 'RM364.31 juta hapus kira penuh', view: 'pelaburan', id: 'trurich' },
      { t: 'Bonus TH Properties', s: 'RM1.15 juta tanpa kelulusan 2017', view: 'bonus' },
      { t: 'Abdul Azeez', s: 'Pengerusi Lembaga 2013–2018 · AP Baling/UMNO', view: 'tadbir' },
      { t: 'Md Nor Md Yusof', s: 'Pengerusi ditamat awal 15 Okt 2021', view: 'tadbir' },
      { t: 'Nik Hasyudeen', s: 'KPE ditamat awal 5 Mei 2021', view: 'tadbir' },
      { t: 'Datuk Rozaida Omar', s: 'CFO · 23 jawatan anak syarikat · Kluster 1,2,3', view: 'bonus' },
      { t: 'Percanggahan', s: '6 percanggahan dalam laporan', view: 'percanggahan' }
    ];
    figs.forEach(function (f) { searchIndex.push(f); });
  }

  function renderSearch(q) {
    q = q.trim().toLowerCase();
    if (!q) { searchRes.innerHTML = '<div class="sr-item" style="cursor:default"><div class="sr-s">Cari nama, angka, syarikat, isu — cth: "hibah", "FGV", "Al-Rawda", "227.81"</div></div>'; return; }
    var matches = searchIndex.filter(function (i) {
      return (i.t + ' ' + i.s).toLowerCase().indexOf(q) !== -1;
    }).slice(0, 30);
    if (!matches.length) {
      searchRes.innerHTML = '<div class="sr-item" style="cursor:default"><div class="sr-s">Tiada padanan untuk "' + q + '"</div></div>';
      return;
    }
    searchRes.innerHTML = '';
    matches.forEach(function (m) {
      var item = document.createElement('div');
      item.className = 'sr-item';
      item.innerHTML = '<div class="sr-t">' + highlight(m.t, q) + '</div><div class="sr-s">' + highlight(m.s, q) + '</div>';
      item.addEventListener('click', function () {
        closeSheet(searchSheet);
        if (location.hash !== '#/' + m.view) {
          location.hash = '#/' + m.view;
          /* wait for route to render */
          setTimeout(function () { afterRoute(m); }, 80);
        } else { afterRoute(m); }
      });
      searchRes.appendChild(item);
    });
  }
  function afterRoute(m) {
    if (m.id && m.view === 'pelaburan') {
      var row = document.querySelector('.row[data-id="' + m.id + '"]');
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        row.style.borderColor = 'var(--gold)';
        setTimeout(function () { row.style.borderColor = ''; }, 2000);
        var p = window.RD.pelaburan.find(function (x) { return x.id === m.id; });
        if (p) { /* open modal directly */ setTimeout(function () { openInvestmentFromSearch(p); }, 400); }
      }
    }
  }
  function openInvestmentFromSearch(p) {
    var body = document.getElementById('modalBody');
    body.innerHTML =
      '<div class="fl mb6">' +
        '<span class="badge ' + statusClass(p.status) + '">' + window.RD.pelaburanMeta.status[p.status] + '</span>' +
        '<span class="badge ink">' + p.sektor + '</span>' +
        '<span class="badge neutral">' + p.lokasi + '</span>' +
      '</div>' +
      '<p><strong>Pegangan:</strong> ' + p.pegangan + '</p>' +
      '<p><strong>Modus operandi:</strong> ' + p.modus + '</p>' +
      '<h4>Angka kunci</h4>' +
      '<div class="kv">' + p.angka.map(function (a) { return '<div class="k">' + a.k + '</div><div class="v">' + a.v + '</div>'; }).join('') + '</div>' +
      '<h4>Isu</h4><p>' + p.isu + '</p>' +
      '<h4>Tindakan</h4><p class="mb0">' + p.tindakan + '</p>' +
      '<p class="mt12 mb0 muted">m/s ' + p.p.join(', ') + '</p>';
    document.getElementById('modalTitle').textContent = p.n;
    openSheet(modal);
  }
  function statusClass(s) {
    return { polis: 'bad', mahkamah: 'warn', timbangtara: 'warn', selesai: 'good', hapus: 'bad', pantau: 'neutral' }[s] || 'neutral';
  }
  function highlight(s, q) {
    var i = s.toLowerCase().indexOf(q);
    if (i < 0) return s;
    return s.slice(0, i) + '<b>' + s.slice(i, i + q.length) + '</b>' + s.slice(i + q.length);
  }

  searchInput.addEventListener('input', function () { renderSearch(this.value); });
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var first = searchRes.querySelector('.sr-item');
      if (first) first.click();
    }
  });

  /* ---- close sheets on outside click ---- */
  [navSheet, searchSheet, modal].forEach(function (sheet) {
    sheet.addEventListener('click', function (e) {
      if (e.target === sheet || e.target.hasAttribute('data-close')) closeSheet(sheet);
    });
  });

  /* ---- init ---- */
  buildNav();
  buildSearchIndex();
  renderSearch('');
  window.addEventListener('hashchange', route);
  route();

  /* ---- expose modal control ---- */
  window.RCImodal = {
    open: function () { openSheet(modal); },
    close: function () { closeSheet(modal); }
  };
})();