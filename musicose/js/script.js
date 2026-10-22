window.addEventListener('DOMContentLoaded', () => {
  const names = ['home', 'work', 'contact'];
  const titles = ['Home', 'Our Work', 'Contact Us'];
  const container = document.querySelector('.pages-container');
  let current = 0;
  function show() {
    const found = names.indexOf(location.hash.slice(1));
    current = found < 0 ? 0 : found;
    container.style.transform = `translateX(-${current * 100 / names.length}%)`;
    document.title = 'MusiCose - ' + titles[current];
    names.forEach((name, i) => {
      const panel = document.getElementById(name);
      panel.inert = i !== current;
      panel.setAttribute('aria-hidden', String(i !== current));
      const link = document.querySelector('nav a[href="#' + name + '"]');
      if (i === current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
  window.addEventListener('hashchange', show);
  window.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault();
    location.hash = names[(current + (e.key === 'ArrowRight' ? 1 : names.length - 1)) % names.length];
  });
  show();
});
