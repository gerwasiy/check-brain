useState
import { useState } from "react";
import styles from "../styles/components/navigation.module.scss";

import Link from "next/link";

export default function Nav({handleMouseLeave}) {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeaves = () => {
      setIsHovered(false);
    };

  return (
    <nav  onMouseLeave={handleMouseLeave}  className={styles.navigation}>
      <Link className={styles.navigation__elem} href="/About">
        Про нас
      </Link>
      <div onMouseLeave={handleMouseLeaves} className={styles.navigation_block_tests}>
        <Link className={styles.navigation__elem} onMouseEnter={handleMouseEnter}  href="/tests">
          Тести
        </Link>
        {isHovered && <div  >
          <Link
            className={styles.navigation__elem}
            href="/tests/ReflexTraining"
          >
            Reflex Training
          </Link>
          <Link className={styles.navigation__elem} href="/tests/ReactionRate">
            Reaction Rate
          </Link>
        </div>}
        
      </div>
      <Link className={styles.navigation__elem} href="/">
        Головна
      </Link>
      <Link className={styles.navigation__elem} href="/Statistics">
        Статистика
      </Link>

    </nav>
  );
}
