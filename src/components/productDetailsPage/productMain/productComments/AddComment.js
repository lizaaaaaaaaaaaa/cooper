import { ref as dbRef, set, get } from "firebase/database";
import { db } from "../../../../firebase/firebase";
import Button from "../../../UI/Button";
import styles from "./AddComment.module.scss";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/auth-context";
import Loader from "../../../UI/Loader";
import { Navigate } from "react-router";

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
        const commentsArray = getDataFromDatabase.val() || [];

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
    props.isCommentAdd(true);
  };

  useEffect(() => {
    const timeoutForChangeState = setTimeout(() => {
      props.isCommentAdd(false);
    }, 5000);

    return () => clearTimeout(timeoutForChangeState);
  }, [props.isCommentAdd]);

  if (httpErrorMessage) {
    return (
      <Navigate
        to="/httpError"
        errorMessage={
          context.httpErrorMessage ? context.httpErrorMessage : httpErrorMessage
        }
        replace
      />
    );
  }

  return (
    <form
      className={`container ${styles.comment__form}`}
      onSubmit={addCommentHandler}
    >
      {isLoading && <Loader className={styles.loader} />}
      <label htmlFor="comment" className={isLoading ? styles.disabled : ""}>
        Введите ваш отзыв:
      </label>
      <textarea
        name="commentContent"
        id="comment"
        placeholder="Для нас очень ценен любой ваш отзыв!"
        maxLength={300}
        onMouseLeave={(event) => setCommentText(event.target.value)}
        disabled={isLoading}
      ></textarea>
      <Button
        type="submit"
        className={styles.comment__btn}
        disabled={isLoading}
      >
        Отправить
      </Button>
    </form>
  );
};

export default AddComment;
