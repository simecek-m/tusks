import React from "react";
import Error from "component/error/Error";
import renderer from "react-test-renderer";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

describe("Error component", () => {
  test("should render Error", () => {
    const component = renderer.create(<Error />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
