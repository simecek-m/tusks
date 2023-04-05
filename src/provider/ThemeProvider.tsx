import { DARK_MODE_MEDIA_QUERY } from "constant/theme";
import {
  createContext,
  FC,
  PropsWithChildren,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react";

export type UserThemePreference = "light" | "dark" | "system";
export type SystemTheme = "light" | "dark";

type ThemeSettings = {
  userPreference: UserThemePreference;
  system: SystemTheme;
};

interface IThemeContext {
  theme: SystemTheme;
  themeSettings: ThemeSettings;
  setThemePreference: (preference: UserThemePreference) => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw Error(
      "You are trying to access Theme Context outside of its provider!"
    );
  } else {
    return context;
  }
};

export type ThemeAction =
  | { type: "change_user_preference"; userPreference: UserThemePreference }
  | { type: "change_system_theme"; system: SystemTheme };

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const getSystemTheme = (): SystemTheme => {
    return window.matchMedia(DARK_MODE_MEDIA_QUERY).matches ? "dark" : "light";
  };

  const themeReducer = (
    state: ThemeSettings,
    action: ThemeAction
  ): ThemeSettings => {
    switch (action.type) {
      case "change_user_preference": {
        localStorage.theme = action.userPreference;
        return {
          ...state,
          userPreference: action.userPreference,
        };
      }
      case "change_system_theme": {
        return {
          ...state,
          system: action.system,
        };
      }
    }
  };

  const [themeSettings, dispatch] = useReducer<
    Reducer<ThemeSettings, ThemeAction>
  >(themeReducer, {
    userPreference: localStorage.theme ?? "system",
    system: getSystemTheme(),
  });

  // listener to update system theme state when system theme was changed
  useEffect(() => {
    const darkModeQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);
    const systemThemeChangeListener = (event: MediaQueryListEvent) => {
      dispatch({
        type: "change_system_theme",
        system: event.matches ? "dark" : "light",
      });
    };
    darkModeQuery.addEventListener("change", systemThemeChangeListener);
    return () =>
      darkModeQuery.removeEventListener("change", systemThemeChangeListener);
  }, []);

  // change document class [dark / light] when theme state was changed
  useEffect(() => {
    document.documentElement.className = theme;
  }, [themeSettings]);

  const setThemePreference = (userPreference: UserThemePreference) => {
    if (userPreference !== themeSettings.userPreference) {
      dispatch({ type: "change_user_preference", userPreference });
    }
  };

  const theme: SystemTheme =
    themeSettings.userPreference === "system"
      ? themeSettings.system
      : themeSettings.userPreference;

  return (
    <ThemeContext.Provider value={{ theme, themeSettings, setThemePreference }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
