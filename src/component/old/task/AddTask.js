import React from "react";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "component/old/task/AddTask.sass";

export class AddTask extends React.Component {
  state = {
    active: false
  };

  constructor(props) {
    super(props);
    this.taskInput = React.createRef();
  }

  addTask(text) {
    const { onAdd } = this.props;
    onAdd(text);
    this.setState({
      active: false
    });
  }

  keyDown(keyCode) {
    switch (keyCode) {
      case 27:
        this.setState({
          active: false
        });
        break;
      case 13:
        this.addTask(this.taskInput.current.value);
        break;
      default:
        break;
    }
  }

  render() {
    const { t } = this.props;
    const addTaskContent = this.state.active ? (
      <input
        className="add-task-input"
        autoFocus
        ref={this.taskInput}
        onBlur={e => this.addTask(e.target.value)}
        onKeyDown={e => this.keyDown(e.keyCode)}
      />
    ) : (
      <span
        className="add-task-text"
        onClick={() => this.setState({ active: true })}
      >
        {t("addTask.new")}
      </span>
    );
    return (
      <div className="add-task-component">
        <FontAwesomeIcon className="icon" icon={faPlus} />
        {addTaskContent}
      </div>
    );
  }
}

export default withTranslation()(AddTask);
