'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './AboutPage.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import Footer from '../Footer/Footer';
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

export default function AboutPage() {
  const { lang, setLang, t } = useLanguage();
  const rootRef = useRef(null);
  const [activeId, setActiveId] = useState('');

  const p = t.aboutPage;

  /* Reveal-on-scroll, same pattern as the rest of the site */
  useRevealOnScroll(
    { root: rootRef, selector: '[data-reveal]' },
    { className: styles.visible, threshold: 0.12, rootMargin: '0px 0px -6% 0px', deps: [lang] }
  );

  /* Scroll-spy for the table of contents */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    root.querySelectorAll('section[id]').forEach((el) => spy.observe(el));
    return () => spy.disconnect();
  }, [lang]);

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

          <Link href="/" className={styles.back}>
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
            <span>{p.back}</span>
          </Link>
        </div>
      </header>

      <main className={styles.page} ref={rootRef}>
        {/* ————— Intro ————— */}
        <div className={styles.intro} data-reveal>
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            <span>{p.eyebrow}</span>
          </div>
          <h1 className={styles.title}>{p.title}</h1>
          <p className={styles.tagline}>{p.tagline}</p>
        </div>

        {/* ————— Documentation body ————— */}
        <div className={styles.body}>
          <aside className={styles.toc} data-reveal>
            <span className={styles.tocLabel}>{p.toc}</span>
            <nav className={styles.tocNav}>
              {p.order.map((id, i) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`${styles.tocLink} ${activeId === id ? styles.tocActive : ''}`}
                >
                  <span className={styles.tocNum}>{pad(i + 1)}</span>
                  {p.sections[id].heading}
                </a>
              ))}
            </nav>
          </aside>

          <div className={styles.content}>
            {p.order.map((id, i) => {
              const s = p.sections[id];
              return (
                <section className={styles.block} id={id} key={id} data-reveal>
                  <div className={styles.blockHead}>
                    <span className={styles.blockNum}>{pad(i + 1)}</span>
                    <h2 className={styles.blockHeading}>{s.heading}</h2>
                  </div>

                  {s.paragraphs &&
                    s.paragraphs.map((text, j) => (
                      <p className={styles.paragraph} key={j}>
                        {text}
                      </p>
                    ))}

                  {s.items && (
                    <dl className={styles.defList}>
                      {s.items.map((item, j) => (
                        <div className={styles.defItem} key={j}>
                          <dt className={styles.defTitle}>{item.title}</dt>
                          <dd className={styles.defText}>{item.text}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {s.chips && (
                    <div className={styles.chips}>
                      {s.chips.map((chip, j) => (
                        <span className={styles.chip} key={j}>
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}

            {/* ————— Quiet closing CTA ————— */}
            <section className={styles.cta} data-reveal>
              <h2 className={styles.ctaHeading}>{p.ctaHeading}</h2>
              <p className={styles.ctaText}>{p.ctaText}</p>
              <WhatsAppButton
                className={styles.ctaButton}
                label={p.ctaButton}
                message={p.ctaWhatsappMessage}
              />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
