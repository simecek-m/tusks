import Heading from "component/common/Heading";
import PageContent from "component/layout/PageContent";
import PageLayout from "component/layout/PageLayout";
import { FC } from "react";

const Settings: FC = () => {
  return (
    <PageLayout>
      <PageContent>
        <Heading
          text="Settings"
          description="you can setup all of your preferences from here"
        />
      </PageContent>
    </PageLayout>
  );
};

export default Settings;
