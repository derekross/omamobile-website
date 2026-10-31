// Apply the saved theme before first paint. A file, not an inline script:
// the server's Content-Security-Policy allows scripts from the site only.
try {
  const t = localStorage.getItem("theme");
  if (t) document.documentElement.dataset.theme = t;
} catch {}
