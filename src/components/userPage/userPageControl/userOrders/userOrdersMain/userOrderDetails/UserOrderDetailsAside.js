import styles from "./UserOrderDetailsAside.module.scss";

const UserOrderDetailsAside = (props) => {
  let delivery;

  switch (props.delivery) {
    case "NovaPoshta":
      delivery = "Новая Почта";
      break;
    case "selfPickup":
      delivery = "Самовывоз";
      break;
    case "courierNovaPoshta":
      delivery = "Курьер новой почты";
      break;
    default:
      delivery = "";
  }
  return (
    <div className={styles.user__orderAside}>
      <p>Заказ от {props.date}</p>
      <p>тел. {props.contacts.phone}</p>
      <p>
        {props.contacts.country} {props.contacts.city}
      </p>
      <p>Доставка {delivery}</p>
      <p>
        <span>Вопросы? -</span>
        <a href="tel:+380969906756">+38 (096) 990 67 56</a>
      </p>
    </div>
  );
};

export default UserOrderDetailsAside;
