declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      REACT_APP_AUTH_DOMAIN: string;
      REACT_APP_AUTH_CLIENT_ID: string;
      REACT_APP_AUTH_AUDIENCE: string;
      REACT_APP_TODO_API_URL: string;
    }
  }
}

export {};
