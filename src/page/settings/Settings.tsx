import Heading from "component/Heading";
import PageLayout from "component/layout/PageLayout";
import { FC } from "react";

const Settings: FC = () => {
  return (
    <PageLayout>
      <Heading
        text="Settings"
        description="you can setup all of your preferences from here"
      />
    </PageLayout>
  );
};

export default Settings;
