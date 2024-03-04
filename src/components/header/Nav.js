import styles from "./Header.module.scss";

const Nav = () => {
  return (
    <ul className={styles["nav__list"]}>
      <li>
        <a className={styles.link} href="">Каталог</a>
      </li>
      <li>
        <a className={styles.link} href="">Новости</a>
      </li>
      <li>
        <a className={styles.link} href="">Доставка</a>
      </li>
      <li>
        <a className={styles.link} href="">О нас</a>
      </li>
      <li>
        <a className={styles.link} href="">Контакты</a>
      </li>
    </ul>
  );
};

export default Nav;
