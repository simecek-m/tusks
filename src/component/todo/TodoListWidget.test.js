import React from "react";
import { TodoListWidget } from "component/todo/TodoListWidget";
import { shallow } from "enzyme";
import { CONFIRMATION } from "modal/types";

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  }
}));

describe("TodoListWidget component", () => {
  test("should render default", () => {
    const wrapper = shallow(<TodoListWidget />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render Work list", () => {
    const wrapper = shallow(<TodoListWidget title="Work" count={6} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should open modal", async () => {
    const mockOpenModal = jest.fn();
    const wrapper = await shallow(<TodoListWidget openModal={mockOpenModal} />);
    const elem = wrapper.find(".icon-trash");
    await elem.simulate("click", { stopPropagation: () => {} });
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
    expect(mockOpenModal).toHaveBeenCalledWith({
      text: "todoListWidget.modal.text",
      title: "todoListWidget.modal.title",
      type: CONFIRMATION,
      onConfirm: expect.any(Function)
    });
    mockOpenModal.mockRestore();
  });
});
