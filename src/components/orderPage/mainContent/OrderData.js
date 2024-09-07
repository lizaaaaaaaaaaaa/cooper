import { useContext } from "react";
import styles from "./OrderData.module.scss";
import AuthContext from "../../../context/auth-context";
import NoAuthenticated from "./NoAuthenticated";
import OrderContacts from "./OrderContacts";
import OrderDelivery from "./OrderDelivery";

const OrderData = (props) => {
  const context = useContext(AuthContext);
  return (
    <div className={styles.order__data}>
      {!context.isAuthenticated && <NoAuthenticated />}
      <ol className={styles.order__list}>
        <OrderContacts
          onGetData={(contacts) => props.onGetOrderContactsData(contacts)}
        />
        <OrderDelivery />
      </ol>
    </div>
  );
};

export default OrderData;
