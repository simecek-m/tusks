import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { logout } from "store/actions";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import "component/user/UserWidget.sass";

function UserWidget({ user, logout }) {
  return (
    <div className="user-widget">
      <img id="user-photo" src={user.photo} alt="user" />
      <div className="user-texts">
        <h3>{user.name}</h3>
        <div>{user.email}</div>
      </div>
      <div className="logout-icon" onClick={logout}>
        <FontAwesomeIcon className="icon" icon={faSignOut} size="xl" />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { logout })(UserWidget);
