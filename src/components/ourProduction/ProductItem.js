import styles from "./OurProduction.module.scss";

const ProductItem = (props) => {
  return <a href="" style={{ backgroundImage: `url(${props.image})`}} className={styles["production__item"]}>
    <h6 className={styles["production__title"]}>{props.title}</h6>
  </a>;
};

export default ProductItem;
