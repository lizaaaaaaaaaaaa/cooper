import Slider from "../slider/Slider";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../UI/Loader";
import { useContext } from "react";
import ProductsContext from "../../../context/products-context";

const NewItemsContent = () => {
  const [newItems, setNewItems] = useState([]);
  const context = useContext(ProductsContext);

  useEffect(() => {
    const newItemsArray = [];
    const reverseProducts = [...context.products].reverse(); //спершу створити копію оригінального, потім розвертати, бо reverse мутує оригінальний
    if (reverseProducts.length > 0) {
      for (let item = 0; item <= 6; item++) {
        newItemsArray.push(reverseProducts[item]);
      }
    }
    setNewItems(newItemsArray);
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
      <Slider slidersInfo={newItems} />
    </React.Fragment>
  );
};

export default NewItemsContent;
