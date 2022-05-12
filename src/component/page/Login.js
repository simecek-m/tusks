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
import { showDangerNotification } from "notification";
import { GOOGLE_API_CLIENT_ID } from "conf";

export class Login extends React.Component {
  loginSuccessCallback(response) {
    const { t, setLocale, login } = this.props;
    const jwt = jsonwebtoken.decode(response.tokenId);
    if (jwt) {
      setLocale(jwt.locale);
      login(response.tokenId);
    } else {
      showDangerNotification(
        t("login.loginFailedTitle"),
        t("login.loginFailedMessage")
      );
    }
  }

  loginFailCallback(error) {
    const { t } = this.props;
    showDangerNotification(
      t("login.loginFailedTitle"),
      t("login.loginFailedMessage")
    );
  }

  render() {
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Title text={t("login.title")} icon={faUserShield} />
        <h2 className="sub-title">{t("login.description")}</h2>
        <div className="login-methods">
          <GoogleLogin
            clientId={GOOGLE_API_CLIENT_ID}
            onSuccess={response => this.loginSuccessCallback(response)}
            onFailure={error => this.loginFailCallback(error)}
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
}

export default connect(null, { login, setLocale })(withTranslation()(Login));
