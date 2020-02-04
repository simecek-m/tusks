import React from "react";
import Profile from "component/page/Profile";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "store/reducers";
import jsonwebtoken from "jsonwebtoken";
import ModalProvider from "modal/ModalProvider";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

const TEST_USER = {
  picture: "url-avatar",
  given_name: "Tony",
  family_name: "Stark",
  email: "tony@stark.com",
  authority: "accounts.google.com"
};

const INITIAL_STATE = {
  user: jsonwebtoken.sign(TEST_USER, "secret")
};

const store = createStore(reducers, INITIAL_STATE);

describe("Profile component", () => {
  test("should render Profile page component", () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <ModalProvider>
              <Profile />
            </ModalProvider>
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
