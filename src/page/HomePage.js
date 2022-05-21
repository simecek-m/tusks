import Button from "component/button/Button";
import GoogleLogin from "react-google-login";
import { GOOGLE_API_CLIENT_ID } from "conf";
import { connect } from "react-redux";
import { login, logout } from "store/actions";
import PageWithHeader from "../component/layout/PageWithHeader";
import "page/HomePage.sass";

export function HomePage({ login }) {
  return (
    <PageWithHeader>
      <div className="home-layout">
        <LoginSidePanel login={login} />
        <div className="content">Content</div>
      </div>
    </PageWithHeader>
  );
}

function LoginSidePanel({ login }) {
  const onSuccess = response => {
    const user = {
      name: response.profileObj.name,
      photo: response.profileObj.imageUrl,
      email: response.profileObj.email,
      tokenId: response.tokenId
    };
    login(user);
  };
  const onFailure = error => {
    // TODO: show error toast instead of logging to console
    console.warn(error);
  };
  return (
    <div className="login-side-panel">
      <h1 className="title">to-do</h1>
      <div>
        Create your own tasks, organize them into lists and don’t forget to
        finish them ever again.
      </div>
      <GoogleLogin
        clientId={GOOGLE_API_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        prompt="select_account"
        render={renderProps => (
          <Button onClick={renderProps.onClick}>login</Button>
        )}
      />
    </div>
  );
}

export default connect(null, { login, logout })(HomePage);
