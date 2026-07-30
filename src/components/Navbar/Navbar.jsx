'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Navbar.module.css';
import { smoothScrollToElement, smoothScrollTo } from '../../utils/smoothScroll';
import { useLanguage } from '../../i18n/LanguageContext';

function LangSwitch({ className, lang, setLang }) {
  return (
    <div className={className}>
      <div className={styles.langSwitch}>
        <button
          className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
          onClick={() => setLang('en')}
        >
          EN
        </button>
        <span className={styles.langDivider}>|</span>
        <button
          className={`${styles.langBtn} ${lang === 'pt' ? styles.langActive : ''}`}
          onClick={() => setLang('pt')}
        >
          PT
        </button>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <span className={styles.logoMark} aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 21.5 L32 10.5 L18.5 22.5 Z" fill="currentColor" />
        <path d="M18.5 22.5 L32 10.5 L22.5 30 Z" fill="currentColor" opacity="0.55" />
      </svg>
    </span>
  );
}

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [loaded, setLoaded] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setScrolled(currentY > 40);
    setHidden(currentY > 120 && currentY > lastScrollY.current);
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e, href) => {
    if (!href.startsWith('#')) {
      // Real route (e.g. /galeria) — let the browser navigate normally.
      setMenuOpen(false);
      return;
    }

    e.preventDefault();
    setActiveLink(href);
    setMenuOpen(false);

    const targetId = href.replace('#', '');
    if (!targetId) {
      smoothScrollTo(0, 1000);
      return;
    }
    const el = document.getElementById(targetId);
    if (el) smoothScrollToElement(el, 1000);
  };

  const navbarClasses = [
    styles.navbar,
    scrolled ? styles.scrolled : '',
    hidden ? styles.hidden : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={navbarClasses}>
      <div className={`${styles.navbarInner} ${loaded ? styles.loaded : ''}`}>
        <a
          href="#"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo(0, 900);
          }}
        >
          <Logo />
          <span className={styles.logoText}>
            <span className={styles.logoName}>KRONS</span>
            <span className={styles.logoSub}>Training and Consulting</span>
          </span>
        </a>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          {t.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.navLink} ${activeLink === link.href ? styles.active : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className={styles.langMobile}>
            <LangSwitch lang={lang} setLang={setLang} />
          </li>
        </ul>

        <LangSwitch className={styles.langDesktop} lang={lang} setLang={setLang} />

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>
    </nav>
  );
}
