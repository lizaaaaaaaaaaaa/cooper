import Slider from "../slider/Slider";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../UI/Loader";

const NewItemsContent = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  useEffect(() => {
    const fetchNewItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://cooper-3c826-default-rtdb.firebaseio.com/catalog.json?orderBy="$key"&limitToLast=5' //для выбору останніх п'яти елементів
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const responseData = await response.json();

        const loadedNewItems = [];

        for (const key in responseData) {
          loadedNewItems.push({
            id: key,
            name: responseData[key].name,
            price: responseData[key].price,
            image: responseData[key].image,
            filter: responseData[key].filter,
            isSale: responseData[key].isSale,
            salePrice: responseData[key].salePrice,
          });
        }
        setNewItems(loadedNewItems);
        setIsLoading(false);
      } catch (error) {
        setHttpErrorMessage(error.message);
        setIsLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }
  return (
    <React.Fragment>
      <Slider slidersInfo={newItems} />
    </React.Fragment>
  );
};

export default NewItemsContent;
