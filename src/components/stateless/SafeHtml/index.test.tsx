import { render, screen } from '@testing-library/react'
import SafeHtml from './index'

describe('SafeHtml', () => {
  test('sanitizes dangerous HTML and removes scripts, event handlers and javascript: URIs', () => {
    const dangerous =
      '<img src="javascript:alert(1)" onerror="alert(1)" alt="x"/><a href="javascript:alert(2)">link</a><p>safe</p><script>window.hacked = true;</script>'
    render(<SafeHtml html={dangerous} />)

    // safe content should be rendered
    expect(screen.getByText('safe')).toBeInTheDocument()

    // the rendered container should not contain dangerous snippets
    const container = document.querySelector('.safe-html') as HTMLElement
    expect(container).toBeTruthy()
    const html = container.innerHTML
    expect(html).not.toMatch(/onerror/i)
    expect(html).not.toMatch(/javascript:/i)
    expect(html).not.toMatch(/<script/i)

    // script should not have executed
    expect((global as any).hacked).not.toBe(true)
  })

  test('renders fallback when html is empty', () => {
    render(<SafeHtml html="" fallback={<div data-testid="fb">loading</div>} />)
    expect(screen.getByTestId('fb')).toBeInTheDocument()
  })

  test('renders with custom tag', () => {
    render(<SafeHtml tag="section" html="<p>hello</p>" data-testid="wrap" />)
    const wrap = screen.getByTestId('wrap')
    expect(wrap.tagName).toBe('SECTION')
    expect(wrap.innerHTML).toContain('<p>hello</p>')
  })

  test('allows data: URI for images', () => {
    render(<SafeHtml html='<img src="data:image/png;base64,xyz" alt="ok" />' />)
    const img = document.querySelector('img') as HTMLImageElement | null
    expect(img).toBeTruthy()
    expect(img!.getAttribute('src')).toMatch(/^data:/)
  })
})
