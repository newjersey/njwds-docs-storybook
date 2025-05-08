import ts from "@typescript-eslint/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          modules: true,
        },
        ecmaVersion: "latest",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...js.configs["recommended"].rules,
      ...jsxA11y.configs["recommended"].rules,
      ...ts.configs["recommended"].rules,
      semi: "error",
      "prefer-const": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
];
