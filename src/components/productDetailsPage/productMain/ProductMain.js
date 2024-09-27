import { useContext, useState, useEffect } from "react";
import ProductsContext from "../../../context/products-context";
import { Navigate, useParams } from "react-router";
import Loader from "../../UI/Loader";
import { ref as dbRef, get } from "firebase/database";
import { db } from "../../../firebase/firebase";
import styles from "./ProductMain.module.scss";
import ProductSlider from "./productTop/ProductSlider";
import ProductItem from "../../UI/ProductItem";
import ProductAbout from "./productTop/ProductAbout";
import ProductDescr from "./productDescr/ProductDescr";
import ProductComments from "./productComments/ProductComments";
import MightBeInteresting from "../../mainSliders/mightBeInteresting/MightBeInteresting";

const ProductMain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const params = useParams();
  const { productId } = params;
  const context = useContext(ProductsContext);

  const product = context.products.find((item) => item.id === productId);

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState("");
  const [currentImage, setCurrentImage] = useState(null);

  //   useEffect(() => {
  //     setCurrentImage(product?.image);
  //   }, [product]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const docRef = dbRef(db, "productDetails");
        const getDataFromDatabase = await get(docRef);

        if (getDataFromDatabase.exists()) {
          const data = getDataFromDatabase.val();
          if (data[productId]) {
            setDetails(data[productId]);

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

  if (context.isLoading || isLoading || !details || !product) {
    return <Loader />;
  }

  const getNewProductImageHandler = (image) => {
    setCurrentImage(image);
  };

  console.log(details.descrImages);

  return (
    <div className={styles.product__main}>
      <div className={`container ${styles.product__top}`}>
        <ProductSlider
          imagesArray={[...details.descrImages, product.image]} //+ основна картинка в кінець
          imagesAlt={product.name}
          getNewProductImage={getNewProductImageHandler}
        />
        <ProductItem
          key={product.id}
          id={product.id}
          isSale={product.isSale}
          isVisible={true}
          image={currentImage ? currentImage : product.image}
          className={styles.product__container}
        />
        <ProductAbout
          key={`${product.id}-about`}
          id={product.id}
          name={product.name}
          inStock={details.inStock}
          articleName={details.articleName}
          description={details.description}
          price={product.price}
          isSale={product.isSale}
          salePrice={product.salePrice}
        />
      </div>
      <ProductDescr howToUse={details.howToUse} />
      <ProductComments id={product.id} />
      <MightBeInteresting />
    </div>
  );
};

export default ProductMain;
