(function () {
  'use strict';

  const rail = document.getElementById('rail');
  const scrim = document.getElementById('scrim');
  const nav = document.getElementById('nav');
  const view = document.getElementById('view');
  const burger = document.getElementById('burger');
  const close = document.getElementById('railClose');
  const dock = document.getElementById('chapterDock');
  const theme = document.getElementById('btnTema');
  const glossary = document.getElementById('btnIstilah');
  const currentIndex = document.getElementById('currentIndex');
  const currentChapter = document.getElementById('currentChapter');
  const currentKicker = document.getElementById('currentKicker');
  const dockIndex = document.getElementById('dockIndex');
  const dockChapter = document.getElementById('dockChapter');
  const dockKicker = document.getElementById('dockKicker');
  const progress = document.getElementById('readingProgress');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function activeButton() {
    return nav && nav.querySelector('button.on');
  }

  function closeIndex(focusTrigger) {
    if (!rail) return;
    if (rail.classList.contains('open')) rail.classList.remove('open');
    if (scrim?.classList.contains('on')) scrim.classList.remove('on');
    if (document.body.classList.contains('menu-open')) document.body.classList.remove('menu-open');
    rail.setAttribute('aria-hidden', 'true');
    burger?.setAttribute('aria-expanded', 'false');
    dock?.setAttribute('aria-expanded', 'false');
    if (focusTrigger) burger?.focus();
  }

  function openIndex() {
    if (!rail) return;
    document.body.classList.add('menu-open');
    rail.setAttribute('aria-hidden', 'false');
    burger?.setAttribute('aria-expanded', 'true');
    dock?.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => activeButton()?.focus());
  }

  function numberElements() {
    if (!view) return;
    view.querySelectorAll('.card').forEach((card, index) => {
      card.dataset.exhibit = String(index + 1).padStart(2, '0');
    });
    view.querySelectorAll('.grid').forEach((grid) => {
      grid.querySelectorAll(':scope > .kpi').forEach((kpi, index) => {
        kpi.dataset.kpi = String(index + 1).padStart(2, '0');
      });
    });
  }

  function syncChapter() {
    const active = activeButton();
    if (!active) return;
    const index = active.querySelector('.num')?.textContent || '';
    const label = active.dataset.label || active.querySelector('.nav-copy strong')?.textContent || '';
    const kicker = active.dataset.kicker || active.querySelector('.nav-copy small')?.textContent || '';

    if (currentIndex) currentIndex.textContent = index;
    if (currentChapter) currentChapter.textContent = label;
    if (currentKicker) currentKicker.textContent = kicker;
    if (dockIndex) dockIndex.textContent = index;
    if (dockChapter) dockChapter.textContent = label;
    if (dockKicker) dockKicker.textContent = kicker;

    nav.querySelectorAll('button').forEach((button) => {
      if (button === active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });

    document.title = `${label} — Meneroka Laporan RCI Tabung Haji`;
    closeIndex(false);
  }

  function syncTheme() {
    const alternate = document.documentElement.getAttribute('data-tema') === 'cerah';
    theme?.setAttribute('aria-pressed', String(alternate));
    if (themeMeta) themeMeta.content = alternate ? '#11110f' : '#eee9dd';
  }

  function syncProgress() {
    if (!progress || !view) return;
    const start = view.getBoundingClientRect().top + window.scrollY - 80;
    const total = Math.max(1, view.offsetHeight - window.innerHeight + 140);
    const value = Math.max(0, Math.min(1, (window.scrollY - start) / total));
    progress.style.width = `${value * 100}%`;
  }

  function refreshShell() {
    syncChapter();
    syncTheme();
    numberElements();
    syncProgress();
  }

  close?.addEventListener('click', () => closeIndex(true));
  dock?.addEventListener('click', () => burger?.click());
  burger?.addEventListener('click', () => requestAnimationFrame(openIndex));
  nav?.addEventListener('click', () => requestAnimationFrame(refreshShell));
  theme?.addEventListener('click', () => requestAnimationFrame(refreshShell));
  glossary?.addEventListener('click', () => requestAnimationFrame(refreshShell));
  document.addEventListener('rci:navigate', () => requestAnimationFrame(refreshShell));
  window.addEventListener('scroll', syncProgress, { passive: true });
  window.addEventListener('resize', syncProgress, { passive: true });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && rail?.classList.contains('open')) closeIndex(true);
  });

  function initialise() {
    refreshShell();
  }

  document.addEventListener('DOMContentLoaded', initialise);
  if (document.readyState !== 'loading') initialise();
  else setTimeout(initialise, 0);
})();
