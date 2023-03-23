import PageLayout from "component/layout/PageLayout";
import Title from "component/Title";
import { FC } from "react";

const Dashboard: FC = () => {
  return (
    <PageLayout>
      <div className="flex h-screen flex-col items-center justify-center gap-2 p-4">
        <Title>Dashboard</Title>
        <p>user statistics</p>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
