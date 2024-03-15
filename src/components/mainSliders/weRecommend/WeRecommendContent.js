import Slider from "../slider/Slider";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../UI/Loader";

const WeRecomendedContent = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          "https://cooper-3c826-default-rtdb.firebaseio.com/catalog.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const responseData = await response.json();

        const loadedRecommendations = [];
        const filteredKeys = ["c1", "c3", "с4", "c5", "c6", "c9"];

        for (const key in responseData) {
          if (filteredKeys.includes(key)) {
            loadedRecommendations.push({
              id: key,
              name: responseData[key].name,
              price: responseData[key].price,
              image: responseData[key].image,
              filter: responseData[key].filter,
              isSale: responseData[key].isSale,
              salePrice: responseData[key].salePrice,
            });
          }
        }
        setRecommendations(loadedRecommendations);
        setIsLoading(false);
      } catch (error) {
        setHttpErrorMessage(error.message);
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }
  return (
    <React.Fragment>
      <Slider slidersInfo={recommendations} />
    </React.Fragment>
  );
};

export default WeRecomendedContent;
