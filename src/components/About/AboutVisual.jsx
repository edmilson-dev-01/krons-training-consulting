'use client';

import { useEffect, useRef } from 'react';
import styles from './AboutVisual.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import officePhoto from '../../assets/meeting-room-office-new.avif';

export default function AboutVisual() {
  const { t } = useLanguage();
  const imageRef = useRef(null);
  const standForRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible, styles.imageVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (imageRef.current) observer.observe(imageRef.current);
    if (standForRef.current) observer.observe(standForRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={`${styles.imageWrapper} ${styles.imageReveal}`} ref={imageRef}>
        <img src={officePhoto.src} alt={t.aboutVisual.imageAlt} className={styles.image} />
      </div>

      <div className={`${styles.standFor} ${styles.reveal}`} ref={standForRef}>
        <svg
          className={styles.decorativeLines}
          width="220"
          height="160"
          viewBox="0 0 220 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 140C40 100 80 40 140 30C180 24 210 50 210 50"
            stroke="#cfdcea"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M10 150C50 110 100 55 155 42C195 34 215 65 215 65"
            stroke="#dde7f1"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M10 155C60 120 115 70 165 55C200 46 218 80 218 80"
            stroke="#ebf1f8"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>

        <h3 className={styles.standForHeading}>{t.aboutVisual.standForHeading}</h3>

        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h4 className={styles.cardTitle}>{t.aboutVisual.visionTitle}</h4>
            <p className={styles.cardText}>{t.aboutVisual.visionText}</p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </div>
            <h4 className={styles.cardTitle}>{t.aboutVisual.missionTitle}</h4>
            <p className={styles.cardText}>{t.aboutVisual.missionText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
