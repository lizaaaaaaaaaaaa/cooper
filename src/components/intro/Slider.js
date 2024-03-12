import SlickSlider from "react-slick";
import React, { useEffect, useState, useRef } from "react";
import SliderItem from "./itemInfo/SliderItem";
import styles from "./Intro.module.scss";
import { PrevArrow, NextArrow } from "../UI/PrevNextArrows";
import { Navigate } from "react-router-dom";

const Slider = ({ onData, onTakeNav1, nav2, onTakeDistillersCount }) => {
  const [distillers, setDistillers] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);
  let sliderRef1 = useRef(null);

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className={styles["arrow-prev"]} onClick={onClick}>
        <PrevArrow />
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className={styles["arrow-next"]} onClick={onClick}>
        <NextArrow />
      </button>
    );
  };

  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    afterChange: (index) => setActiveSlide(index),
    asNavFor: nav2,
  };

  useEffect(() => {
    const fetchDestillers = async () => {
      const response = await fetch(
        "https://cooper-3c826-default-rtdb.firebaseio.com/introSlider.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const responseData = await response.json();

      const loadedDistillers = [];
      for (const key in responseData) {
        loadedDistillers.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          image: responseData[key].image,
        });
      }
      setDistillers(loadedDistillers);
      onTakeDistillersCount(loadedDistillers.length);
    };

    fetchDestillers().catch((err) => {
      setHttpErrorMessage(err.message);
    });
  }, []); //залежності не потрібно, оскільки вони будуть завантажені лише один раз при завантаженні сторінки

  useEffect(() => {
    onTakeNav1(sliderRef1);
  }, [sliderRef1]);

  const distillersSlider = distillers.map((distiller) => (
    <SliderItem key={distiller.id} id={distiller.id} image={distiller.image} />
  ));

  const activeDistiller = distillers[activeSlide];

  useEffect(() => {
    onData(activeDistiller);
  }, [activeDistiller]);

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  return (
    <React.Fragment>
      <SlickSlider
        {...settings}
        className={`intro__slider-first ${styles["intro__slider"]}`}
        ref={(slider) => (sliderRef1 = slider)}
      >
        {distillersSlider}
      </SlickSlider>
    </React.Fragment>
  );
};

export default Slider;
