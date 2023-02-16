import { useAuth0 } from "@auth0/auth0-react";
import Button from "component/button/Button";
import Title from "component/Title";
import { HOME_PATH } from "constant/paths";
import { FC } from "react";
import { Navigate } from "react-router-dom";

const Dashboard: FC = () => {
  const { isLoading, isAuthenticated, user, logout } = useAuth0();

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!isAuthenticated) {
    return <Navigate replace to={HOME_PATH} />;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 p-4">
      <Title>Dashboard</Title>
      <p>user statistics</p>
      <div className="flex max-w-xl flex-col gap-0">
        <h6>Current user:</h6>
        <code className="break-words rounded-xl bg-gray-800 p-5 text-white">
          {JSON.stringify(user, null, 2)}
        </code>
      </div>
      <Button
        variant="destructive"
        icon="user"
        hoverIcon="door-open"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Leave
      </Button>
    </div>
  );
};

export default Dashboard;
