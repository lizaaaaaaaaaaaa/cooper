import { NavLink } from "react-router-dom";
import styles from "./Footer.module.scss";

const FooterCatalog = () => {
  return (
    <ul className={styles.footer__list}>
      <li className={styles.footer__title}>Каталог</li>
      <li>
        <NavLink to="/cooper/catalog" className={styles.footer__link}>
          Для эфирных масел
        </NavLink>
      </li>
      <li>
        <NavLink to="/cooper/catalog" className={styles.footer__link}>
          Для гидролатов
        </NavLink>
      </li>
      <li>
        <NavLink to="/cooper/catalog" className={styles.footer__link}>
          Медная посуда
        </NavLink>
      </li>
      <li>
        <NavLink to="/cooper/catalog" className={styles.footer__link}>
          Аксессуары из меди
        </NavLink>
      </li>
      <li>
        <NavLink to="/cooper/catalog" className={styles.footer__link}>
          Индивидуальный заказ
        </NavLink>
      </li>
      <li>
        <NavLink to="/cooper/catalog" className={styles.footer__link}>
          Скидки и предложения
        </NavLink>
      </li>
    </ul>
  );
};

export default FooterCatalog;
