(function () {
  'use strict';

  const rail = document.getElementById('rail');
  const scrim = document.getElementById('scrim');
  const nav = document.getElementById('nav');
  const current = document.getElementById('currentChapter');
  const currentIndex = document.getElementById('currentIndex');
  const currentKicker = document.getElementById('currentKicker');
  const dock = document.getElementById('chapterDock');
  const dockChapter = document.getElementById('dockChapter');
  const dockIndex = document.getElementById('dockIndex');
  const dockKicker = document.getElementById('dockKicker');
  const progress = document.getElementById('readingProgress');
  const burger = document.getElementById('burger');
  const themeButton = document.getElementById('btnTema');

  function syncShell() {
    const active = nav && nav.querySelector('button.on');
    if (active && current) current.textContent = active.dataset.label || '';
    if (active && currentIndex) currentIndex.textContent = active.querySelector('.num')?.textContent || '';
    if (active && currentKicker) currentKicker.textContent = active.dataset.kicker || '';
    if (active && dockChapter) dockChapter.textContent = active.dataset.label || '';
    if (active && dockIndex) dockIndex.textContent = active.querySelector('.num')?.textContent || '';
    if (active && dockKicker) dockKicker.textContent = active.dataset.kicker || '';

    if (active && progress && nav) {
      const chapters = [...nav.querySelectorAll('button')];
      const position = chapters.indexOf(active) + 1;
      progress.style.width = `${(position / chapters.length) * 100}%`;
    }

    if (nav) {
      nav.querySelectorAll('button').forEach((button) => {
        if (button === active) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
      });
    }

    if (themeButton) {
      const alternate = document.documentElement.getAttribute('data-tema') === 'gelap';
      themeButton.setAttribute('aria-pressed', String(alternate));
      themeButton.title = 'Tukar warna paparan';
    }

    if (burger && rail) burger.setAttribute('aria-expanded', String(rail.classList.contains('open')));
    if (dock && rail) dock.setAttribute('aria-expanded', String(rail.classList.contains('open')));
    if (scrim) scrim.setAttribute('aria-hidden', String(!scrim.classList.contains('on')));
  }

  if (nav) new MutationObserver(syncShell).observe(nav, { attributes: true, subtree: true, attributeFilter: ['class'] });
  if (rail) new MutationObserver(syncShell).observe(rail, { attributes: true, attributeFilter: ['class'] });
  new MutationObserver(syncShell).observe(document.documentElement, { attributes: true, attributeFilter: ['data-tema'] });
  if (themeButton) themeButton.addEventListener('click', () => requestAnimationFrame(syncShell));
  if (dock && burger) dock.addEventListener('click', () => burger.click());

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !rail || !rail.classList.contains('open')) return;
    rail.classList.remove('open');
    if (scrim) scrim.classList.remove('on');
    burger?.focus();
  });

  document.addEventListener('DOMContentLoaded', syncShell);
  if (document.readyState !== 'loading') syncShell();
})();
