import { useContext, useEffect } from "react";
import styles from "./UserOrders.module.scss";
import { useState } from "react";
import { db } from "../../../../firebase/firebase";
import { ref as dbRef, get } from "firebase/database";
import AuthContext from "../../../../context/auth-context";
import { Navigate } from "react-router";
import UserOrdersList from "./userOrdersMain/UserOrdersList";

const UserOrders = () => {
  const context = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const docRef = dbRef(db, "orders");
        const getDataFromDatabase = await get(docRef);

        if (getDataFromDatabase.exists()) {
          const data = getDataFromDatabase.val();

          const currentUserOrders = [];
          for (const key of data) {
            if (key.userId === context.userDetails.key) {
              currentUserOrders.push(key);
            }
          }
          console.log(currentUserOrders);
          setOrders(currentUserOrders);
          setIsLoading(false);
        } else setOrders([]);
      } catch (error) {
        setIsLoading(false);
        setHttpErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }
  return (
    <section className={styles.user__orders}>
      <UserOrdersList orders={orders} />
    </section>
  );
};

export default UserOrders;
