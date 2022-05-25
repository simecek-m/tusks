import "page/HomePage.sass";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "component/button/Button";

export default function HomePage() {
  return (
    <div className="home-layout">
      <LoginSidePanel />
      <div className="content">Content</div>
    </div>
  );
}

function LoginSidePanel() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="login-side-panel">
      <h1 className="title">to-do</h1>
      <div>
        Create your own tasks, organize them into lists and don’t forget to
        finish them ever again.
      </div>
      <Button onClick={loginWithRedirect}>Login</Button>
    </div>
  );
}
