import React from "react";
import ConfirmationModal from "component/old/modal/ConfirmationModal";
import SelectModal from "component/old/modal/SelectModal";
import InputModal from "component/old/modal/InputModal";
import { CONFIRMATION, SELECT, INPUT } from "modal/types";
import { validateModalData } from "modal/validator";

export const ModalContext = React.createContext();

class ModalProvider extends React.Component {
  constructor(props) {
    super(props);
    const { visible = false, type = CONFIRMATION, ...rest } = this.props.init
      ? this.props.init
      : {};
    this.state = {
      visible,
      type,
      ...rest
    };
  }

  openModal = modal => {
    const modalData = validateModalData(modal);
    this.setState(modalData);
  };

  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  mountModalComponent() {
    switch (this.state.type) {
      case SELECT:
        return <SelectModal />;
      case INPUT:
        return <InputModal />;
      default:
        return <ConfirmationModal />;
    }
  }

  render() {
    return (
      <ModalContext.Provider
        value={{
          modal: this.state,
          openModal: this.openModal,
          closeModal: this.closeModal
        }}
      >
        {this.mountModalComponent()}
        {this.props.children}
      </ModalContext.Provider>
    );
  }
}

export default ModalProvider;
