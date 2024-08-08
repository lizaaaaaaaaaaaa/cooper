import styles from "./OurProduction.module.scss";
import { NavLink } from "react-router-dom";

const ProductItem = (props) => {
  const navToCatalogHandler = () => {
    switch (props.title) {
      case "Для эфирных масел":
        return "essentialOils";
      case "Для гидролатов":
        return "hydrolate";
      case "Медная посуда":
        return "brass";
      case "Аксессуары из меди":
        return "accessories";
      default:
        return "";
    }
  };
  return (
    <NavLink
      to={
        navToCatalogHandler()
          ? `/catalog?filter=${navToCatalogHandler()}`
          : `/catalog`
      }
      style={{ backgroundImage: `url(${props.image})` }}
      className={styles["production__item"]}
    >
      <h6 className={styles["production__title"]}>{props.title}</h6>
    </NavLink>
  );
};

export default ProductItem;
