import { useAuth0 } from "@auth0/auth0-react";
import { HOME_PATH } from "constant/paths";
import UserProfileProvider from "provider/UserProfileProvider";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: FC = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (isLoading) return <div>authenticating...</div>;
  if (error)
    return <div>Oooooops, authentication error occured: {error.message}</div>;

  if (isAuthenticated) {
    return (
      <UserProfileProvider>
        <Outlet />
      </UserProfileProvider>
    );
  } else {
    return <Navigate replace to={HOME_PATH} />;
  }
};

export default ProtectedRoute;
