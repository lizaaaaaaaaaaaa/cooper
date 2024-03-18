import styles from "./Footer.module.scss";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../UI/SocialIcons";

const FooterContacts = () => {
  return (
    <ul className={styles.footer__list}>
      <li className={styles.footer__title}>Контакты</li>
      <li>
        <a
          className={styles.footer__link}
          href="https://www.google.com/maps?q=Бажана+8-Б,+Киев,+02132,+Украина"
          target="_blank"
          rel="noopener noreferrer"
        >
          Бажана 8-Б, Киев, <br/> 02132 Украина
        </a>
      </li>
      <li>
        <a className={styles.footer__link} href="tel:+380969906756">
          +38 (096) 990 67 56
        </a>
      </li>
      <li>
        <a className={styles.footer__link} href="mailto:a.alambik@gmail.com">
          a.alambik@gmail.com
        </a>
      </li>
      <li className={styles.footer__social}>
        <a
          className={styles["footer__link-social"]}
          href="https://twitter.com/example"
        >
          <TwitterIcon />
        </a>
        <a
          className={styles["footer__link-social"]}
          href="https://www.facebook.com/example"
        >
          <FacebookIcon />
        </a>
        <a
          className={styles["footer__link-social"]}
          href="https://www.instagram.com/example"
        >
          <InstagramIcon />
        </a>
      </li>
    </ul>
  );
};

export default FooterContacts;
