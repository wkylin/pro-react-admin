import { createHash, randomUUID } from 'node:crypto'
import { DatabaseSync } from 'node:sqlite'
import {
  chmodSync,
  closeSync,
  copyFileSync,
  constants,
  existsSync,
  fsyncSync,
  linkSync,
  mkdtempSync,
  mkdirSync,
  openSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import { createReadStream } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { acquireDatabaseLease } from './database-lock.mts'
import { applyEnterpriseMigrations, getEnterpriseMigrationStatus } from './migrations.mts'
import type { EnterpriseMigrationStatus } from './migrations.mts'

const defaultDatabasePath = resolve(dirname(fileURLToPath(import.meta.url)), '../data/enterprise.sqlite')
const BACKUP_FORMAT_VERSION = 1

export interface EnterpriseBackupManifest {
  formatVersion: number
  createdAt: string
  sourceName: string
  databaseSchemaVersion: number
  sha256: string
  logicalFingerprint: string
}

export interface DatabaseVerification {
  path: string
  schemaVersion: number
  latestSchemaVersion: number
  pendingMigrations: number[]
  logicalFingerprint: string
  manifestPresent: boolean
  manifest?: EnterpriseBackupManifest
}

export function resolveEnterpriseDatabasePath(value = process.env.ENTERPRISE_DB_PATH) {
  const databasePath = String(value || defaultDatabasePath).trim()
  if (!databasePath || databasePath === ':memory:') {
    throw new Error('Database maintenance commands require a persistent ENTERPRISE_DB_PATH')
  }
  return resolve(databasePath)
}

function openReadWrite(file: string) {
  const db = new DatabaseSync(file)
  db.exec('PRAGMA busy_timeout=10000')
  return db
}

function openReadOnly(file: string) {
  const db = new DatabaseSync(file, { readOnly: true })
  db.exec('PRAGMA busy_timeout=10000')
  return db
}

function assertRegularDatabaseFile(file: string) {
  if (!existsSync(file)) throw new Error(`Enterprise database does not exist: ${file}`)
  const stat = statSync(file)
  if (!stat.isFile() || stat.size === 0) throw new Error(`Enterprise database is empty or not a regular file: ${file}`)
}

function oneNumber(db: DatabaseSync, sql: string) {
  const row = db.prepare(sql).get() as Record<string, number> | undefined
  return Number(row ? Object.values(row)[0] : 0)
}

function hashRows(db: DatabaseSync, hash: ReturnType<typeof createHash>, label: string, sql: string) {
  hash.update(`${label}\0`)
  for (const row of db.prepare(sql).iterate()) hash.update(`${JSON.stringify(row)}\n`)
}

/** Stable semantic digest for data that controls access, sessions, roles, or audit history. */
export function enterpriseLogicalFingerprint(db: DatabaseSync) {
  const version = Number((db.prepare('PRAGMA user_version').get() as { user_version: number }).user_version)
  const hash = createHash('sha256')
  hash.update('enterprise-logical-data-v1\0')
  hashRows(db, hash, 'tenants', 'SELECT id,name,status FROM tenants ORDER BY id')
  hashRows(db, hash, 'roles', 'SELECT id,tenant_id,name,code,permissions FROM roles ORDER BY tenant_id,id')

  if (version >= 2) {
    hashRows(
      db,
      hash,
      'users',
      `SELECT u.id,u.tenant_id,u.name,u.email,u.role,u.status,u.principal_id,u.password_hash
       FROM users u ORDER BY u.tenant_id,u.id`
    )
    hashRows(
      db,
      hash,
      'tenant_memberships',
      'SELECT tenant_id,principal_id,user_id FROM tenant_memberships ORDER BY tenant_id,principal_id'
    )
  } else {
    hashRows(
      db,
      hash,
      'users',
      'SELECT id,tenant_id,name,email,role,status,id AS principal_id,password_hash FROM users ORDER BY tenant_id,id'
    )
    hashRows(
      db,
      hash,
      'tenant_memberships',
      'SELECT tenant_id,id AS principal_id,id AS user_id FROM users ORDER BY tenant_id,id'
    )
  }

  hashRows(db, hash, 'sessions', 'SELECT hash,tenant_id,user_id,expires_at FROM sessions ORDER BY hash')
  hashRows(
    db,
    hash,
    'audit',
    'SELECT id,tenant_id,actor,action,resource,recordId,at FROM audit ORDER BY tenant_id,at,id'
  )
  return hash.digest('hex')
}

export function verifyEnterpriseDatabaseConnection(db: DatabaseSync): EnterpriseMigrationStatus {
  const status = getEnterpriseMigrationStatus(db)
  if (!status.userVersion) throw new Error('Enterprise database has not been initialized')

  const integrity = db.prepare('PRAGMA integrity_check').all() as Record<string, string>[]
  if (integrity.length !== 1 || Object.values(integrity[0])[0] !== 'ok') {
    throw new Error(`SQLite integrity_check failed: ${JSON.stringify(integrity.slice(0, 5))}`)
  }
  const foreignKeyErrors = db.prepare('PRAGMA foreign_key_check').all() as unknown[]
  if (foreignKeyErrors.length) throw new Error(`SQLite foreign_key_check found ${foreignKeyErrors.length} violation(s)`)

  const triggerNames = new Set(
    (db.prepare("SELECT name FROM sqlite_schema WHERE type='trigger'").all() as { name: string }[]).map(
      ({ name }) => name
    )
  )
  if (!triggerNames.has('audit_no_update') || !triggerNames.has('audit_no_delete')) {
    throw new Error('Enterprise database is missing append-only audit triggers')
  }

  if (status.userVersion >= 2) {
    for (const trigger of [
      'users_require_principal',
      'users_require_principal_update',
      'users_create_membership',
      'users_update_membership',
      'users_delete_orphan_principal',
    ]) {
      if (!triggerNames.has(trigger)) throw new Error(`Enterprise database is missing required trigger: ${trigger}`)
    }
    const invalidUsers = oneNumber(
      db,
      `SELECT COUNT(*) AS count FROM users u
       LEFT JOIN principals p ON p.id=u.principal_id
       LEFT JOIN tenant_memberships m ON m.tenant_id=u.tenant_id AND m.user_id=u.id AND m.principal_id=u.principal_id
       WHERE u.principal_id IS NULL OR p.id IS NULL OR m.user_id IS NULL`
    )
    const membershipCount = oneNumber(db, 'SELECT COUNT(*) AS count FROM tenant_memberships')
    const userCount = oneNumber(db, 'SELECT COUNT(*) AS count FROM users')
    const orphanPrincipals = oneNumber(
      db,
      `SELECT COUNT(*) AS count FROM principals p
       LEFT JOIN tenant_memberships m ON m.principal_id=p.id WHERE m.principal_id IS NULL`
    )
    if (invalidUsers || membershipCount !== userCount || orphanPrincipals) {
      throw new Error('Principal and tenant-membership records are inconsistent')
    }
  }

  return status
}

async function sha256File(file: string) {
  const hash = createHash('sha256')
  for await (const chunk of createReadStream(file)) hash.update(chunk)
  return hash.digest('hex')
}

function syncPath(file: string) {
  const descriptor = openSync(file, 'r')
  try {
    fsyncSync(descriptor)
  } finally {
    closeSync(descriptor)
  }
}

function syncDirectory(directory: string) {
  try {
    const descriptor = openSync(directory, 'r')
    try {
      fsyncSync(descriptor)
    } finally {
      closeSync(descriptor)
    }
  } catch {
    // Some filesystems do not support fsync on directory descriptors.
  }
}

function manifestPath(file: string) {
  return `${file}.manifest.json`
}

function readManifest(file: string): EnterpriseBackupManifest | undefined {
  const sidecar = manifestPath(file)
  if (!existsSync(sidecar)) return undefined
  let manifest: EnterpriseBackupManifest
  try {
    manifest = JSON.parse(readFileSync(sidecar, 'utf8')) as EnterpriseBackupManifest
  } catch {
    throw new Error(`Enterprise backup manifest is unreadable: ${sidecar}`)
  }
  if (
    manifest.formatVersion !== BACKUP_FORMAT_VERSION ||
    typeof manifest.createdAt !== 'string' ||
    typeof manifest.sourceName !== 'string' ||
    !Number.isSafeInteger(manifest.databaseSchemaVersion) ||
    !/^[a-f0-9]{64}$/.test(manifest.sha256) ||
    !/^[a-f0-9]{64}$/.test(manifest.logicalFingerprint)
  ) {
    throw new Error(`Enterprise backup manifest has an unsupported or malformed format: ${sidecar}`)
  }
  return manifest
}

function defaultBackupPath(databasePath: string, label: string) {
  const stamp = new Date().toISOString().replace(/[-:.]/g, '')
  return `${databasePath}.${label}.${stamp}.${randomUUID().slice(0, 8)}.sqlite`
}

function assertDifferentFiles(source: string, destination: string) {
  const sourcePath = existsSync(source) ? realpathSync(source) : resolve(source)
  const destinationPath = existsSync(destination) ? realpathSync(destination) : resolve(destination)
  if (sourcePath === destinationPath) throw new Error('Backup, restore source and target paths must be different files')
}

export async function createEnterpriseBackup(sourcePath: string, requestedOutput?: string) {
  const source = resolve(sourcePath)
  assertRegularDatabaseFile(source)
  const destination = resolve(requestedOutput || defaultBackupPath(source, 'backup'))
  assertDifferentFiles(source, destination)
  if (existsSync(destination) || existsSync(manifestPath(destination))) {
    throw new Error(`Refusing to overwrite an existing backup: ${destination}`)
  }
  mkdirSync(dirname(destination), { recursive: true, mode: 0o700 })
  const temporary = `${destination}.tmp-${randomUUID()}`
  const temporaryManifest = `${manifestPath(destination)}.tmp-${randomUUID()}`
  let sourceDb: DatabaseSync | undefined
  let publishedDatabase = false
  let publishedManifest = false

  try {
    sourceDb = openReadWrite(source)
    sourceDb.prepare('VACUUM INTO ?').run(temporary)
    sourceDb.close()
    sourceDb = undefined
    chmodSync(temporary, 0o600)

    let schemaVersion: number
    let logicalFingerprint: string
    const snapshot = openReadOnly(temporary)
    try {
      const status = verifyEnterpriseDatabaseConnection(snapshot)
      schemaVersion = status.userVersion
      logicalFingerprint = enterpriseLogicalFingerprint(snapshot)
    } finally {
      snapshot.close()
    }

    const manifest: EnterpriseBackupManifest = {
      formatVersion: BACKUP_FORMAT_VERSION,
      createdAt: new Date().toISOString(),
      sourceName: basename(source),
      databaseSchemaVersion: schemaVersion,
      sha256: await sha256File(temporary),
      logicalFingerprint,
    }
    const manifestDescriptor = openSync(temporaryManifest, 'wx', 0o600)
    try {
      writeFileSync(manifestDescriptor, `${JSON.stringify(manifest, null, 2)}\n`)
      fsyncSync(manifestDescriptor)
    } finally {
      closeSync(manifestDescriptor)
    }
    syncPath(temporary)
    // Both files are staged in the destination directory. Exclusive hard links
    // publish complete files without allowing a concurrent backup to overwrite them.
    linkSync(temporary, destination)
    publishedDatabase = true
    unlinkSync(temporary)
    linkSync(temporaryManifest, manifestPath(destination))
    publishedManifest = true
    unlinkSync(temporaryManifest)
    chmodSync(destination, 0o600)
    chmodSync(manifestPath(destination), 0o600)
    syncDirectory(dirname(destination))
    return { path: destination, manifest }
  } catch (error) {
    try {
      sourceDb?.close()
    } catch {
      // Ignore cleanup errors while preserving the original failure.
    }
    rmSync(temporary, { force: true })
    rmSync(temporaryManifest, { force: true })
    if (publishedManifest) rmSync(manifestPath(destination), { force: true })
    if (publishedDatabase) rmSync(destination, { force: true })
    throw error
  }
}

function createUnverifiedRecoverySnapshot(sourcePath: string, requestedOutput: string) {
  const source = resolve(sourcePath)
  const destination = resolve(requestedOutput)
  assertRegularDatabaseFile(source)
  assertDifferentFiles(source, destination)
  if (existsSync(destination)) throw new Error(`Refusing to overwrite a recovery snapshot: ${destination}`)
  mkdirSync(dirname(destination), { recursive: true, mode: 0o700 })

  const temporary = `${destination}.tmp-${randomUUID()}`
  let sourceDb: DatabaseSync | undefined
  let published = false
  try {
    sourceDb = openReadWrite(source)
    sourceDb.prepare('VACUUM INTO ?').run(temporary)
    sourceDb.close()
    sourceDb = undefined
    chmodSync(temporary, 0o600)
    syncPath(temporary)
    linkSync(temporary, destination)
    published = true
    unlinkSync(temporary)
    syncDirectory(dirname(destination))
    return destination
  } catch (error) {
    try {
      sourceDb?.close()
    } catch {
      // Keep the original snapshot error.
    }
    rmSync(temporary, { force: true })
    if (published) rmSync(destination, { force: true })
    throw error
  }
}

export async function verifyEnterpriseDatabase(file: string, { requireManifest = false } = {}) {
  const databasePath = resolve(file)
  assertRegularDatabaseFile(databasePath)
  const db = openReadOnly(databasePath)
  let status: EnterpriseMigrationStatus
  let logicalFingerprint: string
  try {
    status = verifyEnterpriseDatabaseConnection(db)
    logicalFingerprint = enterpriseLogicalFingerprint(db)
  } finally {
    db.close()
  }

  const manifest = readManifest(databasePath)
  if (requireManifest && !manifest)
    throw new Error(`A verified backup manifest is required: ${manifestPath(databasePath)}`)
  if (manifest) {
    if (manifest.databaseSchemaVersion !== status.userVersion) {
      throw new Error('Enterprise backup schema version does not match its manifest')
    }
    if (manifest.logicalFingerprint !== logicalFingerprint) {
      throw new Error('Enterprise backup authorization/audit contents do not match its manifest')
    }
    if (manifest.sha256 !== (await sha256File(databasePath))) {
      throw new Error('Enterprise backup checksum does not match its manifest')
    }
  }

  return {
    path: databasePath,
    schemaVersion: status.userVersion,
    latestSchemaVersion: status.latestVersion,
    pendingMigrations: status.pendingVersions,
    logicalFingerprint,
    manifestPresent: Boolean(manifest),
    ...(manifest ? { manifest } : {}),
  } satisfies DatabaseVerification
}

export async function verifyEnterpriseMigrationStatus(file: string) {
  const databasePath = resolve(file)
  if (!existsSync(databasePath)) {
    return {
      path: databasePath,
      schemaVersion: 0,
      latestSchemaVersion: 2,
      pendingMigrations: [1, 2],
      initialized: false,
      historyExists: false,
    }
  }
  const db = openReadOnly(databasePath)
  try {
    const status = getEnterpriseMigrationStatus(db)
    return {
      path: databasePath,
      schemaVersion: status.userVersion,
      latestSchemaVersion: status.latestVersion,
      pendingMigrations: status.pendingVersions,
      initialized: status.userVersion > 0,
      historyExists: status.historyExists,
      legacyBaseline: status.adoptLegacyBaseline,
    }
  } finally {
    db.close()
  }
}

export async function migrateEnterpriseDatabase(file: string) {
  const databasePath = resolve(file)
  mkdirSync(dirname(databasePath), { recursive: true, mode: 0o700 })
  const releaseLease = acquireDatabaseLease(databasePath)
  let db: DatabaseSync | undefined
  try {
    db = openReadWrite(databasePath)
    db.exec('PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL')
    const before = getEnterpriseMigrationStatus(db)
    if (!before.pendingVersions.length && !before.adoptLegacyBaseline) {
      verifyEnterpriseDatabaseConnection(db)
      return { path: databasePath, applied: [], preMigrationBackup: undefined }
    }

    const oldFingerprint = before.userVersion > 0 ? enterpriseLogicalFingerprint(db) : undefined
    let preMigrationBackup: string | undefined
    if (before.userVersion > 0) {
      preMigrationBackup = defaultBackupPath(databasePath, `pre-migration-v${before.userVersion}`)
      await createEnterpriseBackup(databasePath, preMigrationBackup)
    }

    const applied = [...before.pendingVersions]
    applyEnterpriseMigrations(db, () => {
      verifyEnterpriseDatabaseConnection(db!)
      if (oldFingerprint && enterpriseLogicalFingerprint(db!) !== oldFingerprint) {
        throw new Error('Migration changed tenant authorization, memberships, sessions, credentials, or audit records')
      }
    })

    verifyEnterpriseDatabaseConnection(db)
    return { path: databasePath, applied, preMigrationBackup }
  } finally {
    try {
      db?.close()
    } finally {
      releaseLease()
    }
  }
}

export async function restoreEnterpriseBackup(
  backupFile: string,
  targetFile: string,
  { migrateToLatest = true }: { migrateToLatest?: boolean } = {}
) {
  const backup = resolve(backupFile)
  const target = resolve(targetFile)
  assertRegularDatabaseFile(backup)
  assertDifferentFiles(backup, target)
  const verifiedBackup = await verifyEnterpriseDatabase(backup, { requireManifest: true })
  const manifest = verifiedBackup.manifest!

  mkdirSync(dirname(target), { recursive: true, mode: 0o700 })
  const releaseLease = acquireDatabaseLease(target)
  const staging = `${target}.restore-${randomUUID()}`
  const rollback = `${target}.rollback-${randomUUID()}`
  let previousBackup: string | undefined
  let previousSnapshot: { path: string; verified: false; reason: string } | undefined
  let targetMoved = false

  try {
    if (existsSync(target)) {
      const requestedPreviousBackup = defaultBackupPath(target, 'pre-restore')
      try {
        previousBackup = (await createEnterpriseBackup(target, requestedPreviousBackup)).path
      } catch (backupError) {
        const snapshotPath = defaultBackupPath(target, 'pre-restore-unverified')
        try {
          previousSnapshot = {
            path: createUnverifiedRecoverySnapshot(target, snapshotPath),
            verified: false,
            reason: backupError instanceof Error ? backupError.message : String(backupError),
          }
        } catch (snapshotError) {
          throw new AggregateError(
            [backupError, snapshotError],
            `Could not preserve the existing database before restore: ${target}`
          )
        }
      }
    }
    copyFileSync(backup, staging, constants.COPYFILE_EXCL)
    chmodSync(staging, 0o600)

    const candidate = openReadWrite(staging)
    try {
      candidate.exec('PRAGMA foreign_keys=ON; PRAGMA busy_timeout=10000; PRAGMA journal_mode=WAL')
      const candidateStatus = getEnterpriseMigrationStatus(candidate)
      if (migrateToLatest && (candidateStatus.pendingVersions.length || candidateStatus.adoptLegacyBaseline)) {
        applyEnterpriseMigrations(candidate, () => {
          verifyEnterpriseDatabaseConnection(candidate)
          if (enterpriseLogicalFingerprint(candidate) !== manifest.logicalFingerprint) {
            throw new Error(
              'Restored database changed tenant authorization, memberships, sessions, credentials, or audit records'
            )
          }
        })
      }
      verifyEnterpriseDatabaseConnection(candidate)
      if (enterpriseLogicalFingerprint(candidate) !== manifest.logicalFingerprint) {
        throw new Error(
          'Restored database changed tenant authorization, memberships, sessions, credentials, or audit records'
        )
      }
      candidate.exec('PRAGMA wal_checkpoint(TRUNCATE); PRAGMA journal_mode=DELETE')
    } finally {
      candidate.close()
    }

    syncPath(staging)
    if (existsSync(target)) {
      const current = openReadWrite(target)
      try {
        const checkpoint = current.prepare('PRAGMA wal_checkpoint(TRUNCATE)').get() as
          { busy: number; log: number; checkpointed: number } | undefined
        if ((checkpoint?.busy ?? 0) !== 0)
          throw new Error('Target SQLite database is busy; stop all API processes before restore')
        current.exec('PRAGMA journal_mode=DELETE')
      } finally {
        current.close()
      }
      rmSync(`${target}-wal`, { force: true })
      rmSync(`${target}-shm`, { force: true })
      renameSync(target, rollback)
      targetMoved = true
    }

    try {
      renameSync(staging, target)
      chmodSync(target, 0o600)
      syncPath(target)
      syncDirectory(dirname(target))
    } catch (error) {
      if (targetMoved) {
        rmSync(target, { force: true })
        renameSync(rollback, target)
        targetMoved = false
      }
      throw error
    }

    const result = await verifyEnterpriseDatabase(target)
    if (targetMoved) {
      rmSync(rollback, { force: true })
      targetMoved = false
    }
    return { ...result, previousBackup, previousSnapshot }
  } catch (error) {
    if (targetMoved && existsSync(rollback)) {
      rmSync(target, { force: true })
      renameSync(rollback, target)
      targetMoved = false
    }
    throw error
  } finally {
    rmSync(staging, { force: true })
    if (targetMoved && existsSync(rollback) && !existsSync(target)) renameSync(rollback, target)
    releaseLease()
  }
}

/** Run a non-destructive restore and integrity drill beside the configured database volume. */
export async function drillEnterpriseRecovery(
  backupFile: string,
  databasePath: string,
  { rpoMinutes, rtoMinutes }: { rpoMinutes: number; rtoMinutes: number }
) {
  for (const [name, value] of Object.entries({ rpoMinutes, rtoMinutes })) {
    if (!Number.isFinite(value) || value < 1 || value > 525_600)
      throw new Error(`${name} must be between 1 and 525600 minutes`)
  }

  const backup = resolve(backupFile)
  const destinationDirectory = dirname(resolve(databasePath))
  const startedAt = Date.now()
  const verifiedBackup = await verifyEnterpriseDatabase(backup, { requireManifest: true })
  const createdAt = Date.parse(verifiedBackup.manifest!.createdAt)
  if (!Number.isFinite(createdAt) || createdAt > startedAt) {
    throw new Error('Verified backup manifest has an invalid or future creation time')
  }
  const backupAgeMinutes = (startedAt - createdAt) / 60_000
  const drillDirectory = mkdtempSync(join(destinationDirectory, '.enterprise-recovery-drill-'))
  const drillDatabase = join(drillDirectory, 'restored.sqlite')
  let restoreAndVerifyMs = 0
  let restoredFingerprint = ''
  try {
    const restoreStartedAt = Date.now()
    const restored = await restoreEnterpriseBackup(backup, drillDatabase)
    const verified = await verifyEnterpriseDatabase(drillDatabase)
    restoreAndVerifyMs = Date.now() - restoreStartedAt
    restoredFingerprint = verified.logicalFingerprint
    if (restored.logicalFingerprint !== verifiedBackup.logicalFingerprint || restoredFingerprint !== verifiedBackup.logicalFingerprint) {
      throw new Error('Recovery drill changed authorization, membership, session, credential, or audit contents')
    }
  } finally {
    rmSync(drillDirectory, { recursive: true, force: true })
  }

  const rpoWithinTarget = backupAgeMinutes <= rpoMinutes
  const rtoWithinTarget = restoreAndVerifyMs <= rtoMinutes * 60_000
  return {
    passed: rpoWithinTarget && rtoWithinTarget,
    scope: 'local-sqlite-restore-and-verification',
    backupAgeMinutes: Math.round(backupAgeMinutes * 100) / 100,
    rpoTargetMinutes: rpoMinutes,
    rpoWithinTarget,
    restoreAndVerifyMs,
    rtoTargetMinutes: rtoMinutes,
    rtoWithinTarget,
    schemaVersion: verifiedBackup.schemaVersion,
    logicalFingerprintVerified: restoredFingerprint === verifiedBackup.logicalFingerprint,
  }
}
