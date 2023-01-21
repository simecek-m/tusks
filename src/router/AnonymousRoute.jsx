import { useAuth0 } from "@auth0/auth0-react";
import LoadingPage from "page/LoadingPage";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AnonymousRoute() {
  const { user, isLoading } = useAuth0();
  if (isLoading) {
    return <LoadingPage />;
  }
  if (user) {
    return <Navigate to="/list" replace />;
  }
  return <Outlet />;
}
