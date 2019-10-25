import React from "react";
import "component/page/Login.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { login, setLocale } from "store/actions";
import Title from "component/common/Title";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { withTranslation } from "react-i18next";
import jsonwebtoken from "jsonwebtoken";

function Login({ login, setLocale, t }) {
  const loginSuccessCallback = response => {
    const jwt = jsonwebtoken.decode(response.tokenId);
    if (jwt) {
      setLocale(jwt.locale);
      login(response.tokenId);
    } else {
      // TODO: show notification: login.loginFailedNoJwt
    }
  };

  const loginFailCallback = () => {
    // TODO: show notification: login.loginFailed
  };

  return (
    <div>
      <Title text={t("login.title")} icon={faUserShield} />
      <h2 className="sub-title">{t("login.description")}</h2>
      <div className="login-methods">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_API_CLIENT_ID}
          onSuccess={loginSuccessCallback}
          onFailure={loginFailCallback}
          render={renderProps => (
            <div onClick={renderProps.onClick} className="login-method">
              <FontAwesomeIcon className="icon" icon={faGoogle} />
              <span className="authority">Google</span>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default withTranslation()(
  connect(
    null,
    { login, setLocale }
  )(Login)
);
