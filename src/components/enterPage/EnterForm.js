import styles from "./EnterPage.module.scss";
import Button from "./../UI/Button";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../UI/Loader";

const EnterForm = () => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [password, setPassword] = useState("");
  const [wrongSubmit, setWrongSubmit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

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
      setWrongSubmit("Ви ввели неправильний логин и/или пароль!");
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

      console.log("responseData:", responseData);

      let userFound = false;
      for (const key in responseData) {
        if (
          responseData[key].login === email &&
          responseData[key].password === password
        ) {
          userFound = true;
          break;
        }
      }

      if (userFound) {
        console.log(`Ви ввійшли як ${email}`);
        setWrongSubmit("");
      } else {
        setWrongSubmit("Ви ввели неправильний логин и/или пароль!");
      }
      setIsLoading(false);
    } catch (error) {
      setHttpErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  return (
    <form
      onSubmit={formSubmitHandler}
      className={`${styles.form} ${isLoading ? styles.form__loading : ""}`}
    >
      <input
        type="email"
        placeholder="E-mail"
        className={styles.form__input}
        value={email}
        onChange={checkEmailValidityHandler}
        autoComplete="current-email"
      />
      <input
        type="password"
        placeholder="Пароль"
        className={styles.form__input}
        value={password}
        onChange={checkPasswordValidityHandler}
        autoComplete="current-password"
      />
      <p className={styles["form__input-wrong"]}>{wrongSubmit}</p>
      <p className={styles.form__forgot}>Забули пароль?</p>
      <Button className={styles.form__btn} type="submit">
        Увійти
      </Button>
      {isLoading && <Loader className={styles.loader} />}
    </form>
  );
};

export default EnterForm;
