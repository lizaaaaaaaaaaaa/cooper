import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../../context/auth-context";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import ProfileGreetings from "./ProfileGreetings";
import styles from "../../UserContent.module.scss";
import success from "../../../../assets/success.svg";
import failure from "../../../../assets/failure.svg";
import UserContacts from "./UserContacts";
import Button from "../../../UI/Button";
import { Navigate } from "react-router";

const ProfileDetails = () => {
  const context = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isMessageShow, setIsMessageShow] = useState(false);

  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setIsMessageShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const saveUserData = async () => {
    try {
      if (!context.userDetails || !context.userDetails.login) {
        setHttpErrorMessage(
          "Данные пользователя отсутствуют или логин не определен. Если ви считаете, что это ошибка - обратитесь в поддержку!"
        );
        return;
      }

      const userData = JSON.parse(localStorage.getItem("userInfo"));
      const db = getDatabase(); // отримати базу даних
      const userDocRef = dbRef(db, `userEnter/${context.userDetails.key}`);

      await set(userDocRef, {
        name: userData.name || "",
        password: userData.password,
        login: userData.login,
        avatar: userData.avatar ? userData.avatar : "",
        favorites: userData.favorites || "",
      });

      const contactsData = JSON.parse(
        localStorage.getItem("userInfo")
      ).contacts;
      const userContactsDocRef = dbRef(
        db,
        `userEnter/${context.userDetails.key}/contacts`
      );

      contactsData && (await set(userContactsDocRef, contactsData));

      setMessageType("success");
      setMessage("Данные сохраненны");
      setIsMessageShow(true);
    } catch (error) {
      setMessageType("error");
      setMessage("Данные не сохраненны.");
      setIsMessageShow(true);
      setHttpErrorMessage(error.message);
      console.log(error.message);
    }
  };

  const onSavePasswordHandler = (dataAboutPasswordSending) => {
    setMessageType(dataAboutPasswordSending);
    setMessage("Данные сохраненны");
    setIsMessageShow(true);
  };

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  return (
    <div className={styles["user__main-profile"]}>
      <ProfileGreetings />
      <UserContacts onSavePassword={onSavePasswordHandler} />
      <Button className={styles["user__btn-save"]} onClick={saveUserData}>
        Сохранить данные
      </Button>
      <p
        className={`${styles.user__message} ${
          isMessageShow ? styles["user__message-show"] : ""
        } ${
          messageType === "success"
            ? styles["user__message-success"]
            : styles["user__message-failure"]
        }`}
      >
        <img
          src={messageType === "success" ? success : failure}
          alt="messageIcon"
        />
        {message}
      </p>
    </div>
  );
};

export default ProfileDetails;
