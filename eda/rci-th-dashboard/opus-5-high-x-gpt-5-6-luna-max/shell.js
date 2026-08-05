(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const rail = document.getElementById('rail');
  const scrim = document.getElementById('scrim');
  const burger = document.getElementById('burger');
  const view = document.getElementById('view');
  const topbarView = document.getElementById('topbarView');
  const progressBar = document.getElementById('progressBar');
  if (!nav || !rail || !scrim || !burger || !view || !topbarView) return;

  let progressFrame = 0;

  function syncCurrentChapter() {
    const active = [...nav.querySelectorAll('button')].find((button) => button.classList.contains('on'));
    [...nav.querySelectorAll('button')].forEach((button) => {
      if (button === active) {
        button.setAttribute('aria-current', 'page');
      } else {
        button.removeAttribute('aria-current');
      }
    });

    if (!active) return;
    const number = active.querySelector('.num')?.textContent?.trim() || '01';
    const name = active.textContent.replace(number, '').trim().replace(/\s+/g, ' ');
    topbarView.textContent = `${number} / ${name.toUpperCase()}`;
    document.title = `Meneroka Laporan RCI Tabung Haji — ${name}`;
    view.dataset.module = active.dataset.id || '';
  }

  function revealPanels() {
    view.querySelectorAll('.card, .kpi').forEach((node, index) => {
      if (node.dataset.revealed) return;
      node.dataset.revealed = 'true';
      node.style.setProperty('--reveal-delay', `${Math.min(index, 10) * 22}ms`);
    });
  }

  function setMenu(open) {
    const wasOpen = rail.classList.contains('open');
    rail.classList.toggle('open', open);
    scrim.classList.toggle('on', open);
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    rail.setAttribute('aria-hidden', String(!open && window.innerWidth <= 960));
    if (open) {
      const first = nav.querySelector('button');
      if (first) window.setTimeout(() => first.focus(), 40);
    } else if (wasOpen) {
      burger.focus({ preventScroll: true });
    }
  }

  function updateProgress() {
    progressFrame = 0;
    if (!progressBar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    progressBar.style.width = `${pct}%`;
  }

  function requestProgressUpdate() {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(updateProgress);
  }

  function syncVibeBenchOffset() {
    document.body.classList.toggle('vb-at-top', window.innerWidth <= 960 && window.scrollY <= 2);
  }

  const navObserver = new MutationObserver(syncCurrentChapter);
  navObserver.observe(nav, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });

  const viewObserver = new MutationObserver(() => {
    revealPanels();
    requestProgressUpdate();
  });
  viewObserver.observe(view, { childList: true, subtree: true });

  burger.onclick = () => setMenu(!rail.classList.contains('open'));
  scrim.addEventListener('click', () => setMenu(false));
  nav.addEventListener('click', () => {
    if (window.innerWidth <= 960) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && rail.classList.contains('open')) setMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) setMenu(false);
    rail.setAttribute('aria-hidden', String(window.innerWidth <= 960 && !rail.classList.contains('open')));
    syncVibeBenchOffset();
    requestProgressUpdate();
  }, { passive: true });
  window.addEventListener('scroll', () => {
    requestProgressUpdate();
    syncVibeBenchOffset();
  }, { passive: true });
  window.addEventListener('hashchange', syncCurrentChapter);

  syncCurrentChapter();
  revealPanels();
  updateProgress();
  syncVibeBenchOffset();
  rail.setAttribute('aria-hidden', String(window.innerWidth <= 960));
})();
