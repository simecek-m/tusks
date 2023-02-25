import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "component/menu/Menu";
import { useTheme } from "provider/ThemeProvider";
import { FC } from "react";
import { IMenuListItem } from "type";

const ThemeSwitcher: FC = () => {
  const { theme, setThemePreference } = useTheme();

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
      icon: "circle-half-stroke",
      text: "system",
      onClick: () => setThemePreference("system"),
    },
  ];

  const currentIcon: IconProp =
    themeVariants.find(
      (variant) => variant.text === (theme.userPreference as string)
    )?.icon ?? themeVariants[2].icon;

  return (
    <div className="absolute top-2 right-2 select-none items-end">
      <Menu items={themeVariants}>
        <FontAwesomeIcon
          icon={currentIcon}
          className="cursor h-4 w-4 cursor-pointer rounded-full bg-white p-2 shadow-lg transition duration-300 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-900"
        />
      </Menu>
    </div>
  );
};

export default ThemeSwitcher;
