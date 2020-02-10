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
});
