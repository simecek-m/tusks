import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { showUnsupportedFeatureNotification } from "notification";
import "component/menu/SettingsItem.sass";

function SettingsItem({
  icon = faExclamationCircle,
  onClick = () => showUnsupportedFeatureNotification()
}) {
  return (
    <div className="settings-item-component" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}

export default SettingsItem;
