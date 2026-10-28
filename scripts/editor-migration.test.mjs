import test from 'node:test'
import assert from 'node:assert/strict'
import { build } from 'esbuild'
import { createRequire } from 'node:module'
import fs from 'node:fs/promises'
const require = createRequire(import.meta.url)
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
async function load(entry) {
  const result = await build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    platform: 'node',
    format: 'cjs',
    jsx: 'automatic',
    external: ['react', 'react-dom', 'isomorphic-dompurify'],
    loader: { '.less': 'empty' },
  })
  const module = { exports: {} }
  new Function('require', 'module', 'exports', result.outputFiles[0].text)(require, module, module.exports)
  return module.exports
}
test('real Markdown renderer drops hostile raw HTML and dangerous URLs but retains GFM', async () => {
  const { default: ReMarkdown } = await load('packages/wui-react/src/editor/ReMarkdown/index.tsx')
  const output = renderToStaticMarkup(
    React.createElement(ReMarkdown, {
      markdownText:
        '<script>alert(1)</script>\n\n<img src=x onerror="alert(1)">\n\n[click](javascript:alert(1))\n\n| A | B |\n| - | - |\n| 1 | 2 |',
    })
  )
  assert.doesNotMatch(output, /<script|onerror|javascript:/)
  assert.match(output, /<table>/)
  assert.match(output, /noopener noreferrer/)
  const links = renderToStaticMarkup(
    React.createElement(ReMarkdown, { markdownText: '[Internal](/#section) [External](https://example.test)' })
  )
  assert.match(links, /href="\/#section" target="_self"/)
  assert.match(links, /href="https:\/\/example.test" target="_blank" rel="noopener noreferrer"/)
})
test('real marked parsing sanitizes raw HTML and preserves Markdown structure', async () => {
  const { markdownToHtml } = await load('packages/wui-react/src/editor/MdxEditor/utils/markdownHelper.ts')
  const output = markdownToHtml('# Heading\n\n<img src=x onerror="alert(1)">\n\n<script>alert(1)</script>')
  assert.match(output, /<h1>Heading<\/h1>/)
  assert.doesNotMatch(output, /<script|onerror/)
})
test('editor implementation is package-local and peers remain outside root entry', async () => {
  const contract = await import('../config/library-contract.mjs')
  const editor = contract.libraryGroups.find((g) => g.subpath === 'editor')
  assert.equal(editor.runtimeExports.length, 7)
  const root = await fs.readFile('packages/wui-react/src/index.ts', 'utf8')
  assert.doesNotMatch(root, /editor|shiki|tiptap|sandpack/)
})

test('rich text editor renders on the server without browser globals or demo content', async () => {
  const { default: MdxEditor } = await load('packages/wui-react/src/editor/MdxEditor/index.tsx')
  const html = renderToStaticMarkup(
    React.createElement(MdxEditor, { title: 'Caller title', value: '# Content', readOnly: true })
  )
  assert.match(html, /Caller title/)
  assert.doesNotMatch(html, /Pro MDX Editor|欢迎使用/)
})

test('rich editor updates controlled Markdown and enforces readOnly in both views', async () => {
  const envRequire = createRequire(require.resolve('jest-environment-jsdom'))
  const { JSDOM } = envRequire('jsdom')
  const dom = new JSDOM('<!doctype html><div id="root"></div>', {
    url: 'https://example.test',
    pretendToBeVisual: true,
  })
  const keys = [
    'window',
    'document',
    'navigator',
    'HTMLElement',
    'Element',
    'Node',
    'MutationObserver',
    'getComputedStyle',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'IS_REACT_ACT_ENVIRONMENT',
  ]
  const descriptors = new Map(keys.map((k) => [k, Object.getOwnPropertyDescriptor(globalThis, k)]))
  for (const key of keys)
    Object.defineProperty(globalThis, key, {
      configurable: true,
      writable: true,
      value: key === 'IS_REACT_ACT_ENVIRONMENT' ? true : dom.window[key],
    })
  let root
  try {
    const { default: MdxEditor } = await load('packages/wui-react/src/editor/MdxEditor/index.tsx')
    const { createRoot } = require('react-dom/client')
    root = createRoot(document.getElementById('root'))
    await React.act(async () => {
      root.render(React.createElement(MdxEditor, { value: '# First' }))
      await new Promise((r) => setTimeout(r, 20))
    })
    await React.act(async () => {
      await new Promise((r) => setTimeout(r, 20))
    })
    assert.match(document.querySelector('.ProseMirror').textContent, /First/)
    await React.act(async () => {
      root.render(React.createElement(MdxEditor, { value: '# Second', readOnly: true }))
    })
    assert.match(document.querySelector('.ProseMirror').textContent, /Second/)
    assert.equal(document.querySelector('.ProseMirror').getAttribute('contenteditable'), 'false')
    // Read-only also blocks the EditorCore click-below-content insertion helper.
    const before = document.querySelector('.ProseMirror').innerHTML
    await React.act(async () => {
      document.querySelector('.ProseMirror').dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }))
    })
    assert.equal(document.querySelector('.ProseMirror').innerHTML, before)
    await React.act(async () => {
      root.render(React.createElement(MdxEditor, { value: '# First' }))
    })
    assert.match(document.querySelector('.ProseMirror').textContent, /First/)
    const sourceButton = [...document.querySelectorAll('button')].find((button) => button.textContent === '源码')
    await React.act(async () => sourceButton.click())
    assert.equal(document.querySelector('textarea').value, '# First')
    await React.act(async () => {
      root.render(React.createElement(MdxEditor, { value: '# Second', readOnly: true }))
    })
    assert.equal(document.querySelector('textarea').readOnly, true)
    assert.equal(document.querySelector('textarea').value, '# Second')
    const button = (text) => [...document.querySelectorAll('button')].find((node) => node.textContent === text)
    assert.ok(button('编辑'), 'readOnly keeps mode controls')
    assert.equal(document.querySelector('button[title="加粗"]').disabled, true)
    await React.act(async () => button('编辑').click())
    assert.equal(document.querySelector('textarea'), null)
    await React.act(async () => button('分屏').click())
    assert.equal(document.querySelector('textarea').readOnly, true)
    // Remount initially readOnly: viewing remains possible without enabling editing.
    await React.act(async () =>
      root.render(React.createElement(MdxEditor, { key: 'readonly', value: '# Readonly', readOnly: true }))
    )
    await React.act(async () => {
      await new Promise((r) => setTimeout(r, 20))
    })
    await React.act(async () => button('源码').click())
    assert.equal(document.querySelector('textarea').readOnly, true)

    let accepted = '# Original'
    let proposed = ''
    let accept = false
    const changed = (next) => {
      proposed = next
      if (accept) accepted = next
      renderControlled()
    }
    const renderControlled = () =>
      root.render(React.createElement(MdxEditor, { key: 'controlled', value: accepted, onChange: changed }))
    await React.act(async () => renderControlled())
    await React.act(async () => {
      await new Promise((r) => setTimeout(r, 20))
    })
    const editRich = async (text) => {
      await React.act(async () => {
        const content = document.querySelector('.ProseMirror h1')
        content.textContent = text
        content.dispatchEvent(
          new dom.window.InputEvent('input', { bubbles: true, inputType: 'insertText', data: text })
        )
        await new Promise((r) => setTimeout(r, 20))
      })
    }
    await editRich('Rejected')
    assert.match(proposed, /Rejected/)
    assert.match(document.querySelector('.ProseMirror').textContent, /Original/)
    accept = true
    await editRich('Accepted')
    assert.match(document.querySelector('.ProseMirror').textContent, /Accepted/)
    accepted = '# Original'
    await React.act(async () => renderControlled())
    assert.match(document.querySelector('.ProseMirror').textContent, /Original/)
    await React.act(async () => button('源码').click())
    const editSource = async (text) => {
      await React.act(async () => {
        const textarea = document.querySelector('textarea')
        // React's native value setter observes a real DOM input event.
        Object.getOwnPropertyDescriptor(dom.window.HTMLTextAreaElement.prototype, 'value').set.call(textarea, text)
        textarea.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
      })
    }
    accept = false
    await editSource('# Rejected source')
    assert.equal(proposed, '# Rejected source')
    assert.equal(document.querySelector('textarea').value, '# Original')
    let copied
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text) => {
          copied = text
        },
      },
    })
    await React.act(async () => document.querySelector('button[aria-label="Copy Markdown"]').click())
    assert.equal(copied, '# Original')
    accept = true
    await editSource('# Accepted source')
    assert.equal(document.querySelector('textarea').value, '# Accepted source')
    accepted = '# Original'
    await React.act(async () => renderControlled())
    assert.equal(document.querySelector('textarea').value, '# Original')
  } finally {
    if (root) await React.act(async () => root.unmount())
    await new Promise((r) => setTimeout(r, 50))
    dom.window.close()
    for (const key of keys) {
      const descriptor = descriptors.get(key)
      if (descriptor) Object.defineProperty(globalThis, key, descriptor)
      else delete globalThis[key]
    }
  }
})
