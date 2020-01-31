import React from "react";
import renderer from "react-test-renderer";
import App from "component/App";
import { Provider } from "react-redux";
import { createPersistor, getStore } from "store";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

createPersistor();
const store = getStore();

describe("App component", () => {
  test("should render App", () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
