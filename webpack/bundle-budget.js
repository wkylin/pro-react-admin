import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const configPath = path.join(root, 'config/bundle-budget.json')

const budgets = JSON.parse(fs.readFileSync(configPath, 'utf8'))
export const bundleBudget = { ...budgets, ...budgets.projects?.[process.env.PROJECT || 'default'] }
