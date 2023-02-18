import { createContext, FC, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

interface IThemeContext {
  theme: Theme;
  changeTheme: (theme: Theme | "system") => void;
}

const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  changeTheme: () => null,
});

export const useTheme = (): IThemeContext => {
  return useContext(ThemeContext);
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

// TODO: refactor - simplify Provider
const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const setPreftoLocalstorage = (theme: Theme | "system") => {
    localStorage.theme = theme;
  };

  // TODO: default theme should be "system"
  const getPrefFromLocalstorage = (): Theme => {
    const pref: Theme | "system" = localStorage.theme ?? "light";
    if (pref === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      return pref;
    }
  };

  const [theme, setTheme] = useState<Theme>(getPrefFromLocalstorage());

  const themePreferenceChangeListener = (event: MediaQueryListEvent) =>
    setTheme(event.matches ? "dark" : "light");

  const addSystemThemePreferenceListener = () => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", themePreferenceChangeListener);
  };

  const removeSystemThemePreferenceListener = () => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", themePreferenceChangeListener);
  };

  const changeTheme = (theme: Theme | "system") => {
    setPreftoLocalstorage(theme);
    if (theme === "system") {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
      addSystemThemePreferenceListener();
    } else {
      setTheme(theme);
      removeSystemThemePreferenceListener();
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div className="bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-100">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
