'use client';

import styles from './Partners.module.css';
import { useLanguage } from '../../i18n/LanguageContext';

// KRONS collaborators / partner institutions.
const PARTNERS = [
  'Universidade Zambeze',
  'Companhia do Pipeline Moçambique-Zimbabwe',
  'IMOPETRO',
  'Petromoc',
  'CFM',
  'Cornelder',
  'UNDP',
];

export default function Partners() {
  const { t } = useLanguage();
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section className={styles.section} id="partners">
      <div className={styles.head}>
        <span className={styles.eyebrow}>{t.partners.eyebrow}</span>
        <h2 className={styles.heading}>{t.partners.heading}</h2>
      </div>

      <div className={styles.marquee}>
        <div className={styles.track}>
          {loop.map((name, i) => (
            <span className={styles.logo} key={i}>
              <span className={styles.logoMark} aria-hidden="true" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
