import { satisfiesVersionRange } from './version-range'

test.each([
  ['5.1.0', '>=5.1.0 <6.0.0', true],
  ['5.9.99', '^5.1.0', true],
  ['6.0.0', '^5.1.0', false],
  ['0.2.4', '^0.2.3', true],
  ['0.3.0', '^0.2.3', false],
  ['5.2.0', '~5.1.0', false],
  ['6.0.0', '>=6.0.0 || <5.0.0', true],
  ['5.1.0-beta.1', '>=5.1.0 <6.0.0', false],
  ['5.1.0', 'not-a-range', false],
  ['5.1.0', '>=6.0.0 <5.0.0', false],
])('matches %s against %s as %s', (version, range, expected) => {
  expect(satisfiesVersionRange(version, range)).toBe(expected)
})
