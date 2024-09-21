import Button from "../../../UI/Button";
import Modal from "./../../../UI/Modal";
import styles from "./ContactsModal.module.scss";

const ContactsModal = (props) => {
  return (
    <Modal
      className={styles.order__modal}
      onHideModal={() => props.onHideModal(false)}
    >
      <div className={styles.order__modalTop}>
        <button
          onClick={() => {
            props.onHideModal(false);
          }}
        >
          &#215;
        </button>
        <h5>Заполните все поля!</h5>
      </div>
      <p>
        Пожалуйста, введите ваши контактные данные: нам необходимо иметь с вами
        связь и ваш адрес, чтобы доставить ваш заказ!
      </p>
      <Button
        className={styles.order__btn}
        onClick={() => {
          props.onHideModal(false);
        }}
      >
        Понятно
      </Button>
    </Modal>
  );
};

export default ContactsModal;
