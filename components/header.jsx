import Link from "next/link";
import styles from "../styles/components/header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <div>logo</div>
      <h1  className={styles.title}>Check Brain</h1>
      <Link href='Profile'>Profile</Link>
    </header>
  );
}
