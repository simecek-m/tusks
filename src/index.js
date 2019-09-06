import React from 'react';
import ReactDOM from 'react-dom';
import App from 'component/App';
import * as serviceWorker from 'serviceWorker';
import store, { persistor } from 'store';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loading from 'component/Loading';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ToastProvider placement="bottom-right">
        <App/>
      </ToastProvider>
    </PersistGate>
  </Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
