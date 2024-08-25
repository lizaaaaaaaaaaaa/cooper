import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router";
import Slider from "react-slick";
import Loader from "../../../UI/Loader";
import { ref as dbRef, get } from "firebase/database";
import { db } from "../../../../firebase/firebase";
import CommentItem from "./CommentItem";
import "./CommentsSlider.scss";
import { PrevArrow, NextArrow } from "../../../UI/PrevNextArrows";

const CommentsSlider = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

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
    dots: comments.length > 3 ? true : false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    swipe: comments.length > 3 ? true : false,
    variableHeight: false,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const docRef = dbRef(db, "comments");
        const getDataFromDatabase = await get(docRef);

        if (getDataFromDatabase.exists()) {
          const data = getDataFromDatabase.val();
          const loadedProductComments = [];
          for (const key in data) {
            if (props.id === key) {
              for (const index of data[key]) {
                loadedProductComments.push({
                  date: index.date,
                  text: index.text,
                  userId: index.userId,
                });
              }
              setComments(loadedProductComments);
              setIsLoading(false);
            } else {
              setIsLoading(false);
              setComments([]);
            }
          }
        } else {
          setComments([]);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
        setHttpErrorMessage(error.message);
      }
    };

    fetchData();
  }, [props.id]);

  useEffect(() => {
    props.getCommentsArrayLength(comments.length);
  }, [comments]);

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  if (isLoading || !comments) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <Slider
        {...settings}
        className="comments__slider"
        ref={(slider) => {
          sliderRef = slider;
        }}
      >
        {comments.map((item, index) => (
          <CommentItem
            key={index + 1}
            date={item.date}
            text={item.text}
            userId={item.userId}
          />
        ))}
      </Slider>

      <div className="comments__arrow-prev" onClick={previousSlide}>
        <CustomPrevArrow />
      </div>
      <div className="comments__arrow-next" onClick={nextSlide}>
        <CustomNextArrow />
      </div>
    </React.Fragment>
  );
};

export default CommentsSlider;
