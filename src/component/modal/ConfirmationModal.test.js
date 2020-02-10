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

const TEST_MODAL_CONFIRMATION = {
  type: CONFIRMATION,
  visible: true,
  title: "Delete",
  text: "This action will permanently delete 'TEST' todo list! Are you sure?",
  onConfirm: () => {}
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
});
