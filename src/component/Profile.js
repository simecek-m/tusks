import React from "react";
import { connect } from "react-redux";
import jsonwebtoken from "jsonwebtoken";
import "component/Profile.sass";
import Back from "component/Back";
import Button from "component/Button";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { logout } from "store/actions";

function Profile({ user, logout }) {
  const userInfo = jsonwebtoken.decode(user);
  return (
    <div>
      <Back />
      <h1 className="title">Profile</h1>
      <div id="profile-info">
        <div className="row">
          <span className="property">avatar</span>
          <img
            className="profile-picture"
            src={userInfo.picture}
            alt="profile"
          />
        </div>
        <div className="row">
          <span className="property">fist name</span>
          <span className="value">{userInfo.given_name}</span>
        </div>
        <div className="row">
          <span className="property">last name</span>
          <span className="value">{userInfo.family_name}</span>
        </div>
        <div className="row">
          <span className="property">email</span>
          <span className="value">{userInfo.email}</span>
        </div>
        <div className="row">
          <span className="property">authority</span>
          <span className="value">{userInfo.iss}</span>
        </div>
        <div className="row single">
          <Button icon={faDoorOpen} text="Logout" onClick={() => logout()} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Profile);
