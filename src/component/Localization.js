import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { setLocale } from "store/actions";

// style
import "component/Localization.sass";

// flags
import enFlag from "assets/image/flag/united-kingdom.png";
import csFlag from "assets/image/flag/czech.png";

class Localization extends React.Component {
  getFlag() {
    const { locale } = this.props;
    switch (locale) {
      case "en":
        return enFlag;
      case "cs":
        return csFlag;
      default:
        return "unknown";
    }
  }

  render() {
    const { setLocale, t } = this.props;
    return (
      <div className="localization-component">
        <img className="flag" src={this.getFlag()} alt="flag" />
        <div className="locales">
          <div className="locale" onClick={() => setLocale("en")}>
            {t("localization.english")}
          </div>
          <div className="locale" onClick={() => setLocale("cs")}>
            {t("localization.czech")}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locale: state.locale
  };
};

export default connect(
  mapStateToProps,
  { setLocale }
)(withTranslation()(Localization));
