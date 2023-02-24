import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "component/menu/Menu";
import { useTheme } from "provider/ThemeProvider";
import { FC } from "react";
import { IMenuListItem } from "type";

const ThemeSwitcher: FC = () => {
  const { setThemePreference } = useTheme();

  const themeVariants: IMenuListItem[] = [
    {
      icon: "sun",
      text: "light",
      onClick: () => setThemePreference("light"),
    },
    {
      icon: "moon",
      text: "dark",
      onClick: () => setThemePreference("dark"),
    },
    {
      icon: "palette",
      text: "system",
      onClick: () => setThemePreference("system"),
    },
  ];

  return (
    <div className="absolute top-2 right-2 select-none items-end">
      <Menu items={themeVariants}>
        <FontAwesomeIcon
          icon="brush"
          className="cursor h-4 w-4 cursor-pointer rounded-full bg-white p-2 shadow-lg transition duration-300 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-900"
        />
      </Menu>
    </div>
  );
};

export default ThemeSwitcher;
