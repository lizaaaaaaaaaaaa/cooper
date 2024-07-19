import React, { useState, useContext } from "react";
import styles from "../UserContent.module.scss";
import ChangeEmailModal from "./ChangeEmailModal";
import SuccessfulModal from "../../UI/SuccessfullModal";
import AuthContext from "../../../context/auth-context";
import { getDatabase, ref as dbRef, update } from "firebase/database";

const UserContacts = (props) => {
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const context = useContext(AuthContext);

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

  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [passwordValue, setPasswordValue] = useState(userData.password);
  const [wrongSubmit, setWrongSubmit] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSuccessfulModal, setShowSuccessfulModal] = useState(false);

  const changePhoneHandler = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");

    setPhoneValue(value);
  };

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

  const showModalHandler = () => {
    setIsModalVisible(true);
  };

  const hideModalHandler = (changeModalVisibility) => {
    setIsModalVisible(changeModalVisibility);
  };

  const showSuccessfullEmailChangeModal = () => {
    setShowSuccessfulModal(true);
  };

  const hideSuccessfullEmailChangeModal = () => {
    setShowSuccessfulModal(false);
  };

  const checkPasswordValidityHandler = (event) => {
    setWrongSubmit("");

    if (
      event.target.value.trim().length > 6 &&
      event.target.value.trim().length < 21
    ) {
      setIsNewPasswordValid(true);
    } else {
      setIsNewPasswordValid(false);
    }
    setPasswordValue(event.target.value.trim());
  };

  const changePasswordHandler = async (event) => {
    event.preventDefault();

    if (!isNewPasswordValid) {
      setWrongSubmit(
        "Пароль должен содержать больше 6 символов, но меньше 21!"
      );
      return;
    }

    const updatePassword = {
      ...context.userDetails,
      password: passwordValue,
    };

    context.updateUserDetails(updatePassword);
    localStorage.setItem("userInfo", JSON.stringify(updatePassword));

    const userData = JSON.parse(localStorage.getItem("userInfo"));
    const db = getDatabase(); // отримати базу даних
    const userDocRef = dbRef(db, `userEnter/${context.userDetails.key}`);

    await update(userDocRef, {
      password: userData.password,
    });

    props.onSavePassword("success")
  };

  return (
    <React.Fragment>
      {isModalVisible ? (
        <ChangeEmailModal
          onHideModal={hideModalHandler}
          onShowSuccessfullEmailChangeModal={showSuccessfullEmailChangeModal}
        />
      ) : (
        ""
      )}
      {showSuccessfulModal ? (
        <SuccessfulModal
          onHideModal={hideSuccessfullEmailChangeModal}
          message="Ваш новый E-mail принят!"
          text="Чтобы сохранить его, сохраните все данные через кнопку «Сохранить данные»."
        />
      ) : (
        ""
      )}
      <div className={styles.user__info}>
        <div className={styles.user__contacts}>
          <input
            value={phoneValue}
            className={styles.user__input}
            maxLength={13}
            type="tel"
            name="phone"
            placeholder="Номер телефона"
            onBlur={saveDataToLocalStorage}
            onChange={changePhoneHandler}
          />
          <div onClick={showModalHandler}>
            <input
              //   name="email&login"
              value={userData.login || ""}
              className={`${styles.user__input} ${styles["user__input-disabled"]}`}
              type="email"
              placeholder="E-mail"
              disabled={true}
            />
          </div>
          <input
            value={contryValue}
            className={styles.user__input}
            type="text"
            name="country"
            placeholder="Страна"
            onBlur={saveDataToLocalStorage}
            onChange={(event) => setCountryValue(event.target.value)}
          />
          <input
            value={cityValue}
            className={styles.user__input}
            type="text"
            name="city"
            placeholder="Город"
            onBlur={saveDataToLocalStorage}
            onChange={(event) => setCityValue(event.target.value)}
          />
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
        <div className={styles.user__password}>
          <h4>Пароль</h4>
          <form className={styles.user__form} onSubmit={changePasswordHandler}>
            <input
              name="password"
              value={passwordValue}
              className={styles.user__input}
              type="password"
              autoComplete="new-password"
              onChange={checkPasswordValidityHandler}
              required
            />
            <button className={styles["user__btn-password"]}>
              Сменить пароль
            </button>
          </form>
          <p className={styles.user__wrong}>{wrongSubmit}</p>
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
    </React.Fragment>
  );
};

export default UserContacts;
