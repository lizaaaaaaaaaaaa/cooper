import styles from "./Article.module.scss";
import Path from "../UI/Path";
import ArticleContent from "./articleContent/ArticleContent";

const Article = () => {
  return (
    <div className={`content ${styles.article}`}>
      <div className="container">
        <Path />
        <ArticleContent />
      </div>
    </div>
  );
};

export default Article;
