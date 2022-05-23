import {
  login,
  logout,
  ACTION_TYPE_LOGIN,
  ACTION_TYPE_LOGOUT,
} from "store/actions";

const TEST_USER = {
  name: "Mike Smith",
  email: "smith@todo.com",
};

describe("Redux store actions", () => {
  test("should return login action", () => {
    const result = login(TEST_USER);
    expect(result).toEqual({
      type: ACTION_TYPE_LOGIN,
      payload: TEST_USER,
    });
  });

  test("should return logout action", () => {
    const result = logout(TEST_USER);
    expect(result).toEqual({
      type: ACTION_TYPE_LOGOUT,
    });
  });
});
