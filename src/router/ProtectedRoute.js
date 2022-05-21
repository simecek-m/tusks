import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export function ProtectedRoute({ component, user, ...rest }) {
  return user ? <Route {...rest} component={component} /> : <Redirect to="/" />;
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
