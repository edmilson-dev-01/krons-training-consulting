'use client';

import styles from './Footer.module.css';
import { smoothScrollTo, smoothScrollToElement } from '../../utils/smoothScroll';
import { useLanguage } from '../../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  const whatsappDigits = f.whatsapp.replace(/[^\d]/g, '');
  const whatsappHref = `https://wa.me/${whatsappDigits}`;
  const phoneDigits = f.phone.replace(/[^\d]/g, '');

  const handleNav = (e, href) => {
    if (!href.startsWith('#')) return; // real route (e.g. /galeria) — normal navigation

    e.preventDefault();
    const id = href.replace('#', '');
    // On subpages the section anchors don't exist — go back to the homepage first.
    if (window.location.pathname !== '/') {
      window.location.assign(id ? `/${href}` : '/');
      return;
    }
    if (!id) return smoothScrollTo(0, 900);
    const el = document.getElementById(id);
    if (el) smoothScrollToElement(el, 900);
  };

  return (
    <footer className={styles.footer}>
      <button className={styles.backTop} onClick={() => smoothScrollTo(0, 900)}>
        {f.backToTop}
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 12.5L12.5 3.5M12.5 3.5H5M12.5 3.5V11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.main}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoMark} aria-hidden="true">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M7 21.5 L32 10.5 L18.5 22.5 Z" fill="currentColor" />
                <path d="M18.5 22.5 L32 10.5 L22.5 30 Z" fill="currentColor" opacity="0.55" />
              </svg>
            </span>
            <span className={styles.logoText}>
              <span className={styles.logoName}>KRONS</span>
              <span className={styles.logoSub}>Training and Consulting</span>
            </span>
          </div>
          <p className={styles.tagline}>{f.tagline}</p>
          <div className={styles.socials}>
            <a
              href={f.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
              aria-label="Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-7.8h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.14C15.9 4.06 15.03 4 14 4c-2.15 0-3.62 1.31-3.62 3.72v2.48H7.77v3h2.61V21h3.12Z" />
              </svg>
            </a>
            <a
              href={f.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
              aria-label="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.5 8.65 22 11 22 14.1V21h-4v-6.2c0-1.5-.03-3.4-2.08-3.4-2.08 0-2.4 1.62-2.4 3.3V21h-4V9Z" />
              </svg>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.social} ${styles.whatsapp}`}
              aria-label={f.whatsappAriaLabel}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.46-.15-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.58-.9-2.16-.24-.57-.48-.49-.65-.5h-.56c-.19 0-.5.07-.77.36-.26.29-1 .98-1 2.4s1.03 2.78 1.17 2.97c.15.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.32.19 1.81.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34Z" />
                <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.87.51 3.63 1.4 5.13L2 22l5-1.35A9.96 9.96 0 0 0 12.02 22C17.52 22 22 17.52 22 12S17.52 2 12.02 2Zm0 18.2c-1.68 0-3.25-.48-4.58-1.32l-.33-.2-3.05.82.82-2.98-.21-.31A8.17 8.17 0 0 1 3.83 12c0-4.53 3.68-8.2 8.19-8.2 4.5 0 8.18 3.67 8.18 8.2s-3.68 8.2-8.18 8.2Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>{f.navHeading}</h4>
          {f.navLinks.map((link) => (
            <a
              href={link.href}
              key={link.href}
              className={styles.link}
              onClick={(e) => handleNav(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>{f.contactsHeading}</h4>
          <div className={styles.contact}>
            <span className={styles.contactLabel}>{f.siteLabel}</span>
            <a href={`https://${f.website}`} target="_blank" rel="noopener noreferrer">
              {f.website}
            </a>
          </div>
          <div className={styles.contact}>
            <span className={styles.contactLabel}>{f.emailLabel}</span>
            <span className={styles.emails}>
              <a href={`mailto:${f.email}`}>{f.email}</a>
              <a href={`mailto:${f.email2}`}>{f.email2}</a>
            </span>
          </div>
          <div className={styles.contact}>
            <span className={styles.contactLabel}>{f.phoneLabel}</span>
            <a href={`tel:${phoneDigits}`}>{f.phone}</a>
          </div>
          <div className={styles.contact}>
            <span className={styles.contactLabel}>{f.addressLabel}</span>
            <span>{f.address}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <a href="#" className={styles.privacy}>
          {f.privacy}
        </a>
        <span className={styles.company}>{f.companyName}</span>
        <span className={styles.copyright}>{f.copyright}</span>
      </div>
    </footer>
  );
}
