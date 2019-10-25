import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "component/menu/Settings.sass";

class Settings extends React.Component {
  state = {
    expanded: false
  };

  switchExpanded() {
    const expanded = this.state.expanded;
    this.setState({
      expanded: !expanded
    });
  }

  render() {
    const settingsIcon = this.state.expanded ? faTimes : faCog;
    return (
      <div
        className={`settings-component ${
          this.state.expanded ? "expanded" : ""
        }`}
      >
        <FontAwesomeIcon
          className="settings-component-button"
          icon={settingsIcon}
          onClick={() => this.switchExpanded()}
        />
        <div className="settings-component-panel">{this.props.children}</div>
      </div>
    );
  }
}

export default Settings;
