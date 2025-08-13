import { Router } from 'express';
import { verifyToken, requireRole } from '../auth';
import * as sales from '../services/sales';

export const router = Router();

router.use(verifyToken);

router.get('/', async (_req, res) => {
  const data = await sales.getAll();
  res.json(data);
});

router.get('/:id', async (req, res) => {
  const item = await sales.getById(req.params.id);
  if (!item) return res.status(404).send('Not found');
  res.json(item);
});

router.post('/', requireRole(['ADMIN']), async (req, res) => {
  const created = await sales.create(req.body);
  res.status(201).json(created);
});

router.put('/:id', requireRole(['ADMIN']), async (req, res) => {
  const updated = await sales.update(req.params.id, req.body);
  res.json(updated);
});

router.delete('/:id', requireRole(['ADMIN']), async (req, res) => {
  await sales.remove(req.params.id);
  res.sendStatus(204);
});
