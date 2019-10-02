import React from "react";
import TodoListWidget from "component/TodoListWidget";
import UserWidget from "component/UserWidget";
import { connect } from "react-redux";
import api, { setAuthorizationHeader } from "api";
import Loading from "component/Loading";
import Lottie from "react-lottie";
import writeAnimation from "assets/animation/write.json";
import Button from "component/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { withToastManager } from "react-toast-notifications";
import Title from "component/Title";

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

  render() {
    const items = this.state.list.map(item => (
      <TodoListWidget
        key={item._id}
        title={item.title}
        count={item.tasks.length}
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
        <h2>Write your first todo list:</h2>
        <Lottie
          options={writeAnimationOptions}
          width={400}
          height={300}
          style={{ "margin-bottom": "50px" }}
          isClickToPauseDisabled={true}
        />
        <Button icon={faPlus} text="Create" />
      </div>
    );
    const content = items.length > 0 ? items : writeFirstTodoAnimation;
    return (
      <div>
        <UserWidget />
        <Title text="to-do" />
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

export default withToastManager(connect(mapStateToProps)(Todos));
