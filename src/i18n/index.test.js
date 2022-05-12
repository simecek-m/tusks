import i18next from "i18next";
import i18n, * as i18nModule from "i18n";
import { initReactI18next } from "react-i18next";
import { createPersistor, getStore } from "store";

import cs from "i18n/translation/cs.json";
import en from "i18n/translation/en.json";
import { DEFAULT_LOCALE } from "conf";

describe("i18n", () => {
  let store = null;

  beforeAll(() => {
    createPersistor();
    store = getStore();
  });

  test("should subscribe to stored language in redux", () => {
    const subscribeSpy = jest.spyOn(store, "subscribe");
    i18nModule.loadStoredLocale();
    expect(subscribeSpy).toHaveBeenCalledTimes(1);
    subscribeSpy.mockRestore();
  });

  test("should init i18n object", async () => {
    const loadStoredLocaleSpy = jest.spyOn(i18nModule, "loadStoredLocale");
    const i18nextUseSpy = jest.spyOn(i18next, "use");
    const i18nextInitSpy = jest.spyOn(i18next, "init");
    i18nModule.init();
    expect(loadStoredLocaleSpy).toHaveBeenCalledTimes(1);
    expect(i18nextUseSpy).toHaveBeenCalledTimes(1);
    expect(i18nextUseSpy).toHaveBeenCalledWith(initReactI18next);
    expect(i18nextInitSpy).toHaveBeenCalledTimes(1);
    expect(i18nextInitSpy).toHaveBeenCalledWith({
      fallbackLng: [DEFAULT_LOCALE],
      lng: DEFAULT_LOCALE,
      debug: false,
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
  });

  test("should return initialized i18n object", () => {
    expect(i18n.options.fallbackLng).toEqual([DEFAULT_LOCALE]);
    expect(i18n.options.lng).toEqual(DEFAULT_LOCALE);
    expect(i18n.options.interpolation).toEqual({ escapeValue: false });
    expect(i18n.options.react).toEqual({ wait: true });
    expect(i18n.options.resources).toEqual({ cs, en });
  });
});
