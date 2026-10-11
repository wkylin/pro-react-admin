import test from 'node:test'
import assert from 'node:assert/strict'
import { transformFileAsync } from '@babel/core'
import config from '../.storybook/main.ts'

test('Storybook compiles hooks without application React Refresh globals', async () => {
  const options = await config.babel({})
  const result = await transformFileAsync('src/app/model/index.tsx', options)
  assert.doesNotMatch(result.code, /\$Refresh(?:Sig|Reg)\$/)
  const app = await transformFileAsync('src/app/model/index.tsx', { envName: 'development' })
  assert.match(app.code, /\$RefreshSig\$/)
})

test('Storybook CSS Modules expose the default export used by current components', async () => {
  const result = await config.webpackFinal({ module: { rules: [] } })
  const less = result.module.rules.find((rule) => rule.test?.test('index.module.less'))
  const cssLoader = less.use.find((entry) => entry.loader === 'css-loader')
  assert.equal(cssLoader.options.modules.namedExport, false)
})
