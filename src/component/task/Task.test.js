import React from "react";
import renderer from "react-test-renderer";
import Task from "component/task/Task";

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
    const component = renderer.create(<Task />);
    expect(component).toMatchSnapshot();
  });

  test("should render completed Task", () => {
    const component = renderer.create(
      <Task
        text={TEST_TASK_COMPLETED.text}
        completed={TEST_TASK_COMPLETED.completed}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("should render uncomplete Task", () => {
    const component = renderer.create(
      <Task
        text={TEST_TASK_UNCOMPLETE.text}
        completed={TEST_TASK_UNCOMPLETE.completed}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
