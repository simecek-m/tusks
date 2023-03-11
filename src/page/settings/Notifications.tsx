import Title from "component/Title";
import { FC } from "react";

const Notifications: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Title>Notifications</Title>
      <span>all notifications like invitations or system messages</span>
    </div>
  );
};

export default Notifications;
