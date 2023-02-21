import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "component/menu/Menu";
import { useTheme } from "provider/ThemeProvider";
import { FC } from "react";
import { IMenuListItem } from "type";

const ThemeSwitcher: FC = () => {
  const { changeTheme } = useTheme();

  const themeVariants: IMenuListItem[] = [
    {
      icon: "sun",
      text: "light",
      onClick: () => changeTheme("light"),
    },
    {
      icon: "moon",
      text: "dark",
      onClick: () => changeTheme("dark"),
    },
    {
      icon: "palette",
      text: "system",
      onClick: () => changeTheme("system"),
    },
  ];

  return (
    <div className="absolute top-2 right-2 select-none items-end gap-1">
      <Menu items={themeVariants}>
        <FontAwesomeIcon
          icon="brush"
          className="cursor h-4 w-4 cursor-pointer rounded-full bg-white p-2 shadow-lg transition duration-300 hover:bg-slate-200 dark:bg-slate-700"
        />
      </Menu>
    </div>
  );
};

export default ThemeSwitcher;
