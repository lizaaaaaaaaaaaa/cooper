import favorites from "../../assets/favorites.svg";
import user from "../../assets/user.svg";
import cart from "../../assets/cart.svg";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";

const HeaderInfo = ({ activeMenu }) => {
  return (
    <ul
      className={
        activeMenu
          ? `${styles["info__list"]} ${styles.active}`
          : `${styles["info__list"]} `
      }
    >
      <li>
        <img className={styles["info__img"]} src={favorites} alt="favorites" />
      </li>
      <li>
        <NavLink to="/enter" replace>
          <img className={styles["info__img"]} src={user} alt="user" />
        </NavLink>
      </li>
      <li>
        <img className={styles["info__img"]} src={cart} alt="cart" />
      </li>
    </ul>
  );
};

export default HeaderInfo;
