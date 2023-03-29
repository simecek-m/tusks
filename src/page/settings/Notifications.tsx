import Heading from "component/common/Heading";
import PageLayout from "component/layout/PageLayout";
import { FC } from "react";

const Notifications: FC = () => {
  return (
    <PageLayout>
      <Heading
        text="Notifications"
        description="all notifications like invitations or system messages"
      />
    </PageLayout>
  );
};

export default Notifications;
