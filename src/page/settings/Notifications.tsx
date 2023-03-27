import Heading from "component/Heading";
import Page from "component/layout/Page";
import { FC } from "react";

const Notifications: FC = () => {
  return (
    <Page>
      <Heading
        text="Notifications"
        description="all notifications like invitations or system messages"
      />
    </Page>
  );
};

export default Notifications;
