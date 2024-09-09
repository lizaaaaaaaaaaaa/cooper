import styles from "./OrderDetails.module.scss";

const OrderPayment = (props) => {
  return (
    <li className={styles.order__payment}>
      <div className={styles.order__title}>Оплата</div>
      <div className={styles['order__btns-payment']}>
        <label
          htmlFor="uponReceipt"
          className={`${styles.order__btn} ${
            props.paymentType === "uponReceipt"
              ? styles["order__btn-active"]
              : ""
          }`}
        >
          <input
            type="radio"
            id="uponReceipt"
            name="payment"
            value="uponReceipt"
            onChange={(event) => props.onGetData(event.target.value)}
          />
          <span>При получении</span>
        </label>
        <label
          htmlFor="onlinePayment"
          className={`${styles.order__btn} ${
            props.paymentType === "onlinePayment"
              ? styles["order__btn-active"]
              : ""
          }`}
        >
          <input
            type="radio"
            id="onlinePayment"
            name="payment"
            value="onlinePayment"
            onChange={(event) => props.onGetData(event.target.value)}
          />
          <span>Онлайн-оплата картой</span>
        </label>
      </div>
    </li>
  );
};

export default OrderPayment;
