import React from "react";
import { shallow } from "enzyme";
import { AddTask } from "component/task/AddTask";

const TASK_STATE_NOT_ACTIVE = {
  active: false
};

const TASK_STATE_ACTIVE = {
  active: true
};

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

const onAddMock = jest.fn();

afterEach(() => {
  onAddMock.mockReset();
});

const TASK_TEXT = "TEST TASK";

describe("AddTask component", () => {
  test("should render default component", () => {
    const wrapper = shallow(<AddTask />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should switch state to active", () => {
    const wrapper = shallow(<AddTask />);
    let state = wrapper.state();
    expect(wrapper).toMatchSnapshot();
    expect(state).toEqual(TASK_STATE_NOT_ACTIVE);
    wrapper.find(".add-task-text").simulate("click");
    state = wrapper.state();
    expect(state).toEqual(TASK_STATE_ACTIVE);
    expect(wrapper).toMatchSnapshot();
  });

  test("should add new task", () => {
    const wrapper = shallow(<AddTask onAdd={onAddMock} />);
    const instance = wrapper.instance();
    expect(onAddMock).not.toHaveBeenCalled();
    instance.addTask(TASK_TEXT);
    expect(onAddMock).toHaveBeenCalledTimes(1);
    expect(onAddMock).toHaveBeenCalledWith(TASK_TEXT);
  });

  test("should add Task after Enter is pressed", () => {
    const KEY_CODE_ENTER = 13;
    const wrapper = shallow(<AddTask onAdd={onAddMock} />);
    const instance = wrapper.instance();
    instance.taskInput = { current: { value: TASK_TEXT } };
    instance.keyDown(KEY_CODE_ENTER);
    expect(onAddMock).toHaveBeenCalledTimes(1);
    expect(onAddMock).toHaveBeenCalledWith(TASK_TEXT);
  });

  test("should change state after ESC is pressed", () => {
    const KEY_CODE_ESC = 27;
    const wrapper = shallow(<AddTask />);
    let state = wrapper.state();
    expect(state.active).toBeFalsy();
    const instance = wrapper.instance();
    const input = wrapper.find(".add-task-text");
    expect(input).not.toBeNull();
    input.simulate("click");
    state = wrapper.state();
    expect(state.active).toBeTruthy();
    instance.keyDown(KEY_CODE_ESC);
    state = wrapper.state();
    expect(state.active).toBeFalsy();
  });
});
