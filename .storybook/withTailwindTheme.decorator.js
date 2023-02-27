import { useEffect } from "react";

export const withTailwindTheme = (Story, context) => {
  const { theme } = context.globals;

  useEffect(() => {
    const htmlTag = document.documentElement;
    htmlTag.classList =
      theme === "dark" ? "dark bg-slate-800" : "light bg-slate-200";
  }, [theme]);

  return <Story />;
};
