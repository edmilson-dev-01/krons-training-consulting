'use client';

import { useEffect } from 'react';
import styles from './not-found.module.css';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Logged to the console for local/production debugging; no external
    // error-tracking service is wired up in this project.
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrap}>
      <span className={styles.code}>Erro inesperado</span>
      <h1 className={styles.title}>Algo correu mal</h1>
      <p className={styles.text}>
        Ocorreu um erro ao carregar esta página. Tente novamente — se o problema persistir,
        contacte-nos.
      </p>
      <button type="button" className={styles.link} onClick={() => reset()}>
        Tentar novamente
      </button>
    </div>
  );
}
