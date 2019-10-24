import React from "react";
import "component/modal/ConfirmationModal.sass";
import { withTranslation } from "react-i18next";

function ConfirmationModal({
  title = "Title",
  text = "Modal description text",
  visible = false,
  onClose = () => {},
  onConfirm = () => {},
  t
}) {
  return visible ? (
    <div className="confirmation-modal-component" onClick={() => onClose()}>
      <div className="modal-body" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-description">{text}</div>
        <div className="modal-confirmation-button">
          <span
            className="confirmation-text"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {t("modal.confirmation")}
          </span>
        </div>
      </div>
    </div>
  ) : null;
}

export default withTranslation()(ConfirmationModal);
