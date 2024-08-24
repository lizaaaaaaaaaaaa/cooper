import styles from "./Article.module.scss";
import Path from "../UI/Path";
import ArticleContent from "./articleContent/ArticleContent";
import { useEffect } from "react";

const Article = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

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
