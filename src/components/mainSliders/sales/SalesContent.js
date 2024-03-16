import Slider from "../slider/Slider";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../UI/Loader";

const SalesContent = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchSales = async () => {
      try {
        const response = await fetch(
          "https://cooper-3c826-default-rtdb.firebaseio.com/catalog.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const responseData = await response.json();

        const loadedSales = [];

        for (const key in responseData) {
          const sale = responseData[key];
          if (sale.isSale === true) {
            loadedSales.push({
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
        setSales(loadedSales);
        setIsLoading(false);
      } catch (error) {
        setHttpErrorMessage(error.message);
        setIsLoading(false);
      }
    };
    fetchSales();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }
  return (
    <React.Fragment>
      <Slider slidersInfo={sales} />
    </React.Fragment>
  );
};

export default SalesContent;
