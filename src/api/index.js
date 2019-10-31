import axios from "axios";

const DEFAULT_FALLBACK_RESPONSE = {
  data: {
    message: "Could not get any response!"
  },
  status: 500
};

const config = {
  baseURL: `${process.env.REACT_APP_TODO_BACKEND_HOST}:${process.env.REACT_APP_TODO_BACKEND_PORT}/api`
};

export function setAuthorizationHeader(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

const api = axios.create(config);
api.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response === undefined) {
      error.response = DEFAULT_FALLBACK_RESPONSE;
    }
    return Promise.reject(error);
  }
);

export default api;
