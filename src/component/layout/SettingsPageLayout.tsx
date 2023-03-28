import SettingsNavigation from "component/layout/navigation/SettingsNavigation";
import { Outlet } from "react-router-dom";

const SettingsPageLayout = () => {
  return (
    <div className="flex h-screen flex-col-reverse overflow-hidden md:flex-row md:gap-5">
      <SettingsNavigation />
      <div className="flex w-full grow flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPageLayout;
