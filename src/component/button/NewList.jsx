import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "component/button/NewList.module.sass";
import { useState } from "react";
import IconPicker from "component/form/IconPicker";
import { useTodoApi } from "hooks/api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

export default function NewList() {
  const [isExpanded, setExpanded] = useState(false);
  const switchState = () => setExpanded(!isExpanded);
  return (
    <>
      {!isExpanded && <NewListButton onClick={switchState} />}
      {isExpanded && <NewListForm onClose={switchState} />}
    </>
  );
}

function NewListButton({ onClick }) {
  return (
    <div id={styles.button} onClick={onClick}>
      <FontAwesomeIcon icon="plus" size="lg" />
    </div>
  );
}

function NewListForm({ onClose }) {
  const queryClient = useQueryClient();
  const [isIconPickerVisible, setIconPickerVisible] = useState(false);
  const [pickedIcon, setPickedIcon] = useState("list-check");
  const [name, setName] = useState("");
  const { createTodo } = useTodoApi();
  const { mutate } = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      onClose();
    },
    onError: async (response) => {
      toast.error(
        <div>
          {response.statusText} (status: {response.status})
        </div>
      );
    },
  });
  return (
    <form>
      <div className={styles["todo-list-item"]}>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FontAwesomeIcon
          icon={pickedIcon}
          className={styles.icon}
          onClick={() => setIconPickerVisible(!isIconPickerVisible)}
        />
      </div>
      {isIconPickerVisible && (
        <div className={styles["icon-picker"]}>
          <IconPicker
            onPick={(iconName) => {
              setPickedIcon(iconName);
              setIconPickerVisible(!isIconPickerVisible);
            }}
          />
        </div>
      )}
      <div className={styles.buttons}>
        <button onClick={onClose} type="button">
          <FontAwesomeIcon icon="xmark" />
          close
        </button>
        <button
          onClick={() => mutate({ title: name, icon: pickedIcon })}
          type="button"
        >
          <FontAwesomeIcon icon="check" />
          save
        </button>
      </div>
    </form>
  );
}
