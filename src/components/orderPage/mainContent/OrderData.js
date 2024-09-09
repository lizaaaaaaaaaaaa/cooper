import { useContext } from "react";
import styles from "./OrderData.module.scss";
import AuthContext from "../../../context/auth-context";
import NoAuthenticated from "./NoAuthenticated";
import OrderContacts from "./OrderContacts";
import OrderDelivery from "./orderDetails/OrderDelivery";
import OrderPayment from "./orderDetails/OrderPayment";

const OrderData = (props) => {
  const context = useContext(AuthContext);
  return (
    <div className={styles.order__data}>
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
    </div>
  );
};

export default OrderData;
