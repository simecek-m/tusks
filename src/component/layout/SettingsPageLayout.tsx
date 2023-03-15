import SettingsNavigation from "component/layout/navigation/SettingsNavigation";
import PageLayout from "component/layout/PageLayout";
import { Outlet } from "react-router-dom";

const SettingsPageLayout = () => {
  return (
    <PageLayout>
      <div className="flex h-screen flex-row">
        <SettingsNavigation />
        <div className="mx-8 mt-16 mb-8 flex w-full">
          <Outlet />
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPageLayout;
