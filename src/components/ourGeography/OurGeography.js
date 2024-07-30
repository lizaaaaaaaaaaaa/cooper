import styles from "./OurGeography.module.scss";
import map from "../../assets/ABOUT/map.svg";

const OurGeography = () => {
  return (
    <section className={styles.geography}>
      <div className={`container ${styles.geography__inner}`}>
        <div className={styles.geography__content}>
          <h2 className="title">Наша география</h2>
          <p>
            Наше производство находится в Украине, но клиенты из более чем 50
            стран радуются товарам, приобретенным в нашем магазине.
          </p>
        </div>
        <img src={map} className={styles.geography__img} alt="map with our locations in the world" />
      </div>
    </section>
  );
};

export default OurGeography;
