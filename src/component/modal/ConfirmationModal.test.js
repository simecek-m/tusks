import React from "react";
import ModalProvider from "modal/ModalProvider";
import renderer from "react-test-renderer";
import { CONFIRMATION } from "modal/types";

const TEST_MODAL_CONFIRMATION = {
  type: CONFIRMATION,
  visible: true,
  title: "Delete",
  text: "This action will permanently delete 'TEST' todo list! Are you sure?"
};

describe("Confirmation modal", () => {
  test("should render default modal", () => {
    const component = renderer.create(<ModalProvider />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("should render confirmation modal", () => {
    const component = renderer
      .create(<ModalProvider init={TEST_MODAL_CONFIRMATION}></ModalProvider>)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
