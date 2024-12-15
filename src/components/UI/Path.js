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
    if (location.pathname.startsWith("/cooper/news/")) {
      return "Новости";
    }
    if (location.pathname.startsWith("/cooper/catalog/")) {
      return "Каталог";
    }

    switch (location.pathname) {
      case "/cooper/catalog":
        return "Каталог";
      case "/cooper/about":
        return "О нас";
      case "cooper/news":
        return "Новости";
      case "/cooper/cart":
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

  if (location.pathname.startsWith("/cooper/news/")) {
    locationPage = "/cooper/news";
    locationDetails = getNewsTitleHandler();
  } else if (location.pathname.startsWith("/cooper/catalog/")) {
    locationPage = "/cooper/catalog";
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
          location.pathname.startsWith("/cooper/news/") ||
          location.pathname.startsWith("/cooper/catalog/")
            ? styles["path__page-active"]
            : ""
        }`}
      >
        {locationSwitchCase()}
      </Link>
      {location.pathname.startsWith("/cooper/news/") ||
      location.pathname.startsWith("/cooper/catalog/") ? (
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
