import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "component/user/UserWidget.sass";

export default function UserWidget({ innerRef }) {
  const { user, logout } = useAuth0();
  return (
    <div className="user-widget" ref={innerRef}>
      <img id="user-photo" src={user.picture} alt="user" />
      <div className="user-texts">
        <h3>{user.name}</h3>
        <div>{user.email}</div>
      </div>
      <div className="logout-icon" onClick={logout}>
        <FontAwesomeIcon className="icon" icon="sign-out" size="xl" />
      </div>
    </div>
  );
}
