import React, { useState, useEffect } from "react";
import styles from "./OurProduction.module.scss";
import ProductItem from "./ProductItem";
import { Navigate } from "react-router-dom";

const OurProduction = () => {
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
      } catch (error) {
        setHttpErrorMessage(error.message);
      } finally {
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
    return <div>Loading</div>;
  }

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  return (
    <section className={`section ${styles.production}`}>
      <div className="container">
        <h1 className="title">Наша продукция</h1>
        <div className={styles["production__inner"]}>{productionList}</div>
      </div>
    </section>
  );
};

export default OurProduction;
