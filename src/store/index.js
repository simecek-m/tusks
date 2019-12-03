import { createStore } from "redux";
import reducers from "store/reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

let store = null;

export function createPersistor() {
  const persistConfig = {
    key: "root",
    storage
  };
  const persistedReducer = persistReducer(persistConfig, reducers);
  store = createStore(persistedReducer, composeWithDevTools());
  return persistStore(store);
}

export function getStore() {
  return store;
}
