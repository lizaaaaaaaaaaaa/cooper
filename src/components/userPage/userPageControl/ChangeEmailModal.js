import React from "react";
import Modal from './../../UI/Modal';

const ChangeEmailModal = (props) => {
   
   return (
       <Modal onHideModal={() => props.onHideModal(false)}>
           Нашо тобі той мейл О_О
           <button onClick={()=>{props.onHideModal(false)}}>Close</button>
       </Modal>
   )
};

export default ChangeEmailModal;
