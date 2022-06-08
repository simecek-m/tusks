import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import propTypes from "prop-types";
import styles from "component/button/NewList.module.sass";
import { useState } from "react";
import IconPicker from "component/form/IconPicker";

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

NewList.propTypes = {
  onClick: propTypes.func.isRequired,
};

function NewListButton({ onClick }) {
  return (
    <div id={styles.button} onClick={onClick}>
      <FontAwesomeIcon icon="plus" size="lg" />
    </div>
  );
}

function NewListForm({ onClose }) {
  const [isIconPickerVisible, setIconPickerVisible] = useState(false);
  const [pickedIcon, setPickedIcon] = useState("list-check");
  return (
    <form>
      <div className={styles["todo-list-item"]}>
        <input placeholder="name" />
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
        <button onClick={() => console.log("save")} type="button">
          <FontAwesomeIcon icon="check" />
          save
        </button>
      </div>
    </form>
  );
}
