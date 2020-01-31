import React from "react";
import ModalProvider from "modal/ModalProvider";
import renderer from "react-test-renderer";
import csFlag from "assets/image/flag/cs.png";
import enFlag from "assets/image/flag/en.png";
import { INPUT } from "modal/types";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

const TEST_MODAL_INPUT = {
  type: INPUT,
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
      .create(<ModalProvider init={TEST_MODAL_INPUT} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
