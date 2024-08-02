import styles from "./OurValues.module.scss";
import one from "../../assets/ABOUT/values/list/1.png";
import two from "../../assets/ABOUT/values/list/2.png";
import three from "../../assets/ABOUT/values/list/3.png";

const OurValues = () => {
  return (
    <section className={styles.values}>
      <div className={`container ${styles.values__inner}`}>
        <div className={styles.values__img}>
          <h2>COPPER PRO</h2>
        </div>
        <div className={styles.values__content}>
          <h2 className="title">Наши ценности</h2>
          <p>
            Наше производство находится в Украине, но клиенты из более чем 50
            стран радуются товарам, приобретенным в нашем магазине.
          </p>
          <ul className={styles.values__list}>
            <li>
              <img src={one} alt="оперативность" />
              Оперативность
            </li>
            <li>
              <img src={two} alt="Качественный товар и сервис" />
              Качественный товар и сервис
            </li>
            <li>
              <img src={three} alt="Гибкость" />
              Гибкость
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
