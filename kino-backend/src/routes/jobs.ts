import { Response } from 'express';
import { AuthRequest } from '../types';
import { renderQueue } from '../services/queue';
import { RenderJobData } from '../services/queue';

const STATE_MAP: Record<string, string> = {
  waiting:   'queued',
  active:    'rendering',
  completed: 'done',
  failed:    'failed',
  delayed:   'queued',
  paused:    'queued',
};

export async function handleGetJob(req: AuthRequest, res: Response): Promise<void> {
  const { jobId } = req.params;

  try {
    const job = await renderQueue.getJob(jobId);

    if (!job) {
      res.status(404).json({ error: 'Job not found.' });
      return;
    }

    const data = job.data as RenderJobData;
    if (data.userId !== req.userId) {
      res.status(403).json({ error: 'Access denied.' });
      return;
    }

    const state    = await job.getState();
    const progress = typeof job.progress === 'number' ? job.progress : 0;

    const payload: Record<string, unknown> = {
      jobId:    job.id,
      template: data.template,
      status:   STATE_MAP[state] ?? state,
      progress,
    };

    if (state === 'completed' && job.returnvalue) {
      payload.outputUrl = job.returnvalue.outputUrl;
    }

    if (state === 'failed') {
      payload.error = job.failedReason ?? 'Render failed.';
    }

    res.json(payload);
  } catch (err) {
    console.error('Get job error:', err);
    res.status(500).json({ error: 'Failed to retrieve job status.' });
  }
}
