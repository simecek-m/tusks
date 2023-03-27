import Heading from "component/Heading";
import Page from "component/layout/Page";
import { FC } from "react";

const Teams: FC = () => {
  return (
    <Page>
      <Heading text="Teams" description="all teams you are member of" />
    </Page>
  );
};

export default Teams;
