import styles from "./OrderProductItem.module.scss";

const OrderProductItem = (props) => {
  return (
    <li className={styles.order__product}>
      <img src={props.image} alt={props.name} />
      <h3 className={styles.order__productName}>{props.name}</h3>
      <div className={styles.order__productDetails}>
        <span>{props.amount} шт.</span>
        <span>{props.isSale ? props.salePrice : props.price} грн.</span>
      </div>
    </li>
  );
};

export default OrderProductItem;
