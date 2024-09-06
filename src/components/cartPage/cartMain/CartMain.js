import CartProducts from "./CartProducts";
import CartTotal from "./CartTotal";
import styles from "./CartMain.module.scss";
import { useEffect } from "react";

const CartMain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={styles.cart__main}>
      <CartProducts />
      <CartTotal />
    </div>
  );
};

export default CartMain;
