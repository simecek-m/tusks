import Title from "component/Title";
import { FC } from "react";

const Teams: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Title>Teams</Title>
      <span>all teams you are member of</span>
    </div>
  );
};

export default Teams;
