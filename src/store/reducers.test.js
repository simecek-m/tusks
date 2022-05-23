import { ACTION_TYPE_LOGIN, ACTION_TYPE_LOGOUT } from "store/actions";
import reducer, { initialState } from "store/reducers";

const TEST_USER = {
  name: "Mike Smith",
  email: "smith@todo.com",
};

const TEST_INITIAL_STATE = {
  user: null,
};

const TEST_LOGIN_ACTION = {
  type: ACTION_TYPE_LOGIN,
  payload: TEST_USER,
};

const TEST_LOGOUT_ACTION = {
  type: ACTION_TYPE_LOGOUT,
};

describe("Redux store reducers", () => {
  test("should return Redux initial state", () => {
    expect(initialState).toEqual(TEST_INITIAL_STATE);
  });

  test("should change state by login action", () => {
    const result = reducer(TEST_INITIAL_STATE, TEST_LOGIN_ACTION);
    expect(result).toEqual({
      ...TEST_INITIAL_STATE,
      user: TEST_USER,
    });
  });

  test("should change state by logout action", () => {
    const result = reducer(TEST_INITIAL_STATE, TEST_LOGOUT_ACTION);
    expect(result).toEqual(TEST_INITIAL_STATE);
  });
});
