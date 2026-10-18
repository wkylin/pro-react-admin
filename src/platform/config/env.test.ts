/** @jest-environment node */
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { transformSync } from 'esbuild'

test('injected browser environment works without a process global', () => {
  const source = fs.readFileSync(path.join(__dirname, 'env.ts'), 'utf8')
  const { code } = transformSync(source, {
    loader: 'ts',
    format: 'cjs',
    define: { 'process.env': JSON.stringify({ REACT_APP_USE_MOCK: 'true', APP_BASE_URL: '/gateway' }) },
  })
  const module = { exports: {} as { getEnv: (key: string) => string; getEnvBool: (key: string) => boolean } }
  vm.runInNewContext(code, { module })
  expect(module.exports.getEnvBool('REACT_APP_USE_MOCK')).toBe(true)
  expect(module.exports.getEnv('APP_BASE_URL')).toBe('/gateway')
})
