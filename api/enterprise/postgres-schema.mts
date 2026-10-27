import { createHash } from 'node:crypto'
import type { PostgresEnterpriseStore } from './postgres-store.mts'

// PostgreSQL starts at version 1 with the complete SQLite v5 business model.
// Later changes belong in a new entry; never edit a migration already deployed.
const SCHEMA_SQL = [
  `CREATE TABLE tenants (
    id text PRIMARY KEY,
    name text NOT NULL,
    status text NOT NULL CHECK (status IN ('active', 'disabled'))
  )`,
  `CREATE TABLE roles (
    id text PRIMARY KEY,
    tenant_id text NOT NULL REFERENCES tenants(id),
    name text NOT NULL,
    code text NOT NULL,
    permissions text NOT NULL,
    UNIQUE (tenant_id, code)
  )`,
  `CREATE TABLE principals (
    id text PRIMARY KEY,
    created_at text NOT NULL
  )`,
  `CREATE TABLE users (
    id text PRIMARY KEY,
    tenant_id text NOT NULL REFERENCES tenants(id),
    name text NOT NULL,
    email text NOT NULL,
    role text NOT NULL,
    status text NOT NULL CHECK (status IN ('active', 'disabled')),
    password_hash text,
    principal_id text NOT NULL REFERENCES principals(id) ON DELETE RESTRICT,
    UNIQUE (tenant_id, email),
    UNIQUE (tenant_id, id),
    FOREIGN KEY (tenant_id, role) REFERENCES roles(tenant_id, code) ON UPDATE CASCADE
  )`,
  `CREATE INDEX users_principal ON users(principal_id)`,
  `CREATE TABLE tenant_memberships (
    tenant_id text NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    principal_id text NOT NULL REFERENCES principals(id) ON DELETE CASCADE,
    user_id text NOT NULL,
    joined_at text NOT NULL,
    PRIMARY KEY (tenant_id, principal_id),
    UNIQUE (tenant_id, user_id),
    FOREIGN KEY (tenant_id, user_id) REFERENCES users(tenant_id, id) ON DELETE CASCADE
  )`,
  `CREATE INDEX tenant_memberships_principal ON tenant_memberships(principal_id, tenant_id)`,
  `CREATE TABLE sessions (
    hash text PRIMARY KEY,
    tenant_id text NOT NULL,
    user_id text NOT NULL,
    expires_at double precision NOT NULL,
    FOREIGN KEY (tenant_id, user_id) REFERENCES users(tenant_id, id) ON DELETE CASCADE
  )`,
  `CREATE INDEX sessions_user ON sessions(tenant_id, user_id)`,
  `CREATE INDEX sessions_expiry ON sessions(expires_at)`,
  `CREATE TABLE audit (
    id text PRIMARY KEY,
    seq bigint GENERATED ALWAYS AS IDENTITY UNIQUE,
    tenant_id text NOT NULL REFERENCES tenants(id),
    actor text NOT NULL,
    action text NOT NULL,
    resource text NOT NULL,
    "recordId" text NOT NULL,
    at text NOT NULL
  )`,
  `CREATE INDEX audit_tenant_date ON audit(tenant_id, at DESC, id)`,
  `CREATE INDEX audit_tenant_seq ON audit(tenant_id, seq)`,
  `CREATE FUNCTION enterprise_reject_audit_change() RETURNS trigger LANGUAGE plpgsql AS $$
    BEGIN RAISE EXCEPTION 'audit_append_only'; END
  $$`,
  `CREATE TRIGGER audit_no_update BEFORE UPDATE ON audit
    FOR EACH ROW EXECUTE FUNCTION enterprise_reject_audit_change()`,
  `CREATE TRIGGER audit_no_delete BEFORE DELETE ON audit
    FOR EACH ROW EXECUTE FUNCTION enterprise_reject_audit_change()`,
  `CREATE FUNCTION enterprise_sync_user_membership() RETURNS trigger LANGUAGE plpgsql AS $$
    BEGIN
      IF TG_OP = 'INSERT' THEN
        INSERT INTO tenant_memberships (tenant_id, principal_id, user_id, joined_at)
        VALUES (NEW.tenant_id, NEW.principal_id, NEW.id,
          to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'));
        RETURN NEW;
      END IF;
      IF TG_OP = 'UPDATE' THEN
        IF NEW.principal_id IS DISTINCT FROM OLD.principal_id THEN
          DELETE FROM sessions WHERE tenant_id = OLD.tenant_id AND user_id = OLD.id;
          UPDATE tenant_memberships SET principal_id = NEW.principal_id
          WHERE tenant_id = OLD.tenant_id AND user_id = OLD.id;
          DELETE FROM principals WHERE id = OLD.principal_id
            AND NOT EXISTS (SELECT 1 FROM users WHERE principal_id = OLD.principal_id);
        END IF;
        RETURN NEW;
      END IF;
      DELETE FROM principals WHERE id = OLD.principal_id
        AND NOT EXISTS (SELECT 1 FROM users WHERE principal_id = OLD.principal_id);
      RETURN OLD;
    END
  $$`,
  `CREATE TRIGGER users_create_membership AFTER INSERT ON users
    FOR EACH ROW EXECUTE FUNCTION enterprise_sync_user_membership()`,
  `CREATE TRIGGER users_update_membership AFTER UPDATE OF principal_id ON users
    FOR EACH ROW EXECUTE FUNCTION enterprise_sync_user_membership()`,
  `CREATE TRIGGER users_delete_orphan_principal AFTER DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION enterprise_sync_user_membership()`,
  `CREATE TABLE role_scopes (
    tenant_id text NOT NULL,
    role_code text NOT NULL,
    scopes text NOT NULL,
    PRIMARY KEY (tenant_id, role_code),
    FOREIGN KEY (tenant_id, role_code) REFERENCES roles(tenant_id, code)
      ON UPDATE CASCADE ON DELETE CASCADE
  )`,
  `CREATE TABLE access_requests (
    id text PRIMARY KEY,
    tenant_id text NOT NULL REFERENCES tenants(id),
    kind text NOT NULL CHECK (kind IN ('role', 'user')),
    target_id text NOT NULL,
    actor_id text NOT NULL,
    actor_email text NOT NULL,
    before_json text NOT NULL,
    after_json text NOT NULL,
    affected_json text NOT NULL,
    reason text NOT NULL,
    fingerprint text NOT NULL,
    status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'stale')),
    reviewer_id text,
    decision_reason text,
    created_at text NOT NULL,
    decided_at text
  )`,
  `CREATE INDEX access_requests_tenant_date ON access_requests(tenant_id, created_at DESC, id)`,
  `CREATE TABLE totp_credentials (
    principal_id text PRIMARY KEY REFERENCES principals(id) ON DELETE CASCADE,
    secret_ciphertext text NOT NULL,
    enabled integer NOT NULL CHECK (enabled IN (0, 1)),
    pending_expires_at double precision,
    last_used_step integer,
    created_at text NOT NULL,
    enabled_at text,
    CHECK ((enabled = 0 AND pending_expires_at IS NOT NULL AND enabled_at IS NULL)
      OR (enabled = 1 AND pending_expires_at IS NULL AND enabled_at IS NOT NULL))
  )`,
  `CREATE TABLE totp_recovery_codes (
    principal_id text NOT NULL REFERENCES principals(id) ON DELETE CASCADE,
    code_hash text NOT NULL,
    created_at text NOT NULL,
    PRIMARY KEY (principal_id, code_hash)
  )`,
  `CREATE TABLE totp_rate_limits (
    principal_id text PRIMARY KEY REFERENCES principals(id) ON DELETE CASCADE,
    window_started_at double precision NOT NULL,
    attempts integer NOT NULL
  )`,
  `CREATE TABLE platform_admins (
    principal_id text PRIMARY KEY REFERENCES principals(id) ON DELETE CASCADE,
    granted_at text NOT NULL
  )`,
  `CREATE TABLE login_rate_limits (
    client_key text PRIMARY KEY,
    window_started_at double precision NOT NULL,
    attempts integer NOT NULL
  )`,
] as const

const EVENT_SCHEMA_SQL = [
  `CREATE TABLE event_tickets (
    hash text PRIMARY KEY,
    session_hash text NOT NULL REFERENCES sessions(hash) ON DELETE CASCADE,
    tenant_id text NOT NULL,
    principal_id text NOT NULL,
    expires_at double precision NOT NULL
  )`,
  `CREATE INDEX event_tickets_expiry ON event_tickets(expires_at)`,
  `CREATE TABLE event_ticket_limits (
    session_hash text PRIMARY KEY REFERENCES sessions(hash) ON DELETE CASCADE,
    window_started_at double precision NOT NULL,
    attempts integer NOT NULL
  )`,
  `CREATE FUNCTION enterprise_notify_audit() RETURNS trigger LANGUAGE plpgsql AS $$
    BEGIN
      PERFORM pg_notify('enterprise_resource_events',
        json_build_object('tenantId', NEW.tenant_id, 'seq', NEW.seq::text,
          'resource', NEW.resource, 'action', NEW.action)::text);
      RETURN NEW;
    END
  $$`,
  `CREATE TRIGGER audit_notify_insert AFTER INSERT ON audit
    FOR EACH ROW EXECUTE FUNCTION enterprise_notify_audit()`,
] as const

export const POSTGRES_SCHEMA_VERSION = 2
const migrations = [SCHEMA_SQL, EVENT_SCHEMA_SQL] as const
const checksums = migrations.map((statements) => createHash('sha256').update(statements.join('\n')).digest('hex'))

export async function migratePostgresEnterpriseDatabase(store: PostgresEnterpriseStore) {
  return store.transaction(async () => {
    await store.query('SELECT pg_advisory_xact_lock(70618351)')
    await store.query(`CREATE TABLE IF NOT EXISTS enterprise_schema_migrations (
      version integer PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now()
    )`)
    const existing = await store.all<{ version: number; checksum: string }>(
      'SELECT version, checksum FROM enterprise_schema_migrations ORDER BY version ASC'
    )
    if (existing.some((row, index) => row.version !== index + 1 || row.checksum !== checksums[index]))
      throw new Error('Unsupported Enterprise PostgreSQL schema; review migrations before deployment')
    if (!existing.length) {
      // Do not adopt an unknown existing schema as an empty database.
      const foreignTables = await store.all<{ name: string }>(
        `SELECT tablename AS name FROM pg_tables WHERE schemaname = current_schema()
         AND tablename <> 'enterprise_schema_migrations'`
      )
      if (foreignTables.length) throw new Error('PostgreSQL schema is not empty; refusing to replace existing tables')
    }
    for (let index = existing.length; index < migrations.length; index += 1) {
      for (const statement of migrations[index]) await store.query(statement)
      await store.run('INSERT INTO enterprise_schema_migrations (version, checksum) VALUES (?, ?)', index + 1, checksums[index])
    }
    return { version: POSTGRES_SCHEMA_VERSION, applied: existing.length < migrations.length }
  })
}

export async function verifyPostgresEnterpriseDatabase(store: PostgresEnterpriseStore, { allowVersionOne = false } = {}) {
  let row
  try {
    row = await store.one<{ version: number; checksum: string }>(
      `SELECT version, checksum FROM enterprise_schema_migrations ORDER BY version DESC LIMIT 1`
    )
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === '42P01')
      throw new Error('Enterprise PostgreSQL schema needs migration; run api:pg migrate')
    throw error
  }
  if (!row || row.checksum !== checksums[row.version - 1] ||
      (row.version !== POSTGRES_SCHEMA_VERSION && !(allowVersionOne && row.version === 1)))
    throw new Error('Enterprise PostgreSQL schema needs migration; run api:pg migrate')
  return { version: row.version }
}
