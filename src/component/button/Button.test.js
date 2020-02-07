import React from "react";
import Button from "component/button/Button";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { shallow } from "enzyme";

const TEST_BUTTON_CUSTOM_TYPE = "warn";
const TEST_BUTTON_CUSTOM_TEXT = "send";
const TEST_BUTTON_CUSTOM_ICON = faDatabase;
const TEST_BUTTON_CUSTOM_CALLBACK = () => {};

describe("Button component", () => {
  test("should render default Button", () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render custom Button", () => {
    const wrapper = shallow(
      <Button
        icon={TEST_BUTTON_CUSTOM_ICON}
        text={TEST_BUTTON_CUSTOM_TEXT}
        onClick={TEST_BUTTON_CUSTOM_CALLBACK}
        type={TEST_BUTTON_CUSTOM_TYPE}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
