import React from "react";
import { TodoListWidget } from "component/todo/TodoListWidget";
import { shallow } from "enzyme";

describe("TodoListWidget component", () => {
  test("should render default", () => {
    const wrapper = shallow(<TodoListWidget />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render Work list", () => {
    const wrapper = shallow(<TodoListWidget title="Work" count={6} />);
    expect(wrapper).toMatchSnapshot();
  });
});
