import React from 'react';
import { connect } from 'react-redux';
import jsonwebtoken from 'jsonwebtoken';
import 'component/Profile.sass';
import Logout from 'component/Logout';

function Profile({user}) {
  const userInfo = jsonwebtoken.decode(user);
  return (
    <div>
      <Logout />
      <h1 className="title">Profile</h1>
      <div id="profile-info">
        <div className="row">
          <span className="property">avatar</span>
          <img className="profile-picture" src={userInfo.picture} alt="profile"/>
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
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps)(Profile);
