import { Auth0Provider } from "@auth0/auth0-react";
import { HOME_PATH, INDEX_PATH, REGISTRATION_PATH } from "constant";
import Dashboard from "page/Dashboard";
import Home from "page/Home";
import ProtectedRoute from "page/ProtectedRoute";
import Registration from "page/Registration";
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: FC = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN}
      clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
      authorizationParams={{
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={INDEX_PATH} element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
            <Route path={REGISTRATION_PATH} element={<Registration />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
};

export default App;
