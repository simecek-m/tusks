import React from "react";
import Task from "component/task/Task";
import { shallow } from "enzyme";

const TEST_TASK_COMPLETED = {
  text: "Completed task",
  completed: true
};

const TEST_TASK_UNCOMPLETE = {
  text: "Uncompleted task",
  completed: false
};

describe("Task component", () => {
  test("should render default Task", () => {
    const wrapper = shallow(<Task />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render completed Task", () => {
    const wrapper = shallow(
      <Task
        text={TEST_TASK_COMPLETED.text}
        completed={TEST_TASK_COMPLETED.completed}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("should render uncomplete Task", () => {
    const wrapper = shallow(
      <Task
        text={TEST_TASK_UNCOMPLETE.text}
        completed={TEST_TASK_UNCOMPLETE.completed}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
