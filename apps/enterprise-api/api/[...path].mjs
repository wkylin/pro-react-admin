import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { createEnterpriseRouter } from '../../../api/enterprise/router.cjs'
import { openPostgresEnterpriseService } from '../../../api/enterprise/postgres-runtime.mts'

function createApp(service, env = process.env) {
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
  app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: 'postgresql' }))
  app.use('/api', createEnterpriseRouter(service, {
    loginLimiter: (clientKey, limit) => service.chargeLoginLimit(clientKey, limit),
  }))
  return app
}

let appPromise
export default async function handler(req, res) {
  try {
    appPromise ??= openPostgresEnterpriseService().then((service) => createApp(service))
    const app = await appPromise
    return app(req, res)
  } catch (error) {
    appPromise = undefined
    console.error('Enterprise API startup failed:', error)
    return res.status(503).json({ error: 'enterprise_unavailable' })
  }
}
