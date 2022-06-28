import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "component/todo/TodoListItem.module.sass";
import { bool, func } from "prop-types";
import { string } from "prop-types";
import { motion } from "framer-motion";

export default function TodoListItem({ active, name, icon, onClick }) {
  const listItem = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 },
  };
  return (
    <motion.div
      variants={listItem}
      className={`${styles["todo-list-item"]} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      <div className={styles.name}>{name}</div>
      <FontAwesomeIcon className={styles.icon} icon={icon} size="xl" />
    </motion.div>
  );
}

TodoListItem.propTypes = {
  active: bool.isRequired,
  name: string.isRequired,
  icon: string.isRequired,
  onClick: func.isRequired,
};
