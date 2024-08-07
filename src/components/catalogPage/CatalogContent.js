import styles from "./CatalogContent.module.scss";
import CatalogBtnControls from "./catalogPageControl/CatalogBtnControls";
import Path from "../UI/Path";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import CatalogItemsList from "./catalogPageControl/CatalogItemsList";
import CatalogHelp from "./catalogPageControl/CatalogHelp";

const CatalogContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filter, setFilter] = useState();
  const [sort, setSort] = useState("По цене");
  const [searchValue, setSearchValue] = useState("");

  const getCurrentFilterHandler = (filter) => {
    setFilter(filter);
  };

  const catalogControlHandler = () => {
    switch (filter) {
      case "Для эфирных масел":
        return "essentialOils";
      case "Для гидролатов":
        return "hydrolate";
      case "Медная посуда":
        return "brass";
      case "Аксессуары из меди":
        return "accessories";
      default:
        return "all";
    }
  };

  useEffect(() => {
    navigate({
      pathname: location.pathname,
      search: `?filter=${catalogControlHandler()}`,
    });
  }, [filter]);

  return (
    <section className={`content  ${styles.catalog}`}>
      <div className="container">
        <Path />
      </div>
      <div className="container">
        <h2 className={styles.catalog__title}>Каталог</h2>
        <CatalogBtnControls onGetCurrentFilter={getCurrentFilterHandler} />
        <CatalogHelp
          getSortType={(type) => {
            setSort(type);
          }}
          getSearchValue={(value) => setSearchValue(value)}
        />
        <CatalogItemsList passSortType={sort} passSearchValue={searchValue} />
      </div>
    </section>
  );
};

export default CatalogContent;
