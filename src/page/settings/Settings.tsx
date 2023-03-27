import Heading from "component/Heading";
import Page from "component/layout/Page";
import { FC } from "react";

const Settings: FC = () => {
  return (
    <Page>
      <Heading
        text="Settings"
        description="you can setup all of your preferences from here"
      />
    </Page>
  );
};

export default Settings;
