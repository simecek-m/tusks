import * as modalTypes from "modal/types";

const TEST_MODAL_TYPES = 3;

describe("modal types", () => {
  test("should contain confirmation type", () => {
    expect(modalTypes.CONFIRMATION).not.toBeNull();
    expect(modalTypes.CONFIRMATION).toEqual("confirmation");
  });

  test("should contain input type", () => {
    expect(modalTypes.INPUT).not.toBeNull();
    expect(modalTypes.INPUT).toEqual("input");
  });

  test("should contain select type", () => {
    expect(modalTypes.SELECT).not.toBeNull();
    expect(modalTypes.SELECT).toEqual("select");
  });

  test("should not contain more costants", () => {
    expect(modalTypes).not.toBeNull();
    expect(Object.keys(modalTypes).length).toEqual(TEST_MODAL_TYPES);
  });
});
