import React from "react";
import "component/Task.sass";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle as SolidFaCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Task({ text = "Task", completed = false, onClick = null }) {
  return completed ? (
    <div className="task-component completed" onClick={onClick}>
      <FontAwesomeIcon className="icon" icon={faCheckCircle} />
      {text}
    </div>
  ) : (
    <div className="task-component incomplete" onClick={onClick}>
      <FontAwesomeIcon className="icon" icon={SolidFaCheckCircle} />
      {text}
    </div>
  );
}

export default Task;
