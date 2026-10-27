import {
  resolveEnterpriseDatabasePath,
  verifyEnterpriseMigrationStatus,
  migrateEnterpriseDatabase,
  createEnterpriseBackup,
  verifyEnterpriseDatabase,
  restoreEnterpriseBackup,
  drillEnterpriseRecovery,
} from './database-ops.mts'

const cliArgs = process.argv.slice(2)
const [command, ...args] = cliArgs[0] === '--' ? cliArgs.slice(1) : cliArgs
const usage = `Usage:
  node api/enterprise/db-admin.mjs status [--db <database>]
  node api/enterprise/db-admin.mjs migrate [--db <database>]
  node api/enterprise/db-admin.mjs backup [<output.sqlite>] [--db <database>]
  node api/enterprise/db-admin.mjs verify-db <database.sqlite>
  node api/enterprise/db-admin.mjs verify-backup <backup.sqlite>
  node api/enterprise/db-admin.mjs drill <backup.sqlite> --rpo-minutes <minutes> --rto-minutes <minutes> [--db <volume-database-path>]
  node api/enterprise/db-admin.mjs restore <verified-backup.sqlite> [--db <database>] [--keep-schema]`

function parseArgs(values) {
  const positional = []
  let databaseOverride
  let keepSchema = false
  let rpoMinutes
  let rtoMinutes
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index]
    if (value === '--keep-schema') {
      if (keepSchema) throw new Error('Provide --keep-schema once')
      keepSchema = true
    } else if (value === '--db') {
      if (!values[index + 1] || databaseOverride) throw new Error('Provide --db once with a database path')
      databaseOverride = values[index + 1]
      index += 1
    } else if (value === '--rpo-minutes' || value === '--rto-minutes') {
      const target = Number(values[index + 1])
      if (!Number.isInteger(target) || target < 1) throw new Error(`Provide ${value} with a positive integer`)
      if (value === '--rpo-minutes') {
        if (rpoMinutes !== undefined) throw new Error('Provide --rpo-minutes once')
        rpoMinutes = target
      } else {
        if (rtoMinutes !== undefined) throw new Error('Provide --rto-minutes once')
        rtoMinutes = target
      }
      index += 1
    } else if (value.startsWith('--')) {
      throw new Error(`Unknown option: ${value}`)
    } else positional.push(value)
  }
  return {
    positional,
    keepSchema,
    rpoMinutes,
    rtoMinutes,
    databasePath: resolveEnterpriseDatabasePath(databaseOverride || process.env.ENTERPRISE_DB_PATH),
  }
}

try {
  if (!['status', 'migrate', 'backup', 'verify-db', 'verify-backup', 'drill', 'restore'].includes(command)) {
    throw new Error(usage)
  }
  const { positional, keepSchema, rpoMinutes, rtoMinutes, databasePath } = parseArgs(args)
  let result

  if (keepSchema && command !== 'restore') throw new Error('--keep-schema can only be used with restore')

  if (command === 'status') {
    if (positional.length) throw new Error(usage)
    result = await verifyEnterpriseMigrationStatus(databasePath)
  } else if (command === 'migrate') {
    if (positional.length) throw new Error(usage)
    result = await migrateEnterpriseDatabase(databasePath)
  } else if (command === 'backup') {
    if (positional.length > 1) throw new Error(usage)
    result = await createEnterpriseBackup(databasePath, positional[0])
  } else if (command === 'verify-db') {
    if (positional.length !== 1) throw new Error(usage)
    result = await verifyEnterpriseDatabase(positional[0])
  } else if (command === 'verify-backup') {
    if (positional.length !== 1) throw new Error(usage)
    result = await verifyEnterpriseDatabase(positional[0], { requireManifest: true })
  } else if (command === 'drill') {
    if (positional.length !== 1 || rpoMinutes === undefined || rtoMinutes === undefined)
      throw new Error('drill requires a backup, --rpo-minutes and --rto-minutes')
    result = await drillEnterpriseRecovery(positional[0], databasePath, { rpoMinutes, rtoMinutes })
  } else {
    if (positional.length !== 1) throw new Error(usage)
    result = await restoreEnterpriseBackup(positional[0], databasePath, { migrateToLatest: !keepSchema })
  }

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
  if (command === 'drill' && !result.passed) process.exitCode = 2
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
  process.exitCode = 1
}
