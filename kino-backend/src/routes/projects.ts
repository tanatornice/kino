import { Router, Response } from 'express';
import { pool } from '../config/db';
import { AuthRequest } from '../types';

const router = Router();

router.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, prompt } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    res.status(400).json({ error: 'Project title is required.' });
    return;
  }

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    res.status(400).json({ error: 'Prompt is required.' });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO projects (user_id, title, prompt) VALUES ($1, $2, $3) RETURNING *',
      [req.userId, title.trim(), prompt.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create project error:', err);
    res.status(500).json({ error: 'Failed to create project.' });
  }
});

router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('List projects error:', err);
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

router.get('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid project ID.' });
    return;
  }

  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE id = $1 AND user_id = $2',
      [id, req.userId]
    );

    if (!result.rows[0]) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get project error:', err);
    res.status(500).json({ error: 'Failed to fetch project.' });
  }
});

router.delete('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid project ID.' });
    return;
  }

  try {
    const result = await pool.query(
      'DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.userId]
    );

    if (!result.rows[0]) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }

    res.status(204).send();
  } catch (err) {
    console.error('Delete project error:', err);
    res.status(500).json({ error: 'Failed to delete project.' });
  }
});

export default router;
