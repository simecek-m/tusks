import SettingsNavigation from "component/layout/navigation/SettingsNavigation";
import Page from "component/layout/Page";
import Topbar from "component/layout/widget/TopBar";
import { Outlet } from "react-router-dom";

const SettingsPageLayout = () => {
  return (
    <div className="flex h-screen flex-col-reverse overflow-hidden md:flex-row md:gap-5">
      <SettingsNavigation />
      <div className="flex w-full grow flex-col overflow-hidden">
        <Topbar />
        <Page>
          <Outlet />
        </Page>
      </div>
    </div>
  );
};

export default SettingsPageLayout;
