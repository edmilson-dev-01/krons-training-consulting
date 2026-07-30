'use client';

import { useLanguage } from '../../i18n/LanguageContext';
import styles from './WhatsAppButton.module.css';

export function WhatsAppIcon({ className }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.46-.15-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.58-.9-2.16-.24-.57-.48-.49-.65-.5h-.56c-.19 0-.5.07-.77.36-.26.29-1 .98-1 2.4s1.03 2.78 1.17 2.97c.15.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.32.19 1.81.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34Z" />
      <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.87.51 3.63 1.4 5.13L2 22l5-1.35A9.96 9.96 0 0 0 12.02 22C17.52 22 22 17.52 22 12S17.52 2 12.02 2Zm0 18.2c-1.68 0-3.25-.48-4.58-1.32l-.33-.2-3.05.82.82-2.98-.21-.31A8.17 8.17 0 0 1 3.83 12c0-4.53 3.68-8.2 8.19-8.2 4.5 0 8.18 3.67 8.18 8.2s-3.68 8.2-8.18 8.2Z" />
    </svg>
  );
}

/**
 * Opens a WhatsApp chat with the KRONS number, optionally pre-filled with
 * `message`. `className` supplies the host's own button chrome (padding,
 * background, radius) — this component only adds the icon and the link.
 */
export default function WhatsAppButton({ message, label, className = '' }) {
  const { t } = useLanguage();
  const digits = t.footer.whatsapp.replace(/[^\d]/g, '');
  const href = `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.button} ${className}`}
    >
      <WhatsAppIcon className={styles.icon} />
      <span>{label}</span>
    </a>
  );
}
