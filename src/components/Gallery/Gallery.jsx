'use client';

import { useRef } from 'react';
import Link from 'next/link';
import styles from './Gallery.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { ACTIVITY_ICONS } from '../icons/ActivityIcons';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

export default function Gallery() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useRevealOnScroll([sectionRef], { className: styles.visible, threshold: 0.2 });

  return (
    <section className={styles.section} id="gallery" ref={sectionRef}>
      <span className={styles.lineTop} aria-hidden="true" />

      <div className={styles.head}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          <span>{t.gallery.eyebrow}</span>
        </div>
        <h2 className={styles.heading}>{t.gallery.heading}</h2>
      </div>

      <div className={styles.grid}>
        {t.gallery.cards.map((card, i) => {
          const Icon = ACTIVITY_ICONS[card.slug];
          return (
            <Link key={i} href={`/atividades/${card.slug}`} className={styles.card}>
              <span className={styles.iconWrapper} aria-hidden="true">
                {Icon && <Icon className={styles.icon} />}
              </span>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardTitleText}>{card.title}</span>
              </h3>
              <p className={styles.cardCaption}>{card.caption}</p>
              <span className={styles.cardMore}>
                {t.gallery.viewLabel}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13 6L19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          );
        })}
      </div>

      <span className={styles.lineBottomLeft} aria-hidden="true" />
      <span className={styles.lineBottomRight} aria-hidden="true" />
    </section>
  );
}
