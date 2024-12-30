import { Title } from "component/common/Title";
import { PageContent } from "component/layout/PageContent";
import { PageLayout } from "component/layout/PageLayout";
import { FC } from "react";

export const Dashboard: FC = () => {
  return (
    <PageLayout>
      <PageContent>
        <Title>Dashboard</Title>
        <p>user statistics</p>
      </PageContent>
    </PageLayout>
  );
};
