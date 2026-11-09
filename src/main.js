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
    }, { threshold: 0.04, rootMargin: '0px 0px 20px 0px' });

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
const researchScene = document.querySelector('[data-parallax]');
const wideScreen = window.matchMedia('(min-width: 900px)');
let pendingFrame = false;

function updateScrollEffects() {
  pendingFrame = false;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const fraction = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  if (progress) progress.style.transform = `scaleX(${fraction})`;
  if (!researchScene) return;
  if (motionPreference.matches || !wideScreen.matches) {
    researchScene.style.removeProperty('transform');
    return;
  }
  const bounds = researchScene.getBoundingClientRect();
  if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
  const travel = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
  // Move the complete scene so no object class is cropped away.
  researchScene.style.transform = `translateY(${(travel - 0.5) * -12}px)`;
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
