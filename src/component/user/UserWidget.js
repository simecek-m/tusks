import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "component/user/UserWidget.sass";

export default function UserWidget({ innerRef }) {
  // TODO: inject authentication
  const user = null;
  const logout = null;

  return (
    <div className="user-widget" ref={innerRef}>
      <img id="user-photo" src={user.photo} alt="user" />
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
