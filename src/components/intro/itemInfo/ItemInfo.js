import styles from "../Intro.module.scss";
import Button from "../../UI/Button";
import SlickSlider from "react-slick";
import React, { useEffect, useRef } from "react";
import DotsSliderItem from "./DotsSliderItem";

const ItemInfo = (props) => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    slidesToShow: 3,
    asNavFor: props.nav1,
    focusOnSelect: true,
    variableWidth: true,
  };
  let sliderRef2 = useRef(null);

  useEffect(() => {
    props.onTakeNav2(sliderRef2);
  }, [sliderRef2]);

  const sliderItems = Array.from({ length: props.distillersCount }).map(
    (_, index) => <DotsSliderItem key={index} />
  );
  return (
    <div className={styles["intro__info"]}>
      <h2 className={styles["intro__name"]}>{props.name}</h2>
      <div className={styles["intro__price"]}>
        Цена: <span>{props.price} грн</span>
      </div>
      <Button className={styles["intro__button"]}>Купить</Button>
      <SlickSlider
        {...settings}
        className={`intro__slider-second ${styles['intro__dots']}`}
        ref={(slider) => (sliderRef2 = slider)}
      >
        {sliderItems}
      </SlickSlider>
    </div>
  );
};

export default ItemInfo;
