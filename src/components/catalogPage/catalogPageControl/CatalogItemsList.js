import { useContext, useEffect, useState } from "react";
import styles from "./CatalogItemsList.module.scss";
import { Navigate, useLocation } from "react-router";
import Loader from "../../UI/Loader";
import ProductItem from "../../UI/ProductItem";
import CatalogPagination from "./CatalogPagination";
import ProductsContext from "../../../context/products-context";

const CatalogItemsList = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterParams = queryParams.get("filter");

  const context = useContext(ProductsContext);

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

  const filter = getFilterfromParamsHandler();
  useEffect(() => {
    const wantedDistillers = [];
    for (const element of context.products) {
      if (filter === element.filter || filter === "all") {
        wantedDistillers.push(element);
      } else wantedDistillers.push(element);
    }
    setDistillers(wantedDistillers);
  }, [filterParams, filter, context.products]);

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

  if (context.httpErrorMessage) {
    return (
      <Navigate
        to="/httpError"
        errorMessage={context.httpErrorMessage}
        replace
      />
    );
  }

  if (context.isLoading) {
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
