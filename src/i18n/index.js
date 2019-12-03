import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { getStore } from "store/index";

import cs from "i18n/translation/cs.json";
import en from "i18n/translation/en.json";

export const DEFAULT_LOCALE = process.env.REACT_APP_DEFAULT_LOCALE;

export function loadStoredLocale() {
  const store = getStore();
  store.subscribe(() => {
    const storedLocale = store.getState().locale;
    if (storedLocale !== i18next.language) {
      i18next.changeLanguage(storedLocale);
    }
  });
}

export function init() {
  this.loadStoredLocale();
  i18next.use(initReactI18next).init({
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
}

export default i18next;
