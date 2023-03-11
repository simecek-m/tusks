import SettingsNavigation from "component/layout/navigation/SettingsNavigation";
import PageLayout from "component/layout/PageLayout";
import { Outlet } from "react-router-dom";

const SettingsPageLayout = () => {
  return (
    <PageLayout>
      <div className="h-sc flex h-screen flex-row">
        <SettingsNavigation />
        <div className="my-5 flex w-full">
          <Outlet />
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPageLayout;
