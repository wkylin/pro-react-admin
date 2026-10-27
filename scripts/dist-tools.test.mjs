import test from 'node:test'
import assert from 'node:assert/strict'
import { loadProjectRegistry } from '../config/project-registry.mjs'
import { resolveDistTarget } from './dist-tools.mjs'

test('preview and clean resolve the same registered default build output', () => {
  const registry = structuredClone(loadProjectRegistry())
  registry.projects.customerAdmin = {
    sourceRoot: 'projects/customerAdmin',
    entry: 'index.tsx',
    routers: 'routers',
    output: 'dist-customerAdmin',
    authentication: 'enterprise',
    defaultBuildTool: 'vite',
  }
  const starter = resolveDistTarget('customerAdmin', {}, registry)
  assert.equal(starter.bundler, 'vite')
  assert.ok(starter.output.endsWith('/dist-vite-customerAdmin'))

  const webpack = resolveDistTarget('customerAdmin', { BUILD_TOOL: 'webpack' }, registry)
  assert.equal(webpack.bundler, 'webpack')
  assert.ok(webpack.output.endsWith('/dist-customerAdmin'))

  const viteOverride = resolveDistTarget('customerAdmin', { VITE_OUT_DIR: 'dist-preview' }, registry)
  assert.ok(viteOverride.output.endsWith('/dist-preview'))
  assert.ok(resolveDistTarget('default', {}, registry).output.endsWith('/dist'))
  assert.throws(() => resolveDistTarget('customerAdmin', { BUILD_TOOL: 'rollup' }, registry), /Unknown build tool/)
})
