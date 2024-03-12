import cat from "../assets/errors/notFound.png";
import styles from "./Errors.module.scss"

const NotFound = () => {
  return (
    <div className={styles.error}>
      <img className={styles.img} src={cat} alt="cat" />
      <h1 className={styles.title}>Страница не найдена</h1>
    </div>
  );
};

export default NotFound;
