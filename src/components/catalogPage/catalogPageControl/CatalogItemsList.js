import styles from "./CatalogItemsList.module.scss";
import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { ref as dbRef, get } from "firebase/database";
import Loader from "../../UI/Loader";
import ProductItem from "../../UI/ProductItem";

const CatalogItemsList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterParams = queryParams.get("filter");

  const [distillers, setDistillers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  const getFilterfromParamsHandler = () => {
    switch (filterParams) {
      case "essentialOils":
        return "Для эфирных масел";
      case "hydrolate":
        return "Для гидролатов";
      case "brass":
        return "Медная посуда";
      case "accessories":
        return "Аксессуары из меди";
      default:
        return "all";
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setIsLoading(true);
        const userDocRef = dbRef(db, `catalog`); // посилання на шлях 'catalog' в базі даних
        const dataSnapshot = await get(userDocRef); //запит для отримання даних за вказаним шляхом

        const loadedDistillers = [];

        const filter = getFilterfromParamsHandler();
        console.log(filter);

        if (dataSnapshot.exists()) {
          const data = dataSnapshot.val(); // отримання даних у вигляді об'єкта
          for (const key in data) {
            const wantedFilter = data[key];
            if (filter === wantedFilter.filter || filter === "all") {
              loadedDistillers.push({
                id: key,
                name: data[key].name,
                price: data[key].price,
                image: data[key].image,
                filter: data[key].filter,
                isSale: data[key].isSale,
                salePrice: data[key].salePrice,
              });
            }
          }
          setDistillers(loadedDistillers);
        } else {
          setDistillers([]);
        }
        setIsLoading(false);
      } catch (error) {
        setHttpErrorMessage(error.message);
        setIsLoading(false);
      }
    };

    fetchdata();
  }, [filterParams]);

  console.log(distillers);

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (distillers.length === 0) {
    return <p>К сожалению, каталог пуст.</p>;
  }

  const catalogProducts = distillers.map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      image={product.image}
      filter={product.filter}
      isSale={product.isSale}
      salePrice={product.salePrice}
    />
  ));

  return (
    <section className={styles.catalog__main}>
      {catalogProducts ? catalogProducts : ""}
    </section>
  );
};

export default CatalogItemsList;
