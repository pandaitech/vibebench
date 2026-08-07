/* ==========================================================================
   app.js — Router, navigasi, carian, tooltip dan pengendali kawalan.
   ========================================================================== */
(function () {
  'use strict';
  var RD = window.RD, L = window.L, V = window.V, S = window.S;

  var ORDER = ['ringkasan', 'hibah', 'rosot', 'deposit', 'ujsb', 'pelaburan', 'hafis',
    'tadbir', 'bonus', 'amaran', 'kronologi', 'syor', 'integriti', 'sumber'];
  var DESC = {
    ringkasan: 'Peta jalan: lima peringkat cerita dan angka teras',
    hibah: 'Ujian undang-undang seksyen 22, tahun demi tahun',
    rosot: 'Gerakkan ambang rosot nilai dan lihat akaun berubah',
    deposit: 'Kadar hibah, saiz deposit dan risiko tertumpu',
    ujsb: 'Pemindahan aset RM19.9b, Sukuk RM27.5b dan risikonya',
    pelaburan: '14 kes yang disyorkan untuk audit forensik',
    hafis: 'Kos haji naik, bayaran dibeku — simulator subsidi',
    tadbir: 'Kuasa Menteri, kitaran jawatan, jawatan anak syarikat',
    bonus: 'Bonus 13 bulan pada tahun defisit',
    amaran: '15 amaran bertulis dan apa berlaku selepasnya',
    kronologi: '51 peristiwa dari 1951 hingga 2022',
    syor: '33 syor dan pihak yang bertanggungjawab',
    integriti: '14 percanggahan dalam laporan dan 8 had data',
    sumber: 'Dokumen sumber, metodologi RCI dan glosari'
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var main = $('#main'), tip = $('#tip'), tipTimer = null;

  /* ------------------------------- tema --------------------------------- */
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('rci-tema'); } catch (e) { }
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    document.documentElement.setAttribute('data-theme', saved || (mq.matches ? 'dark' : 'light'));
  }
  initTheme();
  $('#btnTheme').addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('rci-tema', next); } catch (e) { }
  });

  /* ------------------------------ tooltip -------------------------------- */
  function showTip(txt, key) {
    if (!txt) return;
    tip.innerHTML = (key ? '<span class="tk">' + L.esc(key) + '</span>' : '') + L.esc(txt);
    tip.classList.add('on');
    clearTimeout(tipTimer);
    tipTimer = setTimeout(function () { tip.classList.remove('on'); }, 8000);
  }
  function hideTip() { tip.classList.remove('on'); clearTimeout(tipTimer); }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-tip]');
    if (t) { showTip(t.getAttribute('data-tip'), t.getAttribute('data-tipk')); e.stopPropagation(); }
    else if (!e.target.closest('.tip')) hideTip();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { hideTip(); closeSheets(); }
    if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.hasAttribute &&
      e.target.hasAttribute('data-tip') && e.target.tagName !== 'INPUT') {
      showTip(e.target.getAttribute('data-tip'), e.target.getAttribute('data-tipk'));
      e.preventDefault();
    }
    if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
      e.preventDefault(); openSearch();
    }
  });
  var hoverOK = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (hoverOK) {
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest && e.target.closest('[data-tip]');
      if (t) showTip(t.getAttribute('data-tip'), t.getAttribute('data-tipk'));
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest && e.target.closest('[data-tip]')) hideTip();
    });
  }

  /* ------------------------------- sheets -------------------------------- */
  function openSheet(id) {
    var el = $(id); el.hidden = false;
    document.body.style.overflow = 'hidden';
    if (id === '#navsheet') $('#btnNav').setAttribute('aria-expanded', 'true');
  }
  function closeSheets() {
    ['#navsheet', '#searchsheet', '#modal'].forEach(function (id) { $(id).hidden = true; });
    document.body.style.overflow = '';
    $('#btnNav').setAttribute('aria-expanded', 'false');
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) closeSheets();
  });
  $('#btnNav').addEventListener('click', function () {
    if ($('#navsheet').hidden) { renderNavSheet(); openSheet('#navsheet'); } else closeSheets();
  });
  function openSearch() {
    renderSearch('');
    openSheet('#searchsheet');
    setTimeout(function () { $('#searchInput').focus(); }, 60);
  }
  $('#btnSearch').addEventListener('click', openSearch);

  /* ------------------------------ navigasi ------------------------------- */
  function currentKey() {
    var k = (location.hash || '').replace(/^#\/?/, '').split('?')[0];
    return ORDER.indexOf(k) >= 0 ? k : 'ringkasan';
  }
  function renderRail() {
    var cur = currentKey();
    $('#rail').innerHTML = ORDER.map(function (k, i) {
      return '<a href="#/' + k + '"' + (k === cur ? ' aria-current="page"' : '') + '>' +
        '<span class="rn">' + (i + 1) + '</span>' + L.esc(V[k].nav) + '</a>';
    }).join('');
    var act = $('#rail a[aria-current]');
    if (act) {
      var r = $('#rail');
      r.scrollTo({ left: Math.max(0, act.offsetLeft - r.clientWidth / 2 + act.offsetWidth / 2), behavior: 'smooth' });
    }
  }
  function renderNavSheet() {
    var cur = currentKey();
    $('#nsList').innerHTML = ORDER.map(function (k, i) {
      return '<a href="#/' + k + '"' + (k === cur ? ' aria-current="page"' : '') + ' data-close="1">' +
        '<span class="nn">' + (i + 1) + '</span><span><b>' + L.esc(V[k].nav) + '</b>' +
        '<span class="nd">' + L.esc(DESC[k] || '') + '</span></span></a>';
    }).join('');
  }

  /* -------------------------------- render ------------------------------- */
  var busy = false;
  function renderView(keepScroll) {
    var k = currentKey(), v = V[k];
    if (!v) return;
    var y = keepScroll ? window.scrollY : 0;
    if (v.init) v.init();
    busy = true;
    main.innerHTML = '<div class="vhead"><span class="vk">' + L.esc(v.kicker) + '</span>' +
      '<h1>' + L.esc(v.h1) + '</h1><p class="vs">' + L.esc(v.desc) + '</p></div>' + v.render();
    busy = false;
    $('#tbView').textContent = v.nav;
    document.title = v.nav + ' — Bedah Laporan RCI Tabung Haji';
    renderRail();
    if (keepScroll) window.scrollTo(0, y); else window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', function () { hideTip(); closeSheets(); renderView(false); });

  /* -------------------------- kawalan (delegated) ------------------------ */
  document.addEventListener('click', function (e) {
    var b;
    /* segmented */
    b = e.target.closest('.seg[data-seg] button[data-v]');
    if (b) {
      var name = b.closest('.seg').getAttribute('data-seg');
      S[name] = b.getAttribute('data-v');
      renderView(true); return;
    }
    /* chips (multi-select) */
    b = e.target.closest('.chips[data-chips] button[data-v]');
    if (b) {
      var cn = b.closest('.chips').getAttribute('data-chips'), cv = b.getAttribute('data-v');
      var arr = S[cn] || [];
      var ix = arr.indexOf(cv);
      if (ix >= 0) arr.splice(ix, 1); else arr.push(cv);
      S[cn] = arr;
      renderView(true); return;
    }
    /* stepbtns — single-select radio behaviour */
    b = e.target.closest('.stepbtns[data-chips] button[data-v]');
    if (b) {
      var sn = b.closest('.stepbtns').getAttribute('data-chips'), sv = b.getAttribute('data-v');
      if (sn === 'rosotStateRadio') S.rosotState = sv;
      else if (sn === 'hafisPreset') S.hafisBayar = sv;
      else S[sn] = sv;
      renderView(true); return;
    }
    /* kad pelaburan */
    b = e.target.closest('[data-open]');
    if (b && !e.target.closest('a')) {
      var id = b.getAttribute('data-open');
      S.plbOpen = S.plbOpen === id ? null : id;
      renderView(true); return;
    }
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches('input[type=checkbox][data-toggle]')) {
      S[t.getAttribute('data-toggle')] = t.checked;
      renderView(true);
    }
  });
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches('input[type=range][id]')) {
      var k = currentKey(), v = V[k];
      S[t.id] = t.value;
      if (v.live && v.live[t.id]) v.live[t.id](t.value);
      else renderView(true);
    }
    if (t.id === 'searchInput') renderSearch(t.value);
  });

  /* -------------------------------- carian ------------------------------- */
  var INDEX = (function () {
    var out = [];
    function add(kind, view, title, body, extra) {
      out.push({ kind: kind, view: view, title: title, hay: (title + ' ' + (body || '') + ' ' + (extra || '')).toLowerCase(), body: body });
    }
    ORDER.forEach(function (k) { add('Paparan', k, V[k].nav, V[k].h1 + ' — ' + V[k].desc); });
    RD.pelaburan.forEach(function (p) {
      add('Pelaburan bermasalah', 'pelaburan', p.n, p.sektor + ' · ' + p.lokasi + ' · ' + p.modus,
        p.isu + ' ' + p.tindakan + ' ' + p.angka.map(function (a) { return a.k + ' ' + a.v; }).join(' '));
    });
    RD.kronologi.forEach(function (e) { add('Kronologi', 'kronologi', L.tarikh(e.d) + ' — ' + e.t, e.b); });
    RD.syor.forEach(function (s) { add('Syor ' + s.id, 'syor', s.t.slice(0, 90), s.tema + ' · ' + s.siapa.join(', '), s.t); });
    RD.amaran.rows.forEach(function (r) {
      add('Amaran', 'amaran', r.dari + ' → ' + r.kepada + ' (' + L.tarikh(r.tarikh) + ')', r.tajuk + ' — ' + r.isu, r.hasilNota);
    });
    RD.integriti.forEach(function (x) { add('Percanggahan', 'integriti', x.tajuk, x.detail, x.kesan); });
    RD.had.forEach(function (x) { add('Had data', 'integriti', x.t, x.d); });
    Object.keys(RD.glosari).forEach(function (g) { add('Glosari', 'sumber', g, RD.glosari[g]); });
    RD.pihak.forEach(function (p) { add('Institusi', 'amaran', p.n, p.peranan, p.dapatan + ' ' + p.syor); });
    RD.anakSyarikat.orang.forEach(function (o) {
      add('Orang', 'tadbir', o.n, o.peranan + ' · ' + o.bil + ' jawatan anak syarikat', o.syarikat.join(' '));
    });
    RD.jawatan.siri.forEach(function (g) {
      g.orang.forEach(function (o) {
        add('Jawatan', 'tadbir', o.n, g.k + ' · ' + L.tarikh(o.dari) + ' – ' + (o.hingga ? L.tarikh(o.hingga) : 'kini'));
      });
    });
    RD.bonusKhas.y2017.penerima.forEach(function (p) {
      add('Penerima bonus 2017', 'bonus', p.n, p.jw + ' · ' + L.rm(p.v));
    });
    RD.bonusKhas.y2018.penerima.forEach(function (p) {
      add('Penerima bonus 2018', 'bonus', p.n, p.jw + ' · ' + L.rm(p.v));
    });
    RD.laporanPolis.rows.forEach(function (r) { add('Laporan polis', 'tadbir', r.repot, r.tarikh + ' · ' + r.isu, r.pengadu); });
    RD.tatatertib.kes.forEach(function (k) { add('Tindakan tatatertib', 'tadbir', k.n, k.jw + ' · kini: ' + k.kini, k.hukumanAsal + ' ' + k.hukumanRayuan); });
    /* angka penting supaya carian nombor berfungsi */
    [
      ['4,093 · −RM4.09 bilion', 'hibah', 'Kekurangan aset berbanding liabiliti pada akhir 2017 selepas hibah dibayar'],
      ['1,313 · 1,310 · RM1.3 bilion', 'rosot', 'Rosot nilai yang sepatutnya direkod 2017 di bawah polisi lama / FRS 139'],
      ['227.81', 'rosot', 'Rosot nilai subsidiari dan syarikat bersekutu yang tidak direkod pada 2017'],
      ['4,466 · RAV uplift', 'hibah', 'Nilai tambahan RAV yang menukar defisit menjadi lebihan RM373 juta'],
      ['10,171 · RM10.2 bilion', 'ujsb', 'Premium nilai pemindahan aset ke UJSB di atas nilai pasaran'],
      ['27,500 · RM27.5 bilion', 'ujsb', 'Nilai nominal Sukuk UJSB yang matang 2026 dan 2029'],
      ['17,800 · RM17.8 bilion', 'ujsb', 'Peruntukan yang diluluskan Jemaah Menteri untuk penebusan Sukuk UJSB'],
      ['88 bilion', 'deposit', 'Nilai jaminan Kerajaan ke atas deposit pendeposit LTH'],
      ['742.47 · RM742 juta', 'hafis', 'Unjuran beban HAFIS setahun menjelang 2030'],
      ['9,980', 'hafis', 'Bayaran haji Muassasah yang dibekukan dari 2009 hingga 2021'],
      ['12,980', 'hafis', 'Bayaran haji bukan B40 mulai 2022 dan cadangan deposit minimum baharu'],
      ['1,058,937,380 · FGV', 'pelaburan', 'Kerugian tidak nyata LTH dalam FGV Berhad'],
      ['2,193,400 · RM2.2 juta', 'bonus', 'Bonus istimewa TH Properties 2017 dan 2018 tanpa kelulusan pemegang saham']
    ].forEach(function (a) { add('Angka', a[1], a[0], a[2]); });
    return out;
  })();

  function renderSearch(q) {
    q = (q || '').trim().toLowerCase();
    var box = $('#searchResults');
    if (!q) {
      box.innerHTML = '<p class="ss-empty">Cari nama, syarikat, angka, tarikh atau istilah. ' +
        'Contoh: <b>Al-Rawda</b> · <b>227.81</b> · <b>rosot nilai</b> · <b>Rozaida</b> · <b>Sukuk</b> · <b>2018</b></p>';
      return;
    }
    var terms = q.split(/\s+/);
    var hits = INDEX.filter(function (r) {
      return terms.every(function (t) { return r.hay.indexOf(t) >= 0; });
    }).slice(0, 40);
    if (!hits.length) {
      box.innerHTML = '<p class="ss-empty">Tiada hasil untuk “' + L.esc(q) + '”. ' +
        'Cuba perkataan lain, atau lihat <a href="#/sumber" data-close="1">glosari penuh</a>.</p>';
      return;
    }
    box.innerHTML = hits.map(function (r) {
      return '<a href="#/' + r.view + '" data-close="1"><span class="sk">' + L.esc(r.kind) + '</span>' +
        '<b>' + L.esc(r.title) + '</b><p>' + L.esc(String(r.body || '').slice(0, 170)) + '</p></a>';
    }).join('');
  }

  /* ------------------------------ mula --------------------------------- */
  if (!location.hash) location.replace('#/ringkasan');
  renderView(false);
})();
