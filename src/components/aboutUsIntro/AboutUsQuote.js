import styles from "./AboutUsIntro.module.scss";
import signature from "../../assets/ABOUT/signature.png";

const AboutUsQuote = () => {
  return (
    <div className={styles.intro__content}>
      <h1 className={styles.intro__title}>О нас</h1>
      <div className={styles.intro__quote}>
        <blockquote>Мы любим все, что сделано из меди</blockquote>
        <div className={styles.intro__author}>
          <span>Иван Иванов</span>
          <img src={signature} alt="signature" />
        </div>
      </div>
    </div>
  );
};

export default AboutUsQuote;
