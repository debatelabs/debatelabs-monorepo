import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import eslintPluginPrettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import prettierOptions from "./prettier.config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "dist/**/*",
      "node_modules/**/*",
      ".pnpm-store/**/*",
      ".turbo/**/*",
      "coverage/**/*",
      ".next/**/*"
    ]
  },
  { files: ["**/*.{js,jsx,ts,tsx}"] },
  {
    languageOptions: {
      ecmaVersion: 2021,
      parser: tseslintParser,
      parserOptions: {
        sourceType: "module",
        globals: {
          ...globals.browser
        },
        ecmaFeatures: {
          modules: true
        }
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: {
      turbo: turboPlugin,
      prettier: eslintPluginPrettier,
      "react-hooks": reactHooks,
      react: reactPlugin,
      "react-refresh": reactRefresh
    }
  },
  {
    rules: {
      "prettier/prettier": ["warn", prettierOptions],
      ...tsPlugin.configs.recommended.rules,
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "prefer-const": "off",
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 2,
          maxEOF: 0,
          maxBOF: 0
        }
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        {
          allowShortCircuit: true,
          allowTernary: true
        }
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-interface": "warn",

      // React
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "off",
      "react/jsx-boolean-value": "error",
      "react/jsx-curly-brace-presence": "error",
      "react/jsx-fragments": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-pascal-case": "error",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }]
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];

export default eslintConfig;
