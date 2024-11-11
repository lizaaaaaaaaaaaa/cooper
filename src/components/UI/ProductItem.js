import React, { useState, useContext, useEffect } from "react";
import styles from "./ProductItem.module.scss";
import AuthContext from "../../context/auth-context";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import SlicePrice from "./SlicePrice";

const ProductItem = (props) => {
  const context = useContext(AuthContext);
  const [isItemChosen, setIsItemChosen] = useState(
    Object.keys(context.userDetails?.favorites || {}).includes(props.id)
  );
  const [isBtnVisible, setIsBtnVisible] = useState(false);

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

  return (
    <div
      className={`${styles.product__item} ${props.className}`}
      onMouseOver={() => setIsBtnVisible(true)}
      onMouseLeave={() => setIsBtnVisible(false)}
    >
      {context.isAuthenticated && (
        <button
          onClick={chooseFavoriteHandler}
          className={btnFavoriteClassName}
        ></button>
      )}
      {props.isSale && <span className={styles.product__badge}>Sale</span>}
      <div className={styles.product__imgContainer}>
        <img
          src={props.image}
          className={styles.product__image}
          alt="product"
        />
        {!props.isVisible && (
          <NavLink
            to={`/catalog/${props.id}`}
            className={`${styles.product__navlink} ${
              isBtnVisible ? styles["product__navlink-active"] : ""
            }`}
          >
            <Button className={styles.product__navBtn}>Перейти</Button>
          </NavLink>
        )}
      </div>
      <div className={styles.product__content}>
        {props.name && <h5 className={styles.product__name}>{props.name}</h5>}
        {!props.isSale &&
          (props.price ? (
            <span className={styles.product__price}>
              {props.price ? (
                <SlicePrice priceToSlice={props.price.toString()} />
              ) : (
                ""
              )}{" "}
              грн.
            </span>
          ) : (
            ""
          ))}
        {props.isSale && (
          <div className={styles.product__sale}>
            <span className={styles["product__sale-old"]}>
              {props.price ? (
                <SlicePrice priceToSlice={props.price.toString()} />
              ) : (
                ""
              )}{" "}
              грн.
            </span>
            <span className={styles["product__sale-new"]}>
              {props.salePrice ? (
                <SlicePrice priceToSlice={props.salePrice.toString()} />
              ) : (
                ""
              )}{" "}
              грн.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
