import React from "react";
import "component/todo/TodoListWidget.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { withTranslation } from "react-i18next";
import ConfirmationModal from "component/modal/ConfirmationModal";

class TodoListWidget extends React.Component {
  state = {
    visibleModal: false
  };

  setModalVisibility(visible) {
    this.setState({
      visibleModal: visible
    });
  }

  render() {
    const { title, count, onClick, onDelete, t } = this.props;
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
              this.setModalVisibility(true);
            }}
          />
        </div>
        <ConfirmationModal
          title={t("todoListWidget.modal.title")}
          text={t("todoListWidget.modal.text", { name: title })}
          visible={this.state.visibleModal}
          onClose={() => this.setModalVisibility(false)}
          onConfirm={() => onDelete()}
        />
      </div>
    );
  }
}

export default withTranslation()(TodoListWidget);
