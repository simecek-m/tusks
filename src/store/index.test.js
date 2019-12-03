import { createPersistor, getStore } from "store/index";

describe("redux store", () => {
  test("should return initial store of null", () => {
    const result = getStore();
    expect(result).toBeNull();
  });

  test("should return actual store", () => {
    createPersistor();
    const result = getStore();
    expect(result).not.toBeNull();
    expect(result).toEqual(
      expect.objectContaining({
        getState: expect.any(Function),
        subscribe: expect.any(Function)
      })
    );
  });

  test("create persistor", () => {
    const result = createPersistor();
    expect(result).toEqual(
      expect.objectContaining({
        getState: expect.any(Function),
        persist: expect.any(Function),
        subscribe: expect.any(Function)
      })
    );
  });
});
