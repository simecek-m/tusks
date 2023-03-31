import SettingsNavigationItem from "component/layout/navigation/SettingsNavigationItem";
import {
  INDEX_PATH,
  PROFILE_PATH_NAME,
  SHARE_PATH_NAME,
  TAGS_PATH_NAME,
  TEAMS_PATH_NAME,
} from "constant/paths";

const SettingsNavigation = () => {
  return (
    <nav className="z-40 flex w-full flex-row justify-center bg-white py-2 shadow-sm dark:bg-gray-900 md:h-screen md:w-80 md:flex-col md:justify-start md:px-5 md:pt-20 md:shadow-xl">
      <span className="hidden md:block">
        <SettingsNavigationItem to={INDEX_PATH} icon="left-long" text="back" />
        <hr className="m-1 dark:opacity-30" />
      </span>
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
        to={SHARE_PATH_NAME}
        icon="share-nodes"
        text="share"
      />
      <SettingsNavigationItem to={TAGS_PATH_NAME} icon="tags" text="tags" />
    </nav>
  );
};

export default SettingsNavigation;
