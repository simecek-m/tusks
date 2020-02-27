import axios from "axios";

export const DEFAULT_FALLBACK_RESPONSE = {
  data: {
    message: "Could not get any response!"
  },
  status: 500
};

export const config = {
  baseURL: `${process.env.REACT_APP_TODO_BACKEND_HOST}:${process.env.REACT_APP_TODO_BACKEND_PORT}/api`
};

export function setAuthorizationHeader(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

const api = axios.create(config);
api.interceptors.response.use(
  function(response) {
    console.log(response);
    return response;
  },
  function(error) {
    console.log("error: ", error);
    console.log("error response: ", error.response);
    if (error.response === undefined) {
      error.response = DEFAULT_FALLBACK_RESPONSE;
    }
    console.log("finished error: ", error);
    return Promise.reject(error);
  }
);

export default api;
