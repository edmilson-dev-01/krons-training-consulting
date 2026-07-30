'use client';

import { useRef } from 'react';
import Link from 'next/link';
import styles from './ActivityPage.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import Footer from '../Footer/Footer';
import { ACTIVITY_ICONS } from '../icons/ActivityIcons';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';

const pad = (n) => String(n).padStart(2, '0');

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

export default function ActivityPage({ slug }) {
  const { lang, setLang, t } = useLanguage();
  const rootRef = useRef(null);

  const a = t.activities;
  const item = a.items[slug];
  const Icon = ACTIVITY_ICONS[slug];

  useRevealOnScroll(
    { root: rootRef, selector: '[data-reveal]' },
    {
      className: styles.visible,
      threshold: 0.15,
      rootMargin: '0px 0px -6% 0px',
      deps: [slug, lang],
    }
  );

  if (!item) return null;

  const whatsappMessage = a.ctaWhatsappMessage.replace('{title}', item.title);

  return (
    <>
      <header className={styles.topbar}>
        <Link href="/" className={styles.logo}>
          <Logo />
          <span className={styles.logoText}>
            <span className={styles.logoName}>KRONS</span>
            <span className={styles.logoSub}>Training and Consulting</span>
          </span>
        </Link>

        <div className={styles.topbarRight}>
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

          <Link href="/#gallery" className={styles.back}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 12H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path
                d="M11 6L5 12L11 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{a.back}</span>
          </Link>
        </div>
      </header>

      <main className={styles.page} ref={rootRef}>
        {/* ————— Hero ————— */}
        <section className={styles.hero}>
          <div className={styles.heroHead} data-reveal>
            <div className={styles.heroTop}>
              <span className={styles.heroIconWrapper} aria-hidden="true">
                {Icon && <Icon className={styles.heroIcon} />}
              </span>
              <div className={styles.eyebrow}>
                <span className={styles.dot} />
                <span>{a.eyebrow}</span>
              </div>
            </div>

            <div className={styles.heroSplit}>
              <div className={styles.heroLeft}>
                <h1 className={styles.title}>{item.title}</h1>
                <p className={styles.tagline}>{item.tagline}</p>
              </div>

              <div className={styles.heroRight}>
                <p className={styles.intro}>{item.intro}</p>
                <p className={styles.note}>{item.note}</p>
              </div>
            </div>
          </div>

          <span className={styles.lineLeft} aria-hidden="true" />
          <span className={styles.lineRight} aria-hidden="true" />
        </section>

        {/* ————— Approach ————— */}
        <section className={styles.approach} data-reveal>
          <div className={styles.sectionHead}>
            <span className={styles.sectionRule} aria-hidden="true" />
            <h2 className={styles.sectionHeading}>{a.approachHeading}</h2>
          </div>

          <div className={styles.approachGrid}>
            {item.approach.map((point, i) => (
              <div className={styles.approachItem} key={i}>
                <span className={styles.approachNum}>{pad(i + 1)}</span>
                <h3 className={styles.approachTitle}>{point.title}</h3>
                <p className={styles.approachText}>{point.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ————— Offerings ————— */}
        <section className={styles.offerings}>
          <div className={styles.sectionHead} data-reveal>
            <span className={styles.sectionRule} aria-hidden="true" />
            <h2 className={styles.sectionHeading}>{a.offeringsHeading}</h2>
          </div>

          <div className={styles.offerList}>
            {item.offerings.map((offer, i) => (
              <article className={styles.offerRow} data-reveal key={i}>
                <span className={styles.offerNum}>{pad(i + 1)}</span>
                <h3 className={styles.offerTitle}>
                  <span className={styles.offerTitleText}>{offer.title}</span>
                </h3>
                {offer.text && <p className={styles.offerText}>{offer.text}</p>}
              </article>
            ))}
          </div>
        </section>

        {/* ————— CTA ————— */}
        <section className={styles.cta} data-reveal>
          <svg
            className={styles.ctaLines}
            width="260"
            height="180"
            viewBox="0 0 260 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M10 160C50 115 100 45 170 34C218 27 252 58 252 58"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M10 170C60 125 120 62 185 48C232 39 256 74 256 74"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M10 176C70 136 138 80 196 63C238 52 258 90 258 90"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>

          <h2 className={styles.ctaHeading}>{a.ctaHeading}</h2>
          <p className={styles.ctaText}>{a.ctaText}</p>
          <WhatsAppButton
            className={styles.ctaButton}
            label={a.ctaButton}
            message={whatsappMessage}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
