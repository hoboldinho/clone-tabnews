const { defineConfig, globalIgnores } = require("eslint/config");
const js = require("@eslint/js");

module.exports = defineConfig([
  globalIgnores(["**/.next/"]),
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "error",
      "no-undef": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
