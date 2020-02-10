import React from "react";
import "component/modal/ConfirmationModal.sass";
import { withTranslation } from "react-i18next";
import { withModal } from "modal/withModal";

export function ConfirmationModal({ t, modal = {}, closeModal = () => {} }) {
  return modal.visible ? (
    <div className="confirmation-modal-component" onClick={() => closeModal()}>
      <div className="modal-body" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{modal.title}</h2>
        <div className="modal-description">{modal.text}</div>
        <div className="modal-confirmation-button">
          <span
            className="confirmation-text"
            onClick={() => {
              modal.onConfirm();
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

export default withModal(withTranslation()(ConfirmationModal));
