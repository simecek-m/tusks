import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "component/menu/Menu";
import { useTheme } from "provider/ThemeProvider";
import { FC } from "react";
import { IMenuListItem } from "type";

const ThemeSwitcher: FC = () => {
  const { themeSettings, setThemePreference } = useTheme();

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
      (variant) => variant.text === (themeSettings.userPreference as string)
    )?.icon ?? themeVariants[2].icon;

  return (
    <Menu items={themeVariants}>
      <div className="flex h-full items-center hover:text-brand-light dark:hover:text-brand-dark">
        <FontAwesomeIcon icon={currentIcon} size="lg" fixedWidth />
      </div>
    </Menu>
  );
};

export default ThemeSwitcher;
