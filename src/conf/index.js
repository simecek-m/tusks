const defaults = {
  TODO_BACKEND_HOST: "http://localhost",
  TODO_BACKEND_PORT: "8080",
  THEME: "light",
  AUTH_DOMAIN: "domain.eu.auth0.com",
  AUTH_CLIENT_ID: "auth-client-id",
};

export const TODO_BACKEND_HOST =
  process.env.REACT_APP_TODO_BACKEND_HOST ?? defaults.TODO_BACKEND_HOST;

export const TODO_BACKEND_PORT =
  process.env.REACT_APP_TODO_BACKEND_PORT ?? defaults.TODO_BACKEND_PORT;

export const DEFAULT_THEME =
  process.env.REACT_APP_DEFAULT_THEME ?? defaults.THEME;

export const AUTH_DOMAIN =
  process.env.REACT_APP_AUTH_DOMAIN ?? defaults.AUTH_DOMAIN;

export const AUTH_CLIENT_ID =
  process.env.REACT_APP_AUTH_CLIENT_ID ?? defaults.AUTH_CLIENT_ID;
