import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const SuccessForm = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2>Application Submitted</h2>
      <p>Thank you for submitting your application!</p>
      <p>Please wait for further instructions regarding the next steps.</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default SuccessForm;
