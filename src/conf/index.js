const defaults = {
  GOOGLE_API_CLIENT_ID: "id.apps.googleusercontent.com",
  TODO_BACKEND_HOST: "http://localhost",
  TODO_BACKEND_PORT: "8080",
  DEFAULT_LOCALE: "cs",
  DEFAULT_THEME: "light"
};

export const GOOGLE_API_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_API_CLIENT_ID ?? defaults.GOOGLE_API_CLIENT_ID;

export const TODO_BACKEND_HOST =
  process.env.REACT_APP_TODO_BACKEND_HOST ?? defaults.TODO_BACKEND_HOST;

export const TODO_BACKEND_PORT =
  process.env.REACT_APP_TODO_BACKEND_PORT ?? defaults.TODO_BACKEND_PORT;

export const DEFAULT_LOCALE =
  process.env.REACT_APP_DEFAULT_LOCALE ?? defaults.DEFAULT_LOCALE;

export const DEFAULT_THEME =
  process.env.REACT_APP_DEFAULT_THEME ?? defaults.DEFAULT_THEME;
