const { createHandler } = require('../server/github-oauth.cjs')

const handle = createHandler({
  clientId: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  callbackUrl: process.env.GITHUB_DEMO_CALLBACK_URL || '',
  appUrl: process.env.GITHUB_DEMO_APP_URL || '',
  sessionSecret: process.env.GITHUB_SESSION_SECRET || '',
})

module.exports = (request, response) => {
  const url = new URL(request.url || '/', 'http://localhost')
  const originalAction = url.pathname.match(/^\/api\/demo\/github\/(config|start|callback|session)$/)?.[1]
  const action = request.query?.oauth_action || url.searchParams.get('oauth_action') || originalAction
  return handle(request, response, action)
}
