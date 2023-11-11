import { faGithub, faInstagram, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/components/footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className={styles.footer__container}>
      <div>
      <a href="https://www.instagram.com/gerwasiy/"> <FontAwesomeIcon icon={faInstagram} /></a>
      <a href="https://github.com/gerwasiy"><FontAwesomeIcon icon={faGithub} /></a>
      <a href="https://t.me/Iarik_sh"><FontAwesomeIcon icon={faTelegram} /></a>
      <a href="mailto:yaroslav.shaposhnyk@nure.ua"><FontAwesomeIcon icon={faEnvelope} /></a>
      <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
      </div>
      <span>Copyright 2023 Check Brain</span>
    </footer>
  );
}
