import React from "react";
import { Login } from "component/old/page/Login";
import { shallow } from "enzyme";
import jsonwebtoken from "jsonwebtoken";
import * as notifications from "notification";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

const MOCK_USER_TOKEN = "xxxxx.yyyyy.zzzzz";

const MOCK_USER = {
  picture: "url-avatar",
  given_name: "Tony",
  family_name: "Stark",
  email: "tony@stark.com",
  authority: "accounts.google.com",
  locale: "en"
};

const mockSetLocale = jest.fn();
const mockLogin = jest.fn();
const mockJwtDecode = jest.spyOn(jsonwebtoken, "decode");

afterEach(() => {
  mockSetLocale.mockReset();
  mockLogin.mockReset();
  mockJwtDecode.mockReset();
});

describe("Login component", () => {
  test("should render Login page component", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should login successfully", async () => {
    mockJwtDecode.mockReturnValue(MOCK_USER);
    const wrapper = shallow(
      <Login setLocale={mockSetLocale} login={mockLogin} />
    );
    const instance = wrapper.instance();
    await instance.loginSuccessCallback({ tokenId: MOCK_USER_TOKEN });
    expect(mockSetLocale).toHaveBeenCalledTimes(1);
    expect(mockSetLocale).toHaveBeenCalledWith(MOCK_USER.locale);
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith(MOCK_USER_TOKEN);
  });

  test("should show notification after login failed - no JWT", async () => {
    const spyNotifications = jest.spyOn(
      notifications,
      "showDangerNotification"
    );
    const wrapper = shallow(
      <Login setLocale={mockSetLocale} login={mockLogin} />
    );
    const instance = wrapper.instance();
    await instance.loginSuccessCallback({});
    expect(spyNotifications).toHaveBeenCalledTimes(1);
    expect(spyNotifications).toHaveBeenLastCalledWith(
      "login.loginFailedTitle",
      "login.loginFailedMessage"
    );
    spyNotifications.mockRestore();
  });

  test("should show notification after login failed - no JWT", async () => {
    const spyNotifications = jest.spyOn(
      notifications,
      "showDangerNotification"
    );
    const wrapper = shallow(
      <Login setLocale={mockSetLocale} login={mockLogin} />
    );
    const instance = wrapper.instance();
    await instance.loginFailCallback();
    expect(spyNotifications).toHaveBeenCalledTimes(1);
    expect(spyNotifications).toHaveBeenLastCalledWith(
      "login.loginFailedTitle",
      "login.loginFailedMessage"
    );
    spyNotifications.mockRestore();
  });
});
