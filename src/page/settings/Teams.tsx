import Heading from "component/Heading";
import PageLayout from "component/layout/PageLayout";
import { FC } from "react";

const Teams: FC = () => {
  return (
    <PageLayout>
      <Heading text="Teams" description="all teams you are member of" />
    </PageLayout>
  );
};

export default Teams;
