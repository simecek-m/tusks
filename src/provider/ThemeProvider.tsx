import { DARK_MODE_MEDIA_QUERY } from "constant/theme";
import {
  getSystemPreference,
  loadPreferenceFromStorage,
  savePreferenceToStorage,
  setDocumentClass,
} from "helper/theme";
import {
  createContext,
  FC,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react";

export type ThemeSystemPreference = "light" | "dark";
export type ThemeUserPreference = "light" | "dark" | "system";

interface IThemeContext {
  theme: ThemeState;
  setThemePreference: (preference: ThemeUserPreference) => void;
}

const ThemeContext = createContext<IThemeContext>({
  theme: {
    preference: "system",
    system: "dark",
  },
  setThemePreference: () => null,
});

export const useTheme = (): IThemeContext => {
  return useContext(ThemeContext);
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

type ThemeState = {
  preference: ThemeUserPreference;
  system: ThemeSystemPreference;
};

export type ChangeThemeAction =
  | { type: "change_user_preference"; preference: ThemeUserPreference }
  | { type: "change_system_preference" };

// optimize listeners
const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, dispatch] = useReducer<Reducer<ThemeState, ChangeThemeAction>>(
    (state, action) => {
      switch (action.type) {
        case "change_user_preference": {
          savePreferenceToStorage(action.preference);
          return {
            ...state,
            preference: action.preference,
          };
        }
        case "change_system_preference": {
          return {
            ...state,
            system: getSystemPreference(),
          };
        }
      }
    },
    {
      preference: loadPreferenceFromStorage(),
      system: getSystemPreference(),
    }
  );

  useEffect(() => {
    window
      .matchMedia(DARK_MODE_MEDIA_QUERY)
      .addEventListener("change", () =>
        dispatch({ type: "change_system_preference" })
      );
  }, []);

  useEffect(() => {
    if (theme.preference === "system") {
      setDocumentClass(theme.system);
    } else {
      setDocumentClass(theme.preference);
    }
  }, [theme]);

  const setThemePreference = (preference: ThemeUserPreference) => {
    if (preference !== theme.preference) {
      dispatch({ type: "change_user_preference", preference });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemePreference }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
