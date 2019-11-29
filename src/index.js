import React from "react";
import ReactDOM from "react-dom";
import App from "component/App";
import * as serviceWorker from "serviceWorker";
import store, { persistor } from "store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { I18nextProvider } from "react-i18next";
import ModalProvider from "modal/ModalProvider";
import * as i18nModule from "i18n/index";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <I18nextProvider i18n={i18nModule.init()}>
        <ModalProvider>
          <ReactNotification />
          <App />
        </ModalProvider>
      </I18nextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
