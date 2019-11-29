import { shortenString } from "helper/string";

const TEST_STRING_LONG = "long test string";
const TEST_STRING_SHORT = "string";
const TEST_SHORTEN_STRING_BY_DEFAULT_LENGTH = "long test ...";
const TEST_SHORTEN_STRING_BY_CUSTOM_LENGTH = "long ...";
const TEST_DEFAULT_LENGTH = 10;
const TEST_CUSTOM_LENGTH = 5;

describe("helper - string", () => {
  test("should shorten a string with default length", () => {
    const sliceSpy = jest.spyOn(String.prototype, "slice");
    const result = shortenString(TEST_STRING_LONG);
    expect(sliceSpy).toHaveBeenCalledTimes(1);
    expect(sliceSpy).toHaveBeenCalledWith(0, TEST_DEFAULT_LENGTH);
    expect(result).toBe(TEST_SHORTEN_STRING_BY_DEFAULT_LENGTH);
    sliceSpy.mockRestore();
  });

  test("should shorten a string with custom length", () => {
    const sliceSpy = jest.spyOn(String.prototype, "slice");
    const result = shortenString(TEST_STRING_LONG, TEST_CUSTOM_LENGTH);
    expect(sliceSpy).toHaveBeenCalledTimes(1);
    expect(sliceSpy).toHaveBeenCalledWith(0, TEST_CUSTOM_LENGTH);
    expect(result).toBe(TEST_SHORTEN_STRING_BY_CUSTOM_LENGTH);
    sliceSpy.mockRestore();
  });

  test("should return unshortened string", () => {
    const sliceSpy = jest.spyOn(String.prototype, "slice");
    const result = shortenString(TEST_STRING_SHORT);
    expect(sliceSpy).toHaveBeenCalledTimes(0);
    expect(result).toBe(TEST_STRING_SHORT);
    sliceSpy.mockRestore();
  });
});
