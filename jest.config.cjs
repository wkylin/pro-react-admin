module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/jest/styleMock.js',
    '^@\\/(.*)$': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: ['/tests/e2e/'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.js']
}
