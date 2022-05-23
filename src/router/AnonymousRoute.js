import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AnonymousRoute({ component, ...rest }) {
  const { user } = useAuth0();
  return user ? (
    <Redirect to="/list" />
  ) : (
    <Route {...rest} component={component} />
  );
}
