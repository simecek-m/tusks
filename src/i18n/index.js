import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import cs from "i18n/locale/cs.json";
import en from "i18n/locale/en.json";

const DEFAULT_LANGUAGE = "en";

i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  lng: "cs",
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
