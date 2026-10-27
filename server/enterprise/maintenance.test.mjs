import { test } from 'node:test'
import assert from 'node:assert/strict'
import { appendFileSync, copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { randomBytes } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { DatabaseSync } from 'node:sqlite'
import { hashPassword, tokenHash } from './domain.mts'
import { ENTERPRISE_SCHEMA_VERSION } from './migrations.mts'
import {
  createEnterpriseBackup,
  enterpriseLogicalFingerprint,
  migrateEnterpriseDatabase,
  restoreEnterpriseBackup,
  verifyEnterpriseDatabase,
  verifyEnterpriseMigrationStatus,
} from './database-ops.mts'
import { EnterpriseStore } from './store.mts'
import { EnterpriseService } from './service.mts'

test('an uninitialized database reports the current schema and the documented status command runs', async (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'pro-admin-db-status-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const database = path.join(directory, 'enterprise.sqlite')

  const status = await verifyEnterpriseMigrationStatus(database)
  assert.equal(status.latestSchemaVersion, ENTERPRISE_SCHEMA_VERSION)
  assert.deepEqual(
    status.pendingMigrations,
    Array.from({ length: ENTERPRISE_SCHEMA_VERSION }, (_, index) => index + 1)
  )
  assert.equal(status.initialized, false)
  assert.equal(existsSync(database), false)

  const command = spawnSync(
    process.execPath,
    [fileURLToPath(new URL('./db-admin.mjs', import.meta.url)), '--', 'status', '--db', database],
    {
      encoding: 'utf8',
    }
  )
  assert.equal(command.status, 0, command.stderr)
  assert.equal(JSON.parse(command.stdout).latestSchemaVersion, ENTERPRISE_SCHEMA_VERSION)
})

async function createLegacyV1Database(file) {
  const alphaPassword = 'Legacy-alpha-password-42'
  const betaPassword = 'Legacy-beta-password-42'
  const alphaPasswordHash = await hashPassword(alphaPassword)
  const betaPasswordHash = await hashPassword(betaPassword)
  const alphaSession = randomBytes(32).toString('base64url')
  const betaSession = randomBytes(32).toString('base64url')
  const db = new DatabaseSync(file)
  try {
    db.exec(readFileSync(new URL('./fixtures/enterprise-v1.sql', import.meta.url), 'utf8'))
    db.exec(`
      INSERT INTO tenants VALUES ('alpha','Alpha','active'),('beta','Beta','active');
      INSERT INTO roles VALUES
        ('role-alpha','alpha','Admin A','tenant-admin','["user:read","audit:read"]'),
        ('role-beta','beta','Admin B','tenant-admin','["role:read","audit:read"]');
      INSERT INTO audit VALUES
        ('audit-alpha','alpha','admin@example.com','bootstrap','tenants','alpha','2026-01-01T00:00:00.000Z'),
        ('audit-beta','beta','admin@example.com','bootstrap','tenants','beta','2026-01-01T00:00:00.000Z');
    `)
    db.prepare(
      "INSERT INTO users (id,tenant_id,name,email,role,status,password_hash) VALUES ('user-alpha','alpha','Admin Alpha','admin@example.com','tenant-admin','active',?)"
    ).run(alphaPasswordHash)
    db.prepare(
      "INSERT INTO users (id,tenant_id,name,email,role,status,password_hash) VALUES ('user-beta','beta','Admin Beta','admin@example.com','tenant-admin','active',?)"
    ).run(betaPasswordHash)
    db.prepare('INSERT INTO sessions VALUES (?,?,?,?)').run(
      tokenHash(alphaSession),
      'alpha',
      'user-alpha',
      2_000_000_000_000
    )
    db.prepare('INSERT INTO sessions VALUES (?,?,?,?)').run(
      tokenHash(betaSession),
      'beta',
      'user-beta',
      2_000_000_000_000
    )
  } finally {
    db.close()
  }
  return { alphaPassword, betaPassword, alphaPasswordHash, betaPasswordHash, alphaSession, betaSession }
}

test('legacy v1 migration preserves credentials, per-tenant authorization, sessions, and audit through backup/restore', async (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'pro-admin-db-maintenance-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))

  const database = path.join(directory, 'legacy.sqlite')
  const credentials = await createLegacyV1Database(database)
  assert.throws(() => new EnterpriseStore(database, { migrationMode: 'verify' }), /needs an offline migration/)
  const oldDb = new DatabaseSync(database, { readOnly: true })
  let legacyFingerprint
  let legacyPermissions
  let legacyAuditRows
  try {
    legacyFingerprint = enterpriseLogicalFingerprint(oldDb)
    legacyPermissions = Object.fromEntries(
      oldDb
        .prepare('SELECT tenant_id,permissions FROM roles ORDER BY tenant_id')
        .all()
        .map((row) => [row.tenant_id, JSON.parse(row.permissions)])
    )
    legacyAuditRows = oldDb
      .prepare('SELECT id,tenant_id,actor,action,resource,recordId,at FROM audit ORDER BY tenant_id,at,id')
      .all()
      .map((row) => ({ ...row }))
  } finally {
    oldDb.close()
  }

  const assertLegacyAuthorizationAndAudit = (service) => {
    const alpha = service.authenticate(credentials.alphaSession)
    const beta = service.authenticate(credentials.betaSession)
    assert.deepEqual(service.permissions(alpha).permissions, legacyPermissions.alpha)
    assert.deepEqual(service.permissions(beta).permissions, legacyPermissions.beta)
    for (const [tenantId, principal] of [
      ['alpha', alpha],
      ['beta', beta],
    ]) {
      const expected = legacyAuditRows
        .filter((row) => row.tenant_id === tenantId)
        .map(({ id, actor, action, resource, recordId, at }) => ({ id, actor, action, resource, recordId, at }))
      assert.deepEqual(
        service.list(principal, 'audit', {}).items.map((row) => ({ ...row })),
        expected
      )
    }
  }

  const migrated = await migrateEnterpriseDatabase(database)
  assert.deepEqual(migrated.applied, [2, 3, 4, 5])
  assert.ok(migrated.preMigrationBackup)
  const oldBackup = await verifyEnterpriseDatabase(migrated.preMigrationBackup, { requireManifest: true })
  assert.equal(oldBackup.schemaVersion, 1)
  assert.equal(oldBackup.logicalFingerprint, legacyFingerprint)

  const db = new DatabaseSync(database)
  let currentFingerprint
  try {
    const status = db.prepare('PRAGMA user_version').get()
    assert.equal(status.user_version, ENTERPRISE_SCHEMA_VERSION)
    assert.deepEqual(
      db
        .prepare('SELECT tenant_id,principal_id,user_id FROM tenant_memberships ORDER BY tenant_id')
        .all()
        .map((row) => ({ ...row })),
      [
        { tenant_id: 'alpha', principal_id: 'user-alpha', user_id: 'user-alpha' },
        { tenant_id: 'beta', principal_id: 'user-beta', user_id: 'user-beta' },
      ].map((row) => ({ ...row }))
    )
    assert.deepEqual(
      db
        .prepare('SELECT id,principal_id,password_hash FROM users ORDER BY tenant_id')
        .all()
        .map((row) => ({ ...row })),
      [
        { id: 'user-alpha', principal_id: 'user-alpha', password_hash: credentials.alphaPasswordHash },
        { id: 'user-beta', principal_id: 'user-beta', password_hash: credentials.betaPasswordHash },
      ].map((row) => ({ ...row }))
    )
    assert.deepEqual(
      db
        .prepare('SELECT id FROM principals ORDER BY id')
        .all()
        .map((row) => ({ ...row })),
      [{ id: 'user-alpha' }, { id: 'user-beta' }]
    )
    currentFingerprint = enterpriseLogicalFingerprint(db)
    assert.equal(currentFingerprint, legacyFingerprint)
  } finally {
    db.close()
  }

  const migratedStore = new EnterpriseStore(database, { migrationMode: 'verify' })
  try {
    const service = new EnterpriseService(migratedStore)
    assertLegacyAuthorizationAndAudit(service)
  } finally {
    migratedStore.close()
  }

  const currentBackup = await createEnterpriseBackup(database, path.join(directory, 'current.sqlite'))
  assert.equal(
    (await verifyEnterpriseDatabase(currentBackup.path, { requireManifest: true })).logicalFingerprint,
    currentFingerprint
  )

  const loginStore = new EnterpriseStore(database, { migrationMode: 'verify' })
  try {
    const service = new EnterpriseService(loginStore)
    const alphaLogin = await service.login({
      tenantId: 'alpha',
      email: 'admin@example.com',
      password: credentials.alphaPassword,
    })
    assert.equal(alphaLogin.tenantId, 'alpha')
    await assert.rejects(
      service.login({ tenantId: 'beta', email: 'admin@example.com', password: credentials.alphaPassword }),
      (error) => error.status === 401
    )
    const betaLogin = await service.login({
      tenantId: 'beta',
      email: 'admin@example.com',
      password: credentials.betaPassword,
    })
    assert.equal(betaLogin.tenantId, 'beta')
  } finally {
    loginStore.close()
  }

  const modified = new DatabaseSync(database)
  try {
    modified
      .prepare('UPDATE roles SET permissions=? WHERE tenant_id=? AND code=?')
      .run('["user:read"]', 'alpha', 'tenant-admin')
  } finally {
    modified.close()
  }
  const restored = await restoreEnterpriseBackup(currentBackup.path, database)
  assert.equal(restored.logicalFingerprint, currentFingerprint)
  assert.ok(restored.previousBackup)
  assert.equal(
    (await verifyEnterpriseDatabase(restored.previousBackup, { requireManifest: true })).manifestPresent,
    true
  )
  assert.equal((await verifyEnterpriseDatabase(database)).schemaVersion, ENTERPRISE_SCHEMA_VERSION)

  const restoredStore = new EnterpriseStore(database, { migrationMode: 'verify' })
  try {
    assertLegacyAuthorizationAndAudit(new EnterpriseService(restoredStore))
  } finally {
    restoredStore.close()
  }

  const upgradedFromV1 = await restoreEnterpriseBackup(
    migrated.preMigrationBackup,
    path.join(directory, 'restored-from-v1.sqlite')
  )
  assert.equal(upgradedFromV1.schemaVersion, ENTERPRISE_SCHEMA_VERSION)
  assert.equal(upgradedFromV1.logicalFingerprint, legacyFingerprint)

  const rollback = await restoreEnterpriseBackup(
    migrated.preMigrationBackup,
    path.join(directory, 'rollback-v1.sqlite'),
    { migrateToLatest: false }
  )
  assert.equal(rollback.schemaVersion, 1)
  assert.deepEqual(
    rollback.pendingMigrations,
    Array.from({ length: ENTERPRISE_SCHEMA_VERSION - 1 }, (_, index) => index + 2)
  )
  assert.equal(rollback.logicalFingerprint, legacyFingerprint)
})

test('legacy migration rejects a weakened v1 schema before creating a backup or changing data', async (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'pro-admin-db-invalid-legacy-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const database = path.join(directory, 'weakened.sqlite')
  const fixture = readFileSync(new URL('./fixtures/enterprise-v1.sql', import.meta.url), 'utf8')
  const weakened = fixture.replace('UNIQUE(tenant_id, email), ', '')
  assert.notEqual(weakened, fixture)
  const db = new DatabaseSync(database)
  db.exec(weakened)
  db.close()

  await assert.rejects(migrateEnterpriseDatabase(database), /unsupported unique constraints/)
  const unchanged = new DatabaseSync(database, { readOnly: true })
  try {
    assert.equal(unchanged.prepare('PRAGMA user_version').get().user_version, 1)
    assert.equal(
      unchanged.prepare("SELECT COUNT(*) AS count FROM sqlite_schema WHERE name='schema_migrations'").get().count,
      0
    )
  } finally {
    unchanged.close()
  }
})

test('backup verification checks file integrity and requires its manifest', async (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'pro-admin-db-backup-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const database = path.join(directory, 'source.sqlite')
  const store = new EnterpriseStore(database)
  store.close()
  const backup = await createEnterpriseBackup(database, path.join(directory, 'backup.sqlite'))
  assert.equal((await verifyEnterpriseDatabase(backup.path, { requireManifest: true })).manifestPresent, true)

  const altered = path.join(directory, 'altered.sqlite')
  copyFileSync(backup.path, altered)
  copyFileSync(`${backup.path}.manifest.json`, `${altered}.manifest.json`)
  appendFileSync(altered, 'altered backup bytes')
  await assert.rejects(verifyEnterpriseDatabase(altered, { requireManifest: true }), /integrity_check|checksum/)

  rmSync(`${backup.path}.manifest.json`)
  await assert.rejects(verifyEnterpriseDatabase(backup.path, { requireManifest: true }), /manifest is required/)
})

test('concurrent backups cannot replace or remove the winning verified backup', async (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'pro-admin-db-backup-race-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const database = path.join(directory, 'source.sqlite')
  const store = new EnterpriseStore(database)
  store.close()
  const destination = path.join(directory, 'shared-backup.sqlite')

  const results = await Promise.allSettled([
    createEnterpriseBackup(database, destination),
    createEnterpriseBackup(database, destination),
  ])
  const winners = results.filter((result) => result.status === 'fulfilled')
  const rejected = results.filter((result) => result.status === 'rejected')
  assert.equal(winners.length, 1)
  assert.equal(rejected.length, 1)
  const verified = await verifyEnterpriseDatabase(destination, { requireManifest: true })
  assert.equal(verified.manifestPresent, true)
  assert.equal(verified.logicalFingerprint, winners[0].value.manifest.logicalFingerprint)
})

test('database verification rejects a weakened version 2 append-only audit trigger', async (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'pro-admin-db-schema-drift-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const database = path.join(directory, 'enterprise.sqlite')
  const store = new EnterpriseStore(database)
  store.close()

  const altered = new DatabaseSync(database)
  try {
    altered.exec(
      'DROP TRIGGER audit_no_delete; CREATE TRIGGER audit_no_delete BEFORE DELETE ON audit BEGIN SELECT 1; END'
    )
  } finally {
    altered.close()
  }

  await assert.rejects(verifyEnterpriseDatabase(database), /audit_no_delete.*definition|weakened audit/i)
  assert.throws(
    () => new EnterpriseStore(database, { migrationMode: 'verify' }),
    /audit_no_delete.*definition|weakened audit/i
  )
})

test('database verification rejects a missing version 2 tenant-membership index', async (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'pro-admin-db-index-drift-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const database = path.join(directory, 'enterprise.sqlite')
  const store = new EnterpriseStore(database)
  store.close()

  const altered = new DatabaseSync(database)
  try {
    altered.exec('DROP INDEX tenant_memberships_principal')
  } finally {
    altered.close()
  }

  await assert.rejects(verifyEnterpriseDatabase(database), /missing required index tenant_memberships_principal/)
})

test('restore replaces an invalid active database and retains its unverified recovery snapshot', async (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'pro-admin-db-damaged-restore-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const database = path.join(directory, 'enterprise.sqlite')
  const store = new EnterpriseStore(database)
  store.close()
  const backup = await createEnterpriseBackup(database, path.join(directory, 'verified.sqlite'))

  const altered = new DatabaseSync(database)
  try {
    altered.exec(
      'DROP TRIGGER audit_no_delete; CREATE TRIGGER audit_no_delete BEFORE DELETE ON audit BEGIN SELECT 1; END'
    )
  } finally {
    altered.close()
  }

  const restored = await restoreEnterpriseBackup(backup.path, database)
  assert.equal(restored.logicalFingerprint, backup.manifest.logicalFingerprint)
  assert.equal(restored.previousBackup, undefined)
  assert.equal(restored.previousSnapshot?.verified, false)
  assert.match(restored.previousSnapshot?.reason ?? '', /audit_no_delete.*definition/i)
  await assert.rejects(verifyEnterpriseDatabase(restored.previousSnapshot.path), /audit_no_delete.*definition/i)
})

test('the host-local database lease prevents a second runtime from opening the same file', async (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'pro-admin-db-lock-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const database = path.join(directory, 'business.sqlite')
  const owner = new EnterpriseStore(database)
  assert.throws(() => new EnterpriseStore(database), /already in use/)
  owner.close()
  const reopened = new EnterpriseStore(database)
  reopened.close()
})
