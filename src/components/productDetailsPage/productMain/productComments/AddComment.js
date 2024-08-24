import Button from "../../../UI/Button";
import styles from "./AddComment.module.scss";

const AddComment = (props) => {
  return (
    <form className={styles.comment__form}>
      <label htmlFor="comment">Введите ваш отзыв:</label>
      <textarea name="commentContent" id="comment" placeholder="Для нас очень ценен любой ваш отзыв!" maxLength={350}></textarea>
      <Button type="submit" className={styles.comment__btn}>Отправить</Button>
    </form>
  );
};

export default AddComment;
