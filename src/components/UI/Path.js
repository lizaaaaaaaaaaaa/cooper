import { useLocation, useParams } from "react-router";
import styles from "./Path.module.scss";
import { Link } from "react-router-dom";
import NewsContext from "../../context/news-context";
import { useContext } from "react";

const Path = () => {
  const location = useLocation();
  const params = useParams();
  const { newsId } = params;
  const context = useContext(NewsContext);

  const locationSwitchCase = () => {
    if (location.pathname.startsWith("/news/")) {
      return "Новости";
    }

    switch (location.pathname) {
      case "/catalog":
        return "Каталог";
      case "/about":
        return "О нас";
      case "/news":
        return "Новости";
      default:
        return "";
    }
  };

  const getNewsTitleHandler = () => {
    return context.news.find((news) => news.id === newsId)
      ? context.news.find((news) => news.id === newsId).title
      : "";
  };

  return (
    <p className={styles.path}>
      <Link to="/" className={styles.path__main}>
        Главная
      </Link>
      /
      <Link
        to={
          location.pathname.startsWith("/news/") ? "/news" : location.pathname
        }
        className={styles.path__page}
      >
        {locationSwitchCase()}
      </Link>
      {location.pathname.startsWith("/news/") ? "/" : ""}
      <Link
        to={`${location.pathname}/${newsId}`}
        className={styles["path__page-item"]}
      >
        {location.pathname.startsWith("/news/") ? getNewsTitleHandler() : ""}
      </Link>
    </p>
  );
};

export default Path;
