import React from "react";
import SettingsItem from "component/menu/SettingsItem";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { shallow } from "enzyme";

const TEST_CUSTOM_ICON = faDatabase;

describe("SettingsItem component", () => {
  test("should render default SettingsItem", () => {
    const wrapper = shallow(<SettingsItem />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render custom SettingsItem", () => {
    const wrapper = shallow(<SettingsItem icon={TEST_CUSTOM_ICON} />);
    expect(wrapper).toMatchSnapshot();
  });
});
