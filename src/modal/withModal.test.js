import React from "react";
import { withModal } from "modal/withModal";
import { shallow } from "enzyme";
import ModalProvider from "modal/ModalProvider";

const MOCK_COMPONENT = () => <div>TEST COMPONENT</div>;

describe("withModal HOC wrapper", () => {
  test("should return component with modal props", () => {
    const hoc = withModal(MOCK_COMPONENT)();
    const wrapper = shallow(<ModalProvider>{hoc}</ModalProvider>);
    expect(wrapper).toMatchSnapshot();
  });
});
