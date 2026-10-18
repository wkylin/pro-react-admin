import { parseMfeSharedMessage } from './bridge'

describe('MFE shared message contract', () => {
  it('accepts the documented fields and returns a fresh typed value', () => {
    const value = { from: 'projectA', text: 'hello', at: 1_725_000_000_000, to: 'projectB' }
    expect(parseMfeSharedMessage(value)).toEqual(value)
    expect(parseMfeSharedMessage({ from: 'projectA', text: 'hello', at: 1 })).toEqual({
      from: 'projectA',
      text: 'hello',
      at: 1,
    })
  })

  it.each([
    null,
    [],
    { from: '', text: 'hello', at: 1 },
    { from: 'projectA', text: 1, at: 1 },
    { from: 'projectA', text: 'hello', at: Number.POSITIVE_INFINITY },
    { from: 'projectA', text: 'hello', at: 1, to: null },
    { from: 'projectA', text: 'hello', at: 1, extra: true },
    { from: 'projectA', text: 'x'.repeat(2_001), at: 1 },
    JSON.parse('{"from":"projectA","text":"hello","at":1,"__proto__":{}}'),
  ])('rejects malformed or out-of-contract values: %p', (value) => {
    expect(parseMfeSharedMessage(value)).toBeUndefined()
  })
})
