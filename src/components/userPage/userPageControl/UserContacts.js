import { useState } from "react";
import styles from "../UserContent.module.scss";

const UserContacts = () => {
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  const [phoneValue, setPhoneValue] = useState(userData.contacts?.phone || "");
  const [contryValue, setCountryValue] = useState(
    userData.contacts?.country || ""
  );
  const [cityValue, setCityValue] = useState(userData.contacts?.city || "");
  const [streetValue, setStreetValue] = useState(
    userData.contacts?.street || ""
  );
  const [dateValue, setDateValue] = useState(
    userData.contacts?.expirationDate || ""
  );
  const [cardValue, setCardValue] = useState(userData.contacts?.payCard || "");
  const [cvvValue, setCvvValue] = useState(userData.contacts?.cvv || "");

  const [passwordValue, setPasswordValue] = useState(userData.password);

  const changeDateHandler = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, ""); // обмеження на нечислові символи

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`; // слеш після числа дня
    }

    setDateValue(value);
  };

  const changeCardHandler = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");

    if (value.length > 0) {
      value = value.match(/.{1,4}/g).join(" ");
    }

    setCardValue(value);
  };

  const changeCvvHandler = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    setCvvValue(value);
  };

  const saveDataToLocalStorage = (event) => {
    const { name, value } = event.target;
    const existingData = JSON.parse(localStorage.getItem("userInfo"));
    const updatedContacts = { ...existingData.contacts, [name]: value };
    const updatedData = { ...existingData, contacts: updatedContacts };
    localStorage.setItem("userInfo", JSON.stringify(updatedData));
  };

  return (
    <div className={styles.user__info}>
      <div className={styles.user__contacts}>
        <div>
          <input
            value={phoneValue}
            className={styles.user__input}
            type="tel"
            name="phone"
            placeholder="Номер телефона"
            onBlur={saveDataToLocalStorage}
            onChange={(event) => setPhoneValue(event.target.value)}
          />
        </div>
        <div>
          <input
            value={userData.login || ""}
            className={styles.user__input}
            type="email"
            placeholder="E-mail"
            disabled
          />
        </div>
        <div>
          <input
            value={contryValue}
            className={styles.user__input}
            type="text"
            name="country"
            placeholder="Страна"
            onBlur={saveDataToLocalStorage}
            onChange={(event) => setCountryValue(event.target.value)}
          />
        </div>
        <div>
          <input
            value={cityValue}
            className={styles.user__input}
            type="text"
            name="city"
            placeholder="Город"
            onBlur={saveDataToLocalStorage}
            onChange={(event) => setCityValue(event.target.value)}
          />
        </div>
        <div>
          <input
            value={streetValue}
            className={styles.user__input}
            type="text"
            name="street"
            placeholder="Улица"
            onBlur={saveDataToLocalStorage}
            onChange={(event) => setStreetValue(event.target.value)}
          />
        </div>
      </div>
      <div className={styles.user__password}>
        <h4>Пароль</h4>
        <form action="" className={styles.user__form}>
          <input
            value={passwordValue}
            className={styles.user__input}
            type="password"
            autoComplete="new-password"
            onChange={(event) => setPasswordValue(event.target.value)}
            required
          />
          <button className={styles["user__btn-password"]}>
            Сменить пароль
          </button>
        </form>
      </div>
      <div className={styles.user__card}>
        <h4>Платежная система</h4>
        <div className={styles.user__cardContainer}>
          <div className={styles.user__paycard}>
            <input
              type="text"
              name="payCard"
              value={cardValue}
              onChange={changeCardHandler}
              maxLength={19}
              className={`${styles.user__input} ${styles["user__input-card"]}`}
              placeholder="1234 5678 9012 3456"
              onBlur={saveDataToLocalStorage}
            />
          </div>
          <div className={styles.user__date}>
            <input
              type="text"
              name="expirationDate"
              value={dateValue}
              onChange={changeDateHandler}
              className={`${styles.user__input} ${styles["user__input-short"]} ${styles["user__input-date"]}`}
              placeholder="xx/xx"
              onBlur={saveDataToLocalStorage}
            />
          </div>
          <div className={styles.user__cvv}>
            <input
              type="password"
              name="cvv"
              maxLength={3}
              value={cvvValue}
              onChange={changeCvvHandler}
              className={`${styles.user__input} ${styles["user__input-short"]} ${styles["user__input-cvv"]}`}
              placeholder="000"
              onBlur={saveDataToLocalStorage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserContacts;