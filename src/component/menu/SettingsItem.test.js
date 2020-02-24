import React from "react";
import SettingsItem from "component/menu/SettingsItem";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { shallow } from "enzyme";
import * as notification from "notification";

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

  test("should call default onClick function", () => {
    const notificationSpy = jest
      .spyOn(notification, "showUnsupportedFeatureNotification")
      .mockImplementation(() => {});
    const wrapper = shallow(<SettingsItem />);
    const item = wrapper.find(".settings-item-component");
    expect(notificationSpy).not.toHaveBeenCalled();
    item.simulate("click");
    expect(notificationSpy).toHaveBeenCalledTimes(1);
    notificationSpy.mockRestore();
  });

  test("should call onClick function", () => {
    const onClickMock = jest.fn();
    const wrapper = shallow(<SettingsItem onClick={onClickMock} />);
    const item = wrapper.find(".settings-item-component");
    expect(onClickMock).not.toHaveBeenCalled();
    item.simulate("click");
    expect(onClickMock).toHaveBeenCalledTimes(1);
    onClickMock.mockRestore();
  });
});
