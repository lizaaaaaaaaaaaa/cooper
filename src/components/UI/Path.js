import { useLocation } from "react-router";
import styles from "./Path.module.scss";
import { Link } from "react-router-dom";

const Path = () => {
  const location = useLocation();

  const locationSwitchCase = () => {
    switch (location.pathname) {
      case "/catalog":
        return "Каталог";
      case "/about":
        return "О нас";
      case "/news":
        return "Новости";
    }
  };

  return (
    <p className={styles.path}>
      <Link to="/" className={styles.path__main}>
        Главная
      </Link>
      /
      <Link to={location.pathname} className={styles.path__page}>
        {locationSwitchCase()}
      </Link>
    </p>
  );
};

export default Path;
