import { useContext } from "react";
import styles from "./OrderData.module.scss";
import AuthContext from "../../../context/auth-context";
import NoAuthenticated from "./NoAuthenticated";

const OrderData = () => {
  const context = useContext(AuthContext);
  return (
    <div className={styles.order__data}>
      {!context.isAuthenticated && <NoAuthenticated />}
    </div>
  );
};

export default OrderData;
