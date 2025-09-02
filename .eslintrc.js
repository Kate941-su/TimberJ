module.exports = {
  files: ["**/*.ts", "**/*.js"],
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parser: require("@typescript-eslint/parser"),
    parserOptions: {
      project: "./tsconfig.json",
    },
  },
  plugins: {
    "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/prefer-const": "error",
    "prefer-const": "error",
    "no-var": "error",
  },
  ignores: ["dist/", "node_modules/", "examples/"],
};
