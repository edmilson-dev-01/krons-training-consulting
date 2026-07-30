'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Projects.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

import undp1 from '../../assets/projects/undp-1.webp';
import undp2 from '../../assets/projects/undp-2.webp';
import undp3 from '../../assets/projects/undp-3.webp';
import inpetro1 from '../../assets/projects/inpetro-1.webp';
import inpetro2 from '../../assets/projects/inpetro-2.webp';
import inpetro3 from '../../assets/projects/inpetro-3.webp';
import tecnica1 from '../../assets/projects/tecnica-1.webp';
import tecnica2 from '../../assets/projects/tecnica-2.webp';
import tecnica3 from '../../assets/projects/tecnica-3.webp';
import cpmz1 from '../../assets/projects/cpmz-1.webp';
import cpmz2 from '../../assets/projects/cpmz-2.webp';
import cpmz3 from '../../assets/projects/cpmz-3.webp';

/* Curated galleries (3 photos each) — order mirrors the content items:
   01 Training Procurement CPMZ · 02 Team Building INPETRO ·
   03 Team Building UNDP 2025 · 04 Training Técnica de Negócios */
const MEDIA = [
  [cpmz1, cpmz2, cpmz3],
  [inpetro1, inpetro2, inpetro3],
  [undp1, undp2, undp3],
  [tecnica1, tecnica2, tecnica3],
];

const pad = (n) => String(n).padStart(2, '0');
const SWIPE_THRESHOLD = 42;

/* One image at a time; arrows, arrow keys and swipe fade the next one in. */
function MediaSlider({ images, title, prevLabel, nextLabel }) {
  const [idx, setIdx] = useState(0);
  const pointerX = useRef(null);
  const count = Math.min(images.length, 3);
  const shown = images.slice(0, 3);

  const go = (dir) => setIdx((prev) => (prev + dir + count) % count);

  const handleKeyDown = (e) => {
    if (count < 2) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
  };

  const handlePointerDown = (e) => {
    pointerX.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (pointerX.current === null || count < 2) return;
    const dx = e.clientX - pointerX.current;
    pointerX.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  return (
    <div
      className={styles.mediaFrame}
      tabIndex={count > 1 ? 0 : undefined}
      role={count > 1 ? 'group' : undefined}
      aria-label={count > 1 ? title : undefined}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        pointerX.current = null;
      }}
    >
      {shown.map((im, j) => (
        <Image
          key={j}
          src={im}
          alt={j === idx ? title : ''}
          fill
          sizes="(max-width: 900px) 100vw, 600px"
          loading="lazy"
          draggable={false}
          className={`${styles.slide} ${j === idx ? styles.slideActive : ''}`}
        />
      ))}

      {count > 1 && (
        <div className={styles.sliderControls}>
          <button
            type="button"
            className={styles.sliderBtn}
            onClick={() => go(-1)}
            aria-label={prevLabel}
          >
            <svg
              width="14"
              height="14"
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
          <span className={styles.sliderCount} aria-live="polite">
            {idx + 1}
            <span className={styles.sliderCountSep}>/</span>
            {count}
          </span>
          <button
            type="button"
            className={styles.sliderBtn}
            onClick={() => go(1)}
            aria-label={nextLabel}
          >
            <svg
              width="14"
              height="14"
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
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  // Each header and project row reveals on its own as it enters the viewport.
  useRevealOnScroll(
    { root: sectionRef, selector: '[data-reveal]' },
    { className: styles.visible, threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
  );

  return (
    <section className={styles.section} id="projects" ref={sectionRef}>
      <header className={styles.head} data-reveal>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          <span>{t.projects.eyebrow}</span>
        </div>
        <h2 className={styles.heading}>{t.projects.heading}</h2>
        <p className={styles.subtitle}>{t.projects.subtitle}</p>
      </header>

      <div className={styles.list}>
        {t.projects.items.map((p, i) => (
          <article className={styles.row} data-reveal key={i}>
            <div className={styles.media}>
              <MediaSlider
                images={MEDIA[i] || []}
                title={p.title}
                prevLabel={t.projects.sliderPrev}
                nextLabel={t.projects.sliderNext}
              />
            </div>

            <div className={styles.meta}>
              <span className={styles.num}>{pad(i + 1)}</span>
              <h3 className={styles.title}>
                <span className={styles.titleText}>{p.title}</span>
              </h3>
              <div className={styles.info}>
                <span>{p.location}</span>
                <span className={styles.sep} />
                <span>{p.year}</span>
              </div>
              <p className={styles.desc}>{p.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
