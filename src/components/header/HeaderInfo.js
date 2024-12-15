import favorites from "../../assets/favorites.svg";
import user from "../../assets/user.svg";
import cart from "../../assets/cart.svg";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context";
import CartContext from "../../context/cart-context";

const HeaderInfo = ({ activeMenu }) => {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);

  const [isCartAnimated, setIsCartAnimated] = useState(false);

  useEffect(() => {
    setIsCartAnimated(true);

    const timeout = setTimeout(() => {
      setIsCartAnimated(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [cartContext.products]);

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
        <NavLink to={authContext.isAuthenticated ? "/cooper/user" : "/cooper/enter"} replace>
          <img className={styles["info__img"]} src={user} alt="user" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/cooper/cart" replace>
          <span className={styles.info__amount}>
            {cartContext.totalProducts}
          </span>
          <img
            className={`${styles.info__img} ${
              isCartAnimated ? styles["info__img-animated"] : ""
            } `}
            src={cart}
            alt="cart"
          />
        </NavLink>
      </li>
    </ul>
  );
};

export default HeaderInfo;
