import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "component/old/button/Button.sass";

function Button({
  icon = null,
  text = "Button",
  type = "default",
  onClick = null
}) {
  const buttonIcon = icon ? (
    <FontAwesomeIcon className="button-component-icon" icon={icon} />
  ) : null;
  return (
    <span className={`button-component ${type}`} onClick={onClick}>
      {buttonIcon}
      <span className="text">{text.toUpperCase()}</span>
    </span>
  );
}

export default Button;
