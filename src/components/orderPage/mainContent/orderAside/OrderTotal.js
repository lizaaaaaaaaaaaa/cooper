import { useContext, useEffect, useRef, useState } from "react";
import styles from "./OrderTotal.module.scss";
import CartContext from "../../../../context/cart-context";
import AuthContext from "../../../../context/auth-context";
import cartBig from "../../../../assets/cartBig.svg";
import deliveryCar from "../../../../assets/deliveryCar.svg";
import Button from "./../../../UI/Button";
import OrderPromocode from "./OrderPromocode";
import { db } from "../../../../firebase/firebase";
import { ref as dbRef, set, get } from "firebase/database";
import { Navigate } from "react-router";
import Loader from "../../../UI/Loader";
import SlicePrice from "../../../UI/SlicePrice";

const OrderTotal = (props) => {
  const [promocode, setPromocode] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isContactsFieldsValid, setIsContactsFieldValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState("");
  const [isOrderSent, setIsOrderSent] = useState(false);

  const promoPriceRef = useRef(null);

  const { products, totalPrice, clearCart } = useContext(CartContext);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (promocode) {
      promoPriceRef.current = Math.floor(
        totalPrice - (totalPrice * promocode.sale) / 100
      );
    } else promoPriceRef.current = totalPrice;
  }, [promocode, totalPrice]);

  useEffect(() => {
    for (const contact in props.contacts) {
      if (props.contacts[contact] === "") {
        setIsContactsFieldValid(false);
        return;
      } else setIsContactsFieldValid(true);
    }
  }, [props.contacts]);

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
      orderProducts: products.map((product) => ({
        ...product,
        salePrice: product.salePrice !== undefined ? product.salePrice : null,
      })),
      promocode,
      status: "Обрабатывается",
      date: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      },
    };

    const setOrder = async () => {
      setIsLoading(true);
      try {
        const docRef = dbRef(db, "orders");
        const getExistingOrdersFromDatabase = await get(docRef);

        if (getExistingOrdersFromDatabase.exists()) {
          const data = getExistingOrdersFromDatabase.val();
          await set(docRef, [...data, order]);
        }
        setIsOrderSent(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
        setHttpErrorMessage(error.message);
      }
    };

    setOrder();
  };

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  if (isOrderSent) {
    clearCart();
    return <Navigate to="/successful" replace />;
  }

  const finishPrice =
    promoPriceRef.current != null
      ? promoPriceRef.current >= 10000
        ? promoPriceRef.current
        : props.delivery === "selfPickup"
        ? promoPriceRef.current
        : promoPriceRef.current + 90
      : totalPrice >= 10000
      ? totalPrice
      : props.delivery === "selfPickup"
      ? totalPrice
      : totalPrice + 90;

  return (
    <div
      className={`${styles.order__total} ${
        isFormDisabled || isLoading ? styles["order__total-disabled"] : ""
      }`}
    >
      {isLoading ? <Loader className={styles.loader} /> : ""}
      <OrderPromocode
        onGetPromocodeData={(code) => setPromocode(code)}
        onGetLoadingStatus={(status) => setIsFormDisabled(status)}
      />
      <div className={styles.order__price}>
        <p>Итого</p>
        <p>
          <SlicePrice priceToSlice={finishPrice.toString()} /> грн.
        </p>
      </div>
      <div className={styles.order__bottom}>
        {deliveryBlock}
        <Button
          className={`${styles.order__btn} ${
            !isContactsFieldsValid || isFormDisabled
              ? styles["order__btn-disabled"]
              : ""
          }`}
          onClick={sendOrder}
          disabled={isFormDisabled || !isContactsFieldsValid || isLoading}
        >
          Оформить заказ
        </Button>
      </div>
      <img src={cartBig} alt="cart" className={styles.order__img} />
    </div>
  );
};

export default OrderTotal;
