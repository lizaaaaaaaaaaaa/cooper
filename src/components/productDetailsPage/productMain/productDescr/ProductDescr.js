import styles from "./ProductDescr.module.scss";

const ProductDescr = (props) => {
  return (
    <section className={`container ${styles.product__descr}`}>
      <div className={styles.product__title}>Описание</div>
      {props.howToUse.map((text, index) => (
        <p key={index} className={styles.product__text}>
          {text}
        </p>
      ))}
    </section>
  );
};

export default ProductDescr;
