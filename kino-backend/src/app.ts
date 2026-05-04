import express from 'express';
import cors from 'cors';
import { requireAuth } from './middleware/auth';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', requireAuth, projectRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

export default app;
