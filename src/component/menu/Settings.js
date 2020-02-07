import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { SELECT } from "modal/types";
import csFlag from "assets/image/flag/cs.png";
import enFlag from "assets/image/flag/en.png";
import i18n from "i18n";
import { withModal } from "modal/withModal";
import { withTranslation } from "react-i18next";
import SettingsItem from "component/menu/SettingsItem";
import {
  faHome,
  faUser,
  faFlagUsa,
  faInfo
} from "@fortawesome/free-solid-svg-icons";
import { redirect } from "helper/router";
import "component/menu/Settings.sass";

export class Settings extends React.Component {
  state = {
    expanded: false
  };

  switchExpanded() {
    const expanded = this.state.expanded;
    this.setState({
      expanded: !expanded
    });
  }

  openChangeLanguageModal() {
    const { t, openModal } = this.props;
    openModal({
      type: SELECT,
      title: t("settings.localization.modal.title"),
      text: t("settings.localization.modal.text"),
      options: [
        {
          image: enFlag,
          text: t("settings.localization.modal.language.english"),
          onClick: () => i18n.changeLanguage("en")
        },
        {
          image: csFlag,
          text: t("settings.localization.modal.language.czech"),
          onClick: () => i18n.changeLanguage("cs")
        }
      ]
    });
  }

  render() {
    const settingsIcon = this.state.expanded ? faTimes : faCog;
    const divider = this.props.children ? <hr /> : null;
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
        <div className="settings-component-sidebar">
          <div className="common-actions">
            <SettingsItem icon={faHome} onClick={() => redirect("/")} />
            <SettingsItem icon={faUser} onClick={() => redirect("/profile")} />
            <SettingsItem
              icon={faFlagUsa}
              onClick={() => this.openChangeLanguageModal()}
            />
            <SettingsItem icon={faInfo} onClick={() => redirect("/about")} />
          </div>
          {divider}
          <div className="component-actions">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default withModal(withTranslation()(Settings));
