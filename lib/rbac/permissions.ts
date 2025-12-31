// Role-based access control permissions system

export type UserRole = "super_admin" | "admin" | "staff" | "partner" | "affiliate" | "customer" | "guest"

export type Permission =
  | "read:products"
  | "create:products"
  | "update:products"
  | "delete:products"
  | "read:orders"
  | "update:orders"
  | "approve:commissions"
  | "manage:users"
  | "view:analytics"
  | "manage:content"
  | "manage:support"

export const rolePermissions: Record<UserRole, Permission[]> = {
  super_admin: [
    "read:products",
    "create:products",
    "update:products",
    "delete:products",
    "read:orders",
    "update:orders",
    "approve:commissions",
    "manage:users",
    "view:analytics",
    "manage:content",
    "manage:support",
  ],
  admin: [
    "read:products",
    "create:products",
    "update:products",
    "delete:products",
    "read:orders",
    "update:orders",
    "approve:commissions",
    "view:analytics",
  ],
  staff: ["read:products", "read:orders", "update:orders", "manage:support"],
  partner: ["read:products", "view:analytics"],
  affiliate: ["read:products"],
  customer: ["read:products"],
  guest: ["read:products"],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p))
}

export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p))
}
