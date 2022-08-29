import { bool, string } from "prop-types";
import { useState } from "react";
import styles from "component/task/Task.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Task({ completed, id, text, onDelete }) {
  const [checked, setChecked] = useState(completed);
  return (
    <span className={styles.checkbox}>
      <label htmlFor={id}>
        <input
          className="taskcheckbox"
          type="checkbox"
          id={id}
          checked={checked}
          onChange={() => setChecked(!checked)}
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

Task.propTypes = {
  isCompplete: bool,
  id: string,
  name: string,
};
