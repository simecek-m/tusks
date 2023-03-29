import Heading from "component/common/Heading";
import PageContent from "component/layout/PageContent";
import PageLayout from "component/layout/PageLayout";
import { FC } from "react";

const Notifications: FC = () => {
  return (
    <PageLayout>
      <PageContent>
        <Heading
          text="Notifications"
          description="all notifications like invitations or system messages"
        />
      </PageContent>
    </PageLayout>
  );
};

export default Notifications;
