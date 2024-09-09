import styles from "./OrderDetails.module.scss";

const OrderDelivery = (props) => {
  return (
    <li className={styles.order__delivery}>
      <div className={styles.order__title}>Доставка</div>
      <div className={styles['order__btns-delivery']}>
        <label
          htmlFor="selfPickup"
          className={`${styles.order__btn} ${styles['order__btn-delivery']} ${
            props.deliveryType === "selfPickup"
              ? styles["order__btn-active"]
              : ""
          }`}
        >
          <input
            id="selfPickup"
            type="radio"
            name="delivery"
            value="selfPickup"
            onChange={(event) => props.onGetData(event.target.value)}
          />
          <span>Самовывоз</span>
          <span>
            Вы можете забрать из нашего официального магазина по адресу Бажана
            8-Б, Киев, 02132 Украина
          </span>
        </label>
        <label
          htmlFor="NovaPoshta"
          className={`${styles.order__btn} ${styles['order__btn-delivery']} ${
            props.deliveryType === "NovaPoshta"
              ? styles["order__btn-active"]
              : ""
          }`}
        >
          <input
            id="NovaPoshta"
            type="radio"
            name="delivery"
            value="NovaPoshta"
            onChange={(event) => props.onGetData(event.target.value)}
          />
          <span>Новая почта</span>
          <span>Доставка посылки к отделению Новой почты</span>
        </label>
        <label
          htmlFor="courierNovaPoshta"
          className={`${styles.order__btn} ${styles['order__btn-delivery']} ${
            props.deliveryType === "courierNovaPoshta"
              ? styles["order__btn-active"]
              : ""
          }`}
        >
          <input
            id="courierNovaPoshta"
            type="radio"
            name="delivery"
            value="courierNovaPoshta"
            onChange={(event) => props.onGetData(event.target.value)}
          />
          <span> Курьер “Новая почта”</span>
          <span>
            Курьер может доставить посылку прямо к вашему дому за указанным
            адресом
          </span>
        </label>
      </div>
    </li>
  );
};

export default OrderDelivery;
