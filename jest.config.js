module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  testMatch: ['<rootDir>/**/__tests__/**/*.test.{ts,tsx}'],
  preset: "ts-jest",
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom"
}
