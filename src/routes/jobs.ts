import { Response } from 'express';
import { AuthRequest } from '../types';
import { getJob } from '../services/jobStore';

export async function handleGetJob(req: AuthRequest, res: Response): Promise<void> {
  const { jobId } = req.params;
  const job = getJob(jobId);

  if (!job) {
    res.status(404).json({ error: 'Job not found.' });
    return;
  }

  if (job.userId !== req.userId) {
    res.status(403).json({ error: 'Access denied.' });
    return;
  }

  res.json({
    jobId:     job.jobId,
    template:  job.template,
    status:    job.status,
    progress:  job.progress,
    outputUrl: job.outputUrl,
    error:     job.error,
  });
}
