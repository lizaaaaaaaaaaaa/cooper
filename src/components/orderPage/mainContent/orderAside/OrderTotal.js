import { useContext, useEffect, useRef, useState } from "react";
import styles from "./OrderTotal.module.scss";
import CartContext from "../../../../context/cart-context";
import AuthContext from "../../../../context/auth-context";
import cartBig from "../../../../assets/cartBig.svg";
import deliveryCar from "../../../../assets/deliveryCar.svg";
import Button from "./../../../UI/Button";
import OrderPromocode from "./OrderPromocode";

const OrderTotal = (props) => {
  const [promocode, setPromocode] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const promoPriceRef = useRef(null);

  const { products, totalPrice } = useContext(CartContext);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (promocode) {
      promoPriceRef.current = Math.floor(
        totalPrice - (totalPrice * promocode.sale) / 100
      );
    } else promoPriceRef.current = totalPrice;
  }, [promocode, totalPrice]);

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
    const order = {
      userId: user ? user.userDetails.key : "Незалогиненый пользователь",
      contacts: props.contacts,
      delivery: props.delivery,
      payment: props.payment,
      orderProducts: products,
      promocode,
      status: 'Обрабатывается'
    };
    console.log(props, products, totalPrice, promocode, user.userDetails.key);
    console.log(order);
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
          {promoPriceRef.current != null
            ? promoPriceRef.current >= 10000
              ? promoPriceRef.current
              : props.delivery === "selfPickup"
              ? promoPriceRef.current
              : promoPriceRef.current + 90
            : totalPrice >= 10000
            ? totalPrice
            : props.delivery === "selfPickup"
            ? totalPrice
            : totalPrice + 90}{" "}
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
