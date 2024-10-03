import styles from "./RegForm.module.scss";
import Button from "./../UI/Button";
import { useContext, useState } from "react";
import AuthContext from "../../context/auth-context";
import { Navigate } from "react-router";
import Loader from "./../UI/Loader";

const RegForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [wrongData, setWrongData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState("");

  const context = useContext(AuthContext);

  const regSubmitHandler = async (event) => {
    event.preventDefault();

    const emailRegexp = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;

    if (!emailRegexp.test(email.trim())) {
      setWrongData("Введен не валидный E-mail!");
      return;
    }

    if (!passwordRegexp.test(password.trim())) {
      setWrongData(
        "Пароль должен содержать хотя бы одну цифру, букву и длинной не менее 7 символов!"
      );
      return;
    }

    if (name.length < 1) {
      setWrongData(
        "Введите ваше имя! Учтите, что изменить его будет невозможно!"
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        "https://cooper-3c826-default-rtdb.firebaseio.com/userEnter.json"
      );
      const users = await response.json();

      for (const user in users) {
        if (users[user].login === email) {
          setWrongData("Данный E-mail уже зарегистрирован!");
          return;
        }
      }

      const allUsersLength = Object.keys(users).length;
      const newUserId = allUsersLength + 1;
      const newUser = { login: email, password, name };

      const addNewUser = await fetch(
        `https://cooper-3c826-default-rtdb.firebaseio.com/userEnter/u${newUserId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(newUser),
        }
      );

      if (addNewUser.ok) {
        context.login({ key: `u${newUserId}`, ...newUser });
        return <Navigate to="/user" replace />;
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHttpErrorMessage(error);
      console.log(error);
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
      className={`${styles.reg__form} ${
        isLoading ? styles["reg__form-disabled"] : ""
      }`}
      onSubmit={regSubmitHandler}
    >
      {isLoading ? <Loader className={styles.loader} /> : ""}
      <div className={styles.reg__title}>Регистрация</div>
      <label htmlFor="email">
        <input
          type="text"
          id="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setWrongData("");
          }}
          disabled={isLoading}
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setWrongData("");
          }}
          disabled={isLoading}
        />
      </label>
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Имя"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setWrongData("");
          }}
          disabled={isLoading}
        />
      </label>
      {wrongData ? <p className={styles.reg__wrong}>{wrongData}</p> : ""}
      <Button type="submit" className={styles.reg__btn} disabled={isLoading}>
        Регистрация
      </Button>
    </form>
  );
};

export default RegForm;
