import styles from "./ProductPrice.module.scss";
import Button from "../../../UI/Button";

const ProductPrice = (props) => {
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
          <button>+</button>
          <input type="text" value="1" readOnly />
          <button>-</button>
        </div>
        <Button className={styles.product__buy}>Купить</Button>
      </div>
      <div></div>
    </div>
  );
};

export default ProductPrice;
