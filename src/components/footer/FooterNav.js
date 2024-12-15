import { NavLink } from "react-router-dom";
import styles from "./Footer.module.scss";

const FooterNav = () => {
  return (
    <ul className={styles.footer__list}>
      <li className={styles.footer__title}>Навигация</li>
      <li>
        <NavLink to="/cooper/catalog" className={styles.footer__link}>
          Каталог
        </NavLink>
      </li>
      <li>
        <NavLink to="/cooper/news" className={styles.footer__link}>
          Новости
        </NavLink>
      </li>
      <li>Доставка</li>
      <li>
        <NavLink to="/cooper/about" className={styles.footer__link}>
          О нас
        </NavLink>
      </li>
      <li>Контакты</li>
    </ul>
  );
};

export default FooterNav;
