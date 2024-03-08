import styles from "../Intro.module.scss"
import React from 'react';
import shadow from "../../../assets/intro/sliderBack.svg"

const SliderItem = (props) => {
  return (
    <div className={styles['intro__item']}>
      <img className={styles['intro__distiller']} src={props.image} alt="distillerImage" />
      <img className={styles['intro__shadow']} src={shadow} alt="shadow" />
    </div>
  );
};

export default SliderItem;
