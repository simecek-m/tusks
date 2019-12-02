import {
  login,
  logout,
  setLocale,
  ACTION_TYPE_LOGIN,
  ACTION_TYPE_LOGOUT,
  ACTION_TYPE_LOCALE
} from "store/actions";

const TEST_LOCALE = "en";

const TEST_USER = {
  name: "Mike Smith",
  email: "smith@todo.com",
  locale: "en"
};

describe("Redux store actions", () => {
  test("should return login action", () => {
    const result = login(TEST_USER);
    expect(result).toEqual({
      type: ACTION_TYPE_LOGIN,
      payload: TEST_USER
    });
  });

  test("should return logout action", () => {
    const result = logout(TEST_USER);
    expect(result).toEqual({
      type: ACTION_TYPE_LOGOUT
    });
  });

  test("should return setLocale action", () => {
    const result = setLocale(TEST_LOCALE);
    expect(result).toEqual({
      type: ACTION_TYPE_LOCALE,
      payload: TEST_LOCALE
    });
  });
});
