export const clientEnvKeys = Object.freeze([
  'NODE_ENV',
  'PUBLIC_URL',
  'APP_BASE_URL',
  'DEPLOYED_ENV',
  'IFRAME_ORIGIN',
  'REACT_APP_GITHUB_CLIENT_ID',
  'REACT_APP_GITHUB_REDIRECT_URI',
  'REACT_APP_USE_MOCK',
  'REACT_APP_ENCRYPTION_MODE',
  'REACT_APP_RSA_PUBLIC_KEY',
  'PROJECTB_STANDALONE_ORIGIN',
  'SENTRY_DSN',
  'SENTRY_SEND_DEFAULT_PII',
  'SENTRY_ENABLE_REPLAY',
  'SENTRY_TRACES_SAMPLE_RATE',
])

const forbiddenClientKey =
  /(?:^AUTH_|PASSWORD|SECRET|PRIVATE(?:_KEY)?|AES_KEY|ACCESS_TOKEN|AUTH_TOKEN|(?:^|_)TOKEN$|(?:^|_)API_KEY$)/i

export function assertClientEnvKeys(keys = clientEnvKeys) {
  const forbidden = keys.filter((key) => forbiddenClientKey.test(key))
  if (forbidden.length > 0) {
    throw new Error('[webpack] Sensitive values cannot be exposed to the browser: ' + forbidden.join(', '))
  }
}

assertClientEnvKeys()
