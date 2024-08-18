import Slider from "react-slick";
import styles from "./ProductSlider.module.scss";

const ProductSlider = (props) => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    swipe: false,
  };

  const changeImageHandler = (image) => {
    props.getNewProductImage(image);
  };

  return (
    <Slider {...settings} className={styles.product__slider}>
      {props.imagesArray
        ? props.imagesArray.map((image, index) => (
            <img
              src={image}
              alt={props.imagesAlt}
              onClick={() => changeImageHandler(image)}
              key={index}
            />
          ))
        : ""}
    </Slider>
  );
};

export default ProductSlider;
