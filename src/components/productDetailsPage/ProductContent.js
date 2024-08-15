import styles from "./ProductContent.module.scss";
import Path from "../UI/Path";
import ProductMain from "./productMain/ProductMain";

const ProductContent = () => {
  return (
    <div className={`content ${styles.product}`}>
      <div className="container">
        <Path />
        <ProductMain/>
      </div>
    </div>
  );
};

export default ProductContent;
