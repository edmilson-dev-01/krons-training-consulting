import styles from './loading.module.css';

/*
 * Every route in this project is statically generated, so this fallback
 * rarely has time to render — it exists to follow Next.js App Router
 * conventions and to cover the brief window during client-side route
 * transitions.
 */
export default function Loading() {
  return (
    <div className={styles.wrap}>
      <span className={styles.spinner} role="status" aria-label="A carregar" />
    </div>
  );
}
