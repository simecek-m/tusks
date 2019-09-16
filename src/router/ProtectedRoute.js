import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function ProtectedRoute({ component, user, ...rest }) {
  return user ? (
    <Route {...rest} component={component} />
  ) : (
    <Redirect to="/login" />
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
