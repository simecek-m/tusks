import React from "react";
import Button from "component/button/Button";
import renderer from "react-test-renderer";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const TEST_BUTTON_CUSTOM_TYPE = "warn";
const TEST_BUTTON_CUSTOM_TEXT = "send";
const TEST_BUTTON_CUSTOM_ICON = faDatabase;
const TEST_BUTTON_CUSTOM_CALLBACK = () => {};

describe("Button component", () => {
  test("should render default Button", () => {
    const component = renderer.create(<Button />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("should render custom Button", () => {
    const component = renderer
      .create(
        <Button
          icon={TEST_BUTTON_CUSTOM_ICON}
          text={TEST_BUTTON_CUSTOM_TEXT}
          onClick={TEST_BUTTON_CUSTOM_CALLBACK}
          type={TEST_BUTTON_CUSTOM_TYPE}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
