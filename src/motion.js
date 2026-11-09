const STORAGE_KEY = 'portfolio-motion';
let initialized = false;

function matchMedia(query) {
  try {
    return window.matchMedia(query);
  } catch {
    return null;
  }
}

function listenToMedia(media, listener) {
  if (typeof media?.addEventListener === 'function') {
    media.addEventListener('change', listener);
  } else if (typeof media?.addListener === 'function') {
    media.addListener(listener);
  }
}

export function initMotion() {
  if (initialized) return;
  initialized = true;

  const root = document.documentElement;
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let userChoice = null;
  try {
    const storedChoice = window.localStorage.getItem(STORAGE_KEY);
    if (storedChoice === 'full' || storedChoice === 'reduce') userChoice = storedChoice;
  } catch {
    // A blocked storage area must not prevent a choice for this visit.
  }
  let mode = userChoice ?? (motionPreference?.matches ? 'reduce' : 'full');
  // CSS starts static; establish the preference before setting up enhancements.
  root.dataset.motion = mode;

  const toggle = document.querySelector('#motion-toggle');
  const label = toggle?.querySelector('[data-motion-label]');
  const replay = document.querySelector('#motion-replay');
  const status = document.querySelector('#motion-status');
  const revealTargets = [...document.querySelectorAll('[data-reveal]')];
  const progress = document.querySelector('#reading-progress');
  const scenes = [...document.querySelectorAll('[data-parallax]')].map(element => ({
    element,
    // Transformed image bounds would feed their own movement into the next frame.
    container: element.closest('figure') || element.parentElement || element,
  }));
  const wideScreen = matchMedia('(min-width: 900px)');
  let revealObserver = null;
  let pendingFrame = null;

  function updateControls() {
    const full = mode === 'full';
    if (toggle) {
      toggle.hidden = false;
    }
    if (label) label.textContent = full ? 'Pause animations' : 'Play animations';
    if (replay) replay.hidden = !full;
    if (status) {
      status.hidden = false;
      status.textContent = full
        ? 'Animations on'
        : userChoice === null
          ? 'Motion reduced to match your device.'
          : 'Animations paused';
    }
  }

  function configureReveals() {
    revealObserver?.disconnect();
    revealObserver = null;
    revealTargets.forEach(element => element.classList.remove('will-reveal'));
    if (mode !== 'full' || typeof window.IntersectionObserver !== 'function') return;

    try {
      const observer = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove('will-reveal');
          entry.target.dataset.seen = 'true';
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
      revealObserver = observer;

      revealTargets.forEach(element => {
        if (element.dataset.seen === 'true' || element.getBoundingClientRect().top < window.innerHeight) {
          element.dataset.seen = 'true';
          return;
        }
        element.classList.add('will-reveal');
        observer.observe(element);
      });
    } catch {
      revealObserver?.disconnect();
      revealObserver = null;
      revealTargets.forEach(element => element.classList.remove('will-reveal'));
    }
  }

  function updateScrollEffects() {
    pendingFrame = null;
    const scrollable = root.scrollHeight - window.innerHeight;
    const fraction = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    if (progress) progress.style.transform = `scaleX(${fraction})`;
    scenes.forEach(({ element, container }) => {
      if (mode !== 'full') {
        element.style.removeProperty('transform');
        return;
      }
      const bounds = container.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      const distance = window.innerHeight * 0.85;
      const travel = Math.min(1, Math.max(0, (distance - bounds.top) / distance));
      const desktop = wideScreen?.matches ?? window.innerWidth >= 900;
      const scale = desktop ? 0.94 + travel * 0.06 : 0.98 + travel * 0.02;
      const offset = (1 - travel) * (desktop ? 38 : 18);
      element.style.transform = `translateY(${-offset}px) scale(${scale})`;
    });
  }

  function requestScrollEffects() {
    if (pendingFrame !== null) return;
    if (typeof window.requestAnimationFrame !== 'function') {
      updateScrollEffects();
      return;
    }
    pendingFrame = window.requestAnimationFrame(updateScrollEffects);
  }

  function replayIntro() {
    if (mode !== 'full') return;
    root.classList.add('replay-intro');
    void root.offsetWidth;
    root.classList.remove('replay-intro');
  }

  function setMode(nextMode, restartIntro = false) {
    mode = nextMode;
    root.dataset.motion = mode;
    updateControls();
    configureReveals();
    if (pendingFrame !== null && typeof window.cancelAnimationFrame === 'function') {
      window.cancelAnimationFrame(pendingFrame);
      pendingFrame = null;
    }
    updateScrollEffects();
    if (restartIntro) replayIntro();
  }

  toggle?.addEventListener('click', () => {
    userChoice = mode === 'full' ? 'reduce' : 'full';
    try {
      window.localStorage.setItem(STORAGE_KEY, userChoice);
    } catch {
      // Keep the explicit preference in memory when persistence is unavailable.
    }
    setMode(userChoice, userChoice === 'full');
  });
  replay?.addEventListener('click', replayIntro);

  window.addEventListener('scroll', requestScrollEffects, { passive: true });
  window.addEventListener('resize', requestScrollEffects, { passive: true });
  window.addEventListener('load', requestScrollEffects);
  window.addEventListener('pageshow', () => {
    configureReveals();
    requestScrollEffects();
  });
  listenToMedia(motionPreference, () => {
    if (userChoice === null) setMode(motionPreference.matches ? 'reduce' : 'full');
  });
  listenToMedia(wideScreen, requestScrollEffects);
  document.querySelectorAll('details').forEach(element => {
    element.addEventListener('toggle', requestScrollEffects);
  });

  updateControls();
  configureReveals();
  updateScrollEffects();
}
