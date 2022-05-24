import { useAuth0 } from "@auth0/auth0-react";
import LoadingPage from "page/LoadingPage";
import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ component, ...rest }) {
  const { user, isLoading } = useAuth0();
  if (isLoading) {
    return <LoadingPage />;
  }
  if (user) {
    return <Route {...rest} component={component} />;
  }
  return <Redirect to="/" />;
}
