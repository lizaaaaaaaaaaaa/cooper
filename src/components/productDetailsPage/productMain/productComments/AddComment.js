import { ref as dbRef, set, get } from "firebase/database";
import { db } from "../../../../firebase/firebase";
import Button from "../../../UI/Button";
import styles from "./AddComment.module.scss";
import { useContext, useState } from "react";
import AuthContext from "../../../../context/auth-context";

const AddComment = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);
  const [commentText, setCommentText] = useState("");

  const context = useContext(AuthContext);

  const commentsDate = new Date();
  const date = `${
    commentsDate.getDate().length === 1
      ? "0" + commentsDate.getDate()
      : commentsDate.getDate()
  }.${
    commentsDate.getMonth().toString().length === 1
      ? "0" + (commentsDate.getMonth() + 1)
      : commentsDate.getMonth() + 1
  }.${commentsDate.getFullYear().toString().substring(2, 5)}`;

  const addCommentHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const docRef = dbRef(db, `comments/${props.id}`);

    if (commentText)
      try {
        const getDataFromDatabase = await get(docRef);
        const commentsArray = getDataFromDatabase.val();

        const newComment = {
          date: date,
          text: commentText,
          userId: context.userDetails.key,
        };

        await set(docRef, [...commentsArray, newComment]);

        setIsLoading(false);
        props.closeAddCommentComponent(false);
      } catch (error) {
        setIsLoading(false);
        setHttpErrorMessage(error.message);
      }
  };

  return (
    <form className={styles.comment__form} onSubmit={addCommentHandler}>
      <label htmlFor="comment">Введите ваш отзыв:</label>
      <textarea
        name="commentContent"
        id="comment"
        placeholder="Для нас очень ценен любой ваш отзыв!"
        maxLength={300}
        // value={commentText}
        onMouseLeave={(event) => setCommentText(event.target.value)}
      ></textarea>
      <Button type="submit" className={styles.comment__btn}>
        Отправить
      </Button>
    </form>
  );
};

export default AddComment;
