import React from "react";
import { Back } from "component/navigation/Back";
import { shallow } from "enzyme";

describe("Back component", () => {
  test("should render back", () => {
    const wrapper = shallow(<Back />);
    expect(wrapper).toMatchSnapshot();
  });
});
