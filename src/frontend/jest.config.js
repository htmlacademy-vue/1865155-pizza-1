module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  moduleFileExtensions: ["js", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  moduleNameMapper: {
    // eslint-disable-next-line prettier/prettier, no-useless-escape
    /* "/^@\/(.*)$/": "<rootDir>/src/$1", */
    // eslint-disable-next-line prettier/prettier, no-useless-escape
    "/^@\/(.*)$/": "/home/it/pizza-project/src/frontend/src/$1",
    /* "^@/(.*)$": "<rootDir>/src/$1", */
  },
  resolver: null,
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
};
