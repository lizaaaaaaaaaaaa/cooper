import Slider from "../slider/Slider";
import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../UI/Loader";
import ProductsContext from "../../../context/products-context";

const BestSellersContent = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const context = useContext(ProductsContext);

  const filteredKeys = ["c1", "c3", "c13", "c19", "c22", "c26"];

  useEffect(() => {
    const bestsellersArray = [];
    if (context.products.length > 0) {
      for (const item of context.products) {
        if (filteredKeys.includes(item.id)) {
          bestsellersArray.push(item);
        }
      }
    }
    setBestsellers(bestsellersArray);
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
      <Slider slidersInfo={bestsellers} />
    </React.Fragment>
  );
};

export default BestSellersContent;
