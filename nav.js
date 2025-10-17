// nav.js
(async function injectNavbar() {
  try {
    const host = document.getElementById('site-nav');
    if (!host) return;

    const res = await fetch('partials/navbar.html', { cache: 'no-store' });
    const html = await res.text();
    host.innerHTML = html;

    // Mark active link based on current page
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('#nav-links .nav-link').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (href === path) a.classList.add('active');
    });

  } catch (e) {
    console.error('Navbar load failed:', e);
  }
})();
