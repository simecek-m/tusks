import React from "react";
import { ConfirmationModal } from "component/modal/ConfirmationModal";
import { CONFIRMATION } from "modal/types";
import { shallow } from "enzyme";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

const confirmMock = jest.fn();

const TEST_MODAL_CONFIRMATION = {
  type: CONFIRMATION,
  visible: true,
  title: "Delete",
  text: "This action will permanently delete 'TEST' todo list! Are you sure?",
  onConfirm: confirmMock
};

describe("Confirmation modal", () => {
  test("should not render modal", () => {
    const wrapper = shallow(<ConfirmationModal />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render modal", () => {
    const wrapper = shallow(
      <ConfirmationModal modal={TEST_MODAL_CONFIRMATION} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("should close modal", () => {
    const closeModalMock = jest.fn();
    const wrapper = shallow(
      <ConfirmationModal
        modal={TEST_MODAL_CONFIRMATION}
        closeModal={closeModalMock}
      />
    );
    const elem = wrapper.find(".confirmation-modal-component");
    expect(elem).not.toBeNull();
    elem.simulate("click");
    expect(closeModalMock).toHaveBeenCalledTimes(1);
    closeModalMock.mockRestore();
  });

  test("should stop propagate close modal click event on body element", () => {
    const stopPropagationMock = jest.fn();
    const wrapper = shallow(
      <ConfirmationModal modal={TEST_MODAL_CONFIRMATION} />
    );
    const elem = wrapper.find(".modal-body");
    expect(elem).not.toBeNull();
    elem.simulate("click", { stopPropagation: stopPropagationMock });
    expect(stopPropagationMock).toHaveBeenCalledTimes(1);
    stopPropagationMock.mockRestore();
  });

  test("should close modal after confirmation", () => {
    const closeModalMock = jest.fn();
    const wrapper = shallow(
      <ConfirmationModal
        modal={TEST_MODAL_CONFIRMATION}
        closeModal={closeModalMock}
      />
    );
    const elem = wrapper.find(".confirmation-text");
    expect(elem).not.toBeNull();
    elem.simulate("click");
    expect(confirmMock).toHaveBeenCalledTimes(1);
    expect(closeModalMock).toHaveBeenCalledTimes(1);
    confirmMock.mockReset();
    closeModalMock.mockReset();
  });
});
