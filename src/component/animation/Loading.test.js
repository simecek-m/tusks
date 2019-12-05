import React from "react";
import Loading from "component/animation/Loading";
import renderer from "react-test-renderer";

const TEST_LOADING_COMPLETE_HTML = <div>LOADING COMPLETED</div>;

describe("Loading component", () => {
  test("should render completed Loading", () => {
    const component = renderer
      .create(<Loading>{TEST_LOADING_COMPLETE_HTML}</Loading>)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  test("should render Loading in progress", () => {
    const component = renderer
      .create(<Loading loading={true}>{TEST_LOADING_COMPLETE_HTML}</Loading>)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  test("should render Loading with error", () => {
    const component = renderer
      .create(<Loading error={true}>{TEST_LOADING_COMPLETE_HTML}</Loading>)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
