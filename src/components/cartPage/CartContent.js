import { NavLink } from "react-router-dom";
import Path from "../UI/Path";
import styles from "./CartContent.module.scss";
import CartMain from "./cartMain/CartMain";

const CartContent = () => {
  return (
    <section className={`content ${styles.cart}`}>
      <div className="container">
        <Path />
      </div>
      <div className="container">
        <div className={styles.cart__title}>Корзина</div>
        <CartMain />
        <NavLink to="/cooper/catalog" className={styles.cart__link}>Назад к покупкам</NavLink>
      </div>
    </section>
  );
};

export default CartContent;
