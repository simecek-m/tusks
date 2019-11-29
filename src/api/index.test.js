import api, { setAuthorizationHeader } from "api";

const DEFAULT_URL = `${process.env.REACT_APP_TODO_BACKEND_HOST}:${process.env.REACT_APP_TODO_BACKEND_PORT}/api`;
const TEST_TOKEN = "TEST_TOKEN";

describe("API", () => {
  test("should create axios instance with API URL", () => {
    expect(api.defaults.baseURL).toBe(DEFAULT_URL);
  });

  test("should use response interceptor", () => {
    expect(api.interceptors.request.handlers).toEqual([]);
    expect(api.interceptors.response.handlers).toHaveLength(1);
  });

  test("should create authorization header", () => {
    const header = setAuthorizationHeader(TEST_TOKEN);
    expect(header).toEqual({
      headers: { Authorization: `Bearer ${TEST_TOKEN}` }
    });
  });
});
