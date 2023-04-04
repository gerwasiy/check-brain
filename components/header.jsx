import styles from "../styles/components/header.module.css";
import logo from "../public/logo.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header className={styles.container}>
      <Link className={styles.navigationEl} href="/">
        <FontAwesomeIcon icon={faHouse} />
        <span>Home</span>
      </Link>

      <h1 className={styles.title}>
        Check
        <Image
          className={styles.logo}
          alt="logo"
          width={100}
          height={100}
          src={logo}
        />
        Brain
      </h1>
      <Link className={styles.navigationEl} href="/Profile">
        <FontAwesomeIcon icon={faUser} />
        <span>Profile</span></Link>
    </header>
  );
}
