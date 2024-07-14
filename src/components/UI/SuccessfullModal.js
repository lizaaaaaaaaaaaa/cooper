import Modal from "./Modal";
import styles from "./SuccessfulModal.module.scss";
import Button from "./Button";

const SuccessfulModal = (props) => {
  return (
    <Modal
      onHideModal={() => props.onHideModal(false)}
    >
      <h3 className={styles.modal__title}>Успех!</h3>
      <h6 className={styles.modal__message}>{props.message ? props.message : ""}</h6>
      <p className={styles.modal__text}>{props.text ? props.text : ""}</p>
      <Button
        className={styles.modal__btn}
        onClick={() => {
          props.onHideModal(false);
        }}
      >
        Ok
      </Button>
    </Modal>
  );
};

export default SuccessfulModal;
