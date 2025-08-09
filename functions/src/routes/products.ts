import { Router } from 'express';
import { verifyToken, requireRole } from '../auth';
import { db } from '../db';

export const router = Router();

router.use(verifyToken);

router.get('/', async (_req, res) => {
  const snap = await db.collection('products').get();
  res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
});

router.post('/', requireRole(['ADMIN']), async (req, res) => {
  const data = req.body;
  const ref = await db.collection('products').add(data);
  res.json({ id: ref.id, ...data });
});
