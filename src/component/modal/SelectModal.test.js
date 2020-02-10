import React from "react";
import { SelectModal } from "component/modal/SelectModal";
import { SELECT } from "modal/types";
import csFlag from "assets/image/flag/cs.png";
import enFlag from "assets/image/flag/en.png";
import { shallow } from "enzyme";

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

describe("Select modal", () => {
  test("should not render modal", () => {
    const wrapper = shallow(<SelectModal />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render modal", () => {
    const wrapper = shallow(<SelectModal modal={TEST_MODAL_SELECT} />);
    expect(wrapper).toMatchSnapshot();
  });
});
