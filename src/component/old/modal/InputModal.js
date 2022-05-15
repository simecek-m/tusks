import React from "react";
import { withTranslation } from "react-i18next";
import { withModal } from "modal/withModal";
import "component/old/modal/InputModal.sass";

export class InputModal extends React.Component {
  state = {
    value: ""
  };

  submitForm(event) {
    const { modal, closeModal } = this.props;
    event.preventDefault();
    const data = this.state.value;
    modal.onConfirm(data);
    closeModal();
  }

  changeValue(event) {
    const newValue = event.target.value;
    this.setState({ value: newValue });
  }

  render() {
    const { modal = {}, closeModal, t } = this.props;
    return modal.visible ? (
      <div className="input-modal-component" onClick={() => closeModal()}>
        <div className="modal-body" onClick={e => e.stopPropagation()}>
          <h2 className="modal-title">{modal.title}</h2>
          <div className="modal-description">{modal.text}</div>
          <form onSubmit={e => this.submitForm(e)}>
            <input
              name="value"
              value={this.state.value}
              onChange={e => this.changeValue(e)}
              type="text"
              className="modal-input"
              autoFocus
            />
            <button className="modal-confirmation-button" type="submit">
              {t("modal.confirmation")}
            </button>
          </form>
        </div>
      </div>
    ) : null;
  }
}

export default withModal(withTranslation()(InputModal));
