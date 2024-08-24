import styles from "./ProductContent.module.scss";
import Path from "../UI/Path";
import ProductMain from "./productMain/ProductMain";
import { useEffect } from "react";

const ProductContent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <div className={`content ${styles.product}`}>
      <div className="container">
        <Path />
        <ProductMain />
      </div>
    </div>
  );
};

export default ProductContent;
