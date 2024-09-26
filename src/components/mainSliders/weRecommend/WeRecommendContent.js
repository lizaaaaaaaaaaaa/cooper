import Slider from "../slider/Slider";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../UI/Loader";
import { useContext } from "react";
import ProductsContext from "../../../context/products-context";

const WeRecomendedContent = () => {
  const [recommendations, setRecommendations] = useState([]);
  const context = useContext(ProductsContext);

  const filteredKeys = ["c6", "c9", "с11", "c24", "c25", "c29"];

  useEffect(() => {
    const recommendationsArray = [];
    if (context.products.length > 0) {
      for (const item of context.products) {
        if (filteredKeys.includes(item.id)) {
          recommendationsArray.push(item);
        }
      }
    }
    setRecommendations(recommendationsArray);
  }, [context.products]);

  if (context.isLoading) {
    return <Loader />;
  }

  if (context.httpErrorMessage) {
    return (
      <Navigate
        to="/httpError"
        errorMessage={context.httpErrorMessage}
        replace
      />
    );
  }
  return (
    <React.Fragment>
      <Slider slidersInfo={recommendations} />
    </React.Fragment>
  );
};

export default WeRecomendedContent;
