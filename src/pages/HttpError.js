import cat from "../assets/errors/errorImage.png";
import styles from "./Errors.module.scss";

const HttpError = (props) => {
  return (
    <div className={styles.error}>
      <h1 className={styles.title}>{props.errorMessage}</h1>
      <img className={styles.img} src={cat} alt="cat" />
      <h3 className={styles["title-second"]}>Что-то пошло не так...</h3>
      <h5 className={styles["title-third"]}>Пожалуйста, попробуйте позже!</h5>
    </div>
  );
};

export default HttpError;
