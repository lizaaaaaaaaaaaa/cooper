import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { ref as dbRef, get } from "firebase/database";

const ProductsContext = React.createContext({
  products: [],
  isLoading: false,
  httpErrorMessage: "",
});

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const docRef = dbRef(db, "catalog"); //посилання на бд та шлях до папки каталогу
        const getDatafromDatabase = await get(docRef); //отримання даних з бази даних асинхронно

        const loadedDistillers = [];

        if (getDatafromDatabase.exists()) {
          //перевірки існування даних
          const data = getDatafromDatabase.val(); //отримання значень даних
          for (const key in data) {
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
          setProducts(loadedDistillers);
          setIsLoading(false);
        } else setProducts([]);
      } catch (error) {
        setHttpErrorMessage(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, isLoading, httpErrorMessage }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
