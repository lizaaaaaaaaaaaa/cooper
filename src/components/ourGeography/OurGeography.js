import styles from "./OurGeography.module.scss";
import map from "../../assets/ABOUT/map.svg";
import mapMid from "../../assets/ABOUT/map-mid.svg";
import mapSmall from "../../assets/ABOUT/map-small.svg";

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
        <picture>
          <source srcSet={map} media="(min-width: 769px)" />
          <source srcSet={mapMid} media="(max-width: 600px)" />
          <source srcSet={mapSmall} media="(max-width: 375px)" />
          <img
            className={styles.geography__img}
            src={map}
            alt="map with our locations in the world"
          />
        </picture>
      </div>
    </section>
  );
};

export default OurGeography;
