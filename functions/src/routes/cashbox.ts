import { Router } from 'express';
import { verifyToken, requireRole } from '../auth';
import * as cashbox from '../services/cashbox';

export const router = Router();

router.use(verifyToken);

router.get('/', async (_req, res) => {
  const data = await cashbox.getAll();
  res.json(data);
});

router.get('/:id', async (req, res) => {
  const item = await cashbox.getById(req.params.id);
  if (!item) return res.status(404).send('Not found');
  res.json(item);
});

router.post('/', requireRole(['ADMIN']), async (req, res) => {
  const created = await cashbox.create(req.body);
  res.status(201).json(created);
});

router.put('/:id', requireRole(['ADMIN']), async (req, res) => {
  const updated = await cashbox.update(req.params.id, req.body);
  res.json(updated);
});

router.delete('/:id', requireRole(['ADMIN']), async (req, res) => {
  await cashbox.remove(req.params.id);
  res.sendStatus(204);
});
