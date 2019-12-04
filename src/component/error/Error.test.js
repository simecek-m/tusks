import React from "react";
import Error from "component/error/Error";
import renderer from "react-test-renderer";

describe("Error component", () => {
  test("should render Error", () => {
    const component = renderer.create(<Error />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
