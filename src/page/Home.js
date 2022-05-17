import Button from "component/button/Button";
import Topbar from "component/layout/Topbar";
import "page/Home.sass";
import GoogleLogin from "react-google-login";
import { GOOGLE_API_CLIENT_ID } from "conf";
import { connect } from "react-redux";
import { login, logout } from "store/actions";

export function HomePage({ login }) {
  return (
    <div className="fullpage">
      <Topbar />
      <Login login={login} />
    </div>
  );
}

function Login({ login }) {
  const onSuccess = response => {
    console.log(response);
    login(response.tokenId);
  };
  const onFailure = error => {
    console.log(error);
  };
  return (
    <LoginSidePanel>
      <h1 className="title">to-do</h1>
      <div>
        Create your own tasks, organize them into lists and don’t forget to
        finish them ever again.
      </div>
      <GoogleLogin
        clientId={GOOGLE_API_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        render={renderProps => (
          <Button onClick={renderProps.onClick}>login</Button>
        )}
      />
    </LoginSidePanel>
  );
}

export default connect(null, { login, logout })(HomePage);

function LoginSidePanel({ children }) {
  return <div className="login-side-panel">{children}</div>;
}
