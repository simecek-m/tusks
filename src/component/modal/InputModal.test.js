import React from "react";
import { InputModal } from "component/modal/InputModal";
import { INPUT } from "modal/types";
import { shallow } from "enzyme";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

const TEST_MODAL_INPUT = {
  type: INPUT,
  visible: true,
  title: "New list",
  text: "Choose name for your new todo list:"
};

describe("Input modal", () => {
  test("should not render modal", () => {
    const wrapper = shallow(<InputModal />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render modal", () => {
    const wrapper = shallow(<InputModal modal={TEST_MODAL_INPUT} />);
    expect(wrapper).toMatchSnapshot();
  });
});
