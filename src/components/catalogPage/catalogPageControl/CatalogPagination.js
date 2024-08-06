import styles from "./CatalogPagination.module.scss";

const CatalogPagination = (props) => {
  const totalPages = Math.ceil(props.distillersLength / props.pages);

  return (
    <div className={styles.catalog__pagination}>
      <button
        className={styles.catalog__btn}
        onClick={() => props.onPageChange(props.currentPage - 1)}
        disabled={props.currentPage === 1}
      >
        &#10094;
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => props.onPageChange(index + 1)}
          className={`${styles.catalog__btn} ${
            index + 1 === props.currentPage ? styles["catalog__btn-active"] : ""
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={styles.catalog__btn}
        onClick={() => props.onPageChange(props.currentPage + 1)}
        disabled={props.currentPage === totalPages}
      >
        &#10095;
      </button>
    </div>
  );
};

export default CatalogPagination;
