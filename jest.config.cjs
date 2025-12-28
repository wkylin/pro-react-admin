module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  transform: {
    '^.+\\.(t|j)sx?$': 'esbuild-jest'
  },
  // When the package is ESM ("type": "module"), treat these extensions as ESM for Jest
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
  // esbuild-jest does not need babel-jest globals
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/jest/styleMock.js',
    '^@\\/(.*)$': '<rootDir>/src/$1'
  },
  // Ignore built/distribution files to avoid haste name collisions
  modulePathIgnorePatterns: ['<rootDir>/dist-lib/'],
  testPathIgnorePatterns: ['/tests/e2e/'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.js']
}
