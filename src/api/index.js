import axios from "axios";
import { TODO_BACKEND_HOST, TODO_BACKEND_PORT } from "conf";

export const DEFAULT_FALLBACK_RESPONSE = {
  data: {
    message: "Could not get any response!",
  },
  status: 500,
};

export const config = {
  baseURL: `${TODO_BACKEND_HOST}:${TODO_BACKEND_PORT}/api`,
};

export function setAuthorizationHeader(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

const api = axios.create(config);
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response === undefined) {
      error.response = DEFAULT_FALLBACK_RESPONSE;
    }
    return Promise.reject(error);
  }
);

export default api;
