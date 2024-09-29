import styles from "./UserOrdersListItem.module.scss";
import SlicePrice from "./../../../../UI/SlicePrice";
import UserOrderProductsShort from "./userOrderDetails/UserOrderProductsShort";
import { useState } from "react";

const UserOrdersListItem = (props) => {
  const [isUserDetailsVisible, setIsUserDetailsVisible] = useState(false);
  const orderDate = `${
    props.date.day.toString().length > 1
      ? props.date.day.toString()
      : "0" + props.date.day.toString()
  }.${
    props.date.month.toString().length > 1
      ? props.date.month.toString()
      : "0" + props.date.month.toString()
  }.${props.date.year.toString().slice(2, 5)}`;

  let statusStyle;

  switch (props.status) {
    case "Обрабатывается":
      statusStyle = "user__status-yellow";
      break;
    case "Отклонено":
      statusStyle = "user__status-red";
      break;
    case "Получено":
      statusStyle = "user__status-blue";
      break;
    case "Отправлено":
      statusStyle = "user__status-green";
      break;
    default:
      statusStyle = "user__status-yellow";
  }

  return (
    <li
      className={styles.user__item}
      onClick={() => setIsUserDetailsVisible(!isUserDetailsVisible)}
    >
      <div>
        <p>Заказ от {orderDate}</p>
        <p className={`${styles.user__status} ${styles[statusStyle]}`}>
          {props.status}
        </p>
      </div>
      <div>
        <p>Итоговая сумма</p>
        <p className={styles.user__price}>
          {<SlicePrice priceToSlice={props.price.toString()} />} грн.
        </p>
      </div>
      <UserOrderProductsShort products={props.products} />
      <button
        className={`${styles.user__details} ${
          isUserDetailsVisible ? styles["user__details-active"] : ""
        }`}
        onClick={() => setIsUserDetailsVisible(!isUserDetailsVisible)}
      >
        &#10095;
      </button>
    </li>
  );
};

export default UserOrdersListItem;
