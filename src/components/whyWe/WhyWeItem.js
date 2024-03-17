import React, { useState } from "react";
import styles from "./WhyWe.module.scss";
import chevron from "../../assets/whyWe/chevron.svg";

const WhyWeItem = (props) => {
  const [isAllContentToShow, setIsAllContentToShow] = useState(false);

  const changeListItemContent = () => {
    setIsAllContentToShow(!isAllContentToShow);
  };

  const maxLength = 80;
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return isAllContentToShow ? text : `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <li>
      <img src={props.image} alt="icon" className={styles["why-we__img"]} />
      <h6 className={styles["why-we__title"]}>{props.title}</h6>
      <p className={styles["why-we__text"]}>
        {truncateText(props.text, maxLength)}
      </p>
      {props.text.length > maxLength && (
        <button
          className={styles["why-we__button"]}
          type="button"
          onClick={changeListItemContent}
        >
          {!isAllContentToShow ? "Читать больше" : "Скрыть"}
          <img
            src={chevron}
            alt="chevron"
            className={
              !isAllContentToShow
                ? `${styles["why-we__chevron"]}`
                : `${styles["why-we__chevron"]} ${styles["why-we__chevron-up"]}`
            }
          />
        </button>
      )}
    </li>
  );
};

export default WhyWeItem;
