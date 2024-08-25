import { useState } from "react";
import Button from "../../../UI/Button";
import CommentsSlider from "./CommentsSlider";
import styles from "./ProductComments.module.scss";
import AddComment from "./AddComment";

const ProductComments = (props) => {
  const [isAddCommentBtnActive, setIsAddCommentBtnActive] = useState(false);
  const [commentsArrayLength, setCommentsArrayLength] = useState(0);
  return (
    <section className={styles.comments}>
      <div className={styles.comments__top}>
        <div>Отзывы</div>
        <Button
          onClick={() => setIsAddCommentBtnActive(!isAddCommentBtnActive)}
        >
          {!isAddCommentBtnActive ? "Оставить отзыв" : "Отмена"}
        </Button>
      </div>
      {isAddCommentBtnActive && (
        <AddComment
          id={props.id}
          commentsArrayLength={commentsArrayLength}
          closeAddCommentComponent={(state) => setIsAddCommentBtnActive(state)}
        />
      )}
      <CommentsSlider
        id={props.id}
        getCommentsArrayLength={(length) => setCommentsArrayLength(length)}
      />
    </section>
  );
};

export default ProductComments;
