import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(process.env.REACT_APP_DEFAULT_THEME);
export const useTheme = () => useContext(ThemeContext);

const THEME_KEY = "theme";

export default function ThemeProvider({
  defaulValue = process.env.REACT_APP_DEFAULT_THEME,
  children,
}) {
  const persistTheme = (theme) => {
    localStorage.setItem(THEME_KEY, theme);
  };

  const getPersistedTheme = () => {
    return localStorage.getItem(THEME_KEY);
  };

  const persistedTheme = getPersistedTheme();
  const [theme, setTheme] = useState(persistedTheme ?? defaulValue);

  const switchTheme = () => {
    const switchedTheme = theme === "light" ? "dark" : "light";
    setTheme(switchedTheme);
    persistTheme(switchedTheme);
  };

  const contextValue = {
    theme,
    switchTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
