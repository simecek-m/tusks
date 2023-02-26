import { Auth0Provider } from "@auth0/auth0-react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HOME_PATH, INDEX_PATH } from "constant/paths";
import Dashboard from "page/Dashboard";
import Home from "page/Home";
import ProtectedRoute from "page/ProtectedRoute";
import ThemeProvider from "provider/ThemeProvider";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

library.add(fas);

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
      <QueryClientProvider client={queryClient}>
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
              <Route path={HOME_PATH} element={<Home />} />
              <Route path={INDEX_PATH} element={<ProtectedRoute />}>
                <Route index element={<Dashboard />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Auth0Provider>
        <Toaster position="bottom-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
