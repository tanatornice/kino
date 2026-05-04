import { pool } from './db';

export async function initDb(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        prompt TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS projects_user_id_idx ON projects(user_id);
    `);
    console.log('[db] Tables ready.');
  } finally {
    client.release();
  }
}

// CLI entry: `npm run db:init`
if (require.main === module) {
  initDb()
    .then(() => pool.end())
    .catch((err) => {
      console.error('[db] Failed to initialize:', err.message);
      process.exit(1);
    });
}
