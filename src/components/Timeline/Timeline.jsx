'use client';

import { useRef } from 'react';
import styles from './Timeline.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

export default function Timeline() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useRevealOnScroll([sectionRef], { className: styles.visible, threshold: 0.2 });

  return (
    <section className={styles.section} id="timeline" ref={sectionRef}>
      <div className={styles.head}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          <span>{t.timeline.eyebrow}</span>
        </div>
        <h2 className={styles.heading}>{t.timeline.heading}</h2>
      </div>

      <div className={styles.track}>
        <span className={styles.line} aria-hidden="true" />
        {t.timeline.milestones.map((m) => (
          <div className={styles.item} key={m.year}>
            <span className={styles.node} />
            <span className={styles.year}>{m.year}</span>
            <h3 className={styles.itemTitle}>{m.title}</h3>
            <p className={styles.itemText}>{m.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
