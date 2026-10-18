-- Frozen v1 schema from the single-tenant EnterpriseStore before versioned migrations.
-- Keep this fixture independent from migrations.mts so upgrades exercise the old layout.
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
