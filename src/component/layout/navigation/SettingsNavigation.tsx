import SettingsNavigationItem from "component/layout/navigation/SettingsNavigationItem";
import {
  NOTIFICATIONS_PATH_NAME,
  PROFILE_PATH_NAME,
  TEAMS_PATH_NAME,
} from "constant/paths";

const SettingsNavigation = () => {
  return (
    <nav className="m-5 flex flex-col rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-700">
      <h1 className="w-full text-center text-xl">Settings</h1>
      <hr className="m-2 dark:opacity-20" />
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
