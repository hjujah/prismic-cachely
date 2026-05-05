module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false
  },
  extends: ["plugin:nuxt/recommended", "plugin:prettier/recommended", "prettier"],
  plugins: [],

  rules: {
    "linebreak-style": 0,
    "multiline-ternary": ["error", "always"],
    "newline-per-chained-call": "error",
    quotes: ["error", "double"],
    semi: ["error", "never"]
  }
}
