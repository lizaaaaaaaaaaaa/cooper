import OrderAside from "./OrderAside";
import OrderData from "./OrderData";
import styles from "./OrderMain.module.scss";

const OrderMain = () => {
  return (
    <div className={styles.order__main}>
      <OrderData />
      <OrderAside />
    </div>
  );
};

export default OrderMain;
