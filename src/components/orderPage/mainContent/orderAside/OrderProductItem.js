import { NavLink } from "react-router-dom";
import styles from "./OrderProductItem.module.scss";
import SlicePrice from "../../../UI/SlicePrice";

const OrderProductItem = (props) => {
  return (
    <li className={styles.order__product}>
      <NavLink
        to={`/cooper/catalog/${props.id}`}
        className={styles.order__productElement}
      >
        <img src={props.image} alt={props.name} />
      </NavLink>
      <NavLink
        to={`/cooper/catalog/${props.id}`}
        className={styles.order__productElement}
      >
        <h3 className={styles.order__productName}>{props.name}</h3>
      </NavLink>
      <div className={styles.order__productDetails}>
        <span>{props.amount} шт.</span>
        <span>
          {props.isSale ? (
            <SlicePrice priceToSlice={props.salePrice.toString()} />
          ) : (
            <SlicePrice priceToSlice={props.price.toString()} />
          )}{" "}
          грн.
        </span>
      </div>
    </li>
  );
};

export default OrderProductItem;
