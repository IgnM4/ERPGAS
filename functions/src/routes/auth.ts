import { Router } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { verifyToken, requireRole } from '../auth';
import { Role } from '../rbac';

export const router = Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Missing fields');
  try {
    const user = await getAuth().createUser({ email, password });
    res.json({ uid: user.uid, email: user.email });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

router.post('/login', async (_req, res) => {
  // Auth handled on client via Firebase Auth SDK
  res.status(501).send('Use client SDK to login');
});

router.post('/assign-role', verifyToken, requireRole(['ADMIN']), async (req, res) => {
  const { uid, role } = req.body as { uid?: string; role?: Role };
  if (!uid || !role) return res.status(400).send('Missing fields');
  if (!['ADMIN', 'OPERATOR', 'DISPATCH', 'CASH'].includes(role)) {
    return res.status(400).send('Invalid role');
  }
  try {
    await getAuth().setCustomUserClaims(uid, { role });
    res.json({ uid, role });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  const uid = (req as any).user.uid;
  try {
    const record = await getAuth().getUser(uid);
    res.json({ uid: record.uid, email: record.email, role: (record.customClaims as any)?.role });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

router.post('/revoke', verifyToken, requireRole(['ADMIN']), async (req, res) => {
  const { uid } = req.body as { uid?: string };
  if (!uid) return res.status(400).send('Missing uid');
  try {
    await getAuth().revokeRefreshTokens(uid);
    res.send('ok');
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

export default router;
