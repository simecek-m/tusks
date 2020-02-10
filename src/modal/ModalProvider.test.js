import React from "react";
import ModalProvider from "modal/ModalProvider";
import { shallow } from "enzyme";
import { CONFIRMATION, INPUT, SELECT } from "modal/types";

const INITIAL_STATE = {
  visible: false,
  type: CONFIRMATION
};

const TEST_CONFIRMATION_MODAL = {
  visible: true,
  type: CONFIRMATION,
  title: "Confirmation Modal",
  text: "Description Modal",
  onConfirm: () => {}
};

const TEST_INPUT_MODAL = {
  visible: true,
  type: INPUT,
  title: "Input Modal",
  text: "Description Modal",
  onConfirm: () => {}
};

const TEST_SELECT_MODAL = {
  visible: true,
  type: SELECT,
  title: "Select Modal",
  text: "Description Modal",
  options: []
};

describe("ModalProvider", () => {
  test("should render provider", () => {
    const wrapper = shallow(<ModalProvider />);
    const state = wrapper.state();
    expect(state).toEqual(INITIAL_STATE);
    expect(wrapper).toMatchSnapshot();
  });

  test("should switch to Confirmation Modal", () => {
    const wrapper = shallow(<ModalProvider />);
    wrapper.instance().openModal(TEST_CONFIRMATION_MODAL);
    const state = wrapper.state();
    expect(state).toEqual(TEST_CONFIRMATION_MODAL);
  });

  test("should switch to Input Modal", () => {
    const wrapper = shallow(<ModalProvider />);
    wrapper.instance().openModal(TEST_INPUT_MODAL);
    const state = wrapper.state();
    expect(state).toEqual(TEST_INPUT_MODAL);
  });

  test("should switch to Select Modal", () => {
    const wrapper = shallow(<ModalProvider />);
    wrapper.instance().openModal(TEST_SELECT_MODAL);
    const state = wrapper.state();
    expect(state).toEqual(TEST_SELECT_MODAL);
  });

  test("should close modal", () => {
    const wrapper = shallow(<ModalProvider />);
    wrapper.instance().openModal(TEST_CONFIRMATION_MODAL);
    let state = wrapper.state();
    expect(state).toEqual(TEST_CONFIRMATION_MODAL);
    wrapper.instance().closeModal();
    state = wrapper.state();
    expect(state.visible).toBeFalsy();
  });
});
