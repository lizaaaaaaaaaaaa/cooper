import styles from "./Modal.module.scss";
import ReactDom from "react-dom";
import React, { useEffect } from "react";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onHideModal}></div>;
};

const ModalWindow = (props) => {
  return (
    <div className={`${styles.modal} ${props.className}`}>{props.children}</div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop onHideModal={props.onHideModal} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalWindow className={props.className}>{props.children}</ModalWindow>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
