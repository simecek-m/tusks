import React from "react";
import { Settings } from "component/menu/Settings";
import { shallow } from "enzyme";

describe("Settings component", () => {
  test("should render default Settings", () => {
    const wrapper = shallow(<Settings />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render Settings after expand", () => {
    const wrapper = shallow(<Settings />);
    const icon = wrapper.find(".settings-component-button");
    icon.simulate("click");
    expect(wrapper).toMatchSnapshot();
  });
});
