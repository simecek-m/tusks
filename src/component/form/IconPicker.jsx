import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AVAILABLE_ICONS, FAVOURITE_ICONS } from "constants/icons";
import { useState } from "react";
import { debounce } from "debounce";
import styles from "component/form/IconPicker.module.sass";
import { useTheme } from "provider/theme";

export default function IconPicker({ onPick }) {
  const [icons, setIcons] = useState(FAVOURITE_ICONS);
  const { theme } = useTheme();
  const filterIcons = debounce((text) => {
    if (text.length > 0) {
      const filteredIcons = AVAILABLE_ICONS.filter((iconName) =>
        iconName.includes(text)
      ).slice(0, 14);
      setIcons(filteredIcons);
    } else {
      setIcons(FAVOURITE_ICONS);
    }
  }, 400);
  return (
    <div
      className={`${styles["icon-picker"]} ${
        theme === "dark" ? styles.dark : ""
      }`}
    >
      <input
        className={styles.input}
        placeholder="search"
        onChange={(e) => filterIcons(e.target.value)}
      />
      <div className={styles.icons}>
        {icons.length === 0 && <span>can't find any</span>}
        {icons.map((iconName, index) => (
          <FontAwesomeIcon
            icon={iconName}
            key={index}
            onClick={() => onPick(iconName)}
          />
        ))}
      </div>
    </div>
  );
}
