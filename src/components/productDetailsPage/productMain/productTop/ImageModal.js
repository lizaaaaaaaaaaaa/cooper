import Modal from "../../../UI/Modal";
import styles from "./ImageModal.module.scss";

const ImageModal = (props) => {
  return (
    <Modal
      onHideModal={() => props.onHideImageModal(false)}
      className={styles.product__modal}
    >
      <button
        onClick={() => props.onHideImageModal(false)}
        className={styles.product__close}
      >
        &#215;
      </button>
      <div className={styles.product__container}>
        <img src={props.image} alt={props.alt} />
      </div>
    </Modal>
  );
};

export default ImageModal;
