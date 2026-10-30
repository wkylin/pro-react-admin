import { render, fireEvent } from '@testing-library/react'
import { createContentTree, paginateContent, sliceContent } from './bookPagination'
import { bookTitleParts } from './bookTitle'
import { getMatterContent } from './BookMatter'

test('long nested prose is divided without dropping or duplicating Unicode text', () => {
  const tree = createContentTree(
    <>
      <h2>后记</h2>
      <p>
        阅读😀之后，<strong>从一个熟悉的任务开始。</strong>记录判断依据与行动结果。
      </p>
      <p>最后一段。</p>
    </>
  )
  const ranges = paginateContent(tree, (start, end) => end - start <= 12)
  expect(ranges.length).toBeGreaterThan(2)
  const full = render(<>{sliceContent(tree, 0, tree.end)}</>).container.textContent
  const parts = ranges
    .map(([start, end]) => render(<>{sliceContent(tree, start, end)}</>).container.textContent)
    .join('')
  expect(parts).toBe(full)
  expect(parts).toContain('😀')
  expect(ranges.at(-1)?.[1]).toBe(tree.end)
})

test('split React elements retain formatting and click handlers', () => {
  const clicked = jest.fn()
  const tree = createContentTree(
    <p>
      <a href="#chapter" onClick={clicked}>
        打开章节
      </a>
      <em>继续阅读</em>
    </p>
  )
  const part = render(<>{sliceContent(tree, 0, 4)}</>)
  fireEvent.click(part.getByRole('link', { name: '打开章节' }))
  expect(clicked).toHaveBeenCalledTimes(1)
  expect(part.container.querySelector('p > a')).not.toBeNull()
})

test('indivisible content still advances and empty content keeps one page', () => {
  const tree = createContentTree(<img src="/art.png" alt="插图" />)
  expect(paginateContent(tree, () => false)).toEqual([[0, 1]])
  expect(paginateContent(createContentTree(null), () => true)).toEqual([[0, 0]])
})

test('SVG paths remain one illustration even when artwork exceeds a page', () => {
  const tree = createContentTree(
    <svg height={900}>
      <path d="M0 0L10 10" />
      <path d="M10 10L20 20" />
    </svg>
  )
  const ranges = paginateContent(tree, () => false)
  expect(ranges).toHaveLength(1)
  const page = render(<>{sliceContent(tree, ...ranges[0])}</>)
  expect(page.container.querySelectorAll('svg path')).toHaveLength(2)
})

test('title hierarchy preserves explicit copy and the full title remains available to callers', () => {
  const title = '从感知到行动：理解人工智能代理的工作方式与实践路径'
  expect(bookTitleParts(title)).toEqual({
    title: '从感知到行动',
    subtitle: '理解人工智能代理的工作方式与实践路径',
    short: '从感知到行动',
  })
  expect(bookTitleParts(title, '自定义副标题')).toEqual({ title, subtitle: '自定义副标题', short: '从感知到行动' })
  expect(bookTitleParts(title, '理解人工智能代理的工作方式与实践路径').title).toBe('从感知到行动')
  const page = render(<>{getMatterContent('colophon', { title, subtitle: '自定义副标题', publication: {} })}</>)
  expect(page.getByRole('heading', { name: title })).toBeInTheDocument()
  expect(page.getByText('自定义副标题')).toBeInTheDocument()
})
