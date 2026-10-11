export const MFE_MANIFEST_SCHEMA_VERSION = 1

export const MFE_SHARED_DEPENDENCIES = Object.freeze([
  'react',
  'react-dom',
  'react-router-dom',
  'antd',
  'dayjs',
  'zustand',
  'immer',
])

export function parseMfeMajorVersions(versionRange) {
  if (typeof versionRange !== 'string') return []

  const majors = versionRange.split('||').map((range) => {
    const match = /^(?:\^|~|=)?v?(\d+)\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.exec(range.trim())
    return match ? Number(match[1]) : undefined
  })

  if (majors.some((major) => major === undefined)) return []
  return [...new Set(majors)]
}

export function getMfeSharedDependencies(dependencies) {
  return Object.fromEntries(
    MFE_SHARED_DEPENDENCIES.map((name) => {
      const versionRange = dependencies?.[name]
      if (!parseMfeMajorVersions(versionRange).length) {
        throw new Error(`[mfe] ${name} must use a supported semver range in the root package.json`)
      }
      return [name, versionRange]
    })
  )
}

export function areMfeSharedDependenciesCompatible(remoteDependencies, hostDependencies) {
  if (!remoteDependencies || typeof remoteDependencies !== 'object' || Array.isArray(remoteDependencies)) return false
  if (!hostDependencies || typeof hostDependencies !== 'object' || Array.isArray(hostDependencies)) return false

  const legacyDependencyNames = ['react', 'react-dom']
  const remoteNames = Object.keys(remoteDependencies).sort()
  const hostNames = Object.keys(hostDependencies).sort()
  const hasCompleteManifest =
    remoteNames.length === hostNames.length && remoteNames.every((name, index) => name === hostNames[index])
  const hasLegacyManifest =
    remoteNames.length === legacyDependencyNames.length &&
    legacyDependencyNames.every((name) => remoteNames.includes(name)) &&
    legacyDependencyNames.every((name) => hostNames.includes(name))

  if (!hasCompleteManifest && !hasLegacyManifest) {
    return false
  }

  const dependencyNames = hasCompleteManifest ? hostNames : legacyDependencyNames
  const parseMajors = (versionRange) => {
    if (typeof versionRange !== 'string') return []
    const majors = versionRange.split('||').map((range) => {
      const match = /^(?:\^|~|=)?v?(\d+)\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.exec(range.trim())
      return match ? Number(match[1]) : undefined
    })
    if (majors.some((major) => major === undefined)) return []
    return [...new Set(majors)]
  }

  return dependencyNames.every((name) => {
    const remoteMajors = parseMajors(remoteDependencies[name])
    const hostMajors = parseMajors(hostDependencies[name])
    return remoteMajors.length > 0 && hostMajors.some((major) => remoteMajors.includes(major))
  })
}

export function hasCompleteMfeSharedDependencies(remoteDependencies, hostDependencies) {
  if (!remoteDependencies || typeof remoteDependencies !== 'object' || Array.isArray(remoteDependencies)) return false
  if (!hostDependencies || typeof hostDependencies !== 'object' || Array.isArray(hostDependencies)) return false

  const remoteNames = Object.keys(remoteDependencies).sort()
  const hostNames = Object.keys(hostDependencies).sort()
  return (
    remoteNames.length === hostNames.length &&
    remoteNames.every((name, index) => name === hostNames[index]) &&
    areMfeSharedDependenciesCompatible(remoteDependencies, hostDependencies)
  )
}
