import React, { useState, useContext, useEffect } from "react";
import styles from "./ProductItem.module.scss";
import AuthContext from "../../context/auth-context";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { NavLink, useLocation } from "react-router-dom";

const ProductItem = (props) => {
  const context = useContext(AuthContext);
  const location = useLocation();

  const [isItemChosen, setIsItemChosen] = useState(
    Object.keys(context.userDetails?.favorites || {}).includes(props.id)
  );

  useEffect(() => {
    setIsItemChosen(
      Object.keys(context.userDetails?.favorites || {}).includes(props.id)
    );
  }, [context.userDetails?.favorites, props.id]);

  const chooseFavoriteHandler = async () => {
    setIsItemChosen(!isItemChosen);

    const existingData = JSON.parse(localStorage.getItem("userInfo")) || {};
    let updatedFavorites;

    if (isItemChosen) {
      updatedFavorites = Object.keys(existingData.favorites || {}).reduce(
        (acc, key) => {
          if (key !== props.id) {
            acc[key] = existingData.favorites[key];
          }
          return acc;
        },
        {}
      );
    } else {
      updatedFavorites = {
        ...existingData.favorites,
        [props.id]: props.id,
      };
    }

    const updatedData = { ...existingData, favorites: updatedFavorites };
    localStorage.setItem("userInfo", JSON.stringify(updatedData));
    context.updateUserDetails(updatedData);

    const db = getDatabase();
    const favoritesData = updatedFavorites;

    const userFavoritesDocRef = dbRef(
      db,
      `userEnter/${context.userDetails.key}/favorites`
    );

    await set(userFavoritesDocRef, favoritesData);
  };

  const btnFavoriteClassName = isItemChosen
    ? `${styles.product__favorite} ${styles["product__favorite-chosen"]}`
    : styles.product__favorite;

  const MainTag = !location.pathname.startsWith("/catalog/")
    ? NavLink
    : React.Fragment;

  return (
    <MainTag {...(MainTag === NavLink && { to: `/catalog/${props.id}` })}>
      <div className={`${styles.product__item} ${props.className}`}>
        {context.isAuthenticated && (
          <button
            onClick={chooseFavoriteHandler}
            className={btnFavoriteClassName}
          ></button>
        )}
        {props.isSale && <span className={styles.product__badge}>Sale</span>}
        <img
          src={props.image}
          className={styles.product__image}
          alt="product"
        />
        <div className={styles.product__content}>
          {props.name && <h5 className={styles.product__name}>{props.name}</h5>}
          {!props.isSale &&
            (props.price ? (
              <span className={styles.product__price}>{props.price} грн</span>
            ) : (
              ""
            ))}
          {props.isSale && (
            <div className={styles.product__sale}>
              <span className={styles["product__sale-old"]}>
                {props.price} грн
              </span>
              <span className={styles["product__sale-new"]}>
                {props.salePrice} грн
              </span>
            </div>
          )}
        </div>
      </div>
    </MainTag>
  );
};

export default ProductItem;
