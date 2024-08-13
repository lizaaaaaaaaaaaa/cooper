import styles from "./ArticleContent.module.scss";
import { Navigate, useParams } from "react-router";
import NewsContext from "../../../context/news-context";
import Loader from "../../UI/Loader";
import { useContext } from "react";
import ArticleSocials from "./ArticleSocials";
import { useLocation } from "react-router-dom";

const ArticleContent = () => {
  const location = useLocation();
  const params = useParams();
  const { newsId } = params;
  const context = useContext(NewsContext);

  if (context.httpErrorMessage) {
    return (
      <Navigate
        to="/httpError"
        errorMessage={context.httpErrorMessage}
        replace
      />
    );
  }

  const articleDetails = context.news.find((news) => news.id === newsId);
  const currentArticleIndex = context.news.findIndex(
    (news) => news.id === newsId
  );

  const prevArticle =
    currentArticleIndex > 0 ? context.news[currentArticleIndex - 1] : "";
  const nextArticle =
    currentArticleIndex !== context.news.length - 1
      ? context.news[currentArticleIndex + 1]
      : "";

  console.log(prevArticle, nextArticle);

  if (context.isLoading || !context.news.length) {
    return <Loader />;
  }

  return (
    <div className={styles.article__main}>
      <div className={styles.article__top}>
        <h1 className={styles.article__title}>{articleDetails.title}</h1>
        <ArticleSocials titleForLink={articleDetails.title} link={location.pathname} />
      </div>
      <img src={articleDetails.image} alt={articleDetails.title} className={styles.article__img} />
    </div>
  );
};

export default ArticleContent;
