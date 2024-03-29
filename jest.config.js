/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./"
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.ts",
    "<rootDir>/__mocks__/browserMocks.ts"
  ],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.ts",
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i":
      "<rootDir>/__mocks__/fileMock.ts",
    "^config/(.*)$": "<rootDir>/src/config/$1",
    "^constants/(.*)$": "<rootDir>/src/constants/$1",
    "^types/(.*)$": "<rootDir>/src/types/$1",
    "^client/(.*)$": "<rootDir>/src/client/$1",
    "^server/(.*)$": "<rootDir>/src/server/$1",
    "^mocks/(.*)$": "<rootDir>/src/mocks/$1"
  },
  transform: {"^.+\\.(js|jsx|ts|tsx)$": "ts-jest"},
  transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"]
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
