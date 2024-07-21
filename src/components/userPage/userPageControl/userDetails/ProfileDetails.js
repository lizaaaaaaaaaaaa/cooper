import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../../context/auth-context";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import ProfileGreetings from "./ProfileGreetings";
import styles from "../../UserContent.module.scss";
import success from "../../../../assets/success.svg";
import failure from "../../../../assets/failure.svg";
import UserContacts from "./UserContacts";
import Button from "../../../UI/Button";

const ProfileDetails = () => {
  const context = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isMessageShow, setIsMessageShow] = useState(false);

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
        console.error("User details are not defined or missing email");
        return;
      }

      const userData = JSON.parse(localStorage.getItem("userInfo"));
      const db = getDatabase(); // отримати базу даних
      const userDocRef = dbRef(db, `userEnter/${context.userDetails.key}`);

      await set(userDocRef, {
        name: userData.name,
        password: userData.password,
        login: userData.login,
        avatar: userData.avatar,
      });

      const contactsData = JSON.parse(
        localStorage.getItem("userInfo")
      ).contacts;
      const userContactsDocRef = dbRef(
        db,
        `userEnter/${context.userDetails.key}/contacts`
      );

      await set(userContactsDocRef, {
        phone: contactsData.phone ? contactsData.phone : "",
        country: contactsData.country ? contactsData.country : "",
        city: contactsData.city ? contactsData.city : "",
        street: contactsData.street ? contactsData.street : "",
        payCard: contactsData.payCard ? contactsData.payCard : "",
        expirationDate: contactsData.expirationDate
          ? contactsData.expirationDate
          : "",
        cvv: contactsData.cvv ? contactsData.cvv : "",
      });

      setMessageType("success");
      setMessage("Данные сохраненны");
      setIsMessageShow(true);
    } catch (error) {
      setMessageType("error");
      setMessage("Данные не сохраненны.");
      setIsMessageShow(true);
      console.error("Помилка при оновленні даних в базі даних: ", error);
    }
  };

  const onSavePasswordHandler = (dataAboutPasswordSending) => {
    setMessageType(dataAboutPasswordSending);
    setMessage("Данные сохраненны");
    setIsMessageShow(true);
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
