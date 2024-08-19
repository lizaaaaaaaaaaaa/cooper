import Button from "../../../UI/Button";
import CommentsSlider from "./CommentsSlider";
import styles from "./ProductComments.module.scss";

const ProductComments = (props) => {
  return (
    <section className={styles.comments}>
      <div className={styles.comments__top}>
        <div>Отзывы</div>
        <Button>Оставить отзыв</Button>
      </div>
      <CommentsSlider id={props.id} />
    </section>
  );
};

export default ProductComments;
