import { DatabaseSync, type SQLInputValue } from 'node:sqlite'
import { chmodSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { acquireDatabaseLease } from './database-lock.mts'
import { applyEnterpriseMigrations } from './migrations.mts'
import { verifyEnterpriseDatabaseConnection } from './database-ops.mts'

export type EnterpriseMigrationMode = 'apply' | 'verify' | 'none'

/** SQL is internal; every identity/value is bound, and identifiers come from fixed resource maps. */
export class EnterpriseStore {
  db: DatabaseSync
  private releaseLease: () => void
  private closed = false

  constructor(file: string, { migrationMode = 'apply' }: { migrationMode?: EnterpriseMigrationMode } = {}) {
    if (file !== ':memory:') mkdirSync(dirname(file), { recursive: true, mode: 0o700 })
    this.releaseLease = acquireDatabaseLease(file)
    let db: DatabaseSync | undefined
    try {
      db = new DatabaseSync(file)
      if (file !== ':memory:') chmodSync(file, 0o600)
      db.exec('PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000; PRAGMA journal_mode=WAL;')

      if (migrationMode === 'apply') applyEnterpriseMigrations(db)
      else if (migrationMode === 'verify') {
        const status = verifyEnterpriseDatabaseConnection(db)
        if (status.pendingVersions.length || status.adoptLegacyBaseline) {
          throw new Error(
            `Enterprise database schema ${status.userVersion} needs an offline migration; run server/enterprise/db-admin.mjs migrate after taking a backup`
          )
        }
      }

      this.db = db
    } catch (error) {
      db?.close()
      this.releaseLease()
      throw error
    }
  }
  one<T>(sql: string, ...values: SQLInputValue[]): T | undefined {
    return this.db.prepare(sql).get(...values) as T | undefined
  }
  all<T>(sql: string, ...values: SQLInputValue[]): T[] {
    return this.db.prepare(sql).all(...values) as T[]
  }
  run(sql: string, ...values: SQLInputValue[]) {
    return this.db.prepare(sql).run(...values)
  }
  /** Callbacks must be synchronous: hashing/network work happens before entering the transaction. */
  transaction<T>(work: () => T): T {
    this.db.exec('BEGIN IMMEDIATE')
    try {
      const result = work()
      this.db.exec('COMMIT')
      return result
    } catch (error) {
      try {
        this.db.exec('ROLLBACK')
      } catch {
        // Keep the original error if SQLite has already rolled back the transaction.
      }
      throw error
    }
  }
  close() {
    if (this.closed) return
    this.closed = true
    try {
      this.db.close()
    } finally {
      this.releaseLease()
    }
  }
}
