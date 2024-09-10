import { useContext } from "react";
import styles from "./OrderData.module.scss";
import AuthContext from "../../../context/auth-context";
import NoAuthenticated from "../orderDataContent/NoAuthenticated";
import OrderContacts from "../orderDataContent/OrderContacts";
import OrderDelivery from "../orderDataContent/orderDetails/OrderDelivery";
import OrderPayment from "../orderDataContent/orderDetails/OrderPayment";

const OrderData = (props) => {
  const context = useContext(AuthContext);
  return (
    <section className={styles.order__data}>
      {!context.isAuthenticated && <NoAuthenticated />}
      <ol className={styles.order__list}>
        <OrderContacts
          onGetData={(contacts) => props.onGetOrderContactsData(contacts)}
        />
        <OrderDelivery
          onGetData={(delivery) => props.onGetOrderDeliveryData(delivery)}
          deliveryType={props.deliveryType}
        />
        <OrderPayment onGetData={(payment) => props.onGetOrderPaymentData(payment)} paymentType={props.paymentType} />
      </ol>
    </section>
  );
};

export default OrderData;
