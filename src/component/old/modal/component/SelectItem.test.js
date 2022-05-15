import React from "react";
import SelectItem from "component/old/modal/component/SelectItem";
import renderer from "react-test-renderer";
import csFlag from "assets/image/flag/cs.png";

const TEST_SELECT_ITEM_TEXT = "test";
const TEST_SELECT_ITEM_IMAGE = csFlag;

describe("modal SelectItem component", () => {
  test("should render default SelectItem", () => {
    const component = renderer.create(<SelectItem />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("should render custom SelectItem", () => {
    const component = renderer
      .create(
        <SelectItem
          text={TEST_SELECT_ITEM_TEXT}
          image={TEST_SELECT_ITEM_IMAGE}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
