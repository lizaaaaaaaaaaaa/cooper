import styles from "./UserOrderDetailsAside.module.scss"

const UserOrderDetailsAside = (props) => {
  return <div className={styles.user__orderAside}>
    <p>Заказ от {props.date}</p>
    <p>тел. {props.contacts.phone}</p>
    <p>{props.contacts.country} {props.contacts.city}</p>
    <p>Доставка {props.delivery}</p>
    <p>Вопросы? - <a href="tel:+380969906756">+38 (096) 990 67 56</a></p>
  </div>;
};

export default UserOrderDetailsAside;
