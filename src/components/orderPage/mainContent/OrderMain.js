import { useState } from "react";
import OrderAside from "./OrderAside";
import OrderData from "./OrderData";
import styles from "./OrderMain.module.scss";

const OrderMain = () => {
  const [contacts, setContacts] = useState(null);
  const [delivery, setDelivery] = useState("selfPickup");
  const [payment, setPayment] = useState("uponReceipt");

  console.log(contacts);
  return (
    <div className={styles.order__main}>
      <OrderData
        onGetOrderContactsData={(contacts) => setContacts(contacts)}
        onGetOrderDeliveryData={(delivery) => setDelivery(delivery)}
        onGetOrderPaymentData={(payment) => setPayment(payment)}
        deliveryType={delivery}
        paymentType={payment}
      />
      <OrderAside />
    </div>
  );
};

export default OrderMain;
