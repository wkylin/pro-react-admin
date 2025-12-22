import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const indexTs = path.join(projectRoot, 'src', 'components', 'index.ts')

const DEFAULT_EXTS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']

function fileExists (filePath) {
  try {
    return fs.statSync(filePath).isFile()
  } catch {
    return false
  }
}

function dirExists (dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory()
  } catch {
    return false
  }
}

function readText (filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function stripCommentsLoosely (code) {
  // Good-enough for our purpose (barrel files). We:
  // 1) remove block comments
  // 2) drop lines that start with // after trimming
  // This intentionally does NOT try to be a full JS/TS lexer.
  const withoutBlock = code.replace(/\/\*[\s\S]*?\*\//g, '')
  return withoutBlock
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith('//'))
    .join('\n')
}

function extractExportSpecifiers (code) {
  const specifiers = []

  // Matches:
  // export * from './x'
  // export { A, B } from "./x"
  // export { default as Foo } from './x'
  const re = /export\s+(?:\*\s+from|\{[\s\S]*?\}\s+from)\s+['"]([^'"]+)['"];?/g

  let match
  while ((match = re.exec(code))) {
    specifiers.push(match[1])
  }

  return specifiers
}

function resolveCandidateTargets (fromPath) {
  const hasExt = path.extname(fromPath).length > 0
  if (hasExt) {
    return [fromPath]
  }

  const candidates = []
  for (const ext of DEFAULT_EXTS) {
    candidates.push(fromPath + ext)
  }

  candidates.push(fromPath) // directory check (or file without ext, rare)
  for (const ext of DEFAULT_EXTS) {
    candidates.push(path.join(fromPath, 'index' + ext))
  }

  return candidates
}

function findExistingTarget (absBasePath) {
  const candidates = resolveCandidateTargets(absBasePath)
  for (const candidate of candidates) {
    if (fileExists(candidate)) return candidate
    if (dirExists(candidate)) {
      // If it's a directory, ensure it has an index file
      for (const ext of DEFAULT_EXTS) {
        const idx = path.join(candidate, 'index' + ext)
        if (fileExists(idx)) return idx
      }
    }
  }
  return null
}

function main () {
  if (!fileExists(indexTs)) {
    console.error(`[components-index] Not found: ${indexTs}`)
    process.exit(2)
  }

  const raw = readText(indexTs)
  const code = stripCommentsLoosely(raw)
  const specifiers = extractExportSpecifiers(code)

  const indexDir = path.dirname(indexTs)
  const checked = []
  const errors = []

  for (const spec of specifiers) {
    // Only validate relative exports. (Non-relative are external packages.)
    if (!spec.startsWith('.') && !spec.startsWith('..')) continue

    const abs = path.resolve(indexDir, spec)
    const ok = findExistingTarget(abs)

    checked.push({ spec, abs, ok })

    if (!ok) {
      errors.push({ spec, abs })
    }
  }

  if (errors.length > 0) {
    console.error(`[components-index] Found ${errors.length} broken export path(s) in src/components/index.ts:`)
    for (const e of errors) {
      console.error(`  - ${e.spec}  (resolved: ${e.abs})`)
    }
    console.error('\nFix the path, or add an index.ts(x) entry file in the target folder.')
    process.exit(1)
  }

  console.log(`[components-index] OK. Checked ${checked.length} relative export path(s).`)
}

main()
