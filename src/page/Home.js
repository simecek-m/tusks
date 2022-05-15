import Button from "component/button/Button";
import Topbar from "component/layout/Topbar";
import "page/Home.sass";

export default function HomePage() {
  return (
    <div className="fullpage">
      <Topbar />
      <Login />
    </div>
  );
}

function Login() {
  return (
    <div className="login-box">
      <h1 className="title">to-do</h1>
      <div>
        Create your own tasks, organize them into lists and don’t forget to
        finish them ever again.
      </div>
      <Button>login</Button>
    </div>
  );
}
