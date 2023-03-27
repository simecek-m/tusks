import SettingsNavigation from "component/layout/navigation/SettingsNavigation";
import Page from "component/layout/Page";
import PageLayout from "component/layout/PageLayout";
import { Outlet } from "react-router-dom";

const SettingsPageLayout = () => {
  return (
    <PageLayout>
      <div className="flex h-screen flex-col-reverse md:flex-row md:gap-5">
        <SettingsNavigation />
        <Page>
          <Outlet />
        </Page>
      </div>
    </PageLayout>
  );
};

export default SettingsPageLayout;
