import React from "react";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle as SolidFaCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import "component/task/Task.sass";

function Task({
  text = "Task",
  completed = false,
  onClick = null,
  onDelete = null
}) {
  return completed ? (
    <div className="task-component completed" onClick={onClick}>
      <FontAwesomeIcon className="icon" icon={faCheckCircle} />
      {text}
      <FontAwesomeIcon
        className="icon-trash"
        icon={faTrashAlt}
        onClick={onDelete}
      />
    </div>
  ) : (
    <div className="task-component incomplete" onClick={onClick}>
      <FontAwesomeIcon className="icon" icon={SolidFaCheckCircle} />
      {text}
    </div>
  );
}

export default Task;
