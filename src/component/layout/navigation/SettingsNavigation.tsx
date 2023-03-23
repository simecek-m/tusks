import SettingsNavigationItem from "component/layout/navigation/SettingsNavigationItem";
import {
  INDEX_PATH,
  NOTIFICATIONS_PATH_NAME,
  PROFILE_PATH_NAME,
  TEAMS_PATH_NAME,
} from "constant/paths";

const SettingsNavigation = () => {
  return (
    <nav className="flex w-80 flex-col bg-white p-5 pt-20 shadow-xl dark:bg-gray-900">
      <SettingsNavigationItem to={INDEX_PATH} icon="left-long" text="back" />
      <hr className="m-1 dark:opacity-30" />
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
