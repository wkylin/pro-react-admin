import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import { transformFileAsync } from '@babel/core'
import webpack from 'webpack'
import { experimental_loadStorybook } from 'storybook/internal/core-server'
import { webpackFinal as addBabelCompiler } from '@storybook/addon-webpack5-compiler-babel/preset'
import config from '../.storybook/main.ts'

test('Storybook compiles hooks without application React Refresh globals', async () => {
  const options = await config.babel({})
  const result = await transformFileAsync('src/app/model/index.tsx', options)
  assert.doesNotMatch(result.code, /\$Refresh(?:Sig|Reg)\$/)
  const app = await transformFileAsync('src/app/model/index.tsx', { envName: 'development' })
  assert.match(app.code, /\$RefreshSig\$/)
})

test('Storybook development Babel loader bundles and loads the store/theme without Refresh runtime', async (t) => {
  const outputPath = await fs.mkdtemp(path.join(os.tmpdir(), 'pro-react-admin-storybook-test-'))
  t.after(() => fs.rm(outputPath, { recursive: true, force: true }))
  // Resolve the actual presets used by Storybook, rather than calling the main Babel hook alone.
  const options = await experimental_loadStorybook({
    configDir: path.resolve('.storybook'),
    ignorePreview: true,
    disableTelemetry: true,
  })
  const withBabel = await addBabelCompiler(
    {
      mode: 'development',
      target: 'node',
      context: process.cwd(),
      entry: './src/theme/hooks.tsx',
      output: { path: outputPath, filename: 'preview.cjs', library: { type: 'commonjs2' } },
      resolve: { extensions: ['.tsx', '.ts', '.js'] },
      externals: [/^(?:react|zustand)(?:\/|$)/],
      devtool: false,
      cache: false,
    },
    options
  )
  const compiler = webpack(await config.webpackFinal(withBabel))
  try {
    const stats = await new Promise((resolve, reject) => {
      compiler.run((error, result) => (error ? reject(error) : resolve(result)))
    })
    assert.equal(stats.hasErrors(), false, stats.toString({ all: false, errors: true }))
    const code = await fs.readFile(path.join(outputPath, 'preview.cjs'), 'utf8')
    assert.doesNotMatch(code, /\$Refresh(?:Sig|Reg)\$/)
    const module = { exports: {} }
    vm.runInNewContext(code, { module, exports: module.exports, require: createRequire(import.meta.url) })
    assert.equal(typeof module.exports.ProThemeProvider, 'function')
  } finally {
    await new Promise((resolve, reject) => compiler.close((error) => (error ? reject(error) : resolve())))
  }
})

test('Storybook CSS Modules expose the default export used by current components', async () => {
  const result = await config.webpackFinal({ module: { rules: [] } })
  const less = result.module.rules.find((rule) => rule.test?.test('index.module.less'))
  const cssLoader = less.use.find((entry) => entry.loader === 'css-loader')
  assert.equal(cssLoader.options.modules.namedExport, false)
})
