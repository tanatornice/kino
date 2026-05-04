import path from 'path';
import express from 'express';
import cors from 'cors';
import { requireAuth } from './middleware/auth';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import { handleRender } from './routes/render';
import { handleGetJob } from './routes/jobs';

const app = express();

app.use(cors());
app.use(express.json());

// Serve rendered MP4 files
app.use('/renders', express.static(path.resolve(process.cwd(), 'renders')));

app.use('/api/auth', authRoutes);
app.use('/api/projects', requireAuth, projectRoutes);
app.post('/api/render',        requireAuth, handleRender);
app.get('/api/jobs/:jobId',    requireAuth, handleGetJob);

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

export default app;
