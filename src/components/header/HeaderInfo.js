import favorites from "../../assets/favorites.svg";
import user from "../../assets/user.svg";
import cart from "../../assets/cart.svg";
import styles from "./Header.module.scss"

const HeaderInfo = () => {
  return (
    <ul className={styles['info__list']}>
      <li>
        <img className={styles['info__img']} src={favorites} alt="favorites" />
      </li>
      <li>
        <img className={styles['info__img']} src={user} alt="user" />
      </li>
      <li>
        <img className={styles['info__img']} src={cart} alt="cart" />
      </li>
    </ul>
  );
};

export default HeaderInfo;
