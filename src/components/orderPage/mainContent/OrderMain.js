import { useState } from "react";
import OrderAside from "./OrderAside";
import OrderData from "./OrderData";
import styles from "./OrderMain.module.scss";

const OrderMain = () => {
  const [contacts, setContacts] = useState(null);

  console.log(contacts);
  return (
    <div className={styles.order__main}>
      <OrderData onGetOrderContactsData={(contacts) => setContacts(contacts)} />
      <OrderAside />
    </div>
  );
};

export default OrderMain;
