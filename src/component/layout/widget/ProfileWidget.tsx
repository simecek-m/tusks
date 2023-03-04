import Menu from "component/menu/Menu";
import { useUserProfile } from "provider/UserProfileProvider";
import { IMenuListItem } from "type";

const ProfileWidget = () => {
  const { profile } = useUserProfile();
  const profileMenuList: IMenuListItem[] = [
    {
      icon: "user",
      text: "profile",
      onClick: () => {
        console.log("profile");
      },
    },
    {
      icon: "gear",
      text: "settings",
      onClick: () => {
        console.log("settings");
      },
    },
  ];
  return (
    <>
      {profile && (
        <Menu items={profileMenuList}>
          <div className="flex items-center justify-center hover:text-primary-600 dark:hover:text-primary-400">
            <img src={profile?.picture} className="h-7 w-7 rounded-full" />
          </div>
        </Menu>
      )}
    </>
  );
};

export default ProfileWidget;
