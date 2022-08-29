import { useKeyPress } from "hooks/interaction";
import { useEffect, useState } from "react";
import styles from "component/task/NewTask.module.sass";

export default function NewTask({ onCreate = () => null, onFocus, onBlur }) {
  const [text, setText] = useState("");

  const createNewTask = () => {
    onCreate({ text, completed: false });
    setText("");
  };

  const { addOnKeyDownEvent, removeOnKeyDownEvent } = useKeyPress(
    "Enter",
    createNewTask
  );

  useEffect(() => {
    addOnKeyDownEvent();
    return () => {
      removeOnKeyDownEvent();
    };
  }, [addOnKeyDownEvent, removeOnKeyDownEvent]);

  return (
    <input
      id={styles["new-task"]}
      onFocus={onFocus}
      onBlur={onBlur}
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="What do you need to remind?"
      autoComplete="off"
    />
  );
}
