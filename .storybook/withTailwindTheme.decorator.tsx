import { useEffect } from "react";
import type { Decorator } from "@storybook/react";

export const withTailwindTheme: Decorator = (Story, context) => {
  const { theme } = context.globals as { theme: string };

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
