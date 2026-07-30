'use client';

import { useRef } from 'react';
import Image from 'next/image';
import styles from './Testimonials.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

import testimonial1 from '../../assets/testimonials/testimonial-1.webp';
import testimonial2 from '../../assets/testimonials/testimonial-2.webp';
import testimonial3 from '../../assets/testimonials/testimonial-3.webp';

// Representative portraits of African professionals (stock, hosted locally)
// — swap for the real clients' photos when available.
const PHOTOS = [testimonial1, testimonial2, testimonial3];

export default function Testimonials() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useRevealOnScroll([sectionRef], { className: styles.visible, threshold: 0.18 });

  return (
    <section className={styles.section} id="testimonials" ref={sectionRef}>
      <div className={styles.head}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          <span>{t.testimonials.eyebrow}</span>
        </div>
        <h2 className={styles.heading}>{t.testimonials.heading}</h2>
      </div>

      <div className={styles.grid}>
        {t.testimonials.items.map((item, i) => (
          <figure className={styles.card} key={i}>
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className={styles.quote}>{item.quote}</blockquote>
            <figcaption className={styles.author}>
              <span className={styles.avatar}>
                <Image src={PHOTOS[i]} alt={item.name} width={92} height={92} loading="lazy" />
              </span>
              <span className={styles.authorText}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.role}>
                  {item.role} · {item.location}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
