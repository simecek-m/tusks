import React from "react";
import { ModalContext } from "modal/ModalProvider";

export function withModal(Component) {
  return function Wrapper(props) {
    return (
      <ModalContext.Consumer>
        {modalContext => (
          <Component
            {...props}
            modal={modalContext.modal}
            openModal={modalContext.openModal}
            closeModal={modalContext.closeModal}
          />
        )}
      </ModalContext.Consumer>
    );
  };
}
