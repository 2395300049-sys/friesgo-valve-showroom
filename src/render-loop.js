// Render only while a view changes. Both viewers share this scheduler.
export function createRenderLoop(draw, {continuous = () => false, fps = 60} = {}) {
  let pending = 0, until = 0, previous = -Infinity, drawing = false, suspended = false;
  const interval = 1000 / fps;
  function request(duration = 150) {
    until = Math.max(until, performance.now() + duration);
    if (!pending && !drawing && !suspended && !document.hidden) pending = requestAnimationFrame(frame);
  }
  function frame(now) {
    pending = 0;
    if (document.hidden || suspended) return;
    if (now - previous >= interval - 1) {
      previous = now;
      drawing = true;
      try { draw(now); } finally { drawing = false; }
    }
    if (now < until || continuous()) pending = requestAnimationFrame(frame);
  }
  for (const name of ['click', 'input', 'change', 'keydown', 'pointerdown', 'pointerup', 'wheel']) {
    document.addEventListener(name, () => request(1700), {passive: true, capture: true});
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(pending); pending = 0; }
    else request(300);
  });
  window.addEventListener('resize', () => request(300), {passive: true});
  request(1800);
  return {request, stop() { suspended = true; cancelAnimationFrame(pending); pending = 0; }};
}
