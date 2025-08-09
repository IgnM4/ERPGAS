import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { hasRole, Role } from './rbac';

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const match = header.match(/^Bearer (.*)$/);
  if (!match) return res.status(401).send('Missing token');
  try {
    const decoded = await getAuth().verifyIdToken(match[1]);
    (req as any).user = decoded;
    next();
  } catch (e) {
    res.status(401).send('Invalid token');
  }
}

export function requireRole(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const claims = (req as any).user;
    if (!claims || !hasRole(claims, roles)) return res.status(403).send('Forbidden');
    next();
  };
}
