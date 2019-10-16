import React from "react";
import "component/Modal.sass";
import { withTranslation } from "react-i18next";

function Modal({
  title = "Title",
  text = "Modal description text",
  visible = false,
  closeModal = () => {},
  confirmationModal = () => {},
  t
}) {
  return visible ? (
    <div className="modal" onClick={() => closeModal()}>
      <div className="modal-body" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-description">{text}</div>
        <div className="modal-confirmation-button">
          <span
            className="confirmation-text"
            onClick={() => {
              confirmationModal();
              closeModal();
            }}
          >
            {t("modal.confirmation")}
          </span>
        </div>
      </div>
    </div>
  ) : null;
}

export default withTranslation()(Modal);
