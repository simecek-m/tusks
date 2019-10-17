import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import store from "store/index";

import cs from "i18n/locale/cs.json";
import en from "i18n/locale/en.json";

export const DEFAULT_LOCALE = process.env.REACT_APP_DEFAULT_LOCALE;

store.subscribe(() => {
  const storedLocale = store.getState().locale;
  if (storedLocale !== i18n.language) {
    i18n.changeLanguage(storedLocale);
  }
});

i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LOCALE,
  lng: DEFAULT_LOCALE,
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false
  },
  react: {
    wait: true
  },
  resources: {
    cs,
    en
  }
});

export default i18n;
