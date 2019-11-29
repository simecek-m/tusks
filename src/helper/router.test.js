import { history } from "router";
import { redirect } from "helper/router";

const TEST_REDITECT_PATH = "/test";

describe("helper - router", () => {
  test("should redirect to test path", () => {
    const historySpy = jest.spyOn(history, "push");
    redirect(TEST_REDITECT_PATH);
    expect(historySpy).toHaveBeenCalledTimes(1);
    expect(historySpy).toHaveBeenCalledWith(TEST_REDITECT_PATH);
    historySpy.mockRestore();
  });
});
