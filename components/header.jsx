import styles from "../styles/components/header.module.scss";
import logo from "../public/logo.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header({
  leftNavName,
  leftNavIcon,
  rightNavIcon,
  rightNavName,
  leftNavPath,
  rightNavPath,
}) {
  return (
    <header className={styles.header__container}>
      <Link className={styles.header__navigationEl} href={leftNavPath || "/"}>
        <FontAwesomeIcon icon={leftNavIcon || faHouse} />
        <span>{leftNavName || "Головна"}</span>
      </Link>

      <h1 className={styles.header__title}>
        Check
        <Image
          className={styles.header__logo}
          alt="logo"
          width={100}
          height={100}
          src={logo}
        />
        Brain
      </h1>
      <Link
        className={styles.header__navigationEl}
        href={rightNavPath || "/Profile"}
      >
        <FontAwesomeIcon icon={rightNavIcon || faUser} />
        <span>{rightNavName || "Профіль"}</span>
      </Link>
    </header>
  );
}
