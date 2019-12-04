import React from "react";
import Title from "component/common/Title";
import renderer from "react-test-renderer";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const TEST_CUSTOM_TITLE_TEXT = "Profile";
const TEST_CUSTOM_TITLE_ICON = faDatabase;

describe("Title component", () => {
  test("should render default Title", () => {
    const component = renderer.create(<Title />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("should render custom Title", () => {
    const component = renderer
      .create(
        <Title text={TEST_CUSTOM_TITLE_TEXT} icon={TEST_CUSTOM_TITLE_ICON} />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  test("should render custom Title without icon", () => {
    const component = renderer
      .create(<Title text={TEST_CUSTOM_TITLE_TEXT} icon={null} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
