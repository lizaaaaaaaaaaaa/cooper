import React, { useState, useEffect, useContext } from "react";
import { getDatabase, ref as dbRef, get } from "firebase/database";
import AuthContext from "../../../../context/auth-context";
import ProductItem from "./../../../UI/ProductItem";
import styles from "../../UserContent.module.scss";
import Loader from "../../../UI/Loader";

const ITEMS_PER_PAGE = 8;

const FavoritesList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
              console.error(`Error fetching product with ID ${id}:`, error);
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
        console.error("Error fetching favorites:", error); //якщо помилка при отриманні обраних
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
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
      {totalPages > 1 && (
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
