import { useContext, useState, useEffect } from "react";
import ProductsContext from "../../../context/products-context";
import { Navigate, useParams } from "react-router";
import Loader from "../../UI/Loader";
import { ref as dbRef, get } from "firebase/database";
import { db } from "../../../firebase/firebase";
import styles from "./ProductMain.module.scss";
import ProductSlider from "./productTop/ProductSlider";

const ProductMain = () => {
  const params = useParams();
  const { productId } = params;
  const context = useContext(ProductsContext);

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState("");

  const product = context.products.find((item) => item.id === productId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const docRef = dbRef(db, "productDetails");
        const getDataFromDatabase = await get(docRef);

        if (getDataFromDatabase.exists()) {
          const data = getDataFromDatabase.val();
          if (data[productId]) {
            setDetails({
              articleName: data[productId].articleName,
              inStock: data[productId].inStock,
              description: data[productId].description,
              howToUse: data[productId].howToUse,
              descrImages: data[productId].descrImages,
            });

            setIsLoading(false);
          } else {
            setIsLoading(false);
            setDetails(null);
          }
        } else {
          setDetails(null);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        setHttpErrorMessage(error.message);
      }
    };

    fetchData();
  }, [productId]);

  if (context.httpErrorMessage || httpErrorMessage) {
    return (
      <Navigate
        to="/httpError"
        errorMessage={
          context.httpErrorMessage ? context.httpErrorMessage : httpErrorMessage
        }
        replace
      />
    );
  }

  if (context.isLoading || isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.product__main}>
      <div className={styles.product__top}>
        <ProductSlider
          imagesArray={details ? details.descrImages : ""}
          imagesAlt={product ? product.name : ""}
        />
        {product ? <img src={product.image} alt="" /> : ""}
        <p>{details ? details.articleName : ""}</p>
      </div>
    </div>
  );
};

export default ProductMain;
