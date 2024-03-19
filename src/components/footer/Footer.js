import styles from "./Footer.module.scss";
import logo from "../../assets/logo.png";
import { NavLink, useLocation } from "react-router-dom";
import FooterNav from "./FooterNav";
import FooterCatalog from "./FooterCatalog";
import FooterContacts from "./FooterContacts";

const Footer = () => {
  const location = useLocation();
  const isRegOrEnterPage =
    location.pathname === "/registration" || location.pathname === "/enter";
  const footerClassName = isRegOrEnterPage
    ? `${styles.footer}  ${styles["footer-auth"]}`
    : styles.footer;
  return (
    <footer className={`section ${footerClassName}`}>
      <div className="container">
        <div className={styles.footer__inner}>
          <div className={styles.footer__left}>
            <NavLink to="/main" className={styles.logo}>
              <img src={logo} alt="logo" />
            </NavLink>
            <p className={styles.footer__text}>
              © 2021 “Copper Pro” Все права защищенны
            </p>
            {!isRegOrEnterPage && (
              <div className={styles.footer__politics}>
                Политика конфиденциальности
              </div>
            )}
          </div>
          {!isRegOrEnterPage && (
            <div className={styles.footer__right}>
              <FooterNav />
              <FooterCatalog />
              <FooterContacts />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
