import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Página não encontrada — Krons Training and Consulting',
};

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <span className={styles.code}>Erro 404</span>
      <h1 className={styles.title}>Página não encontrada</h1>
      <p className={styles.text}>
        A página que procura não existe ou foi movida. Volte à página inicial para continuar a
        explorar a KRONS.
      </p>
      <Link href="/" className={styles.link}>
        Voltar ao início
      </Link>
    </div>
  );
}
