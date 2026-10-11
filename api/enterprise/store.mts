import { DatabaseSync, type SQLInputValue } from 'node:sqlite'
import { chmodSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

/** SQL is internal; every identity/value is bound, and identifiers come from fixed resource maps. */
export class EnterpriseStore {
  db: DatabaseSync
  constructor(file: string) {
    if (file !== ':memory:') mkdirSync(dirname(file), { recursive: true, mode: 0o700 })
    this.db = new DatabaseSync(file)
    try {
      if (file !== ':memory:') chmodSync(file, 0o600)
      this.db.exec('PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000; PRAGMA journal_mode=WAL;')
      const version = this.one<{ user_version: number }>('PRAGMA user_version')?.user_version ?? 0
      if (version > 1) throw new Error('Unsupported enterprise database schema')
      if (version === 0)
        this.transaction(() =>
          this.db.exec(`
        CREATE TABLE tenants (id TEXT PRIMARY KEY, name TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('active','disabled')));
        CREATE TABLE roles (
          id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL REFERENCES tenants(id), name TEXT NOT NULL,
          code TEXT NOT NULL, permissions TEXT NOT NULL, UNIQUE(tenant_id, code)
        );
        CREATE TABLE users (
          id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL REFERENCES tenants(id), name TEXT NOT NULL,
          email TEXT NOT NULL, role TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('active','disabled')),
          password_hash TEXT, UNIQUE(tenant_id, email), UNIQUE(tenant_id, id),
          FOREIGN KEY(tenant_id, role) REFERENCES roles(tenant_id, code) ON UPDATE CASCADE
        );
        CREATE TABLE sessions (
          hash TEXT PRIMARY KEY, tenant_id TEXT NOT NULL, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL,
          FOREIGN KEY(tenant_id, user_id) REFERENCES users(tenant_id, id) ON DELETE CASCADE
        );
        CREATE INDEX sessions_user ON sessions(tenant_id, user_id);
        CREATE INDEX sessions_expiry ON sessions(expires_at);
        CREATE TABLE audit (
          id TEXT PRIMARY KEY, tenant_id TEXT NOT NULL REFERENCES tenants(id), actor TEXT NOT NULL,
          action TEXT NOT NULL, resource TEXT NOT NULL, recordId TEXT NOT NULL, at TEXT NOT NULL
        );
        CREATE INDEX audit_tenant_date ON audit(tenant_id, at DESC, id);
        CREATE TRIGGER audit_no_update BEFORE UPDATE ON audit BEGIN SELECT RAISE(ABORT, 'audit_append_only'); END;
        CREATE TRIGGER audit_no_delete BEFORE DELETE ON audit BEGIN SELECT RAISE(ABORT, 'audit_append_only'); END;
        PRAGMA user_version=1;
      `)
        )
    } catch (error) {
      this.db.close()
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
      this.db.exec('ROLLBACK')
      throw error
    }
  }
  close() {
    this.db.close()
  }
}
