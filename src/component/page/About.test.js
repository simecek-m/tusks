import React from "react";
import About from "component/page/About";
import renderer from "react-test-renderer";
import ModalProvider from "modal/ModalProvider";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

describe("About component", () => {
  test("should render About page component", () => {
    const component = renderer
      .create(
        <MemoryRouter>
          <ModalProvider>
            <About />
          </ModalProvider>
        </MemoryRouter>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
