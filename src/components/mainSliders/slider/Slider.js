import "./Slider.scss";
import SlickSlider from "react-slick";
import { PrevArrow, NextArrow } from "../../UI/PrevNextArrows";
import SliderItem from "./SliderItem";
import React, { useRef } from "react";

const Slider = ({ slidersInfo }) => {
  let sliderRef = useRef(null);

  const nextSlide = () => {
    sliderRef.slickNext();
  };
  const previousSlide = () => {
    sliderRef.slickPrev();
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="arrow-prev" onClick={onClick}>
        <PrevArrow />
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="arrow-next" onClick={onClick}>
        <NextArrow />
      </button>
    );
  };

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 3,
    infinite: false,
    slidesToScroll: 1,
    variableWidth: true,
    // prevArrow: <CustomPrevArrow />,
    // nextArrow: <CustomNextArrow />,
  };

  const slidersInfoList = slidersInfo.map((sliderInfo) => (
    <SliderItem
      key={sliderInfo.id}
      id={sliderInfo.id}
      name={sliderInfo.name}
      price={sliderInfo.price}
      image={sliderInfo.image}
      filter={sliderInfo.filter}
      isSale={sliderInfo.isSale}
      salePrice={sliderInfo.salePrice}
    />
  ));

  return (
    <React.Fragment>
      <SlickSlider
        className="slider"
        {...settings}
        ref={(slider) => {
          sliderRef = slider;
        }}
      >
        {slidersInfoList}
      </SlickSlider>
      <button className="slider__arrow-prev" onClick={previousSlide}>
        <CustomPrevArrow />
      </button>
      <button className="slider__arrow-next" onClick={nextSlide}>
        <CustomNextArrow />
      </button>
    </React.Fragment>
  );
};

export default Slider;
