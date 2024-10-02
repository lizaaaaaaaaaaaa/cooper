import styles from "./EnterPage.module.scss";
import Button from "./../UI/Button";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../UI/Loader";
import AuthContext from "../../context/auth-context";
import { useContext } from "react";

const EnterForm = () => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [password, setPassword] = useState("");
  const [wrongSubmit, setWrongSubmit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const context = useContext(AuthContext);

  const checkEmailValidityHandler = (event) => {
    if (event.target.value.trim().includes("@")) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
    setEmail(event.target.value.trim());
  };

  const checkPasswordValidityHandler = (event) => {
    if (
      event.target.value.trim().length > 6 &&
      event.target.value.trim().length < 21
    ) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
    setPassword(event.target.value.trim());
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isPasswordValid || !isEmailValid) {
      setWrongSubmit("Ви ввели неправильний логін і/або пароль!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://cooper-3c826-default-rtdb.firebaseio.com/userEnter.json"
      );
      if (!response.ok) {
        throw new Error("Что-то пошло не так!");
      }
      const responseData = await response.json();

      let userFound = false;
      let user = null;
      let userKey = null;

      for (const key in responseData) {
        console.log(
          responseData[key].login,
          responseData[key].password,
          responseData[key].login === email,
          responseData[key].password === password
        );
        if (
          responseData[key].login === email &&
          responseData[key].password === password
        ) {
          userFound = true;
          user = responseData[key];
          userKey = key;
          break;
        }
      }

      if (userFound) {
        setWrongSubmit("");
        context.login({ key: userKey, ...user });
        return <Navigate to="/user" replace />;
      } else {
        setWrongSubmit("Ви ввели неправильний логін і/або пароль!");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setHttpErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  if (context.isAuthenticated) {
    return <Navigate to="/user" replace />;
  }

  return (
    <form
      onSubmit={formSubmitHandler}
      className={`${styles.form} ${isLoading ? styles.form__loading : ""}`}
    >
      <h2 className={styles.form__title}>Авторизация</h2>
      <div>
        <input
          type="email"
          placeholder="E-mail"
          className={styles.form__input}
          value={email}
          onChange={checkEmailValidityHandler}
          autoComplete="current-email"
        />
      </div>
      <div className={styles["form__password"]}>
        <input
          type={!isPasswordShow ? "password" : "text"}
          placeholder="Пароль"
          className={styles.form__input}
          value={password}
          onChange={checkPasswordValidityHandler}
          autoComplete="current-password"
        />
        <button
          onClick={() => {
            setIsPasswordShow(!isPasswordShow);
          }}
          type="button"
          className={`${styles.form__passwordBtn} ${
            isPasswordShow
              ? styles["form__passwordBtn-show"]
              : styles["form__passwordBtn-hide"]
          }`}
        >
          <svg
            height="23px"
            width="23px"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              style={{ fill: "#a1a1a1" }}
              d="M64.444,30.001c24.374,0.19 49.922,9.735 62.228,30.594c0.585,0.992 1.323,2.479 1.323,2.479c0.739,1.976 -1.234,4.17 -2.723,6.404c-12.935,19.399 -37.627,28.522 -61.507,28.522c-24.269,0 -50.062,-9.445 -62.05,-30.589c-0.615,-1.085 -1.379,-2.721 -1.379,-2.721c-0.52,-1.494 0.721,-3.14 1.684,-4.753c11.808,-19.784 36.516,-29.743 61.276,-29.936c0.383,-0.001 0.765,-0.001 1.148,0Zm-1.127,4c-21.626,0.169 -43.742,7.796 -56.05,25.208c-1.057,1.495 -2.034,3.052 -2.869,4.682c0,0 3.081,5.632 6.767,9.721c13.377,14.834 34.636,20.785 54.803,20.365c22.83,-0.475 46.856,-9.45 57.836,-29.797c0,0 0.045,-0.454 -0.168,-0.839c-10.846,-19.342 -35.36,-29.154 -59.213,-29.34c-0.369,-0.001 -0.737,-0.001 -1.106,0Zm1.028,15c9.905,0.188 17.976,11.856 13.325,21.502c-4.061,8.424 -16.853,11.041 -23.866,4.353c-8.237,-7.855 -3.561,-25.595 10.154,-25.855c0.193,-0.001 0.193,-0.001 0.387,0Zm-0.336,4c-7.254,0.137 -13.177,8.704 -9.773,15.764c2.981,6.185 12.358,8.102 17.502,3.196c3.46,-3.298 4.392,-8.958 2.086,-13.2c-1.921,-3.536 -5.498,-5.788 -9.815,-5.76Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <p className={styles["form__input-wrong"]}>{wrongSubmit}</p>
      <p className={styles.form__forgot}>Забыли пароль?</p>
      <Button className={styles.form__btn} type="submit">
        Войти
      </Button>
      {isLoading && <Loader className={styles.loader} />}
    </form>
  );
};

export default EnterForm;
