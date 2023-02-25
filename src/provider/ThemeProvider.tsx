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

type ThemeState = {
  userPreference: UserThemePreference;
  system: SystemTheme;
};

interface IThemeContext {
  theme: ThemeState;
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

  const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
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

  const [theme, dispatch] = useReducer<Reducer<ThemeState, ThemeAction>>(
    themeReducer,
    {
      userPreference: localStorage.theme ?? "system",
      system: getSystemTheme(),
    }
  );

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
    document.documentElement.className =
      theme.userPreference === "system" ? theme.system : theme.userPreference;
  }, [theme]);

  const setThemePreference = (userPreference: UserThemePreference) => {
    if (userPreference !== theme.userPreference) {
      dispatch({ type: "change_user_preference", userPreference });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemePreference }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
