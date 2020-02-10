import React from "react";
import { Back } from "component/navigation/Back";
import { shallow } from "enzyme";

const mockHistory = {
  goBack: () => {}
};

const spy = jest.spyOn(mockHistory, "goBack");

describe("Back component", () => {
  test("should render back", () => {
    const wrapper = shallow(<Back />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should return to previous page", () => {
    const wrapper = shallow(<Back history={mockHistory} />);
    wrapper.find("#back-component").simulate("click");
    expect(spy).toBeCalledTimes(1);
  });
});
