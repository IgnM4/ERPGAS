import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { config } from './config';
import { router as authRouter } from './routes/auth';
import { router as productsRouter } from './routes/products';

export const app = express();
const logger = pino();
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors({ origin: config.allowedOrigins }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/products', productsRouter);

app.get('/', (_req, res) => res.send('API OK'));
