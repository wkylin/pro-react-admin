import type { Role, UserPermission } from '../model/permission'

/** Enterprise service builds never resolve permissions from browser demo accounts. */
export async function mockGetUserPermissions(): Promise<UserPermission> {
  throw new Error('Demo permissions are unavailable in this build')
}

export async function mockGetRoles(): Promise<Role[]> {
  throw new Error('Demo roles are unavailable in this build')
}
