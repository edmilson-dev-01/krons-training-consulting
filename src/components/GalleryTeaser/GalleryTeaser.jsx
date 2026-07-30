'use client';

import { useRef } from 'react';
import Link from 'next/link';
import styles from './GalleryTeaser.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

export default function GalleryTeaser() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const g = t.photoGallery;

  useRevealOnScroll([sectionRef], { className: styles.visible, threshold: 0.3 });

  return (
    <section className={styles.section} ref={sectionRef}>
      <Link href="/galeria" className={styles.link}>
        <span className={styles.linkText}>{g.teaserText}</span>
        <svg
          width="16"
          height="16"
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
    </section>
  );
}
