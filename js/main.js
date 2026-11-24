// Preferências de leitura: controles opcionais com fallback em HTML puro.
(() => {
  'use strict';
  const root = document.documentElement;
  const increase = document.querySelector('[data-font="increase"]');
  const decrease = document.querySelector('[data-font="decrease"]');
  const contrast = document.querySelector('[data-contrast]');
  const reset = document.querySelector('[data-reset]');

  // As alterações persistem apenas enquanto a aba estiver aberta.
  const storage = (() => {
    try { return window.sessionStorage; } catch { return null; }
  })();
  const read = (key) => {
    try { return storage?.getItem(key); } catch { return null; }
  };
  const save = (key, value) => {
    try { storage?.setItem(key, String(value)); } catch { /* Armazenamento opcional. */ }
  };

  let scale = Number(read('entre-nos-scale')) || 1;
  scale = Math.max(1, Math.min(1.4, scale));
  let highContrast = read('entre-nos-contrast') === 'true';

  function apply() {
    root.style.setProperty('--scale', scale.toFixed(2));
    root.classList.toggle('high-contrast', highContrast);
    contrast?.setAttribute('aria-pressed', String(highContrast));
    save('entre-nos-scale', scale);
    save('entre-nos-contrast', highContrast);
  }

  increase?.addEventListener('click', () => { scale = Math.min(1.4, Math.round((scale + .1) * 10) / 10); apply(); });
  decrease?.addEventListener('click', () => { scale = Math.max(1, Math.round((scale - .1) * 10) / 10); apply(); });
  contrast?.addEventListener('click', () => { highContrast = !highContrast; apply(); });
  reset?.addEventListener('click', () => { scale = 1; highContrast = false; apply(); });
  apply();
})();
