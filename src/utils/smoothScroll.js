const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function smoothScrollTo(targetY, duration = 900) {
  const html = document.documentElement;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  const previousSnapType = html.style.scrollSnapType;
  html.style.scrollSnapType = 'none';

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      html.style.scrollSnapType = previousSnapType;
    }
  };

  requestAnimationFrame(step);
}

export function smoothScrollToElement(el, duration = 900) {
  const targetY = el.getBoundingClientRect().top + window.scrollY;
  smoothScrollTo(targetY, duration);
}
