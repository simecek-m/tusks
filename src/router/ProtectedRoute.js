import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ component, ...rest }) {
  // TODO: inject authentication
  const user = null;

  return user ? <Route {...rest} component={component} /> : <Redirect to="/" />;
}
