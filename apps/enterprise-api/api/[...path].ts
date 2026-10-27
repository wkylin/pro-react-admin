import express from 'express'
import type { IncomingMessage, ServerResponse } from 'node:http'
import helmet from 'helmet'
import cors from 'cors'
import { createEnterpriseRouter } from '../../../api/enterprise/router.cjs'
import { openPostgresEnterpriseService } from '../../../api/enterprise/postgres-runtime.mts'

function createApp(
  service: Awaited<ReturnType<typeof openPostgresEnterpriseService>>,
  env: NodeJS.ProcessEnv = process.env
): ReturnType<typeof express> {
  const origins = new Set((env.CORS_ORIGINS || '').split(',').map((item) => item.trim()).filter(Boolean))
  if (!origins.size) throw new Error('CORS_ORIGINS must list at least one trusted frontend origin')
  const app = express()
  app.set('trust proxy', 1)
  app.disable('x-powered-by')
  app.use(helmet())
  app.use(cors({
    credentials: true,
    origin(origin, callback) {
      callback(null, !origin || origins.has(origin))
    },
    maxAge: 600,
  }))
  app.use(express.json({ limit: '1mb' }))
  app.get('/api/health', (_req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ status: 'ok', database: 'postgresql' }))
  })
  app.use('/api', createEnterpriseRouter(service, {
    loginLimiter: (clientKey: string, limit: number) => service.chargeLoginLimit(clientKey, limit),
  }))
  return app
}

let appPromise: Promise<ReturnType<typeof express>> | undefined
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    appPromise ??= openPostgresEnterpriseService().then((service) => createApp(service))
    const app = await appPromise
    return (app as unknown as (request: IncomingMessage, response: ServerResponse) => void)(req, res)
  } catch (error) {
    appPromise = undefined
    console.error('Enterprise API startup failed:', error)
    res.statusCode = 503
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    return res.end(JSON.stringify({ error: 'enterprise_unavailable' }))
  }
}
