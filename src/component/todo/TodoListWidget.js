import React from "react";
import "component/todo/TodoListWidget.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { withTranslation } from "react-i18next";

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
    const { title, count, onClick } = this.props;
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
      </div>
    );
  }
}

export default withTranslation()(TodoListWidget);
