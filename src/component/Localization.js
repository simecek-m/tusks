import React from "react";
import i18n from "i18next";
import { withTranslation } from "react-i18next";

// style
import "component/Localization.sass";

// flags
import enFlag from "assets/image/flag/united-kingdom.png";
import csFlag from "assets/image/flag/czech.png";

class Localization extends React.Component {
  state = {
    locale: "en"
  };

  changeLocale(locale) {
    i18n
      .changeLanguage(locale)
      .then(() =>
        this.setState({
          locale,
          extends: false
        })
      )
      .catch(error => console.log(error));
  }

  getFlag() {
    switch (this.state.locale) {
      case "en":
        return enFlag;
      case "cs":
        return csFlag;
      default:
        return "unknown";
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div className="localization-component">
        <img className="flag" src={this.getFlag()} alt="flag" />
        <div className="locales">
          <div className="locale" onClick={() => this.changeLocale("en")}>
            {t("localization.english")}
          </div>
          <div className="locale" onClick={() => this.changeLocale("cs")}>
            {t("localization.czech")}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Localization);
