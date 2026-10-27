import express from 'express'
import type { IncomingMessage, ServerResponse } from 'node:http'
import helmet from 'helmet'
import cors from 'cors'
import { createEnterpriseRouter } from '../../../server/enterprise/router.cjs'
import { BusinessError } from '../../../server/enterprise/domain.mts'
import { openPostgresEnterpriseService } from '../../../server/enterprise/postgres-runtime.mts'

function createApp(
  service: Awaited<ReturnType<typeof openPostgresEnterpriseService>>,
  env: NodeJS.ProcessEnv = process.env
): ReturnType<typeof express> {
  const origins = new Set(
    (env.CORS_ORIGINS || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  )
  if (!origins.size) throw new Error('CORS_ORIGINS must list at least one trusted frontend origin')
  const app = express()
  app.set('trust proxy', 1)
  app.disable('x-powered-by')
  app.use(helmet())
  app.use(
    cors({
      credentials: true,
      exposedHeaders: ['X-Request-ID'],
      origin(origin, callback) {
        callback(null, !origin || origins.has(origin))
      },
      maxAge: 600,
    })
  )
  app.use(express.json({ limit: '1mb' }))
  app.get('/api/health', (_req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ status: 'ok', database: 'postgresql' }))
  })
  app.use(
    '/api',
    createEnterpriseRouter(service, {
      businessErrorClass: BusinessError,
      loginLimiter: (clientKey: string, limit: number) => service.chargeLoginLimit(clientKey, limit),
    })
  )
  return app
}

let appPromise: Promise<ReturnType<typeof express>> | undefined
function stripVercelRouteParameter(req: IncomingMessage) {
  // Vercel may populate req.query before Express sees the catch-all rewrite.
  const url = new URL(req.url ?? '/', 'http://internal')
  if (url.searchParams.has('...path')) {
    url.searchParams.delete('...path')
    req.url = `${url.pathname}${url.search}`
  }
  const query = (req as IncomingMessage & { query?: Record<string, unknown> }).query
  if (query) {
    // Keep client query keys and discard dynamic route captures already inserted by Vercel.
    for (const key of Object.keys(query)) {
      if (!url.searchParams.has(key)) delete query[key]
    }
  }
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    appPromise ??= openPostgresEnterpriseService().then((service) => createApp(service))
    const app = await appPromise
    stripVercelRouteParameter(req)
    return (app as unknown as (request: IncomingMessage, response: ServerResponse) => void)(req, res)
  } catch (error) {
    appPromise = undefined
    console.error('Enterprise API startup failed:', error)
    res.statusCode = 503
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    return res.end(JSON.stringify({ error: 'enterprise_unavailable' }))
  }
}
