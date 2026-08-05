/* ===========================================================================
   Router, navigasi dan carian global
   =========================================================================== */
(function () {
  'use strict';
  var R = window.RCI, U = window.UI, C = window.Ch, V = window.VIEWS;

  var ORDER = ['ringkasan', 'jurang', 'tuas', 'hibah', 'bonus', 'ujsb', 'haji', 'pelaburan', 'orang', 'kronologi', 'syor', 'sumber'];

  var tabsEl = document.getElementById('tabs');
  var mainEl = document.getElementById('main');
  var current = null;

  tabsEl.innerHTML = ORDER.map(function (k) {
    return '<button class="tab" role="tab" data-k="' + k + '" aria-selected="false">' + U.esc(V[k].label) + '</button>';
  }).join('');

  tabsEl.addEventListener('click', function (e) {
    var b = e.target.closest('.tab'); if (!b) return;
    go(b.dataset.k);
  });

  document.addEventListener('click', function (e) {
    var g = e.target.closest('[data-go]');
    if (g) { e.preventDefault(); go(g.dataset.go); }
  });

  function go(key, noHash) {
    if (!V[key]) key = 'ringkasan';
    if (current === key) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    current = key;
    C.hideTip();
    C.reset();
    mainEl.innerHTML = '';
    var sec = document.createElement('section');
    sec.className = 'sec';
    mainEl.appendChild(sec);
    V[key].render(sec);
    tabsEl.querySelectorAll('.tab').forEach(function (t) {
      var on = t.dataset.k === key;
      t.setAttribute('aria-selected', on);
      if (on) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });
    document.title = V[key].title + ' · RCI Tabung Haji';
    if (!noHash) history.replaceState(null, '', '#' + key);
    window.scrollTo({ top: 0 });
    closeSearch();
  }

  window.addEventListener('hashchange', function () {
    var k = location.hash.replace('#', '');
    if (V[k] && k !== current) go(k, true);
  });

  /* ---------------------------------------------------------- CARIAN */
  var INDEX = [];
  (function buildIndex() {
    ORDER.forEach(function (k) {
      INDEX.push({ t: V[k].title, s: 'Bahagian', go: k, b: V[k].label });
    });
    R.KRONOLOGI.forEach(function (e) {
      INDEX.push({ t: e.tajuk, s: 'Kronologi · ' + e.tarikh, go: 'kronologi', b: e.teks, src: e.src });
    });
    R.PELABURAN.forEach(function (p) {
      INDEX.push({ t: p.nama, s: 'Pelaburan bermasalah · ' + p.kategori, go: 'pelaburan', b: p.isu, src: p.src });
    });
    R.SYOR.forEach(function (s) {
      INDEX.push({ t: s.tajuk, s: 'Syor ' + s.id + ' · ' + s.sasaran, go: 'syor', b: s.teks });
    });
    R.ISTILAH.forEach(function (i) {
      INDEX.push({ t: i.istilah, s: 'Istilah', go: 'sumber', b: i.maksud });
    });
    R.PERCANGGAHAN.forEach(function (p) {
      INDEX.push({ t: p.tajuk, s: 'Percanggahan dalam laporan', go: 'sumber', b: p.teks });
    });
    R.JAWATANANAK.orang.forEach(function (o) {
      INDEX.push({ t: o.nama, s: 'Orang · ' + o.peranan, go: 'orang', b: o.bil + ' jawatan anak syarikat (' + o.tempoh + ')' });
    });
    R.JAWATAN.siri.forEach(function (s) {
      s.orang.forEach(function (o) {
        INDEX.push({ t: o.nama, s: 'Orang · ' + s.peranan, go: 'orang', b: o.mula + ' hingga ' + o.tamat });
      });
    });
    R.BONUS.thProperties.y2017.concat(R.BONUS.thProperties.y2018).forEach(function (x) {
      INDEX.push({ t: x.nama, s: 'Bonus TH Properties', go: 'bonus', b: 'Menerima bonus istimewa RM' + U.n(x.jumlah) });
    });
    R.TATATERTIB.pegawai.forEach(function (p) {
      INDEX.push({ t: p.nama, s: 'Tindakan tatatertib', go: 'orang', b: p.jawatanDulu + ' → ' + p.jawatanKini });
    });
  })();

  var searchWrap = document.getElementById('search-panel');
  var searchInput = document.getElementById('q');
  var searchOut = document.getElementById('search-results');

  document.getElementById('btn-search').addEventListener('click', function () {
    searchWrap.classList.toggle('hidden');
    if (!searchWrap.classList.contains('hidden')) searchInput.focus();
  });
  function closeSearch() { searchWrap.classList.add('hidden'); }
  document.getElementById('btn-close-search').addEventListener('click', closeSearch);

  searchInput.addEventListener('input', function () {
    var q = searchInput.value.trim().toLowerCase();
    if (q.length < 2) { searchOut.innerHTML = '<div class="mini">Taip sekurang-kurangnya dua huruf.</div>'; return; }
    var hits = INDEX.map(function (r) {
      var hay = (r.t + ' ' + r.s + ' ' + (r.b || '')).toLowerCase();
      var i = hay.indexOf(q);
      if (i < 0) return null;
      var tScore = r.t.toLowerCase().indexOf(q) >= 0 ? 0 : 1;
      return { r: r, score: tScore * 1000 + i };
    }).filter(Boolean).sort(function (a, b) { return a.score - b.score; }).slice(0, 40);

    if (!hits.length) { searchOut.innerHTML = '<div class="mini">Tiada padanan. Cuba kata kunci lain seperti "RAV", "sukuk", "Trurich" atau "bonus".</div>'; return; }
    searchOut.innerHTML = hits.map(function (hn) {
      var r = hn.r;
      return '<button class="kpi" data-go="' + r.go + '" style="margin-bottom:8px;gap:3px">' +
        '<span class="mini" style="color:var(--accent);font-weight:750">' + U.esc(r.s) + '</span>' +
        '<span class="l">' + U.esc(r.t) + '</span>' +
        (r.b ? '<span class="t">' + U.esc(String(r.b).slice(0, 160)) + (String(r.b).length > 160 ? '…' : '') + '</span>' : '') +
        (r.src ? '<span class="mini" style="margin-top:3px">ms ' + U.esc(r.src.ms) + '</span>' : '') +
        '</button>';
    }).join('');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
    if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      searchWrap.classList.remove('hidden');
      searchInput.focus();
    }
  });

  // Mula
  go(location.hash.replace('#', '') || 'ringkasan', true);
})();
