import Link from 'next/link';
import styles from '../styles/components/test-card.module.css'

export default function TestCard({testName,description,path}) {
  return (
    <div className={styles.card}>
      <h2 className={styles.card__title}>{testName}</h2>
      <p className={styles.card__description}>
        {description}
      </p>
      <Link href={path} className={styles.card__button}>
        Розпочати тест
      </Link>
    </div>
  );
}
