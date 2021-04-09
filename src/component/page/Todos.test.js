import React from "react";
import { Todos } from "component/page/todos";
import { shallow } from "enzyme";
import api from "api";
import * as notification from "notification";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

const INIT_STATE = {
  loading: true,
  error: false,
  list: []
};

const TEST_USER_JWT = "xxxxx.yyyyy.zzzzz";

const TEST_TODOS_ORIGINAL = [
  {
    _id: 1,
    title: "Work",
    tasks: [
      {
        _id: 1,
        text: "checkout GitHub",
        completed: false
      },
      {
        _id: 2,
        text: "install Yarn",
        completed: true
      },
      {
        _id: 3,
        text: "fix ISS-895 issue",
        completed: false
      }
    ]
  },
  {
    _id: 2,
    title: "Shop",
    tasks: [
      {
        _id: 4,
        text: "buy milk",
        completed: true
      },
      {
        _id: 5,
        text: "buy candies",
        completed: true
      },
      {
        _id: 6,
        text: "buy cheese",
        completed: false
      }
    ]
  }
];

const ERROR_MESSAGE = "Error occured during fetching data!";
const ERROR_STATUS = 404;

const apiGetSpy = jest.spyOn(api, "get");
const apiPostSpy = jest.spyOn(api, "post");
const apiPutSpy = jest.spyOn(api, "put");
const apiDeleteSpy = jest.spyOn(api, "delete");

const notificationSpy = jest.spyOn(
  notification,
  "showDangerNotificationWithStatus"
);

afterEach(() => {
  apiGetSpy.mockReset();
  apiPostSpy.mockReset();
  apiPutSpy.mockReset();
  apiDeleteSpy.mockReset();
  notificationSpy.mockReset();
});

describe("TodoList component", () => {
  test("should render default Todos", () => {
    const wrapper = shallow(<Todos />);
    expect(wrapper).toMatchSnapshot();
    const state = wrapper.state();
    expect(state).toEqual(INIT_STATE);
  });

  test("should fetch data from API after mounting", async () => {
    const TEST_TODOS = JSON.parse(JSON.stringify(TEST_TODOS_ORIGINAL));
    apiGetSpy.mockResolvedValue({ data: TEST_TODOS });
    const wrapper = shallow(<Todos user={TEST_USER_JWT} />, {
      disableLifecycleMethods: true
    });
    await wrapper.instance().componentDidMount();
    expect(apiGetSpy).toHaveBeenCalledTimes(1);
    expect(apiGetSpy).toHaveBeenCalledWith("/lists", {
      headers: { Authorization: `Bearer ${TEST_USER_JWT}` }
    });
    const state = wrapper.state();
    expect(state.error).toBeFalsy();
    expect(state.loading).toBeFalsy();
    expect(state.list).toEqual(TEST_TODOS);
    expect(wrapper).toMatchSnapshot();
  });

  test("should display error notification after fail fetch data ", async () => {
    apiGetSpy.mockRejectedValue({
      status: ERROR_STATUS,
      response: {
        status: ERROR_STATUS,
        data: { message: ERROR_MESSAGE }
      }
    });
    const wrapper = shallow(<Todos user={TEST_USER_JWT} />, {
      disableLifecycleMethods: true
    });
    await wrapper.instance().componentDidMount();
    expect(apiGetSpy).toHaveBeenCalledTimes(1);
    expect(apiGetSpy).toHaveBeenCalledWith("/lists", {
      headers: { Authorization: `Bearer ${TEST_USER_JWT}` }
    });
    await wrapper.update();
    expect(notificationSpy).toHaveBeenCalledTimes(1);
    expect(notificationSpy).toHaveBeenCalledWith(ERROR_MESSAGE, ERROR_STATUS);
    const state = wrapper.state();
    expect(state.error).toBeTruthy();
    expect(state.loading).toBeFalsy();
    expect(state.list).toEqual([]);
  });

  test("should open new TodoList modal", () => {
    const openModalMock = jest.fn();
    const wrapper = shallow(
      <Todos user={TEST_USER_JWT} openModal={openModalMock} />,
      {
        disableLifecycleMethods: true
      }
    );
    const instance = wrapper.instance();
    instance.openNewTodoListModal();
    expect(openModalMock).toHaveBeenCalledTimes(1);
    expect(openModalMock).toHaveBeenCalledWith({
      onConfirm: expect.any(Function),
      text: "todos.modal.text",
      title: "todos.modal.title",
      type: "input"
    });
  });

  test("should add TodoList", async () => {
    const TEST_CREATED_TODO_LIST = { _id: 1, title: "New List" };
    const TEST_CREATED_TODO_LIST_COPY = JSON.parse(
      JSON.stringify(TEST_CREATED_TODO_LIST)
    );
    apiGetSpy.mockResolvedValue({ data: [] });
    apiPostSpy.mockResolvedValue({ data: TEST_CREATED_TODO_LIST_COPY });
    const wrapper = await shallow(<Todos user={TEST_USER_JWT} />);
    const instance = wrapper.instance();
    let state = wrapper.state();
    expect(state.error).toBeFalsy();
    expect(state.loading).toBeFalsy();
    expect(state.list).toEqual([]);
    await instance.addTodoList(TEST_CREATED_TODO_LIST.title);
    expect(apiPostSpy).toHaveBeenCalledTimes(1);
    expect(apiPostSpy).toHaveBeenCalledWith(
      "/lists",
      { title: TEST_CREATED_TODO_LIST_COPY.title },
      { headers: { Authorization: `Bearer ${TEST_USER_JWT}` } }
    );
    state = wrapper.state();
    expect(state.list).toEqual([TEST_CREATED_TODO_LIST]);
  });

  test("should show error notification after fail add new list", async () => {
    const TEST_CREATED_TODO_LIST = { _id: 1, title: "New List" };
    apiGetSpy.mockResolvedValue({ data: [] });
    apiPostSpy.mockRejectedValue({
      status: ERROR_STATUS,
      response: {
        status: ERROR_STATUS,
        data: { message: ERROR_MESSAGE }
      }
    });
    const wrapper = await shallow(<Todos user={TEST_USER_JWT} />);
    const instance = wrapper.instance();
    await instance.addTodoList(TEST_CREATED_TODO_LIST.title);
    await wrapper.update();
    expect(apiPostSpy).toHaveBeenCalledTimes(1);
    expect(apiPostSpy).toHaveBeenCalledWith(
      "/lists",
      { title: TEST_CREATED_TODO_LIST.title },
      { headers: { Authorization: `Bearer ${TEST_USER_JWT}` } }
    );
    expect(notificationSpy).toHaveBeenCalledTimes(1);
    expect(notificationSpy).toHaveBeenCalledWith(ERROR_MESSAGE, ERROR_STATUS);
  });

  test("should delete TodoList", async () => {
    const TODO_LIST_INDEX = 0;
    const TEST_TODOS = JSON.parse(JSON.stringify(TEST_TODOS_ORIGINAL));
    apiGetSpy.mockResolvedValue({ data: TEST_TODOS });
    apiDeleteSpy.mockResolvedValue({});
    const wrapper = await shallow(<Todos user={TEST_USER_JWT} />);
    let state = wrapper.state();
    expect(state.loading).toBeFalsy();
    expect(state.error).toBeFalsy();
    expect(state.list).toHaveLength(2);
    expect(state.list).toEqual(TEST_TODOS_ORIGINAL);
    const instance = wrapper.instance();
    const ID = state.list[TODO_LIST_INDEX]._id;
    await instance.deleteTodoList(ID, TODO_LIST_INDEX);
    expect(apiDeleteSpy).toHaveBeenCalledTimes(1);
    expect(apiDeleteSpy).toHaveBeenCalledWith(`/lists/${ID}`, {
      headers: { Authorization: `Bearer ${TEST_USER_JWT}` }
    });
    state = wrapper.state();
    expect(state.list).toHaveLength(1);
  });

  test("should display error notification after fail delete list", async () => {
    const ID = 0;
    const INDEX = 0;
    apiGetSpy.mockResolvedValue({ data: [] });
    apiDeleteSpy.mockRejectedValue({
      status: ERROR_STATUS,
      response: {
        status: ERROR_STATUS,
        data: { message: ERROR_MESSAGE }
      }
    });
    const wrapper = await shallow(<Todos user={TEST_USER_JWT} />);
    const instance = wrapper.instance();
    await instance.deleteTodoList(ID, INDEX);
    await wrapper.update();
    expect(apiDeleteSpy).toHaveBeenCalledTimes(1);
    expect(apiDeleteSpy).toHaveBeenCalledWith(`/lists/${ID}`, {
      headers: { Authorization: `Bearer ${TEST_USER_JWT}` }
    });
    expect(notificationSpy).toHaveBeenCalledTimes(1);
    expect(notificationSpy).toHaveBeenCalledWith(ERROR_MESSAGE, ERROR_STATUS);
  });
});
