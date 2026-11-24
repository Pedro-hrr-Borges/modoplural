(() => {
  'use strict';
  const root = document.documentElement;
  const increase = document.querySelector('[data-font="increase"]');
  const decrease = document.querySelector('[data-font="decrease"]');
  const contrast = document.querySelector('[data-contrast]');
  const reset = document.querySelector('[data-reset]');
  const storage = (() => {
    try { return window.sessionStorage; } catch { return null; }
  })();
  const read = (key) => {
    try { return storage?.getItem(key); } catch { return null; }
  };
  const save = (key, value) => {
    try { storage?.setItem(key, String(value)); } catch {}
  };

  let scale = Number(read('modoplural-scale')) || 1;
  scale = Math.max(1, Math.min(1.4, scale));
  let highContrast = read('modoplural-contrast') === 'true';

  function apply() {
    root.style.setProperty('--scale', scale.toFixed(2));
    root.classList.toggle('high-contrast', highContrast);
    contrast?.setAttribute('aria-pressed', String(highContrast));
    save('modoplural-scale', scale);
    save('modoplural-contrast', highContrast);
  }

  increase?.addEventListener('click', () => { scale = Math.min(1.4, Math.round((scale + .1) * 10) / 10); apply(); });
  decrease?.addEventListener('click', () => { scale = Math.max(1, Math.round((scale - .1) * 10) / 10); apply(); });
  contrast?.addEventListener('click', () => { highContrast = !highContrast; apply(); });
  reset?.addEventListener('click', () => { scale = 1; highContrast = false; apply(); });
  apply();
})();
