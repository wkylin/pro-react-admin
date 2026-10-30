import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { Script } from 'node:vm'
import { bootSplashTemplatePath, injectBootSplashHtml } from '../build/boot-splash.mjs'

const root = path.dirname(path.dirname(bootSplashTemplatePath))

test('boot splash is shared by Webpack, Vite and the microfrontend shell', () => {
  for (const [template, project] of [
    ['build/webpack/index.html', 'default'],
    ['build/vite/index.html', 'default'],
    ['src/projects/shell/public/index.html', 'shell'],
  ]) {
    const html = fs.readFileSync(path.join(root, template), 'utf8')
    const injected = injectBootSplashHtml(html, project)

    assert.match(injected, /id="global-loader"/)
    assert.match(injected, new RegExp(`pro-react-admin:${project}:theme`))
    assert.equal((injected.match(/id="global-loader"/g) || []).length, 1)
    assert.equal(injectBootSplashHtml(injected, project), injected)
    assert.ok(injected.indexOf('id="global-loader"') < injected.indexOf('id="root"'))
  }
})

test('boot splash scripts parse and HTML fragments without a body are left alone', () => {
  const fragment = fs.readFileSync(bootSplashTemplatePath, 'utf8')
  const scripts = [...fragment.matchAll(/<script>([\s\S]*?)<\/script>/g)]

  assert.equal(scripts.length, 2)
  for (const [, source] of scripts) new Script(source)
  assert.equal(injectBootSplashHtml('<script src="/main.js"></script>', 'default'), '<script src="/main.js"></script>')
})
