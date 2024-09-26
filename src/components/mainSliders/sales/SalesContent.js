import Slider from "../slider/Slider";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../UI/Loader";
import { useContext } from "react";
import ProductsContext from "../../../context/products-context";

const SalesContent = () => {
  const [sales, setSales] = useState([]);
  const context = useContext(ProductsContext);

  useEffect(() => {
    const salesArray = [];
    if (context.products.length > 0) {
      for (const item of context.products) {
        if (item.isSale) {
          salesArray.push(item);
        }
      }
    }
    setSales(salesArray);
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
      <Slider slidersInfo={sales} />
    </React.Fragment>
  );
};

export default SalesContent;
