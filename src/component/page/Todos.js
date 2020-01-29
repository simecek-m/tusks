import React from "react";
import { connect } from "react-redux";
import Lottie from "react-lottie";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import api, { setAuthorizationHeader } from "api";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { showDangerNotificationWithStatus } from "notification";
import writeAnimation from "assets/animation/write.json";
import Title from "component/common/Title";
import Button from "component/button/Button";
import TodoListWidget from "component/todo/TodoListWidget";
import Loading from "component/animation/Loading";
import Settings from "component/menu/Settings";
import SettingsItem from "component/menu/SettingsItem";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "helper/router";
import { withModal } from "modal/withModal";
import { INPUT } from "modal/types";

class Todos extends React.Component {
  state = {
    loading: true,
    error: false,
    list: []
  };

  componentDidMount() {
    const { user } = this.props;
    api
      .get("/todos", setAuthorizationHeader(user))
      .then(response =>
        this.setState({
          list: response.data,
          loading: false
        })
      )
      .catch(error => {
        showDangerNotificationWithStatus(
          error.response.data.message,
          error.response.status
        );
        this.setState({
          error: true,
          loading: false
        });
      });
  }

  deleteTodoList(id, index) {
    const { user } = this.props;
    api
      .delete(`/todos/${id}`, setAuthorizationHeader(user))
      .then(() => {
        const list = this.state.list;
        list.splice(index, 1);
        this.setState({
          list
        });
      })
      .catch(error =>
        showDangerNotificationWithStatus(
          error.response.data.message,
          error.response.status
        )
      );
  }

  addTodoList = title => {
    const { user } = this.props;
    const todoList = { title };
    api
      .post(`/todos`, todoList, setAuthorizationHeader(user))
      .then(response => {
        const list = this.state.list;
        list.push(response.data);
        this.setState({
          list
        });
      })
      .catch(error =>
        showDangerNotificationWithStatus(
          error.response.data.message,
          error.response.status
        )
      );
  };

  openNewTodoListModal() {
    const { t, openModal } = this.props;
    openModal({
      type: INPUT,
      title: t("todos.modal.title"),
      text: t("todos.modal.text"),
      onConfirm: this.addTodoList
    });
  }

  render() {
    const { t } = this.props;
    const items = this.state.list.map((item, index) => (
      <TodoListWidget
        onClick={() => redirect(`/todos/${item._id}`)}
        onDelete={() => this.deleteTodoList(item._id, index)}
        key={item._id}
        title={item.title}
        count={item.tasks.filter(task => !task.completed).length}
      />
    ));
    const writeAnimationOptions = {
      loop: true,
      autoplay: true,
      animationData: writeAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    const writeFirstTodoAnimation = (
      <div>
        <h2>{t("todos.createFirstList")}</h2>
        <Lottie
          options={writeAnimationOptions}
          width={400}
          height={300}
          style={{ marginBottom: "50px" }}
          isClickToPauseDisabled={true}
        />
        <Button
          icon={faPlus}
          text={t("todos.create")}
          onClick={() => this.openNewTodoListModal()}
        />
      </div>
    );
    const content = items.length > 0 ? items : writeFirstTodoAnimation;
    return (
      <div class="animated fadeIn">
        <Settings>
          <SettingsItem
            icon={faPlusCircle}
            onClick={() => this.openNewTodoListModal()}
          />
        </Settings>
        <Title text={t("todos.title")} />
        <Loading loading={this.state.loading} error={this.state.error}>
          {content}
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

export default withModal(
  withRouter(withTranslation()(connect(mapStateToProps)(Todos)))
);
