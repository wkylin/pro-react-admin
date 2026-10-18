import { createHash } from 'node:crypto'
import type { DatabaseSync } from 'node:sqlite'

interface Migration {
  version: number
  name: string
  sql: string
  checksum: string
}

const BASELINE_V1_SQL = `
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
`

const PRINCIPALS_AND_MEMBERSHIPS_V2_SQL = `
CREATE TABLE principals (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL
);
INSERT INTO principals (id, created_at)
SELECT id, strftime('%Y-%m-%dT%H:%M:%fZ', 'now') FROM users;
ALTER TABLE users ADD COLUMN principal_id TEXT REFERENCES principals(id) ON DELETE RESTRICT;
UPDATE users SET principal_id=id;
CREATE TABLE tenant_memberships (
  tenant_id TEXT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  principal_id TEXT NOT NULL REFERENCES principals(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  joined_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, principal_id),
  UNIQUE (tenant_id, user_id),
  FOREIGN KEY (tenant_id, user_id) REFERENCES users(tenant_id, id) ON DELETE CASCADE
);
INSERT INTO tenant_memberships (tenant_id, principal_id, user_id, joined_at)
SELECT tenant_id, principal_id, id, strftime('%Y-%m-%dT%H:%M:%fZ', 'now') FROM users;
CREATE INDEX tenant_memberships_principal ON tenant_memberships(principal_id, tenant_id);
CREATE INDEX users_principal ON users(principal_id);
CREATE TRIGGER users_require_principal
BEFORE INSERT ON users
WHEN NEW.principal_id IS NULL
BEGIN
  SELECT RAISE(ABORT, 'principal_required');
END;
CREATE TRIGGER users_require_principal_update
BEFORE UPDATE OF principal_id ON users
WHEN NEW.principal_id IS NULL
BEGIN
  SELECT RAISE(ABORT, 'principal_required');
END;
CREATE TRIGGER users_create_membership
AFTER INSERT ON users
WHEN NEW.principal_id IS NOT NULL
BEGIN
  INSERT INTO tenant_memberships (tenant_id, principal_id, user_id, joined_at)
  VALUES (NEW.tenant_id, NEW.principal_id, NEW.id, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
END;
CREATE TRIGGER users_update_membership
AFTER UPDATE OF principal_id ON users
WHEN NEW.principal_id IS NOT OLD.principal_id
BEGIN
  DELETE FROM sessions WHERE tenant_id=OLD.tenant_id AND user_id=OLD.id;
  UPDATE tenant_memberships
  SET principal_id=NEW.principal_id
  WHERE tenant_id=OLD.tenant_id AND user_id=OLD.id;
  DELETE FROM principals
  WHERE id=OLD.principal_id
    AND NOT EXISTS (SELECT 1 FROM users WHERE principal_id=OLD.principal_id);
END;
CREATE TRIGGER users_delete_orphan_principal
AFTER DELETE ON users
WHEN OLD.principal_id IS NOT NULL
BEGIN
  DELETE FROM principals
  WHERE id=OLD.principal_id
    AND NOT EXISTS (SELECT 1 FROM users WHERE principal_id=OLD.principal_id);
END;
`

function checksum(version: number, name: string, sql: string) {
  return createHash('sha256').update(`${version}\0${name}\0${sql}`).digest('hex')
}

function defineMigration(version: number, name: string, sql: string): Migration {
  return { version, name, sql, checksum: checksum(version, name, sql) }
}

export const ENTERPRISE_MIGRATIONS = [
  defineMigration(1, 'single-tenant-baseline', BASELINE_V1_SQL),
  defineMigration(2, 'principals-and-tenant-memberships', PRINCIPALS_AND_MEMBERSHIPS_V2_SQL),
] as const

export const ENTERPRISE_SCHEMA_VERSION = ENTERPRISE_MIGRATIONS.at(-1)!.version

export interface EnterpriseMigrationStatus {
  userVersion: number
  latestVersion: number
  pendingVersions: number[]
  historyExists: boolean
  adoptLegacyBaseline: boolean
}

function scalar<T>(db: DatabaseSync, sql: string): T | undefined {
  return db.prepare(sql).get() as T | undefined
}

function tableNames(db: DatabaseSync) {
  return (
    db.prepare("SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%'").all() as {
      name: string
    }[]
  ).map(({ name }) => name)
}

function hasColumns(db: DatabaseSync, table: string, required: string[]) {
  const columns = (db.prepare(`PRAGMA table_info("${table}")`).all() as { name: string }[]).map(({ name }) => name)
  return required.every((column) => columns.includes(column))
}

function normalizeSql(sql: string) {
  return sql
    .toLowerCase()
    .replace(/["`\[\]]/g, '')
    .replace(/\s+/g, '')
    .replace(/;/g, '')
}

function uniqueKeys(db: DatabaseSync, table: string) {
  const indexes = db.prepare(`PRAGMA index_list("${table}")`).all() as { name: string; unique: number }[]
  return indexes
    .filter(({ unique }) => unique === 1)
    .map(({ name }) => {
      const columns = db.prepare(`PRAGMA index_info("${name}")`).all() as { name: string | null }[]
      return columns.map(({ name: column }) => column).join(',')
    })
    .sort()
}

function foreignKeys(db: DatabaseSync, table: string) {
  const rows = db.prepare(`PRAGMA foreign_key_list("${table}")`).all() as {
    id: number
    seq: number
    table: string
    from: string
    to: string
    on_update: string
    on_delete: string
  }[]
  const groups = new Map<number, typeof rows>()
  for (const row of rows) groups.set(row.id, [...(groups.get(row.id) ?? []), row])
  return [...groups.values()]
    .map((group) => {
      const first = group[0]
      const columns = group.sort((left, right) => left.seq - right.seq)
      return `${first.table}(${columns.map(({ from }) => from).join(',')})->(${columns
        .map(({ to }) => to)
        .join(',')})/update:${first.on_update}/delete:${first.on_delete}`
    })
    .sort()
}

function validateLegacyV1Structure(db: DatabaseSync) {
  const expectedColumns: Record<string, { name: string; type: string; notnull: number; pk: number }[]> = {
    tenants: [
      { name: 'id', type: 'TEXT', notnull: 0, pk: 1 },
      { name: 'name', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'status', type: 'TEXT', notnull: 1, pk: 0 },
    ],
    roles: [
      { name: 'id', type: 'TEXT', notnull: 0, pk: 1 },
      { name: 'tenant_id', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'name', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'code', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'permissions', type: 'TEXT', notnull: 1, pk: 0 },
    ],
    users: [
      { name: 'id', type: 'TEXT', notnull: 0, pk: 1 },
      { name: 'tenant_id', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'name', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'email', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'role', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'status', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'password_hash', type: 'TEXT', notnull: 0, pk: 0 },
    ],
    sessions: [
      { name: 'hash', type: 'TEXT', notnull: 0, pk: 1 },
      { name: 'tenant_id', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'user_id', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'expires_at', type: 'INTEGER', notnull: 1, pk: 0 },
    ],
    audit: [
      { name: 'id', type: 'TEXT', notnull: 0, pk: 1 },
      { name: 'tenant_id', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'actor', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'action', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'resource', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'recordId', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'at', type: 'TEXT', notnull: 1, pk: 0 },
    ],
  }
  for (const [table, expected] of Object.entries(expectedColumns)) {
    const actual = db.prepare(`PRAGMA table_info("${table}")`).all() as {
      name: string
      type: string
      notnull: number
      pk: number
    }[]
    if (actual.length !== expected.length) {
      throw new Error(`Schema v1 table ${table} has unsupported columns; refusing to migrate an unknown schema`)
    }
    for (const [index, column] of expected.entries()) {
      const found = actual[index]
      if (
        !found ||
        found.name !== column.name ||
        found.type.toUpperCase() !== column.type ||
        found.notnull !== column.notnull ||
        found.pk !== column.pk
      ) {
        throw new Error(
          `Schema v1 table ${table}.${column.name} does not match the supported legacy enterprise database`
        )
      }
    }
  }

  const expectedUniqueKeys = {
    tenants: ['id'],
    roles: ['id', 'tenant_id,code'],
    users: ['id', 'tenant_id,email', 'tenant_id,id'],
    sessions: ['hash'],
    audit: ['id'],
  } satisfies Record<string, string[]>
  for (const [table, expected] of Object.entries(expectedUniqueKeys)) {
    if (JSON.stringify(uniqueKeys(db, table)) !== JSON.stringify([...expected].sort())) {
      throw new Error(
        `Schema v1 table ${table} has unsupported unique constraints; refusing to migrate an unknown schema`
      )
    }
  }

  const expectedForeignKeys = {
    tenants: [],
    roles: ['tenants(tenant_id)->(id)/update:NO ACTION/delete:NO ACTION'],
    users: [
      'roles(tenant_id,role)->(tenant_id,code)/update:CASCADE/delete:NO ACTION',
      'tenants(tenant_id)->(id)/update:NO ACTION/delete:NO ACTION',
    ],
    sessions: ['users(tenant_id,user_id)->(tenant_id,id)/update:NO ACTION/delete:CASCADE'],
    audit: ['tenants(tenant_id)->(id)/update:NO ACTION/delete:NO ACTION'],
  } satisfies Record<string, string[]>
  for (const [table, expected] of Object.entries(expectedForeignKeys)) {
    if (JSON.stringify(foreignKeys(db, table)) !== JSON.stringify([...expected].sort())) {
      throw new Error(`Schema v1 table ${table} has unsupported foreign keys; refusing to migrate an unknown schema`)
    }
  }

  const expectedIndexes = {
    sessions: { sessions_user: ['tenant_id', 'user_id'], sessions_expiry: ['expires_at'] },
    audit: { audit_tenant_date: ['tenant_id', 'at', 'id'] },
  }
  for (const [table, indexes] of Object.entries(expectedIndexes)) {
    for (const [name, expected] of Object.entries(indexes)) {
      const rows = db.prepare(`PRAGMA index_info("${name}")`).all() as { name: string | null }[]
      if (JSON.stringify(rows.map(({ name: column }) => column)) !== JSON.stringify(expected)) {
        throw new Error(`Schema v1 is missing required index ${name}; refusing to migrate an unknown schema`)
      }
    }
    const actualNames = new Set(
      (db.prepare(`PRAGMA index_list("${table}")`).all() as { name: string }[]).map(({ name }) => name)
    )
    for (const name of Object.keys(indexes)) {
      if (!actualNames.has(name)) {
        throw new Error(`Schema v1 is missing required index ${name}; refusing to migrate an unknown schema`)
      }
    }
  }

  for (const table of ['tenants', 'users']) {
    const row = db.prepare("SELECT sql FROM sqlite_schema WHERE type='table' AND name=?").get(table) as
      { sql: string } | undefined
    if (!row || !normalizeSql(row.sql).includes("check(statusin('active','disabled'))")) {
      throw new Error(`Schema v1 table ${table} is missing its supported status constraint`)
    }
  }

  const triggerSql = new Map(
    (
      db.prepare("SELECT name,sql FROM sqlite_schema WHERE type='trigger'").all() as { name: string; sql: string }[]
    ).map(({ name, sql }) => [name, normalizeSql(sql)])
  )
  for (const [name, operation] of [
    ['audit_no_update', 'update'],
    ['audit_no_delete', 'delete'],
  ] as const) {
    const expected = `createtrigger${name}before${operation}onauditbeginselectraise(abort,'audit_append_only')end`
    if (triggerSql.get(name) !== expected) {
      throw new Error(`Schema v1 is missing a valid ${name} append-only audit trigger`)
    }
  }
}

function assertTableColumns(
  db: DatabaseSync,
  table: string,
  expected: { name: string; type: string; notnull: number; pk: number }[]
) {
  const actual = db.prepare(`PRAGMA table_info("${table}")`).all() as {
    name: string
    type: string
    notnull: number
    pk: number
  }[]
  if (
    actual.length !== expected.length ||
    expected.some((column, index) => {
      const found = actual[index]
      return (
        !found ||
        found.name !== column.name ||
        found.type.toUpperCase() !== column.type ||
        found.notnull !== column.notnull ||
        found.pk !== column.pk
      )
    })
  ) {
    throw new Error(`Enterprise schema table ${table} has unsupported columns`)
  }
}

function validateVersion2Structure(db: DatabaseSync) {
  const columns: Record<string, { name: string; type: string; notnull: number; pk: number }[]> = {
    tenants: [
      { name: 'id', type: 'TEXT', notnull: 0, pk: 1 },
      { name: 'name', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'status', type: 'TEXT', notnull: 1, pk: 0 },
    ],
    roles: [
      { name: 'id', type: 'TEXT', notnull: 0, pk: 1 },
      { name: 'tenant_id', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'name', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'code', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'permissions', type: 'TEXT', notnull: 1, pk: 0 },
    ],
    users: [
      { name: 'id', type: 'TEXT', notnull: 0, pk: 1 },
      { name: 'tenant_id', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'name', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'email', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'role', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'status', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'password_hash', type: 'TEXT', notnull: 0, pk: 0 },
      { name: 'principal_id', type: 'TEXT', notnull: 0, pk: 0 },
    ],
    sessions: [
      { name: 'hash', type: 'TEXT', notnull: 0, pk: 1 },
      { name: 'tenant_id', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'user_id', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'expires_at', type: 'INTEGER', notnull: 1, pk: 0 },
    ],
    audit: [
      { name: 'id', type: 'TEXT', notnull: 0, pk: 1 },
      { name: 'tenant_id', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'actor', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'action', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'resource', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'recordId', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'at', type: 'TEXT', notnull: 1, pk: 0 },
    ],
    principals: [
      { name: 'id', type: 'TEXT', notnull: 0, pk: 1 },
      { name: 'created_at', type: 'TEXT', notnull: 1, pk: 0 },
    ],
    tenant_memberships: [
      { name: 'tenant_id', type: 'TEXT', notnull: 1, pk: 1 },
      { name: 'principal_id', type: 'TEXT', notnull: 1, pk: 2 },
      { name: 'user_id', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'joined_at', type: 'TEXT', notnull: 1, pk: 0 },
    ],
    schema_migrations: [
      { name: 'version', type: 'INTEGER', notnull: 0, pk: 1 },
      { name: 'name', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'checksum', type: 'TEXT', notnull: 1, pk: 0 },
      { name: 'applied_at', type: 'TEXT', notnull: 1, pk: 0 },
    ],
  }
  for (const [table, expected] of Object.entries(columns)) assertTableColumns(db, table, expected)

  const expectedUniqueKeys = {
    tenants: ['id'],
    roles: ['id', 'tenant_id,code'],
    users: ['id', 'tenant_id,email', 'tenant_id,id'],
    sessions: ['hash'],
    audit: ['id'],
    principals: ['id'],
    tenant_memberships: ['tenant_id,principal_id', 'tenant_id,user_id'],
    // INTEGER PRIMARY KEY aliases SQLite's rowid and has no index_list entry.
    schema_migrations: [],
  } satisfies Record<string, string[]>
  for (const [table, expected] of Object.entries(expectedUniqueKeys)) {
    if (JSON.stringify(uniqueKeys(db, table)) !== JSON.stringify([...expected].sort())) {
      throw new Error(`Enterprise schema table ${table} has unsupported unique constraints`)
    }
  }

  const expectedForeignKeys = {
    tenants: [],
    roles: ['tenants(tenant_id)->(id)/update:NO ACTION/delete:NO ACTION'],
    users: [
      'principals(principal_id)->(id)/update:NO ACTION/delete:RESTRICT',
      'roles(tenant_id,role)->(tenant_id,code)/update:CASCADE/delete:NO ACTION',
      'tenants(tenant_id)->(id)/update:NO ACTION/delete:NO ACTION',
    ],
    sessions: ['users(tenant_id,user_id)->(tenant_id,id)/update:NO ACTION/delete:CASCADE'],
    audit: ['tenants(tenant_id)->(id)/update:NO ACTION/delete:NO ACTION'],
    principals: [],
    tenant_memberships: [
      'principals(principal_id)->(id)/update:NO ACTION/delete:CASCADE',
      'tenants(tenant_id)->(id)/update:NO ACTION/delete:CASCADE',
      'users(tenant_id,user_id)->(tenant_id,id)/update:NO ACTION/delete:CASCADE',
    ],
    schema_migrations: [],
  } satisfies Record<string, string[]>
  for (const [table, expected] of Object.entries(expectedForeignKeys)) {
    if (JSON.stringify(foreignKeys(db, table)) !== JSON.stringify([...expected].sort())) {
      throw new Error(`Enterprise schema table ${table} has unsupported foreign keys`)
    }
  }

  const expectedIndexes = {
    sessions: { sessions_user: ['tenant_id', 'user_id'], sessions_expiry: ['expires_at'] },
    audit: { audit_tenant_date: ['tenant_id', 'at', 'id'] },
    users: { users_principal: ['principal_id'] },
    tenant_memberships: { tenant_memberships_principal: ['principal_id', 'tenant_id'] },
  }
  for (const [table, indexes] of Object.entries(expectedIndexes)) {
    const actualNames = new Set(
      (db.prepare(`PRAGMA index_list("${table}")`).all() as { name: string }[]).map(({ name }) => name)
    )
    for (const [name, expected] of Object.entries(indexes)) {
      if (!actualNames.has(name)) throw new Error(`Enterprise schema is missing required index ${name}`)
      const rows = db.prepare(`PRAGMA index_info("${name}")`).all() as { name: string | null }[]
      if (JSON.stringify(rows.map(({ name: column }) => column)) !== JSON.stringify(expected)) {
        throw new Error(`Enterprise schema index ${name} has unsupported columns`)
      }
    }
  }

  for (const table of ['tenants', 'users']) {
    const row = db.prepare("SELECT sql FROM sqlite_schema WHERE type='table' AND name=?").get(table) as
      { sql: string } | undefined
    if (!row || !normalizeSql(row.sql).includes("check(statusin('active','disabled'))")) {
      throw new Error(`Enterprise schema table ${table} is missing its supported status constraint`)
    }
  }

  const expectedTriggers = {
    audit_no_update: "createtriggeraudit_no_updatebeforeupdateonauditbeginselectraise(abort,'audit_append_only')end",
    audit_no_delete: "createtriggeraudit_no_deletebeforedeleteonauditbeginselectraise(abort,'audit_append_only')end",
    users_require_principal:
      "createtriggerusers_require_principalbeforeinsertonuserswhennew.principal_idisnullbeginselectraise(abort,'principal_required')end",
    users_require_principal_update:
      "createtriggerusers_require_principal_updatebeforeupdateofprincipal_idonuserswhennew.principal_idisnullbeginselectraise(abort,'principal_required')end",
    users_create_membership:
      "createtriggerusers_create_membershipafterinsertonuserswhennew.principal_idisnotnullbegininsertintotenant_memberships(tenant_id,principal_id,user_id,joined_at)values(new.tenant_id,new.principal_id,new.id,strftime('%y-%m-%dt%h:%m:%fz','now'))end",
    users_update_membership:
      'createtriggerusers_update_membershipafterupdateofprincipal_idonuserswhennew.principal_idisnotold.principal_idbegindeletefromsessionswheretenant_id=old.tenant_idanduser_id=old.idupdatetenant_membershipssetprincipal_id=new.principal_idwheretenant_id=old.tenant_idanduser_id=old.iddeletefromprincipalswhereid=old.principal_idandnotexists(select1fromuserswhereprincipal_id=old.principal_id)end',
    users_delete_orphan_principal:
      'createtriggerusers_delete_orphan_principalafterdeleteonuserswhenold.principal_idisnotnullbegindeletefromprincipalswhereid=old.principal_idandnotexists(select1fromuserswhereprincipal_id=old.principal_id)end',
  } satisfies Record<string, string>
  const actualTriggers = new Map(
    (
      db.prepare("SELECT name,sql FROM sqlite_schema WHERE type='trigger'").all() as {
        name: string
        sql: string
      }[]
    ).map(({ name, sql }) => [name, normalizeSql(sql)])
  )
  for (const [name, expected] of Object.entries(expectedTriggers)) {
    if (actualTriggers.get(name) !== expected) {
      throw new Error(`Enterprise schema trigger ${name} has an unsupported definition`)
    }
  }
}

function validateLegacyV1(db: DatabaseSync) {
  const requiredTables = ['tenants', 'roles', 'users', 'sessions', 'audit']
  const names = new Set(tableNames(db))
  const expectedColumns: Record<string, string[]> = {
    tenants: ['id', 'name', 'status'],
    roles: ['id', 'tenant_id', 'name', 'code', 'permissions'],
    users: ['id', 'tenant_id', 'name', 'email', 'role', 'status', 'password_hash'],
    sessions: ['hash', 'tenant_id', 'user_id', 'expires_at'],
    audit: ['id', 'tenant_id', 'actor', 'action', 'resource', 'recordId', 'at'],
  }

  if (requiredTables.some((name) => !names.has(name))) {
    throw new Error('Schema v1 is not the supported legacy enterprise database; refusing to migrate an unknown schema')
  }
  for (const [table, columns] of Object.entries(expectedColumns)) {
    if (!hasColumns(db, table, columns)) {
      throw new Error(`Schema v1 table ${table} does not match the supported legacy enterprise database`)
    }
  }

  validateLegacyV1Structure(db)

  const triggers = new Set(
    (db.prepare("SELECT name FROM sqlite_schema WHERE type='trigger'").all() as { name: string }[]).map(
      ({ name }) => name
    )
  )
  if (!triggers.has('audit_no_update') || !triggers.has('audit_no_delete')) {
    throw new Error('Schema v1 is missing append-only audit triggers; refusing to migrate an unknown schema')
  }
  if ((db.prepare('PRAGMA foreign_key_check').all() as unknown[]).length) {
    throw new Error('Schema v1 has foreign-key violations; repair or restore the database before migration')
  }
}

export function getEnterpriseMigrationStatus(db: DatabaseSync): EnterpriseMigrationStatus {
  const userVersion = Number(scalar<{ user_version: number }>(db, 'PRAGMA user_version')?.user_version ?? 0)
  const names = new Set(tableNames(db))
  const historyExists = names.has('schema_migrations')

  if (userVersion > ENTERPRISE_SCHEMA_VERSION) {
    throw new Error(`Enterprise database schema ${userVersion} is newer than this application supports`)
  }

  if (!historyExists) {
    if (userVersion === 0 && names.size === 0) {
      return {
        userVersion,
        latestVersion: ENTERPRISE_SCHEMA_VERSION,
        pendingVersions: ENTERPRISE_MIGRATIONS.map(({ version }) => version),
        historyExists: false,
        adoptLegacyBaseline: false,
      }
    }
    if (userVersion === 1) {
      validateLegacyV1(db)
      return {
        userVersion,
        latestVersion: ENTERPRISE_SCHEMA_VERSION,
        pendingVersions: ENTERPRISE_MIGRATIONS.filter(({ version }) => version > userVersion).map(
          ({ version }) => version
        ),
        historyExists: false,
        adoptLegacyBaseline: true,
      }
    }
    throw new Error(
      'Enterprise database has an unversioned or unsupported schema; preserve a copy and inspect it before migration'
    )
  }

  if (!hasColumns(db, 'schema_migrations', ['version', 'name', 'checksum', 'applied_at'])) {
    throw new Error('Enterprise database migration history is malformed')
  }
  assertTableColumns(db, 'schema_migrations', [
    { name: 'version', type: 'INTEGER', notnull: 0, pk: 1 },
    { name: 'name', type: 'TEXT', notnull: 1, pk: 0 },
    { name: 'checksum', type: 'TEXT', notnull: 1, pk: 0 },
    { name: 'applied_at', type: 'TEXT', notnull: 1, pk: 0 },
  ])
  // INTEGER PRIMARY KEY is checked through table_info above, not index_list.
  if (uniqueKeys(db, 'schema_migrations').length !== 0) {
    throw new Error('Enterprise database migration history has unsupported unique constraints')
  }
  if (userVersion === 0) throw new Error('Enterprise database migration history has no initialized schema version')

  const rows = db.prepare('SELECT version,name,checksum FROM schema_migrations ORDER BY version').all() as {
    version: number
    name: string
    checksum: string
  }[]
  if (rows.length !== userVersion || rows.some(({ version }, index) => version !== index + 1)) {
    throw new Error('Enterprise database user_version does not match its migration history')
  }
  for (const row of rows) {
    const migration = ENTERPRISE_MIGRATIONS[row.version - 1]
    if (!migration || migration.name !== row.name || migration.checksum !== row.checksum) {
      throw new Error(`Enterprise database migration ${row.version} has an unknown name or checksum`)
    }
  }

  if (userVersion === 1) validateLegacyV1(db)
  else if (userVersion === 2) validateVersion2Structure(db)

  return {
    userVersion,
    latestVersion: ENTERPRISE_SCHEMA_VERSION,
    pendingVersions: ENTERPRISE_MIGRATIONS.filter(({ version }) => version > userVersion).map(({ version }) => version),
    historyExists,
    adoptLegacyBaseline: false,
  }
}

function createMigrationHistory(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE schema_migrations (
      version INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      checksum TEXT NOT NULL,
      applied_at TEXT NOT NULL
    );
  `)
}

function recordMigration(db: DatabaseSync, migration: Migration) {
  db.prepare('INSERT INTO schema_migrations (version,name,checksum,applied_at) VALUES (?,?,?,?)').run(
    migration.version,
    migration.name,
    migration.checksum,
    new Date().toISOString()
  )
  db.exec(`PRAGMA user_version=${migration.version}`)
}

/** All pending DDL and history updates commit together, with optional invariants checked before commit. */
export function applyEnterpriseMigrations(db: DatabaseSync, validateBeforeCommit?: () => void) {
  const status = getEnterpriseMigrationStatus(db)
  if (!status.pendingVersions.length && !status.adoptLegacyBaseline) return status

  db.exec('BEGIN IMMEDIATE')
  try {
    if (status.adoptLegacyBaseline) {
      createMigrationHistory(db)
      recordMigration(db, ENTERPRISE_MIGRATIONS[0])
    } else if (!status.historyExists) {
      createMigrationHistory(db)
    }

    for (const migration of ENTERPRISE_MIGRATIONS) {
      if (!status.pendingVersions.includes(migration.version)) continue
      db.exec(migration.sql)
      recordMigration(db, migration)
    }

    getEnterpriseMigrationStatus(db)
    validateBeforeCommit?.()
    db.exec('COMMIT')
  } catch (error) {
    try {
      db.exec('ROLLBACK')
    } catch {
      // Keep the migration error; SQLite may already have rolled the transaction back.
    }
    throw error
  }

  return getEnterpriseMigrationStatus(db)
}
