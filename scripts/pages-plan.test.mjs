import test from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import { createPagesPlan, createPagesTaskEnv, getPagesEntryBundler } from '../config/pages-plan.mjs'
import { createBuildPlan, loadProjectRegistry, workspaceRoot } from '../config/project-registry.mjs'

test('Pages repository paths distinguish standalone apps, host and remote containers', () => {
  const plan = createPagesPlan({ basePath: '/forked-admin', siteUrl: 'https://example.github.io' })
  const standalone = plan.tasks.find((task) => task.destination === 'projects/projectA')
  const remote = plan.tasks.find((task) => task.destination === 'mfe/projectA')
  const host = plan.tasks.find((task) => task.destination === 'mfe')
  assert.equal(standalone.action, 'build')
  assert.equal(standalone.env.PUBLIC_URL, '/forked-admin/projects/projectA/')
  assert.equal(remote.env.PUBLIC_URL, '/forked-admin/mfe/projectA/')
  assert.equal(host.env.PUBLIC_URL, '/forked-admin/mfe/')
  assert.equal(host.env.MFE_PROJECTA_URL, 'https://example.github.io/forked-admin/mfe/projectA/remoteEntry.js')
  assert.equal(host.env.MFE_PROJECTB_URL, 'https://example.github.io/forked-admin/mfe/projectB/remoteEntry.js')
})

test('Pages supports a custom domain root and a selected enterprise demo', () => {
  const plan = createPagesPlan({ target: 'enterprise', basePath: '', siteUrl: 'https://admin.example.com' })
  assert.deepEqual(
    plan.tasks.map((task) => task.name),
    ['enterprise', 'storybook']
  )
  assert.equal(plan.tasks[0].env.PUBLIC_URL, '/enterprise/')
  assert.equal(plan.tasks[0].env.REACT_APP_USE_MOCK, 'true')
  assert.equal(plan.tasks[1].env.STORYBOOK_BASE_HREF, '/storybook/')
})

test('Pages rejects unsafe output paths, credentials and unsupported targets', () => {
  for (const options of [
    { basePath: '/../secret' },
    { siteUrl: 'https://user:pass@example.com' },
    { siteUrl: 'http://example.com' },
    { target: 'enterprise-api' },
    { buildTool: 'rollup' },
  ])
    assert.throws(() => createPagesPlan(options))
})

test('Pages multi showcase excludes tenant-backed generated starters', () => {
  const registry = structuredClone(loadProjectRegistry())
  registry.projects.customerAdmin = {
    sourceRoot: 'projects/customerAdmin',
    entry: 'index.tsx',
    routers: 'routers',
    output: 'dist-customerAdmin',
    authentication: 'enterprise',
    defaultBuildTool: 'vite',
  }
  const plan = createPagesPlan({ target: 'multi' }, registry)
  assert.ok(plan.tasks.some((task) => task.name === 'projectA'))
  assert.ok(!plan.tasks.some((task) => task.name === 'customerAdmin'))
})

test('Pages builds a Vite-default public project into its registered copy source', () => {
  const registry = structuredClone(loadProjectRegistry())
  registry.projects.projectB.defaultBuildTool = 'vite'
  const plan = createPagesPlan({ target: 'multi' }, registry)
  const task = plan.tasks.find((item) => item.name === 'projectB')
  assert.equal(task.bundler, 'vite')
  assert.equal(task.env.BUILD_TOOL, 'vite')
  assert.ok(task.source.endsWith('/dist-projectB'))
  const env = createPagesTaskEnv(task, { BUILD_TOOL: 'webpack', VITE_OUT_DIR: 'dist-old', MFE_ROLE: 'remote' })
  assert.equal(env.BUILD_TOOL, 'vite')
  assert.equal(env.VITE_OUT_DIR, 'dist-projectB')
  assert.equal(env.MFE_ROLE, undefined)
  assert.equal(path.resolve(workspaceRoot, createBuildPlan(task.action, task.name, env, registry).output), task.source)
  assert.equal(getPagesEntryBundler({ bundler: 'vite' }, { bundler: 'mixed' }), 'vite')
  assert.equal(getPagesEntryBundler({}, { bundler: 'webpack' }), 'webpack')

  const remote = createPagesPlan({ target: 'mfe' }, registry).tasks.find((item) => item.name === 'projectB')
  const remoteEnv = createPagesTaskEnv(remote)
  assert.equal(remote.bundler, 'vite')
  assert.equal(
    path.resolve(workspaceRoot, createBuildPlan(remote.action, remote.name, remoteEnv, registry).output),
    remote.source
  )

  const forced = createPagesPlan({ target: 'multi', buildTool: 'webpack' }, registry)
  const webpackTask = forced.tasks.find((item) => item.name === 'projectB')
  assert.equal(webpackTask.bundler, 'webpack')
  assert.equal(createPagesTaskEnv(webpackTask, { VITE_OUT_DIR: 'dist-old' }).VITE_OUT_DIR, undefined)
})
