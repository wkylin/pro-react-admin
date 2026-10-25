import fs from 'node:fs'
import { createBuildPlan, loadProjectRegistry, resolveProject } from '../config/project-registry.mjs'
import { localCli, runNodeCli } from './local-cli.mjs'

const [action, ...params] = process.argv.slice(2)
const projectName = params.find((arg) => !arg.startsWith('--')) || process.env.PROJECT || 'default'
const options = params.filter((arg) => arg !== projectName)
const bundlerOption = options.find((arg) => arg.startsWith('--bundler='))
const inherited = { ...process.env, ...(bundlerOption ? { BUILD_TOOL: bundlerOption.slice('--bundler='.length) } : {}) }
const registry = loadProjectRegistry()
if (action === 'list' || action === 'doctor') {
  for (const name of Object.keys(registry.projects)) {
    const selected = resolveProject(name, registry)
    if (action === 'doctor') {
      for (const file of [selected.entry, selected.routers, ...(selected.mfeExpose ? [selected.mfeExpose] : [])]) {
        if (!fs.existsSync(file)) throw new Error(`Missing project source: ${file}`)
      }
    }
    console.log(
      `${name}: ${selected.project.sourceRoot} -> ${selected.project.output}${selected.remote ? ' (remote)' : selected.project.mfeHost ? ' (host)' : ''}`
    )
  }
  if (action === 'doctor') {
    console.log(
      `Node ${process.version}; Webpack: ${localCli('webpack-cli', 'webpack-cli')}; Vite: ${localCli('vite')}`
    )
  }
} else if (['dev', 'build', 'mfe-dev', 'mfe-build', 'mfe-build-standalone'].includes(action)) {
  if (options.some((arg) => !['--dry-run', '--stats'].includes(arg) && !arg.startsWith('--bundler=')))
    throw new Error(
      'Only --dry-run/--stats/--bundler=vite|webpack are supported; set PORT/PUBLIC_URL in the environment'
    )
  const plan = createBuildPlan(action, projectName, inherited, registry)
  if (options.includes('--stats')) {
    if (action.endsWith('dev')) throw new Error('--stats requires a build action')
    Object.assign(plan.env, { USE_ANALYZE: '1', SENTRY_SOURCE_MAP: 'no' })
    if (plan.bundler === 'vite') plan.env.VITE_BUILD_STATS = `artifacts/build/vite/${plan.selected.name}/stats.json`
    else {
      plan.env.STATS_ONLY = '1'
      plan.args.push(`--json=artifacts/build/webpack/${plan.selected.name}/stats.json`)
    }
  }
  if (options.includes('--dry-run')) {
    const keys = [
      'PROJECT',
      'BUILD_TOOL',
      'NODE_ENV',
      'BUILD_GOAL',
      'VITE_BUILD_STATS',
      'MFE_ROLE',
      'PORT',
      'PUBLIC_URL',
      'REACT_APP_USE_MOCK',
      'SENTRY_SOURCE_MAP',
      ...registry.remotes.map(({ envKey }) => envKey),
    ]
    console.log(
      JSON.stringify(
        {
          project: plan.selected.name,
          output: plan.output,
          args: plan.args,
          env: Object.fromEntries(keys.filter((key) => plan.env[key] !== undefined).map((key) => [key, plan.env[key]])),
        },
        null,
        2
      )
    )
  } else
    runNodeCli(plan.bundler === 'vite' ? localCli('vite') : localCli('webpack-cli', 'webpack-cli'), plan.args, plan.env)
} else
  throw new Error(
    'Usage: project-command.mjs <list|doctor|dev|build|mfe-dev|mfe-build|mfe-build-standalone> [project] [--bundler=vite|webpack] [--dry-run] [--stats]'
  )
