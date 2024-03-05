import SlickSlider from "react-slick";
import React, { useEffect, useState } from "react";
import SliderItem from "./itemInfo/SliderItem";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import ItemInfo from "./itemInfo/ItemInfo";
import styles from "./Intro.module.scss";

const Slider = ({ onData }) => {
  const [distillers, setDistillers] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className={styles["arrow-prev"]} onClick={onClick}>
        prev
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className={styles["arrow-next"]} onClick={onClick}>
        next
      </button>
    );
  };

  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    afterChange: (index) => setActiveSlide(index),
  };

  useEffect(() => {
    setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchDestillers().catch((err) => {
      setIsLoading(false);
      setHttpErrorMessage(err.message);
    });
  }, []); //залежності не потрібно, оскільки вони будуть завантажені лише один раз при завантаженні сторінки

  const distillersSlider = distillers.map((distiller) => (
    <SliderItem key={distiller.id} id={distiller.id} image={distiller.image} />
  ));
  const activeDistiller = distillers[activeSlide];
  useEffect(() => {
    onData(activeDistiller);
  }, [activeDistiller]);
  return (
    <React.Fragment>
      <SlickSlider {...settings} className={styles["intro__slider"]}>
        {distillersSlider}
      </SlickSlider>
    </React.Fragment>
  );
};

export default Slider;
