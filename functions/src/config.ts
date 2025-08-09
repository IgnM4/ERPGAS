import 'dotenv/config';

export const config = {
  sentryDsn: process.env.SENTRY_DSN_FUNCTIONS || '',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean),
};
