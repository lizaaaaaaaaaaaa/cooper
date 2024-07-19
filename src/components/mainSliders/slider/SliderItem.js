import { useState, useContext, useEffect } from "react";
import "./Slider.scss";
import AuthContext from "../../../context/auth-context";
import { getDatabase, ref as dbRef, set } from "firebase/database";

const SliderItem = (props) => {
  const context = useContext(AuthContext);

  const [isItemChosen, setIsItemChosen] = useState(
    Object.keys(context.userDetails?.favorites).includes(props.id)
  );

  //   оновлення стану кнопки та контексту, якщо елемент присутній в двох місцях на сторінці для синхронізації вибору
  useEffect(() => {
    setIsItemChosen(
      Object.keys(context.userDetails?.favorites || {}).includes(props.id)
    );
  }, [context.userDetails.favorites, props.id]);

  const chooseFavoriteHandler = async () => {
    setIsItemChosen(!isItemChosen);

    const existingData = JSON.parse(localStorage.getItem("userInfo")) || {};
    let updatedFavorites;

    if (isItemChosen) {
      // Видалення з обраного
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
      // Додавання до обраного
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
    ? "slider__favorite slider__favorite-chosen"
    : "slider__favorite";

  return (
    <div className="slider__item">
      {context.isAuthenticated && (
        <button
          onClick={chooseFavoriteHandler}
          className={btnFavoriteClassName}
        ></button>
      )}
      {props.isSale && <span className="slider__badge">Sale</span>}
      <img src={props.image} className="slider__image" alt="product" />
      <div className="slider__content">
        <h5 className="slider__name">{props.name}</h5>
        {!props.isSale && (
          <span className="slider__price">{props.price} грн</span>
        )}
        {props.isSale && (
          <div className="slider__sale">
            <span className="slider__sale-old">{props.price} грн</span>
            <span className="slider__sale-new">{props.salePrice} грн</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderItem;
