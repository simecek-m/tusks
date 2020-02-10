import React from "react";
import { About } from "component/page/About";
import { shallow } from "enzyme";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

describe("About component", () => {
  test("should render About page component", () => {
    const wrapper = shallow(<About />);
    expect(wrapper).toMatchSnapshot();
  });
});
