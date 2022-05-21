import { history } from "router";

describe("router", () => {
  test("should return history object", () => {
    expect(history).not.toBeNull();
    expect(history.length).toEqual(1);
    expect(history).toEqual(
      expect.objectContaining({
        location: expect.any(Object),
        push: expect.any(Function),
        go: expect.any(Function),
        goBack: expect.any(Function),
      })
    );
  });
});
