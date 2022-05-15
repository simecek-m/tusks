import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { withTranslation } from "react-i18next";
import { withModal } from "modal/withModal";
import { CONFIRMATION } from "modal/types";
import "component/old/todo/TodoListWidget.sass";

export function TodoListWidget({
  title = "Unknown",
  count = "undefined",
  onClick,
  openModal,
  onDelete,
  t
}) {
  return (
    <div>
      <div className="todo-list-widget-component" onClick={onClick}>
        <div className="list-item">
          <span className="list-title">{title}</span>
          <span className="list-count">({count})</span>
        </div>
        <FontAwesomeIcon
          className="icon-trash"
          icon={faTrashAlt}
          onClick={e => {
            e.stopPropagation();
            openModal({
              type: CONFIRMATION,
              title: t("todoListWidget.modal.title"),
              text: t("todoListWidget.modal.text", { name: title }),
              onConfirm: () => onDelete()
            });
          }}
        />
      </div>
    </div>
  );
}

export default withModal(withTranslation()(TodoListWidget));
