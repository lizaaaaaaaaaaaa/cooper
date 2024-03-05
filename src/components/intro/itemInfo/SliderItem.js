import styles from "../Intro.module.scss"
import React from 'react';

const SliderItem = (props) => {
  return (
    <div className={styles['intro__item']}>
      <img className={styles['intro__distiller']} src={props.image} alt="distillerImage" />
    </div>
  );
};

export default SliderItem;
