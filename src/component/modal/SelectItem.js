import React from "react";
import "component/modal/SelectItem.sass";

function SelectItem({
  image = null,
  text = "select item",
  onClick = () => {}
}) {
  const img = image ? (
    <img className="image" src={image} alt="select-item" />
  ) : null;
  return (
    <div className="select-item-component" onClick={onClick}>
      {img}
      <span className="text">{text}</span>
    </div>
  );
}

export default SelectItem;
