'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Chatbot.module.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { getFaqTopics, matchFaqTopic } from '../../utils/faqTopics';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';

function ChatIcon({ className }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H9l-4.3 3.6c-.45.38-1.13.06-1.13-.53V16h-.07A2.5 2.5 0 0 1 4 13.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="9.5" r="1" fill="currentColor" />
      <circle cx="12" cy="9.5" r="1" fill="currentColor" />
      <circle cx="15.5" cy="9.5" r="1" fill="currentColor" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 12H20M20 12L14 6M20 12L14 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Rule-based FAQ assistant — only ever answers from `getFaqTopics` (built
 * from content already on the site). No match → fallback + WhatsApp CTA.
 * The launcher hides on scroll-down and reappears on scroll-up; the panel,
 * once open, stays put regardless of scroll.
 */
export default function Chatbot() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollHidden = useScrollDirection(80);
  const bodyRef = useRef(null);

  const topics = getFaqTopics(t);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  const ask = (rawText) => {
    const question = rawText.trim();
    if (!question) return;

    const match = matchFaqTopic(topics, question);
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: question },
      match
        ? { from: 'bot', text: match.answer, showWhatsapp: match.showWhatsapp }
        : { from: 'bot', text: t.chatbot.fallback, showWhatsapp: true },
    ]);
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  const launcherClasses = [styles.launcher, scrollHidden && !open ? styles.launcherHidden : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.root}>
      {open && (
        <div className={styles.panel} role="dialog" aria-label={t.chatbot.title}>
          <header className={styles.header}>
            <span className={styles.headerTitle}>{t.chatbot.title}</span>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label={t.chatbot.closeLabel}
            >
              <CloseIcon />
            </button>
          </header>

          <div className={styles.body} ref={bodyRef}>
            <div className={`${styles.bubble} ${styles.bubbleBot}`}>{t.chatbot.greeting}</div>

            <div className={styles.chips}>
              {topics.map((topic) => (
                <button
                  type="button"
                  key={topic.id}
                  className={styles.chip}
                  onClick={() => ask(topic.question)}
                >
                  {topic.question}
                </button>
              ))}
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={`${styles.bubble} ${m.from === 'user' ? styles.bubbleUser : styles.bubbleBot}`}
              >
                <span>{m.text}</span>
                {m.showWhatsapp && (
                  <WhatsAppButton
                    className={styles.bubbleWhatsapp}
                    label={t.chatbot.fallbackCta}
                    message={t.chatbot.fallbackMessage}
                  />
                )}
              </div>
            ))}
          </div>

          <form className={styles.inputRow} onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatbot.inputPlaceholder}
              className={styles.input}
            />
            <button type="submit" className={styles.sendBtn} aria-label={t.chatbot.send}>
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={launcherClasses}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? t.chatbot.closeLabel : t.chatbot.launcherLabel}
        aria-expanded={open}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  );
}
