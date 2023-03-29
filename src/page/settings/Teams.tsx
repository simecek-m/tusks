import Heading from "component/common/Heading";
import PageContent from "component/layout/PageContent";
import PageLayout from "component/layout/PageLayout";
import { FC } from "react";

const Teams: FC = () => {
  return (
    <PageLayout>
      <PageContent>
        <Heading text="Teams" description="all teams you are member of" />
      </PageContent>
    </PageLayout>
  );
};

export default Teams;
