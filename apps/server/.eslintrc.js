module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "class-methods-use-this": "off",
    "max-classes-per-file": "off",

    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",

    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-undef": "off",
    "@typescript-eslint/no-param-reassign": "off",
    "@typescript-eslint/no-underscore-dangle": "off",
    "@typescript-eslint/no-nested-ternary": "off",
    "@typescript-eslint/no-case-declarations": "off",

    "no-undef": "off",
    "no-unused-vars": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "no-use-before-define": "off",
    "no-nested-ternary": "off",
    "no-case-declarations": "off",

    "import/no-cycle": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
  },
}