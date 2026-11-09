import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { applyWorkspaceEnv, readWorkspaceEnv } from '../build/load-env.js'
import { createPublicEnv } from '../build/public-env.js'

test('environment files use shared, local, mode and mode-local precedence', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'pro-react-admin-env-'))
  try {
    fs.writeFileSync(path.join(root, '.env'), 'VALUE=shared\nBASE=base\n')
    fs.writeFileSync(path.join(root, '.env.local'), 'VALUE=local\nLOCAL=local\n')
    fs.writeFileSync(path.join(root, '.env.production'), 'VALUE=production\nMODE=production\n')
    fs.writeFileSync(path.join(root, '.env.production.local'), 'VALUE=production-local\n')

    assert.deepEqual(readWorkspaceEnv('production', root), {
      VALUE: 'production-local',
      BASE: 'base',
      LOCAL: 'local',
      MODE: 'production',
    })
    const target = { VALUE: 'external' }
    applyWorkspaceEnv('production', root, target, new Set(['LOCAL']))
    assert.deepEqual(target, { VALUE: 'external', BASE: 'base', MODE: 'production' })
    assert.throws(() => readWorkspaceEnv('../secrets', root), /Invalid environment mode/)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test('only allowlisted values enter the browser environment', () => {
  const result = createPublicEnv({
    mode: 'production',
    project: 'default',
    source: {
      APP_BASE_URL: '/api',
      BUILD_TOOL: 'vite',
      SENTRY_DSN: 'public-dsn',
      REACT_APP_WEB3FORMS_ACCESS_KEY: 'public-contact-form',
      SENTRY_AUTH_TOKEN: 'private-token',
      VITE_BUILD_STATS: 'private-build-path',
    },
  })

  assert.equal(result.APP_BASE_URL, '/api')
  assert.equal(result.BUILD_TOOL, 'vite')
  assert.equal(result.SENTRY_DSN, 'public-dsn')
  assert.equal(result.REACT_APP_WEB3FORMS_ACCESS_KEY, 'public-contact-form')
  assert.equal(result.SENTRY_AUTH_TOKEN, undefined)
  assert.equal(result.VITE_BUILD_STATS, undefined)
})

test('an explicit empty contact key disables the shared form configuration', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'pro-react-admin-contact-env-'))
  try {
    fs.writeFileSync(path.join(root, '.env'), 'REACT_APP_WEB3FORMS_ACCESS_KEY=public-contact-form\n')
    fs.writeFileSync(path.join(root, '.env.production.local'), 'REACT_APP_WEB3FORMS_ACCESS_KEY=\n')

    const fromFiles = createPublicEnv({
      mode: 'production',
      project: 'default',
      source: readWorkspaceEnv('production', root),
    })
    assert.equal(fromFiles.REACT_APP_WEB3FORMS_ACCESS_KEY, '')

    const target = { REACT_APP_WEB3FORMS_ACCESS_KEY: '' }
    applyWorkspaceEnv('development', root, target)
    const fromShell = createPublicEnv({ mode: 'development', project: 'default', source: target })
    assert.equal(fromShell.REACT_APP_WEB3FORMS_ACCESS_KEY, '')
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
