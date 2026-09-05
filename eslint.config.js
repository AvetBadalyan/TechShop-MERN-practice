import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  // Lint the backend (Node, ES modules). The frontend uses Vite's own tooling.
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
  // Turn off any stylistic rules that would conflict with Prettier.
  prettier,
  {
    ignores: ["**/node_modules/**", "frontend/**", "uploads/**"],
  },
];
