import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { logout } from "store/actions";
import "component/user/UserWidget.sass";

function UserWidget({ user, logout, innerRef }) {
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { logout })(UserWidget);
