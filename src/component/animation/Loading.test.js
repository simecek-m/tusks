import React from "react";
import Loading from "component/animation/Loading";
import { shallow } from "enzyme";

const TEST_LOADING_COMPLETE_HTML = <div>LOADING COMPLETED</div>;

describe("Loading component", () => {
  test("should render completed Loading", () => {
    const wrapper = shallow(<Loading>{TEST_LOADING_COMPLETE_HTML}</Loading>);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render Loading in progress", () => {
    const wrapper = shallow(
      <Loading loading={true}>{TEST_LOADING_COMPLETE_HTML}</Loading>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("should render Loading with error", () => {
    const wrapper = shallow(
      <Loading error={true}>{TEST_LOADING_COMPLETE_HTML}</Loading>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
