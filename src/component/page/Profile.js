import React from "react";
import { connect } from "react-redux";
import jsonwebtoken from "jsonwebtoken";
import Back from "component/navigation/Back";
import Button from "component/button/Button";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { logout } from "store/actions";
import Title from "component/common/Title";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { withTranslation } from "react-i18next";
import Settings from "component/menu/Settings";
import "component/page/Profile.sass";

export function Profile({ user, logout, t }) {
  const userInfo = jsonwebtoken.decode(user);
  return (
    <div className="animated fadeIn">
      <Settings />
      <Back />
      <Title text={t("profile.title")} icon={faUserCircle} />
      <div id="profile-info">
        <div className="row">
          <span className="property">{t("profile.avatar")}</span>
          <img
            className="profile-picture"
            src={userInfo.picture}
            alt="profile"
          />
        </div>
        <div className="row">
          <span className="property">{t("profile.firstName")}</span>
          <span className="value">{userInfo.given_name}</span>
        </div>
        <div className="row">
          <span className="property">{t("profile.lastName")}</span>
          <span className="value">{userInfo.family_name}</span>
        </div>
        <div className="row">
          <span className="property">{t("profile.email")}</span>
          <span className="value">{userInfo.email}</span>
        </div>
        <div className="row">
          <span className="property">{t("profile.authority")}</span>
          <span className="value">{userInfo.iss}</span>
        </div>
        <div className="row single">
          <Button
            icon={faDoorOpen}
            text={t("profile.logout")}
            onClick={() => logout()}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(withTranslation()(Profile));
