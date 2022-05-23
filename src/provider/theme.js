import { createContext, useContext, useState } from "react";
import { DEFAULT_THEME } from "conf";

const ThemeContext = createContext(DEFAULT_THEME);
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({
  defaulValue = DEFAULT_THEME,
  children,
}) {
  const [theme, setTheme] = useState(defaulValue);
  const switchTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
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
