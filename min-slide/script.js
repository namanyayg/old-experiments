window.addEventListener('DOMContentLoaded', () => {
  const slides = [...document.querySelectorAll('.slide')];
  const container = document.querySelector('.slider-cont');
  const play = document.getElementById('play');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, timer = null;
  container.style.width = `${slides.length * 100}%`;
  slides.forEach(slide => { slide.style.width = `${100 / slides.length}%`; });
  function show(offset = 0) {
    current = (current + offset + slides.length) % slides.length;
    container.style.marginLeft = `-${current * 100}%`;
    slides.forEach((slide, i) => { slide.inert = i !== current; slide.setAttribute('aria-hidden', String(i !== current)); });
    document.getElementById('position').textContent = `${current + 1} / ${slides.length}`;
  }
  function pause() { clearInterval(timer); timer = null; play.textContent = 'Play'; }
  play.addEventListener('click', () => {
    if (timer) pause();
    else { timer = setInterval(() => show(1), 5000); play.textContent = 'Pause'; }
  });
  document.getElementById('previous').addEventListener('click', () => { pause(); show(-1); });
  document.getElementById('next').addEventListener('click', () => { pause(); show(1); });
  window.addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault(); pause(); show(e.key === 'ArrowRight' ? 1 : -1);
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) pause(); });
  show();
});
