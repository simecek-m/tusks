import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AnonymousRoute({ component, ...rest }) {
  // TODO: inject authentication
  const user = null;

  return user ? (
    <Redirect to="/list" />
  ) : (
    <Route {...rest} component={component} />
  );
}
