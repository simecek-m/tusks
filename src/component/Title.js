import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function Title({ text = "Title", icon = faPencilAlt }) {
  const iconComponent = icon ? <FontAwesomeIcon icon={icon} /> : null;
  return (
    <h1 className="title">
      {iconComponent} {text}
    </h1>
  );
}

export default Title;
