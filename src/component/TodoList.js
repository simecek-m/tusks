import React from "react";
import api, { setAuthorizationHeader } from "api";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withToastManager } from "react-toast-notifications";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Menu from "component/Menu";
import Title from "component/Title";
import Loading from "component/Loading";
import Back from "component/Back";
import Task from "component/Task";
import "component/TodoList.sass";

class TodoList extends React.Component {
  state = {
    todoList: null,
    loading: true,
    error: false
  };

  componentDidMount() {
    const { user, match } = this.props;
    const id = match.params.id;
    api
      .get(`/todos/${id}`, setAuthorizationHeader(user))
      .then(response =>
        this.setState({
          todoList: response.data,
          loading: false
        })
      )
      .catch(error => {
        console.error(error);
        this.setState({ loading: false, error: true });
      });
  }

  openNewTaskModal() {
    const warningMessge = "this feature is not supported yet...";
    console.warn(warningMessge);
    const { toastManager } = this.props;
    toastManager.add(warningMessge, {
      appearance: "warning",
      autoDismiss: true
    });
  }

  updateTask(index) {
    const todoList = this.state.todoList;
    const task = todoList.tasks[index];
    todoList.tasks[index].completed = !todoList.tasks[index].completed;
    this.setState({
      todoList
    });

    const { match, user } = this.props;
    const id = match.params.id;
    api
      .put(`/todos/${id}/tasks/${task._id}`, task, setAuthorizationHeader(user))
      .catch(error => {
        this.showNotification(error);
        todoList.tasks[index].completed = !todoList.tasks[index].completed;
        this.setState({
          todoList
        });
      });
  }

  showNotification(error) {
    const { toastManager } = this.props;
    if (error.response) {
      toastManager.add(
        `${error.response.data.message} (status: ${error.response.status})`,
        {
          appearance: "error",
          autoDismiss: true
        }
      );
    }
  }

  render() {
    const { t } = this.props;
    const tasks =
      this.state.todoList &&
      this.state.todoList.tasks.map((task, index) => (
        <Task
          text={task.text}
          key={index}
          completed={task.completed}
          onClick={() => this.updateTask(index)}
        />
      ));

    return (
      <div className="todo-list-component">
        <Back />
        <Menu />
        <Loading loading={this.state.loading} error={this.state.error}>
          <Title
            icon={faList}
            text={this.state.todoList && this.state.todoList.title}
          />
          <div className="tasks tasks-incomplete">
            {tasks &&
              tasks.filter(taskComponent => !taskComponent.props.completed)}
            <div className="add-task" onClick={() => this.openNewTaskModal()}>
              <FontAwesomeIcon className="icon" icon={faPlus} />
              {t("todo-list.new")}
            </div>
          </div>
          <hr className="divider" />
          <div className="tasks tasks-completed">
            {tasks &&
              tasks.filter(taskComponent => taskComponent.props.completed)}
          </div>
        </Loading>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withToastManager(
  withTranslation()(withRouter(connect(mapStateToProps)(TodoList)))
);
