import React from "react";
import jsonwebtoken from "jsonwebtoken";
import "component/menu/widget/Profile.sass";
import { connect } from "react-redux";
import { shortenString } from "helper/string";
import { withRouter } from "react-router-dom";

function UserWidget({ user, history }) {
  const info = jsonwebtoken.decode(user);
  return (
    <span onClick={() => history.push("/profile")} id="user-widget">
      <img src={info.picture} alt="profile" />
      <span>{shortenString(info.name, 20)}</span>
    </span>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(UserWidget));
