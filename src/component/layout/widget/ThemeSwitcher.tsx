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
    <Menu items={themeVariants}>
      <div className="flex items-center justify-center hover:text-primary-600 dark:hover:text-primary-400">
        <FontAwesomeIcon icon={currentIcon} size="lg" />
      </div>
    </Menu>
  );
};

export default ThemeSwitcher;
