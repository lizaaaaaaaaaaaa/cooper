import SlicePrice from "../../../../../UI/SlicePrice";
import styles from "./UserOrderDetailsSummary.module.scss";

const UserOrderDetailsSummary = (props) => {
  const isDeliveryPaid =
    props.price >= 10000
      ? false
      : props.delivery === "selfPickup"
      ? false
      : true;

  const price = isDeliveryPaid ? props.price - 90 : props.price;

  const deliveryPrice = isDeliveryPaid ? 90 : 0;

  return (
    <div className={styles.user__summary}>
      <div>
        <span>Цена:</span>{" "}
        <span>
          <SlicePrice priceToSlice={price.toString()} /> грн.
        </span>
      </div>
      <div>
        <span>Доставка:</span>
        <span>{deliveryPrice} грн.</span>
      </div>
      <div>
        <span>Всего:</span>
        <span>
          {<SlicePrice priceToSlice={(price + deliveryPrice).toString()} />}{" "}
          грн.
        </span>
      </div>
    </div>
  );
};

export default UserOrderDetailsSummary;
