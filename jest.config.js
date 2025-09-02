module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/dist", "<rootDir>/tests"],
  testMatch: [
    "**/__tests__/**/*.js",
    "**/?(*.)+(spec|test).js"
  ],
  collectCoverageFrom: [
    "dist/**/*.js",
    "!dist/**/*.d.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  moduleFileExtensions: ["js", "json"],
};
