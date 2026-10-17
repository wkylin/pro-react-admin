import {
  createContext,
  createElement,
  useContext,
  type ComponentType,
  type PropsWithChildren,
  type ReactNode,
  type CSSProperties,
} from 'react'
import { routePolicies } from '@platform/auth/model/policy'
import { annotateRoutesWithPermissions, normalizeRouteTree, type RouteNode } from '@platform/navigation/routes'
import type { DataRecord, ResourceDefinitions } from '@platform/data/provider'
import { usePermission } from '@platform/auth/hooks/usePermission'
import { canAccessPath } from '@platform/auth/model/policy'
import { satisfiesVersionRange } from './version-range'

/** Compiled, trusted features. Authentication and the application shell remain application-owned. */
interface ApplicationModuleBase {
  id: string
  dependencies?: readonly string[]
  routes: readonly RouteNode[]
  resources?: ResourceDefinitions<Record<string, DataRecord>>
  Provider?: ComponentType<{ children: ReactNode }>
  headerAction?: { Component: ComponentType<ModuleActionProps>; route?: string }
}

export type ModuleCapability = 'routes' | 'resources' | 'provider' | 'header-action'

export interface ModuleDataMigration {
  id: string
  from: number
  to: number
  checksum: string
  requiresBackup: boolean
  rollback: 'reversible' | 'backup-restore' | 'forward-only'
}

export interface ApplicationModule extends ApplicationModuleBase {
  contractVersion: 2
  version: string
  compatibility: { application: string }
  capabilities: readonly ModuleCapability[]
  data: {
    minimumSupportedVersion: number
    currentVersion: number
    migrations: readonly ModuleDataMigration[]
  }
  uninstall: {
    dataPolicy: 'retain' | 'archive-before-removal' | 'remove-after-confirmation' | 'ephemeral'
    cleanup: 'provider-unmount' | 'none'
  }
}

export interface ModuleActionProps {
  placement: 'header' | 'mobile'
  buttonStyle?: CSSProperties
}

export interface ModuleRegistry {
  hostVersion: string
  modules: readonly ApplicationModule[]
  routes: RouteNode[]
  resources: Readonly<Record<string, ResourceDefinitions<Record<string, DataRecord>>>>
}

/** Resolve dependencies and validate the complete composition before mounting any feature. */
export function createModuleRegistry(
  definitions: readonly ApplicationModule[],
  { hostVersion }: { hostVersion: string }
): ModuleRegistry {
  if (!satisfiesVersionRange(hostVersion, hostVersion)) throw new Error(`Invalid application version: ${hostVersion}`)

  const byId = new Map<string, ApplicationModule>()
  for (const definition of definitions) {
    if (!definition || typeof definition !== 'object') throw new Error('Invalid module manifest')
    if (!/^[a-z][a-z0-9-]*$/.test(definition.id)) throw new Error(`Invalid module id: ${definition.id}`)
    const moduleId = definition.id
    if (definition.contractVersion !== 2) throw new Error(`Unsupported module contract: ${moduleId}`)
    validateV2Manifest(definition, hostVersion)
    if (byId.has(definition.id)) throw new Error(`Duplicate module: ${definition.id}`)
    byId.set(definition.id, definition)
  }
  const ordered: ApplicationModule[] = []
  const visiting = new Set<string>()
  const visited = new Set<string>()
  const visit = (id: string) => {
    if (visited.has(id)) return
    if (visiting.has(id)) throw new Error(`Module dependency cycle: ${id}`)
    const definition = byId.get(id)
    if (!definition) throw new Error(`Missing module dependency: ${id}`)
    visiting.add(id)
    for (const dependency of definition.dependencies ?? []) visit(dependency)
    visiting.delete(id)
    visited.add(id)
    ordered.push(definition)
  }
  for (const id of byId.keys()) visit(id)

  const paths = new Map<string, string>()
  const routes: RouteNode[] = []
  const resources: Record<string, ResourceDefinitions<Record<string, DataRecord>>> = {}
  for (const definition of ordered) {
    const validateRoutes = (nodes: readonly RouteNode[]) => {
      for (const route of nodes) {
        const fullPath = route.meta?.routePath as string
        if (route.path && /[?#]|\/\/+|(?:^|\/)\.\.?($|\/)/.test(route.path))
          throw new Error(`Invalid module route: ${route.path}`)
        if (route.handle?.routePath !== fullPath) throw new Error(`Module route metadata conflicts: ${fullPath}`)
        if (route.auth === false || route.meta?.access === 'public')
          throw new Error(`Public routes belong to application routing: ${definition.id}`)
        if (!route.element && !route.children?.length) throw new Error(`Module route has no page: ${fullPath}`)
        if (!route.children?.length) {
          if (fullPath === '/' || /[?#]|\/\/+|(?:^|\/)\.\.?($|\/)/.test(fullPath))
            throw new Error(`Invalid module route: ${fullPath}`)
          const canonical = fullPath.toLowerCase().replace(/:[^/]+/g, ':parameter')
          if (paths.has(canonical)) throw new Error(`Duplicate module route: ${fullPath}`)
          paths.set(canonical, definition.id)
          const policy = routePolicies[fullPath]
          if (!policy?.permission) throw new Error(`Module route requires an explicit permission policy: ${fullPath}`)
          if (route.meta?.permission && route.meta.permission !== policy.permission)
            throw new Error(`Module route permission conflicts with policy: ${fullPath}`)
        }
        if (route.children) validateRoutes(route.children)
      }
    }
    const normalized = normalizeRouteTree(definition.routes)
    validateRoutes(normalized)
    if (
      definition.headerAction?.route &&
      paths.get(definition.headerAction.route.toLowerCase().replace(/:[^/]+/g, ':parameter')) !== definition.id
    )
      throw new Error(`Module header action requires a route owned by ${definition.id}`)
    routes.push(...annotateRoutesWithPermissions(normalized))
    resources[definition.id] = Object.freeze({ ...definition.resources })
  }
  return { hostVersion, modules: Object.freeze(ordered), routes, resources: Object.freeze(resources) }
}

function validateV2Manifest(module: ApplicationModule, hostVersion: string) {
  if (!Array.isArray(module.routes) || module.routes.length === 0)
    throw new Error(`Module ${module.id} must declare at least one route`)
  if (!satisfiesVersionRange(module.version, module.version)) throw new Error(`Invalid module version: ${module.id}`)
  if (!module.compatibility || typeof module.compatibility.application !== 'string')
    throw new Error(`Module ${module.id} has an invalid application compatibility range`)
  if (!satisfiesVersionRange(hostVersion, module.compatibility.application))
    throw new Error(`Module ${module.id} is incompatible with application ${hostVersion}`)

  const knownCapabilities: readonly ModuleCapability[] = ['routes', 'resources', 'provider', 'header-action']
  if (!Array.isArray(module.capabilities)) throw new Error(`Module ${module.id} must declare its capabilities`)
  const actualCapabilities = new Set<ModuleCapability>(['routes'])
  if (module.resources && Object.keys(module.resources).length) actualCapabilities.add('resources')
  if (module.Provider) actualCapabilities.add('provider')
  if (module.headerAction) actualCapabilities.add('header-action')

  const declared = new Set(module.capabilities)
  if (
    declared.size !== module.capabilities.length ||
    module.capabilities.some((capability) => !knownCapabilities.includes(capability)) ||
    declared.size !== actualCapabilities.size ||
    [...actualCapabilities].some((capability) => !declared.has(capability))
  ) {
    throw new Error(`Module ${module.id} capability declaration does not match its compiled features`)
  }

  if (!module.data || !Array.isArray(module.data.migrations))
    throw new Error(`Module ${module.id} has an invalid data migration contract`)
  const { minimumSupportedVersion, currentVersion, migrations } = module.data
  if (
    !Number.isSafeInteger(minimumSupportedVersion) ||
    !Number.isSafeInteger(currentVersion) ||
    minimumSupportedVersion < 0 ||
    currentVersion < minimumSupportedVersion
  ) {
    throw new Error(`Module ${module.id} has an invalid data version range`)
  }
  const migrationByFrom = new Map<number, ModuleDataMigration>()
  const migrationIds = new Set<string>()
  for (const migration of migrations) {
    if (
      !migration ||
      typeof migration !== 'object' ||
      !/^[a-z][a-z0-9-]*$/.test(migration.id) ||
      migrationIds.has(migration.id) ||
      !Number.isSafeInteger(migration.from) ||
      !Number.isSafeInteger(migration.to) ||
      migration.from < minimumSupportedVersion ||
      migration.to !== migration.from + 1 ||
      migration.to > currentVersion ||
      !/^[a-f0-9]{64}$/.test(migration.checksum) ||
      typeof migration.requiresBackup !== 'boolean' ||
      !['reversible', 'backup-restore', 'forward-only'].includes(migration.rollback) ||
      (migration.rollback !== 'reversible' && !migration.requiresBackup) ||
      migrationByFrom.has(migration.from)
    ) {
      const migrationId = migration && typeof migration === 'object' ? migration.id : 'unknown'
      throw new Error(`Module ${module.id} has an invalid data migration: ${migrationId}`)
    }
    migrationIds.add(migration.id)
    migrationByFrom.set(migration.from, migration)
  }
  for (let version = minimumSupportedVersion; version < currentVersion; version += 1) {
    if (!migrationByFrom.has(version))
      throw new Error(`Module ${module.id} is missing migration from data version ${version}`)
  }
  const uninstallDataPolicies = ['retain', 'archive-before-removal', 'remove-after-confirmation', 'ephemeral']
  if (!module.uninstall || !uninstallDataPolicies.includes(module.uninstall.dataPolicy)) {
    throw new Error(`Module ${module.id} has an invalid uninstall data policy`)
  }
  if (module.uninstall.cleanup !== (module.Provider ? 'provider-unmount' : 'none')) {
    throw new Error(`Module ${module.id} uninstall cleanup must match its Provider lifecycle`)
  }
  if (module.uninstall.dataPolicy === 'ephemeral' && currentVersion > 0) {
    throw new Error(`Module ${module.id} cannot mark versioned persistent data as ephemeral`)
  }
}

const ModuleContext = createContext<ModuleRegistry | null>(null)

/** Provider state and effect cleanup follow this application's React lifetime. */
export function ApplicationModules({ registry, children }: PropsWithChildren<{ registry: ModuleRegistry }>) {
  const content = registry.modules.reduceRight(
    (child, definition) =>
      definition.Provider ? createElement(definition.Provider, { key: definition.id, children: child }) : child,
    children
  )
  return <ModuleContext.Provider value={registry}>{content}</ModuleContext.Provider>
}

export function useApplicationModules() {
  const registry = useContext(ModuleContext)
  if (!registry) throw new Error('ApplicationModules required')
  return registry
}

export function useModuleActions() {
  const registry = useContext(ModuleContext)
  const { current } = usePermission()
  return (
    registry?.modules.filter(
      (definition) =>
        definition.headerAction &&
        (!definition.headerAction.route || (current && canAccessPath(current, definition.headerAction.route)))
    ) ?? []
  )
}

export function ModuleAction({ moduleId, ...props }: ModuleActionProps & { moduleId: string }) {
  const Action = useModuleActions().find((definition) => definition.id === moduleId)?.headerAction?.Component
  return Action ? <Action {...props} /> : null
}

export function ModuleActions(props: ModuleActionProps) {
  return (
    <>
      {useModuleActions().map((definition) => (
        <ModuleAction key={definition.id} moduleId={definition.id} {...props} />
      ))}
    </>
  )
}
