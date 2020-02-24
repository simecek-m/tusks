import React from "react";
import { Back } from "component/navigation/Back";
import { shallow } from "enzyme";

const mockHistory = {
  goBack: () => {}
};

describe("Back component", () => {
  test("should render back", () => {
    const wrapper = shallow(<Back />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should return to previous page", () => {
    const historySpy = jest.spyOn(mockHistory, "goBack");
    const wrapper = shallow(<Back history={mockHistory} />);
    wrapper.find("#back-component").simulate("click");
    expect(historySpy).toBeCalledTimes(1);
    historySpy.mockRestore();
  });
});
