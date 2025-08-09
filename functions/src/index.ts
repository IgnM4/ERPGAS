import { onRequest } from 'firebase-functions/v2/https';
import { app } from './app';
import * as logger from 'firebase-functions/logger';

export const api = onRequest({ region: 'us-central1' }, (req, res) => {
  logger.info('Incoming request', { path: req.path });
  app(req, res);
});
