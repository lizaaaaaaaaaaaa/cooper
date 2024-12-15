import styles from "./NoAuthenticated.module.scss";
import userBig from "../../../assets/userBig.svg";
import { NavLink } from "react-router-dom";
import Button from "../../UI/Button";

const NoAuthenticated = () => {
  return (
    <div className={styles.order__auth}>
      <div className={styles.order__content}>
        <div className={styles.order__left}>
          <div>
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_72_1908)">
                <path
                  d="M17 17C18.6811 17 20.3245 16.5015 21.7223 15.5675C23.1202 14.6335 24.2096 13.306 24.853 11.7528C25.4963 10.1996 25.6646 8.49057 25.3367 6.84174C25.0087 5.1929 24.1992 3.67834 23.0104 2.4896C21.8217 1.30085 20.3071 0.491303 18.6583 0.163329C17.0094 -0.164645 15.3004 0.00368293 13.7472 0.647028C12.194 1.29037 10.8665 2.37984 9.93251 3.77766C8.99852 5.17547 8.5 6.81886 8.5 8.5C8.50225 10.7537 9.39851 12.9144 10.9921 14.5079C12.5856 16.1015 14.7464 16.9978 17 17ZM17 2.83334C18.1208 2.83334 19.2164 3.16568 20.1482 3.78834C21.0801 4.411 21.8064 5.29602 22.2353 6.33146C22.6642 7.36691 22.7764 8.50629 22.5578 9.60551C22.3391 10.7047 21.7994 11.7144 21.0069 12.5069C20.2144 13.2994 19.2047 13.8391 18.1055 14.0578C17.0063 14.2764 15.8669 14.1642 14.8315 13.7353C13.796 13.3064 12.911 12.5801 12.2883 11.6482C11.6657 10.7164 11.3333 9.62076 11.3333 8.5C11.3333 6.99711 11.9304 5.55577 12.9931 4.49306C14.0558 3.43036 15.4971 2.83334 17 2.83334Z"
                  fill="#0B3F37"
                />
                <path
                  d="M17 19.8333C13.6196 19.8371 10.3788 21.1816 7.98853 23.5719C5.59825 25.9622 4.25375 29.203 4.25 32.5834C4.25 32.9591 4.39926 33.3194 4.66493 33.5851C4.93061 33.8508 5.29094 34 5.66667 34C6.04239 34 6.40272 33.8508 6.6684 33.5851C6.93408 33.3194 7.08333 32.9591 7.08333 32.5834C7.08333 29.9533 8.12812 27.4309 9.98786 25.5712C11.8476 23.7115 14.3699 22.6667 17 22.6667C19.6301 22.6667 22.1524 23.7115 24.0121 25.5712C25.8719 27.4309 26.9167 29.9533 26.9167 32.5834C26.9167 32.9591 27.0659 33.3194 27.3316 33.5851C27.5973 33.8508 27.9576 34 28.3333 34C28.7091 34 29.0694 33.8508 29.3351 33.5851C29.6007 33.3194 29.75 32.9591 29.75 32.5834C29.7462 29.203 28.4017 25.9622 26.0115 23.5719C23.6212 21.1816 20.3804 19.8371 17 19.8333Z"
                  fill="#0B3F37"
                />
              </g>
              <defs>
                <clipPath id="clip0_72_1908">
                  <rect width="34" height="34" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>
            <p>Уже есть аккаунт или хотите зарегистрироваться?</p>
            <p>Войдите в кабинет и получите скидку</p>
          </div>
        </div>
        <div className={styles.order__right}>
          <NavLink to="/cooper/enter" className={styles.order__link}>
            <Button className={styles.order__btn}>Войти</Button>
          </NavLink>
          <NavLink to="/cooper/registration" className={styles.order__link}>
            <button>Регистрация</button>
          </NavLink>
        </div>
      </div>
      <img src={userBig} alt="icon" />
    </div>
  );
};

export default NoAuthenticated;
