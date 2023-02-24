import { DARK_MODE_MEDIA_QUERY } from "constant/theme";
import {
  ThemeSystemPreference,
  ThemeUserPreference,
} from "provider/ThemeProvider";

export const savePreferenceToStorage = (theme: ThemeUserPreference): void => {
  localStorage.theme = theme;
};

export const loadPreferenceFromStorage = (): ThemeUserPreference => {
  return localStorage.theme ?? "system";
};

export const getSystemPreference = (): ThemeSystemPreference => {
  return window.matchMedia(DARK_MODE_MEDIA_QUERY).matches ? "dark" : "light";
};

export const setDocumentClass = (theme: ThemeSystemPreference): void => {
  document.documentElement.className = theme;
};
