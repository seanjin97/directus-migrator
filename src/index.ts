#!/usr/bin/env node
import { AdminIds, Environment, Role } from "./types/types"
import { SchemaMigrator, PermissionMigrator, RoleMigrator } from "./migrators"
import logger from "./utils/Logger"

export type DirectusMigratorCommand = {
  init?: boolean
  add?: boolean
  force?: boolean
  source?: string | Environment
  target?: string | Environment
  debug?: boolean
  verbose?: boolean
  roles?: boolean
  permissions?: boolean
  schema?: boolean
  help?: boolean
}

const migrateSchema = async (source: Environment, target: Environment, force: boolean) => {
  try {
    await SchemaMigrator(source, target, force)
  } catch (e) {
    logger.error("Error while migrating schema", { error: e })
  }
}

export async function migrateRoles(source: Environment, target: Environment): Promise<AdminIds> {
  return await RoleMigrator(source, target)
}

export async function migratePermissions(
  source: Environment,
  target: Environment,
  adminIds: AdminIds
): Promise<void> {
  await PermissionMigrator(source, target, adminIds)
}

export async function DirectusMigrator(
  source: Environment,
  target: Environment,
  args: DirectusMigratorCommand
) {
  const { force = false, roles, permissions, schema } = args

  if (roles || permissions || schema) {
    if (schema) return await migrateSchema(source, target, force)
    const adminIds = await migrateRoles(source, target)
    if (permissions) await migratePermissions(source, target, adminIds)
  } else {
    await migrateSchema(source, target, force)
    const adminIds = await migrateRoles(source, target)
    await migratePermissions(source, target, adminIds)
  }

  console.log("Completed!")
}
