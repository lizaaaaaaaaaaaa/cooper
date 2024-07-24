import styles from "./AboutUsIntro.module.scss";
import AboutUsQuote from "./AboutUsQuote";
import distiller from "../../assets/ABOUT/aboutUs.png";
import { Link } from "react-router-dom";

const AboutUsIntro = () => {
  return (
    <div className={styles.intro}>
      <div className="container">
        <p className={styles.intro__path}>
          <Link to="/" className={styles.intro__link}>Главная</Link>/<span>О нас</span>
        </p>
      </div>
      <div className={`container ${styles.intro__inner}`}>
        <AboutUsQuote />
        <img src={distiller} alt="distillerImage" />
      </div>
    </div>
  );
};

export default AboutUsIntro;
