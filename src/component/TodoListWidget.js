import React from "react";
import "component/TodoListWidget.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

function TodoListWidget({ title, count, onClick }) {
  return (
    <div className="container" onClick={onClick}>
      <div className="list-item">
        <span className="list-title">{title}</span>
        <span className="list-count">({count})</span>
      </div>
      <FontAwesomeIcon className="icon-trash" icon={faTrashAlt} />
    </div>
  );
}

export default TodoListWidget;
