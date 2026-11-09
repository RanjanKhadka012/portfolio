import './style.css';

const navigation = document.querySelector('#site-navigation');
const menuButton = document.querySelector('#menu-toggle');
const menuLinks = document.querySelector('#site-links');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const compactNavigation = window.matchMedia('(max-width: 760px)');

// Navigation stays visible in the HTML/CSS fallback until these controls work.
if (navigation && menuButton && menuLinks) {
  const setMenuOpen = (open, returnFocus = false) => {
    navigation.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    if (returnFocus) menuButton.focus();
  };

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  menuLinks.addEventListener('click', event => {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false, true);
    }
  });
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target)) setMenuOpen(false);
  });
  navigation.addEventListener('focusout', event => {
    if (!navigation.contains(event.relatedTarget)) setMenuOpen(false);
  });
  compactNavigation.addEventListener('change', () => setMenuOpen(false));
  document.documentElement.classList.add('has-js');
}

const revealTargets = [...document.querySelectorAll('[data-reveal]')];
let revealObserver;

function configureReveals() {
  revealObserver?.disconnect();
  revealTargets.forEach(element => element.classList.remove('will-reveal'));
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;

  try {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('will-reveal');
        entry.target.dataset.seen = 'true';
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    revealTargets.forEach(element => {
      const bounds = element.getBoundingClientRect();
      if (element.dataset.seen || bounds.top < window.innerHeight) {
        element.dataset.seen = 'true';
        return;
      }
      element.classList.add('will-reveal');
      revealObserver.observe(element);
    });
  } catch {
    revealObserver?.disconnect();
    revealTargets.forEach(element => element.classList.remove('will-reveal'));
  }
}

configureReveals();

const progress = document.querySelector('#reading-progress');
const researchScenes = [...document.querySelectorAll('[data-parallax]')].map(element => ({
  element,
  // Measure a stable parent, rather than feeding the transformed bounds back in.
  container: element.closest('figure') || element,
}));
const wideScreen = window.matchMedia('(min-width: 900px)');
let pendingFrame = false;

function updateScrollEffects() {
  pendingFrame = false;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const fraction = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  if (progress) progress.style.transform = `scaleX(${fraction})`;
  researchScenes.forEach(({ element, container }) => {
    if (motionPreference.matches) {
      element.style.removeProperty('transform');
      return;
    }
    const bounds = container.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
    const distance = window.innerHeight * 0.85;
    const travel = Math.min(1, Math.max(0, (distance - bounds.top) / distance));
    const scale = wideScreen.matches ? 0.94 + travel * 0.06 : 0.98 + travel * 0.02;
    const offset = (1 - travel) * (wideScreen.matches ? 38 : 18);
    // Expand the complete scene into place; never zoom past its full composition.
    element.style.transform = `translateY(${-offset}px) scale(${scale})`;
  });
}

function requestScrollEffects() {
  if (pendingFrame) return;
  pendingFrame = true;
  window.requestAnimationFrame(updateScrollEffects);
}

window.addEventListener('scroll', requestScrollEffects, { passive: true });
window.addEventListener('resize', requestScrollEffects, { passive: true });
window.addEventListener('load', requestScrollEffects);
window.addEventListener('pageshow', () => {
  configureReveals();
  requestScrollEffects();
});
motionPreference.addEventListener('change', () => {
  configureReveals();
  requestScrollEffects();
});
wideScreen.addEventListener('change', requestScrollEffects);
document.querySelectorAll('details').forEach(element => {
  element.addEventListener('toggle', requestScrollEffects);
});
requestScrollEffects();
