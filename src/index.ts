import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { initDb } from './config/initDb';

const PORT = process.env.PORT ?? 5000;

async function start(): Promise<void> {
  try {
    await initDb();
  } catch (err) {
    console.error('[startup] Database init failed:', (err as Error).message);
    // Continue anyway — health checks should pass even if DB is briefly unreachable
  }

  app.listen(PORT, () => {
    console.log(`kino-backend running on port ${PORT}`);
  });
}

start();
