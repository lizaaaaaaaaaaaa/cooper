import styles from "./UserOrdersList.module.scss";
import UserOrdersListItem from "./UserOrdersListItem";

const UserOrdersList = ({ orders }) => {
  const orderList = orders.map((order, index) => (
    <UserOrdersListItem
      key={index + 1}
      date={order.date}
      delivery={order.delivery}
      products={order.orderProducts}
      status={order.status}
      price={order.totalPrice}
      contacts={order.contacts}
    />
  ));
  return <ul className={styles.user__list}>{orderList}</ul>;
};

export default UserOrdersList;
