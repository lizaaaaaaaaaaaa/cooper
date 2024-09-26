import styles from "./CartProductItem.module.scss";
import trash from "../../../assets/trash.svg";
import { useContext } from "react";
import CartContext from "../../../context/cart-context";
import SlicePrice from "../../UI/SlicePrice";

const CartProductItem = (props) => {
  const { removeProduct } = useContext(CartContext);
  return (
    <div className={styles.cart__product}>
      <div>
        <img
          src={props.image}
          alt={props.name}
          className={styles.cart__image}
        />
        <h4>{props.name}</h4>
      </div>
      <span>{props.amount} шт.</span>
      <span>{<SlicePrice priceToSlice={props.price.toString()} />} грн.</span>
      <button
        className={styles.cart__delete}
        onClick={() => removeProduct(props.id)}
      >
        <img src={trash} alt="delete" />
      </button>
    </div>
  );
};

export default CartProductItem;
