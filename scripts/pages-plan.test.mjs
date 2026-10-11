import test from 'node:test'
import assert from 'node:assert/strict'
import { createPagesPlan } from '../config/pages-plan.mjs'

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
  ])
    assert.throws(() => createPagesPlan(options))
})
