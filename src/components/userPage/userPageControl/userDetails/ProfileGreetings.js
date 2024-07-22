import styles from "../../UserContent.module.scss";
import React, { useContext, useState } from "react";
import AuthContext from "../../../../context/auth-context";
import noUser from "../../../../assets/userImage/noUser.jpg";
import { storage } from "../../../../firebase/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { DownloadIcon } from "../../../UI/Icons";
import { Navigate } from "react-router";

const ProfileGreetings = () => {
  const context = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  const [httpErrorMessage, setHttpErrorMessage] = useState(false);

  const username = context.userDetails
    ? userData.name || "Неизвестный пользователь"
    : "Неизвестный пользователь";
  const avatar = userData.avatar ? userData.avatar : noUser;

  const deleteOldAvatars = async () => {
    if (!context.userDetails || !context.userDetails.login) {
      setHttpErrorMessage(
        "Логин неопределен. Если ви считаете, что это ошибка - обратитесь в поддержку!"
      );
      return;
    }

    const userAvatarFolderRef = ref(
      storage,
      `userAvatar/${context.userDetails.login}`
    );

    try {
      const listResults = await listAll(userAvatarFolderRef);
      const deletePromises = listResults.items.map((itemRef) =>
        deleteObject(itemRef)
      );
      await Promise.all(deletePromises);
    } catch (error) {
      setHttpErrorMessage(error.message);
    }
  };

  const uploadAvatar = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!context.userDetails || !context.userDetails.login) {
      setHttpErrorMessage(
        "Логин неопределен. Если ви считаете, что это ошибка - обратитесь в поддержку!"
      );
      return;
    }

    try {
      // видалення всіх старих аватарів перед завантаженням нового
      await deleteOldAvatars();

      const storageRef = ref(
        storage,
        `userAvatar/${context.userDetails.login}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (error) => {
          setHttpErrorMessage(error.message);
        },
        async () => {
          try {
            // завантаження зображення
            await uploadTask;

            // отримання ссилка завантаженої картинки
            const newAvatarUrl = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(
              "Місцезнаходження завантаженого аватару: ",
              newAvatarUrl
            );

            // оновлення контексту та локального сховища
            const updatedUserDetails = {
              ...context.userDetails,
              avatar: newAvatarUrl,
            };
            context.updateUserDetails(updatedUserDetails);
            localStorage.setItem(
              "userInfo",
              JSON.stringify(updatedUserDetails)
            );
          } catch (error) {
            setHttpErrorMessage(error.message);
          }
        }
      );
    } catch (error) {
      setHttpErrorMessage(error.message);
    }
  };

  if (httpErrorMessage) {
    return <Navigate to="/httpError" errorMessage={httpErrorMessage} replace />;
  }

  return (
    <div className={styles.user__profile}>
      <img src={avatar} className={styles.user__img} alt="user" />
      <div className={styles.user__greetings}>
        <p>Добрый день,</p>
        <h4>{username}</h4>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="upload-avatar"
          onChange={uploadAvatar}
        />
        <label htmlFor="upload-avatar" className={styles["user__btn-change"]}>
          <DownloadIcon />
          Сменить фото
          <span>(jpeg, png)</span>
        </label>
      </div>
    </div>
  );
};

export default ProfileGreetings;
