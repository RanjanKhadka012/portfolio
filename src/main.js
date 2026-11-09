import './style.css';
import { initMotion } from './motion.js';

const navigation = document.querySelector('#site-navigation');
const menuButton = document.querySelector('#menu-toggle');
const menuLinks = document.querySelector('#site-links');
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

initMotion();
