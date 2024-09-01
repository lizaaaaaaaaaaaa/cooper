import styles from "./ProductAbout.module.scss";
import ProductPrice from "./ProductPrice";

const ProductAbout = (props) => {
  return (
    <section className={styles.product__about}>
      <h1>{props.name}</h1>
      <div className={styles.product__status}>
        <span
          className={`${styles.product__stock} ${
            props.inStock
              ? styles["product__stock-is"]
              : styles["product__stock-not"]
          }`}
        >
          {props.inStock ? <span>&#10003;</span> : <span>&#10007;</span>}
          {props.inStock ? <span>В наличии</span> : <span>Нету в наличии</span>}
        </span>
        <span className={styles.product__article}>
          Артикул: <b>{props.articleName}</b>
        </span>
      </div>
      <div className={styles.product__descr}>
        <p>Описание</p>
        <p>{props.description}</p>
      </div>
      <ProductPrice
        price={props.price}
        isSale={props.isSale}
        salePrice={props.salePrice}
        inStock={props.inStock}
      />
    </section>
  );
};

export default ProductAbout;
