'use client';

import { useRef } from 'react';
import Link from 'next/link';
import styles from './AboutText.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

export default function AboutText() {
  const { t } = useLanguage();
  const sidebarRef = useRef(null);
  const mainRef = useRef(null);

  useRevealOnScroll([sidebarRef, mainRef], { className: styles.visible, threshold: 0.2 });

  return (
    <section className={styles.section} id="about">
      <div className={styles.grid}>
        <div className={styles.sidebar} ref={sidebarRef}>
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            <span>{t.about.eyebrow}</span>
          </div>

          <div className={styles.coreValues}>
            <span className={styles.coreValuesLabel}>{t.about.valuesLabel}</span>
            <p className={styles.coreValuesText}>{t.about.valuesText}</p>
          </div>
        </div>

        <div className={styles.main} ref={mainRef}>
          <h2 className={styles.heading}>{t.about.heading}</h2>
          <p className={styles.description}>{t.about.description}</p>

          <Link href="/sobre" className={styles.link}>
            <span className={styles.linkText}>{t.about.link}</span>
            <svg
              className={styles.linkArrow}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path
                d="M13 6L19 12L13 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
