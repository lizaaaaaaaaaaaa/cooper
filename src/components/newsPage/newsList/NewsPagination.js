import styles from "./NewsPagination.module.scss";

const NewsPagination = (props) => {
  const totalPages = Math.ceil(props.newsLength / props.pages);

  return (
    <div className={styles.news__pagination}>
      <button
        className={styles.news__button}
        disabled={props.currentPage === 1}
        onClick={() => props.onPageChange(props.currentPage - 1)}
      >
        &#10094;
      </button>
      {Array.from({ length: totalPages }, (_, index) => {
        return (
          <button
            key={index}
            onClick={() => props.onPageChange(index + 1)}
            className={`${styles.news__button} ${
              props.currentPage === index + 1
                ? styles["news__button-active"]
                : ""
            }`}
          >
            {index + 1}
          </button>
        );
      })}
      <button
        className={styles.news__button}
        disabled={totalPages === props.currentPage}
        onClick={() => props.onPageChange(props.currentPage + 1)}
      >
        &#10095;
      </button>
    </div>
  );
};

export default NewsPagination;
