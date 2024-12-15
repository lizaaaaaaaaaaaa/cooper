import styles from "./Benefit.module.scss";
import Button from "./../UI/Button";
import distiller from "../../assets/benefit/distiller.png";
import { NavLink } from "react-router-dom";

const Benefit = () => {
  return (
    <section className={`section ${styles.benefit}`}>
      <div className="container">
        <div className={styles.benefit__content}>
          <h1 className={styles.benefit__title}>1 + 1 = 3</h1>
          <h4 className={styles.benefit__subtitle}>
            Закажите два товара и получите третий бесплатно
          </h4>
          <NavLink to="/cooper/catalog" replace>
            <Button className={styles.benefit__btn}>Перейти в каталог</Button>
          </NavLink>
        </div>
        <img src={distiller} className={styles.benefit__img} alt="distiller" />
        <h1 className={styles.benefit__label}>COPPER PRO</h1>
      </div>
    </section>
  );
};

export default Benefit;
