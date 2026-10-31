import { createServer } from 'node:http'
import {
  createPostgresEnterpriseEventsServer,
  postgresAuditListener,
} from '../../../server/enterprise/postgres-events.mts'
import { openPostgresEnterpriseService } from '../../../server/enterprise/postgres-runtime.mts'

const origins = new Set(
  (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
)
const directUrl = process.env.DATABASE_URL_UNPOOLED || process.env.ENTERPRISE_DATABASE_URL_UNPOOLED

// This file is a separate Vercel Function. The REST catch-all remains at /api/events/*.
export default origins.size && directUrl
  ? createPostgresEnterpriseEventsServer(await openPostgresEnterpriseService(), {
      origins,
      listen: postgresAuditListener(directUrl),
    })
  : createServer((_request, response) => {
      response.writeHead(503, { 'Cache-Control': 'no-store', 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ error: 'event_source_unavailable' }))
    })
