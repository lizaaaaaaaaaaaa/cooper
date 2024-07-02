import React, { useContext } from "react";
import styles from "../UserContent.module.scss";
import AuthContext from "../../../context/auth-context";
import noUser from "../../../assets/userImage/noUser.jpg";
import { storage } from "../../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, update } from "firebase/database";

const ProfileDetails = () => {
  const context = useContext(AuthContext);

  const username = context.userDetails
    ? context.userDetails.name || "Неизвестный пользователь"
    : "Неизвестный пользователь";
  const avatar = context.userDetails
    ? context.userDetails.avatar || noUser
    : noUser;

  const uploadAvatar = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!context.userDetails || !context.userDetails.login) {
      console.error("User details are not defined or missing email");
      return;
    }

    try {
      const storageRef = ref(storage, `userAvatar/${context.userDetails.login}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (error) => {
          console.error("Error uploading avatar:", error);
        },
        async () => {
          try {
            // завантаження зображення
            await uploadTask;

            // Отримання ссилки завантаженої картинки
            const newAvatarUrl = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", newAvatarUrl);

            // Оновлення контексту та локального сховища
            const updatedUserDetails = { ...context.userDetails, avatar: newAvatarUrl };
            context.updateUserDetails(updatedUserDetails);
            localStorage.setItem("userInfo", JSON.stringify(updatedUserDetails));
          } catch (error) {
            console.error("Error updating context or local storage:", error);
          }
        }
      );
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const saveUserData = async () => {
    try {
      if (!context.userDetails || !context.userDetails.login) {
        console.error("User details are not defined or missing email");
        return;
      }

      const userData = JSON.parse(localStorage.getItem("userInfo"));
      const db = getDatabase(); // Отримати базу даних
      const userDocRef = dbRef(db, `userEnter/${context.userDetails.key}`); // Створити посилання на документ

      console.log(db);
      console.log(userDocRef);

      await update(userDocRef, {
        name: userData.name,
        avatar: userData.avatar,
        // Додайте інші поля, які потрібно оновити в базі даних
      });

      console.log("Дані користувача оновлені в базі даних");
    } catch (error) {
      console.error("Помилка при оновленні даних в базі даних:", error);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.user__profile}>
        <img src={avatar} className={styles.user__img} alt="user" />
        <div className={styles.user__greetings}>
          <p>Добрый день</p>
          <h4>{username}</h4>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="upload-avatar"
            onChange={uploadAvatar}
          />
          <label htmlFor="upload-avatar" className={styles.change_photo_button}>
            Сменить фото
          </label>
        </div>
      </div>
      <button onClick={saveUserData}>Сохранить данные</button>
    </React.Fragment>
  );
};

export default ProfileDetails;
