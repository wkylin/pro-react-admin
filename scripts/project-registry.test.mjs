import test from 'node:test'
import assert from 'node:assert/strict'
import {
  loadProjectRegistry,
  validateProjectRegistry,
  resolveProject,
  createBuildPlan,
} from '../config/project-registry.mjs'
const registry = loadProjectRegistry()
test('development, build and preview share registered output paths', () => {
  const changed = structuredClone(registry)
  changed.projects.projectB.output = 'artifacts/customer-console'
  validateProjectRegistry(changed)
  assert.equal(
    createBuildPlan('build', 'projectB', {}, changed).selected.output,
    resolveProject('projectB', changed).output
  )
  assert.ok(resolveProject('projectB', changed).output.endsWith('/artifacts/customer-console'))
})
test('rejects traversal, source output, overlapping output and duplicate remote ports', () => {
  for (const output of ['.', 'src', '../dist', 'dist/../src']) {
    const changed = structuredClone(registry)
    changed.projects.default.output = output
    assert.throws(() => validateProjectRegistry(changed))
  }
  const overlap = structuredClone(registry)
  overlap.projects.projectB.output = 'dist-projectA/nested'
  assert.throws(() => validateProjectRegistry(overlap), /Overlapping/)
  const ports = structuredClone(registry)
  ports.remotes[1].devPort = ports.remotes[0].devPort
  ports.remotes[1].devUrl = ports.remotes[0].devUrl
  assert.throws(() => validateProjectRegistry(ports), /Duplicate/)
})
test('MFE plans preserve explicit URL overrides and default remote public paths', () => {
  assert.equal(createBuildPlan('mfe-build', 'projectB', {}, registry).env.PUBLIC_URL, '/projectB/')
  assert.equal(createBuildPlan('mfe-build-standalone', 'projectB', {}, registry).env.PUBLIC_URL, '/')
  assert.equal(
    createBuildPlan('mfe-dev', 'shell', { MFE_PROJECTA_URL: 'http://localhost:9000/remoteEntry.js' }, registry).env
      .MFE_PROJECTA_URL,
    'http://localhost:9000/remoteEntry.js'
  )
  assert.equal(createBuildPlan('build', 'default', { MFE_ROLE: 'remote' }, registry).env.MFE_ROLE, undefined)
  assert.throws(() => createBuildPlan('mfe-build', 'default', {}, registry), /not a registered/)
  assert.throws(() => resolveProject('unknown', registry), /Unknown project/)
})

test('build plans select either bundler without changing project or MFE contracts', () => {
  const webpack = createBuildPlan('mfe-build', 'projectA', {}, registry)
  const vite = createBuildPlan('mfe-build', 'projectA', { BUILD_TOOL: 'vite' }, registry)
  assert.equal(webpack.bundler, 'webpack')
  assert.equal(webpack.output, 'dist-projectA')
  assert.match(webpack.args.join(' '), /webpack\.prod\.js/)
  assert.equal(vite.bundler, 'vite')
  assert.equal(vite.output, 'dist-vite-projectA')
  assert.deepEqual(vite.args, ['build', '--config', './build/vite/app.config.ts'])
  assert.deepEqual(createBuildPlan('build', 'default', { BUILD_TOOL: 'vite', BUILD_GOAL: 'dev' }, registry).args, [
    'build',
    '--config',
    './build/vite/app.config.ts',
    '--mode',
    'dev',
  ])
  assert.equal(vite.env.PUBLIC_URL, webpack.env.PUBLIC_URL)
  assert.equal(vite.env.MFE_ROLE, webpack.env.MFE_ROLE)
  assert.deepEqual(
    createBuildPlan('dev', 'enterprise', { BUILD_TOOL: 'vite', HOST: '127.0.0.1' }, registry).args.slice(0, 2),
    ['--host', '127.0.0.1']
  )
  assert.equal(
    createBuildPlan('build', 'default', { BUILD_TOOL: 'vite', VITE_OUT_DIR: 'dist-pages' }, registry).output,
    'dist-pages'
  )
  assert.throws(() => createBuildPlan('build', 'default', { BUILD_TOOL: 'rollup' }, registry), /Unknown build tool/)
})

test('project scaffolding creates a registered standalone and remote without hand edits', async () => {
  const { createProjectDraft } = await import('./create-project.mjs')
  const standalone = createProjectDraft('customer', {}, registry)
  assert.equal(standalone.registry.projects.customer.output, 'dist-customer')
  assert.ok(standalone.files['routers/index.tsx'].includes('normalizeRouteTree'))
  const remote = createProjectDraft('billing', { remote: true, port: 8083 }, registry)
  assert.ok(remote.files['mfe/App.tsx'].includes('AppStoreProvider'))
  assert.equal(remote.registry.remotes.at(-1).envKey, 'MFE_BILLING_URL')
  assert.throws(() => createProjectDraft('billing', { remote: true, port: 8081 }, registry), /Duplicate/)
  assert.throws(() => createProjectDraft('../escape', {}, registry))
})

test('shared application aliases stay fixed when the selected project router changes', async () => {
  const { createPathAliases } = await import('../build/aliases.js')
  const { workspaceRoot } = await import('../config/project-registry.mjs')
  const aliases = createPathAliases(workspaceRoot, { '@routers': resolveProject('projectB', registry).routers })
  assert.ok(aliases['@app'].endsWith('/src/app'))
  assert.ok(aliases['@routers'].endsWith('/projects/projectB/routers'))
})
