import PageLayout from "component/layout/PageLayout";
import Title from "component/common/Title";
import { FC } from "react";

const Dashboard: FC = () => {
  return (
    <PageLayout>
      <Title>Dashboard</Title>
      <p>user statistics</p>
    </PageLayout>
  );
};

export default Dashboard;
