import React from "react";
import { InputModal } from "component/old/modal/InputModal";
import { INPUT } from "modal/types";
import { shallow, mount } from "enzyme";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

const confirmMock = jest.fn();

const TEST_MODAL_INPUT = {
  type: INPUT,
  visible: true,
  title: "New list",
  text: "Choose name for your new todo list:",
  onConfirm: confirmMock
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

  test("should close modal", () => {
    const closeModalMock = jest.fn();
    const wrapper = shallow(
      <InputModal modal={TEST_MODAL_INPUT} closeModal={closeModalMock} />
    );
    const elem = wrapper.find(".input-modal-component");
    expect(elem).not.toBeNull();
    elem.simulate("click");
    expect(closeModalMock).toHaveBeenCalledTimes(1);
    closeModalMock.mockRestore();
  });

  test("should stop propagate close modal click event on body element", () => {
    const stopPropagationMock = jest.fn();
    const wrapper = shallow(<InputModal modal={TEST_MODAL_INPUT} />);
    const elem = wrapper.find(".modal-body");
    expect(elem).not.toBeNull();
    elem.simulate("click", { stopPropagation: stopPropagationMock });
    expect(stopPropagationMock).toHaveBeenCalledTimes(1);
    stopPropagationMock.mockRestore();
  });

  test("should change state after change input field", () => {
    const FIRST_VALUE = "first";
    const SECOND_VALUE = "second";
    const wrapper = mount(<InputModal modal={TEST_MODAL_INPUT} />);
    const inputElem = wrapper.find(".modal-input");
    inputElem.simulate("change", { target: { value: FIRST_VALUE } });
    let state = wrapper.state();
    expect(state.value).toEqual(FIRST_VALUE);
    inputElem.simulate("change", { target: { value: SECOND_VALUE } });
    state = wrapper.state();
    expect(state.value).toEqual(SECOND_VALUE);
  });

  test("should close modal after confirmation", () => {
    const TEST_VALUE = "whatever";
    const closeModalMock = jest.fn();
    const wrapper = mount(
      <InputModal modal={TEST_MODAL_INPUT} closeModal={closeModalMock} />
    );
    const inputElem = wrapper.find(".modal-input");
    inputElem.simulate("change", { target: { value: "whatever" } });
    const elem = wrapper.find(".modal-confirmation-button");
    expect(elem).not.toBeNull();
    elem.simulate("submit");
    expect(confirmMock).toHaveBeenCalledTimes(1);
    expect(confirmMock).toHaveBeenCalledWith(TEST_VALUE);
    expect(closeModalMock).toHaveBeenCalledTimes(1);
    confirmMock.mockReset();
    closeModalMock.mockReset();
  });
});
