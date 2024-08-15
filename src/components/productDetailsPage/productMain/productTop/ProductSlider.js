import Slider from "react-slick";
import styles from "./ProductSlider.module.scss";
import React, { useState } from "react";
import ImageModal from "./ImageModal";

const ProductSlider = (props) => {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    swipe: false,
  };

  const changeModalActivityHandler = (image) => {
    setIsImageModalVisible(true);
    setModalImage(image);
  };

  const removeModalActivityHandler = (image) => {
    setIsImageModalVisible(false);
    setModalImage(null);
  };

  return (
    <React.Fragment>
      {isImageModalVisible ? (
        <ImageModal
          onHideImageModal={removeModalActivityHandler}
          image={modalImage}
          alt={props.imagesAlt}
        />
      ) : (
        ""
      )}
      <Slider {...settings} className={styles.product__slider}>
        {props.imagesArray
          ? props.imagesArray.map((image, index) => (
              <img
                src={image}
                alt={props.imagesAlt}
                onClick={() => changeModalActivityHandler(image)}
                key={index}
              />
            ))
          : ""}
      </Slider>
    </React.Fragment>
  );
};

export default ProductSlider;
