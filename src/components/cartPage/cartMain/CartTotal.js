import { useContext } from "react";
import styles from "./CartTotal.module.scss";
import CartContext from "../../../context/cart-context";
import deliveryCar from "../../../assets/deliveryCar.svg";
import Button from "./../../UI/Button";
import cartBig from "../../../assets/cartBig.svg";
import { NavLink } from "react-router-dom";
import SlicePrice from "../../UI/SlicePrice";

const CartTotal = () => {
  const { products, totalPrice } = useContext(CartContext);

  const deliveryBlock =
    totalPrice >= 10000 ? (
      <div
        className={`${styles.cart__delivery} ${styles["cart__delivery-free"]}`}
      >
        <img src={deliveryCar} alt="car" />
        <p>У вас бесплатная доставка!</p>
      </div>
    ) : (
      ""
    );

  const orderButtonActivity = (event) => {
    if (products.length <= 0) {
      event.preventDefault();
    } else {
      return;
    }
  };
  return (
    <div className={styles.cart__total}>
      <div className={styles.cart__price}>
        <p>Итого</p>
        <p>
          {products.length > 0 ? (
            <SlicePrice priceToSlice={totalPrice.toString()} />
          ) : (
            "0"
          )}{" "}
          грн.
        </p>
      </div>
      <div className={styles.cart__bottom}>
        {deliveryBlock}
        <NavLink
          to="/cooper/order"
          className={`${styles.cart__link} ${
            products.length <= 0 && styles["cart__link-disabled"]
          }`}
          onClick={orderButtonActivity}
        >
          <Button className={styles.cart__btn}>Оформить заказ</Button>
        </NavLink>
      </div>
      <img src={cartBig} alt="cart" className={styles.cart__img} />
    </div>
  );
};

export default CartTotal;
