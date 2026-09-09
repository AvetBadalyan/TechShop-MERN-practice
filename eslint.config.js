import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  // Lint the backend (Node, ES modules).
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_|^next$|^req$|^res$" },
      ],
      "no-console": "off",
    },
  },
  // Lint the frontend (React, Vite, browser). Catches undefined identifiers
  // (missing imports), unused vars, broken hooks rules, and a11y issues.
  {
    files: ["frontend/src/**/*.{js,jsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // The automatic JSX runtime (Vite) means React need not be in scope.
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  // Turn off any stylistic rules that would conflict with Prettier.
  prettier,
  {
    ignores: ["**/node_modules/**", "frontend/dist/**", "uploads/**"],
  },
];
