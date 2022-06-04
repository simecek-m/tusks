import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "component/user/UserWidget.module.sass";

export default function UserWidget({ innerRef }) {
  const { user, logout } = useAuth0();
  return (
    <div id={styles.widget} ref={innerRef}>
      <img id={styles.picture} src={user.picture} alt="user" />
      <div id={styles.texts}>
        <h3>{user.name}</h3>
        <div>{user.email}</div>
      </div>
      <div id={styles.logout} onClick={logout}>
        <FontAwesomeIcon icon="sign-out" size="xl" />
      </div>
    </div>
  );
}
