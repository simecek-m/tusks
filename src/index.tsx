import { Auth0Provider } from "@auth0/auth0-react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "provider/ThemeProvider";
import { ToastProvider } from "provider/ToastProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "router/AppRouter";
import "./index.css";

library.add(fas, far);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Auth0Provider
            domain={import.meta.env.VITE_AUTH_DOMAIN ?? ""}
            clientId={import.meta.env.VITE_AUTH_CLIENT_ID ?? ""}
            authorizationParams={{
              audience: import.meta.env.VITE_AUTH_AUDIENCE,
              redirect_uri: window.location.origin,
            }}
          >
            <AppRouter />
          </Auth0Provider>
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
