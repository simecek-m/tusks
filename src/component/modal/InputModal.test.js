import React from "react";
import ModalProvider from "modal/ModalProvider";
import renderer from "react-test-renderer";
import csFlag from "assets/image/flag/cs.png";
import enFlag from "assets/image/flag/en.png";
import { SELECT } from "modal/types";

const TEST_MODAL_SELECT = {
  type: SELECT,
  visible: true,
  title: "Select Language",
  text: "Choose your preferred language:",
  options: [
    {
      text: "czech",
      image: csFlag
    },
    {
      text: "english",
      image: enFlag
    }
  ]
};

describe("Input modal", () => {
  test("should render select modal", () => {
    const component = renderer
      .create(<ModalProvider init={TEST_MODAL_SELECT} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
