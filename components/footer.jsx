import { faGithub, faInstagram, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/components/footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className={styles.footer__container}>
      <a href="#"> <FontAwesomeIcon icon={faInstagram} /></a>
      <a href="#"><FontAwesomeIcon icon={faGithub} /></a>
      <a href="#"><FontAwesomeIcon icon={faTelegram} /></a>
      <a href="#"><FontAwesomeIcon icon={faEnvelope} /></a>
      <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
    </footer>
  );
}
