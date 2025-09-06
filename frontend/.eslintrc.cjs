module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  globals: {
    vi: 'readonly',
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: "19.0",
    },
  },
  plugins: ["react-refresh", "@typescript-eslint"],
  rules: {
    // Existing rules
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": "off", // Replaced by TypeScript rule
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-template": "error",
    "template-curly-spacing": ["error", "never"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "comma-dangle": ["error", "never"],
    semi: ["error", "always"],
    quotes: ["error", "single", { avoidEscape: true }],
    indent: ["error", 2],
    "eol-last": "error",
    "no-trailing-spaces": "error",
    "jsx-quotes": ["error", "prefer-double"],

    // TypeScript rules
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-inferrable-types": "off",
  },
  overrides: [
    {
      files: ["src/services/api.js"],
      rules: {
        "no-console": "off", // Allow console statements in API service for logging
      },
    },
  ],
};