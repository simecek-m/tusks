import { useAuth0 } from "@auth0/auth0-react";
import Button from "component/button/Button";
import PageLayout from "component/layout/PageLayout";
import Title from "component/Title";
import { useUserProfile } from "provider/UserProfileProvider";
import { FC } from "react";

const Dashboard: FC = () => {
  const { logout } = useAuth0();
  const { profile } = useUserProfile();
  return (
    <PageLayout>
      <div className="flex h-screen flex-col items-center justify-center gap-2 p-4">
        <Title>Dashboard</Title>
        <p>user statistics</p>
        <div className="mb-5 flex max-w-xl flex-col gap-0">
          <h6>Current user:</h6>
          <pre className="overflow-auto rounded-xl bg-gray-900 p-5 text-white shadow-lg">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
        <Button
          variant="error"
          icon="user"
          hoverIcon="door-open"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Leave
        </Button>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
