import styles from "./OrderAside.module.scss";
import OrderProducts from "./orderAside/OrderProducts";
import OrderTotal from "./orderAside/OrderTotal";

const OrderAside = (props) => {
  return (
    <section className={styles.order__aside}>
      <OrderProducts />
      <OrderTotal
        contacts={props.contacts}
        delivery={props.delivery}
        payment={props.payment}
      />
    </section>
  );
};

export default OrderAside;
