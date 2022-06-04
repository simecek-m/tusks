import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "component/todo/TodoListItem.module.sass";
import { func } from "prop-types";
import { string } from "prop-types";

export default function TodoListItem({ name, icon, onClick }) {
  return (
    <div className={styles["todo-list-item"]} onClick={onClick}>
      <div className={styles.name}>{name}</div>
      <FontAwesomeIcon className={styles.icon} icon={icon} size="xl" />
    </div>
  );
}

TodoListItem.propTypes = {
  name: string.isRequired,
  icon: string.isRequired,
  onClick: func.isRequired,
};
