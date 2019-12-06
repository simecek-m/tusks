import React from "react";
import Settings from "component/menu/Settings";
import renderer from "react-test-renderer";
import ModalProvider from "modal/ModalProvider";

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
