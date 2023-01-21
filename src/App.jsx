import { Auth0Provider } from "@auth0/auth0-react";
import Home from "page/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Auth0Provider
      audience="todo-server"
      domain={process.env.REACT_APP_AUTH_DOMAIN}
      clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
};

export default App;
