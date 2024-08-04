import styles from "./CatalogContent.module.scss";
import CatalogBtnControls from "./catalogPageControl/CatalogBtnControls";
import Path from "../UI/Path";

const CatalogContent = () => {
  const getCurrentFilterHandler = (filter) => {
    console.log(filter);
  };

  return (
    <section className={`content  ${styles.catalog}`}>
      <div className="container">
        <Path />
      </div>
      <div className="container">
        <h2 className={styles.catalog__title}>Каталог</h2>
        <CatalogBtnControls onGetCurrentFilter={getCurrentFilterHandler} />
      </div>
    </section>
  );
};

export default CatalogContent;
