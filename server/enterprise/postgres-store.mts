import { AsyncLocalStorage } from 'node:async_hooks'
import pg from 'pg'

export type SqlValue = string | number | boolean | null
export interface QueryClient {
  query(sql: string, values?: SqlValue[]): Promise<{ rows: Record<string, unknown>[]; rowCount?: number | null }>
  release?(): void
}
export interface QueryPool extends QueryClient {
  connect(): Promise<QueryClient>
  end(): Promise<void>
}

/** SQLite-style placeholders remain internal, with values always bound by pg. */
export function postgresSql(sql: string): string {
  let index = 0
  let quoted = false
  let result = ''
  for (let position = 0; position < sql.length; position += 1) {
    const char = sql[position]
    if (char === "'") {
      result += char
      if (quoted && sql[position + 1] === "'") result += sql[++position]
      else quoted = !quoted
    } else if (char === '?' && !quoted) result += `$${++index}`
    else result += char
  }
  return result
}

const numericFields = new Set(['count', 'total'])
function normalizeRows<T>(rows: Record<string, unknown>[]): T[] {
  return rows.map((row) => {
    for (const key of numericFields) {
      if (typeof row[key] === 'string' && /^\d+$/.test(row[key])) row[key] = Number(row[key])
    }
    return row as T
  })
}

/** A transaction retains one client across every awaited service query. */
export class PostgresEnterpriseStore {
  private readonly pool: QueryPool
  private readonly currentClient = new AsyncLocalStorage<QueryClient>()

  constructor(connectionString: string, pool?: QueryPool) {
    if (!pool && !/^postgres(?:ql)?:\/\//.test(connectionString))
      throw new Error('DATABASE_URL must be a PostgreSQL URL')
    const securedUrl = pool ? connectionString : new URL(connectionString)
    if (securedUrl instanceof URL) securedUrl.searchParams.set('sslmode', 'verify-full')
    this.pool =
      pool ??
      (new pg.Pool({
        connectionString: String(securedUrl),
        max: 2,
        connectionTimeoutMillis: 5_000,
        idleTimeoutMillis: 15_000,
      }) as unknown as QueryPool)
  }

  async query<T = Record<string, unknown>>(
    sql: string,
    ...values: SqlValue[]
  ): Promise<{ rows: T[]; rowCount: number }> {
    const client = this.currentClient.getStore() ?? this.pool
    const result = await client.query(postgresSql(sql), values)
    return { rows: normalizeRows<T>(result.rows), rowCount: result.rowCount ?? 0 }
  }

  async one<T>(sql: string, ...values: SqlValue[]): Promise<T | undefined> {
    return (await this.query<T>(sql, ...values)).rows[0]
  }

  async all<T>(sql: string, ...values: SqlValue[]): Promise<T[]> {
    return (await this.query<T>(sql, ...values)).rows
  }

  async run(sql: string, ...values: SqlValue[]): Promise<{ changes: number }> {
    const result = await this.query(sql, ...values)
    return { changes: result.rowCount }
  }

  async transaction<T>(work: () => Promise<T> | T): Promise<T> {
    if (this.currentClient.getStore()) return work()
    for (let attempt = 0; ; attempt += 1) {
      const client = await this.pool.connect()
      try {
        await client.query('BEGIN ISOLATION LEVEL SERIALIZABLE')
        const result = await this.currentClient.run(client, work)
        await client.query('COMMIT')
        return result
      } catch (error) {
        try {
          await client.query('ROLLBACK')
        } catch {
          // Preserve the business or database error that caused the rollback.
        }
        if (
          attempt < 2 &&
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error.code === '40001' || error.code === '40P01')
        )
          continue
        throw error
      } finally {
        client.release?.()
      }
    }
  }

  async close() {
    await this.pool.end()
  }
}
