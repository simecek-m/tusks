import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "component/common/Card";
import { IconType } from "constant/icons";
import { useTheme } from "provider/ThemeProvider";
import { FC } from "react";
import { TeamMember, ThemedColor } from "type";

type TeamCardProps = {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  color: ThemedColor;
  members: Array<TeamMember>;
  onClick: (id: string) => void;
};

export const TeamCard: FC<TeamCardProps> = ({
  id,
  name,
  description,
  icon,
  color,
  members,
  onClick,
}) => {
  const { theme } = useTheme();
  const bg = theme === "dark" ? color.dark : color.light;
  return (
    <Card onClick={() => onClick(id)}>
      <div className="flex w-96 cursor-pointer flex-row gap-4 p-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-white dark:text-black"
          style={{ backgroundColor: bg }}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-bold">{name}</div>
          <div className="text-xs opacity-70">
            {description} ({members.length})
          </div>
        </div>
      </div>
    </Card>
  );
};
