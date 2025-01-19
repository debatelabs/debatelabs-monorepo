import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import eslintPluginPrettier from "eslint-plugin-prettier";
import prettierOptions from "@repo/prettier-config";
import tseslintParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "dist/*",
      "node_modules/*",
      ".turbo/*",
      "coverage/*",
      "*.config.js",
      "*.config.mjs",
      "*.config.mts",
      "*.config.ts",
    ],
  },
  { files: ["**/*.{js,ts}"] },
  {
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          modules: true,
        },
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: {
      turbo: turboPlugin,
      prettier: eslintPluginPrettier,
    },
  },
  {
    rules: {
      "prettier/prettier": ["warn", prettierOptions],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "prefer-const": "off",
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 2,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-interface": "warn",
    },
  },
];
