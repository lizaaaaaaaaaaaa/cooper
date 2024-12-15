import { NavLink } from "react-router-dom";
import styles from "./RegContent.module.scss";
import RegForm from "./RegForm";

const RegistrationContent = () => {
  return (
    <section className={`content ${styles.reg}`}>
      <div className="container">
        <NavLink to="/main">
          <button className={styles.reg__btn}>Назад на главную</button>
        </NavLink>
        <div className={styles.reg__content}>
          <RegForm />
          <NavLink to="/cooper/enter">
            <button className={styles.reg__enter}>
              <span>Есть аккаунт ?</span>
              <span>Войти</span>
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default RegistrationContent;
