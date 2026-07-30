'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { smoothScrollToElement } from '../../utils/smoothScroll';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';

export default function Hero() {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleBookingClick = () => {
    const el = document.getElementById('gallery');
    if (el) smoothScrollToElement(el, 900);
  };

  return (
    <section className={`${styles.hero} ${loaded ? styles.loaded : ''}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t.hero.title}</h1>

        <p className={styles.description}>{t.hero.description}</p>

        <div className={styles.ctaGroup}>
          <button type="button" className={styles.cta} onClick={handleBookingClick}>
            {t.hero.cta}
          </button>
          <WhatsAppButton
            className={styles.ctaSecondary}
            label={t.hero.ctaSecondary}
            message={t.hero.ctaWhatsappMessage}
          />
        </div>
      </div>
    </section>
  );
}
