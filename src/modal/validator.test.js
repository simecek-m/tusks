import { validateModalData } from "modal/validator";
import { CONFIRMATION, SELECT, INPUT } from "modal/types";

describe("modal validator", () => {
  test("should validate confirmation modal", () => {
    const modal = {
      type: CONFIRMATION
    };
    const result = validateModalData(modal);
    expect(result).toEqual({
      type: CONFIRMATION,
      visible: true,
      title: "Title",
      text: "Description",
      onConfirm: expect.any(Function)
    });
  });

  test("should validate input modal", () => {
    const modal = {
      type: INPUT
    };
    const result = validateModalData(modal);
    expect(result).toEqual({
      type: INPUT,
      visible: true,
      title: "Title",
      text: "Description",
      onConfirm: expect.any(Function)
    });
  });

  test("should validate select modal", () => {
    const modal = {
      type: SELECT
    };
    const result = validateModalData(modal);
    expect(result).toEqual({
      type: SELECT,
      visible: true,
      title: "Title",
      text: "Description",
      options: []
    });
  });

  test("should validate unknown type of modal - default confirmation", () => {
    const modal = {};
    const result = validateModalData(modal);
    expect(result).toEqual({
      type: CONFIRMATION,
      visible: true,
      title: "Title",
      text: "Description",
      onConfirm: expect.any(Function)
    });
  });
});
