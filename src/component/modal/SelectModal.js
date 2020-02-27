import React from "react";
import { withModal } from "modal/withModal";
import SelectItem from "component/modal/component/SelectItem";
import "component/modal/SelectModal.sass";

export function SelectModal({ modal = {}, closeModal = () => {} }) {
  const options = modal.options
    ? modal.options.map((option, index) => (
        <SelectItem
          key={index}
          id={`select-item-${index}`}
          image={option.image}
          text={option.text}
          onClick={() => {
            if (option.onClick) {
              option.onClick();
              closeModal();
            }
          }}
        />
      ))
    : null;
  return modal.visible ? (
    <div className="select-modal-component" onClick={() => closeModal()}>
      <div className="modal-body" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{modal.title}</h2>
        <div className="modal-description">{modal.text}</div>
        {options}
      </div>
    </div>
  ) : null;
}

export default withModal(SelectModal);
