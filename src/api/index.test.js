import api, { setAuthorizationHeader } from "api";
import { config, DEFAULT_FALLBACK_RESPONSE } from "api";
import { TODO_BACKEND_HOST, TODO_BACKEND_PORT } from "conf";

const DEFAULT_URL = `${TODO_BACKEND_HOST}:${TODO_BACKEND_PORT}/api`;
const TEST_TOKEN = "TEST_TOKEN";

const TEST_FULFILLED_RESPONSE = {
  status: 200,
  data: {
    message: "RESPONSE FULFILLED",
  },
};

const TEST_REJECTED_RESPONSE = {
  response: {
    data: {
      message: "RESPONSE REJECTED",
    },
  },
};

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
      headers: { Authorization: `Bearer ${TEST_TOKEN}` },
    });
  });

  test("should return config option", () => {
    expect(config.baseURL).toEqual(DEFAULT_URL);
  });

  test("should pass fullfiled response", () => {
    const result = api.interceptors.response.handlers[0].fulfilled(
      TEST_FULFILLED_RESPONSE
    );
    expect(result).toEqual(TEST_FULFILLED_RESPONSE);
  });

  test("should return rejected response", (done) => {
    const result = api.interceptors.response.handlers[0].rejected(
      TEST_REJECTED_RESPONSE
    );
    result.catch((error) => {
      expect(error).toEqual(TEST_REJECTED_RESPONSE);
      done();
    });
  });

  test("should return default rejected response", (done) => {
    const result = api.interceptors.response.handlers[0].rejected({});
    result.catch((error) => {
      expect(error.response).toEqual(DEFAULT_FALLBACK_RESPONSE);
      done();
    });
  });
});
