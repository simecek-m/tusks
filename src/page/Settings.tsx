import PageContent from "component/layout/PageContent";
import PageLayout from "component/layout/PageLayout";
import { ProfileCard } from "component/ProfileCard";
import { FC } from "react";

export const Settings: FC = () => {
  return (
    <PageLayout>
      <PageContent>
        <ProfileCard />
      </PageContent>
    </PageLayout>
  );
};
