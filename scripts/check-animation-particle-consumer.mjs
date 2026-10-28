import { createRequire, registerHooks } from 'node:module'
import { pathToFileURL } from 'node:url'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
const [repo, format, mode] = process.argv.slice(2)
const require = createRequire(repo + '/package.json')
const React = require('react')
const { renderToString } = require('react-dom/server')
const postcss = require('postcss')
const css = postcss.parse(readFileSync(repo + '/packages/wui-react/dist/style.css', 'utf8'))
const ruleHas = (selector, property, value) => {
  let found = false
  css.walkRules((rule) => {
    if (
      !rule.selector
        .split(',')
        .map((s) => s.replace(/\s/g, ''))
        .includes(selector.replace(/\s/g, ''))
    )
      return
    rule.walkDecls(property, (declaration) => {
      if (declaration.value.includes(value)) found = true
    })
  })
  assert.ok(found, `${selector} must retain ${property}: ${value}`)
}
ruleHas('.wui-scroll-strip', 'display', 'inline-block')
ruleHas('.wui-slide-button', 'position', 'relative')
ruleHas('.wui-animation-complete-text', 'position', 'absolute')
ruleHas('.wui-animation-complete-text', 'width', '1px')
ruleHas('.wui-animation-complete-text', 'overflow', 'hidden')
ruleHas('.wui-magic-trail', 'pointer-events', 'none')
ruleHas('.wui-meteors', 'transform', 'rotate(-45deg)')
ruleHas('.wui-mouse-trail > .wui-mouse-trail-image', 'object-fit', 'cover')
const keyframes = new Set()
css.walkAtRules(/keyframes$/, (rule) => {
  if (rule.nodes.length > 0) keyframes.add(rule.params)
})
for (const name of ['wui-orbit', 'wui-meteor-blink', 'wui-c-slide-x', 'wui-c-slide-y', 'wui-c-clip'])
  assert.ok(keyframes.has(name), `missing live keyframes ${name}`)
let resolves = 0
registerHooks({
  resolve(specifier, context, next) {
    if (specifier === '@tsparticles/slim') {
      assert.ok(context.conditions.includes('import'), 'slim must use the native import condition')
      resolves++
      return {
        shortCircuit: true,
        url:
          'data:text/javascript,' +
          encodeURIComponent(
            `export async function loadSlim() { globalThis.__slimLoads = (globalThis.__slimLoads || 0) + 1; ${mode === 'failure' ? "throw new Error('expected missing/failed optional peer')" : 'await new Promise(resolve => {globalThis.__slimResolve = resolve})'} }`
          ),
      }
    }
    return next(specifier, context)
  },
})
const file = repo + '/packages/wui-react/dist/' + (format === 'cjs' ? 'cjs/animation.cjs' : 'esm/animation.js')
const animation = format === 'cjs' ? require(file) : await import(pathToFileURL(file))
assert.equal(resolves, 0, 'animation import must not load slim')
const html = renderToString(
  React.createElement(
    React.Fragment,
    null,
    React.createElement(animation.ShinyText, { text: 'Standalone' }),
    React.createElement(animation.TypeWriter, { text: 'Accessible complete text' }),
    React.createElement(animation.Sparkles, { id: 'test-sparkles' })
  )
)
assert.match(html, /Standalone/)
assert.ok(
  html.includes('<span class="wui-animation-complete-text">Accessible complete text</span>'),
  'SSR must expose a complete ordinary text node'
)
assert.ok(!html.includes('aria-label="Accessible complete text"'))
assert.equal(resolves, 0, 'SSR must not load slim')
const { JSDOM } = createRequire(require.resolve('jest-environment-jsdom'))('jsdom')
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost/' })
globalThis.window = dom.window
globalThis.document = dom.window.document
globalThis.IS_REACT_ACT_ENVIRONMENT = true
const { createRoot } = require('react-dom/client')
const root = createRoot(document.getElementById('root'))
const errors = []
process.on('unhandledRejection', (err) => errors.push(err))
await React.act(async () => {
  root.render(React.createElement(animation.Sparkles, { id: 'test-sparkles' }))
  await new Promise((r) => setTimeout(r, 20))
})
assert.equal(resolves, 1, 'slim must load lazily on mount')
assert.equal(globalThis.__slimLoads, 1)
await React.act(async () => root.unmount())
if (mode === 'pending')
  await React.act(async () => {
    globalThis.__slimResolve()
    await new Promise((r) => setTimeout(r, 10))
  })
await new Promise((r) => setTimeout(r, 10))
assert.equal(document.querySelectorAll('canvas').length, 0)
assert.equal(errors.length, 0)
dom.window.close()
console.log(
  `${format} ${mode}: live animation CSS verified; built animation import/SSR deferred slim; Sparkles lazy initialization ${mode === 'failure' ? 'rejection handled' : 'unmount before resolution safe'}`
)
