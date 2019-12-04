import React from "react";
import SettingsItem from "component/menu/SettingsItem";
import renderer from "react-test-renderer";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const TEST_CUSTOM_ICON = faDatabase;

describe("SettingsItem component", () => {
  test("should render default SettingsItem", () => {
    const component = renderer.create(<SettingsItem />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("should render custom SettingsItem", () => {
    const component = renderer
      .create(<SettingsItem icon={TEST_CUSTOM_ICON} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
