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
  const { createPathAliases } = await import('../webpack/aliases.js')
  const { workspaceRoot } = await import('../config/project-registry.mjs')
  const aliases = createPathAliases(workspaceRoot, { '@routers': resolveProject('projectB', registry).routers })
  assert.ok(aliases['@app'].endsWith('/src/app'))
  assert.ok(aliases['@routers'].endsWith('/projects/projectB/routers'))
})
