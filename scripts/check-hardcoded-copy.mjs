import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve, sep } from 'node:path'
import process from 'node:process'
import ts from 'typescript'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = resolve(root, 'src')
const baselineFile = resolve(root, 'scripts/hardcoded-copy-baseline.json')
const extensions = new Set(['.js', '.jsx', '.ts', '.tsx'])
const excluded = /(?:^|\/)(?:i18n\/locales|.*\.(?:test|spec|stories)\.[jt]sx?$|.*\.d\.ts)$/
const userFacingAttributes = new Set([
  'alt',
  'aria-description',
  'aria-label',
  'confirmText',
  'description',
  'emptyText',
  'help',
  'label',
  'okText',
  'cancelText',
  'placeholder',
  'searchPlaceholder',
  'submitText',
  'title',
  'tooltip',
])
const translationFunctions = new Set(['t', 'formatMessage', 'i18n.t', 'intl.formatMessage'])

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) return walk(path)
    return extensions.has(path.slice(path.lastIndexOf('.'))) ? [path] : []
  })
}

function humanText(value) {
  const normalized = value.replace(/\s+/g, ' ').trim()
  return normalized.length > 0 && /[A-Za-z\u3400-\u9fff]/u.test(normalized)
}

function staticString(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  return undefined
}

function calleeName(expression) {
  if (ts.isIdentifier(expression)) return expression.text
  if (ts.isPropertyAccessExpression(expression)) {
    const parent = calleeName(expression.expression)
    return parent ? `${parent}.${expression.name.text}` : expression.name.text
  }
  return ''
}

function collect(sourceFile) {
  let hardcoded = 0
  let localized = 0
  const addStatic = (value) => {
    if (value !== undefined && humanText(value)) hardcoded += 1
  }

  const visitExpression = (node) => {
    if (ts.isCallExpression(node) && translationFunctions.has(calleeName(node.expression))) {
      localized += 1
      return
    }
    if (ts.isJsxElement(node) && node.openingElement.tagName.getText() === 'Trans') {
      localized += 1
      return
    }
    if (
      ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isTypeAssertionExpression(node) ||
      ts.isNonNullExpression(node)
    ) {
      visitExpression(node.expression)
      return
    }
    if (ts.isJsxElement(node)) {
      visitJsx(node)
      return
    }
    if (ts.isJsxFragment(node)) {
      for (const child of node.children) visitJsx(child)
      return
    }
    const value = staticString(node)
    if (value !== undefined) {
      addStatic(value)
      return
    }
    if (ts.isConditionalExpression(node)) {
      visitExpression(node.whenTrue)
      visitExpression(node.whenFalse)
      return
    }
    if (
      ts.isBinaryExpression(node) &&
      (node.operatorToken.kind === ts.SyntaxKind.BarBarToken ||
        node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken)
    ) {
      visitExpression(node.left)
      visitExpression(node.right)
      return
    }
    if (ts.isArrayLiteralExpression(node)) {
      for (const element of node.elements) visitExpression(element)
      return
    }
    if (ts.isJsxElement(node)) {
      for (const child of node.children) visitJsx(child)
    }
  }

  const visitAttributes = (attributes) => {
    for (const attribute of attributes.properties) {
      if (!ts.isJsxAttribute(attribute) || !userFacingAttributes.has(attribute.name.getText())) continue
      if (!attribute.initializer) continue
      if (ts.isStringLiteral(attribute.initializer) || ts.isNoSubstitutionTemplateLiteral(attribute.initializer)) {
        addStatic(attribute.initializer.text)
      } else if (ts.isJsxExpression(attribute.initializer) && attribute.initializer.expression) {
        visitExpression(attribute.initializer.expression)
      }
    }
  }

  const visitJsx = (node) => {
    if (ts.isJsxText(node)) {
      addStatic(node.text)
      return
    }
    if (ts.isJsxFragment(node)) {
      for (const child of node.children) visitJsx(child)
      return
    }
    if (ts.isJsxExpression(node)) {
      if (node.expression) visitExpression(node.expression)
      return
    }
    if (ts.isJsxElement(node)) {
      if (node.openingElement.tagName.getText() === 'Trans') {
        localized += 1
        return
      }
      visitAttributes(node.openingElement.attributes)
      for (const child of node.children) visitJsx(child)
      return
    }
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) visitAttributes(node.attributes)
  }

  const visit = (node) => {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      visitJsx(node)
      return
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return { hardcoded, localized }
}

export function scanUiCopy(directory = sourceRoot) {
  const files = walk(directory)
  const byFile = {}
  let hardcoded = 0
  let localized = 0
  for (const file of files) {
    const relativePath = relative(root, file).split(sep).join('/')
    if (excluded.test(relativePath)) continue
    const sourceFile = ts.createSourceFile(relativePath, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
    const result = collect(sourceFile)
    if (!result.hardcoded && !result.localized) continue
    byFile[relativePath] = result
    hardcoded += result.hardcoded
    localized += result.localized
  }
  const total = hardcoded + localized
  return {
    byFile,
    hardcoded,
    localized,
    total,
    coveragePercent: total ? Math.round((localized / total) * 10_000) / 100 : 100,
  }
}

function main() {
  const report = scanUiCopy()
  if (process.argv.includes('--write-baseline')) {
    const previous = existsSync(baselineFile) ? JSON.parse(readFileSync(baselineFile, 'utf8')) : undefined
    const history = previous?.history ?? []
    if (previous?.version === 1) {
      history.push({
        scannerVersion: 1,
        hardcodedCount: previous.hardcodedCount,
        localizedCount: previous.localizedCount,
        coveragePercent: previous.coveragePercent,
        generatedAt: previous.generatedAt,
        note: 'Initial inventory before conditional JSX expression traversal; not directly comparable to scanner v2.',
      })
    }
    const baseline = {
      version: 2,
      history,
      generatedAt: new Date().toISOString(),
      hardcodedCount: report.hardcoded,
      localizedCount: report.localized,
      coveragePercent: report.coveragePercent,
      hardcodedByFile: Object.fromEntries(
        Object.entries(report.byFile)
          .filter(([, value]) => value.hardcoded > 0)
          .map(([file, value]) => [file, value.hardcoded])
      ),
    }
    writeFileSync(baselineFile, `${JSON.stringify(baseline, null, 2)}\n`)
    process.stdout.write(
      `[copy] baseline saved: ${report.hardcoded} hardcoded / ${report.total} recognized UI strings; ${report.coveragePercent}% localized.\n`
    )
    return
  }

  if (!existsSync(baselineFile))
    throw new Error('Missing hardcoded-copy baseline; review and run with --write-baseline')
  const baseline = JSON.parse(readFileSync(baselineFile, 'utf8'))
  if (baseline.version !== 2 || !baseline.hardcodedByFile || typeof baseline.hardcodedByFile !== 'object') {
    throw new Error('Unsupported hardcoded-copy baseline format')
  }
  const regressions = Object.entries(report.byFile)
    .filter(([file, value]) => value.hardcoded > (baseline.hardcodedByFile[file] ?? 0))
    .map(([file, value]) => `${file}: ${value.hardcoded} hardcoded (baseline ${baseline.hardcodedByFile[file] ?? 0})`)
  if (regressions.length) throw new Error(`Hardcoded UI copy increased:\n${regressions.join('\n')}`)

  const topFiles = Object.entries(report.byFile)
    .filter(([, value]) => value.hardcoded > 0)
    .sort((left, right) => right[1].hardcoded - left[1].hardcoded)
    .slice(0, 5)
    .map(([file, value]) => `${file} (${value.hardcoded})`)
  process.stdout.write(
    `[copy] ${report.hardcoded} hardcoded / ${report.total} recognized UI strings; ${report.coveragePercent}% localized. ` +
      `Baseline ${baseline.hardcodedCount}; no per-file budget increased.\n` +
      (topFiles.length ? `[copy] largest files: ${topFiles.join(', ')}\n` : '')
  )
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    main()
  } catch (error) {
    process.stderr.write(`[copy] ${error instanceof Error ? error.message : String(error)}\n`)
    process.exitCode = 1
  }
}
