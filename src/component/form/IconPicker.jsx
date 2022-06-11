import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AVAILABLE_ICONS, FAVOURITE_ICONS } from "constants/icons";
import { useState } from "react";
import { debounce } from "debounce";
import styles from "component/form/IconPicker.module.sass";
import { useTheme } from "provider/theme";
import { motion } from "framer-motion";

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
  const container = {
    hidden: { opacity: 0, x: -100 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const listItem = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 },
  };
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles["icon-picker"]} ${
        theme === "dark" ? styles.dark : ""
      }`}
    >
      <input
        className={styles.input}
        placeholder="search"
        onChange={(e) => filterIcons(e.target.value)}
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={styles.icons}
      >
        {icons.length === 0 && <span>can't find any</span>}
        {icons.map((iconName, index) => (
          <motion.div variants={listItem} key={index}>
            <FontAwesomeIcon icon={iconName} onClick={() => onPick(iconName)} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
