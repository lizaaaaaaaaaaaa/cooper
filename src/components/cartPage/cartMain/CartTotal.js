import { useContext } from "react";
import styles from "./CartTotal.module.scss";
import CartContext from "../../../context/cart-context";
import deliveryCar from "../../../assets/deliveryCar.svg";
import Button from "./../../UI/Button";

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
      <div
        className={`${styles.cart__delivery} ${styles["cart__delivery-paid"]}`}
      >
        <span>Доставка:</span>
        <span>{products.length > 0 ? "90 грн." : "0 грн."}</span>
      </div>
    );
  return (
    <div className={styles.cart__total}>
      <div className={styles.cart__price}>
        <p>Итого</p>
        <p>
          {products.length > 0
            ? totalPrice >= 10000
              ? totalPrice
              : totalPrice + 90
            : "0"}
            {" "}
           грн.
        </p>
      </div>
      <div className={styles.cart__bottom}>
        {deliveryBlock}
        <Button className={styles.cart__btn} disabled={!products.length > 0}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default CartTotal;
