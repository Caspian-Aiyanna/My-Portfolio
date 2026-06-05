// theme.js — conservative Light/Dark toggle
(function () {
  const KEY = "site-theme";      // "light" | "dark"
  const root = document.documentElement;
  const btn  = () => document.getElementById("themeToggle");
  const icon = () => document.getElementById("themeIcon");

  // Always default to light unless user saved a choice
  const saved   = localStorage.getItem(KEY);
  const initial = saved === "dark" ? "dark" : "light";

  function apply(theme) {
    if (theme === "dark") {
      root.setAttribute("data-bs-theme", "dark");
      if (icon()) icon().className = "bi bi-sun-fill";
    } else {
      // Remove attribute so Bootstrap falls back to its default light palette
      root.removeAttribute("data-bs-theme");
      if (icon()) icon().className = "bi bi-moon-stars-fill";
    }
  }

  function toggle() {
    const current = root.getAttribute("data-bs-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(KEY, next);
    apply(next);
  }

  // Initialize immediately
  apply(initial);

  // Wire up after navbar has been injected
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => { if (btn()) btn().addEventListener("click", toggle); }, 0);
    
    // Dynamically load paws.js for reactive background
    const pawScript = document.createElement("script");
    const themeScript = document.querySelector('script[src$="theme.js"]');
    if (themeScript) {
      pawScript.src = themeScript.src.replace("theme.js", "paws.js");
      pawScript.defer = true;
      document.body.appendChild(pawScript);
    }
  });
})();
