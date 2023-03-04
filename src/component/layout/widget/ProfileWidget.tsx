import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "component/menu/Menu";
import { IMenuListItem } from "type";

const ProfileWidget = () => {
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
    <Menu items={profileMenuList}>
      <div className="flex items-center justify-center p-2 hover:text-primary-600 dark:hover:text-primary-400">
        <FontAwesomeIcon icon="user" />
      </div>
    </Menu>
  );
};

export default ProfileWidget;
