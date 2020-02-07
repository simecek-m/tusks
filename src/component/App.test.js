import React from "react";
import App from "component/App";
import { shallow } from "enzyme";

describe("App component", () => {
  test("should render App", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
