import React, { useState, useContext } from "react";
import Modal from "./../../UI/Modal";
import styles from "../UserContent.module.scss";
import Button from "./../../UI/Button";
import AuthContext from "../../../context/auth-context";

const ChangeEmailModal = (props) => {
  const context = useContext(AuthContext);

  const [isNewLoginValid, setIsNewLoginValid] = useState(false);
  const [newLogin, setNewlogin] = useState("");

  const checkLoginValidity = (event) => {
    if (event.target.value.trim().includes("@")) {
      setIsNewLoginValid(true);
    } else {
      setIsNewLoginValid(false);
    }
    setNewlogin(event.target.value.trim());
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!isNewLoginValid) {
      console.log("Неправильний пароль!");
      return;
    }

    const updatedUserDetails = {
      ...context.userDetails,
      login: newLogin,
    };
    context.updateUserDetails(updatedUserDetails);
    localStorage.setItem("userInfo", JSON.stringify(updatedUserDetails));

    props.onHideModal(false);
    props.onShowSuccessfullEmailChangeModal(true);
  };

  return (
    <Modal
      className={styles.user__modal}
      onHideModal={() => props.onHideModal(false)}
    >
      <div className={styles.user__modalTop}>
        <h5>Смена E-mail</h5>
        <button
          onClick={() => {
            props.onHideModal(false);
          }}
        >
          &#215;
        </button>
      </div>
      <form onSubmit={formSubmitHandler}>
        <input
          className={`${styles.user__input} ${styles["user__input-modal"]}`}
          type="email"
          name="email&login"
          placeholder="Введите новый E-mail..."
          disabled={false}
          onChange={checkLoginValidity}
          value={newLogin}
        />
        <Button type="submit" className={styles["user__btn-modal"]}>
          Сменить
        </Button>
      </form>
    </Modal>
  );
};

export default ChangeEmailModal;
