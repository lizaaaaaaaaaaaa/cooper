import { NavLink } from "react-router-dom";
import styles from "./OrderProductItem.module.scss";

const OrderProductItem = (props) => {
  return (
    <li className={styles.order__product}>
      <NavLink to={`/catalog/${props.id}`} className={styles.order__productElement}>
        <img src={props.image} alt={props.name} />
      </NavLink>
      <NavLink to={`/catalog/${props.id}`} className={styles.order__productElement}>
        <h3 className={styles.order__productName}>{props.name}</h3>
      </NavLink>
      <div className={styles.order__productDetails}>
        <span>{props.amount} шт.</span>
        <span>{props.isSale ? props.salePrice : props.price} грн.</span>
      </div>
    </li>
  );
};

export default OrderProductItem;