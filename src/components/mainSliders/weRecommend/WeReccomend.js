import styles from "./WeRecommend.module.scss";
import WeRecomendedContent from "./WeRecommendContent";

const WeRecomended = () => {
  return (
    <section className={`section ${styles.recommendations}`}>
      <div className="container">
        <h1 className="title">Мы рекомендуем</h1>
        <WeRecomendedContent/>
      </div>
    </section>
  );
};

export default WeRecomended;
