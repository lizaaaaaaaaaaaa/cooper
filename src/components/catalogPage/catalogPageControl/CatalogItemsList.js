import { useEffect, useState } from "react";
import styles from "./CatalogItemsList.module.scss";
import { Navigate, useLocation } from "react-router";
import { db } from "../../../firebase/firebase";
import { ref as dbRef, get } from "firebase/database";
import Loader from "../../UI/Loader";
import ProductItem from "../../UI/ProductItem";
import CatalogPagination from "./CatalogPagination";

const CatalogItemsList = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterParams = queryParams.get("filter");

  const getItemsPerPage = () => {
    if (window.innerWidth > 768) {
      return 9;
    } else if (window.innerWidth <= 768 && window.innerWidth > 480) {
      return 8;
    } else {
      return 6;
    }
  };

  const [distillers, setDistillers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userDocRef = dbRef(db, `catalog`);
        const dataSnapshot = await get(userDocRef);

        const loadedDistillers = [];

        const filter = getFilterfromParamsHandler();

        if (dataSnapshot.exists()) {
          const data = dataSnapshot.val();
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

    fetchData();
  }, [filterParams]);

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  const sortedDistillers = distillers.slice().sort((product1, product2) => {
    const actualPrice = (product) =>
      product.isSale === true ? product.salePrice : product.price;
    if (props.passSortType === "По цене") {
      return actualPrice(product1) - actualPrice(product2);
    } else {
      return product1.name.localeCompare(product2.name);
    }
  });

  const currentProducts = sortedDistillers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const searchProducts = props.passSearchValue
    ? currentProducts.filter((product) =>
        product.name.includes(props.passSearchValue)
      )
    : currentProducts;

  const catalogProducts = searchProducts.map((product) => (
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

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.catalog__main}>
      <div className={styles.catalog__products}>
        {catalogProducts.length !== 0 ? (
          catalogProducts
        ) : (
          <p className={styles.catalog__empty}>К сожалению, каталог пуст.</p>
        )}
      </div>
      <CatalogPagination
        pages={itemsPerPage}
        distillersLength={distillers.length}
        currentPage={currentPage}
        onPageChange={pageChangeHandler}
      />
    </section>
  );
};

export default CatalogItemsList;
