import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/auth-context";
import { getDatabase, ref as dbRef, update } from "firebase/database";
import ProfileGreetings from "./ProfileGreetings";
import styles from "../UserContent.module.scss";
import success from "../../../assets/success.svg";
import failure from "../../../assets/failure.svg";

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
      const db = getDatabase(); // Отримати базу даних
      const userDocRef = dbRef(db, `userEnter/${context.userDetails.key}`); // посилання на документ

      await update(userDocRef, {
        avatar: userData.avatar,
        // Додайте інші поля, які потрібно оновити в базі даних
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

  return (
    <React.Fragment>
      <ProfileGreetings />
      <button onClick={saveUserData}>Сохранить данные</button>
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
    </React.Fragment>
  );
};

export default ProfileDetails;
