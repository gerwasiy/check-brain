import styles from "../styles/components/header.module.scss";
import logo from "../public/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Nav from "./navigation";
import { useState } from "react";

const imageLoader = ({ width, quality }) => {
  return `../public/logo.svg?w=${width}&q=${quality || 75}`
}

export default function Header({
  leftNavName,
  leftNavIcon,
  rightNavIcon,
  rightNavName,
  leftNavPath,
  rightNavPath,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <header className={styles.header__container}>
        <Link className={styles.header__navigationEl} href={leftNavPath || "/"}>
          <FontAwesomeIcon icon={leftNavIcon || faHouse} />
          <span>{leftNavName || "Головна"}</span>
        </Link>

        <h1 className={styles.header__title} onMouseEnter={handleMouseEnter}
      >
          <span className={styles.title__mobile}>Check</span>
          <Image
        src={logo}
            className={styles.header__logo}
            alt="logo"
            width={100}
            height={100}
        
          />
          <span className={styles.title__mobile}>Brain</span>
        </h1>

        <Link
          className={styles.header__navigationEl}
          href={rightNavPath || "/Profile"}
        >
          <FontAwesomeIcon icon={rightNavIcon || faUser} />
          <span>{rightNavName || "Профіль"}</span>
        </Link>
      </header>
      {isHovered && <Nav handleMouseLeave={handleMouseLeave} />}
    </>
  );
}
