import styles from "./Opinions.module.scss";
import OpinionsContent from "./OpinionsContent";

const Opinions = () => {
  return (
    <section className={`section ${styles.opinions}`}>
      <div className="container">
        <h1 className="title">Что думают о нас</h1>
        <OpinionsContent />
      </div>
    </section>
  );
};

export default Opinions;
