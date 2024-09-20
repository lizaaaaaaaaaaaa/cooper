import { useContext, useState } from "react";
import styles from "./OrderTotal.module.scss";
import CartContext from "../../../../context/cart-context";
import cartBig from "../../../../assets/cartBig.svg";
import deliveryCar from "../../../../assets/deliveryCar.svg";
import Button from "./../../../UI/Button";
import OrderPromocode from "./OrderPromocode";

const OrderTotal = (props) => {
  const [promocode, setPromocode] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const { products, totalPrice } = useContext(CartContext);

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

  const sendOrder = () => {
    console.log(props, products, totalPrice, promocode);
  };
  return (
    <div
      className={`${styles.order__total} ${
        isFormDisabled ? styles["order__total-disabled"] : ""
      }`}
    >
      <OrderPromocode
        onGetPromocodeData={(code) => setPromocode(code)}
        onGetLoadingStatus={(status) => setIsFormDisabled(status)}
      />
      <div className={styles.order__price}>
        <p>Итого</p>
        <p>
          {totalPrice >= 10000 ? totalPrice : totalPrice + 90}
          грн.
        </p>
      </div>
      <div className={styles.order__bottom}>
        {deliveryBlock}
        <Button
          className={styles.order__btn}
          onClick={sendOrder}
          disabled={isFormDisabled}
        >
          Оформить заказ
        </Button>
      </div>
      <img src={cartBig} alt="cart" className={styles.order__img} />
    </div>
  );
};

export default OrderTotal;
