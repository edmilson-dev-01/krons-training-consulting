'use client';

import { useRef, useState } from 'react';
import styles from './Faq.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { getFaqTopics } from '../../utils/faqTopics';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';

export default function Faq() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [openId, setOpenId] = useState(null);

  useRevealOnScroll([sectionRef], { className: styles.visible, threshold: 0.15 });

  const topics = getFaqTopics(t);

  return (
    <section className={styles.section} id="faq" ref={sectionRef}>
      <div className={styles.head}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          <span>{t.faq.eyebrow}</span>
        </div>
        <h2 className={styles.heading}>{t.faq.heading}</h2>
        <p className={styles.subtitle}>{t.faq.subtitle}</p>
      </div>

      <div className={styles.list}>
        {topics.map((topic) => {
          const open = openId === topic.id;
          const panelId = `faq-panel-${topic.id}`;
          return (
            <div className={`${styles.item} ${open ? styles.open : ''}`} key={topic.id}>
              <button
                type="button"
                className={styles.question}
                onClick={() => setOpenId(open ? null : topic.id)}
                aria-expanded={open}
                aria-controls={panelId}
              >
                <span>{topic.question}</span>
                <span className={styles.icon} aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              <div className={styles.answerWrap} id={panelId} role="region">
                <div className={styles.answerInner}>
                  <p className={styles.answer}>{topic.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.more}>
        <span>{t.faq.moreQuestions}</span>
        <WhatsAppButton
          className={styles.moreBtn}
          label={t.faq.whatsappCta}
          message={t.chatbot.fallbackMessage}
        />
      </div>
    </section>
  );
}
