import { Auth0Provider } from "@auth0/auth0-react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HOME_PATH_NAME,
  INDEX_PATH_NAME,
  SETTINGS_PATH_NAME,
} from "constant/paths";
import Dashboard from "page/Dashboard";
import Home from "page/Home";
import NotFound from "page/NotFound";
import ProtectedRoute from "page/ProtectedRoute";
import { Settings } from "page/Settings";
import ThemeProvider from "provider/ThemeProvider";
import ToastProvider from "provider/ToastProvider";
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

library.add(fas, far);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC = () => {
  return (
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
            <BrowserRouter>
              <Routes>
                <Route path={HOME_PATH_NAME} element={<Home />} />
                <Route path={INDEX_PATH_NAME} element={<ProtectedRoute />}>
                  <Route index element={<Dashboard />} />
                  <Route path={SETTINGS_PATH_NAME} element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </Auth0Provider>
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
