import * as blocks from './blocks-reexport'

describe('local simulation: blocks re-export', () => {
  test('exports ArgsTable', () => {
    // debug dump
    // eslint-disable-next-line no-console
    console.log('DEBUG blocks exports:', Object.keys(blocks))
    expect(blocks.ArgsTable).toBeDefined()
  })

  test('ArgsTable equals PureArgsTable', () => {
    expect(blocks.ArgsTable).toBe(blocks.PureArgsTable)
  })
})
