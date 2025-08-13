import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { config } from './config';
import { router as authRouter } from './routes/auth';
import { router as productsRouter } from './routes/products';
import { router as pricesRouter } from './routes/prices';
import { router as salesRouter } from './routes/sales';
import { router as cashboxRouter } from './routes/cashbox';

export const app = express();
const logger = pino();
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors({ origin: config.allowedOrigins }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/prices', pricesRouter);
app.use('/sales', salesRouter);
app.use('/cashbox', cashboxRouter);

app.get('/', (_req, res) => res.send('API OK'));
