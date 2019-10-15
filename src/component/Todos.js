import React from "react";
import { connect } from "react-redux";
import Lottie from "react-lottie";
import { withToastManager } from "react-toast-notifications";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import api, { setAuthorizationHeader } from "api";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import writeAnimation from "assets/animation/write.json";
import Title from "component/Title";
import Button from "component/Button";
import TodoListWidget from "component/TodoListWidget";
import Loading from "component/Loading";
import Menu from "component/Menu";

class Todos extends React.Component {
  state = {
    loading: true,
    error: false,
    list: []
  };

  constructor(props) {
    super(props);
    this.toastManager = props.toastManager;
  }

  componentDidMount() {
    api
      .get("/todos", setAuthorizationHeader(this.props.user))
      .then(response =>
        this.setState({
          list: response.data,
          loading: false
        })
      )
      .catch(error => {
        this.showNotification(error);
        this.setState({
          error: true,
          loading: false
        });
      });
  }

  showNotification(error) {
    if (error.response) {
      this.toastManager.add(
        `${error.response.data.message} (status: ${error.response.status})`,
        {
          appearance: "error",
          autoDismiss: true
        }
      );
    }
  }

  redirectTo(id) {
    const { history } = this.props;
    console.log(id);
    history.push(`/todos/${id}`);
  }

  render() {
    const { t } = this.props;
    const items = this.state.list.map(item => (
      <TodoListWidget
        onClick={() => this.redirectTo(item._id)}
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
        <Button icon={faPlus} text={t("todos.create")} />
      </div>
    );
    const content = items.length > 0 ? items : writeFirstTodoAnimation;
    return (
      <div>
        <Menu />
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

export default withRouter(
  withTranslation()(withToastManager(connect(mapStateToProps)(Todos)))
);
