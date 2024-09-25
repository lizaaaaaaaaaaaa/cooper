import styles from "./SuccessOrderPageContent.module.scss";
import successfull from "..//../assets/successfulOrder.png";
import Button from "../UI/Button";
import { NavLink } from "react-router-dom";

const SuccessOrderPageContent = () => {
  return (
    <section className={`content ${styles.order}`}>
      <div className={`container ${styles.order__inner}`}>
        <img src={successfull} alt="successfull order" />
        <div className={styles.order__title}>Спасибо за заказ</div>
        <p className={styles.order__text}>
          Мы свяжемся с вами в ближайшее время
        </p>
        <NavLink to="/main" className={styles.order__link}>
          <Button className={styles.order__btn}>Главная</Button>
        </NavLink>
      </div>
    </section>
  );
};

export default SuccessOrderPageContent;
