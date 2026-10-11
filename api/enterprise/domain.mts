import { randomBytes, scrypt, timingSafeEqual, createHash } from 'node:crypto'
import { promisify } from 'node:util'

export class BusinessError extends Error {
  status: number
  code: string
  constructor(status: number, code: string, message = code) {
    super(message)
    this.status = status
    this.code = code
  }
}
export const fail = (status: number, code: string): never => {
  throw new BusinessError(status, code)
}
export function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return fail(400, 'invalid_body')
  return value as Record<string, unknown>
}
export function text(value: unknown, field: string, max = 80): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) return fail(400, `invalid_${field}`)
  return value.trim()
}
export function tenantId(value: unknown): string {
  const id = text(value, 'tenant', 64)
  if (!/^[a-z][a-z0-9_-]*$/.test(id)) return fail(400, 'invalid_tenant')
  return id
}
export function email(value: unknown): string {
  const result = text(value, 'email', 254).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result)) return fail(400, 'invalid_email')
  return result
}
export function password(value: unknown): string {
  if (typeof value !== 'string' || value.length < 12 || value.length > 256) return fail(400, 'invalid_password')
  return value
}
export function onlyFields(input: Record<string, unknown>, fields: readonly string[]): void {
  if (Object.keys(input).some((key) => !fields.includes(key))) fail(400, 'unknown_field')
}
export function permits(grants: readonly string[], permission: string): boolean {
  return grants.includes('*:*') || grants.includes(permission) || grants.includes(`${permission.split(':')[0]}:*`)
}
export function canDelegate(grants: readonly string[], requested: readonly string[]): boolean {
  return requested.every((permission) => permits(grants, permission))
}
const derive = promisify(scrypt)
export async function hashPassword(value: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const hash = (await derive(value, salt, 64)) as Buffer
  return `scrypt:${salt}:${hash.toString('hex')}`
}
export async function verifyPassword(value: string, stored: string | null): Promise<boolean> {
  // Equal-cost derivation for unknown users; no plaintext passwords or recoverable tokens are stored.
  const [, salt, expected] = (stored || `scrypt:${'0'.repeat(32)}:${'0'.repeat(128)}`).split(':')
  const actual = (await derive(value, salt, 64)) as Buffer
  const wanted = Buffer.from(expected, 'hex')
  return Boolean(stored) && wanted.length === actual.length && timingSafeEqual(wanted, actual)
}
export const tokenHash = (token: string): string => createHash('sha256').update(token).digest('hex')

export interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'disabled'
}
export interface Role {
  id: string
  name: string
  code: string
  permissions: string[]
}
export interface Audit {
  id: string
  actor: string
  action: string
  resource: string
  recordId: string
  at: string
}
export type Resource = 'users' | 'roles' | 'audit'
export interface Principal {
  tenantId: string
  user: User
  role: Role
  sessionHash: string
}
