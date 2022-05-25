import React from "react";
import ReactDOM from "react-dom/client";
import App from "component/App";
import * as serviceWorker from "serviceWorker";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import ThemeProvider from "provider/theme";
import { Auth0Provider } from "@auth0/auth0-react";
import { AUTH_DOMAIN, AUTH_CLIENT_ID } from "conf";
library.add(fas);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <Auth0Provider
      domain={AUTH_DOMAIN}
      clientId={AUTH_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </ThemeProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
