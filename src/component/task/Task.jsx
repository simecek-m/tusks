import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "component/task/Task.module.sass";
import { useState } from "react";

export default function Task({
  completed,
  id,
  text,
  onDelete,
  onStateChanged = () => null,
}) {
  const [checked, setChecked] = useState(completed);

  return (
    <span className={styles.checkbox}>
      <label htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={() => {
            onStateChanged(!checked);
            setChecked(!checked);
          }}
        />
        <span>{text}</span>
      </label>
      <FontAwesomeIcon
        icon="close"
        className={styles["close-icon"]}
        onClick={() => onDelete(id)}
      />
    </span>
  );
}
