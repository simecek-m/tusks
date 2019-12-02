import {
  ACTION_TYPE_LOGIN,
  ACTION_TYPE_LOGOUT,
  ACTION_TYPE_LOCALE
} from "store/actions";
import reducer, { DEFAULT_LOCALE, initialState } from "store/reducers";

const TEST_USER = {
  name: "Mike Smith",
  email: "smith@todo.com",
  locale: "en"
};

const TEST_INITIAL_STATE = {
  user: null,
  locale: process.env.REACT_APP_DEFAULT_LOCALE
};

const TEST_CS_LOCALE = "cs";

const TEST_LOGIN_ACTION = {
  type: ACTION_TYPE_LOGIN,
  payload: TEST_USER
};

const TEST_LOGOUT_ACTION = {
  type: ACTION_TYPE_LOGOUT
};

const TEST_LOCALE_ACTION = {
  type: ACTION_TYPE_LOCALE,
  payload: TEST_CS_LOCALE
};

describe("Redux store reducers", () => {
  test("should return default locale", () => {
    expect(DEFAULT_LOCALE).toEqual(process.env.REACT_APP_DEFAULT_LOCALE);
  });

  test("should return Redux initial state", () => {
    expect(initialState).toEqual(TEST_INITIAL_STATE);
  });

  test("should change state by login action", () => {
    const result = reducer(TEST_INITIAL_STATE, TEST_LOGIN_ACTION);
    expect(result).toEqual({
      ...TEST_INITIAL_STATE,
      user: TEST_USER
    });
  });

  test("should change state by logout action", () => {
    const result = reducer(TEST_INITIAL_STATE, TEST_LOGOUT_ACTION);
    expect(result).toEqual(TEST_INITIAL_STATE);
  });

  test("should change state by locale action", () => {
    const result = reducer(TEST_INITIAL_STATE, TEST_LOCALE_ACTION);
    expect(result).toEqual({
      ...TEST_INITIAL_STATE,
      locale: TEST_CS_LOCALE
    });
  });
});
