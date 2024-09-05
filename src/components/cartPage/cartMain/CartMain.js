import CartProducts from "./CartProducts";
import CartTotal from "./CartTotal";
import styles from "./CartMain.module.scss";

const CartMain = () => {
  return (
    <div className={styles.cart__main}>
      <CartProducts />
      <CartTotal />
    </div>
  );
};

export default CartMain;
