import React, { useState, useEffect, useContext } from "react";
import { getDatabase, ref as dbRef, get } from "firebase/database";
import AuthContext from "../../../../context/auth-context";
import ProductItem from "./../../../UI/ProductItem";
import styles from "../../UserContent.module.scss";
import Loader from "../../../UI/Loader";
import { Navigate } from "react-router";

let ITEMS_PER_PAGE;

if (window.innerWidth > 768) {
  ITEMS_PER_PAGE = 6;
}
if (window.innerWidth <= 768 && window.innerWidth > 480) {
  ITEMS_PER_PAGE = 4;
}
if (window.innerWidth <= 480) {
  ITEMS_PER_PAGE = 6;
}

const FavoritesList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  const context = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getDatabase(); // отримання посилання на базу даних

      // посилання на обране певного користувача за його ключом
      const favoritesRef = dbRef(
        db,
        `userEnter/${context.userDetails.key}/favorites`
      );

      try {
        const favorites = await get(favoritesRef); // запит до бази даних для отримання обраних

        if (favorites.exists()) {
          const data = favorites.val(); // отримання значень обраних, якщо вони існують

          const productIds = Object.values(data); // перетворення об'єкту значень у масив "ключів" продуктів

          // паралельні запити для отримання інформації про кожен продукт
          const productPromises = productIds.map(async (id) => {
            const productRef = dbRef(db, `catalog/${id}`); // отримання посилання на дані на айді конкретного продукта
            try {
              const product = await get(productRef); //запит до бд для отримання даних про продукт з даним айді
              if (product.exists()) {
                return { ...product.val(), id }; // якщо дані про продукт існують, то повертаємо об'єкт з даними та айді продукту
              } else {
                console.log(`Product with ID ${id} does not exist`); // Якщо дані про продукт не знайдено, виводимо повідомлення в консоль
                return null;
              }
            } catch (error) {
              setHttpErrorMessage(error.message);
              return null;
            }
          });

          // очікування виконання всіх запитів до бд та фільтрація результатів
          const productArray = (await Promise.all(productPromises)).filter(
            (product) => product !== null
          );

          setProducts(productArray);
          // оновлення стану з кількістю сторінок
          setTotalPages(Math.ceil(productArray.length / ITEMS_PER_PAGE));
        } else {
          console.log("No data available"); //якщо дані відсутні
        }
      } catch (error) {
        setHttpErrorMessage(error.message); //якщо помилка при отриманні обраних
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [context.userDetails.key]);

  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <ul className={styles.user__favorites}>
        {currentProducts.map((product) => (
          <li key={product.id}>
            <ProductItem
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              isSale={product.isSale}
              salePrice={product.salePrice}
            />
          </li>
        ))}
      </ul>
      <div className={styles.user__pagination}>
        <button
          className={styles["user__btn-pagination"]}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#10094;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`${styles["user__btn-pagination"]} ${
              index + 1 === currentPage
                ? styles["user__btn-pagination-active"]
                : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={styles["user__btn-pagination"]}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &#10095;
        </button>
      </div>
    </React.Fragment>
  );
};

export default FavoritesList;
