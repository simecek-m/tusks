import PageLayout from "component/layout/PageLayout";
import Title from "component/common/Title";
import { FC } from "react";
import PageContent from "component/layout/PageContent";

const Dashboard: FC = () => {
  return (
    <PageLayout>
      <PageContent>
        <Title>Dashboard</Title>
        <p>user statistics</p>
      </PageContent>
    </PageLayout>
  );
};

export default Dashboard;
