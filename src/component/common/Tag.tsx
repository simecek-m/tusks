import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "provider/ThemeProvider";
import { FC } from "react";
import { IColor } from "type";

interface TagProps {
  id: string;
  label: string;
  color: IColor;
  onClickIcon: (id: string) => void;
}

const Tag: FC<TagProps> = ({ id, label, color, onClickIcon }) => {
  const { theme } = useTheme();
  const bg =
    theme === "dark" ? { background: color.dark } : { background: color.light };
  return (
    <div
      className="flex w-fit select-none flex-row items-center justify-center gap-1 rounded-full px-3 py-2 text-white dark:text-black"
      style={bg}
    >
      <span>{label}</span>
      <FontAwesomeIcon
        icon="xmark"
        className="cursor-pointer p-1"
        onClick={() => onClickIcon(id)}
      />
    </div>
  );
};

export default Tag;
