// footer.js
(async function injectFooter() {
  try {
    const host = document.getElementById('site-footer');
    if (!host) return;

    const res = await fetch('partials/footer.html', { cache: 'no-store' });
    const html = await res.text();
    host.innerHTML = html;

    // Year
    const y = document.getElementById('footer-year');
    if (y) y.textContent = new Date().getFullYear();

    // Back to top
    const btn = document.getElementById('backToTop');
    if (btn) {
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  } catch (e) {
    console.error('Footer load failed:', e);
  }
})();
