import React from "react";
import Title from "component/old/common/Title";
import { shallow } from "enzyme";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const TEST_CUSTOM_TITLE_TEXT = "Profile";
const TEST_CUSTOM_TITLE_ICON = faDatabase;

describe("Title component", () => {
  test("should render default Title", () => {
    const wrapper = shallow(<Title />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render custom Title", () => {
    const wrapper = shallow(
      <Title text={TEST_CUSTOM_TITLE_TEXT} icon={TEST_CUSTOM_TITLE_ICON} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("should render custom Title without icon", () => {
    const wrapper = shallow(
      <Title text={TEST_CUSTOM_TITLE_TEXT} icon={null} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
