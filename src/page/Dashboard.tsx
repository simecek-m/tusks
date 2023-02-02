import { useAuth0 } from "@auth0/auth0-react";
import Button from "component/Button";
import { HOME_PATH } from "constant/paths";
import { FC } from "react";
import { Navigate } from "react-router-dom";

const Dashboard: FC = () => {
  const { isLoading, isAuthenticated, logout } = useAuth0();

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!isAuthenticated) {
    return <Navigate replace to={HOME_PATH} />;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <h1 className="inline-block bg-gradient-to-br from-brand-400 to-brand-900 bg-clip-text text-5xl font-black text-transparent">
        Dashboard
      </h1>
      <p>user statistics</p>
      <Button
        text="logout"
        className="mt-5"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      />
    </div>
  );
};

export default Dashboard;
