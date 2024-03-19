import styles from "./EnterPage.module.scss";
import Button from "./../UI/Button";
import { useState } from "react";

const EnterForm = () => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [password, setPassword] = useState("");

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

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!isPasswordValid || !isEmailValid) {
      return;
    }
    console.log(email);
    console.log(password);
  };

  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
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
      <p className={styles.form__forgot}>Забыли пароль?</p>
      <Button className={styles.form__btn} type="submit">
        Войти
      </Button>
    </form>
  );
};

export default EnterForm;
