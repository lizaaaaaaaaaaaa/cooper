import Path from "../UI/Path";
import styles from "./CartContent.module.scss";

const CartContent = () => {
  return (
    <section className={`content ${styles.cart}`}>
      <div className="container">
        <Path />
      </div>
      <div className="container">
        <div className={styles.cart__title}>Корзина</div>
      </div>
    </section>
  );
};

export default CartContent;
