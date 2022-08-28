import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "provider/theme";
import styles from "component/control/ThemeSwitch.module.sass";

export default function ThemeSwitch({ className }) {
  const { theme, switchTheme } = useTheme();
  return (
    <FontAwesomeIcon
      className={`${className} ${styles.icon}`}
      icon={theme === "dark" ? "sun" : "moon"}
      onClick={switchTheme}
    />
  );
}
