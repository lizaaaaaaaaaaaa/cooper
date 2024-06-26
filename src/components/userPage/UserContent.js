import styles from "./UserContent.module.scss";
import { UserIcon, CartIcon, FavoritesIcon, ExitIcon } from "../UI/Icons";
import AuthContext from "../../context/auth-context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const UserContent = () => {
  const context = useContext(AuthContext);

  return (
    <div className={`content ${styles.user}`}>
      <div className="container">
        <h1 className={styles.user__title}>Личный кабинет</h1>
        <div className={styles.user__content}>
          <aside className={styles.user__bar}>
            <button
              className={`${styles.user__btn} ${styles["user__btn-active"]}`}
            >
              <UserIcon className={styles.user__icon} />
              Детали профиля
            </button>
            <button className={styles.user__btn}>
              <CartIcon className={styles.user__icon} />
              Заказы
            </button>
            <button className={styles.user__btn}>
              <FavoritesIcon className={styles.user__icon} />
              Список желаемого
            </button>
            <button
              className={styles["user__btn-exit"]}
              onClick={context.logout()}
            >
              <NavLink to="/main" replace>
                <ExitIcon /> Выйти
              </NavLink>
            </button>
          </aside>
          <div className={styles.user__main}>content</div>
        </div>
      </div>
    </div>
  );
};

export default UserContent;
