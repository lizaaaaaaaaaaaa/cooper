import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router";
import Slider from "react-slick";
import Loader from "../../../UI/Loader";
import { ref as dbRef, get } from "firebase/database";
import { db } from "../../../../firebase/firebase";
import CommentItem from "./CommentItem";
import styles from "./CommentsSlider.module.scss"

const CommentsSlider = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
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

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  if (isLoading || !comments) {
    return <Loader />;
  }

  return (
    <Slider {...settings} className={styles.comments__slider}>
      {comments.map((item, index) => (
        <CommentItem
          key={index + 1}
          date={item.date}
          text={item.text}
          userId={item.userId}
        />
      ))}
    </Slider>
  );
};

export default CommentsSlider;
