const path = require('node:path')
const aliases = require('../../config/path-aliases.json')
const aliasMappings = Object.fromEntries(
  Object.entries(aliases)
    .sort(([left], [right]) => right.length - left.length)
    .flatMap(([alias, target]) => {
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      return [
        [`^${escaped}$`, `<rootDir>/${target}`],
        [`^${escaped}/(.*)$`, `<rootDir>/${target}/$1`],
      ]
    })
)

module.exports = {
  rootDir: path.resolve(__dirname, '../..'),
  testEnvironment: 'jsdom',
  maxWorkers: 1,
  collectCoverage: false,
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/tests/reports/unit/coverage',
  coverageReporters: ['text-summary', 'json-summary', 'lcov'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'packages/wui-react/src/**/*.{js,jsx,ts,tsx}',
    '!**/*.{test,spec,stories}.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
  ],
  reporters: ['default', '<rootDir>/tests/unit/report.cjs'],
  transform: {
    '^.+\\.(t|j)sx?$': '<rootDir>/tests/unit/transform.cjs',
  },
  // When the package is ESM ("type": "module"), treat these extensions as ESM for Jest
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // The local esbuild transformer does not use Babel globals.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/tests/unit/styleMock.js',
    ...aliasMappings,
    '^isomorphic-dompurify$': '<rootDir>/node_modules/isomorphic-dompurify/dist/browser.js',
  },
  // Ignore built/distribution files to avoid haste name collisions
  modulePathIgnorePatterns: ['<rootDir>/packages/wui-react/dist/', '<rootDir>/.delta/', '<rootDir>/.vercel/'],
  testPathIgnorePatterns: ['/tests/e2e/', '/tests/reports/', '/.delta/', '/scripts/'],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setupTests.js'],
}
