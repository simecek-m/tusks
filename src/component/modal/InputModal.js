import React from "react";
import { withTranslation } from "react-i18next";
import "component/modal/InputModal.sass";

function InputModal({
  title = "Title",
  text = "Input modal description text",
  visible = false,
  onClose = () => {},
  onConfirm = () => {},
  t
}) {
  const modalInput = React.createRef();
  return visible ? (
    <div className="confirmation-modal-component" onClick={() => onClose()}>
      <div className="modal-body" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-description">{text}</div>
        <input ref={modalInput} className="modal-input" autoFocus />
        <div className="modal-confirmation-button">
          <span
            className="confirmation-text"
            onClick={() => {
              onConfirm(modalInput.current.value);
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

export default withTranslation()(InputModal);
