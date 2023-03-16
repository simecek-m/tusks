import Button from "component/button/Button";
import Heading from "component/Heading";
import { useUserProfile } from "provider/UserProfileProvider";
import { FC } from "react";

const Profile: FC = () => {
  const { profile } = useUserProfile();
  return (
    <div className="flex w-full flex-col gap-5">
      <Heading
        text={`Hi, ${profile?.firstName}`}
        description="information about currently logged in user"
      />
      <img src={profile?.picture} className="w-52 rounded-[30%] shadow-2xl" />
      <div className="grid w-fit flex-col gap-1 ">
        <div className="flex flex-row">
          <span className="w-52">username</span>
          <span className="text-lg font-bold">{profile?.username}</span>
        </div>
        <div className="flex basis-auto flex-row">
          <span className="w-52">first name</span>
          <span className="text-lg font-bold">{profile?.firstName}</span>
        </div>
        <div className="flex flex-row">
          <span className="w-52">last name</span>
          <span className="text-lg font-bold">{profile?.lastName}</span>
        </div>
        <div className="flex flex-row">
          <span className="w-52">e-mail</span>
          <span className="text-lg font-bold">{profile?.email}</span>
        </div>
      </div>
      {/* TODO: open confirmation modal for delete user profile */}
      <Button icon="user" hoverIcon="user-slash" variant="error">
        Deactivate
      </Button>
    </div>
  );
};

export default Profile;
