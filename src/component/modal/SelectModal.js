import React from "react";
import "component/modal/SelectModal.sass";

function SelectModal({
  title = "Title",
  text = "Modal description text",
  visible = false,
  onClose = () => {},
  children
}) {
  return visible ? (
    <div className="select-modal-component" onClick={() => onClose()}>
      <div className="modal-body" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-description">{text}</div>
        <div className="modal-selection">{children}</div>
      </div>
    </div>
  ) : null;
}

export default SelectModal;
