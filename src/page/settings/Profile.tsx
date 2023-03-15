import Button from "component/button/Button";
import Heading from "component/Heading";
import { INDEX_PATH } from "constant/paths";
import { useUserProfile } from "provider/UserProfileProvider";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Profile: FC = () => {
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col gap-5">
      <Heading
        text={`Hi, ${profile?.firstName}`}
        description="information about currently logged in user"
      />
      <pre className="w-[650px] overflow-x-auto rounded-xl bg-white p-5 text-slate-800 shadow-lg dark:bg-gray-900 dark:text-white">
        {JSON.stringify(profile, null, 2)}
      </pre>
      <Button
        icon="home"
        hoverIcon="arrow-right"
        onClick={() => navigate(INDEX_PATH)}
      >
        home
      </Button>
    </div>
  );
};

export default Profile;
