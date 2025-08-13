import express from 'express';
import request from 'supertest';

jest.mock('../src/auth', () => ({
  verifyToken: (_req: any, _res: any, next: any) => next(),
  requireRole: () => (_req: any, _res: any, next: any) => next(),
}));

const svc = {
  getAll: jest.fn().mockResolvedValue([{ id: '1' }]),
  getById: jest.fn().mockResolvedValue({ id: '1' }),
  create: jest.fn().mockResolvedValue({ id: '1' }),
  update: jest.fn().mockResolvedValue({ id: '1' }),
  remove: jest.fn().mockResolvedValue(undefined),
};

jest.mock('../src/services/prices', () => svc);

import { router } from '../src/routes/prices';

const app = express();
app.use(express.json());
app.use('/', router);

describe('prices routes', () => {
  beforeEach(() => jest.clearAllMocks());

  it('lists prices', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: '1' }]);
    expect(svc.getAll).toHaveBeenCalled();
  });

  it('gets price by id', async () => {
    const res = await request(app).get('/123');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: '1' });
    expect(svc.getById).toHaveBeenCalledWith('123');
  });

  it('creates price', async () => {
    const res = await request(app).post('/').send({ value: 10 });
    expect(res.status).toBe(201);
    expect(svc.create).toHaveBeenCalledWith({ value: 10 });
  });

  it('updates price', async () => {
    const res = await request(app).put('/123').send({ value: 20 });
    expect(res.status).toBe(200);
    expect(svc.update).toHaveBeenCalledWith('123', { value: 20 });
  });

  it('deletes price', async () => {
    const res = await request(app).delete('/123');
    expect(res.status).toBe(204);
    expect(svc.remove).toHaveBeenCalledWith('123');
  });
});
