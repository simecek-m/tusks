import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import globals from "globals";
import storybook from "eslint-plugin-storybook";

const tsConfig = {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: tsparser,
    parserOptions: {
      project: "./tsconfig.json",
      sourceType: "module",
      ecmaVersion: 2021,
    },
    globals: {
      ...globals.browser,
    },
  },
  plugins: {
    "@typescript-eslint": tseslint,
  },
  rules: {
    ...tseslint.configs.recommended.rules,
  },
};

const reactConfig = {
  files: ["**/*.jsx", "**/*.tsx"],
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
  plugins: {
    react: reactPlugin,
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

const storybookConfig = {
  files: ["**/*.stories.@(ts|tsx|js|jsx)", ".storybook/**/*.@(ts|tsx|js|jsx)"],
  plugins: {
    storybook,
  },
  rules: {
    ...storybook.configs.recommended.rules,
  },
};

export default [
  js.configs.recommended,
  tsConfig,
  reactConfig,
  storybookConfig,
  prettier,
  {
    ignores: ["build", "storybook-static", "!.storybook", "dist"],
  },
];
