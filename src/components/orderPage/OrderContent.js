import styles from "./OrderContent.module.scss";
import { NavLink } from "react-router-dom";
import OrderMain from "./mainContent/OrderMain";

const OrderContent = () => {
  return (
    <div className={`content ${styles.order}`}>
      <div className="container">
        <div className={styles.order__top}>
          <NavLink to="/cooper/catalog" className={styles.order__link}>
            Назад к покупкам
          </NavLink>
          <div className={styles.order__title}>Оформить заказ</div>
        </div>
        <OrderMain />
      </div>
    </div>
  );
};

export default OrderContent;
