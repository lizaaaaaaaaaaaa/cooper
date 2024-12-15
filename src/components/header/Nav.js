import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";

const Nav = ({ activeMenu }) => {
  return (
    <ul
      className={
        activeMenu
          ? `${styles["nav__list"]} ${styles.active}`
          : `${styles["nav__list"]} `
      }
    >
      <li>
        <NavLink to="/cooper/catalog" className={styles.link}>
          Каталог
        </NavLink>
      </li>
      <li>
        <NavLink to="/cooper/news" className={styles.link}>
          Новости
        </NavLink>
      </li>
      <li>
        <div className={styles.link}>
          Доставка
        </div>
      </li>
      <li>
        <NavLink to="/cooper/about" className={styles.link}>
          О нас
        </NavLink>
      </li>
      <li>
        <div className={styles.link}>
          Контакты
        </div>
      </li>
    </ul>
  );
};

export default Nav;
