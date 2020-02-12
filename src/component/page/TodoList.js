import React from "react";
import api, { setAuthorizationHeader } from "api";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Title from "component/common/Title";
import Loading from "component/animation/Loading";
import Back from "component/navigation/Back";
import Task from "component/task/Task";
import AddTask from "component/task/AddTask";
import "component/page/TodoList.sass";

export class TodoList extends React.Component {
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
      .catch(() => this.setState({ loading: false, error: true }));
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
    if (error.response) {
      // TODO: show notification
    }
  }

  deleteTask(taskId, index) {
    const { match, user } = this.props;
    const id = match.params.id;
    api
      .delete(`/todos/${id}/tasks/${taskId}`, setAuthorizationHeader(user))
      .then(() => {
        const todoList = this.state.todoList;
        todoList.tasks.splice(index, 1);
        this.setState({
          todoList
        });
      })
      .catch(error => {
        console.error(error);
        // TODO: show notification
      });
  }

  addTask = text => {
    if (text && text.length > 0) {
      const { match, user } = this.props;
      const id = match.params.id;
      const task = { text, completed: false };
      api
        .post(`/todos/${id}/tasks`, task, setAuthorizationHeader(user))
        .then(response => {
          const todoList = this.state.todoList;
          todoList.tasks.push(response.data);
          this.setState({
            todoList
          });
        })
        .catch(error => {
          console.error(error);
          // TODO: show notification
        });
    }
  };

  render() {
    const tasks =
      this.state.todoList &&
      this.state.todoList.tasks.map((task, index) => (
        <Task
          text={task.text}
          key={index}
          completed={task.completed}
          onClick={() => this.updateTask(index)}
          onDelete={e => {
            e.stopPropagation();
            this.deleteTask(task._id, index);
          }}
        />
      ));
    return (
      <div className="todo-list-component animated fadeIn">
        <Back />
        <Loading loading={this.state.loading} error={this.state.error}>
          <Title
            icon={faList}
            text={this.state.todoList && this.state.todoList.title}
          />
          <div className="tasks tasks-incomplete">
            {tasks &&
              tasks.filter(taskComponent => !taskComponent.props.completed)}
            <AddTask onAdd={this.addTask} />
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

export default withRouter(connect(mapStateToProps)(TodoList));
