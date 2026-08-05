/* ============================================================
   APP — routing, nav, dark mode
   ============================================================ */
(function () {
  'use strict';

  var D = window.RTH;
  if (!D) return;

  var app = document.getElementById('app');
  if (!app) return;

  /* ---------- tema ---------- */
  var storedTheme = null;
  try { storedTheme = localStorage.getItem('rth-theme'); } catch (e) {}
  if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme);

  /* ---------- bina topbar + nav ---------- */
  var topbar = document.createElement('div');
  topbar.className = 'topbar';
  topbar.innerHTML =
    '<div class="topbar-inner">' +
      '<div class="brand">' +
        '<span class="brand-kicker">Suruhanjaya Siasatan Diraja</span>' +
        '<span class="brand-title"><em>Tabung Haji</em> · 2014–2020</span>' +
      '</div>' +
      '<span class="topbar-spacer"></span>' +
      '<button class="theme-toggle" type="button" aria-label="Tukar tema terang/gelap">🌓 Tema</button>' +
    '</div>' +
    '<nav class="nav" aria-label="Navigasi utama"></nav>';
  app.appendChild(topbar);
  var nav = topbar.querySelector('.nav');

  /* ---------- bina section ---------- */
  var main = document.createElement('main');
  app.appendChild(main);

  var views = D.views;
  var currentId = null;

  function show(id) {
    currentId = id;
    var activeView = views.find(function (v) { return v.id === id; });
    if (!activeView) return;

    main.innerHTML = '';
    if (window.VB) window.VB._charts.length = 0;
    var node = activeView.render();
    node.classList.add('active');
    main.appendChild(node);

    nav.querySelectorAll('.nav-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.id === id);
    });

    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  views.forEach(function (v) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'nav-btn';
    b.dataset.id = v.id;
    b.textContent = v.nav;
    b.addEventListener('click', function () { show(v.id); });
    nav.appendChild(b);
  });

  /* ---------- tema toggle ---------- */
  var themeBtn = topbar.querySelector('.theme-toggle');
  themeBtn.addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('rth-theme', next); } catch (e) {}
    /* rerender carta untuk warna baharu */
    if (currentId) {
      var av = views.find(function (v) { return v.id === currentId; });
      main.innerHTML = '';
      if (window.VB) window.VB._charts.length = 0;
      var n2 = av.render();
      n2.classList.add('active');
      main.appendChild(n2);
    }
  });

  /* ---------- hash routing ---------- */
  function route() {
    var h = location.hash.replace('#', '');
    var id = views.find(function (v) { return v.id === h; }) ? h : views[0].id;
    show(id);
  }
  window.addEventListener('hashchange', route);
  route();
})();
