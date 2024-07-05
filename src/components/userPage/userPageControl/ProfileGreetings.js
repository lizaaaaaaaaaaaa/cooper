import styles from "../UserContent.module.scss";
import React, { useContext } from "react";
import AuthContext from "../../../context/auth-context";
import noUser from "../../../assets/userImage/noUser.jpg";
import { storage } from "../../../firebase/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { DownloadIcon } from "../../UI/Icons";

const ProfileGreetings = () => {
  const context = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  const username = context.userDetails
    ? userData.name || "Неизвестный пользователь"
    : "Неизвестный пользователь";
  const avatar = userData.avatar ? userData.avatar : noUser;

  const deleteOldAvatars = async () => {
    if (!context.userDetails || !context.userDetails.login) {
      console.error("Не знайдено логін користувача");
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
      console.log("Старі аватари видалені успішно");
    } catch (error) {
      console.error("Помилка видалення старих аватарів: ", error);
    }
  };

  const uploadAvatar = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!context.userDetails || !context.userDetails.login) {
      console.error("Не знайдено логін користувача.");
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
          console.error("Помилка завантаження аватара: ", error);
        },
        async () => {
          try {
            // завантаження зображення
            await uploadTask;

            // отримання ссилка завантаженої картинки
            const newAvatarUrl = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(
              "Місцезнаходженнязавантаженого аватару: ",
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
            console.error(
              "Помилка оновлення контексту або локлаьного сховища: ",
              error
            );
          }
        }
      );
    } catch (error) {
      console.error("Помилка оновлення аватару: ", error);
    }
  };

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
