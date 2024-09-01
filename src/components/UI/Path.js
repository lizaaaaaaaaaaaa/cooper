import { useLocation, useParams } from "react-router";
import styles from "./Path.module.scss";
import { Link } from "react-router-dom";
import NewsContext from "../../context/news-context";
import { useContext } from "react";
import ProductContext from "../../context/products-context";

const Path = () => {
  const location = useLocation();
  const params = useParams();
  const { newsId } = params;
  const { productId } = params;

  const newsContext = useContext(NewsContext);
  const productContext = useContext(ProductContext);

  const locationSwitchCase = () => {
    if (location.pathname.startsWith("/news/")) {
      return "Новости";
    }
    if (location.pathname.startsWith("/catalog/")) {
      return "Каталог";
    }

    switch (location.pathname) {
      case "/catalog":
        return "Каталог";
      case "/about":
        return "О нас";
      case "/news":
        return "Новости";
      case "/cart":
        return "Корзина";
      default:
        return "";
    }
  };

  const getNewsTitleHandler = () => {
    return newsContext.news.find((news) => news.id === newsId)
      ? newsContext.news.find((news) => news.id === newsId).title
      : "";
  };

  const getProductTitleHandler = () => {
    return productContext.products.find((product) => product.id === productId)
      ? productContext.products.find((product) => product.id === productId).name
      : "";
  };

  let locationPage;
  let locationDetails;

  if (location.pathname.startsWith("/news/")) {
    locationPage = "/news";
    locationDetails = getNewsTitleHandler();
  } else if (location.pathname.startsWith("/catalog/")) {
    locationPage = "/catalog";
    locationDetails = getProductTitleHandler();
  } else {
    locationPage = location.pathname;
    locationDetails = "";
  }

  return (
    <p className={styles.path}>
      <Link to="/" className={styles.path__main}>
        Главная
      </Link>
      <span>/</span>
      <Link
        to={locationPage}
        className={`${styles.path__page} ${
          location.pathname.startsWith("/news/") ||
          location.pathname.startsWith("/catalog/")
            ? styles["path__page-active"]
            : ""
        }`}
      >
        {locationSwitchCase()}
      </Link>
      {location.pathname.startsWith("/news/") ||
      location.pathname.startsWith("/catalog/") ? (
        <span>/</span>
      ) : (
        ""
      )}
      <Link
        to={`${location.pathname}/${newsId ? newsId : productId}`}
        className={styles["path__page-item"]}
      >
        {locationDetails}
      </Link>
    </p>
  );
};

export default Path;
