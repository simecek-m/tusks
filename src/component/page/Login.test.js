import React from "react";
import Login from "component/page/Login";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "store/reducers";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

const store = createStore(reducers);

describe("Login component", () => {
  test("should render Login page component", () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <Login />
        </Provider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
