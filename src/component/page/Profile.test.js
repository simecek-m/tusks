import React from "react";
import { Profile } from "component/page/Profile";
import jsonwebtoken from "jsonwebtoken";
import { shallow } from "enzyme";

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

const JWT_USER = jsonwebtoken.sign(TEST_USER, "secret");

describe("Profile component", () => {
  test("should render Profile page component", () => {
    const wrapper = shallow(<Profile user={JWT_USER} />);
    expect(wrapper).toMatchSnapshot();
  });
});
