import SettingsNavigationItem from "component/layout/navigation/SettingsNavigationItem";
import {
  INDEX_PATH,
  NOTIFICATIONS_PATH_NAME,
  PROFILE_PATH_NAME,
  TEAMS_PATH_NAME,
} from "constant/paths";

const SettingsNavigation = () => {
  return (
    <nav className="z-40 flex w-full flex-row justify-center bg-white py-2 shadow-sm dark:bg-gray-900 md:h-screen md:w-80 md:flex-col md:justify-start md:px-5 md:pt-20 md:shadow-xl">
      <div className="hidden md:flex">
        <SettingsNavigationItem to={INDEX_PATH} icon="left-long" text="back" />
        <hr className="m-1 dark:opacity-30" />
      </div>
      <SettingsNavigationItem
        to={PROFILE_PATH_NAME}
        icon="user"
        text="profile"
      />
      <SettingsNavigationItem
        to={TEAMS_PATH_NAME}
        icon="people-group"
        text="teams"
      />
      <SettingsNavigationItem
        to={NOTIFICATIONS_PATH_NAME}
        icon="bell"
        text="notifications"
      />
    </nav>
  );
};

export default SettingsNavigation;
