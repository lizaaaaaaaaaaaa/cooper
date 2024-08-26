import "./Slider.scss";
import SlickSlider from "react-slick";
import { PrevArrow, NextArrow } from "../../UI/PrevNextArrows";
import React, { useRef } from "react";
import Button from "../../UI/Button";
import { NavLink } from "react-router-dom";
import ProductItem from "../../UI/ProductItem";

const Slider = ({ slidersInfo, hideBtn }) => {
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
    dots: true,
    arrows: false,
    slidesToShow: 3,
    infinite: false,
    slidesToScroll: 1,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const slidersInfoList = slidersInfo.map((sliderInfo) => (
    <ProductItem
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

  console.log(hideBtn);

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
      <div className="slider__arrow-prev" onClick={previousSlide}>
        <CustomPrevArrow />
      </div>
      <div className="slider__arrow-next" onClick={nextSlide}>
        <CustomNextArrow />
      </div>

      {!hideBtn ? (
        <NavLink to="/catalog" replace>
          <Button className="slider__button">Перейти в каталог</Button>
        </NavLink>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default Slider;
