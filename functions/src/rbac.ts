export type Role = 'ADMIN' | 'OPERATOR' | 'DISPATCH' | 'CASH';

export function hasRole(claims: any, roles: Role[]): boolean {
  return roles.includes((claims?.role as Role) || '');
}
