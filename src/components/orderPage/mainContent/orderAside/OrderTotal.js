import { useContext } from "react";
import styles from "./OrderTotal.module.scss";
import CartContext from "../../../../context/cart-context";
import cartBig from "../../../../assets/cartBig.svg";
import deliveryCar from "../../../../assets/deliveryCar.svg";
import { NavLink } from "react-router-dom";
import Button from "./../../../UI/Button";

const OrderTotal = (props) => {
  const { products, totalPrice } = useContext(CartContext);

  console.log(props);

  const deliveryBlock =
    totalPrice >= 10000 ? (
      <div
        className={`${styles.order__delivery} ${styles["order__delivery-free"]}`}
      >
        <img src={deliveryCar} alt="car" />
        <p>У вас бесплатная доставка!</p>
      </div>
    ) : props.delivery === "selfPickup" ? (
      ""
    ) : (
      <div
        className={`${styles.order__delivery} ${styles["order__delivery-paid"]}`}
      >
        <span>Доставка: </span>
        <b>90 грн.</b>
      </div>
    );

  const orderButtonActivity = (event) => {
    if (products.length <= 0) {
      event.preventDefault();
    } else {
      return;
    }
  };
  return (
    <div className={styles.order__total}>
      <form className={styles.order__promo}>
        <label htmlFor="promocode">
          <input
            type="text"
            id="promocode"
            placeholder="Введите промокод"
            name="promocode"
          />
        </label>
        <Button type="submit" className={styles.order__promoBtn}>Применить</Button>
      </form>
      <div className={styles.order__price}>
        <p>Итого</p>
        <p>
          {totalPrice >= 10000 ? totalPrice : totalPrice + 90}
          грн.
        </p>
      </div>
      <div className={styles.order__bottom}>
        {deliveryBlock}
        <NavLink
          to="/order"
          className={`${styles.order__link} ${
            products.length <= 0 && styles["order__link-disabled"]
          }`}
          onClick={orderButtonActivity}
        >
          <Button className={styles.order__btn}>Оформить заказ</Button>
        </NavLink>
      </div>
      <img src={cartBig} alt="cart" className={styles.order__img} />
    </div>
  );
};

export default OrderTotal;
