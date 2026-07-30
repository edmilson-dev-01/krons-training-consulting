'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './GalleryPage.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

import img1 from '../../assets/gallery/formacao-procurement-cpmz.webp';
import img2 from '../../assets/gallery/team-building-inpetro-1.webp';
import img3 from '../../assets/gallery/team-building-undp-1.webp';
import img4 from '../../assets/gallery/formacao-tecnica-negocios.webp';
import img5 from '../../assets/gallery/team-building-inpetro-2.webp';
import img6 from '../../assets/gallery/team-building-undp-2.webp';
import img7 from '../../assets/gallery/team-building-outdoor.webp';
import img8 from '../../assets/gallery/formacao-procurement-cpmz-2.webp';
import img9 from '../../assets/gallery/team-building-inpetro-3.webp';
import img10 from '../../assets/gallery/team-building-undp-3.webp';
import img11 from '../../assets/gallery/formacao-tecnica-negocios-2.webp';

const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

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

export default function GalleryPage() {
  const { lang, setLang, t } = useLanguage();
  const g = t.photoGallery;
  const rootRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useRevealOnScroll(
    { root: rootRef, selector: '[data-reveal]' },
    { className: styles.visible, threshold: 0.15, rootMargin: '0px 0px -6% 0px', deps: [lang] }
  );

  const close = useCallback(() => setActiveIndex(null), []);
  const goPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + g.items.length) % g.items.length)),
    [g.items.length]
  );
  const goNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % g.items.length)),
    [g.items.length]
  );

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIndex, close, goPrev, goNext]);

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
            <span>{g.back}</span>
          </Link>
        </div>
      </header>

      <main className={styles.page} ref={rootRef}>
        <div className={styles.intro} data-reveal>
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            <span>{g.eyebrow}</span>
          </div>
          <h1 className={styles.title}>{g.heading}</h1>
          <p className={styles.subtitle}>{g.subtitle}</p>
        </div>

        <div className={styles.grid} data-reveal>
          {g.items.map((item, i) => (
            <button
              type="button"
              key={i}
              className={styles.card}
              onClick={() => setActiveIndex(i)}
              aria-label={item.alt}
            >
              <Image
                src={IMAGES[i]}
                alt={item.alt}
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 992px) 50vw, 25vw"
                className={styles.image}
                loading="lazy"
              />
              <span className={styles.overlay} aria-hidden="true" />
              <span className={styles.caption}>{item.alt}</span>
            </button>
          ))}
        </div>
      </main>

      {activeIndex !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={g.items[activeIndex].alt}
        >
          <button
            type="button"
            className={styles.lightboxBackdrop}
            onClick={close}
            aria-label={g.back}
          />

          <div className={styles.lightboxContent}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={close}
              aria-label="Close"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={goPrev}
              aria-label="Previous"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5L8 12L15 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className={styles.lightboxFrame}>
              <Image
                key={activeIndex}
                src={IMAGES[activeIndex]}
                alt={g.items[activeIndex].alt}
                fill
                sizes="90vw"
                className={styles.lightboxImage}
                priority
              />
            </div>

            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={goNext}
              aria-label="Next"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5L16 12L9 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <span className={styles.lightboxCaption}>{g.items[activeIndex].alt}</span>
          </div>
        </div>
      )}
    </>
  );
}
