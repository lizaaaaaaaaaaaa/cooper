import styles from "./CatalogItemsList.module.scss";
import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { ref as dbRef, get } from "firebase/database";
import Loader from "../../UI/Loader";
import ProductItem from "../../UI/ProductItem";
import CatalogPagination from "./CatalogPagination";

let ITEMS_PER_PAGE;

if (window.innerWidth > 768) {
  ITEMS_PER_PAGE = 9;
}
if (window.innerWidth <= 768 && window.innerWidth > 480) {
  ITEMS_PER_PAGE = 8;
}
if (window.innerWidth <= 480) {
  ITEMS_PER_PAGE = 6;
}

const CatalogItemsList = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterParams = queryParams.get("filter");

  const [distillers, setDistillers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

    fetchData();
  }, [filterParams]);

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  const sortedDistillers = distillers.slice().sort((product1, product2) => {
    const actualPrice = (product) =>
      product.isSale === true ? product.salePrice : product.price; //якщо isSale true, то використовується salePrice, інакше звичайнийprice
    if (props.passSortType === "По цене") {
      return actualPrice(product1) - actualPrice(product2);
    } else {
      return product1.name.localeCompare(product2.name); //сортування за алфавітом
    }
  });

  const currentProducts = sortedDistillers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const searchProducts = props.passSearchValue
    ? currentProducts.filter((product) =>
        product.name.includes(props.passSearchValue)
      )
    : currentProducts;

  console.log(!!props.passSearchValue);

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

  console.log(catalogProducts.length);

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
        pages={ITEMS_PER_PAGE}
        distillersLength={distillers.length}
        currentPage={currentPage}
        onPageChange={pageChangeHandler}
      />
    </section>
  );
};

export default CatalogItemsList;
