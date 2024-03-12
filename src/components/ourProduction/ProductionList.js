import React, { useState, useEffect } from "react";
import styles from "./OurProduction.module.scss";
import ProductItem from "./ProductItem";
import { Navigate } from "react-router-dom";
import Loader from "../UI/Loader";

const ProductionList = () => {
  const [production, setProduction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchProduction = async () => {
      try {
        const response = await fetch(
          "https://cooper-3c826-default-rtdb.firebaseio.com/ourProduction.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const responseData = await response.json();

        const loadedProduction = [];
        for (const key in responseData) {
          loadedProduction.push({
            id: key,
            title: responseData[key].title,
            image: responseData[key].image,
          });
        }
        setProduction(loadedProduction);
        setIsLoading(false);
      } catch (error) {
        setHttpErrorMessage(error.message);
        setIsLoading(false);
      }
    };
    fetchProduction();
  }, []);

  const productionList = production.map((productionItem) => (
    <ProductItem
      key={productionItem.id}
      id={productionItem.id}
      title={productionItem.title}
      image={productionItem.image}
    />
  ));

  if (isLoading) {
    return <Loader />;
  }

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  return <div className={styles["production__inner"]}>{productionList}</div>;
};

export default ProductionList;
