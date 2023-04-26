import * as Sentry from '@sentry/react'
import packageJson from '../../../package.json'

const sentryInit = () => {
  // const nodeEnv = process.env.NODE_ENV
  // if (nodeEnv !== 'production') return
  Sentry.init({
    dsn: 'https://39892504629549fa9c0b040d98e87d03@o64827.ingest.sentry.io/5791911',
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 1.0,
    release: packageJson.version,
    // environment: nodeEnv,
    // autoSessionTracking: nodeEnv === 'production',
  })

  Sentry.setExtra('projectOwner', '150****5870')
}

export default sentryInit
