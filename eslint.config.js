module.exports = {
  files: ["**/*.ts", "**/*.js"],
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parser: require("@typescript-eslint/parser"),
  },
  plugins: {
    "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "no-var": "error",
  },
  ignores: ["dist/", "node_modules/", "examples/"],
};
