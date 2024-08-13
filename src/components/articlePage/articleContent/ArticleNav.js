import styles from "./ArticleNav.module.scss";
import ArticleSocials from "./ArticleSocials";
import { NavLink } from "react-router-dom";

const ArticleNav = (props) => {
  return (
    <div className={styles.article__nav}>
      {props.prevArticle && props.prevArticle.title ? (
        <NavLink
          to={`/news/${props.prevArticle.id}`}
          className={styles.article__link}
        >
          <span>&#10094;</span>
          {props.prevArticle.title}
        </NavLink>
      ) : null}

      <ArticleSocials />

      {props.nextArticle && props.nextArticle.title ? (
        <NavLink
          to={`/news/${props.nextArticle.id}`}
          className={styles.article__link}
        >
          {props.nextArticle.title}
          <span>&#10095;</span>
        </NavLink>
      ) : null}
    </div>
  );
};

export default ArticleNav;
