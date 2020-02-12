import React from "react";
import { TodoList } from "component/page/TodoList";
import { shallow } from "enzyme";
import api from "api";

const MOCK_ROUTER = {
  params: {
    id: 1
  }
};

const INIT_STATE = {
  loading: true,
  error: false,
  todoList: null
};

const TEST_TODO_LIST_ORIGINAL = {
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
};

const apiGetSpy = jest.spyOn(api, "get");
const apiPostSpy = jest.spyOn(api, "post");
const apiPutSpy = jest.spyOn(api, "put");
const apiDeleteSpy = jest.spyOn(api, "delete");

afterEach(() => {
  apiGetSpy.mockReset();
  apiPostSpy.mockReset();
  apiPutSpy.mockReset();
  apiDeleteSpy.mockReset();
});

describe("TodoList component", () => {
  test("should render default TodoList", () => {
    const wrapper = shallow(<TodoList match={MOCK_ROUTER} />);
    expect(wrapper).toMatchSnapshot();
    const state = wrapper.state();
    expect(state).toEqual(INIT_STATE);
  });

  test("should fetch data from API after mounting", async () => {
    const TEST_TODO_LIST = JSON.parse(JSON.stringify(TEST_TODO_LIST_ORIGINAL));
    apiGetSpy.mockResolvedValue({ data: TEST_TODO_LIST });
    const wrapper = shallow(<TodoList match={MOCK_ROUTER} />, {
      disableLifecycleMethods: true
    });
    await wrapper.instance().componentDidMount();
    expect(apiGetSpy).toHaveBeenCalledTimes(1);
    expect(apiGetSpy).toHaveBeenCalledWith(`/todos/${MOCK_ROUTER.params.id}`, {
      headers: { Authorization: "Bearer undefined" }
    });
    const state = wrapper.state();
    expect(state.todoList).toEqual(TEST_TODO_LIST_ORIGINAL);
    expect(state.loading).toBeFalsy();
    expect(state.error).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  test("should change state after error", async () => {
    apiGetSpy.mockRejectedValue({ status: 401 });
    const wrapper = shallow(<TodoList match={MOCK_ROUTER} />, {
      disableLifecycleMethods: true
    });
    await wrapper.instance().componentDidMount();
    expect(apiGetSpy).toHaveBeenCalledTimes(1);
    expect(apiGetSpy).toHaveBeenCalledWith(`/todos/${MOCK_ROUTER.params.id}`, {
      headers: { Authorization: "Bearer undefined" }
    });
    await wrapper.update();
    const state = wrapper.state();
    expect(state.todoList).toBeNull();
    expect(state.loading).toBeFalsy();
    expect(state.error).toBeTruthy();
  });

  test("should add task", async () => {
    const NEW_TASK = { _id: 1, text: "buy milk", completed: false };
    apiPostSpy.mockResolvedValue({ data: NEW_TASK });
    apiGetSpy.mockResolvedValue({ data: { title: "Shop", tasks: [] } });
    const wrapper = await shallow(<TodoList match={MOCK_ROUTER} />);
    let state = wrapper.state();
    expect(apiGetSpy).toHaveBeenCalledTimes(1);
    expect(state.todoList.tasks).toEqual([]);
    await wrapper.instance().addTask(NEW_TASK.text);
    expect(apiPostSpy).toHaveBeenCalledTimes(1);
    expect(apiPostSpy).toHaveBeenCalledWith(
      `/todos/${MOCK_ROUTER.params.id}/tasks`,
      { text: NEW_TASK.text, completed: false },
      { headers: { Authorization: "Bearer undefined" } }
    );
    state = wrapper.state();
    expect(state.todoList.tasks).toEqual([NEW_TASK]);
    expect(wrapper).toMatchSnapshot();
  });

  test("should update task", async () => {
    const UPDATED_TASK_INDEX = 2;
    const TEST_TODO_LIST = JSON.parse(JSON.stringify(TEST_TODO_LIST_ORIGINAL));
    const UPDATED_TODO_LIST = JSON.parse(
      JSON.stringify(TEST_TODO_LIST_ORIGINAL)
    );
    UPDATED_TODO_LIST.tasks[UPDATED_TASK_INDEX].completed = !UPDATED_TODO_LIST
      .tasks[UPDATED_TASK_INDEX].completed;
    apiGetSpy.mockResolvedValue({ data: TEST_TODO_LIST });
    apiPutSpy.mockResolvedValue({});
    const wrapper = await shallow(<TodoList match={MOCK_ROUTER} />);
    const state = wrapper.state();
    expect(state.todoList.tasks).toEqual(TEST_TODO_LIST_ORIGINAL.tasks);
    await wrapper.instance().updateTask(UPDATED_TASK_INDEX);
    expect(apiPutSpy).toHaveBeenCalledTimes(1);
    expect(apiPutSpy).toHaveBeenCalledWith(
      `/todos/${MOCK_ROUTER.params.id}/tasks/${TEST_TODO_LIST.tasks[UPDATED_TASK_INDEX]._id}`,
      UPDATED_TODO_LIST.tasks[UPDATED_TASK_INDEX],
      { headers: { Authorization: "Bearer undefined" } }
    );
    expect(state.todoList.tasks).toEqual(UPDATED_TODO_LIST.tasks);
    expect(wrapper).toMatchSnapshot();
  });

  test("should delete task", async () => {
    const TASK = { _id: 1, text: "buy milk", completed: false };
    const TODO_LIST = { title: "Shop", tasks: [TASK] };
    apiDeleteSpy.mockResolvedValue({});
    apiGetSpy.mockResolvedValue({
      data: JSON.parse(JSON.stringify(TODO_LIST))
    });
    const wrapper = await shallow(<TodoList match={MOCK_ROUTER} />);
    const state = wrapper.state();
    expect(state.error).toBeFalsy();
    expect(state.loading).toBeFalsy();
    expect(state.todoList).toEqual(TODO_LIST);
    await wrapper.instance().deleteTask(TASK._id, 0);
    expect(apiDeleteSpy).toHaveBeenCalledTimes(1);
    expect(apiDeleteSpy).toHaveBeenCalledWith(
      `/todos/${MOCK_ROUTER.params.id}/tasks/${TASK._id}`,
      { headers: { Authorization: "Bearer undefined" } }
    );
    expect(state.todoList.tasks).toEqual([]);
    expect(wrapper).toMatchSnapshot();
  });
});
