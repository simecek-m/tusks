import React from "react";
import Settings from "component/menu/Settings";
import renderer from "react-test-renderer";
import ModalProvider from "modal/ModalProvider";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

describe("Settings component", () => {
  test("should render Settings", () => {
    const component = renderer
      .create(
        <ModalProvider>
          <Settings />
        </ModalProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
