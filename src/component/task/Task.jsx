import { bool, string } from "prop-types";
import { useState } from "react";
import styles from "component/task/Task.module.sass";

export default function Task({ isComplete, id, text }) {
  const [checked, setChecked] = useState(isComplete);
  return (
    <span className={styles.checkbox}>
      <input
        className="taskcheckbox"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor={id}>{text}</label>
    </span>
  );
}

Task.propTypes = {
  isCompplete: bool,
  id: string,
  name: string,
};
