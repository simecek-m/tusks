import "tailwindcss/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { withTailwindTheme } from "./withTailwindTheme.decorator";

library.add(fas);

export const decorators = [withTailwindTheme];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "light", title: "Light", left: "🌞" },
        { value: "dark", title: "Dark", left: "🌛" },
      ],
      dynamicTitle: true,
    },
  },
};
