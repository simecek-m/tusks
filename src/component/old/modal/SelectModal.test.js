import React from "react";
import { SelectModal } from "component/old/modal/SelectModal";
import { SELECT } from "modal/types";
import csFlag from "assets/image/flag/cs.png";
import enFlag from "assets/image/flag/en.png";
import { shallow } from "enzyme";

const optionOnClickMock = jest.fn();

const TEST_MODAL_SELECT = {
  type: SELECT,
  visible: true,
  title: "Select Language",
  text: "Choose your preferred language:",
  options: [
    {
      text: "czech",
      image: csFlag,
      onClick: optionOnClickMock
    },
    {
      text: "english",
      image: enFlag
    }
  ]
};

describe("Select modal", () => {
  test("should not render modal", () => {
    const wrapper = shallow(<SelectModal />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render modal", () => {
    const wrapper = shallow(<SelectModal modal={TEST_MODAL_SELECT} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should close modal", () => {
    const closeModalMock = jest.fn();
    const wrapper = shallow(
      <SelectModal modal={TEST_MODAL_SELECT} closeModal={closeModalMock} />
    );
    const elem = wrapper.find(".select-modal-component");
    expect(elem).not.toBeNull();
    elem.simulate("click");
    expect(closeModalMock).toHaveBeenCalledTimes(1);
    closeModalMock.mockRestore();
  });

  test("should stop propagate close modal click event on body element", () => {
    const stopPropagationMock = jest.fn();
    const wrapper = shallow(<SelectModal modal={TEST_MODAL_SELECT} />);
    const elem = wrapper.find(".modal-body");
    expect(elem).not.toBeNull();
    elem.simulate("click", { stopPropagation: stopPropagationMock });
    expect(stopPropagationMock).toHaveBeenCalledTimes(1);
    stopPropagationMock.mockRestore();
  });

  test("should call option onClick function", () => {
    const closeModalMock = jest.fn();
    const INDEX = 0;
    const wrapper = shallow(
      <SelectModal modal={TEST_MODAL_SELECT} closeModal={closeModalMock} />
    );
    const item = wrapper.find(`#select-item-${INDEX}`);
    expect(item).not.toBeNull();
    expect(optionOnClickMock).not.toHaveBeenCalled();
    item.simulate("click");
    expect(optionOnClickMock).toHaveBeenCalledTimes(1);
    expect(closeModalMock).toHaveBeenCalledTimes(1);
    closeModalMock.mockRestore();
  });
});
