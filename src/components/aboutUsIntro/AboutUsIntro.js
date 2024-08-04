import styles from "./AboutUsIntro.module.scss";
import AboutUsQuote from "./AboutUsQuote";
import distiller from "../../assets/ABOUT/aboutUs.png";
import Path from "../UI/Path";

const AboutUsIntro = () => {
  return (
    <section className={styles.intro}>
      <div className="container">
        <Path />
      </div>
      <div className={`container ${styles.intro__inner}`}>
        <AboutUsQuote />
        <img src={distiller} alt="distillerImage" />
      </div>
    </section>
  );
};

export default AboutUsIntro;
