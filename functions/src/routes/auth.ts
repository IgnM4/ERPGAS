import { Router } from 'express';
import { getAuth } from 'firebase-admin/auth';

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

export default router;
