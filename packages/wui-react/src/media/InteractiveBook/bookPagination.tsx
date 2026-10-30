import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'

interface ContentNode {
  id: number
  start: number
  end: number
  value: ReactNode
  text?: string[]
  children?: ContentNode[]
}

// Replaced elements and interactive widgets must retain their complete DOM subtree.
const atomicTags = new Set([
  'svg',
  'math',
  'canvas',
  'video',
  'audio',
  'iframe',
  'object',
  'picture',
  'button',
  'select',
  'textarea',
])

/** Keep React elements (including links and handlers); only divide their text children. */
export function createContentTree(value: ReactNode) {
  let offset = 0
  let id = 0
  const visit = (node: ReactNode): ContentNode => {
    const result: ContentNode = { id: id++, start: offset, end: offset, value: node }
    if (typeof node === 'string' || typeof node === 'number') {
      result.text = Array.from(String(node))
      offset += result.text.length
    } else if (
      Array.isArray(node) ||
      (isValidElement<{ children?: ReactNode }>(node) &&
        (node.type === Fragment ||
          (typeof node.type === 'string' && !atomicTags.has(node.type) && node.props.children != null)))
    ) {
      result.children = Children.toArray(
        Array.isArray(node) ? node : (node as ReactElement<{ children?: ReactNode }>).props.children
      ).map(visit)
    } else if (node != null && typeof node !== 'boolean') {
      offset++ // An image or custom component stays whole.
    }
    result.end = offset
    return result
  }
  return visit(value)
}

export function sliceContent(tree: ContentNode, start: number, end: number, annotate = false): ReactNode {
  if (tree.end <= start || tree.start >= end) return null
  if (tree.text) {
    const text = tree.text.slice(Math.max(0, start - tree.start), end - tree.start).join('')
    return annotate ? (
      <span data-book-flow-node={tree.id} style={{ display: 'contents' }}>
        {text}
      </span>
    ) : (
      text
    )
  }
  if (tree.children) {
    const children = tree.children.map((child) => (
      <Fragment key={child.id}>{sliceContent(child, start, end, annotate)}</Fragment>
    ))
    if (!isValidElement(tree.value) || tree.value.type === Fragment) return children
    return cloneElement(
      tree.value as ReactElement<Record<string, unknown>>,
      annotate ? { 'data-book-flow-node': tree.id } : {},
      children
    )
  }
  return annotate ? (
    <span data-book-flow-node={tree.id} style={{ display: 'contents' }}>
      {tree.value}
    </span>
  ) : (
    tree.value
  )
}

export interface PageSlice {
  start: number
  end: number
  content: ReactNode
  scale: number
}

export function paginateContent(
  tree: ContentNode,
  fits: (start: number, end: number) => boolean
): Array<[number, number]> {
  if (!tree.end) return [[0, 0]]
  const ranges: Array<[number, number]> = []
  const boundaries = new Set<number>()
  const visit = (node: ContentNode) => {
    if (node.children) node.children.forEach(visit)
    if (
      isValidElement(node.value) &&
      typeof node.value.type === 'string' &&
      /^(p|div|li|h[1-6]|blockquote|section)$/.test(node.value.type)
    )
      boundaries.add(node.end)
    node.text?.forEach((character, index) => {
      if (/[\s，。；！？、,.!?;]/u.test(character)) boundaries.add(node.start + index + 1)
    })
  }
  visit(tree)
  let start = 0
  while (start < tree.end) {
    let low = start + 1
    let high = tree.end
    let end = start
    while (low <= high) {
      const middle = Math.floor((low + high) / 2)
      if (fits(start, middle)) {
        end = middle
        low = middle + 1
      } else high = middle - 1
    }
    end = Math.max(start + 1, end)
    if (end < tree.end) {
      // Prefer a paragraph, word or punctuation boundary without leaving a large hole.
      const boundary = [...boundaries]
        .filter((point) => point > start && point <= end && point >= start + (end - start) * 0.7)
        .sort((a, b) => a - b)
        .at(-1)
      if (boundary) end = boundary
    }
    ranges.push([start, end])
    start = end
  }
  return ranges
}

export interface PaginationSource {
  key: string
  content: ReactNode
  render: (content: ReactNode) => ReactNode
}

export function useBookPagination(sources: PaginationSource[], width: number, height: number, layoutKey: string) {
  const probe = useRef<HTMLDivElement>(null)
  const trees = useMemo(() => sources.map((source) => createContentTree(source.content)), [sources])
  const [result, setResult] = useState<{
    sources: PaginationSource[] | null
    parts: Record<string, PageSlice[]>
  }>({ sources: null, parts: {} })
  useLayoutEffect(() => {
    const root = probe.current
    if (!root) return
    let cancelled = false
    let generation = 0
    const measure = async () => {
      if (cancelled) return
      const revision = ++generation
      let frameStarted = performance.now()
      const next: Record<string, PageSlice[]> = {}
      for (const [index, source] of sources.entries()) {
        if (cancelled || revision !== generation) return
        const page = root.children[index] as HTMLElement
        const body = page.querySelector<HTMLElement>('[data-book-flow]')
        const original = body?.querySelector<HTMLElement>('[data-book-flow-content]')
        if (!body || !original || body.clientHeight <= 0) continue
        const tree = trees[index]
        const nodes = new Map(
          [...original.querySelectorAll<HTMLElement>('[data-book-flow-node]')].map((node) => [
            Number(node.dataset.bookFlowNode),
            node,
          ])
        )
        const scratch = original.cloneNode(false) as HTMLElement
        const originalDisplay = original.style.display
        original.style.display = 'none'
        body.appendChild(scratch)
        const clone = (node: ContentNode, start: number, end: number): Node => {
          const fragment = document.createDocumentFragment()
          if (node.end <= start || node.start >= end) return fragment
          if (node.text)
            return document.createTextNode(node.text.slice(Math.max(0, start - node.start), end - node.start).join(''))
          const element = nodes.get(node.id)
          if (node.children) {
            const parent = element ? element.cloneNode(false) : fragment
            node.children.forEach((child) => parent.appendChild(clone(child, start, end)))
            return parent
          }
          return element?.cloneNode(true) ?? fragment
        }
        const available =
          body.clientHeight -
          parseFloat(getComputedStyle(body).paddingTop) -
          parseFloat(getComputedStyle(body).paddingBottom)
        const dimensions = (start: number, end: number) => {
          scratch.replaceChildren(clone(tree, start, end))
          return { height: scratch.getBoundingClientRect().height, width: scratch.scrollWidth }
        }
        const ranges = paginateContent(tree, (start, end) => {
          const size = dimensions(start, end)
          return size.height <= available + 0.25 && size.width <= scratch.clientWidth + 1
        })
        next[source.key] = ranges.map(([start, end]) => {
          const size = dimensions(start, end)
          return {
            start,
            end,
            content: sliceContent(tree, start, end),
            scale: Math.min(1, available / Math.max(1, size.height), scratch.clientWidth / Math.max(1, size.width)),
          }
        })
        scratch.remove()
        original.style.display = originalDisplay
        // Full novels have hundreds of source faces. Let input, loading UI and cancellation run between them.
        if (performance.now() - frameStarted > 12) {
          await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
          frameStarted = performance.now()
        }
      }
      if (!cancelled && revision === generation) {
        // A temporarily collapsed flow area (for example a forced double spread
        // on a narrow screen) must not erase valid slices or leave loading stuck.
        setResult((previous) => ({
          sources,
          parts: previous.sources === sources ? { ...previous.parts, ...next } : next,
        }))
      }
    }
    void measure()
    if (document.fonts?.status === 'loading') void document.fonts.ready.then(measure)
    root.addEventListener('load', measure, true)
    return () => {
      cancelled = true
      root.removeEventListener('load', measure, true)
    }
  }, [sources, trees, width, height, layoutKey])
  const measurement = (
    <div
      ref={probe}
      aria-hidden="true"
      inert
      style={
        {
          position: 'absolute',
          left: -100000,
          top: 0,
          visibility: 'hidden',
          height,
          overflow: 'hidden',
          pointerEvents: 'none',
          width,
          '--page-width': `${width}px`,
        } as React.CSSProperties
      }
    >
      {sources.map((source, index) => (
        <div
          key={source.key}
          style={{ width, height, border: '1px solid transparent', borderRight: 0, boxSizing: 'border-box' }}
        >
          {source.render(sliceContent(trees[index], 0, trees[index].end, true))}
        </div>
      ))}
    </div>
  )
  return { parts: result.parts, ready: result.sources === sources, measurement }
}

export function PageFlow({ children, scale = 1 }: { children: ReactNode; scale?: number }) {
  return (
    <div
      data-book-flow-content
      style={{
        display: 'flow-root',
        ...(scale < 1 ? { transform: `scale(${scale})`, transformOrigin: 'top left' } : {}),
      }}
    >
      {children}
    </div>
  )
}
