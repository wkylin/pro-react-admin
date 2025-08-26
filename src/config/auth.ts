export const GITHUB_OAUTH_CONFIG = {
  clientId: process.env.REACT_APP_GITHUB_CLIENT_ID || '',
  clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET || '',
  redirectUri: process.env.REACT_APP_GITHUB_REDIRECT_URI || '',
  scope: 'user:email read:user',
  authUrl: 'https://github.com/login/oauth/authorize',
  tokenUrl: 'https://github.com/login/oauth/access_token',
  userUrl: 'https://api.github.com/user',
  emailUrl: 'https://api.github.com/user/emails',
}
