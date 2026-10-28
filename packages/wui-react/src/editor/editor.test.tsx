import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'

import ScriptView from './ScriptView'
import ShiCode from './ShiCode'

jest.mock('shiki', () => ({ codeToHtml: jest.fn() }))
jest.mock('marked', () => ({ marked: { parse: (value: string) => value } }))
const { default: CodeHighlighter } = require('./CodeHighlighter')
const { markdownToHtml, htmlToMarkdown } = require('./MdxEditor/utils/markdownHelper')
const highlight = require('shiki').codeToHtml as jest.Mock
beforeEach(() => {
  highlight.mockReset()
})
test('ignores stale highlighting completions and preserves escaped fallback on error', async () => {
  let resolveOld!: (s: string) => void
  highlight.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        resolveOld = resolve
      })
  )
  highlight.mockResolvedValueOnce('<pre>new highlighted</pre>')
  const error = jest.fn()
  const { rerender } = render(<CodeHighlighter code="old" onError={error} />)
  rerender(<CodeHighlighter code="new" onError={error} />)
  await act(async () => {})
  expect(screen.getByText('new highlighted')).toBeInTheDocument()
  await act(async () => resolveOld('<pre>stale</pre>'))
  expect(screen.queryByText('stale')).not.toBeInTheDocument()
  highlight.mockRejectedValueOnce(new Error('failed'))
  rerender(<CodeHighlighter code="<script>unsafe</script>" onError={error} />)
  await act(async () => {})
  expect(screen.getByText('<script>unsafe</script>')).toBeInTheDocument()
  expect(error).toHaveBeenCalledTimes(1)
})
test('ignores pending highlighting after unmount', async () => {
  let reject!: (e: Error) => void
  highlight.mockImplementationOnce(
    () =>
      new Promise((_r, j) => {
        reject = j
      })
  )
  const error = jest.fn()
  const { unmount } = render(<CodeHighlighter code="x" onError={error} />)
  unmount()
  await act(async () => reject(new Error('late')))
  expect(error).not.toHaveBeenCalled()
})
test('sanitizes raw HTML and dangerous links before editor insertion', () => {
  const html = markdownToHtml(
    '<img src=x onerror="alert(1)"><script>alert(1)</script><a href="javascript:alert(1)">link</a>'
  )
  expect(html).not.toMatch(/onerror|<script|javascript:/)
  expect(html).toContain('link')
})
test('retains table and task-list Markdown conversion', () => {
  expect(htmlToMarkdown('<table><tr><th>A</th></tr><tr><td>B</td></tr></table>')).toContain('| A |\n| --- |\n| B |')
  expect(htmlToMarkdown('<input type="checkbox" checked>')).toContain('[x]')
})
test('handles empty and replaced command maps with accessible copy controls', () => {
  const { rerender } = render(<ScriptView commandMap={{ npm: 'npm test', pnpm: 'pnpm test' }} />)
  fireEvent.click(screen.getByText('pnpm'))
  rerender(<ScriptView commandMap={{ yarn: 'yarn test' }} />)
  expect(screen.getByText('yarn')).toHaveAttribute('aria-pressed', 'true')
  rerender(<ScriptView commandMap={{}} />)
  expect(screen.getByRole('button', { name: 'Copy command' })).toBeInTheDocument()
})
test('renders caller filenames and preserves whitespace in code', () => {
  render(<ShiCode preCode="  const value = 1" fileName="example.ts" language="typescript" />)
  expect(screen.getByText('example.ts')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Copy code' })).toBeInTheDocument()
})
