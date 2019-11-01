import React from "react";
import "component/modal/component/SelectItem.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
      <span className="arrow">
        <FontAwesomeIcon icon={faArrowRight} />
      </span>
      {img}
      <span className="text">{text}</span>
    </div>
  );
}

export default SelectItem;
