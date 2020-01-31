import React from "react";
import ModalProvider from "modal/ModalProvider";
import renderer from "react-test-renderer";
import { SELECT } from "modal/types";

const TEST_MODAL_SELECT = {
  type: SELECT,
  visible: true,
  title: "New list",
  text: "Choose name for your new todo list:"
};

describe("Select modal", () => {
  test("should render input modal", () => {
    const component = renderer
      .create(<ModalProvider init={TEST_MODAL_SELECT} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
