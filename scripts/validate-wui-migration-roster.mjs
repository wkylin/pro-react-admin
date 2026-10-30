import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const rosterPath = path.join(root, 'config/wui-migration-roster.json')
const auditPath = path.join(root, 'docs/components/WUI_MIGRATION_AUDIT.md')
const groups = ['animation', 'data-display', 'editor', 'forms', 'layout', 'media', 'visualization']
const decisions = ['migrate', 'adapt then migrate', 'keep in app']
const digest = (value) => createHash('sha256').update(value).digest('hex')
const inventoryDigest = (entries) => digest(entries.map((entry) => entry.source).sort().join('\n'))
const cell = (value) => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ')
const list = (items) => items.length ? items.map((item) => `\`${item}\``).join(', ') : '—'

export function renderAudit(roster) {
  const counts = Object.fromEntries(decisions.map((decision) => [decision, roster.entries.filter((entry) => entry.decision === decision).length]))
  const rows = roster.entries.map((entry) => {
    const dependencies = Object.entries(entry.dependencies)
      .filter(([, values]) => values.length)
      .map(([kind, values]) => `${kind}: ${list(values)}`).join('; ') || '无外部 import'
    return `| ${[
      entry.name === 'FixMusicPlayer'
        ? `\`${entry.name}\` (${entry.kind}，已合并至 MusicPlayer)`
        : `[${entry.name}](../../${entry.source}) (${entry.kind})`,
      dependencies,
      entry.classification,
      entry.requiredAdaptation.join(' '),
      entry.destination.group,
      `**${entry.decision}** — ${entry.reason}`,
    ].map(cell).join(' | ')} |`
  })
  return `# WUI React 6.1.0 组件迁移审核\n\n` +
    `本清单冻结于 ${roster.auditedAt}，源码基线为 \`${roster.baselineCommit}\`。依据[批准的迁移设计](../superpowers/specs/2026-10-28-wui-react-component-migration-design.md)，审核全部 **143** 个直接目录：139 个 stateless、4 个 stateful。\n\n` +
    `结论：**${counts.migrate} migrate**、**${counts['adapt then migrate']} adapt then migrate**、**${counts['keep in app']} keep in app**。前两类合计 **${counts.migrate + counts['adapt then migrate']}** 个目录均属于同一次 6.1.0 发布范围；“改造后迁入”不是延期或已通过发布质量检查的声明。\n\n` +
    `## 证据与检查\n\n` +
    `机器清单是 [config/wui-migration-roster.json](../../config/wui-migration-roster.json)。每个条目记录直接目录、当前依赖、逐文件 SHA-256、import 的文件及行号、具体接口改造、目标分组和判定理由。依赖从 TypeScript AST 提取，包括嵌套实现的静态 import、re-export、动态 import 和 require；忽略注释、故事、测试与手写声明中的 import。type-only import 在证据中单独标记；表中 packages 是当前引用的包，并非最终 runtime/peer 声明。\n\n` +
    `只把直接目录计为条目。OrgChart/org-chart、MdxEditor/components、FixMusicPlayer/hooks、InteractiveBook 引擎等随父目录移动，不另增组件计数。证据文件包含运行实现、样式和本地资源；测试、故事与声明不参与源码快照。当前 app/shared/hooks/theme 等传递依赖必须在迁移时替换或抽离，不能因本表只列直接 import 而保留应用耦合。\n\n` +
    `运行 \`node scripts/validate-wui-migration-roster.mjs\` 检查冻结名单、字段与审核表一致性；迁移前加 \`--check-source\` 会逐项比对实际目录、源码摘要及 import 位置。迁移后不再把旧路径是否存在当作完成标准，后续发布检查应按 destination 和 decision 验证所有迁入项。修改机器清单后用 \`--write-doc\` 同步此表。\n\n` +
    `## 所有迁入项的共同要求\n\n` +
    roster.commonRequirements.map((requirement) => `- ${requirement}`).join('\n') + '\n\n' +
    `目标分组是命名导出的 \`@w.ui/wui-react/<group>\`；目标源码目录写在机器清单中。现有 12 个独立子路径保持兼容。依赖重的分组必须采用可选 peer/分组入口，不允许轻量根入口导入这些分组；最终依赖版本在 library-contract、manifest 和文档中一致声明。移除的示例数据仍可留在应用/Storybook。\n\n` +
    `## 逐目录判定\n\n` +
    `“generic”表示可复用实现；“generic with demo/app coupling”表示存在具体可抽离的复用行为；“project-specific”表示保留的产品策略、业务快照或纯用法示例。所有迁入项同时适用上面的共同要求，以下列出各自额外、可检查的改造。\n\n` +
    `| 目录 | 当前依赖 | 属性 | 所需改造 | 目标分组 | 最终判定及理由 |\n` +
    `| --- | --- | --- | --- | --- | --- |\n` + rows.join('\n') + '\n'
}

export function validateRoster(roster) {
  const issues = []
  const fail = (condition, message) => { if (!condition) issues.push(message) }
  fail(roster.schemaVersion === 1 && roster.targetVersion === '6.1.0', 'invalid schema/target version')
  fail(/^[a-f\d]{40}$/.test(roster.baselineCommit ?? ''), 'baselineCommit must be a full commit ID')
  fail(/^\d{4}-\d{2}-\d{2}$/.test(roster.auditedAt ?? ''), 'auditedAt must be an ISO date')
  fail(Array.isArray(roster.commonRequirements) && roster.commonRequirements.length >= 4, 'common requirements missing')
  if (!Array.isArray(roster.entries)) return [...issues, 'entries must be an array']
  fail(roster.entries.length === 143, 'expected exactly 143 entries')
  fail(new Set(roster.entries.map((entry) => entry.name)).size === 143, 'expected exactly 143 unique directory names')
  fail(new Set(roster.entries.map((entry) => entry.source)).size === 143, 'source paths must be unique')
  fail(inventoryDigest(roster.entries) === roster.inventorySha256, 'frozen directory inventory digest differs')
  for (const [kind, count] of [['stateless', 139], ['stateful', 4]]) {
    fail(roster.entries.filter((entry) => entry.kind === kind).length === count, `expected ${count} ${kind} entries`)
  }
  for (const entry of roster.entries) {
    const label = entry.name || '<unnamed>'
    fail(typeof entry.name === 'string' && /^[\w-]+$/.test(entry.name), `${label}: invalid directory name`)
    fail(entry.source === `src/components/${entry.kind}/${entry.name}`, `${label}: must describe a direct source directory`)
    fail(decisions.includes(entry.decision), `${label}: invalid decision`)
    fail(['generic', 'generic with demo/app coupling', 'project-specific'].includes(entry.classification), `${label}: invalid classification`)
    fail(typeof entry.reason === 'string' && entry.reason.trim().length > 20, `${label}: concrete reason required`)
    fail(Array.isArray(entry.requiredAdaptation) && entry.requiredAdaptation.length > 0 && entry.requiredAdaptation.every((item) => typeof item === 'string' && item.trim().length > 15), `${label}: adaptation required`)
    const kept = entry.decision === 'keep in app'
    fail(kept ? entry.classification === 'project-specific' && entry.destination?.group === 'app' && entry.destination?.source === entry.source && entry.destination?.entrypoint === null : groups.includes(entry.destination?.group) && entry.destination?.source === `packages/wui-react/src/${entry.destination.group}/${entry.name}` && entry.destination?.entrypoint === `@w.ui/wui-react/${entry.destination.group}`, `${label}: invalid destination`)
    for (const kind of ['packages', 'application', 'legacyComponents', 'existingLibrary']) {
      const values = entry.dependencies?.[kind]
      fail(Array.isArray(values) && values.every((value) => typeof value === 'string' && value.length > 0) && new Set(values).size === values.length, `${label}: invalid ${kind} dependencies`)
    }
    fail(Array.isArray(entry.evidence?.files) && entry.evidence.files.length > 0, `${label}: source evidence required`)
    for (const file of entry.evidence?.files ?? []) {
      fail(typeof file.path === 'string' && file.path.startsWith(entry.source + '/') && !file.path.split('/').includes('..') && /^[a-f\d]{64}$/.test(file.sha256), `${label}: invalid file evidence`)
    }
    fail(Array.isArray(entry.evidence?.imports), `${label}: import evidence required`)
    for (const item of entry.evidence?.imports ?? []) {
      fail(entry.evidence.files.some((file) => file.path === item.file) && Number.isInteger(item.line) && item.line > 0 && ['runtime', 'type'].includes(item.kind) && typeof item.specifier === 'string' && item.specifier.length > 0, `${label}: invalid import evidence`)
    }
  }
  return issues
}

function checkSource(roster) {
  const issues = []
  const actual = ['stateless', 'stateful'].flatMap((kind) => fs.readdirSync(path.join(root, 'src/components', kind), { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => `src/components/${kind}/${entry.name}`)).sort()
  const expected = roster.entries.map((entry) => entry.source).sort()
  if (JSON.stringify(actual) !== JSON.stringify(expected)) issues.push('actual direct source directories differ from frozen roster')
  for (const entry of roster.entries) {
    const actualFiles = []
    const visit = (directory) => {
      if (!fs.existsSync(path.join(root, directory))) return
      for (const item of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
        const file = `${directory}/${item.name}`
        if (item.isDirectory()) visit(file)
        else if (!/\.(?:stories|test|spec)\.[^.]+$|\.d\.ts$|\.(?:md|mdx)$/.test(item.name)) actualFiles.push(file)
      }
    }
    visit(entry.source)
    if (JSON.stringify(actualFiles.sort()) !== JSON.stringify(entry.evidence.files.map((file) => file.path).sort())) issues.push(`${entry.name}: source file inventory differs`)
    for (const file of entry.evidence.files) {
      const absolute = path.join(root, file.path)
      if (!fs.existsSync(absolute) || digest(fs.readFileSync(absolute)) !== file.sha256) issues.push(`${file.path}: source snapshot differs`)
    }
    for (const item of entry.evidence.imports) {
      const absolute = path.join(root, item.file)
      if (!fs.existsSync(absolute) || !fs.readFileSync(absolute, 'utf8').split('\n')[item.line - 1]?.includes(item.specifier)) issues.push(`${item.file}:${item.line}: import evidence differs`)
    }
  }
  return issues
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const roster = JSON.parse(fs.readFileSync(rosterPath, 'utf8'))
    const issues = validateRoster(roster)
    if (!issues.length && process.argv.includes('--check-source')) issues.push(...checkSource(roster))
    if (!issues.length) {
      const expected = renderAudit(roster)
      if (process.argv.includes('--write-doc')) fs.writeFileSync(auditPath, expected)
      else if (!fs.existsSync(auditPath) || fs.readFileSync(auditPath, 'utf8') !== expected) issues.push('audit table differs; run node scripts/validate-wui-migration-roster.mjs --write-doc')
    }
    if (issues.length) {
      console.error('[wui-migration]\n' + issues.join('\n'))
      process.exitCode = 1
    } else {
      console.log(`[wui-migration] 143 unique directories, decisions, reasons and audit rows verified${process.argv.includes('--check-source') ? '; source snapshots verified' : ''}.`)
    }
  } catch (error) {
    console.error(`[wui-migration] ${error.message}`)
    process.exitCode = 1
  }
}
