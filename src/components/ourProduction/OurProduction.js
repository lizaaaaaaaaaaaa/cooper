import { useState, useEffect } from "react";
import styles from "./OurProduction.module.scss";
import ProductItem from "./ProductItem";

const OurProduction = () => {
  const [production, setProduction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchProduction = async () => {
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
    };

    fetchProduction().catch((err) => {
      setIsLoading(false);
      setHttpErrorMessage(err.message);
    });
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
    return (
      <div>Loading</div>
    );
  }

  if (httpErrorMessage) {
    return (
      <section className={styles.error}>
        <h1>{httpErrorMessage}</h1>
      </section>
    );
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
