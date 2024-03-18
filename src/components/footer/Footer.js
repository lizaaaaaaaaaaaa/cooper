import styles from "./Footer.module.scss";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import FooterNav from "./FooterNav";
import FooterCatalog from "./FooterCatalog";
import FooterContacts from "./FooterContacts";

const Footer = () => {
  return (
    <footer className={`section ${styles.footer}`}>
      <div className="container">
        <div className={styles.footer__inner}>
          <div className={styles.footer__left}>
            <NavLink to="/main" className={styles.logo}>
              <img src={logo} alt="logo" />
            </NavLink>
            <p className={styles.footer__text}>
              © 2021 “Copper Pro” Все права защищенны
            </p>
            <div className={styles.footer__politics}>
              Политика конфиденциальности
            </div>
          </div>
          <div className={styles.footer__right}>
            <FooterNav />
            <FooterCatalog />
            <FooterContacts />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
