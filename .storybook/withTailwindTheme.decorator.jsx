import { useEffect } from "react";

export const withTailwindTheme = (Story, context) => {
  const { theme } = context.globals;

  useEffect(() => {
    const htmlTag = document.documentElement;
    htmlTag.classList.remove("dark", "light", "bg-slate-800", "bg-slate-200");

    if (theme === "dark") {
      htmlTag.classList.add("dark", "bg-slate-800");
    } else {
      htmlTag.classList.add("light", "bg-slate-200");
    }
  }, [theme]);

  return <Story />;
};
