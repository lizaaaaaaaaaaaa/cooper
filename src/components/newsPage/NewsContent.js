import styles from "./NewsContent.module.scss";
import Path from "./../UI/Path";
import NewsList from "./newsList/NewsList";

const NewsContent = () => {
  return (
    <section className={`content ${styles.news}`}>
      <div className="container">
        <Path />
        <h2>Новости</h2>
        <NewsList />
      </div>
    </section>
  );
};

export default NewsContent;
