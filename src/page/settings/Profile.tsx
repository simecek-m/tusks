import Button from "component/button/Button";
import Title from "component/Title";
import { INDEX_PATH } from "constant/paths";
import { useUserProfile } from "provider/UserProfileProvider";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Profile: FC = () => {
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Title>Profile</Title>
      <span>all available information about you</span>
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
