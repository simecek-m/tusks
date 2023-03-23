import SettingsNavigation from "component/layout/navigation/SettingsNavigation";
import PageLayout from "component/layout/PageLayout";
import { Outlet } from "react-router-dom";

const SettingsPageLayout = () => {
  return (
    <PageLayout>
      <div className="flex h-screen flex-row">
        <SettingsNavigation />
        <div className="ml-8 mr-4 mt-16 flex w-full overflow-auto pr-4">
          <Outlet />
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPageLayout;
