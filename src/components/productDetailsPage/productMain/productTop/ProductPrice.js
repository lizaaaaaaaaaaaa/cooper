import styles from "./ProductPrice.module.scss";
import Button from "../../../UI/Button";
import { useState } from "react";

const ProductPrice = (props) => {
  const [productAmount, setProductAmount] = useState(1);

  const addProductAmountHandler = () => {
    if (productAmount < 10) {
      setProductAmount(productAmount + 1);
    }
  };

  const removeProductAmountHandler = () => {
    if (productAmount > 1) {
      setProductAmount(productAmount - 1);
    }
  };
  return (
    <div className={styles.product__price}>
      <div className={styles.product__priceTop}>
        <span>Цена</span>
        {!props.isSale && (
          <span className={styles.product__currency}>{props.price} грн</span>
        )}
        {props.isSale && (
          <div className={styles.product__sale}>
            <span className={styles["product__sale-new"]}>
              {props.salePrice} грн
            </span>
            <span className={styles["product__sale-old"]}>
              {props.price} грн
            </span>
          </div>
        )}
      </div>
      <div className={styles.product__priceBottom}>
        <div className={styles.product__amount}>
          <button onClick={addProductAmountHandler}>+</button>
          <input type="text" value={productAmount} readOnly />
          <button onClick={removeProductAmountHandler}>-</button>
        </div>
        <Button className={styles.product__buy} disabled={!props.inStock}>Купить</Button>
      </div>
      <div></div>
    </div>
  );
};

export default ProductPrice;
