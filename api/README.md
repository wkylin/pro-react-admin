# pro-react-admin API helper

This `api/` folder contains a small Express helper used during local development. It exposes a few endpoints used by the frontend for GitHub OAuth in local/dev mode:

- `POST /api/github-token` - Exchange GitHub `code` for `access_token` (server-side). Requires `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` env vars.
- `GET /api/github-user` - Get GitHub user info. Use `Authorization: token <access_token>` or `?token=<access_token>`.
- `GET /api/github-email` - Get GitHub user emails. Use `Authorization: token <access_token>` or `?token=<access_token>`.

Running locally

1. Install dependencies (if not already):

```bash
cd api
npm install
```

2. Set environment variables (bash):

```bash
export GITHUB_CLIENT_ID=your_client_id
export GITHUB_CLIENT_SECRET=your_client_secret
export PORT=5200   # optional
```

3. Start the helper server:

```bash
npm start
# or for auto-reload during development:
npm run dev
```

Notes

- In development the frontend `webpack` config already proxies `/api/github-token`, `/api/github-user`, `/api/github-email` to GitHub. This helper lets you run a local server that performs the token exchange securely and returns JSON.
- Do NOT put `GITHUB_CLIENT_SECRET` into frontend env vars (e.g. `REACT_APP_*`). Keep it server-side only.
