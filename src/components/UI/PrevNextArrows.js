import styles from "./PrevNextArrows.module.scss";

export const PrevArrow = () => {
  return (
    <svg
      width="18"
      height="28"
      viewBox="0 0 18 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles["arrow-prev"]}
    >
      <path
        d="M17.9141 24.1537L7.76034 14L17.9141 3.84628L14.0678 -1.68126e-07L0.0677789 14L14.0678 28L17.9141 24.1537Z"
        fill="white"
      />
    </svg>
  );
};

export const NextArrow = () => {
  return (
    <svg
      width="18"
      height="28"
      viewBox="0 0 18 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles["arrow-next"]}
    >
      <path
        d="M0.0859407 3.84628L10.2397 14L0.085938 24.1537L3.93222 28L17.9322 14L3.93222 5.04379e-07L0.0859407 3.84628Z"
        fill="white"
      />
    </svg>
  );
};
