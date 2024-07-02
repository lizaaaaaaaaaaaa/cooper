import styles from "./UserContent.module.scss";
import { UserIcon, CartIcon, FavoritesIcon, ExitIcon } from "../UI/Icons";
import AuthContext from "../../context/auth-context";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileDetails from "./userPageControl/ProfileDetails";

const UserContent = () => {
  const [userContent, setUserContent] = useState("");
  const context = useContext(AuthContext);

  const exitHandler = () => {
    context.logout();
  };

  const UserContentOptions = () => {
    switch (userContent) {
      case "contentOne":
        return <ProfileDetails />;
      case "contentTwo":
        return "Two";
      case "contentThree":
        return "Three";
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <div className={`content ${styles.user}`}>
      <div className="container">
        <h1 className={styles.user__title}>Личный кабинет</h1>
        <div className={styles.user__content}>
          <aside className={styles.user__bar}>
            <button
              className={`${styles.user__btn} ${
                userContent === "contentOne" ? styles["user__btn-active"] : ""
              }`}
              onClick={() => setUserContent("contentOne")}
            >
              <UserIcon className={styles.user__icon} />
              Детали профиля
            </button>
            <button
              className={`${styles.user__btn} ${
                userContent === "contentTwo" ? styles["user__btn-active"] : ""
              }`}
              onClick={() => setUserContent("contentTwo")}
            >
              <CartIcon className={styles.user__icon} />
              Заказы
            </button>
            <button
              className={`${styles.user__btn} ${
                userContent === "contentThree" ? styles["user__btn-active"] : ""
              }`}
              onClick={() => setUserContent("contentThree")}
            >
              <FavoritesIcon className={styles.user__icon} />
              Список желаемого
            </button>
            <button className={styles["user__btn-exit"]} onClick={exitHandler}>
              <NavLink to="/main" replace>
                <ExitIcon /> Выйти
              </NavLink>
            </button>
          </aside>
          <div className={styles.user__main}>{UserContentOptions()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserContent;
