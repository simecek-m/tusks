import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "component/button/NewList.module.sass";
import { useEffect, useRef, useState } from "react";
import IconPicker from "component/form/IconPicker";
import { useTodoApi } from "hooks/api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside, useKeyPress } from "hooks/interaction";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id={styles.button}
      onClick={onClick}
    >
      <FontAwesomeIcon icon="plus" size="lg" />
    </motion.div>
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

  const hideIconPicker = () => setIconPickerVisible(false);
  const ref = useRef();
  const { addClickOutsideEvent, removeClickOutsideEvent } = useClickOutside(
    ref,
    hideIconPicker
  );

  const { addOnKeyDownEvent, removeOnKeyDownEvent } = useKeyPress(
    "Escape",
    hideIconPicker
  );

  useEffect(() => {
    if (isIconPickerVisible) {
      addClickOutsideEvent();
      addOnKeyDownEvent();
    } else {
      removeClickOutsideEvent();
      removeOnKeyDownEvent();
    }
  }, [
    isIconPickerVisible,
    addClickOutsideEvent,
    removeClickOutsideEvent,
    addOnKeyDownEvent,
    removeOnKeyDownEvent,
  ]);
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
          onClick={(e) => {
            e.stopPropagation();
            setIconPickerVisible(!isIconPickerVisible);
          }}
        />
      </div>
      <AnimatePresence>
        {isIconPickerVisible && (
          <div className={styles["icon-picker"]} ref={ref}>
            <IconPicker
              onPick={(iconName) => {
                setPickedIcon(iconName);
                setIconPickerVisible(!isIconPickerVisible);
              }}
            />
          </div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={styles.buttons}
      >
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
      </motion.div>
    </form>
  );
}
