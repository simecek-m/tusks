import React from "react";
import { Settings } from "component/menu/Settings";
import { shallow } from "enzyme";
import { SELECT } from "modal/types";
import csFlag from "assets/image/flag/cs.png";
import enFlag from "assets/image/flag/en.png";
import * as helper from "helper/router";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

const redirectSpy = jest.spyOn(helper, "redirect");

afterEach(() => {
  redirectSpy.mockReset();
});

describe("Settings component", () => {
  test("should render default Settings", () => {
    const wrapper = shallow(<Settings />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render Settings after expand", () => {
    const wrapper = shallow(<Settings />);
    const icon = wrapper.find(".settings-component-switch");
    icon.simulate("click");
    expect(wrapper).toMatchSnapshot();
  });

  test("should set default expanded state to false", () => {
    const wrapper = shallow(<Settings />);
    const state = wrapper.state();
    expect(state.expanded).toBeFalsy();
  });

  test("should switch between expanded states (true / false)", async () => {
    const wrapper = await shallow(<Settings />);
    let state = wrapper.state();
    expect(state.expanded).toBeFalsy();
    const instance = wrapper.instance();
    await instance.switchExpanded();
    state = wrapper.state();
    expect(state.expanded).toBeTruthy();
    await instance.switchExpanded();
    state = wrapper.state();
    expect(state.expanded).toBeFalsy();
  });

  test("should open modal for change language", async () => {
    const openModalMock = jest.fn();
    const wrapper = await shallow(<Settings openModal={openModalMock} />);
    const instance = wrapper.instance();
    await instance.openChangeLanguageModal();
    expect(openModalMock).toHaveBeenCalledTimes(1);
    expect(openModalMock).toHaveBeenCalledWith({
      type: SELECT,
      title: "settings.localization.modal.title",
      text: "settings.localization.modal.text",
      options: [
        {
          image: enFlag,
          text: "settings.localization.modal.language.english",
          onClick: expect.any(Function)
        },
        {
          image: csFlag,
          text: "settings.localization.modal.language.czech",
          onClick: expect.any(Function)
        }
      ]
    });
    openModalMock.mockRestore();
  });

  test("should redirect to /", async () => {
    const wrapper = await shallow(<Settings />);
    const elem = wrapper.find("#settings-item-home");
    await elem.simulate("click");
    expect(redirectSpy).toHaveBeenCalledTimes(1);
    expect(redirectSpy).toHaveBeenCalledWith("/");
  });

  test("should redirect to /profile", async () => {
    const wrapper = await shallow(<Settings />);
    const elem = wrapper.find("#settings-item-profile");
    await elem.simulate("click");
    expect(redirectSpy).toHaveBeenCalledTimes(1);
    expect(redirectSpy).toHaveBeenCalledWith("/profile");
  });

  test("should redirect to /profile", async () => {
    const openModalMock = jest.fn();
    const wrapper = await shallow(<Settings openModal={openModalMock} />);
    const elem = wrapper.find("#settings-item-language");
    await elem.simulate("click");
    expect(openModalMock).toHaveBeenCalledTimes(1);
    openModalMock.mockRestore();
  });

  test("should redirect to /about", async () => {
    const wrapper = await shallow(<Settings />);
    const elem = wrapper.find("#settings-item-about");
    await elem.simulate("click");
    expect(redirectSpy).toHaveBeenCalledTimes(1);
    expect(redirectSpy).toHaveBeenCalledWith("/about");
  });
});
