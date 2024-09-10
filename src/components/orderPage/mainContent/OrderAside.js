import styles from "./OrderAside.module.scss";
import OrderProducts from "./orderAside/OrderProducts";

const OrderAside = () => {
  return (
    <section className={styles.order__aside}>
      <OrderProducts />
    </section>
  );
};

export default OrderAside;
