const aliases = require('./config/path-aliases.json')
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
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageProvider: 'v8',
  transform: {
    '^.+\\.(t|j)sx?$': '<rootDir>/jest/transform.cjs',
  },
  // When the package is ESM ("type": "module"), treat these extensions as ESM for Jest
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // The local esbuild transformer does not use Babel globals.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/jest/styleMock.js',
    ...aliasMappings,
    '^isomorphic-dompurify$': '<rootDir>/node_modules/isomorphic-dompurify/dist/browser.js',
  },
  // Ignore built/distribution files to avoid haste name collisions
  modulePathIgnorePatterns: ['<rootDir>/packages/wui-react/dist/', '<rootDir>/.delta/'],
  testPathIgnorePatterns: ['/tests/e2e/', '/.delta/', '/scripts/'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.js'],
}
