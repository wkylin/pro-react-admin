import fs from 'node:fs'
import path from 'node:path'
import { log } from 'node:console'
import { workspaceRoot } from '../config/project-registry.mjs'

const source = path.join(workspaceRoot, 'storybook-static')
const html = fs.readFileSync(path.join(source, 'index.html'), 'utf8')
const base = html.match(/<base\s+href="([^"]+)"/i)?.[1]
if (base && base !== '/')
  throw new Error('Rebuild Storybook without STORYBOOK_BASE_HREF before deploying it at the Vercel domain root')
const output = path.join(workspaceRoot, 'artifacts/vercel-storybook/.vercel/output')
fs.rmSync(output, { recursive: true, force: true })
fs.mkdirSync(output, { recursive: true })
fs.cpSync(source, path.join(output, 'static'), { recursive: true })
fs.writeFileSync(
  path.join(output, 'config.json'),
  JSON.stringify(
    {
      version: 3,
      routes: [
        { src: '/index\\.json', headers: { 'Cache-Control': 'no-cache' }, continue: true },
        { src: '/(?:index|iframe)\\.html', headers: { 'Cache-Control': 'no-cache' }, continue: true },
        { handle: 'filesystem' },
      ],
    },
    null,
    2
  )
)
log('[storybook] Prepared artifacts/vercel-storybook for an independent Vercel --prebuilt deployment')
