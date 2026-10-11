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

/** Compiled, trusted features. Authentication and the application shell remain application-owned. */
export interface ApplicationModule {
  id: string
  contractVersion: 1
  dependencies?: readonly string[]
  routes: readonly RouteNode[]
  resources?: ResourceDefinitions<Record<string, DataRecord>>
  Provider?: ComponentType<{ children: ReactNode }>
  headerAction?: { Component: ComponentType<ModuleActionProps>; route?: string }
}

export interface ModuleActionProps {
  placement: 'header' | 'mobile'
  buttonStyle?: CSSProperties
}

export interface ModuleRegistry {
  modules: readonly ApplicationModule[]
  routes: RouteNode[]
  resources: Readonly<Record<string, ResourceDefinitions<Record<string, DataRecord>>>>
}

/** Resolve dependencies and validate the complete composition before mounting any feature. */
export function createModuleRegistry(definitions: readonly ApplicationModule[]): ModuleRegistry {
  const byId = new Map<string, ApplicationModule>()
  for (const definition of definitions) {
    if (!/^[a-z][a-z0-9-]*$/.test(definition.id)) throw new Error(`Invalid module id: ${definition.id}`)
    if (definition.contractVersion !== 1) throw new Error(`Unsupported module contract: ${definition.id}`)
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
  return { modules: Object.freeze(ordered), routes, resources: Object.freeze(resources) }
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
