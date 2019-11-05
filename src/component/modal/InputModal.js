import React from "react";
import { withTranslation } from "react-i18next";
import { withModal } from "modal/withModal";
import "component/modal/InputModal.sass";

function InputModal({ t, modal, closeModal }) {
  const modalInput = React.createRef();
  return modal.visible ? (
    <div className="input-modal-component" onClick={() => closeModal()}>
      <div className="modal-body" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{modal.title}</h2>
        <div className="modal-description">{modal.text}</div>
        <input ref={modalInput} className="modal-input" autoFocus />
        <div className="modal-confirmation-button">
          <span
            className="confirmation-text"
            onClick={() => {
              modal.onConfirm(modalInput.current.value);
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

export default withModal(withTranslation()(InputModal));
