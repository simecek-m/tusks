import Title from "component/Title";
import { FC } from "react";

const Settings: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Title>Settings</Title>
      <span>you can setup all of your preferences from here</span>
    </div>
  );
};

export default Settings;
